// Round 85 — the live near-anchor count pin (R84 spec item 1, 8th carrying,
// first build).
//
// Wound closed: R66 measured the C1 lineage law — at σ=2 the gen-1 sChamp's
// close cluster (nets within L2 2.0 of the anchor) survives at gen 2 (≥8,
// observed 16–29); at σ=12 one mutation step (~0.56) diffuses the offspring
// and the close lineage usually dies by gen 2 (min L2 to the anchor grows
// 2.49 → 3.42) — and disclosed it ONLY in tests/r66-c1-lineage-decay-glue.test.js
// and the sigLine's "UNMEASURED for 3+ gen" tail. The player moving the σ
// slider could not SEE the law. This pin renders the count live beside the
// σ slider — a VIEW over the live population recomputed each bred generation,
// never a cached or default number.
//
// Design wound measured BEFORE building (the tautology trap): counting nets
// near the CURRENT champ each gen overlaps the σ=2 and σ=12 regimes
// completely (gen-2 counts vs the moving champ: σ=2 → 44/42/57/27/96,
// σ=12 → 75/54/96/73/16 across seeds 1–5) — selection keeps children near
// the winner BY CONSTRUCTION, so winner-proximity asserts nothing about the
// slider. The R66 law is the GEN-1 LINEAGE ANCHOR's cluster persistence.
// The page therefore anchors ONCE per population lineage (the first bred
// sChamp after fresh materialization or file load — R85) and measures
// distance to THAT anchor.
//
// Tests (harness: the R66/R80 verbatim-extraction pattern, slider 96):
//  (1) NEAR-COUNT-ON-LINE — two C1 gens at σ=2 and the #anchornear element
//      carries "near-anchor N/96 nets within L2 2.0 of the g1 sChamp", N an
//      integer ≥ 1 (the anchor itself is in the population).
//  (2) SIGMA-LAW — the spec's VERIFY: 5 seeds × 2 gens at σ=2 vs σ=12,
//      near-count at gen 2 measured against the gen-1 anchor:
//      median(σ=2) > median(σ=12), median(σ=2) ≥ 8 (cluster regime),
//      median(σ=12) ≤ 5 (diffuse regime). Measured pre-pin across seeds
//      1–5: σ=2 → {29,32,39,0,96} (median 32), σ=12 → {0,54,0,0,28}
//      (median 0). Per-seed variance is real (selection can kill even a
//      σ=2 lineage — R66's honest record) so the law is pinned at the
//      median, never per-seed.
//  (3) EMPTY-BEFORE-TRAIN — a fresh page writes nothing to #anchornear
//      (the element ships empty; no fabricated default value).
//  (4) ANCHOR-PERSISTS — after 4 gens the text still names the g1 anchor:
//      the anchor is fixed per lineage, never re-anchored mid-lineage
//      (re-anchoring would regress to the measured tautology), and the
//      count re-parses (a live VIEW, recomputed each bred gen).
//  (5) LOAD-REANCHORS — source-level: the C1 file-load branch re-anchors at
//      the loaded file's own shipped champ (anchorNet from q.sChamp), so a
//      stale anchor from a previous session can never measure the new
//      population against the wrong lineage (R67 load-path wound class).
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const PQ = require(path.join(__dirname, "..", "core.js"));
const HTML = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const LINES = HTML.split("\n");

function extract(start, endMarker) {
  let s = LINES.findIndex(l => l.includes(start));
  if (s < 0) throw new Error("no start " + start);
  let e = s;
  while (e < LINES.length && !LINES[e].includes(endMarker)) e++;
  if (e >= LINES.length) throw new Error("no end marker for " + start);
  return LINES.slice(s, e + 1).join("\n");
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
  for (let k = 0; k < 40 && d.coev.genC === pre; k++) d.continueGenC();
  if (d.coev.genC === pre) throw new Error("C1 generation did not complete in 40 drives");
}

function nearVsGen1Anchor(d) {
  // gen-1 anchor = the sChamp right after the first bred gen (R66 law)
  const anchor = d.coev.anchorNet;
  assert.ok(anchor, "the page set a lineage anchor during the first bred gen");
  return d.coev.popS.filter(n => l2(n, anchor) < 2.0).length;
}

function median(xs) {
  const s = xs.slice().sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
}

const COUNT_RE = /near-anchor (\d+)\/(\d+) nets within L2 2\.0 of the g(\d+) sChamp/;

