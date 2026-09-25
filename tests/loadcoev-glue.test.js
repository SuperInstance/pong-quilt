// Round 9 pin — loadCoev() head honesty, driven headlessly by extracting the
// exact function from the shipped index.html (not a copy — the shipped code).
// Rounds 4→5→6→7→8 receipted the lie five consecutive times with byte-identical
// numbers: the banner names the ARTIFACT's ledger head (cp.ledgerHead,
// 8663279a…) while the receipts pane shows artifact rows RE-CHAINED onto a
// fresh genesis — displayed terminal 83a099d4, first displayed row re-chained
// 360e1dfc vs its artifact hash 6c072f4c. The banner says "md5-verified" over a
// chain the pane does not show. Round 8 spec item 1 decided the shape: banner
// `coev.ledger.head` (the re-anchored chain actually displayed) and keep the
// artifact head disclosed as provenance. Against the pre-R9 page this test
// must FAIL (banner != displayed head); against the fix it must PASS.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const PQ = require("../core.js");

// the artifact the page loads (checkpoints/coev.js assigns window.PONG_QUILT_COEV)
global.window = {};
require("../checkpoints/coev.js");
const ARTIFACT = global.window.PONG_QUILT_COEV;
delete global.window;

// Extract the verbatim loadCoev(): line-anchored — if the page is restructured
// so either anchor vanishes, the extraction fails LOUDLY (not silently).
function extractLoadCoev() {
  const lines = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8").split("\n");
  const startIdx = lines.findIndex((l) => l.startsWith("function loadCoev(){"));
  assert.ok(startIdx >= 0, "index.html must define loadCoev()");
  let endIdx = startIdx;
  while (endIdx < lines.length && !lines[endIdx].includes('receipt("LOAD/COEV",0,1);}')) endIdx++;
  assert.ok(endIdx < lines.length, "loadCoev() must end with the LOAD/COEV receipt");
  return lines.slice(startIdx, endIdx + 1).join("\n");
}

function bannerHash(stats) {
  const m = stats.match(/ledger ([0-9a-f]{8})/);
  return m && m[1];
}

function makeDemo() {
  const els = { stats: { textContent: "" }, mode: { value: "" } };
  const $ = (id) => els[id] || (els[id] = { textContent: "", value: "" });
  const receiptLog = [];
  const alerts = [];
  const factory = new Function("window", "alert", "PQ", "$", "receipt", "randPQ", "els",
    "let champNet=null,champGame=null,gameId=0,coev=null;" +
    extractLoadCoev() +
    ";return {loadCoev,get coev(){return coev},get champNet(){return champNet},get champGame(){return champGame},get gameId(){return gameId},els};");
  return factory({ PONG_QUILT_COEV: ARTIFACT }, (m) => alerts.push(m), PQ, $,
    (...a) => receiptLog.push(a), PQ.rng(20260924), els);
}

test("extraction integrity: loadCoev() is present, line-anchored, re-chains the tail", () => {
  const src = extractLoadCoev();
  assert.ok(src.includes("PQ.makeLedger(300)"), "must build the displayed ledger");
  assert.ok(src.includes("slice(-12)"), "must display the artifact's tail rows");
  assert.ok(src.includes("textContent"), "must write the stats banner");
});

test("HONESTY: the bannered ledger head IS the head of the chain actually displayed", () => {
  const d = makeDemo();
  d.loadCoev();
  const displayed = d.coev.ledger;               // the chain the receipts pane will show
  const banner = bannerHash(d.els.stats.textContent);
  assert.ok(banner, "stats line must banner a ledger head");
  assert.equal(banner, displayed.head,
    `banner names ${banner} but the pane shows a chain headed ${displayed.head} — the receipt pane shows a chain the banner doesn't name`);
  assert.equal(displayed.items().length, 12, "the artifact tail is what gets displayed");
  assert.equal(displayed.items()[displayed.items().length - 1].hash, displayed.head,
    "displayed terminal recomputes to the displayed head");
});

test("PROVENANCE: the artifact's true head stays disclosed, not erased", () => {
  const d = makeDemo();
  d.loadCoev();
  assert.ok(d.els.stats.textContent.includes(ARTIFACT.ledgerHead),
    "the artifact's md5-verified head must remain visible so the re-anchor is disclosed, not hidden");
});

test("no artifact: alert and touch nothing", () => {
  const els = { stats: { textContent: "" }, mode: { value: "" } };
  const $ = (id) => els[id] || (els[id] = { textContent: "", value: "" });
  const alerts = [];
  const factory = new Function("window", "alert", "PQ", "$", "receipt", "randPQ", "els",
    "let champNet=null,champGame=null,gameId=0,coev=null;" +
    extractLoadCoev() +
    ";return {loadCoev,get coev(){return coev},get champNet(){return champNet},get gameId(){return gameId},els};");
  const d = factory({}, (m) => alerts.push(m), PQ, $, () => {}, PQ.rng(1), els);
  d.loadCoev();
  assert.equal(d.coev, null, "coev state untouched without an artifact");
  assert.equal(d.champNet, null, "champion untouched without an artifact");
  assert.ok(alerts.length === 1 && /coev\.js not loaded/.test(alerts[0]), "the missing-artifact alert fires");
  assert.equal(d.els.stats.textContent, "", "no banner written without an artifact");
});
