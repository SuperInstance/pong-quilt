// tools/build-site.mjs — build the pong-quilt site for Cloudflare deploy.
// Copies the demo BYTE-IDENTICAL into dist/demo/ (never re-implements it),
// writes a sha256 provenance receipt consumed by /api/provenance.
// Usage: node tools/build-site.mjs
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, copyFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = path.join(root, 'site');
const dist = path.join(site, 'dist');
const gen = path.join(site, 'generated');
const sha = f => createHash('sha256').update(readFileSync(f)).digest('hex');

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
mkdirSync(gen, { recursive: true });

// 1. the site itself
copyFileSync(path.join(site, 'index.html'), path.join(dist, 'index.html'));

// 2. the demo, byte-identical (index.html + core.js + qa.js + checkpoints)
const demoFiles = ['index.html', 'core.js', 'qa.js'];
mkdirSync(path.join(dist, 'demo'), { recursive: true });
mkdirSync(path.join(dist, 'demo', 'checkpoints'), { recursive: true });
for (const f of demoFiles) copyFileSync(path.join(root, f), path.join(dist, 'demo', f));
for (const f of readdirSync(path.join(root, 'checkpoints')))
  copyFileSync(path.join(root, 'checkpoints', f), path.join(dist, 'demo', 'checkpoints', f));

// 3. provenance receipt
const manifest = [];
for (const f of demoFiles) manifest.push({ file: `demo/${f}`, sha256: sha(path.join(root, f)) });
for (const f of readdirSync(path.join(root, 'checkpoints')).sort())
  manifest.push({ file: `demo/checkpoints/${f}`, sha256: sha(path.join(root, 'checkpoints', f)) });
let head = 'unknown';
try { head = execSync('git -C ' + JSON.stringify(root) + ' rev-parse HEAD', { encoding: 'utf8' }).trim(); } catch {}
const prov = {
  ok: true, repo: 'SuperInstance/pong-quilt', head,
  files: manifest.length, demo: 'byte-identical copies of the repo working tree at build time',
  manifest,
};
writeFileSync(path.join(gen, 'provenance.json'), JSON.stringify(prov, null, 2));
console.log(`build ok: ${manifest.length} demo files sealed, head ${head.slice(0, 9)}`);
