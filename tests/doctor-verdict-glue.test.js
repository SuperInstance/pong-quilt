// Round 24: cross-tool external-lens receipt — the QA-REFUSAL seam names
// quilt-doctor's three-lens verdict when (and only when) a real doctor
// checkout is present. Ships closed: absent doctor -> null -> nothing
// rendered, never faked. Citation = referral edge candidate PENDING per
// weight law (VERIFIED only on a merged cross-repo PR).
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const os = require("os");
const path = require("path");
const DV = require("../tools/doctor-verdict.js");

// Round 32: the fixture is the REAL six-row shape of quilt-doctor aa5a041's
// docs/holistic-stats.json — vendored verbatim at
// tests/fixtures/holistic-stats-aa5a041.json (three full-matrix rows:
// 8 points, 8!=40320 exact enumeration; three sufficient-subset rows:
// 5 points, 5!=120). The pre-R32 fixtures were crafted-uniform (all 40320),
// which hid the live bug: the tool demanded 40320 on EVERY row, so the seam
// could never open against a pristine canonical checkout (R28's P2, fixed R32).
const REAL_STATS_AA5A041 = JSON.parse(
  fs.readFileSync(path.join(__dirname, "fixtures", "holistic-stats-aa5a041.json"), "utf8"));
// Shape-only view of the vendored snapshot, for drift-checking against a
// live clone (test name / n / perms — the enumeration receipt per row).
const snapshotShape = (rows) => rows.map((r) => [r.test, r.n, r.perms]);

function makeDoctorFixture(tamper) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "doctor-fix-"));
  fs.mkdirSync(path.join(dir, "docs"), { recursive: true });
  const stats = REAL_STATS_AA5A041.map((r) => ({ ...r }));
  if (tamper === "perms") stats[1].perms = 1000; // Monte-Carlo impostor on a full row
  if (tamper === "subsetperms") stats[3].perms = 999; // impostor on a sufficient-subset row
  if (tamper === "json") fs.writeFileSync(path.join(dir, STATS_JSON = "docs/holistic-stats.json"), "not json{");
  else fs.writeFileSync(path.join(dir, "docs/holistic-stats.json"), JSON.stringify(stats, null, 2));
  const view = tamper === "row" ? "# view\n| repo | a | b |\n|---|---|---|\n| other | 1 | 2 |\n"
    : "# The Holistic View\n| repo | active days | JEV substance | JEPA score | JEPA null_z | MOTH coherence@16k |\n" +
      "|---|---|---|---|---|---|\n| pong-quilt | 3 | 0.709 | 0.200 | (starved) | 0.777 |\n";
  fs.writeFileSync(path.join(dir, "docs/HOLISTIC-VIEW-2026-09-26.md"), view);
  return dir;
}

test("seam ships closed: absent doctor checkout -> null, nothing rendered, no fake", () => {
  assert.equal(DV.loadDoctorVerdict("/nonexistent/quilt-doctor"), null);
  assert.equal(DV.lensLine(null), null, "closed seam renders nothing");
});

test("R32 pin: the REAL six-row shape yields a live verdict (sufficient-subset 5!=120 rows are legitimate)", () => {
  const dir = makeDoctorFixture();
  const v = DV.loadDoctorVerdict(dir);
  assert.ok(v, "real-shaped stats (mixed 8!/5! enumerations) must open the seam");
  assert.equal(v.perms, 40320, "headline enumeration stays the full 8! matrix");
  assert.equal(v.killed.p_exact, 0.988492);
  assert.match(DV.lensLine(v), /40320 perms enumerated/);
});

test("R32 pin: vendored snapshot shape-matches a live canonical clone when present", () => {
  const root = process.env.QUILT_DOCTOR_PATH || process.env.QUILT_DOCTOR_DIR || "/tmp/quilt-doctor";
  const statsPath = path.join(root, DV.STATS_JSON);
  if (!fs.existsSync(statsPath)) {
    // offline abstain: assert the snapshot itself stays the aa5a041 six-row shape
    assert.equal(REAL_STATS_AA5A041.length, 6);
    assert.deepEqual(snapshotShape(REAL_STATS_AA5A041).map((r) => r[2]), [40320, 40320, 40320, 120, 120, 120]);
    return;
  }
  const live = JSON.parse(fs.readFileSync(statsPath, "utf8"));
  assert.deepEqual(snapshotShape(live), snapshotShape(REAL_STATS_AA5A041),
    "vendored snapshot drifted from the canonical holistic-stats.json — re-vendor");
});

test("live digest against a real quilt-doctor checkout (if present): real values, never invented", () => {
  // Path convention matches tests/wal-doctor-e2e.test.js (R29): QUILT_DOCTOR_PATH
  // or /tmp/quilt-doctor. The pre-R32 default (/tmp/doctor) never fired anywhere.
  const live = DV.loadDoctorVerdict(process.env.QUILT_DOCTOR_PATH || process.env.QUILT_DOCTOR_DIR || "/tmp/quilt-doctor");
  if (!live) { assert.equal(DV.lensLine(null), null); return; }
  assert.equal(live.source, "SuperInstance/quilt-doctor");
  assert.equal(live.perms, 40320);
  assert.equal(live.row.repo, "pong-quilt");
  assert.ok(live.row.jevSubstance > 0.6 && live.row.jevSubstance < 0.8, "pong-quilt JEV substance sane");
  const line = DV.lensLine(live);
  assert.match(line, /THREE THINGS/);
  assert.match(line, /40320/);
  assert.match(line, /p_exact=0\.988/, "the killed-in-public hypothesis is the receipt's anchor");
  assert.match(line, /SuperInstance\/quilt-doctor/, "citation names the source repo");
});

test("fixture digest: every field traced to the doctor's own files", () => {
  const dir = makeDoctorFixture();
  const v = DV.loadDoctorVerdict(dir);
  assert.ok(v, "fixture parses");
  assert.equal(v.killed.p_exact, 0.988492);
  assert.equal(v.row.jevSubstance, 0.709);
  assert.match(v.verdict, /three things/);
});

test("tamper = absent: Monte-Carlo perms (full OR subset row), broken JSON, or missing pong row -> null, never a guess", () => {
  for (const t of ["perms", "subsetperms", "json", "row"]) {
    const dir = makeDoctorFixture(t);
    assert.equal(DV.loadDoctorVerdict(dir), null, "tamper '" + t + "' must read as absent");
  }
});

test("citation honesty: the canonical source repo is named in the tool, PENDING not VERIFIED", () => {
  const src = fs.readFileSync(path.join(__dirname, "..", "tools", "doctor-verdict.js"), "utf8");
  assert.match(src, /SuperInstance\/quilt-doctor/);
  assert.match(src, /PENDING per weight law/, "edge candidate must not claim VERIFIED");
  assert.doesNotMatch(src, /VERIFIED=1\.0/);
});
