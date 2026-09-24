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

## Round 6 — kimi1 — 2026-09-25 — mode: BUILDER (one small: R6 spec item 1 — gameId-at-ask) + play-tester — vs round-5 tip (7882d99)

### Played versions: v1 (e98cf66) → edge-ml-crush (b06d901) → round-3-builder (0722670, "v2") → round-4 (e8774a2) → round-5 (7882d99)

### Builder receipt (the one small — Round 6 spec item 1: gameId stamped at ASK, not arrival)
- **what:** the seam glue gained `askGame=new Map()`; `maybeFireSeam` records
  `askGame.set(seq,gameId)` at fire; the shipped `onResult` echoes
  `gameId:askGame.get(seq)` (and `askGame.delete(seq)`) on delivery, on JEV
  refusal, and on transport error. A reply that outlives its game is stamped
  with the game that ASKED, so `takeAdvice()`'s existing stale-drop fence
  (`pendingAdvice.gameId!==gameId`) now actually fires — the R4/R5 P1 is closed.
- **why:** the gameId tag was stamped at reply ARRIVAL, reading the live
  closure — a dead game's held reply was rebranded with its successor's id
  and applied to a game that never asked. Confirmed three consecutive rounds
  (R4 found, R5 re-ran, R6 re-ran verbatim: `STALE ADVICE APPLIED`).
- **verify (FAIL-first, then green):** new `tests/seam-glue.test.js` extracts
  the VERBATIM shipped glue from index.html (line-anchored from
  `let llmSeam=null` through `takeAdvice` — extraction fails loudly if the
  page moves) and drives it headlessly with a gated fetch: (1) STALE reply
  from a dead game is dropped, never applied; (2) FRESH reply for the live
  game still flows (no regression); (3) the ask-map is cleaned on delivery
  AND on error (no unbounded growth); (4) extraction integrity. Against the
  Round-5 page: 2/4 FAIL (stale applied; no ask-map). Against the fix: 4/4
  PASS. Suite 49/49 green; `node tools/prerun.js` md5s byte-identical to
  Rounds 3–5 (coev.js `946e639a…`, L0/L1/L2, curve) — provenance untouched.
  VERIFIED_CLAIMS gained the `seam-glue` row (wristband two-way match holds);
  README's known-lie admission replaced with the fixed-note.

### Deltas observed (shapes of change)
- **d(honesty)/d(version): the browser integration surface keeps shrinking
  under the pin.** v1 failures lived in the core; edge-ml-crush pinned the
  units; R4 showed failures migrating between units; R5 pinned the C1
  training glue; R6 pins the seam glue. Two of the three browser-glue
  surfaces are now node-drivable, and the demo's flagship lie about its own
  flagship feature ("tags every reply with the asking game") is finally
  cashable. Shape: the GAN is working — each round the discriminator's
  headlamp narrows onto a smaller unpinned region (loadCoev, receipt panel,
  pop-slider remain).
- **Learning numbers are still frozen by honesty, not stagnation.** L0 5,767 /
  L1 8,800 / L2 8,700 and the coev arms race (gen-110 SURVIVOR-CAP → gen-115
  559f ender counter-kill, md5 `946e639a…`) reproduce byte-identical for the
  fourth straight round. What moves is coverage: suite 41→45→49.

### Lies hunted
- [P1, FIXED this round] seam gameId stamped at reply ARRIVAL — R6 repro re-ran
  verbatim pre-fix (`STALE ADVICE APPLIED`, third consecutive confirmation);
  fix + FAIL-first pin shipped (Builder receipt).
- [P1, confirmed third consecutive round by running, NOT fixed — R7 spec 1]
  `loadCoev` re-chains artifact rows onto fresh genesis, then banners the
  artifact's head. Repro re-ran deterministically: banner `8663279a` vs
  displayed re-chained head `83a099d4` (first displayed row re-chained away
  from original row-110 hash `6c072f4c`). The receipts pane shows a chain the
  banner doesn't name.
- [P2, confirmed second round by running, NOT fixed — R7 spec 2] coev
  "games-at-once" slider only grows the populations (`while(pop<n)push`),
  never shrinks — classic loop pins both ways. Repro re-ran: pops 256 →
  slider 16 → train → pops stay 256/256 while the classic loop pins to 16.
  The label lies after a shrink.
