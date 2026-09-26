// Round 18 fresh small — persist the BYO QPAM endpoint (R17 spec: "persist
// the BYO endpoint to localStorage like the LLM seam's fields, so a refresh
// doesn't strand a real backend").
// LIE HUNT on the spec itself: the LLM seam's fields are NOT persisted — the
// key field says "stays in page memory only" and index.html had zero
// localStorage at R17 tip. The spec's "like the LLM seam" premise
// misdescribes the code. The honest contract, made explicit in the pins:
//   - the BYO endpoint URL persists (it is not a credential; losing it on
//     refresh strands a real backend the user pointed at);
//   - the LLM key still NEVER persists (it IS a credential).
// FAIL-first: at R17 tip index.html touches no localStorage at all.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

function readHtml() {
  return fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
}

// Extract the R18 init block: from its banner comment to tick(); — the same
// slice the page executes top-level at load.
function extractInitBlock() {
  const html = readHtml();
  const start = html.indexOf("// R18: persist the BYO endpoint");
  assert.ok(start > 0, "index.html must carry the R18 persistence init block");
  const end = html.indexOf("tick();", start);
  assert.ok(end > start, "the init block must end at the tick() boot call");
  return html.slice(start, end);
}

test("ANCHOR: index.html restores the BYO endpoint from localStorage at boot", () => {
  const src = extractInitBlock();
  assert.ok(/localStorage\.getItem\("pq\.byoQpamEndpoint"\)/.test(src),
    "boot must read pq.byoQpamEndpoint back into #qabyoep — a refresh must not strand a real backend");
});

test("ANCHOR: typing persists; clearing removes (the seam ships closed, storage agrees)", () => {
  const src = extractInitBlock();
  assert.ok(/addEventListener\("input"/.test(src), "persistence must ride the input event");
  assert.ok(/localStorage\.setItem\("pq\.byoQpamEndpoint"/.test(src), "a non-empty URL must be saved");
  assert.ok(/localStorage\.removeItem\("pq\.byoQpamEndpoint"\)/.test(src),
    "clearing the field must remove the key — an empty field + a stale stored URL would reopen the seam after refresh, violating 'ships closed'");
});

test("SECURITY: the only localStorage key on the page is the endpoint URL — the LLM key NEVER persists", () => {
  const html = readHtml();
  const keys = new Set();
  for (const m of html.matchAll(/localStorage\.(?:getItem|setItem|removeItem)\("([^"]+)"/g)) keys.add(m[1]);
  assert.deepEqual([...keys], ["pq.byoQpamEndpoint"],
    "no other field — above all not the LLM key — may touch localStorage; the key field says 'stays in page memory only' and the pin makes it load-bearing");
});

test("BEHAVIOR: boot restore + input persist/clear round-trip against stub storage", () => {
  const src = extractInitBlock();
  const store = new Map();
  const ls = {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
  };
  const els = { qabyoep: { value: "", addEventListener: (ev, fn) => { els._handler = fn; } } };
  const $ = (id) => els[id];
  // The init block runs top-level in the page with $ and localStorage in scope.
  new Function("$", "localStorage", src)($, ls);
  assert.equal(els.qabyoep.value, "", "no stored value -> field stays at its empty default (seam closed)");

  els.qabyoep.value = "https://qpam.example.com/wire";
  els._handler({ target: els.qabyoep });
  assert.equal(store.get("pq.byoQpamEndpoint"), "https://qpam.example.com/wire", "typing the URL must persist it");

  // simulate refresh: fresh element, same storage
  const els2 = { qabyoep: { value: "", addEventListener: (ev, fn) => { els2._handler = fn; } } };
  new Function("$", "localStorage", extractInitBlock())((id) => els2[id], ls);
  assert.equal(els2.qabyoep.value, "https://qpam.example.com/wire", "a refresh must restore the endpoint — the R17 spec's whole point");

  els2.qabyoep.value = "   ";
  els2._handler({ target: els2.qabyoep });
  assert.equal(store.has("pq.byoQpamEndpoint"), false, "clearing the field must delete the key (trimmed empty)");
});
