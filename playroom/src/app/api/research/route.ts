import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { loadResearcherSystemPrompt, type Mode } from "@/lib/researcher-context";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Msg = { role: "user" | "assistant"; content: string };
const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-haiku-4-5-20251001";
const DUEL_MODEL = process.env.ANTHROPIC_DUEL_MODEL ?? "claude-sonnet-4-5-20250929";

const MAX_TOKENS: Record<Mode, number> = {
  scratch: 1400, sharpen: 1400, diagnose: 900, duel: 1400,
};

const VALID: Mode[] = ["scratch", "sharpen", "diagnose", "duel"];
function parseMode(v: unknown): Mode {
  return typeof v === "string" && (VALID as string[]).includes(v) ? v as Mode : "scratch";
}

const RL_MAX = Number(process.env.RATE_LIMIT_MAX ?? 12);
const RL_WIN = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60_000);
const buckets = new Map<string, { count: number; resetAt: number }>();
function ip(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
}
function rateOk(id: string): boolean {
  const now = Date.now();
  const b = buckets.get(id);
  if (!b || now > b.resetAt) { buckets.set(id, { count: 1, resetAt: now + RL_WIN }); return true; }
  if (b.count >= RL_MAX) return false;
  b.count++; return true;
}

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) return json({ error: "ANTHROPIC_API_KEY is not set." }, 500);
  if (!rateOk(ip(req))) return json({ error: "Rate limit reached — try again in 60s." }, 429);

  let body: { messages: Msg[]; mode?: string };
  try { body = await req.json(); } catch { return json({ error: "Invalid JSON" }, 400); }

  let msgs = body.messages?.filter(m => (m.role === "user" || m.role === "assistant") && typeof m.content === "string");
  if (!msgs?.length) return json({ error: "No messages" }, 400);
  if (msgs.length > 24) msgs = msgs.slice(-24);
  for (const m of msgs) if (m.content.length > 4000) m.content = m.content.slice(0, 4000);

  const mode = parseMode(body.mode);
  const systemPrompt = await loadResearcherSystemPrompt(mode);
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const model = mode === "duel" ? DUEL_MODEL : MODEL;

  const enc = new TextEncoder();
  const stream = new ReadableStream({
    async start(ctrl) {
      try {
        const res = await client.messages.create({
          model,
          max_tokens: MAX_TOKENS[mode],
          system: [{ type: "text", text: systemPrompt, cache_control: { type: "ephemeral" } }],
          messages: msgs.map(m => ({ role: m.role, content: m.content })),
          stream: true,
        });
        for await (const ev of res) {
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
