import { GrainMark, GrainWordmark, GrainLockup, GrainGlyph } from "@/components/Logo";
import { GRAIN_TOKENS } from "@/lib/design-tokens";
import Link from "next/link";

/* ================================================================
   GRAIN — Brand Kit / Style Guide
   Route: /brand
   ================================================================ */

const T = GRAIN_TOKENS;

export default function BrandPage() {
  return (
    <div style={{ background: "#FAFAF7", minHeight: "100vh", color: "#0D0D0E" }}>
      {/* Header */}
      <header style={{ borderBottom: "1px solid #E8E8EC", padding: "20px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", position: "sticky", top: 0, zIndex: 10 }}>
        <GrainWordmark size="sm" />
        <div style={{ fontFamily: T.type.family.mono, fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#6E6E73" }}>
          Brand Kit · 2026
        </div>
        <Link href="/" style={{ fontFamily: T.type.family.body, fontSize: 13, color: "#6E6E73", textDecoration: "none" }}>← Back to site</Link>
      </header>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 48px" }}>

        {/* ── HERO ── */}
        <section style={{ marginBottom: 96 }}>
          <BrandLabel>01 · Identity</BrandLabel>
          <h1 style={{ fontFamily: T.type.family.display, fontSize: "clamp(52px,7vw,90px)", fontWeight: 400, fontStyle: "italic", letterSpacing: "-.026em", color: "#0D0D0E", margin: "0 0 20px", lineHeight: 0.96 }}>
            Grain
          </h1>
          <p style={{ fontFamily: T.type.family.body, fontSize: 20, color: "#6E6E73", maxWidth: 560, lineHeight: 1.6, margin: "0 0 48px" }}>
            An offer researcher. It investigates your market and produces a falsifiable thesis on what to build, for whom, and why — with three findings that would prove it wrong.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, maxWidth: 680 }}>
            <Pill>No advice. A verdict.</Pill>
            <Pill>Free. Always.</Pill>
            <Pill>Investigative. Not prescriptive.</Pill>
          </div>
        </section>

        {/* ── LOGO ── */}
        <section style={{ marginBottom: 96 }}>
          <BrandLabel>02 · The Logo</BrandLabel>
          <SectionTitle>Mark & Wordmark</SectionTitle>
          <SectionDesc>
            The Grain mark is a geometric G: the arc (white) represents the investigation — circling the market to find the truth. The amber crossbar represents the verdict — where the investigation lands. Two shapes, one meaning.
          </SectionDesc>

          {/* Logo variants grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>

            {/* Dark on light */}
            <LogoCard bg="#FAFAF7" border="#E8E8EC" label="Primary — Dark on Light">
              <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "flex-start" }}>
                <GrainLockup dark />
                <GrainWordmark size="lg" variant="dark" />
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  {(["xs","sm","md","lg","xl"] as const).map(s => <GrainMark key={s} size={s} variant="dark" />)}
                </div>
              </div>
            </LogoCard>

            {/* Light on dark */}
            <LogoCard bg="#0D0D0E" label="Reversed — Light on Dark">
              <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "flex-start" }}>
                <GrainLockup dark={false} />
                <GrainWordmark size="lg" variant="light" />
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  {(["xs","sm","md","lg","xl"] as const).map(s => <GrainMark key={s} size={s} variant="light" />)}
                </div>
              </div>
            </LogoCard>

            {/* Indigo */}
            <LogoCard bg="#4F46E5" label="Signal — On Indigo">
              <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
                {(["sm","md","lg","xl"] as const).map(s => <GrainMark key={s} size={s} variant="indigo" />)}
              </div>
            </LogoCard>

            {/* Amber */}
            <LogoCard bg="#FFFBEB" border="#FCD34D" label="Gap — On Amber Tint">
              <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
                {(["sm","md","lg","xl"] as const).map(s => <GrainMark key={s} size={s} variant="amber" />)}
              </div>
            </LogoCard>
          </div>

          {/* Logo anatomy */}
          <div style={{ background: "#fff", border: "1px solid #E8E8EC", borderRadius: 20, padding: "36px 40px", marginBottom: 20 }}>
            <div style={{ fontFamily: T.type.family.mono, fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#AEAEB2", marginBottom: 24 }}>Logo anatomy</div>
            <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
              <div style={{ position: "relative" }}>
                <GrainMark size="xl" variant="dark" />
                {/* Annotation lines */}
                <div style={{ position: "absolute", top: "30%", left: "100%", marginLeft: 12, display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}>
                  <div style={{ width: 32, height: 1, background: "#E8E8EC" }} />
                  <span style={{ fontFamily: T.type.family.mono, fontSize: 10, color: "#6E6E73" }}>The arc — the investigation</span>
                </div>
                <div style={{ position: "absolute", top: "55%", left: "100%", marginLeft: 12, display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}>
                  <div style={{ width: 32, height: 1, background: "#FCD34D" }} />
                  <span style={{ fontFamily: T.type.family.mono, fontSize: 10, color: "#B45309" }}>The crossbar — the gap found</span>
                </div>
              </div>
              <div style={{ maxWidth: 360 }}>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: "#6E6E73", margin: "0 0 16px" }}>
                  The G letterform is built from two elements that are never the same color. The arc is always white (or dark) — it&apos;s the neutral investigation. The crossbar is always amber — it&apos;s the signal, the moment of finding.
                </p>
                <DoRule do>Always show both elements at full contrast</DoRule>
                <DoRule do>Use the provided SVG — never redraw the G from type</DoRule>
                <DoRule>Recolor either element</DoRule>
                <DoRule>Use on backgrounds where amber disappears</DoRule>
              </div>
            </div>
          </div>

          {/* Clear space */}
          <DivCard label="Minimum clear space">
            <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
              <div style={{ padding: 20, border: "1px dashed #AEAEB2", borderRadius: 4, display: "inline-block" }}>
                <GrainMark size="lg" />
              </div>
              <p style={{ fontSize: 14, color: "#6E6E73", lineHeight: 1.6 }}>
                Maintain a minimum clear space equal to <strong>1× the height of the mark</strong> on all sides. Never crowd the logo against other elements or the edge of a container.
              </p>
            </div>
          </DivCard>
        </section>

        {/* ── COLORS ── */}
        <section style={{ marginBottom: 96 }}>
          <BrandLabel>03 · Color System</BrandLabel>
          <SectionTitle>Three conceptual anchors</SectionTitle>
          <SectionDesc>
            The palette is built around the product concept: ink-and-paper for the investigation, signal indigo for intelligence, amber for the gap found.
          </SectionDesc>

          {/* Primary palette */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 24 }}>
            <PrimaryColorCard
              name="Grain Black"
              hex="#0D0D0E"
              variable="--grain-ink-950"
              usage="Headlines, logo background, primary CTA, the authority color"
              light />
            <PrimaryColorCard
              name="Grain Indigo"
              hex="#4F46E5"
              variable="--grain-signal-500"
              usage="Primary accent — intelligence, investigation, active states, links, the mechanism"
              light />
            <PrimaryColorCard
              name="Grain Amber"
              hex="#B45309"
              variable="--grain-gap-700"
              usage="The gap found — positioning gap highlight, logo crossbar, verdict callouts"
              light />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 32 }}>
            <PrimaryColorCard
              name="Grain White"
              hex="#FAFAF7"
              variable="--grain-ink-0"
              usage="Page background — warm off-white, like paper. Never pure #fff for the page itself"
              dark />
            <PrimaryColorCard
              name="Surface White"
              hex="#FFFFFF"
              variable="--grain-surface"
              usage="Cards and modal surfaces only — on top of the warm page background"
              dark />
            <PrimaryColorCard
              name="Grain Mid"
              hex="#6E6E73"
              variable="--grain-ink-500"
              usage="Body text, secondary labels, captions, meta information"
              light />
          </div>

          {/* Full scales */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 32 }}>
            <ColorScale name="Ink" prefix="grain-ink"
              swatches={[
                { step:"950", hex:"#0D0D0E" }, { step:"700", hex:"#3D3D3F" },
                { step:"500", hex:"#6E6E73" }, { step:"300", hex:"#AEAEB2" },
                { step:"100", hex:"#E8E8EC" }, { step:"50",  hex:"#F4F4F2" },
                { step:"0",   hex:"#FAFAF7" },
              ]}
            />
            <ColorScale name="Signal" prefix="grain-signal"
              swatches={[
                { step:"900", hex:"#1E1B4B" }, { step:"700", hex:"#3730A3" },
                { step:"500", hex:"#4F46E5" }, { step:"400", hex:"#6366F1" },
                { step:"300", hex:"#818CF8" }, { step:"100", hex:"#C7D2FE" },
                { step:"50",  hex:"#EEF2FF" },
              ]}
            />
            <ColorScale name="Gap" prefix="grain-gap"
              swatches={[
                { step:"900", hex:"#78350F" }, { step:"700", hex:"#B45309" },
                { step:"600", hex:"#D97706" }, { step:"500", hex:"#F59E0B" },
                { step:"300", hex:"#FCD34D" }, { step:"100", hex:"#FEF3C7" },
                { step:"50",  hex:"#FFFBEB" },
              ]}
            />
          </div>

          {/* Semantic / tier colors */}
          <DivCard label="Semantic color system — source tiers">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
              {[
                { label: "T1 · Verified", bg: "#ECFDF5", border: "#6EE7B7", text: "#065F46", solid: "#059669", note: "State plainly. No caveat needed." },
                { label: "T2 · Decaying", bg: "#FFFBEB", border: "#FCD34D", text: "#92400E", solid: "#D97706", note: "Date-stamp it. Mark for re-check." },
                { label: "T3 · Contested", bg: "#FEF2F2", border: "#FCA5A5", text: "#991B1B", solid: "#DC2626", note: "Withhold. Need 2 sources." },
                { label: "T4 · Inferred", bg: "#F5F3FF", border: "#C4B5FD", text: "#5B21B6", solid: "#7C3AED", note: "Label every guess explicitly." },
              ].map(t => (
                <div key={t.label} style={{ background: t.bg, borderRadius: 12, padding: "16px 14px", border: `1px solid ${t.border}` }}>
                  <div style={{ width: 28, height: 28, borderRadius: 999, background: t.solid, marginBottom: 10 }} />
                  <div style={{ fontFamily: T.type.family.mono, fontSize: 10, fontWeight: 700, color: t.text, letterSpacing: ".06em", marginBottom: 5 }}>{t.label}</div>
                  <div style={{ fontSize: 12, color: t.text, lineHeight: 1.45 }}>{t.note}</div>
                </div>
              ))}
            </div>
          </DivCard>
        </section>

        {/* ── TYPOGRAPHY ── */}
        <section style={{ marginBottom: 96 }}>
          <BrandLabel>04 · Typography</BrandLabel>
          <SectionTitle>Three-font system</SectionTitle>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 32 }}>
            <FontCard
              name="Newsreader"
              role="Display · Headlines only"
              style="Serif · Variable optical size"
              usage="Hero titles, section headings, the wordmark. Authority and depth. Never use for body text."
              sample="The offer that converts."
              sampleStyle={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: 36, fontWeight: 400, fontStyle: "italic", letterSpacing: "-.022em", lineHeight: 1.1 }}
            />
            <FontCard
              name="Inter"
              role="Body · UI · Labels"
              style="Sans-serif · Clean"
              usage="All body text, UI labels, buttons, navigation, form fields, descriptions."
              sample="A verdict on your offer."
              sampleStyle={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 22, fontWeight: 500, letterSpacing: "-.016em", lineHeight: 1.3 }}
            />
            <FontCard
              name="IBM Plex Mono"
              role="Code · Data · Tiers"
              style="Monospace · Technical"
              usage="Source tier badges (T1–T4), terminal prompts, all-caps section labels, data values."
              sample="T1 · Verified"
              sampleStyle={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 22, fontWeight: 600, letterSpacing: ".04em", lineHeight: 1.3 }}
            />
          </div>

          {/* Type scale */}
          <DivCard label="Display scale — Newsreader (headlines)">
            {[
              { label: "Display 2XL", size: "clamp(72px,9vw,110px)", sample: "Investigation." },
              { label: "Display XL",  size: "clamp(52px,7vw,82px)",  sample: "The offer that converts." },
              { label: "Display LG",  size: "clamp(40px,5.2vw,68px)", sample: "No advice. A verdict." },
              { label: "Display MD",  size: "clamp(32px,3.8vw,52px)", sample: "A falsifiable offer thesis." },
            ].map(s => (
              <div key={s.label} style={{ display: "flex", alignItems: "baseline", gap: 20, paddingBottom: 16, marginBottom: 16, borderBottom: "1px solid #F4F4F2" }}>
                <span style={{ fontFamily: T.type.family.mono, fontSize: 10, fontWeight: 600, color: "#AEAEB2", width: 90, flexShrink: 0, letterSpacing: ".08em" }}>{s.label}</span>
                <span style={{ fontFamily: T.type.family.display, fontSize: s.size, fontWeight: 400, fontStyle: "italic", letterSpacing: "-.022em", lineHeight: 1, color: "#0D0D0E" }}>{s.sample}</span>
              </div>
            ))}
          </DivCard>
        </section>

        {/* ── COMPONENTS ── */}
        <section style={{ marginBottom: 96 }}>
          <BrandLabel>05 · Components</BrandLabel>
          <SectionTitle>Brand-aligned UI patterns</SectionTitle>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

            {/* Buttons */}
            <DivCard label="Buttons">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <button style={{ fontFamily: T.type.family.body, fontSize: 15, fontWeight: 600, padding: "12px 24px", borderRadius: 10, background: "#0D0D0E", color: "#FAFAF7", border: "none", cursor: "pointer", textAlign: "left", boxShadow: "0 2px 4px rgba(13,13,14,0.08), 0 6px 18px rgba(13,13,14,0.08)" }}>
                  Start your investigation →
                </button>
                <button style={{ fontFamily: T.type.family.body, fontSize: 15, fontWeight: 600, padding: "12px 24px", borderRadius: 10, background: "#4F46E5", color: "#fff", border: "none", cursor: "pointer", textAlign: "left" }}>
                  Audit my market free →
                </button>
                <button style={{ fontFamily: T.type.family.body, fontSize: 15, fontWeight: 500, padding: "12px 24px", borderRadius: 10, background: "transparent", color: "#0D0D0E", border: "1.5px solid #E8E8EC", cursor: "pointer", textAlign: "left" }}>
                  See how it works ↓
                </button>
              </div>
            </DivCard>

            {/* Tier badges */}
            <DivCard label="Source tier badges">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { code: "T1", label: "Verified", bg: "#ECFDF5", text: "#065F46", border: "#6EE7B7" },
                  { code: "T2", label: "Decaying — re-check before the call", bg: "#FFFBEB", text: "#92400E", border: "#FCD34D" },
                  { code: "T3", label: "Contested — need a second source", bg: "#FEF2F2", text: "#991B1B", border: "#FCA5A5" },
                  { code: "T4", label: "Inferred — not confirmed", bg: "#F5F3FF", text: "#5B21B6", border: "#C4B5FD" },
                ].map(t => (
                  <div key={t.code} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 999, background: t.bg, border: `1px solid ${t.border}` }}>
                    <span style={{ fontFamily: T.type.family.mono, fontSize: 11, fontWeight: 700, color: t.text, letterSpacing: ".06em" }}>{t.code}</span>
                    <span style={{ fontSize: 12, color: t.text }}>{t.label}</span>
                  </div>
                ))}
              </div>
            </DivCard>

            {/* Kill condition */}
            <DivCard label="Kill condition rail">
              <div style={{ borderLeft: "3px solid #DC2626", paddingLeft: 14 }}>
                <div style={{ fontFamily: T.type.family.mono, fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#B91C1C", marginBottom: 6 }}>Three findings that would kill this thesis</div>
                <div style={{ fontSize: 14, color: "#3D3D3F", lineHeight: 1.6 }}>
                  If the user&apos;s best clients all came from personal relationships rather than the offer&apos;s mechanism, the offer is being carried by trust — and won&apos;t survive cold channels.
                </div>
              </div>
            </DivCard>

            {/* Glyph usage */}
            <DivCard label="Logo in product contexts">
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Nav */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 10, background: "#F4F4F2" }}>
                  <GrainMark size="xs" />
                  <span style={{ fontFamily: T.type.family.body, fontSize: 14, fontWeight: 600 }}>Grain</span>
                  <span style={{ marginLeft: "auto", fontFamily: T.type.family.body, fontSize: 13, color: "#6E6E73" }}>Try free →</span>
                </div>
                {/* Message header */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 10, background: "#0D0D0E" }}>
                  <GrainMark size="xs" variant="dark" />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Grain</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)" }}>Offer Researcher</div>
                  </div>
                </div>
                {/* Mark only */}
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <GrainGlyph size="md" />
                  <span style={{ fontSize: 13, color: "#6E6E73" }}>Glyph (transparent bg) for inline use</span>
                </div>
              </div>
            </DivCard>
          </div>
        </section>

        {/* ── VOICE ── */}
        <section style={{ marginBottom: 96 }}>
          <BrandLabel>06 · Voice & Tone</BrandLabel>
          <SectionTitle>How Grain speaks</SectionTitle>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <DivCard label="Voice attributes">
              {[
                { attr: "Direct", note: "No hedging. If the evidence says 'rebuild,' it says rebuild." },
                { attr: "Investigative", note: "Asks before assuming. Runs the gate before the thesis." },
                { attr: "Falsifiable", note: "Every claim comes with what would prove it wrong." },
                { attr: "Honest about uncertainty", note: "Names what it doesn't know and how to close the gap." },
                { attr: "Authoritative but not prescriptive", note: "Delivers verdicts, not instructions." },
              ].map(v => (
                <div key={v.attr} style={{ display: "flex", gap: 14, paddingBottom: 12, marginBottom: 12, borderBottom: "1px solid #F4F4F2" }}>
                  <span style={{ fontFamily: T.type.family.mono, fontSize: 11, fontWeight: 700, color: "#4F46E5", width: 120, flexShrink: 0 }}>{v.attr}</span>
                  <span style={{ fontSize: 14, color: "#6E6E73", lineHeight: 1.5 }}>{v.note}</span>
                </div>
              ))}
            </DivCard>

            <DivCard label="Do / Don't — copy tone">
              <DoRule do>No advice. A verdict on your offer.</DoRule>
              <DoRule do>What your market actually shows.</DoRule>
              <DoRule do>Three findings that would prove this wrong.</DoRule>
              <DoRule do>T1 — verified from your own sales data.</DoRule>
              <div style={{ height: 12 }} />
              <DoRule>Here's a framework for building a strong offer.</DoRule>
              <DoRule>Great question! Business coaching is booming.</DoRule>
              <DoRule>Completely free — no strings attached! 🎉</DoRule>
              <DoRule>Let me know if you have any questions.</DoRule>
            </DivCard>
          </div>
        </section>

        {/* ── DOWNLOAD NOTE ── */}
        <section style={{ padding: "40px 48px", background: "#0D0D0E", borderRadius: 20, textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}><GrainMark size="md" variant="dark" /></div>
          <h2 style={{ fontFamily: T.type.family.display, fontSize: 32, fontWeight: 400, fontStyle: "italic", color: "#FAFAF7", margin: "0 0 12px", letterSpacing: "-.02em" }}>
            The full token system
          </h2>
          <p style={{ fontFamily: T.type.family.body, fontSize: 16, color: "rgba(255,255,255,.5)", maxWidth: 480, margin: "0 auto 28px", lineHeight: 1.6 }}>
            All design tokens live in <code style={{ fontFamily: T.type.family.mono, fontSize: 13, color: "rgba(255,255,255,.6)" }}>src/lib/design-tokens.ts</code>. The logo SVG is in <code style={{ fontFamily: T.type.family.mono, fontSize: 13, color: "rgba(255,255,255,.6)" }}>src/components/Logo.tsx</code>.
          </p>
          <a href="https://github.com/griffainai/grain-offer-researcher" target="_blank" rel="noopener"
            style={{ fontFamily: T.type.family.body, fontSize: 14, fontWeight: 600, padding: "12px 24px", borderRadius: 10, background: "#FAFAF7", color: "#0D0D0E", textDecoration: "none", display: "inline-block" }}>
            View on GitHub ↗
          </a>
        </section>

      </main>
    </div>
  );
}

