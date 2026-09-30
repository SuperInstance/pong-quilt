// Round 66 pin — the C1 lineage-decay receipt (R65 spec item 3, carried
// unbuilt into this round; the measurement shipped here re-scopes the spec's
// naive VERIFY to the law the verbatim driver actually supports).
//
// What the R66 scientist driver measured on main 52b42b4 (all arms verbatim
// startGenC/continueGenC extracted from the working tree, driven with core.js
// as PQ, slider 96, radius L2 2.0 — the R54 receipt resolution):
//
//   ARM A (live full-pop loop, shipped default σ=12): gen-1 bred pop carries
//   22 nets within 2.0 of the gen-1 sChamp; gen 2+ carries 0, and the min L2
//   to the gen-1 anchor GROWS monotonically (2.49 → 2.61 → 2.67 → 2.98 →
//   3.14 → 3.29 → 3.42). Root cause, measured not assumed: one mutate() step
//   at σ=0.12 moves a net ~0.56 in L2, and selection at that scatter does not
//   keep the anchor's close children in the top-4 — close lineage (< 2.0)
//   usually dies in ONE generation at the shipped default.
//   ARM B (fresh-random control, 96 random nets vs the same anchor): 0 within
//   2.0 every draw (min L2 ≈ 2.5) — so at σ=12 one mutation step is
//   genetically equivalent to a random draw AT THE RECEIPT RESOLUTION. The
//   R65 mechanism bred 96 real descendants (never fresh-random — that label
//   stays true); what dies at the default σ is close-lineage VISIBILITY.
//   ARM C (σ=2, the resolvable regime): near-counts [22,27,21,0] — the gen-1
//   champ's lineage CLUSTER survives 2–3 generations (across seeds: gen-2
//   near ∈ {16,27,29,29,24}, 5/5 ≥ 16; survival to gen 3 in 4/5 seeds).
//   ARM D (archive-only replay, the pre-R65 wound regime re-simulated through
//   the same runCoevGeneration primitive with the 4-entry elite archive as
//   the scored input): bred pop 4, near = 1 at gen 1 and 0 from gen 2 — the
//   same measurement the spec proposed CANNOT distinguish the regimes by
//   itself; the discriminating quantity is the gen-2 CLUSTER SIZE.
//
// So the honest law this pin bakes (thresholds at half the 5-seed minimum,
// never a specific measured value — the R61/R64 "printed, not baked" rule):
//   1. at σ=2 (mutation step ~0.094 << radius), the gen-2 population is a
//      lineage cluster: ≥ 8 nets within L2 2.0 of the gen-1 sChamp — and the
//      fresh-random control at the same anchor is 0 (lineage, not chance);
//   2. at the shipped σ=12 the mechanism truth still holds (bred 96 every
//      gen, ≥ 4 exact-copy nets within 2.0 at gen 1) and the gen-2+ close-
//      lineage trajectory is PRINTED, never asserted (seed-dependent: 0 in
//      most seeds, 22–24 in seed 12345 where the anchor's children keep
//      winning — asserting either direction would bake one rng lineage);
//   3. the archive-only counterfactual at σ=2 yields a gen-2 near-count ≤ 2
//      — so test 1's threshold sits in the discriminating zone and the pin
//      goes RED the moment breeding regresses to the elite archive (the
//      wound class R56 P3 / R61 / R63 / R64 / R65 can never silently return).
//   plus: d(sChamp fitness)/d(gen) is printed in both σ arms — the
//   trajectory is selection-noise dominated at 4–8-gen horizons in every
//   seed tried (spiky, never monotone); no fitness-improvement claim is
//   baked anywhere in this file (the R65 spec's "record honestly, even if
//   flat" clause, honored structurally).
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const PQ = require("../core.js");

function extract(fnStart, endMarker) {
  const lines = fs.readFileSync(path.join(__dirname, "../index.html"), "utf8").split("\n");
  const s = lines.findIndex((l) => l.startsWith(fnStart));
  if (s < 0) throw new Error("missing " + fnStart);
  let e = s;
  while (e < lines.length && !lines[e].includes(endMarker)) e++;
  if (e >= lines.length) throw new Error("no end marker for " + fnStart);
  return lines.slice(s, e + 1).join("\n");
}

