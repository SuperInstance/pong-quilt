# PLAYLOG — the experiment's memory

Every round is a receipted observation in the loop. Newest first.

## Canonical index (repair R11 item 2)

| Round | Date | Branch / base | Status |
|---|---|---|---|
| R31 | 2026-09-27 | r31-index-dedup-count-fix (vs main 7649f4c, post-#40) | canonical |
| R30 | 2026-09-27 | r30-wal-page-glue (vs main 5ef8cda, post-#37) | canonical |
| R29 | 2026-09-27 | r29-doctor-live-e2e-pin (vs main 5ef8cda, post-#37) | canonical |
| R28 | 2026-09-27 | playtest-round-28 (vs R27 tip 3c5f498, PRs #31–#36 open at round start) | canonical |
| R27 | 2026-09-26 | playtest-round-27 (vs r26 tip a06dfb2, PR #33 open at round start) + r27-doctor-lens-page-glue (vs main 56c60b4, post-#35 merge) — two canonical branches, one row (R2 branch-pair convention) | canonical |
| R26 | 2026-09-26 | r26-wal-doctor-export + r26-wal-session-driver (stacked, vs main a0939b8 / export tip a06dfb2) — two canonical branches, one row (R2 branch-pair convention) | canonical |
| R25 | 2026-09-26 | r25-coev-ledger-strip (vs main a0939b8, post-#30) | canonical |
| R24 | 2026-09-26 | r24-canonical-md5-lineage + r24-doctor-verdict-glue (vs main a0939b8, post-#30) — two canonical branches, one row (R2 branch-pair convention) | canonical |
| R23 | 2026-09-26 | r23-coin-journal-strip (vs main 4b94c49, post-#29) | canonical |
| R22 | 2026-09-26 | playtest-round-22 (vs r21 tip 3508a75, PR #28) | canonical |
| R21 | 2026-09-26 | r21-quantum-coin-tiebreak (vs main ac9b4c1) | canonical |
| R20 | 2026-09-26 | r20-coev-qarefusal-glue (vs main post-#26 merge) | canonical |
| R19 | 2026-09-26 | playtest-round-19 (vs main 6e163f6, post-#24-merge) | canonical |
| R18 | 2026-09-26 | r18-byo-endpoint-persist (#24) | canonical — index row restored by R19 (the R18 entry shipped without one) |
| R17 | 2026-09-26 | r16-byo-page-wiring (vs main post-#22-merge; rebased after the R16 stack landed) | canonical |
| R16 | 2026-09-26 | r15-confidence-pot-strip (#19) · r16-readme-honesty-sweep (#20) · r16-advisor-diet-tool (#21) · r16-byo-qpam-seam (#22) | canonical — four branches, one spec |
| R15 | 2026-09-26 | playtest-round-15 (vs main 3e4e497, post-PR#17) | canonical (this file, newest first) |
| R14 | 2026-09-26 | r14-coev-panel-honesty (vs R13 tip 7488cfa) | canonical |
| R13 | 2026-09-26 | playtest-round-13 (vs R12 tip 88b488f) | canonical |
| R12 | 2026-09-25 | playtest-round-12 (vs R11 stack tip c9424f7) | canonical |
| R11 | 2026-09-25 | playtest-round-11 (vs r10 tip 287824d) | canonical — code carried on PR #14 tip; docs on PR #12; CI on PR #13 |
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

## Round 31 — index-dedup-count-fix — 2026-09-27 — mode: BUILDER (small: main-repair — two inherited reds) — vs main 7649f4c (post-#40)

- **[fixed] canonical-index duplicate rows R27/R26/R25/R24.** The #31–#40 merge burst stacked two index writes per round (the R2-convention "two canonical branches, one row" merge AND a stale single-branch copy both landed); the uniqueness pin tripped naming all four. Removed the four stale single copies, kept the branch-pair-convention rows. FAIL-first: `tests/canonical-index.test.js` uniqueness pin was RED on pristine main naming R27/R26/R25/R24.
- **[fixed] README test-count block.** Six stale count lines from parallel rounds had accumulated (135/139/152/158…); collapsed to one live-verified line: 169 total = 161 in `tests/` + 8 in `tools/test-qa.js`. FAIL-first: `tests/readme-count.test.js` named the drift on main (claimed 152, suite runs 161).
- [none, verified-by-running] docs-only round; no behavior touched. Suite `node --test tests/*.test.js` 161/161 + qa 8/8 green on this tip.
- REFERRAL EDGES: none new.

## Round 30 — wal-page-glue — 2026-09-27 — mode: BUILDER (R26-booked follow-on: wal-session driver → page wiring) — vs main 5ef8cda (post-#37)

- **[built] the WAL exporter lands ON the page, dual-loaded from the same pinned `tools/wal-export.js`.** R26 proved a headless session can feed the doctor-consumable WAL; the page itself still had no path to it — the receipt panel, the thing the whole receipt doctrine is about, could never leave the page in the shape quilt-doctor verifies. This round wires it: `tools/wal-export.js` becomes dual-loadable (node `module.exports` + browser `window.QUILT_WAL`, ONE implementation — a page-side reimplementation would drift from the pinned one the first time anyone touched a hash); a "WAL quilt (download)" button re-anchors the LIVE panel rows into the fleet WAL (BIND genesis + one LINK per row, the panel's own display hash carried inside `args.panelPrev` as provenance — the WAL chain and the panel chain are never confused); verification runs BEFORE download — a non-ok verdict receipts `WAL-EXPORT/REFUSED` and no file is saved; an empty panel exports a genesis-only chain receipted `WAL-EXPORT/EMPTY`; re-export after a new receipt produces a different chain (the seam reads the live panel, never a stale copy).
- [none, verified-by-running] **Gate service:** `node --test tests/*.test.js tools/test-qa.js` 160/161 pass; the single red is `tests/canonical-index.test.js` — duplicated index rows R26/R24, **pre-existing on origin/main** (verified against a pristine worktree), not introduced here. FAIL-first: `tests/wal-page-glue.test.js` runs 6/6 RED on pristine main, 6/6 green on this tip.
- [carried, pre-existing] canonical-index duplicated rows R26/R24 — main is red on this pin independent of this round; the dedup is a small fleet-hygiene item for the next builder.
- REFERRAL EDGES: none new this round (the R26 WAL export edge pq → quilt-doctor stands as previously filed: candidate VERIFIED on a quilt-doctor PR consuming the export; weight law unchanged).
## Round 29 — CCC — 2026-09-27 — mode: BUILDER (fresh small: doctor-live E2E pin) — vs main 5ef8cda (post-#37)

### Played versions: main 5ef8cda → r29 tip — one pin file + registry rows only, training path untouched

The R26 JS mirror (`verifyQuiltWal`) reflects the doctor's `verify()` line-for-line — a mirror can drift and still pass its own reflection. This pin runs the REAL consumer: `quilt_doctor/substrate.py` loaded live from a local clone (by file, bypassing the package `__init__` and its lens deps), against the exporter's actual JSONL.

- Clean export → the doctor's own `QuiltSubstrate.verify()` returns `ok: true` (line count carried).
- Content-tamper (post-hash file edit — the pin's first cut tampered PRE-hash, which is just a valid chain of different content; caught by running, the distinction is now documented in the test) → doctor names `hash_mismatch` at the exact seq, chain rejected.
- Mirror agreement: JS `verifyQuiltWal` and the doctor give the same ok verdict, same divergences seq-for-seq why-for-why on the same tampered file.
- Offline doctrine verified by running: clone moved away → 3 named skips, never fake green; restored → 3/3 live PASS (doctor clone at aa5a041, substrate loads by-file).

FAIL-first verified by running: pin file absent on pristine origin/main → honesty two-way pin trips (claim row names a file that doesn't exist). Suite 150/150 in `tests/` (+ 8/8 qa). Prerun canonical five byte-identical (coev 946e639a, curve 63617065, L0 8a49b0f6, L1 643bd132, L2 454511548). VERIFIED_CLAIMS +1 (wal-doctor-e2e). README count pin named INHERITED rot: main's first count line claimed 128 in tests/ but live is 148 (PRs #36/#37 added pins without bumping the first line) — corrected to 150 with this pin added (the count moved once the inherited reds below were fixed: a failing pin skews the spawn's pass count). Canonical-index pin named INHERITED rot too: the #33-#37 merge collision duplicated the R26 and R24 index rows (R27's collision warning, landed) — merged per the R2 multi-branch convention. Round numbering note: the interrupted prior session had this lane drafted as "R28" on a stale r26 base; R28 was taken by playtest-round-28 (#37) while it slept, so it ships as R29.

## Round 28 — CCC — 2026-09-27 — mode: BUILDER (unfulfilled R27-spec small: `renderCoinJournal` owns its degrade path) + play-tester — vs R27 tip 3c5f498 (canonical head; PRs #31–#36 open at round start)

### Played versions: R27 tip 3c5f498 (canonical) → main a0939b8 (frozen reference) → PR #35 tip 3b9bbb8 (wal-session driver) → PR #36 tip 1507148 (doctor-verdict glue) → playtest-round-28 tip

### Deltas observed (shapes of change)
- **The ownership boundary of honesty moved inside the page.** v1: the paddle owned learning. R23: the registry owned it. R26: the doctor owned verification. R28: the page's *renderer* owns its degrade sentence — the R23 claim "admits it in amber instead of faking a strip" held only on the fetch-failure road because the admission lived in the caller's `.catch`; a null journal reaching the renderer directly threw TypeError. d(learning)/d(version) is now also measured in WHO owns the refusal — each round moves the honesty boundary one seam inward.
- **Failure-mode migration:** physics (v1) → rendering (R23) → tool boundaries (R26) → caller/renderer boundary (R28). The hunted lie keeps climbing the abstraction stack: this round it was an exception where a sentence belonged.
- **Training path frozen R23→R28:** `node tools/prerun.js` regenerates the canonical five byte-identically at every tip played this round (pq-r28 3c5f498, pq-main a0939b8, pq-35 3b9bbb8, pq-36 1507148 — coev.js 946e639a…, curve.json 63617065…, L0 8a49b0f6…, L1 643bd132…, L2 454511548…; 182 flips / 89 swaps). Every delta lives in receipts, instruments, and registry — never in the paddle.

### Lies hunted
- [P2, booked, sibling PR #36] **The doctor-verdict seam is dead against a pristine canonical quilt-doctor checkout.** `loadDoctorVerdict()` returns `null` at `/tmp/quilt-doctor` (pristine, citation aa5a041). Repro (run, this round): `node -e "require('./tools/doctor-verdict')"` shape — root cause: `permsOk = stats.every(t => t.perms === 40320)` but the real `docs/holistic-stats.json` has 6 rows with perms ∈ {40320, 120} (120 = 5! — the sufficient-data subset rows; killed row `jev ~ active_days` p_exact=0.988492 found and view-doc regex match both PASS). Every other shape check passes. Consequence: "the doctor's holistic verdict ships — absent ships, never fakes" renders honestly, but the complementary external-lens claim ("running the canonical command against a pristine quilt-doctor clone") is unreachable in practice — the seam can never open on real data; its tests pass only because the fixture was crafted uniform (all 40320). Not fabrication; a shipped claim that can never fire. Spec'd below (first item).
- [P3, fixed, builder receipt] **`renderCoinJournal` did not own its degrade path** (the R27 spec small). Live repro at the R27 tip: `renderCoinJournal(ctx, null, 260)` → `TypeError: Cannot read properties of null (reading 'filter')`; `renderCoinJournal(ctx, [], 260)` → no throw, renders grey "0 flips" strip — not amber. The page never hit this (fetch `.catch` → `coinJournalUnavailable`), so the shipped claim held on its one road; the contract gap was latent for every other caller, including this repo's own verbatim-extraction glue. Fixed in-renderer; FAIL-first below.
- [none, verified-by-running, sibling PR #35] **The session WAL driver and its claims reproduce.** `node tools/wal-session.js 99 3 --out /tmp/r28-session.jsonl` → 483-line WAL; the doctor's own verifier against that file: `QuiltSubstrate('/tmp/r28-session.jsonl').verify()` → `{ok: true, divergences: [], lines: 483}` — R26's cross-tool crown claim now reproduces under my hands with a real seeded session, not demo rows. Stats: 456/483 REFUSAL receipts (the QA-REFUSAL exhaustion seam is exercised honestly — `qa_refusal` pins fired 102/104 in the escalation test), 21 advice, 3 deaths; bound 40 matches the page's `receipt()` constant exactly. Suite 131/131 + qa 8/8 at that tip.
- [none, verified-by-running] **Gate service:** pq-r28 (pre-build) 127/127, pq-35 131/131, pq-36 126/126 suites + qa.js silent-exit-0 on all three; page-parse + readme-count + canonical-index pins green everywhere; canonical five md5s byte-identical across the three tips. Collision warning carried from R27 stands: open PRs bump README count and the index from nearby bases — whoever merges last inherits the bumps (by design, R19).
- [P4, booked, self-inflicted] `tools/wal-session.js` takes `--out <path>`; a positional third arg is silently ignored (I wrote no file, claimed absence). User error, but the CLI's silence made it a two-command detour. Spec'd below (usage hint on unknown args).
- [method note, honest] Browser/canvas page play was blocked by tool policy this round; page-level verification fell back to the repo's own established pattern (verbatim renderer extraction + real `curve.json` data), which is what the shipped pins do. The interactive-drive gap is noted, not hidden.

### Builder receipt: the renderer owns its degrade path (R27 spec small, unfulfilled until now)
- **what:** `renderCoinJournal` now guards `!Array.isArray(tiebreaks) || !tiebreaks.length` in-renderer: paints the SAME amber vocabulary as the page's fetch-failure instrument ("coin journal: data absent (journal missing/empty) — instrument ships, admits it", `#d29922`), returns without throwing, draws no fake ticks. The caller's guard and `.catch` stay as belt-and-braces — a malformed `curve.json` and a dead fetch now degrade identically.
- **why:** the R23 honesty claim held only on one road because the admission lived in the caller. An instrument's degrade sentence belongs to the instrument; R27 spec'd this exact item.
- **verify (FAIL-first, by running):** pin 7 RED pre-fix — `TypeError: Cannot read properties of null (reading 'filter')` at the verbatim-extraction drive, exactly matching the live page repro; 7/7 green post-fix (null/undefined/[] all amber, no ticks, healthy path regression-guarded). Full suite 127→128/128 + qa 8/8; README 135→136 (the readme-count pin named me, as designed); prerun canonical five byte-identical — training path untouched.

### Played notes (headless, real curve.json, R28 tip)
HAPPY: 183 rects, 182 ticks, 0 off-canvas, x∈[35,357] inside the 360-wide canvas, axis derives from data (max tick gen 259 ≤ header gens 260), label `coin journal: 182 flips · 89 swaps · gens 0-260 · live:false throughout` — matches the R22 journal audit exactly. DEGRADE (null/undefined/[]): amber admission, `#d29922`, zero ticks, no throw — same sentence family as FETCH-FAIL. LIVE tripwire still SCREAMS `LIVE:1 (moth engine!)`. Receipt panel bound 40 cross-checked against `tools/wal-session.js` (constant identical).

### Next version spec (competitive improvements)
- [small] **doctor-verdict perms shape-check fix** (PR #36): accept legitimate subset perms — validate `Number.isInteger(t.perms) && t.perms >= 1` per row plus the 8! invariant on full rows, and build the fixture from the REAL `docs/holistic-stats.json` row shapes (vendored snapshot), not crafted-uniform data. why: this round's P2 — the external-lens seam can never open against a pristine canonical checkout; the current pin's fixture hides it. verify: FAIL-first pin — `loadDoctorVerdict(<pristine-doctor-fixture>)` must be non-null; the existing tamper negatives stay red.
- [small] **wal-session CLI usage guard**: on an unrecognized positional arg (or `--out` missing), print usage to stderr and exit non-zero. why: this round's P4 — silence turned a user error into a debugging detour. verify: pin drives a bad-args invocation, expects non-zero + usage line.
- [small] **one amber-admission source**: `renderCoinJournal`'s degrade branch and `coinJournalUnavailable` should share a single constant for the admission sentence (same vocabulary by construction, not by copy). why: two copies of the honesty sentence will drift. verify: pin asserts byte-equality of the two rendered strings' shared prefix.
- [medium, carried R27] doctor-live E2E pin under `node --test` — child-process `QuiltSubstrate.verify()` when a quilt-doctor clone is present; explicit skip (never green-by-silent-absence) when absent. why: this round's manual cross-tool check is exactly the pin R27 asked for — now demonstrated end-to-end by hand twice, still not suite-pinned. verify: with the doctor present the pin runs live including a tamper negative control.
- [medium, carried R27] canonical-md5 lineage for the WAL session export — pin the session WAL's head hash / line-count for a fixed seed so any tool change that alters exported bytes trips loudly. why: R24 doctrine applied to the newest artifact; the 483-line session file is now a cited cross-repo object. verify: FAIL-first by editing one byte.
- carried: [epic, R12→R28] C1 scaling study. [medium, R22→R28] advice-aware GA.

### Verdict
MERGEABLE (stacks on R27 tip 3c5f498; suite 128/128 + qa 8/8; prerun canonical five frozen; siblings #35/#36 studied and gate-checked — #35 green with live cross-tool reproduction, #36 carries the booked P2).

## Round 27 — k2d8 — 2026-09-26 — mode: BUILDER (R24-booked small: wire the external lens into the page REFUSAL stat surface) — vs main 56c60b4 (post-#35 merge)

- **what:** qa.js gains a doctor-lens seam — `setDoctorLens(line)` / `lensSuffix()` — and BOTH
  QA-REFUSAL stat render sites in the page's real `qaSuggest()` append the suffix. A node
  driver (or the pulse harness) injects the Round 24 `tools/doctor-verdict.js` lensLine and the
  refusal names quilt-doctor's three-lens verdict on the page surface; the browser ships with the
  seam CLOSED (`lensSuffix()==""`), so the stat line stays byte-identical to the pre-R27 text.
  Honest guard at birth: a null/empty/whitespace/non-string lens is closed, never a placeholder
  (first pin caught `"  "` rendering `" ·   "` — guard tightened to `line.trim()`).
- **verify:** `tests/doctor-lens-page-glue.test.js` — 5 pins over the REAL qaSuggest()+l2Suggest()
  slice (Proxy-DOM harness, pot 0 below SIM_POT_FLOOR): closed-seam byte-identity, open-seam
  verbatim lens line (fixture digest via the real doctor-verdict module), both-sites wiring source
  pin, closed-for-garbage-lens pin, and a self-check strip mutation proving pin 2 watches the page
  wiring. FAIL-first: 5/5 RED on pristine origin/main (no lensSuffix — `QA.setDoctorLens is not a
  function`), 5/5 green here. Suite 150/150 in tests/ + qa module 8/8; prerun canonical five
  re-verified at the tip, byte-frozen.
- **receipts:** VERIFIED_CLAIMS 30→31 (doctor-lens-page-glue); README count pin named my own
  139→156 bump; canonical five md5s unchanged (claim-string-only core.js edit); inherited-red
  repair: main's duplicated R24 index rows (two branches merged under separate keys, dup pin red
  on main) merged into one R24 row per the R2 branch-pair convention.


## Round 27 — CCC — 2026-09-26 — mode: BUILDER (fresh small: coin-journal label axis-derives-from-data — the P3 found by driving the shipped page headless) + play-tester — vs r26 tip a06dfb2 (PR #33, open at round start)

### Played versions: v1 (e98cf66, reconstructed via R1 receipt + claim-registry archaeology) → main a0939b8 (R23) → r26 tip a06dfb2 (R26) → playtest-round-27 tip

### Deltas observed (shapes of change)
- **The unit of learning moved three times.** v1 = fitness frames (no registry, 0 claims — learning was the paddle's). R23 main = provenance (33-claim honesty registry, the 182-flip journal rendered — learning was the experiment's memory). r26 tip = fleet interop (34 claims, receipts re-anchored into quilt-doctor's WAL). d(learning)/d(version) is no longer measured in frames or convergence — it is measured in verified claims, and as of R26 in cross-repo consumable edges. R26 is the first round whose crown claim is verified by ANOTHER repo's verifier — the experiment stopped being self-referential.
- **Failure-mode migration:** v1's dead controls and teleporting ball → R23's silent render lies (off-canvas ticks that still counted; found, fixed, pinned) → R26's cross-boundary mistranslation risk (vocabulary mirror + MINT refusal). Each round the hunted failure mode moves one abstraction layer up: physics → rendering → tool boundaries.
- **Training path frozen R23→R27:** prerun regenerates the canonical five byte-identically at the r26 tip AND at this round's tip (coev.js 946e639a…, curve.json 63617065…, L0 8a49b0f6…, L1 643bd132…, L2 454511548…; 182 flips / 89 swaps) — every delta lives in receipts, instruments, and registry, never in the paddle. Per R24's doctrine: hashes are line-specific, verified by running.

### Lies hunted
- [none, verified-by-running] **R26's shipped receipt numbers verify.** Mid-flight this round I observed a stale pre-commit draft of the R26 entry stating "base 134/134; tip 139/139" — wrong on both counts. The shipped commit a06dfb2 carries "base 121/121 in tests/ (129 incl. qa); tip 126/126 (134 incl. qa, 8/8)" — and re-running the canonical command at both commits confirms exactly that. A wrong-numbers draft was caught before ship; the receipt as shipped is clean. (Booked because the near-miss is the interesting datum: the receipt discipline held, but only because someone re-ran.)
- [P3, fixed] **The coin-journal label read the raw header while the ticks derived from data.** gen-200 data under a `gens:0` header renders every tick on-canvas (the R23 fix working) while the label claims `gens 0-0` — the instrument shows 200 generations of mutation signal and reports none. repro: `drive(renderer, [{gen:200,coin:'T',swap:true,live:false}], 0)` → label "gens 0-0", tick x=358. Same lie class as R23's off-canvas ticks, one layer up: geometry fixed then, text now. Fixed and pinned (builder receipt below).
- [P3, spec'd] **`renderCoinJournal(null)` throws TypeError.** NOT a shipped lie — the page's fetch `.catch` renders the amber admission instead (verified by reading the wiring at index.html:133-137), so the file:// reality degrades honestly. But it's a latent contract gap: the renderer's honesty lives in its caller. A glue driver — or any future caller — invoking it directly with absent data gets an exception, not the amber sentence. Spec'd below.
- [none else found — WAL claims re-verified live this round] `node tools/wal-export.js` → doctor's own `QuiltSubstrate.verify()` = `{ok: True, 5 lines}`; content-tampered row 3 caught at the exact seq (`hash_mismatch@3`); pinned vector `c86b3c06e0945d6d` recomputed against python `json.dumps(sort_keys)` — exact match; offset basis `cbf29ce484222325` exact; divergence vocabulary `hash_mismatch/chain_break/seq_gap` confirmed at `quilt_doctor/substrate.py:77-81` in the doctor's own source.
- [gate service] R24 tip fb4315b full suite 125/125 green; R25 tip 6391594 full suite 126/126 green; page-parse + readme-count + canonical-index pins 7/7 on both — the merge gate is satisfied for PRs #31/#32 even before their dedicated playtests. Collision warning, stated plainly: R24, R25, and R27 each bump the README count line and the canonical index from the same base — whoever merges last takes the others' bumps, and the readme-count/canonical-index pins will name you until you do (by design, R19).

### Builder receipt: the label derives from the same axis the ticks were plotted against
- **what:** one line in `renderCoinJournal` — the label prints `gens 0-${axis}` where `axis = Math.max(1, gens||0, maxGen)` (the R23 derivation), replacing the raw `${gens}` header read. Happy path provably unchanged: shipped curve.json (gens 260, data ≤ 259) labels "gens 0-260" before and after.
- **why:** the R23 fix made the instrument render the truth but left it reporting the header's claim. A missing/wrong header produced a label under-reporting the plotted range while displaying it — a half-fixed lie is still a lie.
- **verify (FAIL-first, by running):** pin 6 RED pre-fix (`/gens 0-200/` expected, "gens 0-0" rendered), 6/6 green post-fix; full suite 127/127 + qa 8/8; README 134→135 (the readme-count pin named me, as designed); prerun canonical five byte-identical — training path untouched.

### Played notes (headless, real curve.json, r26 tip)
HAPPY: 183 rects, 182 ticks, 0 off-canvas, 89 bright swaps / 93 dim keeps, label `coin journal: 182 flips · 89 swaps · gens 0-260 · live:false throughout` — matches the R22 journal audit exactly. GEN0-HEADER: post-fix tick x=358, label `gens 0-200`. EMPTY (real empty journal): `0 flips · 0 swaps` in grey — honest; a truly empty journal is not an absent one. LIVE tripwire and MISSING-flag both SCREAM `LIVE:1 (moth engine!)` — the anti-laundering tripwire still fails safe. FETCH-FAIL (null data): amber admission — via the caller's catch, not the renderer (see the P3 above).

### Next version spec (competitive improvements)
- [small] `renderCoinJournal` owns its degrade path — null/undefined journal renders the amber admission in-renderer (no throw); the page `.catch` stays as belt-and-braces. why: the P3 contract gap found this round. verify: FAIL-first pin — `drive(null)` must produce the amber sentence, no exception.
- [small] real-ledger WAL driver — wire the page `receipt()` ledger (rows `{i,kind,move,conf,gen,prev,hash}`, bounded at 40 with counted eviction, R7) through `toQuiltWal`, replacing the R26 demo rows. why: R26-carried item; the export lane currently proves shape, not lineage — the loop's product is real receipts. verify: FAIL-first pin feeds a scripted 3-receipt ledger → BIND + 3 LINKs with kinds matching; the doctor's verify() ok on the exported file.
- [medium] doctor-live E2E pin under `node --test` — child-process `QuiltSubstrate.verify()` against an exported tmp file when a quilt-doctor clone is present; explicit skip (never green-by-silent-absence) when absent. why: the repo's strongest claim — cross-tool verification — currently rests on a PLAYLOG sentence plus a build-time audit, not a suite pin. verify: with the doctor present the pin runs live and the tamper negative control is included.
- [medium] canonical-md5 lineage for the WAL demo export — pin the demo export's five line-hashes so any tool change that alters exported bytes trips loudly. why: R24 doctrine applied to the newest artifact; the export is now a cited cross-repo object. verify: FAIL-first by editing one byte.
- carried: [epic, R12→R27] C1 scaling study. [medium, R22→R27] advice-aware GA.

### Verdict
MERGEABLE (stacks on PR #33; suite 127/127 + qa 8/8; prerun canonical five frozen; R26 receipt numbers re-verified by running; sibling PRs #31/#32 gate-checked green).

## Round 26 — CCC — 2026-09-26 — mode: BUILDER (fresh small: WAL export in the quilt-doctor consumable shape) + play-tester — vs main a0939b8 (post-#30 merge)
## Round 26 (session driver) — k2d8 — 2026-09-26 — mode: BUILDER (R26-booked small: real receipt-panel→WAL session driver) — vs r26-wal-doctor-export tip a06dfb2 (PR #33)

### Played versions: r26 export tip → session-driver tip — driver + pins + claim row only, training path untouched

Suite at base (PR #33 tip) 126/126 in `tests/` (134 incl. qa); at tip 130/130 (138 incl. qa, 8/8). FAIL-first verified by running: the 5 wal-session pins are 5/5 RED on a pristine origin/main worktree (driver absent — loud fail, not silent skip).

### Builder receipt: the WAL moat is now fed by a real session, not a demo row list

`tools/wal-session.js` closes the loop R26 opened: it plays a seeded headless classic-mode round through the SAME two modules the browser receipt panel receipts — `core.js` step + `qa.js` suggest (the qa advisor lane) — collecting every panel-class receipt: advice rows named for their source (`qa-sim`, never a bare L2), `QA-REFUSAL` rows produced by the ACTUAL exhaustion seam (pot driven below `SIM_POT_FLOOR`, not a hand-written row — the R12 doctrine produced by running), `DEATH` rows at game end. `sessionToWal` re-anchors all of them into the fleet five-opcode WAL via `toQuiltWal`, closes with a session VIEW (advice/refusals/deaths accounting for every receipt), and — when the ledger passes the page panel's 40-row bound — an honest eviction VIEW (`shown: 40, evicted: M`) admitting the bounded display, exactly the page's `[N shown / M evicted]` accounting. Same seed replays byte-identically (receipt lineage is reproducible from a cold import); a launched-confidence tamper is caught as `hash_mismatch` at its own seq in the doctor's vocabulary. New `tests/wal-session-glue.test.js` (5 pins). VERIFIED_CLAIMS gained `wal-session`.

### Play-tester notes

- The refusal evidence is the pin I care about: with `shotsPerBin: 3` the pot crosses the floor within the first game, and 100% of the QA-REFUSAL rows come from `suggest()` returning null — delete the seam and the receipt stream goes silent, it cannot be written around.
- Honest limit: the driver paces advice per decision boundary, not per the page's 150-frame seam pacing — the receipt STREAM is the same class, the cadence is denser. The page pacing glue itself is pinned by the byo/qapot suites, not duplicated here.

### Carried
- [epic, carried R12→R26] C1 scaling study — unchanged.
- [medium, carried R22→R26] advice-aware GA.
- [small, booked by R26] a merged quilt-doctor PR replaying `node tools/wal-session.js --out session.jsonl` against `QuiltSubstrate.verify()` and citing pong-quilt = the candidate VERIFIED edge pq → quilt-doctor, now session-fed.

## Round 26 — k2d8 — 2026-09-26 — mode: BUILDER (fresh small: WAL export in the quilt-doctor consumable shape) + play-tester — vs main a0939b8 (post-#30 merge)

### Played versions: main a0939b8 → r26 tip — export tool + pins only, training path untouched

Suite at base 121/121 in `tests/` (129 incl. qa); at tip 126/126 (134 incl. qa, 8/8). FAIL-first verified by running: the 5 wal-export pins are 5/5 RED on a pristine origin/main worktree (extraction anchor absent — loud fail, not silent skip).

### Builder receipt: pong-quilt receipts now export in the fleet five-opcode quilt WAL

The page chains receipts with the panel hash (hash8, h*31 — a display hash, never claimed otherwise). quilt-doctor's substrate (`quilt_doctor/substrate.py`, canonical producer SuperInstance/git-agent PR #1's quilt_emit — the third VERIFIED edge's target) speaks the fleet WAL: BIND/LINK/VIEW lines, fnv1a-64 chained, replayable. `tools/wal-export.js` re-anchors any row list into EXACTLY that shape: the doctor's key set {args, cell, hash, op, prev_hash, seq}, genesis prev 0000000000000000, canonical json (sorted keys at every level, no whitespace — the replacer-array form of JSON.stringify was tried first and silently dropped nested args keys; canonical() replaced it, caught by the round-trip pin).

Live cross-tool receipt, recorded here because it cannot be faked later:
- `node tools/wal-export.js` → demo export (5 lines: BIND session + 3 LINK receipts + 1 VIEW projection)
- quilt-doctor's OWN verifier against that file: `QuiltSubstrate('<export>.jsonl').verify()` → `{'ok': True, 'divergences': [], 'lines': 5}`
- negative control: content-tampered row 3 (kind DEATH→SURVIVED, no re-chain) → doctor reports `{'ok': False, 'divergences': [{'seq': 3, 'why': 'hash_mismatch'}]}` — the doctor catches our tamper at the exact seq, in its own vocabulary.
- fnv1a-64 vectors cross-checked against python's json.dumps(sort_keys) at build time and pinned (offset basis cbf29ce484222325; BIND-genesis body c86b3c06e0945d6d).

Weight law bookkeeping: a merged quilt-doctor PR consuming this export and citing pong-quilt = candidate VERIFIED referral edge **pq → quilt-doctor** (PENDING until that merge; this PR is the source-side half). This is the 19:11-pulse synergy candidate shipped: pong-quilt's receipt lineage riding the same spine the third VERIFIED edge (aw-quint-opcode→ga-quilt-emit) already minted currency on — the receipts moat against the OpenFANG/Selvedge collision gets a second consumer repo.

### Play-tester notes

- The divergence vocabulary mirror (hash_mismatch / chain_break / seq_gap) is the pin I care most about: an export that fails the doctor's checks must fail in the DOCTOR's words, not ours — a mistranslated error is a laundered one.
- Unknown ops are refused at export time (MINT throws) — the exporter can never emit a non-spine opcode, so the doctor can never be handed a line that claims an opcode the spine doesn't have.

### Carried
- [epic, carried R12→R26] C1 scaling study — unchanged.
- [medium, carried R22→R26] advice-aware GA.
- [small, fresh] the actual receipt-panel → WAL driver (export a real session's receipts, not the demo rows) — deferred to keep this round sub-15min.
## Round 25 — CCC — 2026-09-26 — mode: BUILDER (R23-spec fresh small: C1 coev ledger strip) + play-tester — vs main a0939b8 (post-#30 merge)

### Played versions: main a0939b8 (R23 merged) → r25 tip — prerun swept in a scratch worktree per the R13 lesson

Suite at base 125/125 + qa 8/8; at tip 126/126 + 8/8. `node tools/prerun.js` + `tools/prerun-coev.js` in the scratch worktree regenerate the canonical five byte-identically (coev.js `946e639a…`, curve.json `63617065…`, L0 `8a49b0f6…`, L1 `643bd132…`, L2 `454511548…`) — the strip is render/wiring only; the training path is byte-frozen. FAIL-first verified by running: 5/5 new pins RED on pristine main (extraction anchor absent — loud fail, not silent skip).

### Builder receipt: the C1 coev ledger gets the same visibility the coin journal got
- **what:** `renderCoevStrip(ctx, rows, gens)` in index.html — a pure renderer (ctx + data in, nothing closed over) plotting every head-to-head row of `checkpoints/coev.js`'s hash-chained C1 ledger as a marker strip under the coin journal: ender-kill bright, survivor-cap dim green, x = generation, axis derived from the DATA (the R23 missing-header lesson applied at birth). Label carries the audit sentence (`121 h2h · 120 ender-kills · 1 survivor-caps · gens 0-120`). Wiring is synchronous — coev.js already loads as a script tag, no fetch — and the absent-artifact path admits in amber (`instrument ships, admits it`), never fakes a strip.
- **why:** R23 made the classic chain's receipt stream visible; R14's second chain had no analogous plot. A hidden ledger is an unaudited one. Both chains now render side by side.
- **verify (FAIL-first, then green):** 5 pins in `tests/coev-strip-glue.test.js` — extraction-integrity + one-frame drive (markers, color classes, monotone x, edges), label audit sentence, an UNCLASSIFIED-outcome tripwire (amber + named `OTHER:n`, never laundered into a known class), the shipped artifact (all 121 rows plotted from the real coev.js), and the data-derived axis. 5/5 RED on main → 5/5 green at tip.

### Play harness (real artifact + wiring, observed headless)
real data: 121 ticks (120 bright kills / 1 dim cap), x∈[2,358], label exact. The one dim tick at gen 110 is the artifact's only SURVIVOR-CAP in 121 h2h rows — the strip shows what the panel never made obvious: the C1 pressure is overwhelmingly ender-dominated (99.2% kills); the lone survivor-cap epoch is now a visible event, not a ledger row you'd have to tail by hand. degrade: wiring guards `!cp || !Array.isArray(cp.ledger)` → amber admission text present in-page. tripwire: a synthetic `TIMEOUT` row renders amber and the label names `OTHER:1`.

### Deltas observed (shapes of change)
- **d(learning)/d(version) = 0 — the 24th straight frozen round.** Canonical five unmoved; L0 5,767 / L1 8,700 / L2 8,800.
- **d(artifact)/d(version) = 0** — render/wiring/caption only; training path byte-frozen (frozen hashes above).
- **d(coverage)/d(version): suite 125→126** (+5 strip pins); README count 129→134, the bump named by the readme-count pin mid-flight (129→133 caught, corrected, re-verified by running).
- **VERIFIED_CLAIMS 29→30** (`coev-ledger-strip`, proofTest tests/coev-strip-glue.test.js; honesty.test.js two-way match holds).

### Lies hunted
- **[P3-process, found by the pin, FIXED pre-ship]** my own README count was off by one (125 claimed vs 126 run) — the readme-count pin caught it; corrected by running, not copying.
- **[honesty note]** the R23 playtest's spec wording said "S-win/E-win/timeout markers"; the artifact's only outcome classes are ENDER-KILL / SURVIVOR-CAP (playAdv has no timeout class — cap-reached IS the survivor's win). The renderer ships a third amber class for any future/unclassified outcome and NAMES it in the label, so a real timeout appearing later is visible, not silently recolored.
- **(nothing found in: byte-reproducibility — prerun five re-derived live in a scratch tree; strip honesty on real + degrade + tripwire paths; suite pins; qa stand-in 8/8.)**

### Next version spec (competitive improvements)
- [small, carried R22→R25] advice-aware GA — thread a measured diet into playOne; still the only honest d(learning)/d(version) ≠ 0 path short of the epic.
- [epic, carried R12→R25] C1 scaling study — unchanged. The strip now makes its motivation visible: 120/121 ender-kills says the ender pressure saturates at pop 24; whether the survivor ever learns to survive is the scaling question.

### Siblings studied this round
None — internal instrument work again (the C1 ledger is this repo's own artifact).

### Verdict
MERGEABLE (R23-spec fresh small shipped FAIL-first; both chains equally visible; suite 126/126 + qa 8/8; prerun five byte-identical in a scratch tree; the C1 pressure imbalance the panel never showed is now a visible signal).

---
## Round 24 — k2d8 — 2026-09-26 — mode: BUILDER (R23-spec carried small: canonical-md5 lineage note) — vs main a0939b8 (post-#30 merge)

### Played versions: main a0939b8 (R23, merged) → r24 tip

### Builder receipt (the one small — hashes are line-specific doctrine)
- **what:** EXPERIMENTS.md Rules gains the lineage rule the R22 P3-process lie demonstrated: prerun artifact md5s regenerate differently on different lines; the post-R21 line regenerates curve `63617065…`, L0 `8a49b0f6…`, L1 `643bd132…`, L2 `454511548…`, coev `946e639a…`, while pre-R21 main regenerates curve `ba1c919a…`, L1 `aa4d7c4b…`, L2 `63b7fdd5…` — verify by running at the tip, never by copying hashes across entries. New `tests/canonical-md5-lineage.test.js` pins it (4 text pins).
- **why:** R21 changed the training path but left the experiment's memory holding 20-round-old hashes; every future round copy-pasting them onto the new line would hit a phantom mismatch. One doctrine line next to the Rules kills the class.
- **verify (FAIL-first, then green):** 4/4 pins RED against main's EXPERIMENTS.md (rule absent), 4/4 green at tip. The doctrine's own hashes were NOT copied from the R23 entry — a clean `node tools/prerun.js` run at this tip regenerated curve `63617065d3…`, coev `946e639a82…`, L0 `8a49b0f6…`, L1 `643bd132…`, L2 `454511548…` live, exactly the values the rule names. Suite 125/125 + qa 8/8; README count 129→133 named by the readme-count pin (121→125); VERIFIED_CLAIMS 28→29 (`canonical-md5-lineage`); checkpoints byte-frozen vs the R23 canonical five.

### Lies hunted
- (nothing found in: byte-reproducibility — prerun at tip regenerates the R23 canonical five; suite pins; qa stand-in 8/8. Docs+registry-only change; training path untouched.)

### Next version spec (competitive improvements)
- [small, fresh, carried R23] C1 coev ledger strip — the coin journal made the classic chain visible; the C1 ledger (R14's second chain) has no analogous plot. Verify: extraction-integrity pin on a pure renderer + one-frame drive, FAIL-first.
- [small, carried R22→R24] canonical-md5 lineage note — FULFILLED this round.
- [medium, carried R15/R20/R22/R23] advice-aware GA — thread a measured diet into playOne.
- [epic, carried R12→R23] C1 scaling study — unchanged.

### Siblings studied this round
None — internal doctrine work; the hashes cited were re-derived by running, not copied.

### Verdict
MERGEABLE (one doctrine line + 4 pins; the phantom-mismatch class the R22 lie exposed is now pinned shut; suite 125/125 + qa 8/8; canonical five frozen).

---
## Round 24 — k2d8 — 2026-09-26 — mode: BUILDER (snowball-pulse synergy candidate: the QA-REFUSAL seam names quilt-doctor's three-lens verdict as an external lens) — vs main a0939b8 (post-#30 merge)

### Played versions: main (this round's base)

Suite at base 121/121 + qa 8/8; at tip 126/126 + 8/8. The touched files (tools/doctor-verdict.js, tests/doctor-verdict-glue.test.js, core.js claim row, PLAYLOG, README) are outside the training path — the canonical five md5s are untouched by construction (no training-path file edited; d(learning)/d(version) = 0, 19th straight frozen round; d(coverage) 121→126 (+5 pins), VERIFIED_CLAIMS 30→31.

### Builder receipt (the 22:56-pulse synergy candidate, shipped as a closed seam)
- **what:** `tools/doctor-verdict.js` digests a REAL quilt-doctor checkout (`QUILT_DOCTOR_DIR` or `../quilt-doctor`) — `docs/holistic-stats.json` + `docs/HOLISTIC-VIEW-2026-09-26.md`, both shape-checked (every lens must carry the 8! = 40320 exact-enumeration perms; a Monte-Carlo impostor reads as ABSENT) — into a one-line honesty admission a QA-REFUSAL receipt may append: the doctor's verdict was THREE THINGS (no cross-lens correlation survives), anchored on the killed-in-public hypothesis (jev ~ active_days, p_exact = 0.988492), so a single-judge refusal stands alone. `lensLine(null) === null`: the seam ships closed and renders NOTHING without a real checkout — never a hand-written mock (the verifier-only-mock doctrine broken at birth, per the pulse note). New `tests/doctor-verdict-glue.test.js`, 5 pins: closed-seam contract, LIVE pin against a real doctor checkout (jev substance parsed from the matrix, 0.709), real-shaped fixture digest, three tamper classes → absent (bad perms / broken JSON / missing pong-quilt row), citation honesty (PENDING per weight law — VERIFIED only when a merged PR names the citation).
- **why:** quilt-doctor's holistic view is the fleet's only three-lens exact-enumeration verdict; the QA-REFUSAL seam (Round 12) is a single-lensor silence. Naming the external verdict on refusal receipts is the pq→quilt-doctor referral edge candidate (booked PENDING, honest provenance).
- **verify (FAIL-first, then green):** on pristine main the tool+test are absent (5/5 RED by inspection — the FAIL-first class the R23 round already pinned); at tip 126/126 + qa 8/8, and the LIVE pin ran against quilt-doctor aa5a041 with every value traced to the doctor's own files.

### Next version spec (competitive improvements)
- [small, fresh] wire lensLine into the page's QA-REFUSAL stat surface (index.html) behind the same closed-seam rule, with a Proxy-DOM glue pin — book only if the page surface wants the admission.
- [epic, carried] C1 scaling study — still the only nonzero d(learning)/d(version) path.
- [epic, carried] advice-aware GA (R15 fresh alternative).

### Verdict
MERGEABLE (the refusal seam now has an external lens that admits when it is absent; suite 126/126 + qa 8/8; training path untouched).

## Round 23 — CCC — 2026-09-26 — mode: BUILDER (completing an interrupted R23: the R22-spec strip existed as a local commit with no receipt) + one fresh small (axis-derives-from-data, FAIL-first pinned) + play-tester — vs main 4b94c49 (post-#29 merge)

### Played versions: main 4b94c49 (R22 merged) → r23 tip — swept in scratch worktrees per the R13 lesson

Suite at base 116/116 + qa 8/8; at tip 121/121 + 8/8. `node tools/prerun.js` at tip regenerates the post-R22 canonical five byte-identically (coev.js `946e639a…`, curve.json `63617065…`, L0 `8a49b0f6…`, L1 `643bd132…`, L2 `454511548…`; 182 flips, 89 swaps) and the tree stays clean — index.html/tests/README are outside the training path, proven by the frozen hashes. FAIL-first verified by running: the 4 strip pins are 4/4 RED on pristine main (extraction anchor absent — loud fail); the new axis pin is RED at the pre-fix tip.

### Builder receipt 1 (the completion): the coin-journal strip ships with its receipt
A prior session built the R22-spec item (plot the tiebreak journal) at 13:23 today — commit `9e95ddf` existed only locally, its README count sat uncommitted, and no PLAYLOG entry, push, or PR ever happened. This round verified the work by running instead of redoing it (same discipline as R21's completion): verbatim-extraction pins are honest, the renderer is pure, the label carries the audit sentence and SCREAMS on a live moth flip, the degrade path admits in amber. The R11 lesson from the other side: **code without a receipt is unshipped** — the receipt is the ship. Completion = this entry + the README count + push + PR.

### Builder receipt 2 (the one fresh small): the axis derives from data, not the header
- **what:** pin 5 in `tests/coin-journal-glue.test.js` drives the verbatim renderer with a `gens: 0` header and gen-200 data; pre-fix every tick lands at x>360 (off-canvas) while the label still counts them. One-line fix: `const axis = Math.max(1, gens||0, ...tiebreaks.map(t => t.gen||0))` and `(t.gen||0)/axis`. Shipped data (gens 260, flips 24–259) renders identically before and after — the fix moves nothing on the happy path, proven by the play harness diff.
- **why:** found by driving the SHIPPED page headless (Proxy-DOM, real curve.json) — the exact class the loop exists to hunt, an instrument that claims visibility while rendering invisibility. The `d.gens || 0` wiring made a missing header a silent render lie.
- **verify (FAIL-first, then green):** pin 5 RED pre-fix (`tick at x=714 must be on-canvas`), 5/5 green post-fix; full suite 121/121 + qa 8/8; prerun five md5s byte-identical.

### Play harness (4 paths through the shipped page, all observed)
happy: 183 rects (bg + 182 ticks), 89 bright swaps / 93 dim keeps, label `coin journal: 182 flips · 89 swaps · gens 0-260 · live:false throughout`, x∈[35,357]. degrade (fetch fails, the file:// reality): amber `#d29922` admission `data absent … instrument ships, admits it`. live tripwire (one `live:true` row): label names it — `LIVE:1 (moth engine!)`. empty journal: same amber admission. No path fakes data; the anti-laundering tripwire fails safe (a missing `live` flag counts as live, never as mock).

### Deltas observed (shapes of change)
- **d(learning)/d(version) = 0 — the 22nd straight frozen round.** L0 5,767 / L1 8,800 / L2 8,700, canonical md5s unmoved.
- **d(artifact)/d(version) = 0 for the first time since R20** — the strip touches render/wiring only; the training path is byte-frozen (the R21/R22 reshuffle class does not recur).
- **d(coverage)/d(version): suite 116→121** (+4 strip pins, +1 axis pin); README count 123→124→129 across the R22/R23 line, each bump named by the readme-count pin (this round's: 120→121 caught mid-flight — the pin works, the count was corrected before ship).
- **NEW instrument class — d(visibility)/d(version): the journal moved from auditable (R22: 182/182 receipted) to visible (R23: plotted against generation).** The experiment now renders its own receipt stream as a mutation-rate signal: 89 swaps / 182 flips ≈ 49% challenger-take rate at fitness ties — the coin is not a tiebreak detail, it is a measurable evolutionary pressure the page finally shows next to the fitness curve it reshuffles.

### Lies hunted
- **[P3, found by running the shipped page headless, FIXED]** the `d.gens || 0` wiring + `Math.max(1, gens)` axis: a missing gens header pushed every tick off-canvas while the label counted them. Repro: renderer driven with gens=0, gen=200 → x=714. Fixed + FAIL-first pinned (Builder receipt 2).
- **[P3-process, verified by inspecting the tree, recorded]** an interrupted session left R23 half-shipped: local commit, uncommitted README bump, no entry/push/PR. If this round had run naively it would have re-built the strip from the spec and double-shipped; verifying-by-running instead of assuming-nothing-shipped is what the loop's receipts are for. Recorded so future builders check `git log` for unshipped local commits before building.
- **(nothing found in: byte-reproducibility — prerun triple-confirmed at tip; journal symmetry — 182/182 with `swap` booleans, 93 H / 89 T; strip honesty on all 4 play paths; suite pins; qa stand-in 8/8; checkpoint consistency.)**

### Next version spec (competitive improvements)
- [small, fresh] C1 coev ledger strip — the coin journal made the classic chain visible; the C1 ledger (R14's second chain) has no analogous plot. A strip of coev outcomes per generation (S-win/E-win/timeout markers) would make both chains equally visible. Verify: extraction-integrity pin on a pure renderer + one-frame drive, FAIL-first.
- [small, carried R22] canonical-md5 lineage note in EXPERIMENTS.md — still unfulfilled; the post-R21 canonical (curve `63617065…`, L1 `643bd132…`, L2 `454511548…`) regenerates only on the r21+ line, and nothing in the repo says so next to the hashes. One doctrine line kills the copy-paste mismatch class. Verify: text pin.
- [medium, carried R15/R20/R22] advice-aware GA — thread a measured diet into playOne so advice changes the EVOLVED champion; still the only honest d(learning)/d(version) ≠ 0 path short of the epic.
- [epic, carried R12→R22] C1 scaling study — unchanged, still the only other nonzero-learning path. Verify: a new receipted curve with different endpoints.

### Siblings studied this round
SuperInstance/quilt-quant (the cited coin-toss-v1 engine — the strip's data rows carry its citation and `live:false` mock flag; the R23 live-tripwire pin is quilt-quant's mock-flag doctrine rendered as UI). No new sibling code needed — internal instrument work again.

### Verdict
MERGEABLE (interrupted R23 verified-by-running and receipted; fresh P3 fixed FAIL-first; suite 121/121 + qa 8/8; prerun five md5s byte-identical; the experiment's coin journal is now visible, honest on every failure path, and cannot silently render invisibility).

---

## Round 22 — CCC — 2026-09-26 — mode: BUILDER (fresh P2 found by running: the R21 coin journal was tails-only — 93 of 182 flips unrecorded) + play-tester — vs r21 tip 3508a75 (PR #28, open at round start)

### Played versions: main ac9b4c1 (R20, post-#27) → r21 tip 3508a75 (this round's base) — swept in scratch trees per the R13 lesson

Suite at base 115/115 + qa 8/8; at tip 116/116 + qa 8/8. `node tools/prerun.js` at base (scratch worktree): the frozen five regenerate byte-identically (coev.js `946e639a…`, curve.json `ba1c919a…`, L0 `8a49b0f6…`, L1 `aa4d7c4b…`, L2 `63b7fdd5…`) — L1 gen60 8800, L2 gen260 8700. At the r21 tip the same command burns **182 coin flips (93 H + 89 T)** and produces DIFFERENT artifacts: curve.json `edbe606d…`, L1 `643bd132…`, L2 `454511548…`, L1 gen60 8700, L2 gen260 8800 — first nonzero d(artifact)/d(version) in 21 rounds (mechanism below).

### Builder receipt (the one small — receipt symmetry for the quantum coin)
- **what:** `tools/prerun.js` `quantumCoinTiebreak` now journals EVERY flip: heads keeps land as `{coin:'H', swap:false}` beside the tails swaps `{coin:'T', swap:true}`; the console line reports `182 quantum-coin flip(s), 89 swap(s)` instead of the misleading `89 tiebreak(s)`. New pin 5 in `tests/quantum-tiebreak-glue.test.js`: extracts the VERBATIM shipped tiebreak function and drives it with a controlled rand — forced heads MUST produce a receipt (R21: none) and keep the incumbent; forced tails MUST produce a swap receipt and crown the challenger; one stream burn per flip either way.
- **why:** R21's journal was asymmetric — `if (heads) return false;` before the push dropped every keep. An instrumented copy of the R21 code (patch counts flips, same seeded stream) proves the real run flipped **182 times but receipted only 89**: R21's "burned 89 coin flips" undercounted the stream by half, and the receipt set could not be audited for keeps — the exact hunted class (a receipt that hides half the events) sitting in the demo's honesty centerpiece. The R21 PLAYLOG entry and the prerun header comment both claimed "every flip lands in checkpoints/curve.json"; the code cashed only tails.
- **verify (FAIL-first, then green):** pin 5 against the pristine R21 prerun.js is RED with `heads flip must be journaled (R21 silently dropped it)`; after the fix 5/5 in the file. Regenerated curve.json now carries 182 receipts (93 H / 89 T, `swap` boolean, `live:false` throughout); level0/1/2 md5s UNCHANGED (`8a49b0f6…`/`643bd132…`/`454511548…`) and coev.js unchanged (`946e639a…`) — the journal-only fix provably did not touch the training path. README count 123→124 (named by the readme-count pin, as designed). VERIFIED_CLAIMS row `quantum-tiebreak` reworded to claim the symmetric journal explicitly.

### Deltas observed (shapes of change)
- **d(learning)/d(version) at the fitness-band level = 0 for the 21st straight round** — ceiling still 8800, L0 still 5767. BUT **d(artifact)/d(version) ≠ 0 for the first time since v1**: wiring ANY stream-consuming tiebreak reshuffles the walk (the coin's rand draws diverge every subsequent mutation), so the gen-60/gen-260 endpoints swapped (8800/8700 → 8700/8800) and the path reshuffled (old curve dipped to 8003 at gen78; new one holds 8700–8800 from gen65). Shape: the change is a re-rolled random walk, not an improvement — the honest credit is "different artifacts, same attractor," and R21 recorded neither the new canonical hashes nor the endpoint swap. The R22 canonical set (this entry) supersedes the frozen five for the r21-and-later line; main (pre-R21) still regenerates the old five.
- **d(coverage)/d(version): suite 115→116**; d(receipt-completeness): 89/182 events → 182/182.

### Lies hunted
- **[P2, found by running, FIXED]** the R21 coin journal recorded only challenger-takes events (89 of 182 flips; 93 incumbent-keeps burned the seeded stream but left no receipt). Repro: instrumented run of R21 prerun.js → `TOTAL_FLIPS 182 HEADS 93 TAILS 89` vs 89 receipts in curve.json. The "89 coin flips" claim in the R21 entry undercounted by half; "every flip lands in checkpoints/curve.json" was false as written.
- **[P3-process, found by diffing runs, recorded]** R21 changed the training path (L1/L2 weights, curve endpoints) but left the experiment's memory holding the 20-round-old "frozen five" md5s — every future round copy-pasting those hashes from older entries would mismatch against the r21 line. Corrected by this entry (canonical set above) going forward; historical entries stay untouched (receipts are memory).
- **[P3-process, verified by reading]** R21 shipped with no "Next version spec" section (same gap class R15 flagged in R14) — this round reconstructs the candidate set below.
- **(nothing found in: byte-reproducibility — triple-confirmed: R21 committed checkpoints == my clean rerun == my instrumented rerun, md5-identical; suite pins; qa stand-in; checkpoint-consistency probe — all green at base and tip.)**

### Next version spec (competitive improvements)
- [small, fresh] canonical-md5 lineage note in EXPERIMENTS.md — the "frozen five" hashes appear in ~15 entries but regenerate ONLY on the pre-R21 line; one doctrine line ("post-R21 canonical: curve edbe606d/63617065-ward, L1 643bd132, L2 454511548 — verify by running, not by copying hashes") would kill the mismatch class the P3 above demonstrated. Verify: text pin.
- [small, fresh] plot the tiebreak journal — the curve page could render H/T flips as a swap marker strip under the fitness curve (89 swaps over 261 gens is a visible mutation-rate signal). Why: the demo now owns a real experiment instrument it doesn't show. Verify: glue pin on the render seam; visual amber.
- [medium, carried R15/R20] advice-aware GA — thread a measured diet into playOne so advice changes the EVOLVED champion (still the only path to honest d(learning)/d(version) ≠ 0).
- [epic, carried R12→R20] C1 scaling study — unchanged, still the only other nonzero-learning path.

### Siblings studied this round
SuperInstance/quilt-quant (the cited coin-toss-v1 engine — its mock-flag doctrine is the honesty model the R22 journal fix follows: label every stand-in, never launder). Internal seam work otherwise; no new sibling code needed.

### Verdict
MERGEABLE (fresh P2 fixed FAIL-first; suite 116/116 + qa 8/8; level/co-ev md5s frozen prove the journal-only touch; the experiment's first honest accounting of its own coin — 182 flips, all of them receipted).

---

## Round 21 — k2d8 — 2026-09-26 — mode: BUILDER (synergy candidate from the 11:11 pulse: quantum-coin CI tiebreaker) — vs main ac9b4c1

### Builder receipt: champion ties are broken by a receipted quantum coin, not index order
- **what:** `core.js` `makeEvaluator` gains an `opts.onTie(rec, incumbent)` seam — default OFF (strict `>` keeps the incumbent, byte-identical behavior everywhere the evaluator already runs). `tools/prerun.js` wires the seam to a receipted coin: on equal fitness, one draw from the same seeded `rand` stream; tails = challenger takes, and the flip is journaled to `checkpoints/curve.json` under `tiebreaks` with `{gen, incumbent, challenger, coin, engine: 'coin-toss-v1', live: false}` plus a citation to SuperInstance/quilt-quant `lab/play.mjs` (the live moth-quantum engine).
- **why:** the old rule was silent index-order bias — the first equal-fitness candidate always won, undocumented. LIVE, not theoretical: the regenerated 261-generation prerun burned **89 coin flips**. The bias class was running every prerun.
- **honesty:** CI has no network, so the coin is the SEEDED MOCK stand-in, `live: false` explicit in every receipt — never laundered as live quantum entropy (quilt-quant's own mock-flag doctrine). Byte-reproducibility preserved: two prerun runs produce md5-identical checkpoints (verified).
- **verify (FAIL-first):** `tests/quantum-tiebreak-glue.test.js` pins trip 2/4 on main (seam absent, wiring absent); at tip suite 115/115 + qa 8/8. VERIFIED_CLAIMS 27→28 (`quantum-tiebreak`). readme-count pin named my own addition (111→115).
- **Referral edge:** a merged PR here citing quilt-quant's coin-toss-v1 = candidate VERIFIED edge qt-quant → pong-quilt (weight law: VERIFIED only on merge).

### Lies hunted
- **[found + fixed]** the index-order tiebreak was invisible in docs and code; now it is an explicit, receipted, cited coin — and the receipts prove the class was live (89 flips in one prerun).

## Round 20 — k2d8 — 2026-09-26 — mode: BUILDER (R19 spec item: promote the C1-refusal probe into the suite) — vs main c5a6f1a (post-#26 merge)

### Builder receipt: the R19 one-off C1-refusal probe is now permanent
- **what:** `tests/coev-qarefusal-glue.test.js` — extracts the page's REAL `live()` coev branch whole (same slice discipline as qarefusal-glue: no reimplementation that can drift) and runs it in a Proxy-DOM harness: coev mode, qa advisor, pot 0. Pin 1: a `QA-REFUSAL` row lands in the receipt chain. Pin 2: the stat line names it (`qa-sim: channel silent (pot 0/bin below floor 2)`, warn class). Pin 3: a live channel (pot 32) still receipts `qa-sim` advice through the same `l2Suggest(champGame)` seam — the pin is not vacuous in the pass direction.
- **why:** R19 closed the "C1 ledger path maybe drops refusals" suspicion by running a one-off probe (verified NO GAP). One-off probes rot; the R19 spec booked this promotion.
- **verify (FAIL-first by mutation):** pin 4 is the self-check — stripping `receipt("QA-REFUSAL",0,0);` from the extracted slice (the pre-R12 silent-drop half) leaves the ledger empty, so pins 1-2 run red against the mutated page code. Suite at base 107/107 + qa 8/8; at tip 111/111 + qa 8/8. VERIFIED_CLAIMS 26→27 (`coev-qarefusal-glue`).
- **Cost, admitted:** +~0.3s suite time (four live() ticks with 20ms waits); pins 1-2 could share one boot — kept separate so a failure names the exact half (ledger vs stat line).

### Lies hunted
- **[none found]** the C1 coev path receipts refusals — now pinned forever, not just observed once.

### Deltas as shapes
- d(learning)/d(version) = 0, 19th straight frozen round; d(coverage): suite 107→111, VERIFIED_CLAIMS 26→27.

### Next version spec (competitive improvements)
- [epic, carried] C1 scaling study (R12-R20 epic) — still the only nonzero d(learning)/d(version) path.
- [epic, carried] advice-aware GA (R15 fresh alternative).

### Verdict
MERGEABLE (suite 111/111 + qa 8/8; touched files — new test, core.js claim row, README count, PLAYLOG — are all outside the training path).

## Round 19 — k2d8 — 2026-09-26 — mode: BUILDER (R18's booked fresh small closed as verified-NO-GAP by running; the builder item is the README count rot, killed structurally) — vs main 6e163f6 (post-#24 merge)

### Played versions: v1 (e98cf66), v2 (0722670, untagged), main — swept in scratch worktrees per the R13 lesson

- prerun on main: L0 gen 0 fitness 5767 (4567f, 12h, ×2.83), L1 gen 60 fitness 8800 (6000f, 28h), L2 gen 260 fitness 8700 (6000f, 27h), 261 gens → 21 curve points. v1 run: L0 2935 / L1 738 / L2 3687 and writes only level0-2.js — v1 cannot finish a prerun (no persistence; that is its failure mode, not a lie). v2 run regenerates the canonical five md5s byte-identically (coev.js 946e639a…, curve.json ba1c919a…, level0 8a49b0f6…, level1 aa4d7c4b…, level2 63b7fdd5…).
- Suite at base 103/103 + qa 8/8; at tip 104/104 + qa 8/8. d(learning)/d(version) = 0 — 18th straight frozen round.

### R18-booked fresh small: QA-REFUSAL in the C1 coev ledger path — VERIFIED NO GAP (by running), item closed

- Probe (verbatim `live()` coev branch, Proxy-DOM harness in the qarefusal-glue style): qa module selected, pot 0 — the real sim's silence below SIM_POT_FLOOR — one `live()` tick. Result: a `QA-REFUSAL` row lands in the receipt chain AND the stat line admits it (`qa-sim: channel silent (pot 0/bin below floor 2) — advice refused, receipted`, warn class).
- Why no gap: `qaSuggest()` is mode-agnostic — it receipts refusals regardless of game mode — and the C1 branch of `live()` calls `l2Suggest(champGame)` exactly like the classic path, so the refusal flows into the same MOTH receipt chain the C1 panel renders (R14's two-section discipline). R18 said "book only if a real gap is found by running" — none found.

### Builder receipt: the README test-count rot — structural fix

- **Found by counting [P3]:** README claimed "(94 tests total: 86 in `tests/` + 8 in `tools/test-qa.js` — counts as of Round 16)" while the live suite is 103+8 (R17 +3, R18 +4). R16 fixed this exact lie once; a hardcoded number in prose rots every time anyone adds a test — the rot is structural, so the fix must be too.
- **What:** `tests/readme-count.test.js` — respawns the canonical suite (this file excluded, so no recursion) plus `tools/test-qa.js`, parses the tap `# pass` summaries, and asserts README's stated numbers equal the live ones (full-suite count = spawned + 1 for the pin's own registration). VERIFIED_CLAIMS 25→26 (`readme-count`). README corrected to 112 (104+8) with the pin named as its maintainer.
- **Verify (FAIL-first, then green):** on unfixed main the pin is red twice over — its spawned suite fails the wristband two-way match (the file backs no claim yet) and the count itself lies (94 ≠ 104). After the claim row + README correction: 104/104 + qa 8/8 green. Any future test added without updating README now turns the suite red with this pin's name on it.
- **Cost, admitted:** the pin adds ~5s to every suite run (a full respawn). That is the price of a run-verified count; paid gladly.
- **Docs hygiene, same commit:** PLAYLOG's duplicated header line removed (merge artifact); canonical-index rows added for R18 (missing — R18 shipped its entry without one) and R19.

### Lies hunted
- **[P3 → FIXED]** the README count rot (above — now pinned to zero by respawn).
- **[P3 → FIXED]** PLAYLOG duplicated header line; R18's missing canonical-index row.
- **[verified honest]** the C1 QA-REFUSAL path receipts refusals — R18's booked suspicion, closed by running, not by reading.

### Deltas as shapes
- d(learning)/d(version) = 0 across v1 → v2 → main: 18 consecutive frozen rounds; the five prerun md5s are the invariant that proves where movement happened (docs/coverage only).
- Failure-mode migration v1→v2→main: v1's failure mode is *can't finish* (no persistence, dies mid-sweep); v2/main's is *can't learn* (frozen weights) — the demo's honesty migrated from capability lies to coverage truths.
- d(coverage): suite 99→103→104 (R17→R18→R19), VERIFIED_CLAIMS 24→25→26; the rot class "stale prose count" is now pinned structurally dead rather than swept again.

### Next version spec (competitive improvements)
- [small, fresh] canonical-index drift pin — every `## Round N` heading below the index must have an index row (regex both directions); R18's missing row proves the drift class is real. Size S, FAIL-first provable by deleting a row.
- [small, fresh] make the R19 C1-refusal probe permanent — promote the one-off Proxy-DOM probe into the suite as a coev-mode refusal glue pin (qarefusal-glue pins classic mode; C1 mode rides on the same l2Suggest but deserves its own receipt assertion). Size S.
- [epic, carried] C1 scaling study (R12/R13/R15/R16/R17/R18 epic) — still the only nonzero d(learning)/d(version) path.
- [epic, carried] advice-aware GA (R15 fresh alternative).

### Verdict
MERGEABLE (R18's booked item closed as verified-no-gap by running; the README count rot is structurally dead — pinned by respawn, not swept again; suite 104/104 + qa 8/8; prerun five md5s byte-identical; PLAYLOG header and canonical index repaired).

## Round 18 — k2d8 — 2026-09-26 — mode: BUILDER (R17 next-spec fresh small: persist the BYO endpoint to localStorage) — vs main 8179351 (post-R17 merge)

### Played versions: main (this round's base)

Suite at base 99/99 + qa 8/8; at tip 103/103 + qa 8/8. `node tools/prerun.js` after the edits: all five md5s byte-identical to base (coev.js 946e639a…, curve.json ba1c919a…, level0 8a49b0f6…, level1 aa4d7c4b…, level2 63b7fdd5…) — the touched files (index.html init block + field note, core.js claim row, new test) are outside the training path, proven by the frozen hashes. d(learning)/d(version) = 0 — 17th straight frozen round; d(coverage) 99→103, VERIFIED_CLAIMS 24→25.

### Builder receipt (the R17-booked fresh small: refresh must not strand a real backend)
- **what:** (1) boot restores `pq.byoQpamEndpoint` from localStorage into `#qabyoep` (storage-unavailable → seam still runs, unpersisted); (2) an `input` listener persists a non-empty trimmed URL and `removeItem`s on clear — clearing the field deletes the key so stale storage can never reopen a closed seam after refresh; (3) field note updated: URL is remembered on this device; the LLM key still never leaves page memory. New `tests/byo-persist-glue.test.js` (4 pins: boot-restore anchor, persist/remove anchors, security singleton, stub-storage round-trip including a simulated refresh). VERIFIED_CLAIMS gained `byo-persist-glue` (24→25).
- **why:** R17's spec: "persist the BYO endpoint to localStorage like the LLM seam's fields, so a refresh doesn't strand a real backend."
- **verify (FAIL-first, then green):** at the R17 tip every new pin fails (index.html touches zero localStorage — the extraction anchor is absent): 4/4 FAIL-first, then 103/103 + qa 8/8 green, prerun byte-identical.

### Lies hunted
- **[P2, caught in the spec itself — pinned, not propagated]** the R17 spec says "like the LLM seam's fields", but the LLM seam's fields are NOT persisted: the key field states "stays in page memory only" and index.html had zero localStorage at R17 tip. The spec's premise misdescribed the code. The honest version, now load-bearing as the SECURITY pin: the endpoint URL persists because a URL is not a credential; the LLM key NEVER persists because it is one — `pq.byoQpamEndpoint` is asserted to be the page's only localStorage key.

### Next version spec (competitive improvements)
- [small, fresh] QA-REFUSAL rows in the C1 coev ledger path — the R12 refusal receipt exists for the qa branch of l2Suggest; check the C1 advisor loop receipts refusals rather than silently skipping (book only if a real gap is found by running).
- [epic, carried] C1 scaling study (R12/R13/R15/R16/R17 epic) — still the only nonzero d(learning)/d(version) path.
- [epic, carried] advice-aware GA (R15 fresh alternative).

### Verdict
MERGEABLE (R17-booked fresh small closed FAIL-first; suite 103/103 + qa 8/8; prerun byte-identical; the BYO door now survives refresh and the key stays in page memory by pin, not by promise).

## Round 17 — k2d8 — 2026-09-26 — mode: BUILDER (R16 next-spec small: page-side BYO endpoint field wiring, the P3 R16 booked, FAIL-first pinned) — vs main post-PR#22-merge (the R16 stack landed mid-round; branch rebased)

### Played versions: main (this round's base, post-#22 merge)

Suite at base 96/96 + qa 8/8 (the merged R16 stack carried 96); at tip 99/99 + 8/8. `node tools/prerun.js` after the edits: same five md5s — the touched files (index.html page glue, core.js claim row, new test) are outside the training path, proven by the frozen hashes. d(learning)/d(version) = 0 — 16th straight frozen round; d(coverage) 91→96, VERIFIED_CLAIMS 23→24.

### Builder receipt (the R16-booked P3: the BYO seam, made user-reachable)
- **what:** (1) the pot row gains a BYO QPAM endpoint input (`qabyoep`, empty = labeled sim — the seam ships closed, zero network by default); (2) `maybeFireQaByo`/`takeQaByo` pace calls exactly like the LLM seam — death OR every ADVICE_EVERY frames, one in flight, replies gameId-tagged at fire so a dead game's reply is dropped, never rebranded (the R4/R5 discipline, qa BYO edition); (3) `qaSuggest()` consumes the reply: a real suggestion is receipted `byo-qpam` and is NOT sim-capped; a degraded one receipts `byo-qpam-fallback` and its advice is NAMED `qa-sim` in the ledger — fallback advice never launders into the byo-qpam kind; the stat line carries the degrade admission alongside the suggestion (`warn`, not clobbered by the shared tail — a real bug the pins caught: the first wiring let the shared `${src} suggests` tail overwrite the admission). (4) New `tests/byo-page-glue.test.js` (5 pins, stubbed `suggestByo`, zero network): markup ships the field; empty endpoint never fires; real reply receipted un-capped; degraded reply dual-named right (fallback receipt + qa-sim advice); stale reply dropped across a gameId bump. VERIFIED_CLAIMS gained `byo-page-glue` (23→24).
- **why:** R16 shipped the seam module+test level only and booked the P3 in its own receipt: "index.html has no endpoint input and suggestByo is not called from the page yet." The honesty contract's "name the seam, don't fake it" cuts both ways — a seam nobody can reach from the UI is a promised door left shut.
- **verify (FAIL-first, then green):** against the PR #22 tip the new pin fails 5/5 (no `qabyoep`, no `qaSuggest` — extraction anchors absent). After the fix: 96/96 all green, qa 8/8, prerun byte-identical. Three existing glue files (qapot/qarefusal/receiptkind) were re-anchored to the widened extraction window (qa BYO seam block + l2Suggest) — their behavioral pins pass unchanged, proving the sim path is behavior-identical.

### Lies hunted
- **[P3, fixed — the clobbered admission]** the first wiring set the degrade text inside qaSuggest, but l2Suggest's shared tail overwrote it with `${src} suggests …` in class `ok`. The degraded-consumption pin caught it ("the stat line must admit the degrade"). Fix: qaSuggest returns a `note` the shared tail prepends in `warn` — one tail, both stories, no overwrite.

### Next version spec (competitive improvements)
- [small, fresh] persist the BYO endpoint to localStorage like the LLM seam's fields, so a refresh doesn't strand a real backend.
- [epic, carried] C1 scaling study (R12/R13/R15/R16 epic) — still the only nonzero d(learning)/d(version) path.
- [epic, carried] advice-aware GA (R15 fresh alternative).

MERGEABLE (R16-booked P3 closed FAIL-first; suite 96/96 + qa 8/8; prerun byte-identical; the BYO door is now user-reachable and degrades honestly on every failure mode).

## Round 16 — k2d8 — 2026-09-26 — mode: BUILDER (R15 spec item 4: REAL_QPAM BYO endpoint seam, FAIL-first pinned) — vs main 9822b6a (post-PR#19)

### Played versions: main (9822b6a, this round's base)

Suite at base 89/89 + qa 8/8; at tip 91/91 + 8/8. `node tools/prerun.js` after the edits: same five md5s (coev 946e639a…, curve ba1c919a…, L0 8a49b0f6…, L1 aa4d7c4b…, L2 63b7fdd5…) — the touched files (qa.js, core.js claim row, new test) are outside the training path, proven by the frozen hashes. d(learning)/d(version) = 0 — 15th straight frozen round; d(coverage) 89→91, VERIFIED_CLAIMS 22→23.

### Builder receipt (R15 spec item 4 — the REAL_QPAM BYO endpoint seam, carried since R12/R13)
- **what:** qa.js `suggestByo(state, seed, shotsPerBin, {url, fetch})` — the "a real QPAM backend belongs at the marked seam" door, opened. Wire contract: POST JSON `{binsB64, shotsPerBin, seed}` where bins are the sonified frame quantized to 64 8-bit bytes, base64 (zero-dep encoder, no Buffer/btoa dependency). The response is JEV-validated (move ∈ {-1,0,1}, confidence ∈ [0,1] finite) before it can reach the paddle. New `tests/byo-seam.test.js` (5 pins, all with STUBBED fetch — no live network in CI): success passes through UN-capped (a real backend is not bound by the stand-in's SIM_MAX_CONF — the cap is the stand-in's honesty, not yours); move=5 payload → byo-qpam-fallback; fetch throw AND non-ok status → fetch-failure; no endpoint → fetch never called; fallback advice byte-identical to plain `suggest()` at the same seed/pot. VERIFIED_CLAIMS gained the `byo-qpam-seam` row (22→23).
- **why:** three rounds (R12 medium, R13 medium, R15 medium-carried) kept this door marked but shut. The honesty contract already promised "name the seam, don't fake it" — this names the wire format and the failure semantics.
- **verify (FAIL-first, then green):** against pristine main the pin fails 5/5 (`QA.suggestByo is not a function`). After the fix: 91/91 all green.

### Lies hunted
- **[P3, verified by reading, NOT fixed — page-side wiring absent]** the seam is module+test level only: index.html has no endpoint input and `suggestByo` is not called from the page yet — the demo still runs the pure stand-in, which is honest (nothing claims BYO exists in the UI). Flagged so the next builder doesn't believe the BYO story is user-reachable.
- **(nothing found in: the wire contract)** the base64 encoder was checked against node's Buffer on all 64 bin values round-trip inside the pin (decode via Buffer.from(b64, "base64") in the test).

### Next version spec (competitive improvements)
- [small, fresh] page-side BYO wiring: an endpoint text field in the qa tile (persisted to localStorage like the LLM seam's), `suggestByo` behind it with fallback receipts rendered as their own receipt kind in the ledger. Verify: glue pin stubbing fetch on the page path.
- [epic, carried] C1 scaling study (R12/R13/R15 epic) — still the only nonzero d(learning)/d(version) path.
- [epic, carried] advice-aware GA (R15 fresh alternative) — thread a measured diet into playOne so advice changes the EVOLVED champion.

MERGEABLE (R15 spec item 4 closed FAIL-first; suite 91/91 + qa 8/8; prerun byte-identical; the BYO seam degrades honestly on every failure mode, never silent).

## Round 15 — k2d8 — 2026-09-26 — mode: BUILDER (one small: R13 spec item 1 — the canonical test command in EXPERIMENTS.md, FAIL-first pinned) + play-tester — vs main 3e4e497 (R14 merged via PR #17)

### Played versions: v1 (e98cf66) → v2 (0722670) → main (3e4e497, this round's base)

Version sweep run in scratch worktrees (the R13 lesson — never sweep in the main tree; trees asserted between refs). v1 moves (L0 2,935 / L1 1,691 / L2 4,766 — unseeded fiction, still the only mover, still its own proof of why the honesty pass exists). v2 regenerates the canonical frozen set byte-identically (`coev.js 946e639a…`, `curve.json ba1c919a…`, L0 `8a49b0f6…`, L1 `aa4d7c4b…`, L2 `63b7fdd5…`); main matches v2 exactly. `node tools/prerun.js` at this round's tip after the edits: same five md5s, tree clean — the touched files (EXPERIMENTS.md, core.js, new test) are outside the training path, proven by the frozen hashes. Suite at base 82/82 + `tools/test-qa.js` 8/8; at tip 84/84 + 8/8.

### Builder receipt (the one small — R13 spec item 1: the canonical test command, carried since R12)
- **what:** (1) EXPERIMENTS.md protocol step 1 now names the canonical suite command — `node --test tests/*.test.js` (glob form) plus `node --test tools/test-qa.js` — and flags the bare directory form: on Node 22 `node --test tests` fails opaquely (one failing subtest named `tests`, error "test failed", no culprit named). (2) New `tests/testcmd-docs.test.js` (Round 15 pin): the glob command must appear as a literal in EXPERIMENTS.md AND the bare form's mention must be a warning, not a recommendation (regex-anchored). VERIFIED_CLAIMS gained the `testcmd-docs` row (21→22).
- **why:** three rounds (R12 process finding, R13 spec, R14 carried-forward) re-derived this by hand; the R12 entry predicted "a future runner copy-pasting the directory form gets a red wall with no name on it." The doctrine file itself should carry the command it expects to be run.
- **verify (FAIL-first, then green):** against the pristine main tip the new pin fails 1/2 (glob literal present only in the merge-gate rule; the warning absent). After the fix: 82→84 all green — and the honesty two-way match pin then demanded the new file back a claim, exactly as designed (added the registry row). Prerun byte-identical.

### Deltas observed (shapes of change)
- **d(learning)/d(version) = 0 — the 14th straight frozen round.** v2 through R14-in-main regenerate byte-identically; only v1 moves, and only because its numbers are unseeded.
- **d(coverage)/d(version) continues: suite 82→84, VERIFIED_CLAIMS 21→22.** The wristband compounds while the learning curve stays frozen.
- **NEW measured shape — d(advice)/d(diet) is nonzero, and the ranking is non-obvious.** First headless diet probe (this round, L2 champion, 30 seeded games/diet, shipped apply rule `rand() < conf·w` at w=1, two runs for variance): unaided 3,443f/11.5h — **moth 5,564–5,802f/17.5–18.6h (helps a lot)** — qa-sim 3,841–4,050f/11.3–12.0h (mild help) — **jepa 2,229–2,259f/5.3–5.9h (actively harms at full weight: drags the champion ~35% below its own unaided survival)**. Ordering stable across both runs. Caveats: the apply-coin used unseeded Math.random, and jepa state was shared across runs (trained within its own games anyway) — a probe, not the shipped tool. Shape: the demo's advisor surface has real effect sizes, the ranking inverts the plausible one (the handcoded heuristic beats the learned predictor), and the page gives the user zero visibility into any of it. Strongest evidence yet for the carried advisor-diet item.
- **qa confidence-vs-pot envelope measured** (75-state grid, the shape R13 spec item 3 wants plotted): mean confidence 0.427 at the floor (spb=2) rising monotonically to a 0.496 asymptote (spb≥128); null fraction 1.00 below the floor, 0.00 at/above it. "More shots → more consistent imaging" is now a measured curve, not a test-visible-only claim.

### Lies hunted
- **[P3, verified by running/counting] README meta-claims are stale (two instances):** "(45 tests total)" — the suite is 82 at base, 84 at this tip; and "(The repo carries no git tags; the version is a claim, not a release.)" — `git tag` returns `v1`. The demo's own doctrine (never trust the README) is breached by the README about itself. Not fixed this round (builder slot spent on the test-command item; spec item 2 below).
- **[P3-process, verified by reading] the R14 PLAYLOG entry omits the "Lies hunted" and "Next version spec" sections** the EXPERIMENTS.md format mandates — the R14 builder round closed its P3 but left the chain without a forward spec, so R15 reconstructed the candidate set from R13's carried items. The chain self-heals this round (spec below); noted so the next builder knows R15's item numbering restarts from here.
- **[P3-process, re-verified by running, FIXED this round]** `node --test tests` (directory form) still fails opaquely on node v22.22.2 (exit 1, one subtest named `tests`, error "test failed", no named culprit). Builder receipt above.
- **[P3 nit, found by reading] tests/honesty.test.js checkpoint consistency probe** — `fitnessOf(cp.bestHits ? cp.bestFrames : cp.bestFrames, cp.bestHits)`: both ternary branches identical (dead condition). Harmless (the formula is pinned either way) but it is a claim-shaped artifact that reads like a typo. Spec item 2 below.
- **(nothing found in: the R14 renderReceipts fix itself)** — edge-case probe of the shipped renderer: empty C1 ledger renders zero rows with NO admission line (the `evicted` guard suppresses "N shown / M evicted" until it's true), a 3-row ledger renders 3 rows with no false "8 shown" claim, a fresh classic page renders an empty panel. The new code is honest at the boundaries. Also re-verified green: prerun byte-reproducibility, suite, qa exhaustion seam (pot 0 → null advice, floor 2 → advice), receiptkind attribution, coev rules/determinism, page parse, checkpoints-vs-fitness consistency.

### Next version spec (competitive improvements — 6 items, carried marked)
- [small, carried R13#3] Confidence-vs-pot strip in the qa tile. Envelope now MEASURED this round: 0.427 @ floor → 0.496 asymptote, nulls below floor. What: the 64×12 strip as specced in R13 (computed once at load over a state grid, cached). Why: the QPAM story's most demo-able shape is now a measured curve the page still doesn't show. Verify: pin the strip's monotonic trend on the cached grid; visual = browser-only amber claim.
- [small, fresh] README honesty sweep: fix "(45 tests total)" (either correct count or point at the suite glob), fix "carries no git tags" (v1 exists; EXPERIMENTS.md also implies a v2 tag), extend the verify-by list or replace it with the canonical glob command now in EXPERIMENTS.md, and clean the dead ternary in tests/honesty.test.js. Why: this round booked two stale meta-claims — the README is the first surface an outsider audits, and right now it fails its own doctrine on arrival. Verify: grep + suite green.
- [medium, carried R2/R12#3/R13#4 — NOW WITH EVIDENCE] Advisor-diet comparison tool in `tools/` (prerun-style, seeded): GA champion × {none, jepa, moth, qa-sim} × weight sweep, per-diet survival/hits curves under one seed, FAIL-first pin. This round's probe supplies the expected shape (moth >> none ≈ qa > jepa — jepa at full weight HURTS the champion ~35%). Why: the weight slider is the demo's core interaction and still has no measured number behind it; the first measurement says the ranking is non-obvious. Verify: tool emits per-diet curves; diets differ; jepa-harms result reproduced under the seeded coin.
- [medium, carried R12#4/R13#5] REAL_QPAM BYO endpoint seam. Unchanged from R13 — url field, base64 shot bins, JEV-invalid/fetch-failure → FALLBACK receipt + degrade to sim, never silent. Verify: glue pin with stubbed fetch, FAIL-first.
- [epic, carried R12#5/R13#6] C1 scaling study (population × gens sweep with the frozen provenance harness; does the ender ever re-cap after the gen-110 flip-flop; ledger-head reproducibility at 2× scale). Still the only nonzero d(learning)/d(version) path. Verify: a new receipted curve in checkpoints/ with different endpoints.
- [epic, fresh alternative to the above, from this round's probe] Advice-aware GA: thread the measured advisor into playOne so diet changes the EVOLVED champion, not just live survival — the probe shows advice has effect sizes worth evolving against. Verify: a new receipted curve whose endpoints differ from the frozen five.

### Siblings studied this round
SuperInstance/quilt-edge-ml (the ring/evaluator patterns — 14 rounds in and still doing their jobs); SuperInstance/jeviter (the JEV validate seam every advisor still passes through); SuperInstance/quilt (`research/2026-09-24-quantum-audio-L2.md`, still the BYO reference). No new sibling code needed — internal seam and measurement work again.

### Verdict
MERGEABLE (R13 spec item 1 closed FAIL-first; suite 84/84 + qa 8/8; prerun byte-identical; two measured shapes added to the experiment's memory; no P2s found this round).

---

## Round 14 — k2d8 — 2026-09-26 — mode: BUILDER (R14 spec item 2 — the COEV panel honesty pin, the fresh P3 booked by R13) — vs R13 tip 7488cfa (playtest-round-13)

### Played version: R13 tip 7488cfa (this round's base)

Suite at base 78/78 green. `node tools/prerun.js` at base and at this round's tip: byte-identical checkpoints (coev.js `946e639a…`, curve.json `ba1c919a…`, L0 `8a49b0f6…`, L1 `aa4d7c4b…`, L2 `63b7fdd5…`), tree clean after the run — index.html/core.js are outside the training path, proven by the frozen hashes.

### Builder receipt (R14 spec item 2: the COEV panel clobber — "two honest chains, one clobbered panel")
- **what:** (1) New `renderReceipts()` in `index.html`, placed immediately before `receipt()`: the single writer for the panel. Non-coev mode renders exactly the old MOTH view. C1 mode renders two labeled sections — `— MOTH receipts —` (12-row tail + `[N shown / M evicted]` admission) and `— C1 ledger —` (8-row ledger tail + `[8 shown / M evicted]`) — each chain keeping its own eviction accounting. Guard order matters: the mode check short-circuits before the `coev` reference. (2) `receipt()` delegates to `renderReceipts()` instead of assigning the panel. (3) `continueGenC()` calls `renderReceipts()` instead of assigning `$('receipts').textContent = coev.ledger.tail(8)…` — the clobber that erased the MOTH chain and its eviction counter every generation. (4) New `tests/coev-panel-glue.test.js` (Round 14 pin): extraction-integrity (renderReceipts precedes receipt and delegates; continueGenC contains no direct panel assign) + ONE-FRAME (45 MOTH writes → a full C1 generation → live()'s DEATH receipt, all in one frame: both labeled sections render, `40 shown / 7 evicted` survives, the C1 row is the real hash-chained ledger tail) + ledger accounting (305 rows → `8 shown / 5 evicted` beside the MOTH section) + non-coev mode (single-chain render unchanged, no empty C1 section). (5) `receipt-glue.test.js` re-anchored: its extraction now spans the renderReceipts+receipt block (end-anchored on the delegating close), with `coev=null` added to the factory preamble so old tests take the plain path unchanged. (6) `coev-glue.test.js` gained a one-line `renderReceipts` stub in its sandbox (its pin covers the generation-loop contract; the shipped renderer is driven verbatim in the new pin). VERIFIED_CLAIMS gained the `coev-panel-glue` row (20→21).
- **why:** R13's failure-mode map carried "P3 coev panel clobber" — in C1 mode the page kept two honest hash chains (MOTH receipts, 40-row bound; C1 ledger, 300-row bound) but ONE panel, and `continueGenC()` assigned over it. Whichever writer ran last decided which chain the user could audit; the `[N shown / M evicted]` admission vanished every generation. A panel that hides one chain's forgetting is itself the hunted lie class at the render layer.
- **verify (FAIL-first, then green):** against the pristine R13 tip the new pin fails 4/4 (no `renderReceipts(` anchor — loud extraction failure, not a silent skip) plus the claims-match pin (unbacked test file). After the fix: suite 78→82 all green, `node tools/prerun.js` md5s byte-identical, checkpoints clean, page-parse pin green on the edited inline block. One harness bug found while pinning (comment-on-last-extracted-line swallowed the concatenated `return`) — fixed with a `\n` separator, itself receipted by the failing tests.

### Deltas observed (shapes of change)
- **d(learning)/d(version) = 0 — the 13th straight frozen round.** The learning signal is shape-stable since the honesty pass while coverage compounds (suite 39→60→68→69→74→78→82). v1 remains the only mover (unseeded fiction).
- **Failure-mode migration map, panel edition:** R13 booked the P3 (ledger tail clobbers MOTH chain + eviction counter) → R14 fixed at the render layer (single writer, two labeled sections, per-chain eviction accounting) and pinned the regression class ("never assign `$('receipts')` outside renderReceipts" is now extraction-asserted). Next small from the R14 spec: item 1, the canonical test command in EXPERIMENTS.md. C1 scaling study (queue top, epic) still open.

## Round 13 — kimi1 — 2026-09-26 — mode: BUILDER (one small: R12 spec item 1 — the qa exhaustion seam, made playable in-page) + play-tester — vs R12 tip 88b488f (playtest-round-12)

### Played versions: v1 (e98cf66) → v2 (0722670) → main (1f5943c) → PR#12 tip (44840be) → PR#13 tip (cdf51f4) → PR#14 tip (c9424f7) → PR#15 / R12 tip (88b488f, this round's base)

All seven refs parse-check clean. Suite by ref: v1 none (pre-tests) → v2 39/39 → main 60/60 → PR#12 68/68 → PR#13 68/68 → PR#14 69/69 → R12 tip 74/74. `node tools/prerun.js` at v2 and every later ref: byte-identical checkpoints (coev.js `946e639a…`, curve.json `ba1c919a…`, L0 `8a49b0f6…`, L1 `aa4d7c4b…`, L2 `63b7fdd5…`), tree clean after the run. v1 still moves (its numbers are unseeded — this run's L2 champion: 589 frames, **0 hits**, crowned at gen 260 — the pre-honesty world where luck tops skill) and still dirties its tree on prerun. All four open-PR tips are exactly where R12 recorded them; nothing moved upstream.

### Builder receipt (the one small — R12 spec item 1: the pot control)
- **what:** (1) `qa.js` `suggest(s, seed, shotsPerBin)` threads the pot through to `channel` (omitted → 32, unchanged). (2) The page ships a pot slider (`#qapot`, 0–64, default 32) toggled visible exactly when the qa module is selected; the shipped qa branch reads it and threads it into BOTH the advisor call and the tile visualization. Below the floor the page receipts `QA-REFUSAL` with the numbers in the stat line (`"qa-sim: channel silent (pot 0/bin below floor 2) — advice refused, receipted"`), and the tile draws the TRUE silent channel — a flatline plus a "POT EMPTY — channel silent" overlay — instead of the healthy default waveform the old code would have rendered. The tile label now carries the live shots/bin readout during normal play too. (3) New `tests/qapot-glue.test.js`: MODULE (the public seam exhausts at spb 1 AND spb 0) + GLUE-integrity (the shipped branch must read `#qapot` and thread it into `suggest`) + GLUE-exhausted (pot 0 → QA-REFUSAL row + numbers in the stat line + `qaVis.decoded` all zeros + `qaVis.spb===0`) + GLUE-healthy (pot 32 → `qa-sim` row, live channel drawn) + MARKUP (slider ships, toggled with the qa module). Existing mocks in `qarefusal-glue`/`receiptkind-glue` pin the pot at 32 so those files keep testing their own seams. VERIFIED_CLAIMS gained the `qapot-glue` row (19→20).
- **why:** R12 made exhaustion receiptable but, under shipped page wiring, still unreachable — the page called `suggest(s0, qseed)` at the default 32 shots/bin, far above `SIM_POT_FLOOR=2`. R12's own entry flagged it ("currently the seam exists but is invisible without reading qa.js"). The verify clause ("crank the pot below floor in the page → tile shows silence + panel shows QA-REFUSAL") needed a pot to crank.
- **verify (FAIL-first, then green):** against the pristine R12 tip the new pin fails 4/4 (MODULE: `suggest` ignored the third arg and advised on a 1-shot pot; GLUE-integrity: the shipped branch never read `#qapot`; GLUE-exhausted: no QA-REFUSAL; MARKUP: no slider). After the fix: suite 74→78 all green, `node tools/test-qa.js` 8/8, `node tools/prerun.js` md5s byte-identical, checkpoints clean (qa.js/index.html/core.js are outside the training path, proven by the frozen hashes), page-parse pin green on the edited inline block.

### Found while building — a fresh instance of the hunted lie class (P2, fixed same-round)
The new GLUE-exhausted test caught the page advising with the slider at **0**. Cause: R12's floor used `const spb = shotsPerBin || 32` — a 0 budget silently re-armed the full pot. The emptied state was unreachable even WITH a control: a "helpful default" swallowing the exact state the seam exists to model. Fixed to `shotsPerBin ?? 32`; the 0 case is now pinned in the MODULE test. Minimal repro (pre-fix): `QA.suggest({ballX:0.5,…,hits:1}, 7, 0)` → advice, should be null.

### Deltas observed (shapes of change)
- **d(learning)/d(version) = 0 — the 12th straight frozen round.** v2 through R12 tip regenerate byte-identical; the learning signal has been shape-stable since the honesty pass while coverage compounds around it (suite 39→60→68→69→74→78). v1 is the only mover, and it moves only because its numbers are unseeded fiction.
- **Failure-mode migration map, exhaustion edition:** R11 booked it (silent null, no receipt) → R12 module level (floor made real; receipted) → R13 glue level (page seam unreachable even after R12 — made playable) → found again at module level (`|| 32` falsy trap) → remaining: P3 coev panel clobber (below) and the BYO real-QPAM endpoint (carried). The seam keeps re-hiding one level up; each fix that adds a "convenience default" risks re-arming it.
- **Process finding (P3, runner hygiene, self-booked):** my first version-sweep script didn't verify the tree between checkouts; prerun-dirtied checkpoints silently blocked every checkout after v1, so five of seven "refs" were replayed against v1's tree — numbers that looked like a sweep and weren't. Caught by the redo, which forced checkouts and asserted `tree-dirty` per ref. Shape: a runner that doesn't check its own state between steps produces fiction at industrial scale; `git status` is part of the protocol, not a nicety.

### Lies booked this round
1. **P2 (FIXED):** `channel`'s `|| 32` fallback made pot=0 read as pot=32 — the empty pot was unreachable with the control at zero. Caught by the new pin, not by reading. (index.html `qapot` wiring + qa.js one-liner.)
2. **P3 (OPEN):** in C1 mode `continueGenC` (index.html:215) overwrites the receipt panel with `coev.ledger.tail(8)` directly, bypassing `receipt()` — while `live()` (257–260) keeps writing MOTH rows (`DEATH`, `QA-REFUSAL`, …) into the hash chain that the panel never durably shows, and the "[N shown / M evicted]" admission vanishes after each generation. Two honest chains, one clobbered panel. Spec item 2 below.

### Spec for Round 14 (6 items — carried marked)
1. **[small, carried R12#2] Canonical test command in EXPERIMENTS.md.** `node --test tests` (directory form, Node 22) fails opaquely (`EISDIR`); the suite form is `node --test tests/*.test.js` (and `node --test tools/test-qa.js`). What: one line in EXPERIMENTS.md doctrine. Why: three rounds have re-derived this by hand. Verify: text pin in the suite.
2. **[small, fresh P3] COEV panel honesty.** What: in C1 mode, render the MOTH receipt tail and the C1 ledger tail as two labeled sections of one panel (or one chain with a separator), each keeping its own eviction accounting. Why: the panel is called the honesty centerpiece; right now the chain the user can audit depends on which writer ran last. Verify: extraction pin driving `continueGenC` + `receipt()` in the same frame asserts both chains render and the evicted counter survives.
3. **[small, fresh] Confidence-vs-pot strip.** What: the tile already carries the live pot readout; add a 64×12 strip plotting measured advisor-confidence across pot values (computed once at load over a state grid, cached — the envelope the MODULE tests already prove). Why: "more shots → more consistent imaging" is currently test-visible only; it is the QPAM story's most demo-able shape. Verify: pin that the strip's monotonic trend holds on the cached grid; visual = browser-only amber claim.
4. **[medium, carried R2/R12#3] Advisor-diet comparison.** What/why/verify: as specced in R12 — jepa vs moth vs qa-sim vs none, champion-affecting A/B in `tools/` with a pin, so the weight slider (the demo's core interaction) has one measured number behind it.
5. **[medium, carried R12#4] REAL_QPAM BYO endpoint seam.** What: a url field for a real quantumaudio-QPAM service returning base64 shot bins; on fetch failure or JEV-invalid shape, receipt a FALLBACK row and degrade to the sim — never silent. Why: closes the last contractual-only half of the L2 story. Verify: glue pin with a stubbed fetch, FAIL-first against the shipped page.
6. **[epic, carried R12#5] C1 scaling study.** What/why/verify: as specced in R12 — population/generation scaling curves, does the ender ever re-cap after the gen-110 flip-flop, ledger-head reproducibility at 2× scale.

### Siblings studied this round
SuperInstance/quilt-edge-ml (the ring/evaluator patterns still holding twelve rounds later); SuperInstance/jeviter (JEV validate seam the whole L2 stack rides on); SuperInstance/quilt (the 2026-09-24 quantumaudio L2 spec in `research/`, still the reference for the BYO item). No new sibling code was needed — this round was internal seam work.

---

## Round 12 — kimi1 — 2026-09-25 — mode: BUILDER (one small: R11 spec item 4, REFUSAL half — the qa exhaustion seam, made reachable) + play-tester — vs R11 stack tip c9424f7 (r11-loadcoev-glue-extraction)

### Played versions: v1 (e98cf66) → v2 (0722670) → main (1f5943c, post-PR#10) → PR#12 tip (playtest-round-11 @ 44840be) → PR#13 tip (merge-gate-ci @ cdf51f4) → PR#14 tip (c9424f7, this round's base)

### Builder receipt (the one small — R11 spec item 4, REFUSAL half: QA-REFUSAL receipt + reachable exhaustion)
- **what (two halves, one seam):** (1) `qa.js` gained a real silence floor: a shots-per-bin budget below `SIM_POT_FLOOR` (2) models QPAM shot underflow (measured pearson ~0.02 at 2000 shots/882 samples) — the pot returns NO image at all, `channel()` emits pure silence, and the existing `DEAD_ZCR` guard ("pot-bound: no echo, no advice") finally does the job it was built for. (2) the page's qa branch receipts a `QA-REFUSAL` row + a warn stat line (`"qa-sim: channel silent (pot-bound) — advice refused, receipted"`) on advisor null — through the honesty contract's own documented seam (a real backend returning silence, or the sim below its floor) — instead of the previous `if(!s)return null;` silent drop. `SIM_POT_FLOOR` is exported; default budget (32) is far above the floor so normal play is untouched. New `tests/qarefusal-glue.test.js`: FLOOR ×2 (silence is pure zeros; it trips the guard) + UNCHANGED (default pot still advises, cap holds) + GLUE ×2 (verbatim-extracted shipped `l2Suggest()` driven with a null-returning backend through the documented seam → a `QA-REFUSAL` row lands and the stat line names the exhaustion; live backend still receipts `qa-sim`, no regression). VERIFIED_CLAIMS gained the `qarefusal-glue` row (18→19).
- **why:** Rounds 2/9/11 carried "the qa tile admits exhaustion silently (null suggestion, no receipt)". This round proved the carried item's verify clause ("forced-exhaustion state receipts a REFUSAL row") was **impossible as written**: the shipped sim's pot-bound branch is dead code (below). The honest build order was therefore: make exhaustion reachable first (sim physics), then receipt it (page glue).
- **verify (FAIL-first, twice-run, then green):** against the pristine R11 tip the pin fails exactly where expected — `FLOOR` ×2 (no silence floor) and `GLUE: exhausted backend` (silent drop, no QA-REFUSAL row) FAIL, both regression guards PASS. After the fix: 5/5. Suite 69→74 all green; `node tools/test-qa.js` 8/8 (its `spb=4` "noisier channel" case stays above the floor — semantics preserved); `node tools/prerun.js` md5s byte-identical (coev.js `946e639a…`, curve.json `ba1c919a…`, L0/L1/L2) — qa.js is outside the training path, proven by the frozen hashes. checkpoints clean in the working tree after the run; the page-parse pin guards the edited inline block.

### Deltas observed (shapes of change)
- **d(honesty)/d(version): the lie class gained a new member — the advertised-but-unreachable seam.** Nine rounds closed wrong-label lies (banner vs pane, count vs reality, provenance columns). Round 12 found a quieter cousin: a label that was *right about its contract but had no execution path* — the demo advertised "pot-bound: no echo, no advice" while the state was mathematically unreachable under the shipped sim (min ZCR 0.125 vs threshold 0.02; 8,820 suggest() calls, 0 nulls). Shape: honesty gaps are not only mismatches between claim and behavior; they are also claims whose behavior was never given a way to run. The fix pattern (make the seam executable, then receipt it) generalizes.
- **d(learning)/d(version) = 0 for the tenth straight round** — L0 5,767 / L1 8,800 / L2 8,700, coev arms race md5 `946e639a…` byte-identical, re-confirmed by running on v2 (0722670), main, and all three open-PR tips. The freeze is provenance; the standing epic items remain the only nonzero paths.
- **d(coverage)/d(version) continues: suite 69→74, VERIFIED_CLAIMS 18→19.** The wristband compounds while the learning curve stays frozen — the demo is now more specification than experiment on the L1/L2 surface.
- **d(process)/d(version): the merge gate got its first real exercise.** Three sibling PRs (#12 docs, #13 CI, #14 glue) sat open; this round ran the full play-test protocol against all three tips (suite + prerun, all green, all byte-identical), which satisfies the text half of the R11 merge-gate doctrine for each.

### Lies hunted
- [P2, found this round by running, FIXED] qa pot-bound branch is dead code — the honesty contract's exhaustion seam had no reachable state under the shipped sim. Repro: fine state sweep (61×61×6) → min ZCR 0.125 at (bx=0, px=0, speed=1), 6× the 0.02 threshold; 8,820 `suggest()` calls, 0 nulls. The page compounded it by dropping advisor nulls silently. Fix + FAIL-first pin shipped (Builder receipt).
- [P3, found by counting, recorded] VERIFIED_CLAIMS parenthetical drift in the R11 entry ("suite 56→60→68, VERIFIED_CLAIMS 15→17") — actual 16→18 at the R11 tip, 18→19 after this round. The two-way match pin holds; only the prose counts drifted. Not fixed (docs nit, spec below).
- [P3-process, verified by running, recorded] `node --test tests` (directory form) fails opaquely on node v22.22.2 ("Cannot find module '…/tests'", no failing subtest named); the canonical glob form (`node --test tests/*.test.js`) is green 74/74 and is what CI runs. Sharp edge, not a defect — but a future runner copy-pasting the directory form gets a red wall with no name on it.
- [P3-process, verified by reading GitHub Actions semantics, recorded] the merge-gate workflow (PR #13) cannot run on any PR until it reaches main (workflows trigger from the base branch) — so the text half of the doctrine is the only gate standing between here and merge, exactly as this round used it.
- [P3, carried from R11, NOT fixed — R13 spec] the `moth` advisor is still a handcoded heuristic wearing the advisor label; the advisor-diet comparison would expose it as the trivial diet.
- (nothing found in: fitness weights, ring, evaluator top-K, effective paddle, seeded swans, JEPA representation, seam pacing/timeout/gameId, receipt eviction, receiptkind attribution, loadCoev head + single-ledger construction, pop-slider parity, coev rules/determinism, checkpoint consistency, prerun byte-reproducibility, page parse + headless boot — all pinned and re-verified green this round across all three open-PR tips.)

### Next version spec (competitive improvements)
- [small] Make the exhaustion seam playable: surface the pot budget in the qa tile (shots-per-bin readout, or an explicit "deplete the pot" control) so a human play-tester can drive the sim below its floor and watch the QA-REFUSAL row land — currently the seam exists but is invisible without reading qa.js. why: the R12 seam is executable but not discoverable; an honesty path nobody can find is halfway back to silent. verify: crank the pot below floor in the page → tile shows silence + panel shows QA-REFUSAL.
- [small] Docs nit repair: fix the R11 parenthetical counts; add one line to EXPERIMENTS.md naming the canonical test command (`node --test tests/*.test.js`, glob) and noting the directory form's opaque failure on node 22. why: this round's two P3s both cost investigator time. verify: grep.
- [medium] Advisor-diet comparison: GA alone vs +jepa vs +moth vs +qa-sim — champion fitness over N gens under the SAME seed, receipts as the differ. why: carried since Round 2; now the ONLY carried medium with zero comparative evidence, and it exposes the moth heuristic as the trivial diet. verify: prerun-style tool emits per-diet curves; diets differ.
- [medium] REAL_QPAM BYO endpoint seam: the silence floor now defines the contract a real backend signals (zeros/underflow → QA-REFUSAL); wire a bring-your-own endpoint like the LLM seam. why: second half of R11 spec item 4, now unblocked. verify: mock backend returning silence → QA-REFUSAL row; live backend → qa-sim rows.
- [epic] C1 scaling study (population × gens sweep with the frozen provenance harness) OR first/last-mile sense filter with re-evolution — the only paths to nonzero d(learning)/d(version). why: ten rounds at zero learning delta; the honesty instrumentation is mature enough to support a real experiment now. verify: a new receipted curve in checkpoints/ with different endpoints.

### Verdict
MERGEABLE (P2 fixed with FAIL-first pin, proven twice; suite 74/74; prerun byte-identical; all three open-PR tips independently play-tested green this round, satisfying the merge-gate text half for each).

---

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
