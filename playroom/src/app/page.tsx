"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTypewriter } from "@/lib/useTypewriter";
import { GrainMark } from "@/components/Logo";

/* ================================================================
   GRAIN — Full landing page
   Every section has its own animated scene sequence that fires
   on scroll. Phone conversations reference Hormozi ($100M Offers
   value equation), Schwartz (5-stage sophistication), and Todd
   Brown (mechanism-first positioning) — showing Grain knows the
   domain, not just the concept.
   ================================================================ */

const T = {
  bg: "#FAFAF7", surface: "#FFFFFF", fg: "#0D0D0E",
  fgSoft: "#3D3D3F", fgMuted: "#6E6E73", fgTertiary: "#AEAEB2",
  border: "#E8E8EC", borderStrong: "#C8C8CC",
  accent: "#4F46E5", accentSoft: "#EEF2FF", accentDeep: "#3730A3",
  amber: "#B45309", amberBg: "#FFFBEB", amberMid: "#D97706",
  kill: "#B91C1C", killBg: "#FEF2F2", killBorder: "#FCA5A5",
  infer: "#7C3AED", inferBg: "#F5F3FF",
  serif: "'Newsreader', Georgia, 'Times New Roman', serif",
  sans: "'Inter', system-ui, sans-serif",
  mono: "'IBM Plex Mono', 'Fira Code', monospace",
};

/* ── Hooks ── */
function useInView(threshold = 0.18) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useSequence(inView: boolean, delays: number[]) {
  const [step, setStep] = useState(-1);
  useEffect(() => {
    if (!inView) return;
    const ts = delays.map((d, i) => window.setTimeout(() => setStep(i), d));
    return () => ts.forEach(clearTimeout);
  }, [inView]);
  return step;
}

/* ── Demo scene config ── */
const SCENE_DURATIONS = [4500, 8000, 8500, 8000, 8500, 9000, 8000, 99999];
const SCENE_COUNT = SCENE_DURATIONS.length;

