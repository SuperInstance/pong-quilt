# PLAYLOG — the experiment's memory

Every round is a receipted observation in the loop. Newest first.

## Round 2 — kimi1 — 2026-09-24 — quantum-audio L2 module (branch quantum-audio-L2)

### Deltas observed
- New L2 module family: `qa.js` (sonify → labeled-sim QPAM channel →
  autocorrelation imaging → MoveSuggestion). Zero-dep, UMD like core.js, so
  the browser and `node tools/test-qa.js` run the SAME code — 8/8 green.
- The waveform-imaging strip (violet = clean sonification, amber = decoded)
  makes the lossy channel visible: you watch the advice degrade as noise
  grows, which is the honest heart of the demo.
- Sibling survey caught a real lie upstream: quilt-quantumaudio-demo's
  substrate claims "same prompt → same hash (modulo shot noise)" but at
  shots=2000 over its own 882-sample text audio the decode is shot noise
  (run-to-run pearson ~0.02, 4/4 distinct hashes). See the spec's
  verified-claims table. Corrected, not propagated.

### Lies hunted (this round)
- [P1, fixed] Integer-lag autocorrelation biased imaged position by up to
  1/16 field; parabolic interpolation fixed it (test 3/4 caught it).
- [P1, fixed] Initial sonify() assumed [-1,1] state units; stateOf() is
  [0,1]. Convention mismatch — caught by the direction test.
- [note] Sim channel noise model (1.6/√shotsPerBin) is sized from ONE
  measured QPAM operating point, not fitted. v0 honesty is "visibly
  lossy", not "statistically faithful".

### Next
- [small] REAL_QPAM seam: bring-your-own encode/decode endpoint (like the
  LLM seam) so the channel can be the real thing when a server exists.
- [small] Receipt a QA-REFUSAL row when the sim labels itself exhausted
  (pot-bound), not just silent null.
- [medium] Compare advisor diets: GA alone vs +jepa vs +qa-sim vs +moth,
  champion fitness over N gens, receipts as the differ.

### Verdict
MERGEABLE (labeled sim, tested, receipts flow through the existing JEV/MOTH
rails).

---

## Round 1 — kimi1 — 2026-09-24 — vs v1 (e98cf66)

### Played versions: v1 only (first round — no prior to delta against)

### Deltas observed (shapes of change)
- **v0 → v1 was the birth delta**: the repo went from nothing to a working GA
  with checkpoints. Learning-curve shape of v1, from `node tools/prerun.js`:
  L0 (gen 0) survives 2,899 frames / 2 hits; L1 (gen 60) *regresses* to
  1,192 frames — the curve dips before it climbs; L2 (gen 260) caps at
  6,000 frames / 5 hits / ×3.40 speed. The dip is the interesting shape:
  early evolution trades survival for hit-seeking, and a checkpoint can be
  worse than where you started. The demo teaches non-monotonicity by
  embodying it.

### Lies hunted
- [P0, fixed] Ball teleported one field per frame (`sp*250` velocity bug) —
  first prerun run died in 8 frames every time, evolution had nothing to
  select. Caught by running, not reading. Repro: run prerun.js at parent
  commit. Fixed in working tree before first push.
- [P1, fixed] L2 level button had a duplicated `onclick=` attribute — dead
  control in the flagship feature. Caught by grep after writing.
- [note] Black-swan math and JEPA LMS are in the browser file only; no headless
  test pins them. A round should pin them under node.

### Next version spec (competitive improvements)
- [small] Pin black-swan + micro-JEPA under node: extract both from
  index.html into core.js, test determinism (seeded swan kills a perfect
  tracker; JEPA error decreases on a linear toy). verify: `node --test`.
- [small] Gen-sweep artifact: prerun emits a curve JSON (fitness vs gen, 20
  points) so the README table becomes a plotted shape, not three rows.
  verify: regenerated table matches curve endpoints.
- [medium] Wristband for honesty: the demo shows live `games` counter AND a
  "claims verified" badge listing which claims have node-pinned proofs vs
  browser-only. verify: badge lists match `node --test` names.
- [medium] First adversarial play-test: an agent plays v1 cold, 15-minute
  budget, writes Round 2 here. verify: this file gains a Round 2 entry.

### Verdict
MERGEABLE (v1 ships as the loop's seed; the loop is the product).
