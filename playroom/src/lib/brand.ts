export const BRAND = {
  name: "Grain",
  wordmark: "Grain",
  tagline: "No advice. A verdict on your offer.",
  oneLiner: "An offer researcher. It investigates your market and tells you what to build, for whom, via what mechanism — and the three things that would change that verdict.",
  category: "Offer Researcher",
  siteUrl: "https://grain-offer-researcher.vercel.app",
} as const;

export type ModeId = "scratch" | "sharpen" | "diagnose" | "duel";

export type ModeMeta = {
  id: ModeId;
  label: string;
  subtitle: string;
  blurb: string;
  hex: string;          // accent color
  bgHex: string;        // pale bg tint
  borderHex: string;
  glyph: string;
  placeholder: string;
  starter: string;
  maxTokens: number;
};

export const MODES: Record<ModeId, ModeMeta> = {
  scratch: {
    id: "scratch",
    label: "Build from scratch",
    subtitle: "No offer yet.",
    blurb: "You have a domain and a rough idea. The researcher will find the avatar, the gap, and the mechanism — then tell you whether the economics actually work.",
    hex: "#0071E3",
    bgHex: "#E8F1FD",
    borderHex: "#C0D9F7",
    glyph: "✦",
    placeholder: "Name the domain and who you're thinking of serving. e.g. \"I want to help e-commerce founders with their email strategy.\"",
    starter: "I want to build an offer for ",
    maxTokens: 1400,
  },
  sharpen: {
    id: "sharpen",
    label: "Sharpen my offer",
    subtitle: "Already selling, something's off.",
    blurb: "You have an offer. Something is breaking — conversion, price objections, churn, margin. The researcher will find the root cause and tell you what needs to change.",
    hex: "#34C759",
    bgHex: "#E8F9ED",
    borderHex: "#B8EACD",
    glyph: "◈",
    placeholder: "What do you sell and what do you charge? e.g. \"$5K/month social media management for local restaurants.\"",
    starter: "My current offer is ",
    maxTokens: 1400,
  },
  diagnose: {
    id: "diagnose",
    label: "Diagnose my market",
    subtitle: "Quick sophistication check.",
    blurb: "Where is your market on Schwartz's scale? A Stage-1 claim in a Stage-4 market dies on contact. The researcher will locate the stage and tell you what positioning actually works.",
    hex: "#FF9F0A",
    bgHex: "#FFF3E0",
    borderHex: "#FDDBA5",
    glyph: "◎",
    placeholder: "Name your market and what competitors are currently saying. e.g. \"Business coaching for founders — everyone claims 'scale your business.'\"",
    starter: "My market is ",
    maxTokens: 900,
  },
  duel: {
    id: "duel",
    label: "Duel",
    subtitle: "Internal mode for the live comparison.",
    blurb: "Deliver a full offer thesis. No gate. Name the verdict, the gap, the mechanism, the avatar, the ledger, three kill-conditions, and the next question.",
    hex: "#1D1D1F",
    bgHex: "#F5F5F7",
    borderHex: "#E5E5EA",
    glyph: "⊕",
    placeholder: "",
    starter: "",
    maxTokens: 1400,
  },
};

export const MODE_ORDER: ModeId[] = ["scratch", "sharpen", "diagnose"];
