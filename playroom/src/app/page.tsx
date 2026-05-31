"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ================================================================
   GRAIN — Full 5-section landing page
   Design pattern: iPhone mockups with live chatbot UIs (ported
   from NextSteps landing). No images — phones render React.
   ================================================================ */

export default function Home() {
  return (
    <div style={{ background: "#FAFAF8" }}>
      <LandingNav />
      <Hero />
      <SocialStrip />
      <Problem />
      <HowItWorks />
      <OutputShowcase />
      <FreeCTA />
      <LandingFooter />
    </div>
  );
}

/* ------------------------------------------------------------------ NAV */
function LandingNav() {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(250,250,248,.88)", backdropFilter: "blur(16px)", borderBottom: "1px solid #E5E5EA" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 28px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 9, background: "#1D1D1F", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#fff" }}>G</div>
          <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: "-.016em", color: "#1D1D1F" }}>Grain</span>
        </div>
        <nav style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <a href="#how" style={{ fontSize: 14, color: "#6E6E73", padding: "6px 12px", borderRadius: 8, textDecoration: "none", fontWeight: 500 }}>How it works</a>
          <a href="#free" style={{ fontSize: 14, color: "#6E6E73", padding: "6px 12px", borderRadius: 8, textDecoration: "none", fontWeight: 500 }}>Pricing</a>
          <Link href="/try" style={{ fontSize: 14, fontWeight: 700, padding: "8px 18px", borderRadius: 10, background: "#1D1D1F", color: "#fff", textDecoration: "none", boxShadow: "0 1px 3px rgba(0,0,0,.15), 0 4px 12px rgba(0,0,0,.08)" }}>
            Try free →
          </Link>
        </nav>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ HERO */
