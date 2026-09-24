# PLAYLOG — the experiment's memory

## Round 2 — kimi1 — 2026-09-24 — vs v1 (e98cf66)

### Played versions: v1 only (Round 1's next-version spec unimplemented; this round delivers its [medium] 'first adversarial play-test' item)

### Deltas observed (shapes of change)
- **The instrument moved more than the signal.** Round 1 recorded v1's shape as a
  single sample: L1 dip (1,192f) + L2 cap (6,000f/×3.40). Round 2 measured the
  *distribution* behind that sample and the recorded shape did not survive:
  8/8 seeded runs (same LCG seed, 60 gens) show **no dip** — L1 best climbs
  2,235→6,675, 2,935→6,700, etc.; dip frequency **0/8**. L2 best-of-run
  fitness spreads 4,568–6,700 across runs, and one run's gen-260 champion had
  **0 hits** — pure survival luck topped the population. d(learning)/d(version)
  is currently unmeasurable: run-to-run swan noise (±45% on L2 best) swamps any
  version delta a future round could claim. The learning curve didn't move
  between rounds; our *measurement of it* did — from story to distribution,
  and the story was luck.

### Lies hunted
- [P0] Seeded core is broken by one `Math.random()` — `core.js step()` black
  swan uses unseeded random while every other draw uses the seeded LCG. Every
  "numbers verified by running" claim is unverifiable-by-rerun: two runs of
  `node tools/prerun.js` gave 2,935/713/4,145 and 2,932/3,566/4,691; committed
  checkpoints (2,949/1,242/6,125) match neither; the README table and the
  on-page line "L1 is honestly worse than L0: training is non-monotonic" are
  one random sample presented as the system's shape (0/8 under v1). Bonus:
  prerun *silently overwrites* `checkpoints/*.js` (working tree dirty after
  any run) — provenance drift is built in. Repro: `node tools/prerun.js`
  twice; diff outputs and `git status`.
- [P1] micro-JEPA train/inference feature skew — `jepaLearn` trains on
  `sense()` scale (ballX∈[-1,1]) but `jepaSuggest` infers from `stateOf()`
  scale (ballX∈[0,1]). Measured on a committed-L2 champion trajectory:
  mean |err| 0.0247 (correct features) vs **0.4016** (page path) — 16×
  degradation; advice distribution skews to constant right-moves on short
  games. The "smallest honest world-model" is honest; its wiring is crossed.
  Repro: `node -e` train-on-sense/predict-on-stateOf vs predict-on-sense.
- [P2] Hidden hitbox assist — paddle drawn 0.16 wide; hits register over 0.20
  (`px-0.02 … px+paddleW+0.02`), +25% ghost margin, undocumented. A skeptical
  user watching closely sees misses score as hits. Repro: `core.js` step()
  death-check vs canvas `fillRect` width.
- [P2] MOTH "ledger" overclaims — `receipt()` caps at 40 rows with silent
  eviction (`receipts.shift()`), panel shows last 12. "Learning-from-advice
  leaves a ledger" — a ledger that forgets. (REFUSAL/v1 rows *are*
  receipted, per doctrine — that part is real.) Repro: attach a module, watch
  row count clamp at 40.
- [P2] LLM seam: doc says "fired after failures"; code fires `l2Suggest`
  every live frame → one fetch per rAF, steps applied in `.then` bursts —
  network latency becomes the frame clock and overlapping responses interleave
  steps. (Static-analysis finding; not runtime-verified — flagging per
  protocol.)
- [refuted, recorded honestly] Hypothesized swan-kicked horizontal orbits let
  zero-skill nets park to the 6,000-frame cap. Running refuted it: parking is
  metastable (the same swan kicks destroy it — parked probe died at 1,356f),
  0/8 evolved champions were park-dominated (all earned fitness by play,
  27–28 hits). One luck-run champion (0 hits) stands as the real, smaller
  defect — fitness noise occasionally crowns a non-hitter.

### Next version spec (competitive improvements)
- [small] Seed the swan: thread `rand` (or a dedicated swan stream) through
  `step()`; prerun becomes bit-reproducible. why: the P0 — without it no
  future round can verify any number. verify: run prerun.js twice →
  byte-identical checkpoints; `node --test` determinism assert.
- [small] Regenerate + commit checkpoints from the seeded run; README table
  rewritten from that run's real output (the "L1 honestly worse" line either
  holds under the seed or gets cut). verify: `git status` clean after two
  prerun runs; table matches fresh output.
- [small] Fix JEPA feature skew: one shared feature builder for learn+infer.
  why: P1 — the world-model's wiring is crossed. verify: node test —
  correct/skewed error ratio ≈1; suggestions non-degenerate on a champion
  trajectory.
- [medium] Fitness honesty pass: hits must matter (e.g. hits×100, or a
  "0-hit survivor" badge on the stats line). why: observed shape — a 0-hit
  luck champion can top the population; the demo currently can't distinguish
  skill from luck. verify: seeded synthetic run — a 0-hit survivor ranks
  below hitters; badge appears in test DOM.
- [medium] Wristband for honesty (carried from Round 1, now shown
  load-bearing): live "claims verified" badge listing node-pinned vs
  browser-only claims. why: "node-verified" is currently a vibe, not a
  receipt. verify: badge list matches `node --test` names.
- [medium] LLM seam pacing: fire on death/interval (not per frame), serialize
  in-flight (drop stale responses), align README with code. verify: headless
  mock-fetch test — ≤1 request per interval, monotonic step order.
- [small] Hitbox transparency: draw the effective paddle (0.20) or log the
  ±0.02 margin in the cells panel caption. verify: drawn zone == registered
  zone.

### Verdict
MERGEABLE — the loop is the product and this round is its proof of life: the
adversarial pass found the instrument broken before it could flatter anyone.

Every round is a receipted observation in the loop. Newest first.

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
