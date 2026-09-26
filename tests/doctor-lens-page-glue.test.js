// Round 27 pin — the QA-REFUSAL stat surface carries the external lens
// (R24-booked small). tools/doctor-verdict.js (Round 24) digests a real
// quilt-doctor checkout into a one-line verdict; this pin wires that line
// into the PAGE's refusal stat text via qa.js's setDoctorLens()/lensSuffix()
// seam. It extracts the page's REAL qaSuggest()+l2Suggest() slice (the same
// qarefusal-glue extraction discipline — never a reimplementation) and drives
// it through a Proxy-DOM harness with the channel silent (pot 0, below
// SIM_POT_FLOOR), exactly the R19/R20 probe shape.
//
// HONESTY CONTRACT (extends Round 24): the seam ships CLOSED. The browser
// never calls setDoctorLens (it cannot fs-read a doctor checkout), so
// lensSuffix()=="" and the stat line is byte-identical to the pre-R27 text —
// pin 1 freezes that. Pin 2 opens the seam with a REAL lensLine() produced by
// the REAL doctor-verdict digest over an aa5a041-shaped fixture: the refusal
// line must then name SuperInstance/quilt-doctor. A null/garbage lens is
// closed, never rendered (pin 4).
//
// FAIL-first (sensitivity): pin 5 strips "+QuantumAudioL2.lensSuffix()" from
// the extracted page slice — pins 2 and the source pin run RED against that
// mutated page. Against pristine origin/main (no lensSuffix at all) pins
// 2/3/5 are red by construction.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const os = require("os");
const path = require("path");
const PQ = require("../core.js");
const QA = require("../qa.js");
const DV = require("../tools/doctor-verdict.js");

// Same slice as tests/qarefusal-glue.test.js: from the qa BYO seam block
// through the l2Suggest tail, so the harness wires the page's real
// qaSuggest() + l2Suggest() — not a copy that can drift from the page.
function extractL2Suggest() {
  const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const start = html.indexOf("// === qa BYO seam");
  const marker = "if(Math.random()<s.confidence*w)return s;return null;}";
  const end = html.indexOf(marker);
  assert.ok(start > 0, "index.html must contain the qa BYO seam block + l2Suggest glue");
  assert.ok(end > start, "index.html must contain the l2Suggest tail");
  return html.slice(start, end + marker.length);
}

// Real-shaped doctor fixture, values verbatim from quilt-doctor aa5a041
// (same fixture discipline as tests/doctor-verdict-glue.test.js).
function makeDoctorFixture() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "doctor-fix-"));
  fs.mkdirSync(path.join(dir, "docs"), { recursive: true });
  const stats = [
    { test: "moth ~ active_days", n: 8, rho: -0.6386, p_exact: 0.094048, perms: 40320 },
    { test: "jev ~ active_days", n: 8, rho: -0.012, p_exact: 0.988492, perms: 40320 },
    { test: "jev ~ jepa_null_z (sufficient)", n: 5, rho: -0.9, p_exact: 0.083333, perms: 40320 },
  ];
  fs.writeFileSync(path.join(dir, "docs/holistic-stats.json"), JSON.stringify(stats, null, 2));
  fs.writeFileSync(path.join(dir, "docs/HOLISTIC-VIEW-2026-09-26.md"),
    "# The Holistic View\n| repo | active days | JEV substance | JEPA score | JEPA null_z | MOTH coherence@16k |\n" +
    "|---|---|---|---|---|---|\n| pong-quilt | 3 | 0.709 | 0.200 | (starved) | 0.777 |\n");
  return dir;
}

// Silent-channel harness: qaSuggest with pot 0 (below SIM_POT_FLOOR) refuses
// on the real suggest() — the R12 exhaustion seam, produced by running.
function makeSilentDemo({ mutate = null } = {}) {
  const els = {
    l2: { value: "qa" }, qapot: { value: "0" }, qabyoep: { value: "" }, w: { value: "100" },
    l2stat: { textContent: "", className: "" },
  };
  const $ = (id) => els[id] || (els[id] = { textContent: "", value: "0" });
  const receipts = [];
  let slice = extractL2Suggest();
  if (mutate) slice = mutate(slice);
  const factory = new Function("PQ", "QuantumAudioL2", "MoveSuggestion", "$", "stateOf", "receipt",
    "let gen=1;" + // qaSuggest seeds the channel from the generation counter (declared in the page's classic-loop scope, outside this slice)
    slice +
    "return {qaSuggest, l2Suggest};");
  const demo = factory(PQ, QA, { validate: () => null }, $,
    (g) => ({ ballX: g.x, ballY: g.y, velX: g.vx, velY: g.vy, paddleX: g.px, speed: g.speedMul, frames: g.frames, hits: g.hits }),
    (k, m, c) => receipts.push({ kind: k }));
  demo._receipts = receipts;
  demo._els = els;
  return demo;
}

