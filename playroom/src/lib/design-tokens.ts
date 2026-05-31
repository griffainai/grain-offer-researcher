/**
 * GRAIN — Design Token System
 *
 * Semantic naming: every token has a name that explains WHY it's used,
 * not just what it looks like. "grain-amber" not "orange".
 *
 * The palette was built around three conceptual anchors:
 *   — The Investigation (near-black ink + warm off-white paper)
 *   — The Signal (indigo — intelligence, investigation, the mechanism)
 *   — The Gap Found (amber — the positioning gap, the verdict, the breakthrough)
 */

export const GRAIN_TOKENS = {
  /* ------------------------------------------------------------------ IDENTITY */
  brand: {
    name: "Grain",
    tagline: "No advice. A verdict on your offer.",
    descriptor: "Offer Researcher",
    url: "https://grain-offer-researcher.vercel.app",
    github: "https://github.com/griffainai/grain-offer-researcher",
  },

  /* ------------------------------------------------------------------ COLORS */
  color: {
    /**
     * CORE — The ink-and-paper palette.
     * Warm near-blacks and off-whites. No pure #000 or #fff.
     * "Warm" because research is a human act, not a machine one.
     */
    ink: {
      950: "#0D0D0E",     // Grain Black — headings, logo bg, primary buttons
      900: "#1A1A1C",     // Page headers when dark
      800: "#2D2D30",     // Heavy text on dark surfaces
      700: "#3D3D3F",     // Body text (primary)
      500: "#6E6E73",     // Secondary / captions
      400: "#8E8E93",     // Placeholder / disabled labels
      300: "#AEAEB2",     // Hairlines on light bg
      200: "#C8C8CC",     // Stronger borders
      100: "#E8E8EC",     // Default card border
      50:  "#F4F4F2",     // Surface hover states
      0:   "#FAFAF7",     // Grain White — page background, the "paper"
    },

    /**
     * SIGNAL — Indigo.
     * Used for: intelligence, the investigation arc, Grain's primary accent,
     * active states, links, focus rings. Named "signal" because Grain finds
     * the signal in market noise.
     */
    signal: {
      900: "#1E1B4B",
      800: "#312E81",
      700: "#3730A3",
      600: "#4338CA",
      500: "#4F46E5",     // — Grain Indigo — primary accent
      400: "#6366F1",
      300: "#818CF8",
      200: "#A5B4FC",
      100: "#C7D2FE",
      50:  "#EEF2FF",     // — pale tint for backgrounds
    },

    /**
     * GAP — Amber.
     * Used for: the positioning gap found, the verdict highlight,
     * the amber crossbar in the logo, the "found it" moment.
     * Named "gap" because amber is the color of the gap that gets surfaced.
     */
    gap: {
      900: "#78350F",
      800: "#92400E",
      700: "#B45309",     // — Grain Amber — amber crossbar in logo
      600: "#D97706",
      500: "#F59E0B",
      400: "#FBBF24",
      300: "#FCD34D",
      200: "#FDE68A",
      100: "#FEF3C7",
      50:  "#FFFBEB",     // — pale amber bg
    },

    /**
     * SEMANTIC COLORS — Source-tier system and verdict states.
     * Each corresponds to a Grain source tier (T1–T4) or verdict type.
     */
    tier1: {                         // T1 — Verified. Confident. State it plainly.
      text:   "#065F46",
      border: "#6EE7B7",
      bg:     "#ECFDF5",
      solid:  "#059669",
    },
    tier2: {                         // T2 — Decaying. Date it. Re-check it.
      text:   "#92400E",
      border: "#FCD34D",
      bg:     "#FFFBEB",
      solid:  "#D97706",
    },
    tier3: {                         // T3 — Contested. Withhold the number.
      text:   "#991B1B",
      border: "#FCA5A5",
      bg:     "#FEF2F2",
      solid:  "#DC2626",
    },
    tier4: {                         // T4 — Inferred. Label every guess.
      text:   "#5B21B6",
      border: "#C4B5FD",
      bg:     "#F5F3FF",
      solid:  "#7C3AED",
    },
    kill: {                          // Kill-conditions — red rail
      text:   "#B91C1C",
      border: "#FCA5A5",
      bg:     "#FEF2F2",
      solid:  "#DC2626",
    },
    verdict: {                       // The verdict — indigo accent
      text:   "#3730A3",
      border: "#A5B4FC",
      bg:     "#EEF2FF",
      solid:  "#4F46E5",
    },
  },

  /* ------------------------------------------------------------------ TYPOGRAPHY */
  type: {
    /**
     * Three-font system:
     *   Newsreader — authority, depth, investigation. Headlines only.
     *   Inter — clarity, professionalism. Body, UI, labels.
     *   IBM Plex Mono — data, source tiers, technical labels, code.
     */
    family: {
      display: "'Newsreader', Georgia, 'Times New Roman', serif",
      body:    "'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
      mono:    "'IBM Plex Mono', 'Fira Code', 'Cascadia Code', monospace",
    },

    /** Display scale — Newsreader, for hero headlines */
    display: {
      "2xl": { size: "clamp(72px, 9vw, 110px)", weight: 400, leading: 0.92, tracking: "-0.028em" },
      "xl":  { size: "clamp(52px, 7vw,  82px)", weight: 400, leading: 0.96, tracking: "-0.024em" },
      "lg":  { size: "clamp(40px, 5.2vw, 68px)", weight: 400, leading: 1.02, tracking: "-0.022em" },
      "md":  { size: "clamp(32px, 3.8vw, 52px)", weight: 400, leading: 1.06, tracking: "-0.018em" },
      "sm":  { size: "clamp(24px, 2.8vw, 38px)", weight: 500, leading: 1.1,  tracking: "-0.014em" },
    },

    /** Body scale — Inter */
    body: {
      "xl":  { size: "20px", weight: 400, leading: 1.65 },
      "lg":  { size: "18px", weight: 400, leading: 1.62 },
      "md":  { size: "16px", weight: 400, leading: 1.58 },
      "sm":  { size: "14px", weight: 400, leading: 1.55 },
      "xs":  { size: "12px", weight: 400, leading: 1.5  },
    },

    /** Mono / label scale — IBM Plex Mono */
    mono: {
      "lg": { size: "15px", weight: 500, tracking: "0"     },
      "md": { size: "13px", weight: 500, tracking: "0"     },
      "sm": { size: "11px", weight: 600, tracking: ".08em" },
      "xs": { size: "10px", weight: 600, tracking: ".12em" },
      "cap": { size: "11px", weight: 700, tracking: ".16em", transform: "uppercase" },
    },
  },

  /* ------------------------------------------------------------------ SPACING */
  space: {
    /** 4px base grid. All spacing tokens are multiples of 4. */
    1:   "4px",
    2:   "8px",
    3:   "12px",
    4:   "16px",
    5:   "20px",
    6:   "24px",
    8:   "32px",
    10:  "40px",
    12:  "48px",
    16:  "64px",
    20:  "80px",
    24:  "96px",
    32:  "128px",
    40:  "160px",
  },

  /* ------------------------------------------------------------------ RADIUS */
  radius: {
    none: "0",
    xs:   "4px",
    sm:   "6px",
    md:   "10px",
    lg:   "14px",
    xl:   "18px",
    "2xl": "22px",
    "3xl": "28px",
    pill: "999px",
  },

  /* ------------------------------------------------------------------ SHADOW */
  shadow: {
    /** Layered soft shadows — never hard offsets. Depth through blur, not position. */
    xs:   "0 1px 2px rgba(13,13,14,0.05), 0 1px 4px rgba(13,13,14,0.04)",
    sm:   "0 1px 2px rgba(13,13,14,0.04), 0 2px 8px rgba(13,13,14,0.06)",
    md:   "0 2px 4px rgba(13,13,14,0.04), 0 6px 18px rgba(13,13,14,0.08)",
    lg:   "0 4px 8px rgba(13,13,14,0.04), 0 12px 32px rgba(13,13,14,0.10)",
    xl:   "0 8px 16px rgba(13,13,14,0.05), 0 20px 48px rgba(13,13,14,0.12)",
    "2xl": "0 16px 32px rgba(13,13,14,0.06), 0 40px 80px rgba(13,13,14,0.14)",
    glow: {
      signal: "0 0 0 4px rgba(79,70,229,0.18)",
      gap:    "0 0 0 4px rgba(245,158,11,0.2)",
      kill:   "0 0 0 4px rgba(220,38,38,0.16)",
    },
  },

  /* ------------------------------------------------------------------ MOTION */
  motion: {
    /** Easing curves */
    ease: {
      spring:  "cubic-bezier(0.16, 1, 0.3, 1)",  // Snappy spring — UI interactions
      smooth:  "cubic-bezier(0.4, 0, 0.2, 1)",    // Google material-style
      enter:   "cubic-bezier(0, 0, 0.3, 1)",       // Elements entering
      exit:    "cubic-bezier(0.7, 0, 1, 1)",       // Elements exiting
    },
    /** Durations */
    duration: {
      instant: "80ms",
      fast:    "140ms",
      base:    "220ms",
      slow:    "360ms",
      scene:   "600ms",    // demo scene transitions
    },
  },

  /* ------------------------------------------------------------------ LOGO SPEC */
  logo: {
    /** The Grain mark SVG spec */
    mark: {
      viewBox: "0 0 40 40",
      bg: { rx: 9 },
      arc: {
        // G-arc: counterclockwise large arc from (27,12) to (27,28)
        // Traces ~270° of a circle (r=10.5, center ~20,20)
        // Represents: the investigation circling the market
        d: "M 27 12 A 10.5 10.5 0 1 0 27 28",
        color: "ink-0",   // on dark bg
        strokeWidth: "3.4",
        strokeLinecap: "round",
      },
      crossbar: {
        // Horizontal bar at midline, from arc (x=27) inward to x=21
        // Represents: the verdict — the gap found
        color: "gap-500", // amber
        x1: 27, y1: 20, x2: 21, y2: 20,
        strokeWidth: "3.4",
        strokeLinecap: "round",
      },
      terminal: {
        // Small dot at the crossbar endpoint — where the verdict lands
        cx: 21, cy: 20,
        color: "gap-500",
      },
    },
    wordmark: {
      font: "Newsreader",
      weight: 400,
      style: "italic",
      tracking: "-0.022em",
    },
    /** Clear space: minimum 1× the mark width on all sides */
    clearSpace: "1x mark width",
    /** Minimum sizes */
    minSize: { mark: "24px", wordmark: "120px" },
    /** Do not: rotate, recolor the arc, change the font, add effects */
  },

  /* ------------------------------------------------------------------ BREAKPOINTS */
  breakpoint: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  /* ------------------------------------------------------------------ GRID */
  grid: {
    maxWidth: "1200px",
    gutter: "32px",
    gutterMobile: "20px",
    columns: 12,
  },
} as const;

