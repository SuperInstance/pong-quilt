// Round 10 pin — coev pop-slider parity (R10 spec item 1, the P2 carried
// since Round 5: five consecutive rounds receipted it with byte-identical
// numbers). The classic loop pins both ways (startGen line ~157:
// `if(pop.length>D.popSize)pop.length=D.popSize;`), but the coev loop only
// GROWS (`while(coev.popS.length<n)push` — never shrinks), so after a slider
// shrink the "games-at-once" label lies: slider says 8, 16 pops still play.
// This test extracts the VERBATIM shipped startGenC() and drives it 16 -> 8.
// Against the pre-fix page it must FAIL (pops stay 16); after the fix PASS.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const PQ = require("../core.js");

function extractGlue() {
  const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const start = html.indexOf("function startGenC(){");
  const end = html.indexOf("// === drawing");
  assert.ok(start > 0, "index.html must contain the startGenC glue");
  assert.ok(end > start, "index.html must contain the drawing marker after the glue");
  return html.slice(start, end);
}

function makeDemo(popValue) {
  const els = { pop: { value: String(popValue) }, sub: { value: "1" }, sig: { value: "12" }, stats: { textContent: "" } };
  const $ = (id) => els[id] || (els[id] = { textContent: "", value: "0" });
  const receipt = () => {};
  const factory = new Function("PQ", "$", "receipt", "randPQ", "els",
    "const D=PQ.DEFAULTS;let games=0,gen=0,champNet=null,champGame=null,gameId=0;" +
    "let champRing=PQ.makeRing(240);let coev=null;" +
    extractGlue() +
    "return {startGenC,get coev(){return coev},els};");
  return factory(PQ, $, receipt, PQ.rng(20260925), els);
}

test("HONESTY: coev populations honor the slider on SHRINK (16 -> 8 -> both pools are 8)", () => {
  const demo = makeDemo(16);
  demo.startGenC();
  assert.equal(demo.coev.popS.length, 16);
  assert.equal(demo.coev.popE.length, 16);
  demo.els.pop.value = "8"; // user drags the slider down
  demo.startGenC();
  assert.equal(demo.coev.popS.length, 8,
    `slider now says 8 but popS has ${demo.coev.popS.length} — the games-at-once label lies after a shrink`);
  assert.equal(demo.coev.popE.length, 8,
    `slider now says 8 but popE has ${demo.coev.popE.length} — the games-at-once label lies after a shrink`);
});

test("PARITY: the shipped coev resize pins shrink exactly like the classic loop's documented pin", () => {
  const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const classic = html.match(/if\(pop\.length>D\.popSize\)pop\.length=D\.popSize;/);
  assert.ok(classic, "the classic loop's two-way pin must be present (provenance)");
  const glue = extractGlue();
  assert.match(glue, /coev\.popS\.length>n\)/, "popS shrink parity pin shipped");
  assert.match(glue, /coev\.popE\.length>n\)/, "popE shrink parity pin shipped");
});

test("GROW still works after the parity fix (8 -> 16 -> both pools are 16)", () => {
  const demo = makeDemo(8);
  demo.startGenC();
  demo.els.pop.value = "16";
  demo.startGenC();
  assert.equal(demo.coev.popS.length, 16, "popS grows to the slider");
  assert.equal(demo.coev.popE.length, 16, "popE grows to the slider");
});

test("a shrunken population is all real nets (no truncation ghosts)", () => {
  const demo = makeDemo(16);
  demo.startGenC();
  demo.els.pop.value = "4";
  demo.startGenC();
  assert.equal(demo.coev.popS.length, 4);
  assert.ok(demo.coev.popS.every((n) => n && Array.isArray(n.w1) && n.w1.length === PQ.DEFAULTS.inDim * PQ.DEFAULTS.hid),
    "every survivor after the shrink is a real net");
  assert.ok(demo.coev.popE.every((n) => n && Array.isArray(n.w1) && n.w1.length === PQ.DEFAULTS.inDim * PQ.DEFAULTS.hid),
    "every ender after the shrink is a real net");
});
