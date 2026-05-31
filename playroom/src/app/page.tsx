"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { LiveDuel } from "@/components/LiveDuel";
import { Chat } from "@/components/Chat";
import { BRAND } from "@/lib/brand";
import { useTypewriter } from "@/lib/useTypewriter";

const SCENES = [
  { dur: 4500 },
  { dur: 7500 },
  { dur: 8000 },
  { dur: 8000 },
  { dur: 7500 },
  { dur: 99999 },
];
const N = SCENES.length;

export default function Home() {
  const [scene, setScene] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const go = useCallback((n: number) => setScene(Math.max(0, Math.min(N - 1, n))), []);

  useEffect(() => {
    if (paused || scene >= N - 1) return;
    timerRef.current = window.setTimeout(() => go(scene + 1), SCENES[scene].dur);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [scene, paused, go]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") go(scene + 1);
      else if (e.key === "ArrowLeft") go(scene - 1);
      else if (e.key === " ") { e.preventDefault(); setPaused(p => !p); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scene, go]);

  const isLast = scene === N - 1;

  return (
    <div className="min-h-screen flex flex-col">
      <Nav active="home" />

      {/* Demo hero — slides */}
      <section className="flex-1 flex flex-col" style={{ minHeight: "calc(100vh - 3.5rem)" }}>
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div key={scene} className="fade-up w-full max-w-3xl">
            {scene === 0 && <S0 />}
            {scene === 1 && <S1 />}
            {scene === 2 && <S2 />}
            {scene === 3 && <S3 />}
            {scene === 4 && <S4 />}
            {scene === 5 && <S5 />}
          </div>
        </main>

        {/* Controls */}
        <div className="border-t border-line bg-bg-surface/90 backdrop-blur-sm px-4 py-3 flex items-center justify-between sticky bottom-0 z-10">
          <div className="flex items-center gap-2">
            {Array.from({ length: N }).map((_, i) => (
              <button key={i} onClick={() => go(i)}
                className={`h-1.5 rounded-full transition-all ${i === scene ? "w-8 bg-ink dot-active" : i < scene ? "w-2 bg-ink-secondary" : "w-2 bg-line-strong"}`} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => go(scene - 1)} disabled={scene === 0} className="btn-ghost px-3 py-1.5 text-xs rounded-lg disabled:opacity-30">‹ Back</button>
            {!isLast
              ? <button onClick={() => setPaused(p => !p)} className="btn-ghost px-3 py-1.5 text-xs rounded-lg">{paused ? "▶ Play" : "⏸ Pause"}</button>
              : <button onClick={() => { setPaused(false); go(0); }} className="btn-primary px-3 py-1.5 text-xs rounded-lg">↻ Replay</button>}
            {!isLast && <button onClick={() => go(scene + 1)} className="btn-ghost px-3 py-1.5 text-xs rounded-lg">Next ›</button>}
          </div>
        </div>
      </section>

      {/* Duel */}
      <section id="duel" className="bg-white border-t border-line">
        <div className="container-grain py-14">
          <p className="label mb-2">The proof · live</p>
          <h2 className="text-3xl font-semibold text-ink tracking-tight mb-2">Same offer. Two approaches.</h2>
          <p className="text-ink-secondary mb-8 max-w-2xl">Generic AI validates and gives frameworks. Grain investigates and delivers a verdict — with tiered sources and three findings that would change the call. See the difference live.</p>
          <LiveDuel />
        </div>
      </section>

      {/* Try it */}
      <section id="try" className="border-t border-line">
        <div className="container-grain py-14">
          <p className="label mb-2">Try it yourself</p>
          <h2 className="text-3xl font-semibold text-ink tracking-tight mb-2">Choose your mode. Name your market.</h2>
          <p className="text-ink-secondary mb-8 max-w-2xl">Building from scratch or sharpening what you have — Grain runs the right investigation and returns a falsifiable thesis, not advice.</p>
          <Chat />
        </div>
      </section>

      {/* What you get */}
      <section className="bg-white border-t border-line">
        <div className="container-grain py-14">
          <p className="label mb-2">The output</p>
          <h2 className="text-3xl font-semibold text-ink tracking-tight mb-8">A verdict you can argue with.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { n: "01", t: "The verdict", d: "Build this / rebuild the positioning / your constraint is X. A real call, not a hedge.", col: "#0071E3" },
              { n: "02", t: "The positioning gap", d: "What the market is missing — with a source tier, not a hunch.", col: "#FF9F0A" },
              { n: "03", t: "The mechanism", d: "Named, specific, explains why past attempts failed and why this is different.", col: "#1D1D1F" },
              { n: "04", t: "The avatar", d: "Purchasing power verified. Urgency confirmed. Or it's labeled as inferred.", col: "#34C759" },
              { n: "05", t: "Three kill-conditions", d: "The findings that would flip the verdict. No summarizer gives you this.", col: "#FF3B30" },
              { n: "06", t: "The next question", d: "One specific thing to validate, with exactly how to validate it.", col: "#AF52DE" },
            ].map(c => (
              <div key={c.n} className="card-sm p-5">
                <span className="text-2xl font-bold mb-2 block" style={{ color: c.col }}>{c.n}</span>
                <p className="font-semibold text-ink mb-1">{c.t}</p>
                <p className="text-sm text-ink-secondary leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink border-t border-line text-center">
        <div className="container-grain py-16">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-bg-surface mb-6 float"><span className="text-xl font-bold text-ink">G</span></div>
          <h2 className="text-3xl font-semibold text-bg-surface tracking-tight mb-3">{BRAND.tagline}</h2>
          <p className="text-bg-surface/60 max-w-lg mx-auto mb-8">Stop asking for advice. Start running the investigation.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#duel" className="px-6 py-3 rounded-xl bg-bg-surface text-ink font-semibold text-sm hover:opacity-90 transition-opacity" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>See the comparison →</a>
            <Link href="/try" className="px-6 py-3 rounded-xl text-bg-surface font-semibold text-sm border border-bg-surface/30 hover:bg-bg-surface/10 transition-colors no-underline">Open the workspace</Link>
          </div>
        </div>
      </section>

      <footer className="bg-ink text-bg-surface/40 border-t border-bg-surface/10">
        <div className="container-grain py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <span className="font-medium text-bg-surface/70">Grain — {BRAND.category}</span>
          <span>Built on Interpretable Context Methodology · Comp #6 — The Researcher · EDUBA</span>
        </div>
      </footer>
    </div>
  );
}

/* ---- Scenes ---- */
function S0() {
  return (
    <div className="text-center stagger">
      <div style={{ animationDelay: "0ms" }} className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-ink text-bg-surface mb-6 float">
        <span className="text-3xl font-bold">G</span>
      </div>
      <h1 style={{ animationDelay: "150ms" }} className="text-6xl font-semibold text-ink tracking-tight mb-4">{BRAND.wordmark}</h1>
      <p style={{ animationDelay: "350ms" }} className="text-2xl text-ink-secondary font-medium mb-3">{BRAND.tagline}</p>
      <p style={{ animationDelay: "600ms" }} className="text-base text-ink-tertiary max-w-md mx-auto leading-relaxed">An AI that investigates your market and tells you what to build — and what's wrong with what you have.</p>
    </div>
  );
}

function S1() {
  const { out, done } = useTypewriter("Most business advice is a framework. What you need is a verdict.", { speed: 30 });
  return (
    <div className="text-center">
      <p className="label mb-4">The problem</p>
      <h2 className={`text-4xl font-semibold text-ink tracking-tight max-w-2xl mx-auto ${!done ? "cursor" : ""}`}>{out}</h2>
      <div className="stagger mt-10 text-ink-secondary text-lg max-w-xl mx-auto space-y-3">
        <p style={{ animationDelay: "2500ms" }}>Ask a generic AI to help with your offer and it gives you a list. "Niche down. Name your mechanism. Price against value." True. Useless.</p>
        <p style={{ animationDelay: "3300ms" }} className="font-medium text-ink">A verdict says: *this* offer, for *this* person, via *this* mechanism — and here's what would change my mind.</p>
      </div>
    </div>
  );
}

function S2() {
  return (
    <div className="stagger">
      <div style={{ animationDelay: "0ms" }} className="label mb-3 text-center">What generic advice looks like</div>
      <div style={{ animationDelay: "300ms" }} className="card p-5 mb-4">
        <p className="text-xs font-semibold text-ink-tertiary mb-1">You said</p>
        <p className="text-sm text-ink font-mono bg-bg px-3 py-2 rounded-lg">&ldquo;Help me build my offer. I do business coaching.&rdquo;</p>
      </div>
      <div style={{ animationDelay: "900ms" }} className="card p-5">
        <p className="text-xs font-semibold text-ink-tertiary mb-2">Generic AI said</p>
        <p className="text-sm text-ink leading-relaxed mb-3">Great! Here&apos;s a framework for building a strong offer: First, identify your ideal client. Second, define the transformation. Third, name your mechanism. Fourth, price against value...</p>
        <div className="space-y-1.5 pt-3 border-t border-line">
          {["No sophistication check — what stage is this market in?", "No avatar verification — can they actually pay?", "No verdict — just a framework. Still don't know what to do."].map((f, i) => (
            <div key={i} className="flex gap-2 text-xs text-ink-secondary"><span className="text-red-400 shrink-0">✗</span>{f}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function S3() {
  const { out, done } = useTypewriter("Two modes. One for building. One for fixing.", { speed: 32 });
  return (
    <div className="text-center">
      <p className="label mb-4">How Grain works</p>
      <h2 className={`text-4xl font-semibold text-ink tracking-tight mb-8 ${!done ? "cursor" : ""}`}>{out}</h2>
      <div className="stagger grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
        {[
          { glyph: "✦", label: "Build from scratch", hex: "#0071E3", bg: "#E8F1FD", body: "No offer yet. Grain checks the market, finds who has purchasing power and urgency, names the mechanism, and tells you whether the economics work." },
          { glyph: "◈", label: "Sharpen what you have", hex: "#34C759", bg: "#E8F9ED", body: "Offer exists, something's breaking. Grain diagnoses the root cause — conversion, pricing, churn, or margin — and tells you what needs to change." },
        ].map(m => (
          <div key={m.label} className="rounded-2xl p-5 border" style={{ background: m.bg, borderColor: `${m.hex}30` }}>
            <span className="text-2xl mb-2 block" style={{ color: m.hex }}>{m.glyph}</span>
            <p className="font-semibold text-ink mb-1">{m.label}</p>
            <p className="text-sm text-ink-secondary leading-relaxed">{m.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function S4() {
  const { out, done } = useTypewriter("It tiers every claim before trusting it.", { speed: 32 });
  return (
    <div className="text-center">
      <p className="label mb-4">The domain edge</p>
      <h2 className={`text-4xl font-semibold text-ink tracking-tight mb-3 ${!done ? "cursor" : ""}`}>{out}</h2>
      <p className="text-ink-secondary mb-8">Offer research is full of bad data — unverified market sizes, cherry-picked testimonials, &ldquo;underserved&rdquo; niches that aren&apos;t.</p>
      <div className="stagger grid sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
        {[
          { code: "T1", label: "Verified", rule: "State it plainly", eg: "Your own sales data", col: "#1A7A35", bg: "#E8F9ED" },
          { code: "T2", label: "Decaying", rule: "Date it and re-check", eg: "Market trend reports", col: "#B86800", bg: "#FFF3E0" },
          { code: "T3", label: "Contested", rule: "Withhold until confirmed", eg: "\"This niche is underserved\"", col: "#C0201A", bg: "#FFEEED" },
          { code: "T4", label: "Inferred", rule: "Label every guess", eg: "Reconstructed positioning", col: "#7D2FAA", bg: "#F5EAFB" },
        ].map((t, i) => (
          <div key={t.code} style={{ animationDelay: `${i * 400}ms`, background: t.bg, border: `1px solid ${t.col}30` }} className="rounded-xl p-3">
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full mb-2 inline-block" style={{ background: "white", color: t.col }}>{t.code}</span>
            <p className="font-semibold text-sm text-ink">{t.label}</p>
            <p className="text-xs text-ink-secondary mt-0.5">{t.rule}</p>
            <p className="text-[10px] text-ink-tertiary italic mt-1">{t.eg}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function S5() {
  return (
    <div className="text-center stagger">
      <div style={{ animationDelay: "0ms" }} className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-ink text-bg-surface mb-5 float">
        <span className="text-2xl font-bold">G</span>
      </div>
      <h2 style={{ animationDelay: "150ms" }} className="text-4xl font-semibold text-ink tracking-tight mb-3">{BRAND.tagline}</h2>
      <p style={{ animationDelay: "400ms" }} className="text-ink-secondary max-w-lg mx-auto mb-8">Watch it go head-to-head with generic advice — same offer, same prompt. Or jump straight to the workspace.</p>
      <div style={{ animationDelay: "650ms" }} className="flex flex-wrap justify-center gap-3">
        <a href="#duel" className="btn-primary px-6 py-3 rounded-xl text-sm">See the comparison ↓</a>
        <Link href="/try" className="btn px-6 py-3 rounded-xl text-sm border border-line text-ink hover:bg-bg-hover no-underline">Open the workspace →</Link>
      </div>
    </div>
  );
}
