# pong-quilt — ML you can watch think

Web-native, zero-dependency machine-learning demonstration. Open `index.html`
(works from `file://` or any static server). No build step, no libraries, no
uploads. **Not a simulation — the training is real computation in your browser.**

## Level 1 — real learning, visible cells

- A tiny neural net (6→10→3, tanh) plays Pong as a **genetic algorithm**:
  a population plays lives, the fittest breed, mutation does the rest.
- **Projection cells** (the right-hand strip) show the granular state vector
  the net sees: ball position, velocity, intercept pressure, speed, and the
  red **decision countdown** — the agent only acts every *N* frames. That is
  the speed-of-action limit.
- **The speed ramp forces planning.** Ball velocity grows with survival and
  per hit; the decision interval stays fixed. Tracking fails at high speed —
  the only winning strategy is projecting the intercept *ahead*, which the GA
  discovers because nets that plan survive longer and breed.
- **Black swans:** per-frame random angle kicks, probability scaling with
  speed. Even a perfect tracker dies to chance eventually — checkmate is
  stochastic, and the fitness curve says so.
- **Scaling, both axes, user-visible:** *games-at-once* = population size
  (horizontal), *gens/frame* = vertical. The games counter climbs live.

### Real starting states (the quilt you pick up)

`tools/prerun.js` evolves checkpoints with the **same core** the browser runs
(`node tools/prerun.js`; verified on Node v22, byte-reproducible — black swans
draw from the seeded rng, so same `DEFAULTS.seed` → identical checkpoint bytes,
md5-verified across two runs):

| Level | Gen | Best fitness | Frames | Hits | Max speed |
|-------|-----|-------------|--------|------|-----------|
| L0 random | 0 | 4,867 | 4,567 | 12 | ×2.83 |
| L1 mid-training | 60 | 6,625 | 6,000 (cap) | 25 | ×3.40 |
| L2 near-human | 260 | 6,675 | 6,000 (cap) | 27 | ×3.40 |

The canonical curve (`checkpoints/curve.json`, 21 sampled points of the full
261-generation champion ring) climbs fast — 4,867 → 6,675 by gen 39 — then
**plateaus under the frame cap**: once the champion survives all 6,000 frames,
fitness can only grow via hits (×25 each), and the strip shows the plateau
wobbling (6,700 ↔ 6,625) instead of a smoothed ascent. Training is
non-monotonic at the fine scale even when the trend climbs; a checkpoint that
dips is a truer artifact than a fitted curve. Loading a level and pressing
Train continues real evolution from that population.

## Edge-ML patterns (Round 2 — crushed in from quilt-edge-ml)

Friendly-competition port from [SuperInstance/quilt-edge-ml](https://github.com/SuperInstance/quilt-edge-ml)
(the UNO Q edge-ML substrate zoo). Two of their patterns lifted into this core:

| Their pattern | Our port | Where it lives |
|---------------|----------|----------------|
| `ring_buffer.py` — bounded FIFO, oldest evicted | `makeRing(capacity)` — champion fitness history, bounded; drives the **live fitness strip** in the demo and `checkpoints/curve.json` | `core.js`, `index.html`, `tools/prerun.js` |
| `out_of_core.py` — stream batches, never load the dataset, `partial_fit` | `makeEvaluator(candidates, evalOne, {eliteK})` — one candidate per `step()`; only a bounded elite archive + running stats survive. Populations >64 are **chunked across animation frames** instead of freezing the page | `core.js`, `index.html`, `tools/prerun.js` |

Also fixed on contact: black swans used unseeded `Math.random()`, so the old
README table was single-run provenance — re-running prerun produced *different*
checkpoints from the same seed. Swans now draw from the rng passed into
`step/playOne` (browser still defaults to live `Math.random`). Everything below
is reproducible by running. Pins: `node --test` (15 tests: ring eviction/order,
streaming-eval equivalence to brute-force top-K under ties, chunked == one-shot,
determinism).

**Honestly not ported (this round):** their first/last-mile input filters —
filtering the sense vector would change the I/O contract every existing
checkpoint was evolved under, invalidating their provenance. Round-3 candidate,
requires re-evolving checkpoints with the filter active from gen 0.

## Level 2 — the scratch tile (JEV · MOTH · micro-JEPA · LLM seam)

The ML loop exposes iteration hooks after every decision, with a **weight
slider from mild suggestion to strict override**:

- **micro-JEPA** — a linear one-step predictor of ball position, LMS-trained on
  the game's *real* transitions. Its advice is the intercept of its own
  prediction: the smallest honest world-model.
- **MOTH** — every accepted/refused suggestion appends a **hash-chained receipt
  row** (`kind, move, weight, gen, prev_hash, row_hash`), visible live in the
  receipt panel. Learning-from-advice leaves a ledger; REFUSAL/v1 rows are
  first-class citizens, per fleet doctrine.
- **JEV** — the `MoveSuggestion` type (`{move:-1|0|1, confidence:0..1}`) with a
  runtime validator. Any module failing validation is refused and receipted,
  never silently coerced — typesafe weighted answers.
- **custom scratch tile** — write a JS module in the page, attach it; it must
  pass JEV validation on a probe state or the attach itself is refused.
- **LLM seam** — bring-your-own endpoint/key (e.g. a small Groq model), fired
  after failures with a compact state summary; the JSON answer passes through
  JEV validation and the weight slider before touching the paddle. Keys stay
  in page memory; the only network call is the one you configured.

## Doctrine

Numbers are verified by running (`tools/prerun.js` output above is the
checkpoints' provenance). The two bugs found on the way — a velocity typo that
teleported the ball one field per frame, and a broken button in the level
chips — were caught by running, not reading. Cells project state; training is
the colony; the receipts are the memory. *Shape is what time does to signal —
here, the signal is a ball, and the shape is a paddle that learned to wait
where the future arrives.*