export default function Home() {
  const [scene, setScene] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);
  const go = useCallback((n: number) => setScene(Math.max(0, Math.min(SCENE_COUNT - 1, n))), []);

  useEffect(() => {
    if (paused) return;
    const dur = scene >= SCENE_COUNT - 1 ? 8000 : SCENE_DURATIONS[scene];
    timer.current = window.setTimeout(() => go(scene >= SCENE_COUNT - 1 ? 0 : scene + 1), dur);
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

  return (
    <div style={{ background: T.bg, color: T.fg }}>
      {/* ── NAV ── */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(250,250,247,.92)", backdropFilter: "blur(20px) saturate(180%)", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
            <GrainMark size="sm" variant="dark" />
            <span style={{ fontFamily: T.serif, fontSize: 18, fontWeight: 400, fontStyle: "italic", letterSpacing: "-.02em", color: T.fg }}>Grain</span>
          </Link>
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <a href="#problem" style={{ fontFamily: T.sans, fontSize: 14, color: T.fgMuted, padding: "7px 13px", borderRadius: 8, textDecoration: "none", fontWeight: 500 }}>How it works</a>
            <Link href="/brand" style={{ fontFamily: T.sans, fontSize: 14, color: T.fgMuted, padding: "7px 13px", borderRadius: 8, textDecoration: "none", fontWeight: 500 }}>Brand kit</Link>
            <Link href="/try" style={{ marginLeft: 6, fontFamily: T.sans, fontSize: 14, fontWeight: 600, padding: "9px 20px", borderRadius: 10, background: T.fg, color: "#fff", textDecoration: "none", boxShadow: "0 1px 2px rgba(0,0,0,.12), 0 4px 14px rgba(0,0,0,.08)" }}>
              Try free →
            </Link>
          </nav>
        </div>
      </header>

      {/* ── SECTION 1: 60-SECOND DEMO ── */}
      <section style={{ minHeight: "calc(100vh - 60px)", display: "flex", flexDirection: "column" }}>
        <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 32px" }}>
          <div key={scene} style={{ width: "100%", maxWidth: 900, animation: "sceneUp .6s cubic-bezier(0.16,1,0.3,1) both" }}>
            <SceneRouter scene={scene} />
          </div>
        </main>
        <Controls scene={scene} paused={paused}
          onPrev={() => go(scene - 1)} onNext={() => go(scene + 1)}
          onPause={() => setPaused(p => !p)}
          onRestart={() => { setPaused(false); go(0); }} />
      </section>

      {/* ── SECTION 2: THE PROBLEM ── */}
      <ProblemSection />

      {/* ── SECTION 3: HOW IT WORKS ── */}
      <ModesSection />

      {/* ── SECTION 4: THE OUTPUT ── */}
      <OutputSection />

      {/* ── SECTION 5: FREE CTA ── */}
      <FreeSection />

      <footer style={{ padding: "40px 32px", borderTop: `1px solid ${T.border}`, background: T.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <span style={{ fontFamily: T.sans, fontWeight: 600, fontSize: 15, color: T.fg }}>Grain — No advice. A verdict on your offer.</span>
          <div style={{ display: "flex", gap: 24, fontSize: 13, color: T.fgMuted }}>
            <Link href="/try" style={{ color: "inherit", textDecoration: "none" }}>Workspace</Link>
            <Link href="/brand" style={{ color: "inherit", textDecoration: "none" }}>Brand kit</Link>
            <a href="https://github.com/griffainai/grain-offer-researcher" style={{ color: "inherit", textDecoration: "none" }}>GitHub</a>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes sceneUp { from { opacity:0;transform:translateY(22px); } to { opacity:1;transform:translateY(0); } }
        @keyframes slideUp { from { opacity:0;transform:translateY(28px); } to { opacity:1;transform:translateY(0); } }
        @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
        @keyframes killDraw { from { opacity:0;transform:translateX(-16px); } to { opacity:1;transform:translateX(0); } }
        @keyframes blinkC { 0%,49%{opacity:1}50%,100%{opacity:0} }
        @keyframes marq { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .cursor-g::after { content:''; display:inline-block; width:2px; height:1.1em; background:currentColor; margin-left:3px; vertical-align:-0.07em; border-radius:1px; animation:blinkC 1s steps(1) infinite; }
        @keyframes dotPulse { 0%,100%{transform:scale(1);opacity:.6} 50%{transform:scale(1.5);opacity:1} }
      `}</style>
    </div>
  );
}

/* ================================================================
   SECTION 2: THE PROBLEM — animated 5-step reveal
   ================================================================ */
function ProblemSection() {
  const { ref, inView } = useInView(0.12);
  const step = useSequence(inView, [0, 700, 1800, 2800, 4200]);

  return (
    <section id="problem" ref={ref} style={{ padding: "120px 32px", background: "#fff", borderTop: `1px solid ${T.border}`, minHeight: 640, overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Animated heading */}
        <div style={{ opacity: step >= 0 ? 1 : 0, transform: step >= 0 ? "none" : "translateY(20px)", transition: "all .7s cubic-bezier(0.16,1,0.3,1)", marginBottom: 56 }}>
          <Cap>The problem with offer advice</Cap>
          <h2 style={{ font: `400 clamp(44px,5.5vw,72px)/1.03 ${T.serif}`, letterSpacing: "-.022em", color: T.fg, margin: "0 0 22px" }}>
            You&apos;ve read the books.<br />
            <em style={{ fontStyle: "italic", color: T.fgMuted }}>The advice still isn&apos;t working.</em>
          </h2>
          <p style={{ fontSize: 19, color: T.fgSoft, maxWidth: 620, lineHeight: 1.65, margin: 0 }}>
            Grand Slam Offer. Schwartz&apos;s five stages. The unique mechanism. All of it is real. None of it was built by looking at your specific market, right now. That&apos;s the gap.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 1000 }}>

          {/* LEFT: Generic advice — appears step 1 */}
          <div style={{ opacity: step >= 1 ? 1 : 0, transform: step >= 1 ? "none" : "translateY(24px)", transition: "all .65s .1s cubic-bezier(0.16,1,0.3,1)", background: T.bg, border: `1px solid ${T.border}`, borderRadius: 20, overflow: "hidden" }}>
            <div style={{ padding: "14px 20px", borderBottom: `1px solid ${T.border}`, background: "#F5F5F3", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 700, color: T.fgMuted, letterSpacing: ".1em", textTransform: "uppercase" }}>🤖 Generic AI</span>
              <span style={{ fontFamily: T.mono, fontSize: 10, color: T.fgTertiary }}>Confident · Guessed · No investigation</span>
            </div>
            <div style={{ padding: "22px 24px" }}>
              <p style={{ fontFamily: T.mono, fontSize: 12.5, color: T.fgMuted, margin: "0 0 16px", lineHeight: 1.5 }}>&gt; How do I build a better offer?</p>

              {/* Generic response — appears step 2 */}
              <div style={{ opacity: step >= 2 ? 1 : 0, transition: "opacity .5s .1s", fontSize: 15.5, lineHeight: 1.7, color: T.fgSoft }}>
                <Flawed>Build a Grand Slam Offer</Flawed> using Hormozi&apos;s framework — identify a dream outcome, raise the perceived likelihood, reduce the time and effort. Then{" "}
                <Flawed>find your unique mechanism</Flawed>{" "}
                and{" "}
                <Flawed kind="ghost">niche down until it hurts — you&apos;ll know when you&apos;ve gone far enough.</Flawed>
              </div>

              {/* Flaw annotations — appears step 3 */}
              <div style={{ opacity: step >= 3 ? 1 : 0, transition: "opacity .5s", marginTop: 20, paddingTop: 16, borderTop: `1px solid ${T.border}` }}>
                {[
                  ["#DC2626", "Cites frameworks without checking if they fit your specific market"],
                  ["#D97706", "No sophistication check — is Stage 3 even the right frame here?"],
                  ["#6B7280", "'Until it hurts' — a vibe, not a testable recommendation"],
                ].map(([c, l], i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: T.fgMuted, marginBottom: 7, opacity: step >= 3 ? 1 : 0, transform: step >= 3 ? "none" : "translateX(-8px)", transition: `all .4s ${i * 120}ms` }}>
                    <span style={{ width: 10, height: 10, borderRadius: 3, background: `${c}18`, border: `1.5px solid ${c}`, flexShrink: 0 }} />
                    {l}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Grain — appears step 4 */}
          <div style={{ opacity: step >= 4 ? 1 : 0, transform: step >= 4 ? "none" : "translateY(24px)", transition: "all .65s cubic-bezier(0.16,1,0.3,1)", background: T.surface, border: `1.5px solid ${T.fg}`, borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 8px rgba(0,0,0,0.05), 0 12px 36px rgba(0,0,0,0.10)" }}>
            <div style={{ padding: "14px 20px", borderBottom: `1px solid ${T.border}`, background: T.fg, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: ".1em", textTransform: "uppercase" }}>⊛ Grain</span>
              <span style={{ fontFamily: T.mono, fontSize: 10, color: "rgba(255,255,255,.45)" }}>Investigative · Tiered · Falsifiable</span>
            </div>
            <div style={{ padding: "22px 24px" }}>
              <p style={{ fontFamily: T.mono, fontSize: 12.5, color: T.fgMuted, margin: "0 0 18px", lineHeight: 1.5 }}>&gt; How do I build a better offer?</p>
              <p style={{ fontSize: 15, lineHeight: 1.68, color: T.fgSoft, marginBottom: 14 }}>
                <strong style={{ color: T.fg }}>Before frameworks:</strong> which mode — building from scratch, or sharpening something you already have? The investigation is different for each.
              </p>
              <div style={{ padding: "12px 16px", background: T.accentSoft, borderRadius: 12, fontSize: 14, lineHeight: 1.65, color: T.accentDeep, marginBottom: 14 }}>
                And before Hormozi&apos;s value equation can help you — I need to check what stage your market is in per Schwartz. Applying a Stage-3 solution (unique mechanism) to a Stage-4 market (mechanism saturation) won&apos;t move the needle. First, where are we starting from?
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["Market stage first", "Then avatar", "Then mechanism", "Then price"].map(t => (
                  <span key={t} style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 6, background: T.accentSoft, color: T.accentDeep, letterSpacing: ".04em" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 3: THREE MODES — animated scene intro + carousel
   ================================================================ */
function ModesSection() {
  const { ref, inView } = useInView(0.1);
  const step = useSequence(inView, [0, 800, 1600]);
  const [active, setActive] = useState(1);
  const N = 3;

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % N), 4500);
    return () => clearInterval(t);
  }, []);

  const slides = [
    {
      step: "01 · Build from scratch",
      title: "Find the offer before you build it",
      desc: "No offer yet? Gate → sophistication check → avatar purchasing power → positioning gap → falsifiable thesis.",
      phone: <PhoneScratch />,
    },
    {
      step: "02 · Sharpen what you have",
      title: "Diagnose exactly what's broken",
      desc: "Hormozi's value equation breaks at one of four points. Grain finds which one — from your own T1 data.",
      phone: <PhoneSharpen />,
    },
    {
      step: "03 · Market audit — live",
      title: "Read real competitor pages right now",
      desc: "Grain reads actual pricing pages, homepage copy, and offer structures to map Schwartz stage + the gap.",
      phone: <PhoneAudit />,
    },
  ];

  return (
    <section id="modes" ref={ref} style={{ padding: "120px 32px 112px", background: "#F7F7F4", borderTop: `1px solid ${T.border}`, overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <div style={{ opacity: step >= 0 ? 1 : 0, transform: step >= 0 ? "none" : "translateY(20px)", transition: "all .7s cubic-bezier(0.16,1,0.3,1)", marginBottom: 64 }}>
          <Cap>Three modes</Cap>
          <h2 style={{ font: `400 clamp(42px,5.2vw,68px)/1.04 ${T.serif}`, letterSpacing: "-.022em", color: T.fg, margin: "0 0 20px", maxWidth: 680 }}>
            One investigation.<br />
            <em style={{ fontStyle: "italic", color: T.fgMuted }}>Right for your moment.</em>
          </h2>
          <p style={{ fontSize: 18, color: T.fgSoft, maxWidth: 540, lineHeight: 1.65, margin: 0 }}>
            Grain knows Hormozi&apos;s value equation, Schwartz&apos;s five stages, and what makes a mechanism actually hold in a saturated market. It applies that knowledge to your specific situation — not the generic case.
          </p>
        </div>

        {/* Carousel */}
        <div style={{ opacity: step >= 1 ? 1 : 0, transform: step >= 1 ? "none" : "translateY(28px)", transition: "all .7s .1s cubic-bezier(0.16,1,0.3,1)" }}>
          <div className="hs-carousel">
            <button className="hs-arrow left" onClick={() => setActive((active - 1 + N) % N)}>←</button>
            <div className="hs-track-wrap">
              <div className="hs-cards">
                {slides.map((s, i) => {
                  const prev = (active - 1 + N) % N;
                  const pos = i === active ? "center" : i === prev ? "prev" : "next";
                  return (
                    <div key={i} className={`hs-card ${pos}`} onClick={() => pos !== "center" && setActive(i)}>
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <div className="phone-shell" style={{ width: 220 }}>
                          <div className="phone-screen" style={{ display: "flex", flexDirection: "column" }}>
                            <PhoneStatusBar />
                            <PhoneHeaderBar />
                            {s.phone}
                          </div>
                        </div>
                      </div>
                      <div className="hs-card-info">
                        <span className="step-num">{s.step}</span>
                        <h3>{s.title}</h3>
                        <p>{s.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <button className="hs-arrow right" onClick={() => setActive((active + 1) % N)}>→</button>
          </div>
          <div className="hs-dots" style={{ marginTop: 28 }}>
            {[0, 1, 2].map(i => <div key={i} className={`hs-dot ${i === active ? "active" : ""}`} onClick={() => setActive(i)} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 4: THE OUTPUT — animated 6-card stagger reveal
   ================================================================ */
function OutputSection() {
  const { ref, inView } = useInView(0.08);
  const step = useSequence(inView, [0, 600, 900, 1250, 1600, 1950, 2350, 2800]);

  const outputs = [
    { n: "01", title: "The Verdict", body: "Build / rebuild / your constraint is X. One sentence. A real call — not a hedge.", col: T.accent, bg: T.accentSoft },
    { n: "02", title: "The Positioning Gap", body: "What no competitor currently says, per what Grain actually read. Not what you assume they say.", col: T.amber, bg: T.amberBg },
    { n: "03", title: "The Mechanism", body: "Named, specific, explains why Hormozi's value equation was breaking — and why this approach is different.", col: T.fg, bg: "#F5F5F3" },
    { n: "04", title: "The Avatar", body: "Specific person. Purchasing power verified (T1 from your sales data or T4 labeled as inferred). Urgency sourced.", col: T.infer, bg: T.inferBg },
    { n: "05", title: "Three Kill-Conditions", body: "The findings that would flip the verdict. This is the section no generic AI gives you. A thesis with no kill-conditions is a summary in costume.", col: T.kill, bg: T.killBg, isKill: true },
    { n: "06", title: "The Next Question", body: "The single highest-leverage thing to validate, and exactly how. Not 'do more research.' One specific action.", col: "#059669", bg: "#ECFDF5" },
  ];

  return (
    <section id="output" ref={ref} style={{ padding: "120px 32px", background: "#fff", borderTop: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <div style={{ opacity: step >= 0 ? 1 : 0, transform: step >= 0 ? "none" : "translateY(20px)", transition: "all .7s cubic-bezier(0.16,1,0.3,1)", marginBottom: 64 }}>
          <Cap>What you get</Cap>
          <h2 style={{ font: `400 clamp(44px,5vw,68px)/1.04 ${T.serif}`, letterSpacing: "-.022em", color: T.fg, margin: "0 0 22px", maxWidth: 700 }}>
            A verdict you can<br />
            <em style={{ fontStyle: "italic", color: T.fgMuted }}>argue with.</em>
          </h2>
          <p style={{ fontSize: 19, color: T.fgSoft, maxWidth: 580, lineHeight: 1.65, margin: 0 }}>
            Six sections. Every one falsifiable. Section five is the one no summarizer gives you — the findings that would prove Grain wrong.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {outputs.map((o, i) => (
            <div key={o.n}
              style={{
                padding: "32px 28px", borderRadius: 20,
                background: o.bg, border: `1px solid ${o.col}22`,
                opacity: step >= i + 2 ? 1 : 0,
                transform: step >= i + 2 ? "none" : "translateY(28px)",
                transition: `opacity .55s, transform .55s cubic-bezier(0.16,1,0.3,1)`,
                ...(o.isKill ? { borderLeft: `3px solid ${T.kill}` } : {}),
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 36px rgba(0,0,0,.08)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}>
              <div style={{ fontFamily: T.mono, fontSize: 12, fontWeight: 700, color: o.col, letterSpacing: ".06em", marginBottom: 12 }}>{o.n}</div>
              <h3 style={{ fontSize: 19, fontWeight: 700, color: T.fg, letterSpacing: "-.012em", marginBottom: 10 }}>{o.title}</h3>
              <p style={{ fontSize: 14.5, color: T.fgSoft, lineHeight: 1.62, margin: 0 }}>{o.body}</p>
            </div>
          ))}
        </div>

        {/* Framework reference */}
        <div style={{ marginTop: 56, opacity: step >= 8 ? 1 : 0, transform: step >= 8 ? "none" : "translateY(16px)", transition: "all .6s cubic-bezier(0.16,1,0.3,1)" }}>
          <div style={{ background: T.fg, borderRadius: 16, padding: "24px 32px", display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", flexShrink: 0 }}>Grounded in</div>
            {[
              "Hormozi — $100M Offers · Value Equation",
              "Schwartz — Breakthrough Advertising · 5 Stages",
              "Todd Brown — Mechanism-first positioning",
              "Thiel — Category design · Monopoly logic",
            ].map(f => (
              <span key={f} style={{ fontFamily: T.mono, fontSize: 12, color: "rgba(255,255,255,.55)", letterSpacing: ".02em" }}>{f}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 5: FREE CTA — animated
   ================================================================ */
function FreeSection() {
  const { ref, inView } = useInView(0.15);
  const step = useSequence(inView, [0, 500, 1100, 1700]);

  return (
    <section id="free" ref={ref} style={{ padding: "120px 32px 96px", background: T.fg, position: "relative", overflow: "hidden", textAlign: "center" }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(60% 60% at 50% 0%, rgba(79,70,229,.15), transparent 65%)`, pointerEvents: "none" }} />
      <div style={{ maxWidth: 760, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ opacity: step >= 0 ? 1 : 0, transform: step >= 0 ? "none" : "translateY(20px)", transition: "all .6s cubic-bezier(0.16,1,0.3,1)", display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <GrainMark size="md" variant="dark" />
        </div>
        <h2 style={{ font: `400 clamp(52px,6.5vw,88px)/1.02 ${T.serif}`, letterSpacing: "-.026em", color: "#fff", margin: "0 0 20px", opacity: step >= 1 ? 1 : 0, transform: step >= 1 ? "none" : "translateY(18px)", transition: "all .65s .1s cubic-bezier(0.16,1,0.3,1)" }}>
          Free.<br />
          <em style={{ fontStyle: "italic", color: "rgba(255,255,255,.4)" }}>Completely.</em>
        </h2>
        <p style={{ fontSize: 19, color: "rgba(255,255,255,.5)", maxWidth: 460, margin: "0 auto 52px", lineHeight: 1.65, opacity: step >= 2 ? 1 : 0, transition: "opacity .6s .15s" }}>
          No account. No card. No paid tier that unlocks later. Grain is free because investigative offer research should be accessible, not gated.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", opacity: step >= 3 ? 1 : 0, transform: step >= 3 ? "none" : "translateY(12px)", transition: "all .6s cubic-bezier(0.16,1,0.3,1)" }}>
          <Link href="/try" style={{ fontFamily: T.sans, fontSize: 17, fontWeight: 600, padding: "16px 36px", borderRadius: 14, background: "#fff", color: T.fg, textDecoration: "none", boxShadow: "0 4px 20px rgba(0,0,0,.2)" }}>
            Start your investigation →
          </Link>
          <a href="https://github.com/griffainai/grain-offer-researcher" target="_blank" rel="noopener" style={{ fontFamily: T.sans, fontSize: 16, fontWeight: 500, padding: "16px 28px", borderRadius: 14, border: "1px solid rgba(255,255,255,.18)", color: "rgba(255,255,255,.65)", textDecoration: "none" }}>
            Fork the folder ↗
          </a>
        </div>
        <p style={{ marginTop: 32, fontFamily: T.mono, fontSize: 12, color: "rgba(255,255,255,.2)", letterSpacing: ".04em", opacity: step >= 3 ? 1 : 0, transition: "opacity .6s .2s" }}>
          Built on Interpretable Context Methodology · Comp #6 — The Researcher · griffainai
        </p>
      </div>
    </section>
  );
}

/* ================================================================
   60-SECOND DEMO SCENES (unchanged from before)
   ================================================================ */
function SceneRouter({ scene }: { scene: number }) {
  switch (scene) {
    case 0: return <Scene0 />;
    case 1: return <Scene1 />;
    case 2: return <Scene2 />;
    case 3: return <Scene3 />;
    case 4: return <Scene4 />;
    case 5: return <Scene5 />;
    case 6: return <Scene6 />;
    default: return <Scene7 />;
  }
}

function Scene0() {
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

function Scene1() {
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

function Scene2() {
  return (
    <div className="stagger">
      <div style={{ animationDelay: "0ms" }}><Cap center>What generic advice gives you</Cap></div>
      <div style={{ animationDelay: "200ms", fontFamily: T.mono, fontSize: 13.5, color: T.fgMuted, textAlign: "center", marginBottom: 20 }}>&gt; I want to build a Grand Slam Offer for my coaching business</div>
      <div style={{ animationDelay: "700ms", maxWidth: 700, margin: "0 auto", background: T.surface, border: `1px solid ${T.border}`, borderRadius: 18, padding: "28px 32px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
        <p style={{ fontSize: 16.5, lineHeight: 1.72, color: T.fgSoft, margin: "0 0 20px" }}>
          Apply Hormozi&apos;s value equation:{" "}
          <Flawed>raise the dream outcome, increase perceived likelihood, reduce time delay and effort.</Flawed>{" "}
          Find your unique mechanism using{" "}
          <Flawed>Schwartz&apos;s sophistication framework</Flawed>{" "}
          and position it as a Stage-3 mechanism claim.{" "}
          <Flawed kind="ghost">You&apos;re in a great position to capture a specific niche — just niche down and you&apos;ll be golden.</Flawed>
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <FlawBadge c="#E02020" t="Applies the framework without checking your actual market" />
          <FlawBadge c="#D97706" t="No stage verification — is coaching actually Stage 3 right now?" />
          <FlawBadge c="#8E8E93" t="'You'll be golden' — a feeling, not a verdict" />
        </div>
      </div>
    </div>
  );
}

function Scene3() {
  const { out, done } = useTypewriter("Grain runs the gate before it runs the framework.", { speed: 38 });
  return (
    <div>
      <Cap center>The no-dossier gate</Cap>
      <h2 style={{ font: `400 clamp(36px,5vw,64px)/1.05 ${T.serif}`, letterSpacing: "-.022em", color: T.fg, textAlign: "center", margin: "0 0 36px" }} className={!done ? "cursor-g" : ""}>{out}</h2>
      <div className="stagger" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, maxWidth: 820, margin: "0 auto" }}>
        {[
          { n: "01", q: "Which mode?", a: "Scratch (no offer yet) or Sharpen (something's broken). The investigation is completely different for each.", col: T.accent },
          { n: "02", q: "What stage is your market?", a: "Schwartz's five stages: Stage 3-4 (mechanism saturation) is where most founders are building right now. That changes everything.", col: T.amber },
          { n: "03", q: "Does your avatar actually have purchasing power?", a: "Hormozi's best clients can pay. Your best clients can also pay. The gap is usually: the avatar you're targeting can't.", col: T.infer },
          { n: "04", q: "What do your best clients have in common?", a: "Your best vs. worst split is the only T1 data point in offer research. It overrides every framework ever written.", col: "#059669" },
        ].map((q, i) => (
          <div key={q.n} style={{ animationDelay: `${2200 + i * 300}ms`, padding: "18px 20px", borderRadius: 14, background: T.surface, border: `1px solid ${T.border}`, display: "flex", gap: 14, alignItems: "flex-start" }}>
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

function Scene4() {
  const { out, done } = useTypewriter("Stage 3-4 is where 90% of founders are operating right now.", { speed: 32 });
  return (
    <div>
      <Cap center>Schwartz&apos;s sophistication check</Cap>
      <p style={{ font: `400 clamp(30px,3.8vw,52px)/1.1 ${T.serif}`, letterSpacing: "-.02em", color: T.fg, textAlign: "center", margin: "0 auto 36px", maxWidth: 780 }} className={!done ? "cursor-g" : ""}>{out}</p>
      <div className="stagger" style={{ display: "flex", gap: 10, maxWidth: 920, margin: "0 auto" }}>
        {[
          { s:"1", label:"State a benefit", ex:"'I help coaches get clients'", col:"#6B7280", hot:false, note:"First to market. Long gone." },
          { s:"2", label:"Enlarge the claim", ex:"'10 clients in 30 days'", col:"#059669", hot:false, note:"Competitors arrived." },
          { s:"3", label:"Name the mechanism", ex:"'The Grand Slam Offer'", col:T.accent, hot:true, note:"You are here. Everyone is." },
          { s:"4", label:"Prove the mechanism", ex:"'Here is why it works'", col:T.amber, hot:true, note:"Mechanism saturation." },
          { s:"5", label:"Brand / identity", ex:"'We are the kind of people'", col:T.infer, hot:false, note:"Trust exhausted." },
        ].map((st, i) => (
          <div key={st.s} style={{ animationDelay: `${2600 + i * 350}ms`, flex: 1, padding: "14px 12px", borderRadius: 14, background: st.hot ? st.col : T.surface, border: `2px solid ${st.hot ? st.col : T.border}`, boxShadow: st.hot ? `0 8px 24px ${st.col}35` : "none" }}>
            <div style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 700, color: st.hot ? "#fff" : st.col, marginBottom: 5 }}>Stage {st.s}</div>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: st.hot ? "#fff" : T.fg, marginBottom: 4 }}>{st.label}</div>
            <div style={{ fontSize: 10.5, color: st.hot ? "rgba(255,255,255,.75)" : T.fgMuted, lineHeight: 1.4, marginBottom: 6, fontStyle: "italic" }}>{st.ex}</div>
            <div style={{ fontSize: 10, color: st.hot ? "rgba(255,255,255,.6)" : T.fgTertiary }}>{st.note}</div>
          </div>
        ))}
      </div>
      <p className="stagger" style={{ animationDelay: "4700ms", textAlign: "center", fontSize: 15, color: T.fgMuted, marginTop: 22 }}>
        Applying a Stage-3 solution to a Stage-4 market means you&apos;re adding another named mechanism to a saturated field. Grain checks this before recommending anything.
      </p>
    </div>
  );
}

function Scene5() {
  const rows = [
    { k:"THE VERDICT", v:"Build / rebuild / constraint is X. One sentence. A call, not a hedge.", col:T.fg },
    { k:"THE GAP", v:"What no competitor says right now — verified from actual pages, not assumptions.", col:T.accent },
    { k:"THE MECHANISM", v:"Named. Explains why Hormozi's equation was failing (likelihood, not price) and why this is different.", col:T.amber },
    { k:"THE LEDGER", v:"Known (T1/T2) / Inferred (T3/T4) / Unknown — strictly separated. Gaps named with how to close them.", col:T.infer },
  ];
  return (
    <div>
      <Cap center>What you walk away with</Cap>
      <h2 style={{ font: `400 clamp(38px,5vw,66px)/1.04 ${T.serif}`, letterSpacing: "-.022em", color: T.fg, textAlign: "center", margin: "0 0 40px" }}>
        A falsifiable offer thesis.
      </h2>
      <div className="stagger" style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 720, margin: "0 auto" }}>
        {rows.map((r, i) => (
          <div key={r.k} style={{ animationDelay: `${i * 380}ms`, padding: "14px 18px", borderRadius: 12, background: T.surface, border: `1px solid ${T.border}`, display: "flex", gap: 16, alignItems: "baseline" }}>
            <span style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, letterSpacing: ".08em", color: r.col, flexShrink: 0, width: 130 }}>{r.k}</span>
            <span style={{ fontSize: 14, color: T.fgSoft, lineHeight: 1.5 }}>{r.v}</span>
          </div>
        ))}
        <div style={{ animationDelay: "1600ms", padding: "14px 18px", borderRadius: 12, background: T.killBg, border: `2px solid ${T.kill}`, display: "flex", gap: 16, alignItems: "baseline" }}>
          <span style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, letterSpacing: ".08em", color: T.kill, flexShrink: 0, width: 130 }}>3 KILL-CONDITIONS</span>
          <span style={{ fontSize: 14, color: T.fgSoft, lineHeight: 1.5 }}><strong>The disconfirming evidence.</strong> If Grain found these, it would change the verdict. No summarizer gives you this — it&apos;s what separates a thesis from advice.</span>
        </div>
        <div style={{ animationDelay: "2000ms", padding: "14px 18px", borderRadius: 12, background: "#ECFDF5", border: "1px solid #6EE7B7", display: "flex", gap: 16, alignItems: "baseline" }}>
          <span style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, letterSpacing: ".08em", color: "#059669", flexShrink: 0, width: 130 }}>THE NEXT Q</span>
          <span style={{ fontSize: 14, color: T.fgSoft, lineHeight: 1.5 }}>The single highest-leverage thing to validate next — and the specific action to validate it. Not "do more research."</span>
        </div>
      </div>
    </div>
  );
}

