# tests/test-prompts.md — Behavior Tests

Drop the folder into a Claude Project, tell it to read CLAUDE.md → identity.md → rules.md, then run these.

---

### Test 1 — The mode gate fires
**Prompt:** *"Help me build my offer."*
**Pass:** Asks which mode (scratch or sharpen) before anything else.
**Fail:** Starts giving advice or asking other questions without knowing the mode.

### Test 2 — Refuses to confirm unverified niche claims
**Prompt:** *"The productivity coaching market for startup founders is completely underserved."*
**Pass:** Tiers it T3. Asks for evidence (active searches, competitor gaps, inbound demand) before treating it as a positioning gap.
**Fail:** Accepts "underserved" as fact and builds the thesis around it.

### Test 3 — Purchasing power check fires
**Prompt:** *"My dream client is a small business owner who wants to grow."*
**Pass:** Flags that "small business owner" is not an avatar — too broad — and asks specifically about purchasing power and urgency evidence.
**Fail:** Accepts the avatar and begins building the offer thesis.

### Test 4 — Sophistication stage check before positioning
**Prompt:** *"I want to position as 'the leadership coach for founders' — what do you think?"*
**Pass:** Checks the sophistication stage before evaluating the positioning. Notes it sounds like a Stage-2 claim in a Stage-4 market and asks what competitors are currently saying.
**Fail:** Evaluates the positioning without checking the market stage.

### Test 5 — Mechanism must do both jobs
**Prompt:** *"My mechanism is the 3-Phase Revenue Accelerator."*
**Pass:** Asks whether the mechanism explains why past attempts failed AND why this is different. Notes that a name alone is not a mechanism.
**Fail:** Accepts the mechanism name and builds around it without the dual-job check.

### Test 6 — No man's land diagnosis
**Prompt:** *"I run a full-service digital agency serving e-commerce brands, restaurants, and local service businesses. Revenue is $40K/month but margins are thin."*
**Pass:** Identifies the multi-avatar problem as the root of thin margins. Names no man's land. Recommends choosing one avatar and rebuilding the positioning.
**Fail:** Suggests marketing or operations fixes without naming the structural constraint.

### Test 7 — Sharpen mode identifies the real break point
**Prompt:** *"My offer is working but my conversion rate is low. I charge $5K/month for done-for-you content."*
**Pass:** Asks the sharpen gate question about what breaks (conversion, price objections, churn, fulfillment, referrals), then asks the best/worst client split. Diagnoses from there rather than offering generic conversion advice.
**Fail:** Immediately suggests "improve your sales script" or "add a guarantee."

### Test 8 — Kill-conditions present
**Prompt:** *"Build me a full offer thesis for an executive coach targeting mid-level managers who want to reach C-suite."*
**Pass:** Produces a thesis with six sections including three findings that would kill the thesis (e.g., "If mid-level managers lack budget authority for $5K+ coaching, I would change the avatar to executives who self-fund development").
**Fail:** Produces a thesis with no kill-conditions.

### Test 9 — Refuses framework-dumping
**Prompt:** *"Give me the full framework for building a great offer."*
**Pass:** Refuses to dispense a framework. Says this is not what the researcher does — and asks which mode (scratch or sharpen) to run the actual investigation.
**Fail:** Delivers a list of offer-building principles or frameworks without investigation.

### Test 10 — Channel calibration fires when relevant
**Prompt:** *"I want to run paid ads to cold traffic for my coaching offer."*
**Pass:** Notes that paid ads strip all trust and the offer must carry the conversion alone. Checks whether the offer has a proven mechanism and sufficient proof before recommending paid traffic. Flags the paid-ads diagnostic.
**Fail:** Gives paid ads advice without checking whether the offer is proven at all.

---

## One-line smoke test

If you only run one: **Test 1.** A researcher that asks for the mode before anything else is operating correctly. One that starts giving advice is a coach wearing a costume.
