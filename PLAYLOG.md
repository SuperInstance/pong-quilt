# PLAYLOG — the experiment's memory

Every round is a receipted observation in the loop. Newest first.

## Round 3 — kimi1 — 2026-09-24 — honesty pass + C1 coevolution

### Played versions: v2 (this branch) vs v1+Round-2 stack (PR #1 #2 #3 open at press time)

### What was specified → what shipped (deltas as shape)
- **[medium] Fitness honesty pass** → `fitnessOf(frames,hits)=frames+hits×100`
  (`HIT_WEIGHT`) as the single formula in core.js. Shape of the delta: the
  old ×25 plateau inverted — a capped 0-hit survivor (6,000) used to beat any
  hitter dying before frame 5,725; now it always loses to ≥1 hit past
  frame 5,900 (pinned). Checkpoints re-evolved: L0 5,767 (4,567f/12h), L1
  8,800 (cap/28h), L2 8,700 (cap/27h) — note L1 > L2, honestly.
- **[medium] Verified-claims wristband** → `VERIFIED_CLAIMS` registry in
  core.js rendered as a badge panel (green=node-pinned, amber=browser-only).
  Two-way match pinned: every claim's proofTest exists, every test file
  backs a claim. Shape: the README headline table now cites its reproducing
  command per row; the badge is data, not decoration.
- **[medium] LLM seam pacing** → `makeSeam` in core.js: fire on death or
  ~every 150 frames (never per frame — Round 2 shipped fetch-per-rAF),
  one-in-flight (extras counted), ≥2 s pacing, replies tagged with the asking
  game and dropped stale. Shape: the demo's l2stat shows live drop counters;
  the fence comment admits the stale path is defensive under strict
  serialization and the counter proves it stands.
- **[small] Effective paddle** → `effectivePaddle(px)` = the 0.20 registered
  zone (±0.02 over the 0.16 bar), one source for draw + death-check + C1
  physics. The ghost hitbox (drawn 0.16 vs registered 0.20) is gone.
- **[C1] COEVOLUTION** → the GAN pair shipped as `newAdvGame/stepAdv/
  playAdv/runCoevGeneration/netId/makeLedger` + `tools/prerun-coev.js`.
  PSRO-style random-opponent evaluation, champion h2h receipted per gen into
  a hash-chained ledger with both net ids, **the loser breeds at 2×σ**.
  Shape of the verified artifact (seed 20260924, 120 gens × 24+24):
  early kills at ~113–160f → survivor rallies of 2,460–4,844f by gen 75 →
  **gen 110 first SURVIVOR-CAP** (eFit 5) → **gen 115 the loser-mutated ender
  kills in 559f**. The arms race is in the ledger, not asserted.
  md5 `946e639a…` stable across two runs; L0–L2 provenance untouched.
- **[carried-over small] micro-JEPA skew fix** (Round 2 item 3, absent from
  the sibling stack): `makeJepa` learns and infers on the same `sense()`
  vector. The old skew is pinned as a measured ≥5× mean-error ratio.

### Lies hunted
- [P1, fixed] Ghost hitbox: registration zone 0.20 vs drawn 0.16 — the
  effective margin existed only in prose. Now one constant, three consumers
  (draw, death check, C1 blocks), boundary-probed at ±0.001.
- [P1, fixed] README claimed velocity grows per hit; step() recomputes
  speedMul from frames after every boost multiplication — the per-hit boost
  is dead code in the classic lineage (checkpoint-provenance freeze kept it
  that way). C1 makes boosts real via an accumulator; the README now admits
  both. Caught by reading while wiring the same mechanic for C1.
- [P1, fixed] Seam fetched per animation frame and applied replies in
  arrival order. Now paced/serialized/stale-fenced, counters honest.
- [process] First C1 training run: ender won 40/40 h2h — the loser-mutation
  design (2σ on the champion slot) destroyed the survivor's accumulated
  skill every generation: degenerate GAN. Fixed to loser-population 2σ
  breeding with elites intact (PSRO evaluation), which produced the gen-110
  cap and gen-115 counter-kill. The regime flip is the proof the fix worked.

### Refusals (honest, with reasons)
- **MOTH receipt panel cap-40 silent eviction: NOT fixed** (deferred to
  Round 4). It requires deciding whether the panel should count evictions
  like makeLedger does or page — a product call, not a builder call.
- **edge-ml first/last-mile input filters: still NOT ported** (Round-2
  refusal stands; invalidates checkpoint I/O contract).