function Scene6() {
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
          {["Alex Hormozi — Grand Slam framework, offer structure", "Brendon Burchard — HPX method, $997–$5K range", "Sam Ovens / Skool — community + curriculum model", "Cardone Ventures — 10X mechanism, $15K+ entry"].map((p, i) => (
            <div key={p} className="stagger">
              <div style={{ animationDelay: `${3000 + i * 600}ms`, display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "#059669", marginBottom: 6, fontFamily: T.mono }}>
                <span>✓</span><span style={{ color: T.fgSoft }}>{p}</span>
              </div>
            </div>
          ))}
          <div className="stagger">
            <div style={{ animationDelay: "6000ms", marginTop: 16, padding: "12px 16px", background: T.accentSoft, borderRadius: 10, fontSize: 14, lineHeight: 1.62 }}>
              <strong style={{ color: T.accentDeep }}>Stage 4 market (Schwartz).</strong> <span style={{ color: T.fgSoft }}>Grand Slam is now table stakes — replicated by every coach at scale. Gap: nobody owns &ldquo;operators at $1M–$10M hitting the complexity wall.&rdquo; That avatar is unclaimed.</span> <span style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 999, background: "#dcfce7", color: "#166534" }}>T1 — from live pages</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Scene7() {
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
          <a href="#problem" style={{ fontFamily: T.sans, fontSize: 16, fontWeight: 500, padding: "16px 28px", borderRadius: 14, border: `1.5px solid ${T.border}`, color: T.fgSoft, textDecoration: "none" }}>
            See how it works ↓
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Controls ── */
function Controls({ scene, paused, onPrev, onNext, onPause, onRestart }: {
  scene: number; paused: boolean;
  onPrev: () => void; onNext: () => void; onPause: () => void; onRestart: () => void;
}) {
  const isLast = scene === SCENE_COUNT - 1;
  return (
    <div style={{ borderTop: `1px solid ${T.border}`, background: "rgba(250,250,247,.9)", backdropFilter: "blur(8px)", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", bottom: 0, zIndex: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {Array.from({ length: SCENE_COUNT }).map((_, i) => (
          <span key={i} style={{ height: 6, borderRadius: 999, transition: "all .35s", background: i === scene ? T.fg : i < scene ? T.fgTertiary : T.border, width: i === scene ? 28 : 8 }} />
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Ctrl onClick={onPrev} disabled={scene === 0}>‹ Back</Ctrl>
        {!isLast ? <Ctrl onClick={onPause}>{paused ? "▶ Play" : "⏸ Pause"}</Ctrl> : <Ctrl onClick={onRestart} active>↻ Replay</Ctrl>}
        <Ctrl onClick={onNext} disabled={isLast}>Next ›</Ctrl>
      </div>
    </div>
  );
}

/* ================================================================
   PHONE MOCKUP COMPONENTS — Upgraded with Hormozi/Schwartz copy
   ================================================================ */
function PhoneStatusBar() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px 2px", zIndex: 5, flexShrink: 0 }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: "#fff", letterSpacing: "-.01em" }}>9:41</span>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <svg width="13" height="10" viewBox="0 0 13 10"><rect x="0" y="4" width="2.5" height="6" rx=".8" fill="white" opacity=".4"/><rect x="3.5" y="2.5" width="2.5" height="7.5" rx=".8" fill="white" opacity=".6"/><rect x="7" y="1" width="2.5" height="9" rx=".8" fill="white" opacity=".8"/><rect x="10.5" y="0" width="2.5" height="10" rx=".8" fill="white"/></svg>
        <svg width="22" height="11" viewBox="0 0 22 11"><rect x=".5" y=".5" width="19" height="10" rx="3" stroke="white" strokeOpacity=".35" fill="none"/><rect x="1.5" y="1.5" width="15" height="8" rx="2" fill="white"/><path d="M20 4v3a1.5 1.5 0 000-3z" fill="white" opacity=".4"/></svg>
      </div>
    </div>
  );
}

function PhoneHeaderBar() {
  return (
    <div style={{ padding: "5px 12px 8px", borderBottom: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", gap: 7, background: "rgba(13,13,14,.95)", flexShrink: 0 }}>
      <div style={{ width: 22, height: 22, borderRadius: 6, background: "#F5F5F7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#0D0D0E", flexShrink: 0, fontFamily: T.serif, fontStyle: "italic" }}>G</div>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: "-.01em" }}>Grain</div>
      <div style={{ fontSize: 9, color: "rgba(255,255,255,.35)", marginLeft: 2 }}>Offer Researcher</div>
    </div>
  );
}

function PhoneMsg({ type, children }: { type: "u"|"g"; children: React.ReactNode }) {
  return (
    <div style={{ alignSelf: type === "u" ? "flex-end" : "flex-start", maxWidth: "92%" }}>
      <div style={{
        background: type === "u" ? "#0D0D0E" : "#fff",
        color: type === "u" ? "#fff" : "#0D0D0E",
        borderRadius: type === "u" ? "12px 12px 3px 12px" : "12px 12px 12px 3px",
        padding: "7px 10px", fontSize: 10, lineHeight: 1.45,
        boxShadow: type === "g" ? "0 1px 4px rgba(0,0,0,.08)" : "none",
      }}>
        {children}
      </div>
    </div>
  );
}

function PTier({ code, col, bg }: { code: string; col: string; bg: string }) {
  return <span style={{ display: "inline-flex", alignItems: "center", fontSize: 8, fontWeight: 700, padding: "1px 4px", borderRadius: 999, background: bg, color: col, letterSpacing: ".04em", margin: "1px 2px" }}>{code}</span>;
}

/** Phone 1: Build from scratch — references Schwartz stage check + purchasing power */
function PhoneScratch() {
  return (
    <div style={{ flex: 1, background: "#F5F5F7", padding: "8px", display: "flex", flexDirection: "column", gap: 5, overflowY: "hidden" }}>
      <PhoneMsg type="u">SaaS consultant. Want to build an offer for Series A founders ($5M–$30M ARR).</PhoneMsg>
      <PhoneMsg type="g">
        <div>Mode first: scratch or sharpen?</div>
        <div style={{ color: "#4F46E5", marginTop: 2, fontWeight: 600 }}>Also — this market is Stage 3–4 per Schwartz.</div>
      </PhoneMsg>
      <PhoneMsg type="u">Scratch. Stage 3 or 4?</PhoneMsg>
      <PhoneMsg type="g">
        <div style={{ marginBottom: 3 }}>&ldquo;Revenue operating system,&rdquo; &ldquo;GTM motion,&rdquo; &ldquo;scale framework&rdquo; — mechanism saturation. Stage 4.</div>
        <div style={{ color: "#B45309", fontWeight: 600 }}>Hormozi&apos;s value eq: Likelihood is where your gap is, not Outcome. Where&apos;s the proof stack?</div>
        <PTier code="T2" col="#92400E" bg="#FFFBEB" />
      </PhoneMsg>
    </div>
  );
}

/** Phone 2: Sharpen — references value equation breakdown + T1 data */
function PhoneSharpen() {
  return (
    <div style={{ flex: 1, background: "#F5F5F7", padding: "8px", display: "flex", flexDirection: "column", gap: 5, overflowY: "hidden" }}>
      <PhoneMsg type="u">$8K/mo marketing retainer. Price objections every call.</PhoneMsg>
      <PhoneMsg type="g">
        <div style={{ marginBottom: 3 }}>Hormozi&apos;s value equation: Value = (Outcome × <strong>Likelihood</strong>) ÷ (Time × Effort).</div>
        <div style={{ color: "#4F46E5" }}>Price objections = Likelihood is low, not price is high. Best vs. worst clients?</div>
      </PhoneMsg>
      <PhoneMsg type="u">Best: referred DTC brands. Worst: cold outreach, service biz.</PhoneMsg>
      <PhoneMsg type="g">
        <div style={{ fontWeight: 700, marginBottom: 2 }}>The offer isn&apos;t broken. The channel is.</div>
        <div style={{ color: "#3D3D3F" }}>Referral clients carry the trust that justifies $8K. Cold prospects need the mechanism to carry it alone — and it&apos;s not built for that yet.</div>
        <div style={{ marginTop: 3 }}><PTier code="T1" col="#065F46" bg="#ECFDF5" /><span style={{ fontSize: 8, color: "#6E6E73" }}>your own data</span></div>
      </PhoneMsg>
    </div>
  );
}

/** Phone 3: Market audit — references Schwartz stage + Hormozi ecosystem */
function PhoneAudit() {
  return (
    <div style={{ flex: 1, background: "#F5F5F7", padding: "8px", display: "flex", flexDirection: "column", gap: 5, overflowY: "hidden" }}>
      <PhoneMsg type="u">Audit: business coaching for 7-figure founders</PhoneMsg>
      <PhoneMsg type="g">
        <div style={{ color: "#34C759", fontWeight: 600, marginBottom: 4, fontSize: 9 }}>🌐 Reading live pages...</div>
        {["✓ Hormozi — Grand Slam, offer funnels", "✓ Burchard — HPX method, $997–$5K", "✓ Cardone — 10X mechanism, $15K+"].map(p => (
          <div key={p} style={{ color: "#059669", fontSize: 9, marginBottom: 2 }}>{p}</div>
        ))}
      </PhoneMsg>
      <PhoneMsg type="g">
        <div style={{ fontWeight: 700, color: "#3730A3", marginBottom: 2 }}>Stage 4 (Schwartz). Grand Slam is table stakes.</div>
        <div style={{ color: "#3D3D3F", marginBottom: 3 }}>Gap: &ldquo;$1M–$10M operators hitting the complexity ceiling&rdquo; — unclaimed avatar. No one owns it.</div>
        <PTier code="T1" col="#065F46" bg="#ECFDF5" /><span style={{ fontSize: 8, color: "#6E6E73" }}>from live pages</span>
      </PhoneMsg>
    </div>
  );
}

/* ── Primitives ── */
function Cap({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div style={{ display: center ? "flex" : "inline-flex", justifyContent: center ? "center" : undefined, alignItems: "center", gap: 8, fontSize: 12, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: T.fgMuted, marginBottom: center ? 20 : 18, ...(center ? { width: "100%" } : {}) }}>
      <span style={{ width: 20, height: 1, background: "currentColor", display: "inline-block", flexShrink: 0 }} />
      {children}
    </div>
  );
}
function Flawed({ children, kind = "guessed" }: { children: React.ReactNode; kind?: "guessed"|"undated"|"ghost" }) {
  const s = {
    guessed: { background: "rgba(220,38,38,.07)", borderBottom: "2px solid rgba(220,38,38,.4)", padding: "0 2px", borderRadius: 3 },
    undated: { background: "rgba(217,119,6,.07)", borderBottom: "2px solid rgba(217,119,6,.4)", padding: "0 2px", borderRadius: 3 },
    ghost: { background: "rgba(107,114,128,.09)", borderBottom: "2px dashed rgba(107,114,128,.4)", padding: "0 2px", borderRadius: 3 },
  };
  return <span style={s[kind]}>{children}</span>;
}
function FlawBadge({ c, t }: { c: string; t: string }) {
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, padding: "4px 10px", borderRadius: 8, background: `${c}10`, color: c, border: `1px solid ${c}25`, fontWeight: 500 }}>✗ {t}</span>;
}
function Ctrl({ children, onClick, disabled, active }: { children: React.ReactNode; onClick: () => void; disabled?: boolean; active?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, padding: "8px 16px", borderRadius: 9, border: `1px solid ${active ? T.fg : T.border}`, background: active ? T.fg : "transparent", color: active ? "#fff" : disabled ? T.border : T.fgSoft, cursor: disabled ? "not-allowed" : "pointer" }}>
      {children}
    </button>
  );
}
