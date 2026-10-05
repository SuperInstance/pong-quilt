// tools/build-site.mjs — build the pong-quilt site for Cloudflare deploy.
// Copies the demo BYTE-IDENTICAL into dist/demo/ (never re-implements it),
// writes a sha256 provenance receipt consumed by /api/provenance.
// Usage: node tools/build-site.mjs          — seal the build
//        node tools/build-site.mjs --check   — dry-run: is the seal still fresh?
//
// R93: --check dry-run (R88 item 5 → R93, 5th carrying, first build). The R88
// stale-dist seal is test-only: a human or script running this tool directly
// had NO way to discover drift before acting — R92 and R93 both lived the
// wound (a 104-second full-suite run was the only detector). --check computes
// the SAME full-manifest drift as the r88 pin (shared code, not a re-write),
// exits 0 with a one-line receipt when fresh, exits 1 NAMING the drifted
// files + the sealed head when stale. BUILD_SITE_ROOT overrides the tree
// root for hermetic CLI tests (named seam, default = this repo).
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, copyFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = process.env.BUILD_SITE_ROOT ||
  path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = path.join(root, 'site');
const dist = path.join(site, 'dist');
const gen = path.join(site, 'generated');
const sha = f => createHash('sha256').update(readFileSync(f)).digest('hex');

// The demo file set — one definition shared by build, --check, and the pins.
const DEMO_FILES = ['index.html', 'core.js', 'qa.js'];
const DEMO_TOOL_FILES = ['tools/wal-export.js'];

function collectManifestFiles() {
  const files = [];
  for (const f of DEMO_FILES) files.push({ rel: f, file: `demo/${f}` });
  for (const f of DEMO_TOOL_FILES) files.push({ rel: f, file: `demo/${f}` });
  for (const f of readdirSync(path.join(root, 'checkpoints')).sort())
    files.push({ rel: `checkpoints/${f}`, file: `demo/checkpoints/${f}` });
  return files;
}

// The r88 pin's exact drift computation, shared: compare every sealed sha256
// against the LIVE SOURCE (not the dist copy) so a source-side drift is named
// with the fix. Missing live files are skipped — parity with tests/site-glue.test.js.
export function computeDrift(rootDir, prov) {
  const drifted = [];
  for (const m of prov.manifest) {
    const liveAbs = path.join(rootDir, m.file.replace(/^demo\//, ''));
    if (existsSync(liveAbs) && sha(liveAbs) !== m.sha256) drifted.push(m.file);
  }
  return drifted;
}

// R93 --check: { code, line } — a NAMED state either way, never a silent exit.
export function checkMode(rootDir) {
  const provPath = path.join(rootDir, 'site', 'generated', 'provenance.json');
  if (!existsSync(provPath)) {
    return { code: 1, line: 'NO-SEAL: no sealed build at site/generated/provenance.json — ' +
      'run `node tools/build-site.mjs` to seal, then re-check (R88 named-failure seal)' };
  }
  const prov = JSON.parse(readFileSync(provPath, 'utf8'));
  const drifted = computeDrift(rootDir, prov);
  if (drifted.length) {
    return { code: 1, line: `STALE-DIST: sources drifted from the sealed build ` +
      `(sealed at head ${prov.head}): ${drifted.join(', ')} — ` +
      'run `node tools/build-site.mjs` to reseal, then re-check.' };
  }
  return { code: 0, line: `seal fresh: ${prov.files} demo files match the working tree ` +
    `(sealed at head ${String(prov.head).slice(0, 9)}…)` };
}

function build() {
  rmSync(dist, { recursive: true, force: true });
  mkdirSync(dist, { recursive: true });
  mkdirSync(gen, { recursive: true });

  // 1. the site itself (page + interactive layer)
  copyFileSync(path.join(site, 'index.html'), path.join(dist, 'index.html'));
  copyFileSync(path.join(site, 'app.js'), path.join(dist, 'app.js'));

  // 2. the demo, byte-identical — every file the demo page references, so no
  // 404 can amputate the game loop (R47: tools/wal-export.js 404'd live while
  // the ball froze; the freeze had its own cause, but the 404 was real).
  mkdirSync(path.join(dist, 'demo'), { recursive: true });
  mkdirSync(path.join(dist, 'demo', 'checkpoints'), { recursive: true });
  mkdirSync(path.join(dist, 'demo', 'tools'), { recursive: true });
  for (const f of DEMO_FILES) copyFileSync(path.join(root, f), path.join(dist, 'demo', f));
  for (const f of DEMO_TOOL_FILES) copyFileSync(path.join(root, f), path.join(dist, 'demo', 'tools', path.basename(f)));
  for (const f of readdirSync(path.join(root, 'checkpoints')))
    copyFileSync(path.join(root, 'checkpoints', f), path.join(dist, 'demo', 'checkpoints', f));

  // 3. provenance receipt
  const manifest = collectManifestFiles().map(({ rel, file }) => ({ file, sha256: sha(path.join(root, rel)) }));
  let head = 'unknown';
  try { head = execSync('git -C ' + JSON.stringify(root) + ' rev-parse HEAD', { encoding: 'utf8' }).trim(); } catch {}
  const prov = {
    ok: true, repo: 'SuperInstance/pong-quilt', head,
    files: manifest.length, demo: 'byte-identical copies of the repo working tree at build time',
    manifest,
  };
  writeFileSync(path.join(gen, 'provenance.json'), JSON.stringify(prov, null, 2));
  console.log(`build ok: ${manifest.length} demo files sealed, head ${head.slice(0, 9)}`);
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  if (process.argv.includes('--check')) {
    const r = checkMode(root);
    (r.code === 0 ? console.log : console.error)(r.line);
    process.exit(r.code);
  }
  build();
}
