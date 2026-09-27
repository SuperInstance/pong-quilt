# site/ — the pong-quilt website

Understand the repo by playing it, in many forms. Zero dependencies, no build
framework — one hand-written HTML page, one Worker, the repo's own core.

## What this is

- `index.html` — the explorable: "many forms" cards (classic L0→L2, C1
  coevolution, advisors, scratch tile, WAL export) each with a *what to
  watch* caption and the verified claim behind it; a Seed Lab (worker-side
  deterministic replay); a Claim Judge (replay + live JEV verdict); a moth
  ledger view; the VERIFIED_CLAIMS wristband rendered from the repo's own
  core.js. Design school: Bartosz Ciechanowski's interactive explainers —
  play with the mechanism to understand it.
- `worker.js` — Cloudflare Worker. Endpoints:
  - `GET /api/claims` — VERIFIED_CLAIMS straight from core.js.
  - `GET /api/provenance` — build-sealed sha256 manifest of the demo copies.
  - `POST /api/replay` `{level, seed}` — re-runs core.js in the isolate;
    seed-deterministic; validated inputs.
  - `POST /api/judge` `{level, seed, claim}` — replays, then asks JEV
    (typesafe.ai) whether the claim matches the receipt. No key → named
    abstain, never a fake verdict.
  - `GET /api/moth` — reads the live moth ledger (read-only; no credits
    spent). Key unbound → named abstain.
- `wrangler.toml` — Workers Static Assets over `dist/`; `/api/*` falls
  through to the worker.

## Build & test (no Cloudflare needed)

```
node tools/build-site.mjs     # seals dist/ (demo byte-identical) + provenance
node --test tests/*.test.js   # site-glue pins byte-identity, determinism, abstention
node tools/site-lab.mjs       # pre-build contract probe (needs JEV/moth env)
```

## Deploy

```
cd site
npx wrangler secret put TYPESAFEAI_KEY   # JEV judge
npx wrangler secret put MOTHQUANTUM_KEY  # moth ledger read
npx wrangler secret put MOTHQUANTUM_BASE # e.g. https://api.mothquantum.com/api/v1
CLOUDFLARE_API_TOKEN=… npx wrangler deploy
```

Honesty doctrine (repo-native): every backend seam is either live-verified
or named-absent. The demo is never forked — the provenance endpoint lets any
visitor verify the byte-identity claim themselves.
