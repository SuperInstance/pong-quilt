// R26 WAL-export glue pins (FAIL-first: tools/wal-export.js is absent on
// main, so extraction itself trips — loud fail, not silent skip).
// Why pins: the page chains receipts with the panel hash (hash8, h*31 — a
// display hash, never claimed otherwise). quilt-doctor's substrate
// (SuperInstance/quilt-doctor quilt_doctor/substrate.py, canonical producer
// git-agent PR #1's quilt_emit) speaks the fleet five-opcode WAL: BIND/LINK/
// VIEW lines, fnv1a-64 chained, replayable. The export tool re-anchors any
// row list into THAT shape so the doctor's own verify() consumes pong-quilt
// receipts with zero bespoke adapter code. The pins below extract the
// exporter VERBATIM and cross-check it against the consumer, live-audited
// from the quilt-doctor repo at build time (key shape {args, cell, hash,
// op, prev_hash, seq}; divergence vocabulary hash_mismatch/chain_break/
// seq_gap; canonical json = sorted keys at every level, no whitespace).
'use strict';
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path');

function extractExports() {
  const src = fs.readFileSync(path.join(__dirname, '..', 'tools', 'wal-export.js'), 'utf8');
  assert.ok(src.includes('function fnv1a64(s)'), 'wal-export.js absent on this tip — the doctor-shaped WAL lane is not shipped');
  const mod = { exports: {} };
  new Function('module', 'require', 'process', src + '\nif(false){}')(mod, require, { main: {} });
  return mod.exports;
}

test('fnv1a-64 vectors agree with the fleet algorithm (doctor substrate live value)', () => {
  const { fnv1a64 } = extractExports();
  // live from quilt_doctor/substrate.py: fnv1a("") = offset basis; and a
  // BIND-genesis body cross-checked against python's json.dumps(sort_keys)
  // at build time (Round 26 PLAYLOG carries the cross-tool receipt).
  assert.strictEqual(fnv1a64(''), 'cbf29ce484222325');
  assert.strictEqual(
    fnv1a64('{"args":{"source":"s","tool":"pong-quilt"},"cell":"pq/session","op":"BIND","prev_hash":"0000000000000000","seq":0}'),
    'c86b3c06e0945d6d');
});

test('export emits exactly the doctor WAL key shape, genesis-chained', () => {
  const { toQuiltWal, OPS } = extractExports();
  const lines = toQuiltWal({ tool: 'pong-quilt', source: 'pin' },
    [{ op: 'LINK', cell: 'pq/receipt', args: { kind: 'L2', move: 1, conf: 0.5, gen: 0 } }]);
  assert.strictEqual(lines.length, 2, 'BIND genesis + one LINK');
  assert.deepStrictEqual(Object.keys(lines[0]).sort(), ['args', 'cell', 'hash', 'op', 'prev_hash', 'seq'],
    'row key shape must be exactly what quilt_doctor/substrate.py writes');
  assert.strictEqual(lines[0].op, 'BIND');
  assert.strictEqual(lines[0].prev_hash, '0'.repeat(16));
  assert.strictEqual(lines[1].prev_hash, lines[0].hash, 'LINK continues the BIND chain');
  assert.deepStrictEqual(OPS, ['BIND', 'LINK', 'VIEW'], 'the five-opcode spine names, vendored');
});

test('verifyQuiltWal speaks the consumer divergence vocabulary — tamper is named, never silent', () => {
  const { toQuiltWal, verifyQuiltWal } = extractExports();
  const lines = toQuiltWal({ tool: 'pong-quilt', source: 'pin' },
    [{ op: 'LINK', cell: 'pq/receipt', args: { kind: 'DEATH', move: 0, conf: 0, gen: 1 } }]);
  assert.deepStrictEqual(verifyQuiltWal(lines), { ok: true, divergences: [], lines: 2 });
  const tampered = JSON.parse(JSON.stringify(lines));
  tampered[1].args.kind = 'SURVIVED'; // content edit without re-chaining
  const r1 = verifyQuiltWal(tampered);
  assert.strictEqual(r1.ok, false);
  assert.ok(r1.divergences.some(d => d.why === 'hash_mismatch'), 'content tamper named hash_mismatch');
  const spliced = JSON.parse(JSON.stringify(lines));
  spliced[0] = JSON.parse(JSON.stringify(lines[1])); // splice a later row into genesis
  const r2 = verifyQuiltWal(spliced);
  assert.ok(r2.divergences.some(d => d.why === 'chain_break'), 'cross-chain splice named chain_break');
  const gapped = JSON.parse(JSON.stringify(lines));
  gapped[1].seq = 7;
  const r3 = verifyQuiltWal(gapped);
  assert.ok(r3.divergences.some(d => d.why === 'seq_gap'), 'sequence gap named seq_gap');
});

test('unknown op is refused — the export can never launder a non-spine opcode', () => {
  const { toQuiltWal } = extractExports();
  assert.throws(() => toQuiltWal({ tool: 'pong-quilt', source: 'pin' },
    [{ op: 'MINT', cell: 'pq/receipt', args: {} }]), /unknown WAL op/);
});

test('walToJsonl round-trips through JSON.parse with sorted keys', () => {
  const { toQuiltWal, walToJsonl } = extractExports();
  const lines = toQuiltWal({ tool: 'pong-quilt', source: 'pin' },
    [{ op: 'VIEW', cell: 'pq/projection/x', args: { verdict: 'ok', score: 1 } }]);
  const back = walToJsonl(lines).trim().split('\n').map(l => JSON.parse(l));
  assert.deepStrictEqual(back, lines);
  assert.ok(walToJsonl(lines).split('\n')[0].startsWith('{"args":'), 'canonical file form: sorted keys, no whitespace');
});
