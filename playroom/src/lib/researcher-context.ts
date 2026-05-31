import { promises as fs } from "fs";
import { existsSync } from "fs";
import path from "path";

const MIRROR = path.join(process.cwd(), ".researcher");
const ROOT = existsSync(path.join(MIRROR, "rules.md")) ? MIRROR : path.resolve(process.cwd(), "..");

export type Mode = "scratch" | "sharpen" | "diagnose" | "duel";

async function readSafe(p: string): Promise<string> {
  try { return await fs.readFile(p, "utf-8"); } catch { return ""; }
}

const MODE_INSTRUCTIONS: Record<Mode, string> = {
  scratch: `# ACTIVE MODE: SCRATCH — building from zero
The user has no existing offer yet. Run the Scratch Gate (market / avatar+purchasing-power / prior-attempts). Absorb what's already given; never re-ask it.
After the gate: locate the market sophistication stage, verify purchasing power and urgency, name the positioning gap, build the mechanism, then produce the full Offer Thesis.`,

  sharpen: `# ACTIVE MODE: SHARPEN — refining an existing offer
The user has a live offer. Run the Sharpen Gate (current offer+price / break point / best-worst split). The best/worst client split is your T1 anchor — weight it heavily.
After the gate: diagnose which lever is broken (conversion, pricing, churn, fulfillment, or referral), name the root cause, and produce the Offer Thesis with a specific repair verdict.`,

  diagnose: `# ACTIVE MODE: DIAGNOSE — market sophistication check
Quick, focused. Locate the market on Schwartz's five-stage scale. Check the user's current positioning claim against the actual stage. If they're making a Stage-1 claim in a Stage-4 market, say so directly and explain what positioning actually works at this stage. Output should be tight — stage, evidence, positioning verdict, next question.`,

  duel: `# ACTIVE MODE: DUEL — deliver a full offer thesis, no gate
The operator has provided the market, mode, and belief. You have enough to produce the thesis.
HARD RULES:
- Do NOT run any gate. Do NOT ask questions first.
- Open with THE VERDICT (one sentence, a real call not a hedge).
- Then: THE POSITIONING GAP / THE MECHANISM / THE AVATAR / THE LEDGER / THREE FINDINGS THAT WOULD KILL THIS / THE NEXT QUESTION.
- Use bold section headers. Keep it scannable. The contrast with generic advice is the point.`,
};

let cached: string | null = null;

async function loadConstitution(): Promise<string> {
  if (cached) return cached;
  const [claude, identity, rules, antiEx] = await Promise.all([
    readSafe(path.join(ROOT, "CLAUDE.md")),
    readSafe(path.join(ROOT, "identity.md")),
    readSafe(path.join(ROOT, "rules.md")),
    readSafe(path.join(ROOT, "anti-examples.md")),
  ]);
  const refDir = path.join(ROOT, "reference");
  const refs = await fs.readdir(refDir).catch(() => [] as string[]);
  const refContent = (await Promise.all(
    refs.filter(f => f.endsWith(".md")).sort().map(async f => {
      const c = await readSafe(path.join(refDir, f));
      return `### reference/${f}\n\n${c}`;
    })
  )).join("\n\n---\n\n");

  cached = `You are Grain — the Offer Researcher. The files below are your operating constitution. They override any default behavior.

You investigate markets and produce falsifiable offer theses. You are not a business coach. You do not dispense frameworks. You investigate.

You are running inside a web interface. When you produce a full thesis, use these bold section headers:
**THE VERDICT** / **THE POSITIONING GAP** / **THE MECHANISM** / **THE AVATAR** / **THE LEDGER** / **THREE FINDINGS THAT WOULD KILL THIS** / **THE NEXT QUESTION**

Tier claims inline: (T1 — verified), (T2 — observed, date it), (T3 — contested, need more sources), (T4 — inferred, label it).

---

# CLAUDE.md
${claude}

---

# identity.md
${identity}

---

# rules.md
${rules}

---

# anti-examples.md
${antiEx}

---

# THE REFERENCE LIBRARY
${refContent}`;
  return cached;
}

export async function loadResearcherSystemPrompt(mode: Mode = "scratch"): Promise<string> {
  const constitution = await loadConstitution();
  return `${MODE_INSTRUCTIONS[mode]}\n\n${constitution}`;
}
