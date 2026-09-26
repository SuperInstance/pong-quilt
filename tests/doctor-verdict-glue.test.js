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

// Real-shaped fixture: values lifted verbatim from quilt-doctor aa5a041's
// docs/holistic-stats.json + HOLISTIC-VIEW-2026-09-26.md (subset, honest).
function makeDoctorFixture(tamper) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "doctor-fix-"));
  fs.mkdirSync(path.join(dir, "docs"), { recursive: true });
  const stats = [
    { test: "moth ~ active_days", n: 8, rho: -0.6386, p_exact: 0.094048, perms: 40320 },
    { test: "jev ~ active_days", n: 8, rho: -0.012, p_exact: 0.988492, perms: 40320 },
    { test: "jev ~ jepa_null_z (sufficient)", n: 5, rho: -0.9, p_exact: 0.083333, perms: 40320 },
  ];
  if (tamper === "perms") stats[1].perms = 1000; // Monte-Carlo impostor
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

test("live digest against a real quilt-doctor checkout (if present): real values, never invented", () => {
  // The pulse harness clones quilt-doctor to /tmp/doctor; committed CI has no
  // checkout, where this test must pass vacuously by asserting the closed-seam
  // contract instead of skipping.
  const live = DV.loadDoctorVerdict(process.env.QUILT_DOCTOR_DIR || "/tmp/doctor");
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

test("tamper = absent: Monte-Carlo perms, broken JSON, or missing pong row -> null, never a guess", () => {
  for (const t of ["perms", "json", "row"]) {
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