const LEGACY_REFUSAL_TEXT = "qa-sim: channel silent (pot 0/bin below floor 2) — advice refused, receipted";

test.afterEach(() => { QA.setDoctorLens(null); }); // never leak lens state across pins

test("GLUE: seam ships closed — the refusal stat line is byte-identical to the pre-R27 text", () => {
  QA.setDoctorLens(null); // the browser's state: nobody injected a lens
  const demo = makeSilentDemo();
  const r = demo.qaSuggest({ x: 0.5, y: 0.5, vx: 1, vy: 1, px: 0.5, speedMul: 1, frames: 0, hits: 0 });
  assert.equal(r, null, "a silent channel refuses advice");
  assert.ok(demo._receipts.some((x) => x.kind === "QA-REFUSAL"), "refusal is receipted (R12 contract intact)");
  assert.equal(demo._els.l2stat.textContent, LEGACY_REFUSAL_TEXT,
    "closed seam must render the exact pre-R27 line — got \"" + demo._els.l2stat.textContent + "\"");
  assert.equal(demo._els.l2stat.className, "warn", "a receipted refusal is a warn");
});

test("GLUE: with the REAL doctor digest injected, the refusal line names the external lens", () => {
  const v = DV.loadDoctorVerdict(makeDoctorFixture());
  assert.ok(v, "fixture digest parses (doctor-verdict module is the lens producer)");
  const line = DV.lensLine(v);
  QA.setDoctorLens(line); // a node driver's injection — the page surface renders what it is given
  const demo = makeSilentDemo();
  demo.qaSuggest({ x: 0.5, y: 0.5, vx: 1, vy: 1, px: 0.5, speedMul: 1, frames: 0, hits: 0 });
  assert.equal(demo._els.l2stat.textContent, LEGACY_REFUSAL_TEXT + " · " + line,
    "open seam must append the verbatim lens line after the legacy text");
  assert.match(demo._els.l2stat.textContent, /SuperInstance\/quilt-doctor/, "citation names the source repo on the page surface");
  assert.match(demo._els.l2stat.textContent, /THREE THINGS/, "the verdict is the three-lens one");
  assert.ok(demo._receipts.some((x) => x.kind === "QA-REFUSAL"), "receipt unchanged by the lens (display-only admission)");
});

test("GLUE: BOTH page refusal render sites are wired (byo-degraded branch and plain-silent branch)", () => {
  const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const wired = html.split("QuantumAudioL2.lensSuffix()").length - 1;
  assert.equal(wired, 2, "exactly the two QA-REFUSAL stat render sites must carry the lens suffix — found " + wired);
});

test("GLUE: a null / empty / non-string lens is CLOSED — nothing rendered, never a placeholder", () => {
  for (const bad of [null, "", 0, {}, "  "]) {
    QA.setDoctorLens(bad);
    assert.equal(QA.lensSuffix(), "", "lens " + JSON.stringify(bad) + " must render as empty (closed)");
  }
});

// FAIL-first sensitivity: strip the suffix call from the page slice — the
// open-seam pin must go red. Against pristine main (no lensSuffix at all)
// pins 2/3/5 are red by construction: the wiring did not exist.
test("SELF-CHECK: stripping the lens suffix from the page slice blanks the open-seam assertion", () => {
  const strip = (src) => src.split("+QuantumAudioL2.lensSuffix()").join("+\"\"");
  const v = DV.loadDoctorVerdict(makeDoctorFixture());
  QA.setDoctorLens(DV.lensLine(v));
  const demo = makeSilentDemo({ mutate: strip });
  demo.qaSuggest({ x: 0.5, y: 0.5, vx: 1, vy: 1, px: 0.5, speedMul: 1, frames: 0, hits: 0 });
  assert.equal(demo._els.l2stat.textContent, LEGACY_REFUSAL_TEXT,
    "self-check setup failed: mutation should blank the suffix but got \"" + demo._els.l2stat.textContent + "\"");
  assert.ok(!demo._els.l2stat.textContent.includes("external lens"),
    "pin 2 asserts the opposite of this (legacy + verbatim lens) — under this mutation pin 2 is RED: it watches the page wiring, not its own harness");
});
