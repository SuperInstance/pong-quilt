// Round 14 pin — COEV panel honesty (R14 spec item 2, the fresh P3 booked by
// Round 13). In C1 mode the page keeps TWO honest hash chains: the MOTH
// receipt chain (receipt(), 40-row bound, counted evictions) and the C1 match
// ledger (makeLedger, 300-row bound, counted evictions). But continueGenC()
// rendered the C1 ledger tail by ASSIGNING OVER the panel — the MOTH chain
// vanished, the "[N shown / M evicted]" admission vanished, and the chain the
// user could audit depended on which writer ran last (receipt() from live()
// vs the ledger clobber from continueGenC — two honest chains, one clobbered
// panel). This test extracts the SHIPPED renderReceipts()/receipt()/
// continueGenC() verbatim from index.html (line-anchored — a restructure that
// drops an anchor fails LOUDLY) and drives them in ONE frame: 45 MOTH writes,
// a full C1 generation, then the DEATH receipt live() would write. Against
// the pre-R14 page this test must FAIL (no renderReceipts, the clobber wins);
// against the fix both chains render with their own eviction accounting.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const PQ = require("../core.js");

// The combined two-chain panel renderer + receipt(), verbatim. renderReceipts
// must precede receipt() and receipt() must delegate to it (single writer).
function extractReceiptPanel() {
  const lines = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8").split("\n");
  const startIdx = lines.findIndex((l) => l.startsWith("function renderReceipts("));
  assert.ok(startIdx >= 0, "index.html must define renderReceipts() — the combined two-chain panel renderer");
  let endIdx = -1;
  for (let i = startIdx + 1; i < Math.min(startIdx + 20, lines.length); i++) {
    if (lines[i].trim().startsWith("renderReceipts();}")) { endIdx = i; break; }
  }
  assert.ok(endIdx > startIdx, "receipt() must immediately follow renderReceipts() and delegate to it");
  return lines.slice(startIdx, endIdx + 1).join("\n");
}

// continueGenC(), verbatim — the C1 generation loop whose tail used to clobber
// the panel. End-anchored on the streaming-reset close.
function extractContinueGenC() {
  const lines = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8").split("\n");
  const startIdx = lines.findIndex((l) => l.startsWith("function continueGenC()"));
  assert.ok(startIdx >= 0, "index.html must define continueGenC()");
  let endIdx = -1;
  for (let i = startIdx; i < lines.length; i++) {
    if (lines[i].includes("coev.evalS=null;coev.evalE=null;}}")) { endIdx = i; break; }
  }
  assert.ok(endIdx > startIdx, "continueGenC() must end at the streaming-reset close");
  return lines.slice(startIdx, endIdx + 1).join("\n");
}

function makeDemo() {
  const els = { receipts: { textContent: "" }, stats: { textContent: "" },
                sub: { value: "1" }, sig: { value: "50" }, mode: { value: "coev" } };
  const $ = (id) => els[id] || (els[id] = { textContent: "", value: "0" });
  const randPQ = PQ.rng(20260926);
  const champRing = PQ.makeRing(240);
  const startGenC = () => { throw new Error("startGenC() must not run — the harness pre-builds evaluators"); };
  const factory = new Function("PQ", "$", "randPQ", "champRing", "startGenC", "hash", "els",
    "let receipts=[],receiptHead='0'.repeat(64),receiptEvicted=0,gen=0,games=0;" +
    "let champNet=null,champGame=null,gameId=0,coev=null;" +
    extractReceiptPanel() + "\n" +
    extractContinueGenC() + "\n" +
    "return {receipt,renderReceipts,continueGenC," +
    "get receipts(){return receipts},get receiptEvicted(){return receiptEvicted}," +
    "get coev(){return coev},set coev(v){coev=v},els,champRing,randPQ};");
  return factory(PQ, $, randPQ, champRing, startGenC, PQ.hash8, els);
}

