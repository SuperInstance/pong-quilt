// Round 92 pin — the abstaining-judge check label for tools/site-playtest.mjs
// (R92 spec item 4, [S], 2nd carrying: R91 item 5 → this build).
//
// Wound closed: live check 5 was named "judge replays + returns a verdict
// (live JEV)" and PASSed on `verdict null (abstain: JEV HTTP 401 —
// abstained)` — seven straight rounds (R86→R92) the live judge lane was
// dark while the check NAME claimed a verdict. The abstention itself was
// honest (named, never fabricated — the R-doctrine); the wound was the
// LABEL: a chronic null wearing a verdict-claim. An honest abstain is not
// a finding, but it is never a verdict-claim either.
//
// Build (this round): check 5 now classifies the judge response
// (classifyJudge): a numeric verdict keeps the verdict label and asserts
// non-null; a named abstention gets its own label ("judge endpoint dark —
// abstains NAMED (no verdict claimed)") — distinct from the verdict label,
// PASS (the abstention is honest) but never a verdict-claim; neither state
// (nor a dead transport) is a silent PASS.
//
// Tests (module pin owns the grammar, spawn pin owns the tool — the
// R65/R86/R91 pattern):
//  (1) IMPORT-GUARD — importing the ESM module does not run the playtest;
//      classifyJudge and both labels are exported.
//  (2) VERDICT-CLASSIFIED — a numeric verdict → ok, kind "verdict", the
//      verdict label, receipt names the verdict value.
//  (3) ABSTAIN-CLASSIFIED — `verdict null + named abstain` → ok, kind
//      "abstained", the abstain label (never the verdict label), receipt
//      names the abstention and claims no verdict.
//  (4) LABEL-SPLIT — the two states print DIFFERENT check names; the
//      abstain label carries no verdict-claim (needle: the exact verdict
//      label string is absent from it).
//  (5) NON-NUMERIC-VERDICT-RED — a truthy non-number verdict (string,
//      object) is NOT a verdict → not ok (the "verdict" was fabricated
//      shape, not a number).
//  (6) EMPTY-JUDGE-RED — `{}` (neither verdict nor abstain) → not ok.
//  (7) NULL-JUDGE-RED — classifyJudge(null) (dead transport body) → not ok.
//  (8) WIRING — the shipped check 5's name comes from classifyJudge's
//      label (no hardcoded verdict-name on the shared path).
//  (9) CLI-STUB-VERDICT-GREEN — the real CLI against a stub whose judge
//      returns a verdict prints the verdict label + the value, exit 0.
// (10) CLI-STUB-ABSTAIN-LABELED — the real CLI against a stub whose judge
//      abstains (the live 401 shape) prints the NAMED-ABSTENTION label —
//      the spec's VERIFY, hermetic edition.
//  FAIL-first on the pre-R92 tree: all ten RED (classifyJudge absent).
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const http = require("http");
const crypto = require("crypto");
const { spawn } = require("child_process");

const ROOT = path.join(__dirname, "..");
const TOOL = path.join(ROOT, "tools", "site-playtest.mjs");
const sha256 = (buf) => crypto.createHash("sha256").update(buf).digest("hex");

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
  assert.equal(typeof PT.classifyJudge, "function", "classifyJudge exported");
  assert.equal(typeof PT.JUDGE_LABEL_VERDICT, "string", "JUDGE_LABEL_VERDICT exported");
  assert.equal(typeof PT.JUDGE_LABEL_ABSTAIN, "string", "JUDGE_LABEL_ABSTAIN exported");
});

test("VERDICT-CLASSIFIED: a numeric verdict keeps the verdict label and names the value", () => {
  const c = PT.classifyJudge({ verdict: 2, abstain: null });
  assert.equal(c.ok, true);
  assert.equal(c.kind, "verdict");
  assert.equal(c.label, PT.JUDGE_LABEL_VERDICT);
  assert.match(c.label, /returns a verdict/);
  assert.match(c.receipt, /verdict 2/);
});

test("ABSTAIN-CLASSIFIED: a named abstention is ok but never a verdict-claim", () => {
  const c = PT.classifyJudge({ verdict: null, abstain: "JEV HTTP 401" });
  assert.equal(c.ok, true);
  assert.equal(c.kind, "abstained");
  assert.equal(c.label, PT.JUDGE_LABEL_ABSTAIN);
  assert.notEqual(c.label, PT.JUDGE_LABEL_VERDICT);
  assert.match(c.label, /abstain/i);
  assert.match(c.receipt, /JEV HTTP 401/);
  assert.match(c.receipt, /no verdict claimed/i);
});

test("LABEL-SPLIT: the two states print different check names (needle-intact)", () => {
  const v = PT.classifyJudge({ verdict: 1 });
  const a = PT.classifyJudge({ verdict: null, abstain: "JEV HTTP 401" });
  assert.notEqual(v.label, a.label, "abstention must not wear the verdict check-name");
  assert.ok(!a.label.includes(v.label), "the abstain label must not contain the verdict label verbatim");
  // and the classifier must not be regex-spoofable: an abstain string that
  // merely mentions 'verdict' still classifies by STATE, not by substring
  const spoof = PT.classifyJudge({ verdict: null, abstain: "no verdict possible" });
  assert.equal(spoof.kind, "abstained");
});

