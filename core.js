/* pong-quilt core — shared by demo (index.html) and tools/prerun.js (Node).
 * KEEP IN SYNC. No dependencies. Numbers verified by running (node tools/prerun.js).
 * The quilt: game state projected into cells -> tiny net -> GA breeding ->
 * speed ramp forces planning ahead -> black-swan perturbations kill certainty.
 *
 * Edge-ML patterns (branch edge-ml-crush, inspired by SuperInstance/quilt-edge-ml):
 *  - makeRing:        bounded FIFO champion history (their ring_buffer.py)
 *  - makeEvaluator:   out-of-core streaming fitness eval (their out_of_core.py)
 *  - swans are rng-seeded when a rand is passed to step/playOne, so
 *    tools/prerun.js is byte-reproducible from DEFAULTS.seed (verified). */
(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) module.exports = factory();
  else root.PongQuilt = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";
  const DEFAULTS = {
    popSize: 48, elites: 4, sigma: 0.12,
    decisionInterval: 4,        // frames between decisions = speed-of-action limit
    paddleW: 0.16, paddleSpeed: 0.02,
    ballBase: 0.004, ramp: 0.0004, hitBoost: 1.03,
    swanP: 0.00008,             // black-swan chance/frame, scales with speed
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
  function step(g, action, rand) { // one frame; action in {-1,0,1} held for decisionInterval
    const D = DEFAULTS, swan = rand || Math.random; // seeded in prerun, live-random in browser
    if (g.frames % D.decisionInterval === 0) g.hold = action;
    g.px = Math.max(0, Math.min(1 - D.paddleW, g.px + g.hold * D.paddleSpeed));
    const sp = D.ballBase * g.speedMul;
    g.x += g.vx * sp; g.y += g.vy * sp;
    if (g.x < 0) { g.x = 0; g.vx = Math.abs(g.vx); }
    if (g.x > 1) { g.x = 1; g.vx = -Math.abs(g.vx); }
    if (g.y < 0) { g.y = 0; g.vy = Math.abs(g.vy); }
    if (swan() < D.swanP * g.speedMul) { // black swan: angle kick
      const a = Math.atan2(g.vy, g.vx) + (swan() - 0.5) * 1.2;
      g.vx = Math.cos(a); g.vy = Math.abs(Math.sin(a)) * (g.vy < 0 ? -1 : 1);
    }
    g.speedMul = 1 + g.frames * D.ramp;
    g.frames++;
    if (g.vy > 0 && g.y >= 0.94) {
      if (g.x > g.px - 0.02 && g.x < g.px + D.paddleW + 0.02) {
        g.vy = -Math.abs(g.vy); g.hits++; g.speedMul *= D.hitBoost;
        g.x = Math.max(0.02, Math.min(0.98, g.x)); // avoid wall lock
      } else return false; // death
    }
    return true;
  }
  function newGame(rand) {
    const a = (rand() * 0.8 + 0.7) * Math.PI * (rand() < 0.5 ? 0.25 : 0.75);
    return { x: 0.5, y: 0.5, vx: Math.cos(a), vy: Math.abs(Math.sin(a)),
             px: 0.42, hold: 0, frames: 0, hits: 0, speedMul: 1 };
  }
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
    return { fitness: g.frames + g.hits * 25, frames: g.frames, hits: g.hits,
             maxSpeed: g.speedMul };
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
          if (!best || r.fitness > best.fitness) best = rec;
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
  return { DEFAULTS, rng, makeNet, forward, mutate, step, newGame, sense, playOne,
           runGeneration, makeRing, makeEvaluator };
});
