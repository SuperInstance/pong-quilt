// Round 8 pin — the page must PARSE. The quantum-audio merge (PR #3) broke
// draw()'s champion strip: cv.moveTo became qa.moveTo (block-scoped const from
// the qaVis branch), });cv.stroke(); became }).stroke(); (forEach returns
// undefined), one extra } slid in — the inline <script> failed to parse and
// NOTHING on the page ran (no game, no training, no receipts). Round 7
// receipted the P0 but deliberately did NOT fix it ("the page stays dark
// until R8 spec item 1"). This test extracts EVERY inline <script> block from
// the shipped index.html and asserts it parses. Against the broken page it
// must FAIL; against the fix it must PASS. The pin is structural, not
// cosmetic: a future merge that unbalances ANY inline block trips it.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

function inlineBlocks() {
  const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  // only blocks WITHOUT src= — external scripts have their own loaders/tests
  return [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)]
    .map((m, i) => ({ i, code: m[1] }));
}

test("index.html ships at least one inline script block", () => {
  assert.ok(inlineBlocks().length >= 1, "expected the demo's inline <script>");
});

test("every inline <script> block in index.html parses", () => {
  const blocks = inlineBlocks();
  assert.ok(blocks.length >= 1);
  for (const b of blocks) {
    let threw = null;
    try { new Function(b.code); } catch (e) { threw = e; }
    assert.equal(threw, null,
      `inline block #${b.i} must parse${threw ? ` — got: ${threw.message}` : ""}`);
  }
});

test("every inline block is brace-balanced (depth returns to 0)", () => {
  for (const b of inlineBlocks()) {
    let depth = 0;
    for (const ch of b.code) { if (ch === "{") depth++; if (ch === "}") depth--; }
    assert.equal(depth, 0, `inline block #${b.i} brace depth must end at 0, got ${depth}`);
  }
});