/* ── Primitives ── */
function BrandLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontFamily: GRAIN_TOKENS.type.family.mono, fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#AEAEB2", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}><span style={{ width: 20, height: 1, background: "currentColor", display: "inline-block" }} />{children}</div>;
}
function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontFamily: GRAIN_TOKENS.type.family.display, fontSize: "clamp(32px,4vw,52px)", fontWeight: 400, fontStyle: "italic", letterSpacing: "-.022em", color: "#0D0D0E", margin: "0 0 14px", lineHeight: 1.06 }}>{children}</h2>;
}
function SectionDesc({ children }: { children: React.ReactNode }) {
  return <p style={{ fontFamily: GRAIN_TOKENS.type.family.body, fontSize: 17, color: "#6E6E73", maxWidth: 560, lineHeight: 1.62, margin: "0 0 36px" }}>{children}</p>;
}
function Pill({ children }: { children: React.ReactNode }) {
  return <div style={{ fontFamily: GRAIN_TOKENS.type.family.mono, fontSize: 11, fontWeight: 600, letterSpacing: ".08em", color: "#6E6E73", padding: "8px 14px", borderRadius: 999, border: "1px solid #E8E8EC", textAlign: "center" }}>{children}</div>;
}
function DivCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #E8E8EC", borderRadius: 18, padding: "28px 28px", marginBottom: 20 }}>
      <div style={{ fontFamily: GRAIN_TOKENS.type.family.mono, fontSize: 10, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#AEAEB2", marginBottom: 20 }}>{label}</div>
      {children}
    </div>
  );
}
function LogoCard({ bg, border, label, children }: { bg: string; border?: string; label: string; children: React.ReactNode }) {
  return (
    <div style={{ background: bg, border: `1px solid ${border ?? "transparent"}`, borderRadius: 18, padding: "36px 32px" }}>
      <div style={{ fontFamily: GRAIN_TOKENS.type.family.mono, fontSize: 10, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: bg === "#0D0D0E" ? "rgba(255,255,255,.3)" : "#AEAEB2", marginBottom: 24 }}>{label}</div>
      {children}
    </div>
  );
}
function PrimaryColorCard({ name, hex, variable, usage, light, dark }: { name: string; hex: string; variable: string; usage: string; light?: boolean; dark?: boolean }) {
  const textColor = dark ? "#0D0D0E" : "#FAFAF7";
  const subColor = dark ? "#6E6E73" : "rgba(255,255,255,.5)";
  return (
    <div style={{ background: hex, borderRadius: 18, padding: "28px 24px", minHeight: 180, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div>
        <div style={{ fontFamily: GRAIN_TOKENS.type.family.body, fontSize: 18, fontWeight: 700, color: textColor, marginBottom: 6 }}>{name}</div>
        <div style={{ fontFamily: GRAIN_TOKENS.type.family.mono, fontSize: 13, color: subColor }}>{hex}</div>
        <div style={{ fontFamily: GRAIN_TOKENS.type.family.mono, fontSize: 10, color: subColor, marginTop: 4, letterSpacing: ".04em" }}>{variable}</div>
      </div>
      <p style={{ fontSize: 12, color: subColor, lineHeight: 1.5, margin: "16px 0 0" }}>{usage}</p>
    </div>
  );
}
function ColorScale({ name, prefix, swatches }: { name: string; prefix: string; swatches: { step: string; hex: string }[] }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #E8E8EC", borderRadius: 18, overflow: "hidden" }}>
      <div style={{ padding: "16px 20px 12px", borderBottom: "1px solid #F4F4F2" }}>
        <span style={{ fontFamily: GRAIN_TOKENS.type.family.mono, fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#6E6E73" }}>{name}</span>
      </div>
      {swatches.map(s => {
        const isDark = parseInt(s.step) > 400 || s.step === "0";
        const isMidOrDarker = parseInt(s.step || "0") >= 500;
        return (
          <div key={s.step} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 20px", background: s.hex, borderBottom: "1px solid rgba(0,0,0,.04)" }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontFamily: GRAIN_TOKENS.type.family.mono, fontSize: 10, fontWeight: 600, color: isMidOrDarker ? "rgba(255,255,255,.6)" : "#6E6E73", letterSpacing: ".06em" }}>{prefix}-{s.step}</span>
            </div>
            <span style={{ fontFamily: GRAIN_TOKENS.type.family.mono, fontSize: 10, color: isMidOrDarker ? "rgba(255,255,255,.5)" : "#AEAEB2" }}>{s.hex}</span>
          </div>
        );
      })}
    </div>
  );
}
function FontCard({ name, role, style: fontStyle, usage, sample, sampleStyle }: { name: string; role: string; style: string; usage: string; sample: string; sampleStyle: React.CSSProperties }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #E8E8EC", borderRadius: 18, padding: "28px 24px" }}>
      <div style={{ fontFamily: GRAIN_TOKENS.type.family.mono, fontSize: 10, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#4F46E5", marginBottom: 8 }}>{role}</div>
      <div style={{ fontFamily: GRAIN_TOKENS.type.family.body, fontSize: 20, fontWeight: 700, color: "#0D0D0E", marginBottom: 4 }}>{name}</div>
      <div style={{ fontFamily: GRAIN_TOKENS.type.family.mono, fontSize: 11, color: "#AEAEB2", marginBottom: 20 }}>{fontStyle}</div>
      <div style={{ padding: "20px 0", borderTop: "1px solid #F4F4F2", borderBottom: "1px solid #F4F4F2", marginBottom: 16, ...sampleStyle }}>{sample}</div>
      <p style={{ fontSize: 13, color: "#6E6E73", lineHeight: 1.55 }}>{usage}</p>
    </div>
  );
}
function DoRule({ children, do: isDo }: { children: React.ReactNode; do?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: isDo ? "#065F46" : "#991B1B", marginBottom: 8, lineHeight: 1.45 }}>
      <span style={{ fontFamily: GRAIN_TOKENS.type.family.mono, fontWeight: 700, fontSize: 11, flexShrink: 0 }}>{isDo ? "✓" : "✗"}</span>
      <span style={{ color: isDo ? "#3D3D3F" : "#6E6E73" }}>{children}</span>
    </div>
  );
}