test("NON-NUMERIC-VERDICT-RED: a truthy non-number verdict is not a verdict", () => {
  for (const bad of [{ verdict: "yes" }, { verdict: {} }, { verdict: NaN }, { verdict: true }]) {
    const c = PT.classifyJudge(bad);
    assert.equal(c.ok, false, `${JSON.stringify(bad)} must not PASS as a verdict`);
    assert.match(c.receipt, /neither a numeric verdict nor a named abstain/);
  }
});

test("EMPTY-JUDGE-RED: a judge body with neither verdict nor abstain fails named", () => {
  const c = PT.classifyJudge({});
  assert.equal(c.ok, false);
  assert.equal(c.kind, "failed");
  assert.match(c.receipt, /neither a numeric verdict nor a named abstain/);
});

test("NULL-JUDGE-RED: a dead transport body (null judge) fails named", () => {
  const c = PT.classifyJudge(null);
  assert.equal(c.ok, false);
  assert.equal(c.kind, "failed");
});

test("WIRING: the shipped check 5's name comes from classifyJudge (no hardcoded verdict-name on the shared path)", () => {
  const src = fs.readFileSync(TOOL, "utf8");
  assert.match(src, /export function classifyJudge/, "the classifier ships in the tool");
  assert.match(src, /check\(jc\.label,/, "check 5's name is the classifier's label");
  assert.match(src, /classifyJudge\(j\.j\?\.judge\)/, "check 5 classifies the live judge body");
  // the old shared-name check must be gone: exactly ONE check() call may
  // carry the literal verdict label, and only as the exported constant
  const literalChecks = src.match(/check\("judge replays \+ returns a verdict/g) || [];
  assert.equal(literalChecks.length, 0, "no hardcoded verdict-named check() remains");
});

// --- CLI scenarios against a hermetic stub of the deployed worker ---
// (spawn ASYNC — the stub shares this process's event loop; spawnSync would
// deadlock, the R91 build note.)
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

function stubServer({ judgeBody }) {
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
          send({ ok: true, replay: { digest: JUDGE_DIGEST, hits: replay(42).hits }, judge: judgeBody, wall: { recorded: true, key: "w:stub" } });
        } catch { send({ ok: false }, 400); }
      });
      return;
    }
    if (u.pathname === "/api/wall") {
      send({ ok: true, count: 1, wall: [{ claim: judgeClaim, digest: JUDGE_DIGEST, hits: replay(42).hits }] });
      return;
    }
    // deploy-lag check needs a faithful sealed head; serve THIS checkout's
    // checkpoint and seal at its own head so check 7 goes green
    if (u.pathname === "/demo/checkpoints/level1.js") {
      res.writeHead(200, { "content-type": "text/javascript" });
      res.end(require("fs").readFileSync(path.join(ROOT, "checkpoints", "level1.js"), "utf8"));
      return;
    }
    if (u.pathname === "/api/provenance") {
      send({ ok: true, head: require("child_process").execSync("git rev-parse HEAD", { cwd: ROOT }).toString().trim() });
      return;
    }
    send({ ok: false }, 404);
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve({ server, url: `http://127.0.0.1:${server.address().port}` }));
  });
}

test("CLI-STUB-VERDICT-GREEN: a reachable judge prints the verdict label + value, exit 0", async () => {
  const { server, url } = await stubServer({ judgeBody: { verdict: 1 } });
  try {
    const r = await runTool(url);
    assert.equal(r.status, 0, `verdict scenario must exit 0 (stdout:\n${r.stdout}\nstderr:\n${r.stderr})`);
    assert.match(r.stdout, /judge replays \+ returns a verdict \(live JEV\)/);
    assert.match(r.stdout, /verdict 1/);
    assert.match(r.stdout, /all checks passed/);
  } finally {
    server.close();
  }
});

test("CLI-STUB-ABSTAIN-LABELED: an abstaining judge prints the NAMED-ABSTENTION label, exit 0", async () => {
  // the exact live-401 shape the wall has receipted seven rounds running
  const { server, url } = await stubServer({ judgeBody: { verdict: null, abstain: "JEV HTTP 401" } });
  try {
    const r = await runTool(url);
    assert.equal(r.status, 0, "a named abstention is not a finding — exit 0");
    assert.match(r.stdout, /judge endpoint dark — abstains NAMED \(no verdict claimed\)/);
    assert.match(r.stdout, /no verdict claimed/);
    assert.ok(!/PASS  judge replays \+ returns a verdict/.test(r.stdout),
      "the abstaining run must NOT print the verdict-named check");
    assert.match(r.stdout, /all checks passed/);
  } finally {
    server.close();
  }
});
