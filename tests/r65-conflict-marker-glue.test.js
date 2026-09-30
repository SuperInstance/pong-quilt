// Round 65 pin — conflict-marker scan over every tracked .md/.js/.html.
// Builder item: R64 mandate item 2 (R63 mandate item 4 / R64 spec item 5, the
// 2nd asking). The R63 lesson, now structural: the R61-merge conflict
// resolution shipped literal `<<<<<<<`/`=======`/`>>>>>>>` lines INSIDE
// PLAYLOG.md entries and they survived two rounds invisible to every existing
// pin (R63 P0: "the class is invisible to every existing pin"). The suite had
// page-parse (brace balance), canonical-index (row/heading parity),
// receipt-completeness (merged rounds receipted) — nothing read the PROSE.
// The scan: any line STARTING with 7 `<`, `=`, or `>` characters is a merge
// marker (git writes them at column 0); mid-line look-alikes do not flag.
// FAIL-first is demonstrated BY CONSTRUCTION in test 1 (a fixture tree
// carrying the R63 disease must be flagged — the scanner provably detects the
// class) and test 3 (each marker species alone is flagged); test 2 is the
// standing GREEN on the clean tracked tree and fails loudly if `git ls-files`
// cannot enumerate (never a quiet vacuous pass).
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");

// The scanner under pin: line-start merge-conflict markers, all three species.
function scanMarkers(text) {
  const hits = [];
  text.split("\n").forEach((line, i) => {
    if (/^<{7}/.test(line) || /^={7}/.test(line) || /^>{7}/.test(line)) hits.push(i + 1);
  });
  return hits;
}

// Every tracked .md/.js/.html, enumerated by git (loud on failure — a broken
// enumeration must never read as an empty, vacuously-clean tree).
function trackedDocFiles() {
  let out;
  try {
    out = execFileSync("git", ["ls-files", "-z", "--", "*.md", "*.js", "*.html"],
      { cwd: ROOT, encoding: "utf8", maxBuffer: 16 * 1024 * 1024 });
  } catch (e) {
    throw new Error("git ls-files failed — the clean-tree pin refuses to run vacuous: " + e.message);
  }
  return out.split("\0").filter(Boolean);
}

function writeFixture(dir, name, lines) {
  fs.mkdirSync(path.dirname(path.join(dir, name)), { recursive: true });
  fs.writeFileSync(path.join(dir, name), lines.join("\n") + "\n");
}

test("FAIL-first by construction: a fixture tree carrying the R63 disease (line-start markers in a PLAYLOG-shaped file) is FLAGGED at the exact lines", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "r65-conflict-fixture-"));
  try {
    // the R63 disease, verbatim shape: markers wedged between real entries
    writeFixture(dir, "PLAYLOG.md", [
      "# PLAYLOG — the experiment's memory",
      "",
      "<<<<<<< HEAD",
      "## Round 61 — one resolution of the entry",
      "=======",
      "## Round 61 — the other resolution of the entry",
      ">>>>>>> origin/main",
      "",
      "Both entries were supposed to be kept additively.",
    ]);
    const hits = scanMarkers(fs.readFileSync(path.join(dir, "PLAYLOG.md"), "utf8"));
    assert.deepEqual(hits, [3, 5, 7],
      "the scanner must flag all three marker lines at their exact line numbers");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("GREEN standing pin: every tracked .md/.js/.html in this repo is free of line-start conflict markers (enumeration is non-vacuous)", () => {
  const files = trackedDocFiles();
  assert.ok(files.length > 20, `expected a real tree, got ${files.length} tracked doc/code files`);
  for (const must of ["PLAYLOG.md", "README.md", "EXPERIMENTS.md", "index.html", "core.js", "qa.js"]) {
    assert.ok(files.includes(must), `enumeration must include ${must} (non-vacuous guard)`);
  }
  const dirty = [];
  for (const f of files) {
    const hits = scanMarkers(fs.readFileSync(path.join(ROOT, f), "utf8"));
    if (hits.length) dirty.push(`${f}:${hits.join(",")}`);
  }
  assert.deepEqual(dirty, [],
    `line-start merge-conflict markers found in tracked files: ${dirty.join(" | ")} — resolve the conflict additively (R63) and re-push`);
});

test("PRECISION: each marker species alone is flagged, and mid-line / indented look-alikes are not (the pin must catch conflicts without crying wolf)", () => {
  assert.deepEqual(scanMarkers("<<<<<<< HEAD\ncontent\n>>>>>>> branch"), [1, 3], "the < and > species flag");
  assert.deepEqual(scanMarkers("title\n=======\nsubtitle"), [2], "the = separator species flags");
  assert.deepEqual(scanMarkers("x = a<<<<<<<b; // shift-left chain"), [], "mid-line look-alike does not flag");
  assert.deepEqual(scanMarkers("  <<<<<<< indented four spaces"), [], "column-0 anchor: indented text does not flag");
  assert.deepEqual(scanMarkers("<!-- ======== section rule ======== -->"), [], "an = rule inside a line does not flag");
});
