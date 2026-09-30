#!/usr/bin/env node
// Round 65 — conflict-scan: the R63-P0 class pinned (R64 spec item 5, 2nd asking).
//
// WHY THIS TOOL EXISTS. At main 9f03372 the R61+R62 conflict resolution left
// literal git conflict markers (<<<<<<< / ======= / >>>>>>>) inside
// PLAYLOG.md ON MAIN. Every existing pin stayed green: the page-parse canary
// only parses index.html <script> blocks, the suite's markdown pins match
// heading/row REGEXES (a marker line is just text to them), and no pin reads
// prose at all. The R63 round found the markers by EYEBALL, not by gate — the
// exact "invisible to every existing pin" class this repo's doctrine says a
// pin must own. Ground truth is git-tracked content ONLY: an untracked
// scratch file can't reach main without a commit, so scanning anything else
// would flag the wrong world (the receipt-completeness R35 lesson: only git
// ground truth sees what actually merged).
//
// CONTRACT (pinned by tests/conflict-marker-glue.test.js):
//   - marker grammar: a line STARTING with 7+ of <, =, or > (git's own
//     conflict-marker width; mid-line occurrences and shorter runs are
//     ordinary text — the unit pin owns those negative cases);
//   - scans every git-tracked file (binary sniff: NUL in the first 8 KiB ->
//     skipped, named in the verbose line), naming file:line per finding;
//   - exit 0 + "conflict-scan: OK" when clean; exit 1 naming every finding
//     when dirty; exit 2 + usage on misuse or a non-git cwd — REFUSED,
//     never a quiet vacuous green;
//   - requireable as a module (scanContents for the unit pin) AND runnable
//     as a CLI (the live end-to-end pin spawns the real tool).

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const MARKER_RE = /^(<{7}|={7}|>{7})/;

// Pure: scan [{path, content}] -> [{path, line, marker}]. The grammar pin.
function scanContents(files) {
  const findings = [];
  for (const f of files) {
    const lines = String(f.content).split("\n");
    for (let i = 0; i < lines.length; i++) {
      const m = lines[i].match(MARKER_RE);
      if (m) findings.push({ path: f.path, line: i + 1, marker: m[1] });
    }
  }
  return findings;
}

function isBinary(buf) {
  const n = Math.min(buf.length, 8192);
  for (let i = 0; i < n; i++) if (buf[i] === 0) return true;
  return false;
}

// The tracked-file list is git ground truth. Throws with a REFUSED message
// when cwd is not inside a work tree (the caller maps that to exit 2).
function trackedFiles(root) {
  const out = execFileSync("git", ["-C", root, "ls-files"], { encoding: "utf8" });
  return out.split("\n").filter(Boolean);
}

function repoRoot(cwd) {
  return execFileSync("git", ["-C", cwd, "rev-parse", "--show-toplevel"],
    { encoding: "utf8" }).trim();
}

function usage() {
  return [
    "usage: node tools/conflict-scan.js [--root <dir>] [--verbose]",
    "",
    "scans every git-tracked file for git conflict markers (a line starting",
    "with 7+ of <, =, or >). exit 0 clean / 1 markers found / 2 refused.",
  ].join("\n");
}

function main(argv, { cwd = process.cwd(), stdout = process.stdout, stderr = process.stderr } = {}) {
  let root = null, verbose = false;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--root") {
      if (i + 1 >= argv.length) { stderr.write(usage() + "\n"); return 2; }
      root = argv[++i];
    } else if (a === "--verbose") verbose = true;
    else { stderr.write(usage() + "\n"); return 2; }
  }
  if (!root) {
    try { root = repoRoot(cwd); }
    catch (e) {
      stderr.write("conflict-scan: REFUSED — not inside a git work tree (cwd=" + cwd + ")\n");
      return 2;
    }
  } else if (!fs.existsSync(path.join(root, ".git"))) {
    // worktrees carry a .git FILE, plain dirs a .git dir — existsSync covers both.
    stderr.write("conflict-scan: REFUSED --root has no .git: " + root + "\n");
    return 2;
  }
  let files;
  try { files = trackedFiles(root); }
  catch (e) {
    stderr.write("conflict-scan: REFUSED — git ls-files failed at " + root + "\n");
    return 2;
  }
  const scan = [], skipped = [];
  for (const rel of files) {
    const full = path.join(root, rel);
    let buf;
    try { buf = fs.readFileSync(full); }
    catch (e) { skipped.push(rel + " (unreadable)"); continue; }
    if (isBinary(buf)) { skipped.push(rel); continue; }
    scan.push({ path: rel, content: buf.toString("utf8") });
  }
  const findings = scanContents(scan);
  if (findings.length) {
    stderr.write("conflict-scan: CONFLICT MARKERS FOUND (" + findings.length + "):\n");
    for (const f of findings) stderr.write("  " + f.path + ":" + f.line + ": " + f.marker + "\n");
    return 1;
  }
  stdout.write("conflict-scan: OK (" + scan.length + " tracked text files scanned"
    + (skipped.length && verbose ? "; skipped " + skipped.join(", ") : "") + ")\n");
  return 0;
}

module.exports = { MARKER_RE, scanContents, trackedFiles, main };

if (require.main === module) {
  process.exit(main(process.argv.slice(2)));
}
