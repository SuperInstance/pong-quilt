# pong-quilt — ML you can watch think

Web-native, zero-dependency machine-learning demonstration. Open `index.html`
(works from `file://` or any static server). No build step, no libraries, no
uploads. **Not a simulation — the training is real computation in your browser.**

**Version: v2** (Round 3). All Round-2 small+medium items are now shipped and
node-pinned; the deltas are listed per claim in the wristband section below.
(git tag shows `v1`; the v2 claim in the header has no tag — the version
is a claim, not a release.)

## Level 1 — real learning, visible cells

- A tiny neural net (6→10→3, tanh) plays Pong as a **genetic algorithm**:
  a population plays lives, the fittest breed, mutation does the rest.
- **Fitness is honest (Round 3):** `fitness = frames + hits×100`
  (`PQ.HIT_WEIGHT`). Under the old ×25 a champion that survived the 6,000-frame
  cap with zero hits outscored any hitter that died before frame 5,725 — luck
  topped skill. Under ×100 a capped 0-hit survivor (6,000) always loses to a
  net with 1 hit that survived past frame 5,900. The stats line also flags
  0-hit luck champions with a ⚠ badge (`PQ.formatStats`). Checkpoints were
  re-evolved under the new weights (numbers below; the regression is
  intentional and now unpossible).
- **The drawn paddle IS the registered hitbox (Round 3).** Registration always
  covered `px−0.02 … px+0.18` (a 0.20-wide zone); the drawing showed a
  0.16-wide bar — a 12.5% ghost margin on each side. `PQ.effectivePaddle(px)`
  is now the single source of truth for the draw, the death check, and the
  coevolution physics, and the browser paints exactly that zone.
- **Projection cells** (the right-hand strip) show the granular state vector
  the net sees: ball position, velocity, intercept pressure, speed, and the
  red **decision countdown** — the agent only acts every *N* frames. That is
  the speed-of-action limit.
- **The speed ramp forces planning.** Ball velocity grows with survival time;
  the decision interval stays fixed. Tracking fails at high speed — the only
  winning strategy is projecting the intercept *ahead*, which the GA discovers
  because nets that plan survive longer and breed. *(Correction, Round 3: the
  README used to claim velocity also grows per hit. `step()` recomputes
  `speedMul = 1 + frames·ramp` after every hit-boost multiplication, so the
  per-hit boost is dead code in the classic lineage — the claim outran the
  code. C1 coevolution makes boosts real via an accumulator; see below.)*
- **Black swans:** per-frame random angle kicks, probability scaling with
  speed, drawn from the rng threaded into `step/playOne` — seeded everywhere.
  Even a perfect tracker dies to chance eventually — checkmate is stochastic,
  and the fitness curve says so.
- **Scaling, both axes, user-visible:** *games-at-once* = population size
  (horizontal), *gens/frame* = vertical. The games counter climbs live.

### Real starting states (the quilt you pick up)

`tools/prerun.js` evolves checkpoints with the **same core** the browser runs
(`node tools/prerun.js`; verified on Node v22, byte-reproducible — same
`DEFAULTS.seed` → identical checkpoint bytes, md5-verified across runs; the
script prints the md5 of every emitted file):

| Level | Gen | Best fitness | Frames | Hits | Max speed |
|-------|-----|-------------|--------|------|-----------|
| L0 random | 0 | 1,890 | 1,690 | 2 | ×4.06 |
| L1 mid-training | 60 | 2,010 | 1,810 | 2 | ×4.44 |
| L2 trained | 260 | 1,753 | 1,453 | 3 | ×3.41 |

Reproduce any row: `node tools/prerun.js` (≈40 s) regenerates all three levels
plus `checkpoints/curve.json` and prints their md5s. Current artifacts:
`level0.js bc15d414…`, `level1.js 1125d59c…`, `level2.js 50137ceb…`,
`curve.json f9b20e7d…` (the post-R50 line; EXPERIMENTS.md keeps the earlier lines)

Two honest notes on the shape: **L1 > L2** under the new weights — the
gen-60 champion survived 1,810 frames where the gen-260 one managed 1,453,
and 357 extra frames outweigh one fewer hit (each hit = 100 frames).
Non-monotonicity is the artifact, not the embarrassment. And under ×100 at
these horizons fitness is survival-dominated: none of the three champions
reaches the 6,000-frame cap (longest 1,810), so the strip is frames-shaped —
it climbs as survival improves and hits are incidental (2, 2, 3 across the
three levels). Loading a level and pressing Train
continues real evolution from that population.