function Hero() {
  const phoneRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const rotation = useRef({ y: -8, x: 6 });

  useEffect(() => {
    const el = phoneRef.current;
    if (!el) return;
    const onDown = (e: PointerEvent) => {
      dragging.current = true;
      lastPos.current = { x: e.clientX, y: e.clientY };
      el.style.cursor = "grabbing";
      el.style.transition = "none";
      if (hintRef.current) hintRef.current.style.opacity = "0";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      lastPos.current = { x: e.clientX, y: e.clientY };
      rotation.current.y = Math.max(-18, Math.min(18, rotation.current.y + dx * 0.25));
      rotation.current.x = Math.max(-8, Math.min(14, rotation.current.x - dy * 0.25));
      el.style.transform = `perspective(1800px) rotateY(${rotation.current.y}deg) rotateX(${rotation.current.x}deg)`;
    };
    const onUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      el.style.cursor = "grab";
      el.style.transition = "transform .4s cubic-bezier(0.16,1,0.3,1)";
      rotation.current = { y: -8, x: 6 };
      el.style.transform = `perspective(1800px) rotateY(-8deg) rotateX(6deg)`;
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => { el.removeEventListener("pointerdown", onDown); window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); };
  }, []);

  return (
    <section style={{ padding: "120px 0 96px", background: "linear-gradient(180deg, #FAFAF8 0%, #F5F5F0 100%)", position: "relative", overflow: "hidden" }}>
      {/* grid bg */}
      <div aria-hidden style={{ position: "absolute", inset: 0, opacity: .25, backgroundImage: "linear-gradient(rgba(0,0,0,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.045) 1px, transparent 1px)", backgroundSize: "48px 48px", maskImage: "radial-gradient(ellipse 70% 60% at center, black, transparent 80%)" }} />

      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 28px", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 48, alignItems: "center" }}>

        {/* Copy */}
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#5E5CE6", marginBottom: 22, padding: "6px 14px", borderRadius: 999, background: "rgba(94,92,230,.08)", border: "1px solid rgba(94,92,230,.2)" }}>
            <span style={{ display: "inline-block", width: 18, height: 1, background: "currentColor" }} />
            Free offer research
          </div>

          <h1 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "clamp(48px, 6vw, 82px)", fontWeight: 500, lineHeight: 1, letterSpacing: "-.022em", color: "#1D1D1F", margin: "0 0 24px" }}>
            Stop getting<br />
            <span style={{ position: "relative", display: "inline-block" }}>
              advice.
              <span style={{ position: "absolute", left: -4, right: -4, bottom: "6%", height: "18%", background: "rgba(94,92,230,.2)", borderRadius: 3, zIndex: -1 }} aria-hidden />
            </span>{" "}
            Get a verdict.
          </h1>

          <p style={{ fontSize: 19, color: "#4A4A4A", maxWidth: 520, lineHeight: 1.62, marginBottom: 34, fontWeight: 400 }}>
            Grain reads real competitor websites right now, maps their positioning, finds the gap no one owns, and hands you a falsifiable offer thesis. Not frameworks. A verdict. Completely free.
          </p>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
            <Link href="/try" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 16, fontWeight: 700, padding: "14px 26px", borderRadius: 12, background: "#1D1D1F", color: "#fff", textDecoration: "none", boxShadow: "0 1px 0 rgba(255,255,255,.06) inset, 0 4px 16px rgba(0,0,0,.1)" }}>
              Audit my market free <span style={{ transition: "transform .2s" }}>→</span>
            </Link>
            <a href="#how" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 16, fontWeight: 600, padding: "14px 24px", borderRadius: 12, background: "rgba(255,255,255,.8)", border: "1px solid #E5E5EA", color: "#1D1D1F", textDecoration: "none" }}>
              See how it works
            </a>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center", fontSize: 12.5, color: "#8E8E93", fontWeight: 500, paddingTop: 22, borderTop: "1px solid #E5E5EA" }}>
            {["No account", "No credit card", "No install", "Fork the folder"].map(t => (
              <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: "#34C759", display: "inline-block" }} />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* iPhone stage */}
        <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", minHeight: 640 }}>
          <div className="hero-phone-band" aria-hidden />

          {/* Floating stat 1 */}
          <div className="hero-floater hero-floater-1">
            <div className="hf-val">5</div>
            <div className="hf-lbl">competitor pages read per audit</div>
            <div className="hf-badge">live data, not training guesses</div>
          </div>

          {/* The hero phone */}
          <div ref={phoneRef} className="phone-shell" style={{ width: 310, cursor: "grab", transform: "perspective(1800px) rotateY(-8deg) rotateX(6deg)", transition: "transform .35s cubic-bezier(0.16,1,0.3,1)", userSelect: "none", WebkitUserSelect: "none" }}>
            <div className="phone-screen" style={{ display: "flex", flexDirection: "column" }}>
              <PhoneStatusBar />
              <PhoneHeaderBar />
              <PhoneChatAudit />
            </div>
          </div>

          <div ref={hintRef} style={{ position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%)", background: "#1D1D1F", color: "#fff", fontSize: 12, fontWeight: 500, padding: "7px 14px", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 14px 30px -12px rgba(0,0,0,.4)", pointerEvents: "none", transition: "opacity .5s", whiteSpace: "nowrap" }}>
            <span style={{ width: 14, height: 14, borderRadius: 999, background: "#5E5CE6" }} />
            Drag the phone
          </div>

          {/* Floating stat 2 */}
          <div className="hero-floater hero-floater-2">
            <div className="hf-val">83%</div>
            <div className="hf-lbl">of markets Grain audits are Stage 3–4</div>
            <div className="hf-badge">the mechanism is the gap</div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ SOCIAL STRIP */
function SocialStrip() {
  const items = ["Interpretable Context Methodology", "EDUBA Community", "Weekly Comp #6 — The Researcher", "Jake Van Clief", "Free. Always.", "No API key needed", "Built on ICM", "Open folder architecture", "Interpretable Context Methodology"];
  return (
    <div style={{ padding: "28px 0", background: "#fff", borderTop: "1px solid #E5E5EA", borderBottom: "1px solid #E5E5EA", overflow: "hidden" }}>
      <p style={{ textAlign: "center", fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: "#AEAEB2", fontWeight: 600, marginBottom: 18 }}>Built for</p>
      <div style={{ overflow: "hidden", maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)" }}>
        <div style={{ display: "flex", gap: 52, alignItems: "center", animation: "marq 28s linear infinite", width: "max-content" }}>
          {[...items, ...items].map((t, i) => (
            <span key={i} style={{ fontSize: 15, fontWeight: 600, color: "#C7C7CC", whiteSpace: "nowrap", letterSpacing: "-.008em" }}>{t}</span>
          ))}
        </div>
      </div>
      <style>{`@keyframes marq { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

/* ------------------------------------------------------------------ PROBLEM */
function Problem() {
  return (
    <section style={{ padding: "100px 0", background: "#FAFAF8" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 28px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#8E8E93", marginBottom: 18 }}>
            <span style={{ width: 20, height: 1, background: "currentColor", display: "inline-block" }} />
            The problem
          </div>
          <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "clamp(38px, 4.6vw, 64px)", fontWeight: 500, letterSpacing: "-.02em", lineHeight: 1.04, color: "#1D1D1F", margin: "0 0 22px" }}>
            Every founder gets<br />
            <em style={{ fontStyle: "italic", color: "#6E6E73" }}>the same advice.</em>
          </h2>
          <p style={{ fontSize: 18, color: "#6E6E73", maxWidth: 580, margin: "0 auto", lineHeight: 1.6 }}>
            Niche down. Name your mechanism. Price against value. True. Generic. And built on nothing your market actually shows right now.
          </p>
        </div>

        {/* Side-by-side comparison */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 960, margin: "0 auto" }}>
          {/* Generic AI */}
          <div style={{ background: "#fff", border: "1px solid #E5E5EA", borderRadius: 22, overflow: "hidden", boxShadow: "0 2px 4px rgba(0,0,0,0.04), 0 6px 18px rgba(0,0,0,0.06)" }}>
            <div style={{ padding: "14px 20px", borderBottom: "1px solid #F2F2F7", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#F8F8F8" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#8E8E93", letterSpacing: ".06em", textTransform: "uppercase" }}>🤖 Generic AI</span>
              <span style={{ fontSize: 10.5, color: "#AEAEB2", fontWeight: 500 }}>Confident · Guessed · Undated</span>
            </div>
            <div style={{ padding: "20px 22px" }}>
              <div style={{ fontSize: 12.5, color: "#6E6E73", fontFamily: "monospace", marginBottom: 14 }}>&gt; Help me build my offer. I'm a business coach.</div>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: "#3A3A3C" }}>
                Great! <span style={{ background: "rgba(255,59,48,.1)", borderBottom: "2px solid rgba(255,59,48,.4)", padding: "0 2px", borderRadius: 2 }}>Business coaching is a booming market</span> with high demand. I'd recommend building around a clear transformation, defining your ideal client avatar, and <span style={{ background: "rgba(174,174,178,.15)", borderBottom: "2px dashed #C7C7CC", padding: "0 2px", borderRadius: 2 }}>positioning yourself as the go-to expert in your niche</span>. Would you like me to help build a framework for your offer?
              </p>
              <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid #F2F2F7" }}>
                {[
                  { c: "rgba(255,59,48,.8)", l: "Guessed — no market data, no source" },
                  { c: "rgba(174,174,178,.9)", l: "Horoscope — applies to every coach" },
                  { c: "rgba(255,149,0,.9)", l: "No sophistication check — what Stage?" },
                ].map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "#6E6E73", marginBottom: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 3, background: `${f.c}20`, border: `1.5px solid ${f.c}`, flexShrink: 0 }} />
                    {f.l}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Grain */}
          <div style={{ background: "#fff", border: "1.5px solid #1D1D1F", borderRadius: 22, overflow: "hidden", boxShadow: "0 4px 8px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.10)" }}>
            <div style={{ padding: "14px 20px", borderBottom: "1px solid #F2F2F7", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#1D1D1F" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: ".06em", textTransform: "uppercase" }}>⊛ Grain</span>
              <span style={{ fontSize: 10.5, color: "rgba(255,255,255,.5)", fontWeight: 500 }}>Tiered · Live · Falsifiable</span>
            </div>
            <div style={{ padding: "20px 22px" }}>
              <div style={{ fontSize: 12.5, color: "#6E6E73", fontFamily: "monospace", marginBottom: 14 }}>&gt; Help me build my offer. I'm a business coach.</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.65, color: "#3A3A3C" }}>
                <strong style={{ color: "#1D1D1F" }}>Which mode?</strong> Are you building from scratch or sharpening what you have? That determines what I investigate first.
              </p>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: "#3A3A3C", marginTop: 10 }}>
                And — before we build anything: "business coaching" is a <strong>Stage 4 market</strong>{" "}
                <span style={{ display: "inline-flex", alignItems: "center", gap: 2, fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 999, background: "rgba(255,149,0,.1)", color: "#B86800", border: "1px solid rgba(255,149,0,.3)" }}>T2 — from competitor audit</span>. The mechanism is the load-bearing element here, not the claim.
              </p>
              <div style={{ marginTop: 12, padding: "10px 14px", background: "#F5F5F7", borderRadius: 10, fontSize: 12.5, color: "#3A3A3C" }}>
                <strong>Three questions before I research anything:</strong><br />1. What market? 2. Do they actually pay premium? 3. What have you already tried?
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ HOW IT WORKS */
function HowItWorks() {
  const [current, setCurrent] = useState(1);
  const N = 3;
  const prev = (current - 1 + N) % N;
  const next = (current + 1) % N;

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % N), 4000);
    return () => clearInterval(t);
  }, []);

  const cards = [
    {
      idx: 0, step: "01 · Audit your market", title: "Read real competitors live", desc: "Grain reads actual competitor websites right now — pricing pages, homepage copy, mechanism claims. Live data, not training guesses.",
      phone: <PhoneChatAuditCarousel />,
    },
    {
      idx: 1, step: "02 · Build from scratch", title: "Find the gap before you build", desc: "No offer yet? Three questions, a market sophistication check, and a falsifiable thesis on what to build and for whom.",
      phone: <PhoneChatScratch />,
    },
    {
      idx: 2, step: "03 · Sharpen what you have", title: "Diagnose what's actually broken", desc: "Conversion? Price objections? Churn? Grain finds the root cause from your best/worst client split — your T1 data.",
      phone: <PhoneChatSharpen />,
    },
  ];

  return (
    <section id="how" style={{ padding: "96px 0 112px", background: "linear-gradient(180deg, #F5F5F0 0%, #FAFAF8 100%)", overflow: "hidden" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 28px" }}>
        <div style={{ marginBottom: 0 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#8E8E93", marginBottom: 18 }}>
            <span style={{ width: 20, height: 1, background: "currentColor", display: "inline-block" }} />
            Three modes
          </div>
          <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 500, letterSpacing: "-.018em", lineHeight: 1.06, color: "#1D1D1F", margin: "0 0 16px" }}>
            One investigation. Right for your moment.
          </h2>
          <p style={{ fontSize: 18, color: "#6E6E73", maxWidth: 540, lineHeight: 1.6, margin: 0 }}>
            Audit a market, build from scratch, or diagnose what&apos;s breaking. Each mode runs the right investigation for where you are.
          </p>
        </div>

        <div className="hs-carousel">
          <button className="hs-arrow left" onClick={() => setCurrent(prev)}>←</button>
          <div className="hs-track-wrap">
            <div className="hs-cards">
              {cards.map((c, i) => {
                const pos = i === current ? "center" : i === prev ? "prev" : "next";
                return (
                  <div key={i} className={`hs-card ${pos}`} onClick={() => pos !== "center" && setCurrent(i)}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div className="phone-shell" style={{ width: 220 }}>
                        <div className="phone-screen" style={{ display: "flex", flexDirection: "column" }}>
                          <PhoneStatusBar small />
                          <PhoneHeaderBar small />
                          {c.phone}
                        </div>
                      </div>
                    </div>
                    <div className="hs-card-info">
                      <span className="step-num">{c.step}</span>
                      <h3>{c.title}</h3>
                      <p>{c.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <button className="hs-arrow right" onClick={() => setCurrent(next)}>→</button>
        </div>

        <div className="hs-dots">
          {[0, 1, 2].map(i => <div key={i} className={`hs-dot ${i === current ? "active" : ""}`} onClick={() => setCurrent(i)} />)}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ OUTPUT SHOWCASE */
function OutputShowcase() {
  const outputs = [
    { n: "01", title: "Market Map", body: "Every competitor — their mechanism, their price (T1 if visible, T4 if hidden), their avatar, their sophistication stage.", color: "#5E5CE6", accent: "rgba(94,92,230,.08)" },
    { n: "02", title: "The Positioning Gap", body: "What no competitor is saying. The avatar no one has named. The mechanism no one has claimed. Based on live pages, not assumptions.", color: "#FF9F0A", accent: "rgba(255,149,0,.08)" },
    { n: "03", title: "The Offer Verdict", body: "One sentence. A real call — build this / rebuild the positioning / your constraint is X. Not a hedge.", color: "#34C759", accent: "rgba(52,199,89,.08)" },
    { n: "04", title: "Tiered Sources", body: "Every fact labeled T1 (verified) through T4 (inferred). Grain never states a guessed market size as a fact.", color: "#FF3B30", accent: "rgba(255,59,48,.08)" },
    { n: "05", title: "Three Kill-Conditions", body: "The disconfirming findings that would flip the verdict. No summarizer gives you this. A thesis with no kill-conditions is a summary in costume.", color: "#1D1D1F", accent: "rgba(29,29,31,.06)" },
    { n: "06", title: "The Next Question", body: "The single highest-leverage thing to validate — and exactly how to validate it. Not 'do more research.' One action.", color: "#AF52DE", accent: "rgba(175,82,222,.08)" },
  ];

  return (
    <section style={{ padding: "96px 0", background: "#fff", borderTop: "1px solid #E5E5EA" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 28px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#8E8E93", marginBottom: 18 }}>
            <span style={{ width: 20, height: 1, background: "currentColor", display: "inline-block" }} />
            What you get
          </div>
          <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "clamp(36px, 4.2vw, 58px)", fontWeight: 500, letterSpacing: "-.018em", lineHeight: 1.04, color: "#1D1D1F", margin: "0 0 20px" }}>
            A verdict you can argue with.
          </h2>
          <p style={{ fontSize: 18, color: "#6E6E73", maxWidth: 540, margin: "0 auto", lineHeight: 1.6 }}>
            Six sections. Every one falsifiable. The part no summarizer gives you is section five — three findings that would prove Grain wrong.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {outputs.map(o => (
            <div key={o.n} style={{ padding: "30px 28px", borderRadius: 20, background: o.accent, border: `1px solid ${o.color}22`, transition: "transform .3s, box-shadow .3s", cursor: "default" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 36px rgba(0,0,0,.09)`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: o.color, letterSpacing: "-.024em", marginBottom: 10 }}>{o.n}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1D1D1F", letterSpacing: "-.012em", marginBottom: 8 }}>{o.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "#6E6E73", margin: 0 }}>{o.body}</p>
            </div>
          ))}
        </div>

        {/* Two overlapping phones showing output */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 0, marginTop: 72, position: "relative" }}>
          <div className="phone-pair">
            <div className="phone-shell" style={{ width: 240 }}>
              <div className="phone-screen" style={{ display: "flex", flexDirection: "column" }}>
                <PhoneStatusBar small />
                <PhoneHeaderBar small />
                <PhoneChatOutput1 />
              </div>
            </div>
            <div className="phone-shell" style={{ width: 240 }}>
              <div className="phone-screen" style={{ display: "flex", flexDirection: "column" }}>
                <PhoneStatusBar small />
                <PhoneHeaderBar small />
                <PhoneChatOutput2 />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ FREE CTA */
