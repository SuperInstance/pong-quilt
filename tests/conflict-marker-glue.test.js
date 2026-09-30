// Round 65 pin — conflict-marker scan (R64 spec item 5, shipped this round;
// asked twice). The R63 P0 class pinned at last: at main 9f03372 the R61+R62
// conflict resolution left literal git conflict markers inside PLAYLOG.md ON
// MAIN while every existing pin stayed green — the page-parse canary only
// parses index.html <script> blocks, the markdown pins match heading/row
// REGEXES (a marker line is just text to them), and no pin reads prose. R63
// found the markers by EYEBALL. These pins own the grammar (what IS a marker),
// the R63-P0 replay (the real pre-repair commit 9f03372 must trip RED, the
// repair commit b600884 must run GREEN), the live end-to-end run at the repo
// tip, and the git-ground-truth doctrine (untracked files are not main's
// problem — the R35 receipt-completeness lesson).
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const TOOL = path.join(ROOT, "tools", "conflict-scan.js");
const scan = require(TOOL);

function cleanEnv() {
  const env = { ...process.env };
  delete env.NODE_TEST_CONTEXT; // R19 lesson: a grandchild spawn must not inherit the runner's context
  delete env.VITEST;
  return env;
}

// --- grammar: the unit pin ---------------------------------------------------

test("grammar: a line STARTING with 7+ of <, =, > is a conflict marker, named with its line", () => {
  const files = [
    { path: "PLAYLOG.md", content: [
      "# PLAYLOG",
      "<<<<<<< HEAD",
      "| R61 | ... |",
      "=======",
      "| R62 | ... |",
      ">>>>>>> r62-fileload-champion-glue",
      "",
    ].join("\n") },
    { path: "index.html", content: "let x = 1;\n>>>>>>> origin/main\n" },
  ];
  const f = scan.scanContents(files);
  assert.deepEqual(f, [
    { path: "PLAYLOG.md", line: 2, marker: "<<<<<<<" },
    { path: "PLAYLOG.md", line: 4, marker: "=======" },
    { path: "PLAYLOG.md", line: 6, marker: ">>>>>>>" },
    { path: "index.html", line: 2, marker: ">>>>>>>" },
  ]);
});

test("grammar negatives: mid-line runs and short runs are NOT markers; longer runs still trip (over-flag beats under-flag)", () => {
  const files = [{ path: "a.md", content: [
    "a mid-line run <<<<<<< is ordinary text",    // not at line start — not a marker
    "<<<<< five",                                  // only 5 wide — not a marker
    "",                                            // empty line — not a marker
  ].join("\n") }];
  assert.deepEqual(scan.scanContents(files), []);
  // An 8-wide run still STARTS with 7, so it trips: the honest side of this
  // pin is over-flag, never under-flag.
  const g = scan.scanContents([{ path: "b.md", content: "<<<<<<<< 8-wide\n" }]);
  assert.equal(g.length, 1);
});

// --- fixture: a temp git repo proves RED and GREEN without dirtying the tree -

function fixtureRepo(t, files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "conflict-scan-fixture-"));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  execFileSync("git", ["init", "-q"], { cwd: dir, env: cleanEnv() });
  execFileSync("git", ["config", "user.email", "pin@fixture"], { cwd: dir });
  execFileSync("git", ["config", "user.name", "pin"], { cwd: dir });
  for (const [name, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(dir, name), content);
  }
  execFileSync("git", ["add", "-A"], { cwd: dir, env: cleanEnv() });
  execFileSync("git", ["commit", "-qm", "fixture"], { cwd: dir, env: cleanEnv() });
  return dir;
}

test("fixture RED: a tracked file with markers exits 1 and names file:line", (t) => {
  const dir = fixtureRepo(t, { "PLAYLOG.md": "ok\n<<<<<<< HEAD\nrest\n" });
  let status = 0, out = "";
  try {
    execFileSync(process.execPath, [TOOL], { cwd: dir, encoding: "utf8", env: cleanEnv() });
  } catch (e) {
    status = e.status;
    out = (e.stderr || "") + (e.stdout || "");
  }
  assert.equal(status, 1, "marker-bearing fixture must exit 1");
  assert.match(out, /CONFLICT MARKERS FOUND/);
  assert.match(out, /PLAYLOG\.md:2/);
});

