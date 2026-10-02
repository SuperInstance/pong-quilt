// Round 78 pin — the σ→lineage-visibility disclosure at the slider
// (R77 spec item 1 → carried R74→R77, 13th carrying; first build here).
//
// Wound closed: twelve rounds specified that the σ slider must disclose the
// R66 measured lineage-visibility law; twelve rounds it stayed a spec line.
// The player dragging σ saw a bare number with no indication that σ=2 and
// σ=12 are DIFFERENT VISIBILITY REGIMES — at σ=12 the gen-1 champ's close
// lineage (<L2 2.0, the R54 receipt resolution) usually dies by gen 2
// (measured: one mutation step ~0.56 scatters children off the anchor and
// selection does not keep them — descendants real per R65, visibility dead
// per R66), while at σ=2 the gen-1 champ's lineage cluster SURVIVES 2–3
// generations (≥16 nets within 2.0 at gen 2, 5-seed band 16–29). Meanwhile
// the C1 copy kept saying "breeds descendants, not noise" — true at every
// σ for the breeding mechanism, and silently genetic-drift at σ≥12 at the
// receipt resolution. The disclosure prints the measured law AT the slider,
// from first paint, no Train required.
//
// Tests (render-level, verbatim extraction — the R69/R73 pattern):
//  (1) DISCLOSURE-EXISTS — index.html carries the sigLine function and a
//      #sigline mount adjacent to the σ slider; the wiring listens on the
//      slider's input event and initializes before the first Train.
//  (2) SIG-2-VISIBLE — sigLine(2) names the surviving cluster (the measured
//      σ=2 law: cluster survives, with the measured count band).
//  (3) SIG-12-INVISIBLE — sigLine(12) names the invisible-lineage regime
//      (the measured σ=12 law: close lineage usually dies by gen 2, while
//      descendants stay real — never a "breeding is broken" reading).
//  (4) UNMEASURED-BANDS — sigLine(7) and sigLine(40) name the measurement
//      gap (R66 pinned σ=2 and σ=12 only; a transition curve between or
//      beyond them would be interpolation, i.e. fabrication).
//  FAIL-first on the pre-R78 tree: DISCLOSURE-EXISTS RED (no sigLine, no
//  #sigline mount, no wiring).
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const HTML = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const LINES = HTML.split("\n");

function extractFn(startPrefix) {
  const s = LINES.findIndex((l) => l.startsWith(startPrefix));
  if (s < 0) throw new Error("missing " + startPrefix);
  return LINES[s]; // sigLine is a single-line function — verbatim, no end-marker ambiguity
}

// Build sigLine in an isolated scope straight from the page source.
const sigLine = new Function(extractFn("function sigLine(") + "\nreturn sigLine;")();

test("DISCLOSURE-EXISTS: index.html carries sigLine + a #sigline mount next to the σ slider + live wiring", () => {
  assert.ok(LINES.some((l) => l.includes('id="sigline"')), "a #sigline mount must exist adjacent to the σ slider");
  assert.ok(HTML.includes("$(" + JSON.stringify("sig") + ").addEventListener(" + JSON.stringify("input"),
    ) || HTML.includes('$("sig").addEventListener("input"'),
    "the slider's input event must re-render the disclosure (a dead disclosure is the R64-class half-fix)");
  assert.ok(HTML.includes('textContent=sigLine($("sig").value)'),
    "the disclosure must initialize from the slider's current value (first paint, no Train required)");
});

test("SIG-2-VISIBLE: sigLine(2) names the surviving lineage cluster — the measured σ=2 law", () => {
  const t = sigLine(2);
  assert.match(t, /VISIBLE/i, "σ=2 must name the visible regime");
  assert.match(t, /survives/i, "σ=2 must state the cluster survives (2–3 gens measured)");
  assert.match(t, /16|cluster/i, "σ=2 must carry the measured band (≥16 nets within L2 2.0 at gen 2, 5 seeds)");
});

test("SIG-12-INVISIBLE: sigLine(12) names the invisible-lineage regime — the measured σ=12 law", () => {
  const t = sigLine(12);
  assert.match(t, /INVISIBLE/i, "σ=12 must name the invisible regime");
  assert.match(t, /gen 2/i, "σ=12 must name the gen-2 death horizon (measured, not asserted)");
  assert.match(t, /real/i, "σ=12 must keep the R65 mechanism truth: descendants are real, visibility dies — never a 'breeding is broken' reading");
});

test("UNMEASURED-BANDS: sigLine(7) and sigLine(40) name the gap — no fabricated transition curve", () => {
  const mid = sigLine(7), high = sigLine(40);
  assert.match(mid, /unmeasured/i, "between the pinned points the disclosure must say unmeasured (R66 pinned 2 and 12 only)");
  assert.match(high, /unmeasured/i, "past the pinned points the disclosure must say unmeasured (no verbatim measurement at this σ)");
});
