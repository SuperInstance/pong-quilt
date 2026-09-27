#!/usr/bin/env node
// tools/site-playtest.mjs — play the LIVE site like a visitor and print receipts.
// Usage: node tools/site-playtest.mjs [base-url]
// Default base: the workers.dev preview. Fails loudly; every check prints its receipt.
// This is a playtest, not a unit test: it touches the real deployed worker and KV.
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

// 5. judge a claim -> verdict -> recorded on the wall
const claimText = `level1 at seed 42 in this sweep scored ${hits[0]} hits`;
const j = await api("POST", "/api/judge", { level: "level1", seed: 42, claim: claimText });
check("judge replays + returns a verdict (live JEV)", j.j?.ok && j.j.replay?.digest &&
  (typeof j.j.judge?.verdict === "number" || /abstain/i.test(j.j.judge?.abstain || "")),
  j.j?.ok ? `verdict ${JSON.stringify(j.j.judge.verdict)}${j.j.judge.abstain ? " (abstain: " + j.j.judge.abstain + ")" : ""}, replay digest ${j.j.replay.digest.slice(0, 16)}…` : JSON.stringify(j.j));
check("verdict recorded on the claim wall", j.j?.wall?.recorded === true, `wall key: ${j.j?.wall?.key || "none"}`);

// 6. the wall serves it back, newest first
const w = await api("GET", "/api/wall?limit=10");
const mine = w.j?.wall?.find((e) => e.claim === claimText);
check("wall round-trips the entry with its receipt fields", w.j?.ok && mine?.digest === j.j?.replay?.digest && mine?.hits === j.j?.replay?.hits,
  w.j?.ok ? `${w.j.count} receipts on the wall; mine: level1·seed42, hits ${mine?.hits}, digest ${mine?.digest.slice(0, 12)}…` : JSON.stringify(w.j));

// 7. byte-identity of the demo artifacts, checked against THIS checkout
const lv1 = await fetch(BASE + "/demo/checkpoints/level1.js");
const lv1Body = await lv1.text();
const local = readFileSync(path.join(ROOT, "checkpoints", "level1.js"), "utf8");
const liveHash = createHash("sha256").update(lv1Body).digest("hex");
const localHash = createHash("sha256").update(local).digest("hex");
check("served checkpoint is byte-identical to this checkout", lv1.status === 200 && liveHash === localHash,
  `/demo/checkpoints/level1.js sha256 ${liveHash.slice(0, 16)}… ${liveHash === localHash ? "= local" : "≠ LOCAL " + localHash.slice(0, 16)}`);

// 8. provenance names this checkout's head
const pv = await api("GET", "/api/provenance");
let head = null;
try { head = execSync("git rev-parse HEAD", { cwd: ROOT }).toString().trim(); } catch { /* not a git checkout */ }
check("provenance head matches the deployed build's sealed head", pv.j?.ok && typeof pv.j.head === "string",
  `provenance head ${String(pv.j?.head).slice(0, 9)}…${head ? ", checkout " + head.slice(0, 9) + "… (sealed at build; deploy of " + head.slice(0, 9) + " expects equality)" : ""}`);

console.log(failures ? `\n${failures} finding(s) — the playtest earned its keep` : "\nall checks passed — but keep playing; visitors find what scripts don't");
process.exit(failures ? 1 : 0);
