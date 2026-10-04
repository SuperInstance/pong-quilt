// Round 91 pin — deploy-lag literacy for tools/site-playtest.mjs (R91 spec
// item 1, [S], 5th carrying: R86 item 3 → R87 item 2 → R88 item 1 →
// R89 item 1 → R90 item 1, first build this round).
//
// Wound closed: the live byte-identity check compared the served checkpoint
// against THIS checkout's file, so a deploy that is byte-faithful to its OWN
// sealed head but lags the checkout (the normal state of the world — the
// deploy reseals only when someone runs build-site + deploy) fired a FAIL
// every single round from R86 onward while teaching nothing: the receipt
// could not distinguish "lagging but faithful" from "diverged from its own
// seal" (a real finding — dist edited after sealing, or a stale seal). The
// R90 round booked the live 7/8 again with exactly this chronic RED.
//
// Build (this round): check 7 now fetches /api/provenance, resolves the
// sealed head's OWN checkpoints/level1.js from git
// (resolveSealedBlobSha256 — 40-hex validated before it reaches a shell),
// and classifies with classifyDeployLag: faithful-to-seal + seal≠checkout →
// the lag is NAMED with its commit distance and is NOT a finding (exit 0);
// served ≠ sealed blob → DIVERGED, a real finding (exit 1); equal heads →
// current; unresolvable sealed head → named fallback to the raw checkout
// comparison with the seal explicitly UNVERIFIED.
//
// Tests (module pin owns the grammar, spawn pin owns the tool — the
// R65/R86 pattern):
//  (1) IMPORT-GUARD — importing the ESM module does not run the playtest
//      (the main-guard; a tool that fires its whole live flow on import
//      can never be pinned).
//  (2) RESOLVER-LIVE-GREEN — the sealed head at THIS checkout resolves to
//      the on-disk checkpoints/level1.js sha256, aheadCount 0.
//  (3) RESOLVER-MISSING-NAMED — an unknown 40-hex head resolves to
//      reason "unresolvable", never throws.
//  (4) RESOLVER-MALFORMED-NAMED — a non-hex head is rejected as
//      "malformed-head" before it can reach a shell.
//  (5) CLASSIFY-LAG-NAMED — faithful + heads differ → ok, receipt names
//      the commit distance and "not a finding".
//  (6) CLASSIFY-DIVERGED-RED — served ≠ sealed → not ok, receipt names
//      DIVERGED (the real finding the old check could not isolate).
//  (7) CLASSIFY-CURRENT-GREEN — equal heads → ok, "current".
//  (8) CLASSIFY-UNRESOLVABLE-NAMED — null sealed blob falls back to the
//      checkout comparison and names the seal UNVERIFIED (both outcomes).
//  (9) CLI-STUB-LAG-NAMED — the real CLI against a local stub serving a
//      lagging-but-faithful deploy exits 0 with the lag receipt (the
//      spec's VERIFY, hermetic edition).
// (10) CLI-STUB-DIVERGED-RED — the real CLI against a stub whose bytes
//      diverged from its own seal exits 1 naming DIVERGED.
//  FAIL-first on the pre-R91 tree: all ten RED (module exports absent).
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const http = require("http");
const crypto = require("crypto");
const { spawn, execSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const TOOL = path.join(ROOT, "tools", "site-playtest.mjs");
const sha256 = (buf) => crypto.createHash("sha256").update(buf).digest("hex");
const HEAD = execSync("git rev-parse HEAD", { cwd: ROOT }).toString().trim();
const HEAD_PREV = execSync("git rev-parse HEAD~1", { cwd: ROOT }).toString().trim();
const LOCAL_LV1 = fs.readFileSync(path.join(ROOT, "checkpoints", "level1.js"));

let PT = null;
test.before(async () => {
  PT = await import(path.join(ROOT, "tools", "site-playtest.mjs"));
});

test("IMPORT-GUARD: importing the module does not run the playtest", async () => {
  const logs = [];
  const orig = console.log;
  console.log = (...a) => logs.push(a.join(" "));
  try {
    await import(path.join(ROOT, "tools", "site-playtest.mjs") + "?pin-reimport");
  } finally {
    console.log = orig;
  }
  assert.ok(!logs.some((l) => l.includes("playtesting")),
    "importing tools/site-playtest.mjs must be side-effect-free (main-guard)");
  assert.equal(typeof PT.classifyDeployLag, "function", "classifyDeployLag exported");
  assert.equal(typeof PT.resolveSealedBlobSha256, "function", "resolveSealedBlobSha256 exported");
});

test("RESOLVER-LIVE-GREEN: the checkout's own head resolves to the on-disk checkpoint", () => {
  const r = PT.resolveSealedBlobSha256(HEAD, ROOT);
  assert.equal(r.reason, null);
  assert.equal(r.sha256, sha256(LOCAL_LV1), "HEAD's sealed blob must be the working tree's checkpoint");
  assert.equal(r.aheadCount, 0, "HEAD is 0 commits ahead of itself");
});

test("RESOLVER-MISSING-NAMED: an unknown head resolves unresolvable, never throws", () => {
  const r = PT.resolveSealedBlobSha256("deadbeef".repeat(5), ROOT);
  assert.equal(r.sha256, null);
  assert.equal(r.reason, "unresolvable");
});

test("RESOLVER-MALFORMED-NAMED: a non-hex head is rejected before the shell", () => {
  const r = PT.resolveSealedBlobSha256("17eb2394a; rm -rf /", ROOT);
  assert.equal(r.sha256, null);
  assert.equal(r.reason, "malformed-head");
});

test("CLASSIFY-LAG-NAMED: faithful to the seal, behind the checkout — lag named, not a finding", () => {
  const v = PT.classifyDeployLag({
    servedSha256: "aa".repeat(32), sealedHead: "17eb2394a" + "0".repeat(31),
    checkoutHead: HEAD, sealedBlobSha256: "aa".repeat(32), localSha256: "bb".repeat(32), aheadCount: 78,
  });
  assert.equal(v.ok, true);
  assert.equal(v.kind, "lag");
  assert.match(v.receipt, /lags this checkout by 78 commit\(s\)/);
  assert.match(v.receipt, /not a finding/);
  assert.match(v.receipt, /byte-faithful to the sealed head/);
});

test("CLASSIFY-DIVERGED-RED: served bytes differ from the sealed head's own blob — the real finding", () => {
  const v = PT.classifyDeployLag({
    servedSha256: "cc".repeat(32), sealedHead: HEAD, checkoutHead: HEAD,
    sealedBlobSha256: "aa".repeat(32), localSha256: "aa".repeat(32), aheadCount: 0,
  });
  assert.equal(v.ok, false);
  assert.equal(v.kind, "diverged");
  assert.match(v.receipt, /DIVERGED from its own seal/);
});

test("CLASSIFY-CURRENT-GREEN: sealed at this checkout's head", () => {
  const v = PT.classifyDeployLag({
    servedSha256: "aa".repeat(32), sealedHead: HEAD, checkoutHead: HEAD,
    sealedBlobSha256: "aa".repeat(32), localSha256: "aa".repeat(32), aheadCount: 0,
  });
  assert.equal(v.ok, true);
  assert.equal(v.kind, "current");
  assert.match(v.receipt, /byte-faithful/);
});

test("CLASSIFY-UNRESOLVABLE-NAMED: seal unresolvable — fallback named, both outcomes", () => {
  const okCase = PT.classifyDeployLag({
    servedSha256: "aa".repeat(32), sealedHead: "deadbeef", checkoutHead: HEAD,
    sealedBlobSha256: null, localSha256: "aa".repeat(32), aheadCount: null,
  });
  assert.equal(okCase.ok, true);
  assert.equal(okCase.kind, "unresolvable");
  assert.match(okCase.receipt, /UNVERIFIED/);
  assert.match(okCase.receipt, /falling back/);
  const badCase = PT.classifyDeployLag({
    servedSha256: "cc".repeat(32), sealedHead: "deadbeef", checkoutHead: HEAD,
    sealedBlobSha256: null, localSha256: "aa".repeat(32), aheadCount: null,
  });
  assert.equal(badCase.ok, false);
  assert.match(badCase.receipt, /MISMATCH/);
  assert.match(badCase.receipt, /UNVERIFIED/);
});

// --- CLI scenarios against a hermetic stub of the deployed worker ---
// NOTE: the stub runs in THIS process, so the tool must be spawned ASYNC
// (spawnSync would starve the stub's event loop — a deadlock, not a test).
function runTool(url) {
  return new Promise((resolve, reject) => {
    const p = spawn(process.execPath, [TOOL, url], { timeout: 60000 });
    let stdout = "", stderr = "";
    p.stdout.on("data", (d) => (stdout += d));
    p.stderr.on("data", (d) => (stderr += d));
    p.on("error", reject);
    p.on("close", (status, signal) => resolve({ status, signal, stdout, stderr }));
  });
}

function stubServer({ servedBody, provenanceHead }) {
  const JUDGE_DIGEST = crypto.createHash("sha256").update("stub-judge-replay").digest("hex");
  const replay = (seed) => ({
    ok: true, digest: crypto.createHash("sha256").update("replay-" + seed).digest("hex"),
    frames: 6000, hits: 10 + (Number(seed) % 5), maxSpeed: 3.48,
  });
  let judgeClaim = null;
  const server = http.createServer((req, res) => {
    const u = new URL(req.url, "http://stub");
    const send = (j, code = 200) => { res.writeHead(code, { "content-type": "application/json" }); res.end(JSON.stringify(j)); };
    if (u.pathname === "/") {
      res.writeHead(200, { "content-type": "text/html" });
      res.end('<div id="engine-form"></div><div id="wall"></div><script src="/app.js"></script>');
      return;
    }
    if (u.pathname === "/api/replay") {
      let body = "";
      req.on("data", (c) => (body += c));
      req.on("end", () => { try { send(replay(JSON.parse(body).seed)); } catch { send({ ok: false }, 400); } });
      return;
    }
    if (u.pathname === "/api/judge") {
      let body = "";
      req.on("data", (c) => (body += c));
      req.on("end", () => {
        try {
          judgeClaim = JSON.parse(body).claim;
          send({ ok: true, replay: { digest: JUDGE_DIGEST, hits: replay(42).hits }, judge: { verdict: 1 }, wall: { recorded: true, key: "w:stub" } });
        } catch { send({ ok: false }, 400); }
      });
      return;
    }
    if (u.pathname === "/api/wall") {
      send({ ok: true, count: 1, wall: [{ claim: judgeClaim, digest: JUDGE_DIGEST, hits: replay(42).hits }] });
      return;
    }
    if (u.pathname === "/demo/checkpoints/level1.js") {
      res.writeHead(200, { "content-type": "text/javascript" });
      res.end(servedBody);
      return;
    }
    if (u.pathname === "/api/provenance") {
      send({ ok: true, head: provenanceHead });
      return;
    }
    send({ ok: false }, 404);
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve({ server, url: `http://127.0.0.1:${server.address().port}` }));
  });
}

