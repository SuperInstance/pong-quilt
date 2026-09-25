// R16 advisor-diet comparison tool (R15 spec item 3, carried since R2 — probe → shipped tool).
// Headless, seeded: the L2 champion (checkpoints/level2.js pop[0] — the page's own
// champNet convention, index.html loadLevel) × diets {none, jepa, moth, qa-sim}
// × a weight sweep, G seeded games per cell, per-diet survival/hits curves under
// ONE seed stream per game index (diet-streams share the game's black swans —
// differences are the advisor's, not the weather's).
//
// The R15 probe's two caveats are fixed here:
//  - the apply-coin is the passed seeded rng (the probe used unseeded Math.random);
//  - jepa state is fresh per game (the probe shared one jepa across runs).
//
// The play loop reuses core.js newGame/sense/forward/step, so physics and net
// behavior are the shipped ones; the only tool-owned piece is the act override,
// which implements the page's shipped apply rule (index.html l2Suggest:
// `Math.random() < s.confidence*w` → blend — here with the seeded coin).
// The moth heuristic is copied VERBATIM from index.html (the l2Suggest branch);
// tests/diet-compare.test.js pins it against the page so a heuristic edit that
// skips the tool trips the pin (GLUE-exhausted convention).
//
// Read-only: emits to stdout; touches no checkpoint (the R13 lesson).
const fs = require("fs"), path = require("path");
const PQ = require("../core.js");
const QA = require("../qa.js");

// index.html:117 — verbatim, the state shape qa-sim's suggest() consumes.
function stateOf(g) { return { ballX: g.x, ballY: g.y, velX: g.vx, velY: g.vy, paddleX: g.px, speed: g.speedMul, frames: g.frames, hits: g.hits }; }
// index.html:151 — verbatim, the shipped moth heuristic.
function mothSuggest(g, D) { return { move: g.vy > 0 ? (g.x < g.px + D.paddleW / 2 ? -1 : 1) : 0, confidence: 0.8, source: "moth" }; }

function loadChampion() {
  const shim = { window: {} };
  const src = fs.readFileSync(path.join(__dirname, "..", "checkpoints", "level2.js"), "utf8");
  new Function("window", src)(shim.window);
  const cp = shim.window.PONG_QUILT_CHECKPOINTS && shim.window.PONG_QUILT_CHECKPOINTS.level2;
  if (!cp) throw new Error("checkpoints/level2.js did not define the level2 checkpoint");
  return cp.pop[0]; // the page's champNet convention (loadLevel)
}

// One L1 game with an optional advisor. Game-level rand stream is passed in so
// every diet sees the SAME game (same serve, same swans) at index i — the
// apply-coin draws from the advisor's OWN stream, so the coin doesn't eat the
// shared weather.
function playDiet(net, diet, w, gameRand, coinRand) {
  const D = PQ.DEFAULTS;
  const g = PQ.newGame(gameRand);
  const jepa = PQ.makeJepa(); // fresh per game — the probe's shared-state caveat
  let prev = null;
  while (g.frames < D.maxFrames) {
    const sv = PQ.sense(g);
    const o = PQ.forward(net, sv);
    let act = o[0] > o[2] ? (o[0] > o[1] ? -1 : 0) : (o[2] > o[1] ? 1 : 0);
    if (diet === "jepa") {
      const s = jepa.suggest(sv);
      if (s && coinRand() < s.confidence * w) act = s.move;
      if (prev) jepa.learn(prev, sv); // page pattern: learn the real transition, death state included
      prev = sv;
    } else if (diet === "moth") {
      const s = mothSuggest(g, D);
      if (s && coinRand() < s.confidence * w) act = s.move;
    } else if (diet === "qa") {
      const s = QA.suggest(stateOf(g), 20260926 + g.frames, 32); // pot at shipped default (above floor)
      if (s && coinRand() < s.confidence * w) act = s.move;
    }
    if (!PQ.step(g, act, gameRand)) break;
  }
  return { frames: g.frames, hits: g.hits };
}

function run(opts) {
  const o = Object.assign({ games: 30, seed: 20260926, weights: [0, 0.5, 1], diets: ["none", "jepa", "moth", "qa"] }, opts);
  const champ = loadChampion();
  const table = {}; // table[w][diet] = {frames:[..], hits:[..]}
  for (const w of o.weights) {
    table[w] = {};
    for (const d of o.diets) table[w][d] = { frames: [], hits: [] };
    for (let i = 0; i < o.games; i++) {
      // every diet replays the SAME game: the game stream is re-seeded per
      // (w, i) from one formula (stateful streams can't be replayed after the
      // first diet drinks them); the coin stream is per (w, i, diet).
      for (const d of o.diets) {
        const gameRand = PQ.rng(o.seed + i * 7919 + Math.round(w * 1000));
        const coinRand = PQ.rng(o.seed + i * 104729 + o.diets.indexOf(d) * 65537 + Math.round(w * 1000));
        const r = playDiet(champ, d, w, gameRand, coinRand);
        table[w][d].frames.push(r.frames); table[w][d].hits.push(r.hits);
      }
    }
  }
  const mean = (a) => +(a.reduce((s, x) => s + x, 0) / a.length).toFixed(1);
  const out = { seed: o.seed, games: o.games, champion: "checkpoints/level2.js pop[0]", weights: {} };
  for (const w of o.weights) {
    out.weights[w] = {};
    for (const d of o.diets)
      out.weights[w][d] = { meanFrames: mean(table[w][d].frames), meanHits: mean(table[w][d].hits) };
  }
  const s1 = out.weights[1] || out.weights[o.weights[o.weights.length - 1]];
  out.orderingAtW1 = Object.keys(s1).sort((a, b) => s1[b].meanFrames - s1[a].meanFrames);
  return out;
}

if (require.main === module) {
  const r = run();
  console.log(`advisor-diet comparison — ${r.games} seeded games/diet, champion ${r.champion}, seed ${r.seed}`);
  for (const w of Object.keys(r.weights)) {
    console.log(`\nw = ${w}`);
    for (const d of Object.keys(r.weights[w]))
      console.log(`  ${d.padEnd(5)} ${String(r.weights[w][d].meanFrames).padStart(7)}f  ${String(r.weights[w][d].meanHits).padStart(5)}h`);
  }
  const top = r.orderingAtW1;
  console.log(`\nordering at w=1 (by mean frames): ${top.join(" > ")}`);
}
module.exports = { run, playDiet, stateOf, mothSuggest };