## Wristband — verified claims (Round 3)

The demo renders a wristband panel from a single registry in `core.js`
(`PQ.VERIFIED_CLAIMS`). Green = the claim has a node-pinned proof; amber =
browser-only, admitted as such. `tests/honesty.test.js` pins the two-way match:
every claim's `proofTest` file exists, and every file in `tests/` backs a
claim. To re-verify: `node --test tests/*.test.js && node --test tools/test-qa.js`
(382 tests total: 374 in `tests/` + 8 in `tools/test-qa.js` — counts verified by
running, pinned by `tests/readme-count.test.js`; the canonical command itself
is pinned in EXPERIMENTS.md).

| Claim | Proof | Verify by |
|-------|-------|-----------|
| fitness = frames + hits×100; capped 0-hit can't top a hitter | node-pinned | `node tests/honesty.test.js` |
| drawn paddle == registered hitbox (0.20 incl. ±0.02) | node-pinned | `node tests/honesty.test.js` |
| seeded swan → bit-reproducible runs/checkpoints | node-pinned | `node tests/honesty.test.js` |
| stats line shows hits, flags 0-hit luck | node-pinned | `node tests/honesty.test.js` |
| ring buffer: bounded FIFO, monotonic counter (Round 2) | node-pinned | `node tests/ring.test.js` |
| streaming evaluator elites == brute-force top-K (Round 2) | node-pinned | `node tests/streaming.test.js` |
| micro-JEPA learns & infers on ONE representation | node-pinned | `node tests/jepa.test.js` |
| LLM seam: death/interval pacing, serialized, stale fenced, hung requests time out | node-pinned | `node tests/seam.test.js` |
| C1 rules: ender blocks return the ball down; only the survivor's line can die | node-pinned | `node tests/coev.test.js` |
| C1 determinism: same seed → same champions & ledger | node-pinned | `node tests/coev.test.js` |
| projection cells / fitness strip / receipt panel render | browser-only (amber) | open `index.html` |

## C1 — COEVOLUTION (Round 3): the GAN pair

A second paddle sits at the **top** of the arena. The **survivor** (bottom)
keeps the L1 contract — fitness `frames + hits×100`. The **ender** (top) can
**block** the ball inside its effective zone: the ball returns downward and the
rally's speed accumulator grows ×1.02 per block. If the ball passes clean, the
wall bounces it back — **escapes cannot end the rally**; only the survivor's
line can die. Ender fitness: a kill scores `(maxFrames − frames) + 30×blocks`;
surviving to the cap is failure, worth a token `5×blocks`.

Training is population-based (PSRO-style): each survivor faces a **random**
ender from the pool and each ender faces a random survivor — the standard cure
for GAN cycling — then the champions meet head-to-head and **every head-to-head
is receipted** into a hash-chained ledger row carrying **both nets' content
ids** (`PQ.netId`, djb2-8). **The loser mutates:** the losing side breeds at
2×σ that generation (elites copied intact, so skill accumulates while pressure
lands on exploration).

The committed artifact (`node tools/prerun-coev.js`, ≈2 min, seed 20260924):

- **120 generations × (24 survivors + 24 enders)**, ledger of **121 receipted
  head-to-heads**, head `8663279a…`; every row carries `sId`, `eId`,
  `outcome`, `frames`, `sFit`, `eFit`, `loserId`.
- **The arms race is visible in the ledger:** early h2h kills land in
  ~113–160 frames; the survivor climbs to 2,460–4,844-frame rallies by gen 75;
  at **gen 110 the survivor caps all 6,000 frames** (first SURVIVOR-CAP, eFit
  5) — and the very next generation the ender, breeding at 2×σ as the loser,
  kills in 559 frames. **The loser mutated, and it worked.** That flip-flop
  *is* coevolution.
- Byte-reproducible: two consecutive runs print the same md5 for
  `checkpoints/coev.js` (`946e639a…`). The C1 lineage is separate from L0–L2:
  classic checkpoints' provenance is untouched. The C1 birth ledger is also
  sealed at birth into `checkpoints/coev-stone-v1.json` (Round 45), a stone-v1
  chain over all 121 head-to-head rows, verified BEFORE write and refused
  loudly on tamper (`tests/coev-birth-seal.test.js`); the seal is a receipt,
  not a sixth training artifact.