test("NEAR-COUNT-ON-LINE: two C1 gens at σ=2 write the measured count, the population size, and the anchor gen into #anchornear", () => {
  const d = makeDemo(1, 2);
  breedOneGen(d);
  breedOneGen(d);
  const text = d.$els.anchornear ? d.$els.anchornear.textContent : "";
  const m = COUNT_RE.exec(text);
  assert.ok(m, `#anchornear must carry the live count line, got "${text}"`);
  assert.equal(+m[2], 96, "population size rides the text (slider 96)");
  assert.equal(+m[3], 1, "the anchor is the gen-1 sChamp (first bred gen of the lineage)");
  assert.ok(+m[1] >= 1, "the anchor itself sits in the population, so the count is ≥ 1");
  const recomputed = nearVsGen1Anchor(d);
  assert.equal(+m[1], recomputed, "the rendered number equals the measurement recomputed from the live population — a VIEW, not a cached figure");
});

test("SIGMA-LAW (R84 spec VERIFY): across 5 seeds the gen-2 near-count vs the gen-1 anchor separates the regimes — σ=2 median ≥ 8 and > σ=12 median ≤ 5", () => {
  const seeds = [1, 2, 3, 4, 5];
  const at = (sig) => seeds.map(seed => {
    const d = makeDemo(seed, sig);
    breedOneGen(d); // gen 1 — anchors the lineage
    breedOneGen(d); // gen 2 — the R66 measurement point
    return nearVsGen1Anchor(d);
  });
  const low = at(2), high = at(12);
  console.log(`R85 σ-law: σ=2 → ${JSON.stringify(low)} (median ${median(low)}); σ=12 → ${JSON.stringify(high)} (median ${median(high)})`);
  assert.ok(median(low) >= 8, `σ=2 cluster regime: median near-count ≥ 8 (R66 observed 16–29); got ${median(low)} from ${JSON.stringify(low)}`);
  assert.ok(median(high) <= 5, `σ=12 diffuse regime: median near-count ≤ 5 (R66: usually 0 by gen 2); got ${median(high)} from ${JSON.stringify(high)}`);
  assert.ok(median(low) > median(high),
    `the count must move with the slider — median(σ=2) ${median(low)} > median(σ=12) ${median(high)}; per-seed ${JSON.stringify(low)} vs ${JSON.stringify(high)}`);
});

test("EMPTY-BEFORE-TRAIN: a fresh page writes nothing to #anchornear — no fabricated default value", () => {
  const d = makeDemo(99, 12);
  assert.equal(d.$els.anchornear, undefined, "#anchornear must not exist in the stub until the C1 lane writes it (the element ships empty in the DOM)");
  breedOneGen(d); // C1 lane runs; element appears with the measured value
  assert.ok(COUNT_RE.test(d.$els.anchornear.textContent), "after the first bred gen the element carries the measured line");
});

test("ANCHOR-PERSISTS: after 4 gens the text still names the g1 anchor (never re-anchored mid-lineage) and the count re-parses as a live VIEW", () => {
  const d = makeDemo(2, 2);
  for (let g = 0; g < 4; g++) breedOneGen(d);
  const text = d.$els.anchornear.textContent;
  const m = COUNT_RE.exec(text);
  assert.ok(m, `count line present after 4 gens, got "${text}"`);
  assert.equal(+m[3], 1, "the anchor gen is still g1 — mid-lineage re-anchoring would regress to the measured winner-proximity tautology");
  assert.equal(+m[1], nearVsGen1Anchor(d), "count recomputed from the live population at gen 4");
});

test("LOAD-REANCHORS: the C1 file-load branch re-anchors at the loaded file's own shipped champ — a stale anchor cannot measure the new population against the old lineage", () => {
  const loadLine = LINES.find(l => l.includes('if(q.kind==="pong-quilt/coev@v1"||q.popS){'));
  assert.ok(loadLine, "the C1 load branch exists");
  const block = LINES.slice(LINES.indexOf(loadLine), LINES.indexOf(loadLine) + 6).join("\n");
  assert.ok(/anchorNet:q\.sChamp&&q\.sChamp\.net\|\|null/.test(block),
    "the load branch sets the lineage anchor from the file's own sChamp (null when the file has none — it anchors at the first bred gen instead)");
  assert.ok(/anchorGen:q\.genC/.test(block), "the anchor's generation rides the load so the text self-discloses which lineage it measures");
});
