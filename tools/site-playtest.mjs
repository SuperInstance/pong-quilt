#!/usr/bin/env node
// tools/site-playtest.mjs — play the LIVE site like a visitor and print receipts.
// Usage: node tools/site-playtest.mjs [base-url]
// Default base: the workers.dev preview. Fails loudly; every check prints its receipt.
// This is a playtest, not a unit test: it touches the real deployed worker and KV.
//
// R91 deploy-lag literacy (R86 item 3 → R91, 5th carrying, first build): the raw
// byte-identity check could not distinguish "the deploy lags this checkout but is
// faithful to its OWN sealed head" (a named lag, not a finding — the chronic live
// RED every round since R86) from "the deploy diverged from its own seal" (a real
// finding: dist edited, or the seal stale after the fact). The classifier below
// resolves the sealed head's own checkpoints/level1.js from git and judges the
// deploy against ITS seal, naming the lag with its commit distance when faithful.
import { createHash } from "node:crypto";
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const BASE = (process.argv[2] || "https://pong-quilt-site.casey-digennaro.workers.dev").replace(/\/$/, "");
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
let failures = 0;

async function api(method, p, body) {
  const r = await fetch(BASE + p, {
    method,
    headers: body ? { "content-type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  let j = null;
  try { j = await r.json(); } catch { /* html or empty */ }
  return { status: r.status, j };
}
function check(name, ok, receipt) {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}`);
  if (receipt) console.log(`      ${receipt}`);
  if (!ok) failures++;
}

const sha256 = (buf) => createHash("sha256").update(buf).digest("hex");

// --- R91 deploy-lag literacy: exported for the r91 pin (tests/r91-deploy-lag-glue.test.js) ---

// Resolve the sealed head's OWN checkpoints/level1.js from this clone. Returns
// { sha256, aheadCount, reason } with sha256 null when the head cannot be
// resolved here (reason names why: malformed-head | unresolvable). The head is
// validated as a 40-hex string before it ever reaches a shell.
export function resolveSealedBlobSha256(sealedHead, cwd = ROOT) {
  if (!/^[0-9a-f]{40}$/i.test(sealedHead || "")) return { sha256: null, aheadCount: null, reason: "malformed-head" };
  try {
    const blob = execSync(`git cat-file -p ${sealedHead}:checkpoints/level1.js`, { cwd, encoding: "buffer", maxBuffer: 16 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] });
    const sha = sha256(blob);
    let aheadCount = null;
    try { aheadCount = parseInt(execSync(`git rev-list --count ${sealedHead}..HEAD`, { cwd, stdio: ["ignore", "pipe", "ignore"] }).toString().trim(), 10); } catch { /* count is a garnish, never a gate */ }
    return { sha256: sha, aheadCount, reason: null };
  } catch {
    return { sha256: null, aheadCount: null, reason: "unresolvable" };
  }
}

// Classify the deploy against its OWN seal, never against a moving checkout.
//   diverged    — served bytes ≠ the sealed head's blob: a REAL finding (exit 1)
//   lag         — faithful to the seal, seal ≠ checkout: lag NAMED with its
//                 commit distance, not a finding (the R86→R91 chronic-RED cure)
//   current     — faithful and sealed at THIS checkout's head
//   unresolvable— the sealed head isn't in this clone; fall back to the raw
//                 checkout comparison and NAME that the seal went unverified
export function classifyDeployLag({ servedSha256, sealedHead, checkoutHead, sealedBlobSha256, localSha256, aheadCount }) {
  const s9 = (h) => String(h || "?").slice(0, 9);
  if (sealedBlobSha256 == null) {
    const ok = servedSha256 === localSha256;
    return { ok, kind: "unresolvable",
      receipt: `sealed head ${s9(sealedHead)}… is not resolvable in this checkout (git object missing — fetch first); falling back to the raw checkout comparison: served ${servedSha256.slice(0, 16)}… ${ok ? "= local " + localSha256.slice(0, 16) : "≠ LOCAL " + localSha256.slice(0, 16)} — ${ok ? "equal, but the deploy's own seal went UNVERIFIED (lag vs divergence cannot be told apart from here)" : "MISMATCH, and the seal went UNVERIFIED"}` };
  }
  if (servedSha256 !== sealedBlobSha256) {
    return { ok: false, kind: "diverged",
      receipt: `served ${servedSha256.slice(0, 16)}… ≠ the sealed head's own checkpoints/level1.js ${sealedBlobSha256.slice(0, 16)}… — the deploy DIVERGED from its own seal (dist edited after sealing, or the seal went stale after the fact); sealed head ${s9(sealedHead)}…, checkout ${s9(checkoutHead)}…` };
  }
  if (sealedHead === checkoutHead) {
    return { ok: true, kind: "current",
      receipt: `served ${servedSha256.slice(0, 16)}… = sealed head ${s9(sealedHead)}… = this checkout — the deploy is THIS head, byte-faithful` };
  }
  return { ok: true, kind: "lag",
    receipt: `deploy lags this checkout by ${aheadCount} commit(s) (sealed head ${s9(sealedHead)}…, checkout ${s9(checkoutHead)}…) but the served checkpoint is byte-faithful to the sealed head's own blob — lag NAMED, not a finding (R91 deploy-lag literacy)` };
}

// --- R92 abstaining-judge label: exported for the r92 pin (tests/r92-judge-label-glue.test.js) ---

// R92 (R91 spec item 4, [S], 2nd carrying: R91 item 5 → this build): check 5's
// name claimed "returns a verdict" while PASSing on `verdict null (abstain: …)`
// — seven straight rounds (R86→R92) the live judge lane was dark (JEV 401)
// while the check NAME claimed a verdict. The abstention itself was honest
// (named, never fabricated); the wound was the LABEL: a chronic null wearing a
// verdict-claim. An honest abstain is not a finding, but it is never a
// verdict-claim either. Split the states:
export const JUDGE_LABEL_VERDICT = "judge replays + returns a verdict (live JEV)";
export const JUDGE_LABEL_ABSTAIN = "judge endpoint dark — abstains NAMED (no verdict claimed)";
export function classifyJudge(judge) {
  // a verdict must be a FINITE number — NaN/Infinity pass typeof === "number"
  // (NaN especially: JSON.parse turns a null verdict into null, but an
  // internal NaN reaches here as NaN) and are fabricated shape, not a verdict
  if (judge && typeof judge.verdict === "number" && Number.isFinite(judge.verdict))
    return { ok: true, kind: "verdict", label: JUDGE_LABEL_VERDICT,
      receipt: `verdict ${JSON.stringify(judge.verdict)}${judge.abstain ? ` (note: ${judge.abstain})` : ""}` };
  // an abstention must NAME itself — classified by state, never by substring spoofing
  if (judge && typeof judge.abstain === "string" && judge.abstain.length > 0)
    return { ok: true, kind: "abstained", label: JUDGE_LABEL_ABSTAIN,
      receipt: `abstain: ${judge.abstain} — no verdict claimed, none fabricated` };
  return { ok: false, kind: "failed", label: JUDGE_LABEL_VERDICT,
    receipt: `judge returned neither a numeric verdict nor a named abstain: ${JSON.stringify(judge)}` };
}

async function main() {
  console.log(`playtesting ${BASE}\n`);

  // 1. the explorable loads, wired
  const home = await fetch(BASE + "/");
  const homeHtml = await home.text();
  check("home 200 with the interactive mounts", home.status === 200 &&
    homeHtml.includes('id="engine-form"') && homeHtml.includes('id="wall"') &&
    homeHtml.includes('src="/app.js"'), `${home.status}, ${homeHtml.length}B, mounts present: engine-form+wall+app.js`);

  // 2. receipt link semantics
  const receiptUrl = await fetch(BASE + "/?level=level1&seed=20260928");
  check("receipt link (?level&seed) serves the explorable", receiptUrl.status === 200, `GET /?level=level1&seed=20260928 -> ${receiptUrl.status}`);

  // 3. determinism, felt live: same seed twice
  const g1 = await api("POST", "/api/replay", { level: "level1", seed: 20260928 });
  const g2 = await api("POST", "/api/replay", { level: "level1", seed: 20260928 });
  check("same seed -> same digest (live)", g1.j?.ok && g1.j.digest === g2.j?.digest,
    g1.j?.ok ? `seed 20260928: ${g1.j.frames}f/${g1.j.hits}h ×${g1.j.maxSpeed}, digest ${g1.j.digest.slice(0, 16)}… twice` : JSON.stringify(g1.j));

  // 4. distribution: sweep 8 seeds
  const rows = [];
  for (let s = 42; s < 50; s++) rows.push((await api("POST", "/api/replay", { level: "level1", seed: s })).j);
  const okRows = rows.filter((r) => r?.ok);
  const digests = new Set(okRows.map((r) => r.digest));
  const hits = okRows.map((r) => r.hits);
  check("8-seed sweep returns a distribution", okRows.length === 8 && digests.size >= 2 && Math.max(...hits) > Math.min(...hits),
    `seeds 42..49: hits ${hits.join(",")}, ${digests.size} unique digests`);

  // 5. judge a claim -> verdict (or a NAMED abstention) -> recorded on the wall
  const claimText = `level1 at seed 42 in this sweep scored ${hits[0]} hits`;
  const j = await api("POST", "/api/judge", { level: "level1", seed: 42, claim: claimText });
  const jc = classifyJudge(j.j?.judge);
  check(jc.label, Boolean(j.j?.ok && j.j.replay?.digest && jc.ok),
    j.j?.ok
      ? `${jc.receipt}${j.j.replay.digest ? `, replay digest ${j.j.replay.digest.slice(0, 16)}…` : ""}`
      : `judge transport failed: ${JSON.stringify(j.j)}`);
  check("verdict recorded on the claim wall", j.j?.wall?.recorded === true, `wall key: ${j.j?.wall?.key || "none"}`);

  // 6. the wall serves it back, newest first
  const w = await api("GET", "/api/wall?limit=10");
  const mine = w.j?.wall?.find((e) => e.claim === claimText);
  check("wall round-trips the entry with its receipt fields", w.j?.ok && mine?.digest === j.j?.replay?.digest && mine?.hits === j.j?.replay?.hits,
    w.j?.ok ? `${w.j.count} receipts on the wall; mine: level1·seed42, hits ${mine?.hits}, digest ${mine?.digest.slice(0, 12)}…` : JSON.stringify(w.j));

  // 7. deploy-lag literacy (R91): the deploy is judged against its OWN sealed
  //    head, never against this moving checkout. A lagging-but-faithful deploy
  //    gets its lag NAMED with the commit distance (not a finding); a deploy
  //    whose bytes diverged from its own seal is the real finding.
  let checkoutHead = null;
  try { checkoutHead = execSync("git rev-parse HEAD", { cwd: ROOT }).toString().trim(); } catch { /* not a git checkout */ }
  const pv = await api("GET", "/api/provenance");
  const sealedHead = pv.j?.ok && typeof pv.j.head === "string" ? pv.j.head : null;
  const lv1 = await fetch(BASE + "/demo/checkpoints/level1.js");
  const lv1Body = await lv1.text();
  const local = readFileSync(path.join(ROOT, "checkpoints", "level1.js"), "utf8");
  const liveHash = sha256(Buffer.from(lv1Body));
  const localHash = sha256(Buffer.from(local));
  const sealed = sealedHead ? resolveSealedBlobSha256(sealedHead, ROOT) : { sha256: null, aheadCount: null, reason: "no-provenance-head" };
  const verdict = classifyDeployLag({ servedSha256: liveHash, sealedHead, checkoutHead, sealedBlobSha256: sealed.sha256, localSha256: localHash, aheadCount: sealed.aheadCount });
  check("deploy is faithful to its sealed head (R91 deploy-lag literacy)", lv1.status === 200 && verdict.ok, verdict.receipt);

  // 8. provenance names this checkout's head (well-formedness gate; the actual
  //    head COMPARISON is check 7's literacy verdict)
  check("provenance serves a well-formed sealed head", pv.j?.ok && typeof pv.j.head === "string" && /^[0-9a-f]{40}$/i.test(pv.j.head),
    `provenance head ${String(pv.j?.head).slice(0, 9)}…${checkoutHead ? ", checkout " + checkoutHead.slice(0, 9) + "… (compared in check 7)" : ""}`);

  console.log(failures ? `\n${failures} finding(s) — the playtest earned its keep` : "\nall checks passed — but keep playing; visitors find what scripts don't");
  process.exit(failures ? 1 : 0);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