test("CLI-STUB-LAG-NAMED: a lagging-but-faithful deploy exits 0 with the lag receipt", async () => {
  // serve HEAD~1's checkpoint (byte-identical to HEAD's, but the seal names
  // HEAD~1) — the exact "deploy lags the checkout but is faithful" world
  const prevBody = execSync(`git cat-file -p ${HEAD_PREV}:checkpoints/level1.js`, { cwd: ROOT, encoding: "buffer" });
  const { server, url } = await stubServer({ servedBody: prevBody, provenanceHead: HEAD_PREV });
  try {
    const r = await runTool(url);
    assert.equal(r.status, 0, `lag scenario must exit 0 (stdout:\n${r.stdout}\nstderr:\n${r.stderr})`);
    assert.match(r.stdout, /deploy lags this checkout by 1 commit\(s\)/);
    assert.match(r.stdout, /not a finding/);
    assert.match(r.stdout, /all checks passed/);
  } finally {
    server.close();
  }
});

test("CLI-STUB-DIVERGED-RED: bytes diverged from the deploy's own seal exit 1 named", async () => {
  const { server, url } = await stubServer({ servedBody: "// hand-edited dist after sealing\n", provenanceHead: HEAD });
  try {
    const r = await runTool(url);
    assert.equal(r.status, 1, `diverged scenario must exit 1 (stdout:\n${r.stdout}\nstderr:\n${r.stderr})`);
    assert.match(r.stdout, /DIVERGED from its own seal/);
    assert.match(r.stdout, /1 finding\(s\)/);
  } finally {
    server.close();
  }
});
