import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { loadResearcherSystemPrompt, type Mode } from "@/lib/researcher-context";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Msg = { role: "user" | "assistant"; content: string };

const MODEL       = process.env.ANTHROPIC_MODEL        ?? "claude-haiku-4-5-20251001";
const DUEL_MODEL  = process.env.ANTHROPIC_DUEL_MODEL   ?? "claude-sonnet-4-5-20250929";
const AUDIT_MODEL = process.env.ANTHROPIC_AUDIT_MODEL  ?? "claude-sonnet-4-5-20250929";

const MAX_TOKENS: Record<Mode, number> = {
  scratch: 1400, sharpen: 1400, diagnose: 900, duel: 1400, audit: 3000,
};

const VALID: Mode[] = ["scratch", "sharpen", "diagnose", "duel", "audit"];
function parseMode(v: unknown): Mode {
  return typeof v === "string" && (VALID as string[]).includes(v) ? v as Mode : "scratch";
}
function modelFor(m: Mode): string {
  if (m === "duel" || m === "audit") return m === "duel" ? DUEL_MODEL : AUDIT_MODEL;
  return MODEL;
}

/* ---- Rate limiter ---- */
const RL_MAX = Number(process.env.RATE_LIMIT_MAX ?? 12);
const RL_WIN = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60_000);
const buckets = new Map<string, { count: number; resetAt: number }>();
function ipOf(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
}
function rateOk(id: string): boolean {
  const now = Date.now();
  const b = buckets.get(id);
  if (!b || now > b.resetAt) { buckets.set(id, { count: 1, resetAt: now + RL_WIN }); return true; }
  if (b.count >= RL_MAX) return false;
  b.count++; return true;
}

/* ---- Jina AI reader — completely free, no API key needed ---- */
async function readPageViaJina(url: string): Promise<string> {
  try {
    // Jina.ai converts any URL to clean markdown — completely free, no key
    const jinaUrl = `https://r.jina.ai/${url}`;
    const res = await fetch(jinaUrl, {
      headers: {
        Accept: "text/plain",
        "X-Return-Format": "text",
      },
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) return `Could not read page (${res.status}). The URL may be paywalled or unavailable.`;
    const text = await res.text();
    // Trim to ~4000 chars so we don't blow the context window
    return text.length > 4000 ? text.slice(0, 4000) + "\n\n[truncated]" : text;
  } catch (e) {
    return `Error reading page: ${e instanceof Error ? e.message : "unknown"}`;
  }
}

/* ---- The competitor page-reading tool (free, uses Jina) ---- */
const COMPETITOR_SEARCH_TOOL: Anthropic.Tool = {
  name: "read_competitor_page",
  description: `Read the live content of a competitor's website to audit their current offer, pricing, mechanism claims, and avatar. Use this to get REAL, current data — not training knowledge.

Strategy for a full market audit (read 4-6 pages total):
1. Read 3-4 main competitor homepages or pricing pages you know from training
2. Read 1-2 pages from players you know are active in this space
3. Look specifically for: what they charge, what mechanism they claim, what avatar they target, what result they promise

Always read the PRICING or OFFER page when available (e.g. /pricing, /work-with-me, /programs). Homepage alone often hides the price.`,
  input_schema: {
    type: "object" as const,
    properties: {
      url: {
        type: "string",
        description: "Full URL of the competitor page to read, e.g. https://www.somecoach.com/pricing or https://someagency.com/services",
      },
      label: {
        type: "string",
        description: "Short label for this competitor, e.g. 'Competitor A - business coach' — shown in the audit status",
      },
    },
    required: ["url", "label"],
  },
};

/* ---- JSON helpers ---- */
function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/* ---- Main handler ---- */
export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) return json({ error: "ANTHROPIC_API_KEY is not set." }, 500);
  if (!rateOk(ipOf(req))) return json({ error: "Rate limit reached — try again in 60s." }, 429);

  let body: { messages: Msg[]; mode?: string };
  try { body = await req.json(); }
  catch { return json({ error: "Invalid JSON" }, 400); }

  let msgs = body.messages?.filter(
    (m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string"
  );
  if (!msgs?.length) return json({ error: "No messages" }, 400);
  if (msgs.length > 24) msgs = msgs.slice(-24);
  for (const m of msgs) if (m.content.length > 4000) m.content = m.content.slice(0, 4000);

  const mode = parseMode(body.mode);
  const systemPrompt = await loadResearcherSystemPrompt(mode);
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const enc = new TextEncoder();

  /* ====== AUDIT MODE: tool use loop with live search ====== */
  if (mode === "audit") {
    const stream = new ReadableStream({
      async start(ctrl) {
        try {
          await runAudit(client, systemPrompt, msgs, ctrl, enc);
        } catch (e) {
          ctrl.enqueue(enc.encode(`\n\n[audit error: ${e instanceof Error ? e.message : String(e)}]\n`));
        } finally {
          ctrl.close();
        }
      },
    });
    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache", "X-Research-Mode": "audit" },
    });
  }

  /* ====== ALL OTHER MODES: plain streaming ====== */
  const stream = new ReadableStream({
    async start(ctrl) {
      try {
        const tools = mode === "duel" ? undefined : undefined; // no tools for non-audit
        const response = await client.messages.create({
          model: modelFor(mode),
          max_tokens: MAX_TOKENS[mode],
          system: [{ type: "text" as const, text: systemPrompt, cache_control: { type: "ephemeral" } }],
          messages: msgs.map((m) => ({ role: m.role, content: m.content })),
          stream: true,
        });
        for await (const ev of response) {
          if (ev.type === "content_block_delta" && ev.delta.type === "text_delta") {
            ctrl.enqueue(enc.encode(ev.delta.text));
          }
        }
        ctrl.close();
      } catch (e) {
        ctrl.enqueue(enc.encode(`\n\n[error: ${e instanceof Error ? e.message : String(e)}]\n`));
        ctrl.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "X-Research-Mode": mode,
    },
  });
}

