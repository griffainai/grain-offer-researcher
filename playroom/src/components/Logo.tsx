"use client";

/**
 * Grain Logo System
 *
 * The mark: A geometric G where
 *   — the arc (counterclockwise, three-quarter circle) represents the investigation
 *   — the amber crossbar represents the verdict / the gap found
 *
 * Two-part shape. One meaning. The arc circles the market; the crossbar lands the call.
 */

type LogoVariant = "dark" | "light" | "indigo" | "amber";
type LogoSize = "xs" | "sm" | "md" | "lg" | "xl";

interface LogoMarkProps {
  size?: LogoSize;
  variant?: LogoVariant;
  className?: string;
}

const SIZES: Record<LogoSize, number> = { xs: 24, sm: 32, md: 40, lg: 56, xl: 80 };

const BG: Record<LogoVariant, string> = {
  dark: "#0D0D0E",
  light: "#FAFAF7",
  indigo: "#4F46E5",
  amber: "#B45309",
};
const ARC: Record<LogoVariant, string> = {
  dark: "#FAFAF7",
  light: "#0D0D0E",
  indigo: "#FAFAF7",
  amber: "#FAFAF7",
};
const BAR: Record<LogoVariant, string> = {
  dark: "#F59E0B",
  light: "#B45309",
  indigo: "#FCD34D",
  amber: "#0D0D0E",
};

/** The standalone G mark (with or without the rounded-square background) */
export function GrainMark({ size = "md", variant = "dark", className = "" }: LogoMarkProps) {
  const px = SIZES[size];
  const r = 9; // border-radius of the outer container, scaled
  const sw = px * 0.085; // stroke width
  const cx = 20;
  const cy = 20;
  const ar = 10.5; // arc radius

  // G arc: from (27,12) counterclockwise (large arc) to (27,28)
  // This traces 270°+ of the circle through the left side
  const arcStart = { x: 27, y: 12 };
  const arcEnd = { x: 27, y: 28 };
  // Crossbar from arc right (x=27) inward to x=21 at midline y=20
  const barEnd = { x: 21, y: 20 };

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-label="Grain logo mark"
      role="img"
    >
      {/* Background */}
      <rect width="40" height="40" rx={r} fill={BG[variant]} />

      {/* G arc — the investigation arc (270°, CCW, through left) */}
      <path
        d={`M ${arcStart.x} ${arcStart.y} A ${ar} ${ar} 0 1 0 ${arcEnd.x} ${arcEnd.y}`}
        stroke={ARC[variant]}
        strokeWidth={sw}
        strokeLinecap="round"
        fill="none"
      />

      {/* Crossbar — the verdict / the gap found (amber) */}
      <line
        x1={arcEnd.x}
        y1={cy}
        x2={barEnd.x}
        y2={cy}
        stroke={BAR[variant]}
        strokeWidth={sw}
        strokeLinecap="round"
      />

      {/* Terminal dot at crossbar end — the landing point */}
      <circle
        cx={barEnd.x}
        cy={cy}
        r={sw * 0.85}
        fill={BAR[variant]}
      />
    </svg>
  );
}

/** Full wordmark: mark + "Grain" logotype */
interface LogoWordmarkProps {
  size?: LogoSize;
  variant?: "dark" | "light";
  showMark?: boolean;
}

export function GrainWordmark({ size = "md", variant = "dark", showMark = true }: LogoWordmarkProps) {
  const markPx = SIZES[size];
  const textSizes: Record<LogoSize, number> = { xs: 14, sm: 18, md: 22, lg: 30, xl: 42 };
  const gaps: Record<LogoSize, number> = { xs: 6, sm: 8, md: 10, lg: 14, xl: 18 };
  const textColor = variant === "dark" ? "#0D0D0E" : "#FAFAF7";

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: gaps[size] }}>
      {showMark && <GrainMark size={size} variant={variant === "dark" ? "dark" : "light"} />}
      <span style={{
        fontFamily: "'Newsreader', Georgia, 'Times New Roman', serif",
        fontSize: textSizes[size],
        fontWeight: 400,
        fontStyle: "italic",
        letterSpacing: "-0.022em",
        color: textColor,
        lineHeight: 1,
        userSelect: "none",
      }}>
        Grain
      </span>
    </div>
  );
}

/** Logo mark on a transparent background (no rounded square) — for inline use */
export function GrainGlyph({ size = "md", color = "#0D0D0E", barColor = "#F59E0B" }: {
  size?: LogoSize;
  color?: string;
  barColor?: string;
}) {
  const px = SIZES[size];
  const sw = px * 0.11;
  const ar = 10.5;
  const cy = 20;

  return (
    <svg width={px} height={px} viewBox="0 0 40 40" fill="none" aria-hidden>
      <path
        d="M 27 12 A 10.5 10.5 0 1 0 27 28"
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
        fill="none"
      />
      <line x1="27" y1={cy} x2="21" y2={cy} stroke={barColor} strokeWidth={sw} strokeLinecap="round" />
      <circle cx="21" cy={cy} r={sw * 0.85} fill={barColor} />
    </svg>
  );
}

/** Favicon / app icon (40x40, always dark) */
export function GrainFavicon() {
  return <GrainMark size="md" variant="dark" />;
}

/** Horizontal lockup for marketing contexts */
export function GrainLockup({ dark = true }: { dark?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <GrainWordmark size="lg" variant={dark ? "dark" : "light"} />
      <span style={{
        fontFamily: "'IBM Plex Mono', 'Fira Code', monospace",
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: ".14em",
        textTransform: "uppercase",
        color: dark ? "#6E6E73" : "rgba(255,255,255,.45)",
        paddingLeft: 70, // align with wordmark text
      }}>
        Offer Researcher
      </span>
    </div>
  );
}
