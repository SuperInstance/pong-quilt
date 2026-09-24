// Pins for core.makeRing — the edge-ml ring-buffer port (bounded FIFO,
// oldest evicted). Inspired by SuperInstance/quilt-edge-ml src/ring_buffer.py.
const test = require("node:test");
const assert = require("node:assert/strict");
const PQ = require("../core.js");

test("ring keeps newest N=capacity, evicts oldest in write order", () => {
  const ring = PQ.makeRing(5);
  for (let i = 0; i < 8; i++) ring.write({ v: i });
  assert.equal(ring.size, 5);
  assert.deepEqual(ring.items().map((r) => r.v), [3, 4, 5, 6, 7]);
});

test("ring tail(n) returns last n in order; clamps to size", () => {
  const ring = PQ.makeRing(10);
  for (let i = 0; i < 10; i++) ring.write({ v: i });
  assert.deepEqual(ring.tail(3).map((r) => r.v), [7, 8, 9]);
  assert.deepEqual(ring.tail(99).map((r) => r.v), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test("ring survives wraparound with interleaved reads", () => {
  const ring = PQ.makeRing(4);
  const seen = [];
  for (let i = 0; i < 10; i++) { ring.write({ v: i }); seen.push(ring.tail(2).map((r) => r.v)); }
  assert.deepEqual(seen[9], [8, 9]);
  assert.deepEqual(seen[5], [4, 5]);
  assert.equal(ring.size, 4);
  assert.deepEqual(ring.items().map((r) => r.v), [6, 7, 8, 9]);
});

test("ring write counter is monotonic across evictions", () => {
  const ring = PQ.makeRing(2);
  ring.write({ v: 0 }); ring.write({ v: 1 }); ring.write({ v: 2 });
  assert.equal(ring.writes, 3);
  assert.equal(ring.size, 2); // bounded no matter how much is written
  assert.equal(ring.capacity, 2);
});

test("ring capacity-1 degenerate case keeps only the newest", () => {
  const ring = PQ.makeRing(1);
  ring.write({ v: "a" }); ring.write({ v: "b" });
  assert.deepEqual(ring.items(), [{ v: "b" }]);
});

test("ring rejects capacity < 1", () => {
  assert.throws(() => PQ.makeRing(0), RangeError);
});

test("ring stores records by reference (no silent clone)", () => {
  const ring = PQ.makeRing(3);
  const rec = { v: 42 };
  ring.write(rec);
  assert.equal(ring.tail(1)[0], rec);
});