/* ====== Audit runner: tool use loop, streams status + content ====== */
async function runAudit(
  client: Anthropic,
  systemPrompt: string,
  msgs: Msg[],
  ctrl: ReadableStreamDefaultController,
  enc: TextEncoder
) {
  // Tell the client we're starting — Jina is always available, no key needed
  ctrl.enqueue(enc.encode(`[AUDIT_START:live]\n`));

  let currentMsgs: Anthropic.MessageParam[] = msgs.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const MAX_ITER = 10; // allow up to 10 tool calls for a thorough audit

  for (let iter = 0; iter < MAX_ITER; iter++) {
    const res = await client.messages.create({
      model: AUDIT_MODEL,
      max_tokens: MAX_TOKENS["audit"],
      system: [{ type: "text" as const, text: systemPrompt, cache_control: { type: "ephemeral" } }],
      tools: [COMPETITOR_SEARCH_TOOL],
      messages: currentMsgs,
    });

    // Stream any text blocks from this turn
    for (const block of res.content) {
      if (block.type === "text" && block.text) {
        ctrl.enqueue(enc.encode(block.text));
      }
    }

    // Done — no more tool calls
    if (res.stop_reason === "end_turn") break;

    // Handle tool calls
    if (res.stop_reason === "tool_use") {
      const toolResults: Anthropic.ToolResultBlockParam[] = [];

      for (const block of res.content) {
        if (block.type === "tool_use" && block.name === "read_competitor_page") {
          const input = block.input as { url: string; label: string };
          const url = input.url ?? "";
          const label = input.label ?? url;

          // Send status line — client renders this as a "reading X..." chip
          ctrl.enqueue(enc.encode(`[SEARCHING:${label}]\n`));

          // Read the page via Jina (free, no key)
          const content = await readPageViaJina(url);

          toolResults.push({
            type: "tool_result",
            tool_use_id: block.id,
            content: `PAGE CONTENT FOR ${label} (${url}):\n\n${content}`,
          });
        }
      }

      if (!toolResults.length) break;

      // Extend conversation with tool results
      currentMsgs = [
        ...currentMsgs,
        { role: "assistant" as const, content: res.content },
        { role: "user" as const, content: toolResults },
      ];
    } else {
      break; // unknown stop reason
    }
  }
}
