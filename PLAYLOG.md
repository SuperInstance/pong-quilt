# PLAYLOG — the experiment's memory

Every round is a receipted observation in the loop. Newest first.

## Canonical index (repair R11 item 2)

| Round | Date | Branch / base | Status |
|---|---|---|---|
| R11 | 2026-09-25 | playtest-round-11 (vs r10 tip 287824d) | canonical (this file, newest first) |
| R10 | 2026-09-25 | r10-pop-slider-parity (vs main 1f5943c) | canonical — receipt written post-hoc by R11 |
| R9 | 2026-09-25 | playtest-round-9 (vs main cda9eab) | canonical |
| R8 | 2026-09-25 | playtest-round-8 (vs main 54b625a) | canonical |
| R7 | 2026-09-25 | playtest-round-7 (vs main 1ae696b) | canonical |
| R6 | 2026-09-25 | round-6 (vs round-5 tip 7882d99) | canonical |
| R5 | 2026-09-24 | round-5 (vs round-4 tip e8774a2) | canonical |
| R4 | 2026-09-24 | round-3-builder (PR #4) | canonical |
| R3 | 2026-09-24 | honesty pass + C1 coevolution | canonical |
| R2 | 2026-09-24 | TWO canonical branch entries below: `Round 2 (branch quilt-edge-ml-survey)` and `Round 2 (branch quantum-audio-L2)` — both shipped, neither supersedes the other |
| R2 artifact | 2026-09-24 | via PR #1 (pre-honesty pass) | STALE DUPLICATE — retitled, kept as historical artifact, not a Round 2 |
| R1 | 2026-09-24 | v1 (e98cf66) | canonical |

## Round 11 — kimi1 — 2026-09-25 — mode: BUILDER (one small: receipt-kind attribution, fresh P2, FAIL-first pin) + play-tester — vs r10 branch tip 287824d (pop-slider parity)

### Played versions: v1 (e98cf66) → v2 (0722670) → R4→R9 chain → main (1f5943c, post-PR#10) → r10-pop-slider-parity (287824d)

### Builder receipt (the one small — receipt-kind attribution, found this round by running)
- **what:** the shipped receipt call in `l2Suggest()` read
  `receipt(s.source||src==="none"?"L2":s.source||src, …)` — which parses as
  `(s.source || (src==="none")) ? "L2" : (s.source || src)`. Every advisor that
  sets `.source` (jepa `"jepa"`, moth `"moth"`, qa `"qa-sim"`) was written
  into the hash-chained ledger with kind `"L2"`. The stat line above the
  panel said `jepa suggests move=…` while the ledger — the demo's honesty
  centerpiece — recorded `"L2"`. Fixed to
  `receipt(s.source||(src==="none"?"L2":src), …)`: the ledger now names the
  advisor; `"L2"` remains the dead fallback. New
  `tests/receiptkind-glue.test.js` extracts the VERBATIM shipped l2Suggest()
  and fires each advisor headlessly (jepa trained first so its suggestion is
  shape-valid): three ATTRIBUTION tests + one FALLBACK test. VERIFIED_CLAIMS
  gained the `receiptkind-glue` row (17 rows).
- **why:** Rounds 3–10 pinned every claim about the ledger's *bounds* and
  *chain integrity* (cap-40 eviction R7, hash chain R5) — but never the
  *attribution column*. The provenance lie sat one operator-precedence level
  below every previous read. This is the ninth round of the glue-pair class
  (browser glue shipped unexamined until run).
- **verify (FAIL-first, then green):** against the pre-fix page, exactly the
  three ATTRIBUTION tests fail (`ledger kind is "L2" — the stat line says
  "jepa suggests" but the hash-chained ledger records "L2"`, likewise moth,
  qa-sim); FALLBACK passes both before and after (it pins the fallback, not
  the bug). After the fix: 4/4 PASS. Suite 64→68 tests, all green;
  `node tools/prerun.js` md5s byte-identical (coev.js `946e639a…`,
  L0/L1/L2, curve.json `ba1c919a…`) — provenance untouched; checkpoints
  clean in the working tree after the run. The page-parse pin guards the
  edited inline block.

### Process debt settled (the missing Round 10 receipt)
- The r10-pop-slider-parity branch (287824d) shipped the R10 builder item —
  coev pop-slider shrink parity, the P2 carried since Round 5 — and pushed,
  but its run died before the PLAYLOG entry and the PR. The code was real:
  this round re-verified it independently (suite 64/64 green on the branch
  tip; my own headless repro of the shipped startGenC: 16→8 shrink pins
  popS/popE to 8, 8→32 regrow restores 32/32; prerun md5s byte-identical).
  The Round 10 entry below is written post-hoc from that verification, and
  this branch's PR now carries both rounds. Recorded as a process finding:
  **a pushed branch without a PLAYLOG entry is an unshipped round** — the
  receipt is the ship.

### Deltas observed (shapes of change)
- **d(honesty)/d(version): the glue-pair class closed its ninth member, and
  the class itself is now the measurable signal.** Nine consecutive rounds,
  each closing exactly one browser-glue honesty gap (R3 weights/paddle, R6
  seam gameId, R7 receipt eviction, R8 page parse, R9 loadCoev head, R10
  pop-slider, R11 receipt attribution). Shape: the lies are not random —
  they cluster in the seam between the pinned core and the unpinned page.
  d(lies)/d(version) is decaying (one per round, each smaller: from a lying
  banner, to a lying population count, to a lying provenance column) — the
  class is being mined out.
- **d(learning)/d(version) = 0 for the ninth straight round** — L0 5,767 /
  L1 8,800 / L2 8,700, coev arms race md5 `946e639a…` byte-identical. The
  freeze is provenance (committed checkpoints), confirmed again by running.
  The standing epic items (C1 scaling study; first/last-mile sense filter
  with re-evolution) remain the only paths to a nonzero learning delta.
- **d(coverage)/d(version) continues: suite 56→60→68, VERIFIED_CLAIMS
  15→17.** The wristband is compounding faster than the learning curve is
  frozen — the demo is becoming a specification of itself.

### Lies hunted
- [P2, found this round by running, FIXED] receipt-kind attribution —
  jepa/moth/qa-sim advice receipted as `"L2"` in the hash-chained ledger due
  to operator precedence (`s.source||src==="none"?"L2":…`). Repro: headless
  l2Suggest ×3 advisors, all kinds `"L2"` pre-fix. Fix + FAIL-first pin
  shipped (Builder receipt).
- [P2, confirmed fixed by independent re-run] coev pop-slider shrink parity
  (the R10 item) — my repro of the shipped startGenC: shrink pins both pools,
  regrow restores. The r10 pin (tests/popslider-glue.test.js) also passes.
- [P3-process, still present, NOT fixed — R12 spec 1] PLAYLOG merge disorder:
  the stale duplicate Round 2 still sits between Round 7 and Round 6;
  three "Round 2" headings total (two branch-canonical). Repair needs
  disambiguation, not deletion.
- [P3-process, verified by reading, NOT fixed — R12 spec 2] no CI:
  `.github/workflows/` does not exist; the page-parse and other pins run
  only when a runner runs them. A merge that breaks the page has no gate.
- [P3, observed, NOT fixed — R12 spec 3] the `moth` advisor is a handcoded
  heuristic (`vy>0 ? chase : 0`, confidence pinned at 0.8) wearing the
  "receipted advice ledger" label — the label names the system, not the
  advice source. Honest but confusing; the advisor-diet comparison would
  expose it as the trivial diet.
- (nothing found in: fitness weights, ring, evaluator top-K, effective
  paddle, black-swan seeding, loadCoev head, pop-slider parity — all pinned
  and re-verified green this round.)

### Next version spec (competitive improvements)
- [small] PLAYLOG merge-disorder repair — disambiguate the three "Round 2"
  headings (retitle the stale duplicate as a named historical artifact, add
  a canonical index at top). why: Rounds 9, 10, 11 each re-flagged it; the
  memory the loop eats from is out of order. verify: exactly one "Round 2"
  heading; top index lists rounds 1–11 in order.
- [small] CI gate: `.github/workflows/test.yml` running `node --test
  tests/*.test.js` on PR + push to main. why: R8/R10/R11 pins are only as
  real as the runner that executes them; the R8 dead-merge incident would
  have been caught. verify: a PR that breaks a pin goes red.
- [medium] Advisor-diet comparison: GA alone vs +jepa vs +moth vs +qa-sim —
  champion fitness over N gens under the SAME seed, receipts as the differ.
  why: carried since Round 2; the L2 seam is the demo's differentiation and
  has zero comparative evidence. Also exposes the moth heuristic as trivial.
  verify: a prerun-style tool emits per-diet curves; diets differ.
- [medium] REAL_QPAM seam + QA-REFUSAL receipt row when the sim labels
  itself exhausted (pot-bound). why: carried since Round 2/9; the qa tile
  currently admits exhaustion silently (null suggestion, no receipt).
  verify: forced-exhaustion state receipts a REFUSAL row.
- [epic] C1 scaling study (population × gens sweep with the frozen
  provenance harness) OR first/last-mile sense filter with re-evolution —
  the only paths to nonzero d(learning)/d(version). why: nine rounds at
  zero learning delta; the honesty instrumentation is mature enough to
  support a real experiment now. verify: a new receipted curve in
  checkpoints/ with different endpoints.

### Verdict
MERGEABLE (P2 fixed with FAIL-first pin; suite 68/68; prerun byte-identical;
R10 code re-verified independently; process debt recorded honestly).

### Builder receipt (item 2 — PLAYLOG merge-disorder repair, R11 spec small)
- **what:** disambiguated the three `## Round 2` headings and gave the log
  a canonical index. (1) Stale duplicate (pre-honesty pass, merged via PR #1)
  retitled `## Artifact A — stale duplicate of Round 2…` — kept as a named
  historical artifact per doctrine (disambiguation, not deletion; the memory
  the loop eats from is now in order). (2) The two canonical branch Round 2s
  got branch labels: `Round 2 (branch quilt-edge-ml-survey)` and
  `Round 2 (branch quantum-audio-L2)` — both shipped, neither supersedes.
  (3) A canonical index table (R11→R1 + artifact row, with branch/base and
  status) now sits at the top of the log.
- **verify:** `grep '^## Round 2'` returns exactly the two uniquely-labeled
  canonical branch entries (zero stale duplicates); the top index lists
  every round 1–11 in order plus the artifact row. Docs-only change — no
  shipped code touched; suite re-run 68/68 green as a sanity check.
- **why:** Rounds 9, 10, 11 each re-flagged it; the experiment's memory was
  out of order at exactly the seam future rounds read first.

### Builder receipt (item 6 — loadCoev glue extraction, R11 spec)
- **what:** removed the throwaway ledger from `loadCoev()`. The page built
  `coev` via `Object.assign(coev||{}, {… ledger:PQ.makeLedger(300) …})` and
  then, on the very next line, rebuilt `coev.ledger=PQ.makeLedger(300)` and
  re-chained the artifact tail onto it. The first chain was constructed and
  discarded on every C1 load — dead glue, and a reader trap: two
  `makeLedger(300)` calls in one function with no signal which chain the
  receipts pane actually shows. Extraction: the Object.assign literal no
  longer carries `ledger:`; the single explicit construction+re-anchor is
  the only chain built. Behavior-preserving — every other line verbatim.
  New FAIL-first pin in `tests/loadcoev-glue.test.js`: the extracted
  `loadCoev()` source must contain exactly ONE `PQ.makeLedger(300)`
  construction.
- **why:** the glue-pair class is honesty-first, but dead construction is
  the same class's quiet member: two chains where one is displayed invites
  the next editor to banner the wrong head. Round 9 pinned WHICH head the
  banner may name; this item removes the second chain so the question
  cannot recur.
- **verify (FAIL-first, then green):** against the pre-fix page the new pin
  FAILS (`loadCoev() constructs 2 ledgers`); after extraction 5/5 in the
  file, suite 68→69 tests all green; `node tools/prerun.js` md5s
  byte-identical (coev.js `946e639a…`, curve.json `ba1c919a…`, L0/L1/L2) —
  provenance untouched; checkpoints clean in the working tree after the run.
  The page-parse pin guards the edited inline block.

---

## Round 10 — kimi1 — 2026-09-25 — mode: BUILDER (one small: R10 spec item 1 — coev pop-slider shrink parity, the five-round P2) + play-tester — vs main 1f5943c (post-PR#10 merge)

> Receipt note: this entry was written post-hoc by Round 11. The branch
> shipped and pushed at 15:07 +0800 but its run ended before the PLAYLOG
> entry and the PR; Round 11 re-verified the code independently and
> completes the receipt here. The numbers below are Round 11's re-runs.

### Played versions: v1 (e98cf66) → v2 (0722670) → R4→R9 chain → main (1f5943c)

### Builder receipt (the one small — Round 10 spec item 1: coev pop-slider shrink parity)
- **what:** the coev loop's population resize only GREW
  (`while(pop<n)push`, never shrinks) while the classic loop pins both ways
  (`if(pop.length>D.popSize)pop.length=D.popSize;`). After dragging the
  games-at-once slider down, the label lied: slider 8, 16 pops still
  playing. Fix: two lines in startGenC pinning popS/popE to the slider on
  shrink, verbatim-commented as classic-loop parity. New
  `tests/popslider-glue.test.js`: extracts the VERBATIM shipped startGenC()
  and drives 16→8 (both pools must be 8), 8→16 regrow, and a truncation
  ghost check (every survivor after shrink is a real net). VERIFIED_CLAIMS
  gained the `popslider-glue` row.
- **why:** Rounds 5→9 receipted this lie five consecutive times with frozen
  numbers; Round 9 spec item 1 decided the shape (pin like the classic
  loop). This round ships the decision.
- **verify (re-run by Round 11):** popslider-glue 4/4 PASS on the branch tip;
  independent repro of the shipped startGenC (extraction-anchored, same
  technique as the pin): grow to 16 → shrink 16→8 pins popS=8/popE=8 →
  regrow 8→32 restores 32/32. Suite 64/64 green at the branch tip;
  `node tools/prerun.js` md5s byte-identical (coev.js `946e639a…`,
  L0/L1/L2, curve.json). Round 11's FAIL-first confirmation of the bug's
  pre-fix existence is preserved in the R9 entry (five consecutive
  byte-identical repros, R5→R9).

### Deltas observed (shapes of change)
- **d(lies)/d(version): the carried-P1/P2 class shrank again.** Round 9
  closed the loadCoev head lie; this round closes the pop-slider lie — the
  browser-glue pair both died within two rounds, each with a FAIL-first
  pin. (R11 later adds: the class had a ninth member — receipt attribution —
  also since Round 3. The class is the seam, not any single lie.)
- **d(learning)/d(version) = 0, eighth straight round** — L0 5,767 /
  L1 8,800 / L2 8,700, coev md5 `946e639a…` byte-identical. Provenance
  freeze, re-confirmed by running.

### Lies hunted (as re-verified by Round 11)
- [P2, carried 5 rounds, FIXED] coev pop-slider shrink parity —
  popslider-glue 4/4 PASS; independent repro confirms shrink pins both
  pools and regrow restores.
- [P3-process, recorded by R9, deferred here] merge disorder + no-CI —
  carried to R11 spec, still open at R11.

### Next version spec (competitive improvements) — as specified by R9, executed this round
- [small→SHIPPED] pop-slider parity (above).
- [small, STILL OPEN — R11 spec] merge-gate doctrine + CI workflow.
- [small, STILL OPEN — R11 spec] PLAYLOG merge-disorder repair.

### Verdict
MERGEABLE (the code, re-verified by Round 11: 64/64 green at branch tip,
prerun byte-identical, independent repro PASS. The missing receipt + PR are
the process debt Round 11 settles).

---

## Round 9 — kimi1 — 2026-09-25 — mode: BUILDER (one small: R9 spec item 1 — loadCoev head honesty, FAIL-first pin) + play-tester — vs main cda9eab (post-PR#9 merge)

### Played versions: v1 (e98cf66) → v2 (0722670) → R4 (e8774a2) → R5 (7882d99) → R6 (d8ec449) → main-merge (1ae696b, was dead) → R7 (54b625a) → R8/main (cda9eab)

### Builder receipt (the one small — Round 9 spec item 1: loadCoev head honesty, the six-round P1)
- **what:** the shipped `loadCoev()` stats line banners `coev.ledger.head` —
  the re-anchored chain the receipts pane ACTUALLY displays — with the
  artifact's true md5-verified head disclosed beside it:
  `ledger ${coev.ledger.head} (re-anchored at genesis; artifact ${cp.ledgerHead})`.
  New `tests/loadcoev-glue.test.js`: extracts the VERBATIM shipped loadCoev()
  from index.html (line-anchored — extraction fails loudly if the page moves)
  and drives it headlessly against the real committed artifact: (1) extraction
  integrity; (2) the HONESTY invariant — the bannered ledger head equals the
  head of the chain actually displayed, with the displayed tail recomputing to
  it; (3) PROVENANCE — the artifact's true head stays disclosed, not erased by
  the re-anchor; (4) the no-artifact path alerts and touches nothing. VERIFIED_CLAIMS
  gained the `loadcoev-glue` row; README's C1 section now admits the re-anchor
  and names the pin (formerly the lie was nowhere admitted in README).
- **why:** Rounds 4→8 receipted the lie five consecutive times with
  byte-identical numbers: banner `8663279a` (the artifact's head) over a pane
  showing artifact rows re-chained onto fresh genesis, displayed head
  `83a099d4`, first displayed row re-chained `360e1dfc` vs its artifact hash
  `6c072f4c`. The banner said "md5-verified" over a chain the pane did not
  show. Round 8 spec item 1 decided the shape (banner the displayed chain;
  keep artifact head as provenance); this round ships the decision.
- **verify (FAIL-first, then green):** against the pre-fix page, exactly one
  test fails, verbatim: `banner names 8663279a but the pane shows a chain
  headed 83a099d4 — the receipt pane shows a chain the banner doesn't name`.
  After the fix: pin 4/4 PASS. Suite 56→60 tests, all green; `node
  tools/prerun.js` md5s byte-identical (coev.js `946e639a…`, L0/L1/L2,
  curve) — provenance untouched; checkpoints clean in the working tree after
  the run. The page-parse pin guards the edited inline block (it is in the
  suite).

### Deltas observed (shapes of change)
- **d(lies)/d(version): the carried-P1 class shrank for the first time in six
  rounds.** The R4→R8 shape was a stable pair of unfixed browser-glue lies
  re-confirmed with frozen numbers each round (deterministic repros — the
  failure surface was stable, not noisy). This round closes the older of the
  two (P1) with a FAIL-first pin; the younger (P2 pop-slider) remains live.
  Shape: d(honesty)/d(version) is no longer only additive coverage — one
  long-frozen lie actually died.
- **The honesty-instrumentation compounding continues.** Suite 56→60,
  VERIFIED_CLAIMS 14→15 rows; four consecutive builder rounds each closed
  one deferred honesty gap (R6 seam gameId, R7 receipt eviction, R8 page
  parse, R9 loadCoev head). Learning numbers remain frozen by provenance for
  the seventh straight round — L0 5,767 / L1 8,800 / L2 8,700, coev arms race
  md5 `946e639a…` byte-identical. d(learning)/d(version) = 0 is now a
  seven-times-receipted fact.
- **What the freeze IS: provenance, not stagnation — but it is now the
  experiment's main uncovered shape.** Seven rounds, zero learning-curve
  movement, because checkpoints are committed receipts. The standing
  medium/epic items (C1 scaling study; first/last-mile sense filter with
  re-evolution) are the only paths to a nonzero d(learning)/d(version); both
  carry again below.

### Lies hunted
- [P1, confirmed 6th consecutive round by running, FIXED] loadCoev head
  dishonesty — repro re-ran byte-identical (banner `8663279a` vs displayed
  `83a099d4`; row re-chain `360e1dfc` vs `6c072f4c`); fix + FAIL-first pin
  shipped (Builder receipt).
- [P2, confirmed 5th consecutive round by running, NOT fixed — R10 spec 1]
  coev "games-at-once" slider only grows (`while(pop<n)push`, never shrinks;
  classic loop pins both ways, present verbatim at index.html startGen).
  Repro re-ran: slider 16→8 → pops stay 16/16 while the classic loop pins to
  8. The label lies after a shrink.
- [P3-process, still present, NOT fixed — R10 spec 2] PLAYLOG merge disorder:
  the stale duplicate Round 2 (pre-honesty-pass, PR #1) still sits between
  Round 7 and Round 6; and the quantum-audio branch's own Round 2 entry means
  three "Round 2" headings total exist. The repair needs disambiguation, not
  just deletion (two branch-canonical R2s are real history).
- [P3-process, verified by reading, NOT fixed — R10 spec 3] merge-gate doctrine
  still textless: EXPERIMENTS.md carries no rule that a sibling PR needs a
  play-test round or CI pin, and `.github/workflows/` does not exist. The R8
  page-parse pin runs only when a runner runs it.
- (nothing found in: fitness weights, ring, evaluator top-K, effective paddle,
  seeded swans, JEPA representation, seam pacing/timeout/gameId, receipt
  eviction, coev rules/determinism, checkpoint consistency, prerun
  byte-reproducibility, page parse — all reproduce as claimed, twice-run this
  round.)

### Next version spec (Round 10)
- [small] Coev pop-slider parity: pin `coev.popS/popE.length = n` on shrink
  (same as the classic loop's `pop.length=D.popSize`), FAIL-first pin in the
  coev-glue harness — why: the slider label lies after a shrink (P2, five
  consecutive rounds) — verify: set pop 16→train→set 8→train, pops are 8.
- [small] Repair PLAYLOG merge disorder: delete the stale duplicate Round 2
  (line-anchored, marked) and label the two canonical ones ("Round 2
  (main)" / "Round 2 (quantum-audio branch)") — why: the memory presents a
  superseded pre-honesty-pass round as current truth between R7 and R6, and
  three same-numbered headings make the chain ambiguous — verify: no STALE
  marker remains, exactly three Round-2 headings each branch-labeled, file
  reads R10→R1 top to bottom.
- [small] Merge-gate doctrine, text half: write the rule into EXPERIMENTS.md
  (a sibling PR may not merge without either one play-test round or the
  node-parse pin running on it) — why: the R7→R8 P0 existed only because a
  merge bypassed the loop; the pin exists but the doctrine text does not —
  verify: EXPERIMENTS.md carries the rule verbatim.
- [medium] Merge-gate CI: stand up `.github/workflows/` running
  `node --test tests/*.test.js` on every PR — why: pins only bite when they
  run uninvoked; the repo has no CI at all — verify: a PR that breaks the page
  fails the check (the page-parse pin is the canary).
- [medium] Extract loadCoev into the requireable glue — why: seam, C1, and
  receipt glue are pinned; loadCoev is pinned as text but not requireable —
  verify: R10 items tested through it.
- [medium] C1 scaling study: pop 48+, gens 300+ in prerun-coev — does
  SURVIVOR-CAP recur? a second regime flip is the next shape (carried from
  R3–R9 queues) — verify: ledger receipted, md5-stable, arms-race rows cited.
- [epic] First/last-mile sense filter from gen 0: re-evolve both lineages
  under the filtered contract, keep BOTH curves, archive old checkpoints with
  provenance notes (carried from R2–R9 queues).

### Verdict
MERGEABLE (Round 9 ships the loadCoev head-honesty fix — FAIL-first pinned —
and re-confirms the pop-slider lie a fifth time; 60/60 tests green, checkpoint
md5s byte-identical, no provenance touched. The six-round P1 is dead.)

## Round 8 — kimi1 — 2026-09-25 — mode: BUILDER (one small: R8 spec item 1 — draw() P0 fix, FAIL-first page-parse pin) + play-tester — vs main 54b625a (post-PR#8 merge)

### Played versions: v1 (e98cf66) → edge-ml-crush (b06d901) → v2 (0722670) → R4 (e8774a2) → R5 (7882d99) → R6 (d8ec449) → main-merge (1ae696b, broken) → R7-merged main (54b625a, still broken)

### Builder receipt (the one small — Round 8 spec item 1: fix the draw() regression, pin the class)
- **what:** the champion-strip block in draw() restored VERBATIM from d8ec449
  (`i?cv.lineTo(x,y):cv.moveTo(x,y);});cv.stroke();` — verified byte-identical
  by diff against the R6 tip — which also puts the two trailing fillText lines
  back INSIDE `if(pts.length>1)` so `lo`/`hi` are in scope; the stray `}` is
  gone). New `tests/page-parse.test.js`: extracts EVERY inline `<script>`
  block from the shipped index.html and asserts each parses AND is
  brace-balanced — structural pin, not cosmetic. VERIFIED_CLAIMS gained the
  `page-parse` row (the wristband two-way match test demanded it).
- **why:** main has been dead on arrival since the quantum-audio merge
  (PR #3): the page's only inline block failed to parse, so NOTHING ran —
  no game, no training, no receipts. Round 7 receipted the P0 and
  deliberately left the fix to this round ("the page stays dark until R8
  spec item 1").
- **verify (FAIL-first, then green):** against the pre-fix index.html the
  new test fails verbatim: `inline block #0 must parse — got: Unexpected
  token 'function'` and brace depth ends at −1. After the fix: page-parse
  3/3 green; full suite 56/56 green; `node tools/prerun.js` md5s
  byte-identical (coev.js `946e639a…`, L0 `8a49b0f6…`, L1 `aa4d7c4b…`,
  L2 `63b7fdd5…`, curve `ba1c919a…`) — provenance untouched. Beyond parsing,
  a Proxy-DOM headless smoke boots the shipped inline script and runs: 5
  tick frames, classic draw, coev/ender draw, loadCoev + render (banner
  prints the artifact line), and 3 live coev ticks — zero throws.

### Deltas observed (shapes of change)
- **d(death)/d(version): the first round in five where the failure surface
  swallowed the whole demo.** Rounds 4–7 watched failure migrate between
  units (core → glue → seam → receipt panel); this round the page was 100%
  dead — a syntax error is not a degraded learning curve, it is the absence
  of any curve. The fix restores R6-parity behavior, and the pin guards the
  CLASS (any unbalanced inline block, from any future merge), not the
  instance. Shape: the loop's blind spot from Round 7 (merge integration)
  gets its tripwire.
- **Honesty coverage is the only moving metric, and it compounds.** Suite
  53→56, VERIFIED_CLAIMS 13→14 rows; three consecutive builder rounds each
  closed one deferred honesty gap (R6 seam gameId, R7 receipt eviction, R8
  page parse). The learning numbers remain frozen by provenance for the
  sixth straight round — L0 5,767 / L1 8,800 / L2 8,700, coev arms race md5
  `946e639a…` byte-identical. d(learning)/d(version) = 0 is now itself a
  receipted fact, not an assertion.
- **The two carried browser-glue lies reproduced with byte-identical numbers
  for the fifth/fourth straight rounds** (below) — determinism means the
  re-chain and the grow-only slider are stable shapes, not flaky noise.

### Lies hunted
- [P0, FIXED this round] main dead on arrival — inline block #0 throws
  `Unexpected token 'function'` (pre-fix), brace depth −1. Repro: parse-
  check every inline block, or run `node --test tests/page-parse.test.js`
  at the pre-fix commit. Nothing on the page ran; the README's demo did not
  exist.
- [P1, confirmed 5th consecutive round by running, NOT fixed — R9 spec 1]
  loadCoev head honesty: banner `8663279a` vs displayed re-chained head
  `83a099d4`; first displayed row re-chained to `360e1dfc` vs artifact
  row-109 `6c072f4c`. Repro re-ran verbatim (numbers identical to R5/R6/R7
  — the re-chain is deterministic).
- [P2, confirmed 4th consecutive round by running, NOT fixed — R9 spec 2]
  coev pop-slider only grows: slider 16→8 → pops stay 16/16 while the
  classic loop pins to 8. Repro re-ran through the same startGenC logic.
- [P3-process, still present, NOT fixed — R9 spec 3] PLAYLOG merge disorder:
  the stale duplicate Round 2 still sits between Round 7 and Round 6
  (marked, unrepaired). This entry now crowns the same pile; the repair
  spec carries forward.
- [credit sibling — re-verified clean in the smoke path] qa.js's sonify/
  channel/suggest path executed headlessly through the fixed page (qaVis
  branch of draw() + live coev ticks) with no throws; the artifact banner
  renders the seeded lineage. No new fabrication found in the module.
- (nothing found in: fitness weights, ring, evaluator top-K, effective
  paddle, seeded swans, JEPA representation, seam pacing/timeout/gameId,
  coev rules/determinism, checkpoint consistency, prerun
  byte-reproducibility — all reproduce as claimed, twice-run this round.)

### Next version spec (Round 9)
- [small] loadCoev head honesty: banner `coev.ledger.head` (the re-anchored
  chain actually displayed) or render artifact rows read-only with original
  hashes + "anchored at genesis" — why: receipts pane shows a chain the
  banner doesn't name (P1, five consecutive rounds) — verify: displayed
  terminal hash == displayed head, asserted through the extracted glue.
- [small] Coev pop-slider parity: pin `coev.popS/popE.length = n` on
  shrink, same as the classic loop — why: the slider label lies after a
  shrink (P2, four consecutive rounds) — verify: harness test — set pop
  16→train→set 8→train, pops are 8.
- [small] Repair PLAYLOG merge disorder: remove the stale duplicate Round 2
  (pre-honesty-pass, PR #1) and restore the single canonical chain — why:
  the memory still presents fixed P0s as current truth between R7 and R6 —
  verify: exactly one "Round 2" heading, file reads R9→R1 top to bottom.
- [medium] Merge-gate doctrine, process half: write the rule into
  EXPERIMENTS.md (a sibling PR may not merge without either one play-test
  round or the node-parse pin running in CI) — why: the R8 P0 existed only
  because a merge bypassed the loop; the pin now exists but the doctrine
  text does not — verify: EXPERIMENTS.md carries the rule; CI runs
  tests/page-parse.test.js on every PR.
- [medium] Extract loadCoev into the requireable glue — why: seam, C1, and
  receipt glue are pinned; loadCoev is the last unpinned browser surface
  among the open items — verify: R9 items 1–2 tested through it.
- [medium] C1 scaling study: pop 48+, gens 300+ in prerun-coev — does
  SURVIVOR-CAP recur? a second regime flip is the next shape (carried from
  R3–R8 queues) — verify: ledger receipted, md5-stable, arms-race rows
  cited.
- [epic] First/last-mile sense filter from gen 0: re-evolve both lineages
  under the filtered contract, keep BOTH curves, archive old checkpoints
  with provenance notes (carried from R2–R8 queues).

### Verdict
MERGEABLE (Round 8 ships the draw() fix — verbatim-restore, FAIL-first
pinned — and receipts the two carried glue lies a fifth/fourth time with
byte-identical numbers; 56/56 tests green, checkpoint md5s byte-identical,
no provenance touched. The page lives again.)

## Round 7 — kimi1 — 2026-09-25 — mode: BUILDER (one small: R7 spec item 2 — receipt eviction counter) + play-tester — vs main 1ae696b (post-quantum-audio merge)

### Played versions: v1 (e98cf66) → edge-ml-crush (b06d901) → round-3-builder/v2 (0722670) → R4 (e8774a2) → R5 (7882d99) → R6 (d8ec449) → main (1ae696b)

### Builder receipt (the one small — Round 7 spec item 2: receipt panel eviction counter, the DECIDE-IT item)
- **what:** the page state gained `receiptEvicted=0`; the shipped `receipt()`
  now counts (`if(receipts.length>40){receipts.shift();receiptEvicted++}`)
  and the panel suffix renders `[N shown / M evicted]` exactly when M>0 —
  the makeLedger pattern, the repo's last silent-drop honesty gap closed.
  Row construction untouched (`i` keeps its write-order value, prev/hash
  chain unbroken — pinned), README's "Known lie, queued" replaced with the
  fixed-note, VERIFIED_CLAIMS gained the `receipt-glue` row.
- **why:** Rounds 3→6 receipted the freeze four times and marked it "DECIDE
  IT" twice; the spec had already decided the shape (count, like
  makeLedger). This round ships the decision.
- **verify (FAIL-first, then green):** new `tests/receipt-glue.test.js`
  extracts the VERBATIM shipped receipt() from index.html (line-anchored —
  extraction fails loudly if the page moves) and drives it headlessly: (1)
  extraction integrity; (2) 45 writes → 40 held, count=5, panel shows
  "40 shown / 5 evicted"; (3) within the bound → no suffix, count 0;
  (4) prev→hash chain unbroken across the eviction boundary. Against the
  pre-fix page: test (2) FAILS (silent shift, no count — the four-round
  lie). Against the fix: 4/4 PASS. Suite 49→53 tests, all green; prerun
  md5s byte-identical (coev.js `946e639a…`, L0/L1/L2, curve) — provenance
  untouched. Observation pinned, not fixed: post-bound writes all reuse
  `i=40` (length pinned) — cosmetic index collision, pre-existing.

### Deltas observed (shapes of change)
- **d(venue)/d(version): the failure surface migrated OUTSIDE the loop.**
  Rounds 1–6 chased lies inside play-tested versions; main 1ae696b broke
  without any round at all — the quantum-audio merge (PR #3) never passed
  through the experiment. Parse-check of the inline `<script>` across all
  seven versions: v1 OK, edge-ml-crush OK, v2 OK, R4 OK, R5 OK, R6 OK,
  main **SYNTAX ERROR**. The GAN's blind spot is merge integration — a
  sibling can ship around the discriminator. Shape: the loop pins what it
  plays; what it doesn't play can die silently. The experiment just
  demonstrated its own necessity.
- **The memory got stitched wrong too (merge disorder, P3-process).**
  This file's top now carries a STALE duplicate "Round 2" (the pre-
  honesty-pass version from PR #1) above Round 6, presenting fixed P0s
  (unseeded swan, ghost hitbox, JEPA skew) as current truth, with the
  "Newest first" header displaced mid-file. Rounds 3–6's log (below) is
  the canonical chain. Flagged, and the repair is specced (R8 process
  item).
- **The learning numbers are still frozen by honesty, not stagnation.**
  L0 5,767 / L1 8,800 / L2 8,700 and the coev arms race reproduce
  byte-identical for the fifth straight round (coev.js md5 `946e639a…`).
  What moves is coverage: suite 41→45→49→53, VERIFIED_CLAIMS 12→13 rows,
  and now three of three browser-glue seams (C1, seam, receipt) are
  node-drivable.

### Lies hunted
- [P0, NEW, confirmed by running, NOT fixed — R8 spec item 1] **main is
  dead on arrival.** The quantum-audio merge broke `draw()`: the champion
  strip's `cv.moveTo` became `qa.moveTo` (a block-scoped const from the
  qaVis branch), `});cv.stroke();` became `}).stroke();` (forEach returns
  undefined), and one extra `}` slid in — the inline `<script>` no longer
  parses. Verified by running: `new Function(inlineScript)` on main →
  "Unexpected token 'function'"; on the R6 tip → OK; v1/R2/v2/R4/R5 all
  OK. Nothing on the page runs: no game, no training, no receipts.
  Repro: repro-r7-strip.js (parse-checks every inline block).
- [P1, confirmed 4th consecutive round by running, NOT fixed — R8 spec 2]
  loadCoev re-chains artifact rows onto fresh genesis, then banners the
  artifact's head. Repro re-ran verbatim through the extracted glue:
  banner `8663279a` vs displayed re-chained head `83a099d4`.
- [P2, confirmed 3rd consecutive round by running, NOT fixed — R8 spec 3]
  coev "games-at-once" slider only grows the populations
  (`while(pop<n)push`), never shrinks. Repro re-ran: slider 16→8 → pops
  stay 16/16 while the classic loop pins both ways.
- [P2, FIXED this round] receipt panel silent eviction past 40 — the
  five-round lie, DECIDE-IT'd twice (Builder receipt).
- [credit sibling — no lie found in the new module] `qa.js` honors its
  honesty contract under running: deterministic seeded channel, `SIM_MAX_CONF`
  0.5 cap holds over a 200-state sweep (max observed 0.5), source tag
  always "qa-sim", pot-bound guard returns null on a silent channel,
  imaging resolves left/right correctly, `node tools/test-qa.js` 8/8. One
  quality note, not fabrication: advice is wrong-direction 3.7% of a
  ball-field sweep (all near the paddle deadzone edge), and confidence is
  self-consistency, blind to that bias — the contract says so openly.
- (nothing found in: fitness weights, ring, evaluator top-K, effective
  paddle, seeded swans, JEPA representation, seam pacing/timeout/gameId,
  coev rules/determinism, checkpoint consistency, prerun
  byte-reproducibility — all reproduce as claimed, twice-run this round.)

### Next version spec (Round 8)
- [small] Fix the draw() regression (restore `cv.moveTo`/`});cv.stroke();`,
  drop the extra `}`) and PIN it: a `tests/page-parse.test.js` that extracts
  every inline `<script>` block from index.html and asserts it parses —
  the exact class of P0 this round found, FAIL-first against main —
  verify: test fails on 1ae696b's index.html, passes after the fix.
- [small] loadCoev head honesty: banner `coev.ledger.head` (the re-anchored
  chain actually displayed) or render artifact rows read-only with original
  hashes + "anchored at genesis" — why: receipts pane shows a chain the
  banner doesn't name (P1, 4 rounds) — verify: displayed terminal hash ==
  displayed head, asserted through the extracted glue.
- [small] Coev pop-slider parity: pin `coev.popS/popE.length = n` on
  shrink, same as the classic loop — why: the slider label lies after a
  shrink (P2, 3 rounds) — verify: harness test — set pop 16→train→set
  8→train, pops are 8.
- [small] Repair PLAYLOG merge disorder: mark the stale duplicate Round 2
  (pre-honesty-pass, from PR #1) as superseded and restore the
  "Newest first" header above Round 6 — why: the memory currently presents
  fixed P0s as current truth — verify: file reads R7→R6→R5→R4→R3→R2→R1
  with one Round 2 only.
- [medium] Merge-gate doctrine (process, not code): a sibling PR may not
  merge without either one play-test round or a node-parse/smoke pin in
  CI — why: the P0 this round existed only because a merge bypassed the
  loop — verify: repo rule written into EXPERIMENTS.md + the page-parse
  pin running in CI.
- [medium] Extract loadCoev into the requireable glue (receipt() is pinned
  now; loadCoev is the last unpinned browser surface among the open items)
  — why: completes glue coverage — verify: R8 items 2–3 tested through it.
- [medium] C1 scaling study: pop 48+, gens 300+ in prerun-coev — does
  SURVIVOR-CAP recur? a second regime flip is the next shape (carried from
  R3–R7 queues) — verify: ledger receipted, md5-stable, arms-race rows
  cited.
- [epic] First/last-mile sense filter from gen 0: re-evolve both lineages
  under the filtered contract, keep BOTH curves, archive old checkpoints
  with provenance notes (carried from R2–R7 queues).

### Verdict
MERGEABLE (Round 7 ships the receipt-eviction pin — FAIL-first — and
receipts the new P0 plus the two remaining carried items; 53/53 tests
green, checkpoint md5s byte-identical, no provenance touched. Note: main
is P0-dead on arrival; this branch does NOT fix the brace — the page
stays dark until R8 spec item 1.)

---

> **Merge-disorder note (Round 7):** the entry below this line is a STALE
> duplicate of Round 2 (pre-honesty-pass, merged in via PR #1). Every
> finding in it was fixed in Rounds 2–6 (seeded swans, JEPA skew, ghost
> hitbox, seam pacing, receipt cap). The canonical chain is R7→R6→R5→R4→
> R3→R2→R1 below. Repair specced as R8 item 4.

## Artifact A (R11 item 2) — stale duplicate of Round 2, pre-honesty pass — kimi1 — 2026-09-24 — vs v1 (e98cf66) [STALE DUPLICATE — superseded by the canonical Round 2 entries below; see merge-disorder note above]. Kept as a historical artifact, not a round.

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

## Round 2 (branch quilt-edge-ml-survey) — kimi1 — 2026-09-24 — vs quilt-edge-ml (sibling) + v1

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
## Round 2 (branch quantum-audio-L2) — kimi1 — 2026-09-24 — quantum-audio L2 module (branch quantum-audio-L2)

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
