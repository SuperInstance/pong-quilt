// Round 65 pin — C1 breeds from the FULL scored populations (R64 mandate item
// 1, the 9th carrying; R56 P3 measured R61/R63/R64, the elite-archive collapse
// + the dead σ-slider in one mechanism).
// The wound (verbatim-measured on pristine main 5406c48 by the R65 scientist
// driver, seed 20260930, slider 96, 3 consecutive gens): continueGenC passed
// snapS.elites — the 4-entry elite archive — to runCoevGeneration as the
// "scored" population, so breed() copied 4 elites and its while-loop
// (`while (next.length < scored.length)`) had nothing to do: bred popS sizes
// [4,4,4], distinct netIds 4, ZERO mutate() calls per gen — the mutation-σ
// slider never reaches mutate() (σ 10 vs σ 100: byte-identical populations AND
// byte-identical stats strings) — and the next startGenC refilled 92
// fresh-random nets per pool (R61's dilution label shipped this truth).
// The fix (R65): the page accumulates the FULL scored population per gen
// (coev.scoreS/scoreE, one record per evaluated candidate — pruner parity with
// tools/prerun-coev.js:99-103, which has always passed full scored arrays) and
// continueGenC passes those to runCoevGeneration. At slider n the bred
// populations are n nets: D.elites intact copies + (n − D.elites) mutated
// offspring, so ≥1 mutation per gen whenever n > 4, the loser-mutates-at-2x-σ
// pressure lands on real offspring, and σ reaches mutate() (R64's P1.5 pin).
// FAIL-first: tests 1 and 3 are RED on pristine main ([4,4,4] + the
// elite-archive-only label); test 2 is RED on pristine main (byte-identical σ).
// All three are GREEN after the fix.
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

// Drive `n` full C1 generations (the stream may need several continueGenC
// calls per generation); return the bred population size after each.
function breedGens(d, n) {
  const sizes = [];
  d.startGenC();
  for (let g = 0; g < n; g++) {
    const pre = d.coev.genC;
    for (let k = 0; k < 24 && d.coev.genC === pre; k++) d.continueGenC();
    if (d.coev.genC === pre) throw new Error("C1 generation did not complete in 24 drives");
    sizes.push({ gen: d.coev.genC, popS: d.coev.popS.length, popE: d.coev.popE.length });
  }
  return sizes;
}

test("GLUE (FAIL-first on pre-R65): C1 breeds from the FULL scored population — at slider 96 three consecutive generations each breed 96 survivors (pruner parity, tools/prerun-coev.js:103), so ≥1 mutation per gen (92 descendants beyond the 4 intact elites) and no fresh-random refill between gens", () => {
  const d = makeDemo(20260930, 10);
  const sizes = breedGens(d, 3);
  // structural proof of ≥1 mutation per gen: runCoevGeneration's breed() output
  // is exactly D.elites deep-copied elites + mutate() pushes until it reaches
  // scored.length — a bred population of 96 cannot exist without 92 mutate()
  // calls, and a scored input of 4 (the old elite archive) can never yield one.
  assert.deepEqual(sizes.map((s) => s.popS), [96, 96, 96],
    `bred popS must be 96 for 3 consecutive gens (R64 P3 measured [4,4,4] on main); got ${JSON.stringify(sizes.map((s) => s.popS))}`);
  assert.deepEqual(sizes.map((s) => s.popE), [96, 96, 96], "the ender pool breeds full-size too");
  assert.equal(d.coev.popS.length, 96, "no pre-breed refill shrank the pool: bred 96 in, 96 out");
  assert.ok(new Set(d.coev.popS.map(PQ.netId)).size > 4,
    "the population is not 4 elite copies: mutated offspring are present");
});

test("P1.5 (FAIL-first on pre-R65): the σ-slider is ALIVE — sigma 10 vs sigma 100 change the offspring distribution from the same seed (different population bytes, different stats lines)", () => {
  const a = makeDemo(20260930, 10); breedGens(a, 3);
  const b = makeDemo(20260930, 100); breedGens(b, 3);
  const popA = JSON.stringify(a.coev.popS), popB = JSON.stringify(b.coev.popS);
  assert.notEqual(popA, popB,
    "σ=10 vs σ=100 must produce different offspring populations (R64: byte-identical — mutate() was dead code in C1)");
  const statsA = a.$els.stats.textContent, statsB = b.$els.stats.textContent;
  assert.notEqual(statsA, statsB,
    "the stats lines must differ too (R64: byte-identical strings across the σ flip)");
  assert.match(statsA, /COEV gen 3/, "both arms ran the full 3 generations");
  assert.match(statsB, /COEV gen 3/, "both arms ran the full 3 generations");
});

test("PRECISION: the stats line tells the new truth — full-population breeding is named, the R61 'elite-archive only' label is gone, and the refill disclosure reports 0", () => {
  const d = makeDemo(20260930, 10);
  breedGens(d, 1);
  const stats = d.$els.stats.textContent;
  assert.match(stats, /COEV gen 1 · games \d+ · h2h /, "R55 coev stats prefix contract intact");
  assert.match(stats, /full-population/, "the breeding source is NAMED (full scored populations)");
  assert.ok(!/elite-archive only/.test(stats),
    "the R61 wound-label must not outlive the wound (it would be the new lie)");
  assert.match(stats, /bred pop 96/, "the bred population size is disclosed");
  assert.match(stats, /mutated offspring/, "the mutation count is disclosed (the σ slider is load-bearing)");
  assert.match(stats, /next-gen refill 0/, "no fresh-random refill at slider 96 — lineage survives");
});
