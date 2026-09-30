# EXPERIMENTS — the play-test loop IS the product

This repo is run like an open experiment. Each round: a **play-tester agent**
(scientist persona) plays the current version, records deltas against the last
few versions, and specifies **competitive improvements** for the next. A
**builder agent** implements the next version to satisfy the spec. The GAN
structure: play-testers are the *discriminator* (they hunt confusion, boredom,
dishonesty, failure), builders are the *generator* (next version must fool the
discriminator into a smooth, compelling learning experience). Versions advance
by adversarial rounds. The process is the product; PLAYLOG.md is its memory.

## Scientist protocol (every play-tester round)

1. **Run it.** `node tools/prerun.js` (core math, real numbers), read
   `index.html`, `core.js`. Where possible drive the demo headless (jsdom or a
   browser). Never trust the README — verify claims by running.
   Canonical suite command: **`node --test tests/*.test.js`** (glob form), plus
   `node --test tools/test-qa.js` for the QPAM stand-in. Do NOT use the bare
   directory form `node --test tests` — on Node 22 it fails opaquely
   (one failing subtest named `tests`, error "test failed", no culprit named).
2. **Play the last few versions.** `git log --oneline` + tags (`v1`, `v2`…).
   Check out or reconstruct the last 2–3 versions; note what each changed.
3. **Record the delta as SHAPE, not just content.** The point is
   *calculus-like understanding*: where did the learning curve move, which
   failure modes migrated, what is d(learning)/d(version)? Did the shape of
   improvement change (faster convergence, new failure mode appearing,
   difficulty cliff smoothing)?
4. **Hunt the demo's lies.** Anything simulated, hardcoded, or smoothed?
   Any claim the code can't cash? Any UI that hides failure? Book every find
   with severity and a minimal repro. Fabrication = disqualification.
5. **Specify the next version.** 3–7 competitive improvements, each with:
   what, why (which observed delta it addresses), how to verify. Sized:
   small / medium / epic. The builder may only claim a version bump when
   every small+medium item passes its verification.
6. **Leave a receipt.** Append your round to PLAYLOG.md in the format below,
   commit on a branch, PR. Rows are the experiment's hash-chained memory —
   the meta-demo: a repo that learns in public, receipted.

## PLAYLOG entry format

```
## Round N — <agent-name> — <date> — vs v<last-version>
### Played versions: v<a>, v<b>, v<c>
### Deltas observed (shapes of change)
- <what moved, in learning/failure/UX terms>
### Lies hunted
- [severity] <finding> — repro: <minimal steps> — (none found = say so)
### Next version spec (competitive improvements)
- [size] <what> — why: <delta it addresses> — verify: <how>
### Verdict
<MERGEABLE / NOT MERGEABLE / verdict links>
```

## Rules

- **Honest REFUSAL over polite approval.** A play-tester who finds nothing
  real says "nothing found" in one line — silence is abstention, not restraint.
- **Numbers verified by running.** Every fitness figure, every timing, every
  "converges" claim gets a command that produces it.
- **BRANCH + PR, never main.** Commit identity: the acting agent.
- **Merge gate.** A sibling PR may not merge without either one play-test
  round run against it, or the page-parse pin (`node --test tests/*.test.js`,
  canary: the page-parse glue) running green on its tip. Rationale: the R7→R8
  P0 (a merge that bypassed the loop shipped a dead `draw()`) existed only
  because a merge bypassed the loop; a pin that never runs is decoration, so
  this rule is the text half and the CI workflow is the enforcement half.
- **Canonical artifact hashes are line-specific — verify by running, never by
  copying.** PLAYLOG entries carry md5s of `node tools/prerun.js` artifacts
  (coev.js, curve.json, level0/1/2), but those hashes regenerate differently
  on different lines: the **post-R21 line** (any tip descending from the R21
  quantum-coin merge) regenerates curve `63617065…`, L0 `8a49b0f6…`,
  L1 `643bd132…`, L2 `454511548…`, coev `946e639a…`; the **pre-R21 line**
  (main before that merge) regenerates curve `ba1c919a…`, L0 `8a49b0f6…`,
  L1 `aa4d7c4b…`, L2 `63b7fdd5…`. Copying a hash from an old entry onto a new
  line produces a phantom mismatch (the R22 P3-process lie). The source of
  truth is a clean run at the tip you are testing — `node tools/prerun.js`,
  then read the md5s it actually printed.
