# Grain — The Offer Researcher

<p align="center">
  <a href="https://grain-offer-researcher.vercel.app">
    <img src="https://grain-offer-researcher.vercel.app/opengraph-image" alt="Grain — No advice. A verdict on your offer." width="640" />
  </a>
</p>

<p align="center">
  <b><a href="https://grain-offer-researcher.vercel.app">▶ Live site</a></b> &nbsp;·&nbsp;
  <a href="https://grain-offer-researcher.vercel.app/try">⊛ Try the workspace</a> &nbsp;·&nbsp;
  <a href="https://grain-offer-researcher.vercel.app/brand">Brand kit</a> &nbsp;·&nbsp;
  <a href="https://github.com/griffainai/grain-offer-researcher/archive/refs/heads/main.zip">↓ Download ZIP</a>
</p>

> **For founders, operators, and sales leads who are tired of offer frameworks that were never built on what their specific market actually shows.**
>
> Grain runs the investigation before the framework. It checks your market's sophistication stage (Schwartz), verifies purchasing power, reads live competitor pages, and delivers a falsifiable offer thesis — a verdict with three findings that would prove it wrong.

**No advice. A verdict on your offer.**

Not a coach. Not a framework dispenser. A researcher.

---

## See the difference in 30 seconds

**You say:** *"I want to build a Grand Slam Offer for my coaching business."*

**Generic AI gives you:**
> Apply Hormozi's value equation: raise the dream outcome, increase perceived likelihood, reduce time delay and effort. Find your unique mechanism and niche down until it hurts.

A framework. Not built on your market. Not falsifiable.

**Grain gives you:**
> Before Hormozi helps you — I check your market's sophistication stage per Schwartz. Business coaching is Stage 4: mechanism saturation. 'Grand Slam Offer' is now table stakes — replicated by every coach at scale. Adding another named mechanism into this field doesn't differentiate; it saturates further. Here's the question that actually matters first: who is your specific avatar, and do they have purchasing power at the price point you're targeting?

A gate. A stage check. A real question — not a framework recitation.

---

## What Grain actually does

Grain investigates your market and produces a **falsifiable offer thesis** — a specific, testable claim with the evidence it's built on and the three findings that would flip it.

Before any framework, Grain runs the investigation:

1. **Which mode?** Scratch (no offer yet) or Sharpen (something's broken). The investigation is different for each.
2. **Market sophistication check** — Schwartz's five stages. Most founders are in Stage 3-4 (mechanism saturation) and don't know it. That changes everything about positioning.
3. **Avatar purchasing power** — Hormozi's best clients can pay. Grain checks whether yours can before building a thesis on an avatar that doesn't have the budget.
4. **The positioning gap** — What no competitor currently says. Found from what the market actually shows — not what you assume.

Then it builds the thesis.

---

## The output: six sections, all falsifiable

| Section | What it is |
|---------|------------|
| **The Verdict** | One sentence: build / rebuild / your constraint is X. A call, not a hedge. |
| **The Positioning Gap** | What no competitor currently owns — with a source tier, not an assumption. |
| **The Mechanism** | Named. Explains why Hormozi's equation was breaking AND why this is different. |
| **The Ledger** | Known (T1/T2) / Inferred (T3/T4) / Unknown — strictly separated. |
| **Three Kill-Conditions** | The disconfirming evidence. If Grain found these, it would change the verdict. *This is the part no summarizer produces.* |
| **The Next Question** | The single highest-leverage thing to validate — and exactly how. |

The source-tier system is the domain edge:

| Tier | Source type | Treatment |
|------|-------------|-----------|
| **T1** | Your own sales data, named client results | State plainly |
| **T2** | Market trend reports, competitor pricing (observable) | Date it, re-check it |
| **T3** | Market size claims, guru revenue figures, testimonials without context | Withhold until confirmed |
| **T4** | Inferred avatar, reconstructed competitor positioning | Label every guess |

---

## The market audit — reading live competitor pages

When you run the **Market Audit mode**, Grain doesn't rely on training data. It reads real competitor websites right now — pricing pages, homepage copy, offer structures — using [Jina AI](https://r.jina.ai) (completely free, no API key needed).

From the live audit:

```
🌐 Reading live pages...
✓ Alex Hormozi — Grand Slam framework, offer funnels
✓ Brendon Burchard — HPX method, $997–$5K range
✓ Sam Ovens / Skool — community + curriculum model
✓ Cardone Ventures — 10X mechanism, $15K+ entry

Stage 4 market (Schwartz). Grand Slam is now table stakes —
replicated by every coach at scale.

Gap: "operators at $1M–$10M hitting the complexity wall" — 
unclaimed avatar. No one owns it.

T1 — from live pages read.
```

---

## Two surfaces, one researcher

**The folder IS the brain.** The app is a window into it.

**Surface 1 — Drop the folder into Claude (zero install):**
1. Create a Claude Project at https://claude.ai/projects
2. Upload this folder as Project Knowledge
3. Start: *"Read CLAUDE.md, then identity.md and rules.md. I'm researching an offer."*
4. Name your market. Expect the gate first — not a framework.

**Surface 2 — Grain, the deployed app (`playroom/`):**
- Full-screen movie landing page (5 presentations, each with its own scene sequence)
- Live Market Audit (reads actual competitor pages)
- Build from Scratch and Sharpen modes
- Brand kit at `/brand`

> Edit a rule in `rules.md` and **both surfaces change** — the app reads the folder at request time.

---

## Folder structure

```
offer-researcher/
├── CLAUDE.md             ← Orientation, routing, reading order
├── identity.md           ← Who Grain is — and what it refuses to do
├── rules.md              ← The Offer Thesis Protocol (the operating constitution)
├── examples.md           ← Six annotated dialogues: gate, sophistication, kill-conditions
├── anti-examples.md      ← Coach vs. researcher, side by side
├── working-theory.md     ← Live per-market scaffold
│
├── reference/            ← Loaded on demand, not preloaded
│   ├── market-sophistication.md   ← Schwartz's 5 stages + detection guide
│   ├── avatar-research.md         ← Desire mechanics, purchasing power, urgency
│   ├── offer-anatomy.md           ← 3S formula, mechanism design, value equation
│   ├── source-tiers.md            ← How to weight every claim (T1–T4)
│   ├── positioning-library.md     ← Barbell, no man's land, category creation
│   ├── pricing-architecture.md    ← Premium flywheel, category-king economics
│   ├── cost-curve-design.md       ← Variable vs fixed cost, scalability architecture
│   ├── channel-calibration.md     ← Same offer, four different packages
│   ├── guarantee-design.md        ← When guarantees differentiate vs. weaken
│   ├── the-two-gates.md           ← Mode-aware opening gate (scratch vs. sharpen)
│   ├── offer-thesis-template.md   ← The six-section output shape
│   └── INDEX.md                   ← Library map + dependency spine
│
├── tests/test-prompts.md ← 10 behavior tests with pass/fail criteria
├── sessions/             ← Longitudinal memory (session logs)
│
└── playroom/             ← Grain app (Next.js, reads this folder at request time)
    ├── src/app/          ← 5-section fullscreen movie landing page
    ├── src/app/try/      ← The workspace (audit, scratch, sharpen)
    ├── src/app/brand/    ← Full brand kit (logo, tokens, type scale, components)
    ├── src/app/api/      ← Secure streaming route (Haiku default, Sonnet for audit/duel)
    ├── src/lib/          ← Brand tokens, design system, streaming hooks
    └── src/components/   ← Logo, Markdown, MarketAudit, Chat, LiveDuel
```

---

## Run it locally / deploy

```bash
cd playroom
npm install
cp .env.local.example .env.local   # add your ANTHROPIC_API_KEY
npm run dev                         # http://localhost:3000
```

Deploy to Vercel: set **Root Directory = `playroom`**, add `ANTHROPIC_API_KEY` as environment variable.

The app defaults to `claude-haiku-4-5-20251001` (cost control). Market Audit and Duel modes use `claude-sonnet-4-5-20250929` (sharper reasoning on live data). Both are configurable via env vars.

---

## The grounding

| Framework | How Grain uses it |
|-----------|-------------------|
| **Hormozi — $100M Offers** | The value equation (Outcome × Likelihood ÷ Time × Effort) diagnoses where a broken offer is actually breaking — almost always Likelihood, not Outcome. |
| **Schwartz — Breakthrough Advertising** | The five sophistication stages determine what kind of positioning claim can land. Stage 4 means mechanism saturation — another named method won't cut through. |
| **Todd Brown — Mechanism-first** | The mechanism must explain *why past attempts failed* AND *why this is different*. A name alone is not a mechanism. |
| **Peter Thiel — Zero to One** | Category design: the only durable position is one where the buyer's decision is between your offer and nothing — not between you and a competitor. |

---

## Behavior tests (run these on a fresh session)

The fastest: type *"Help me build my offer. I'm a business coach."*

**Pass:** Grain asks which mode (scratch or sharpen) before anything else, then checks the market's sophistication stage.

**Fail:** Grain gives a list of offer-building tips or references Hormozi without first investigating the market.

Full test suite in `tests/test-prompts.md` — 10 tests with explicit pass/fail criteria for each behavior the protocol requires.

---

## Why the structure looks this way

Built on **Interpretable Context Methodology** (Van Clief & McDermott, 2026). The folder isn't decoration — the folder *is* the researcher's architecture. Each file does one job, routing is explicit, reference material loads only when needed.

No vector store. No RAG. No orchestration framework. Just markdown files that any capable agent can navigate.

The deeper principle: *in a world full of advice, the scarce thing is a verdict built on an actual investigation.*

---

## License

MIT. Fork it, point it at your vertical, change the investigation gates and the source-tier discipline to fit. If you ship one, link back.

---

## Submission

Built for **Weekly Comp #6 — The Researcher** in the Cleaf Notes / EDUBA community.

> **Grain — for founders who are tired of frameworks that were never built on what their market actually shows.** It investigates before it recommends: Schwartz sophistication check, Hormozi value-equation diagnosis, live competitor page reading (via Jina AI). Delivers a falsifiable offer thesis — verdict + mechanism + positioning gap + three kill-conditions + the next question. The whole page is a movie. The folder is the agent.
