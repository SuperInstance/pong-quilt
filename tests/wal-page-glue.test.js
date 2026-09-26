// Round 30 — the WAL exporter lands on the page (the R26-booked follow-on:
// "wal-session driver→page wiring"). tools/wal-session.js (R26) fed the
// doctor-consumable exporter from a headless session, but the page itself
// had no path to it: the receipt panel — the thing the whole receipt doctrine
// is about — could never leave the page in the shape quilt-doctor verifies.
// Build (this round): (1) tools/wal-export.js becomes dual-loadable (node +
// script tag, ONE implementation — a page-side reimplementation would drift
// from the pinned one the first time anyone touched a hash); (2) a "WAL quilt
// (download)" button re-anchors the LIVE panel rows into the fleet WAL
// (BIND genesis + LINK per row, panel display hash carried as provenance
// inside args — the two chains are never confused); (3) verification runs
// BEFORE download: a non-ok verdict receipts WAL-EXPORT/REFUSED and nothing
// is saved — an export that fails the doctor's checks never reaches a file.
// FAIL-first: on pristine main there is no QUILT_WAL script tag, no button,
// and no seam block — every test here fails on extraction.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const W = require("../tools/wal-export.js"); // the pinned node-side impl

const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const toolSrc = fs.readFileSync(path.join(ROOT, "tools", "wal-export.js"), "utf8");

function extractSeam() {
  const start = html.indexOf("// === WAL export seam");
  assert.ok(start > 0, "index.html must contain the WAL export seam block (walExportPanel + walexport wiring)");
  const endMarker = 'receipt(out.rows?"WAL-EXPORT":"WAL-EXPORT/EMPTY",out.report.ok?1:0,1);};';
  const end = html.indexOf(endMarker, start);
  assert.ok(end > start, "index.html must contain the walexport onclick handler through its closing brace");
  return html.slice(start, end + endMarker.length);
}

// A page stub: real exporter on window.QUILT_WAL (the dual-loaded pinned
// impl), a synthetic receipt panel, a receipt recorder standing in for the
// page's own receipt() (the seam's receipt calls must not touch the panel
// being exported — lines are built before the receipt lands).
function makePage({ receipts, verifyOverride = null } = {}) {
  const fakeWindow = { QUILT_WAL: verifyOverride ? { ...W, verifyQuiltWal: verifyOverride } : W };
  const els = { walexport: {} };
  const $ = (id) => els[id] || (els[id] = {});
  const landed = [];
  const receipt = (kind, move, conf) => landed.push({ kind, move, conf });
  const gen = 7;
  const factory = new Function("window", "receipts", "receipt", "$", "gen", "document",
    extractSeam() +
    "\nreturn { walExportPanel, click: () => $('walexport').onclick() };");
  const page = factory(fakeWindow, receipts, receipt, $, gen,
    { createElement: () => ({ click() {} }) });
  page._landed = landed;
  page._els = els;
  return page;
}

const PANEL = [
  { i: 0, kind: "L2", move: 1, conf: 0.42, gen: 7, prev: "a1" },
  { i: 1, kind: "QA-REFUSAL", move: 0, conf: 0, gen: 7, prev: "a2" },
  { i: 2, kind: "DEATH", move: 0, conf: 0, gen: 8, prev: "a3" },
];

test("R30: page loads the pinned exporter as a script tag (dual-load, one impl)", () => {
  assert.ok(html.includes('<script src="tools/wal-export.js"></script>'),
    "index.html must load tools/wal-export.js by script tag — the page seam must use the SAME exporter the tools pin, never a reimplementation");
  assert.ok(html.includes('id="walexport"'), "the WAL quilt download button must exist on the page");
});

test("R30: dual-load — the tool source exposes window.QUILT_WAL without node globals", () => {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(toolSrc, sandbox); // no module, no require, no process in the sandbox
  const qw = sandbox.window.QUILT_WAL;
  assert.ok(qw, "evaluating tools/wal-export.js in a browser-like context must define window.QUILT_WAL");
  for (const k of ["fnv1a64", "canonical", "toQuiltWal", "verifyQuiltWal", "walToJsonl", "OPS"])
    assert.equal(typeof qw[k], typeof W[k], `window.QUILT_WAL.${k} must exist and match the node export`);
});

