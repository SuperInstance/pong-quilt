// Round 5 pin — the C1 BROWSER glue, driven headlessly by extracting the
// exact expressions from the shipped index.html (not a copy — the shipped
// code). Round 4 receipted P1#1: browser C1 training crashed on generation 1
// (evaluator records carry no `fitness`; the map read e.cand instead of
// e.net), so the README's "press Train (both populations evolve)" was
// uncashable. This test drives startGenC/continueGenC verbatim and pins the
// whole contract seam: evaluator -> map -> runCoevGeneration -> h2h ->
// hash-chained ledger. Against the Round-4 code it must FAIL (SyntaxError,
// "undefined" is not valid JSON); against the Round-5 fix it must PASS.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const PQ = require("../core.js");

// Extract the verbatim C1 glue from the demo page: from the startGenC
// declaration to the drawing section marker. If the page is restructured so
// the marker vanishes, the extraction fails LOUDLY (not silently).
function extractGlue() {
  const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const start = html.indexOf("function startGenC(){");
  const end = html.indexOf("// === drawing");
  assert.ok(start > 0, "index.html must contain the startGenC glue");
  assert.ok(end > start, "index.html must contain the drawing marker after the glue");
  return html.slice(start, end);
}

// Build a sandbox with the same closure variables the inline script provides.
function makeDemo() {
  const els = {
    pop: { value: "16" }, sub: { value: "1" }, sig: { value: "12" },
    stats: { textContent: "" }, receipts: { textContent: "" },
  };
  const $ = (id) => els[id] || (els[id] = { textContent: "", value: "0" });
  const receiptLog = [];
  const receipt = (...a) => receiptLog.push(a);
  const factory = new Function("PQ", "$", "receipt", "randPQ", "els", "receiptLog",
    "const D=PQ.DEFAULTS;" +
    "let games=0,gen=0,champNet=null,champGame=null,gameId=0;" +
    "let champRing=PQ.makeRing(240);let coev=null;" +
    extractGlue() +
    "return {startGenC,continueGenC,get coev(){return coev},get gen(){return gen}," +
    "get games(){return games},get champNet(){return champNet},get champGame(){return champGame}," +
    "get champRing(){return champRing},els,receiptLog};");
  return factory(PQ, $, receipt, PQ.rng(20260924), els, receiptLog);
}

const realNet = (n) => n && Array.isArray(n.w1) && n.w1.length === PQ.DEFAULTS.inDim * PQ.DEFAULTS.hid
  && n.w1.every((v) => Number.isFinite(v)) && Array.isArray(n.w2);

test("C1 browser glue runs end-to-end: 3 generations, no throw (Round 4 P1#1 fix)", () => {
  const demo = makeDemo();
  demo.startGenC();
  for (let k = 0; k < 3; k++) demo.continueGenC(); // pop 16 -> chunk 16 -> 1 gen per call
  assert.equal(demo.coev.genC, 3, "three full coevolution generations must complete");
  assert.ok(demo.games > 0, "games were played");
  assert.ok(demo.champGame && Number.isFinite(demo.champGame.x), "a live champion game exists");
});

test("champions bred by the glue are real nets (not undefined ghosts)", () => {
  const demo = makeDemo();
  demo.startGenC();
  for (let k = 0; k < 3; k++) demo.continueGenC();
  assert.ok(realNet(demo.coev.sChamp.net), "sChamp is a real net with finite weights");
  assert.ok(realNet(demo.coev.eChamp.net), "eChamp is a real net with finite weights");
  assert.ok(demo.coev.popS.every(realNet), "every bred survivor is a real net");
  assert.ok(demo.coev.popE.every(realNet), "every bred ender is a real net");
  assert.match(PQ.netId(demo.coev.sChamp.net), /^[0-9a-f]{8}$/);
  assert.ok(Number.isFinite(demo.coev.sChamp.fitness), "the h2h receipted fitness is a number");
  assert.ok(["SURVIVOR-CAP", "ENDER-KILL"].includes(demo.coev.last), "h2h outcome is a real verdict");
});

test("the ledger the glue writes is hash-chained (rows recompute to their own hashes)", () => {
  const demo = makeDemo();
  demo.startGenC();
  for (let k = 0; k < 3; k++) demo.continueGenC();
  const rows = demo.coev.ledger.items();
  assert.equal(rows.length, 3, "one ledger row per generation");
  const genesis = "0".repeat(64);
  rows.forEach((r, i) => {
    const { hash, ...bare } = r;
    assert.equal(PQ.hash8(JSON.stringify(bare)), hash, `row ${i} recomputes to its own hash`);
    assert.equal(r.prev, i === 0 ? genesis : rows[i - 1].hash, `row ${i} chains to its predecessor`);
    assert.match(r.sId, /^[0-9a-f]{8}$/);
    assert.match(r.eId, /^[0-9a-f]{8}$/);
    assert.ok(r.frames > 0);
  });
});

test("the glue surfaces its state honestly (stats line written, ring fed)", () => {
  const demo = makeDemo();
  demo.startGenC();
  for (let k = 0; k < 3; k++) demo.continueGenC();
  assert.match(demo.els.stats.textContent, /COEV gen 3/);
  assert.equal(demo.champRing.size, 3, "the champion ring received one write per generation");
  assert.ok(demo.receiptLog.some((r) => /COEV g3/.test(r[0])), "a per-generation receipt row was emitted");
});
