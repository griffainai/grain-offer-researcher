"use client";
import { useEffect, useRef, useState } from "react";
import { MODES, MODE_ORDER, type ModeId } from "@/lib/brand";
import { useResearchStream } from "@/lib/useResearchStream";
import { Markdown } from "./Markdown";

export function Chat() {
  const [mode, setMode] = useState<ModeId>("scratch");
  const { messages, isStreaming, error, send, reset } = useResearchStream();
  const [input, setInput] = useState(MODES["scratch"].starter);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const meta = MODES[mode];

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages]);

  function pickMode(m: ModeId) {
    if (isStreaming) return;
    setMode(m);
    if (messages.length === 0) setInput(MODES[m].starter);
  }

  function submit() {
    if (!input.trim() || isStreaming) return;
    send(input, mode);
    setInput("");
  }

  function onKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
      <div className="card flex flex-col overflow-hidden" style={{ height: "min(72vh, 640px)" }}>
        {/* Mode pills */}
        <div className="px-4 py-3 border-b border-line bg-bg-surface">
          <p className="text-xs text-ink-tertiary mb-2.5 font-medium">Choose your mode</p>
          <div className="flex flex-wrap gap-2">
            {MODE_ORDER.map(m => {
              const mm = MODES[m];
              const on = m === mode;
              return (
                <button key={m} onClick={() => pickMode(m)} disabled={isStreaming}
                  className="mode-chip border transition-all disabled:opacity-50 text-sm"
                  style={{
                    background: on ? mm.bgHex : "transparent",
                    color: on ? mm.hex : "#6E6E73",
                    borderColor: on ? mm.borderHex : "#E5E5EA",
                    boxShadow: on ? `0 0 0 3px ${mm.bgHex}` : "none",
                    fontWeight: on ? 600 : 400,
                  }}>
                  <span>{mm.glyph}</span>
                  <span>{mm.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.length === 0 ? (
            <EmptyState mode={mode} />
          ) : (
            messages.map((m, i) => (
              <Bubble key={i} role={m.role} content={m.content}
                streaming={isStreaming && i === messages.length - 1 && m.role === "assistant"}
                hex={meta.hex} bgHex={meta.bgHex} />
            ))
          )}
          {error && <p className="text-sm text-kill p-3 bg-kill/10 rounded-xl">{error}</p>}
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-line bg-bg-surface">
          <div className="flex gap-2 items-end">
            <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKey}
              placeholder={meta.placeholder} rows={2} disabled={isStreaming}
              className="flex-1 text-sm bg-bg border border-line rounded-xl px-3 py-2.5 resize-none focus:outline-none focus:border-line-focus disabled:opacity-50 text-ink placeholder:text-ink-tertiary transition-colors"
              style={{ boxShadow: "none" }} />
            <button onClick={submit} disabled={isStreaming || !input.trim()}
              className="btn text-white rounded-xl px-4 py-2.5 text-sm font-medium self-stretch disabled:opacity-30 transition-all"
              style={{ background: meta.hex, boxShadow: `0 2px 8px ${meta.hex}40` }}>
              {isStreaming ? "···" : "→"}
            </button>
          </div>
          {messages.length > 0 && (
            <button onClick={reset} disabled={isStreaming} className="mt-2 text-xs text-ink-tertiary hover:text-ink-secondary transition-colors">
              ↺ New investigation
            </button>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="hidden lg:flex flex-col gap-3">
        <div className="card-sm p-4">
          <p className="text-xs font-semibold text-ink-tertiary uppercase tracking-wider mb-1" style={{ letterSpacing: "0.06em" }}>{meta.glyph} {meta.label}</p>
          <p className="text-sm text-ink-secondary leading-relaxed">{meta.blurb}</p>
        </div>
        <div className="card-sm p-4 space-y-2">
          <p className="text-xs font-semibold text-ink-tertiary uppercase" style={{ letterSpacing: "0.06em" }}>Source tiers</p>
          {[
            { code: "T1", label: "Verified", desc: "State plainly", color: "#1A7A35", bg: "#E8F9ED" },
            { code: "T2", label: "Decaying", desc: "Date it, re-check", color: "#B86800", bg: "#FFF3E0" },
            { code: "T3", label: "Contested", desc: "Withhold until confirmed", color: "#C0201A", bg: "#FFEEED" },
            { code: "T4", label: "Inferred", desc: "Label every guess", color: "#7D2FAA", bg: "#F5EAFB" },
          ].map(t => (
            <div key={t.code} className="flex items-start gap-2">
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 mt-0.5" style={{ background: t.bg, color: t.color }}>{t.code}</span>
              <div>
                <span className="text-xs font-medium text-ink">{t.label} — </span>
                <span className="text-xs text-ink-secondary">{t.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Bubble({ role, content, streaming, hex, bgHex }: { role: string; content: string; streaming: boolean; hex: string; bgHex: string }) {
  const isRes = role === "assistant";
  return (
    <div className={`flex ${isRes ? "justify-start" : "justify-end"}`}>
      <div className="max-w-[88%] rounded-2xl px-4 py-3"
        style={isRes
          ? { background: "#FFFFFF", border: "1px solid #E5E5EA", boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.05)" }
          : { background: bgHex, border: `1px solid ${hex}40` }}>
        <p className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: isRes ? hex : hex }}>
          {isRes ? "Grain" : "You"}
        </p>
        {isRes ? (
          <>
            <Markdown text={content} />
            {streaming && !content && <span className="flex gap-1 items-center h-5">{[0,1,2].map(i => <span key={i} className="typing-dot w-1.5 h-1.5 rounded-full bg-ink-tertiary" style={{ animationDelay: `${i*0.15}s` }} />)}</span>}
          </>
        ) : (
          <p className="text-sm text-ink leading-relaxed whitespace-pre-wrap">{content}</p>
        )}
      </div>
    </div>
  );
}

function EmptyState({ mode }: { mode: ModeId }) {
  const meta = MODES[mode];
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-6 min-h-[280px]">
      <div className="text-4xl mb-4">{meta.glyph}</div>
      <h3 className="text-xl font-semibold text-ink mb-1">{meta.label}</h3>
      <p className="text-sm text-ink-secondary mb-5 max-w-xs leading-relaxed">{meta.blurb}</p>
      <span className="text-xs text-ink-tertiary px-3 py-1.5 bg-bg rounded-pill border border-line">{meta.subtitle}</span>
    </div>
  );
}
