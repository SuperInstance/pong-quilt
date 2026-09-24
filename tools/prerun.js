// Pre-run the quilt: evolve real checkpoints (L0 random, L1 mid, L2 near-human)
// with the SAME core the browser runs. Output = checkpoint JS files the demo
// loads, so "pick up from a real starting state" is literally true.
const PQ = require("../core.js");
const fs = require("fs"), path = require("path");
const D = PQ.DEFAULTS;
const rand = PQ.rng(D.seed);
let pop = Array.from({ length: D.popSize }, () => PQ.makeNet(rand));
let scored = pop.map((n) => ({ net: n, ...PQ.playOne(n, rand) }));
function emit(level, gen) {
  const best = scored[0];
  const js = "window.PONG_QUILT_CHECKPOINTS=window.PONG_QUILT_CHECKPOINTS||{};\n" +
    `window.PONG_QUILT_CHECKPOINTS["${level}"]=` + JSON.stringify({
      gen, bestFitness: best.fitness, bestFrames: best.frames, bestHits: best.hits,
      maxSpeed: +best.maxSpeed.toFixed(3), pop }) + ";";
  fs.writeFileSync(path.join(__dirname, "..", "checkpoints", `${level}.js`), js);
  console.log(`${level}: gen ${gen} best fitness ${best.fitness | 0} ` +
    `(frames ${best.frames}, hits ${best.hits}, speed x${best.maxSpeed.toFixed(2)})`);
}
fs.mkdirSync(path.join(__dirname, "..", "checkpoints"), { recursive: true });
scored.sort((a, b) => b.fitness - a.fitness);
emit("level0", 0);
for (let g = 1; g <= 60; g++) {
  pop = PQ.runGeneration(pop, scored, rand, D.sigma);
  scored = pop.map((n) => ({ net: n, ...PQ.playOne(n, rand) }));
}
emit("level1", 60);
for (let g = 61; g <= 260; g++) {
  pop = PQ.runGeneration(pop, scored, rand, D.sigma);
  scored = pop.map((n) => ({ net: n, ...PQ.playOne(n, rand) }));
}
emit("level2", 260);
console.log("checkpoints written:", fs.readdirSync(path.join(__dirname, "..", "checkpoints")).join(", "));
