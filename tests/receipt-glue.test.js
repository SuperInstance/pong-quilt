// Round 7 pin — the MOTH receipt panel's BROWSER receipt(), driven headlessly
// by extracting the exact function from the shipped index.html (not a copy —
// the shipped code). Rounds 3→4→5→6 receipted the freeze: past 40 rows the
// panel silently shift()s and the eviction is uncounted, while the C1 ledger
// (makeLedger, core.js) counts its evictions honestly — the repo's last known
// silent-drop honesty gap, deferred four rounds and twice marked "DECIDE IT".
// Round 7 decides it the ledger way: receiptEvicted counts every eviction and
// the panel suffix shows "[N shown / M evicted]". Against the pre-R7 page this
// test must FAIL (silent shift, no count); against the fix it must PASS.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const PQ = require("../core.js");

// Extract the verbatim receipt(): line-anchored — if the page is restructured
// so either anchor vanishes, the extraction fails LOUDLY (not silently).
function extractReceipt() {
  const lines = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8").split("\n");
  const startIdx = lines.findIndex((l) => l.startsWith("function receipt("));
  assert.ok(startIdx >= 0, "index.html must define receipt()");
  // receipt() is 4 lines: header, hash+push, eviction, panel render (possibly
  // wrapped across two lines for the suffix). Anchor on the panel assignment.
  let endIdx = startIdx;
  while (endIdx < lines.length && !lines[endIdx].includes('join("\\n")')) endIdx++;
  assert.ok(endIdx > startIdx && endIdx - startIdx <= 5, "receipt() body must end near the panel render");
  // the panel expression may wrap one more line (the suffix) — include it if
  // the function's braces have not closed by the join line.
  const throughJoin = lines.slice(startIdx, endIdx + 1).join("\n");
  const open = (throughJoin.match(/[{}()]/g) || []).reduce((d, c) =>
    d + (c === "{" ? 1 : c === "}" ? -1 : 0), 0);
  if (open > 0) endIdx++;
  return lines.slice(startIdx, endIdx + 1).join("\n");
}

function makeDemo() {
  const els = { receipts: { textContent: "" } };
  const $ = (id) => els[id] || (els[id] = { textContent: "", value: "0" });
  const factory = new Function("PQ", "$", "hash", "els",
    "let receipts=[],receiptHead='0'.repeat(64),receiptEvicted=0,gen=0;" +
    extractReceipt() +
    "return {receipt,get receipts(){return receipts},get receiptEvicted(){return receiptEvicted},els};");
  return factory(PQ, $, PQ.hash8, els);
}

test("extraction integrity: receipt() is present and line-anchored", () => {
  const src = extractReceipt();
  assert.ok(src.includes("receipts.push(row)"), "must push the row");
  assert.ok(src.includes('join("\\n")'), "must render the panel");
});

test("45 writes: panel holds 40 and the eviction count SURFACES", () => {
  const d = makeDemo();
  for (let i = 0; i < 45; i++) d.receipt("T", 0, 0.5);
  assert.equal(d.receipts.length, 40, "panel array bounds at 40");
  assert.equal(d.receiptEvicted, 5, "exactly 5 evictions counted");
  assert.match(d.els.receipts.textContent, /40 shown \/ 5 evicted/,
    "panel must admit its forgetting, like makeLedger");
});

test("within the bound: no suffix, zero count", () => {
  const d = makeDemo();
  for (let i = 0; i < 40; i++) d.receipt("T", 0, 0.5);
  assert.equal(d.receiptEvicted, 0);
  assert.ok(!/evicted/.test(d.els.receipts.textContent), "no suffix while nothing was evicted");
  assert.equal(d.receipts.length, 40);
});

test("hash chain stays intact across evictions", () => {
  const d = makeDemo();
  for (let i = 0; i < 45; i++) d.receipt("T", 0, 0.5);
  const rows = d.receipts;
  assert.equal(rows[rows.length - 1].prev, rows[rows.length - 2].hash,
    "prev chain unbroken across the eviction boundary");
  assert.equal(rows[0].i, 5, "row indices keep their write-order values (first 5 evicted), semantics untouched");
  for (let k = 1; k < rows.length; k++) assert.ok(rows[k].i >= rows[k - 1].i,
    "indices non-decreasing (post-bound writes reuse i=length — pre-existing quirk, chain itself unbroken)");
});