test("R30: walExportPanel re-anchors every live panel row into a verifiable WAL", () => {
  const page = makePage({ receipts: PANEL.map(r => ({ ...r })) });
  const out = page.walExportPanel();
  assert.ok(out, "export must succeed on a clean panel");
  assert.equal(out.rows, PANEL.length, "every panel row must become a LINK line — none dropped, none invented");
  assert.ok(out.report.ok, "the export must pass the doctor-vocabulary verify before anything downloads");
  const expected = W.toQuiltWal({ tool: "pong-quilt page", source: "receipt panel (R30 page seam)" },
    PANEL.map(r => ({ op: "LINK", cell: "pq/panel", args: { i: r.i, kind: r.kind, move: r.move, conf: r.conf, gen: r.gen, panelPrev: r.prev } })));
  assert.equal(out.jsonl, W.walToJsonl(expected), "the downloaded file must be byte-identical to the pinned exporter's output for the same rows");
  assert.ok(out.jsonl.split("\n").every(l => !l || JSON.parse(l).op !== undefined),
    "every JSONL line must be a WAL line");
  const ops = out.jsonl.trim().split("\n").map(l => JSON.parse(l).op);
  assert.deepEqual(ops, ["BIND", "LINK", "LINK", "LINK"], "genesis BIND + one LINK per panel row, in panel order");
  assert.equal(JSON.parse(out.jsonl.trim().split("\n")[1]).args.panelPrev, "a1",
    "the panel's own display hash must ride inside args as provenance — the WAL chain and the panel chain must never be confused");
});

test("R30: honest empty panel — genesis-only chain, receipt says EMPTY", () => {
  const page = makePage({ receipts: [] });
  const out = page.walExportPanel();
  assert.ok(out, "an empty panel still exports — a genesis-only chain that verifies");
  assert.equal(out.rows, 0);
  const lines = out.jsonl.trim().split("\n");
  assert.equal(lines.length, 1, "empty panel = exactly one BIND genesis line");
  assert.equal(JSON.parse(lines[0]).op, "BIND");
  page.click();
  const kinds = page._landed.map(r => r.kind);
  assert.ok(kinds.includes("WAL-EXPORT/EMPTY"),
    "the empty export must receipt WAL-EXPORT/EMPTY — honesty, not a silent one-line file pretending to be a session");
});

test("R30: a verify failure receipts WAL-EXPORT/REFUSED and downloads nothing", () => {
  const badVerify = () => ({ ok: false, divergences: [{ seq: 1, why: "hash_mismatch" }], lines: 2 });
  const page = makePage({ receipts: PANEL.map(r => ({ ...r })), verifyOverride: badVerify });
  const out = page.walExportPanel();
  assert.equal(out, null, "walExportPanel must refuse to return a file when verification is not ok");
  assert.ok(page._landed.some(r => r.kind === "WAL-EXPORT/REFUSED"),
    "the refusal must be receipted in the doctor's vocabulary — never a silently broken download");
  // drive the actual button path: with verification failing, the handler must
  // bail before any Blob/download work and land NO success receipt
  const page2 = makePage({ receipts: PANEL.map(r => ({ ...r })), verifyOverride: badVerify });
  page2._els.walexport.onclick(); // must return early — no document/Blob needed on this path
  assert.ok(page2._landed.some(r => r.kind === "WAL-EXPORT/REFUSED"),
    "the button path must also receipt the refusal");
  assert.ok(!page2._landed.some(r => r.kind === "WAL-EXPORT"),
    "a failed verification must never land a WAL-EXPORT success receipt — the download is gated, not just the return value");
});

test("R30: live panel mutation between exports changes the chain (no caching)", () => {
  const receipts = PANEL.map(r => ({ ...r }));
  const page = makePage({ receipts });
  const first = page.walExportPanel().jsonl;
  receipts.push({ i: 3, kind: "SAVE", move: 0, conf: 1, gen: 8, prev: "a4" });
  const second = page.walExportPanel().jsonl;
  assert.notEqual(first, second, "exporting again after a new receipt must produce a different chain — the export reads the LIVE panel, never a stale copy");
  assert.ok(second.includes('"SAVE"'), "the new row must be present in the second export");
});
