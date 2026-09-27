// R36 stone-v1 glue pins (FAIL-first: toStoneV1/loadStone are absent on
// pristine main, so extraction itself trips — loud fail, not silent skip).
// Why pins: quilt-stone (SuperInstance/quilt-stone, Task 26-b) is THE
// CANONICAL receipt-chain module — one zero-dep verifier (stone.mjs) over
// every repo chain, 42/42 sibling chains conformance-verified, and its house
// law mandates stone-v1 for ALL new chains: row 0 = stone.header, sha256 over
// canonicalJSON([prev, row minus row_hash]), genesis 'STONE-GENESIS-1'
// (STONE-SPEC.md §4.6). These pins prove pong-quilt's WAL exporter seals in
// that exact forward shape, cross-checked LIVE against stone.mjs when a
// checkout is named (QUILT_STONE_DIR) and skipped honestly when it is not.
'use strict';
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path');

function extractExports() {
  const src = fs.readFileSync(path.join(__dirname, '..', 'tools', 'wal-export.js'), 'utf8');
  assert.ok(src.includes('function toStoneV1(meta, rows)'),
    'wal-export.js stone-v1 lane absent on this tip — the canonical-chain lane is not shipped');
  const mod = { exports: {} };
  new Function('module', 'require', 'process', src + '\nif(false){}')(mod, require, { main: {}, env: {} });
  return mod.exports;
}

// The canonical external authority. R35's lens lesson applied: the default
// is the canonical clone location (CI opens this lens too — see the merge-
// gate's "clone canonical quilt-stone" step), QUILT_STONE_DIR overrides it.
// Every live pin skips (never fakes) when stone.mjs cannot be loaded.
const STONE_DIR = process.env.QUILT_STONE_DIR || '/tmp/quilt-stone';

function loadStoneLive() {
  try {
    const p = path.join(STONE_DIR, 'stone.mjs');
    if (!fs.existsSync(p)) return null;
    return p;
  } catch (e) { return null; }
}

test('toStoneV1 seals the canonical forward shape (header row 0, sha256 chain, STONE-GENESIS-1)', () => {
  const { toStoneV1, verifyStoneV1, STONE_GENESIS } = extractExports();
  const lines = toStoneV1({ tool: 'pong-quilt', source: 'pin' },
    [{ op: 'LINK', cell: 'pq/receipt', args: { kind: 'L2', move: 1, conf: 0.5, gen: 0 } },
     { op: 'VIEW', cell: 'pq/projection/eviction', args: { shown: 3, evicted: 41 } }]);
  assert.strictEqual(lines[0].kind, 'stone.header');
  assert.strictEqual(lines[0].alg, 'stone-v1');
  assert.strictEqual(lines[0].genesis, STONE_GENESIS);
  assert.strictEqual(STONE_GENESIS, 'STONE-GENESIS-1');
  assert.strictEqual(lines.length, 3);
  // every row carries a 64-hex sha256 row_hash; payload seq is 1-based
  for (const r of lines) assert.ok(/^[0-9a-f]{64}$/.test(r.row_hash), 'row_hash must be 64 lowercase hex');
  assert.strictEqual(lines[1].seq, 1);
  assert.strictEqual(lines[2].seq, 2);
  // canonical serialization: re-keying a payload's args must NOT change hashes
  const re = toStoneV1({ tool: 'pong-quilt', source: 'pin' },
    [{ op: 'LINK', cell: 'pq/receipt', args: { gen: 0, conf: 0.5, move: 1, kind: 'L2' } },
     { op: 'VIEW', cell: 'pq/projection/eviction', args: { evicted: 41, shown: 3 } }]);
  assert.deepStrictEqual(re.map(r => r.row_hash), lines.map(r => r.row_hash),
    'canonicalJSON is permutation-invariant — key order must not move the chain');
  // offline mirror verifies clean
  assert.deepStrictEqual(verifyStoneV1(lines), { ok: true, at: null, why: null, links: 3, tip: lines[2].row_hash });
  // same ops seal to BOTH dialects without cross-talk (fleet WAL unchanged by the lane)
  const { toQuiltWal } = extractExports();
  assert.strictEqual(toQuiltWal({ tool: 'pong-quilt', source: 'pin' },
    [{ op: 'LINK', cell: 'pq/receipt', args: { kind: 'L2', move: 1, conf: 0.5, gen: 0 } }])[1].hash.length, 16);
});

