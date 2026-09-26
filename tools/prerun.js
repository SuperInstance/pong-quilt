// Pre-run the quilt: evolve real checkpoints (L0 random, L1 mid, L2 near-human)
// with the SAME core the browser runs. Output = checkpoint JS files the demo
// loads, so "pick up from a real starting state" is literally true.
//
// Edge-ML round (branch edge-ml-crush, inspired by SuperInstance/quilt-edge-ml):
//  - evaluation streams through PQ.makeEvaluator (their out-of-core pattern);
//    only the bounded elite archive + stats survive each generation.
//  - champion fitness accrues in a PQ.makeRing (their ring_buffer pattern) and
//    is emitted as checkpoints/curve.json — the fitness curve as a real artifact.
//  - black swans draw from the seeded rng, so this script is byte-reproducible:
//    same DEFAULTS.seed -> identical checkpoint bytes. Verified by running
//    twice and diffing (see PLAYLOG Round 2).
// Round 3 (branch round-3-builder): fitness = frames + hits*100 (HIT_WEIGHT),
// so a 0-hit luck champion can never top a hitter (honesty pass). Checkpoints
// regenerated under the new weights; md5 of every emitted file is printed so
// provenance is a checksum, not a promise.
// Round 21 (branch r21-quantum-coin-tiebreak): equal-fitness champion ties are
//  broken by a RECEIPTED QUANTUM COIN, citing SuperInstance/quilt-quant's
//  coin-toss-v1 (live moth-quantum API, lab/play.mjs — job-id journaled, mock
//  flag explicit). CI has no network: the coin is the SEEDED MOCK stand-in,
//  drawn from the same `rand` stream that makes this script byte-reproducible,
//  and every flip lands in checkpoints/curve.json as {gen, incumbent, challenger,
//  coin, engine: 'coin-toss-v1', live: false}. Honesty: mock is labeled, never
//  laundered as live quantum entropy. Weight law: a merged PR here citing
//  quilt-quant's coin = candidate VERIFIED referral edge qt-quant -> pong-quilt.
const PQ = require("../core.js");
const fs = require("fs"), path = require("path");
const crypto = require("crypto");
const D = PQ.DEFAULTS;
const rand = PQ.rng(D.seed);
const TOTAL_GENS = 260, CURVE_SAMPLES = 20;
let pop = Array.from({ length: D.popSize }, () => PQ.makeNet(rand));
const champRing = PQ.makeRing(TOTAL_GENS + 1); // one slot per generation, bounded
const tieReceipts = []; // every coin flip, curve.json-bound
let curGen = 0;
// The quantum-coin tiebreak (seeded mock of quilt-quant coin-toss-v1):
// on equal fitness, incumbent keeps on heads, challenger takes on tails.
function quantumCoinTiebreak(rec, incumbent) {
  const heads = rand() < 0.5;
  if (heads) return false;
  tieReceipts.push({ gen: curGen, incumbent: incumbent.index, challenger: rec.index,
                     coin: 'T', engine: 'coin-toss-v1', live: false,
                     citation: 'SuperInstance/quilt-quant lab/play.mjs coin-toss-v1' });
  return true;
}
let scored = null;
function evaluate() { // stream the population; retain elites only (flat memory)
  const ev = PQ.makeEvaluator(pop, (net) => PQ.playOne(net, rand),
                              { eliteK: D.elites, onTie: quantumCoinTiebreak });
  let snap; // each step() returns a snapshot; the last one is the generation result
  while (!ev.done) snap = ev.step(8); // batch size is a scheduling detail, not semantics
  return snap;
}
function recordChamp(gen) {
  champRing.write({ gen, fitness: scored.best.fitness, frames: scored.best.frames,
                    hits: scored.best.hits, maxSpeed: +scored.best.maxSpeed.toFixed(3) });
}
function emit(level, gen) {
  const best = scored.best;
  const js = "window.PONG_QUILT_CHECKPOINTS=window.PONG_QUILT_CHECKPOINTS||{};\n" +
    `window.PONG_QUILT_CHECKPOINTS["${level}"]=` + JSON.stringify({
      gen, bestFitness: best.fitness, bestFrames: best.frames, bestHits: best.hits,
      maxSpeed: +best.maxSpeed.toFixed(3), pop }) + ";";
  fs.writeFileSync(path.join(__dirname, "..", "checkpoints", `${level}.js`), js);
  console.log(`${level}: gen ${gen} best fitness ${best.fitness | 0} ` +
    `(frames ${best.frames}, hits ${best.hits}, speed x${best.maxSpeed.toFixed(2)})`);
}
function emitCurve() {
  const items = champRing.items();
  const step = Math.max(1, Math.floor(items.length / CURVE_SAMPLES));
  const samples = items.filter((_, i) => i % step === 0 || i === items.length - 1)
    .map(({ gen, fitness }) => ({ gen, fitness }));
  fs.writeFileSync(path.join(__dirname, "..", "checkpoints", "curve.json"),
    JSON.stringify({ seed: D.seed, gens: TOTAL_GENS, ringWrites: champRing.writes,
                     tiebreaks: tieReceipts, samples }, null, 1));
  console.log(`curve: ${champRing.writes} generations sampled to ${samples.length} points -> checkpoints/curve.json` +
    (tieReceipts.length ? `; ${tieReceipts.length} quantum-coin tiebreak(s)` : "; no champion ties"));
}
fs.mkdirSync(path.join(__dirname, "..", "checkpoints"), { recursive: true });
scored = evaluate();
recordChamp(0);
emit("level0", 0);
for (let g = 1; g <= 60; g++) {
  curGen = g;
  pop = PQ.runGeneration(pop, scored.elites, rand, D.sigma);
  scored = evaluate();
  recordChamp(g);
}
emit("level1", 60);
for (let g = 61; g <= TOTAL_GENS; g++) {
  curGen = g;
  pop = PQ.runGeneration(pop, scored.elites, rand, D.sigma);
  scored = evaluate();
  recordChamp(g);
}
emit("level2", TOTAL_GENS);
emitCurve();
const cpDir = path.join(__dirname, "..", "checkpoints");
for (const f of fs.readdirSync(cpDir).sort()) {
  const md5 = crypto.createHash("md5").update(fs.readFileSync(path.join(cpDir, f))).digest("hex");
  console.log(`md5  ${f}  ${md5}`);
}
console.log("checkpoints written:", fs.readdirSync(cpDir).join(", "));
