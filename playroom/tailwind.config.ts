import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // GRAIN palette — Apple-inspired, warm and clean
        // Backgrounds
        bg: {
          DEFAULT: "#F5F5F7",   // Apple's exact page gray
          surface: "#FFFFFF",    // card / panel bg
          hover: "#F8F8FA",      // subtle hover
          muted: "#F2F2F4",      // muted bg
        },
        // Text — Apple's exact text colors
        ink: {
          DEFAULT: "#1D1D1F",   // primary text (Apple's near-black)
          secondary: "#6E6E73", // secondary text
          tertiary: "#AEAEB2",  // placeholder / tertiary
          link: "#0071E3",      // Apple blue link
        },
        // Borders
        line: {
          DEFAULT: "#E5E5EA",   // standard divider
          strong: "#C7C7CC",    // stronger border
          focus: "#0071E3",     // focus ring (Apple blue)
        },
        // Mode accents
        scratch: {
          DEFAULT: "#0071E3",   // Apple blue — building new
          light: "#E8F1FD",     // pale blue bg
          deep: "#0058B3",
        },
        sharpen: {
          DEFAULT: "#34C759",   // Apple green — refining
          light: "#E8F9ED",     // pale green bg
          deep: "#248A3D",
        },
        // Signal colors — semantic
        gap: {
          DEFAULT: "#FF9F0A",   // Apple orange — positioning gap / opportunity
          light: "#FFF3E0",
          deep: "#C97E00",
        },
        kill: {
          DEFAULT: "#FF3B30",   // Apple red — kill conditions
          light: "#FFEEED",
        },
        infer: {
          DEFAULT: "#AF52DE",   // Apple purple — inferred
          light: "#F5EAFB",
        },
        // Source tier colors
        tier1: "#28CD41",       // verified — Apple green
        tier2: "#FF9F0A",       // decaying — Apple orange
        tier3: "#FF3B30",       // contested — Apple red
        tier4: "#AF52DE",       // inferred — Apple purple
      },
      fontFamily: {
        sans: ['"Inter"', "-apple-system", "BlinkMacSystemFont", "'SF Pro Display'", "system-ui", "sans-serif"],
        display: ['"Inter"', "-apple-system", "system-ui", "sans-serif"],
        mono: ['"SF Mono"', '"Fira Code"', "monospace"],
      },
      borderRadius: {
        "sm": "6px",
        "md": "10px",
        "lg": "14px",
        "xl": "18px",
        "2xl": "22px",
        "3xl": "28px",
        "pill": "100px",
      },
      boxShadow: {
        // Apple-style layered soft shadows — NO hard offsets
        "apple-sm": "0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.05)",
        "apple": "0 2px 4px rgba(0,0,0,0.04), 0 6px 18px rgba(0,0,0,0.07)",
        "apple-md": "0 4px 8px rgba(0,0,0,0.04), 0 10px 28px rgba(0,0,0,0.09)",
        "apple-lg": "0 8px 16px rgba(0,0,0,0.05), 0 18px 44px rgba(0,0,0,0.10)",
        "apple-focus": "0 0 0 4px rgba(0,113,227,0.2)",
        "apple-scratch": "0 0 0 4px rgba(0,113,227,0.15)",
        "apple-sharpen": "0 0 0 4px rgba(52,199,89,0.15)",
      },
      fontSize: {
        "xs": ["11px", { lineHeight: "1.45", letterSpacing: "0.01em" }],
        "sm": ["13px", { lineHeight: "1.5", letterSpacing: "0" }],
        "base": ["15px", { lineHeight: "1.55", letterSpacing: "-0.01em" }],
        "lg": ["17px", { lineHeight: "1.5", letterSpacing: "-0.015em" }],
        "xl": ["20px", { lineHeight: "1.4", letterSpacing: "-0.02em" }],
        "2xl": ["24px", { lineHeight: "1.35", letterSpacing: "-0.025em" }],
        "3xl": ["30px", { lineHeight: "1.25", letterSpacing: "-0.03em" }],
        "4xl": ["38px", { lineHeight: "1.15", letterSpacing: "-0.035em" }],
        "5xl": ["48px", { lineHeight: "1.08", letterSpacing: "-0.04em" }],
        "6xl": ["60px", { lineHeight: "1", letterSpacing: "-0.045em" }],
      },
    },
  },
  plugins: [],
};

export default config;
