"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTypewriter } from "@/lib/useTypewriter";
import { GrainMark } from "@/components/Logo";

/* ================================================================
   GRAIN — Enterprise landing page
   60-second animated demo → full product story
   Positioning: Grain is an OFFER RESEARCHER. It investigates
   your market and produces a falsifiable thesis on what to build,
   for whom, and why. Not a competitor scraper. A research partner.
   ================================================================ */

/* Design tokens */
const T = {
  bg: "#FAFAF7",
  surface: "#FFFFFF",
  fg: "#0D0D0E",
  fgSoft: "#3D3D3F",
  fgMuted: "#6E6E73",
  fgTertiary: "#AEAEB2",
  border: "#E8E8EC",
  borderStrong: "#C8C8CC",
  accent: "#4F46E5",          // indigo — investigation / intelligence
  accentSoft: "#EEF2FF",
  accentDeep: "#3730A3",
  amber: "#B45309",           // warm amber — the positioning gap
  amberBg: "#FFFBEB",
  kill: "#B91C1C",            // kill conditions
  killBg: "#FEF2F2",
  infer: "#7C3AED",           // inferred
  inferBg: "#F5F3FF",
  serif: "'Newsreader', Georgia, 'Times New Roman', serif",
  sans: "'Inter', system-ui, sans-serif",
  mono: "'IBM Plex Mono', 'Fira Code', monospace",
};

const SCENE_DURATIONS = [4500, 8000, 8500, 8000, 8500, 9000, 8000, 99999];
const SCENE_COUNT = SCENE_DURATIONS.length;