- **The post-R42 line** (R42 re-embed after the R41 maxSpeed-honesty metric
  change): curve `63617065…`, L0 `8a49b0f6…`, L1 `cf08b000…`, L2 `c8ba57db…`,
  coev `946e639a…`. Only L1/L2 moved, and only at the embedded `maxSpeed`
  field (3.400 → 3.497 / 3.476, the moved-at values under R41 semantics);
  the trained populations are byte-identical to the post-R21 line (verified by
  field-by-field parse, R42). The R42 pin (`tests/artifact-maxspeed-lineage.test.js`)
  holds this line: any future metric-semantics change that re-drifts the
  artifacts trips it and forces a declared re-embed — never silent drift.
- **The post-R50 line** (R50 escalation re-embed — hitBoost revived in the speed
  law + `accel·frames²` + shrinking paddle + growing decision interval): curve
  `f9b20e7d…`, L0 `bc15d414…`, L1 `1125d59c…`, L2 `50137ceb…`, coev `946e639a…`
  (**byte-identical to the post-R21 line** — escalation defaults are inert at
  coev horizons: no coev game lives long enough for shrink to flip an outcome
  and no seeded swan draw crosses either probability threshold differently).
  L1/L2 `maxSpeed` fields move to **4.443 / 3.411** (moved-at values under the
  R50 law; real hitBoost compounding + accel raise the ceiling honestly). The
  curve's tie journal collapses from 182 flips / 89 swaps to **5 flips / 3
  swaps** — escalation spreads fitness values, so generations almost never tie
  exactly. The R42 pin now anchors this line; any future re-drift trips it.
- **Provenance is a chained receipt, not a promise (Round 37).** Every
  `node tools/prerun.js` run ends by sealing the four artifacts it just
  wrote into `checkpoints/stone-v1.json` — a stone-v1 forward chain
  (SuperInstance/quilt-stone stone.mjs, STONE-SPEC.md §4.6) whose rows
  carry `{file, md5}`, verified BEFORE it is written (offline mirror, plus
  quilt-stone's own `verifyChain` live when `QUILT_STONE_DIR` names a
  checkout) and refused loudly (exit 1) on any mismatch. The seal is not a
  sixth canonical artifact — it is the receipt over the four artifacts
  prerun itself writes (coev.js belongs to `tools/prerun-coev.js`'s own
  lane), so it is dropped before the provenance loop and never appears in
  that loop's md5 list. The sealed four are the same post-R21 set above; a
  changed lineage re-emits the seal on the next run, and a seal whose md5s
  do not match the files it names fails verification instead of passing
  silently.
- **The C1 birth ledger is receipted at birth too (Round 45).** Every
  `node tools/prerun-coev.js` run ends by sealing the ledger rows it just
  wrote — the 121 hash-chained head-to-head rows behind
  `checkpoints/coev.js` — into `checkpoints/coev-stone-v1.json`, the same
  stone-v1 dialect, verified BEFORE write (mirror first, quilt-stone live
  when named) and refused loudly on mismatch. That seal is also a receipt,
  not a new training artifact: the canonical training set remains the same
  five files, and the C1 receipt covers the birth rows that make the fifth
  file reproducible.
- **PLAYLOG merge hygiene (Round 63 lesson; R63 mandate item 4 / R64 spec
  item 5, second asking, shipped R65).** After ANY merge that touches
  `PLAYLOG.md`, `grep -n '^<{7}\|^={7}\|^>{7}' PLAYLOG.md` must come back
  EMPTY before push. The R61-merge conflict resolution shipped literal
  `<<<<<<<`/`=======`/`>>>>>>>` markers inside PLAYLOG.md entries and they
  survived two rounds invisible to every existing pin (R63 P0). The
  structural pin is `tests/r65-conflict-marker-glue.test.js` (every tracked
  `.md`/`.js`/`.html` scanned at line-start for all three marker species);
  this checklist line is the process half — the grep runs at merge time,
  before the pin ever has to catch you.
- **The process is the product.** A beautiful demo with a dead loop is a
  cathedral; a humble demo with a living experiment chain is a shed that
  breeds. We build sheds that breed.
