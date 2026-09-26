// R29 spec small — doctor-live E2E pin (FAIL-first: this file is absent
// on main, so the VERIFIED_CLAIMS row + honesty two-way pin trip loudly,
// not silently).
// Why pins: the R26 export tool mirrors quilt_doctor/substrate.py's
// QuiltSubstrate.verify() line-for-line IN JAVASCRIPT. A mirror can drift
// from the real consumer and still pass its own reflection. This pin runs
// the REAL consumer — quilt_doctor/substrate.py loaded live from a local
// quilt-doctor clone — against the exporter's actual JSONL output:
//   clean export  -> doctor verify() ok:true
//   tampered row  -> doctor names hash_mismatch at the exact seq
//   JS mirror     -> agrees with the doctor's verdict, same seq, same why
// Offline doctrine: if no quilt-doctor clone is present (QUILT_DOCTOR_PATH
// env or /tmp/quilt-doctor) the live tests abstain with a named skip —
// honest degrade, never a fake green (cowboy gate offline-abstain shape).
'use strict';
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path'), os = require('os');
const { execFileSync } = require('child_process');

function extractExports() {
  const src = fs.readFileSync(path.join(__dirname, '..', 'tools', 'wal-export.js'), 'utf8');
  assert.ok(src.includes('function fnv1a64(s)'), 'wal-export.js absent on this tip — the doctor-shaped WAL lane is not shipped');
  const mod = { exports: {} };
  new Function('module', 'require', 'process', src + '\nif(false){}')(mod, require, { main: {} });
  return mod.exports;
}

function doctorRoot() {
  const p = process.env.QUILT_DOCTOR_PATH || '/tmp/quilt-doctor';
  return fs.existsSync(path.join(p, 'quilt_doctor', 'substrate.py')) ? p : null;
}

// Load quilt_doctor/substrate.py BY FILE, bypassing the package __init__
// (the package drags lens deps we don't need and may not have installed).
function doctorVerify(walPath, root) {
  const driver = [
    'import sys, json, importlib.util',
    'spec = importlib.util.spec_from_file_location("qd_substrate", sys.argv[1] + "/quilt_doctor/substrate.py")',
    'm = importlib.util.module_from_spec(spec)',
    'spec.loader.exec_module(m)',
    'print(json.dumps(m.QuiltSubstrate(sys.argv[2]).verify()))',
  ].join('\n');
  const out = execFileSync('python3', ['-c', driver, root, walPath], { encoding: 'utf8' });
  return JSON.parse(out.trim().split('\n').pop());
}

// Content-tamper: rewrite the EMITTED JSONL after hashing (a forger editing
// the file, not a producer re-anchoring). Hash is not recomputed.
function tamperFile(p, seq) {
  const lines = fs.readFileSync(p, 'utf8').trim().split('\n').map(l => JSON.parse(l));
  lines[seq].args.kind = 'FORGED';
  fs.writeFileSync(p, lines.map(l => JSON.stringify(l)).join('\n') + '\n');
}

const ROWS = [
  { op: 'LINK', cell: 'pq/receipt', args: { kind: 'L2', move: 1, conf: 0.42, gen: 0 } },
  { op: 'LINK', cell: 'pq/receipt', args: { kind: 'L0', move: 0, conf: 0.10, gen: 1 } },
  { op: 'LINK', cell: 'pq/receipt', args: { kind: 'DEATH', move: 0, conf: 0, gen: 3 } },
  { op: 'VIEW', cell: 'pq/projection/eviction', args: { shown: 4, evicted: 36 } },
];
const TAMPER_SEQ = 3; // row seq in the file (BIND genesis = 0, so ROWS[2] lands here)

let tmpDir;
test.before(() => { tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pq-doctor-e2e-')); });
test.after(() => { fs.rmSync(tmpDir, { recursive: true, force: true }); });

function exportTo(dir, rows) {
  const { toQuiltWal, walToJsonl } = extractExports();
  const lines = toQuiltWal({ tool: 'pong-quilt', source: 'tests/wal-doctor-e2e.test.js' }, rows);
  const p = path.join(dir, 'wal.jsonl');
  fs.writeFileSync(p, walToJsonl(lines));
  return { p, lines };
}

test('clean export passes the doctor\'s OWN verify() — the mirror matches the consumer', { skip: doctorRoot() ? false : 'quilt-doctor clone absent (set QUILT_DOCTOR_PATH) — offline abstain, honest skip' }, () => {
  const { p, lines } = exportTo(tmpDir, ROWS);
  const v = doctorVerify(p, doctorRoot());
  assert.strictEqual(v.ok, true, 'doctor verify must accept the clean export: ' + JSON.stringify(v.divergences));
  assert.strictEqual(v.lines, lines.length);
});

test('content-tampered row is caught by the doctor at the exact seq, named hash_mismatch', { skip: doctorRoot() ? false : 'quilt-doctor clone absent (set QUILT_DOCTOR_PATH) — offline abstain, honest skip' }, () => {
  const { p } = exportTo(tmpDir, ROWS);
  tamperFile(p, TAMPER_SEQ);
  const v = doctorVerify(p, doctorRoot());
  assert.strictEqual(v.ok, false, 'tampered chain must NOT verify');
  assert.ok(v.divergences.some(d => d.seq === TAMPER_SEQ && d.why === 'hash_mismatch'),
    'doctor must name hash_mismatch at the tampered seq: ' + JSON.stringify(v.divergences));
});

test('JS mirror verifyQuiltWal and the doctor agree — same verdict, same seq, same why', { skip: doctorRoot() ? false : 'quilt-doctor clone absent (set QUILT_DOCTOR_PATH) — offline abstain, honest skip' }, () => {
  const { verifyQuiltWal, toQuiltWal } = extractExports();
  const { p } = exportTo(tmpDir, ROWS);
  tamperFile(p, TAMPER_SEQ);
  const lines = toQuiltWal({ tool: 'pong-quilt', source: 'mirror-agreement' }, ROWS);
  lines[TAMPER_SEQ].args.kind = 'FORGED'; // same content-tamper as the file
  const js = verifyQuiltWal(lines);
  const py = doctorVerify(p, doctorRoot());
  assert.strictEqual(js.ok, py.ok, 'mirror and doctor must give the same ok verdict');
  const jsWhy = js.divergences.map(d => d.seq + ':' + d.why).sort().join(',');
  const pyWhy = py.divergences.map(d => d.seq + ':' + d.why).sort().join(',');
  assert.strictEqual(jsWhy, pyWhy, 'mirror divergence vocabulary must equal the doctor\'s exactly');
});