function l2(a, b) {
  let s = 0;
  for (let i = 0; i < a.w1.length; i++) { const d = a.w1[i] - b.w1[i]; s += d * d; }
  for (let i = 0; i < a.w2.length; i++) { const d = a.w2[i] - b.w2[i]; s += d * d; }
  return Math.sqrt(s);
}

function makeDemo(seed, sigValue) {
  const els = {
    stats: { textContent: "" }, mode: { value: "coev" }, pop: { value: "96" },
    sub: { value: "1" }, sig: { value: String(sigValue) }, dec: { value: "4" }, receipts: { textContent: "" },
  };
  const $ = (id) => els[id] || (els[id] = { textContent: "", value: "" });
  const receiptLog = [];
  const receipt = (kind, move, conf) => receiptLog.push({ kind, move, conf });
  const renderReceipts = () => {};
  const src = [
    extract("function startGenC(){", "eliteK:D.elites});}"),
    extract("function continueGenC(){", "coev.evalS=null;coev.evalE=null;}}"),
  ].join("\n");
  const factory = new Function("window", "PQ", "D", "$", "receipt", "renderReceipts", "randPQ", "els",
    "let champNet=null,champGame=null,gameId=0,gen=0,games=0,pop=Array.from({length:96},()=>PQ.makeNet(randPQ)),evalGen=null,lastSnap=null,champRing=PQ.makeRing(240),coev=null;" +
    src +
    "\nreturn {startGenC,continueGenC,get coev(){return coev},$els:els};");
  return factory({}, PQ, PQ.DEFAULTS, $, receipt, renderReceipts, PQ.rng(seed), els);
}

function breedOneGen(d) {
  d.startGenC();
  const pre = d.coev.genC;
  for (let k = 0;  k < 40 && d.coev.genC === pre; k++) d.continueGenC();
  if (d.coev.genC === pre) throw new Error("C1 generation did not complete in 40 drives");
}

// near-anchor series per generation: {gen, bred, near, minL2, sChampFit}
function lineageSeries(d, gens, anchorNet) {
  const rows = [];
  for (let g = 0; g < gens; g++) {
    breedOneGen(d);
    const near = d.coev.popS.filter((n) => l2(n, anchorNet) < 2.0).length;
    const minL2 = Math.min(...d.coev.popS.map((n) => l2(n, anchorNet)));
    rows.push({ gen: d.coev.genC, bred: d.coev.popS.length, near,
                minL2: +minL2.toFixed(3), sChampFit: d.coev.sChamp.fitness | 0 });
  }
  return rows;
}

test("LINEAGE (R65 spec item 3, re-scoped): at σ=2 — where one mutation step (~0.094) is far below the receipt radius — the gen-2 population is a lineage cluster of the gen-1 sChamp: ≥8 nets within L2 2.0, while the fresh-random control at the same anchor is 0 (proximity is lineage, not chance)", () => {
  const d = makeDemo(20260930, 2);
  breedOneGen(d); // gen 1 — the anchor generation
  const anchor = d.coev.sChamp.net;
  assert.equal(d.coev.popS.length, 96, "mechanism under test: full-pop breeding (bred 96)");
  const g2 = lineageSeries(d, 1, anchor)[0];
  assert.equal(g2.bred, 96, "gen 2 bred full population too (no archive regression)");
  assert.ok(g2.near >= 8,
    `gen-2 cluster: ≥8 nets within L2 2.0 of the gen-1 sChamp (5-seed observed minimum 16; the archive-only counterfactual yields ≤2 — see the discrimination test below); got ${g2.near}`);
  // fresh-random control: 96 independent random nets against the SAME anchor.
  // Empirically (200 batches of 96): the chance band tops out at 5 nets within
  // 2.0 (P(≥6) ≈ 0) — the lineage cluster (16–29 observed) sits far above it.
  const control = Array.from({ length: 96 }, (_, i) => PQ.makeNet(PQ.rng(777000 + i)));
  const controlNear = control.filter((n) => l2(n, anchor) < 2.0).length;
  assert.ok(controlNear <= 5,
    `random nets must not reproduce the cluster (lineage ≠ chance); got ${controlNear}`);
});