- [P2, deferred FOUR rounds (R3→R4→R5→R6), NOT fixed — R7 spec 3] receipt
  panel silent eviction past 40 rows. Repro re-ran: 45 writes → panel holds
  40, no eviction counter (makeLedger counts its evictions honestly;
  receipt() does not). The shipped comment still says "known lie".
- (nothing found in: fitness weights, ring, evaluator top-K, effective
  paddle, seeded swans, JEPA representation, seam pacing/timeout, coev
  rules/determinism, checkpoint consistency, prerun byte-reproducibility —
  all reproduce as claimed, twice-run this round.)

### Next version spec (Round 7)
- [small] loadCoev head honesty: banner `coev.ledger.head` (the re-anchored
  chain actually displayed) or render artifact rows read-only with original
  hashes + "anchored at genesis" — why: receipts pane shows a chain the
  banner doesn't name (P1 above, deterministic repro) — verify: displayed
  terminal hash == displayed head, asserted through the extracted glue.
- [small] Receipt panel eviction counter (`receipt()` gains `evicted`, panel
  shows "40 shown / N evicted" like makeLedger) — why: the repo's last known
  silent-drop honesty gap, deferred four rounds — verify: drive receipt()
  45× in the harness, count surfaces. DECIDE IT.
- [small] Coev pop-slider parity: pin `coev.popS/popE.length = n` on shrink,
  same as the classic loop — why: the slider label lies after a shrink (P2
  above) — verify: harness test — set pop 16→train→set 8→train, pops are 8.
- [medium] Extract loadCoev + receipt() into the requireable glue (with seam
  and C1 glue pinned, these three open items all live in the last unpinned
  browser surface) — why: the meta-fix completes the glue coverage — verify:
  R7 items 1–3 tested through it.
- [medium] C1 scaling study: pop 48+, gens 300+ in prerun-coev — does
  SURVIVOR-CAP recur? a second regime flip is the next shape (carried from
  R3/R4/R5/R6 queues) — verify: ledger receipted, md5-stable, arms-race rows
  cited.
- [epic] First/last-mile sense filter from gen 0: re-evolve both lineages
  under the filtered contract, keep BOTH curves, archive old checkpoints with
  provenance notes (carried from R2–R6 queues).

### Verdict
MERGEABLE (Round 6 ships the gameId-at-ask fix — FAIL-first pinned — and
receipts the three remaining open items a third/fourth time: 49/49 tests
green, checkpoint md5s byte-identical, no provenance touched).


## Round 5 — kimi1 — 2026-09-24 — mode: BUILDER (one small: R5 spec item 1) + play-tester — vs round-4 tip (e8774a2)

### Played versions: v1 (e98cf66) → edge-ml-crush (b06d901) → round-3-builder (0722670, "v2") → round-4 (e8774a2)

### Builder receipt (the one small — Round 5 spec item 1: C1 browser wiring)
- **what:** `startGenC`'s evaluators now return `fitness` (the field
  `makeEvaluator` actually records) WITH the coev alias alongside
  (`{fitness:r.sFitness, sFitness:...}` / `{fitness:r.eFitness, eFitness:...}`),
  and `continueGenC` maps `e.net`/`e.sFitness`/`e.eFitness` (the evaluator's
  record fields — `e.cand` never existed). README's "press Train (both
  populations evolve)" is now cashable, and says so.
- **why:** Round 4 receipted the freeze: undefined fitness → undefined
  champion → `JSON.parse(JSON.stringify(undefined))` SyntaxError inside the
  rAF tick, demo dead on C1 gen 1. Re-verified this round with the exact
  browser expressions under node BEFORE touching anything: THROWS, verbatim.
