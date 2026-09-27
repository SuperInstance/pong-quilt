#!/usr/bin/env node
// Round 38 — receipt-completeness (R35 spec item 1, unfulfilled through R37).
// The canonical-index pin (R19) is two-way only for what IS in the file: a
// round whose entire entry vanished (R34, lost in the PR #44 conflict
// resolution) is invisible to it — no orphan heading, no phantom row. Only
// git ground truth can see absence: every merged PR branch named r<N>-* or
// playtest-round-<N> must have a canonical-index row for R<N>. This tool is
// the diff. It reads merges from `git log --first-parent` (offline,
// deterministic — history shows every round PR landed as a merge commit, no
// squash landings to lose branch names) and rows from the PLAYLOG index
// table. Missing -> exit 1 naming every absent round; complete -> exit 0.
// Fixture flags (--log / --playlog) replay arbitrary states, which is how
// the pin replays PR #44's loss FAIL-first.
"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

// --- vocabulary (pinned by tests/receipt-completeness.test.js) ---------------

// Merge subjects on the first-parent line: "Merge pull request #N from <owner>/<branch>".
const MERGE_RE = /Merge pull request #(\d+) from \S+\/(\S+)/;

// Branch names that claim a round receipt. Spec'd R35: r<N>-*, playtest-round-<N>.
// "round-<N>" (R5/R6-era) is deliberately NOT claimed: the spec names two
// shapes, and those rows predate the index anyway.
function branchRound(branch) {
  let m = /^r(\d+)(?:-|$)/i.exec(branch);
  if (m) return Number(m[1]);
  m = /^playtest-round-(\d+)$/.exec(branch);
  if (m) return Number(m[1]);
  return null;
}

// git log subject text -> Map<round, {prs: [{pr, branch}]}>
function parseMergedRounds(logText) {
  const rounds = new Map();
  for (const line of logText.split("\n")) {
    const mm = MERGE_RE.exec(line.trim());
    if (!mm) continue;
    const pr = Number(mm[1]);
    const branch = mm[2];
    const n = branchRound(branch);
    if (n === null) continue;
    if (!rounds.has(n)) rounds.set(n, { prs: [] });
    rounds.get(n).prs.push({ pr, branch });
  }
  return rounds;
}

// PLAYLOG canonical-index table -> Set<round> (the "R2 artifact" retitled row
// is not a pure R<N> row and claims nothing).
function parseIndexRounds(playlogText) {
  const rows = new Set();
  for (const line of playlogText.split("\n")) {
    const m = /^\|\s*(R\d+)\s*\|/.exec(line);
    if (m) rows.add(Number(m[1].slice(1)));
  }
  return rows;
}

// The whole point: merged round numbers with no index row.
function missingReceipts(logText, playlogText) {
  const merged = parseMergedRounds(logText);
  const indexed = parseIndexRounds(playlogText);
  const missing = [];
  for (const [n, info] of [...merged.entries()].sort((a, b) => a[0] - b[0])) {
    if (indexed.has(n)) continue;
    for (const { pr, branch } of info.prs) {
      missing.push({ round: n, pr, branch });
    }
  }
  return missing;
}

// --- CLI ----------------------------------------------------------------------

function main(argv) {
  const args = argv.slice(2);
  let logPath = null, playlogPath = null;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--log") logPath = args[++i];
    else if (args[i] === "--playlog") playlogPath = args[++i];
    else if (args[i] === "--help") {
      console.log("usage: node tools/receipt-completeness.js [--log PATH] [--playlog PATH]");
      return 0;
    } else {
      console.error(`usage: node tools/receipt-completeness.js [--log PATH] [--playlog PATH] — unrecognized argument: ${args[i]}`);
      return 2;
    }
  }

  let logText;
  if (logPath) {
    if (!fs.existsSync(logPath)) {
      console.error(`receipt-completeness: REFUSED --log '${logPath}' does not exist`);
      return 2;
    }
    logText = fs.readFileSync(logPath, "utf8");
  } else {
    // Full first-parent history of HEAD. In CI (push to main) HEAD IS the
    // merged main; shallow checkouts would see one commit and silently pass —
    // so a merge-less log is REFUSED, never a quiet vacuous green.
    try {
      logText = execFileSync("git", ["log", "--first-parent", "--merges", "--format=%s", "HEAD"],
        { encoding: "utf8", maxBuffer: 8 * 1024 * 1024 });
    } catch (e) {
      console.error(`receipt-completeness: REFUSED git log failed: ${e.message}`);
      return 2;
    }
    if (logText.trim() === "") {
      console.error("receipt-completeness: REFUSED no merge commits reachable from HEAD — shallow checkout? fetch-depth must be 0");
      return 2;
    }
  }

  const playlogText = fs.readFileSync(
    playlogPath || path.join(process.cwd(), "PLAYLOG.md"), "utf8");

  const merged = parseMergedRounds(logText);
  const missing = missingReceipts(logText, playlogText);
  const nPrs = [...merged.values()].reduce((a, v) => a + v.prs.length, 0);
  if (missing.length > 0) {
    console.error("receipt-completeness: MISSING RECEIPTS");
    for (const m of missing) {
      console.error(`R${m.round}: merged via '${m.branch}' (PR #${m.pr}) has no canonical-index row — a merged round without a receipt is half-shipped (R35)`);
    }
    console.error(`receipt-completeness: ${missing.length} unreceipted merge(s) across ${merged.size} merged round branch(es)`);
    return 1;
  }
  console.log(`receipt-completeness: OK — ${nPrs} round-bearing merge PR(s), ${merged.size} round number(s), all receipted in the canonical index`);
  return 0;
}

if (require.main === module) process.exit(main(process.argv));

module.exports = { MERGE_RE, branchRound, parseMergedRounds, parseIndexRounds, missingReceipts };
