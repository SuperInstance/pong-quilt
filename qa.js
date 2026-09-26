/* pong-quilt L2 — quantum-audio waveform-imaging advisor.
 * Sibling ports: SuperInstance/quilt-quantumaudio-demo (QPAM encode/decode pipeline
 * + honest [no-quantumaudio:...] fallback) and SuperInstance/quilt-echovision
 * (sonify state -> lossy channel -> image it back; name the seam, don't fake it).
 *
 * HONESTY CONTRACT (fleet doctrine — a labeled stub beats a fake that pretends):
 * No qiskit/AerSimulator can run inside a zero-dependency browser page. The
 * channel below is a DETERMINISTIC STAND-IN for the QPAM lossy round-trip
 * (low-pass smoothing + seeded shot noise, same LCG family as core.js). Every
 * surface says so: source tag "qa-sim", UI label, receipts. The
 * suggestByo seam below (Round 16) is the bring-your-own door opened: POST
 * base64 shot bins to your endpoint, take a JEV-validated suggestion back,
 * and any failure receipts byo-qpam-fallback and degrades to this labeled
 * sim — the page ships with no endpoint configured, so the stand-in runs.
 * Confidence is capped at SIM_MAX_CONF — a stand-in never claims full trust.
 *
 * Verified envelope of the real thing (research/2026-09-24-quantum-audio-L2.md):
 * QPAM = 9 qubits, depth 2; reconstruction pearson grows with shots/sample;
 * at 2000 shots over ~882 samples the real decode is shot-noise (run-to-run
 * pearson ~0.02). The sim's noise model is sized from that measurement.
 *
 * KEEP IN SYNC: browser loads this file; node tests require it. No dependencies. */