test("DEFAULT-σ HONEST RECORD: at the shipped σ=12 the mechanism truth holds (bred 96, ≥4 exact-copy nets within 2.0 at gen 1) and the close-lineage trajectory is PRINTED, never asserted — it is seed-dependent (usually 0 from gen 2, occasionally persists), and d(sChamp)/d(gen) is selection-noise dominated (spiky, never monotone at 4-gen horizon)", () => {
  const d = makeDemo(20260930, 12); // the page's default σ slider value
  breedOneGen(d);
  const anchor = d.coev.sChamp.net;
  // gen-1 cluster, measured in the gen-1 population itself (before any
  // further breeding): 1 exact copy of the anchor + Binomial(92, 1/4)
  // anchor-mutants (breed() draws parents uniformly from the top-4,
  // core.js:405), each one mutation step (~0.56 at σ=0.12) from the anchor —
  // structural floor 4, observed 22–27.
  const gen1Near = d.coev.popS.filter((n) => l2(n, anchor) < 2.0).length;
  assert.ok(gen1Near >= 4,
    `gen 1 must carry the anchor's offspring cluster (≥4 within 2.0: the exact copy plus the anchor-mutant lottery); got ${gen1Near}`);
  const rows = lineageSeries(d, 3, anchor); // gens 2–4, printed not asserted
  // HONEST RECORD — printed to the run log, asserted nowhere (R61/R64 doctrine):
  // at σ=12 the gen-1 champ's close lineage (<2.0) usually dies by gen 2 and
  // the population diffuses into a 2.5–3.5 shell around the anchor; some seeds
  // (12345) keep the anchor's children winning for 3 gens. The experiment's
  // memory gets the number; no rng lineage gets baked.
  console.log(`R66 honest record σ=12 seed 20260930: ${JSON.stringify(rows)}`);
});

test("DISCRIMINATION: the archive-only counterfactual (the pre-R65 wound regime, replayed through the same runCoevGeneration primitive with the 4-entry elite archive as the scored input) yields a gen-2 near-count ≤ 2 — test 1's threshold sits in the discriminating zone, so this pin goes RED if breeding ever regresses to the elite archive", () => {
  const d = makeDemo(20260930, 2);
  breedOneGen(d);
  const anchor = d.coev.sChamp.net;
  breedOneGen(d); // gen 2 completes; page state has the FULL-pop result
  // counterfactual: what gen 2 would have bred had continueGenC passed the
  // 4-entry archive (snapS.elites) instead of the full scored population —
  // exactly the input shape the pre-R65 page line supplied (R56 P3, measured
  // R61/R63/R64, closed R65).
  const scoredS = d.coev.scoreS.slice(), scoredE = d.coev.scoreE.slice();
  scoredS.sort((a, b) => b.sFitness - a.sFitness);
  scoredE.sort((a, b) => b.eFitness - a.eFitness);
  const archS = scoredS.slice(0, PQ.DEFAULTS.elites), archE = scoredE.slice(0, PQ.DEFAULTS.elites);
  const counter = PQ.runCoevGeneration(d.coev.popS, d.coev.popE, archS, archE, PQ.rng(20260930), 0.02, d.coev.last);
  assert.equal(counter.popS.length, 4, "the archive regime breeds 4 — the collapse shape");
  const near = counter.popS.filter((n) => l2(n, anchor) < 2.0).length;
  assert.ok(near <= 2,
    `archive counterfactual gen-2 near-count must be ≤ 2 (only exact copies of the top-4 enter; observed 1 at this seed); got ${near} — if this ever rises to test 1's zone the instrument is blind`);
});