test("fixture GREEN + ground truth: clean tree exits 0; an UNTRACKED marker file is not scanned", (t) => {
  const dir = fixtureRepo(t, { "clean.js": "module.exports = 1;\n" });
  fs.writeFileSync(path.join(dir, "scratch.md"), "<<<<<<< not committed\n");
  const out = execFileSync(process.execPath, [TOOL], { cwd: dir, encoding: "utf8", env: cleanEnv() });
  assert.match(out, /^conflict-scan: OK/m);
  // The untracked scratch file did NOT trip the scan — only committed ground
  // truth can reach main (R35 doctrine: git sees what merged).
});

test("the CLI refuses misuse loudly — no quiet vacuous green", () => {
  let status = 0;
  try {
    execFileSync(process.execPath, [TOOL, "--bogus"], { cwd: ROOT, encoding: "utf8", env: cleanEnv() });
  } catch (e) { status = e.status; }
  assert.equal(status, 2, "unrecognized flag must exit 2 with usage");
  status = 0;
  try {
    execFileSync(process.execPath, [TOOL, "--root"], { cwd: ROOT, encoding: "utf8", env: cleanEnv() });
  } catch (e) { status = e.status; }
  assert.equal(status, 2, "valueless --root must exit 2 with usage");
  status = 0;
  let err = "";
  try {
    execFileSync(process.execPath, [TOOL, "--root", "/tmp"], { cwd: ROOT, encoding: "utf8", env: cleanEnv() });
  } catch (e) { status = e.status; err = e.stderr || ""; }
  assert.equal(status, 2, "a non-git --root must exit 2");
  assert.match(err, /REFUSED/);
});

// --- the R63-P0 replay: real history, both directions -------------------------

test("R63-P0 replay: the pre-repair commit 9f03372 trips RED, the R63 repair b600884 runs GREEN", (t) => {
  // Real history replayed through the pure scanner — no worktree needed, so
  // the pin stays robust in a shallow CI clone (it skips loudly when the
  // commits are absent). 9f03372's PLAYLOG.md carried the R61+R62 conflict
  // markers ON MAIN — the exact wound R63 found by eyeball after every
  // existing gate stayed green.
  let marked = null, repaired = null;
  for (const [sha, sink] of [["9f03372", (s) => (marked = s)], ["b600884", (s) => (repaired = s)]]) {
    try {
      sink(execFileSync("git", ["show", sha + ":PLAYLOG.md"], { cwd: ROOT, encoding: "utf8", env: cleanEnv() }));
    } catch {
      t.skip("history unavailable at " + sha + " (shallow clone?)");
      return;
    }
  }
  const bad = scan.scanContents([{ path: "PLAYLOG.md", content: marked }]);
  assert.ok(bad.length > 0, "9f03372's PLAYLOG.md must produce findings");
  assert.ok(bad.every((f) => f.path === "PLAYLOG.md" && f.line > 0));
  const good = scan.scanContents([{ path: "PLAYLOG.md", content: repaired }]);
  assert.equal(good.length, 0, "b600884's repair must scan clean");
});

test("live end-to-end: the CLI at the repo tip exits 0", () => {
  let out = "", status = 0;
  try {
    out = execFileSync(process.execPath, [TOOL, "--verbose"], { cwd: ROOT, encoding: "utf8", env: cleanEnv() });
  } catch (e) {
    out = (e.stdout || "") + "\n--SPAWN-STDERR--\n" + (e.stderr || "");
    status = e.status;
  }
  assert.equal(status, 0, `conflict-scan must exit 0 at the tip:\n${out}`);
  assert.match(out, /^conflict-scan: OK/m);
});
