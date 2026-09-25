const test = require("node:test");
const assert = require("node:assert");
const QA = require("../qa.js");

// Round 16 spec item 4 (carried R12/R13): REAL_QPAM BYO endpoint seam.
// Pin is glue-level with a STUBBED fetch — no live network in CI, and the
// page ships with no endpoint configured (degrades to the sim stand-in).
const S = { ballX: 0.7, paddleX: 0.3, speed: 1.2 };

test("BYO seam: stubbed success — remote suggestion passes through un-capped, wire = 64 8-bit bins base64", async () => {
  let seenUrl = null, seenBody = null;
  const fetchStub = async (url, init) => {
    seenUrl = url;
    seenBody = JSON.parse(init.body);
    return { ok: true, json: async () => ({ move: 1, confidence: 0.9, source: "qpam-9q" }) };
  };
  const r = await QA.suggestByo(S, 123, 32, { url: "https://example.test/qpam", fetch: fetchStub });
  assert.equal(r.kind, "byo-qpam");
  assert.equal(r.degraded, false);
  assert.deepStrictEqual(r.suggestion, { move: 1, confidence: 0.9, source: "qpam-9q" });
  assert.equal(r.suggestion.confidence, 0.9, "a REAL backend is not sim-capped at 0.5 — only the stand-in is");
  assert.equal(seenUrl, "https://example.test/qpam");
  const bins = Buffer.from(seenBody.binsB64, "base64");
  assert.equal(bins.length, QA.N, "wire carries one 8-bit bin per sonified sample");
  assert.equal(seenBody.shotsPerBin, 32);
});

test("JEV-invalid response (move 5) → byo-qpam-fallback receipt, degrade to sim, never silent", async () => {
  const fetchStub = async () => ({ ok: true, json: async () => ({ move: 5, confidence: 0.9 }) });
  const r = await QA.suggestByo(S, 123, 32, { url: "u", fetch: fetchStub });
  assert.equal(r.kind, "byo-qpam-fallback");
  assert.equal(r.reason, "jev-invalid");
  assert.equal(r.degraded, true);
  assert.equal(r.suggestion.source, "qa-sim", "fallback advice is the labeled stand-in, not the bad payload");
  assert.ok(r.suggestion.confidence <= QA.SIM_MAX_CONF);
});

test("fetch rejection AND non-ok status → fetch-failure fallback", async () => {
  const boom = await QA.suggestByo(S, 1, 32, { url: "u", fetch: async () => { throw new Error("network down"); } });
  assert.equal(boom.kind, "byo-qpam-fallback");
  assert.equal(boom.reason, "fetch-failure");
  assert.equal(boom.suggestion.source, "qa-sim");
  const notOk = await QA.suggestByo(S, 1, 32, { url: "u", fetch: async () => ({ ok: false, status: 500, json: async () => ({}) }) });
  assert.equal(notOk.reason, "fetch-failure");
  assert.equal(notOk.suggestion.source, "qa-sim");
});

test("no endpoint configured → no-endpoint fallback and fetch is never called", async () => {
  let called = false;
  const r = await QA.suggestByo(S, 1, 32, { fetch: async () => { called = true; } });
  assert.equal(r.kind, "byo-qpam-fallback");
  assert.equal(r.reason, "no-endpoint");
  assert.equal(called, false);
});

test("fallback advice is byte-identical to the plain sim suggestion (same seed/pot)", async () => {
  const stub = { url: "u", fetch: async () => ({ ok: true, json: async () => ({ move: 0, confidence: 2 }) }) }; // conf 2 out of range → jev-invalid
  const fb = await QA.suggestByo(S, 77, 16, stub);
  assert.equal(fb.reason, "jev-invalid");
  assert.deepStrictEqual(fb.suggestion, QA.suggest(S, 77, 16));
});
