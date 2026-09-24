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
(`node tools/prerun.js`; verified on Node v22):

| Level | Gen | Best fitness | Frames | Hits | Max speed |
|-------|-----|-------------|--------|------|-----------|
| L0 random | 0 | 2,949 | 2,899 | 2 | ×2.16 |
| L1 mid-training | 60 | 1,242 | 1,192 | 2 | ×1.48 |
| L2 near-human | 260 | 6,125 | 6,000 (cap) | 5 | ×3.40 |

L1 is honestly **worse** than L0 — training is non-monotonic, and a checkpoint
that regressed is a truer artifact than a smoothed curve. Loading a level and
pressing Train continues real evolution from that population.

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

## Doctrine

Numbers are verified by running (`tools/prerun.js` output above is the
checkpoints' provenance). The two bugs found on the way — a velocity typo that
teleported the ball one field per frame, and a broken button in the level
chips — were caught by running, not reading. Cells project state; training is
the colony; the receipts are the memory. *Shape is what time does to signal —
here, the signal is a ball, and the shape is a paddle that learned to wait
where the future arrives.*
