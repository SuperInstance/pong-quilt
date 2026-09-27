// Round 38 pin — receipt-completeness (R35 spec item 1, shipped this round).
// The canonical-index pin is two-way for what IS in PLAYLOG.md; R34 proved
// the blind spot — a round whose entire entry vanishes in a conflict
// resolution is invisible (no orphan heading, no phantom row) while its code
// ships green. Only git ground truth sees absence. These pins own the
// vocabulary (what counts as a round-claiming branch), the exact R35
// verification (replay PR #44's state: index without the R34 row), and the
// live end-to-end run (spawn the CLI at the repo tip — forever-green only if
// every merged r<N>-*/playtest-round-<N> branch stays receipted).
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const TOOL = path.join(ROOT, "tools", "receipt-completeness.js");
const rc = require(TOOL);
const PLAYLOG = fs.readFileSync(path.join(ROOT, "PLAYLOG.md"), "utf8");

function cleanEnv() {
  const env = { ...process.env };
  delete env.NODE_TEST_CONTEXT; // R19 lesson: a grandchild spawn must not inherit the runner's context
  delete env.VITEST;
  return env;
}

// The merge subjects of the PR #44 era, replayed as git-log text. R33 merged
// with its receipt intact; R34's receipt was dropped by the #44 conflict
// resolution AFTER its code merged — the exact loss this lane exists to catch.
const PR44_ERA_LOG = [
  "Merge pull request #43 from SuperInstance/r33-wal-session-cli-usage-guard",
  "Merge pull request #44 from SuperInstance/r34-amber-admission-source",
].join("\n");

const INDEX_WITHOUT_R34 = PLAYLOG.split("\n")
  .filter((l) => !/^\|\s*R34\s*\|/.test(l))
  .join("\n");

test("vocabulary: only r<N>-* and playtest-round-<N> branches claim receipts", () => {
  assert.equal(rc.branchRound("r37-prerun-stone-seal"), 37);
  assert.equal(rc.branchRound("r33-wal-session-cli-usage-guard"), 33);
  assert.equal(rc.branchRound("playtest-round-35"), 35);
  assert.equal(rc.branchRound("playtest-round-6"), 6);
  // Non-round branches claim nothing — including lookalikes.
  assert.equal(rc.branchRound("merge-gate-ci"), null);
  assert.equal(rc.branchRound("round-5"), null);            // R5/R6-era shape, not spec'd (R35 names two shapes)
  assert.equal(rc.branchRound("quantum-audio-L2"), null);   // R2 branch-pair convention: covered by the R2 row
  assert.equal(rc.branchRound("r38abc"), null);             // boundary: separator required after the digits
});

test("parseMergedRounds groups branches per round and keeps PR numbers", () => {
  const log = [
    "Merge pull request #47 from SuperInstance/r37-prerun-stone-seal",
    "Merge pull request #45 from SuperInstance/playtest-round-35",
    "Merge pull request #13 from SuperInstance/merge-gate-ci",
    "Merge pull request #2 from someone/round-3-builder",
    "not a merge subject at all",
  ].join("\n");
  const rounds = rc.parseMergedRounds(log);
  assert.deepEqual([...rounds.keys()].sort((a, b) => a - b), [35, 37]);
  assert.deepEqual(rounds.get(37).prs, [{ pr: 47, branch: "r37-prerun-stone-seal" }]);
  assert.deepEqual(rounds.get(35).prs, [{ pr: 45, branch: "playtest-round-35" }]);
});

test("PR #44 replay (the R35 verification): R34's loss is caught, R33 is not false-flagged", () => {
  const missing = rc.missingReceipts(PR44_ERA_LOG, INDEX_WITHOUT_R34);
  assert.deepEqual(missing.map((m) => m.round), [34]);
  assert.equal(missing[0].branch, "r34-amber-admission-source");
  assert.equal(missing[0].pr, 44);
  // The full live index has no absence: replaying the same merges against it misses nothing.
  assert.deepEqual(rc.missingReceipts(PR44_ERA_LOG, PLAYLOG), []);
});

test("live end-to-end: the CLI at the repo tip exits 0 and receipts every merged round", () => {
  let out = "", status = 0;
  try {
    out = execFileSync(process.execPath, [TOOL], { cwd: ROOT, encoding: "utf8", env: cleanEnv() });
  } catch (e) {
    out = (e.stdout || "") + "\n--SPAWN-STDERR--\n" + (e.stderr || "");
    status = e.status;
  }
  assert.equal(status, 0, `receipt-completeness CLI must exit 0 at the tip:\n${out}`);
  assert.match(out, /^receipt-completeness: OK/m);
  assert.ok(!/MISSING RECEIPTS/.test(out), `unreceipted merged round(s) at the tip:\n${out}`);
});

test("the CLI refuses bad inputs loudly — no quiet vacuous green", () => {
  // Fixture mode with a nonexistent log file: REFUSED, exit 2 (not 0, not a crash).
  let status = 0;
  try {
    execFileSync(process.execPath, [TOOL, "--log", "/tmp/definitely-not-here-r38.log"],
      { cwd: ROOT, encoding: "utf8", env: cleanEnv() });
  } catch (e) {
    status = e.status;
  }
  assert.equal(status, 2, "nonexistent --log must exit 2");
  // Unknown flag: usage, exit 2 (the R33 lesson, applied to this CLI).
  status = 0;
  try {
    execFileSync(process.execPath, [TOOL, "--bogus"], { cwd: ROOT, encoding: "utf8", env: cleanEnv() });
  } catch (e) {
    status = e.status;
  }
  assert.equal(status, 2, "unrecognized flag must exit 2 with usage");
});