function FreeCTA() {
  return (
    <section id="free" style={{ padding: "100px 0 96px", background: "#1D1D1F", position: "relative", overflow: "hidden", textAlign: "center" }}>
      {/* Ambient glow */}
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 60% at 50% 50%, rgba(94,92,230,.15), transparent 65%), radial-gradient(40% 40% at 20% 80%, rgba(52,199,89,.08), transparent 65%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 28px", position: "relative", zIndex: 1 }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: "#F5F5F7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800, color: "#1D1D1F", margin: "0 auto 28px" }}>G</div>

        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", marginBottom: 22 }}>
          <span style={{ width: 18, height: 1, background: "currentColor", display: "inline-block" }} />
          Pricing
        </div>

        <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "clamp(36px, 5vw, 66px)", fontWeight: 500, letterSpacing: "-.02em", color: "#fff", lineHeight: 1.04, margin: "0 0 22px" }}>
          Free.<br />
          <em style={{ fontStyle: "italic", color: "rgba(255,255,255,.5)" }}>Always.</em>
        </h2>

        <p style={{ fontSize: 19, color: "rgba(255,255,255,.6)", maxWidth: 480, margin: "0 auto 48px", lineHeight: 1.6 }}>
          No account. No credit card. No trial that expires. Grain is free because we want you to use it, not to upsell you on a paid tier that doesn&apos;t exist.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 48, maxWidth: 600, margin: "0 auto 48px" }}>
          {[
            { label: "Market Audit", desc: "Live competitor research" },
            { label: "Build from Scratch", desc: "Find the gap before building" },
            { label: "Sharpen", desc: "Diagnose what's breaking" },
          ].map(f => (
            <div key={f.label} style={{ padding: "18px 16px", borderRadius: 14, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)" }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{f.label}</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,.4)", margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <Link href="/try" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 17, fontWeight: 700, padding: "16px 32px", borderRadius: 14, background: "#fff", color: "#1D1D1F", textDecoration: "none", boxShadow: "0 4px 16px rgba(0,0,0,.25)" }}>
            Start auditing free →
          </Link>
          <a href="https://github.com/griffainai/grain-offer-researcher" target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 16, fontWeight: 600, padding: "16px 28px", borderRadius: 14, border: "1px solid rgba(255,255,255,.2)", color: "rgba(255,255,255,.8)", textDecoration: "none" }}>
            Fork the folder ↗
          </a>
        </div>

        <p style={{ marginTop: 24, fontSize: 13, color: "rgba(255,255,255,.3)", fontFamily: "monospace" }}>
          Built on Interpretable Context Methodology · Competition #6 — The Researcher · griffainai
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ FOOTER */
function LandingFooter() {
  return (
    <footer style={{ padding: "48px 28px 36px", borderTop: "1px solid #E5E5EA", background: "#FAFAF8" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: 7, background: "#1D1D1F", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff" }}>G</div>
          <span style={{ fontWeight: 700, fontSize: 15, color: "#1D1D1F" }}>Grain</span>
          <span style={{ fontSize: 13, color: "#AEAEB2" }}>— No advice. A verdict on your offer.</span>
        </div>
        <div style={{ display: "flex", gap: 24, fontSize: 13, color: "#8E8E93" }}>
          <Link href="/try" style={{ color: "inherit", textDecoration: "none" }}>Try it</Link>
          <a href="https://github.com/griffainai/grain-offer-researcher" style={{ color: "inherit", textDecoration: "none" }}>GitHub</a>
          <span>© 2026 griffainai</span>
        </div>
      </div>
    </footer>
  );
}

/* ================================================================
   PHONE UI COMPONENTS — chatbot conversations rendered in React
   No images needed. Pure CSS + React.
   ================================================================ */

function PhoneStatusBar({ small = false }: { small?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: small ? "10px 16px 2px" : "12px 20px 2px", position: "relative", zIndex: 5, flexShrink: 0 }}>
      <span style={{ fontSize: small ? 12 : 14, fontWeight: 600, color: "#fff", letterSpacing: "-.01em" }}>9:41</span>
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <svg width="15" height="11" viewBox="0 0 15 11"><rect x="0" y="4" width="3" height="7" rx="1" fill="white" opacity=".4"/><rect x="4" y="2.5" width="3" height="8.5" rx="1" fill="white" opacity=".6"/><rect x="8" y="1" width="3" height="10" rx="1" fill="white" opacity=".8"/><rect x="12" y="0" width="3" height="11" rx="1" fill="white"/></svg>
        <svg width="14" height="11" viewBox="0 0 14 11"><path d="M7 1.5C9.5 1.5 11.7 2.5 13.3 4.2L14 3.5C12.2 1.6 9.7.5 7 .5 4.3.5 1.8 1.6 0 3.5l.7.7C2.3 2.5 4.5 1.5 7 1.5z" fill="white"/><path d="M7 4C8.7 4 10.2 4.7 11.3 5.8l.7-.7C10.7 3.9 8.9 3 7 3S3.3 3.9 2 5.1l.7.7C3.8 4.7 5.3 4 7 4z" fill="white" opacity=".7"/><circle cx="7" cy="8.5" r="1.5" fill="white"/></svg>
        <svg width="25" height="12" viewBox="0 0 25 12"><rect x=".5" y=".5" width="22" height="11" rx="3.5" stroke="white" strokeOpacity=".35" fill="none"/><rect x="1.5" y="1.5" width="18" height="9" rx="2.5" fill="white"/><path d="M23 4.5v3a2 2 0 000-3z" fill="white" opacity=".4"/></svg>
      </div>
    </div>
  );
}

