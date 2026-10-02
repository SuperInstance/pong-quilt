'use strict';
// Queue #2 — C1 scaling study v0 (bounded slice of the queue's "medium"
// item). Question carried since the R66 lineage-decay receipt: does ANY
// scale arm of the shipped C1 coevolution produce a champion-fitness /
// rally-length trajectory beyond the selection-noise band, or is
// d(sChamp)/d(gen) noise-dominated at every population size on the horizon
// the page can actually run? This tool is the path-to-nonzero-learning-delta
// probe: it runs the page's OWN training loop (the tools/prerun-coev.js
// pattern, byte-faithful call sequence into core.js) at several
// (population × generation × seed) arms and receiptes the trajectories.
//
// HONESTY CONTRACT (carried from R66, pinned by tests/c1-scaling.test.js):
// the receipt is DESCRIPTIVE. It prints trajectories and first5/last5
// windows; it asserts NO learning-improvement claim anywhere — per R66,
// d(sChamp fitness)/d(gen) is selection-noise dominated at 4–8-gen horizons
// at shipped σ, and whether longer horizons or larger populations escape
// that band is exactly what this measurement is for. A run whose last5
// window rises is data; calling it "learning" is a claim this tool refuses
// to make. NO-CLAIM MARKER: "scaling trajectory receipt — descriptive, no
// learning claim (R66 law carried)".
//
// Not canonical: this study never touches checkpoints/coev.js — the R45
// birth seal + R37/R38 canonical artifacts stay the one canonical training
// set (EXPERIMENTS.md's sixth-artifact law). Output lands in research/ only.

const fs = require("fs");
const path = require("path");
const PQ = require("../core.js");

const NO_CLAIM = "scaling trajectory receipt — descriptive, no learning claim (R66 law carried)";

// One training arm: the prerun-coev loop verbatim (probe gen 0, then per-gen
// scoring vs the standing champ, runCoevGeneration, champ h2h) — the only
// deltas vs tools/prerun-coev.js are parameterization and array-row tracking
// instead of the canonical ledger (which belongs to the canonical artifact).
function runArm({ pop, gens, seed }) {
  const rand = PQ.rng(seed);
  let popS = Array.from({ length: pop }, () => PQ.makeNet(rand));
  let popE = Array.from({ length: pop }, () => PQ.makeNet(rand));
  let sChamp = { net: popS[0] }, eChamp = { net: popE[0] }, last = null;
  const rows = [];
  const probe = PQ.playAdv(popS[0], popE[0], rand, 1200);
  last = probe.outcome;
  rows.push({ gen: 0, outcome: probe.outcome, frames: probe.frames, sFit: probe.sFitness, eFit: probe.eFitness });
  for (let gen = 1; gen <= gens; gen++) {
    const scoredS = popS.map((net) => { const r = PQ.playAdv(net, eChamp.net, rand, 1200);
      return { net, sFitness: r.sFitness }; });
    const scoredE = popE.map((net) => { const r = PQ.playAdv(sChamp.net, net, rand, 1200);
      return { net, eFitness: r.eFitness }; });
    const bred = PQ.runCoevGeneration(popS, popE, scoredS, scoredE, rand, PQ.DEFAULTS.sigma, last);
    popS = bred.popS; popE = bred.popE;
    const h2h = PQ.playAdv(bred.sChamp.net, bred.eChamp.net, rand, 1200);
    sChamp = { net: bred.sChamp.net }; eChamp = { net: bred.eChamp.net };
    last = h2h.outcome;
    rows.push({ gen, outcome: h2h.outcome, frames: h2h.frames, sFit: h2h.sFitness, eFit: h2h.eFitness });
  }
  return { pop, gens, seed, sigma: PQ.DEFAULTS.sigma, rows };
}

function windowMean(rows, key, from, to) {
  const w = rows.slice(from, to);
  return w.reduce((a, r) => a + r[key], 0) / w.length;
}

// First5/last5 windows over the h2h champion rows — the exact comparison
// shape R66 used, widened to any horizon. Descriptive only.
function summarize(arm) {
  const firstFrom = 1, firstTo = Math.min(6, arm.rows.length);
  const lastTo = arm.rows.length, lastFrom = Math.max(1, lastTo - 5);
  return {
    pop: arm.pop, gens: arm.gens, seed: arm.seed, sigma: arm.sigma,
    rallyFirst5: windowMean(arm.rows, "frames", firstFrom, firstTo),
    rallyLast5: windowMean(arm.rows, "frames", lastFrom, lastTo),
    sFitFirst5: windowMean(arm.rows, "sFit", firstFrom, firstTo),
    sFitLast5: windowMean(arm.rows, "sFit", lastFrom, lastTo),
    kills: arm.rows.filter((r) => r.outcome !== "cap" && r.gen > 0).length,
    windowNote: `windows rows [${firstFrom},${firstTo}) vs [${lastFrom},${lastTo}) of ${arm.rows.length} h2h rows`,
    noLearningClaim: true,
  };
}

// Default study: the three population sizes a page slider can actually
// express (24 / 96 / 192) at a 40-gen horizon × 2 seeds — enough to see
// whether the noise band itself shrinks with population — plus one long
// arm (POP 96 × 160 gens) testing the horizon axis. Runtime ≈ 90s.
function runStudy(opts = {}) {
  const pops = opts.pops || [24, 96, 192];
  const seeds = opts.seeds || [20261001, 20261002];
  const shortGens = opts.shortGens || 40;
  const longArm = opts.longArm !== false;
  const arms = [];
  for (const pop of pops) for (const seed of seeds) arms.push(runArm({ pop, gens: shortGens, seed }));
  if (longArm) arms.push(runArm({ pop: 96, gens: 160, seed: 20261001 }));
  return {
    tool: "tools/c1-scaling.js",
    contract: NO_CLAIM,
    arms: arms.map((a) => ({ config: { pop: a.pop, gens: a.gens, seed: a.seed, sigma: a.sigma }, summary: summarize(a), rows: a.rows })),
  };
}

if (require.main === module) {
  const study = runStudy();
  const out = path.join(__dirname, "..", "research", "c1-scaling-2026-10-01.json");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(study, null, 1) + "\n");
  for (const a of study.arms) {
    const s = a.summary;
    console.log(`c1-scale: pop ${String(s.pop).padStart(3)} gens ${String(s.gens).padStart(3)} seed ${s.seed}  ` +
      `rally ${s.rallyFirst5.toFixed(1)}→${s.rallyLast5.toFixed(1)}  sFit ${s.sFitFirst5.toFixed(1)}→${s.sFitLast5.toFixed(1)}  kills ${s.kills}`);
  }
  console.log(`c1-scale: ${study.arms.length} arms -> ${path.relative(process.cwd(), out)}`);
  console.log(`c1-scale: ${NO_CLAIM}`);
}

module.exports = { runArm, runStudy, summarize, NO_CLAIM };