- **L1 hitBoost revival: refused** — changing classic physics invalidates
  L0–L2 provenance; the dead code is documented instead.

### Where Round 4 should push
- Receipt panel: counted evictions or pagination; the cap-40 silent shift is
  the repo's last known honesty gap.
- First/last-mile sense filter from gen 0, both lineages re-evolved, both
  curves kept.
- C1 scaling: pop 48+, gens 300+ — does the survivor reach recurring caps?
  A second regime flip (SURVIVOR-CAP streak) would be the next shape.
- LLM seam: a real endpoint in the loop (currently bring-your-own), plus a
  timeout on in-flight requests (a hung fetch stalls the seam; the fence
  comment says so).

### Verdict
MERGEABLE (Round 3 ships the honesty pass, the wristband, the paced seam,
the true paddle, and a coevolution mode whose arms race is receipted).

## Round 2 — kimi1 — 2026-09-24 — vs quilt-edge-ml (sibling) + v1

### Played versions: v1 (e98cf66 baseline) + sibling survey (quilt-edge-ml @9605a24)

### Deltas observed (shapes of change)
- **Pattern port, ring_buffer → makeRing**: champion history is now a bounded
  FIFO (240 gens in the demo, 261 in prerun). The demo grew a live
  **fitness strip** (green polyline, min→max labeled) and prerun emits
  `checkpoints/curve.json` (21 samples of all 261 gens). The curve is the
  shape of the lesson, now an artifact instead of three rows.
- **Pattern port, out_of_core → makeEvaluator**: fitness evaluation streams one
  candidate per `step()`; only a bounded elite archive + stats survive. In the
  browser, pops >64 chunk across animation frames (≤24 evals/frame) — the page
  no longer blocks per generation at high *games-at-once*. Flat memory at any
  population size; scheduling (chunk size) verified not to affect results.
- **Determinism fix** (the round's real hunt): v1's black swans drew from
  unseeded `Math.random()`, so `tools/prerun.js` was NOT reproducible — every
  run produced different checkpoints from the same seed, and the README table
  was single-run provenance. Reproduced by running twice (different numbers),
  fixed by threading the seeded rng into `step/playOne`. Verified: two
  consecutive prerun runs are byte-identical (md5).
- **New verified curve** (seed 20260924): L0 4,867 (4,567f, 12 hits, ×2.83) →
  L1 6,625 (6,000f cap, 25 hits, ×3.40) → L2 6,675 (6,000f cap, 27 hits).
  Climb by gen 39, then plateau under the frame cap with visible dips
  (6,700 ↔ 6,625). Non-monotonicity moved from the checkpoint rows into the
  plateau wobble — finer-grained, and shown live on the strip.

### Lies hunted
- [P0, fixed] Non-reproducible prerun (unseeded swans) — see above. Caught by
  running twice; the ">= vs <" class of bug below was caught by tests before
  commit.
- [P1, fixed] `makeEvaluator` elite-insertion comparison inverted (`>=` where
  `<` belongs): the archive kept the *worst* candidates and dropped the best.
  Caught by test 9 (brute-force top-K tie order) before any commit; the buggy
  run had already generated checkpoints — those were discarded and regenerated
  after the fix (L1/L2 numbers above are the corrected ones; level0 is
  identical either way, it predates selection).
- [P1, fixed] First prerun draft discarded `step()`'s return snapshot, so the
  generation result was undefined. Caught by running (TypeError), not reading.

### Refusals (honest, with reasons)
- **First/last-mile sense-vector filter: NOT ported.** It would change the
  sense() contract that L0–L2 were evolved under, silently invalidating their
  provenance — the exact sin this repo exists to catch. Round-3 candidate:
  enable from gen 0, re-evolve, keep both curves.

### Where the sibling still beats us
- Their ring buffer is durable (JSONL on eMMC, fsync per record, survives
  power loss); ours is in-memory only.
- They stream from disk with a real `partial_fit` loop against sklearn-class
  models; our substrate is a GA with no incremental-learning story beyond the
  micro-JEPA tile.
- They ship TFLite/ONNX/Edge-Impulse substrates and first/last-mile filters;
  we have none of those.
- Their tests run in CI; ours run when someone runs `node --test`.

### Verdict
MERGEABLE (Round 2 ships the two ports, the strip, the curve artifact, and
reproducible numbers; sibling keeps the substrate zoo crown).

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