- **verify (FAIL-first, then green):** new `tests/coev-glue.test.js` extracts
  the VERBATIM shipped glue from index.html (startGenC→continueGenC, not a
  copy — the extraction fails loudly if the page is restructured) and drives
  it headlessly: 3 generations complete, champions are real nets (finite w1,
  content ids), every bred member of both populations is a real net, the
  ledger's rows recompute to their own hashes and chain genesis→tail, the
  stats line and ring are fed. Against the Round-4 page: 4/4 FAIL with the
  receipted `"undefined" is not valid JSON`. Against the fix: 4/4 PASS.
  Suite 45/45 green; `node tools/prerun.js` md5s byte-identical to Rounds
  3–4 (coev.js `946e639a…`, L0/L1/L2, curve) — no provenance touched; the
  only core.js change is one VERIFIED_CLAIMS row (`coev-glue`), which the
  wristband two-way match test required.

### Deltas observed (shapes of change)
- **The whole training surface is now under test.** v1's failure modes lived
  in the core; edge-ml-crush pinned the units; Round 4 showed the failures
  migrating BETWEEN the units; Round 5 closes that migration for the C1 path
  — the glue is node-drivable, so the discriminator can hunt it headlessly.
  Shape of d(coverage)/d(version): v1 core → v2 units → R4 unit-pins → R5
  the integration surface itself became a test fixture. The loop's claim
  ("the demo is an experiment, receipted") gets cheaper to defend every
  round.
- **Learning numbers are frozen by honesty, not by stagnation.** L0 5,767 /
  L1 8,800 / L2 8,700, byte-identical across Rounds 2–5 — checkpoints are
  provenance, so the curve can't move; what moves is how much of the demo's
  behavior the receipts cover. The arms-race shape (gen-110 SURVIVOR-CAP →
  gen-115 ender counter-kill) still stands untouched in the artifact.

### Lies hunted
- [P1, confirmed for a second round, FIXED] C1 browser training crashes on
  gen 1 — repro rerun verbatim (`THROWS: SyntaxError - "undefined" is not
  valid JSON`); fix + FAIL-first pin shipped (see Builder receipt).
- [P1, confirmed again by running, NOT fixed — R6 spec item 1] Seam gameId
  stamped at reply ARRIVAL, not ask. Repro rerun under node with a gated
  transport: game 1 asks, dies, game 2 starts, reply lands branded gameId=2
  and `takeAdvice()` accepts it — a reply game 2 never asked. README's known-
  lie admission (lines 183–184) stays accurate.
- [P2, confirmed again by running, NOT fixed — R6 spec item 2] `loadCoev`
  re-chains artifact rows onto fresh genesis, then banners the artifact's
  head. Repro rerun: banner `8663279a` vs displayed re-chained head
  `83a099d4`; first displayed row hash `12dd9dcc` vs original `6c072f4c`.
- [P3, new, confirmed by reading the two loops side by side] Coev
  "games-at-once" slider only GROWS the populations (`while(pop<n)push`),
  never shrinks them — the classic loop pins `pop.length=D.popSize` both
  ways. Repro: slider 256 → train coev → slider 16 → train: pops stay 256,
  the label lies about games-at-once. Spec'd R6 item 4.
- (nothing found in: fitness weights, ring, evaluator top-K, effective
  paddle, seeded swans, JEPA representation, seam pacing/timeout, coev
  rules/determinism, checkpoint consistency, prerun byte-reproducibility —
  all reproduce as claimed, twice-run this round.)

### Next version spec (Round 6)
- [small] gameId-at-ask: stamp the asking gameId into the fire payload, echo
  through onResult (or keep a seq→gameId map) — why: stale advice applies to
  the successor game (P1, confirmed twice now) — verify: the R4/R5 repro
  becomes a test through the coev-glue-style harness: dead-game reply
  dropped, never applied.
- [small] loadCoev head honesty: banner `coev.ledger.head` (the chain
  actually displayed) or render artifact rows read-only with original hashes
  + "anchored at genesis" — why: receipts pane shows a chain the banner
  doesn't name (P2, confirmed twice) — verify: displayed terminal hash ==
  displayed head, asserted in the glue harness.
- [small] Receipt panel eviction counter (`receipt()` gains `evicted`,
  panel shows "40 shown / N evicted") — why: the repo's last known
  silent-drop honesty gap, deferred THREE rounds — verify: drive receipt()
  45× in the harness, count surfaces. DECIDE IT (count, like makeLedger).