export default function Home() {
  const [scene, setScene] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);

  const go = useCallback((n: number) => setScene(Math.max(0, Math.min(SCENE_COUNT - 1, n))), []);

  useEffect(() => {
    if (paused) return;
    // Auto-advance; on the last scene, loop back to scene 0 after 8s
    const dur = scene >= SCENE_COUNT - 1 ? 8000 : SCENE_DURATIONS[scene];
    timer.current = window.setTimeout(() => {
      if (scene >= SCENE_COUNT - 1) go(0); // auto-loop
      else go(scene + 1);
    }, dur);
    return () => { if (timer.current) clearTimeout(timer.current); };
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

  return (
    <div style={{ background: T.bg, color: T.fg }}>
      {/* ── TOP NAV ── */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(250,250,247,.92)", backdropFilter: "blur(20px) saturate(180%)", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <GrainMark size="sm" variant="dark" />
            <span style={{ fontFamily: T.serif, fontSize: 18, fontWeight: 400, fontStyle: "italic", letterSpacing: "-.02em", color: T.fg }}>Grain</span>
          </div>
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <a href="#how" style={{ fontFamily: T.sans, fontSize: 14, color: T.fgMuted, padding: "7px 13px", borderRadius: 8, textDecoration: "none", fontWeight: 500 }}>How it works</a>
            <Link href="/brand" style={{ fontFamily: T.sans, fontSize: 14, color: T.fgMuted, padding: "7px 13px", borderRadius: 8, textDecoration: "none", fontWeight: 500 }}>Brand kit</Link>
            <Link href="/try" style={{ marginLeft: 6, fontFamily: T.sans, fontSize: 14, fontWeight: 600, padding: "9px 20px", borderRadius: 10, background: T.fg, color: "#fff", textDecoration: "none", boxShadow: "0 1px 2px rgba(0,0,0,.12), 0 4px 14px rgba(0,0,0,.08)" }}>
              Try free →
            </Link>
          </nav>
        </div>
      </header>

      {/* ── 60-SECOND DEMO ── */}
      <section style={{ minHeight: "calc(100vh - 60px)", display: "flex", flexDirection: "column", background: T.bg }}>
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
      <section id="how" style={{ padding: "120px 32px", background: "#fff", borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Cap>The problem with offer advice</Cap>
          <h2 style={{ font: `500 clamp(44px,5.5vw,72px)/1.03 ${T.serif}`, letterSpacing: "-.022em", color: T.fg, margin: "0 0 24px", maxWidth: 820 }}>
            Most offer advice is <em style={{ fontStyle: "italic", color: T.fgMuted }}>generic</em> because<br />
            it never looked at your market.
          </h2>
          <p style={{ fontSize: 20, color: T.fgSoft, maxWidth: 620, lineHeight: 1.62, margin: "0 0 72px", fontWeight: 400 }}>
            You&apos;ve been told to niche down, name your mechanism, and price against value. All true. None of it was built on what your specific market actually shows right now.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 960 }}>
            <Card style={{ border: `1px solid ${T.border}` }}>
              <CLabel>What generic advice gives you</CLabel>
              <p style={{ fontFamily: T.mono, fontSize: 13, color: T.fgMuted, margin: "0 0 20px", lineHeight: 1.5 }}>
                &gt; What offer should I build?
              </p>
              <div style={{ fontSize: 16, lineHeight: 1.65, color: T.fgSoft }}>
                <Flawed>Niche down to a specific audience</Flawed>{" "}
                and{" "}
                <Flawed>define your ideal client avatar.</Flawed>{" "}
                Build a clear transformation, name your mechanism, and{" "}
                <Flawed kind="ghost">position yourself as the go-to expert.</Flawed>
              </div>
              <FlawKey />
            </Card>

            <Card style={{ border: `1.5px solid ${T.fg}`, boxShadow: "0 4px 8px rgba(0,0,0,0.05), 0 12px 36px rgba(0,0,0,0.09)" }}>
              <CLabel color={T.accent}>What Grain gives you</CLabel>
              <p style={{ fontFamily: T.mono, fontSize: 13, color: T.fgMuted, margin: "0 0 16px", lineHeight: 1.5 }}>
                &gt; What offer should I build?
              </p>
              <div style={{ fontSize: 15, lineHeight: 1.65, color: T.fgSoft }}>
                <strong style={{ color: T.fg }}>Before I research anything:</strong> which mode? Building from scratch, or sharpening what you have?
              </div>
              <div style={{ marginTop: 14, padding: "12px 14px", background: T.accentSoft, borderRadius: 10, fontSize: 14, color: T.accentDeep }}>
                <strong>Then:</strong> I check what stage your market is in, who has purchasing power, whether the gap you&apos;re assuming actually exists — and I tell you what I don&apos;t know and how to close it.
              </div>
              <TierRow items={["Stage check", "Purchasing power", "The gap", "Kill-conditions"]} />
            </Card>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: HOW IT WORKS ── */}
      <ThreePhones />

      {/* ── SECTION 4: THE OUTPUT ── */}
      <section style={{ padding: "120px 32px", background: "#fff", borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Cap>The output</Cap>
          <h2 style={{ font: `500 clamp(44px,5vw,68px)/1.04 ${T.serif}`, letterSpacing: "-.022em", color: T.fg, margin: "0 0 22px", maxWidth: 780 }}>
            A verdict you can argue with.
          </h2>
          <p style={{ fontSize: 20, color: T.fgSoft, maxWidth: 580, lineHeight: 1.62, margin: "0 0 72px" }}>
            Not a summary. Not five bullet points of advice. A falsifiable thesis with six sections — and a mandatory section that tells you what would prove it wrong.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, marginBottom: 72 }}>
            {[
              { n: "01", title: "The Verdict", body: "One sentence. Build this offer / rebuild the positioning / your constraint is X. A real call, not a hedge.", col: T.accent, bg: T.accentSoft },
              { n: "02", title: "The Positioning Gap", body: "What no competitor is currently saying. Based on what the market actually shows — not what you assume it shows.", col: T.amber, bg: T.amberBg },
              { n: "03", title: "The Mechanism", body: "Named. Specific. Explains why past attempts failed AND why this approach is different. Not just a label.", col: T.fg, bg: "#F5F5F3" },
              { n: "04", title: "The Ledger", body: "Known / Inferred / Unknown, strictly separated. Grain names the gaps and tells you exactly how to close each one.", col: T.infer, bg: T.inferBg },
              { n: "05", title: "Three Kill-Conditions", body: "The disconfirming evidence. If Grain found these, it would change the verdict. This is the part no generic tool gives you.", col: T.kill, bg: T.killBg },
              { n: "06", title: "The Next Question", body: "The single highest-leverage thing to validate — and exactly how to validate it. Not 'do more research.' One action.", col: "#059669", bg: "#ECFDF5" },
            ].map(o => (
              <div key={o.n}
                style={{ padding: "32px 28px", borderRadius: 20, background: o.bg, border: `1px solid ${o.col}18`, transition: "transform .25s, box-shadow .25s", cursor: "default" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(0,0,0,.09)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}>
                <div style={{ fontFamily: T.mono, fontSize: 12, fontWeight: 600, color: o.col, letterSpacing: ".06em", marginBottom: 14 }}>{o.n}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: T.fg, letterSpacing: "-.012em", marginBottom: 10 }}>{o.title}</h3>
                <p style={{ fontSize: 14.5, color: T.fgSoft, lineHeight: 1.6, margin: 0 }}>{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: FREE CTA ── */}
      <section style={{ padding: "120px 32px", background: T.fg, position: "relative", overflow: "hidden", textAlign: "center" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(60% 60% at 50% 0%, rgba(79,70,229,.18), transparent 65%), radial-gradient(40% 40% at 80% 100%, rgba(79,70,229,.1), transparent 60%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ width: 48, height: 48, borderRadius: 13, background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
            <span style={{ fontFamily: T.serif, fontSize: 22, color: "#fff", fontStyle: "italic", fontWeight: 400 }}>G</span>
          </div>

          <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.35)", marginBottom: 24 }}>Pricing · always</div>

          <h2 style={{ font: `400 clamp(52px,6vw,80px)/1.02 ${T.serif}`, letterSpacing: "-.022em", color: "#fff", margin: "0 0 12px" }}>
            Free.<br />
            <em style={{ color: "rgba(255,255,255,.45)", fontStyle: "italic" }}>Completely.</em>
          </h2>

          <p style={{ fontSize: 20, color: "rgba(255,255,255,.55)", maxWidth: 480, margin: "0 auto 56px", lineHeight: 1.65 }}>
            No account. No credit card. No trial expiry. No paid tier waiting behind it. Grain is free because the research should be accessible, not gated.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
            <Link href="/try" style={{ fontFamily: T.sans, fontSize: 17, fontWeight: 600, padding: "16px 36px", borderRadius: 14, background: "#fff", color: T.fg, textDecoration: "none", boxShadow: "0 4px 20px rgba(0,0,0,.2)" }}>
              Start your investigation →
            </Link>
            <a href="https://github.com/griffainai/grain-offer-researcher" target="_blank" rel="noopener" style={{ fontFamily: T.sans, fontSize: 16, fontWeight: 500, padding: "16px 28px", borderRadius: 14, border: "1px solid rgba(255,255,255,.18)", color: "rgba(255,255,255,.7)", textDecoration: "none" }}>
              Fork the folder ↗
            </a>
          </div>

          <p style={{ fontFamily: T.mono, fontSize: 12, color: "rgba(255,255,255,.22)", letterSpacing: ".04em" }}>
            Built on Interpretable Context Methodology · Competition #6 — The Researcher · griffainai
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "40px 32px", borderTop: `1px solid ${T.border}`, background: T.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <span style={{ fontFamily: T.sans, fontWeight: 600, fontSize: 15, color: T.fg }}>Grain — No advice. A verdict on your offer.</span>
          <div style={{ display: "flex", gap: 24, fontSize: 13, color: T.fgMuted }}>
            <Link href="/try" style={{ color: "inherit", textDecoration: "none" }}>Workspace</Link>
            <a href="https://github.com/griffainai/grain-offer-researcher" style={{ color: "inherit", textDecoration: "none" }}>GitHub</a>
            <span>© 2026 griffainai</span>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes sceneUp { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes marq { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes blinkC { 0%,49%{opacity:1}50%,100%{opacity:0} }
        .cursor-g::after { content:''; display:inline-block; width:2px; height:1.1em; background:currentColor; margin-left:3px; vertical-align:-0.07em; border-radius:1px; animation:blinkC 1s steps(1) infinite; }
      `}</style>
    </div>
  );
}

/* ================================================================
   60-SECOND DEMO SCENES
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

/* Scene 0 — Cold open */
function Scene0() {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ width: 72, height: 72, borderRadius: 18, background: T.fg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", boxShadow: "0 20px 60px rgba(0,0,0,.18)" }}>
        <span style={{ fontFamily: T.serif, fontSize: 36, fontWeight: 400, color: "#fff", fontStyle: "italic" }}>G</span>
      </div>
      <div className="stagger">
        <h1 style={{ animationDelay: "100ms", font: `400 clamp(60px,9vw,110px)/0.95 ${T.serif}`, letterSpacing: "-.026em", color: T.fg, margin: "0 0 24px" }}>Grain</h1>
        <p style={{ animationDelay: "300ms", fontSize: "clamp(20px,2.8vw,28px)", color: T.fgSoft, maxWidth: 600, margin: "0 auto 20px", lineHeight: 1.5, fontWeight: 400 }}>
          No advice. A verdict on your offer.
        </p>
        <p style={{ animationDelay: "550ms", fontFamily: T.mono, fontSize: 13, letterSpacing: ".14em", textTransform: "uppercase", color: T.fgTertiary }}>
          An offer researcher — free, always
        </p>
      </div>
    </div>
  );
}

/* Scene 1 — The problem (PAS: concrete situation) */
function Scene1() {
  const { out, done } = useTypewriter("You've hired a coach. Read the books. Built the funnel.", { speed: 30 });
  return (
    <div style={{ textAlign: "center" }}>
      <Cap center>The problem every founder hits</Cap>
      <p style={{ font: `400 clamp(36px,5.2vw,68px)/1.06 ${T.serif}`, letterSpacing: "-.022em", color: T.fg, margin: "0 0 32px" }} className={!done ? "cursor-g" : ""}>{out}</p>
      <div className="stagger">
        <p style={{ animationDelay: "2600ms", fontSize: 19, color: T.fgSoft, maxWidth: 640, margin: "0 auto 20px", lineHeight: 1.65 }}>
          The clients still aren&apos;t converting. The price objections are still there. You can&apos;t explain — in one sentence — why this specific type of person would buy <em style={{ fontStyle: "italic", color: T.fg }}>right now</em>.
        </p>
        <p style={{ animationDelay: "3500ms", fontSize: 18, color: T.accent, fontWeight: 600, maxWidth: 540, margin: "0 auto" }}>
          The advice was right. It just wasn&apos;t built on what your market actually shows.
        </p>
      </div>
    </div>
  );
}

/* Scene 2 — Generic advice failure */
function Scene2() {
  return (
    <div className="stagger">
      <div style={{ animationDelay: "0ms" }}><Cap center>What generic AI gives you</Cap></div>
      <div style={{ animationDelay: "200ms", fontFamily: T.mono, fontSize: 14, color: T.fgMuted, textAlign: "center", marginBottom: 20 }}>&gt; What offer should I build for my consulting business?</div>
      <div style={{ animationDelay: "700ms", maxWidth: 680, margin: "0 auto", background: T.surface, border: `1px solid ${T.border}`, borderRadius: 18, padding: "28px 32px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: T.fgSoft, margin: "0 0 20px" }}>
          Great question!{" "}
          <Flawed>Define your ideal client avatar</Flawed>{" "}
          and{" "}
          <Flawed>focus on a specific pain point.</Flawed>{" "}
          Create a clear transformation statement and{" "}
          <Flawed kind="ghost">price your services to reflect your value.</Flawed>{" "}
          Consider adding a productized service to scale.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <FlawBadge c="#E02020" t="Guessed — no market data" />
          <FlawBadge c="#D97706" t="Undated — Stage? Unknown" />
          <FlawBadge c="#8E8E93" t="Applies to literally every consultant" />
        </div>
      </div>
      <p style={{ animationDelay: "1800ms", textAlign: "center", fontSize: 16, color: T.fgMuted, marginTop: 24 }}>A framework. Not a verdict. And zero investigation of your actual market.</p>
    </div>
  );
}

/* Scene 3 — Grain's first move (the gate) */
function Scene3() {
  const { out, done } = useTypewriter("Grain asks before it assumes.", { speed: 36 });
  return (
    <div>
      <Cap center>The no-dossier gate</Cap>
      <h2 style={{ font: `400 clamp(38px,5vw,66px)/1.05 ${T.serif}`, letterSpacing: "-.022em", color: T.fg, textAlign: "center", margin: "0 0 36px" }} className={!done ? "cursor-g" : ""}>{out}</h2>
      <div className="stagger" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, maxWidth: 800, margin: "0 auto" }}>
        {[
          { n: "01", q: "Which mode?", a: "Building from scratch — or sharpening an offer you already have? The investigation is different for each.", col: T.accent },
          { n: "02", q: "What do you already know?", a: "What do you believe about this market? So I can confirm — or disconfirm — it, not just repeat it back.", col: T.amber },
          { n: "03", q: "What have you already tried?", a: "What channels, what prices, what pitches. So I weigh new evidence against what's already on the table.", col: T.infer },
          { n: "04", q: "What's your best client look like?", a: "Your best vs. worst client split is the only T1 data point in offer research. That's where I start.", col: "#059669" },
        ].map((q, i) => (
          <div key={q.n} style={{ animationDelay: `${2000 + i * 250}ms`, padding: "18px 20px", borderRadius: 14, background: T.surface, border: `1px solid ${T.border}`, display: "flex", gap: 14, alignItems: "flex-start" }}>
            <span style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 700, color: q.col, letterSpacing: ".08em", flexShrink: 0, paddingTop: 2 }}>{q.n}</span>
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

/* Scene 4 — Sophistication check */
function Scene4() {
  const { out, done } = useTypewriter("Most founders are pitching Stage 1 claims into Stage 4 markets.", { speed: 24 });
  return (
    <div>
      <Cap center>The sophistication check</Cap>
      <p style={{ font: `400 clamp(30px,4vw,54px)/1.08 ${T.serif}`, letterSpacing: "-.02em", color: T.fg, textAlign: "center", margin: "0 auto 40px", maxWidth: 780 }} className={!done ? "cursor-g" : ""}>{out}</p>
      <div className="stagger" style={{ display: "flex", gap: 12, maxWidth: 880, margin: "0 auto" }}>
        {[
          { s: "1", label: "State a benefit", ex: "\"I help coaches grow.\"", col: "#6B7280", note: "First to market. No competition yet." },
          { s: "2", label: "Enlarge the claim", ex: "\"30 clients in 90 days.\"", col: "#059669", note: "Competitors arrived." },
          { s: "3", label: "Name a mechanism", ex: "\"The Authority Engine.\"", col: T.accent, note: "Claims saturate. Mechanism enters." },
          { s: "4", label: "Prove the mechanism", ex: "\"Here&apos;s why it works…\"", col: T.amber, note: "Everyone has a named method now." },
          { s: "5", label: "Become the brand", ex: "\"We&apos;re the kind of people who…\"", col: T.infer, note: "Identity. Claims are exhausted." },
        ].map((st, i) => {
          const isHot = st.s === "3" || st.s === "4";
          return (
            <div key={st.s} style={{ animationDelay: `${2800 + i * 300}ms`, flex: 1, padding: "16px 14px", borderRadius: 14, background: isHot ? st.col : T.surface, border: `2px solid ${isHot ? st.col : T.border}`, boxShadow: isHot ? `0 8px 24px ${st.col}30` : "none", transition: "transform .2s" }}>
              <div style={{ fontFamily: T.mono, fontSize: 12, fontWeight: 700, color: isHot ? "#fff" : st.col, marginBottom: 6 }}>Stage {st.s}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: isHot ? "#fff" : T.fg, marginBottom: 4 }}>{st.label}</div>
              <div style={{ fontSize: 11, color: isHot ? "rgba(255,255,255,.75)" : T.fgMuted, lineHeight: 1.4 }} dangerouslySetInnerHTML={{ __html: st.ex }} />
            </div>
          );
        })}
      </div>
      <p className="stagger" style={{ animationDelay: "4500ms", textAlign: "center", fontSize: 15, color: T.fgMuted, marginTop: 24 }}>
        Grain locates your market on this scale before recommending any positioning. If you&apos;re in Stage 3-4, the mechanism is the load-bearing element — not the claim.
      </p>
    </div>
  );
}

/* Scene 5 — The thesis */
function Scene5() {
  const rows = [
    { k: "THE VERDICT", v: "Build this / rebuild the positioning / your constraint is X. One sentence. A real call.", col: T.fg },
    { k: "THE GAP", v: "The specific claim no competitor makes. The avatar segment no one has owned. Based on evidence.", col: T.accent },
    { k: "THE MECHANISM", v: "Named. Explains why past attempts failed AND why this is different. Not just a label.", col: T.amber },
    { k: "THE LEDGER", v: "Known / Inferred / Unknown — kept strictly separate. Grain leads with what it doesn't know.", col: T.infer },
  ];
  return (
    <div>
      <Cap center>What you walk away with</Cap>
      <h2 style={{ font: `400 clamp(38px,5vw,66px)/1.04 ${T.serif}`, letterSpacing: "-.022em", color: T.fg, textAlign: "center", margin: "0 0 40px" }}>
        A falsifiable offer thesis.
      </h2>
      <div className="stagger" style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 700, margin: "0 auto" }}>
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
        <div style={{ animationDelay: "2000ms", padding: "14px 18px", borderRadius: 12, background: T.surface, border: `1px solid ${T.border}`, display: "flex", gap: 16, alignItems: "baseline" }}>
          <span style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, letterSpacing: ".08em", color: "#059669", flexShrink: 0, width: 130 }}>THE NEXT Q</span>
          <span style={{ fontSize: 14, color: T.fgSoft, lineHeight: 1.5 }}>The single highest-leverage thing to validate — and exactly how to validate it. One action, not "do more research."</span>
        </div>
      </div>
    </div>
  );
}

/* Scene 6 — Live market research */
function Scene6() {
  const { out, done } = useTypewriter("When you need live data — Grain reads real competitor pages right now.", { speed: 26 });
  return (
    <div>
      <Cap center>The market audit (when you need it)</Cap>
      <p style={{ font: `400 clamp(28px,3.8vw,50px)/1.1 ${T.serif}`, letterSpacing: "-.02em", color: T.fg, textAlign: "center", margin: "0 auto 36px", maxWidth: 760 }} className={!done ? "cursor-g" : ""}>{out}</p>
      <div className="stagger" style={{ maxWidth: 680, margin: "0 auto", background: T.surface, border: `1px solid ${T.border}`, borderRadius: 18, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,.06)" }}>
        <div style={{ padding: "14px 20px", background: T.fg, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,.5)", letterSpacing: ".1em" }}>AUDIT MODE · LIVE</span>
          <span style={{ marginLeft: "auto", width: 8, height: 8, borderRadius: 999, background: "#34C759" }} />
        </div>
        <div style={{ padding: "20px 22px" }}>
          <p style={{ fontFamily: T.mono, fontSize: 13, color: T.fgMuted, margin: "0 0 16px" }}>&gt; Audit: executive coaching for founders</p>
          <div style={{ fontSize: 13, color: "#34C759", fontWeight: 600, marginBottom: 12, fontFamily: T.mono }}>🌐 Reading live pages...</div>
          {["Brendon Burchard — homepage + pricing", "Skool / Sam Ovens — programs page", "Tony Robbins Business — coaching", "Alex Hormozi — offer structure"].map((p, i) => (
            <div key={p} className="stagger">
              <div style={{ animationDelay: `${3000 + i * 600}ms`, display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#059669", marginBottom: 6, fontFamily: T.mono }}>
                <span>✓</span><span style={{ color: T.fgSoft }}>{p}</span>
              </div>
            </div>
          ))}
          <div className="stagger">
            <div style={{ animationDelay: "6000ms", marginTop: 16, padding: "12px 16px", background: T.accentSoft, borderRadius: 10, fontSize: 14, lineHeight: 1.6 }}>
              <strong style={{ color: T.accentDeep }}>Stage 4 market.</strong> <span style={{ color: T.fgSoft }}>Everyone has a named mechanism. The gap: no one owns the &ldquo;from first client to $30K/month&rdquo; window for technical founders. That&apos;s your positioning. </span>
              <span style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 999, background: "#dcfce7", color: "#166534" }}>T1 — from live pages</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Scene 7 — Close */
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
      <p style={{ animationDelay: "400ms", fontSize: 20, color: T.fgSoft, maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.62 }}>
        Free. No account. No card. Just name your market and run the investigation.
      </p>
      <div style={{ animationDelay: "650ms" }} className="stagger">
        <div style={{ animationDelay: "650ms", display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <Link href="/try" style={{ fontFamily: T.sans, fontSize: 17, fontWeight: 600, padding: "16px 36px", borderRadius: 14, background: T.fg, color: "#fff", textDecoration: "none", boxShadow: "0 4px 20px rgba(0,0,0,.14)" }}>
            Start your investigation →
          </Link>
          <a href="#how" style={{ fontFamily: T.sans, fontSize: 16, fontWeight: 500, padding: "16px 28px", borderRadius: 14, border: `1.5px solid ${T.border}`, color: T.fgSoft, textDecoration: "none" }}>
            See how it works ↓
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Demo controls ── */
function Controls({ scene, paused, onPrev, onNext, onPause, onRestart }: {
  scene: number; paused: boolean;
  onPrev: () => void; onNext: () => void; onPause: () => void; onRestart: () => void;
}) {
  const isLast = scene === SCENE_COUNT - 1;
  return (
    <div style={{ borderTop: `1px solid ${T.border}`, background: "rgba(250,250,247,.9)", backdropFilter: "blur(8px)", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", bottom: 0, zIndex: 10 }}>
      {/* Progress dots */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {Array.from({ length: SCENE_COUNT }).map((_, i) => (
          <span key={i} style={{ height: 6, borderRadius: 999, transition: "all .35s", background: i === scene ? T.fg : i < scene ? T.fgTertiary : T.border, width: i === scene ? 28 : 8 }} />
        ))}
      </div>
      {/* Buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Ctrl onClick={onPrev} disabled={scene === 0}>‹ Back</Ctrl>
        {!isLast
          ? <Ctrl onClick={onPause}>{paused ? "▶ Play" : "⏸ Pause"}</Ctrl>
          : <Ctrl onClick={onRestart} active>↻ Replay</Ctrl>}
        <Ctrl onClick={onNext} disabled={isLast}>Next ›</Ctrl>
      </div>
    </div>
  );
}

/* ── Three-phone section ── */
function ThreePhones() {
  const [active, setActive] = useState(1);
  const N = 3;
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % N), 4200);
    return () => clearInterval(t);
  }, []);

  const slides = [
    { step: "01 · Scratch", title: "Find the right offer before you build", desc: "No offer yet? Three questions, a sophistication check, and a falsifiable thesis on what to build and for whom — with the gap your market actually has.", phone: <PhoneScratch /> },
    { step: "02 · Sharpen", title: "Diagnose exactly what's broken", desc: "Have an offer but conversion, price objections, or churn won't move? Grain runs the sharpen gate and finds the root cause from your real data.", phone: <PhoneSharpen /> },
    { step: "03 · Market Audit", title: "Research the live competitive landscape", desc: "Need to know what competitors actually say and charge right now? Grain reads their pages and maps the gap no one owns.", phone: <PhoneAudit /> },
  ];

  return (
    <section id="how" style={{ padding: "120px 32px", background: "#F7F7F4", borderTop: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Cap>Three modes</Cap>
        <h2 style={{ font: `400 clamp(42px,5.2vw,68px)/1.04 ${T.serif}`, letterSpacing: "-.022em", color: T.fg, margin: "0 0 16px", maxWidth: 680 }}>
          One investigation. Right for your moment.
        </h2>
        <p style={{ fontSize: 20, color: T.fgSoft, maxWidth: 520, lineHeight: 1.62, margin: "0 0 72px" }}>
          Whether you&apos;re starting from zero or diagnosing a broken offer, Grain runs the right investigation and returns a falsifiable thesis — not advice.
        </p>

        <div className="hs-carousel">
          <button className="hs-arrow left" onClick={() => setActive((active - 1 + N) % N)}>←</button>
          <div className="hs-track-wrap">
            <div className="hs-cards">
              {slides.map((s, i) => {
                const prev = (active - 1 + N) % N;
                const next = (active + 1) % N;
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
    </section>
  );
}

/* Phone shell components */
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

function PhoneChat({ msgs }: { msgs: Array<{ r: "u" | "g"; t: string; t2?: string }> }) {
  return (
    <div style={{ flex: 1, background: "#F5F5F7", padding: "8px", display: "flex", flexDirection: "column", gap: 5, overflowY: "hidden" }}>
      {msgs.map((m, i) => (
        <div key={i} style={{ alignSelf: m.r === "u" ? "flex-end" : "flex-start", maxWidth: "90%" }}>
          <div style={{ background: m.r === "u" ? "#0D0D0E" : "#fff", color: m.r === "u" ? "#fff" : "#0D0D0E", borderRadius: m.r === "u" ? "12px 12px 3px 12px" : "12px 12px 12px 3px", padding: "7px 10px", fontSize: 10, lineHeight: 1.45, boxShadow: m.r === "g" ? "0 1px 4px rgba(0,0,0,.08)" : "none" }}>
            {m.t}
            {m.t2 && <span style={{ display: "block", marginTop: 3, fontSize: 9.5, color: m.r === "u" ? "rgba(255,255,255,.65)" : "#6E6E73" }}>{m.t2}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

function PhoneScratch() {
  return <PhoneChat msgs={[
    { r: "u", t: "Building from scratch. SaaS consulting for Series A companies." },
    { r: "g", t: "Three questions before anything:", t2: "1. Does your dream client pay premium? 2. What have you tried? 3. What do your best past clients have in common?" },
    { r: "u", t: "Think so. Nothing yet. All inbound referrals so far." },
    { r: "g", t: "T4 — purchasing power inferred.", t2: "Series A SaaS salary confirms budget. But 'referrals only' = offer being carried by trust. Let me check if it survives cold." },
  ]} />;
}

function PhoneSharpen() {
  return <PhoneChat msgs={[
    { r: "u", t: "My $6K/month retainer isn't closing. Always price objections." },
    { r: "g", t: "Best vs. worst clients — what do they have in common?" },
    { r: "u", t: "Best: e-comm brands, came from referrals. Worst: cold outreach, service businesses." },
    { r: "g", t: "The offer isn't broken. The channel is. T1 — your own data.", t2: "Price objections from cold outreach = trust gap, not price ceiling. Referral e-comm close fine = proof the offer works at this price for the right person." },
  ]} />;
}

function PhoneAudit() {
  return <PhoneChat msgs={[
    { r: "u", t: "Audit: executive coaching for founders" },
    { r: "g", t: "🌐 Reading live pages..." },
    { r: "g", t: "✓ Brendon Burchard · ✓ Skool / Ovens · ✓ Tony Robbins · ✓ Hormozi programs" },
    { r: "g", t: "Stage 4. Gap: nobody owns 'first 90 days of revenue for technical founders.' T1 from live pages.", t2: "Competitors: all claiming named mechanisms. None targeting the pre-traction technical founder specifically." },
  ]} />;
}

/* ── Primitive components ── */
function Cap({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: T.fgMuted, marginBottom: 18, ...(center ? { display: "flex" as const, justifyContent: "center", margin: "0 auto 20px", width: "100%" } : {}) }}>
      <span style={{ width: 20, height: 1, background: "currentColor", display: "inline-block", flexShrink: 0 }} />
      {children}
    </div>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ padding: "28px 28px", borderRadius: 20, background: T.surface, ...style }}>{children}</div>;
}

function CLabel({ children, color }: { children: React.ReactNode; color?: string }) {
  return <div style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: color ?? T.fgMuted, marginBottom: 14 }}>{children}</div>;
}

function Flawed({ children, kind = "guessed" }: { children: React.ReactNode; kind?: "guessed" | "undated" | "ghost" }) {
  const styles = {
    guessed: { background: "rgba(220,38,38,.08)", borderBottom: "2px solid rgba(220,38,38,.4)", padding: "0 2px", borderRadius: 3 },
    undated: { background: "rgba(217,119,6,.08)", borderBottom: "2px solid rgba(217,119,6,.4)", padding: "0 2px", borderRadius: 3 },
    ghost: { background: "rgba(107,114,128,.1)", borderBottom: "2px dashed rgba(107,114,128,.4)", padding: "0 2px", borderRadius: 3 },
  };
  return <span style={styles[kind]}>{children}</span>;
}

function FlawKey() {
  return (
    <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${T.border}` }}>
      {[["#DC2626", "Guessed — no source, no date"], ["#D97706", "Undated — market data decays"], ["#6B7280", "Horoscope — applies to everyone"]].map(([c, l]) => (
        <div key={l} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: T.fgMuted, marginBottom: 7 }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: `${c}20`, border: `1.5px solid ${c}`, flexShrink: 0 }} />
          {l}
        </div>
      ))}
    </div>
  );
}

function FlawBadge({ c, t }: { c: string; t: string }) {
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, padding: "4px 10px", borderRadius: 8, background: `${c}12`, color: c, border: `1px solid ${c}28`, fontWeight: 500 }}>✗ {t}</span>;
}

function TierRow({ items }: { items: string[] }) {
  return (
    <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 6 }}>
      {items.map(t => (
        <span key={t} style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 6, background: T.accentSoft, color: T.accentDeep, letterSpacing: ".04em" }}>{t}</span>
      ))}
    </div>
  );
}

function Ctrl({ children, onClick, disabled, active }: { children: React.ReactNode; onClick: () => void; disabled?: boolean; active?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, padding: "8px 16px", borderRadius: 9, border: `1px solid ${active ? T.fg : T.border}`, background: active ? T.fg : "transparent", color: active ? "#fff" : disabled ? T.border : T.fgSoft, cursor: disabled ? "not-allowed" : "pointer", transition: "all .18s" }}>
      {children}
    </button>
  );
}
