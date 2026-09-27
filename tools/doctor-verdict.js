// Cross-tool external-lens receipt: pong-quilt x quilt-doctor.
// The QA-REFUSAL seam (Round 12) is a SINGLE-judge refusal — the page's own
// QPAM stand-in declaring the pot empty. quilt-doctor's holistic view
// (2026-09-26) measured all 8 fleet repos with THREE lenses (JEV x JEPA x
// MOTH) and the exact-enumeration verdict was THREE THINGS: no cross-lens
// correlation survives. This module lets the REFUSAL receipt name that
// external verdict instead of pretending single-lensor silence is the whole
// truth — a cross-tool live receipt, never a hand-written mock.
//
// HONESTY CONTRACT (fleet doctrine): ships CLOSED. Without an explicit
// quilt-doctor checkout (QUILT_DOCTOR_DIR, or ../quilt-doctor relative to
// this repo), loadDoctorVerdict() returns null and every consumer renders
// NOTHING — the seam is absent, never faked. No network, no deps.
//
// FRESHNESS (Round 47): the digest names the checkout state it actually
// observed — resolveHead() reads .git directly (pure fs, no git binary)
// and lensLine() appends [observed @<commit>], or [observed-commit
// unresolved] when .git is unreadable. A drifted doctor checkout can no
// longer be silently cited as aa5a041: the receipt carries the commit it
// really read.
//
// CITATION (referral edge candidate, PENDING per weight law): canonical
// source = SuperInstance/quilt-doctor docs/HOLISTIC-VIEW-2026-09-26.md +
// docs/holistic-stats.json (commit aa5a041). VERIFIED only when a merged PR
// in the TARGET repo names this citation.
"use strict";
const fs = require("fs");
const path = require("path");

const SOURCE_REPO = "SuperInstance/quilt-doctor";
const VIEW_DOC = "docs/HOLISTIC-VIEW-2026-09-26.md";
const STATS_JSON = "docs/holistic-stats.json";
const PERMS_EXPECTED = 40320; // 8! exact enumeration of the full fleet matrix

// Exact enumeration is per-row: a row measured over n points must carry
// perms === n! — 8! = 40320 for the full 8-repo matrix, 5! = 120 for the
// sufficient-subset probes (the real holistic-stats.json mixes both; see the
// R32 pin). A Monte-Carlo impostor (perms !== n!) reads as ABSENT.
function factorial(n) { let f = 1; for (let i = 2; i <= n; i++) f *= i; return f; }
function permsLegit(t) {
  return t && Number.isInteger(t.n) && t.n >= 2 && t.n <= 20 &&
    Number.isInteger(t.perms) && t.perms >= 1 && t.perms === factorial(t.n);
}

function doctorDir(explicit) {
  if (explicit) return explicit;
  const rel = path.join(__dirname, "..", "..", "quilt-doctor");
  return rel;
}

// Freshness: name the doctor checkout state the digest actually observed.
// Pure-fs .git resolution (no git binary, no network — same contract as
// the rest of the seam). Returns the full commit hash or null when
// unresolvable — never guessed, never fabricated.
function resolveHead(dir) {
  try {
    const gitDir = path.join(dir, ".git");
    const head = fs.readFileSync(path.join(gitDir, "HEAD"), "utf8").trim();
    const m = head.match(/^ref:\s*(\S+)$/);
    if (m) {
      try {
        return fs.readFileSync(path.join(gitDir, m[1]), "utf8").trim() || null;
      } catch (e) {
        // loose-ref miss -> packed-refs fallback
        const packed = fs.readFileSync(path.join(gitDir, "packed-refs"), "utf8");
        const line = packed.split("\n").find((l) => l.endsWith(" " + m[1]));
        return line ? line.split(" ")[0].trim() : null;
      }
    }
    return /^[0-9a-f]{40}$/.test(head) ? head : null;
  } catch (e) { return null; }
}

// Load the digest. Returns null (seam closed/absent) — never throws, never
// fabricates. Every field comes from the doctor's own files, parsed and
// shape-checked; a tampered file yields null, not a best-effort guess.
function loadDoctorVerdict(dirOpt) {
  const dir = doctorDir(dirOpt);
  const statsPath = path.join(dir, STATS_JSON);
  const viewPath = path.join(dir, VIEW_DOC);
  let raw, view;
  try {
    raw = fs.readFileSync(statsPath, "utf8");
    view = fs.readFileSync(viewPath, "utf8");
  } catch (e) {
    return null; // seam closed: no doctor checkout named
  }
  let stats;
  try { stats = JSON.parse(raw); } catch (e) { return null; }
  if (!Array.isArray(stats) || stats.length === 0) return null;

  const killed = stats.find((t) => t && t.test === "jev ~ active_days");
  const permsOk = stats.every(permsLegit);
  if (!killed || !permsOk || typeof killed.p_exact !== "number") return null; // shape drift = absent
  if (killed.n !== 8 || killed.perms !== PERMS_EXPECTED) return null; // the killed hypothesis must be a full-matrix row

  // pong-quilt's row from the matrix: | pong-quilt | 3 | 0.709 | 0.200 | (starved) | 0.777 |
  const rowRe = /\|\s*pong-quilt\s*\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|/;
  const m = view.match(rowRe);
  if (!m) return null;
  const jev = parseFloat(m[2]);
  if (!Number.isFinite(jev)) return null;

  const head = resolveHead(dir);
  return {
    source: SOURCE_REPO,
    viewDoc: VIEW_DOC,
    statsDoc: STATS_JSON,
    observedCommit: head ? head.slice(0, 12) : null,
    row: { repo: "pong-quilt", jevSubstance: jev },
    killed: { test: killed.test, p_exact: killed.p_exact },
    perms: PERMS_EXPECTED,
    verdict: "three things — no cross-lens correlation survives exact enumeration",
  };
}

// The one-line honesty admission a QA-REFUSAL receipt may append when (and
// only when) the external lens is actually loaded.
function lensLine(v) {
  if (!v) return null; // closed seam renders nothing, by contract
  const fresh = v.observedCommit
    ? " [observed @" + v.observedCommit + "]"
    : " [observed-commit unresolved]"; // named, never silent
  return "external lens: " + v.source + " three-lens verdict = THREE THINGS (" +
    v.perms.toLocaleString("en-US").replace(/,/g, "") + " perms enumerated, killed-hypothesis p_exact=" +
    v.killed.p_exact + ") — a single-judge refusal stands alone" + fresh;
}

module.exports = { loadDoctorVerdict, lensLine, resolveHead, SOURCE_REPO, VIEW_DOC, STATS_JSON, PERMS_EXPECTED };