- [small] Coev pop-slider parity: pin `coev.popS/popE.length = n` on
  shrink, same as the classic loop — why: the slider label lies after a
  shrink (P3 above) — verify: harness test — set pop 16→train→set 8→train,
  populations are 8.
- [medium] Extract seam glue + receipt fn + loadCoev into a requireable
  `demo-glue.js` consumed by index.html AND tests — why: the coev-glue test
  proves extraction works; the three open items above all live in the
  remaining unpinned glue — verify: R6 items 1–4 tested through it.
- [medium] C1 scaling study: pop 48+, gens 300+ in prerun-coev — does
  SURVIVOR-CAP recur? a second regime flip is the next shape (carried from
  R3/R4 queues) — verify: ledger receipted, md5-stable, arms-race rows cited.
- [epic] First/last-mile sense filter from gen 0: re-evolve both lineages
  under the filtered contract, keep BOTH curves, archive old checkpoints
  with provenance notes (carried from R2/R3/R4 queues).

### Verdict
MERGEABLE (Round 5 ships the C1 browser-wiring fix — FAIL-first pinned —
and receipts the two carried P1/P2s a second time plus one new P3; 45/45
tests green, checkpoint md5s byte-identical, no provenance touched).


## Round 4 — kimi1 — 2026-09-24 — mode: BUILDER (one queued small) + play-tester — vs v2 (round-3-builder, PR #4)

### Played versions: v1 (e98cf66) → edge-ml-crush (b06d901) → round-3-builder (0722670, "v2")

### Builder receipt (the one small queued item — Round 3 queue #4: seam timeout)
- **what:** `makeSeam` gained `timeoutMs` (default 0 = pinned Round-3 behavior,
  opt-in) + injectable `schedule`/`cancel`. A timer races the transport;
  exactly-once `settle()` is shared by timeout and delivery — whichever lands
  first owns the request, the late arrival dies on the fence (and is NOT
  double-counted stale). On timeout: `inFlight` freed, `dropped.timedOut++`,
  `onResult(null, seq, Error)` — counted, not hidden.
- **why:** Round 3 queued it: a hung fetch held `inFlight` forever, silently
  refusing every future advice fire (dropped.inFlight climbing with no error
  surface).
- **verify:** `tests/seam.test.js` +2 pins — (1) hung transport: timeout frees
  the seam, counts timedOut, errors out, next fire allowed, late arrival not
  double-counted; (2) fast resolution cancels its timer. Suite 41/41 green;
  `node tools/prerun.js` md5s byte-identical to Round 3 (provenance
  untouched); browser wiring `SEAM_TIMEOUT_MS=8000` + timed-out counter in the
  drop display.

### Deltas observed (shapes of change)
- **The units held; the wiring hatched.** All 41 node tests green; prerun
  byte-reproducible (L0 5,767 / L1 8,800 / L2 8,700, L1>L2 honestly); coev
  artifact reproduces gen-110 SURVIVOR-CAP and gen-115 559f counter-kill, md5
  `946e639a…`. But the browser glue between pinned units — the surface NO
  test drives — contains two P1s (below). Shape of d(honesty)/d(version): the
  core is now well-pinned; the experiment's uncovered surface migrated from
  "inside the units" to "between the units." Coverage shape moved, failure
  mode moved with it — the loop working as designed (this round exists).

### Lies hunted
- [P1, confirmed by running, NOT fixed — spec item 1] **Browser C1 training
  crashes on generation 1.** `startGenC` feeds `makeEvaluator` evalOne fns
  returning `{sFitness|eFitness}`, but the evaluator records `r.fitness` →
  `undefined`; `continueGenC` then maps `e.cand`/`e.sFitness` (fields are
  `net`/`fitness`) → `runCoevGeneration` receives `net: undefined` →
  `JSON.parse(JSON.stringify(undefined))` throws SyntaxError inside the rAF
  tick → the whole demo freezes. Repro: the exact index.html expressions run
  under node (`"undefined" is not valid JSON`). The README's "press Train
  (both populations evolve)" is uncashable in browser; only the node-built
  artifact chip works. tests/coev.test.js builds records by hand, exactly
  like prerun-coev.js — the contract seam between evaluator and C1 glue is
  unpinned, and that is where the lie lived.
