# Quantum audio → MoveSuggestion: the L2 mapping spec

**Date:** 2026-09-24 · **Lane:** stretch-quantumaudio (cron 96df27e1) · **Author:** kimi1, Cocapn Fleet
**Directive in play:** Level-2 demos should include "quantum waveform-imaging"
suggestions via JEV typesafe weighted answers (Casey).
**Status:** BUILT — `qa.js` + wiring landed on branch `quantum-audio-L2` in this
repo. Everything below was verified by *running* the siblings' code, not
reading their READMEs (fleet doctrine).

---

## 1. Sources studied

| Repo | Role | Files read |
|------|------|-----------|
| `SuperInstance/quilt-quantumaudio-demo` | MOTH quantumaudio encoding w/ Quilt cells | `quilt_integration.py`, `demo.py`, `bench.py` |
| `SuperInstance/quilt-jev-toolkit` | TypeSafe canon oracle client | `jev_client.py`, `canon_gate.py` |
| `SuperInstance/quilt-echovision` | Waveform-imaging doctrine (sonar-vision) | `README.md`, `index.html` |
| `SuperInstance/pong-quilt` (this repo) | MoveSuggestion consumer (L2 scratch tile) | `core.js`, `index.html`, `tools/prerun.js` |

The `quantumaudio` PyPI package itself was installed into a venv and executed
(AerSimulator via Qiskit) — all "VERIFIED" numbers below come from those runs.

---

## 2. What quantumaudio actually does (verified by running)

The package implements **QPAM** (Quantum Probability Amplitude Modulation) and
siblings (QSM, MQSM, MSQPAM, SQPAM): an audio vector's amplitudes are loaded
into a quantum state's amplitudes (`encode`), the circuit is executed for
`shots` samples on a simulator, and the sampled distribution is read back as
audio (`decode`). Lossy but *statistically* reproducible — reconstruction
fidelity grows with shots per encoded sample.

### Verified-claims table (ran their code, 2026-09-24)

| Claim (source) | Verdict | Evidence |
|---|---|---|
| QPAM round-trip on a 441-sample 440 Hz sine: Pearson 0.9902, MSE 0.0103 @ 20k shots (`demo.py`) | **VERIFIED** | ran `demo.py`: pearson 0.9902, MSE 0.0103 |
| QPAM = 9 qubits, depth 2; encode 2.1 ms; pearson 0.9596 @ 5k shots (`bench.py`) | **VERIFIED** | ran `bench.py`: QPAM 9q/depth 2; SQPAM 10q/depth 1536/0.9472; MSQPAM 11q/depth 3072/0.8885; QSM 18q/depth 3047/1.0000; MQSM 19q/depth 4071/1.0000 |
| **"same prompt → same hash (modulo shot noise)"** in `quilt_integration.py:quantumaudio_substrate` | **REFUTED as shipped** | 4 runs, same prompt, shots=2000: 4/4 distinct hashes; run-to-run pearson ≈ 0.02 (basically uncorrelated). The "canary witness" witnesses nothing at this operating point |
| Above holds even after normalizing the text audio to absmax 1.0 | **REFUTED again** | normalized runs: hashes all distinct, cross-prompt pearson 0.03 — the decode is shot noise, not signal |
| Text substrate reconstructs with enough shots | **VERIFIED (envelope)** | same prompt @ 20k shots: vs-original pearson 0.29; @ 100k shots: 0.62. Fidelity scales with shots/sample exactly as QPAM theory says |
| `text_to_audio` maps chars to "amplitudes in [-1,1]" (`quilt_integration.py`) | **CORRECTED (minor)** | for lowercase text the actual range is ≈ [-0.75, 0] (ord<128 → negative); docstring overpromises |
| Honest fallback: `[no-quantumaudio:{prompt}...]` when package missing | **VERIFIED** | import-gated stub returns the labeled string — the exact honesty pattern this spec ports |

**The load-bearing finding:** the demo's *integration* claim ("reproducible
hash canary at shots=2000") is false for its own text-audio input because
882 samples over 1024 QPAM amplitudes ≈ 2 shots/amplitude — pure sampling
noise. Their `demo.py` works because a 440 Hz sine at 20k shots has ~45
shots/amplitude. Any L2 module must therefore treat shot budget as a
first-class honesty dial, not a footnote.

---

## 3. What jev-toolkit provides

`jev_client.py` is a ~130-line stdlib client for the TypeSafe JEV API
(`POST /v1/systemone`, bearer `TYPESAFEAI_KEY`) with three question types:

- `noul` → yes/no as a probability `{noul: 0.0–1.0}`
- `choice` → named-criteria pick with `{choice, confidence, probabilities}`
- `score` → ordered-rubric rat