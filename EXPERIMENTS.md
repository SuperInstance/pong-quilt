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
- **The process is the product.** A beautiful demo with a dead loop is a
  cathedral; a humble demo with a living experiment chain is a shed that
  breeds. We build sheds that breed.