/** CSS custom properties string (for root injection) */
export const GRAIN_CSS_VARS = `
  /* Grain Design Tokens — CSS Custom Properties */

  /* Core ink */
  --grain-ink-950: #0D0D0E;
  --grain-ink-700: #3D3D3F;
  --grain-ink-500: #6E6E73;
  --grain-ink-300: #AEAEB2;
  --grain-ink-100: #E8E8EC;
  --grain-ink-50:  #F4F4F2;
  --grain-ink-0:   #FAFAF7;

  /* Signal (indigo) */
  --grain-signal-700: #3730A3;
  --grain-signal-500: #4F46E5;
  --grain-signal-300: #818CF8;
  --grain-signal-50:  #EEF2FF;

  /* Gap (amber) */
  --grain-gap-700: #B45309;
  --grain-gap-500: #F59E0B;
  --grain-gap-50:  #FFFBEB;

  /* Semantic */
  --grain-surface:  #FFFFFF;
  --grain-bg:       var(--grain-ink-0);
  --grain-border:   var(--grain-ink-100);
  --grain-fg:       var(--grain-ink-950);
  --grain-fg-soft:  var(--grain-ink-700);
  --grain-fg-muted: var(--grain-ink-500);
  --grain-accent:   var(--grain-signal-500);
  --grain-accent-bg: var(--grain-signal-50);
  --grain-amber:    var(--grain-gap-700);
  --grain-amber-bg: var(--grain-gap-50);

  /* Shadow */
  --grain-shadow-sm: 0 1px 2px rgba(13,13,14,0.04), 0 2px 8px rgba(13,13,14,0.06);
  --grain-shadow-md: 0 2px 4px rgba(13,13,14,0.04), 0 6px 18px rgba(13,13,14,0.08);
  --grain-shadow-lg: 0 4px 8px rgba(13,13,14,0.04), 0 12px 32px rgba(13,13,14,0.10);

  /* Motion */
  --grain-spring:  cubic-bezier(0.16, 1, 0.3, 1);
  --grain-smooth:  cubic-bezier(0.4, 0, 0.2, 1);
`;

export type GrainTokens = typeof GRAIN_TOKENS;
