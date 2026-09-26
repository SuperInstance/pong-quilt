// R26 booked small — the REAL receipt-panel→WAL session driver.
// wal-export.js (Round 26) re-anchors any row list into the fleet WAL, but
// its demo driver hand-writes rows. This driver closes the loop: it plays a
// REAL seeded headless classic-mode session through the same two modules the
// browser panel receipts (core.js step + qa.js suggest — the qa advisor
// lane), collects every receipt the panel would show (advice rows named for
// their source, QA-REFUSAL rows when the pot is below the documented floor,
// DEATH rows at game end), re-anchors them into the doctor-consumable WAL,
// self-verifies with the exporter's own verifyQuiltWal, and writes the
// .jsonl. Seeded: same seed → byte-identical export. Weight law: a merged
// quilt-doctor PR replaying this file and citing pong-quilt = the same
// candidate VERIFIED edge pq -> quilt-doctor, now fed by a real session
// instead of a demo row list.
'use strict';

const PQ = require('../core.js');
const QuantumAudioL2 = require('../qa.js');
const { toQuiltWal, verifyQuiltWal, walToJsonl } = require('./wal-export.js');

// A paced classic-mode session, headless but real: one advice call per
// decisionInterval boundary (the page paces at death/ADVICE_EVERY; pacing
// per decision keeps every advice event receipted without a 150-frame
// gap swallowing the refusal evidence). The pot depletes by 1 per advice
// call, so a long enough session drives QA.suggest below SIM_POT_FLOOR and
// the exhaustion seam receipts QA-REFUSAL for real — the R12 doctrine,
// produced by running, not written by hand.
// opts: { games, maxFramesPerGame, shotsPerBin, deplete }
function runSession(seed, opts = {}) {
  const games = opts.games || 3;
  const maxFrames = opts.maxFramesPerGame || 4000;
  const spb0 = opts.shotsPerBin == null ? 8 : opts.shotsPerBin;
  const deplete = opts.deplete == null ? 1 : opts.deplete;
  const rand = PQ.rng(seed);
  const receipts = [];
  const stats = { seed, games: 0, frames: 0, hits: 0, advice: 0, refusals: 0, deaths: 0 };
  let pot = spb0;
  for (let g = 0; g < games; g++) {
    const game = PQ.newGame(rand);
    stats.games++;
    let alive = true;
    while (alive && game.frames < maxFrames) {
      const s0 = { ballX: game.x, ballY: game.y, velX: game.vx, velY: game.vy,
                   paddleX: game.px, speed: game.speedMul, frames: game.frames, hits: game.hits };
      const s = QuantumAudioL2.suggest(s0, (seed * 31 + g * 997 + game.frames) >>> 0, pot);
      if (s) {
        stats.advice++;
        receipts.push({ kind: s.source || 'qa-sim', move: s.move, conf: s.confidence, gen: g });
        alive = PQ.step(game, s.move, rand);
      } else {
        stats.refusals++;
        receipts.push({ kind: 'QA-REFUSAL', move: 0, conf: 0, gen: g });
        alive = PQ.step(game, 0, rand);
      }
      pot = Math.max(0, pot - deplete);
    }
    stats.frames += game.frames;
    stats.hits += game.hits;
    if (!alive) { stats.deaths++; receipts.push({ kind: 'DEATH', move: 0, conf: 0, gen: g }); }
    pot = spb0; // each new game restores the pot, like the page's fixed control
  }
  return { receipts, stats };
}

// Session → WAL. Every collected receipt becomes one LINK pq/receipt row
// (the ledger keeps them all); the export closes with an honest VIEW of the
// session, and — when the ledger exceeds the page panel's 40-row bound — a
// second VIEW admitting the panel's eviction accounting exactly as the page
// renders it ('N shown / M evicted'): the WAL is the unbounded memory, the
// projection admits the bounded display.
function sessionToWal(session) {
  const { receipts, stats } = session;
  const rows = receipts.map(r => ({ op: 'LINK', cell: 'pq/receipt',
    args: { kind: r.kind, move: r.move, conf: r.conf, gen: r.gen } }));
  rows.push({ op: 'VIEW', cell: 'pq/projection/session',
    args: { seed: stats.seed, games: stats.games, frames: stats.frames, hits: stats.hits,
            advice: stats.advice, refusals: stats.refusals, deaths: stats.deaths } });
  if (receipts.length > 40) {
    rows.push({ op: 'VIEW', cell: 'pq/projection/eviction',
      args: { shown: 40, evicted: receipts.length - 40, bound: 'page panel (index.html receipt())' } });
  }
  return toQuiltWal({ tool: 'pong-quilt',
    source: `tools/wal-session.js (seed ${stats.seed}, ${stats.games} games)` }, rows);
}

module.exports = { runSession, sessionToWal };

// CLI: node tools/wal-session.js [seed] [--out PATH] — plays the session,
// self-verifies the WAL, prints the verify report to stderr and the JSONL
// to stdout (or --out PATH). Exit 1 on any divergence.
if (require.main === module) {
  const argv = process.argv.slice(2);
  const outIdx = argv.indexOf('--out');
  const outPath = outIdx >= 0 ? argv[outIdx + 1] : null;
  const seed = outIdx === 0 ? 20260926 : (parseInt(argv[0], 10) || 20260926);
  const session = runSession(seed);
  const lines = sessionToWal(session);
  const report = verifyQuiltWal(lines);
  const fs = require('fs');
  if (outPath) fs.writeFileSync(outPath, walToJsonl(lines));
  else process.stdout.write(walToJsonl(lines));
  console.error(JSON.stringify({ ...report, receipts: session.receipts.length, stats: session.stats }));
  if (!report.ok) process.exit(1);
}
