// Pre-run the C1 COEVOLUTION lineage: an adversarial GAN pair — a survivor
// population (keeps the rally alive, L1 fitness semantics) and an ender
// population (top paddle; blocks the ball back downward faster and wants the
// rally SHORT). Each generation every survivor faces the ender champion and
// every ender faces the survivor champion; the head-to-head loser mutates
// (2x sigma on its champion slot). Every champion match is receipted into a
// hash-chained ledger with BOTH nets' content ids.
//
// Determinism: every random draw comes from PQ.rng(COEUV_SEED), so two runs
// produce byte-identical checkpoints/coev.js (md5 printed at the end — the
// test in tests/coev.test.js pins the same property on a micro config).
// This lineage is SEPARATE from L0-L2: classic checkpoints stay untouched.
const PQ = require("../core.js");
const fs = require("fs"), path = require("path");
const crypto = require("crypto");

const SEED = 20260924, GENS = 120, POP = 24, SIGMA = PQ.DEFAULTS.sigma;
const rand = PQ.rng(SEED);
const D = PQ.DEFAULTS;

let popS = Array.from({ length: POP }, () => PQ.makeNet(rand));
let popE = Array.from({ length: POP }, () => PQ.makeNet(rand));
const ledger = PQ.makeLedger(GENS + 1);
let sChamp = null, eChamp = null, lastOutcome = null;

// Population-based evaluation (PSRO-style, the standard cure for GAN
// cycling): each survivor faces a RANDOM ender drawn from the ender pool and
// each ender faces a RANDOM survivor. Champion-vs-champion is reserved for
// the head-to-head ledger row (the receipted match with both net ids).
function evaluate() {
  const scoredS = popS.map((net) => {
    const r = PQ.playAdv(net, popE[Math.floor(rand() * popE.length)], rand);
    return { net, sFitness: r.sFitness, frames: r.frames, hits: r.hits };
  });
  const scoredE = popE.map((net) => {
    const r = PQ.playAdv(popS[Math.floor(rand() * popS.length)], net, rand);
    return { net, eFitness: r.eFitness, enderHits: r.enderHits, killIn: r.frames };
  });
  return { scoredS, scoredE };
}

// seed the champions with a generation 0 throw-in match (random vs random)
{
  const probe = PQ.playAdv(popS[0], popE[0], rand);
  sChamp = { net: popS[0], sFitness: probe.sFitness };
  eChamp = { net: popE[0], eFitness: probe.eFitness };
  ledger.write({ gen: 0, sId: PQ.netId(popS[0]), eId: PQ.netId(popE[0]),
                 outcome: probe.outcome, frames: probe.frames,
                 sFit: probe.sFitness, eFit: probe.eFitness,
                 loserId: probe.outcome === "SURVIVOR-CAP" ? PQ.netId(popE[0]) : PQ.netId(popS[0]) });
  lastOutcome = probe.outcome;
  console.log(`gen 0 seed match: ${probe.outcome} in ${probe.frames}f (sFit ${probe.sFitness | 0}, eFit ${probe.eFitness | 0})`);
}

for (let gen = 1; gen <= GENS; gen++) {
  const { scoredS, scoredE } = evaluate();
  const bred = PQ.runCoevGeneration(popS, popE, scoredS, scoredE, rand, SIGMA, lastOutcome);
  popS = bred.popS; popE = bred.popE;
  // head-to-head: the new champions meet, outcome drives next gen's pressure
  const h2h = PQ.playAdv(bred.sChamp.net, bred.eChamp.net, rand);
  sChamp = { net: bred.sChamp.net, sFitness: bred.sChamp.sFitness };
  eChamp = { net: bred.eChamp.net, eFitness: bred.eChamp.eFitness };
  lastOutcome = h2h.outcome;
  ledger.write({ gen, sId: PQ.netId(sChamp.net), eId: PQ.netId(eChamp.net),
                 outcome: h2h.outcome, frames: h2h.frames,
                 sFit: h2h.sFitness, eFit: h2h.eFitness, loserId: bred.loserId });
  if (gen % 5 === 0 || gen === 1)
    console.log(`gen ${gen}: h2h ${h2h.outcome} in ${h2h.frames}f · sChamp ${PQ.netId(sChamp.net)} (${h2h.sFitness | 0}) · eChamp ${PQ.netId(eChamp.net)} (${h2h.eFitness | 0}) · loser ${bred.loserId || "—"}`);
}

const out = "window.PONG_QUILT_COEV=window.PONG_QUILT_COEV||{};\n" +
  "window.PONG_QUILT_COEV=" + JSON.stringify({
    seed: SEED, gens: GENS, pop: POP, hitWeight: PQ.HIT_WEIGHT,
    sChamp: { netId: PQ.netId(sChamp.net), fitness: sChamp.sFitness, net: sChamp.net },
    eChamp: { netId: PQ.netId(eChamp.net), fitness: eChamp.eFitness, net: eChamp.net },
    ledger: ledger.items(), ledgerHead: ledger.head,
    evicted: ledger.evicted,
  }) + ";";
fs.mkdirSync(path.join(__dirname, "..", "checkpoints"), { recursive: true });
const outPath = path.join(__dirname, "..", "checkpoints", "coev.js");
fs.writeFileSync(outPath, out);
const md5 = crypto.createHash("md5").update(fs.readFileSync(outPath)).digest("hex");
console.log(`coev: ${GENS} gens x ${POP}+${POP} nets -> checkpoints/coev.js`);
console.log(`md5  coev.js  ${md5}  (run again — must be identical)`);
console.log(`ledger: ${ledger.size} rows, head ${ledger.head}, evicted ${ledger.evicted}`);
