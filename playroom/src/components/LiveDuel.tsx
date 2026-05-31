"use client";
import { useState } from "react";
import { useResearchStream } from "@/lib/useResearchStream";
import { Markdown } from "./Markdown";

const SCENARIOS = [
  {
    id: "coach",
    label: "Business coach",
    sub: "\"I help entrepreneurs scale their business\"",
    genericText: "You're in a fast-growing, high-demand industry. Business coaching is in high demand as entrepreneurs seek expert guidance. Your offer shows great potential. I'd recommend focusing on your core transformation, defining your ideal client avatar, and creating a clear value proposition. Would you like me to help you build a framework for your coaching offer?",
    genericFlaws: ["Horoscope — applies to every coach everywhere", "No sophistication check — what stage is this market in?", "No mechanism — what makes this actually different?"],
    prompt: "Mode: scratch. Market: business coaching for entrepreneurs. What I believe: it's a great market with lots of demand. What I've tried: nothing yet. Give me your read.",
  },
  {
    id: "agency",
    label: "Marketing agency",
    sub: "Serving restaurants, e-comm + dentists at $4K/mo",
    genericText: "Your multi-vertical approach is actually a strength — it shows versatility and lets you serve a broader market. At $4,000/month you're competitively priced. To improve conversions, I'd suggest refining your case studies for each vertical, creating vertical-specific landing pages, and developing a stronger ROI story. Want me to help you build out your agency positioning?",
    genericFlaws: ["Validates no man's land — never flags the structural problem", "No cost-curve check — does growing this require proportional headcount?", "\"Competitively priced\" — priced against what? No comparison done"],
    prompt: "Mode: sharpen. Current offer: full-service marketing for restaurants, e-commerce brands, and dental practices at $4,000/month. Break point: thin margins, working too many hours. Best clients: e-comm brands from referrals. Worst clients: restaurants from cold outreach. What's actually broken?",
  },
  {
    id: "saas",
    label: "SaaS consulting",
    sub: "\"AI agents for mid-size law firms — underserved\"",
    genericText: "The legal tech market is ripe for disruption, and your focus on AI agents for law firms puts you in an exciting position. Mid-size law firms are typically underserved by enterprise solutions but too large for generic tools. I'd recommend building case studies around specific use cases like document review, client intake, or billing automation. What's your current go-to-market strategy?",
    genericFlaws: ["\"Underserved\" accepted at face value — never challenged for evidence", "No sophistication check on legal tech AI (already very crowded)", "No purchasing-power check — do mid-size law firms actually budget for this?"],
    prompt: "Mode: scratch. Market: AI automation consulting for mid-size law firms (20–100 attorneys). What I believe: this market is completely underserved. What I've tried: nothing yet — idea stage. Give me your read.",
  },
];

export function LiveDuel() {
  const [s, setS] = useState(SCENARIOS[0]);
  const [shown, setShown] = useState(false);
  const { messages, isStreaming, error, send, reset } = useResearchStream();
  const res = messages.find(m => m.role === "assistant");
  const ran = messages.length > 0;

  function run() { if (isStreaming) return; reset(); setShown(true); send(s.prompt, "duel", []); }
  function pick(sc: typeof SCENARIOS[0]) { if (isStreaming) return; setS(sc); setShown(false); reset(); }

  return (
    <div className="space-y-4">
      {/* Picker */}
      <div className="card p-4">
        <p className="label mb-3">1 · Pick an offer to investigate</p>
        <div className="grid sm:grid-cols-3 gap-2 mb-4">
          {SCENARIOS.map(sc => (
            <button key={sc.id} onClick={() => pick(sc)} disabled={isStreaming}
              className="text-left px-3 py-2.5 rounded-xl border transition-all disabled:opacity-50 hover:border-ink-secondary"
              style={{ background: sc.id === s.id ? "#F0F0F5" : "#FFFFFF", borderColor: sc.id === s.id ? "#1D1D1F" : "#E5E5EA", boxShadow: sc.id === s.id ? "0 1px 2px rgba(0,0,0,0.06), 0 3px 10px rgba(0,0,0,0.07)" : "none" }}>
              <p className="font-semibold text-sm text-ink">{sc.label}</p>
              <p className="text-xs text-ink-tertiary mt-0.5 italic">{sc.sub}</p>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <p className="label">2 ·</p>
          <button onClick={run} disabled={isStreaming}
            className="btn-primary px-5 py-2.5 rounded-xl text-sm disabled:opacity-40">
            {isStreaming ? "Researching···" : ran ? "↻ Run again" : "Run the comparison"}
          </button>
          <p className="text-xs text-ink-tertiary">Same prompt. Generic advice vs. an actual verdict.</p>
        </div>
      </div>

      {/* Two columns */}
      <div className="grid md:grid-cols-2 gap-4 items-start">
        {/* Generic */}
        <div className="bg-bg-surface rounded-2xl border border-line overflow-hidden" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.05)" }}>
          <div className="px-4 py-3 bg-bg border-b border-line flex items-center justify-between">
            <span className="text-xs font-semibold text-ink-secondary">Generic AI</span>
            <span className="text-[10px] text-ink-tertiary uppercase tracking-wider">Confident · Unverified</span>
          </div>
          <div className="p-4 bg-white min-h-[300px]">
            {shown ? (
              <div>
                <p className="text-sm text-ink leading-relaxed mb-4">{s.genericText}</p>
                <div className="border-t border-line pt-3 space-y-1.5">
                  {s.genericFlaws.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-ink-secondary">
                      <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : <PlaceholderMsg text="Generic, confident, unverified — it validates instead of investigating. Hit run." />}
          </div>
        </div>

        {/* Grain */}
        <div className="bg-bg-surface rounded-2xl overflow-hidden" style={{ border: "1px solid #1D1D1F", boxShadow: "0 2px 4px rgba(0,0,0,0.06), 0 6px 18px rgba(0,0,0,0.09)" }}>
          <div className="px-4 py-3 bg-ink border-b border-ink flex items-center justify-between">
            <span className="text-xs font-semibold text-bg-surface">Grain — the Researcher</span>
            <span className="text-[10px] text-bg-surface/60 uppercase tracking-wider">Tiered · Falsifiable · Honest</span>
          </div>
          <div className="p-4 bg-white min-h-[300px] max-h-[60vh] overflow-y-auto">
            {!ran ? <PlaceholderMsg text="A real verdict with tiered sources, a named mechanism, and three findings that would change the call. Hit run." /> : (
              <>
                {res && <Markdown text={res.content} />}
                {isStreaming && (!res || !res.content) && <span className="flex gap-1 items-center">{[0,1,2].map(i => <span key={i} className="typing-dot w-1.5 h-1.5 rounded-full bg-ink-tertiary" style={{ animationDelay: `${i*0.15}s` }} />)}</span>}
                {error && <p className="text-sm text-kill mt-2">{error}</p>}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaceholderMsg({ text }: { text: string }) {
  return <div className="h-full flex items-center justify-center min-h-[260px]"><p className="text-sm text-ink-tertiary italic max-w-xs text-center leading-relaxed">{text}</p></div>;
}