- [P1, confirmed by running, NOT fixed — spec item 2] **The seam's gameId tag
  is stamped at reply ARRIVAL, not at ask.** `onResult` reads the live
  `gameId` closure when the response lands; a reply meant for a dead game is
  branded with the successor's id and applied to a game that never asked.
  Repro under node with a gated transport: "STALE ADVICE APPLIED." README's
  "tags every reply with the asking game, drops replies whose game has died"
  overclaims; README now carries the known-lie admission.
- [P2, confirmed by running, NOT fixed — spec item 3] **`loadCoev` re-chains
  artifact ledger rows onto a fresh genesis, then banners the artifact's
  head.** Repro: banner head `a3e5255e` vs re-chained displayed rows head
  `632fc08b` — the receipts pane shows a chain the banner doesn't name.
- [P2, still open — carried] receipt panel silent shift at 40; evictions
  uncounted (makeLedger proves the honest pattern exists in-repo). Deferred
  twice — decide it.
- [fixed this round] seam timeout (see Builder receipt).
- (nothing found in: fitness weights, effective paddle, ring, evaluator
  top-K, JEPA representation, coev rules/determinism — all reproduce as
  claimed.)

### Refusals (honest, with reasons)
- **First/last-mile sense filter: NOT built** (carried from R2/R3 queues) —
  it changes the sense() I/O contract; the honest build re-evolves BOTH
  lineages from gen 0 and archives the old checkpoints' provenance. That is
  an epic, not a one-item round. Spec'd as the standing medium/epic item.

### Next version spec (Round 5)
- [small] Fix the C1 browser wiring: evaluator records carry the eval
  result's fields (`Object.assign` merge or `fitness` alias in the C1 evalOne
  fns) AND `continueGenC` maps `e.net`/`e.sFitness`/`e.eFitness` — why: the
  flagship Round-3 mode freezes the demo on gen 1 (P1 above) — verify: node
  integration test driving the EXACT browser expressions
  (evaluator→map→runCoevGeneration→h2h completes, champions are real nets,
  ledger row hashes).
- [small] gameId-at-ask: stamp the asking gameId into the fire payload, echo
  it through onResult (or keep a seq→gameId map in the glue) — why: stale
  advice currently applies to the successor game (P1 above) — verify: the
  Round-4 repro becomes a test: dead-game reply dropped, never applied.
- [small] loadCoev head honesty: either banner `coev.ledger.head` (the
  re-anchored chain actually displayed) or render artifact rows read-only
  with original hashes + "anchored at genesis, N rows elided" — verify:
  displayed terminal hash == displayed head, asserted in the extracted glue
  test (spec item below).
- [small] Receipt panel eviction counter (`receipt()` gains `evicted`,
  panel shows "40 shown / N evicted" like makeLedger) — why: the repo's last
  known silent-drop honesty gap, deferred twice — verify: drive receipt()
  45× in the extracted glue test, assert count surfaces.
- [medium] Extract the browser glue (C1 loop, seam glue, receipt fn,
  loadCoev) into a requireable `demo-glue.js` consumed by index.html AND
  tests — why: both P1s this round lived in the unpinned integration surface;
  the meta-fix makes the glue node-drivable so the discriminator can hunt it
  headlessly — verify: this spec's small items 1–4 are tested through it.
- [medium] C1 scaling study: pop 48+, gens 300+ in prerun-coev — does
  SURVIVOR-CAP recur? a second regime flip (cap streak → ender answer) is
  the next shape — verify: ledger receipted, md5-stable, arms-race rows cited
  (carried from R3 queue).
- [epic] First/last-mile sense filter from gen 0: re-evolve both lineages
  under the filtered contract, keep BOTH curves for comparison, archive old
  checkpoints with a provenance note (carried from R2/R3 queues).

### Verdict
MERGEABLE (Round 4 ships the seam-timeout receipt — the one small queued item
— and receipts two P1s + two P2s as the Round-5 spec; 41/41 tests green,
checkpoint md5s byte-identical, no provenance touched).

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