test('verifyStoneV1 catches tamper at the exact row (content tamper + header forgery)', () => {
  const { toStoneV1, verifyStoneV1 } = extractExports();
  const lines = toStoneV1({ tool: 'pong-quilt', source: 'pin' },
    [{ op: 'LINK', cell: 'pq/receipt', args: { kind: 'L2', move: 1, conf: 0.5, gen: 0 } },
     { op: 'VIEW', cell: 'pq/projection/eviction', args: { shown: 3, evicted: 41 } }]);
  // content tamper in row 2 — the chain must break THERE, not at the head
  const tampered = lines.map(r => ({ ...r }));
  tampered[2].args = { shown: 4, evicted: 41 };
  const bad = verifyStoneV1(tampered);
  assert.strictEqual(bad.ok, false);
  assert.strictEqual(bad.at, 2);
  assert.strictEqual(bad.why, 'hash mismatch');
  // header forgery — row 0 break
  const forged = lines.map(r => ({ ...r }));
  forged[0].alg = 'fnv1a64-fleet';
  const badHead = verifyStoneV1(forged);
  assert.strictEqual(badHead.ok, false);
  assert.strictEqual(badHead.at, 0);
  // re-sealing an already-sealed chain is idempotent (stone.mjs sealChain law)
  const resealed = toStoneV1({ tool: 'pong-quilt', source: 'pin' },
    [{ op: 'LINK', cell: 'pq/receipt', args: { kind: 'L2', move: 1, conf: 0.5, gen: 0 } },
     { op: 'VIEW', cell: 'pq/projection/eviction', args: { shown: 3, evicted: 41 } }]);
  assert.deepStrictEqual(resealed.map(r => r.row_hash), lines.map(r => r.row_hash));
});

test('loadStone ships CLOSED: no checkout named → null, never a fake verifier', async () => {
  const { loadStone } = extractExports();
  // new Function harness passes an env-less process stub — no QUILT_STONE_DIR
  assert.strictEqual(await loadStone({}), null);
  assert.strictEqual(await loadStone({ dir: '/nonexistent/stone/path' }), null);
});

test('live: stone.mjs verifyChain accepts the export and detects tamper in ITS OWN vocabulary', async (t) => {
  const live = loadStoneLive();
  if (!live) return t.skip('no quilt-stone checkout (set QUILT_STONE_DIR) — honest abstain, never fake green');
  const { toStoneV1 } = extractExports();
  const stone = await import(live);
  const lines = toStoneV1({ tool: 'pong-quilt', source: 'stone live pin' },
    [{ op: 'LINK', cell: 'pq/receipt', args: { kind: 'L2', move: 1, conf: 0.5, gen: 0 } },
     { op: 'LINK', cell: 'pq/receipt', args: { kind: 'DEATH', move: 0, conf: 0, gen: 3 } },
     { op: 'VIEW', cell: 'pq/projection/eviction', args: { shown: 3, evicted: 41 } }]);
  const verdict = stone.verifyChain(lines);
  assert.strictEqual(verdict.ok, true, 'stone.mjs itself must verify our export: ' + JSON.stringify(verdict));
  assert.strictEqual(verdict.alg, 'stone-v1');
  assert.strictEqual(verdict.genesis, 'STONE-GENESIS-1');
  assert.strictEqual(verdict.links, 4);
  // tamper detected by the canonical verifier at the canonical locator
  const tampered = lines.map(r => ({ ...r }));
  tampered[2].args.conf = 0.9;
  const bad = stone.verifyChain(tampered);
  assert.strictEqual(bad.ok, false);
  assert.strictEqual(bad.why, 'hash mismatch');
  assert.strictEqual(bad.firstBadIndex, 2);
  // dialect auto-detection resolves stone-v1 from the header alone
  assert.strictEqual(stone.detectAlg(lines), 'stone-v1');
});

test('citation pin: the lane names SuperInstance/quilt-stone in-repo (weight-law PENDING edge)', () => {
  const src = fs.readFileSync(path.join(__dirname, '..', 'tools', 'wal-export.js'), 'utf8');
  assert.ok(src.includes('SuperInstance/quilt-stone'), 'canonical source must be cited by name in-repo');
  assert.ok(src.includes('stone.mjs') && src.includes('STONE-SPEC.md'), 'citation must name the verifier and the spec');
});
