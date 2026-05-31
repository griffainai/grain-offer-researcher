"use client";
import React from "react";

/* Tier-pill regex */
const TIER_RE = /\((T[1-4])\b([^)]*)\)/g;
const TIER_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  T1: { bg: "#E8F9ED", text: "#1A7A35", label: "Verified" },
  T2: { bg: "#FFF3E0", text: "#B86800", label: "Decaying" },
  T3: { bg: "#FFEEED", text: "#C0201A", label: "Contested" },
  T4: { bg: "#F5EAFB", text: "#7D2FAA", label: "Inferred" },
};

function renderTiers(text: string, key: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let last = 0, i = 0, m: RegExpExecArray | null;
  TIER_RE.lastIndex = 0;
  while ((m = TIER_RE.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const c = TIER_COLORS[m[1]];
    if (c) out.push(
      <span key={`${key}-t${i++}`} className="tier-pop inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full mx-0.5" style={{ background: c.bg, color: c.text }} title={`${m[1]} — ${c.label}`}>
        {m[1]}<span className="font-normal opacity-80">{m[2].replace(/^[\s—–:.-]+/, " ").trimEnd()}</span>
      </span>
    );
    else out.push(m[0]);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function renderInline(text: string, key: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`]+`)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) return <strong key={`${key}-b${i}`} className="font-semibold text-ink">{renderTiers(p.slice(2, -2), `${key}-b${i}`)}</strong>;
    if (p.length > 2 && p.startsWith("*") && p.endsWith("*")) return <em key={`${key}-i${i}`}>{renderTiers(p.slice(1, -1), `${key}-i${i}`)}</em>;
    if (p.startsWith("`") && p.endsWith("`")) return <code key={`${key}-c${i}`} className="font-mono text-[0.8em] bg-bg px-1.5 py-0.5 rounded-md text-ink-secondary">{p.slice(1, -1)}</code>;
    return <React.Fragment key={`${key}-x${i}`}>{renderTiers(p, `${key}-x${i}`)}</React.Fragment>;
  });
}

export function Markdown({ text }: { text: string }) {
  const lines = text.split("\n");
  const blocks: React.ReactNode[] = [];
  let listBuf: string[] = [];
  let k = 0;

  function flushList() {
    if (!listBuf.length) return;
    const items = [...listBuf]; listBuf = [];
    blocks.push(
      <ul key={`ul-${k++}`} className="my-2 space-y-1.5 pl-1">
        {items.map((it, idx) => (
          <li key={idx} className="flex gap-2 text-sm leading-relaxed text-ink">
            <span className="text-ink-tertiary mt-0.5 shrink-0">•</span>
            <span>{renderInline(it, `li-${k}-${idx}`)}</span>
          </li>
        ))}
      </ul>
    );
  }

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (/^\s*[-*•]\s+/.test(line) || /^\s*\d+\.\s+/.test(line)) { listBuf.push(line.replace(/^\s*([-*•]|\d+\.)\s+/, "")); continue; }
    flushList();
    if (!line.trim()) { blocks.push(<div key={`sp-${k++}`} className="h-2" />); continue; }

    const h = line.match(/^(#{1,4})\s+(.*)/);
    if (h) { blocks.push(<h3 key={`h-${k++}`} className="font-semibold text-ink mt-3 mb-1 text-base">{renderInline(h[2].replace(/\*\*/g, ""), `h-${k}`)}</h3>); continue; }

    const bh = line.match(/^\*\*(.+?)\*\*:?\s*$/);
    if (bh) {
      const txt = bh[1];
      const isKill = /KILL|WOULD KILL|KILL-?CONDITION/i.test(txt);
      const isGap = /POSITIONING GAP|GAP/i.test(txt);
      blocks.push(
        <div key={`bh-${k++}`} className={`mt-3 mb-1 text-xs font-semibold uppercase tracking-wider ${isKill ? "kill-slide" : ""}`}
          style={{ color: isKill ? "#FF3B30" : isGap ? "#FF9F0A" : "#1D1D1F", letterSpacing: "0.06em" }}>
          {txt}
        </div>
      );
      continue;
    }

    if (line.trim() === "---") { blocks.push(<hr key={`hr-${k++}`} className="my-3 border-line" />); continue; }

    blocks.push(<p key={`p-${k++}`} className="text-sm leading-relaxed text-ink text-left">{renderInline(line, `p-${k}`)}</p>);
  }
  flushList();
  return <div className="space-y-0.5 text-left">{blocks}</div>;
}
