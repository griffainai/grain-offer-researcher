"use client";

import { useEffect, useRef, useState } from "react";
import { MODES } from "@/lib/brand";
import { Markdown } from "./Markdown";

type ChatMsg = { role: "user" | "assistant"; content: string };

const MARKET_EXAMPLES = [
  "Business coaching for startup founders",
  "Email marketing consulting for e-commerce brands",
  "Executive coaching for women in middle management",
  "AI automation for local service businesses",
  "Sales training for SaaS companies ($5M–$30M ARR)",
];

/**
 * The Market Audit — Grain's live competitor research mode.
 *
 * Stream protocol from the API:
 *   [AUDIT_START:live]      → search is live (Brave key present)
 *   [AUDIT_START:knowledge] → using training knowledge
 *   [SEARCHING:query]       → a search query was issued
 *   (all other lines)       → markdown content to render
 */
export function MarketAudit() {
  const meta = MODES["audit"];
  const [market, setMarket] = useState("");
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [searches, setSearches] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isLiveSearch, setIsLiveSearch] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, searches]);

  async function run() {
    const q = market.trim();
    if (!q || isStreaming) return;
    setError(null);
    setSearches([]);
    setIsLiveSearch(null);

    const userMsg: ChatMsg = {
      role: "user",
      content: `Audit the competitor landscape for: ${q}`,
    };
    setMessages([userMsg, { role: "assistant", content: "" }]);
    setIsStreaming(true);

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const res = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [userMsg], mode: "audit" }),
        signal: ctrl.signal,
      });

      if (!res.ok || !res.body) {
        const e = await res.json().catch(() => ({ error: "Unknown" }));
        setError(e.error);
        setMessages([userMsg]);
        return;
      }

      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let contentBuf = "";
      let lineBuf = "";

      const processLine = (line: string) => {
        if (line.startsWith("[AUDIT_START:")) {
          const live = line.includes(":live");
          setIsLiveSearch(live);
          return;
        }
        if (line.startsWith("[SEARCHING:")) {
          const q = line.slice(11, -1).trim();
          setSearches((prev) => [...prev, q]);
          return;
        }
        // Regular content
        contentBuf += line + "\n";
        setMessages([userMsg, { role: "assistant", content: contentBuf }]);
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = dec.decode(value, { stream: true });
        lineBuf += chunk;
        const lines = lineBuf.split("\n");
        lineBuf = lines.pop() ?? "";
        for (const line of lines) processLine(line);
      }
      if (lineBuf) processLine(lineBuf);
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setIsStreaming(false);
    }
  }

  const hasResult = messages.some((m) => m.role === "assistant" && m.content.length > 0);
  const resultMsg = messages.find((m) => m.role === "assistant");

  return (
    <div className="space-y-5">
      {/* Input */}
      <div className="card p-5">
        <p className="label mb-3">Name your market</p>
        <div className="flex gap-2 items-center mb-3">
          <input
            type="text"
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && run()}
            placeholder="e.g. Business coaching for startup founders"
            disabled={isStreaming}
            className="flex-1 bg-bg border border-line rounded-xl px-4 py-3 text-base focus:outline-none focus:border-line-focus disabled:opacity-50 text-ink placeholder:text-ink-tertiary transition-colors"
          />
          <button
            onClick={run}
            disabled={isStreaming || !market.trim()}
            className="btn rounded-xl px-5 py-3 text-sm font-semibold text-white whitespace-nowrap disabled:opacity-40"
            style={{ background: meta.hex, boxShadow: `0 2px 8px ${meta.hex}40` }}
          >
            {isStreaming ? "Researching···" : hasResult ? "↻ Re-audit" : "⊛ Audit market"}
          </button>
        </div>

        {/* Quick-fill examples */}
        <div className="flex flex-wrap gap-1.5">
          {MARKET_EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => !isStreaming && setMarket(ex)}
              disabled={isStreaming}
              className="text-xs px-2.5 py-1 rounded-full border border-line text-ink-secondary hover:border-ink-secondary hover:text-ink transition-colors disabled:opacity-40"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      {/* Research status + results */}
      {(isStreaming || hasResult || error) && (
        <div className="grid lg:grid-cols-[260px_1fr] gap-4">
          {/* Left panel — search activity */}
          <div className="space-y-3">
            {/* Live search badge */}
            {isLiveSearch !== null && (
              <div
                className="card-sm px-3 py-2 flex items-center gap-2"
                style={{ borderLeft: "3px solid #34C759" }}
              >
                <span className="text-base">🌐</span>
                <div>
                  <p className="text-xs font-semibold text-ink">Reading live pages</p>
                  <p className="text-[10px] text-ink-tertiary leading-tight">
                    Fetching real competitor websites right now
                  </p>
                </div>
              </div>
            )}

            {/* Search queries */}
            {searches.length > 0 && (
              <div className="card-sm p-3">
                <p className="label mb-2">Competitor pages read</p>
                <div className="space-y-1.5">
                  {searches.map((s, i) => (
                    <div
                      key={i}
                      className="fade-up-sm flex items-start gap-1.5 text-xs text-ink-secondary"
                    >
                      <span className="text-ink-tertiary shrink-0 mt-0.5">
                        {isStreaming && i === searches.length - 1 ? "⊙" : "✓"}
                      </span>
                      <span className="leading-snug">{s}</span>
                    </div>
                  ))}
                  {isStreaming && searches.length > 0 && (
                    <div className="flex items-center gap-1.5 text-xs text-ink-tertiary">
                      <span className="flex gap-0.5">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className="typing-dot w-1 h-1 rounded-full bg-ink-tertiary"
                            style={{ animationDelay: `${i * 0.15}s` }}
                          />
                        ))}
                      </span>
                      <span>searching…</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Loading state before first search */}
            {isStreaming && searches.length === 0 && isLiveSearch === null && (
              <div className="card-sm p-3">
                <div className="flex items-center gap-2 text-xs text-ink-secondary">
                  <span className="flex gap-0.5">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="typing-dot w-1.5 h-1.5 rounded-full bg-ink-tertiary"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </span>
                  <span>Starting market audit…</span>
                </div>
              </div>
            )}
          </div>

          {/* Right panel — audit report */}
          <div ref={scrollRef} className="card p-5 overflow-y-auto" style={{ maxHeight: "70vh" }}>
            {error && (
              <p className="text-sm text-kill p-3 bg-kill/10 rounded-xl">{error}</p>
            )}
            {resultMsg && resultMsg.content ? (
              <Markdown text={resultMsg.content} />
            ) : (
              isStreaming && (
                <div className="flex items-center gap-2 text-sm text-ink-tertiary min-h-[120px]">
                  <span className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="typing-dot w-1.5 h-1.5 rounded-full bg-ink-tertiary"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </span>
                  <span>
                    {searches.length > 0
                      ? `Synthesizing ${searches.length} search${searches.length === 1 ? "" : "es"}…`
                      : "Preparing audit…"}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Initial empty state */}
      {!isStreaming && !hasResult && !error && (
        <div className="card p-8 text-center">
          <p className="text-4xl mb-4">{meta.glyph}</p>
          <h3 className="text-xl font-semibold text-ink mb-2">Market Audit</h3>
          <p className="text-sm text-ink-secondary max-w-md mx-auto leading-relaxed">
            {meta.blurb}
          </p>
          <div className="mt-5 text-xs text-ink-tertiary">
            Name your market above and hit Audit market.
          </div>
        </div>
      )}
    </div>
  );
}