// A real C1 state: 8+8 nets, fresh evaluators over them, a genesis ledger.
function makeCoevState(d) {
  const rand = d.randPQ;
  const popS = Array.from({ length: 8 }, () => PQ.makeNet(rand));
  const popE = Array.from({ length: 8 }, () => PQ.makeNet(rand));
  const coev = { popS, popE, genC: 0, last: null, ledger: PQ.makeLedger(300),
    evalS: PQ.makeEvaluator(popS, (net) => {
      const r = PQ.playAdv(net, popE[Math.floor(rand() * popE.length)], rand);
      return { fitness: r.sFitness, sFitness: r.sFitness, frames: r.frames, hits: r.hits };
    }, { eliteK: 4 }),
    evalE: PQ.makeEvaluator(popE, (net) => {
      const r = PQ.playAdv(popS[Math.floor(rand() * popS.length)], net, rand);
      return { fitness: r.eFitness, eFitness: r.eFitness, frames: r.frames, enderHits: r.enderHits };
    }, { eliteK: 4 }) };
  d.coev = coev;
  return coev;
}

test("extraction integrity: renderReceipts/receipt/continueGenC are present and line-anchored", () => {
  const panel = extractReceiptPanel();
  assert.ok(panel.includes("— MOTH receipts —"), "the combined renderer labels the MOTH chain");
  assert.ok(panel.includes("— C1 ledger —"), "the combined renderer labels the C1 chain");
  assert.ok(panel.includes("evicted"), "both chains keep their eviction accounting");
  const gen = extractContinueGenC();
  assert.ok(gen.includes("coev.ledger.write"), "the generation loop still writes the ledger row");
  assert.ok(!gen.includes('$("receipts").textContent='),
    "continueGenC must NOT assign the panel directly — that was the clobber (P3)");
});

test("ONE FRAME: 45 MOTH writes + a C1 generation + live()'s DEATH — both chains render, MOTH eviction survives", () => {
  const d = makeDemo();
  for (let i = 0; i < 45; i++) d.receipt("T", 0, 0.5); // 5 evicted at the 40 bound
  makeCoevState(d);
  d.continueGenC();        // the C1 frame: ledger row + a COEV MOTH receipt
  d.receipt("DEATH", 0, 0); // live() in the same frame — the row the clobber used to erase
  const panel = d.els.receipts.textContent;
  assert.match(panel, /— MOTH receipts —/, "MOTH chain has its own labeled section");
  assert.match(panel, /— C1 ledger —/, "C1 ledger has its own labeled section");
  assert.match(panel, /40 shown \/ 7 evicted/,
    "MOTH eviction count survives the C1 generation (45 writes + COEV + DEATH = 47 rows, 7 evicted)");
  assert.match(panel, /DEATH move=0/, "the live() MOTH row is still rendered after the generation");
  assert.match(panel, /COEV g1 \S+ vs \S+ -> (ENDER-KILL|SURVIVOR-CAP)/,
    "the C1 ledger tail renders the match row the generation wrote");
  assert.match(d.coev.ledger.tail(1)[0].hash, /^[0-9a-f]{8}$/, "ledger row is real (hash-chained by makeLedger)");
});

test("ledger eviction accounting: 305 rows -> '8 shown / 5 evicted' beside the MOTH section", () => {
  const d = makeDemo();
  d.coev = { ledger: PQ.makeLedger(300) };
  for (let i = 1; i <= 305; i++)
    d.coev.ledger.write({ gen: i, sId: "a", eId: "b", outcome: "SURVIVOR-CAP",
                          frames: 10, sFit: 1, eFit: 2, loserId: null });
  d.renderReceipts();
  const panel = d.els.receipts.textContent;
  assert.match(panel, /— C1 ledger —[\s\S]*8 shown \/ 5 evicted/,
    "the C1 ledger admits its own forgetting, like the MOTH panel does");
  assert.match(panel, /— MOTH receipts —/, "MOTH section still renders when the ledger has the history");
});

test("non-coev mode: single-chain render is unchanged (no empty C1 section)", () => {
  const d = makeDemo();
  d.els.mode.value = "classic";
  for (let i = 0; i < 45; i++) d.receipt("T", 0, 0.5);
  const panel = d.els.receipts.textContent;
  assert.ok(!/— C1 ledger —/.test(panel), "no C1 section outside coev mode");
  assert.match(panel, /40 shown \/ 5 evicted/, "classic-mode eviction admission unchanged");
});