function PhoneHeaderBar({ small = false }: { small?: boolean }) {
  return (
    <div style={{ padding: small ? "6px 12px 8px" : "6px 16px 10px", borderBottom: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", gap: 8, background: "rgba(15,15,18,.95)", flexShrink: 0 }}>
      <div style={{ width: small ? 24 : 28, height: small ? 24 : 28, borderRadius: 7, background: "#F5F5F7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: small ? 11 : 13, fontWeight: 800, color: "#1D1D1F", flexShrink: 0 }}>G</div>
      <div>
        <div style={{ fontSize: small ? 12 : 13.5, fontWeight: 700, color: "#fff", letterSpacing: "-.01em" }}>Grain</div>
        <div style={{ fontSize: 9, color: "rgba(255,255,255,.4)" }}>Offer Researcher</div>
      </div>
    </div>
  );
}

/* Hero phone: Market Audit in progress */
function PhoneChatAudit() {
  return (
    <div style={{ flex: 1, background: "#F5F5F7", padding: "10px 10px", display: "flex", flexDirection: "column", gap: 7, overflowY: "hidden" }}>
      <Msg type="user" text="Audit the business coaching market for founders" />
      <div style={{ alignSelf: "flex-start" }}>
        <div className="phone-label grain">Grain</div>
        <div className="phone-msg grain">
          <div style={{ fontSize: 9.5, color: "#34C759", fontWeight: 600, marginBottom: 5 }}>🌐 Reading live pages...</div>
          <Chip>✓ Brendon Burchard homepage</Chip>
          <Chip>✓ Sam Ovens — Skool pricing</Chip>
          <Chip>✓ Tony Robbins Business</Chip>
          <Chip done={false}>⊙ Alex Hormozi programs</Chip>
        </div>
      </div>
      <div style={{ alignSelf: "flex-start" }}>
        <div className="phone-msg grain">
          <p style={{ margin: "0 0 5px", fontSize: 10.5 }}><strong>THE VERDICT</strong></p>
          <p style={{ margin: 0, fontSize: 10, color: "#3A3A3C", lineHeight: 1.4 }}>Stage 4 market. &ldquo;Big + coaching&rdquo; is not a position. Mechanism-heavy — everyone has named a method.</p>
          <p style={{ margin: "5px 0 0", fontSize: 10.5, color: "#5E5CE6", fontWeight: 600 }}>↗ THE GAP: No one owns &ldquo;first 90 days of revenue for technical founders.&rdquo;</p>
          <div style={{ marginTop: 4 }}><TierBadge code="T1" color="#1A7A35" bg="#E8F9ED" /></div>
        </div>
      </div>
    </div>
  );
}

/* Carousel phone 1: Market Audit compact */
function PhoneChatAuditCarousel() {
  return (
    <div style={{ flex: 1, background: "#F5F5F7", padding: "8px", display: "flex", flexDirection: "column", gap: 5, overflowY: "hidden" }}>
      <MsgSm type="user">Audit: email marketing for e-commerce</MsgSm>
      <MsgSm type="grain">
        <div style={{ fontSize: 8.5, color: "#34C759", fontWeight: 600, marginBottom: 3 }}>🌐 Reading live pages</div>
        <ChipSm>✓ Klaviyo pricing</ChipSm>
        <ChipSm>✓ Privy homepage</ChipSm>
        <ChipSm done={false}>⊙ ConvertKit positioning</ChipSm>
      </MsgSm>
      <MsgSm type="grain">
        <strong>Stage 3–4.</strong> Gap: nobody owns{" "}
        <span style={{ color: "#5E5CE6", fontWeight: 600 }}>&ldquo;post-purchase flow for DTC brands doing $2M–$8M.&rdquo;</span>
        <div style={{ marginTop: 3 }}><TierBadge code="T1" color="#1A7A35" bg="#E8F9ED" small /></div>
      </MsgSm>
    </div>
  );
}

/* Carousel phone 2: Build from scratch */
function PhoneChatScratch() {
  return (
    <div style={{ flex: 1, background: "#F5F5F7", padding: "8px", display: "flex", flexDirection: "column", gap: 5, overflowY: "hidden" }}>
      <MsgSm type="user">Help me build an offer. I&apos;m a SaaS consultant.</MsgSm>
      <MsgSm type="grain">Which mode: build from scratch or sharpen what you have?</MsgSm>
      <MsgSm type="user">Scratch.</MsgSm>
      <MsgSm type="grain">Three questions:<br />1. Specific market + avatar?<br />2. Do they pay premium?<br />3. What have you tried?</MsgSm>
      <MsgSm type="user">Series A SaaS, $5M–$20M ARR. Think so. Nothing yet.</MsgSm>
      <MsgSm type="grain">Checking purchasing power before confirming <span style={{ color: "#AF52DE" }}>(T4 — inferred)</span>. Series A at this ARR: salary confirms budget.</MsgSm>
    </div>
  );
}

/* Carousel phone 3: Sharpen */
function PhoneChatSharpen() {
  return (
    <div style={{ flex: 1, background: "#F5F5F7", padding: "8px", display: "flex", flexDirection: "column", gap: 5, overflowY: "hidden" }}>
      <MsgSm type="user">My $5K/month retainer isn&apos;t closing. Need help.</MsgSm>
      <MsgSm type="grain">What&apos;s breaking most?<br /><span style={{ color: "#5E5CE6" }}>• Conversion</span> · Price obj. · Churn · Fulfillment</MsgSm>
      <MsgSm type="user">Price objections, every call.</MsgSm>
      <MsgSm type="grain">Best vs. worst clients — what do they have in common?</MsgSm>
      <MsgSm type="user">Best: e-comm referrals. Worst: cold outreach.</MsgSm>
      <MsgSm type="grain">The offer isn&apos;t broken. The channel is. <TierBadge code="T1" color="#1A7A35" bg="#E8F9ED" small /> your own data.</MsgSm>
    </div>
  );
}

/* Output phone 1: Market Map */
function PhoneChatOutput1() {
  return (
    <div style={{ flex: 1, background: "#F5F5F7", padding: "8px", display: "flex", flexDirection: "column", gap: 4, overflowY: "hidden" }}>
      <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", color: "#AEAEB2", padding: "2px 0" }}>MARKET MAP</div>
      {[
        { name: "Cardone Ventures", mech: "10X Rule", price: "$39K", t: "T1" },
        { name: "Skool Games", mech: "Community model", price: "$997/mo", t: "T1" },
        { name: "Alex Hormozi", mech: "Grand Slam Offer", price: "book + coaching", t: "T2" },
      ].map(c => (
        <div key={c.name} style={{ background: "#fff", borderRadius: 8, padding: "6px 8px", fontSize: 9, lineHeight: 1.4 }}>
          <strong style={{ fontSize: 10, color: "#1D1D1F" }}>{c.name}</strong><br />
          <span style={{ color: "#5E5CE6" }}>{c.mech}</span> · {c.price} <TierBadge code={c.t} color={c.t === "T1" ? "#1A7A35" : "#B86800"} bg={c.t === "T1" ? "#E8F9ED" : "#FFF3E0"} small />
        </div>
      ))}
    </div>
  );
}

/* Output phone 2: Verdict + kill-conditions */
function PhoneChatOutput2() {
  return (
    <div style={{ flex: 1, background: "#F5F5F7", padding: "8px", display: "flex", flexDirection: "column", gap: 5, overflowY: "hidden" }}>
      <div style={{ background: "#fff", borderRadius: 8, padding: "7px 9px", fontSize: 9.5 }}>
        <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", color: "#5E5CE6", marginBottom: 3 }}>THE VERDICT</div>
        <strong>Qualify-first.</strong> No live catalyst. &ldquo;Big + segment&rdquo; = description, not a position.
      </div>
      <div style={{ background: "#fff", borderRadius: 8, padding: "7px 9px", fontSize: 9.5, borderLeft: "2.5px solid #FF3B30" }}>
        <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", color: "#FF3B30", marginBottom: 3 }}>KILL CONDITIONS</div>
        <div style={{ color: "#3A3A3C", fontSize: 9, lineHeight: 1.45 }}>1. If competitor already owns this mechanism with 3+ yrs proof →<br />2. If avatar revenue &lt; $500K → reprice<br />3. If best clients came from referrals → channel, not offer</div>
      </div>
      <div style={{ background: "#fff", borderRadius: 8, padding: "7px 9px", fontSize: 9.5 }}>
        <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", color: "#AF52DE", marginBottom: 3 }}>THE NEXT Q</div>
        Run 5 sales calls at full price. Track the objection.
      </div>
    </div>
  );
}

/* ---- shared sub-components ---- */
function Msg({ type, text }: { type: "user" | "grain"; text: string }) {
  return (
    <div style={{ alignSelf: type === "user" ? "flex-end" : "flex-start" }}>
      <div className={`phone-label ${type}`}>{type === "user" ? "You" : "Grain"}</div>
      <div className={`phone-msg ${type}`} style={{ fontSize: 11.5 }}>{text}</div>
    </div>
  );
}
function MsgSm({ type, children }: { type: "user" | "grain"; children: React.ReactNode }) {
  return (
    <div style={{ alignSelf: type === "user" ? "flex-end" : "flex-start", maxWidth: "88%" }}>
      <div className={`phone-msg ${type}`} style={{ fontSize: 10, padding: "6px 9px", borderRadius: 12 }}>{children}</div>
    </div>
  );
}
function Chip({ children, done = true }: { children: React.ReactNode; done?: boolean }) {
  return <div style={{ display: "flex", alignItems: "center", gap: 5, background: done ? "#E8F9ED" : "#F5F5F7", color: done ? "#1A7A35" : "#8E8E93", fontSize: 9.5, padding: "3px 7px", borderRadius: 6, marginBottom: 3, fontWeight: 500 }}>{children}</div>;
}
function ChipSm({ children, done = true }: { children: React.ReactNode; done?: boolean }) {
  return <div style={{ display: "flex", alignItems: "center", gap: 4, background: done ? "#E8F9ED" : "#F5F5F7", color: done ? "#1A7A35" : "#8E8E93", fontSize: 8.5, padding: "2px 5px", borderRadius: 5, marginBottom: 2, fontWeight: 500 }}>{children}</div>;
}
function TierBadge({ code, color, bg, small = false }: { code: string; color: string; bg: string; small?: boolean }) {
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 2, fontSize: small ? 8 : 9, fontWeight: 700, padding: small ? "1px 4px" : "1px 5px", borderRadius: 999, background: bg, color, letterSpacing: ".04em" }}>{code}</span>;
}
