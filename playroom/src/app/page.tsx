"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTypewriter } from "@/lib/useTypewriter";
import { GrainMark } from "@/components/Logo";

/* ================================================================
   GRAIN — Full movie landing page
   Every section is a fullscreen mini-presentation (3-4 scenes,
   ~5s each, ~15 seconds total). Same animation system as the
   60-second hero demo. The whole page is one continuous movie.
   ================================================================ */

const T = {
  bg: "#FAFAF7", surface: "#FFFFFF", fg: "#0D0D0E",
  fgSoft: "#3D3D3F", fgMuted: "#6E6E73", fgTertiary: "#AEAEB2",
  border: "#E8E8EC",
  accent: "#4F46E5", accentSoft: "#EEF2FF", accentDeep: "#3730A3",
  amber: "#B45309", amberBg: "#FFFBEB",
  kill: "#B91C1C", killBg: "#FEF2F2",
  infer: "#7C3AED", inferBg: "#F5F3FF",
  serif: "'Newsreader', Georgia, 'Times New Roman', serif",
  sans: "'Inter', system-ui, sans-serif",
  mono: "'IBM Plex Mono', 'Fira Code', monospace",
};

/* ── Shared hooks ── */
function useInView(threshold = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── MiniPresentation: the engine for every section ── */
interface MiniPresentationProps {
  id: string;
  scenes: React.ComponentType[];
  sceneDuration?: number;   // ms per scene, default 5000
  bg?: string;
  nextId?: string;           // ID of next section to scroll to
  nextLabel?: string;
}

function MiniPresentation({
  id, scenes, sceneDuration = 5000, bg = T.bg, nextId, nextLabel = "Continue ↓",
}: MiniPresentationProps) {
  const { ref, inView } = useInView(0.2);
  const [scene, setScene] = useState(0);
  const [started, setStarted] = useState(false);
  const timer = useRef<number | null>(null);
  const N = scenes.length;
  const isLast = scene === N - 1;

  useEffect(() => { if (inView && !started) setStarted(true); }, [inView]);

  useEffect(() => {
    if (!started || isLast) return;
    timer.current = window.setTimeout(() => setScene(s => s + 1), sceneDuration);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [scene, started, isLast, sceneDuration]);

  const SceneComp = scenes[scene];

  function scrollToNext() {
    if (!nextId) return;
    document.getElementById(nextId)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id={id}
      ref={ref}
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: bg, borderTop: `1px solid ${T.border}` }}
    >
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 32px" }}>
        {started ? (
          <div
            key={scene}
            style={{ width: "100%", maxWidth: 900, animation: "sceneUp .55s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            <SceneComp />
          </div>
        ) : (
          <div style={{ width: 32, height: 32, opacity: 0 }} />
        )}
      </main>

      {/* Mini controls bar — same pattern as hero */}
      <div style={{ borderTop: `1px solid ${T.border}`, padding: "13px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(250,250,247,.9)", backdropFilter: "blur(8px)", position: "sticky", bottom: 0, zIndex: 5 }}>
        {/* Progress dots */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {Array.from({ length: N }).map((_, i) => (
            <button
              key={i}
              onClick={() => { if (started) setScene(i); }}
              style={{ height: 6, borderRadius: 999, border: "none", cursor: "pointer", padding: 0, transition: "all .3s", background: i === scene ? T.fg : i < scene ? T.fgTertiary : T.border, width: i === scene ? 28 : 8 }}
            />
          ))}
        </div>
        {/* Nav buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <MiniCtrl disabled={!started || scene === 0} onClick={() => setScene(s => Math.max(0, s - 1))}>‹ Back</MiniCtrl>
          {!isLast ? (
            <MiniCtrl onClick={() => setScene(s => Math.min(N - 1, s + 1))} primary>Next ›</MiniCtrl>
          ) : nextId ? (
            <button
              onClick={scrollToNext}
              style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 700, padding: "8px 18px", borderRadius: 9, border: `1px solid ${T.fg}`, background: T.fg, color: "#fff", cursor: "pointer" }}
            >
              {nextLabel} ↓
            </button>
          ) : (
            <Link
              href="/try"
              style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 700, padding: "8px 18px", borderRadius: 9, background: T.accent, color: "#fff", textDecoration: "none" }}
            >
              Start your investigation →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

function MiniCtrl({ children, onClick, disabled, primary }: {
  children: React.ReactNode; onClick: () => void; disabled?: boolean; primary?: boolean;
}) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, padding: "8px 16px", borderRadius: 9, border: `1px solid ${primary ? T.fg : T.border}`, background: primary ? T.fg : "transparent", color: primary ? "#fff" : disabled ? T.border : T.fgSoft, cursor: disabled ? "not-allowed" : "pointer" }}>
      {children}
    </button>
  );
}

/* ================================================================
   HERO DEMO — the original 60-second presentation
   ================================================================ */
const DEMO_DURATIONS = [4500, 7500, 8000, 7500, 8000, 8500, 7500, 99999];
const DEMO_COUNT = DEMO_DURATIONS.length;

function HeroDemo() {
  const [scene, setScene] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);
  const go = useCallback((n: number) => setScene(Math.max(0, Math.min(DEMO_COUNT - 1, n))), []);

  useEffect(() => {
    if (paused) return;
    const dur = scene >= DEMO_COUNT - 1 ? 8000 : DEMO_DURATIONS[scene];
    timer.current = window.setTimeout(() => go(scene >= DEMO_COUNT - 1 ? 0 : scene + 1), dur);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [scene, paused, go]);

  useEffect(() => {
    function k(e: KeyboardEvent) {
      if (e.key === "ArrowRight") go(scene + 1);
      else if (e.key === "ArrowLeft") go(scene - 1);
      else if (e.key === " ") { e.preventDefault(); setPaused(p => !p); }
    }
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [scene, go]);

  const DemoScene = DEMO_SCENES[scene];

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: T.bg }}>
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 32px" }}>
        <div key={scene} style={{ width: "100%", maxWidth: 900, animation: "sceneUp .6s cubic-bezier(0.16,1,0.3,1) both" }}>
          <DemoScene />
        </div>
      </main>
      <div style={{ borderTop: `1px solid ${T.border}`, padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(250,250,247,.9)", backdropFilter: "blur(8px)", position: "sticky", bottom: 0, zIndex: 5 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {Array.from({ length: DEMO_COUNT }).map((_, i) => (
            <span key={i} style={{ height: 6, borderRadius: 999, transition: "all .35s", background: i === scene ? T.fg : i < scene ? T.fgTertiary : T.border, width: i === scene ? 28 : 8 }} />
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <MiniCtrl disabled={scene === 0} onClick={() => go(scene - 1)}>‹ Back</MiniCtrl>
          {scene < DEMO_COUNT - 1
            ? <MiniCtrl onClick={() => setPaused(p => !p)}>{paused ? "▶ Play" : "⏸ Pause"}</MiniCtrl>
            : <MiniCtrl onClick={() => { setPaused(false); go(0); }} primary>↻ Replay</MiniCtrl>}
          {scene < DEMO_COUNT - 1
            ? <MiniCtrl onClick={() => go(scene + 1)} primary>Next ›</MiniCtrl>
            : <button onClick={() => document.getElementById("problem")?.scrollIntoView({ behavior: "smooth" })} style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 700, padding: "8px 18px", borderRadius: 9, border: `1px solid ${T.fg}`, background: T.fg, color: "#fff", cursor: "pointer" }}>Continue ↓</button>}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   MAIN PAGE
   ================================================================ */
export default function Home() {
  return (
    <div style={{ background: T.bg, color: T.fg }}>
      {/* NAV */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(250,250,247,.92)", backdropFilter: "blur(20px) saturate(180%)", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
            <GrainMark size="sm" variant="dark" />
            <span style={{ fontFamily: T.serif, fontSize: 18, fontWeight: 400, fontStyle: "italic", letterSpacing: "-.02em", color: T.fg }}>Grain</span>
          </Link>
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <a href="https://github.com/griffainai/grain-offer-researcher/archive/refs/heads/main.zip"
              style={{ fontFamily: T.sans, fontSize: 13, color: T.fgMuted, padding: "7px 12px", borderRadius: 8, textDecoration: "none", fontWeight: 500, display: "flex", alignItems: "center", gap: 5 }}>
              ↓ Download
            </a>
            <a href="https://github.com/griffainai/grain-offer-researcher" target="_blank" rel="noopener"
              style={{ fontFamily: T.sans, fontSize: 13, color: T.fgMuted, padding: "7px 12px", borderRadius: 8, textDecoration: "none", fontWeight: 500 }}>
              GitHub ↗
            </a>
            <Link href="/brand" style={{ fontFamily: T.sans, fontSize: 13, color: T.fgMuted, padding: "7px 12px", borderRadius: 8, textDecoration: "none", fontWeight: 500 }}>Brand kit</Link>
            <Link href="/try" style={{ marginLeft: 4, fontFamily: T.sans, fontSize: 14, fontWeight: 600, padding: "9px 20px", borderRadius: 10, background: T.fg, color: "#fff", textDecoration: "none", boxShadow: "0 1px 2px rgba(0,0,0,.12), 0 4px 14px rgba(0,0,0,.08)" }}>
              Try free →
            </Link>
          </nav>
        </div>
      </header>

      {/* SECTION 1: Main 60-second demo */}
      <HeroDemo />

      {/* SECTION 2: The Problem (~15s, 3 scenes) */}
      <MiniPresentation
        id="problem"
        scenes={PROBLEM_SCENES}
        sceneDuration={5000}
        nextId="modes"
        nextLabel="Three modes"
      />

      {/* SECTION 3: Three Modes (~15s, 3 scenes) */}
      <MiniPresentation
        id="modes"
        scenes={MODES_SCENES}
        sceneDuration={5000}
        bg="#F7F7F4"
        nextId="output"
        nextLabel="The output"
      />

      {/* SECTION 4: The Output (~20s, 4 scenes) */}
      <MiniPresentation
        id="output"
        scenes={OUTPUT_SCENES}
        sceneDuration={5000}
        nextId="download"
        nextLabel="Download free"
      />

      {/* SECTION 5: Download + Free CTA (~12s, 2 scenes, last section) */}
      <MiniPresentation
        id="download"
        scenes={DOWNLOAD_SCENES}
        sceneDuration={6000}
        bg={T.fg}
      />

      <style>{`
        @keyframes sceneUp { from { opacity:0;transform:translateY(22px); } to { opacity:1;transform:translateY(0); } }
        @keyframes blinkC { 0%,49%{opacity:1}50%,100%{opacity:0} }
        @keyframes marq { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes killDraw { from{opacity:0;transform:translateX(-16px)} to{opacity:1;transform:translateX(0)} }
        .cursor-g::after { content:''; display:inline-block; width:2px; height:1.1em; background:currentColor; margin-left:3px; vertical-align:-0.07em; border-radius:1px; animation:blinkC 1s steps(1) infinite; }
        @keyframes dotPulse { 0%,100%{transform:scale(1);opacity:.6} 50%{transform:scale(1.5);opacity:1} }
      `}</style>
    </div>
  );
}

/* ================================================================
   SECTION 2 — THE PROBLEM (3 scenes × 5s = 15s)
   ================================================================ */

function P1() {
  const { out, done } = useTypewriter("Every founder learns the same frameworks. None of them looked at your specific market.", { speed: 24 });
  return (
    <div style={{ textAlign: "center" }}>
      <Cap center>The gap in every offer framework</Cap>
      <p style={{ font: `400 clamp(36px,5vw,68px)/1.06 ${T.serif}`, letterSpacing: "-.022em", color: T.fg, margin: "0 auto 28px", maxWidth: 760 }} className={!done ? "cursor-g" : ""}>{out}</p>
      <div className="stagger">
        <p style={{ animationDelay: "3400ms", fontSize: 19, color: T.fgSoft, maxWidth: 620, margin: "0 auto 20px", lineHeight: 1.65 }}>
          Hormozi&apos;s value equation is real. Schwartz&apos;s five stages are real. The mechanism is real. But applying them without first checking what your market actually shows right now — that&apos;s advice. Grain runs the investigation first.
        </p>
        <div style={{ animationDelay: "4400ms", display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          {["Sophistication check first", "Then the framework", "Then the verdict"].map(t => (
            <span key={t} style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 600, padding: "6px 14px", borderRadius: 999, border: `1px solid ${T.border}`, color: T.fgMuted, letterSpacing: ".06em" }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function P2() {
  return (
    <div className="stagger">
      <div style={{ animationDelay: "0ms" }}><Cap center>Same prompt. Two responses.</Cap></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 880, margin: "0 auto" }}>
        {/* Generic AI */}
        <div style={{ animationDelay: "300ms", background: T.bg, border: `1px solid ${T.border}`, borderRadius: 18, overflow: "hidden" }}>
          <div style={{ padding: "12px 18px", borderBottom: `1px solid ${T.border}`, background: "#F5F5F3", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, color: T.fgMuted, letterSpacing: ".1em", textTransform: "uppercase" }}>🤖 Generic AI</span>
          </div>
          <div style={{ padding: "20px 22px" }}>
            <p style={{ fontFamily: T.mono, fontSize: 12, color: T.fgMuted, margin: "0 0 14px" }}>&gt; I want to build a better offer</p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: T.fgSoft }}>
              Apply Hormozi&apos;s value equation:{" "}
              <span style={{ background: "rgba(220,38,38,.08)", borderBottom: "2px solid rgba(220,38,38,.4)", padding: "0 2px", borderRadius: 3 }}>raise the dream outcome, increase perceived likelihood.</span>{" "}
              Find your unique mechanism and{" "}
              <span style={{ background: "rgba(107,114,128,.09)", borderBottom: "2px dashed rgba(107,114,128,.4)", padding: "0 2px", borderRadius: 3 }}>niche down until it hurts.</span>
            </p>
          </div>
        </div>
        {/* Grain */}
        <div style={{ animationDelay: "900ms", background: T.surface, border: `1.5px solid ${T.fg}`, borderRadius: 18, overflow: "hidden", boxShadow: "0 4px 8px rgba(0,0,0,0.05), 0 12px 36px rgba(0,0,0,0.10)" }}>
          <div style={{ padding: "12px 18px", borderBottom: `1px solid ${T.border}`, background: T.fg, display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, color: "#fff", letterSpacing: ".1em", textTransform: "uppercase" }}>⊛ Grain</span>
          </div>
          <div style={{ padding: "20px 22px" }}>
            <p style={{ fontFamily: T.mono, fontSize: 12, color: T.fgMuted, margin: "0 0 14px" }}>&gt; I want to build a better offer</p>
            <p style={{ fontSize: 15, lineHeight: 1.68, color: T.fgSoft, marginBottom: 12 }}><strong style={{ color: T.fg }}>Before frameworks — which mode?</strong> Scratch or sharpen?</p>
            <div style={{ padding: "10px 14px", background: T.accentSoft, borderRadius: 10, fontSize: 14, color: T.accentDeep }}>
              And before Hormozi helps you — I check your market&apos;s sophistication stage per Schwartz. If it&apos;s Stage 4, adding another named mechanism saturates. What stage are we in?
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function P3() {
  return (
    <div style={{ textAlign: "center" }}>
      <Cap center>The principle</Cap>
      <h2 style={{ font: `400 clamp(38px,5.5vw,72px)/1.04 ${T.serif}`, letterSpacing: "-.024em", color: T.fg, margin: "0 auto 28px", maxWidth: 700 }}>
        The investigation comes before<br />
        <em style={{ fontStyle: "italic", color: T.fgMuted }}>the framework.</em>
      </h2>
      <p style={{ fontSize: 18, color: T.fgSoft, maxWidth: 580, margin: "0 auto 48px", lineHeight: 1.65 }}>
        That&apos;s the only thing that makes Hormozi, Schwartz, or any framework useful. Grain runs the investigation. You get the verdict.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 28 }}>
        {[
          { n: "1", t: "Market stage", s: "Schwartz check" },
          { n: "2", t: "Avatar power", s: "Can they pay?" },
          { n: "3", t: "The gap", s: "What's unclaimed?" },
          { n: "4", t: "The thesis", s: "Falsifiable verdict" },
        ].map((s, i) => (
          <div key={s.n} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: T.mono, fontSize: 22, fontWeight: 700, color: T.accent, marginBottom: 6 }}>{s.n}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.fg, marginBottom: 4 }}>{s.t}</div>
            <div style={{ fontFamily: T.mono, fontSize: 11, color: T.fgMuted, letterSpacing: ".06em" }}>{s.s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const PROBLEM_SCENES = [P1, P2, P3];

/* ================================================================
   SECTION 3 — THREE MODES (3 scenes × 5s = 15s)
   ================================================================ */

function M1() {
  const { out, done } = useTypewriter("One investigation. Right for your moment.", { speed: 38 });
  return (
    <div style={{ textAlign: "center" }}>
      <Cap center>Three modes</Cap>
      <h2 style={{ font: `400 clamp(38px,5.5vw,72px)/1.04 ${T.serif}`, letterSpacing: "-.022em", color: T.fg, margin: "0 auto 24px" }} className={!done ? "cursor-g" : ""}>{out}</h2>
      <p style={{ fontSize: 19, color: T.fgSoft, maxWidth: 580, margin: "0 auto 40px", lineHeight: 1.65 }}>
        Grain knows Hormozi&apos;s value equation, Schwartz&apos;s five stages, and what makes a mechanism hold in a saturated market. It applies that knowledge to your situation — not the generic case.
      </p>
      <div className="stagger" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, maxWidth: 800, margin: "0 auto" }}>
        {[
          { g: "✦", l: "Build from scratch", d: "No offer yet. Grain finds the gap, the avatar, and the mechanism — in your actual market.", col: T.accent },
          { g: "◈", l: "Sharpen what you have", d: "Something's breaking. Grain uses your best/worst client split (T1 data) to find the root cause.", col: "#059669" },
          { g: "⊛", l: "Market audit — live", d: "Reads real competitor pages right now. Maps Schwartz stage, finds the unclaimed position.", col: T.amber },
        ].map((m, i) => (
          <div key={m.l} style={{ animationDelay: `${2000 + i * 400}ms`, padding: "22px 20px", borderRadius: 16, background: T.surface, border: `1px solid ${T.border}`, textAlign: "left" }}>
            <div style={{ fontSize: 22, color: m.col, marginBottom: 10 }}>{m.g}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: T.fg, marginBottom: 8 }}>{m.l}</div>
            <div style={{ fontSize: 13.5, color: T.fgSoft, lineHeight: 1.55 }}>{m.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function M2() {
  return (
    <div>
      <Cap center>Build from scratch — how it works</Cap>
      <h2 style={{ font: `400 clamp(30px,4vw,54px)/1.08 ${T.serif}`, letterSpacing: "-.02em", color: T.fg, textAlign: "center", margin: "0 auto 32px", maxWidth: 700 }}>
        Gate → Stage check → Purchasing power → Gap → Thesis
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 820, margin: "0 auto" }} className="stagger">
        {[
          { step: "01", title: "Which mode?", body: "Scratch or sharpen. The investigation is completely different. Grain asks before assuming.", delay: "200ms" },
          { step: "02", title: "What stage?", body: "Schwartz check first. If the market is Stage 4 (mechanism saturation), adding another mechanism won't move the needle.", delay: "500ms" },
          { step: "03", title: "Can they pay?", body: "Hormozi's best client has purchasing power. Grain checks whether your target avatar actually does.", delay: "800ms" },
          { step: "04", title: "What's the gap?", body: "The positioning no competitor currently holds. Grain finds it from what the market actually shows — not what you assume.", delay: "1100ms" },
        ].map(s => (
          <div key={s.step} style={{ animationDelay: s.delay, padding: "18px 20px", borderRadius: 14, background: T.surface, border: `1px solid ${T.border}`, display: "flex", gap: 14 }}>
            <span style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 700, color: T.accent, flexShrink: 0, paddingTop: 2 }}>{s.step}</span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: T.fg, marginBottom: 5 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: T.fgSoft, lineHeight: 1.5 }}>{s.body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function M3() {
  return (
    <div>
      <Cap center>Sharpen mode — diagnosing a broken offer</Cap>
      <h2 style={{ font: `400 clamp(30px,4vw,52px)/1.08 ${T.serif}`, letterSpacing: "-.02em", color: T.fg, textAlign: "center", margin: "0 auto 32px", maxWidth: 680 }}>
        Hormozi&apos;s value equation breaks at one of four points. Grain finds which.
      </h2>
      <div style={{ maxWidth: 820, margin: "0 auto" }} className="stagger">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
          {[
            { n: "Dream Outcome", s: "Is the result compelling enough?", ok: true },
            { n: "Likelihood", s: "Do they believe it'll work for them?", ok: false, hot: true },
            { n: "Time Delay", s: "Is the result too far away?", ok: true },
            { n: "Effort", s: "Is it too hard to implement?", ok: true },
          ].map((v, i) => (
            <div key={v.n} style={{ animationDelay: `${i * 300}ms`, padding: "16px 14px", borderRadius: 14, background: v.hot ? T.killBg : T.surface, border: `${v.hot ? "2px" : "1px"} solid ${v.hot ? T.kill : T.border}`, textAlign: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: v.hot ? T.kill : T.fg, marginBottom: 6 }}>{v.n}</div>
              <div style={{ fontSize: 11, color: v.hot ? T.kill : T.fgMuted, lineHeight: 1.4 }}>{v.s}</div>
              {v.hot && <div style={{ marginTop: 8, fontFamily: T.mono, fontSize: 10, fontWeight: 700, color: T.kill }}>⚠ Usually here</div>}
            </div>
          ))}
        </div>
        <div style={{ animationDelay: "1400ms", padding: "18px 22px", background: T.accentSoft, borderRadius: 14, fontSize: 15, lineHeight: 1.65, color: T.accentDeep }}>
          <strong>Price objections almost never mean the price is wrong.</strong> They mean perceived Likelihood is low. Grain diagnoses this from your best/worst client split — the only T1 data point in offer research — and tells you the real root cause.
        </div>
      </div>
    </div>
  );
}

const MODES_SCENES = [M1, M2, M3];

/* ================================================================
   SECTION 4 — THE OUTPUT (4 scenes × 5s = 20s)
   ================================================================ */

function O1() {
  const { out, done } = useTypewriter("A verdict you can argue with.", { speed: 42 });
  return (
    <div style={{ textAlign: "center" }}>
      <Cap center>The output</Cap>
      <h2 style={{ font: `400 clamp(42px,6vw,84px)/1.02 ${T.serif}`, letterSpacing: "-.026em", color: T.fg, margin: "0 0 24px" }} className={!done ? "cursor-g" : ""}>{out}</h2>
      <p style={{ fontSize: 19, color: T.fgSoft, maxWidth: 580, margin: "0 auto 36px", lineHeight: 1.65 }}>
        Six sections. Every one falsifiable. The part no generic AI gives you is section five — the three findings that would prove Grain wrong. That&apos;s the section that makes it a thesis instead of advice.
      </p>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 10 }} className="stagger">
        {["The Verdict", "The Gap", "The Mechanism", "The Ledger", "3 Kill-Conditions", "The Next Q"].map((s, i) => (
          <span key={s} style={{ animationDelay: `${2200 + i * 200}ms`, fontFamily: T.mono, fontSize: 11, fontWeight: 700, padding: "6px 14px", borderRadius: 999, border: `1px solid ${i === 4 ? T.kill : T.border}`, color: i === 4 ? T.kill : T.fgMuted, letterSpacing: ".06em" }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

function O2() {
  return (
    <div>
      <Cap center>The first three sections</Cap>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 720, margin: "0 auto" }} className="stagger">
        {[
          { k: "THE VERDICT", v: "One sentence. Build / rebuild / your constraint is X. A real call — not a hedge and not a list of options.", col: T.fg, delay: "0ms" },
          { k: "THE POSITIONING GAP", v: "What no competitor currently says — based on what Grain actually found in the market, not what you assume.", col: T.accent, delay: "500ms" },
          { k: "THE MECHANISM", v: "Named. Specific. Explains why Hormozi's value equation was breaking AND why this approach is different. Not just a label.", col: T.amber, delay: "1000ms" },
        ].map(r => (
          <div key={r.k} style={{ animationDelay: r.delay, padding: "16px 20px", borderRadius: 14, background: T.surface, border: `1px solid ${T.border}`, display: "flex", gap: 18, alignItems: "baseline" }}>
            <span style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, letterSpacing: ".08em", color: r.col, flexShrink: 0, width: 160 }}>{r.k}</span>
            <span style={{ fontSize: 15, color: T.fgSoft, lineHeight: 1.6 }}>{r.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function O3() {
  return (
    <div>
      <Cap center>The last three sections — including the one no one else gives you</Cap>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 720, margin: "0 auto" }} className="stagger">
        <div style={{ animationDelay: "0ms", padding: "16px 20px", borderRadius: 14, background: T.surface, border: `1px solid ${T.border}`, display: "flex", gap: 18, alignItems: "baseline" }}>
          <span style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, letterSpacing: ".08em", color: T.infer, flexShrink: 0, width: 160 }}>THE LEDGER</span>
          <span style={{ fontSize: 15, color: T.fgSoft, lineHeight: 1.6 }}>Known (T1/T2) / Inferred (T3/T4) / Unknown — kept strictly separate. Grain names every gap and tells you how to close it.</span>
        </div>
        <div style={{ animationDelay: "500ms", padding: "16px 20px", borderRadius: 14, background: T.killBg, border: `2px solid ${T.kill}`, borderLeft: `4px solid ${T.kill}`, display: "flex", gap: 18, alignItems: "baseline" }}>
          <span style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, letterSpacing: ".08em", color: T.kill, flexShrink: 0, width: 160 }}>3 KILL-CONDITIONS</span>
          <span style={{ fontSize: 15, color: T.fgSoft, lineHeight: 1.6 }}><strong style={{ color: T.fg }}>The disconfirming evidence.</strong> If Grain found these, it would change the verdict. This is the section that separates a thesis from a summary.</span>
        </div>
        <div style={{ animationDelay: "1000ms", padding: "16px 20px", borderRadius: 14, background: "#ECFDF5", border: "1px solid #6EE7B7", display: "flex", gap: 18, alignItems: "baseline" }}>
          <span style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, letterSpacing: ".08em", color: "#059669", flexShrink: 0, width: 160 }}>THE NEXT Q</span>
          <span style={{ fontSize: 15, color: T.fgSoft, lineHeight: 1.6 }}>The single highest-leverage thing to validate next — and the specific action to validate it. Not &ldquo;do more research.&rdquo;</span>
        </div>
      </div>
    </div>
  );
}

function O4() {
  return (
    <div style={{ textAlign: "center" }}>
      <Cap center>Grounded in the frameworks that matter</Cap>
      <h2 style={{ font: `400 clamp(34px,4.5vw,62px)/1.06 ${T.serif}`, letterSpacing: "-.022em", color: T.fg, margin: "0 auto 36px", maxWidth: 660 }}>
        Grain doesn&apos;t just know these.<br />
        <em style={{ fontStyle: "italic", color: T.fgMuted }}>It applies them to your market.</em>
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14, maxWidth: 680, margin: "0 auto 32px" }} className="stagger">
        {[
          { name: "Hormozi — $100M Offers", role: "Value equation: Outcome × Likelihood ÷ Time × Effort", delay: "0ms" },
          { name: "Schwartz — Breakthrough Advertising", role: "Five sophistication stages — the market clock", delay: "300ms" },
          { name: "Todd Brown — E5 Method", role: "Mechanism-first positioning in saturated markets", delay: "600ms" },
          { name: "Thiel — Zero to One", role: "Category design and the monopoly frame", delay: "900ms" },
        ].map(f => (
          <div key={f.name} style={{ animationDelay: f.delay, padding: "16px 18px", borderRadius: 14, background: T.surface, border: `1px solid ${T.border}`, textAlign: "left" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.fg, marginBottom: 5 }}>{f.name}</div>
            <div style={{ fontFamily: T.mono, fontSize: 11, color: T.fgMuted, letterSpacing: ".04em", lineHeight: 1.45 }}>{f.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const OUTPUT_SCENES = [O1, O2, O3, O4];

/* ================================================================
   SECTION 5 — DOWNLOAD + FREE CTA (2 scenes × 6s = 12s)
   ================================================================ */

function D1() {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ width: 72, height: 72, borderRadius: 18, background: "#FAFAF7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", boxShadow: "0 20px 60px rgba(250,250,247,.2)" }}>
        <span style={{ fontFamily: T.serif, fontSize: 36, fontWeight: 400, color: "#0D0D0E", fontStyle: "italic" }}>G</span>
      </div>
      <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.35)", marginBottom: 20 }}>Pricing · always</div>
      <h2 style={{ font: `400 clamp(60px,8vw,100px)/1.0 ${T.serif}`, letterSpacing: "-.028em", color: "#fff", margin: "0 0 20px" }}>
        Free.<br />
        <em style={{ fontStyle: "italic", color: "rgba(255,255,255,.4)" }}>Completely.</em>
      </h2>
      <p style={{ fontSize: 20, color: "rgba(255,255,255,.5)", maxWidth: 480, margin: "0 auto", lineHeight: 1.65 }}>
        No account. No credit card. No paid tier behind it. No upsell. Grain is free because investigative offer research should be accessible.
      </p>
    </div>
  );
}

function D2() {
  return (
    <div style={{ textAlign: "center" }}>
      <Cap center style={{ color: "rgba(255,255,255,.35)" }}>How to get it</Cap>
      <h2 style={{ font: `400 clamp(32px,4.5vw,58px)/1.06 ${T.serif}`, letterSpacing: "-.022em", color: "#fff", margin: "0 auto 40px", maxWidth: 580 }}>
        Three ways to start.<br />
        <em style={{ fontStyle: "italic", color: "rgba(255,255,255,.4)" }}>All free.</em>
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, maxWidth: 780, margin: "0 auto 40px" }} className="stagger">
        <div style={{ animationDelay: "0ms", padding: "24px 20px", borderRadius: 18, background: "#fff", color: T.fg }}>
          <div style={{ fontSize: 22, marginBottom: 10 }}>↓</div>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Download ZIP</div>
          <div style={{ fontSize: 13, color: T.fgMuted, lineHeight: 1.55, marginBottom: 16 }}>
            Get the entire repo on your computer. The folder is the agent — drop it anywhere.
          </div>
          <a href="https://github.com/griffainai/grain-offer-researcher/archive/refs/heads/main.zip"
            style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 700, padding: "10px 20px", borderRadius: 10, background: T.fg, color: "#fff", textDecoration: "none", display: "inline-block" }}>
            Download ↓
          </a>
        </div>
        <div style={{ animationDelay: "300ms", padding: "24px 20px", borderRadius: 18, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", color: "#fff" }}>
          <div style={{ fontSize: 22, marginBottom: 10 }}>⊛</div>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Open on GitHub</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.5)", lineHeight: 1.55, marginBottom: 16 }}>
            Star, fork, or clone. Browse the folder structure and the researcher&apos;s logic.
          </div>
          <a href="https://github.com/griffainai/grain-offer-researcher" target="_blank" rel="noopener"
            style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 700, padding: "10px 20px", borderRadius: 10, border: "1px solid rgba(255,255,255,.3)", color: "rgba(255,255,255,.8)", textDecoration: "none", display: "inline-block" }}>
            View on GitHub ↗
          </a>
        </div>
        <div style={{ animationDelay: "600ms", padding: "24px 20px", borderRadius: 18, background: "rgba(79,70,229,.3)", border: "1px solid rgba(79,70,229,.5)", color: "#fff" }}>
          <div style={{ fontSize: 22, marginBottom: 10 }}>→</div>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Use the app</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.6)", lineHeight: 1.55, marginBottom: 16 }}>
            Run the investigation right now. No install. Name your market. Get the verdict.
          </div>
          <Link href="/try"
            style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 700, padding: "10px 20px", borderRadius: 10, background: "rgba(79,70,229,.8)", color: "#fff", textDecoration: "none", display: "inline-block" }}>
            Try free →
          </Link>
        </div>
      </div>
      <p style={{ fontFamily: T.mono, fontSize: 12, color: "rgba(255,255,255,.25)", letterSpacing: ".06em" }}>
        Built on Interpretable Context Methodology · Comp #6 — The Researcher · griffainai · MIT License
      </p>
    </div>
  );
}

const DOWNLOAD_SCENES = [D1, D2];

/* ================================================================
   DEMO SCENES (original)
   ================================================================ */
const DEMO_SCENES: React.ComponentType[] = [DS0, DS1, DS2, DS3, DS4, DS5, DS6, DS7];

function DS0() {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ width: 72, height: 72, borderRadius: 18, background: T.fg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", boxShadow: "0 20px 60px rgba(0,0,0,.18)" }}>
        <span style={{ fontFamily: T.serif, fontSize: 36, fontWeight: 400, color: "#fff", fontStyle: "italic" }}>G</span>
      </div>
      <div className="stagger">
        <h1 style={{ animationDelay: "100ms", font: `400 clamp(60px,9vw,110px)/0.95 ${T.serif}`, letterSpacing: "-.026em", color: T.fg, margin: "0 0 24px" }}>Grain</h1>
        <p style={{ animationDelay: "300ms", fontSize: "clamp(20px,2.8vw,28px)", color: T.fgSoft, maxWidth: 600, margin: "0 auto 20px", lineHeight: 1.5 }}>No advice. A verdict on your offer.</p>
        <p style={{ animationDelay: "550ms", fontFamily: T.mono, fontSize: 13, letterSpacing: ".14em", textTransform: "uppercase", color: T.fgTertiary }}>An offer researcher — free, always</p>
      </div>
    </div>
  );
}
function DS1() {
  const { out, done } = useTypewriter("You've read $100M Offers. You know Schwartz's five stages. The offer still isn't converting.", { speed: 28 });
  return (
    <div style={{ textAlign: "center" }}>
      <Cap center>The problem every founder hits</Cap>
      <p style={{ font: `400 clamp(32px,4.5vw,60px)/1.08 ${T.serif}`, letterSpacing: "-.022em", color: T.fg, margin: "0 0 32px", maxWidth: 760, marginLeft: "auto", marginRight: "auto" }} className={!done ? "cursor-g" : ""}>{out}</p>
      <div className="stagger">
        <p style={{ animationDelay: "3200ms", fontSize: 18, color: T.fgSoft, maxWidth: 620, margin: "0 auto 18px", lineHeight: 1.65 }}>You can recite Hormozi&apos;s value equation. You know mechanism-first positioning. And you still can&apos;t explain — in one sentence — why this specific type of client would buy from you this quarter.</p>
        <p style={{ animationDelay: "4200ms", fontSize: 17, color: T.accent, fontWeight: 600, maxWidth: 500, margin: "0 auto" }}>The advice was never the problem. The investigation was missing.</p>
      </div>
    </div>
  );
}
function DS2() {
  return (
    <div className="stagger">
      <div style={{ animationDelay: "0ms" }}><Cap center>What generic advice gives you</Cap></div>
      <div style={{ animationDelay: "200ms", fontFamily: T.mono, fontSize: 13.5, color: T.fgMuted, textAlign: "center", marginBottom: 20 }}>&gt; I want to build a Grand Slam Offer for my coaching business</div>
      <div style={{ animationDelay: "700ms", maxWidth: 700, margin: "0 auto", background: T.surface, border: `1px solid ${T.border}`, borderRadius: 18, padding: "28px 32px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
        <p style={{ fontSize: 16.5, lineHeight: 1.72, color: T.fgSoft, margin: "0 0 20px" }}>
          Apply Hormozi&apos;s value equation:{" "}
          <span style={{ background: "rgba(220,38,38,.08)", borderBottom: "2px solid rgba(220,38,38,.4)", padding: "0 2px", borderRadius: 3 }}>raise the dream outcome, increase perceived likelihood, reduce time delay and effort.</span>{" "}
          Find your unique mechanism using Schwartz&apos;s sophistication framework and{" "}
          <span style={{ background: "rgba(107,114,128,.09)", borderBottom: "2px dashed rgba(107,114,128,.4)", padding: "0 2px", borderRadius: 3 }}>niche down until it hurts.</span>
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {["Applies frameworks without checking your market", "No stage verification", "'Until it hurts' — not a verdict"].map((t, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, padding: "4px 10px", borderRadius: 8, background: "rgba(220,38,38,.08)", color: "#DC2626", border: "1px solid rgba(220,38,38,.2)", fontWeight: 500 }}>✗ {t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
function DS3() {
  const { out, done } = useTypewriter("Grain asks before it assumes.", { speed: 38 });
  return (
    <div>
      <Cap center>The no-dossier gate</Cap>
      <h2 style={{ font: `400 clamp(36px,5vw,64px)/1.05 ${T.serif}`, letterSpacing: "-.022em", color: T.fg, textAlign: "center", margin: "0 0 36px" }} className={!done ? "cursor-g" : ""}>{out}</h2>
      <div className="stagger" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, maxWidth: 820, margin: "0 auto" }}>
        {[
          { n:"01", q:"Which mode?", a:"Scratch or sharpen. The investigation is completely different for each. Grain asks before researching anything.", col:T.accent, d:"0ms" },
          { n:"02", q:"What stage is your market?", a:"Schwartz check. If Stage 4 (mechanism saturation), adding another mechanism saturates further. That changes everything.", col:T.amber, d:"400ms" },
          { n:"03", q:"Does your avatar have purchasing power?", a:"Hormozi's best clients can pay. Grain checks whether your target avatar actually does — before building the thesis.", col:T.infer, d:"800ms" },
          { n:"04", q:"Best vs. worst client split?", a:"Your T1 data point. Overrides every framework ever written. The split tells Grain who the real avatar is.", col:"#059669", d:"1200ms" },
        ].map(q => (
          <div key={q.n} style={{ animationDelay: q.d, padding: "16px 20px", borderRadius: 14, background: T.surface, border: `1px solid ${T.border}`, display: "flex", gap: 14 }}>
            <span style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 700, color: q.col, flexShrink: 0, paddingTop: 2 }}>{q.n}</span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: T.fg, marginBottom: 5 }}>{q.q}</div>
              <div style={{ fontSize: 13, color: T.fgSoft, lineHeight: 1.5 }}>{q.a}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function DS4() {
  const { out, done } = useTypewriter("Stage 3-4 is where 90% of founders are operating right now.", { speed: 32 });
  return (
    <div>
      <Cap center>Schwartz&apos;s sophistication check</Cap>
      <p style={{ font: `400 clamp(30px,3.8vw,52px)/1.1 ${T.serif}`, letterSpacing: "-.02em", color: T.fg, textAlign: "center", margin: "0 auto 36px", maxWidth: 780 }} className={!done ? "cursor-g" : ""}>{out}</p>
      <div className="stagger" style={{ display: "flex", gap: 10, maxWidth: 920, margin: "0 auto" }}>
        {[
          { s:"1", l:"State a benefit", ex:"'I help coaches get clients'", col:"#6B7280", hot:false, note:"First to market. Long gone." },
          { s:"2", l:"Enlarge the claim", ex:"'10 clients in 30 days'", col:"#059669", hot:false, note:"Competitors arrived." },
          { s:"3", l:"Name the mechanism", ex:"'The Grand Slam Offer'", col:T.accent, hot:true, note:"You are here. Everyone is." },
          { s:"4", l:"Prove the mechanism", ex:"'Here is why it works'", col:T.amber, hot:true, note:"Mechanism saturation." },
          { s:"5", l:"Brand identity", ex:"'We are those people'", col:T.infer, hot:false, note:"Trust exhausted." },
        ].map((st, i) => (
          <div key={st.s} style={{ animationDelay: `${2600 + i * 350}ms`, flex: 1, padding: "14px 12px", borderRadius: 14, background: st.hot ? st.col : T.surface, border: `2px solid ${st.hot ? st.col : T.border}`, boxShadow: st.hot ? `0 8px 24px ${st.col}35` : "none" }}>
            <div style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 700, color: st.hot ? "#fff" : st.col, marginBottom: 5 }}>Stage {st.s}</div>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: st.hot ? "#fff" : T.fg, marginBottom: 4 }}>{st.l}</div>
            <div style={{ fontSize: 10.5, color: st.hot ? "rgba(255,255,255,.75)" : T.fgMuted, lineHeight: 1.4, marginBottom: 6, fontStyle: "italic" }}>{st.ex}</div>
            <div style={{ fontSize: 10, color: st.hot ? "rgba(255,255,255,.6)" : T.fgTertiary }}>{st.note}</div>
          </div>
        ))}
      </div>
      <p className="stagger" style={{ animationDelay: "4700ms", textAlign: "center", fontSize: 15, color: T.fgMuted, marginTop: 22 }}>
        Applying a Stage-3 solution to a Stage-4 market means adding another mechanism to a saturated field. Grain checks this before recommending anything.
      </p>
    </div>
  );
}
function DS5() {
  const rows = [
    { k:"THE VERDICT", v:"Build / rebuild / constraint is X. One sentence. A real call, not a hedge.", col:T.fg },
    { k:"THE GAP", v:"What no competitor currently says — from what Grain actually read, not assumptions.", col:T.accent },
    { k:"THE MECHANISM", v:"Named. Explains why Hormozi's equation was failing (Likelihood, not price). Why this is different.", col:T.amber },
    { k:"THE LEDGER", v:"Known (T1/T2) / Inferred (T3/T4) / Unknown — strictly separate. Every gap named with how to close it.", col:T.infer },
  ];
  return (
    <div>
      <Cap center>What you walk away with</Cap>
      <h2 style={{ font: `400 clamp(38px,5vw,66px)/1.04 ${T.serif}`, letterSpacing: "-.022em", color: T.fg, textAlign: "center", margin: "0 0 40px" }}>A falsifiable offer thesis.</h2>
      <div className="stagger" style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 720, margin: "0 auto" }}>
        {rows.map((r, i) => (
          <div key={r.k} style={{ animationDelay: `${i * 380}ms`, padding: "14px 18px", borderRadius: 12, background: T.surface, border: `1px solid ${T.border}`, display: "flex", gap: 16, alignItems: "baseline" }}>
            <span style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, letterSpacing: ".08em", color: r.col, flexShrink: 0, width: 130 }}>{r.k}</span>
            <span style={{ fontSize: 14, color: T.fgSoft, lineHeight: 1.5 }}>{r.v}</span>
          </div>
        ))}
        <div style={{ animationDelay: "1600ms", padding: "14px 18px", borderRadius: 12, background: T.killBg, border: `2px solid ${T.kill}`, display: "flex", gap: 16, alignItems: "baseline" }}>
          <span style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, letterSpacing: ".08em", color: T.kill, flexShrink: 0, width: 130 }}>3 KILL-CONDITIONS</span>
          <span style={{ fontSize: 14, color: T.fgSoft, lineHeight: 1.5 }}><strong>The disconfirming evidence.</strong> If Grain found these, it would change the verdict. No summarizer gives you this.</span>
        </div>
        <div style={{ animationDelay: "2000ms", padding: "14px 18px", borderRadius: 12, background: "#ECFDF5", border: "1px solid #6EE7B7", display: "flex", gap: 16, alignItems: "baseline" }}>
          <span style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, letterSpacing: ".08em", color: "#059669", flexShrink: 0, width: 130 }}>THE NEXT Q</span>
          <span style={{ fontSize: 14, color: T.fgSoft, lineHeight: 1.5 }}>The highest-leverage thing to validate — and exactly how to validate it. One action, not &ldquo;do more research.&rdquo;</span>
        </div>
      </div>
    </div>
  );
}
function DS6() {
  const { out, done } = useTypewriter("When you need live data — Grain reads real competitor pages right now.", { speed: 28 });
  return (
    <div>
      <Cap center>The market audit — when you need it</Cap>
      <p style={{ font: `400 clamp(28px,3.8vw,50px)/1.1 ${T.serif}`, letterSpacing: "-.02em", color: T.fg, textAlign: "center", margin: "0 auto 36px", maxWidth: 760 }} className={!done ? "cursor-g" : ""}>{out}</p>
      <div className="stagger" style={{ maxWidth: 700, margin: "0 auto", background: T.surface, border: `1px solid ${T.border}`, borderRadius: 18, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,.06)" }}>
        <div style={{ padding: "14px 20px", background: T.fg, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,.5)", letterSpacing: ".1em" }}>AUDIT MODE · LIVE</span>
          <span style={{ marginLeft: "auto", width: 8, height: 8, borderRadius: 999, background: "#34C759", animation: "dotPulse 2s ease-in-out infinite" }} />
        </div>
        <div style={{ padding: "20px 24px" }}>
          <p style={{ fontFamily: T.mono, fontSize: 13, color: T.fgMuted, margin: "0 0 16px" }}>&gt; Audit: business coaching for 7-figure founders</p>
          <div style={{ fontSize: 13, color: "#34C759", fontWeight: 600, marginBottom: 12, fontFamily: T.mono }}>🌐 Reading live pages...</div>
          {["Alex Hormozi — Grand Slam framework, offer funnels", "Brendon Burchard — HPX method, $997–$5K", "Sam Ovens / Skool — community + curriculum", "Cardone Ventures — 10X mechanism, $15K+"].map((p, i) => (
            <div key={p} className="stagger">
              <div style={{ animationDelay: `${3000 + i * 600}ms`, display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "#059669", marginBottom: 6, fontFamily: T.mono }}>
                <span>✓</span><span style={{ color: T.fgSoft }}>{p}</span>
              </div>
            </div>
          ))}
          <div className="stagger">
            <div style={{ animationDelay: "6000ms", marginTop: 16, padding: "12px 16px", background: T.accentSoft, borderRadius: 10, fontSize: 14, lineHeight: 1.62 }}>
              <strong style={{ color: T.accentDeep }}>Stage 4 (Schwartz). Grand Slam is table stakes.</strong> <span style={{ color: T.fgSoft }}>Gap: &ldquo;$1M–$10M operators hitting the complexity wall.&rdquo; Unclaimed avatar.</span> <span style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 999, background: "#dcfce7", color: "#166534" }}>T1 — live pages</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function DS7() {
  return (
    <div style={{ textAlign: "center" }} className="stagger">
      <div style={{ animationDelay: "0ms", width: 64, height: 64, borderRadius: 16, background: T.fg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", boxShadow: "0 20px 60px rgba(0,0,0,.16)" }}>
        <span style={{ fontFamily: T.serif, fontSize: 30, fontWeight: 400, color: "#fff", fontStyle: "italic" }}>G</span>
      </div>
      <h2 style={{ animationDelay: "150ms", font: `400 clamp(42px,6vw,80px)/1.02 ${T.serif}`, letterSpacing: "-.024em", color: T.fg, margin: "0 0 20px" }}>
        The offer that converts.<br />
        <em style={{ fontStyle: "italic", color: T.fgMuted }}>Built on investigation, not advice.</em>
      </h2>
      <p style={{ animationDelay: "400ms", fontSize: 19, color: T.fgSoft, maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.62 }}>
        Free. No account. No card. Just name your market and run the investigation.
      </p>
      <div style={{ animationDelay: "650ms" }} className="stagger">
        <div style={{ animationDelay: "650ms", display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <Link href="/try" style={{ fontFamily: T.sans, fontSize: 17, fontWeight: 600, padding: "16px 36px", borderRadius: 14, background: T.fg, color: "#fff", textDecoration: "none", boxShadow: "0 4px 20px rgba(0,0,0,.14)" }}>
            Start your investigation →
          </Link>
          <button onClick={() => document.getElementById("problem")?.scrollIntoView({ behavior: "smooth" })} style={{ fontFamily: T.sans, fontSize: 16, fontWeight: 500, padding: "16px 28px", borderRadius: 14, border: `1.5px solid ${T.border}`, color: T.fgSoft, background: "transparent", cursor: "pointer" }}>
            See how it works ↓
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Shared primitive ── */
function Cap({ children, center, style: extra }: { children: React.ReactNode; center?: boolean; style?: React.CSSProperties }) {
  return (
    <div style={{ display: center ? "flex" : "inline-flex", justifyContent: center ? "center" : undefined, alignItems: "center", gap: 8, fontSize: 12, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase" as const, color: T.fgMuted, marginBottom: center ? 20 : 18, ...(center ? { width: "100%" } : {}), ...extra }}>
      <span style={{ width: 20, height: 1, background: "currentColor", display: "inline-block", flexShrink: 0 }} />
      {children}
    </div>
  );
}
