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
    assert.ok(fs.readFileSync(src(f)).equals(fs.readFileSync(dist("demo", f))),
      `STALE-DIST: demo/${f} differs from the working tree — the sealed build lags the sources. ` +
      `Fix: node tools/build-site.mjs, then re-run (R88 named-failure seal)`);
  });
}
for (const ck of ["level0", "level1", "level2"]) {
  test(`demo checkpoint byte-identical: ${ck}`, () => {
    const a = src("checkpoints", `${ck}.js`), b = dist("demo", "checkpoints", `${ck}.js`);
    assert.ok(fs.existsSync(a) && fs.existsSync(b));
    assert.ok(fs.readFileSync(a).equals(fs.readFileSync(b)),
      `STALE-DIST: demo/checkpoints/${ck}.js differs from the working tree — the sealed build lags the sources. ` +
      `Fix: node tools/build-site.mjs, then re-run (R88 named-failure seal)`);
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
  assert.equal(spot.sha256, actual,
    `STALE-DIST: demo/core.js's sealed sha256 disagrees with the working tree — the sealed build lags the sources. ` +
    `Fix: node tools/build-site.mjs, then re-run (R88 named-failure seal)`);
});

// ---- R88: the stale-dist seal — a FULL drift computation over the sealed
// manifest, failing NAMED. The R85 hazard: on a long-lived checkout, dist/
// sealed from an older base silently poisons these byte-identity checks
// while the tip is innocent, and the bare content-mismatch dump could not
// distinguish "my edit needs a reseal" from "the tree is broken". This test
// compares every sealed sha256 against the LIVE SOURCE (not the dist copy),
// so a source-side drift is named with the fix, never dumped as a mismatch.
test("STALE-DIST seal: sources match the sealed build (FAIL names the rebuild)", () => {
  const liveSha = (abs) => crypto.createHash("sha256").update(fs.readFileSync(abs)).digest("hex");
  const drifted = [];
  for (const m of prov.manifest) {
    const liveAbs = src(m.file.replace(/^demo\//, ""));
    if (fs.existsSync(liveAbs) && liveSha(liveAbs) !== m.sha256) drifted.push(m.file);
  }
  assert.deepEqual(drifted, [],
    drifted.length
      ? `STALE-DIST: sources drifted from the sealed build (sealed at head ${prov.head}): ` +
        `${drifted.join(", ")} — run \`node tools/build-site.mjs\` to reseal, then re-run the suite.`
      : "");
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

// ---- R44: the Claim Wall (KV-backed verdict ledger) + widget wiring ----

// In-memory KV stub with the surface the worker uses (get/put/list).
function memKV(seedEntries = []) {
  const store = new Map(seedEntries);
  return {
    store,
    async get(k) { return store.has(k) ? store.get(k) : null; },
    async put(k, v) { store.set(k, v); },
    async list({ prefix } = {}) {
      return { keys: [...store.keys()].filter((k) => !prefix || k.startsWith(prefix)).map((name) => ({ name })) };
    },
  };
}
const callEnv = async (method, p, body, env) => {
  if (!handle) ({ handle } = await import("../site/worker.js"));
  return handle(new Request(`http://t${p}`, {
    method, headers: body ? { "content-type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
  }), env);
};

test("wall abstains named when the CLAIMS KV is unbound", async () => {
  const w = await jr(await call("GET", "/api/wall"));
  assert.equal(w.ok, false);
  assert.match(w.why, /abstain|not bound/i);
});

test("wall serves newest-first receipts from a bound KV", async () => {
  const kv = memKV([
    ["w:0000000000001:aaaaaaaaaaaa", JSON.stringify({ ts: 1, claim: "older", verdict: 0.5, digest: "a".repeat(64), level: "level1", seed: 1 })],
    ["w:0000000000002:bbbbbbbbbbbb", JSON.stringify({ ts: 2, claim: "newer", verdict: null, abstain: "JEV key not bound — abstained (skipped, not condemned)", digest: "b".repeat(64), level: "level2", seed: 2 })],
  ]);
  const w = await jr(await callEnv("GET", "/api/wall", null, { CLAIMS: kv }));
  assert.ok(w.ok && w.count === 2);
  assert.equal(w.wall[0].claim, "newer", "newest entry first");
  assert.equal(w.wall[1].claim, "older");
  assert.equal(w.wall[0].verdict, null);
  assert.match(w.wall[0].abstain, /abstain/i, "abstains are recorded as honestly as verdicts");
});

test("judge records every verdict (and every abstain) on the wall when KV is bound", async () => {
  const kv = memKV();
  const j = await jr(await callEnv("POST", "/api/judge", { level: "level1", seed: 777, claim: "at least 0 hits" }, { CLAIMS: kv }));
  assert.ok(j.ok && j.wall.recorded === true, "verdict must be recorded when KV is bound");
  const w = await jr(await callEnv("GET", "/api/wall", null, { CLAIMS: kv }));
  assert.equal(w.count, 1);
  const e = w.wall[0];
  assert.equal(e.claim, "at least 0 hits");
  assert.equal(e.level, "level1");
  assert.equal(e.seed, 777);
  assert.equal(e.verdict, null, "no JEV key bound -> recorded as an abstain, not faked");
  assert.ok(/^[0-9a-f]{64}$/.test(e.digest));
});

const KNOWN_API = ["/api/claims", "/api/provenance", "/api/replay", "/api/judge", "/api/wall", "/api/moth"];

test("widget wiring contract: every interactive mount exists and app.js only speaks to known endpoints", () => {
  const html = fs.readFileSync(src("site", "index.html"), "utf8");
  const app = fs.readFileSync(src("site", "app.js"), "utf8");
  const mounts = ["engine-form", "engine-results", "sweep-results", "lineage", "coev-strip",
    "judge-form", "judge-result", "wall", "moth", "wristband", "prov"];
  for (const m of mounts)
    assert.ok(html.includes(`id="${m}"`), `index.html missing mount #${m}`);
  for (const m of mounts)
    assert.ok(app.includes(`$('${m}')`), `app.js never wires mount #${m}`);
  const calls = [...app.matchAll(/\/(api\/[a-z]+)/g)].map((x) => "/" + x[1]);
  assert.ok(calls.length >= 6, "app.js must exercise the api");
  for (const c of calls) assert.ok(KNOWN_API.includes(c), `app.js calls unknown endpoint ${c}`);
  assert.ok(html.includes('src="/app.js"'), "index.html must load app.js");
  // every artifact path app.js touches must actually ship in the build (F7: a
  // wrong /demo/coev.js path shipped once and only a browser playtest caught it)
  const artifactRefs = [...new Set([...app.matchAll(/['"`]\/(demo\/[a-z0-9./_-]+)['"`]/gi)].map((x) => x[1]))];
  assert.ok(artifactRefs.length >= 3, `app.js must reference the committed artifacts, found: ${artifactRefs.join(", ")}`);
  for (const ref of artifactRefs)
    assert.ok(fs.existsSync(dist(ref)), `app.js references ${ref} but the build does not ship it`);
  // R47: same guarantee for the demo page ITSELF — every script src its
  // index.html declares must ship in the build (tools/wal-export.js 404'd
  // live, F12; classic scripts don't halt on a sibling 404, but a referenced
  // file that never ships is a wound we can pin shut at build time).
  const demoHtml = fs.readFileSync(dist("demo", "index.html"), "utf8");
  const demoSrcs = [...new Set([...demoHtml.matchAll(/<script\s+src="([^"]+)"/g)].map((x) => x[1]))]
    .filter((s) => !s.startsWith("http"));
  assert.ok(demoSrcs.length >= 5, `the demo must load its scripts from declared tags, found: ${demoSrcs.join(", ")}`);
  for (const s of demoSrcs)
    assert.ok(fs.existsSync(dist("demo", s)), `demo index.html loads ${s} but the build does not ship it`);
  for (const form of ["engine-form", "judge-form"])
    assert.ok(html.includes(`id="${form}"`) && new RegExp(`<form id="${form}"[^>]*action="/api/(replay|judge)"`).test(html),
      `${form} must keep its no-JS fallback action`);
});
