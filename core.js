/* pong-quilt core — shared by demo (index.html) and tools/prerun.js (Node).
 * KEEP IN SYNC. No dependencies. Numbers verified by running (node tools/prerun.js).
 * The quilt: game state projected into cells -> tiny net -> GA breeding ->
 * speed ramp forces planning ahead -> black-swan perturbations kill certainty.
 *
 * Edge-ML patterns (branch edge-ml-crush, inspired by SuperInstance/quilt-edge-ml):
 *  - makeRing:        bounded FIFO champion history (their ring_buffer.py)
 *  - makeEvaluator:   out-of-core streaming fitness eval (their out_of_core.py)
 *  - swans are rng-seeded when a rand is passed to step/playOne, so
 *    tools/prerun.js is byte-reproducible from DEFAULTS.seed (verified).
 *
 * Round 3 (branch round-3-builder):
 *  - fitnessOf:        HIT_WEIGHT=100 — hits must matter; a capped 0-hit
 *                      survivor scores maxFrames and can never top a hitter
 *  - effectivePaddle:  the drawn paddle IS the registered hitbox (0.20 wide)
 *  - makeSeam:         paced, serialized LLM advice (fire on death/interval,
 *                      drop stale — one in flight at a time)
 *  - makeJepa:         sense-vector features for BOTH learn and infer
 *                      (Round 2's feature-skew fix, now node-pinned)
 *  - COEVOLUTION (C1): adversarial pair — survivor net keeps the rally
 *                      alive, ender net tries to end it; loser mutates.
 *                      Separate lineage: checkpoints/coev.js, md5-stable.
 *  - VERIFIED_CLAIMS:  the wristband registry the demo badge renders from.
 *  - makeLedger:       hash-chained match ledger with HONEST eviction count. */
