// Site glue pin — the pong-quilt site's verification contract (FAIL-first).
// Verifies: the build seals byte-identical demo copies; provenance is well-formed;
// the worker's API replays deterministically, validates input, and abstains
// honestly when backend keys are absent (repo doctrine: named, never faked).
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const dist = (...a) => path.join(__dirname, "..", "site", "dist", ...a);
const src = (...a) => path.join(__dirname, "..", ...a);

// R44 fix: the canonical suite command must be self-sufficient — if the
// build output is absent (fresh checkout, dist/ is gitignored), seal it
// here instead of failing. Deterministic either way: the build is a pure
// copy + manifest of the working tree.
if (!fs.existsSync(dist("index.html"))) {
  require("node:child_process").execSync("node tools/build-site.mjs", {
    cwd: path.join(__dirname, ".."), stdio: ["ignore", "pipe", "pipe"],
  });
}

test("build output exists (site-glue self-seals when dist/ is absent)", () => {
  assert.ok(fs.existsSync(dist("index.html")), "site/dist/index.html missing even after self-seal");
});

for (const f of ["index.html", "core.js", "qa.js"]) {
  test(`demo copy byte-identical: ${f}`, () => {
    assert.ok(fs.existsSync(dist("demo", f)) && fs.existsSync(src(f)));
    assert.ok(fs.readFileSync(src(f)).equals(fs.readFileSync(dist("demo", f))));
  });
}
for (const ck of ["level0", "level1", "level2"]) {
  test(`demo checkpoint byte-identical: ${ck}`, () => {
    const a = src("checkpoints", `${ck}.js`), b = dist("demo", "checkpoints", `${ck}.js`);
    assert.ok(fs.existsSync(a) && fs.existsSync(b));
    assert.ok(fs.readFileSync(a).equals(fs.readFileSync(b)));
  });
}

const prov = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "site", "generated", "provenance.json"), "utf8"));

test("provenance covers all demo files with real sha256s", () => {
  assert.equal(prov.files, prov.manifest.length);
  assert.ok(prov.files >= 6);
  assert.ok(prov.manifest.every((m) => /^[0-9a-f]{64}$/.test(m.sha256)));
});

test("provenance spot-check: demo/core.js matches the working tree", () => {
  const spot = prov.manifest.find((m) => m.file === "demo/core.js");
  const actual = crypto.createHash("sha256").update(fs.readFileSync(src("core.js"))).digest("hex");
  assert.equal(spot.sha256, actual);
});

let handle;
const call = async (method, p, body) => {
  if (!handle) ({ handle } = await import("../site/worker.js"));
  return handle(new Request(`http://t${p}`, {
    method, headers: body ? { "content-type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
  }), {}); // no keys: backend-dependent calls must abstain, never fake
};
const jr = async (r) => r.json();

test("claims ledger serves from core.js and wears the R41 pin", async () => {
  const { claims, count } = await jr(await call("GET", "/api/claims"));
  assert.ok(count >= 40, `only ${count} claims`);
  assert.ok(claims.some((c) => c.id === "maxspeed-honesty"));
});

test("replay returns a full deterministic game and validates inputs", async () => {
  const a = await jr(await call("POST", "/api/replay", { level: "level1", seed: 20260928 }));
  const b = await jr(await call("POST", "/api/replay", { level: "level1", seed: 20260928 }));
  assert.ok(a.ok && a.frames > 0 && a.hits >= 0);
  assert.equal(a.digest, b.digest, "same seed must reproduce byte-identical receipts");
  const bad = await jr(await call("POST", "/api/replay", { level: "nope", seed: 1 }));
  assert.equal(bad.ok, false);
  assert.match(bad.why, /unknown checkpoint/);
  const badSeed = await jr(await call("POST", "/api/replay", { level: "level1", seed: -1 }));
  assert.equal(badSeed.ok, false);
  assert.match(badSeed.why, /integer/);
});

test("judge replays, shapes a receipt, abstains honestly without a JEV key", async () => {
  const j = await jr(await call("POST", "/api/judge", { level: "level1", seed: 777, claim: "ends before 100 frames" }));
  assert.ok(j.ok && j.replay.digest && "judge" in j);
  assert.equal(j.judge.verdict, null);
  assert.match(j.judge.abstain, /abstain/i);
  const long = await jr(await call("POST", "/api/judge", { level: "level1", seed: 1, claim: "x".repeat(400) }));
  assert.equal(long.ok, false);
  assert.match(long.why, /claim/);
});

test("moth endpoint abstains honestly with no keys bound", async () => {
  const m = await jr(await call("GET", "/api/moth"));
  assert.equal(m.ok, false);
  assert.match(m.why, /abstain|not bound/);
});

test("provenance endpoint serves the build receipt; unknown api 404s honestly", async () => {
  const pv = await jr(await call("GET", "/api/provenance"));
  assert.ok(pv.ok && pv.files >= 6);
  const u = await jr(await call("GET", "/api/nope"));
  assert.equal(u.ok, false);
  assert.equal(u.why, "unknown endpoint");
});
