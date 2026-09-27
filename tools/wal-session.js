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
const { toQuiltWal, verifyQuiltWal, walToJsonl, toStoneV1, verifyStoneV1, loadStone } = require('./wal-export.js');

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

// Session → rows. Every collected receipt becomes one LINK pq/receipt row
// (the ledger keeps them all); the export closes with an honest VIEW of the
// session, and — when the ledger exceeds the page panel's 40-row bound — a
// second VIEW admitting the panel's eviction accounting exactly as the page
// renders it ('N shown / M evicted'): the WAL is the unbounded memory, the
// projection admits the bounded display. ONE row builder feeds both the
// five-opcode WAL (sessionToWal) and the stone-v1 seal (sessionToStoneV1,
// Round 38) so the two chains can never disagree about the session.
function sessionRows(session) {
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
  return rows;
}

function sessionToWal(session) {
  const { stats } = session;
  return toQuiltWal({ tool: 'pong-quilt',
    source: `tools/wal-session.js (seed ${stats.seed}, ${stats.games} games)` }, sessionRows(session));
}

// Round 38 — the session driver's stone-v1 seal. The session rows are
// re-anchored into quilt-stone's canonical stone-v1 forward format
// (SuperInstance/quilt-stone stone.mjs, STONE-SPEC.md §4.6) using
// wal-export.js's toStoneV1 — exactly one stone-v1 dialect in the repo. The
// seal is the receipt OVER the session WAL, the same shape as the R36
// exporter seam and the R37 prerun seal: verified BEFORE it is written
// (offline mirror first; quilt-stone's OWN stone.mjs via loadStone() when
// QUILT_STONE_DIR names a checkout), any refusal → no file, never a
// hand-rolled stand-in presented as stone.
function sessionToStoneV1(session) {
  const { stats } = session;
  return toStoneV1({ tool: 'pong-quilt',
    source: `tools/wal-session.js stone seal (seed ${stats.seed}, ${stats.games} games)` },
    sessionRows(session));
}

module.exports = { runSession, sessionToWal, sessionToStoneV1, parseCliArgs };

// CLI arg parse (Round 33 — the R32-booked P4): unrecognized positional args,
// unknown flags, and a valueless --out are USAGE errors (stderr + exit 2),
// never silently defaulted and never a raw TypeError from
// fs.writeFileSync(undefined). Exported for unit pins; the glue pin drives
// the real CLI by spawning it.
function parseCliArgs(argv) {
  const USAGE = 'usage: node tools/wal-session.js [seed] [--out PATH] [--stone-out PATH]';
  const fail = (why) => ({ error: USAGE + ' — ' + why });
  let outPath = null;
  let stoneOutPath = null;
  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--out') {
      const v = argv[i + 1];
      if (v == null || v.startsWith('--')) return fail('--out requires a PATH value');
      outPath = v;
      i++;
    } else if (a === '--stone-out') {
      const v = argv[i + 1];
      if (v == null || v.startsWith('--')) return fail('--stone-out requires a PATH value');
      stoneOutPath = v;
      i++;
    } else if (a.startsWith('--')) {
      return fail('unrecognized flag: ' + a);
    } else {
      positional.push(a);
    }
  }
  if (positional.length > 1)
    return fail('unrecognized argument: ' + positional.slice(1).join(' '));
  const seed = positional.length ? (parseInt(positional[0], 10) || 20260926) : 20260926;
  return { seed, outPath, stoneOutPath };
}

// CLI: node tools/wal-session.js [seed] [--out PATH] [--stone-out PATH] —
// plays the session, self-verifies the WAL, prints the verify report to
// stderr and the JSONL to stdout (or --out PATH). Exit 1 on any divergence;
// exit 2 + usage on arg misuse. Round 38: --stone-out PATH additionally
// seals the session rows in stone-v1 (quilt-stone canonical format), verified
// BEFORE the file is written — offline mirror always, quilt-stone's OWN
// stone.mjs when QUILT_STONE_DIR names a checkout; a refusal bricks the run
// (exit 1, no seal file), never a silent skip.
if (require.main === module) {
  const parsed = parseCliArgs(process.argv.slice(2));
  if (parsed.error) {
    console.error(parsed.error);
    process.exit(2);
  }
  const { seed, outPath, stoneOutPath } = parsed;
  const session = runSession(seed);
  const lines = sessionToWal(session);
  const report = verifyQuiltWal(lines);
  const fs = require('fs');
  if (outPath) fs.writeFileSync(outPath, walToJsonl(lines));
  else process.stdout.write(walToJsonl(lines));
  console.error(JSON.stringify({ ...report, receipts: session.receipts.length, stats: session.stats }));
  if (!report.ok) process.exit(1);
  if (stoneOutPath) {
    (async () => {
      const WALX = require('./wal-export.js');
      const seal = sessionToStoneV1(session);
      const mirror = WALX.verifyStoneV1(seal); // verify BEFORE write (R30 lesson)
      if (!mirror.ok) {
        console.error(`stone: SEAL/REFUSED mirror verify failed ${JSON.stringify(mirror)}`);
        process.exit(1);
      }
      const stone = await WALX.loadStone(); // live cross-check only when a checkout is named
      let liveNote = 'live stone.mjs: no checkout named (QUILT_STONE_DIR) — mirror-only receipt, labeled';
      if (stone) {
        const v = stone.verifyChain(seal);
        if (!v.ok) {
          console.error(`stone: SEAL/REFUSED canonical verifier rejects the seal ${JSON.stringify(v)}`);
          process.exit(1);
        }
        liveNote = `live stone.mjs verifyChain: ok (links ${v.links})`;
      }
      fs.writeFileSync(stoneOutPath, walToJsonl(seal));
      console.error(`stone: sealed ${seal.length - 1} session rows -> ${stoneOutPath}; mirror ok; ${liveNote}`);
    })().catch(e => { console.error('stone: SEAL/REFUSED', e && e.message ? e.message : e); process.exit(1); });
  }
}