(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) module.exports = factory();
  else root.PongQuilt = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";
  const DEFAULTS = {
    popSize: 48, elites: 4, sigma: 0.12,
    decisionInterval: 4,        // frames between decisions = speed-of-action limit
    decisionDrift: 0.05,        // R50: the decision interval grows decisionDrift frames per frame played
    decisionCap: 16,            // R50: ...up to this cap (the model thinks slower as the game hardens)
    paddleW: 0.16, paddleSpeed: 0.02,
    paddleMin: 0.06,            // R50: shrink floor — the paddle never vanishes
    shrink: 0.999,              // R50: paddle width decays shrink^frames toward paddleMin
    ballBase: 0.004, ramp: 0.0004, hitBoost: 1.03,
    accel: 8e-7,                // R50: quadratic ball acceleration — speedMul gains accel*frames^2
    maxSpeedMul: 6,             // R50: speed cap (the ceiling that makes guaranteed failure finite)
    swanP: 0.00008,             // black-swan chance/frame, scales with speed
    swanGrow: 2,                // R50: swan probability scales as speedMul^swanGrow (quadratic)
    maxFrames: 6000, inDim: 6, hid: 10, outDim: 3, seed: 20260924,
  };
  function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
  function makeNet(rand) {
    const { inDim, hid, outDim } = DEFAULTS, w1 = [], b1 = [], w2 = [], b2 = [];
    for (let i = 0; i < inDim * hid; i++) w1.push((rand() - 0.5) * 0.6);
    for (let i = 0; i < hid; i++) b1.push(0);
    for (let i = 0; i < hid * outDim; i++) w2.push((rand() - 0.5) * 0.6);
    for (let i = 0; i < outDim; i++) b2.push(0);
    return { w1, b1, w2, b2 };
  }
  function forward(net, inp) {
    const { hid, outDim } = DEFAULTS, h = [];
    for (let j = 0; j < hid; j++) {
      let s = net.b1[j];
      for (let i = 0; i < inp.length; i++) s += net.w1[i * hid + j] * inp[i];
      h.push(Math.tanh(s));
    }
    const o = [];
    for (let k = 0; k < outDim; k++) {
      let s = net.b2[k];
      for (let j = 0; j < hid; j++) s += net.w2[j * outDim + k] * h[j];
      o.push(s);
    }
    return o;
  }
  function mutate(net, rand, sigma) {
    const m = (a) => a.map((v) => v + (rand() + rand() + rand() - 1.5) * sigma);
    return { w1: m(net.w1), b1: m(net.b1), w2: m(net.w2), b2: m(net.b2) };
  }
  const HIT_WEIGHT = 100; // Round 3 honesty pass: at the frame cap a 0-hit
  // survivor scores exactly maxFrames; ANY hit adds 100, so once survival
  // saturates, hitting is the only way to climb. Skill, not parking luck.
  const EFFECTIVE_MARGIN = 0.02; // hit registration extends the drawn paddle
  // by this on both sides — one constant for draw AND death-check (no ghost).
  function fitnessOf(frames, hits) { return frames + hits * HIT_WEIGHT; }
  // R50: px is the drawn paddle's LEFT edge (clamp is 1 - paddleW). The hit
  // zone is the drawn paddle extended by ±EFFECTIVE_MARGIN — now TIME-VARYING:
  // the drawn width decays shrink^frames floored at paddleMin, and the zone
  // follows it exactly (one law for draw AND death-check, no ghost anywhere).
  function effectivePaddle(g) {
    const D = DEFAULTS, frames = g.frames || 0;
    const w = Math.max(D.paddleMin, D.paddleW * Math.pow(D.shrink, frames)) + 2 * EFFECTIVE_MARGIN;
    return { x: g.px - EFFECTIVE_MARGIN, w };
  }
  // R50: the model's decision cadence slows as the game hardens —
  // interval = min(decisionCap, round(decisionInterval + frames*decisionDrift)),
  // floored at 2. L1 uses this; C1 (stepAdv) keeps the fixed decisionInterval
  // cadence by design (its adversarial pressure contract is generation-scored).
  function decisionIntervalAt(g) {
    const D = DEFAULTS, frames = g.frames || 0;
    return Math.min(D.decisionCap, Math.max(2, Math.round(D.decisionInterval + frames * D.decisionDrift)));
  }
  function step(g, action, rand) { // one frame; action held for decisionIntervalAt(g)
    const D = DEFAULTS, swan = rand || Math.random; // seeded in prerun, live-random in browser
    if (g.frames % decisionIntervalAt(g) === 0) g.hold = action;
    g.px = Math.max(0, Math.min(1 - D.paddleW, g.px + g.hold * D.paddleSpeed));
    const sp = D.ballBase * g.speedMul;
    g.x += g.vx * sp; g.y += g.vy * sp;
    if (g.x < 0) { g.x = 0; g.vx = Math.abs(g.vx); }
    if (g.x > 1) { g.x = 1; g.vx = -Math.abs(g.vx); }
    if (g.y < 0) { g.y = 0; g.vy = Math.abs(g.vy); }
    // black swan: angle kick; probability grows as speedMul^swanGrow (R50)
    if (swan() < Math.min(1, D.swanP * Math.pow(g.speedMul, D.swanGrow))) {
      const a = Math.atan2(g.vy, g.vx) + (swan() - 0.5) * 1.2;
      g.vx = Math.cos(a); g.vy = Math.abs(Math.sin(a)) * (g.vy < 0 ? -1 : 1);
    }
    if (!(g.maxSeen >= 1)) g.maxSeen = 1;
    if (g.speedMul > g.maxSeen) g.maxSeen = g.speedMul; // moved-at speed, pre-reset
    // R50 speed law: (1+frames*ramp) — the old linear ramp — compounded by
    // hitBoost^hits (hitBoost is REAL in L1 now: every return makes the ball
    // persistently faster, the same compounding shape C1 documents) PLUS the
    // quadratic accel*frames^2, capped at maxSpeedMul. With accel=0,
    // hitBoost=1, shrink=1, decisionDrift=0, swanGrow=1 this reduces
    // BYTE-EXACTLY to the pre-R50 law (pinned by tests/escalation.test.js).
    g.speedMul = Math.min((1 + g.frames * D.ramp) * Math.pow(D.hitBoost, g.hits) +
                          D.accel * g.frames * g.frames, D.maxSpeedMul);
    g.frames++;
    if (g.vy > 0 && g.y >= 0.94) {
      const eff = effectivePaddle(g);
      if (g.x > eff.x && g.x < eff.x + eff.w) {
        g.vy = -Math.abs(g.vy); g.hits++; // the boost enters next frame's law via hits
        g.x = Math.max(0.02, Math.min(0.98, g.x)); // avoid wall lock
      } else return false; // death
    }
    return true;
  }
  // maxSeen: the max speed multiplier the ball ACTUALLY moved at (sampled at
  // frame start, before the ramp reset and before any hitBoost is applied).
  // Round 41 (R40 finding 2): the old metric returned the final-frame
  // speedMul, so a game ending on a hit frame reported (1+frames*ramp)*1.03 —
  // a boosted value the ball never moved at (playtest trace: maxReported
  // 1.0652 vs maxActual 1.0648).
  function newGame(rand) {
    const a = (rand() * 0.8 + 0.7) * Math.PI * (rand() < 0.5 ? 0.25 : 0.75);
    return { x: 0.5, y: 0.5, vx: Math.cos(a), vy: Math.abs(Math.sin(a)),
             px: 0.42, hold: 0, frames: 0, hits: 0, speedMul: 1, maxSeen: 1 };
  } // R50: L1's hitBoost compounds through the speed law itself (hitBoost^hits);
    //  C1 makes boosts real via its own `boost` field (see stepAdv) — both live.
  function sense(g) {
    return [g.x * 2 - 1, g.y * 2 - 1, g.vx, g.vy * (g.vy > 0 ? 1 : -1) * (g.vy > 0 ? 1 : -0.2),
            (g.px + DEFAULTS.paddleW / 2 - g.x) * 2, Math.min(1, g.speedMul / 3)];
  }
  function playOne(net, rand) {
    let g = newGame(rand);
    while (g.frames < DEFAULTS.maxFrames) {
      const o = forward(net, sense(g));
      const act = o[0] > o[2] ? (o[0] > o[1] ? -1 : 0) : (o[2] > o[1] ? 1 : 0);
      if (!step(g, act, rand)) break;
    }
    return { fitness: fitnessOf(g.frames, g.hits), frames: g.frames, hits: g.hits,
             maxSpeed: g.maxSeen }; // R41: max speed actually moved at, never a trailing phantom boost
  }
  function runGeneration(pop, scored, rand, sigma) {
    const D = DEFAULTS, next = [];
    scored.sort((a, b) => b.fitness - a.fitness);
    for (let i = 0; i < D.elites; i++) next.push(JSON.parse(JSON.stringify(scored[i].net)));
    while (next.length < pop.length)
      next.push(mutate(scored[Math.floor(rand() * D.elites)].net, rand, sigma));
    return next;
  }
  // === edge-ml pattern 1: ring-buffered champion history ===================
  // Port of quilt-edge-ml's ring_buffer.py (bounded FIFO; oldest evicted on
  // overflow) minus the disk layer — in memory, one slot per generation.
  function makeRing(capacity) {
    if (!(capacity >= 1)) throw new RangeError("ring capacity must be >= 1");
    const buf = new Array(capacity);
    let head = 0, count = 0, writes = 0;
    return {
      write(rec) { // FIFO: newest kept, oldest evicted; returns total writes
        buf[(head + count) % capacity] = rec;
        if (count < capacity) count++;
        else head = (head + 1) % capacity;
        return ++writes;
      },
      tail(n) { // last n records in write order (n > size returns all)
        const k = Math.min(n, count), out = new Array(k);
        for (let i = 0; i < k; i++) out[i] = buf[(head + count - k + i) % capacity];
        return out;
      },
      items() { return this.tail(count); },
      get size() { return count; },
      get writes() { return writes; },
      get capacity() { return capacity; },
    };
  }
  // === edge-ml pattern 2: out-of-core streaming fitness evaluation =========
  // Port of quilt-edge-ml's out_of_core.py (stream batches; never load the
  // whole dataset; partial_fit per batch). One candidate per step(); only a
  // bounded elite archive + running stats are retained, so memory is flat no
  // matter the population size, and a browser can spread one generation
  // across animation frames instead of blocking on a synchronous eval loop.
  function makeEvaluator(candidates, evalOne, opts) {
    const eliteK = (opts && opts.eliteK) || DEFAULTS.elites;
    const onTie = (opts && opts.onTie) || null; // tiebreak seam: R21 quantum-coin
    let i = 0, sum = 0;
    let best = null;
    const elites = []; // fitness-desc, length <= eliteK; the ONLY retained records
    return {
      step(n) { // evaluate up to n more candidates; returns progress snapshot
        const stop = Math.min(candidates.length, i + (n === undefined ? 1 : n));
        for (; i < stop; i++) {
          const r = evalOne(candidates[i], i);
          const rec = { index: i, fitness: r.fitness, frames: r.frames,
                        hits: r.hits, maxSpeed: r.maxSpeed, net: candidates[i] };
          sum += r.fitness;
          // R21: equal-fitness challengers used to lose silently (strict > kept
          // the first record = index-order bias, undocumented). The seam stays
          // OFF by default (behavior preserved); prerun wires the receipted
          // quantum coin here (see tools/prerun.js).
          if (!best || r.fitness > best.fitness ||
              (r.fitness === best.fitness && onTie && onTie(rec, best))) best = rec;
          let j = elites.length;
          while (j > 0 && elites[j - 1].fitness < r.fitness) j--; // desc: skip only smaller; stable (new after equals)
          if (j < eliteK) {
            elites.splice(j, 0, rec);
            if (elites.length > eliteK) elites.pop();
          }
        }
        return { done: i >= candidates.length, evaluated: i, total: candidates.length,
                 elites: elites.slice(), best, mean: i ? sum / i : 0 };
      },
      get done() { return i >= candidates.length; },
      get evaluated() { return i; },
    };
  }
  // === Round 3: LLM seam pacing (Round 4: + timeout) =======================
  // Round 2 found the seam fired one fetch per animation frame and applied
  // responses in arrival-burst order. makeSeam enforces the doc'd contract:
  // fire on death/interval (never per frame), ONE request in flight, stale
  // responses dropped by sequence number. Drops are counted, not hidden.
  // Round 4 (queued by Round 3): a hung transport no longer stalls the seam —
  // timeoutMs races the transport; on timeout the seam frees itself, counts
  // the death in dropped.timedOut, and reports an error through onResult.
  // Default timeoutMs=0 keeps the pinned Round-3 behavior (no timer) —
  // opt-in, not a silent semantic change.
  function makeSeam(opts) {
    const transport = opts.transport, minIntervalMs = opts.minIntervalMs || 0;
    const timeoutMs = opts.timeoutMs || 0;
    const schedule = opts.schedule || ((fn, ms) => setTimeout(fn, ms));
    const cancel = opts.cancel || ((h) => clearTimeout(h));
    const now = opts.now || (() => Date.now());
    const onResult = opts.onResult || (() => {});
    let inFlight = false, lastFire = -Infinity, seq = 0;
    const dropped = { inFlight: 0, paced: 0, stale: 0, timedOut: 0 };
    // Stale-drop fence: while fire() refuses during in-flight, a delivered
    // response is always the latest seq — but if a future caller loosens
    // pacing, out-of-order arrivals die here, silently-safe. Fences outrank
    // gates; the counter proves the fence stands (tests/seam.test.js).
    return {
      fire(payload) { // returns the request's seq, or null if refused (counted)
        const t = now();
        if (inFlight) { dropped.inFlight++; return null; }
        if (t - lastFire < minIntervalMs) { dropped.paced++; return null; }
        const mySeq = ++seq; lastFire = t; inFlight = true;
        let settled = false, timer = null;
        // Exactly-once settlement shared by the timeout race and the transport:
        // whichever lands first owns the result; the late arrival dies on the
        // `settled` fence. (A post-timeout transport arrival does NOT count
        // stale — the timeout already owned and counted that request.)
        const settle = (res, err) => {
          if (settled) return; settled = true;
          if (timer !== null) { cancel(timer); timer = null; }
          inFlight = false;
          if (mySeq !== seq) { dropped.stale++; return; }
          onResult(res, mySeq, err);
        };
        if (timeoutMs > 0) timer = schedule(() => {
          dropped.timedOut++;
          settle(null, new Error("seam timeout after " + timeoutMs + "ms"));
        }, timeoutMs);
        Promise.resolve().then(() => transport(payload)).then(
          (res) => settle(res),
          (err) => settle(null, err));
        return mySeq;
      },
      get inFlight() { return inFlight; },
      get lastSeq() { return seq; },
      dropped: dropped, // honest counters — the UI surfaces these
    };
  }
  // === Round 3: micro-JEPA, one representation ===============================
  // Round 2's P1: learn consumed sense() scale ([-1,1]) while infer consumed
  // stateOf() scale ([0,1]) — 16x degradation, advice skewed to constant
  // right-moves. makeJepa takes the sense() vector for BOTH. Node-pinned.
  function makeJepa() {
    let w = [0, 0, 0.5];
    return {
      learn(prevSense, curSense) {
        const pred = w[0] * prevSense[0] + w[1] * prevSense[3] + w[2];
        const err = curSense[0] - pred, lr = 0.05;
        w[0] += lr * err * prevSense[0]; w[1] += lr * err * prevSense[3]; w[2] += lr * err;
      },
      suggest(senseVec) {
        const px = Math.max(-1, Math.min(1, w[0] * senseVec[0] + w[1] * senseVec[3] + w[2]));
        const err = senseVec[0] - px;
        return { move: err < -0.05 ? -1 : err > 0.05 ? 1 : 0, confidence: 0.6, source: "jepa" };
      },
      get weights() { return w.slice(); },
    };
  }
  // === Round 3: shared hash + net ids ========================================
  function hash8(s) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h.toString(16).padStart(8, "0"); }
  function netId(net) { return hash8(JSON.stringify(net)); } // content id — stable across runs for the same weights
  // === Round 3: hash-chained match ledger (MOTH-style, honest bounds) ========
  // Unlike the browser receipt panel (silent shift at 40), evictions are
  // counted and exposed — a bounded ledger that admits it forgets.
  function makeLedger(capacity) {
    if (!(capacity >= 1)) throw new RangeError("ledger capacity must be >= 1");
    const rows = []; let head = "0".repeat(64); // genesis hash, MOTH-compatible length
    let evicted = 0;
    return {
      write(row) {
        const r = Object.assign({}, row, { i: rows.length + evicted, prev: head });
        head = hash8(JSON.stringify(r));
        r.hash = head; rows.push(r);
        if (rows.length > capacity) { rows.shift(); evicted++; }
        return r;
      },
      tail(n) { return rows.slice(-n); },
      items() { return rows.slice(); },
      get head() { return head; },
      get size() { return rows.length; },
      get evicted() { return evicted; },
      get capacity() { return capacity; },
    };
  }
  // === Round 3 (C1): COEVOLUTION — the GAN pair ==============================
  // A second paddle sits at the TOP of the arena. The survivor (bottom) keeps
  // the rally alive exactly as in L1. The ender (top) can BLOCK the ball —
  // sending it back down with a speed boost from wherever the ender's zone
  // meets it — and wants the rally SHORT: kill the survivor fast. Physics are
  // shared with L1 (same step, same effective margin); every draw uses
  // effectivePaddle so the ghost hitbox lie cannot return.
  function newAdvGame(rand) {
    const g = newGame(rand);
    g.ex = 0.42; g.enderHits = 0; g.boost = 1; // boost: hits/blocks accumulate HERE
    return g; // R50: L1 hitBoost is alive (compounds via hitBoost^hits in the
  }            //  speed law); C1 boosts live separately in `boost` — both real.
  function stepAdv(g, actS, actE, rand) { // one frame; both nets act each decisionInterval (FIXED cadence — C1's contract, R50)
    const D = DEFAULTS, swan = rand || Math.random;
    if (g.frames % D.decisionInterval === 0) { g.hold = actS; g.holdE = actE; }
    g.px = Math.max(0, Math.min(1 - D.paddleW, g.px + g.hold * D.paddleSpeed));
    g.ex = Math.max(0, Math.min(1 - D.paddleW, g.ex + (g.holdE || 0) * D.paddleSpeed));
    const sp = D.ballBase * g.speedMul;
    g.x += g.vx * sp; g.y += g.vy * sp;
    if (g.x < 0) { g.x = 0; g.vx = Math.abs(g.vx); }
    if (g.x > 1) { g.x = 1; g.vx = -Math.abs(g.vx); }
    if (swan() < Math.min(1, D.swanP * Math.pow(g.speedMul, D.swanGrow))) { // black swan: same quadratic law as L1 (R50)
      const a = Math.atan2(g.vy, g.vx) + (swan() - 0.5) * 1.2;
      g.vx = Math.cos(a); g.vy = Math.abs(Math.sin(a)) * (g.vy < 0 ? -1 : 1);
    }
    g.speedMul = (1 + g.frames * D.ramp) * g.boost; // C1 speed law UNTOUCHED by R50: boost survives the ramp
    g.frames++;
    if (g.vy < 0 && g.y <= 0.06) { // ender's line (top)
      const eff = effectivePaddle(g); // R50: the ender's zone shrinks on the same law
      if (g.x > eff.x && g.x < eff.x + eff.w) { // ender block: back down, faster
        g.vy = Math.abs(g.vy); g.enderHits++; g.boost *= 1.02;
        g.x = Math.max(0.02, Math.min(0.98, g.x));
      } else g.vy = Math.abs(g.vy); // clean escape past the ender — wall bounce, rally continues
    }
    if (g.vy > 0 && g.y >= 0.94) { // survivor's line (bottom) — same contract as L1
      const eff = effectivePaddle(g); // R50: the survivor's zone shrinks on the same law
      if (g.x > eff.x && g.x < eff.x + eff.w) {
        g.vy = -Math.abs(g.vy); g.hits++; g.boost *= D.hitBoost;
        g.x = Math.max(0.02, Math.min(0.98, g.x));
      } else return false; // death — the ender got its kill
    }
    return true;
  }
  function playAdv(sNet, eNet, rand, maxFrames) {
    const cap = maxFrames || DEFAULTS.maxFrames;
    let g = newAdvGame(rand);
    while (g.frames < cap) {
      const os = forward(sNet, sense(g)), oe = forward(eNet, sense(g));
      const pick = (o) => o[0] > o[2] ? (o[0] > o[1] ? -1 : 0) : (o[2] > o[1] ? 1 : 0);
      if (!stepAdv(g, pick(os), pick(oe), rand)) break;
    }
    const reachedCap = g.frames >= cap;
    const sFitness = fitnessOf(g.frames, g.hits); // survivor: live + hit, L1 semantics
    // ender: short rallies are wins. kill => (cap-frames) + 30/block; surviving
    // to the cap means the ender failed — small consolation for contesting.
    const eFitness = reachedCap ? g.enderHits * 5 : (cap - g.frames) + g.enderHits * 30;
    return { sFitness, eFitness, frames: g.frames, hits: g.hits,
             enderHits: g.enderHits, maxSpeed: g.speedMul,
             outcome: reachedCap ? "SURVIVOR-CAP" : "ENDER-KILL" };
  }
  // One coevolution generation: every survivor faces the ender champion, every
  // ender faces the survivor champion (minimax-style alternating pressure,
  // classic GAN pairing). THE LOSER MUTATES: the side that lost the last
  // head-to-head breeds at 2x sigma this generation (elites are still copied
  // intact — accumulation survives; pressure lands on the loser's offspring,
  // not on its champion's memory). Deterministic given `rand`: same seed =>
  // same populations, same ledger (md5-verified by tools/prerun-coev.js).
  function runCoevGeneration(popS, popE, scoredS, scoredE, rand, sigma, lastOutcome) {
    const D = DEFAULTS;
    scoredS.sort((a, b) => b.sFitness - a.sFitness);
    scoredE.sort((a, b) => b.eFitness - a.eFitness);
    const champS = scoredS[0], champE = scoredE[0];
    const breed = (scored, sig) => {
      const next = [];
      for (let i = 0; i < D.elites; i++) next.push(JSON.parse(JSON.stringify(scored[i].net)));
      while (next.length < scored.length)
        next.push(mutate(scored[Math.floor(rand() * D.elites)].net, rand, sig));
      return next;
    };
    const sigS = lastOutcome === "ENDER-KILL" ? sigma * 2 : sigma;   // the loser mutates harder
    const sigE = lastOutcome === "SURVIVOR-CAP" ? sigma * 2 : sigma;
    const nextS = breed(scoredS, sigS), nextE = breed(scoredE, sigE);
    const loserId = lastOutcome === "SURVIVOR-CAP" ? netId(champE.net)
                  : lastOutcome === "ENDER-KILL" ? netId(champS.net) : null;
    return { popS: nextS, popE: nextE,
             sChamp: champS, eChamp: champE, loserId,
             sigS, sigE };
  }
  // === Round 3: stats line + honesty badge ===================================
  function formatStats(gen, games, best) {
    let s = `gen ${gen} · games ${games} · best ${best.fitness | 0} (frames ${best.frames}, ${best.hits} hits, speed x${best.maxSpeed.toFixed(2)})`;
    if (best.hits === 0 && best.frames >= DEFAULTS.maxFrames / 2) s += " · ⚠ 0-hit luck — survival without skill";
    return s;
  }
  // === Round 3: the wristband registry =======================================
  // What the demo's "claims verified" badge renders from. proofTest names the
  // node --test file that pins the claim; null = browser-only (honest amber).
  // tests/honesty.test.js pins the two-way match between this list and tests/.
  const VERIFIED_CLAIMS = [
    { id: "fitness-weights", claim: "fitness = frames + hits×100 — a capped 0-hit survivor cannot top a hitter", proofTest: "tests/honesty.test.js" },
    { id: "ring-buffer", claim: "the champion ring is bounded FIFO with a monotonic write counter (Round 2)", proofTest: "tests/ring.test.js" },
    { id: "evaluator-elites", claim: "streaming evaluator elites equal brute-force top-K, archive stays bounded (Round 2)", proofTest: "tests/streaming.test.js" },
    { id: "effective-paddle", claim: "the drawn paddle IS the registered hitbox (0.20 incl. ±0.02 margins)", proofTest: "tests/honesty.test.js" },
    { id: "swan-seeded", claim: "black swans draw from the passed rng — seeded runs are bit-reproducible", proofTest: "tests/honesty.test.js" },
    { id: "stats-badge", claim: "the stats line shows hits and flags 0-hit luck champions", proofTest: "tests/honesty.test.js" },
    { id: "jepa-features", claim: "micro-JEPA learns and infers on the same sense() representation", proofTest: "tests/jepa.test.js" },
    { id: "llm-pacing", claim: "LLM advice fires on death/interval, one in flight, stale dropped, hung requests time out (Round 4)", proofTest: "tests/seam.test.js" },
    { id: "coev-rules", claim: "C1 coevolution: ender blocks return the ball downward; only the survivor's line can die", proofTest: "tests/coev.test.js" },
    { id: "coev-determinism", claim: "C1 coevolution is seeded-deterministic — same seed, same champions and ledger", proofTest: "tests/coev.test.js" },
    { id: "coev-glue", claim: "the browser C1 training loop runs end-to-end — evaluator→map→runCoevGeneration→h2h, champions are real nets, ledger rows hash-chain (Round 5)", proofTest: "tests/coev-glue.test.js" },
    { id: "seam-glue", claim: "the seam stamps the asking gameId at fire — a dead game's reply is dropped, never rebranded onto its successor (Round 6)", proofTest: "tests/seam-glue.test.js" },
    { id: "receipt-glue", claim: "the receipt panel counts its evictions like makeLedger — 'N shown / M evicted' after the 40-row bound (Round 7)", proofTest: "tests/receipt-glue.test.js" },
    { id: "page-parse", claim: "every inline <script> block in index.html parses and is brace-balanced — a merge that breaks the page trips this pin (Round 8)", proofTest: "tests/page-parse.test.js" },
    { id: "loadcoev-glue", claim: "loadCoev banners the chain it actually displays — the stats-line ledger head equals the displayed (re-anchored) ledger's head, with the artifact's true head disclosed beside it (Round 9)", proofTest: "tests/loadcoev-glue.test.js" },
    { id: "popslider-glue", claim: "coev populations honor the games-at-once slider in BOTH directions — a shrink pins popS/popE to n exactly like the classic loop (Round 10)", proofTest: "tests/popslider-glue.test.js" },
    { id: "receiptkind-glue", claim: "the receipt ledger names the advisor that fired — jepa/moth/qa-sim rows carry their own kind, not a bare 'L2' (Round 11)", proofTest: "tests/receiptkind-glue.test.js" },
    { id: "qarefusal-glue", claim: "the qa tile admits exhaustion honestly — a silent channel (empty pot under the sim's shots floor, or a real QPAM backend's underflow) receipts a QA-REFUSAL row instead of dropping silently (Round 12)", proofTest: "tests/qarefusal-glue.test.js" },
    { id: "qapot-glue", claim: "the exhaustion seam is playable in-page — the shots/bin pot control depletes the QPAM stand-in below its floor, the tile renders the silent channel (POT EMPTY), and the ledger receipts QA-REFUSAL (Round 13)", proofTest: "tests/qapot-glue.test.js" },
    { id: "coev-panel-glue", claim: "the C1 panel is honest — MOTH receipts and the C1 ledger render as two labeled sections of one panel, each keeping its own eviction accounting; no writer clobbers the other chain (Round 14)", proofTest: "tests/coev-panel-glue.test.js" },
    { id: "confidence-strip-glue", claim: "the tile's 64x12 strip plots the confidence-vs-pot envelope from the cached measured grid — null below the floor, rising to the sim-cap asymptote, trend pinned at module+glue level (Round 15)", proofTest: "tests/confidence-strip-glue.test.js" },
    { id: "testcmd-docs", claim: "EXPERIMENTS.md names the canonical suite command (glob form) and flags the bare directory form's opaque failure on Node 22 (Round 15)", proofTest: "tests/testcmd-docs.test.js" },
    { id: "byo-qpam-seam", claim: "the BYO real-QPAM endpoint seam degrades honestly — JEV-invalid payload, fetch failure, or no endpoint receipts a byo-qpam-fallback and falls back to the labeled sim at the same seed/pot, never silent; wire = 64 base64 8-bit shot bins + shotsPerBin, and a real backend's confidence is not sim-capped (Round 16)", proofTest: "tests/byo-seam.test.js" },
    { id: "diet-compare", claim: "the advisor-diet comparison tool pins the page's shipped moth heuristic verbatim and replays each seeded game identically for every diet — differences are the advisor's, not the weather's (Round 16)", proofTest: "tests/diet-compare.test.js" },
    { id: "byo-page-glue", claim: "the BYO endpoint field is wired in-page — the qa branch POSTs to a filled endpoint on the paced seam (death/interval, one in flight, gameId-tagged), a real reply is receipted 'byo-qpam' un-capped, a degrade receipts 'byo-qpam-fallback' with its advice NAMED 'qa-sim', and an empty endpoint keeps the seam closed with zero network (Round 16 item 5)", proofTest: "tests/byo-page-glue.test.js" },
    { id: "byo-persist-glue", claim: "the BYO endpoint URL survives refresh — boot restores pq.byoQpamEndpoint into the field, typing persists, clearing deletes the key so storage can never reopen a closed seam; pq.byoQpamEndpoint is the page's ONLY localStorage key and the LLM key still never leaves page memory (Round 18)", proofTest: "tests/byo-persist-glue.test.js" },
    { id: "readme-count", claim: "the README's stated test counts are run-verified — a pin respawns the canonical suite (self-excluded, no recursion) plus tools/test-qa.js, parses the tap pass-summaries, and fails if the prose numbers drift; a hardcoded count can never silently rot again (Round 19)", proofTest: "tests/readme-count.test.js" },
    { id: "canonical-index", claim: "the PLAYLOG canonical index and the ## Round headings are the same fact viewed twice — every Round heading has an index row and every R<N> index row has a heading (the retitled R2-artifact row exempt), so a round can never again ship without its index row (Round 19)", proofTest: "tests/canonical-index.test.js" },
    { id: "coev-qarefusal-glue", claim: "the C1 coev ledger path admits advisor exhaustion honestly — a live() coev tick with the qa advisor at an empty pot (below the sim floor) receipts a QA-REFUSAL row and a warn stat line through the same l2Suggest(champGame) seam as classic mode, and a live channel still advises through that path (Round 20)", proofTest: "tests/coev-qarefusal-glue.test.js" },
    { id: "quantum-tiebreak", claim: "equal-fitness champion ties are broken by a receipted quantum coin, not silent index order — the makeEvaluator onTie seam keeps default behavior off, prerun wires a seeded mock of quilt-quant's coin-toss-v1 (live moth-quantum engine cited, live:false explicit, every flip journaled to checkpoints/curve.json tiebreaks — H keeps AND T swaps, the journal is symmetric and auditable) (Round 21, receipt-symmetrized Round 22)", proofTest: "tests/quantum-tiebreak-glue.test.js" },
    { id: "receipt-completeness", claim: "every merged round branch is receipted — tools/receipt-completeness.js diffs git first-parent merge history (r<N>-*, playtest-round-<N> branch names) against the PLAYLOG canonical index and exits 1 naming any merged round with no row (R34's PR #44 loss is the replayed FAIL-first case); a merge-less/shallow history is REFUSED, never a quiet vacuous green (Round 38)", proofTest: "tests/receipt-completeness.test.js" },
    { id: "wal-stone-v1", claim: "the WAL exporter seals in quilt-stone's stone-v1 forward format — row 0 is a stone.header naming its alg, hashes are sha256 over canonicalJSON([prev, row minus row_hash]) with genesis 'STONE-GENESIS-1', re-keying a payload never moves the chain, tamper is caught at the exact row, and the live seam loads quilt-stone's OWN stone.mjs (closed → null, never faked) (Round 36)", proofTest: "tests/stone-v1-glue.test.js" },
    { id: "stone-sign-pilot", claim: "the birth-seal chain's tip carries a producer ed25519 staple whenever the named quilt-stone checkout ships the stone-v2 sign lane — signTip signs a COPY (the unsigned stone-v1.json stays canonical), verifyTipSignature with the producer public key runs BEFORE write, the signed file labels its key ephemeral unless QUILT_STONE_SIGN_KEY names a stable producer PEM, a refused staple bricks the run (exit 1, no file), and the seam ships closed with a labeled skip when the checkout has no signTip — never silent, never a stand-in (Round 39, STONE-V2-PILOTS first sign pilot)", proofTest: "tests/stone-sign-glue.test.js" },
    { id: "prerun-stone-seal", claim: "the canonical checkpoints are sealed in stone-v1 AT BIRTH — every tools/prerun.js run ends by sealing the four artifacts it just wrote (curve.json, level0/1/2.js) into checkpoints/stone-v1.json as {file, md5} rows, verified BEFORE write (offline mirror always, quilt-stone's own verifyChain live when QUILT_STONE_DIR names a checkout, mirror-only labeled when not), refused loudly (exit 1, no file) on any mismatch, byte-identical across runs, and a stale seal is dropped before the provenance loop so the seal never lists itself (Round 37)", proofTest: "tests/stone-prerun-glue.test.js" },
    { id: "coin-journal-strip", claim: "the tiebreak journal is visible, not just auditable — the page plots every quantum-coin flip from checkpoints/curve.json as a marker strip under the fitness curve (keep dim green / swap bright, x = generation), the label carries the audit sentence (flip count, swap count, live:false), and the label SCREAMS if a live moth flip ever appears; when the data can't load the instrument admits it in amber instead of faking a strip (Round 23)", proofTest: "tests/coin-journal-glue.test.js" },
    { id: "coin-journal-degrade", claim: "the coin journal's degrade path is owned by the renderer, not its caller — renderCoinJournal(null|undefined|[]) renders the amber admission in-renderer (data absent, no throw, no fake ticks), the same vocabulary as the page's fetch-failure instrument, so a malformed curve.json and a dead fetch degrade identically (Round 28)", proofTest: "tests/coin-journal-glue.test.js" },
    { id: "wal-export", claim: "pong-quilt's receipts export into the fleet five-opcode quilt WAL (BIND/LINK/VIEW, fnv1a-64 chained, genesis prev 0000000000000000) in exactly the key shape quilt-doctor's substrate writes — live cross-tool receipt: the export passes quilt_doctor/substrate.py's own QuiltSubstrate.verify() (ok, 5 lines) and a tampered row is caught by the doctor at the exact seq (hash_mismatch@3); weight law: a merged quilt-doctor PR consuming this export citing pong-quilt = candidate VERIFIED edge pq -> quilt-doctor (Round 26)", proofTest: "tests/wal-export-glue.test.js" },
    { id: "wal-session", claim: "the WAL export is fed by a REAL session, not a demo row list — tools/wal-session.js plays a seeded headless classic-mode round through the same core.js step + qa.js suggest modules the browser receipt panel receipts (advice rows named qa-sim, QA-REFUSAL rows produced by the actual exhaustion seam when the pot crosses SIM_POT_FLOOR, DEATH rows at game end), re-anchors every receipt into the fleet five-opcode WAL, and self-verifies; same seed replays byte-identically, and a ledger past the page panel's 40-row bound carries an honest eviction VIEW row (Round 26 session driver)", proofTest: "tests/wal-session-glue.test.js" },
    { id: "coev-ledger-strip", claim: "the C1 coev ledger is as visible as the coin journal — the page plots every head-to-head row from checkpoints/coev.js (ender-kill bright / survivor-cap dim green, x = generation, axis derived from data), the label carries the audit sentence (row/kill/cap counts), an unclassified outcome renders amber and is NAMED, and a missing artifact is admitted in amber instead of faking a strip (Round 25)", proofTest: "tests/coev-strip-glue.test.js" },
    { id: "coev-strip-label-axis", claim: "the coev strip's label agrees with the axis it plots against — the audit sentence carries the DATA-derived axis (gens 0-${axis}), never the raw gens header, so a header that under-reports the data cannot make the label count ticks the plot does not show; the R23 coin-journal lesson now holds on both chains (Round 40 finding 1)", proofTest: "tests/coev-strip-glue.test.js" },
    { id: "amber-admission-source", claim: "the amber degrade admission is ONE source by construction, not three copies by discipline — renderCoinJournal's in-renderer degrade branch, the page's coinJournalUnavailable fetch-failure instrument, and coevStripUnavailable all build their sentence from the single amberAdmission(what, cause) definition (stem and tail byte-identical across all three renders, only the parenthetical per-cause), so the R32 P4 drift class — honesty sentences that disagree about WHY — cannot recur (Round 34)", proofTest: "tests/amber-admission-glue.test.js" },
    { id: "canonical-md5-lineage", claim: "prerun artifact hashes are line-specific doctrine — EXPERIMENTS.md names the post-R21 canonical set (curve 63617065…, L1 643bd132…, L2 454511548…) and the pre-R21 contrast set, and directs verify-by-running at the tip over copying hashes across lines, so the R22 P3-process phantom-mismatch class can never recur (Round 24)", proofTest: "tests/canonical-md5-lineage.test.js" },
    { id: "wal-doctor-e2e", claim: "the doctor-live E2E pin runs the REAL consumer — quilt_doctor/substrate.py loaded live from a local clone (QUILT_DOCTOR_PATH, default /tmp/quilt-doctor) — against the exporter's actual JSONL: clean export verifies ok, a content-tampered row (post-hash file edit, not pre-hash producer input) is caught at the exact seq named hash_mismatch, and the JS mirror verifyQuiltWal agrees with the doctor verdict-for-verdict seq-for-seq why-for-why; offline abstain = named skip, never fake green (Round 29)", proofTest: "tests/wal-doctor-e2e.test.js" },
    { id: "doctor-verdict-glue", claim: "the QA-REFUSAL seam can name an external lens honestly — tools/doctor-verdict.js digests a real SuperInstance/quilt-doctor checkout (HOLISTIC-VIEW + holistic-stats, shape-checked: every row is an exact enumeration with perms === n! — 8!=40320 full-matrix rows AND 5!=120 sufficient-subset rows both legitimate, a Monte-Carlo impostor reads as ABSENT) into a THREE-THINGS verdict line for refusal receipts; the seam ships closed (no checkout -> null -> nothing rendered, never faked), any tamper reads as absent, and the receipt names the observed checkout commit [observed @<short>] — or [observed-commit unresolved] when .git is unreadable — so a drifted doctor can never be silently cited as aa5a041 (Rounds 24, 32, 47)", proofTest: "tests/doctor-verdict-glue.test.js" },
    { id: "coev-birth-seal", claim: "the C1 coev birth rows are sealed into a stone-v1 chain at birth — prerun-coev seals checkpoints/coev.js into checkpoints/coev-stone-v1.json mirror-first (exactly like wal-session-stone R38 and prerun's own checkpoint seal R37), verifies BEFORE write against both the offline mirror and quilt-stone's own verifyChain when a checkout is named, and refuses loudly (exit 1, no file) on any mismatch (Round 45)", proofTest: "tests/coev-birth-seal.test.js" },
    { id: "wal-page-glue", claim: "the WAL exporter is wired ONTO the page, dual-loaded from the same pinned tools/wal-export.js — a 'WAL quilt (download)' button re-anchors the live receipt panel's rows into the fleet WAL (BIND genesis + one LINK per row, the panel's own display hash carried inside args as provenance so the two chains are never confused), the export is verified before download and a non-ok verdict receipts WAL-EXPORT/REFUSED with no file saved, an empty panel exports a genesis-only chain receipted WAL-EXPORT/EMPTY, and re-exporting after a new receipt produces a different chain — the page reads the live panel, never a stale copy (Round 30, the R26-booked wal-session→page follow-on)", proofTest: "tests/wal-page-glue.test.js" },
    { id: "doctor-lens-page-glue", claim: "the external lens reaches the PAGE's refusal stat surface — qa.js setDoctorLens()/lensSuffix() carry the Round 24 doctor-verdict line onto both QA-REFUSAL render sites in the real qaSuggest() slice; the seam ships closed (null/empty/non-string lens renders the exact pre-R27 line, never a placeholder) and both render sites are wired (Round 27)", proofTest: "tests/doctor-lens-page-glue.test.js" },
    { id: "wal-session-cli", claim: "the wal-session CLI fails loudly on misuse — an unrecognized positional arg or flag, or a valueless --out, prints usage to stderr and exits non-zero instead of silently defaulting the seed or leaking a raw TypeError from fs.writeFileSync(undefined) (Round 33)", proofTest: "tests/wal-session-cli.test.js" },
    { id: "seed-zero-honesty", claim: "an explicit seed is played verbatim — 0 is a real seed (PQ.rng(0) is a valid LCG stream), never falsy-collapsed into the default by `|| 20260926`, and a non-integer seed is a usage error (exit 2 + usage naming the arg) instead of a silent default; a seed-0 run's stats and WAL genesis name seed 0 and differ from the default session (Round 43, R40 playtest finding 3)", proofTest: "tests/wal-session-seed-honesty.test.js" },
    { id: "wal-session-stone", claim: "the session driver's WAL seals in stone-v1 at birth-on-demand — --stone-out re-anchors the SAME session rows into quilt-stone's canonical stone-v1 forward format via the exporter's toStoneV1 (one dialect in the repo), the seal is verified BEFORE it is written (offline mirror always, quilt-stone's OWN stone.mjs when QUILT_STONE_DIR names a checkout), payload rows are one-for-one the WAL rows, same seed re-seals byte-identically, post-write tamper is caught at the exact row, a bogus checkout degrades to a labeled mirror-only receipt never a fake live line, and a valueless --stone-out is a usage error (Round 38)", proofTest: "tests/wal-session-stone.test.js" },
    { id: "maxspeed-honesty", claim: "the L1 maxSpeed metric is the max speed multiplier the ball ACTUALLY moved at — sampled at frame start before the ramp reset and before any hitBoost; a game ending on a hit frame no longer reports the trailing (1+frames*ramp)×1.03 value the ball never moved at (Round 41, R40 playtest finding 2: trace maxReported 1.0652 vs maxActual 1.0648)", proofTest: "tests/maxspeed-honesty.test.js" },
    { id: "site-glue", claim: "the website's demo copies are byte-identical to the repo working tree under a build-sealed sha256 provenance receipt (site/generated/provenance.json); /api/replay re-runs the same core.js in the worker and is seed-deterministic (same seed → same receipt digest) with checkpoint-name and seed-range validation; /api/judge replays the claimed game before judging and abstains with a named skip when no JEV key is bound; /api/moth reads the live moth ledger without spending credits and abstains named when unbound; every judge verdict AND every abstain is recorded on the server-side Claim Wall when its KV is bound, and the wall itself abstains named when unbound — every backend seam honest or absent, never faked (Round 42, wall R44)", proofTest: "tests/site-glue.test.js" },
    { id: "site-interactive", claim: "the Engine Room renders replay receipts inline — same seed → same digest, every receipt linkable (?level&seed) and re-runnable by anyone, the 8-seed sweep renders a distribution (determinism is per-seed, not global) — and the champion-lineage + coevolution panels render in the visitor's browser from the same committed checkpoint/curve/coev artifacts the demo loads: consumed as designed via script tags and fetch, never re-typed, never re-implemented (Round 44)", proofTest: "tests/site-glue.test.js" },
    { id: "artifact-maxspeed-lineage", claim: "the canonical L1/L2 checkpoints carry the post-R42 line's moved-at maxSpeed values (3.497 / 3.476) and EXPERIMENTS.md declares that line — a metric-semantics change can no longer drift the embedded artifact fields silently; it trips this pin and forces a declared re-embed (Round 42, R42 playtest finding 2: the R41 receipt's 'md5 set byte-frozen' claim was falsified at the file level — prerun.js embeds maxSpeed in level1/level2, which the R41 metric change rewrites; populations byte-identical)", proofTest: "tests/artifact-maxspeed-lineage.test.js" },
    { id: "escalation", claim: "difficulty escalates over time so a perfect-reaction oracle ALWAYS eventually dies: speedMul = min((1+frames*ramp)·hitBoost^hits + accel·frames², maxSpeedMul); the paddle width decays shrink^frames floored at paddleMin; the model's decision interval grows decisionDrift per frame capped at decisionCap; swan probability scales as speedMul^swanGrow; with accel=0, hitBoost=1, shrink=1, decisionDrift=0, swanGrow=1 the physics is byte-identical to the pre-R50 law (R50)", proofTest: "tests/escalation.test.js" },
    { id: "loadcoev-train-glue", claim: "loadCoev() seeds coev populations — the artifact-load -> Train journey runs verbatim end-to-end with no throw, populations materialize at slider size as real nets, genC advances past the artifact's gens, and the ledger grows by exactly one receipted h2h row (R49 P1, survived R49→R52 in the shipped-artifact lane; pinned R53, FAIL-first against 9b27d15)", proofTest: "tests/r53-loadcoev-train-glue.test.js" },
    { id: "loadcoev-continuation-glue", claim: "loadCoev seeds the coev populations AROUND the loaded champions (slider-σ mutations of sChamp/eChamp), so artifact training genuinely continues: after one Train generation the bred champion is a close descendant of the artifact champ (L2 pinned; random-seed arm is 23× farther) and benches ~5× the random-seed arm against the artifact ender over a K=30 fixed benchmark — 1251 vs 240, artifact champ self-bench 1259 (R54, R53 spec item 1)", proofTest: "tests/r54-loadcoev-continuation-glue.test.js" },
    { id: "coev-cadence-honesty", claim: "the coev HUD prints the decision cadence the C1 game ACTUALLY uses — draw() picks per mode: coev prints the FIXED D.decisionInterval that stepAdv decides on (annotated '(C1 fixed)', the R50 contract), classic keeps the drifting decisionIntervalAt law — so the HUD and the projection-cells countdown bar can never again display L1's drifting cadence (1/16f at ~2000f) while the coev game decides every 4f (R55, R54 finding 3)", proofTest: "tests/r55-coev-cadence-glue.test.js" },
    { id: "cells-render", claim: "projection cells / fitness strip / receipt panel render live", proofTest: null },
  ];
  return { DEFAULTS, rng, makeNet, forward, mutate, step, newGame, sense, playOne,
           runGeneration, makeRing, makeEvaluator,
           HIT_WEIGHT, EFFECTIVE_MARGIN, fitnessOf, effectivePaddle, decisionIntervalAt, formatStats,
           makeSeam, makeJepa, hash8, netId, makeLedger,
           newAdvGame, stepAdv, playAdv, runCoevGeneration, VERIFIED_CLAIMS };
});
