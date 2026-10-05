# ONBOARDING — pong-quilt

> Seed doc (fleet handoff 2026-10-06). Read this with `README.md` (the claim-by-claim
> wristband) and `EXPERIMENTS.md` (the round ledger). Mesh context for the whole
> account: `SuperInstance/fleet-seeds` → `docs/handoff-2026-10-06/ORG-MESH.md`.

## 1. What this repo is now

**ML you can watch think.** A zero-dependency, web-native Pong player where a tiny
neural net (6→10→3, tanh) learns by genetic algorithm *in your browser* — real
computation, no simulation. The point is not Pong; the point is that every claim
the repo makes is pinned by tests, every round of work is receipted, and the
drawn paddle is the registered hitbox. Suite at Round 96: **413 registered /
405 pass / 0 fail / 8 skips**; live site checks 9/9 for five consecutive rounds.

**Open at handoff:** PRs #114–#118 (Rounds 92–96, a stacked family — merge in
order, or merge #118 alone which carries the stack tip). Main is Casey-gated;
never push it unprompted.

## 2. How it got here (the momentum)

The repo grew as a **round-based builder/playtester loop** — one round = one
spec of small items + one v1 draw + receipts. The arcs that matter:

- **Honesty rounds (R2–R3).** Fitness was corrected (hits ×100, not ×25 — a
  capped 0-hit survivor used to outscore any hitter), and the paddle draw was
  fused with the hitbox (`PQ.effectivePaddle` is the single source of truth).
  Both were claims-outran-code bugs caught by playtesting; both are now pinned.
- **The canonical spine (R50+).** Post-R50, one canonical spine line in the
  README is **byte-exact stable** — `d(spine)/d(version) = 0` across 20+
  rounds. Any edit to it is a deliberate, receipted event, not drift.
- **v1 draws.** Each round appends one honest game to a growing ledger,
  distribution-regenerated, with the r76 TALLY-MATCH check moved exactly once
  per round. The draws are the repo's diary.
- **Tooling honesty (R92–R96).** The last five rounds built the *development
  surface* itself: `build-site --check` (R93), `--check` as adoption gate
  (R94), README --check-first pin (R95), `receipt-audit --doc` mode (R96).
  108+ receipt claims audited green.
- **Invariants the next builder MUST respect:** re-seal the site *before*
  suite counts; FAIL-first pins on every build; never edit the spine casually;
  if seal-check fires STALE-DIST, rebuild with `node tools/build-site.mjs`.

**Known wounds (named, not hidden):** the judge lane has been dark for 10+
rounds (JEV HTTP 401 — the Typesafe key was revoked 2026-10-06; it stays dark
until a fresh key lands and the worker credential rotates). Deploy lag was 99
commits at R96 — named-not-a-finding, tracked by the R93 lag WARN.

## 3. The vision

A demonstration with the epistemic standards of a proof. The browser is the
laboratory and the reader is the reviewer: every number they see is either
recomputed live or pinned by a test that re-derives it. The aesthetic comes
from the fleet's honesty law — *no receipt, no claim* — applied to something a
human can literally watch. The GA discovering intercept projection (because
nets that plan survive longer and breed) is the thesis: **planning emerges
when the environment makes reaction insufficient.**

## 4. Roadmaps (several directions — pick per Casey's word)

**Going now (R97 spec, derivable from R96's carried items):**
1. Pulse-identity note in EXPERIMENTS.md (9th carrying).
2. Judge-lane liveness `[ops]` (6th carrying) — dark until key rotation.
3. Deploy-cadence lag WARN `[ops]` (5th carrying).
4. Prerun seal-state print — the last `--check`-gate slice.
5. Next `[S]` item from the R96 receipts.

**Sketched futures (uncommitted, ranked by leverage):**
- **Coevolution lineage (C1).** The README already sketches a coevolving
  opponent; per-hit speed boosts become real via an accumulator there. This is
  the biggest visible-thesis upgrade: planning vs. planning.
- **Multi-cell population view.** The projection strip could show the whole
  population's state vectors, not the champion's — "watch the species think."
- **Round automation without a cron.** R97+ needs a runner that computes its
  own spec from the last round's receipts (the crons were stood down
  2026-10-06; the playloop lane that shipped R92–R96 is documented in the
  fleet handoff).

## 5. How it meshes

- **Grown on** `quilt-edge-ml` (the ML substrate it demonstrates); related to
  `eos-seed`, `tessera`, `cargo-line-tycoon` in the fleet graph.
- **Judge lane** consumes the JEV oracle doctrine from `jev-quilt` /
  `quilt-jev-toolkit` (currently dark, key-revoked).
- **Method donor:** the round-based builder/playtester loop, FAIL-first pins,
  and receipt-audit pattern are copied across the fleet (fresh-audit receipts,
  playtest rounds in other repos).
- Org state + resume playbook: `fleet-seeds` → `docs/handoff-2026-10-06/HANDOFF.md`.
