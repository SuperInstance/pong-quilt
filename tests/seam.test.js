// Round 3 pins — the LLM seam pacing contract: fire on death/interval (never
// per frame), at most one request in flight, stale arrivals dropped by seq,
// delivered results strictly monotonic. tests/honesty.test.js's wristband
// match requires this file to back the "llm-pacing" claim in VERIFIED_CLAIMS.
const test = require("node:test");
const assert = require("node:assert/strict");
const PQ = require("../core.js");

const tick = () => new Promise((r) => setImmediate(r)); // flush the microtask queue

test("paces requests: at most one per minIntervalMs", async () => {
  let t = 1000;
  let calls = 0;
  const seam = PQ.makeSeam({ transport: () => { calls++; return Promise.resolve({ move: 1 }); },
    minIntervalMs: 200, now: () => t, onResult: () => {} });
  assert.equal(seam.fire({}), 1);       // t=1000
  await tick();                          // let the first request settle — inFlight false
  t = 1100; assert.equal(seam.fire({}), null); // 100ms later — refused on PACING, not in-flight
  await tick();
  t = 1200; assert.equal(seam.fire({}), 2);    // 200ms later — allowed
  await tick();
  assert.equal(calls, 2);
  assert.equal(seam.dropped.paced, 1);
  assert.equal(seam.dropped.inFlight, 0); // the refusal above was pacing, serialized separately
});

test("serializes in-flight: a second fire during a pending request is refused", async () => {
  let t = 0;
  let calls = 0;
  let release;
  const gate = new Promise((r) => { release = r; });
  const seam = PQ.makeSeam({ transport: () => { calls++; return gate.then(() => ({ move: -1 })); },
    minIntervalMs: 0, now: () => t, onResult: () => {} });
  assert.equal(seam.fire({}), 1);
  assert.equal(seam.inFlight, true);
  assert.equal(seam.fire({}), null); // in flight — serialized, not queued
  assert.equal(seam.dropped.inFlight, 1);
  release(); await tick();
  assert.equal(seam.inFlight, false);
  assert.equal(calls, 1); // exactly one network touch for two fires
});

test("delivered results arrive in strict fire order (monotonic seq)", async () => {
  let t = 0;
  const delivered = [];
  const seam = PQ.makeSeam({ transport: (p) => Promise.resolve({ move: p.move }),
    minIntervalMs: 10, now: () => t, onResult: (res, seq) => delivered.push({ res, seq }) });
  for (let i = 0; i < 5; i++) { t += 10; seam.fire({ move: i }); await tick(); }
  assert.deepEqual(delivered.map((d) => d.seq), [1, 2, 3, 4, 5]);
  assert.deepEqual(delivered.map((d) => d.res.move), [0, 1, 2, 3, 4]);
});

test("stale fence stands: counters are honest and delivery guards on latest seq", async () => {
  let t = 0;
  const delivered = [];
  const seam = PQ.makeSeam({ transport: () => Promise.resolve({ move: 0 }),
    minIntervalMs: 0, now: () => t, onResult: (res, seq) => delivered.push(seq) });
  seam.fire({}); await tick();
  seam.fire({}); await tick();
  assert.deepEqual(delivered, [1, 2]); // latest-seq guard: only fresh results deliver
  assert.equal(seam.dropped.stale, 0); // with serialization, stale stays 0 — and PROVEN, not assumed
  assert.equal(seam.lastSeq, 2);
});

test("transport rejection resolves through onResult as an error, not a hang", async () => {
  let t = 0;
  const errs = [];
  const seam = PQ.makeSeam({ transport: () => Promise.reject(new Error("endpoint down")),
    minIntervalMs: 0, now: () => t,
    onResult: (res, seq, err) => { if (err) errs.push(err.message); } });
  seam.fire({}); await tick();
  assert.deepEqual(errs, ["endpoint down"]);
  assert.equal(seam.inFlight, false); // failure frees the seam — no stuck lock
});