(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) module.exports = factory(require("./core.js"));
  else root.QuantumAudioL2 = factory(root.PongQuilt);
})(typeof self !== "undefined" ? self : this, function (PQ) {
  "use strict";

  const N = 64;                 // samples per state-imaging frame
  const SIM_MAX_CONF = 0.5;     // stand-in confidence cap (honesty contract)
  const DEAD_ZCR = 0.02;        // below this the channel returned silence -> no advice (pot-bound)
  const SIM_POT_FLOOR = 2;      // shots/sample floor: below this the pot is EMPTY — QPAM returns no image
                                // at all (shot underflow: measured pearson ~0.02 at 2000 shots/882 samples).
                                // The channel then emits pure silence and the DEAD_ZCR guard does the job
                                // it was built for; under the default budget the oscillatory tone always
                                // clears the threshold (Round 12: min ZCR 0.125 over a full state sweep).

  // --- 1. sonify: game state -> waveform (echovision idiom: emit, hear it back)
  // stateOf() units: ballX, paddleX in [0,1] (g.x / g.px) — this module lives
  // in that space directly, no renormalization.
  function sonify(s) {
    const f = 4 + 8 * Math.max(0, Math.min(1, s.ballX));     // ball position -> tone (4..12 cycles/frame)
    const amp = 0.5 + 0.5 * Math.min(1, (s.speed || 1) / 3); // speed -> envelope
    const intercept = (s.paddleX + 0.08) - s.ballX;          // positive: paddle right of ball
    const w = new Array(N);
    for (let i = 0; i < N; i++) {
      const t = i / N;
      w[i] = amp * Math.sin(2 * Math.PI * f * t) + 0.30 * intercept * Math.sin(2 * Math.PI * 3 * t);
    }
    return w;
  }

  // --- 2. channel: DETERMINISTIC STAND-IN for the QPAM encode/decode round-trip.
  // Real QPAM (quilt-quantumaudio-demo/demo.py, verified by running): 9 qubits,
  // depth 2, lossy decode whose pearson vs original grows with shots/sample.
  // Stand-in = 3-tap low-pass (the smoothing QPAM decode exhibits) + shot noise
  // from a seeded LCG, amplitude ~ 1/sqrt(shotsPerBin) like real sampling noise.
  function channel(w, seed, shotsPerBin) {
    // Round 13: `??` not `||` — a 0 budget is the EMPTY POT (slider at zero),
    // not a request for the default. `|| 32` silently re-armed an emptied pot.
    const spb = shotsPerBin ?? 32; // sized so noise is present but the image survives
    if (spb < SIM_POT_FLOOR) return new Array(w.length).fill(0); // empty pot: no measurement returns
    const rand = PQ.rng((seed == null ? 0x51eed : seed) >>> 0);
    const noiseAmp = 1.6 / Math.sqrt(spb);
    const lp = new Array(w.length);
    for (let i = 0; i < w.length; i++) {
      const a = i > 0 ? w[i - 1] : w[i], b = i < w.length - 1 ? w[i + 1] : w[i];
      lp[i] = (a + 2 * w[i] + b) / 4;
    }
    return lp.map((v) => v + (rand() - 0.5) * 2 * noiseAmp);
  }

  // --- 3. image it back: recover the tone period from the decoded waveform.
  // Autocorrelation peak over periods 5..16 samples (f in 4..12 cycles per 64)
  // — robust to the intercept harmonic; zero-crossing count alone was not.
  // Parabolic interpolation around the peak recovers sub-sample lag; without
  // it integer quantization biased xHat by up to 1/16 field (caught by tests).
  function estimateX(d) {
    const cs = [];
    for (let lag = 5; lag <= 16; lag++) {
      let c = 0;
      for (let i = 0; i + lag < d.length; i++) c += d[i] * d[i + lag];
      cs.push(c);
    }
    let bi = 0;
    for (let k = 1; k < cs.length; k++) if (cs[k] > cs[bi]) bi = k;
    const lag = 5 + bi;
    let offset = 0; // parabolic interpolation (one-sided at the search edges)
    if (bi > 0 && bi < cs.length - 1) {
      const a = cs[bi - 1], b = cs[bi], c = cs[bi + 1], den = a - 2 * b + c;
      if (Math.abs(den) > 1e-12) offset = Math.max(-0.5, Math.min(0.5, 0.5 * (a - c) / den));
    }
    const fHat = N / (lag + offset);                     // cycles per frame
    return Math.max(0, Math.min(1, (fHat - 4) / 8));     // invert sonify(): tone -> position [0,1]
  }
  function zeroCrossingRate(d) {
    let zc = 0;
    for (let i = 1; i < d.length; i++) if ((d[i - 1] < 0) !== (d[i] < 0)) zc++;
    return zc / d.length;
  }

  // --- 4. the advisor: state -> MoveSuggestion (JEV type {move, confidence, source})
  // Confidence = self-consistency of the imaging: drift between the position
  // imaged from the decoded waveform and the position imaged from the clean one.
  // A lossier channel -> more drift -> honestly lower confidence. Sim cap last.
  // Round 13: shotsPerBin is threaded in (default 32) so the page's pot control
  // can deplete the budget below SIM_POT_FLOOR — the documented exhaustion seam.
  function suggest(s, seed, shotsPerBin) {
    const clean = sonify(s);
    const decoded = channel(clean, seed, shotsPerBin);
    if (zeroCrossingRate(decoded) < DEAD_ZCR) return null; // pot-bound: no echo, no advice
    const xClean = estimateX(clean), xHat = estimateX(decoded);
    const drift = Math.abs(xHat - xClean);
    const agree = Math.max(0, 1 - drift / 0.25);      // full agreement within a quarter-field
    const dead = 0.06;                                // paddle-centered deadzone, like jepaSuggest
    const px = s.paddleX + 0.08;
    const move = xHat < px - dead ? -1 : xHat > px + dead ? 1 : 0;
    return { move, confidence: +(Math.min(SIM_MAX_CONF, 0.5 * agree).toFixed(3)), source: "qa-sim" };
  }

  // --- 5. confidence-vs-pot envelope (R15 spec item 3): the shape the tile
  // plots. Computed ONCE over a fixed state grid (seeded, deterministic) and
  // cached — the strip is a measurement, not a live re-roll per frame.
  // Each row: {spb, meanConf, nullFrac} over the grid; meanConf is the mean
  // over ADVISED states only (below the floor every state refuses — nullFrac
  // says that, meanConf stays 0 rather than laundering refusals into data).
  // A caller-supplied seed does NOT re-roll the grid: the cache is the spec.
  let _envelope = null;
  function confidenceEnvelope() {
    if (_envelope) return _envelope;
    const grid = [];
    for (let bx = 1; bx <= 9; bx++) {
      for (let px = 1; px <= 9; px++) {
        grid.push({ ballX: bx / 10, paddleX: px / 10, speed: 1.2 });
      }
    }
    const rows = [];
    for (let spb = 0; spb <= 64; spb++) { // dense over the page slider's range
      let advised = 0, confSum = 0;
      for (let i = 0; i < grid.length; i++) {
        const r = suggest(grid[i], (0x51eed + i * 2654435761) >>> 0, spb);
        if (r) { advised++; confSum += r.confidence; }
      }
      rows.push({ spb, meanConf: advised ? +(confSum / advised).toFixed(4) : 0, nullFrac: +(1 - advised / grid.length).toFixed(4) });
    }
    _envelope = rows;
    return _envelope;
  }

  // --- 6. BYO real-QPAM endpoint seam (R16 spec item 4, carried since R12).
  // The marked "a real QPAM backend belongs here" door, opened: hand the state
  // to YOUR endpoint (a real QPAM rig, per research/2026-09-24-quantum-audio-L2.md)
  // and take its MoveSuggestion back. Honesty contract, per fleet doctrine:
  //   - wire = the sonified frame as 64 8-bit shot bins (base64) + shotsPerBin +
  //     seed; the backend performs its own encode/measure/decode on those bins.
  //   - the response is JEV-validated (move in {-1,0,1}, confidence in [0,1]) —
  //     an invalid payload NEVER reaches the paddle.
  //   - ANY failure (no endpoint, fetch error, non-ok status, bad payload)
  //     receipts a byo-qpam-fallback and degrades to the labeled sim stand-in
  //     with the SAME seed/pot. Never silent, never a fake that pretends.
  //   - a real backend's confidence is NOT sim-capped — SIM_MAX_CONF binds the
  //     stand-in only (the cap is about the stand-in's honesty, not yours).
  const B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  function toB64(bytes) { // zero-dep base64 (browser btoa and node Buffer both fine, this is neither)
    let out = "";
    for (let i = 0; i < bytes.length; i += 3) {
      const a = bytes[i];
      const b = i + 1 < bytes.length ? bytes[i + 1] : null;
      const c = i + 2 < bytes.length ? bytes[i + 2] : null;
      out += B64[a >> 2] + B64[((a & 3) << 4) | (b === null ? 0 : b >> 4)] +
             (b === null ? "=" : B64[((b & 15) << 2) | (c === null ? 0 : c >> 6)]) +
             (c === null ? "=" : B64[c & 63]);
    }
    return out;
  }
  function shotBins(w) { // waveform -> 8-bit bins (the bytes the backend images)
    const bins = new Array(w.length);
    for (let i = 0; i < w.length; i++) bins[i] = Math.max(0, Math.min(255, Math.round((w[i] + 1) * 127.5)));
    return bins;
  }
  function isJevValid(j) {
    return !!j && typeof j === "object" &&
      (j.move === -1 || j.move === 0 || j.move === 1) &&
      typeof j.confidence === "number" && j.confidence >= 0 && j.confidence <= 1 &&
      Number.isFinite(j.confidence);
  }
  async function suggestByo(s, seed, shotsPerBin, opts) {
    opts = opts || {};
    const url = opts.url;
    const fetchImpl = opts.fetch || (typeof fetch !== "undefined" ? fetch : null);
    const refuse = (reason) => ({ // the honest degrade: labeled sim, same seed/pot, receipt named
      suggestion: suggest(s, seed, shotsPerBin),
      kind: "byo-qpam-fallback", reason, degraded: true,
    });
    if (!url || !fetchImpl) return refuse("no-endpoint"); // seam ships closed by default
    let res;
    try {
      res = await fetchImpl(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          binsB64: toB64(shotBins(sonify(s))),
          shotsPerBin: shotsPerBin === undefined ? null : shotsPerBin,
          seed: seed === undefined ? null : seed,
        }),
      });
    } catch (e) {
      return refuse("fetch-failure");
    }
    if (!res || !res.ok) return refuse("fetch-failure");
    let j = null;
    try { j = await res.json(); } catch (e) { return refuse("jev-invalid"); }
    if (!isJevValid(j)) return refuse("jev-invalid");
    return {
      suggestion: { move: j.move, confidence: j.confidence,
                    source: typeof j.source === "string" && j.source ? j.source : "byo-qpam" },
      kind: "byo-qpam", reason: null, degraded: false,
    };
  }

  // --- doctor-lens seam (Round 27): the page's QA-REFUSAL stat line may name
  // quilt-doctor's three-lens verdict as an external lens (digest produced by
  // tools/doctor-verdict.js, Round 24). Node drivers/tests inject the line via
  // setDoctorLens(); the browser ships with the seam CLOSED (null) — the page
  // renders nothing it cannot load. lensSuffix() returns "" for any unset or
  // non-string lens: a closed seam is byte-identical to no seam at all.
  let doctorLensLine = null;
  function setDoctorLens(line) { doctorLensLine = (typeof line === "string" && line.trim()) ? line : null; }
  function lensSuffix() { return doctorLensLine ? " · " + doctorLensLine : ""; }

  return { N, SIM_MAX_CONF, DEAD_ZCR, SIM_POT_FLOOR, sonify, channel, estimateX, zeroCrossingRate, suggest, suggestByo, confidenceEnvelope, setDoctorLens, lensSuffix };
});