In the demo: mode select → **C1 · COEVOLUTION**, press Train (both populations
evolve — Round 5: this browser path is node-pinned by `tests/coev-glue.test.js`,
which drives the exact shipped glue expressions headlessly; the survivor's paddle
is blue, the ender's violet, both drawn at their
effective widths). The **C1 · coevolved pair** chip loads the artifact's
champions read-only; training onward from them is real. The receipt tail it
displays is re-chained onto a fresh genesis (the page cannot import another
process's hash chain), so the stats line banners the **displayed** chain's
head and discloses the artifact's true md5-verified head beside it — pinned
by `tests/loadcoev-glue.test.js` (Round 9; formerly a known lie, receipted
in Rounds 4–8).

## Edge-ML patterns (Round 2 — crushed in from quilt-edge-ml)

Friendly-competition port from [SuperInstance/quilt-edge-ml](https://github.com/SuperInstance/quilt-edge-ml)
(the UNO Q edge-ML substrate zoo). Two of their patterns lifted into this core:

| Their pattern | Our port | Where it lives |
|---------------|----------|----------------|
| `ring_buffer.py` — bounded FIFO, oldest evicted | `makeRing(capacity)` — champion fitness history, bounded; drives the **live fitness strip** in the demo and `checkpoints/curve.json` | `core.js`, `index.html`, `tools/prerun.js` |
| `out_of_core.py` — stream batches, never load the dataset, `partial_fit` | `makeEvaluator(candidates, evalOne, {eliteK})` — one candidate per `step()`; only a bounded elite archive + running stats survive. Populations >64 are **chunked across animation frames** instead of freezing the page | `core.js`, `index.html`, `tools/prerun.js` |

**Honestly not ported (Round 2, still deferred):** their first/last-mile input
filters — filtering the sense vector would change the I/O contract every
existing checkpoint was evolved under, invalidating their provenance.
Round-4 candidate: enable from gen 0, re-evolve both lineages, keep both
curves for comparison.

## Level 2 — the scratch tile (JEV · MOTH · micro-JEPA · LLM seam)

The ML loop exposes iteration hooks after every decision, with a **weight
slider from mild suggestion to strict override**:

- **micro-JEPA** — a linear one-step predictor of ball position, LMS-trained on
  the game's *real* `sense()` transitions, advising from its own prediction.
  **Round 3 fixed its representation skew** (Round 2's P1): learn consumed
  `sense()` scale ([−1,1]) while infer consumed `stateOf()` scale ([0,1]) —
  pinned now as a measured ≥5× mean-error ratio on a linear toy
  (`tests/jepa.test.js`). One representation in, one out; the skew is
  unpossible by construction.
- **MOTH** — accepted/refused suggestions append **hash-chained receipt rows**
  (`kind, move, weight, gen, prev_hash, row_hash`), visible live. REFUSAL/v1
  rows are first-class citizens, per fleet doctrine. *Formerly a known lie
  (Rounds 3–6): the panel silently shifted at 40 rows while the C1 ledger
  counted its evictions honestly. Round 7 decides it the ledger way —
  `receiptEvicted` counts every eviction and the panel shows
  "N shown / M evicted"; pinned FAIL-first by `tests/receipt-glue.test.js`.*
- **JEV** — the `MoveSuggestion` type with a runtime validator. Anything
  failing validation is refused and receipted, never silently coerced.
- **custom scratch tile** — write a JS module in the page, attach it; it must
  pass JEV validation on a probe state or the attach itself is refused.
- **LLM seam (Round 3 — paced).** Round 2 fired one fetch per animation frame
  and applied replies in arrival-burst order. The seam is now `PQ.makeSeam`:
  it fires **on death or every ~150 frames** (never per frame), refuses during
  **one-in-flight** (extra fires counted, not queued), paces to **≥2 s between
  calls**, tags every reply with the asking game, and **drops replies whose
  game has died** — stale advice is counted, never applied. Replies pass JEV
  and the weight slider before touching the paddle. Drop counters render live
  in the status line. Keys stay in page memory. Contract pinned by
  `tests/seam.test.js` (seam-timeout pins: a hung endpoint frees the seam,
  counts `timedOut`, errors out; a fast reply cancels its timer).
  *(Round 6: the game-id tag is stamped at ASK time — `askGame` maps the seam
  seq to the asking gameId at fire, and the reply arrival echoes that stamp,
  so a dead game's reply can no longer rebrand onto its successor. Formerly a
  known lie, receipted in Rounds 4–5; pinned FAIL-first by
  `tests/seam-glue.test.js`.)*
- **quantum audio — QPAM waveform-imaging** (`qa.js`) — sonify the game state
  into a tone, push it through a **labeled deterministic stand-in** for the
  quantumaudio-demo's QPAM lossy round-trip (low-pass + seeded shot noise;
  real qiskit can't run in a zero-dep page, so the seam is named, not faked —
  echovision doctrine), image the ball position back with autocorrelation,
  and suggest from the image. Confidence = imaging self-consistency, capped
  at 0.5: a stand-in never claims full trust. JEV-validated and
  MOTH-receipted like every module; the violet/amber strip draws clean vs
  decoded waveform live. Spec: `research/2026-09-24-quantum-audio-L2.md`.
  Verified by running: `node tools/test-qa.js` (8 tests).

## What a reader learns

- **A genetic algorithm is a legitimate alternative to backprop** — no
  gradients, no loss function to differentiate, just breed-the-fittest over
  generations. It is slower per-step than backprop but needs nothing
  differentiable: fitness can be a raw game outcome (`frames + hits×100`),
  not a smooth function of the weights.
- **Fitness functions can lie by construction, not just by bug.** Under the
  old `×25` hit weight, a champion that merely survived (0 hits) beat a
  champion that fought and died sooner — the fitness function itself
  rewarded luck over skill. Fixing it wasn't a bug fix in the training loop;
  it was rewriting what "winning" means, then re-evolving from scratch.
- **A drawn hitbox and a registered hitbox can silently diverge.** A 12.5%
  ghost margin existed for as long as nobody made the draw call and the
  physics call reference the same function — `PQ.effectivePaddle(px)` fixes
  the class of bug, not just the instance.
- **Coevolution (a GAN pair trained as adversaries) needs population-based
  training to avoid cycling** — each side facing a *random* opponent from a
  pool, not always the current best, is the standard cure, and the ledger
  here shows it working: a losing side that mutates harder (2×σ) can flip a
  110-generation-long losing streak in one generation.
- **A wristband/ledger is worth more than a claim.** Every verified number in
  this README is backed by a named test file a reader can run themselves
  (`tests/honesty.test.js` and friends) — the honesty is falsifiable, not
  asserted.

## Doctrine

Numbers are verified by running (`tools/prerun.js`, `tools/prerun-coev.js`;
md5s above are the checkpoints' provenance). The bugs found on the way — a
velocity typo that teleported the ball, a broken button, an inverted elite
comparison, a fetch-per-frame seam, a ghost hitbox, a fitness weight that let
luck beat skill, a JEPA that learned and inferred in different languages —
were caught by running or by tests, not by reading. Cells project state;
training is the colony; the receipts are the memory; the wristband says which
claims have proofs. *Shape is what time does to signal — here, the signal is
a ball, and the shape is a paddle that learned to wait where the future
arrives.*

<!-- QUILT:LINKS:START — generated from .quilt/links.yml by quilt-links.mjs. Do not edit by hand. -->
## Cross-pollination — the Reader's Fold

*Part of the **quilt** family. Under [Law 6](https://github.com/SuperInstance/jev-quilt), this repo carries no verdicts about its neighbors — only content-addressed pointers you fold under your own weights.*

**Grown on** — [quilt-edge-ml](https://github.com/SuperInstance/quilt-edge-ml)

**Provides** (fold these from here)
- `coevolution-harness` — PSRO-style GAN-pair coevolution (survivor vs ender) with a hash-chained, birth-sealed receipt ledger over every head-to-head

**Consumes** (folded from elsewhere)
- [quilt-edge-ml](https://github.com/SuperInstance/quilt-edge-ml) — ring_buffer (bounded FIFO) and out_of_core (streaming, chunked-eval) patterns, ported into core.js as makeRing and makeEvaluator

**Related** (1-hop siblings — Law 7)
- [eos-seed](https://github.com/SuperInstance/eos-seed) — sibling "learning without backprop" teaching artifact — genetic algorithm here, ternary coordinate-stepper there
- [cargo-line-tycoon](https://github.com/SuperInstance/cargo-line-tycoon) — sibling "ML/substrate you can watch think" teaching artifact

<sub>Regenerate: `node quilt-links.mjs` · Fleet map: [FLEET.md](https://github.com/SuperInstance/fleet-seeds/blob/main/FLEET.md)</sub>
<!-- QUILT:LINKS:END -->
