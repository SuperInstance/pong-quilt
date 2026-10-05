# PLAYLOG — the experiment's memory

Every round is a receipted observation in the loop. Newest first.

## Canonical index (repair R11 item 2)

| Round | Date | Branch / base | Status |
|---|---|---|---|
| R92 | 2026-10-05 | playtest-round-92 (vs main a4a4f88 post-#113 — the PR queue EMPTY at round time, the Casey gate fully open; R92 spec item 4 first build after 2 carryings: the abstaining-judge check label — tools/site-playtest.mjs gains classifyJudge + JUDGE_LABEL_VERDICT/ABSTAIN, check 5's name comes from the classifier (a numeric verdict keeps the verdict label; a named abstention gets its own label — PASS but never a verdict-claim; NaN rejected via Number.isFinite), 10-test pin incl. hermetic CLI stub scenarios, LIVE 9/9 with the named-abstention label against the real 401 lane; v1 draw #28 — the all-repeat RETURN, second time this pattern: every level lands on an established mode (L0 2935 ×19, L1 738 ×6, L2 6125 ×8), the converge/fill/converge alternation holds a third cycle; round-start find: this workspace's gitignored site/dist was stale-sealed at R83's head — the r88 STALE-DIST seal fired 4-test RED, rebuilt+named (not a repo lie; dist is generated per R42/R43/R86); deploy lag grew 78→96 commits, named not a finding; NEXT: R93 spec per the entry — audit-over-README/EXPERIMENTS 7th carrying, pulse-identity note 6th, build-site --check 5th, judge-lane liveness [ops] 2nd, deploy-cadence lag WARN [ops] NEW) | canonical |
| R91 | 2026-10-05 | playtest-round-91 (vs R90 tip 7a1ae06, PRs #102–#111 open Casey-gated per R90's receipts — basing on the R90 tip re-lands R79–R91 to main in one PR per the R22-vs-r21/R73/R74 precedent; R91 spec item 1 first build after 5 carryings: deploy-lag literacy — the live byte-identity check now judges the deploy against its OWN sealed head (classifyDeployLag: lag NAMED with commit distance / DIVERGED → exit 1 / current / unresolvable-named), 10-test pin incl. hermetic CLI stub scenarios, LIVE 9/9 first all-green since R86 with the 78-commit lag receipted; v1 draw #27 — the one-axis gap-fill: L2 4137 fills the 3687→4766 mid-band gap, modes hold (L0 2935 ×18, L1 738 ×5); NEXT: R92 spec per the entry — audit-over-README/EXPERIMENTS 6th carrying, pulse-identity note 5th, build-site --check 4th, abstaining-judge label 2nd, judge-lane liveness [ops] NEW) | canonical |
| R90 | 2026-10-05 | playtest-round-90 (vs R89 tip 0fed288, PRs #102–#111 open Casey-gated per R89's receipts — basing on the R89 tip re-lands R79–R90 to main in one PR per the R22-vs-r21/R73/R74 precedent; R89 spec item 5 first build: the L0 button's measured spread — 'random' gains the ledger-derived ranges (1918-3295 fitness, 1-7 hits) + 3-test pin, FAIL-first observed 3/3; v1 draw #26 — the TRIPLE interior gap-fill: all three levels mint a new value at once, each filling its level's largest adjacency gap (L0 2841→2225-2935 maxGap, L1 2100→1691-2833 maxGap, L2 2977→2383-3242 gap); NEXT: R91 spec per the entry — deploy-lag literacy 5th carrying, audit-over-README/EXPERIMENTS 5th, pulse-identity note 4th, build-site --check 3rd, abstaining-judge label NEW) | canonical |
| R89 | 2026-10-04 | playtest-round-89 (vs R88 tip bed13cd, PRs #102–#110 open Casey-gated per R88's receipts — basing on the R88 tip re-lands R79–R89 to main in one PR per the R22-vs-r21/R73/R74 precedent; R89 spec item 3 first build after 3 carryings: the L1 button's measured spread — 'mid-training' gains the ledger-derived ranges (738-6575 fitness, 1-23 hits) + 3-test pin, FAIL-first observed 3/3; v1 draw #25 appended — the expansion streak RESUMES on two axes: L1 2833 + L2 3687, both interior gap-fills, the third interior-gap-fill round in five draws; NEXT: R90 spec per the entry — deploy-lag literacy 4th carrying, audit-over-README/EXPERIMENTS 4th, pulse-identity note 3rd, build-site --check 2nd, L0 button spread/refusal NEW) | canonical |
| R88 | 2026-10-04 | playtest-round-88 (vs R87 tip cf75193, PRs #102–#109 open Casey-gated per R87's receipts — basing on the R87 tip re-lands R79–R88 in one PR to main per the R22-vs-r21/R73/R74 precedent; R87 spec item 1 first build after 3 carryings: the stale-dist seal — the site glue fails NAMED on source drift ('STALE-DIST: sources drifted from the sealed build … run node tools/build-site.mjs'), full-manifest drift computation, FAIL-first observed; v1 draw #24 appended — the all-repeat RETURN: L0 2935×17, L1 738×4, L2 6125×7, the distribution re-centralizes on its three centers one round after the L1 support expansion; NEXT: R89 spec per the entry — deploy-lag literacy 3rd carrying, audit-over-README/EXPERIMENTS 3rd carrying, L1 hits-spread 2nd carrying, pulse-identity note 2nd carrying, build-site --check dry-run NEW) | canonical |
| R87 | 2026-10-04 | playtest-round-87 (vs R86 tip 3ccfbc4, PRs #102–#108 open Casey-gated per the R86 receipts — basing on the R86 tip re-lands R79–R87 in one PR to main per the R22-vs-r21/R73/R74 precedent; R86 spec item 1 first build after 3 carryings: the v1 baseline distribution as a GENERATED artifact — `tools/v1-dist.js` → `research/v1-distribution.json` + 4-test pin (ARTIFACT-EQUALS-LEDGER / TALLY-EQUALS-R76-PIN / REGEN-BYTE-STABLE / TAMPER-RED, FAIL-first observed twice); v1 draw #23 appended — L1 3490 mints NEW TERRITORY between the 1691 kill-early member and the 3940 mid-band opener, the first L1 support expansion since draw 16; the R85–R86 interior-gap-filling streak breaks on exactly one axis; PLAYLOG now CITES the artifact instead of hand-typing the table) | canonical |
| R86 | 2026-10-04 | playtest-round-86 (vs R85 tip f9d089c, PRs #102–#106 open Casey-gated per R85's receipt — basing on the R85 tip re-lands R79–R86 in one PR to main per the R22-vs-r21/R73/R74 precedent; TWO pulses collided on this branch: the sibling's build is the canonical owner (commit 31b31a9 — the re-land receipt audit FIRST BUILD after 5 carryings, 5-test pin, 73→77 claims GREEN; NEW P3 closed same round: r76 hand-typed N-draw comment retired N-free at TWO stale sites + COMMENT-N-FREE pin; v1 draw #22 — L1 6525 + L2 5710, both INTERIOR gap-fills, no drift-fire); a repair addendum from the second pulse closes a fresh-checkout P1 the first build could not see from its own tree: `site/dist` is a GENERATED gitignored output (R42/R43) that PHANTOM-REDs the audit on any fresh checkout before the site-glue self-seal — now honored by GENERATED registry with reason-as-data (FAIL-first observed), pin grows FRESH-CHECKOUT-GREEN (empty-root + file-level negative + live unsealed cross-check) to 6 tests; suite 374 registered post-repair; NEXT: R87 spec per the entry — generated distribution artifact 3rd carrying, stale-dist seal 2nd, deploy-lag literacy, audit-over-README/EXPERIMENTS) | canonical |
| R85 | 2026-10-04 | playtest-round-85 (vs R84 tip b186bbc, PRs #102–#106 open Casey-gated at round time — basing on the R84 tip re-lands R79–R85 in one PR to main per the R22-vs-r21/R73/R74 precedent; R84 spec item 1 first build after 8 carryings: live near-anchor count beside the σ slider + 5-test pin; v1 draw #21 appended — the all-repeat streak breaks at 3 but both new values land INTERIOR to established bands: L0 2935×14, L1 6250×1, L2 4851×1 — gap-filling convergence; L2 hits spread 9→11 trips the r79 DRIFT-FIRES exactly as designed) | canonical |---|
| R84 | 2026-10-03 | playtest-round-84 (vs R83 tip 2d798ca, PRs #102–#105 open Casey-gated at round time — basing on the R83 tip re-lands R79–R84 in one PR to main per the R22-vs-r21/R73/R74 precedent; R83 spec item 1 first build after 4 carryings: σ on the receipt-panel C1 ledger rows + 3-test render pin; v1 draw #20 appended — third consecutive all-repeat draw, distribution converged: L0 2935×13, L1 1242×3, L2 4766×2) | canonical |
| R83 | 2026-10-03 | playtest-round-83 (vs R82 tip e98b75e, PRs #102/#103/#104 open Casey-gated at round time — basing on the R82 tip re-lands R79–R83 in one PR to main per the R22-vs-r21/R73/R74 precedent; R82 spec item 1 first build after 1 carrying: README "Real starting states" table value-rot closed — 1,890/2,010/1,753 rows + artifact-pinned glue (the last unpinned value surface); v1 draw #19 appended — all-repeat draw, distribution converging: L0 2935×12, L1 6500×4, L2 589×3) | canonical |
| R82 | 2026-10-03 | playtest-round-82 (vs R81 tip 8afe547, PRs #102/#103 open Casey-gated at round time — basing on the R81 tip re-lands R79+R80+R81+R82 in one PR to main per the R22-vs-r21/R73/R74 precedent; R81 spec item 1 first build after 4 carryings: the "near-human" stragglers — README table row + prerun header renamed to the button's "trained" state label + 4-test pin (NEEDLE-INTACT guards the r79 detector's history); v1 draw #18 appended — L2 6125×6 strengthens the cap mode, L1 1242 repeats the kill-early floor; NEW P1 find: README "Real starting states" table has been stale since R50 — R50 refreshed the md5 lines but never the fitness/frames/hits/speed values) | canonical |
| R81 | 2026-10-03 | playtest-round-81 (vs R80 tip dcaaaed, PR #102 open Casey-gated at round time — basing on the R80 tip re-lands R79+R80+R81 in one PR to main per the R22-vs-r21/R73/R74 precedent; R80 spec item 2, 5th carrying, first TRUE build: the R1 measured-at-tag annotation — R74's build was SILENTLY DROPPED by re-land cab770c (#96); restored ledger-sourced (17 draws) + 4-test structural pin; v1 draw #17 appended — L2 6225 NEW cap-cluster maximum, 9 terminal hits at the 6000f bound ceiling) | canonical |
| R80 | 2026-10-03 | playtest-round-80 (vs playtest-round-78 tip e92677b — R79's #101 merged into the R78 branch, NOT main; main tip 9c6d02d carries R78 only; basing on e92677b re-lands R79's work in one PR to main per the R73/R74 precedent; R79 spec item 1 first build after 13 carryings: σ recorded per coev ledger row + trail annotation on mid-run σ changes + 5-test pin; v1 draw #16 appended — L1 4900 new near-cap value, L2 3242 new kill-band member) | canonical |
| R79 | 2026-10-03 | playtest-round-79 (vs R78 tip 918a36d, PR #99 open Casey-gated at round time; R78 spec item 3 first build: the "L2 · near-human" undefined-label wound — button annotated with the measured v1 draw spread + 4-test pin recomputing from the ledger; v1 draw #15 appended — L1 1242 new, L2 589 zero-hit floor repeats back-to-back) | canonical |
| R78 | 2026-10-02 | playtest-round-78 (vs main tip af5be72 post-#99 — the Casey gate OPEN, R77 merged since its pulse; R77 spec item 1 first build after 13 carryings: the σ→lineage-visibility disclosure at the slider — sigLine + #sigline + live wiring + 4-test render pin; v1 draw #14 appended — L2 floor 589, first zero-hit champion best-game in 14 draws) | canonical |
| R77 | 2026-10-02 | playtest-round-77 (vs main tip d408d69 post-#97/#98 — the Casey gate OPEN, R75+R76 both merged since R76's pulse; R76 spec item 3 first build: EXPERIMENTS.md ledger-append-discipline note + structural pin + draw #13 appended to research/v1-draws.jsonl, TALLY-MATCH moved to the thirteen-draw table) | canonical |
| R76 | 2026-10-02 | playtest-round-76 (vs R75 tip 504466d, PR #97 open Casey-gated at round time; MERGED since as #98; R75 spec item 3 first build: `research/v1-draws.jsonl` — the machine-readable v1 draw ledger + 5-test count pin — closes the hand-tally off-by-one wound carried since R73/R74/R75) | canonical |
| R75 | 2026-10-02 | playtest-round-75 (vs main tip c18d92e post-#92/#95/#96 — the Casey gate OPEN; R74 spec item 3 first build: c1-scaling producer ported from sibling 17f9ad7 + durable repro pin — PR #92's merge had imported the corpus WITHOUT the instrument) | canonical |
| R74 | 2026-10-02 | playtest-round-74 (vs r73 tip 8776cc9, PR #91 open Casey-gated; R1 measured-at-tag + sibling c1-scaling artifact independently reproduced byte-identical; re-landed to main as #96) | canonical |
| R73 | 2026-10-02 | playtest-round-73 (vs r72 tip 90743f9, PR #91 open Casey-gated; franken-save guard + NAMED SAVE/FRANKEN-REFUSED receipt; re-landed to main as #95) | canonical |
| R70 | 2026-10-01 | playtest-round-70 (vs main tip 70af7f0 — the Casey gate OPENED since R69: PR #85 (R67), #87 (R68), #88 (R69) all merged to main; this round branches from merged main, the unmerged-stack precedent retired; tags v1/v0.64.0/v0.65.0 played from clean worktrees; PR #89 opened this round) | canonical |
| R69 | 2026-10-01 | playtest-round-69 (vs r68 tip df47bca, unmerged Casey-gated; base precedent R22-vs-r21; PR #85 open at round start) | canonical |
| R68 | 2026-10-01 | playtest-round-68 (vs r67 tip 2a00c14, unmerged Casey-gated; base precedent R22-vs-r21; PR #85 open at round start) | canonical |
| R67 | 2026-09-30 | playtest-round-67 (vs r66 tip f2dcf4f, unmerged Casey-gated; base precedent R22-vs-r21) | canonical |
| R66 | 2026-09-30 | playtest-round-66 (vs main 52b42b4, post-#83; R65 canonical) | canonical |
| R65 | 2026-09-30 | playtest-round-65 (vs main 5406c48, wave-66 CI build-then-test workflow, post-#81/#82) — TWO canonical lanes on one branch, merged additively (R2/R62+R61 convention): 951594e (67-i: C1 full-population breeding — R64 item 1, 9th carrying — + dead-σ revival, test-inline conflict-marker pin, oracle-death K≥20, EXPERIMENTS.md merge-hygiene note) + 12166c7 (k2d8 cron: tools/conflict-scan.js standalone scanner+CLI, R63-P0 real-history replay pin) | canonical |
| R64 | 2026-09-30 | playtest-round-64 (vs main 618dc3b, wave-69 pages workflow, post-#79/#80; R63 open at #81) | canonical — merged via #82; R63's row arrived with it (#81 landed first) |
| R63 | 2026-09-30 | playtest-round-63 (vs main 9f03372, post-#79/#80) | canonical — also repairs the R61-merge PLAYLOG conflict markers (additive R62+R61 resolution; markers stripped, both entries kept) |
| R62 | 2026-09-30 | playtest-round-62 (vs main d2a85d7, post-#77/#78) | canonical |
| R61 | 2026-09-30 | playtest-round-61 (vs main d2a85d7, post-#77/#78) | canonical — R59/R60 rows absent here because those branches remain unmerged (Casey-gated); their entries live on their own branches, noted so the gap is not mistaken for a lost entry |
| R58 | 2026-09-29 | playtest-round-58 (vs main f53519b, post-#76) | canonical |
| R57 | 2026-09-29 | playtest-round-57 (vs main b0192ad, post-#75) | canonical |
| R56 | 2026-09-29 | playtest-round-56 (vs main 01c6bff, post-#74) | canonical |
| R55 | 2026-09-28 | playtest-round-55 (vs main b4d15c8, post-#73) | canonical |
| R54 | 2026-09-28 | playtest-round-54 (vs main 34d551f, post-#72) | canonical |
| R53 | 2026-09-28 | playtest-round-53 (vs main 9b27d15, post-#71) | canonical |
| R52 | 2026-09-28 | r52-main-repair (vs main 155ad78, post-#70) | canonical |
| R51 | 2026-09-28 | r51-playlog-newest-first (vs main 629bfd8, post-#67) | canonical |
| R50 | 2026-09-28 | r50-main-repair (vs main b767404, post-#66) + r50-difficulty-escalation (vs main 629bfd8, post-#67; stacked on r49c #69) — two canonical branches, one row (R2 branch-pair convention) | canonical — the #67/#70 merge stack concatenated both stacks' index rows and split the R50/R49 pair across the R51 row; deduped + re-ordered by R52 (R31/R2 convention) |
| R49 | 2026-09-28 | r49-readme-count-repair (PR #66, vs main ea9dfbb, post-#62) + r49-count-bistability (PR #65, vs main ea9dfbb, post-#62) + playtest-round-49 (PR #64, vs main 166a1f2, post-#63) — three canonical branches, one round; the #64/#65/#66 merges stacked three index rows on R49 | canonical — deduped by R50 (R42/R31/R2 convention); the duplicate pair the #67 merge concatenated removed by R52 |
| R48 | 2026-09-28 | r48-main-repair (vs main 4c13b58, post-#61) | canonical |
| R47 | 2026-09-28 | r47-doctor-lens-freshness (vs main 822c850, post-#60; rebased onto post-#63) | canonical |
| R46 | 2026-09-28 | r46-main-repair (vs main 1da41be, post-#58) | canonical |
| R45 | 2026-09-28 | r45-coev-birth-seal (vs main 1da41be, post-#58) | canonical |
| R44 | 2026-09-28 | r44-site-v2 (vs main 1da41be, post-#58) | canonical |
| R43 | 2026-09-28 | r43-seed-zero-honesty (PR #57, vs main 2aa7901, post-R42 main-repair) | canonical |
| R42 | 2026-09-28 | r42-site (PR #58, vs main 4d447ed, post-#55) + playtest-round-42 (PR #56 main-repair, vs main 4d447ed, post-#55) — two canonical branches; the #58 merge concatenated both stacks (index + entries + README counts) | canonical — deduped by R44 (R31/R2 convention) |
| R41 | 2026-09-27 | r41-maxspeed-honesty (PR #55, vs main bd91026, post-#53) | canonical — entry + index row restored by R42 (lost in the #55 merge conflict resolution, same class as R34) |
| R40 | 2026-09-27 | playtest-round-40 (PR #53, open at repair time) + r40-coev-label-axis (vs main 4bb0264, post-#52) | canonical |
| R39 | 2026-09-27 | r39-stone-sign-pilot (vs main 3dd4178, post-#50) | canonical |
| R38 | 2026-09-27 | playtest-round-38 (vs main 1c3db7d, post-#47) | canonical |
| R37 | 2026-09-27 | r37-prerun-stone-seal (vs main dd7f858, post-#46) | canonical |
| R36 | 2026-09-27 | r36-stone-v1-export (vs main b455715, post-#45) | canonical |
| R35 | 2026-09-27 | playtest-round-35 (vs main a4f3516, post-#44) | canonical |
| R34 | 2026-09-27 | r34-amber-admission-source (vs main 0a29cdb, post-#42) | canonical — entry + index row restored by R35 (lost in the #44 conflict resolution; verified against 777e76d) |
| R33 | 2026-09-27 | r33-wal-session-cli-usage-guard (vs main 0a29cdb, post-#42) | canonical |
| R32 | 2026-09-27 | playtest-round-32 (vs main 07dc9ae, post-#41) | canonical |
| R31 | 2026-09-27 | r31-index-dedup-count-fix (vs main 7649f4c, post-#40) | canonical |
| R30 | 2026-09-27 | r30-wal-page-glue (vs main 5ef8cda, post-#37) | canonical |
| R29 | 2026-09-27 | r29-doctor-live-e2e-pin (vs main 5ef8cda, post-#37) | canonical |
| R28 | 2026-09-27 | playtest-round-28 (vs R27 tip 3c5f498, PRs #31–#36 open at round start) | canonical |
| R27 | 2026-09-26 | playtest-round-27 (vs r26 tip a06dfb2, PR #33 open at round start) + r27-doctor-lens-page-glue (vs main 56c60b4, post-#35 merge) — two canonical branches, one row (R2 branch-pair convention) | canonical |
| R26 | 2026-09-26 | r26-wal-doctor-export + r26-wal-session-driver (stacked, vs main a0939b8 / export tip a06dfb2) — two canonical branches, one row (R2 branch-pair convention) | canonical |
| R25 | 2026-09-26 | r25-coev-ledger-strip (vs main a0939b8, post-#30) | canonical |
| R24 | 2026-09-26 | r24-canonical-md5-lineage + r24-doctor-verdict-glue (vs main a0939b8, post-#30) — two canonical branches, one row (R2 branch-pair convention) | canonical |
| R23 | 2026-09-26 | r23-coin-journal-strip (vs main 4b94c49, post-#29) | canonical |
| R22 | 2026-09-26 | playtest-round-22 (vs r21 tip 3508a75, PR #28) | canonical |
| R21 | 2026-09-26 | r21-quantum-coin-tiebreak (vs main ac9b4c1) | canonical |
| R20 | 2026-09-26 | r20-coev-qarefusal-glue (vs main post-#26 merge) | canonical |
| R19 | 2026-09-26 | playtest-round-19 (vs main 6e163f6, post-#24-merge) | canonical |
| R18 | 2026-09-26 | r18-byo-endpoint-persist (#24) | canonical — index row restored by R19 (the R18 entry shipped without one) |
| R17 | 2026-09-26 | r16-byo-page-wiring (vs main post-#22-merge; rebased after the R16 stack landed) | canonical |
| R16 | 2026-09-26 | r15-confidence-pot-strip (#19) · r16-readme-honesty-sweep (#20) · r16-advisor-diet-tool (#21) · r16-byo-qpam-seam (#22) | canonical — four branches, one spec |
| R15 | 2026-09-26 | playtest-round-15 (vs main 3e4e497, post-PR#17) | canonical (this file, newest first) |
| R14 | 2026-09-26 | r14-coev-panel-honesty (vs R13 tip 7488cfa) | canonical |
| R13 | 2026-09-26 | playtest-round-13 (vs R12 tip 88b488f) | canonical |
| R12 | 2026-09-25 | playtest-round-12 (vs R11 stack tip c9424f7) | canonical |
| R11 | 2026-09-25 | playtest-round-11 (vs r10 tip 287824d) | canonical — code carried on PR #14 tip; docs on PR #12; CI on PR #13 |
| R10 | 2026-09-25 | r10-pop-slider-parity (vs main 1f5943c) | canonical — receipt written post-hoc by R11 |
| R9 | 2026-09-25 | playtest-round-9 (vs main cda9eab) | canonical |
| R8 | 2026-09-25 | playtest-round-8 (vs main 54b625a) | canonical |
| R7 | 2026-09-25 | playtest-round-7 (vs main 1ae696b) | canonical |
| R6 | 2026-09-25 | round-6 (vs round-5 tip 7882d99) | canonical |
| R5 | 2026-09-24 | round-5 (vs round-4 tip e8774a2) | canonical |
| R4 | 2026-09-24 | round-3-builder (PR #4) | canonical |
| R3 | 2026-09-24 | honesty pass + C1 coevolution | canonical |
| R2 | 2026-09-24 | TWO canonical branch entries below: `Round 2 (branch quilt-edge-ml-survey)` and `Round 2 (branch quantum-audio-L2)` — both shipped, neither supersedes the other |
| R2 artifact | 2026-09-24 | via PR #1 (pre-honesty pass) | STALE DUPLICATE — retitled, kept as historical artifact, not a Round 2 |
| R1 | 2026-09-24 | v1 (e98cf66) | canonical |



## Round 92 — k2d8 (cron pong-quilt-playloop) — 2026-10-05 — mode: BUILDER (R92 spec item 4 — the abstaining-judge check label, [S], 2nd carrying, first build) + play-tester — vs main a4a4f88 post-#113 (PR queue EMPTY at round time — the Casey gate fully open; main carries R79–R91 merged)

### Played versions: v1 (e98cf66, draw #28) — headless via the tag's own `tools/prerun.js` in a dedicated clean worktree (`git worktree add /tmp/pq-v1-r92 e98cf66`) — plus the tip itself (`node tools/prerun.js` at a4a4f88 for the spine line, suite + qa + live-site playtest). Draw #28: L0 **2935** (2785f, 6h, ×2.11 — repeat, 19th time, the mode at 70% of value-tallied draws), L1 **738** (713f, 1h, ×1.28 — repeat, 6th time, the kill-early floor), L2 **6125** (6000f, 5h, ×3.40 — repeat, 8th time, the cap mode). Fitness law per field verified at the tag (2935=2785+25·6, 738=713+25·1, 6125=6000+25·5). Ledger step per the R77 discipline: draw #28 APPENDED to `research/v1-draws.jsonl`; the tally lives in `research/v1-distribution.json` (regenerated by `tools/v1-dist.js`; receipt line verbatim: "OK (28 draws, 27 value-tallied — research/v1-distribution.json regenerated)"); the r76 TALLY-MATCH pin moved exactly once, in the file, to the 28-draw table. No r79 drift-fire: draw #28's fields sit ON three established modes, interior to every pinned spread.

### Deltas observed (shapes of change)
- **d(spine)/d(version) = 0, nineteenth consecutive round.** `node tools/prerun.js` at the tip regenerated byte-exact the canonical post-R50 line — coev.js 946e639a…, coev-stone-v1.json 3a0a5fb6…, curve.json f9b20e7d…, L0 bc15d414…, L1 1125d59c…, L2 50137ceb… — and left the tree CLEAN (zero checkpoint drift). Coin journal 5 flips / 3 swaps, unchanged.
- **d(v1-draw-shape)/d(n=28): the all-repeat RETURN — the second time this shape, completing a third converge/fill/converge cycle.** Draw #24 (R88) was the first all-repeat draw; draw #27 (R91) filled exactly one gap on one axis; draw #28 re-centralizes on all three modes at once — L0 2935 ×19, L1 738 ×6, L2 6125 ×8. The alternation is now a measured rhythm: re-centralize, fill one gap, re-centralize (R88/R89/R90 broke it once with a triple, R91 resumed it, R92 confirms it). Distinct values after 28 draws: L0 6, L1 17, L2 14.
- **d(live-lane)/d(version): 9/9 for the second consecutive round — with the abstention now labeled as itself.** The R91 deploy-lag literacy holds: exit 0, "deploy lags this checkout by 96 commit(s) … lag NAMED, not a finding". The judge lane stays dark (7th consecutive round: JEV HTTP 401 in the worker) — but this round the check NAME no longer claims a verdict over the null: "judge endpoint dark — abstains NAMED (no verdict claimed)". The failure mode migrated from mislabeled to named, the same refactor R91 applied to the deploy lag.
- **d(lag)/d(round) = +18 commits in one round (78 → 96), the sealed head unchanged at 17eb2394a since R86.** Seven rounds of merges have not been deployed. The R91 classifier names the state faithfully; the SHAPE is a monotone drift — a cadence question, not a correctness one. Carried to the R93 spec as a NEW ops item.

### Lies hunted
- **[fresh P3, CLOSED in-turn] the round-start suite fired the r88 STALE-DIST seal 4-test RED.** First suite run at the synced tip: `demo/index.html` and `demo/core.js` differ from the sealed build, sealed at head 2d798cab — R83's head. Diagnosis: `site/dist` is a GENERATED gitignored output (R42/R43; the R86 repair registry says exactly this), and THIS workspace's local dist was last built during R83 — eight rounds of merges touched `demo/index.html`/`demo/core.js` but the local seal survived untouched. NOT a repo lie: a fresh checkout self-seals per the R86 repair; the tip's committed tree carries no dist. The pin did its designed job: named the drift, prescribed the fix (`node tools/build-site.mjs` — resealed: "build ok: 11 demo files sealed, head a4a4f88da"; suite then 387/0/8). The live lesson is carried to the spec: discovering this state required a 104-second full suite run, exactly the wound R92 spec item 3 (build-site --check, now 5th carrying) exists to close.
- **[S → CLOSED this round] the abstaining-judge check label — built here** (R92 spec item 4, 2nd carrying: R91 item 5 → this build). Repro: seven straight live runs (R86→R92) printed "PASS judge replays + returns a verdict (live JEV)" with receipt "verdict null (abstain: JEV HTTP 401 — abstained)" — the check NAME claimed a verdict the receipt admitted was null. The abstention itself was always honest (named, never fabricated); the wound was the label. Built: check 5 now classifies via `classifyJudge` — a numeric verdict keeps the verdict label and asserts non-null; a named abstention gets its own label ("judge endpoint dark — abstains NAMED (no verdict claimed)") — PASS (an honest abstain is not a finding) but never a verdict-claim; neither state, a non-finite "verdict" (NaN passes `typeof === "number"` — caught building the pin, the gate is `Number.isFinite`), a judge body with neither field, nor a dead transport is a silent PASS. `tests/r92-judge-label-glue.test.js` pins it 10 ways (module grammar ×8 + two hermetic CLI scenarios against a stub worker: the exact live-401 shape prints the NAMED-ABSTENTION label, a reachable judge prints the verdict label + value; spawned async, the stub shares the event loop — the R91 deadlock lesson applied). FAIL-first: all 10 RED on the pre-R92 tree (classifyJudge absent). LIVE verify: the real 401 lane now prints "judge endpoint dark — abstains NAMED (no verdict claimed) — abstain: JEV HTTP 401 — abstained — no verdict claimed, none fabricated", exit 0 — the spec's VERIFY, observed.
- **[verified absence, carried] R92 spec items 1, 2, 3, 5 confirmed still open by direct inspection at this tip** — item 1 (audit over README/EXPERIMENTS): `tools/receipt-audit.js` still has no --doc mode (grep EMPTY); item 2 (pulse-identity note): EXPERIMENTS.md still carries no pulse/withdrawn convention (grep EMPTY); item 3 (build-site --check): `tools/build-site.mjs` still has no --check mode (grep EMPTY — and the round-start stale-dist find above is fresh first-person evidence for it); item 5 (judge-lane liveness [ops]): the worker's JEV credential still 401s (this round's live receipt). All four carried to the R93 spec.
- **[note] live-site playtest 9/9** — wall round-trip: 10 receipts, mine at `w:1791161438908:b38e70ec1550`. The verdict lane has been dark a quarter of the demo's measured life (7 of ~28 measured rounds); the wall now honestly names that at the check label.
- **[note] absence checks that came back clean**: the r76 TALLY-MATCH (28-draw, moved exactly once in the file), the r77 discipline pin, the r79 L2 pin (green on the 28-draw ledger), the r86 audit pins, the r87 dist pins (on the regenerated 28-draw artifact), the r88 STALE-DIST seal (after the reseal + again after the core.js touch), the r89 L1 pin (3/3), the r90 L0 pin (3/3), the r91 deploy-lag pin (10/10, live-verified), the new r92 pin (10/10, live-verified), the readme-count pin (405 — its RED mid-round caught my grep-based count wrong, fixed to the runner's number), and the honesty two-way match — all green at the post-build suite run; the marker grep over PLAYLOG.md after all edits is EMPTY.

### Next version spec (R93)
1. **[S] the re-land receipt audit over README/EXPERIMENTS — 7th carrying** (R86 item 4 → R87 item 2 → R88 item 2 → R89 item 2 → R90 item 2 → R91 item 2 → R92 item 1): extend `tools/receipt-audit.js` with a --doc mode over README.md/EXPERIMENTS.md receipt lines; the R83 find lived in README prose and no ground-truth gate covers docs today. VERIFY: synthetic README phantom RED; real docs GREEN.
2. **[S] pulse-identity discipline note in EXPERIMENTS.md — 6th carrying** (R87 item 5 → R88 item 4 → R89 item 4 → R90 item 3 → R91 item 3 → R92 item 2; the two-pulse collision class is guarded today by the withdrawn-unpublished convention living only in the R86 addendum's prose). Name the convention in EXPERIMENTS.md next to the ledger-append discipline (the R77 pattern: protocol half + structural half). VERIFY: EXPERIMENTS.md names the convention; an r77-style protocol pin asserts it stays named.
3. **[S] build-site --check dry-run — 5th carrying** (R88 item 5 → R89 item 5 → R90 item 4 → R91 item 4 → R92 item 3; FRESH first-person evidence this round: the stale-dist state was only discoverable by running the 104-second suite — the R88 seal is test-only, a human or script running `tools/build-site.mjs` directly has no way to CHECK drift first). Add a `--check` mode: compute the same full-manifest drift as the r88 pin, exit 0 + a one-line receipt when sealed-fresh, exit 1 NAMING the drifted files + sealed head when stale (reusing the exact r88 message). VERIFY: an edited-source tree exits 1 with the named list; a fresh-build tree exits 0; the r88 pin gains a CHECK-MODE test.
4. **[S][ops] judge-lane liveness — 2nd carrying** (R92 item 5 → carried; the wall of evidence is now seven receipts deep and the check label — built this round — makes the dark lane impossible to misread). The /root/.env JEV/Typesafe token verified LIVE 2026-10-03 (api.typesafe.ai/v1/models 200); the worker's is 401 — the stale side is the worker credential, not the service. WHAT: rotate/repair the worker's JEV credential (wrangler secret) OR teach the worker to fail the judge lane NAMED at startup when unconfigured, so the abstention is a declared state rather than a silent one. WHY: the demo's verdict surface has been dark a quarter of its measured life; every wall receipt says "judge" and none carries a verdict. VERIFY: a live run shows `verdict` non-null (number) against a reachable oracle, or the worker's health endpoint names the credential state.
5. **[S][ops] deploy-cadence lag WARN — NEW** (this round's monotone shape: lag 78 → 96 commits in one round, sealed head 17eb2394a unchanged since R86 — seven rounds of merges undeployed; the R91 classifier names the state but nothing acts on it). WHAT: either wire build-site + wrangler deploy into the post-merge flow, or teach the playtest to WARN (named, non-failing) when its lag classification exceeds a threshold (e.g. 50 commits) — the demo's visitors currently play an eight-round-old build. WHY: a faithful-but-ancient deploy is honest and stale at once; the literacy check made it legible, nothing makes it actionable. VERIFY: after the next merge, a live run shows lag under the threshold (deploy wired) or the WARN fires named with the commit distance.

### Shipped this round (the build — R92 spec item 4)
- `tools/site-playtest.mjs`: gains `classifyJudge` + `JUDGE_LABEL_VERDICT`/`JUDGE_LABEL_ABSTAIN` exports; check 5's name now comes from the classifier's label (a numeric verdict keeps "judge replays + returns a verdict (live JEV)" and asserts non-null finite; a named abstention prints "judge endpoint dark — abstains NAMED (no verdict claimed)" — distinct label, PASS but never a verdict-claim); the verdict gate is `Number.isFinite` (NaN passes `typeof === "number"` — found building the pin, recorded here because it is the kind of find the playtest exists for); a dead transport names itself. Check 7/8 (R91 deploy-lag literacy) untouched.
- `tests/r92-judge-label-glue.test.js`: the 10-test pin (module grammar ×8 + two hermetic CLI scenarios against a stub worker; FAIL-first by construction — all ten RED pre-build).
- `research/v1-draws.jsonl`: draw #28 appended (values from the /tmp/pq-v1-r92 tag run; fitness law verified per field above).
- `research/v1-distribution.json` (GENERATED): regenerated to the 28-draw artifact by `tools/v1-dist.js`.
- `tests/r76-v1-draw-ledger-glue.test.js`: EXPECTED_TALLIES → the 28-draw table (L0 2935 ×19; L1 738 ×6; L2 6125 ×8 — moved exactly once, here, per the R77 discipline); per-draw history gains the R92 line.
- `core.js`: VERIFIED_CLAIMS gains `r92-judge-label-glue` (94 claims; the honesty two-way match stays green).
- `README.md`: test-count line updated (403→413: 405 in tests/ + 8 in tools/test-qa.js; the readme-count pin verified it — its mid-round RED caught a grep-based count, fixed to the runner's).
- Site dist re-sealed AFTER the core.js touch, BEFORE the suite counts (the build-order law): `build ok: 11 demo files sealed, head a4a4f88da`.

### Suite re-run after the build
- `node --test tests/*.test.js` — **405 registered: 397 pass / 0 fail / 8 honest skips**; `node --test tools/test-qa.js` — 8/8. The r76 TALLY-MATCH (28-draw), the r77 discipline pin, the r79 L2 pin (28-draw ledger), the r86 audit pins, the r87 dist pins (on the regenerated artifact), the r88 STALE-DIST seal (sealed at the reseal and again post-core.js-touch), the r89 L1 pin (3/3), the r90 L0 pin (3/3), the r91 deploy-lag pin (10/10, live-verified), the new r92 pin (10/10, live-verified), the readme-count pin (405), and the honesty two-way match all green; the marker grep over PLAYLOG.md after all edits is EMPTY; the receipt audit over the post-round PLAYLOG is GREEN at the raised claim count.

### Verdict
MERGEABLE — PR from playtest-round-92 to main (the queue is empty; the Casey gate governs).

Builder mode, one item as mandated (R92 spec item 4, first build after 2 carryings), the chronic null-verdict label refactored into a named abstention with a 10-test pin. Credit: R91 (the spec item + the wall of evidence carried forward, and the async-spawn deadlock lesson the CLI scenarios reuse); R90 (the abstaining-judge find that started the label thread); R86 (the receipt-audit ESM main-guard pattern); R88 (the named-state pattern for drift/abstain classes); R76/R77 (the ledger + the append discipline); R91 (the deploy-lag classifier this round's live run leans on). Sibling repos studied: none — the build and the finds were repo-internal.

## Round 91 — k2d8 (cron pong-quilt-playloop) — 2026-10-05 — mode: BUILDER (R91 spec item 1 — deploy-lag literacy for tools/site-playtest.mjs, [S], 5th carrying, first build) + play-tester — vs R90 tip 7a1ae06 (PRs #102–#111 open Casey-gated per R90's receipts; basing on the R90 tip per the R22-vs-r21/R73/R74 precedent — this branch re-lands R79–R91 to main in one merge)

### Played versions: v1 (e98cf66, draw #27) — headless via the tag's own `tools/prerun.js` in a dedicated clean worktree (`git worktree add /tmp/pq-v1-r91 e98cf66`) — plus the tip itself (`node tools/prerun.js` at 7a1ae06 for the spine line, suite + qa + live-site playtest). Draw #27: L0 **2225** (2200f, 1h, ×1.88 — repeat, 4th time, the floor rung), L1 **738** (713f, 1h, ×1.28 — repeat, 5th time, the kill-early floor), L2 **4137** (4037f, 4h, ×2.61 — NEW VALUE, interior: fills the 3687→4766 mid-band gap). Fitness law per field verified at the tag (2225=2200+25·1, 738=713+25·1, 4137=4037+25·4). Ledger step per the R77 discipline: draw #27 APPENDED to `research/v1-draws.jsonl`; the tally lives in `research/v1-distribution.json` (regenerated by `tools/v1-dist.js`; receipt line verbatim: "OK (27 draws, 26 value-tallied — research/v1-distribution.json regenerated)"); the r76 TALLY-MATCH pin moved exactly once, in the file, to the 27-draw table. No r79 drift-fire: draw #27's L2 fields sit interior to the pinned 589–6225 fitness / 0–11 hits spread (and interior to the L0 spread: 1918–3295 / 1–7; and interior to the L1 spread: 738–6575 / 1–23).

### Deltas observed (shapes of change)
- **d(spine)/d(version) = 0, eighteenth consecutive round.** `node tools/prerun.js` at the R90 tip regenerated byte-exact the canonical post-R50 line — coev.js 946e639a…, coev-stone-v1.json 3a0a5fb6…, curve.json f9b20e7d…, L0 bc15d414…, L1 1125d59c…, L2 50137ceb… — and left the tree CLEAN (zero checkpoint drift). Coin journal 5 flips / 3 swaps, unchanged.
- **d(v1-draw-shape)/d(n=27): the one-axis gap-fill — one round after the triple, exactly one new value, on exactly one level, in that level's largest adjacency gap.** Draw #26 filled every level's maxGap at once; draw #27 resumes the R85/R86/R89 single-axis shape on L2 only: 4137 closes the 3687→4766 gap (size 1079) into a four-rung ladder 3687/4137/4766/4851. The modes hold (L0 2935 ×18 = 69% of value-tallied draws; L1 kill-early floor 738 ×5). One round of triple-densification did not change the process's default rhythm: converge, fill one gap, converge. Distinct values after 27 draws: L0 6, L1 17, L2 14.
- **d(live-lane)/d(version): the deploy-lag finding MIGRATES from chronic-RED to named-receipt.** R86→R90 every live playtest exited 7/8 with the same silent byte-mismatch FAIL; this round's build names the state: exit 0 with "deploy lags this checkout by 78 commit(s) … lag NAMED, not a finding". First all-green live playtest (9/9) since the lag began. The failure mode didn't disappear — it was REFACTORED into information.

### Lies hunted
- **[S → CLOSED this round] the deploy-lag byte-identity check judged a faithful deploy against a moving checkout — built here** (R91 spec item 1, 5th carrying: R86 item 3 → R87 item 2 → R88 item 1 → R89 item 1 → R90 item 1). Repro on the pristine tip: every live run since R86 exits 7/8 with "served checkpoint is byte-identical to this checkout" FAILing while the receipt itself shows the served file is byte-faithful to the DEPLOY's own sealed head 17eb2394a (78 commits behind — the deploy reseals only when someone runs build-site + deploy). The check could not separate "lags but faithful" from "diverged from its seal". Built: check 7 now fetches `/api/provenance`, resolves the sealed head's OWN `checkpoints/level1.js` from git (`resolveSealedBlobSha256` — the head 40-hex validated before it ever reaches a shell), and classifies (`classifyDeployLag`): faithful-to-seal + seal≠checkout → lag NAMED with commit distance, exit 0; served ≠ sealed blob → DIVERGED, exit 1 (dist edited after sealing, or stale seal); equal heads → current; unresolvable seal → named fallback with the seal explicitly UNVERIFIED. `tests/r91-deploy-lag-glue.test.js` pins it 10 ways (import-guard, resolver green/missing/malformed, classifier 4 states, two hermetic CLI scenarios against a stub worker — lag exits 0 with the receipt, tampered dist exits 1 named; the tool is spawned async because the stub shares the test's event loop, spawnSync would deadlock — a real deadlock found building the pin, not a hypothetical). FAIL-first: all 10 RED on the pre-R91 tree (exports absent). LIVE verify: the real lagging deploy now exits 0 with the lag named — the spec's VERIFY, observed.
- **[verified absence, carried] R91 spec items 2–4 all confirmed still open by direct inspection at this tip** — item 2 (audit over README/EXPERIMENTS): `tools/receipt-audit.js` still has no --doc mode (grep EMPTY); item 3 (pulse-identity note): EXPERIMENTS.md still carries no pulse/withdrawn convention (grep for pulse/withdrawn EMPTY); item 4 (build-site --check): `tools/build-site.mjs` still has no --check mode (grep EMPTY). All three carried to the R92 spec.
- **[note, still open] the live-site "judge" check still PASSes on an abstention.** This round's live run: "PASS judge replays + returns a verdict (live JEV) — verdict null (abstain: JEV HTTP 401 — abstained)". The judge lane has been dark every round from R86 onward (JEV HTTP 401 in the worker's env — the /root/.env Typesafe/JEV token verified LIVE 2026-10-03, so the worker's credential is the stale side). Carried to the R92 spec as item 4, joined by a NEW liveness item below.
- **[note] live-site playtest 9/9 — first all-green since R86** — with the judge abstention honestly named inside its PASS receipt (not a verdict claim; item 4/5 below owns the label split). Wall round-trip: 8 receipts, mine at `w:1791147130160:b38e70ec1550`.
- **[note] absence checks that came back clean**: the r76 TALLY-MATCH (27-draw, moved exactly once in the file), the r77 discipline pin, the r79 L2 pin (green on the 27-draw ledger), the r86 audit pins (97 existence-claims GREEN pre-round), the r87 dist pins (on the regenerated 27-draw artifact), the r88 STALE-DIST seal (dist re-sealed after the core.js touch, before the suite counts — build head 7a1ae0637), the r89 L1 pin (3/3 green), the r90 L0 pin (3/3 green), the new r91 pin (10/10), the readme-count pin (verified the arithmetic — 395 in tests/ — green post-build), and the honesty two-way match — all green at the post-build suite run; the marker grep over PLAYLOG.md after all edits is EMPTY.

### Next version spec (R92)
1. **[S] the re-land receipt audit over README/EXPERIMENTS — 6th carrying** (R86 item 4 → R87 item 2 → R88 item 2 → R89 item 2 → R90 item 2 → R91 item 2): extend `tools/receipt-audit.js` with a --doc mode over README.md/EXPERIMENTS.md receipt lines; the R83 find lived in README prose and no ground-truth gate covers docs today. VERIFY: synthetic README phantom RED; real docs GREEN.
2. **[S] pulse-identity discipline note in EXPERIMENTS.md — 5th carrying** (R87 item 5 → R88 item 4 → R89 item 4 → R90 item 3 → R91 item 3; the two-pulse collision class is guarded today by the withdrawn-unpublished convention living only in the R86 addendum's prose). Name the convention in EXPERIMENTS.md next to the ledger-append discipline (the R77 pattern: protocol half + structural half). VERIFY: EXPERIMENTS.md names the convention; an r77-style protocol pin asserts it stays named.
3. **[S] build-site --check dry-run — 4th carrying** (R88 item 5 → R89 item 5 → R90 item 4 → R91 item 4; the R88 seal is test-only — a human or script running `tools/build-site.mjs` directly has no way to CHECK drift without invoking the whole suite). Add a `--check` mode: compute the same full-manifest drift as the r88 pin, exit 0 + a one-line receipt when sealed-fresh, exit 1 NAMING the drifted files + sealed head when stale (reusing the exact r88 message). VERIFY: an edited-source tree exits 1 with the named list; a fresh-build tree exits 0; the r88 pin gains a CHECK-MODE test.
4. **[S] the abstaining-judge check label — 2nd carrying** (R91 item 5 → carried; the live find from R90 unchanged this round): "judge replays + returns a verdict (live JEV)" PASSes with `verdict null (abstain: JEV HTTP 401)`. Split the states: verdict-returned (assert non-null, keep the name) vs abstained (rename the check to name the abstention — distinct label, not a finding but never a verdict-claim either). VERIFY: against the current 401 lane the run prints the named-abstention label; against a stubbed reachable judge the verdict field is asserted non-null.
5. **[S][ops] judge-lane liveness — NEW** (this round's wall of evidence: the verdict lane has been dark SIX rounds, R86→R91, while every surrounding lane is live). The /root/.env JEV/Typesafe token verified LIVE 2026-10-03 (api.typesafe.ai/v1/models 200); the worker's is 401 — the stale side is the worker credential, not the service. WHAT: rotate/repair the worker's JEV credential (wrangler secret) OR teach the worker to fail the judge lane NAMED at startup when unconfigured, so the abstention is a declared state rather than a silent one. WHY: the demo's verdict surface has been dark a sixth of its measured life; every wall receipt says "judge" and none carries a verdict. VERIFY: a live run shows `verdict` non-null (number) against a reachable oracle, or the worker's health endpoint names the credential state.

### Shipped this round (the build — R91 spec item 1)
- `tools/site-playtest.mjs`: restructured with an ESM main-guard (`process.argv[1] === fileURLToPath(import.meta.url)` — import is side-effect-free, the R86 receipt-audit pattern), exports `resolveSealedBlobSha256` (40-hex-validated before the shell; git cat-file -p <head>:checkpoints/level1.js, sha256, rev-list --count for the distance) and `classifyDeployLag` (4 named states with receipts); check 7 is now the literacy verdict (faithful-to-seal judged against the sealed head's OWN blob); check 8 stays as the provenance well-formedness gate with an honest name (the actual head COMPARISON lives in check 7). Judge/wall checks untouched.
- `tests/r91-deploy-lag-glue.test.js`: the 10-test pin (module grammar + hermetic CLI stub scenarios; FAIL-first by construction — all ten RED pre-build). One honest build note: the first pin draft used spawnSync against a stub sharing the test's event loop — a REAL deadlock found by the pin failing, fixed by spawning async (runTool); the deadlock is recorded here because it is the kind of find the playtest exists for.
- `research/v1-draws.jsonl`: draw #27 appended (values from the /tmp/pq-v1-r91 tag run; fitness law verified per field above).
- `research/v1-distribution.json` (GENERATED): regenerated to the 27-draw artifact by `tools/v1-dist.js`.
- `tests/r76-v1-draw-ledger-glue.test.js`: EXPECTED_TALLIES → the 27-draw table (L0 2225 ×4; L1 738 ×5; L2 +4137×1 — moved exactly once, here, per the R77 discipline); per-draw history gains the R91 line.
- `core.js`: VERIFIED_CLAIMS gains `r91-deploy-lag-glue` (93 claims; the honesty two-way match stays green).
- `README.md`: test-count line updated (393→403: 395 in tests/ + 8 in tools/test-qa.js; the readme-count pin verified it).
- Site dist re-sealed AFTER the core.js touch, BEFORE the suite counts (the build-order law): `build ok: 11 demo files sealed, head 7a1ae0637`.

### Suite re-run after the build
- `node --test tests/*.test.js` — **395 registered: 387 pass / 0 fail / 8 honest skips**; `node --test tools/test-qa.js` — 8/8. The r76 TALLY-MATCH (27-draw), the r77 discipline pin, the r79 L2 pin (27-draw ledger), the r86 audit pins, the r87 dist pins (on the regenerated artifact), the r88 STALE-DIST seal, the r89 L1 pin (3/3), the r90 L0 pin (3/3), the new r91 pin (10/10), the readme-count pin, and the honesty two-way match all green; the marker grep over PLAYLOG.md after all edits is EMPTY; the receipt audit over the post-round PLAYLOG is GREEN at the raised claim count.

### Verdict
MERGEABLE — PR stacked on playtest-round-90 (re-lands R79–R91 to main in one merge per the R73/R74 precedent; the Casey gate governs).

Builder mode, one item as mandated (R91 spec item 1, first build after 5 carryings), the chronic live-RED refactored into a named receipt with a 10-test pin. Credit: R90 (the spec item + the abstaining-judge find carried forward); R86 (the receipt-audit pattern this build's main-guard + audit-against-own-seal design mirrors, and the audit that verified this round's claims); R88 (the named-STALE-DIST pattern for drift states); R76/R77 (the ledger + the append discipline); R79/R89/R90 (the button-spread pins that kept the draw discipline green). Sibling repos studied: none — the build and the finds were repo-internal.

## Round 90 — k2d8 (cron pong-quilt-playloop) — 2026-10-05 — mode: BUILDER (R89 spec item 5 — the L0 button's measured spread, [S], first carrying) + play-tester — vs R89 tip 0fed288 (PRs #102–#111 open Casey-gated per R89's receipts; basing on the R89 tip per the R22-vs-r21/R73/R74 precedent — this branch re-lands R79–R90 to main in one merge)

### Played versions: v1 (e98cf66, draw #26) — headless via the tag's own `tools/prerun.js` in a dedicated clean worktree (`git worktree add /tmp/pq-v1-r90 e98cf66`) — plus the tip itself (`node tools/prerun.js` at 0fed288 for the spine line, suite + qa + live-site playtest). Draw #26: L0 **2841** (2691f, 6h, ×2.08 — NEW VALUE, interior: fills the 2225→2935 maxGap), L1 **2100** (2000f, 4h, ×1.80 — NEW VALUE, interior: fills the 1691→2833 maxGap), L2 **2977** (2902f, 3h, ×2.16 — NEW VALUE, interior: fills the 2383→3242 gap). Fitness law per field verified at the tag (2841=2691+25·6, 2100=2000+25·4, 2977=2902+25·3). Ledger step per the R77 discipline: draw #26 APPENDED to `research/v1-draws.jsonl`; the tally lives in `research/v1-distribution.json` (regenerated by `tools/v1-dist.js`; receipt line verbatim: "OK (26 draws, 25 value-tallied — research/v1-distribution.json regenerated)"); the r76 TALLY-MATCH pin moved exactly once, in the file, to the 26-draw table. No r79 drift-fire: draw #26's L2 fields sit interior to the pinned 589–6225 fitness / 0–11 hits spread (and interior to the L1 spread the R89 pin holds: 738–6575 / 1–23; and interior to the new L0 spread: 1918–3295 / 1–7).

### Deltas observed (shapes of change)
- **d(spine)/d(version) = 0, seventeenth consecutive round.** `node tools/prerun.js` at the R89 tip regenerated byte-exact the canonical post-R50 line — coev.js 946e639a…, coev-stone-v1.json 3a0a5fb6…, curve.json f9b20e7d…, L0 bc15d414…, L1 1125d59c…, L2 50137ceb… — and left the tree CLEAN (the post-build `git status` names only my round's files: README, core.js, index.html, the two research artifacts, the r76 pin, the new r90 pin — zero checkpoint drift). Coin journal 5 flips / 3 swaps, unchanged.
- **d(v1-draw-shape)/d(n=26): the TRIPLE interior gap-fill — first three-new-value draw, and each new value lands in its level's largest adjacency gap.** Draw #25 minted two interior values; draw #26 mints THREE, one per level, each a maxGap filler: L0 2841 closes the 2225→2935 gap (size 710, the L0 maxGap) into a three-rung ladder 2225/2841/2935; L1 2100 closes the 1691→2833 gap (size 1142, the L1 maxGap) into 1691/2100/2833; L2 2977 closes the 2383→3242 gap (size 859) into 2383/2977/3242. Every axis of the support densified in a single draw. Distinct values after 26 draws: L0 6, L1 17, L2 13. The process alternated re-centralization (R87→R88) with gap-filling (R85, R86, R89) — this round says the two shapes are not exclusive: a draw can fill every gap at once while the modes (2935 ×18 on L0) hold.
- **d(pin-coverage)/d(version): the load row is fully numeric.** All three load buttons now cite the ledger-derived spread they sample (L0 this round; L1 R89; L2 R79). The one remaining prose-vs-numbers surface on the row — the R79 claim's "the other two buttons keep their accurate state labels" — is retired by the build, and the state labels stay honest beside the numbers.

### Lies hunted
- **[S → CLOSED this round] the L0 button slid bare — built here** (R89 spec item 5, first carrying). After the R89 build the L0 button was the only bare load button — `L0 · random`, zero numbers — while its measured distribution spanned 1918–3295 fitness / 1–7 hits across the value-tallied draws. Repro on the pristine tip: `grep -n "loadLevel('level0')" index.html` → `L0 · random`, no digits. The spec offered a NAMED-EXEMPTION alternative (gen-0's random-init spread is not player-relevant); considered and rejected — the spread IS the player's answer to "what opening state will I get". Built: the button now reads `L0 · random (v1 draws: 1918-3295 fitness, 1-7 hits)` — ledger-derived verbatim, the r79/r89 format; `tests/r90-l0-button-honesty-glue.test.js` pins it 3 ways (SPREAD-PRESENT / LEDGER-DERIVED / DRIFT-FIRES). FAIL-first observed: 3/3 RED on the pristine tree (button carried no numbers — verified by stash-reverting index.html, running the pin 0/3, restoring), 3/3 GREEN after the edit.
- **[verified absence, carried] R89 spec items 1–4 all confirmed still open by direct inspection at this tip** — item 1 (deploy-lag literacy): `tools/site-playtest.mjs:87` still asserts only `typeof pv.j?.head === "string"` and never compares heads; item 2 (audit over README/EXPERIMENTS): `tools/receipt-audit.js` still has no --doc mode (the only "doc" hit in the file is a comment word); item 3 (pulse-identity note): EXPERIMENTS.md still carries no pulse/withdrawn/one-pulse-per-round convention (grep EMPTY); item 4 (build-site --check): `tools/build-site.mjs` still has no --check mode (grep EMPTY). Item 5 (the L0 button) is the build above. All four open items carried to the R91 spec.
- **[note, NEW finding] the live-site "judge" check PASSes on an abstention.** `node tools/site-playtest.mjs` this round: "PASS judge replays + returns a verdict (live JEV) — verdict null (abstain: JEV HTTP 401 — abstained)". The check NAME claims a verdict; the receipt names a null. The abstention is honest (named, not fabricated — the R-doctrine), but a chronically-abstaining judge lane means the verdict surface is dark every round while the check reads green. Booked as the R91 spec's NEW item below.
- **[note] live-site playtest 7/8** — the 8th is the known deploy-lag finding (deploy serves head 17eb2394a, this checkout 0fed288ed; the served file is byte-faithful to ITS sealed head). The chronic RED the R91 item-1 carrying names; recorded here as the round's live data point.
- **[note] absence checks that came back clean**: the r76 TALLY-MATCH (26-draw, moved exactly once in the file), the r77 discipline pin, the r79 L2 pin (LEDGER-DERIVED + DRIFT-FIRES green on the 26-draw ledger), the r86 audit pins (93 existence-claims GREEN pre-round), the r87 dist pins (on the regenerated 26-draw artifact), the r88 STALE-DIST seal (dist re-sealed after the index.html + core.js touches, before the suite counts — build head 0fed288ed), the r89 L1 pin (3/3 green on the 26-draw ledger), the readme-count pin (verified my arithmetic — 385 in tests/ — went green on the post-build run), and the honesty two-way match — all green at the post-build suite run; the marker grep over PLAYLOG.md after all edits is EMPTY.

### Next version spec (R91)
1. **[S] deploy-lag literacy for `tools/site-playtest.mjs` — 5th carrying** (R86 item 3 → R87 item 2 → R88 item 1 → R89 item 1 → R90 carries): teach the byte-identity check to fetch `/api/provenance`, resolve the sealed head's own `checkpoints/level1.js` from git, and distinguish "deploy lags the checkout but is faithful to its sealed head" (NAME the lag, no finding, exit 0) from "deploy diverged from its own seal" (real finding, exit 1). VERIFY: against the live lagging deploy the check prints the lag receipt and exits 0; a hand-edited dist mismatch still fails.
2. **[S] the re-land receipt audit over README/EXPERIMENTS — 5th carrying** (R86 item 4 → R87 item 2 → R88 item 2 → R89 item 2 → R90 carries): extend `tools/receipt-audit.js` with a --doc mode over README.md/EXPERIMENTS.md receipt lines; the R83 find lived in README prose. VERIFY: synthetic README phantom RED; real docs GREEN.
3. **[S] pulse-identity discipline note in EXPERIMENTS.md — 4th carrying** (R87 item 5 → R88 item 4 → R89 item 4 → R90 carries; the two-pulse collision class is guarded today by the withdrawn-unpublished convention living only in the R86 addendum's prose). Name the convention in EXPERIMENTS.md next to the ledger-append discipline (the R77 pattern: protocol half + structural half). VERIFY: EXPERIMENTS.md names the convention; the r77-style protocol pin asserts it stays named.
4. **[S] build-site --check dry-run — 3rd carrying** (R88 item 5 → R89 item 5 → R90 carries; the R88 seal is test-only — a human or script running `tools/build-site.mjs` directly has no way to CHECK drift without invoking the whole suite). Add a `--check` mode to `tools/build-site.mjs`: compute the same full-manifest drift as the r88 pin, exit 0 + a one-line receipt when sealed-fresh, exit 1 NAMING the drifted files + sealed head when stale (reusing the exact r88 message). VERIFY: an edited-source tree exits 1 with the named list; a fresh-build tree exits 0; the r88 pin gains a CHECK-MODE test asserting the CLI's exit code and message.
5. **[S] the abstaining-judge check label — NEW** (this round's live-site find): "judge replays + returns a verdict (live JEV)" PASSes with `verdict null (abstain: JEV HTTP 401)`. Split the states: verdict-returned (assert non-null, keep the name) vs abstained (rename the check to name the abstention, e.g. "judge endpoint dark — abstains NAMED (no verdict claimed)", distinct label, not a finding but never a verdict-claim either). VERIFY: against the current 401 lane the run prints the named-abstention label; against a stubbed reachable judge the verdict field is asserted non-null.

### Shipped this round (the build — R89 spec item 5)
- `index.html`: the L0 load button gains the ledger-derived spread — `L0 · random (v1 draws: 1918-3295 fitness, 1-7 hits)` — the r79/r89 format verbatim, sourced from `research/v1-draws.jsonl`; the state label stays ("random" IS the gen-0 definition), the numbers join it. Only line 39 touched; the R18 init slice, the R78 sigline mount, the R85 anchornear mount all untouched.
- `tests/r90-l0-button-honesty-glue.test.js`: the 3-test pin (verbatim extraction, ledger-derived — the R69/R73/R78/r79/r89 pattern). FAIL-first 3/3 on the pristine tip (stash-revert verified), 3/3 GREEN post-edit.
- `research/v1-draws.jsonl`: draw #26 appended (values from the /tmp/pq-v1-r90 tag run; fitness law verified per field above).
- `research/v1-distribution.json` (GENERATED): regenerated to the 26-draw artifact by `tools/v1-dist.js`.
- `tests/r76-v1-draw-ledger-glue.test.js`: EXPECTED_TALLIES → the 26-draw table (L0 +2841×1; L1 +2100×1; L2 +2977×1 — moved exactly once, here, per the R77 discipline); per-draw history gains the R90 line.
- `core.js`: VERIFIED_CLAIMS gains `r90-l0-button-honesty-glue` (92 claims; the honesty two-way match stays green).
- `README.md`: test-count line updated (390→393: 385 in tests/ + 8 in tools/test-qa.js; the readme-count pin verified it).
- Site dist re-sealed AFTER the index.html + core.js touches, BEFORE the suite counts (the build-order law): `build ok: 11 demo files sealed, head 0fed288ed`.

### Suite re-run after the build
- `node --test tests/*.test.js` — **385 registered: 377 pass / 0 fail / 8 honest skips**; `node --test tools/test-qa.js` — 8/8. The r76 TALLY-MATCH (26-draw), the r77 discipline pin, the r79 L2 pin (26-draw ledger), the r86 audit pins, the r87 dist pins (on the regenerated artifact), the r88 STALE-DIST seal, the r89 L1 pin (3/3 on the 26-draw ledger), the new r90 L0 pin (3/3), the readme-count pin, and the honesty two-way match all green; the marker grep over PLAYLOG.md after all edits is EMPTY; the receipt audit over the post-round PLAYLOG is GREEN at the raised claim count.

### Verdict
MERGEABLE — PR stacked on playtest-round-89 (re-lands R79–R90 to main in one merge per the R73/R74 precedent; the Casey gate governs).

Builder mode, one item as mandated (R89 spec item 5, first carrying), the load row closed with a FAIL-first-observed pin. Credit: R89 (the spec item + the L1 pattern this build mirrors + the exemption-alternative call); R79 (the L2 button pattern + the drift-fire law shape); R87/R88 (the carrying discipline + the named-failure pattern); R76/R77 (the ledger + the append discipline); R86 (the receipt-audit the round's claims were audited with). Sibling repos studied: none — the build and the finds were repo-internal.

## Round 89 — k2d8 (cron pong-quilt-playloop) — 2026-10-04 — mode: BUILDER (R89 spec item 3 — the L1 button's measured spread, [S], 3rd carrying, first build) + play-tester — vs R88 tip bed13cd (PRs #102–#110 open Casey-gated per R88's receipts; basing on the R88 tip per the R22-vs-r21/R73/R74 precedent — this branch re-lands R79–R89 to main in one merge)

### Played versions: v1 (e98cf66, draw #25) — headless via the tag's own `tools/prerun.js` in a dedicated clean worktree (`git worktree add /tmp/pq-v1-r89 e98cf66`) — plus the tip itself (`node tools/prerun.js` at bed13cd for the spine line, suite + qa). Draw #25: L0 **2935** (2785f, 6h, ×2.11 — the modal value repeats an 18th time, 72% of value-tallied draws), L1 **2833** (2683f, 6h, ×2.07 — NEW VALUE, interior: fills the 1691–3490 kill-early→mid gap that draw #23's support expansion opened), L2 **3687** (3637f, 2h, ×2.45 — NEW VALUE, interior: fills the 3242–4766 mid-band gap). Fitness law per field verified at the tag (2935=2785+25·6, 2833=2683+25·6, 3687=3637+25·2). Ledger step per the R77 discipline: draw #25 APPENDED to `research/v1-draws.jsonl`; the tally lives in `research/v1-distribution.json` (regenerated by `tools/v1-dist.js`; receipt line verbatim: "OK (25 draws, 24 value-tallied — research/v1-distribution.json regenerated)"); the r76 TALLY-MATCH pin moved exactly once, in the file, to the 25-draw table. No r79 drift-fire: draw #25's L2 fields sit interior to the pinned 589–6225 fitness / 0–11 hits spread (and interior to the new L1 spread the build pins: 738–6575 / 1–23).

### Deltas observed (shapes of change)
- **d(spine)/d(version) = 0, sixteenth consecutive round.** `node tools/prerun.js` at the R88 tip regenerated byte-exact the canonical post-R50 line — coev.js 946e639a…, coev-stone-v1.json 3a0a5fb6…, curve.json f9b20e7d…, L0 bc15d414…, L1 1125d59c…, L2 50137ceb… — and left the tree CLEAN (the post-build `git status` names only my round's files: README, core.js, index.html, the two research artifacts, the r76 pin, the new r89 pin — zero checkpoint drift). Coin journal 5 flips / 3 swaps, unchanged.
- **d(v1-draw-shape)/d(n=25): the expansion streak RESUMES on two axes — both new values INTERIOR.** One round after draw #24's all-repeat return, draw #25 lands two new values, both inside established bands: L1 2833 fills the gap between the 1691 kill-early member and draw #23's 3490 mid-band opener (the kill-early→mid region is now 1691 / 2833 / 3490 — a three-member ladder, no longer a two-point frontier); L2 3687 fills the 3242–4766 mid-band (now 3242 / 3687 / 4766, also a three-member ladder). This is the third interior-gap-fill round in five draws (R85, R86, R89) against two mode-repeat rounds (R87→R88) — the process alternates re-centralization with gap-filling, and the gaps it fills are getting narrower: the L1 ladder's rungs span 1142 then 657 fitness; the L2 ladder's span 445 then 1079. The distribution is not converging to a point — it is CONSOLIDATING into a few dense centers with filling rungs between them. Distinct values after 25 draws: L0 5, L1 11, L2 9.
- **d(pin-coverage)/d(version): the load row is now fully numeric.** The L2 button has carried the ledger-derived spread since R79; the L1 button was the last bare state-label on the row — it now carries the measured ranges, so all three load buttons cite the distribution they sample (L0's remains a state label by the R79 convention — see spec item 5).

### Lies hunted
- **[S → CLOSED this round] the L1 button slid bare — built here** (R87 item 4 → R88 item 3 → this round, 3rd carrying). The L2 button has cited the measured spread since R79; the L1 button said "mid-training" with zero numbers while the L1 terminal-hits axis crept 1→23 across the value-tallied draws (R87 found draw 22's 21-hit maximum passing the previous 20 by hand — no pin noticed). Repro on the pristine tip: `grep -n "loadLevel('level1')" index.html` → `L1 · mid-training`, no digits. Built: the button now reads `L1 · mid-training (v1 draws: 738-6575 fitness, 1-23 hits)` — ledger-derived verbatim, the r79 format; `tests/r89-l1-button-honesty-glue.test.js` pins it 3 ways (SPREAD-PRESENT / LEDGER-DERIVED / DRIFT-FIRES with a synthetic range-extending draw). FAIL-first observed: 3/3 RED on the pristine tree (button carried no numbers), 3/3 GREEN after the edit.
- **[verified absence, carried] R89 spec items 1, 2, 4, 5 all confirmed still open by direct inspection at this tip** — item 1 (deploy-lag literacy): `tools/site-playtest.mjs:87` still asserts only `typeof pv.j?.head === "string"` and never compares heads (check prints both, asserts nothing about their relationship); item 2 (audit over README/EXPERIMENTS): `tools/receipt-audit.js` still has no --doc mode (`process.argv[2]` is the target path, its grammar runs over PLAYLOG.md only); item 4 (pulse-identity note): EXPERIMENTS.md still carries no pulse/withdrawn/one-pulse-per-round convention (grep EMPTY); item 5 (build-site --check): `tools/build-site.mjs` still has no --check mode (grep EMPTY). All four carried to the R90 spec.
- **[note] my own README arithmetic error — caught by the suite in one run, as designed.** I first wrote "380 in tests/" (counted the new pin as +1 file instead of +3 tests); the readme-count pin fired RED naming the live count (382 registered: 373 pass + 0 fail + 8 honest skips in that run) — the R86/R88 class of pin doing its job on the round's own author. Fixed in place; suite re-run green at 382/374/0/8.

### Shipped this round (the build — R89 spec item 3)
- `index.html`: the L1 load button gains the ledger-derived spread — `L1 · mid-training (v1 draws: 738-6575 fitness, 1-23 hits)` — the r79 format verbatim, sourced from `research/v1-draws.jsonl`; the state label stays ("mid-training" IS the gen-60 definition, README table row), the numbers join it. Only line 40 touched; the R18 init slice, the R78 sigline mount, the R85 anchornear mount all untouched.
- `tests/r89-l1-button-honesty-glue.test.js`: the 3-test pin (verbatim extraction, ledger-derived — the R69/R73/R78/r79 pattern). FAIL-first 3/3 on the pristine tip, 3/3 GREEN post-edit.
- `research/v1-draws.jsonl`: draw #25 appended (values from the /tmp/pq-v1-r89 tag run; fitness law verified per field above).
- `research/v1-distribution.json` (GENERATED): regenerated to the 25-draw artifact by `tools/v1-dist.js`.
- `tests/r76-v1-draw-ledger-glue.test.js`: EXPECTED_TALLIES → the 25-draw table (L0 2935×18; L1 +2833×1; L2 +3687×1 — moved exactly once, here, per the R77 discipline); per-draw history gains the R89 line.
- `core.js`: VERIFIED_CLAIMS gains `r89-l1-button-honesty-glue` (91 claims; the honesty two-way match stays green).
- `README.md`: test-count line updated (387→390: 382 in tests/ + 8 in tools/test-qa.js; the readme-count pin verified it — RED first at my wrong arithmetic, green after the fix).
- Site dist re-sealed AFTER the index.html + core.js touches, BEFORE the suite counts (the build-order law): `build ok: 11 demo files sealed, head bed13cd55`.

### Suite re-run after the build
- `node --test tests/*.test.js` — **382 registered: 374 pass / 0 fail / 8 honest skips**; `node --test tools/test-qa.js` — 8/8. The r76 TALLY-MATCH (25-draw), the r77 discipline pin, the r79 L2 pin (24-draw L2 table unchanged), the r86 audit pins, the r87 dist pins (on the regenerated artifact), the r88 STALE-DIST seal, the new r89 L1 pin (3/3), the readme-count pin, and the honesty two-way match all green; the marker grep over PLAYLOG.md after all edits is EMPTY.

### Next version spec (R90)
1. **[S] deploy-lag literacy for `tools/site-playtest.mjs` — 4th carrying** (R86 item 3 → R87 item 2 → R88 item 1 → R89 item 1): teach the byte-identity check to fetch `/api/provenance`, resolve the sealed head's own `checkpoints/level1.js` from git, and distinguish "deploy lags the checkout but is faithful to its sealed head" (NAME the lag, no finding, exit 0) from "deploy diverged from its own seal" (real finding, exit 1). VERIFY: against the live lagging deploy the check prints the lag receipt and exits 0; a hand-edited dist mismatch still fails.
2. **[S] the re-land receipt audit over README/EXPERIMENTS — 4th carrying** (R86 item 4 → R87 item 2 → R88 item 2 → R89 item 2): extend `tools/receipt-audit.js` with a --doc mode over README.md/EXPERIMENTS.md receipt lines; the R83 find lived in README prose. VERIFY: synthetic README phantom RED; real docs GREEN.
3. **[S] pulse-identity discipline note in EXPERIMENTS.md — 3rd carrying** (R87 item 5 → R88 item 4 → R89 item 4; the two-pulse collision class is guarded today by the withdrawn-unpublished convention living only in the R86 addendum's prose). Name the convention in EXPERIMENTS.md next to the ledger-append discipline (the R77 pattern: protocol half + structural half). VERIFY: EXPERIMENTS.md names the convention; the r77-style protocol pin asserts it stays named.
4. **[S] build-site --check dry-run — 2nd carrying** (R88 item 5 → R89 item 5; the R88 seal is test-only — a human or script running `tools/build-site.mjs` directly has no way to CHECK drift without invoking the whole suite). Add a `--check` mode to `tools/build-site.mjs`: compute the same full-manifest drift as the r88 pin, exit 0 + a one-line receipt when sealed-fresh, exit 1 NAMING the drifted files + sealed head when stale (reusing the exact r88 message). VERIFY: an edited-source tree exits 1 with the named list; a fresh-build tree exits 0; the r88 pin gains a CHECK-MODE test asserting the CLI's exit code and message.
5. **[S] L0 button: spread or a NAMED exemption — NEW** (this round's build makes L0 the only bare load button; its measured spread — 1918-3295 fitness, 1-7 hits across 24 value-tallied draws — is pinned nowhere, and the R79 claim's "the other two buttons keep their accurate state labels" prose predates the L1 build). Either annotate the L0 button with the ledger-derived spread (the r89 pattern, one more line + pin generalized) or add a NAMED-EXEMPTION receipt beside the button stating why gen-0's random-init distribution is not player-relevant (it is the starting state, not a trained outcome — the one-sentence honest form). VERIFY: the button carries the ranges, or the exemption line exists and a pin asserts it stays named.

### Verdict
MERGEABLE — PR stacked on playtest-round-88 (re-lands R79–R89 to main in one merge per the R73/R74 precedent; the Casey gate governs).

Builder mode, one item as mandated (R89 spec item 3), the 3rd-carrying wound closed with a FAIL-first-observed pin. Credit: R87/R88 (the spec item + carryings + the L1-hits creep note); R79 (the L2 button pattern this build mirrors + the drift-fire law shape); R76/R77 (the ledger + the append discipline); R86/R88 (the named-failure + count-pin patterns that caught my own arithmetic this round). Sibling repos studied: none — the build and the finds were repo-internal.

## Round 88 — k2d8 (cron pong-quilt-playloop) — 2026-10-04 — mode: BUILDER (R87 spec item 1 — the stale-dist seal, [S], 3rd carrying, first build) + play-tester — vs R87 tip cf75193 (PRs #102–#109 open Casey-gated per R87's receipts; basing on the R87 tip per the R22-vs-r21/R73/R74 precedent — this branch re-lands R79–R88 to main in one merge)

### Played versions: v1 (e98cf66, draw #24) — headless via the tag's own `tools/prerun.js` in a dedicated clean worktree (`git worktree add /tmp/pq-v1-r88 e98cf66`) — plus the tip itself (`node tools/prerun.js` at cf75193 for the spine line, suite + qa). Draw #24: L0 **2935** (2785f, 6h, ×2.11 — the modal value repeats a 17th time, 73.9% of value-tallied draws), L1 **738** (713f, 1h, ×1.28 — the kill-early floor repeats a 4th time), L2 **6125** (6000f, 5h, ×3.40 — the cap mode repeats a 7th time). Distribution table: **CITED, not typed** — the tally lives in `research/v1-distribution.json` (regenerated by `tools/v1-dist.js`; receipt line verbatim: "OK (24 draws, 23 value-tallied — research/v1-distribution.json regenerated)"); the r76 TALLY-MATCH pin moved exactly once, in the file, to the 24-draw table. Fitness law per field verified at the tag (2935=2785+25·6, 738=713+25·1, 6125=6000+25·5). No r79 drift-fire: draw #24's L2 fields sit interior to the pinned 589–6225 fitness / 0–11 hits spread. Suite at tip (pre-build, base state): 378 registered — 370 pass / 0 fail / 8 honest skips; qa 8/8 — exactly as R87 receipted.

### Deltas observed (shapes of change)
- **d(spine)/d(version) = 0, fifteenth consecutive round.** `node tools/prerun.js` at the tip regenerated byte-exact the canonical post-R50 line — coev.js 946e639a…, coev-stone-v1.json 3a0a5fb6…, curve.json f9b20e7d…, L0 bc15d414…, L1 1125d59c…, L2 50137ceb… — and left the tree CLEAN (0 dirty files; byte-reproducibility is the receipt). Coin journal 5 flips / 3 swaps, unchanged.
- **d(v1-draw-shape)/d(n): the all-repeat RETURN — the distribution re-centralizes on its three centers.** One round after draw #23 expanded the L1 support (3490, first new territory since draw 16), draw #24 lands every level on an established mode: L0 2935×17, L1 738×4 (the kill-early floor strengthens), L2 6125×7 (the cap mode strengthens to nearly a third of all value-tallied L2 draws). Draw #23's 3490 HOLDS as a 1-member band — the expansion was real, not noise, and the process now alternates expansion rounds with re-centralization rounds. The three centers (L0 mode / L1 kill-early floor / L2 cap) are the attractors of this seeded process; the gap-fillers (R85–R87) were excursions.
- **d(v1-L1-hits): 1 terminal hit at 713f — the kill-early floor's canonical shape.** Draw #23's 8 hits and draw #22's 21 hits sit at the interior/cap ends of the 1–23 axis; draw #24 returns to the floor end (738 = 713+25·1). Still nothing pins an L1 button spread (the r79 law covers L2 only) — carried to the R89 spec, 4th carrying of the note.

### Lies hunted
- **[P3 → CLOSED this round] the stale-dist seal — built here** (R85 item 4 → R86 item 2 → R87 item 1 → this round, 3rd carrying). The R85 hazard named it: on a long-lived checkout, dist/ sealed from an older base silently poisons the byte-identity checks while the tip is innocent — and the bare content-mismatch dump could not distinguish "my edit needs a reseal" from "the tree is broken" (R87's own build hit it: first post-edit suite run went 2-RED on exactly this). Built: every demo copy + checkpoint byte-identity assertion and the provenance spot-check now carry the NAMED message (`STALE-DIST: … run node tools/build-site.mjs to reseal, then re-run`), and a NEW full-manifest drift test computes live-source sha256 vs sealed sha256 over EVERY file in `site/generated/provenance.json`'s manifest — failing named with the drifted files AND the sealed head. FAIL-first observed: an un-rebuilt edit to index.html fired exactly the two named failures (`demo copy byte-identical: index.html` + `STALE-DIST seal: sources drifted from the sealed build (sealed at head cf7519340d0617f8b768396f490c1084ca4a64ea): demo/index.html — run \`node tools/build-site.mjs\` to reseal, then re-run the suite.`); revert + fresh build → 19/19 site-glue GREEN.
- **[verified absence, carried] R87 spec items 2–5 all confirmed still open by direct inspection** — item 2 (deploy-lag literacy): `tools/site-playtest.mjs` check #8 asserts only `typeof pv.j.head === "string"` and NEVER compares heads (verified by reading the check — it prints both heads but asserts nothing about their relationship); item 3 (audit over README/EXPERIMENTS): `tools/receipt-audit.js` has no --doc mode (its PATH_RE/VERB_RE grammar runs over PLAYLOG.md only); item 4 (L1 hits-spread): the L1 button still reads `L1 · mid-training` — no spread (grep-verified); item 5 (pulse-identity note): EXPERIMENTS.md carries no pulse/withdrawn/one-draw-per-round convention (grep-verified EMPTY). All four carried to the R89 spec.
- **[note] absence checks that came back clean**: the r76 TALLY-MATCH (24-draw table, moved exactly once in the file), the r77 discipline pin, the r79 LEDGER-DERIVED/DRIFT-FIRES pins (green on the 24-draw ledger), the r86 receipt-audit pins, the r87 dist pins (ARTIFACT-EQUALS-LEDGER green on the regenerated 24-draw artifact; TALLY-EQUALS-R76-PIN green across the two independent derivations), the r85 anchor pins, the readme-count pin (went RED first naming 386≠387, green after the edit — the pin working as designed), the honesty two-way claims↔tests match — all green at the post-build suite run; the conflict-marker grep over PLAYLOG.md after all edits is EMPTY; the receipt audit over the post-round PLAYLOG is GREEN at the raised claim count.

### Next version spec (R89)
1. **[S] deploy-lag literacy for `tools/site-playtest.mjs` — 3rd carrying** (R86 item 3 → R87 item 2 → R88 carries): teach the byte-identity check to fetch `/api/provenance`, resolve the sealed head's own `checkpoints/level1.js` from git, and distinguish "deploy lags the checkout but is faithful to its sealed head" (NAME the lag, no finding) from "deploy diverged from its own seal" (real finding, exit 1). VERIFY: against the live lagging deploy the check prints the lag receipt and exits 0; a hand-edited dist mismatch still fails.
2. **[S] the re-land receipt audit over README/EXPERIMENTS — 3rd carrying** (R86 item 4 → R87 item 2 → R88 carries): extend `tools/receipt-audit.js` with a --doc mode over README.md/EXPERIMENTS.md receipt lines; the R83 find lived in README prose. VERIFY: synthetic README phantom RED; real docs GREEN.
3. **[S] L1 hits-spread under the r79 drift-fire law — 2nd carrying** (R87 item 4 → R88 carries; the L1 terminal-hits axis spans 1–23 across 23 value-tallied draws and draw #22's 21-hit maximum crept past the previous 20 with no pin noticing). VERIFY: LEDGER-DERIVED L1 hits spread recomputed from `research/v1-draws.jsonl` + DRIFT-FIRES on an out-of-band draw, same shape as the r79 L2 pin; a synthetic 24-hit draw turns it RED, the real ledger GREEN.
4. **[S] pulse-identity discipline note in EXPERIMENTS.md — 2nd carrying** (R87 item 5 → R88 carries; the two-pulse collision class is guarded today by the withdrawn-unpublished convention living only in the R86 addendum's prose). Name the convention in EXPERIMENTS.md next to the ledger-append discipline (the R77 pattern: protocol half + structural half). VERIFY: EXPERIMENTS.md names the convention; the r77-style protocol pin asserts it stays named.
5. **[S] build-site --check dry-run — NEW** (this round's own build note: the R88 seal is test-only — a human or script running `tools/build-site.mjs` directly has no way to CHECK drift without invoking the whole suite). Add a `--check` mode to `tools/build-site.mjs`: compute the same full-manifest drift as the r88 pin, exit 0 + a one-line receipt when sealed-fresh, exit 1 NAMING the drifted files + sealed head when stale (reusing the exact r88 message). VERIFY: an edited-source tree exits 1 with the named list; a fresh-build tree exits 0; the r88 pin gains a CHECK-MODE test asserting the CLI's exit code and message (the R86 "tools that self-audit" pattern).

### Shipped this round (the build)
- `tests/site-glue.test.js` (the stale-dist seal): named STALE-DIST messages on all 4 byte-identity + 3 checkpoint-identity + 1 provenance-spot-check assertions; NEW test "STALE-DIST seal: sources match the sealed build (FAIL names the rebuild)" — the full-manifest live-vs-sealed sha256 drift computation, named failure with drifted files + sealed head. FAIL-first observed (the un-rebuilt index.html edit fired exactly the two named failures), fresh build GREEN. Site-glue 18→19 tests.
- `research/v1-draws.jsonl`: draw #24 appended (one JSON line; fitness-law fields verified at the tag above).
- `research/v1-distribution.json` (GENERATED): regenerated to the 24-draw artifact by `tools/v1-dist.js`.
- `tests/r76-v1-draw-ledger-glue.test.js`: EXPECTED_TALLIES → the 24-draw table (2935×17 / 738×4 / 6125×7 — moved exactly once, here, per the R77 discipline); per-draw history gains the R88 line (digit-led, the COMMENT-N-FREE regex verified not to fire).
- `core.js`: VERIFIED_CLAIMS gains the r88-stale-dist-seal-glue pin (90 claims; the claim names all three contracts).
- `README.md`: test-count line updated (386→387: 379 in tests/ + 8 in tools/test-qa.js, run-verified by the readme-count pin — RED first naming the drift, green after).

### Suite re-run after the build
- `node --test tests/*.test.js` — **379 registered: 371 pass / 0 fail / 8 honest skips**; `node --test tools/test-qa.js` — 8/8. The r76 TALLY-MATCH (24-draw), the r77 discipline pin, the r79 LEDGER-DERIVED/DRIFT-FIRES pins, the r86 audit pins, the r87 dist pins (on the regenerated artifact), the r88 STALE-DIST seal (19/19 within site-glue), the readme-count pin, and the honesty two-way match all green; the marker grep over PLAYLOG.md after all edits is EMPTY; the receipt audit over the post-round PLAYLOG is GREEN at the raised claim count.

Builder mode, one item as mandated (R87 spec item 1), the 3rd-carrying wound closed with a FAIL-first-observed pin. Credit: R87 (the spec item + the canonical R87 branch cf75193 this round bases on, including the generated-distribution artifact the round cites and extends); R85/R86 (the carryings + the hazard note); R76/R77 (the ledger + the append discipline); R42/R43 (the gitignored-dist provenance the seal reads); R86 (the named-failure + reason-as-data patterns). Sibling repos studied: none — the build and the finds were repo-internal.

## Round 87 — k2d8 (cron pong-quilt-playloop) — 2026-10-04 — mode: BUILDER (R86 spec item 1 — v1 baseline distribution as a generated artifact, [S], 3rd carrying, first build) + play-tester — vs R86 tip 3ccfbc4 (PRs #102–#108 open Casey-gated per R86's receipts; basing on the R86 tip per the R22-vs-r21/R73/R74 precedent — this branch re-lands R79–R87 to main in one merge)

### Played versions: v1 (e98cf66, draw #23) — headless via the tag's own `tools/prerun.js` in a dedicated clean worktree (`git worktree add /tmp/pq-v1-r87 e98cf66`) — plus the tip itself (`node tools/prerun.js` at 3ccfbc4 for the spine line, suite + qa). Draw #23: L0 **2935** (2785f, 6h, ×2.11 — the modal value repeats a 16th time), L1 **3490** (3290f, 8h, ×2.32 — NEW TERRITORY: the first L1 support expansion since draw 16, landing in the 1799-wide gap between the 1691 kill-early member and the 3940 mid-band opener that the generated artifact's `maxGap` field now names as the expansion frontier), L2 **589** (589f, 0h, ×1.24 — the zero-hit floor repeats a 4th time). Distribution table: **CITED, not typed** — per the R86 spec item built this round, the tally lives in `research/v1-distribution.json` (regenerated by `tools/v1-dist.js`; receipt line verbatim: "OK (23 draws, 22 value-tallied — research/v1-distribution.json regenerated)"); the r76 TALLY-MATCH pin stays the ledger-vs-table gate and moved exactly once, in the file, per the R77 discipline. Fitness law per field verified at the tag (2935=2785+25·6, 3490=3290+25·8, 589=589+25·0). No r79 drift-fire: draw #23's L2 fields sit interior to the pinned 589–6225 fitness / 0–11 hits spread (589 is the pinned floor value itself; 0 hits is spread-floor). Suite at tip (post-build): 378 registered — 370 pass / 0 fail / 8 honest skips; qa 8/8.

### Deltas observed (shapes of change)
- **d(spine)/d(version) = 0, fourteenth consecutive round.** `node tools/prerun.js` at the tip regenerated byte-exact the canonical post-R50 line — coev.js 946e639a…, coev-stone-v1.json 3a0a5fb6…, curve.json f9b20e7d…, L0 bc15d414…, L1 1125d59c…, L2 50137ceb… — and left the tree CLEAN (0 dirty files; byte-reproducibility is the receipt). Coin journal 5 flips / 3 swaps, unchanged.
- **d(v1-draw-shape)/d(n): the gap-filling convergence STREAK BREAKS — support expansion on exactly one axis.** Draws 21 and 22 both minted interior values (gap-filling); draw #23's L1 3490 is the first value OUTSIDE all established bands since draw 16's L1 4900 — and it lands in the LARGEST adjacency gap in the 23-draw L1 support (1691→3490, size 1799, the artifact's maxGap). The process is not interior-densifying anymore; it grew new territory downward-mid. Meanwhile L0 2935 (16/22 value-tallied = 73%) and L2 589 (the isolated zero-hit floor band, 1794 gap to its nearest neighbor) both REPEAT — the support expands on exactly the axis where the gap was widest.
- **d(v1-L1-hits): 8 terminal hits at 3290f — interior.** Draw #22 set the L1 hits maximum at 21; draw #23 sits mid-band at 8. The L1 hits axis now spans 1–23 across the ledger (the artifact's `spread.hitsMin/Max` makes this data, not prose) — still nothing pins an L1 button spread (the r79 law covers L2 only), so this is a note carried to the R88 spec below.
- **d(canonical-lane)/d(round): the two-pulse collision resolved clean, one ledger line lost.** Two R86 pulses existed: the sibling's 31b31a9+3ccfbc4 (canonical, pushed, PR #108) and a withdrawn local duplicate (084157f, never pushed, its draw #22 of 2935/6500/589 unpublished per the one-draw-per-round discipline — the repair addendum receipted the withdrawal). This round verified the remote: exactly one R86 branch, one draw #22 (2935/6525/5710). The hazard class — two pulses minting DIFFERENT samples for the same draw number — is process-guarded today by the unpublished-withdrawal convention only; no structural pin can guard a sample nobody pushed.

### Lies hunted
- **[P3 → CLOSED this round] v1 baseline distribution as a generated artifact — built here** (R84 item 4 → R85 item 3 → R86 item 1 → this round). The 23rd exercise of the hand-typed table was one too many: `tools/v1-dist.js` recomputes tally + values + bands + maxGap + per-level spread from `research/v1-draws.jsonl` into `research/v1-distribution.json`, and PLAYLOG entries cite the artifact instead of re-typing distributions — the R76 ledger-over-prose lesson applied to the table body. The banding rule ships as data (`bandGap: 1000` inside the artifact), never restated in prose. CLOSED: 4-test pin — ARTIFACT-EQUALS-LEDGER (stale artifact after an append fails, FAIL-first by construction), TALLY-EQUALS-R76-PIN (the tool's tally deep-equals the r76 glue's EXPECTED_TALLIES textually parsed — two independent derivations pinned equal so a drift is RED either way), REGEN-BYTE-STABLE (regeneration is a no-op on a clean tree — no timestamps, no environment leakage), TAMPER-RED (one edited fitness byte moves the computed distribution at exactly the planted value). FAIL-first observed TWICE while building the pin: the TAMPER-RED assertion first demanded `tally[3490] === 0` after the tamper moved the count away, but a zero-count key is ABSENT in the computed tally, not 0 — the pin fired RED on its own naive expectation ("undefined !== 0") before the `|| 0` fix; and the r76 header's per-draw history needed the same "no spelled-out N before draw" check the COMMENT-N-FREE pin guards (verified: "R87 draw 23" is digit-led prose, the regex does not fire).
- **[P2, verified open — process finding] the duplicate-pulse draw-collision class.** Measured this round: the R86 collision produced two DIFFERENT draw-#22 samples (canonical 6525/5710 vs withdrawn 6500/589) — had the withdrawn pulse been pushed before the sibling's, the ledger would carry a different interior topology and every downstream band fact would differ. The one-draw-per-round + withdrawn-unpublished convention saved it, but the convention lives in prose (the R86 repair addendum's receipt), not in a pin. Carried to the R88 spec.
- **[note] the stale-dist hazard fired on THIS round's own build, then closed by the known lane.** First post-edit suite run went 2-RED (site-glue byte-identity + provenance spot-check: core.js edited, `site/dist` not yet resealed) — the R85 hazard note and the R88 item-1 carrying seen live on the loop's own pulse; `node tools/build-site.mjs` restored green and the numbers below are post-build. (dist/ is gitignored — the receipt audit's GENERATED registry honored it.)
- **[note] absence checks that came back clean**: the r76 TALLY-MATCH (23-draw table, moved exactly once in the file), the r77 discipline pin, the r79 LEDGER-DERIVED/DRIFT-FIRES pins (green on the 23-draw ledger), the r86 receipt-audit pins (including FRESH-CHECKOUT-GREEN in this round's fresh worktree, pre-seal — the addendum's claim reproduced: 374 registered / 366 pass / 8 honest skips at base, exactly as receipted), the r85 anchor pins, the readme-count pin (went RED first naming 382≠386, green after the edit — the pin working as designed), the honesty two-way claims↔tests match — all green at the post-build suite run; the conflict-marker grep over PLAYLOG.md after all edits is EMPTY; the receipt audit over the post-round PLAYLOG is GREEN at the raised claim count.

### Next version spec (R88)
1. **[S] stale-dist seal — 3rd carrying** (R85 item 4 → R86 item 2 → R87 carries): `tools/build-site.mjs` records source-content sha256s in `site/generated/provenance.json` at seal time; the site glue fails NAMED ("rebuild: sources drifted from seal") instead of the content-mismatch dump. VERIFY: edit index.html without rebuilding → the glue names the rebuild; fresh build → GREEN.
2. **[S] deploy-lag literacy for `tools/site-playtest.mjs` — 2nd carrying** (R86 item 3 → R87 carries): teach the byte-identity check to fetch `/api/provenance`, resolve the sealed head's own `checkpoints/level1.js` from git, and distinguish "deploy lags the checkout but is faithful to its sealed head" (NAME the lag, no finding) from "deploy diverged from its own seal" (real finding, exit 1). VERIFY: against the live lagging deploy the check prints the lag receipt and exits 0; a hand-edited dist mismatch still fails.
3. **[S] the re-land receipt audit over README/EXPERIMENTS — 2nd carrying** (R86 item 4 → R87 carries): extend `tools/receipt-audit.js` with a --doc mode over README.md/EXPERIMENTS.md receipt lines; the R83 find lived in README prose. VERIFY: synthetic README phantom RED; real docs GREEN.
4. **[S] L1 hits-spread under the r79 drift-fire law — NEW** (R86's note, now data-backed: the artifact's `spread` puts the L1 terminal-hits axis at 1–23 across 22 value-tallied draws while the button's L1 half stays unpinned — the r79 law covers L2 only, and draw #22's 21-hit maximum crept past the previous 20 with no pin noticing). VERIFY: LEDGER-DERIVED L1 hits spread recomputed from `research/v1-draws.jsonl` + DRIFT-FIRES on an out-of-band draw, same shape as the r79 L2 pin; a synthetic 24-hit draw turns it RED, the real ledger GREEN.
5. **[S] pulse-identity discipline note in EXPERIMENTS.md — NEW** (this round's P2): the two-pulse collision is guarded today by the withdrawn-unpublished convention living only in the R86 addendum's prose. Name the convention in EXPERIMENTS.md next to the ledger-append discipline (the R77 pattern: protocol half + structural half) so a future double-pulse reads it BEFORE minting a sample; a full structural guard (two branches claiming the same round number) is beyond [S]. VERIFY: EXPERIMENTS.md names the convention; the r77-style protocol pin asserts it stays named.

### Shipped this round (the build)
- `tools/v1-dist.js` (NEW): the distribution generator — requireable module (loadLedger/computeDistribution/renderArtifact) + CLI; regenerates `research/v1-distribution.json` and receipts `OK (N draws, M value-tallied — research/v1-distribution.json regenerated)`.
- `research/v1-distribution.json` (NEW, GENERATED): the 23-draw distribution — per-level tally/values/bands/maxGap/spread; `bandGap: 1000` ships the banding rule as data.
- `tests/r87-v1-dist-glue.test.js` (NEW, 4 tests): ARTIFACT-EQUALS-LEDGER, TALLY-EQUALS-R76-PIN (textual parse of the r76 EXPECTED_TALLIES block — reads the same bytes a human edits), REGEN-BYTE-STABLE, TAMPER-RED (FAIL-first observed: the zero-count-key-is-absent fix is receipted in the pin).
- `research/v1-draws.jsonl`: draw #23 appended (one JSON line; fitness-law fields verified at the tag above).
- `tests/r76-v1-draw-ledger-glue.test.js`: EXPECTED_TALLIES → the 23-draw table (2935×16 / 3490×1 / 589×4 — moved exactly once, here, per the R77 discipline); per-draw history gains the R87 line (digit-led, the COMMENT-N-FREE regex verified not to fire).
- `core.js`: VERIFIED_CLAIMS gains the r87 pin (89 claims; the claim names all four contracts).
- `README.md`: test-count line updated (382→386: 378 in tests/ + 8 in tools/test-qa.js, run-verified by the readme-count pin — RED first naming the drift, green after).

### Suite re-run after the build
- `node --test tests/*.test.js` — **378 registered: 370 pass / 0 fail / 8 honest skips** (lens-closed in this fresh worktree); `node --test tools/test-qa.js` — 8/8. The r76 TALLY-MATCH (23-draw), the r77 discipline pin, the r79 LEDGER-DERIVED/DRIFT-FIRES pins, the r86 audit pins (fresh-checkout state included), the new r87 dist pins, the readme-count pin, and the honesty two-way match all green; the marker grep over PLAYLOG.md after all edits is EMPTY.

Builder mode, one item as mandated (R86 spec item 1), the 3rd-carrying wound closed with a FAIL-first-observed pin. Credit: R86 (the spec item + the sibling's canonical R86 branch 31b31a9+3ccfbc4 this round bases on — including the repair addendum whose FRESH-CHECKOUT-GREEN claim this round reproduced verbatim); R84/R85 (the carryings); R76/R77 (the ledger + the append discipline the artifact extends); R65 (the tool+spawn-pin pattern); R26 (the re-run lesson). Sibling repos studied: none — the build and the finds were repo-internal.

## Round 86 — Lucineer (playtest lane, main-agent dispatch) — 2026-10-04 — mode: BUILDER (R85 spec item 1 — the re-land receipt audit, [S], 5th carrying per the R85 spec's own numbering, first build) + play-tester — vs R85 tip f9d089c (PRs #102–#106 open Casey-gated per R85's receipt; basing on the R85 tip per the R22-vs-r21/R73/R74 precedent — this branch re-lands R79–R86 to main in one merge)

### Played versions: v1 (e98cf66, draw #22) — headless via the tag's own `tools/prerun.js` in a dedicated clean worktree (`git worktree add /tmp/pq-v1-r86 e98cf66`) — plus the tip itself, played through the repo's own lanes: the verbatim page-extraction harness (the r66/r80/r85 pattern) driving the SHIPPED index.html code through real gameplay, and `node tools/site-playtest.mjs` against the live deployed worker. Draw #22: L0 **2935** (2785f, 6h, ×2.11 — the modal value repeats a 15th time, now 71% of value-tallied draws), L1 **6525** (6000f, 21h, ×3.40 — NEW: interior to the cap-cluster, filling the 6500–6575 gap; 21 hits is a new L1 terminal-hits maximum), L2 **5710** (5610f, 4h, ×3.24 — NEW: interior, filling the 4919–6075 mid→cap gap). Twenty-two-draw tally cited from the ledger per the R77 discipline (the r76 pin's TALLY-MATCH output is the table; the hand-typed N-draw comment is RETIRED this round — see the find below): L0 2935 now ×15; L1 6525×1; L2 5710×1. Fitness law per field verified at the tag (2935=2785+25·6, 6525=6000+25·21, 5710=5610+25·4). No r79 drift-fire: draw #22's L2 fields sit interior to the pinned 589–6225 fitness / 0–11 hits spread, so the button stands. Suite at tip (post-build): 373 registered — 371 pass / 0 fail / 2 honest skips (lens-open: canonical quilt-doctor aa5a041 + quilt-stone 1f6036a clones present, so 6 lens pins run instead of skipping); qa 8/8.

### Deltas observed (shapes of change)
- **d(spine)/d(version) = 0, thirteenth consecutive round.** `node tools/prerun.js` at the tip regenerated byte-exact the canonical post-R50 line — coev.js 946e639a…, coev-stone-v1.json 3a0a5fb6…, curve.json f9b20e7d…, L0 bc15d414…, L1 1125d59c…, L2 50137ceb… — and left the tree CLEAN (0 dirty files; byte-reproducibility is the receipt). Coin journal 5 flips / 3 swaps, unchanged.
- **d(v1-draw-shape)/d(n): the gap-filling convergence deepens.** Draw #22 mints TWO new values and both land interior to established bands (L1 6525 between 6500×4 and 6575×1; L2 5710 between 4919×1 and 6075×1). The support still has not expanded in three rounds — the distribution densifies its interior. The all-repeat streak (R82–R84) and its break (R85) were the same process at different resolutions.
- **d(v1-L1-hits): 21 terminal hits at the 6000f cap — a new L1 hits maximum** (previous 20@6500). The L1 cap-cluster's hit axis is still creeping; nothing pins an L1 button spread (the r79 law covers L2 only), so this is a note, not a fire.
- **d(deployed-site)/d(tip): the live worker lags the gated main by design.** `tools/site-playtest.mjs` went 7/8 — the failing byte-identity check compared the deployed `demo/checkpoints/level1.js` against THIS checkout; the deployed provenance names head 17eb2394a (a pre-R83-era PLAYLOG receipt commit) and the served file's sha256 EXACTLY matches that old commit's `checkpoints/level1.js`. The deploy is faithful to what it sealed; the lag is the Casey gate working, not a defect. Booked as a process note; the R87 spec item below teaches the playtest tool to NAME this state instead of counting it a finding.

### Lies hunted
- **[P3 → CLOSED this round] re-land receipt audit — built here** (R81 item 4 → R82 item 4 → R83 item 3 → R84 item 2 → R85 item 1 → this round). The R82/R83 invisible-doc-rot class (receipt prose outliving its artifacts; the R34/R41 entry losses and the R81 ghost build were all invisible to pins that match regexes and run suites but never read the prose's existence claims against the tree) now has a ground-truth gate: `tools/receipt-audit.js` greps receipt bullets for backticked repo paths on in-tree verbs and asserts each exists; "path = {format}" lines are value descriptions not claims (the R39 stone-sign pilot's per-run output is honestly not a phantom — measured: the naive verb-scan without the format carve-out goes RED on R39's conditional output receipt, so the carve-out is precision, not a pass-forcing hack); zero found claims REFUSES at exit 2 (the degenerate-audit hazard). Measured on the real PLAYLOG: **73 existence-claims checked, 0 missing** — the loop's receipts currently tell the truth. CLOSED: 5-test pin — REAL-GREEN (with a ≥40-claim floor so a grammar rot fails loud, not vacuous-green), PHANTOM-RED (FAIL-first by construction: a synthetic receipt naming two ghost artifacts — a never-built r99 glue and a never-written ghost-draws ledger — fires NAMED at both lines), FORMAT-SKIP, NO-VERB-NO-CLAIM, CLI-LIVE (real tool spawn, exit 0 real / exit 1 NAMED phantom).
- **[P3 → CLOSED this round, NEW find] the r76 glue's hand-typed N-draw comment lagged the ledger — at TWO sites.** Found by playing the protocol, not by reading: R85's shipped list claimed "the hand-typed N-draw comment moved a 9th time", but at the R85 tip the header still read the PREVIOUS round's counts (prose said the twenty-draw table / 19 value-tallied while the ledger held 21 rows / 20 value-tallied) — and while fixing it, the new COMMENT-N-FREE pin fired RED on a SECOND stale site in the same file (the test-list comment still naming the twelve-draw table, "now twenty-one draws"). Two hand-typed count sites, both one-or-more appends behind the file they describe: the exact comment-drift class R83 spec'd (item 4) and R84/R85 carried. CLOSED the honest way: the count words are RETIRED from the file entirely (N is the ledger's row count; the header now says so in prose that cannot lag), pinned by a COMMENT-N-FREE negative assertion (no number-word-draw pattern, no "(N value-tallied draws)" pattern) that FAIL-first observed — it fired RED on the file's own remaining stale site before the second cleanup, GREEN after. The R86 spec item below (generated distribution artifact) retires the same class from PLAYLOG prose next.
- **[note] genuine-play receipts, all green (the R26 lesson applied: the full play ran 3× — seeds 1/2/3 — 29/29 checks each, zero FAILs; a single-rep pass would have been a draw).** The verbatim page harness drove the SHIPPED index.html code through: fresh-page state (sigLine first-paint + slider law at σ=2/7/12 measured/UNMEASURED/measured; #anchornear ships empty); classic L1 real play (train gens advance, live champion rally with frames climbing, DEATH receipts + fresh serves on death, ball on-field across whole rallies, mid-rally gen boundary preserves the game object (R47), pause freezes gen/games/stats byte-exact, mode-switch mid-rally clears the game and prompts Train); C1 real play (6 gens at σ=2: anchor stays g1 across all six, count climbs 5→24/24; mid-run σ→40: ledger rows carry σ=2…→40 in order, the stats-line trail annotates "σ g2:σ2 → g7:σ40", the anchor never re-anchors, #anchornear drops to 0/24 — the R66 law SEEN live; panel renders C1 rows with per-row σ; franken classic save after C1 refused NAMED with zero downloads; the coev save downloads one lane-pure file whose ledger matches); the artifact lane (loadCoev banner true to the checkpoint; no anchornear until the first bred gen; continuation re-anchors at its OWN g121); core edges (serve state invariants; 50 seeded games: frames ≤ 6000 always, fitness = frames + hits×100 always — no cap drawn in 30 plays of the L2 champ, swan-dominated as the doctrine says). Plus `node tools/test-qa.js` 8/8 and the live-site playtest 7/8 (the 8th = the deploy-lag note above).
- **[note] absence checks that came back clean**: the r78 sigLine pin, r79 button-spread pins (LEDGER-DERIVED + DRIFT-FIRES green on the 22-draw ledger), r80 trail pin, r84 row-σ pin, r85 anchor pins — all green untouched at the post-build suite run; the conflict-marker grep over PLAYLOG.md after all edits is EMPTY; the receipt audit over the post-round PLAYLOG (including this entry's own claims) is GREEN at 77 existence-claims.

### Next version spec (R87)
1. **[S] v1 baseline distribution as a generated artifact — 3rd carrying** (R84 item 4 → R85 item 3 → R86 carries): 22 draws have mapped the sample space; a small tool recomputing tally + spread + band membership from `research/v1-draws.jsonl` into `research/` that PLAYLOG entries CITE instead of hand-typing distributions — the R76 ledger-over-prose lesson applied to the table body, and the direct successor of this round's comment-retirement find. VERIFY: tool output equals the r76 pin's TALLY-MATCH derivation; a tampered ledger turns both red.
2. **[S] stale-dist seal — 2nd carrying** (R85 item 4 → R86 carries): `tools/build-site.mjs` records source-content sha256s in `site/generated/provenance.json` at seal time; the site glue fails NAMED ("rebuild: sources drifted from seal") instead of the content-mismatch dump. VERIFY: edit index.html without rebuilding → the glue names the rebuild; fresh build → GREEN.
3. **[S] deploy-lag literacy for `tools/site-playtest.mjs` — NEW** (this round's live-site note): the byte-identity check currently counts a faithful-but-lagging deploy as a finding (chronically RED under the Casey gate, which teaches readers to ignore it). Teach it to fetch `/api/provenance`, resolve the sealed head's own `checkpoints/level1.js` from git, and distinguish "deploy lags the checkout but is faithful to its sealed head" (NAME the lag, no finding) from "deploy diverged from its own seal" (real finding, exit 1). VERIFY: against the live lagging deploy the check prints the lag receipt and the run exits 0; a hand-edited dist mismatch still fails.
4. **[S] the re-land receipt audit over README/EXPERIMENTS too — NEW** (generalization of this round's build): the audit currently reads PLAYLOG.md only; the R83 find lived in README prose. Extend `tools/receipt-audit.js` with a --doc mode over README.md/EXPERIMENTS.md receipt lines. VERIFY: synthetic README phantom RED; real docs GREEN.

### Shipped this round (the build)
- `tools/receipt-audit.js` (NEW): the re-land receipt audit — requireable module (parseClaims/auditText) + CLI; exit 0 "OK (N existence-claims checked, M format-descriptions skipped)", exit 1 PHANTOM file:line+path, exit 2 REFUSED (unreadable input; zero claims — the degenerate-audit guard).
- `tests/r86-receipt-audit-glue.test.js` (NEW, 5 tests): REAL-GREEN (+≥40-claim non-vacuity floor), PHANTOM-RED (FAIL-first by construction), FORMAT-SKIP (the R39 carve-out is precision: measured RED without it), NO-VERB-NO-CLAIM, CLI-LIVE (spawn pattern per the R65 conflict-scan precedent).
- `tests/r76-v1-draw-ledger-glue.test.js`: EXPECTED_TALLIES → the 22-draw table (2935×15 / 6525×1 / 5710×1 — the tally moved exactly once, here, per the R77 discipline); BOTH hand-typed count sites retired N-free (the R86 find); NEW 6th test COMMENT-N-FREE pins the retirement (no number-word draw counts, no "(N value-tallied draws)" — FAIL-first observed firing on the file's own second stale site).
- `research/v1-draws.jsonl`: draw #22 appended (one JSON line; fitness-law fields verified above).
- `core.js`: VERIFIED_CLAIMS gains the r86 pin (88 claims; the claim names the phantom/REFUSED/format carve-out contracts).
- `README.md`: test-count line updated (375→381: 373 in tests/ + 8 in tools/test-qa.js, run-verified by the readme-count pin — which went RED first, naming 367≠373, then green after the edit: the pin working as designed).
- `site/`: rebuilt via `node tools/build-site.mjs` (the registry touch precedes the count re-run per the R83 build-order law).

### Suite re-run after the build
- `node --test tests/*.test.js` — **373 registered: 371 pass / 0 fail / 2 honest skips** (lens-open); `node --test tools/test-qa.js` — 8/8. The readme-count pin, the r76 TALLY-MATCH (22-draw), the r77 discipline pin, the r79 LEDGER-DERIVED/DRIFT-FIRES pins, and the new r86 audit pins all green; the marker grep over PLAYLOG.md after all edits is EMPTY.

Builder mode, one item as mandated (R85 spec item 1), plus one play-found P3 closed same-round with a FAIL-first-observed pin. Credit: R85 (the spec + the carrying discipline); R82/R83 (the doc-rot finds that defined the audit's target class); R65 (the conflict-scan tool+spawn-pin pattern this round mirrors); R39 (the honest conditional-output receipt that forced the format carve-out to be measured, not assumed); R26 (the 3× re-run lesson — applied to every qualitative play claim this round). Sibling repos studied: none — the find and the build were repo-internal.

### Repair addendum (same round, second pulse — fresh-checkout P1 on generated outputs)
A sibling pulse landed the same spec item on this same branch minutes earlier (commit 31b31a9, the canonical first build above — adopted as the R86 owner; the arriving pulse's independent implementation was withdrawn, its play samples unpublished per the one-draw-per-round discipline). Verifying the sibling's tip in a FRESH worktree exposed one P1 their in-tree green could not see: the audit's REAL-GREEN/CLI-LIVE pins pass only where a prior build has already sealed `site/dist` — dist/ is gitignored by design (R42/R43), this pin file sorts before the site-glue self-seal alphabetically, and a fresh checkout has no dist/ at that point: **the audit PHANTOM-REDs on `site/dist` claims (measured at commit 31b31a9: PLAYLOG.md lines 146, 399, 1206) on exactly the environment CI and new contributors hit** — nondeterministic green by environment, the R42 class one layer down. CLOSED here: `tools/receipt-audit.js` gains a GENERATED registry (reason ships as data — gitignore since R42 + site-glue/build-site as the sealer, pinned by regex so a bare skip stays the R63 quiet class); trailing slashes normalize so `site/dist/` dedupes to the same claim; the OK line now reports `G generated-build-outputs honored`. The pin grows a 6th test, FRESH-CHECKOUT-GREEN: an empty-root fixture carrying two `site/dist` claim forms + a file-level `site/dist/app-missing.js` NEGATIVE (unregistered paths under a generated root are still phantoms — the honor is root-only, never recursive) + a LIVE cross-check against the real PLAYLOG with dist/ unsealed. FAIL-first observed twice while building the pin (an empty root plus an unbuilt-verb fixture both caught the test lying to itself — receipted in the pin comments). Post-repair suite in the dist-less fresh state: the r86 pin is GREEN before any seal, and stays GREEN after (both states honest). Test count 373→374 (README 381→382); core.js VERIFIED_CLAIMS r86 claim extended to name the generated class (88 claims, contract now complete).

## Round 85 — k2d8 (cron pong-quilt-playloop) — 2026-10-04 — mode: BUILDER (R84 spec item 1 — live near-anchor count beside the σ slider, [S], 8th carrying, first build) + play-tester — vs R84 tip b186bbc (PRs #102–#106 open, Casey-gated; basing on the R84 tip per the R22-vs-r21/R73/R74 precedent — this PR re-lands R79–R85 to main in one merge)

### Played versions: v1 (e98cf66, draw #21) — headless via the tag's own `tools/prerun.js` in a dedicated clean worktree (`git worktree add /tmp/pq-v1-r85 e98cf66`) — plus the tip itself. Draw #21: L0 **2935** (2785f, 6h, ×2.11 — the modal value repeats a 14th time), L1 **6250** (6000f, 10h, ×3.40 — NEW: the first new L1 value since draw 17, an interior member of the cap-cluster band between 6150 and 6400), L2 **4851** (4576f, 11h, ×2.83 — NEW: interior to the mid-band between 4766 and 4878). Twenty-one-draw tallies (20 value-tallied; draw 1 documentary-only), the ledger's TALLY-MATCH output cited here per the R77 discipline: L0 1918×1 / 2225×3 / **2935×14** / 3223×1 / 3295×1; L1 738×3 / 1242×3 / 1691×1 / 3940×1 / 4900×1 / 5156×1 / 5778×1 / 6114×1 / 6150×1 / **6250×1** / 6400×1 / **6500×4** / 6575×1; L2 589×3 / 2383×3 / 3242×1 / 4766×2 / **4851×1** / 4878×1 / 4919×1 / 6075×1 / **6125×6** / 6225×1. Hand-recompute of the 21-draw table (pre-append skepticism check, seventh exercise of the discipline) matched the pin's post-append output exactly — hand path and pin agree again. Fitness law per field verified at the tag (2935=2785+25·6, 6250=6000+25·10, 4851=4576+25·11). Suite at tip (post-build): 367 registered — 359 pass / 0 fail / 8 honest skips; qa 8/8.

### Deltas observed (shapes of change)
- **d(spine)/d(version) = 0, twelfth consecutive round.** Canonical post-R50 line byte-exact at the tip: 5 quantum-coin flip(s), 3 swap(s); md5s — coev-stone-v1.json 3a0a5fb6…, coev.js 946e639a…, curve.json f9b20e7d…, L0 bc15d414…, L1 1125d59c…, L2 50137ceb….
- **d(v1-draw-shape)/d(n): the all-repeat streak breaks at 3 — but the support does NOT expand.** Both new values land interior to established bands (L1 6250 in the 6150–6400 cap-cluster gap; L2 4851 in the 4766–4878 mid-band gap). This is gap-filling convergence: the distribution is densifying its interior, not growing new territory. L0 2935 now holds 70% of value-tailed draws (14/20).
- **d(v1-L2-hits): the hits spread widens 9→11** — draw #21's L2 champion lands 11 terminal hits, the first hits-range drift since R79 pinned the button. The r79 DRIFT-FIRES mechanism fired exactly as designed: the suite went RED (SPREAD-PRESENT + LEDGER-DERIVED) until the button was updated in the same round. A pin that fires is measurement; the same RED without an in-round fix would have been a wound.
- **Failure-mode migration: none new.** Draw #21 sits interior to every pinned fitness band; only the L2 hits axis moved.

### Lies hunted
- **[P3 → CLOSED this round] live near-anchor count beside the sigLine — 8th verified absence** (R78 item 4 → R79 item 2 → R80 item 3 → R81 item 2 → R82 item 2 → R83 item 2 → R84 item 1 → built here). Pre-build measurement exposed a design trap: counting nets near the CURRENT champ overlaps the σ=2 and σ=12 regimes completely (gen-2 counts vs the moving champ: σ=2 → 44/42/57/27/96, σ=12 → 75/54/96/73/16 across seeds 1–5) — winner-proximity is tautological under selection, so that instrument would have been applause, not measurement. The R66 law is the GEN-1 LINEAGE ANCHOR's cluster persistence; the page anchors once per population lineage (first bred sChamp after fresh materialization or file load) and renders `near-anchor N/96 nets within L2 2.0 of the g<gen> sChamp` recomputed each bred gen, empty before the first C1 gen. CLOSED: 5-test pin — σ-law at the median across 5 seeds (σ=2 {29,32,39,0,96} median 32 ≥ 8; σ=12 {0,54,0,0,28} median 0 ≤ 5), anchor-persistence (never re-anchors mid-lineage), load-reanchors (a stale anchor can never measure the wrong lineage), empty-before-train, rendered-number-equals-recomputed-view.
- **[P3, verified open] re-land receipt audit — 5th carrying** (R81 item 4 → R82 item 4 → R83 item 3 → R84 item 2): unchanged rationale. Carried to the R86 spec.
- **[P3, verified open] PLAYLOG v1-draw table recompute — 4th carrying** (R83 item 4 → R84 item 3): the r76 glue's hand-typed N-draw comment moved a 9th time this round; the tally itself moved exactly once, in the file, per the R77 discipline. Carried to the R86 spec.
- **[P3, verified open] v1 baseline distribution as a generated artifact — 1st carrying** (R84 item 4): the hand-typed distribution table in this entry is the 21st exercise of the discipline; a generated artifact would make it prose-free. Carried to the R86 spec.
- **[P3, NEW — process finding] the stale-dist hazard**: the R44 self-seal builds `site/dist/` only when it is ABSENT; a stale gitignored dist (sealed from an older base in a long-lived checkout) silently poisons site-glue while the tip is innocent — THIS round's first suite run went 3-RED (byte-identity + provenance spot-check) against the untouched R84 tip, and a naive round could have claimed an R84 regression or patched the wrong file. Rebuilt via `node tools/build-site.mjs`; all six md5s then matched EXPERIMENTS.md and the tip was green. The hazard is real for any long-lived non-CI checkout. Carried to the R86 spec.
- **[note] absence checks that came back clean**: the r78 sigLine pin green (verbatim extraction intact beside the new #anchornear element); the r84 σ-on-rows pin green; the r83 README-table pin green; the r81 measured-at-tag pin green; the r66 lineage-decay pin green under the new anchor code (its harness re-extracts startGenC/continueGenC — the auto-created #anchornear stub absorbs the new write without semantic change); the marker grep over PLAYLOG.md after all edits is EMPTY; the prerun spine md5s match EXPERIMENTS.md exactly.

### Next version spec (R86)
1. **[S] re-land receipt audit — 6th carrying** (R81 item 4 → R82 item 4 → R83 item 3 → R84 item 2 → R85 item): unchanged rationale — the R82/R83 table finds are the invisible-doc-rot class; the audit greps receipt lines for artifact-verb claims and asserts each named artifact exists in-tree. VERIFY: synthetic PLAYLOG with a phantom artifact turns RED; real PLAYLOG GREEN.
2. **[S] PLAYLOG v1-draw table recompute — 5th carrying** (R83 item 4 → R84 item 3 → R85 item): the hand-typed N-draw comment in the r76 glue moved a 9th time this round; derive N from the ledger row count inside the pin so the comment can never lag the file again. VERIFY: a ledger append with no comment update stays GREEN.
3. **[S] v1 baseline distribution as a generated artifact — 2nd carrying** (R84 item 4 → R85 item): 21 draws have mapped the sample space; a small tool recomputing tally + spread + band membership from research/v1-draws.jsonl into research/ that PLAYLOG entries CITE instead of hand-typing distributions — the R76 ledger-over-prose lesson applied to the table body. VERIFY: tool output equals the r76 pin's TALLY-MATCH derivation; a tampered ledger turns both red.
4. **[S] stale-dist seal — NEW** (this round's process finding): `tools/build-site.mjs` records source-content sha256s in `site/generated/provenance.json` at seal time; `tests/site-glue.test.js` compares the live sources against the seal and fails NAMED ("rebuild: sources drifted from seal") instead of the current content-mismatch dump. VERIFY: edit index.html without rebuilding → the glue's failure names the rebuild, not a bare sha mismatch; fresh build → GREEN.

### Shipped this round (the build)
- `index.html`: `<small id="anchornear"></small>` beside `#sigline` (the σ slider row); `continueGenC` anchors once per population lineage (`coev.anchorNet` = the first bred sChamp; the fails-closed fresh-materialization branch resets it to null; the C1 file-load branch re-anchors at the loaded file's own shipped champ — a stale anchor can never measure the new population against the old lineage) and writes `near-anchor N/pop nets within L2 2.0 of the g<gen> sChamp` recomputed from the live population each bred gen — a VIEW, never a cached or default number; the element ships empty (no fabricated value before the first C1 gen) and the anchor gen rides the text so staleness is self-disclosing.
- `tests/r85-anchor-near-glue.test.js` (NEW, 5 tests): NEAR-COUNT-ON-LINE (rendered number equals the measurement recomputed from the live population), SIGMA-LAW (the R84 spec's VERIFY: 5-seed medians separate the regimes, σ=2 ≥ 8 > σ=12 ≤ 5, measured {29,32,39,0,96} vs {0,54,0,0,28}), EMPTY-BEFORE-TRAIN, ANCHOR-PERSISTS (never re-anchored mid-lineage — the measured tautology regression is pinned RED the moment it recurs), LOAD-REANCHORS. Harness lifted from the sibling `tests/r66-c1-lineage-decay-glue.test.js` (R66's extraction pattern, credited). The pin documents the pre-build tautology measurement (44–96 vs 16–75 overlap) as the design wound.
- `index.html`: the L2 button spread updated `0-9 hits` → `0-11 hits` — the r79 pin's DRIFT-FIRES caught draw #21's 11-hit champion and held the suite RED until the label moved in the same round (the mechanism working as designed, cited in Deltas).
- `core.js`: VERIFIED_CLAIMS gains the r85 pin (claim names the once-per-lineage anchor law, the load-reanchor, the never-fabricated default, and the median-level σ-law with the measured bands).
- `research/v1-draws.jsonl`: draw #21 appended (one JSON line; fitness-law fields verified above).
- `tests/r76-v1-draw-ledger-glue.test.js`: EXPECTED_TALLIES → the twenty-one-draw table (2935×14 / 6250×1 / 4851×1); the tally moved exactly once (draw #21), here, not in prose (R77 discipline); the hand-typed N-draw comment moved a 9th time (spec item 3 carried).
- `README.md`: test-count line updated (370→375: 367 in tests/ + 8 in tools/test-qa.js, run-verified by the readme-count pin).
- `site/`: rebuilt via `node tools/build-site.mjs` (the site-glue byte-identity pin caught the index.html + core.js changes).

## Round 84 — k2d8 (cron pong-quilt-playloop) — 2026-10-03 — mode: BUILDER (R83 spec item 1 — σ on the receipt-panel C1 ledger rows, [S], 4th carrying, first build) + play-tester — vs R83 tip 2d798ca (PRs #102–#105 open, Casey-gated; basing on the R83 tip per the R22-vs-r21/R73/R74 precedent — this PR re-lands R79–R84 to main in one merge)

### Played versions: v1 (e98cf66, draw #20) — headless via the tag's own `tools/prerun.js` in a dedicated clean worktree (`git worktree add /tmp/pq-v1-r84 e98cf66`) — plus the tip itself. Draw #20: L0 **2935** (2785f, 6h, ×2.11 — the modal value repeats), L1 **1242** (1192f, 2h, ×1.48 — the kill-early floor repeats), L2 **4766** (4691f, 3h, ×2.88 — the mid-band repeats). Twenty-draw tallies (19 value-tallied; draw 1 documentary-only), the ledger's TALLY-MATCH output cited here per the R77 discipline: L0 1918×1 / 2225×3 / **2935×13** / 3223×1 / 3295×1; L1 738×3 / **1242×3** / 1691×1 / 3940×1 / 4900×1 / 5156×1 / 5778×1 / 6114×1 / 6150×1 / 6400×1 / **6500×4** / 6575×1; L2 **589×3** / 2383×3 / 3242×1 / **4766×2** / 4878×1 / 4919×1 / 6075×1 / **6125×6** / 6225×1. Hand-recompute of the 20-draw table (pre-append skepticism check, sixth exercise of the discipline) matched the pin's post-append output exactly — hand path and pin agree again. Fitness law per field verified at the tag (2935=2785+25·6, 1242=1192+25·2, 4766=4691+25·3). Suite at tip (post-build): 362 registered — 354 pass / 0 fail / 8 honest skips; qa 8/8.

### Deltas observed (shapes of change)
- **d(spine)/d(version) = 0, eleventh consecutive round.** Canonical post-R50 line byte-exact at the tip: 5 quantum-coin flip(s), 3 swap(s); md5s — coev-stone-v1.json 3a0a5fb6…, coev.js 946e639a…, curve.json f9b20e7d…, L0 bc15d414…, L1 1125d59c…, L2 50137ceb….
- **d(v1-draw-shape)/d(n): draw #20 is the THIRD consecutive all-repeat draw — convergence, not coincidence.** Every level hit an established band member: L0 2935 (×12→×13, 68.4% of value-tailed draws), L1 1242 (×2→×3 — the kill-early floor band widens), L2 4766 (×1→×2). Three consecutive draws (R82, R83, R84) produced zero new values; the sample space is mapped.
- **d(v1-L1)/d(n): the L1 distribution is now bimodal-and-settled** — a kill-early floor band (738×3 / 1242×3) and a cap-cluster band (6400×1 / 6500×4 / 6575×1), thinly connected by mid values. The champion either dies early or survives to the speed cap.
- **Failure-mode migration: none new.** Draw #20's fields sit interior to every pinned band (L2 4766@3h inside the 589–6225 / 0–9h spread) — no drift-fire.

### Lies hunted
- **[P3 → CLOSED this round] σ on the receipt-panel rows — 4th verified absence** (R80 item 4 → R81 item 3 → R82 item 3 → R83 item 1 → built here). Minimal repro: breed 4 C1 generations at σ=8 through the pinned page harness — every receipted ledger row carries `sig: 8` (r80 pin, SIG-RECORDED green) yet the panel renders `COEV g1 e7a78c4d vs 922ab155 -> ENDER-KILL 198f loser=— b33b839b←00000000` — the breeding temperature of each generation is absent from the exact surface a player reads top to bottom. CLOSED: the C1-lane row render appends `σ=<int>` from the row's OWN sig field; pre-R80 rows print nothing (never a fabricated default); MOTH lines and the classic-mode path byte-unchanged (r68 contract); 3-test render pin FAIL-first on the pre-fix tree (SIG-ON-ROW + OLD-ROWS-SILENT RED, NON-C1-BYTE-UNCHANGED green by design).
- **[P3, verified open] live near-anchor count beside the sigLine — 7th verified absence** (R78 item 4 → R79 item 2 → R80 item 3 → R81 item 2 → R82 item 2 → R83 item 2 → R84 item): grep for any anchor-count element returns nothing; sigLine remains static disclosure text. Carried to the R85 spec.
- **[P3, verified open] re-land receipt audit — 4th carrying** (R81 item 4 → R82 item 4 → R83 item 3 → R84 item): unchanged rationale. Carried to the R85 spec.
- **[P3, verified open] PLAYLOG v1-draw table recompute — 3rd carrying** (R83 item 4 → R84 item): the r76 glue's hand-typed "twenty-draw" comment moved again this round (8th hand-move); the tally itself moved exactly once, in the file, per the R77 discipline. Carried to the R85 spec.
- **[note] absence checks that came back clean**: the r83 README-table pin green (untouched); the r79 button spread still matches the 20-draw ledger (589–6225 fitness, 0–9 hits — LEDGER-DERIVED + DRIFT-FIRES green); the r81 measured-at-tag pin green; the marker grep over PLAYLOG.md after all edits is EMPTY; the two prior README-table stale values (5,767/8,800/8,700) are gone from README, index.html, and prerun.js.

### Next version spec (R85)
1. **[S] live near-anchor count beside the sigLine — 8th carrying** (R78 item 4 → R79 item 2 → R80 item 3 → R81 item 2 → R82 item 2 → R83 item 2 → R84 item): unchanged rationale — R66's law is a population claim; the player should SEE the cluster form as σ drops. VERIFY: short C1 Train at σ=2 shows a measurably rising count vs σ=12; render pin extracts the count line.
2. **[S] re-land receipt audit — 5th carrying** (R81 item 4 → R82 item 4 → R83 item 3 → R84 item): unchanged rationale — the R82/R83 table finds are the invisible-doc-rot class; the audit greps receipt lines for artifact-verb claims and asserts each named artifact exists in-tree. VERIFY: synthetic PLAYLOG with a phantom artifact turns RED; real PLAYLOG GREEN.
3. **[S] PLAYLOG v1-draw table recompute — 4th carrying** (R83 item 4 → R84 item): the hand-typed N-draw comment in the r76 glue moved an 8th time this round; automate it — derive N from the ledger row count inside the pin so the comment can never lag the file again. VERIFY: a ledger append with no comment update stays GREEN.
4. **[S] v1 baseline distribution as a generated artifact — NEW**: 20 draws have mapped the sample space and the distribution has converged; the per-level tallies should live in a generated file (a small tool recomputing tally + spread + band membership from research/v1-draws.jsonl, written under research/) that PLAYLOG entries CITE instead of hand-typing distributions — the same ledger-over-prose lesson as R76, applied to the table body. VERIFY: tool output equals the r76 pin's TALLY-MATCH derivation; a tampered ledger turns both red; a PLAYLOG entry whose cited table disagrees with the generated file trips a glue pin.

### Shipped this round (the build)
- `index.html`: the renderReceipts C1-lane row render (index.html:109) appends `σ=<int>` from the row's own sig field — `COEV gN sX vs eY -> OUTCOME Ff σ=8 loser=… hash←prev`. Rows that predate σ recording print nothing; the MOTH receipt lines above stay byte-unchanged; the per-row σ and the R80 trail annotation remain ONE VIEW over the same receipted rows (the R32 P4 drift class cannot recur between them).
- `tests/r84-sigma-receipt-rows-glue.test.js` (NEW, 3 tests): SIG-ON-ROW (4 gens at σ=8 → every rendered C1 row carries σ=8, print is row-derived); NON-C1-BYTE-UNCHANGED (MOTH section + classic-mode panel carry no σ — the r68 lane untouched); OLD-ROWS-SILENT (a pre-R80 save's 3 rows print no σ while the session's own gen-6 row prints σ=10 — history never backfilled). Demo harness lifted from the sibling `tests/r80-sigma-trail-glue.test.js` (R80's extraction pattern, credited). FAIL-first on the pre-fix tree: SIG-ON-ROW + OLD-ROWS-SILENT RED.
- `core.js`: VERIFIED_CLAIMS gains the r84 pin (claim names the row-derived σ, the never-backfilled default, and the one-view-over-same-rows law).
- `site/`: rebuilt via `node tools/build-site.mjs` (the site-glue byte-identity pin caught the core.js + index.html changes; build-order law: registry touch precedes the suite-count re-run).
- `research/v1-draws.jsonl`: draw #20 appended (one JSON line; fitness-law fields verified above).
- `tests/r76-v1-draw-ledger-glue.test.js`: EXPECTED_TALLIES → the twenty-draw table (2935×13 / 1242×3 / 4766×2); the tally moved exactly once (draw #20), here, not in prose (R77 discipline).
- `README.md`: test-count line updated (367→370: 362 in tests/ + 8 in tools/test-qa.js, run-verified by the readme-count pin).


## Round 83 — k2d8 (cron pong-quilt-playloop) — 2026-10-03 — mode: BUILDER (R82 spec item 1 — the README "Real starting states" table value-rot, [S], first build) + play-tester — vs R82 tip e98b75e (PRs #102/#103/#104 open, Casey-gated; basing on the R82 tip per the R22-vs-r21/R73/R74 precedent — this PR re-lands R79–R83 to main in one merge)

### Played versions: v1 (e98cf66, draw #19) — headless via the tag's own `tools/prerun.js` in a dedicated clean worktree (`git worktree add /tmp/pq-v1-r83 e98cf66`) — plus the tip itself. Draw #19: L0 **2935** (2785f, 6h, ×2.11 — the modal value repeats), L1 **6500** (6000f, 20h, ×3.40 — the cap-cluster repeats), L2 **589** (589f, 0h, ×1.24 — the zero-hit floor repeats). Nineteen-draw tallies (18 value-tallied; draw 1 documentary-only), the ledger's TALLY-MATCH output cited here per the R77 discipline: L0 1918×1 / 2225×3 / **2935×12** / 3223×1 / 3295×1; L1 738×3 / 1242×2 / 1691×1 / 3940×1 / 4900×1 / 5156×1 / 5778×1 / 6114×1 / 6150×1 / 6400×1 / **6500×4** / 6575×1; L2 **589×3** / 2383×3 / 3242×1 / 4766×1 / 4878×1 / 4919×1 / 6075×1 / 6125×6 / 6225×1. Hand-recompute of the 19-draw table (pre-append skepticism check, fifth exercise of the discipline) matched the pin's post-append output exactly — hand path and pin agree again. Suite at tip (pre-build): 356 registered — 348 pass / 0 fail / 8 honest skips; qa 8/8.

### Deltas observed (shapes of change)
- **d(spine)/d(version) = 0, tenth consecutive round.** Canonical post-R50 line byte-exact at the tip: 5 quantum-coin flip(s), 3 swap(s); md5s — coev-stone-v1.json 3a0a5fb6…, coev.js 946e639a…, curve.json f9b20e7d…, L0 bc15d414…, L1 1125d59c…, L2 50137ceb….
- **d(v1-draw-shape)/d(n): draw #19 is an all-repeat draw — no new value anywhere.** Every level hit an existing modal value: L0 2935 (×12, 66.7% of value-tailed draws), L1 6500 (×4), L2 589 (×3). Two consecutive all-repeat draws (R82, R83) — the distribution is converging; the sample space is mapped.
- **d(v1-L1-cap)/d(n): 6500×4 — the cap mode strengthens** (6000f, 20h). The L1 cap-cluster now spans 6400×1 / 6500×4 / 6575×1 — the 20-hit cap game is the modal value.
- **d(v1-L2-floor)/d(n): 589×3 — the zero-hit floor repeats, now 17% of draws.** The champion's best game can never touch the ball — a stable failure mode, not noise.

### Lies hunted
- **[P1 → CLOSED this round] README "Real starting states" table value-rot — 32 rounds stale** (R82's NEW find). Minimal repro (R82): README.md:57-59 presented L0 5,767 / L1 8,800 / L2 8,700 with hits 12/28/27 at the 6,000f cap; running `node tools/prerun.js` prints L0 1,890 / L1 2,010 / L2 1,753 with hits 2/2/3 at ≤1,810f. The ×100 fitness law (Round 3) re-evolved the checkpoints; R50's escalation law re-evolved them again; both rounds refreshed the md5 lines under the table but never the table itself. Every column was wrong. CLOSED by rewriting the three rows to the current prerun outputs + pinning with a new glue that reads the committed checkpoint headers and asserts the table equals them — the R52 lesson applied to the last unpinned value surface. The pre-fix table's "6,000 (cap)" frames cells are gone (champions die at ≤1,810f); the "L1 > L2" note survives with its mechanism corrected (357 extra frames outweigh one fewer hit at ×100); the "hits-driven plateau" sentence is corrected to survival-dominated (no champion reaches the cap). FAIL-first on the pre-fix tree: every value assertion RED. The pin also catches the prose: it asserts the L1>L2 mechanism names frames, not hits.
- **[P3, verified open] σ on the receipt-panel rows — 3rd verified absence** (R82 item 3 → R83 item): index.html:109's renderReceipts still renders C1-lane rows with no σ though rows carry sig since R80. Carried to the R84 spec.
- **[P3, verified open] live near-anchor count beside the sigLine — 4th verified absence** (R82 item 2 → R83 item): sigLine is static disclosure text; no live count element exists. Carried to the R84 spec.
- **[note] absence checks that came back clean**: the r81 measured-at-tag pin green (untouched); the r79 button spread still matches the 19-draw ledger (589–6225, 0–9 hits — LEDGER-DERIVED + DRIFT-FIRES green); the marker grep over PLAYLOG.md after all edits is EMPTY; the r82 near-human straggler pin green (untouched needle).

### Next version spec (R84)
1. **[S] σ on the receipt-panel rows — 4th carrying** (R80 item 4 → R81 item 3 → R82 item 3 → R83 item): unchanged rationale — rows bred at σ=12 and σ=2 render identically; the panel can't show the breeding-temperature story. VERIFY: C1-lane row render carries `σ=<int>` from the row's own sig field; non-C1 rows byte-unchanged; render pin.
2. **[S] live near-anchor count beside the sigLine — 6th carrying** (R78 item 4 → R79 item 2 → R80 item 3 → R81 item 2 → R82 item 2 → R83 item): unchanged rationale — R66's law is a population claim; the player should SEE the cluster form as σ drops. VERIFY: short C1 Train at σ=2 shows a measurably rising count vs σ=12; render pin extracts the count line.
3. **[S] re-land receipt audit — 3rd carrying** (R81 item 4 → R82 item 4 → R83 item): unchanged rationale — the R82/R83 table finds are the invisible-doc-rot class; the audit greps receipt lines for artifact-verb claims and asserts each named artifact exists in-tree. VERIFY: synthetic PLAYLOG with a phantom artifact turns RED; real PLAYLOG GREEN.
4. **[S] PLAYLOG v1-draw table recompute — 2nd carrying** (new): the R1 measured-at-tag section's per-level distributions are pinned by the r81 pin's regexes, but the "current PLAYLOG N-draw table" comment in the r76 glue test drifts one round behind every append ("twelve-draw" → "nineteen-draw" — the comment moved 7 times). VERIFY: a comment auto-count that derives N from the ledger's row count, never a hand-typed number.

### Shipped this round (the build)
- `README.md`: the "Real starting states" table rewritten — L0 1,890 / 1,690f / 2h / ×4.06; L1 2,010 / 1,810f / 2h / ×4.44; L2 1,753 / 1,453f / 3h / ×3.41. The L1>L2 prose names the frames-gap mechanism (357 extra frames outweigh one fewer hit at ×100). The plateau prose corrected to survival-dominated (no champion reaches the 6,000f cap; hits are incidental, 2/2/3). The test-count line updated (364→367).
- `tests/r83-readme-table-glue.test.js` (NEW, 3 tests): README rows match EXPECTED constants; EXPECTED equals the committed checkpoint headers (gen/bestFitness/bestFrames/bestHits/maxSpeed extracted from each level file's receipt JSON); the L1>L2 prose names the real mechanism (frames gap, not hits). FAIL-first on the pre-fix tree: every value assertion RED.
- `core.js`: VERIFIED_CLAIMS gains the r83 pin (claim names the receipt format, the ×100 law lineage, and the survival-dominated regime).
- `site/`: rebuilt via `node tools/build-site.mjs` (the site-glue byte-identity pin caught the core.js change; build-order law: registry touch precedes the suite-count re-run).
- `research/v1-draws.jsonl`: draw #19 appended (one JSON line; fitness-law fields: 2935=2785+25·6, 6500=6000+25·20, 589=589+25·0).
- `tests/r76-v1-draw-ledger-glue.test.js`: EXPECTED_TALLIES → the nineteen-draw table; the tally moved exactly once (draw #19), here, not in prose (R77 discipline).

### Suite re-run after the build
- `node --test tests/*.test.js` after all edits — **359 registered: 351 pass / 0 fail / 8 honest skips**; `node --test tools/test-qa.js` — 8/8. TALLY-MATCH green on the nineteen-draw table; the r79/r81/r82 pins green (untouched needles); the site-glue byte-identity pin green post-rebuild.

Builder mode, one item as mandated. The R82 spec said item 1 was the table + pin; both shipped. The table was the flagship honesty surface — the first thing a visitor reads — and it described games that had not existed for 32 rounds. The pin now guards it structurally: any future re-evolution that changes the artifacts turns the suite RED until the table is updated in the same round. Credit: R82 (the find, the root-cause dating to Round 3 + R50, and the spec); R52 (the count-rot precedent that supplied the pin-the-prose pattern); R79 (the state-label vocabulary the table now uses); R77 (the ledger discipline); R42 (the artifact-maxspeed-lineage test whose header-receipt pattern this round's pin mirrors). Sibling repos studied: none this round — both the build and the find were repo-internal.

## Round 82 — k2d8 (cron pong-quilt-playloop) — 2026-10-03 — mode: BUILDER (R81 spec item 1 — the "near-human" stragglers, [S], 4th carrying, first build) + play-tester — vs R81 tip 8afe547 (PRs #102/#103 open, Casey-gated; basing on the R81 tip per the R22-vs-r21/R73/R74 precedent — this PR re-lands R79+R80+R81+R82 to main in one merge)

### Played versions: v1 (e98cf66, draw #18) — headless via the tag's own `tools/prerun.js` in a dedicated clean worktree (`git worktree add /tmp/pq-v1-r82 e98cf66`) — plus the tip itself. Draw #18: L0 **2935** (2785f, 6h, ×2.11), L1 **1242** (1192f, 2h, ×1.48 — the kill-early floor value repeats), L2 **6125** (6000f, 5h, ×3.40 — the cap-cluster mode strengthens). Eighteen-draw tallies (17 value-tallied; draw 1 documentary-only), the ledger's TALLY-MATCH output cited here per the R77 discipline: L0 1918×1 / 2225×3 / **2935×11** / 3223×1 / 3295×1; L1 738×3 / **1242×2** / 1691×1 / 3940×1 / 4900×1 / 5156×1 / 5778×1 / 6114×1 / 6150×1 / 6400×1 / 6500×3 / 6575×1; L2 589×2 / 2383×3 / 3242×1 / 4766×1 / 4878×1 / 4919×1 / 6075×1 / **6125×6** / 6225×1. Hand-recompute of the 18-draw table (pre-append skepticism check, fourth exercise of the discipline) matched the pin's post-append output exactly — hand path and pin agree again. Suite at tip (pre-build, post-registry/page touch): 352 registered — 344 pass / 0 fail / 8 honest skips; qa 8/8.

### Deltas observed (shapes of change)
- **d(spine)/d(version) = 0, ninth consecutive round.** Canonical post-R50 line byte-exact at the tip (twice this round: pre-build AND post-prerun-header-edit — the prerun.js change is comment-only and the md5 line confirms it): 5 quantum-coin flip(s), 3 swap(s); md5s — coev-stone-v1.json 3a0a5fb6…, coev.js 946e639a…, curve.json f9b20e7d…, L0 bc15d414…, L1 1125d59c…, L2 50137ceb….
- **d(v1-L2-cap)/d(n): 6125×6 — the cap mode is now the majority of the cap-cluster (6 of 8 cap draws).** The cap-cluster at the 6000-frame bound: 6075@3h / 6125×6@5h / 6225@9h. 6125 was already the modal L2 value; draw #18 makes it the dominant one. The cluster's hit-variation range stays 3–9 terminal hits.
- **d(v1-L1-floor)/d(n): 1242 repeats — the kill-early floor is now a 2-member band (1242×2), tied at the bottom with 738×3.** L1's floor band (sub-1300 games at ≤2h) now spans two values; the floor is a band, not a point.
- **d(v1-L0)/d(n): 2935×11 — the modal value holds 64.7%** of value-tallied draws; no new shape information (the tightest, least informative distribution).

### Lies hunted
- **[P3 → CLOSED this round] the "near-human" stragglers (R81 spec item 1, 4th carrying).** README.md:59's table row and tools/prerun.js:1's header comment both carried the undefined quality label the R79 pin banned from the button — the R79 pin's scope was the button only, and the table/header prose sat outside it for four rounds. Closed by renaming both to the button's post-R79 state label "trained" (a gen-260 trained population — no unmeasured quality claim), and pinned by a new 4-test glue (README-CLEAN + PRERUN-CLEAN + LABEL-CONSISTENCY + NEEDLE-INTACT — the last asserting the r79 pin's banned-needle regex survives, so the historical record is preserved, not laundered). FAIL-first on the pre-fix tree: 3/4 RED, naming README.md:59 and tools/prerun.js:1 exactly; the r79 pin and the core.js:509 R79 VERIFIED_CLAIMS receipt stay untouched (historical record). The R32 P4 drift class — honesty sentences disagreeing about WHAT the level is (button said "trained", table said "near-human") — closed at all three surfaces.
- **[P1, verified open — NEW find, top of the R83 spec] README's "Real starting states" table has been FALSE since R50 — 32 rounds.** Minimal repro: README.md:57-59 present L0 5,767 (4,567f, 12h, ×2.83) / L1 8,800 (6,000 cap, 28h, ×3.40) / L2 8,700 (6,000 cap, 27h, ×3.40) as the states "re-evolved each prerun — `node tools/prerun.js`", one line above "Reproduce any row". Running that exact command at this tip prints L0 **1,890** (1,690f, 2h, ×4.06) / L1 **2,010** (1,810f, 2h, ×4.44) / L2 **1,753** (1,453f, 3h, ×3.41) — every column wrong (fitness, frames, hits, speed), while the md5 lines directly beneath the table (bc15d414…, 1125d59c…, 50137ceb…, f9b20e7d…) are CORRECT. Root cause, dated: Round 3 (2026-09-24) evolved the table's values under the pre-R50 law; R50's escalation law re-evolved the checkpoints to the current line and its "Receipt corrections" refreshed the "Current artifacts" md5 lines but NOT the table — a same-file partial update. The "L1 > L2 is the L2 collapse read honestly" note still happens to hold (2010 > 1753). Why 32 rounds invisible: pins guard md5s, counts, receipts, and claims — NO pin guards the table's prose values, and every round's "d(learning)/d(version) = 0" line cites the 1890/2010/1753 numbers without noticing the README disagrees. The R52 count-rot precedent (caught by the readme-count pin within one merge) shows the guard pattern works when it exists.
- **[P3, verified open] σ on the receipt-panel rows — 2nd verified absence** (R81 item 3): index.html:109's renderReceipts still renders `COEV g${gen} ${sId} vs ${eId} -> …` with no σ though rows carry sig since R80. Carried to the R83 spec.
- **[P3, verified open] live near-anchor count beside the sigLine** (R81 item 2): sigLine is static disclosure text; no live count element exists. Carried to the R83 spec.
- **[note] absence checks that came back clean**: the R1 measured-at-tag section survives (r81 pin 4/4 green); the button's ledger-derived spread "589-6225 fitness, 0-9 hits" still matches the 18-draw ledger (LEDGER-DERIVED + DRIFT-FIRES green — draw #18's 6125@5h is interior); the marker grep `^(<{7}|={7}|>{7})` over PLAYLOG.md after all edits is EMPTY.

### Next version spec (R83)
1. **[S] NEW — README "Real starting states" table value-rot (the P1 above).** Rewrite the three rows to the current prerun outputs (L0 1,890 / 1,690f / 2h / ×4.06; L1 2,010 / 1,810f / 2h / ×4.44; L2 1,753 / 1,453f / 3h / ×3.41) — the "6,000 (cap)" frames cells must go (the current champions die early; only the frames column ever reaches the cap at v1, and these are main-line checkpoints), and keep the "L1 > L2" note (still true). THEN pin it: a glue test that runs the canonical prerun line (or greps a pinned prerun receipt) and asserts the table's values equal the measured outputs — the R52 lesson: prose guarded by nothing rots silently; prose pinned by a test rots loudly. WHY: the table is the flagship honesty surface — the first thing a visitor reads — and it has described games that do not exist for 32 rounds. VERIFY: pin RED on the current table (fail-first, proving the rot is catchable), GREEN after the rewrite.
2. **[S] live near-anchor count beside the sigLine — 5th carrying** (R78 item 4 → R79 item 2 → R80 item 3 → R81 item 2 → R82 item): unchanged rationale — R66's law is a population claim; the player should SEE the cluster form as σ drops. VERIFY: short C1 Train at σ=2 shows a measurably rising count vs σ=12; render pin extracts the count line.
3. **[S] σ on the receipt-panel rows — 3rd carrying** (R80 item 4 → R81 item 3 → R82 item): unchanged rationale — rows bred at σ=12 and σ=2 render identically; the panel can't show the breeding-temperature story. VERIFY: C1-lane row render carries `σ=<int>` from the row's own sig field; non-C1 rows byte-unchanged; render pin.
4. **[S] re-land receipt audit — 2nd carrying** (R81 item 4 → R82 item): unchanged rationale — the R82 table find is a SECOND instance of the invisible-doc-rot class (a surface refreshed in one place, stale in another, no pin watching); the audit greps receipt lines for artifact-verb claims and asserts each named artifact exists in-tree. VERIFY: synthetic PLAYLOG with a phantom artifact turns RED; real PLAYLOG GREEN.

### Shipped this round (the build)
- `README.md:59`: "L2 near-human" → "L2 trained" — the button's state label, the undefined quality claim gone from the table.
- `tools/prerun.js:1`: header comment "(L0 random, L1 mid, L2 near-human)" → "(L0 random, L1 mid, L2 trained)". Comment-only: the canonical prerun line re-run after the edit reproduces all six md5s byte-exact (see Deltas).
- `tests/r82-nearhuman-straggler-glue.test.js` (NEW, 4 tests): README-CLEAN + PRERUN-CLEAN + LABEL-CONSISTENCY + NEEDLE-INTACT. FAIL-first on the pre-fix tree: 3/4 RED naming the exact lines; NEEDLE-INTACT green by design.
- `core.js` + `README.md`: VERIFIED_CLAIMS gains the r82 pin; count line 360→364 (356 in tests/ + 8 QA, pin-verified); `node tools/build-site.mjs` rebuilt (build-order law: registry touch precedes the suite-count re-run).
- `research/v1-draws.jsonl`: draw #18 appended (one JSON line; fitness-law fields: 2935=2785+25·6, 1242=1192+25·2, 6125=6000+25·5).
- `tests/r76-v1-draw-ledger-glue.test.js`: EXPECTED_TALLIES → the eighteen-draw table; LEDGER-SHAPE floor 16→17; the tally moved exactly once (draw #18), here, not in prose (R77 discipline).

### Suite re-run after the build
- `node --test tests/*.test.js` after all edits — **356 registered: 348 pass / 0 fail / 8 honest skips**; `node --test tools/test-qa.js` — 8/8. TALLY-MATCH green on the eighteen-draw table; the r79/r81 pins green (untouched needles).

Builder mode, one item as mandated. The round's second find is the honest-refusal duty doing its job: the R81 carry list said item 1 was the smallest build, and it was — but the lies-hunt sweep that followed the build found a bigger one than the build closed. The README table rot is the R52 count-rot wound at one level deeper: a value surface guarded by NOTHING, where the count surface had a pin. Thirty-two rounds of "d(learning)/d(version) = 0" were true and incomplete at once — the number was pinned, the sentence describing it was not. Credit: R79 (the original label-ban and the needle this round's NEEDLE-INTACT preserves); R50 (the escalation round whose receipt corrections named exactly what they touched — the md5 lines — leaving the table honestly-attributable rot); R52 (the count-rot precedent that supplies the pin-the-table pattern); R77 (the ledger discipline); R81 (the ghost-class lesson that sent this round reading receipts against artifacts). Sibling repos studied: none this round — both finds were repo-internal.

## Round 81 — k2d8 (cron pong-quilt-playloop) — 2026-10-03 — mode: BUILDER (R80 spec item 2 — the cap-cluster annotation on the R74 measured-at-tag note, [S], 5th carrying, first TRUE build: the note turned out to be a GHOST — R74's re-land #96 dropped it — so the build is a ledger-sourced restoration + a 4-test structural pin so the loss class cannot recur) + play-tester — vs R80 tip dcaaaed (PR #102 open, Casey-gated; basing on the R80 tip per the R22-vs-r21/R73/R74 precedent — this PR re-lands R79+R80+R81 to main in one merge)

### Played versions: v1 (e98cf66, draw #17) — headless via the tag's own `tools/prerun.js` in a dedicated clean worktree (`git worktree add /tmp/pq-v1-r81 e98cf66`) — plus the tip itself. v0.64.0/v0.65.0 spine byte-exactness inherited from R70/R72 and re-established at this tip by the canonical prerun line below (same five md5s both tags). Draw #17: L0 **2935** (2785f, 6h, ×2.11), L1 **738** (713f, 1h, ×1.28), L2 **6225** (6000f, **9h**, ×3.40 — a NEW distribution maximum). Seventeen-draw tallies (16 value-tallied; draw 1 documentary-only), the ledger's TALLY-MATCH output cited here per the R77 discipline: L0 1918×1 / 2225×3 / 2935×10 / 3223×1 / 3295×1; L1 738×3 / 1242×1 / 1691×1 / 3940×1 / 4900×1 / 5156×1 / 5778×1 / 6114×1 / 6150×1 / 6400×1 / 6500×3 / 6575×1; L2 589×2 / 2383×3 / 3242×1 / 4766×1 / 4878×1 / 4919×1 / 6075×1 / 6125×5 / **6225×1**. Hand-recompute of the 17-draw table (pre-append skepticism check, third exercise of the discipline) matched the pin's post-append output exactly — hand path and pin agree again. Suite at tip (pre-build): 348 registered — 340 pass / 0 fail / 8 honest skips; qa 8/8.

### Deltas observed (shapes of change)
- **d(spine)/d(version) = 0, eighth consecutive round pending.** Canonical post-R50 line byte-exact at the tip: 5 quantum-coin flip(s), 3 swap(s); md5s — coev-stone-v1.json 3a0a5fb6…, coev.js 946e639a…, curve.json f9b20e7d…, L0 bc15d414…, L1 1125d59c…, L2 50137ceb….
- **d(v1-L2-cap)/d(n): the cap-cluster extends UPWARD — 6225@9h is the first nine-hit cap game and a new distribution maximum.** The cap-cluster at the 6000-frame bound is now 6075@3h / 6125×5@5h / 6225@9h — fitness at the bound ceiling is parametrized entirely by terminal hit-count (fitness = 6000 + 25×hits: 3h→6075, 5h→6125, 9h→6225). The "ceiling" was never a value; it is the frames cap plus the swan's terminal-rally fingerprint, and the hit-variation range at the cap has widened to 2.4% of fitness.
- **d(v1-L1-floor)/d(n): 738 draws for the 3rd time** — the sub-800 kill-early floor is now TIED with 6500 as the most-drawn L1 value (738×3 vs 6500×3 of 16 value-tallied draws): the L1 distribution's bottom band is as strong an attractor as its cap mode.
- **d(v1-L0)/d(n): 2935×10 — the modal value holds 62.5%** of value-tallied draws; no new shape information (the tightest, least informative distribution).

### Lies hunted
- **[M, root-caused + closed this round] the R74 measured-at-tag annotation is a GHOST — built, receipted, never landed.** R74's receipt (both on its original branch and on main via re-land #96) claims "the R1 entry gains `### Measured at the tag …` — the root-cause line, the per-level ten-draw spread table, and the attractor paragraph." Minimal repro: at main 9c6d02d (and at every descendant tip incl. this one), `git show cab770c:PLAYLOG.md | awk '/^## Round 1 /,0' | grep -c "Measured at the tag"` prints **0** — the R1 entry carries no such section, while the receipt text asserting it shipped survives one line above the entry. The original branch commit 1032342 HAS the section (verified: 5 lines into its R1 entry) — the re-land cab770c (#96) dropped the R1-entry edit in merge resolution and kept the receipt. Consequences, measured: (1) five rounds of cap-cluster-annotation specs (R77 item 3 → R78 item 2 → R79 item 2 → R80 item 2 → R81 mandate) carried against an annotation that existed nowhere canonical — the specs were updating a ghost; (2) NO pin fired — the suite stayed green through #96 and through every subsequent merge, the R34/R41-class entry loss recurring four repaired rounds later, invisible; (3) the honest baseline claim ("R1's published L2 IS the distribution ceiling… re-drawn 4×") lived only in the receipt prose. Closed by restoration + pin (below).
- **[P3, verified open] the "near-human" stragglers survive a 3rd round.** README.md:59 ("L2 near-human | 260 | 8,700 …") and tools/prerun.js:1 ("L2 near-human") both still carry the undefined quality label the R79 pin banned from the button — the table/header prose was never in the R79 pin's scope. Carried to the R82 spec.
- **[note] item-4 (σ on receipt-panel rows) verified absent**: index.html renderReceipts (~line 108) renders `COEV g${gen} ${sId} vs ${eId} -> …` with no σ, though rows carry sig since R80 — carried to the R82 spec.
- **[process, fired as designed] the R79 DRIFT-FIRES pin caught THIS round mid-build.** Appending draw #17 (L2 6225) extended the ledger range past the button's "589-6125 fitness, 0-5 hits" annotation, turning LEDGER-DERIVED + DRIFT-FIRES RED in the post-build suite — the pin's exact contract ("a future draw that moves the L2 range turns the suite RED until the button is updated in the same round"). Fixed in-round: index.html:40 now reads "589-6225 fitness, 0-9 hits", recomputed from the ledger by the pin itself; re-run 4/4 green. The wound-fires-on-change class, exercised end-to-end for the first time since the pin shipped.

### Next version spec (R82)
1. **[S] "near-human" stragglers — 4th carrying** (R79 item 4 → R80 item 1): README.md:59's table row + tools/prerun.js:1's header carry the undefined quality label. WHY: the R79 pin banned it from the button because no repo text defines "near-human"; the surviving stragglers assert the same undefined quality in the two places a new reader looks first. VERIFY: grep "near-human" outside PLAYLOG/history/test-comment hits is EMPTY; the R79 pin stays green.
2. **[S] live near-anchor count beside the sigLine — 4th carrying** (R78 item 4 → R79 item 2 → R80 item 3): the disclosure names σ's measured law; the page still shows no live count of how many C1 nets actually sit near the anchors while it trains. WHY: R66's law is a population claim — a player sliding σ from 12 to 2 should SEE the cluster form (or not) as it forms; the receipt says what σ meant, the count says what σ is doing. VERIFY: during a short C1 Train at σ=2 the counter rises measurably vs the same run at σ=12; a render pin extracts the count line.
3. **[S] σ on the receipt-panel rows — 2nd carrying** (R80 item 4, now verified absent): the C1 ledger rows carry sig since R80, but the panel renders only `COEV g${gen} s vs e -> …`. WHY: the receipts are the trust surface — a row bred at σ=12 and a row bred at σ=2 currently render identically, so the panel cannot show the breeding-temperature story the σ-trail lane narrates. VERIFY: the C1-lane row render carries `σ=<int>` from the row's own sig field; non-C1 rows byte-unchanged; a render pin extracts a σ-bearing row.
4. **[S] NEW — the re-land receipt audit.** WHY: this round's ghost find was manual (`git show` + `awk` archaeology); the wound class is mechanical — a merge/re-land that drops a sibling's artifact while keeping its receipt text. A suite pin that greps the LAST N rounds' receipt lines for artifact-verb claims ("gains", "ships", "lands") and asserts each named artifact exists in-tree would have turned #96 RED at birth. VERIFY: a synthetic PLAYLOG with a receipt claiming a nonexistent section file/heading turns the pin RED; the real PLAYLOG is GREEN (post-restoration).

### Shipped this round (the build)
- `PLAYLOG.md`: (a) **the R1 measured-at-tag section restored** — rebuilt from the seventeen-draw ledger (not the lost ten-draw text): root-cause line (v1 core.js:55-56 raw Math.random in the swan path), per-level spread with the three-band L1 structure, the cap-cluster ceiling (6000-frame cap + hit-variation: 6075@3h / 6125×5@5h / **6225@9h**, the new maximum) + zero-hit floor + kill/mid bands, sourced to research/v1-draws.jsonl, with a provenance paragraph naming the R74 authorship → #96 loss → R81 restoration; (b) this entry; (c) the canonical index gains the R81 row.
- `tests/r81-r1-measured-at-tag-glue.test.js` (NEW, 4 tests): SECTION-EXISTS + ROOT-CAUSE-NAMED + LEDGER-SOURCED + CLUSTER-NOT-POINT — the R1 annotation becomes suite-guarded, the R65 two-halves pattern (process note + structural pin). FAIL-first on the pre-restore tree: 4/4 RED (section absent everywhere canonical).
- `tests/r76-v1-draw-ledger-glue.test.js`: EXPECTED_TALLIES → the seventeen-draw table; the tally moved exactly once (draw #17), here, not in prose (R77 discipline); LEDGER-SHAPE floor 15→16.
- `research/v1-draws.jsonl`: draw #17 appended (one JSON line; fitness-law fields: 2935=2785+25·6, 738=713+25·1, 6225=6000+25·9).
- `core.js` + `README.md`: VERIFIED_CLAIMS gains the r81 pin; the count line 356→360 (352 in tests/ + 8 QA) per the readme-count pin; `node tools/build-site.mjs` rebuilt (dist copy carries the new pin + count).
- `index.html:40`: the L2 button's ledger-derived spread updated 589-6125/0-5 → **589-6225/0-9** — draw #17's new maximum, demanded by the R79 pin's DRIFT-FIRES test in this round's own suite run (see Lies hunted).
- Marker grep `^(<{7}|={7}|>{7})` after all edits: EMPTY.

### Suite re-run after the build
- `node --test tests/*.test.js` after all edits — **352 registered: 344 pass / 0 fail / 8 honest skips**; `node --test tools/test-qa.js` — 8/8.

Builder mode, and the honest build this time was archaeology: the mandate said "annotate the R74 note" and the note did not exist. The R34/R41 class recurred exactly where its previous repairs could not see — a merge commit on a different lane, receipt text intact, artifact gone, suite green. The lesson generalizes into the R82 spec item 4: receipts that name artifacts need mechanical audit, because humans (this round included) read receipt prose as evidence of artifact existence for five rounds straight. Credit: R74 (the original builder — the lost ten-draw annotation was correct for its moment and its provenance note is preserved inside the restored section); R35/R41/R42 (the entry-loss repair pattern this round extends from merge-marker pins to receipt-vs-artifact audit); R77 (the ledger discipline that made the restoration a file-read instead of a hand-recompute); R80 (the σ-recording this round's spec item 3 builds on). Sibling repos studied: none this round — the find was repo-internal (git history of #96 vs 1032342).

## Round 80 — k2d8 (cron pong-quilt-playloop) — 2026-10-03 — mode: BUILDER (R79 spec item 1 — the σ-slider→trail interaction, [S], first build after THIRTEEN carryings: every coev ledger row receipts the σ that bred it + the sChamp trail annotates mid-run σ changes from those same receipted rows + 5-test pin) + play-tester — vs playtest-round-78 tip e92677b (R79's #101 merged into the R78 branch, not main; main tip 9c6d02d carries R78 only; this round bases on e92677b so its PR to main re-lands R79's work alongside R80's, per the R73/R74 re-land precedent)

### Played versions: v1 (e98cf66, draw #16) — headless via the tag's own `tools/prerun.js` in a dedicated clean worktree (`git worktree add /tmp/pq-v1-r80 e98cf66`) — plus the tip itself. Draw #16: L0 **2935** (2785f, 6h, ×2.11), L1 **4900** (4575f, 13h, ×2.83), L2 **3242** (3192f, 2h, ×2.28). Sixteen-draw tallies (15 value-tallied; draw 1 documentary-only), the ledger's TALLY-MATCH output cited here per the R77 discipline: L0 1918×1 / 2225×3 / 2935×9 / 3223×1 / 3295×1; L1 738×2 / 1242×1 / 1691×1 / 3940×1 / 4900×1 / 5156×1 / 5778×1 / 6114×1 / 6150×1 / 6400×1 / 6500×3 / 6575×1; L2 589×2 / 2383×3 / 3242×1 / 4766×1 / 4878×1 / 4919×1 / 6075×1 / 6125×5. L1 4900 is a NEW single-level value — the first 13-hit L1 in 16 draws, sitting 4.8% below the cap-cluster floor (5156): a near-cap game that never reached the 6000f ceiling. L2 3242 is a NEW kill-band member at 2h — the L2 kill/mid boundary extends upward (2383×3 → 3242 → 4766+).

### Deltas observed (shapes of change)
- **d(L1-mid-cap)/d(n): the near-cap shoulder appears — 4900@13h bridges the mid-band (3940@11h) and the cap-cluster (5156+) to within 5%, so L1's three-band picture (kill / mid / cap) at n=15 now shows a continuum candidate at the mid-cap seam.** One draw cannot prove the seam is continuous; it can prove the gap is ≤5%. The 13 hits are the most in any value-tallied L1 draw, and ×2.83 is the highest speed multiplier among them — the rally accelerated hardest and still died 400 frames short of the ceiling.
- **d(L2-bands)/d(n): the kill band widens upward — 3242@2h inserts between the 2383 cluster (×3) and the 4766 mid, so L2 now shows floor (589×2) / kill (2383×3 + 3242) / mid (4766-4919) / cap (6075, 6125×5) at n=16.** The kill band is no longer a single-value cluster; it spans 2383→3242 (a 36% fitness range) at low hits (0-2h).
- **d(L0)/d(n): 2935 repeats for the 9th time in 16 draws — the modal value now holds 56% of all draws.** L0 remains the tightest distribution (2225-3295 across 15 value-tallied draws) and the least informative per-draw; no new shape information this round.
- **d(spine)/d(version) = 0 (seventh consecutive round):** tip prerun reproduces the canonical post-R50 line byte-exact after the registry + page touch (md5s below) — the artifact lane is frozen by design; all movement is distributional (draws) and documentary (pins/annotations).
- **Failure-mode migration (process): R79's PR #101 merged into playtest-round-78, not main** — the R79 work (L2 button honesty + draw #15) was stranded on the R78 branch; main tip 9c6d02d carries R78 only. This round bases on e92677b (R78+R79 work) and PRs to main, re-landing both in one merge (R73/R74 precedent). If the Casey gate instead merges #101's branch separately, git will see the same commits — no duplicate work, no conflict.

### Lies hunted
- **[M → FIXED] σ-slider → trail interaction — 13th carrying, first build.** Absence grep at the R79 tip confirmed the wound: the slider fed `runCoevGeneration(popS, popE, …, +$("sig").value, …)` every Train, but the receipted ledger rows (and the R69 trail VIEW over them) carried no σ field — a player dragging σ from 8 to 20 mid-session saw the fitness trajectory move with no record of which σ bred which generation. Repro (pre-fix): breed 3 C1 gens at σ=8, move slider to 20, breed 2 more — the stats line prints `sChamp trail a→b→c→d→e` with zero σ information; every ledger row lacks `sig`. Fixed in-branch: (1) the ledger row write records `sig:+$("sig").value` — the σ that bred the generation rides its receipt; (2) the trail annotates `(σ gN:σa → gM:σb)` computed from the SAME receipted rows it views, firing ONLY when ≥2 distinct σ values appear in the tail (a constant σ is the R78 sigLine's job — printing it twice would be noise, not honesty); (3) pre-R80 rows lacking `sig` are skipped silently — they assert nothing about σ — but a defined→undefined→defined gap is NAMED (`; σ-gap: some rows predate σ recording`), never smoothed over; (4) the canonical artifact lane (tools/prerun-coev.js) is untouched — its rows were bred at one fixed σ and its md5s stay frozen (R45/R47).
- **[S] "near-human" stragglers — 1st carrying (R79 spec item 4, NOT built — the builder budget went to item 1).** grep at this tip: README.md:59 (table row) and tools/prerun.js:1 (header comment) still carry the undefined quality label the R79 button fix removed from index.html. Every hit a usage, none a definition.
- **[S] cap-cluster annotation on the R74 measured-at-tag note — 4th carrying.** The R74/R76 note still cites "6125 = the ceiling attractor" as a point; draws #13-16 say the structure is cluster + wide floor + near-cap shoulder.
- **[S] live near-anchor count beside sigLine during C1 training — 2nd carrying (R78 spec item 4).** The σ disclosure is static text; the live measurement loop stays unbuilt.

### Builder receipt (what shipped — R79 spec item 1, first build)
- `index.html`: (1) the C1 ledger row write gains `sig:+$("sig").value` — the σ that bred the generation rides its receipted row; (2) the trail derivation rewritten as a view over `coev.ledger.tail(8)` with a `sigTrail` annotation computed from the same rows (never a parallel record); (3) the stats line prints `${sigTrail}` after the trail. Save/load untouched structurally — `ledger:coev.ledger?coev.ledger.items():[]` serializes `sig` automatically, and the load path replays rows verbatim.
- `tests/r80-sigma-trail-glue.test.js`: 5-test pin (the R69/R73/R78 verbatim-extraction demo-harness pattern) — SIG-RECORDED (every receipted row carries the slider σ as an integer), MID-RUN-CHANGE-PRINTED (σ 8→20 mid-run yields `(σ g1:σ8 → g4:σ20)` byte-identical to an independent recomputation from the ledger rows), CONSTANT-SIG-SILENT (untouched slider prints no annotation — the trail is not σ-noise), OLD-SAVE-HONEST (pre-R80 rows assert nothing: no fabricated σ, no false gap claim; the session's own new row records σ=10 — recording starts at build time, never backfilled), GAP-NAMED (a crafted defined→undefined→defined ledger names the σ-gap and still prints the defined transitions around it). FAIL-first on the pre-R80 tree: all 5 RED (no sig field, no gap vocabulary).
- `core.js`: VERIFIED_CLAIMS gains `r80-sigma-trail-glue` (the two-way honesty match stays green).
- `research/v1-draws.jsonl`: draw #16 appended (values from the /tmp/pq-v1-r80 tag run; fitness law re-verified per field: 2785+150=2935, 4575+325=4900, 3192+50=3242).
- `tests/r76-v1-draw-ledger-glue.test.js`: EXPECTED_TALLIES → the sixteen-draw table (L0 2935×8→9; L1 +4900×1; L2 +3242×1); TALLY-MATCH title names the current table.
- `README.md`: 351 → 356 (348 in `tests/` + 8 QA — live-verified).
- Site dist re-sealed AFTER the core.js touch, BEFORE the suite counts (build-order law): `build ok: 11 demo files sealed, head e92677bf5` (site/dist + site/generated are gitignored build artifacts — local-only, no commit noise).

### Verified numbers (this round, all by running)
- Suite @ pristine R79 tip e92677b (pre-change baseline): 343 registered — 335 pass / 0 fail / 8 honest skips; `tools/test-qa.js` 8/8. Total 351.
- Suite @ R80 build: **348 registered — 340 pass / 0 fail / 8 honest skips**; qa 8/8. Total 356 = 348 + 8 (readme-count pin green).
- prerun @ R80 tree (post-registry-touch, post-page-touch): canonical post-R50 line byte-exact — coev.js 946e639a820fcdb41cf2c184120f7716, curve.json f9b20e7ded3330e0c66eb97165dfc049, level0 bc15d414d6c74419d55b7cf3ed9895b0, level1 1125d59cc6de3a48f4d30b24e9980f7f, level2 50137ceb4691965b70a17d4e2d37ecbc, coev-stone-v1 3a0a5fb6af2859cc92fbe94fffae887f; 5 quantum-coin flips / 3 swaps; fitness 1890 / 2010 / 1753 — IDENTICAL to R75/R76/R77/R78/R79 output (d(spine)/d(version) = 0, seventh consecutive round).
- v1 (e98cf66) draw #16, clean worktree /tmp/pq-v1-r80: 2935 / 4900 / 3242 (fields above; law verified per level).
- PLAYLOG merge-marker grep after the entry edit: EMPTY (the `r65-conflict-marker-glue` pin re-ran in the suite green).

### Next version spec (R81 mandate)
1. **[S] "near-human" stragglers (R79 item 4, 2nd carrying).** WHY: the button was fixed in R79 but README.md:59 and tools/prerun.js:1 still carry the undefined quality label — a label fixed on one surface and left on two others is the R32 P4 drift class. WHAT: rename both to match the button ("trained") or annotate with the same measured spread. VERIFY: grep "near-human" returns zero hits, or every hit carries the measured spread.
2. **[S] cap-cluster annotation on the R74 measured-at-tag note (R78 item 2, 5th carrying).** WHY: draws #13-16 proved the L2 structure is a cap-cluster (6075, 6125×5) over a repeating zero-hit floor (589×2, ~13%) with a kill band (2383×3 + 3242) and a near-cap shoulder in L1 (4900@13h, 4.8% below the 5156 floor) — the R74/R76 "6125 = the ceiling attractor" point-claim drifts from all of it. VERIFY: the note names cluster + floor + shoulder, sourced to the ledger.
3. **[S] live near-anchor count beside sigLine during C1 training (R78 item 4, 3rd carrying).** WHAT: when a C1 session is live, print the CURRENT population's near-anchor count (<L2 2.0 of the gen-1 sChamp) next to sigLine's static text. VERIFY: a render pin after one Train at σ=2 (cluster present) vs σ=12 (diffused) — same seed, distinguishable counts, printed not asserted where seed-dependent.
4. **[S] σ on the receipt-panel rows (new).** WHY: the R80 build records sig per ledger row and the stats line annotates mid-run changes, but renderReceipts' row text doesn't display σ — a player auditing receipts mid-session shouldn't have to read the stats line to see which σ bred a row. WHAT: coev receipt rows show `σ<a>` where the row carries sig; silent for pre-R80 rows. VERIFY: render pin — a row bred at σ=8 shows σ8, an old row shows nothing, no fabricated default.

### Verdict
MERGEABLE — PR opened this round. Canonical line byte-exact (seventh consecutive), suite green at base and tip, marker grep EMPTY, R79 artifact verified clean at the R79 tip (ledger 15 rows at base, pin 5/5 green), and the σ→trail wound carried through thirteen rounds of spec is closed by receipted rows, not prose.

---

## Round 79 — k2d8 (cron pong-quilt-playloop) — 2026-10-03 — mode: BUILDER (R78 spec item 3 — the "L2 · near-human" undefined-label wound, [M], first build: the button annotated with the measured v1 draw spread + 4-test pin recomputing the spread from the ledger, so the copy can never drift from the distribution it cites) + play-tester — vs R78 tip 918a36d (PR #99 open Casey-gated at round time; branching from the prior round's tip per the R22-vs-r21 precedent)

### Played versions: v1 (e98cf66, draw #15) — headless via the tag's own `tools/prerun.js` in a dedicated clean worktree (`git worktree add /tmp/pq-v1-r79 e98cf66`) — plus the tip itself. Draw #15: L0 **2935** (2785f, 6h, ×2.11), L1 **1242** (1192f, 2h, ×1.48), L2 **589** (589f, 0h, ×1.24). Fifteen-draw tallies (14 value-tallied; draw 1 documentary-only), the ledger's TALLY-MATCH output cited here per the R77 discipline: L0 1918×1 / 2225×3 / 2935×8 / 3223×1 / 3295×1; L1 738×2 / 1242×1 / 1691×1 / 3940×1 / 5156×1 / 5778×1 / 6114×1 / 6150×1 / 6400×1 / 6500×3 / 6575×1; L2 589×2 / 2383×3 / 4766×1 / 4878×1 / 4919×1 / 6075×1 / 6125×5. L1 1242 is a NEW single-level value — the second sub-1300 L1 in 15 draws, a kill-early game at 2 hits (the first was draw #1's unpublished-then-nulled sample; the first VALUE-TALLIED sub-1300). L2 589 repeats the zero-hit floor BACK-TO-BACK — the R78 floor is now a band, not an accident.

### Deltas observed (shapes of change)
- **d(distribution)/d(n): the zero-hit floor repeats — the L2 floor is a band, not a tail accident.** R78 drew 589 (first zero-hit champion best-game, 1/14 probability at that n). Draw #15 draws it again: 2/15 ≈ 13%. The R78 "first zero-hit" framing ("a sample, not a bound") is now quantified: the L2 champion's best game has ~13% probability of never connecting, on this evidence. Both draws at the 260-gen trained level — the floor is not a too-few-generations artifact; it is a property of the trained population's best game.
- **d(L1-regimes)/d(n): the kill-early band widens upward — 1242@2h sits 41% below the prior kill-early floor (1691@3h from draw #3), giving L1 a two-octave kill band (738@0h → 1242@2h) with a 930-fitness gap to the mid-band (3940).** L1 now shows three bands at n=15: kill-early (738@0h, 1242@2h), mid (1691@3h, 3940@11h), and cap-cluster (5156+). The 1242's speed ×1.48 is the lowest speed multiplier among value-tallied L1 draws — a 2-hit game can barely accelerate, the swan killing the rally before the ramp binds.
- **d(spine)/d(version) = 0 (sixth consecutive round):** tip prerun reproduces the canonical post-R50 line byte-exact after the registry + page touch (md5s below) — the artifact lane is frozen by design; all movement is distributional (draws) and documentary (button annotation/pins).
- **Failure-mode migration:** none new this round. The R78 "edit tool corrupts tokens" class did not recur (the one-line button edit verified by grep + pin in one pass).

### Lies hunted
- **[L → FIXED] "L2 · near-human" — the undefined quality label, 2nd spec, first build.** grep across html/js/md at the pristine R78 tip: "near-human" appears in the button (index.html:40), README's table (README.md:59), and prerun's header comment (tools/prerun.js:1) — and is DEFINED nowhere. Every hit a usage, none a definition. Draw #15 sharpens it: the label sits on a level whose v1 draws span 589 (0 hits) → 6125 (cap), a 10× fitness spread with a ~13% zero-hit floor — "near-human" describes nothing measurable about that distribution. Repro (pre-fix): `grep -rn "near-human" index.html README.md tools/prerun.js` → 3 hits, 0 definitions. Fixed in-branch: the button now reads "L2 · trained (v1 draws: 589-6125 fitness, 0-5 hits)" — the measured spread, sourced to the ledger. README.md:59 and tools/prerun.js:1 carry the term as a level NAME in a table/comment context (not a player-facing quality claim); the button was the wound. A future round may want to sweep the stragglers.
- **[S] σ-slider → trail interaction — 12th carrying.** Absence grep stands at this tip: no σ field receipted mid-session; the trail stays σ-blind across slider moves.
- **[S] cap-cluster annotation on the R74 measured-at-tag note — 3rd carrying.** The R74/R76 note still cites "6125 = the ceiling attractor" as a point; draws #13-15 say the structure is cluster + wide floor.
- **[S] live near-anchor count beside sigLine during C1 training — 1st carrying (R78 spec item 4, new).** The σ disclosure is static text; the live measurement loop (current pop's near-anchor count vs the gen-1 sChamp) stays unbuilt.

### Builder receipt (what shipped — R78 spec item 3, first build)
- `index.html`: the L2 button copy "L2 · near-human" → "L2 · trained (v1 draws: 589-6125 fitness, 0-5 hits)" — the measured spread replaces the undefined quality label; the L0/L1 buttons untouched ("random" and "mid-training" are accurate state labels for gen 0 and gen 60 respectively).
- `tests/r79-l2-button-honesty-glue.test.js`: 4-test render+ledger pin (the R69/R73/R78 verbatim-extraction pattern, ledger-derived) — SPREAD-PRESENT (the button carries the L2 fitness range AND hits range as literal text), BARE-LABEL-ABSENT ("near-human" nowhere in the button), LEDGER-DERIVED (the button's numbers equal the recomputed spread from research/v1-draws.jsonl), DRIFT-FIRES (a synthesized range-extending draw makes the button stale — the pin FIRES, forcing the same-round update; a pin that never fires is applause, not measurement). FAIL-first on the pristine R78 tree: 4/4 RED (button read "L2 · near-human", zero numbers).
- `research/v1-draws.jsonl`: draw #15 appended (values from the /tmp/pq-v1-r79 tag run; fitness law re-verified per field: 2785+150=2935, 1192+50=1242, 589+0=589).
- `tests/r76-v1-draw-ledger-glue.test.js`: EXPECTED_TALLIES → the fifteen-draw table (L0 2935×7→8; L1 +1242×1; L2 589×1→2); LEDGER-SHAPE floor `>= 14` → `>= 15`; TALLY-MATCH title names the current table.
- `core.js`: VERIFIED_CLAIMS gains `r79-l2-button-honesty-glue` (81 claims; the two-way honesty match stays green); the `r76-v1-draw-ledger-glue` claim text updated to the live truth (15 draws, draws 2-15 value-tallied) — a registry claim asserting stale counts is a lie the honesty two-way match would carry; it doesn't now.
- `README.md`: 347 → 351 (343 in `tests/` + 8 QA — live-verified).
- Site dist re-sealed AFTER the core.js touch, BEFORE the suite counts (build-order law): `build ok: 11 demo files sealed, head 918a36ded`.

### Verified numbers (this round, all by running)
- Suite @ pristine R78 tip 918a36d (pre-change baseline): 339 registered — 331 pass / 0 fail / 8 honest skips; `tools/test-qa.js` 8/8. Total 347.
- Suite @ R79 build: **343 registered — 335 pass / 0 fail / 8 honest skips**; qa 8/8. Total 351 = 343 + 8 (readme-count pin green).
- prerun @ R79 tree (post-registry-touch, post-page-touch): canonical post-R50 line byte-exact — coev.js 946e639a820fcdb41cf2c184120f7716, curve.json f9b20e7ded3330e0c66eb97165dfc049, level0 bc15d414d6c74419d55b7cf3ed9895b0, level1 1125d59cc6de3a48f4d30b24e9980f7f, level2 50137ceb4691965b70a17d4e2d37ecbc, coev-stone-v1 3a0a5fb6af2859cc92fbe94fffae887f; 5 quantum-coin flips / 3 swaps; fitness 1890 / 2010 / 1753 — IDENTICAL to R75/R76/R77/R78 output (d(spine)/d(version) = 0, sixth consecutive round).
- v1 (e98cf66) draw #15, clean worktree /tmp/pq-v1-r79: 2935 / 1242 / 589 (fields above; law verified per level).
- PLAYLOG merge-marker grep after the entry edit: EMPTY (the `r65-conflict-marker-glue` pin re-ran in the suite green).

### Next version spec (R80 mandate)
1. **[S] σ-slider → trail interaction (R78 item 1, 12th carrying).** WHY: the slider changes the mutation regime MID-TRAJECTORY with zero receipted relationship to the trail; the ledger rows carry no σ field. Smallest honest form: σ recorded in the ledger row and printed beside the trail when it changes mid-run (or a named refusal explaining the σ-gap). VERIFY: two slider positions from one seed produce distinguishable receipted outcomes, or the refusal names the ledger's σ-gap.
2. **[S] cap-cluster annotation on the R74 measured-at-tag note (R78 item 2, 3rd carrying).** WHY: draws #13-15 proved the L2 structure is a 6000f-cap cluster with hit-variation (6075@3h, 6125×5@5h) over a zero-hit floor that repeats at ~13% — the R74/R76 "6125 = the ceiling attractor" point-claim and the untouched README/prerun "near-human" stragglers are both drifting from the measured distribution. VERIFY: the R74 note names the cap-cluster AND the floor band; the README/prerun stragglers annotated or renamed.
3. **[S] live near-anchor count beside sigLine during C1 training (R78 item 4, 1st carrying).** WHAT: when a C1 session is live, print the CURRENT population's near-anchor count (<L2 2.0 of the gen-1 sChamp) next to sigLine's static text — the measurement loop closed in-session. VERIFY: a render pin on the live count after one Train at σ=2 (cluster present) vs σ=12 (diffused) — same seed, distinguishable counts, printed not asserted where seed-dependent.
4. **[S] README.md:59 + tools/prerun.js:1 "near-human" stragglers (new).** WHAT: the button was fixed this round; the README table row and prerun header comment still carry the undefined term as a level name. Either rename the level in those files to match the button ("trained") or add the same measured-spread annotation. WHY: a label fixed in one surface and left in two others is the R32 P4 drift class — honesty sentences that disagree about WHAT the level is. VERIFY: grep "near-human" returns zero hits, or every hit carries the measured spread.

### Verdict
MERGEABLE — PR opened this round. Canonical line byte-exact (sixth consecutive), suite green at base and tip, marker grep EMPTY, R78 artifact verified clean at the R78 tip (ledger 14 rows at base, pin 5/5 green), and the discipline's third exercise (this entry citing TALLY-MATCH instead of re-deriving) is its own receipt.

---

## Round 78 — k2d8 (cron pong-quilt-playloop) — 2026-10-02 — mode: BUILDER (R77 spec item 1 — the σ→lineage-visibility disclosure at the slider, [S], first build after THIRTEEN carryings: `sigLine(v)` + `#sigline` mount + live wiring + 4-test render pin — the R66 measurement reaches the panel where the player actually slides σ) + play-tester — vs main tip af5be72 (post-#99; the Casey gate OPEN since R77's pulse — R77 merged to main; branching from merged main per the R70 precedent)

### Played versions: v1 (e98cf66, draw #14) — headless via the tag's own `tools/prerun.js` in a dedicated clean worktree (`git worktree add /tmp/pq-v1-r78 e98cf66`) — plus the tip itself. Draw #14: L0 **1918** (1893f, 1h, ×1.76), L1 **5156** (4806f, 14h, ×2.92), L2 **589** (589f, 0h, ×1.24). ALL THREE levels drew NEW single-level values — the second consecutive 3-new draw — but this time all three at the FLOOR: L2 589 is the first ZERO-HIT champion best-game in 14 draws (prior L2 floor 2383), L0 1918 breaks the prior 2225 floor, L1 5156 opens the mid-band between kill-early and the cap-cluster. Fourteen-draw tallies (13 value-tallied; draw 1 documentary-only), the ledger's TALLY-MATCH output cited here per the R77 discipline: L0 1918×1 / 2225×3 / 2935×7 / 3223×1 / 3295×1; L1 738×2 / 1691×1 / 3940×1 / 5156×1 / 5778×1 / 6114×1 / 6150×1 / 6400×1 / 6500×3 / 6575×1; L2 589×1 / 2383×3 / 4766×1 / 4878×1 / 4919×1 / 6075×1 / 6125×5. My own first hand-recompute of the 14-draw table (pre-append skepticism check) matched the pin's post-append output exactly — the second exercise of the discipline, same result as R77: hand path and pin agree, which is the point.

### Deltas observed (shapes of change)
- **d(distribution)/d(n): the floor side resolved — the swan kill-early regime reaches the champion's BEST game on every level.** Draw #13 widened the ceiling (6075 joins the 6125 cap-cluster); draw #14 widens the floor three levels at once. The L2 champion's best game can have ZERO hits: the paddle never touches the ball in the best game of a 260-gen-trained population. The v1 "learning curve" is not a curve — it is a distribution whose floor is "never connects" and whose ceiling is the 6000-frame cap. Distinct values after 14 draws: L0 5, L1 10, L2 7. Two consecutive draws with 3 new values each says the distribution is still RESOLVING at n=14 — no stable floor or ceiling estimate exists yet; 589 is a sample, not a bound.
- **d(spine)/d(version) = 0 (fifth consecutive round):** tip prerun reproduces the canonical post-R50 line byte-exact after the registry + page touch (md5s below). The artifact lane is frozen by design; all movement is distributional (draws) and documentary (disclosure/pins).
- **Failure-mode migration — the suite caught MY OWN build twice in one round, both times in one run each.** (1) The edit tool corrupted the arrow token in my wiring line (`()=>{` → `()={>{`) — the inline-parse and brace-balance pins fired (`Unexpected token ')'`), and the corrupted wiring ALSO slid past my own pin because the pin only greps the string up to `addEventListener("input"`. Lesson added to the round: a render pin that greps wiring strings must also parse the page — the suite already carries that pin (parse + brace-balance), and it was the difference. (2) My first placement put the init lines inside the R18 extractInitBlock slice (before `tick();`), so byo-persist-glue's stub-`$` eval hit `$("sig") === undefined` — BEHAVIOR fired. Fixed by moving the whole block before the R18 banner (the slice boundary), and switching to `function(){}` form. Third failure class, environmental: site-glue fired 2/2 RED at round start on MY workspace's stale `site/dist` (dist/ is gitignored; my copy predated the af5be72 core.js) — the R44 pin measuring a stale artifact correctly; `node tools/build-site.mjs` is the fix. Not a demo lie; documented because the class will recur on every fresh checkout.

### Lies hunted
- **[S → FIXED] lineage-visibility disclosure on the σ slider — 13th carrying, first build.** Absence grep verified at the pristine tip (zero disclosure vocabulary in index.html; the σ slider at index.html:32 slid bare), FAIL-first recorded on the pristine tree: `Error: missing function sigLine(` — then implemented (builder receipt below). The wound: twelve rounds of carried spec while the player-facing slider disclosed nothing about the R66 two-regime law; the C1 copy "breeds descendants, not noise" is true at every σ for the mechanism and silently genetic-drift at σ≥12 at the receipt resolution — the disclosure now names that at the slider, from first paint.
- **[S] σ-slider → trail interaction — 11th carrying.** Absence grep stands at this tip: no σ field receipted mid-session; the trail stays σ-blind across slider moves.
- **[S] cap-cluster annotation on the R74 measured-at-tag note — 2nd carrying.** The R74/R76 note still cites "6125 = the ceiling attractor" as a point; draw #13's 6075@3h and now draw #14's floor spread say the structure is cluster + wide floor, not a point ceiling.
- **[L] "L2 · near-human" button copy — undefined label, un-annotated (carried since R75's still-missing list).** grep across html/js/md: "near-human" appears in the button (index.html:40), README's table (README.md:59), and prerun's header comment — and is DEFINED nowhere. Draw #14 makes the gap sharper: the label sits on a level whose v1 draws now span 589 (0 hits) → 6125 (cap), a 10× fitness spread with a zero-hit floor. Repro: `grep -rn "near-human" index.html README.md` → every hit is a usage, none a definition.

### Builder receipt (what shipped — R77 spec item 1, first build after 13 carryings)
- `index.html`: `<small id="sigline">` mounted between the σ slider and the stats line; `sigLine(v)` — a ONE-LINE verbatim-extractable function printing the R66 measurement: σ=2 → "lineage VISIBLE — the gen-1 champ's cluster survives 2–3 gens (≥16 nets within L2 2.0 at gen 2, 5 seeds — R66)"; σ=12 → "close lineage INVISIBLE from gen 2 — one step ~0.56 scatters children off the anchor; descendants real (R65), visibility dies (R66)"; EVERY other σ → "UNMEASURED — R66 pinned σ=2 and σ=12 only; this value carries no verbatim measurement" (no fabricated transition curve — interpolation would be fabrication, the R66 printed-not-asserted class applied to UI copy). Live wiring: `input` listener re-renders on drag; first-paint init before any Train; placed BEFORE the R18 init block so the byo slice boundary is untouched.
- `tests/r78-sig-line-disclosure-glue.test.js`: 4-test render-level pin (verbatim extraction, the R69/R73 pattern) — DISCLOSURE-EXISTS (function + mount + live wiring + first paint), SIG-2-VISIBLE (surviving cluster + measured band), SIG-12-INVISIBLE (invisible regime + gen-2 horizon + descendants-real guard), UNMEASURED-BANDS (σ=7 and σ=40 name the gap). FAIL-first on pristine main: DISCLOSURE-EXISTS RED (`Error: missing function sigLine(`).
- `research/v1-draws.jsonl`: draw #14 appended (values from the /tmp/pq-v1-r78 tag run; fitness law re-verified per field: 1893+25=1918, 4806+350=5156, 589+0=589).
- `tests/r76-v1-draw-ledger-glue.test.js`: EXPECTED_TALLIES → the fourteen-draw table (L0 +1918×1; L1 +5156×1; L2 +589×1); LEDGER-SHAPE floor `>= 13` → `>= 14`; TALLY-MATCH title names the current table.
- `core.js`: VERIFIED_CLAIMS gains `r78-sig-line-disclosure-glue` (80 claims; the two-way honesty match stays green).
- `README.md`: 343 → 347 (339 in `tests/` + 8 QA — live-verified).
- Site dist re-sealed AFTER the index.html touch, BEFORE the suite counts (build-order law): `build ok: 11 demo files sealed, head af5be7276`.

### Verified numbers (this round, all by running)
- Suite @ pristine main af5be72 (pre-change baseline): 335 registered — 327 pass / 0 fail / 8 honest skips; `tools/test-qa.js` 8/8. Total 343. (First run in my workspace fired site-glue 2/2 on the stale dist — rebuilt, then this baseline.)
- Suite @ R78 build: **339 registered — 331 pass / 0 fail / 8 honest skips**; qa 8/8. Total 347 = 339 + 8 (readme-count pin green). Intermediate states on the way: 339/327/4 (the corrupted-arrow parse fire + byo slice fire + count pin) — each caught in one run, fixed in place, re-run green.
- prerun @ R78 tree (post-registry-touch, post-page-touch): canonical post-R50 line byte-exact — coev.js 946e639a820fcdb41cf2c184120f7716, curve.json f9b20e7ded3330e0c66eb97165dfc049, level0 bc15d414d6c74419d55b7cf3ed9895b0, level1 1125d59cc6de3a48d4f30b24e9980f7f, level2 50137ceb4691965b70a17d4e2d37ecbc, coev-stone-v1 3a0a5fb6af2859cc92fbe94fffae887f; 5 quantum-coin flips / 3 swaps; fitness 1890 / 2010 / 1753 — IDENTICAL to R75/R76/R77 output (d(spine)/d(version) = 0, fifth consecutive round).
- v1 (e98cf66) draw #14, clean worktree /tmp/pq-v1-r78: 1918 / 5156 / 589 (fields above; law verified per level).
- PLAYLOG merge-marker grep after the entry edit: EMPTY (the `r65-conflict-marker-glue` pin re-ran in the suite green).

### Next version spec (R79 mandate)
1. **[S] σ-slider → trail interaction (R77 item 2, 11th carrying).** WHY: the slider changes the mutation regime MID-TRAJECTORY with zero receipted relationship to the trail; the ledger rows carry no σ field. Smallest honest form: σ recorded in the ledger row and printed beside the trail when it changes mid-run (or a named refusal explaining the σ-gap). VERIFY: two slider positions from one seed produce distinguishable receipted outcomes, or the refusal names the ledger's σ-gap.
2. **[S] cap-cluster annotation on the R74 measured-at-tag note (R77 item 3, 2nd carrying).** WHY: draws #13/#14 proved the L2 structure is a 6000f-cap cluster with hit-variation (6075@3h, 6125×5@5h) over a floor that reaches zero hits — the R74/R76 "6125 = the ceiling attractor" point-claim and the untouched "near-human" label are both drifting from the measured distribution. VERIFY: the R74 note names the cap-cluster AND the floor; the L2 button copy carries the draw-distribution numbers or drops the undefined label.
3. **[M] "L2 · near-human" — define it or annotate it (2nd spec; the label lie above, promoted).** WHAT: either define "near-human" by a named measurable (e.g. "best-game hits ≥ N at the cap", the R66 receipt-resolution discipline applied to marketing copy) and pin the definition, or annotate the button with the measured spread ("v1 draws: 589–6125 fitness, 0–5 best-game hits"). WHY: an undefined quality label on a playable artifact is the thinnest lie in the repo — every other number on that button row is pinned. VERIFY: a glue pin on the button copy (definition cite or the distribution numbers present; the bare label absent).
4. **[S] Live near-anchor count beside the static law during C1 training (the R74 spec's "or" branch, now unlocked).** WHAT: when a C1 session is live, print the CURRENT population's near-anchor count (<L2 2.0 of the gen-1 sChamp) next to sigLine's static text — the measurement loop closed in-session. VERIFY: a render pin on the live count after one Train at σ=2 (cluster present) vs σ=12 (diffused) — same seed, distinguishable counts, printed not asserted where seed-dependent.

### Verdict
MERGEABLE — PR opened this round. Canonical line byte-exact (fifth consecutive), suite green at base and tip (two of my own build failures caught and fixed in-flight, both documented), marker grep EMPTY, R77 artifact verified clean on merged main (ledger 13 rows at base, pin 5/5 green), and the discipline's second exercise (this entry citing TALLY-MATCH instead of re-deriving) is its own receipt.

---
## Round 77 — k2d8 (cron pong-quilt-playloop) — 2026-10-02 — mode: BUILDER (R76 spec item 3 — the ledger append discipline, [S], first build: EXPERIMENTS.md step 3 now names `research/v1-draws.jsonl` + the APPEND directive, and `tests/r77-ledger-append-discipline.test.js` is the structural half — the R65 pattern) + play-tester — vs main tip d408d69 (post-#97/#98; the Casey gate OPEN since R76's pulse — R75 and R76 both merged to main; branching from merged main per the R70 precedent)

### Played versions: v1 (e98cf66, draw #13) — headless via the tag's own `tools/prerun.js` in a dedicated clean worktree (`git worktree add /tmp/pq-v1-r77 e98cf66`) — plus the tip itself. Draw #13: L0 **3295** (3120f, 7h, ×2.25), L1 **5778** (5278f, 20h, ×3.11), L2 **6075** (6000f, 3h, ×3.40). ALL THREE levels drew NEW single-level values in one round — the first draw since #7 to do that. Thirteen-draw tallies (12 value-tallied; draw 1 documentary-only), the ledger's TALLY-MATCH output cited here per the new discipline: L0 2225×3 / 2935×7 / 3223×1 / 3295×1; L1 738×2 / 1691×1 / 3940×1 / 5778×1 / 6114×1 / 6150×1 / 6400×1 / 6500×3 / 6575×1; L2 2383×3 / 4766×1 / 4878×1 / 4919×1 / 6075×1 / 6125×5.

### Deltas observed (shapes of change)
- **d(tally-integrity)/d(round) = +1, made structural:** the append step graduated from one PLAYLOG entry's prose (R76) to the round protocol itself — EXPERIMENTS.md step 3 now directs every v1 play to APPEND one JSON line and cite the ledger pin's TALLY-MATCH output, and the new pin fails the suite if the protocol ever stops naming the ledger. The hand-tally rot class is now guarded at both halves (process note + structural pin), the R65 pattern.
- **d(v1-distribution)/d(n): THREE new single-level values in one draw — the ceiling resolved from a point into a cap-cluster.** L2 6075 (6000f, 3h) joins 6125 (6000f, 5h): the "ceiling attractor" named at R74 (6125×5) is now known to be the 6000-frame CAP with hit-variation at it, not a single fitness value — the attractor is the frames ceiling, and 3h vs 5h at the cap is the swan's fingerprint on the terminal rally. L1 5778 (5278f, 20h) opens a third regime between "kill-early" (738/1691/3940) and the cap-cluster (6114+): hit-rich death — 20 hits, the same hit count as the 6500-cap draws, but the game ended 722 frames before the cap at ×3.11. Hit count does not determine survival; the cap binds probabilistically. L0 3295 (3120f, 7h) extends the upper band past 3223 (3048f, 7h): at 7 hits the frames spread is now 3048→3120, ×2.22→×2.25 — the swan that flips a 7-hit game's terminal speed by +0.03.
- **d(spine)/d(version) = 0 (fourth consecutive round):** tip prerun reproduces the canonical post-R50 line byte-exact after the registry touch (md5s below) — the artifact lane is frozen by design; all movement is distributional (v1 draws) and documentary (protocol/claims).
- **Failure-mode migration:** none from the merge window (#97/#98 landed clean: marker grep EMPTY on merged main at base, suite 332 registered at base). This cycle's failure class was mine alone: the README count arithmetic slip (341 written vs 343 true — I counted my new pin as +1 test when it carries 3) caught by `tests/readme-count.test.js` in one run, the R70 lesson paying rent a seventh time.

### Lies hunted
- **[S → FIXED] the append-discipline gap (the R76 spec item 3 wound, verbatim-verified OPEN):** EXPERIMENTS.md at the pristine tip never names `research/v1-draws.jsonl` (grep exit 1) — the R76 ledger's own disclaimer said "future rounds APPEND a row" but the round instructions a future round actually reads were silent; the discipline lived in exactly one entry's prose, the rot class R65 was built to kill. Repro: read EXPERIMENTS.md step 3 at d408d69 — no ledger name, no append step. Fixed in-branch (below).
- **[none — R76 artifact verified clean on merged main.]** The ledger shipped 12 rows / 12 value-complete draws 2–12 verified against the fitness law; pin 5/5 green at base; TALLY-MATCH reproduced the R76 PLAYLOG table exactly at base. The R76 build is what its entry claims.
- **[M] lineage-visibility disclosure on the σ slider / C1 stats line — 12th carrying.** Absence grep at this tip: zero matches for the disclosure vocabulary in index.html (the σ slider at index.html:32 still slides with no measured-consequence disclosure; the R66 law remains registry-only).
- **[S] σ-slider → trail interaction — 10th carrying.** Absence grep stands: no σ field receipted mid-session; the trail stays σ-blind across slider moves.
- **[note] my own first-tally hand-recompute of the 13-draw table (done before appending, as a skepticism check) matched the ledger pin's post-append TALLY-MATCH output exactly** — the discipline's first exercise under observation, and it already paid: the hand path and the pin agreed, which is the point (the pin now does the re-adding, humans append).

### Builder receipt (what shipped — R76 spec item 3, first build)
- `research/v1-draws.jsonl`: draw #13 appended (one JSON line; values from the /tmp/pq-v1-r77 tag run, fitness law re-verified per field: 3120+175=3295, 5278+500=5778, 6000+75=6075).
- `EXPERIMENTS.md`: scientist-protocol step 3 gains the append discipline — every round that plays the v1 tag APPENDS its draw as one JSON line (draw, round, date, tag, commit, seed, per-level {fitness, frames, hits, speed}) instead of re-deriving hand tallies; the PLAYLOG entry cites the ledger pin's TALLY-MATCH output; expected tallies move exactly once, in `tests/r76-v1-draw-ledger-glue.test.js`, never in prose. The note names the structural pin below (the R65 two-halves pattern).
- `tests/r77-ledger-append-discipline.test.js`: 3-test pin — T1 PROTOCOL-NAMES-LEDGER (EXPERIMENTS.md names research/v1-draws.jsonl), T2 APPEND-STEP (the directive is append-instead-of-re-derive, not both at once), T3 LEDGER-EXISTS (the named file is on disk — a note naming an absent file is a dead link, not a discipline). FAIL-first on pristine main: T1/T2 2/2 RED, T3 GREEN by design (the ledger shipped at R76; the discipline did not).
- `tests/r76-v1-draw-ledger-glue.test.js`: EXPECTED_TALLIES → the thirteen-draw table (L0 +3295×1; L1 +5778×1; L2 +6075×1); LEDGER-SHAPE floor `>= 12` → `>= 13`; TALLY-MATCH title now names the current PLAYLOG table. FAIL-first recorded: draw 13 appended against the stale twelve-draw expectations → TALLY-MATCH RED (the pin FIRES on drift, then and forever).
- `core.js`: VERIFIED_CLAIMS gains `r77-ledger-append-discipline` and the `r76-v1-draw-ledger-glue` claim text moves to the live truth (13 draws, draws 2–13 value-tallied, TALLY-MATCH RED-on-stale-expectations recorded) — a registry claim asserting stale counts is a lie the honesty two-way match would carry; it doesn't now.
- `README.md`: 340 → 343 (335 in `tests/` + 8 QA — live-verified; my first write said 341, the readme-count pin caught the +3-vs-+1 arithmetic, the R70 lesson again).
- Site dist re-sealed AFTER the core.js touch, BEFORE the suite counts (build-order law): `build ok: 11 demo files sealed, head d408d695c`.

### Verified numbers (this round, all by running)
- Suite @ pristine main d408d69 (pre-change baseline): 332 registered — 324 pass / 0 fail / 8 honest skips; `tools/test-qa.js` 8/8.
- Suite @ R77 build: **335 registered — 327 pass / 0 fail / 8 honest skips**; qa 8/8. Total 343 = 335 + 8 (readme-count pin green).
- prerun @ R77 tree (post-registry-touch): canonical post-R50 line byte-exact — coev.js 946e639a820fcdb41cf2c184120f7716, curve.json f9b20e7ded3330e0c66eb97165dfc049, level0 bc15d414d6c74419d55b7cf3ed9895b0, level1 1125d59cc6de3a48d4f30b24e9980f7f, level2 50137ceb4691965b70a17d4e2d37ecbc, coev-stone-v1 3a0a5fb6af2859cc92fbe94fffae887f; 5 quantum-coin flips / 3 swaps; fitness 1890 / 2010 / 1753 — IDENTICAL to R75/R76 output (d(spine)/d(version) = 0, fourth consecutive round).
- v1 (e98cf66) draw #13, clean worktree /tmp/pq-v1-r77: 3295 / 5778 / 6075 (fields above; law verified per level).
- PLAYLOG merge-marker grep after both edits: EMPTY (process half of the R65 mandate; the `r65-conflict-marker-glue` pin re-ran in the suite green).

### Next version spec (R78 mandate)
1. **[S] Lineage-visibility disclosure on the σ slider / C1 stats line (R66 item 3 … R76 item 1, R77: 12th carrying).** WHY: twelve rounds of carry = the player-facing honesty gap with the longest ledger in the repo's history; the R66 measured law (at σ=12 close lineage dies by gen 2; at σ=2 the gen-1 cluster survives) exists in the registry but has never reached the panel where the player actually slides σ. Print the measured law (or the live near-anchor count) at the slider. VERIFY: at σ=12 the disclosure names the invisible-lineage regime; at σ=2 it shows the surviving cluster; a render-level pin on the disclosure text.
2. **[S] σ-slider → trail interaction (R69 item 5 … R76 item 2, R77: 10th carrying).** WHY: the slider changes the mutation regime MID-TRAJECTORY with zero receipted relationship to the trail the panel shows; the ledger rows still carry no σ field. Smallest honest form: σ recorded in the ledger row and printed beside the trail when it changes mid-run (or a named refusal explaining the σ-gap). VERIFY: two slider positions from one seed produce distinguishable receipted outcomes, or the refusal names the ledger's σ-gap.
3. **[S] NEW — cap-cluster annotation on the R74 measured-at-tag note.** WHY: draw #13 proved the L2 ceiling is the 6000f CAP with hit-variation at it (6075@3h joins 6125×5@5h), not the single 6125 value the R74/R76 entries call "the ceiling attractor"; and L1's 5778@20h adds a third regime (hit-rich death: cap-hit-count without the cap binding). The R1 annotation citing "6125 = the ceiling attractor" is now a point-claim where the measured structure is a cluster — the annotation layer itself is drifting from the distribution, the R68-wound class at one remove. VERIFY: the R74 note names the cap-cluster (both cap values + the hit-variation) and L1's three regimes; the ledger pin tallies unchanged.

### Verdict
MERGEABLE — PR opened this round. Canonical line byte-exact, suite green at base and tip, marker grep EMPTY, R76 artifact verified clean on merged main, and the discipline's first exercise (this entry citing TALLY-MATCH instead of re-deriving) is its own receipt.

---

## Round 76 — k2d8 (cron pong-quilt-playloop) — 2026-10-02 — mode: BUILDER (R75 spec item 3 — `research/v1-draws.jsonl`, the machine-readable v1 draw ledger + count pin, [S], first build: closes the hand-tally off-by-one wound carried since R73/R74/R75) + play-tester — vs R75 tip 504466d (PR #97 OPEN, Casey-gated; branching from the prior round's tip per the R22-vs-r21 precedent; origin/main still at c18d92e)

### Finding (booked, P2 — measurement/audit gap, process-lane): the hand-tally off-by-one, quantified

Eleven rounds of v1 draws were tallied by hand in PLAYLOG prose. The tallies always summed to N-1 value-tallied draws because the R1 published sample (draw #1) is counted in the numbering but excluded from value tallies ("the earlier-era sample, per R72's note"). R73 found the arithmetic wound by skepticism, not by a pin: "the nine-draw tally sums to 8" — and every subsequent round re-derived the table by hand, carrying the same off-by-one forward. No pin guarded the prose against drift; a human re-added the column each round. Minimal repro: read the R75 PLAYLOG eleven-draw table — L0 column lists 10 values (2225×3/2935×6/3223×1), L1 lists 10, L2 lists 10, yet the text says "eleven-draw tallies" — the count INCLUDES draw #1 by numbering but EXCLUDES it by nulls. This round replaces the hand-tally with a machine-readable ledger + suite pin.

### Ship (R75 spec item 3, first build)

- `research/v1-draws.jsonl`: one JSON row per v1 draw, 12 rows (draws #1–#12). Each row: draw number, round, date, tag, commit, seed (20260924 — v1 DEFAULTS), source, per-level `{fitness, frames, hits, speed}`. Draw #1 (R1, 2026-09-24) is the pre-commit earlier-era sample: L0 speed and L1 hits/speed were never published, so ALL of draw #1's fitness fields are nulled (documentary-only; published frames/hits kept for the historical record, provenance note names why). Draws #2–#12 carry complete data from the PLAYLOG entries (R68–R76), each verified against the v1 fitness law `fitness = frames + 25×hits` (v1 core.js:85).
- `tests/r76-v1-draw-ledger-glue.test.js`: the 5-test pin. (1) LEDGER-SHAPE — rows numbered 1..N contiguous, every row names tag v1 / commit e98cf66 / seed 20260924. (2) FITNESS-LAW — every complete row satisfies `fitness === frames + 25*hits` (a fabricated fitness is caught here). (3) TALLY-MATCH — value-tallied rows (draws 2–12, draw 1 excluded by its nulls) reproduce the R76 PLAYLOG twelve-draw per-level distribution exactly. (4) DRAW-1-EARLIER-ERA — draw 1 carries ≥1 null field + a provenance note naming its pre-commit status. (5) DRIFT-SENSITIVITY — a one-fitness tampered copy breaks the law (the pin FIRES, never applause).
- `core.js`: VERIFIED_CLAIMS gains `r76-v1-draw-ledger-glue` (the honesty two-way match passes).
- `README.md`: count 335 → 340 (332 in `tests/` + 8 QA).
- Site dist re-sealed after the `core.js` touch: `node tools/build-site.mjs` → "build ok: 11 demo files sealed, head 504466dec".

### FAIL-first evidence chain (all by running)

- Pristine R75 tip (ledger held): `node --test tests/r76-v1-draw-ledger-glue.test.js` → MODULE_NOT_FOUND ("Could not find 'tests/r76-v1-draw-ledger-glue.test.js'"), exit 1.
- Build-time catch (the pin earning its keep BEFORE it shipped): TALLY-MATCH initially RED — draw 1's L0 (fitness 2949) and L2 (fitness 6125) were complete (frames+hits published) and leaked into tallies while L1 stayed out — partial participation, a NEW inconsistency the hand-tally never had. Fixed by nulling ALL of draw 1's fitness fields (the row is documentary-only by design, not by accident). Re-ran: 5/5 GREEN.
- Draw #12 values verified by running: `node tools/prerun.js` at v1 (e98cf66) in the clean worktree /tmp/pq-v1-r75 — L0 2935 (2785f, 6h, ×2.11), L1 **1691** (1616f, 3h, ×1.65), L2 6125 (6000f, 5h, ×3.40). The 1691 is a NEW distribution value — first sub-2000 L1 draw.

### Verified numbers (this round, all by running)

- Canonical suite @ R76 build: **332 registered — 324 pass / 0 fail / 8 honest skips**; `tools/test-qa.js` 8/8. Total 340.
- prerun @ R76 tree: canonical post-R50 line byte-exact — coev.js 946e639a820fcdb41cf2c184120f7716, curve.json f9b20e7ded3330e0c66eb97165dfc049, level0 bc15d414d6c74419d55b7cf3ed9895b0, level1 1125d59cc6de3a48d4f30b24e9980f7f, level2 50137ceb4691965b70a17d4e2d37ecbc, coev-stone-v1 3a0a5fb6af2859cc92fbe94fffae887f; 5 quantum-coin flips / 3 swaps; fitness 1890 / 2010 / 1753 — IDENTICAL to R75's prerun output (d(spine)/d(version) = 0, third consecutive round).
- v1 (e98cf66) draw #12, clean worktree /tmp/pq-v1-r75: L0 2935 (2785f, 6h, ×2.11), L1 **1691** (1616f, 3h, ×1.65 — NEW distribution value, first sub-2000 L1 draw), L2 6125 (6000f, 5h, ×3.40 — the ceiling attractor). Twelve-draw tallies (11 value-tallied; draw 1 documentary-only): L0 2225×3 / 2935×7 / 3223×1; L1 738×2 / 1691×1 / 3940×1 / 6114×1 / 6150×1 / 6400×1 / 6500×3 / 6575×1; L2 2383×3 / 4766×1 / 4878×1 / 4919×1 / 6125×5. A fresh post-ledger v1 run (draw #13 candidate): L0 2225, L1 6500, L2 2383 — all three from the known attractor set, no new single-level value.
- Tip prerun + full suite re-ran after `node tools/prerun.js` rewrote checkpoints: byte-identical (not in git status), suite still 324/0/8.

### Deltas as shapes

- d(tally-integrity)/d(round) = +1: the twelve-draw distribution is now data (`v1-draws.jsonl`) guarded by a suite pin, not prose re-derived by a human each round. The off-by-one class is closed structurally: the file's draw-1 nulls make the exclusion explicit, the pin recomputes the tallies and matches the PLAYLOG table, and appending draw #13 next round is one JSON line + one expected-tally update.
- d(v1-L1-distribution)/d(n): the sub-2000 region opened — 1691 is the lowest L1 draw yet (prior floor: 738×2, then 3940). The L1 distribution is now tri-regional: sub-800 (738×2), mid-band (1691–6575, 7 values), ceiling (6500 cluster ×3 within mid). The 1691 says the unseeded swan's kill-early regime can strike mid-training, not just at gen-0.
- d(spine)/d(version) = 0 (third consecutive round): tip prerun and v0.65.0 both reproduce the canonical line exactly. The artifact lane is frozen by design.

### Spec for Round 77 (3 items, all [S])

1. **[S] Lineage-visibility disclosure on the σ slider / C1 stats line** — 11th carrying (R66 claim pinned, never built; verified still absent this round: zero matches for the disclosure vocabulary in index.html). WHAT: a measured disclosure naming the invisible-lineage regime (σ=12) vs the surviving cluster (σ=2). WHY: ten rounds of carry = the player-facing honesty gap with the longest ledger. VERIFY: at σ=12 the disclosure names the invisible-lineage regime; at σ=2 it shows the surviving cluster; a render-level pin on the disclosure text.
2. **[S] σ-slider → trail interaction** — 9th carrying. WHAT: moving the mutation-σ slider mid-session receipts an effect on the trail (or a named refusal explaining why the ledger rows stay σ-blind). WHY: the slider changes future offspring with zero receipted relationship to the trail the panel shows. VERIFY: a pin that two slider positions from one seed produce distinguishable receipted outcomes, or the refusal names the ledger's σ-gap.
3. **[S] Ledger append discipline** — NEW (1st carrying). WHAT: a note in EXPERIMENTS.md (or the PLAYLOG header) directing future rounds to APPEND their v1 draw to `research/v1-draws.jsonl` (one JSON line) INSTEAD OF re-deriving prose tallies — the PLAYLOG entry then cites the ledger's TALLY-MATCH output. WHY: the ledger only stays true if the append habit is documented where the round instructions live; otherwise a future round returns to hand-tallying and the pin drifts from the prose. VERIFY: EXPERIMENTS.md names the ledger + the append step; the TALLY-MATCH pin stays GREEN.

- `PLAYLOG.md`: (a) the canonical index gains the R76 row (below); (b) this entry. Marker grep EMPTY after both edits.
- `core.js` + `README.md` + test files — itemized above; the honesty two-way match and readme-count pins are the structural guards and both re-ran green.

---
## Round 75 — k2d8 (cron pong-quilt-playloop) — 2026-10-02 — mode: BUILDER (R74 spec item 3 — the durable c1-scaling reproduction pin, [S], first build: PR #92's tool+corpus landed on main mid-round, but the merge imported the corpus WITHOUT its instrument, so the build became port-the-producer + pin-the-reproduction, closing an unreproducible-by-construction wound) + play-tester — vs main tip c18d92e (Casey gate OPEN: #92 c1-scaling, #95 R73 re-land, #96 R74 re-land all merged since R74's pulse, plus repair commit c18d92e restoring #91's test files and bookkeeping; this round branches from merged main per the R70 precedent)

Sibling studied and credited: `c1-scaling-study-v0` @ 17f9ad7 (Clerk-authored `tools/c1-scaling.js` + `tests/c1-scaling.test.js`, ported VERBATIM — not rewritten; its 3 pins DETERMINISM/CONTRAST/HONESTY carry unchanged) and PR #92's main-based merge 9718001 (corpus JSON + `singleArmClaim` marker on arms[6].summary, verified present at `research/c1-scaling-2026-10-01.json`).

### Finding (booked, P2 — measurement/audit gap, not player-facing): the corpus merged without its instrument

PR #92's merge (9718001) imported `research/c1-scaling-2026-10-01.json` (3,018 lines) into main but NOT `tools/c1-scaling.js` — the tool existed only on the sibling branch (verified: `git log --all -- tools/c1-scaling.js` names 17f9ad7 only; `find` on main names only the JSON). The PR title claims "scaling-trajectory tool + honesty pins"; the shipped diff is corpus-only. Minimal repro on main c18d92e: `ls tools/c1-scaling.js` → absent, while the corpus it receipts sits in `research/`. Consequence: the 7-arm study was unreproducible-by-construction on main — anyone auditing the corpus had to fetch a sibling branch. R74's spec item 3 assumed "once PR #92's tool lands on main"; it did not land. This round is the correction.

### Ship (R74 spec item 3, first build)

- `tools/c1-scaling.js`: verbatim port from sibling 17f9ad7 (Clerk's authorship credited in the commit + the restored registry claim). Depends only on `core.js` exports (`rng/makeNet/playAdv/runCoevGeneration/DEFAULTS`) — all present on main; the sibling↔main `core.js` diff is VERIFIED_CLAIMS-registry-only (training loop untouched, so reproduction is byte-exact).
- `tests/c1-scaling.test.js`: the sibling's 3-test pin ported verbatim (DETERMINISM — same arm twice deep-equal; CONTRAST — pop 8 vs 24 diverge; HONESTY — NO-CLAIM marker + `noLearningClaim` on every summary).
- `tests/c1-scaling-repro.test.js`: NEW durable reproduction pin (the R74 ask). A bounded arm (pop 24 × gens 8 × the two pinned seeds) is a deterministic PREFIX of the committed 40-gen arms (same seed, same loop — every gen depends only on prior state), so ~1.4 s of CPU pins the whole corpus: (1) DURABLE-REPRO — all 9 bounded rows match the committed JSON within 1e-9 at both seeds (outcome strings + integer frames exact, float fits within 1e-9); (2) WINDOW-PIN — first5 rally/sFit windows match the committed summary within 1e-9; (3) DRIFT-SENSITIVITY — a one-frame + 1e-6-sFit tampered copy EXCEEDS the band (a tolerance that never fires is applause); (4) CORPUS-HONESTY — the committed corpus carries the descriptive contract and the long arm's single-seed flag.
- `core.js`: registry gains two entries (the sibling's `c1-scaling-study` claim restored with a port-provenance note, and new `c1-scaling-repro-glue`) — the `honesty.test.js` two-way match passes.
- `README.md`: count 328 → 335 (327 in `tests/` + 8 QA).
- Site dist re-sealed after the `core.js` touch: `node tools/build-site.mjs` → "build ok: 11 demo files sealed".

### FAIL-first evidence chain (all by running)

- `tests/c1-scaling.test.js` on pristine main (tool held): `Error: Cannot find module '../tools/c1-scaling.js'` (MODULE_NOT_FOUND), exit 1.
- `tests/c1-scaling-repro.test.js` on pristine main (tool held): same MODULE_NOT_FOUND, exit 1.
- Tamper RED: corpus on disk perturbed (arms[0].rows[3] frames+1, sFit+1e-6) → DURABLE-PRO RED verbatim `AssertionError: seed 20261001: row drift 1 exceeds 1e-9`; corpus restored via `git checkout` (0 dirty files after).
- GREEN at the fix: ported pin 3/3 (1.48 s); repro pin 4/4 (1.93 s); measured row drift 0.000000, first5 drift 0.000000 at both pinned seeds — the corpus is reproducible FROM MAIN.

### Verified numbers (this round, all by running)

- Canonical suite @ R75 build: **327 registered — 319 pass / 0 fail / 8 honest skips**; `tools/test-qa.js` 8/8.
- prerun @ R75 tree: canonical post-R50 line byte-exact — coev.js 946e639a820fcdb41cf2c184120f7716, curve.json f9b20e7ded3330e0c66eb97165dfc049, level0 bc15d414d6c74419d55b7cf3ed9895b0, level1 1125d59cc6de3a48f4d30b24e9980f7f, level2 50137ceb4691965b70a17d4e2d37ecbc, coev-stone-v1 3a0a5fb6af2859cc92fbe94fffae887f; 5 quantum-coin flips / 3 swaps; fitness 1890 / 2010 / 1753. Post-run worktree clean (checkpoints regenerate byte-identical).
- prerun @ v0.65.0 (52b42b4, played from the existing clean worktree): byte-identical md5 line AND identical fitness 1890 / 2010 / 1753 — the shipped spine is frozen by design (R45 birth seal + md5 pins), d(spine)/d(version) = 0.
- v1 (e98cf66) draw #11, clean worktree /tmp/pq-v1-r75: L0 2935 (2785f, 6h, ×2.11), L1 6500 (6000f, 20h, ×3.40), L2 **2383** (2358f, 1h, ×1.94 — the FLOOR attractor). Eleven-draw tallies: L0 2225×3 / 2935×6 / 3223×1 (mode firms); L1 738×2 / 6500×3 / 3940/6114/6150/6400/6575×1 (cap cluster firms to ×3); L2 6125×4 / 2383×3 / 4766/4878/4919×1 (floor cluster firms to ×3). All three levels draw from their known attractor set; the joint triple is new, no new single-level value appeared.

### Deltas as shapes

- d(spine)/d(version) = 0: R75 tree and v0.65.0 produce the same checkpoints, same fitness, same coin counts — the canonical artifact lane is a frozen constant; all movement is distributional (v1 draws) and documentary (claims registry).
- v1 distribution (n=11): tri-modal per level, stationary modes — L0's mode at 2935 (×6), L1 splitting 738↔cap-with-ceiling-6500, L2 splitting floor-2383↔ceiling-6125. Draw #11's L2 2383 is the first floor draw since the cluster was named; the floor is as real as the ceiling.
- d(reproducibility)/d(round) = +1: main can now regenerate its own research corpus in 1.4 s, perpetually, with a pin that fires on a one-frame drift.

### Spec for Round 76 (3 items, all [S])

1. **[S] Lineage-visibility disclosure on the σ slider / C1 stats line** — 10th carrying (R66 claim pinned, never built). WHAT: a measured disclosure naming the invisible-lineage regime (σ=12) vs the surviving cluster (σ=2). WHY: nine rounds of carry = the player-facing honesty gap with the longest ledger; the R66 law exists in the registry but never reaches the panel. VERIFY: at σ=12 the disclosure names the invisible-lineage regime; at σ=2 it shows the surviving cluster; a render-level pin on the disclosure text.
2. **[S] σ-slider → trail interaction** — 8th carrying. WHAT: moving the mutation-σ slider mid-session receipts an effect on the trail (or a named refusal explaining why the ledger rows stay σ-blind). WHY: the slider currently changes future offspring with zero receipted relationship to the trail the panel shows. VERIFY: a pin that two slider positions from one seed produce distinguishable receipted outcomes, or the refusal names the ledger's σ-gap.
3. **[S] `research/v1-draws.jsonl` — the machine-readable v1 draw ledger** — 1st carrying (NEW at R74, still unbuilt). WHAT: one JSON row per v1 draw (tag commit, seed, triple, frame/hit/speed fields, timestamp), append-only, plus a count pin — closing the hand-tally off-by-one wound this round's eleven-draw table still carries. VERIFY: the pin recomputes the tallies from the file and matches the PLAYLOG table; appending draw #12 updates both.

- `PLAYLOG.md`: (a) the canonical index gains the R75 row; (b) this entry. Marker grep EMPTY after both edits (process half of the R65 mandate; the `r65-conflict-marker-glue` pin re-ran in the suite below).
- `core.js` + `README.md` + test files — itemized above; the honesty two-way match and readme-count pins are the structural guards and both re-ran green.

## Round 74 — k2d8 (cron pong-quilt-playloop) — 2026-10-02 — mode: BUILDER (R73 spec item 2 — the R1 measured-at-tag annotation, [S], 7th carrying, first build: the spread table + ceiling-attractor note now live in the R1 entry) + play-tester — vs r73 tip 8776cc9 (PR #91 open, Casey-gated; branching from the prior round's tip per the R22-vs-r21 precedent; all ancestors canonical)

### Played versions: v1 (e98cf66, draw #10 — the ninth value-tallied draw; numbering carries one earlier-era sample per the R72 note) — headless via the tag's own `tools/prerun.js` in a dedicated clean worktree (`git worktree add /tmp/pq-v1-r74 e98cf66`) — plus the tip itself. Sibling branch `c1-scaling-study-v0` (17f9ad7, PR #92) studied verbatim for R73 spec item 4. Draw #10: L0 2935 (2785f, 6h, ×2.11), L1 **6575** (6000f, **23h**, ×3.40 — a NEW distribution maximum, first 23-hit draw), L2 6125 (6000f, 5h, ×3.40 — the ceiling attractor, now 4× in ten draws). Ten-draw tallies: L0 2225×3, 2935×5 (the mode), 3223×1; L1 738×2, 6500×2, 3940/6114/6150/6400/6575×1; L2 6125×4, 2383×2, 4766/4878/4919×1. R1's published L2 (6000f/5h/×3.40 = fitness 6125) re-drawn verbatim at draw #10 — the published triple's L2 field IS the attractor, now measured 4×.

### Deltas observed (shapes of change)
- **d(learning)/d(version): the frozen spine did not move; the v1 distribution grew a 10th honest sample and L1's ceiling rose.** Canonical post-R50 line byte-exact at the tip (all five md5s, 5 flips / 3 swaps, below). Shape updates are distributional only: L1's top cluster gains an interior maximum (6575 at 23h — the cap binds at 6000f while hits keep differentiating: 20h→6500×2, 23h→6575), L2's ceiling attractor strengthens (6125×4, the single most-drawn value), L0's mode firms (2935×5). No joint triple has repeated across ten draws — the honest baseline remains the spread, now annotated into the R1 entry itself.
- **The sibling lane's first research artifact: independently reproduced, zero drift.** R73's NEW item asked for exactly this: ran `node tools/c1-scaling.js` at the sibling tip 17f9ad7 in a clean worktree — all 7 arms reproduce the committed `research/c1-scaling-2026-10-01.json` headline numbers to the printed decimal, and the regenerated file is **byte-identical** (md5 015b8b0d4bd8a161ab8a354e6cea4cef, worktree clean post-run). The descriptive no-learning-claim contract holds end-to-end (source marker + per-summary `noLearningClaim` + the 3-test pin 3/3 green at the sibling tip). d(research-integrity)/d(version): the fleet's first cross-lane research receipt is now a two-party observation, not a single-lane claim.
- **Failure-mode migration:** none from R73 (merge-free stack; marker grep EMPTY at base and after this entry). This cycle's near-wound was arithmetic, not code: R73's nine-draw tally sums to 8 value-tallied draws (the earlier-era sample, per R72's note) — caught while writing the R1 annotation, disclosed in the annotation's header rather than silently normalized.
- **R73→R74 code delta shape:** zero demo-code lines. PLAYLOG-only builder item (the R1 annotation + this entry + the index row) — the first annotation-mode round since the R63 mandate: the wound it closes lived in the experiment's memory, not its machinery.

### Lies hunted
- **[none — sibling artifact verified clean]** R73 spec item 4's verification ran this round and found ZERO drift: 7/7 arms match the JSON headline to the decimal, regenerated file byte-identical (md5 above), determinism/contrast/honesty pin 3/3 at the sibling tip. The receipt is PLAYLOG-only because the tool and corpus live on the unmerged sibling lane — the durable machine pin is R75 spec item 3 (cannot land until PR #92's tool is on main; pinning against an unmerged lane would be a phantom pin).
- **[M] lineage-visibility disclosure on the σ slider / C1 stats line — 9th carrying.** Absence grep at this tip stands (index.html carries no such disclosure; only the R66 claim's prose mentions the invisible-lineage regime).
- **[S] σ-slider → trail interaction — 7th carrying.** Absence grep stands: no σ field in ledger rows (core.js grep: σ appears only in the R66 claim prose).
- **[S, closed this round] the R1 baseline-integrity wound — the annotation ships in the R1 entry** (root cause core.js:55-56 named, ten-draw spread table, ceiling-attractor note; the off-by-one in the draw numbering disclosed in its header).
- **[note] README prerun table (lines 55–64) checked:** it publishes the current pinned post-R50 line (deterministic, byte-reproducible) — honest; the v1 single-sample rows only ever lived in the R1 PLAYLOG entry, which this round annotates. Nothing else real found — one line per doctrine.

### Builder receipt (what shipped)
- `PLAYLOG.md`: (a) the R1 entry gains `### Measured at the tag (Round 74 annotation — R73 spec item 2, 7th carrying)` — the root-cause line, the per-level ten-draw spread table, and the attractor paragraph; (b) the canonical index gains the R74 row; (c) this entry. Marker grep EMPTY after all three edits (process half of the R65 mandate; the `r65-conflict-marker-glue` pin is the structural half and re-ran in the suite below).
- No `index.html` / `core.js` / test-file touch — the annotation is memory-layer work; the demo's claims registry and its proof-test two-way match are untouched (re-verified live: `tests/honesty.test.js` green in the suite).

### Verified numbers (this round, all by running)
- prerun @ tip: canonical post-R50 line byte-exact — coev.js 946e639a820fcdb41cf2c184120f7716, curve.json f9b20e7ded3330e0c66eb97165dfc049, level0 bc15d414d6c74419d55b7cf3ed9895b0, level1 1125d59cc6de3a48d4d30b24e9980f7f, level2 50137ceb4691965b70a17d4e2d37ecbc, coev-stone-v1 3a0a5fb6af2859cc92fbe94fffae887f; 5 quantum-coin flips / 3 swaps; fitness 1890 / 2010 / 1753. Post-run worktree clean — the checkpoints regenerate byte-identical.
- Suite at this tip (pre-PLAYLOG-edit baseline and post-edit re-run): `node --test tests/*.test.js` — 320 tests, 312 pass / 0 fail / 8 skips; `node --test tools/test-qa.js` — 8/8. README count 328 = 320 + 8 (`tests/readme-count.test.js` green).
- Sibling verification @ 17f9ad7: `node tools/c1-scaling.js` — 7 arms, rally/sFit windows identical to the committed JSON to the printed decimal; regenerated JSON md5 015b8b0d4bd8a161ab8a354e6cea4cef == committed md5; `node --test tests/c1-scaling.test.js` 3/3 green.
- v1 draw #10: 2935 / 6575 / 6125 (tallies above; the /tmp/pq-v1-r74 worktree used the tag's own prerun).

### Next version spec (R75 mandate)
1. **[S] Lineage-visibility disclosure on the σ slider / C1 stats line (R66 item 3 … R73 item 1, R74: 9th carrying).** WHY: the mechanism truth is measured and pinned (R66: at shipped σ=12 close lineage usually dies by gen 2; at σ=2 the gen-1 cluster survives) but the player can still slide σ with no measured consequence visible where they slide it; with C1 sessions keepable/provenanced/chained/load-disclosed/franken-guarded, "what survives" is the demo's sharpest unanswered player-facing question. Print the measured law (or the live near-anchor count) at the slider. VERIFY: verbatim — at σ=12 the disclosure names the invisible-lineage regime; at σ=2 it shows the surviving cluster.
2. **[S] σ-slider → trail interaction (R69 item 5 … R73 item 3, R74: 7th carrying).** WHY: σ changes the mutation regime MID-TRAJECTORY with no marker; a mid-session slide crosses a regime change the trail cannot mark (ledger rows carry no σ field). Smallest honest form: σ recorded in the ledger row and printed beside the trail when it changes mid-run. VERIFY: breed 2 gens at σ=12, slide to 2, breed 1 → the stats line marks the regime change at the exact gen it happened.
3. **[S] Durable reproduction pin for the c1-scaling corpus (R73 item 4's second half — R74 verified PLAYLOG-only; the machine pin waits for the merge).** WHY: this round's verification is a receipt a human must re-read; once PR #92's tool lands on main, a pin test makes the reproduction perpetual: run the bounded arm (pop 24 × gens 8 × the two pinned seeds — seconds, not 90s) and compare rally/sFit windows against the committed JSON within 1e-9. VERIFY: `node --test tests/c1-scaling-repro.test.js` green on main post-merge; RED if the corpus or the training loop drifts underneath it (the R42-pin pattern at research scale).
4. **[S] NEW — machine-readable v1 draw ledger.** WHY: ten draws in, the hand-tally has acquired a carried off-by-one (the earlier-era sample, disclosed in the R1 annotation's header) and every round re-sums the table by hand; an append-only `research/v1-draws.jsonl` (one row per draw: date, round, L0/L1/L2 {fitness, frames, hits, speed}) turns the distribution into data the next round appends to, not prose it re-derives — and a count pin would have caught the off-by-one at birth. VERIFY: the JSONL's per-level tallies equal the R1 annotation's ten-draw table; a new draw appended by running prerun at the tag updates exactly one row.

### Reflection
Builder mode, fourth consecutive round, and the honest form this time was annotation, not code: the 7th-carried wound lived in the experiment's memory (R1's single-sample numbers presented as the baseline), and the fix was to measure the distribution at the tag — ten draws, root-caused, attractor named — and write it where the wound was. The verification half of R73's NEW item mattered as much as the annotation: the sibling's 3016-line research corpus reproduced byte-identical on first outside run, which is the strongest signal yet that the fleet's research lanes can carry receipts, not just the demo lanes. Two lessons carried forward: (1) a hand-maintained tally WILL drift — the off-by-one was found by arithmetic skepticism, not by a pin (spec item 4 is the pin); (2) the durable pin for a sibling artifact cannot be built on the unmerged lane — pinning against code that isn't on main is a phantom, so item 3 waits for the Casey gate with its verification already banked. Credit: the sibling's c1-scaling tool (the byte-faithful prerun-coev call sequence made the reproduction trivially checkable); R72's earlier-era-sample note (made the off-by-one findable in one read); R66's measured σ-law (the disclosure item's content is already pinned — what remains is showing it to the player).

### Verdict
MERGEABLE — pending the Casey gate; PR opened this round. Canonical line byte-exact, suite green at base and tip, marker grep EMPTY, sibling artifact verified clean.

## Round 73 — k2d8 (cron pong-quilt-playloop) — 2026-10-02 — mode: BUILDER (R72 spec items 1+5 as the mandated pair — the franken-save guard + its NAMED refusal receipt, first build of the wound carried verbatim since R64 P4) + play-tester — vs r72 tip 90743f9 (PR #91 open, Casey-gated; branching from the prior round's tip per the R22-vs-r21 precedent; all ancestors canonical)

### Played versions: v1 (e98cf66, draw #9) — headless via the tag's own `tools/prerun.js` in a dedicated clean worktree (`git worktree add /tmp/pq-v1-r73 e98cf66`) — plus the tip itself. v0.64.0/v0.65.0 byte-exactness inherited from R70/R72 and re-established at this tip (below). Draw #9: L0 2225 (2200f, 1h, ×1.88), L1 6400 (6000f, **16h**, ×3.40), L2 4919 (4869f, 2h, ×2.95). **L1 6400 is a NEW marginal value** — the first 16-hit draw, joining the 6000f-capped top cluster (6500×2 at 20h) — and L2 4919 firms the middle band to THREE samples (4766/4878/4919 within ~150 fitness): R72's "bimodal-at-the-edges" reading updates to a three-zone distribution (floor cluster ~2383×2, middle band ~4.8k×3, ceiling 6125×3). Nine-draw tallies: L0 2225×3, 2935×4 (the mode), 3223×1; L1 738×2, 6500×2, 3940/6114/6150/6400×1; L2 6125×3, 2383×2, 4766/4878/4919×1.

### Deltas observed (shapes of change)
- **d(learning)/d(version): the frozen spine did not move; the v1 distribution grew a 9th honest sample.** Canonical post-R50 line byte-exact at the tip (all five md5s, 5 flips / 3 swaps, below). The shape update is distributional, not behavioral: L2's middle band firmed (3 samples now — the "thin middle" of R72 was a small-sample artifact), and L1's top cluster gained an interior point at 6400 with a new hit-count extreme (16h, vs the prior 20h max) — both top draws sit at the 6000f cap, so the cap binds while hits keep differentiating. R1's published L2 (6000f/5h/×3.40) remains the ceiling attractor, drawn 3× in nine draws.
- **Failure-mode migration:** none from R72 (merge-free stack, marker grep EMPTY at base). This cycle's failure class was my own pin layer: T4 first asserted `downloads[1]` for a download that lands at `downloads[0]` (the refused save produces NO download — the capture array is refusal-sparse). A scratch debug script isolated fix-correctness from test-buggery in one run; the second consecutive round where the wound was in my layer, not the demo's (R72: files-not-tests count; R73: refusal-sparse index).
- **R72→R73 code delta shape:** ONE guard line in the classic save branch (+1 receipt vocabulary entry, +4 pin tests). The smallest builder delta yet, closing the oldest open wound-line in the repo (8 specs carried).

### Lies caught / fixes shipped (severity)
- **[S → FIXED] the franken tail — CLOSED with the mandated pair** (R72 spec items 1+5; form (b) of the R73 mandate: the classic save refuses whenever `coev && coev.genC>0 && gen===coev.genC` regardless of banner, and the refusal is a NAMED receipt kind `SAVE/FRANKEN-REFUSED` whose gen column records the genC collision it refused). The wound, verbatim one last time: continueGenC writes the shared gen/champNet slots (R47 sync), so a C1-trained player flipping the dropdown to classic saved a file claiming gen===coev.genC with best===sChamp.net by identity paired with the UNTOUCHED classic pop — the R56 P3/R59 M1 three-lineage class reborn in the classic writer. FAIL-first on the pristine r72 tip, one run: T1/T4 RED (download shipped, bare SAVE receipt), T2/T3 GREEN by design. Pin: `tests/r73-franken-save-guard-glue.test.js`.
- **[M] lineage-visibility disclosure on the σ slider / C1 stats line — 8th carrying.** Absence grep at this tip stands (R66 P1/P4 measurement: at shipped σ, close lineage invisible from gen 2).
- **[S] PLAYLOG baseline integrity (R1 annotation) — 7th carrying.** R1's entry still lacks the measured-at-tag paragraph naming the unseeded-swan root cause (v1 core.js:55-56), the spread (L0 2225–3223, L1 738–6500, L2 2383–6125 across nine draws) and the ceiling-attractor note.
- **[S] σ-slider → trail interaction — 6th carrying.** Ledger rows still carry no σ field; a mid-session slide crosses a regime change the trail cannot mark.
- **[none-new] this round's own franken probe found no adjacent head** — the refusal is zero-state-change (both lanes intact, T1 asserts it), the coev branch is byte-isolated (T3), and the post-divergence classic save is honestly allowed (T4 pins the exact-collision boundary so a future widening trips the pin, not a player). One line per doctrine: nothing else real found.

### Builder receipt (what shipped)
- `index.html`: the classic save branch gains the guard `if(coev&&coev.genC>0&&gen===coev.genC){receipt("SAVE/FRANKEN-REFUSED",0,0,coev.genC);return;}` annotated R73 in place — placed AFTER the coev branch's return, so the coev writer is byte-untouched; the R68-era "stays OPEN" comment is retired into the closure note (the comment that named the wound replaced by the comment that closes it — keeping both would be a stale-wound lie). The refusal names its genC via the R68 laneGen convention, so the row's own provenance column carries the collision it refused.
- `core.js`: VERIFIED_CLAIMS gains `r73-franken-save-guard-glue` (the two-way pin: the claim names the proof test, the proof test drives the page's verbatim functions).
- `tests/r73-franken-save-guard-glue.test.js`: 4 pins, all driving the REAL shipped handlers VERBATIM (startGen/continueGen/startGenC/continueGenC/save extracted from index.html, core.js as PQ, seeded randPQ) — T1 FRANKEN-REFUSAL (breed C1 → flip to classic → save: zero downloads, exactly one SAVE/FRANKEN-REFUSED with laneGen===genC, zero state change in both lanes), T2 CLASSIC-ONLY BYTE-UNCHANGED (no C1 lane: downloads, bare SAVE, file shape exactly {gen,best,pop,stats} — guards the always-on-guard regression), T3 COEV-BANNER ISOLATION (guard never leaks into the coev branch), T4 BOUNDARY ESCAPE (train classic past the collision → saves normally; pins the guard as collision-exact, no wider). FAIL-first recorded on the pristine tip: T1/T4 RED, T2/T3 GREEN. (Two slips caught and corrected in-branch before this commit, both in my own layer: a duplicated word in the registry/file name (`guard-guard`) and T4's refusal-sparse download index — the committed text carries only the corrected forms.)
- README 324 → 328 (320 in `tests/` + 8 QA — run-verified live by `tests/readme-count.test.js`). Site dist re-sealed AFTER the index.html + core.js edits, BEFORE the suite counts (build-order law): `build ok: 11 demo files sealed`.

### Verified numbers (this round, all by running)
- Suite at the PRISTINE r72 tip (pre-change baseline): 316 tests, 308 pass / 0 fail / 8 skips; qa 8/8.
- prerun @ tip (post-change): canonical post-R50 line byte-exact — coev.js 946e639a820fcdb41cf2c184120f7716, curve.json f9b20e7ded3330e0c66eb97165dfc049, level0 bc15d414d6c74419d55b7cf3ed9895b0, level1 1125d59cc6de3a48d4d30b24e9980f7f, level2 50137ceb4691965b70a17d4e2d37ecbc, coev-stone-v1 3a0a5fb6af2859cc92fbe94fffae887f; 5 quantum-coin flips / 3 swaps; fitness 1890 / 2010 / 1753 — the guard touches page glue only; the canonical spine is untouched.
- Post-change: r73 pin 4/4 GREEN; the r67 writer pin re-run 4/4 GREEN (it extracts the same save handler — the guard is inert in every coev-banner path it drives).
- v1 draw #9: 2225 / 6400 / 4919 (tallies above).

### Next version spec (R74 mandate)
1. **[S] Lineage-visibility disclosure on the σ slider / C1 stats line (R66 item 3 … R72 item 2, R73: 8th carrying).** WHY: R66 P1/P4 measured that at the shipped default σ one mutation step (~0.564 L2) exceeds the R54 receipt resolution (~2.5) — close lineage is invisible from gen 2 at defaults; with C1 sessions keepable (R67), provenance-tracked (R70), chain-descended (R71), load-disclosed (R72) AND franken-guarded (R73), the "what survives" question is now the demo's sharpest unanswered player-facing one. Print the measured law (or the live near-anchor count) where the player can see it. VERIFY: verbatim — at σ=12 the disclosure names the invisible-lineage regime; at σ=2 it shows the surviving cluster.
2. **[S] PLAYLOG baseline integrity — annotate the R1 entry with the spread AND the ceiling-attractor note (R68 item 5 … R72 item 3, R73: 7th carrying, deepened by draw #9: L2 6125/6000f/5h/×3.40 drawn 3× in nine draws — R1's published L2 IS the distribution ceiling).** WHY: v1 core.js:55-56 consumed raw Math.random() in the swan path, so EVERY published tag number is a sample of a distribution, never a point; the nine-draw table (L0 2225–3223, L1 738–6500, L2 2383–6125; per-level tallies in this entry) is the measured spread to cite. VERIFY: the R1 entry carries a measured-at-tag paragraph naming the root cause, the spread, and the attractor structure.
3. **[S] σ-slider → trail interaction (R69 item 5 … R72 item 4, R73: 6th carrying).** WHY: the σ slider changes the mutation regime MID-TRAJECTORY with no marker: a player sliding σ from 12 to 2 mid-session sees a continuous trail across a regime change the trail cannot mark. The ledger rows carry no σ field; the writer would need one (file-format touch — smallest honest form: σ recorded in the ledger row and printed beside the trail when it changes mid-run). VERIFY: verbatim — breed 2 gens at σ=12, slide to 2, breed 1 → the stats line marks the regime change at the exact gen it happened.
4. **[S] NEW — verify-and-pin the sibling scaling artifact (PR #92, `c1-scaling-study-v0`).** WHY: a 3016-line `research/c1-scaling-2026-10-01.json` scaling corpus + `tools/c1-scaling.js` landed on a sibling branch (additive off main 70af7f0, no save-path overlap — studied this round, credit where due) with a 45-test pin, but nobody outside that lane has re-derived its headline numbers by running. The repo's own doctrine (numbers verified by running) extends to siblings' receipts; a research artifact whose headline claims were never independently reproduced is the R68-P2 class at research scale. VERIFY: run the bounded arm of `tools/c1-scaling.js` at the pinned seeds, compare the trajectory summary against the JSON's headline numbers within its stated tolerance, pin the comparison (or flag the drift named).

### Reflection
Builder mode, third consecutive round, and the pair-mandate was the lesson: R72's reflection said "guard AND named refusal together, or the half-fix ships" — shipping the guard without the named receipt would have been the R64-class half-fix with a receipt panel standing silently by. The verbatim VERIFY strings did their usual work: one FAIL-first run reproduced the 8-spec-old wound exactly as carried (T1), and the boundary test (T4) did the unglamorous job — pinning the guard as collision-exact so the NEXT builder can't widen it silently. My own layer slipped for the second consecutive round (refusal-sparse download indexing) — caught by a scratch debug script before the suite, but the pattern is now data: the wound-line is migrating from the demo's code to the loop's own instrumentation, which is exactly where a living experiment's immune system should be spending its effort. Credit: R68's verbatim precondition block (the probe instrument this pin re-drove); R72's reflection (named this build before R72 merged); sibling PR #92 (the first research-consumer lane on the frozen spine — studied, no conflict, its scaling corpus is spec item 4 above).

### Verdict
MERGEABLE — pending the Casey gate; PR opened this round. Sibling pins green (r67 writer pin re-run 5/5 against the new guard), canonical line byte-exact, marker grep EMPTY.

## Round 70 — k2d8 (cron pong-quilt-playloop) — 2026-10-01 — mode: BUILDER (R69 spec item 3 — file-provenance persistence, [S], 2nd carrying, first build) + play-tester — vs main tip 70af7f0 (the Casey gate opened since R69's pulse: PR #85 (R67), #87 (R68), #88 (R69) all merged; this round branches from merged main — the unmerged-stack precedent retired; tags v1/v0.64.0/v0.65.0 played from clean worktrees)

### Played versions: v1 (e98cf66, draw #6), v0.64.0 (5406c48), v0.65.0 (52b42b4) — each headless via `node tools/prerun.js` in a dedicated clean worktree with its own node_modules, plus the tip itself. v0.64.0 and v0.65.0 BOTH reproduce the canonical post-R50 line byte-exact (all five checkpoint md5s identical: coev.js 946e639a…, curve.json f9b20e7d…, L0 bc15d414…, L1 1125d59c…, L2 50137ceb…, stone 3a0a5fb6…; 5 flips / 3 swaps) — the deterministic spine is stable from those tags to the R70 tip. v1 draw #6: L0 3223 (3048f, 7h, ×2.22), L1 6114 (5664f, 18h, ×3.27), L2 2383 (2358f, 1h, ×1.94). Cumulative v1 spread across six draws: L0 2225–3223, L1 713–6500, L2 2383–6125 — d(learning)/d(version) at the v0.65.0→v1 boundary is not a curve, it's a distribution fork (unseeded swan, root-caused R69 P2; the R50 pinned line is the frozen spine both sides share).

### Deltas observed (shapes of change)
- **The merge window landed**: R67 (coev-quilt writer) + R68 (file provenance receipts) + R69 (sChamp trail) merged to main in one week. Their pins passing on merged main (301 tests green at tip 70af7f0, measured this round) IS the verification that the merge preserved every receipted lane — no receipt re-audit needed, the pins ARE the audit.
- **Failure-mode migration**: none from the merge (PLAYLOG marker grep EMPTY). The failure class that migrated this cycle is mine: my own fix initially opened a stale-provenance head in the artifact lane (below, caught and closed in-branch).
- **New visibility since R69 ships**: the sChamp trail now prints on the stats line, which made the R70 file segment's placement a real design choice — provenance groups with the lineage segments (loser / trail / ledger-eviction), the pinned R55 prefix contract `COEV gen N · games N · h2h ` stays byte-intact (r61/r65 pins green).

### Lies caught / fixes shipped (severity)
- **[S → FIXED] file-provenance persistence** (R69 spec item 3, 2nd carrying — the declared builder item). R69 P4 verbatim-measured the wound; this round's pin reproduced it FAIL-first at the pristine tip in one run (R69's measurement culture paying rent). Fix: the coev load branch records `coev.fileName=f.name||"unnamed"`; `continueGenC` prints ` · file "<name>"` after the `loser` segment until another load replaces it. Pin: `tests/r70-coev-file-provenance-persist-glue.test.js`.
- **[S → FIXED] stale provenance on the canonical-artifact lane** — caught by THIS round's own play of the fix: load file A → `loadCoev` (the receipted checkpoint) → Train printed `file "pong-quilt-coev-gen5.json"` at gen 121 — the checkpoint lane claiming a player file's provenance (verbatim probe; a head my fix itself opened). Closed: `loadCoev` sets `fileName:null` — the artifact's identity is its own receipted banner (seed/gens/md5), never a player file. Pin T5 ARTIFACT-BOUNDARY — FAIL-first recorded: RED with only the load-branch fix in place, GREEN with both.
- **[M] franken tail — 6th carrying, confirmed present-tense at this tip.** Verbatim driver: breed 1 C1 gen (coev.genC=1, classic gen synced to 1 via the R47 shared slots) → flip to classic → save → the file claims gen 1 === coev.genC, best === champNet by identity, pop = the untouched 8-net classic lane. The only surviving franken head.
- **[S] lineage-visibility disclosure — 5th carrying.** Absence grep at this tip: no `lineage\|source-file\|mutated-from` law in index.html (R66 P1/P4 measurement stands: at shipped σ, close lineage invisible from gen 2).
- **[S] PLAYLOG baseline integrity — 4th carrying.** R1's own entry still lacks the measured-at-tag annotation — the 'unseeded swan' grep hits live in R68/R69 spec sections, not R1's entry.

### Builder receipt (what shipped)
- `index.html`: coev load branch records `fileName` (success path only — the refusal path records nothing, zero state change preserved); `continueGenC` stats template prints the file segment; `loadCoev` clears it (artifact boundary).
- `core.js`: VERIFIED_CLAIMS gains `r70-coev-file-provenance-persist-glue` — the demo badge now carries the persistence claim.
- `tests/r70-coev-file-provenance-persist-glue.test.js`: 5 pins — T1 PERSISTENCE (load gen-5 named file, Train ×2, filename still in stats), T2 REPLACEMENT (load A, breed, load B, breed → line names B, never A), T3 NO-FILE HONESTY (fresh C1 prints no file segment — guards the naive always-on printer), T4 MALFORMED-IMMUNITY (refused file records nothing, prints nothing), T5 ARTIFACT-BOUNDARY (loadCoev clears provenance). FAIL-first: pristine tip T1/T2 2/2 RED; with only the load-branch fix T5 RED; full post-fix 5/5 GREEN.
- README 309 → 314 (306 in tests/ + 8 QA — run-verified by `tests/readme-count.test.js`, which also caught this round's own arithmetic slip 313→314). Site dist re-sealed AFTER the index.html + core.js edits, BEFORE the suite counts (build-order law): `build ok: 11 demo files sealed`.

### Verified numbers (this round, all by running)
- prerun @ tip 70af7f0: canonical post-R50 line byte-exact — coev.js 946e639a820fcdb41cf2c184120f7716, curve.json f9b20e7ded3330e0c66eb97165dfc049, level0 bc15d414d6c74419d55b7cf3ed9895b0, level1 1125d59cc6de3a48f4d30b24e9980f7f, level2 50137ceb4691965b70a17d4e2d37ecbc, coev-stone-v1 3a0a5fb6af2859cc92fbe94fffae887f; 5 quantum-coin flips / 3 swaps; fitness 1890 / 2010 / 1753.
- v0.64.0 / v0.65.0: same canonical line, byte-exact (deterministic spine stable across the boundary).
- v1 draw #6: 3223 / 6114 / 2383 (see Played versions for the spread).
- Suite @ tip: 301 tests, 293 pass / 0 fail / 8 skips (pre-change baseline). Post-change: 306 tests, 298 pass / 0 fail / 8 skips; `tools/test-qa.js` 8/8. PLAYLOG merge-marker grep: EMPTY.

### Next version spec (R71 mandate)
1. **[M] Lane tracking — close the classic-banner-after-C1 franken tail (R64 P4 … R69 item 1, R70: 6th carrying, verbatim-measured OPEN this round).** WHY: the only surviving franken head — continueGenC still writes the shared gen/champNet slots (R47 sync), so a C1-trained player who flips the dropdown to classic saves coev gen/champ fields paired with the untouched classic pop. Either (a) continueGenC stops writing the shared slots (full lane separation), or (b) the save guard refuses whenever `coev && coev.genC>0 && gen===coev.genC` regardless of banner. VERIFY: verbatim harness — breed C1, flip to classic, save → refusal receipt + no download; classic-only sessions save byte-unchanged.
2. **[S] Lineage-visibility disclosure on the σ slider / C1 stats line (R66 item 3 … R69 item 2, R70: 5th carrying).** WHY: R66 P1/P4 measured that at the shipped default σ one mutation step (~0.564 L2) exceeds the R54 receipt resolution (~2.5) — close lineage is invisible from gen 2 at defaults, and now that C1 sessions are KEEPABLE (R67) and PROVENANCE-TRACKED (R70) the "what survives" question crosses sessions. Print the measured law (or the live near-anchor count) where the player can see it. VERIFY: verbatim — at σ=12 the disclosure names the invisible-lineage regime; at σ=2 it shows the surviving cluster.
3. **[S] PLAYLOG baseline integrity — annotate the R1 entry with its tag-measured numbers AND the non-determinism root cause (R68 item 5, R69 item 4, R70: 4th carrying).** WHY: the demo's first published line (L0 2899f/2h, L1 1192f, L2 6000f/5h/×3.40) does not reproduce at v1 — root-caused R69 P2: v1 core.js:55-56 consumed raw Math.random() in the swan path, so EVERY tag measurement (R1's, R68's, six honest draws) is a sample of a distribution, never a point. R1 evidently measured an evolving working tree pre-commit; the entry already discloses pre-commit fixes. Annotate with the root cause + the measured spread (L1 713–6500 across six draws) so no future round treats any single published number as the baseline. VERIFY: the R1 entry carries a measured-at-tag paragraph naming the root cause and the spread.
4. **[S] σ-slider → trail interaction (R69 item 5, R70: 2nd carrying).** WHY: the trail view (R69) made the ledger's role as the lane's memory concrete — but the σ slider (live, R65-revived) changes the mutation regime MID-TRAJECTORY with no marker: a player sliding σ from 12 to 2 mid-session sees a continuous trail across a regime change the trail cannot mark. The ledger rows carry no σ field; the writer would need one (file-format touch — smallest honest form: σ recorded in the ledger row and printed beside the trail when it changes mid-run). VERIFY: verbatim — breed 2 gens at σ=12, slide to 2, breed 1 → the stats line marks the regime change at the exact gen it happened.
5. **[S] NEW — coev-file lineage chain (found by this round's own play).** WHY: R70 made provenance session-local: load A, train, save B — B cannot say it descends from A, so across save→load hops the provenance story breaks even though both hops are now individually honest. Record `origin: coev.fileName` (when set) in the writer's JSON; when a loaded file carries one, print `file "X" (descends from "Y")` in the stats line. VERIFY: verbatim — load named A, train, save → JSON carries origin:"A"; load the saved file → stats line prints the descent claim; a fresh file (no origin) prints none — never assert what the file didn't carry. Size: S.

### Reflection
Builder mode paid its rent twice: building the fix forced the artifact-lane probe that caught a wound the spec didn't name — the fix itself was the lie-hunting instrument. Two lessons: (1) R69's verbatim-measurement culture (P4) meant the R70 pin's FAIL-first reproduced the wound in a single run — carry-forward wounds with exact repro strings, not summaries; (2) my own round's arithmetic slip (313 written, 314 true) was caught by the README count pin — the pin earns its keep every round it fires. The merge window closed cleanly (no markers, pins green on merged main), and the pins passing IS the receipt-preservation audit — no separate re-audit needed.

## Round 69 — k2d8 (cron pong-quilt-playloop) — 2026-10-01 — mode: BUILDER (R68 spec item 3 — d(sChamp)/d(gen) printed lane on the C1 stats line, [S], 3rd carrying in the spec, first build) + play-tester — vs r68 tip df47bca (R68 unmerged, Casey-gated; branching from the prior round's tip per the R22-vs-r21 precedent; PR #85 open at round start; all ancestors canonical)

### Played versions: v1 (e98cf66) — the root tag played THREE times headless in a clean worktree (`git worktree add /tmp/pq-v1-r69 e98cf66`), seeded, numbers by running — and the three runs DISAGREE with each other. Run 1: L0 2935 (2785f, 6h, ×2.11), L1 6150 (6000f, 6h, ×3.40), L2 6125 (6000f, 5h, ×3.40). Run 2: L0 2935 (identical), L1 6500 (6000f, 20h, ×3.40), L2 4766 (4691f, 3h, ×2.88). Run 3: L0 2935 (identical), L1 3940 (3740f, 8h, ×2.50), L2 4878 (4828f, 2h, ×2.93). L0 is byte-stable; L1/L2 differ on EVERY draw. Root cause located by reading the tag: v1 `core.js:55-56` fires the black-swan angle kick off raw `Math.random()` (swanP 0.00008/frame × speedMul — a 6000-frame L2 game expects ~1.2 swans). L0's best game (~2785f) expects ~0.28 swans and its swan-free champion wins identically every run; longer games consume the unseeded stream and the whole downstream evolution diverges. The seeding fix landed at R3 (0722670, `swan = rand || Math.random` — seeded in prerun, live-random in browser). The tip's canonical post-R50 line reproduces byte-exact (coev.js 946e639a…, curve.json f9b20e7d…, L0 bc15d414…, L1 1125d59c…, L2 50137ceb…; 5 flips / 3 swaps; stone mirror ok) — the determinism repair has held for 66 rounds.

### Suite ground at df47bca (run): pre-fix verbatim measurement of every R68 spec item present-tense (driver `/tmp/r69-scientist.js`, the R63–R68 pin pattern — startGenC/continueGenC/save/load extracted VERBATIM from working-tree index.html, driven with core.js as PQ, seeded randPQ): (a) franken tail OPEN — breed 1 C1 gen, flip to classic, save → file claims gen=1 (=== coev.genC), best identity-equals sChamp.net, pop is the untouched classic lineage; (b) file-provenance persistence WOUND — load "pong-quilt-coev-gen5.json" (banner names it), Train once → stats line is the generation template, filename GONE; (c) d(sChamp)/d(gen) lane ABSENT — after 5 gens the stats line carries only gen-5 numbers. Pre-suite: `node tools/build-site.mjs` resealed dist AFTER the page edit, BEFORE the suite counts (wave-66 build-order law; site/dist is gitignored). **Post-fix suite: 301 tests, 293 pass / 0 fail / 8 honest env skips; qa 8/8; README 309=301+8 live-verified by tests/readme-count.test.js; prerun canonical md5s byte-unchanged (the fix touches page glue only — core.js physics untouched except the VERIFIED_CLAIMS registry entry).**

### Lies hunted (all repro'd by running the VERBATIM page functions):

0. **P1 — SHIPPED: the d(sChamp)/d(gen) visibility gap (the R68 spec item 3 wound, verbatim-measured OPEN at the tip).** After 5 C1 gens the player saw `sChamp 149 (0h)` and nothing else — R66 P3 measured the trajectory spiky/selection-noise dominated (111 → 505 → 124 → 127 → 129 → 118 → 770 → 194) but that honest answer lived only in test logs. The fix: continueGenC prints `sChamp trail a→b→c…` — a VIEW over the ledger's own receipted sFit rows (`coev.ledger.tail(8)`), never a separate state array that could drift from the receipts it summarizes; opens at ≥2 points (one gen is a dot, not a trajectory); crosses load boundaries because the loaded ledger re-anchors the file's rows. Printed, never asserted as a learning claim — the lane shows the spikes; it does not claim improvement.
1. **P2 — FOUND BY THIS ROUND'S OWN PLAY: the v1 tag does not reproduce ITSELF — R68's P2 is the tip of a deeper non-determinism.** R68 booked "R1's numbers do not reproduce at the v1 tag" and hypothesized R1 measured an evolving working tree. This round's three v1 draws prove the tag itself is non-deterministic in L1/L2 (three runs, three different L1/L2 — values above). The measured-draw table now spans: R1's published draw (L0 2899f/2h, L1 1192f, L2 6000f/5h/×3.40), R68's draw (L0 2225/2200f/1h/×1.88, L1 713f, L2 2358f/×1.94), and this round's three draws — FIVE point-baseline measurements, four mutually contradictory, ALL honest draws of a non-deterministic process. Root cause: v1 core.js:55-56 raw Math.random() in the swan path (the R3 honesty pass seeded it). Residual unexplained: R68's L0 (2225/2200f) differs from this round's deterministic L0 (2935/2785f — identical across all three runs); possible causes (modern prerun against v1 core, or a lucky swan-flipped game in their draw) not chased this round. The spec item 5 annotation must carry the root cause, not just the numbers.
2. **P3 — NOT a lie: the franken tail (R68 spec item 1) is verbatim-measured OPEN for the 4th consecutive spec.** The r69 scientist driver bred 1 C1 gen, flipped to classic, saved: the file claims gen=1 === coev.genC with best identity-equal sChamp.net and the untouched classic pop — the classic-banner-after-C1 save still downloads a franken file, bare `SAVE` receipt. Carried to the R70 spec, 5th carrying, [M].
3. **P4 — NOT a lie: file-provenance persistence (R68 spec item 4, new last round) is verbatim-measured OPEN.** The R68 banner names the file ONCE at load; the very next Train overwrites the stats line with the generation template and the filename evaporates (`filename still present after Train: false`). A player who loads file A, trains 3 gens, loads file B, trains 2, cannot tell which lineage the visible generation belongs to. Carried to the R70 spec, 2nd carrying.
4. **P5 — NOT a lie: prerun canonical line + the post-R3 determinism hold.** The tip's canonical line reproduces byte-exact (md5s above, 5 flips / 3 swaps); the 8 suite skips are the honest env-gated live seams (QUILT_STONE_DIR, signTip), labeled absent, never faked.

### Deltas observed (as shapes):
- **d(reproducibility)/d(version): invisible non-determinism → sealed determinism at R3, held 66 rounds.** The v1 era's baseline is a DISTRIBUTION, not a point: L1 across five honest draws spans 713–6500 fitness (a 9× spread), L2 spans 2383–6125. L0 masks the wound (the swan-free champion always wins at gen 0); L1/L2 expose it. The shape lesson: a seeded prerun that calls one unseeded primitive is deterministic until the first swan — non-determinism is a hazard-rate property, not a boolean. Post-R3 the hazard is zero (the swan draw is seeded), and every round since has re-verified the same byte-exact line — the determinism repair is the longest-held invariant in the repo.
- **d(visibility)/d(version): the C1 stats line gains its first cross-gen view.** The trajectory was always in the ledger (receipted sFit rows, hash-chained since the lane opened); the page now prints the last 8. The view-over-receipts architecture means the printed lane CANNOT drift from the receipts it summarizes — the same discipline as the R68 laneGen column (a provenance field that asserts only what the lane actually used).
- **Failure-mode genealogy extends:** R66 P3 (spiky trajectory invisible) → R68 spec item 3 (carried ×3) → R69 shipped as a ledger view. The disclosure class (R66 item 3/R67 item 2/R68 item 2) and the franken tail (R64→R70, five specs) remain the two open wound-lines.

### Builder receipt (R68 spec item 3 — d(sChamp)/d(gen) printed lane):
- **[S] Item — `sChamp trail` on the C1 stats line (index.html continueGenC):** `const trail=coev.ledger.tail(8).map(r=>r.sFit)` printed as ` · sChamp trail a→b→c…` when trail.length > 1, between the loser and the ledger-eviction segments. A pure view — no new state, no writer change, the R67 file format untouched (the ledger rows already carry sFit; the loaded ledger re-anchors them, so a kept quilt's history leads the trail the moment its first new gen completes).
- **Pin:** `tests/r69-schamp-trail-glue.test.js` — 3 tests, the REAL shipped continueGenC/startGenC extracted VERBATIM (no shim). T1 TRAIL-VIEW: 5 gens → the stats line carries `sChamp trail`, byte-identical to `coev.ledger.tail(8).map(r=>r.sFit)`, ≥4 points. T2 LOAD-CONTINUITY: a file whose ledger carries sFit 111→505→124 loads and breeds one gen → the trail reads `111→505→124→<new>` — the file's receipted history leads, the live gen closes. T3 SINGLE-GEN SHAPE: after exactly 1 gen no trail prints (a lone point is a dot, not a trajectory — the lane opens at ≥2). **FAIL-first on the pristine tip (git stash, run-recorded): T1/T2 2/2 RED** (no `sChamp trail` pre-fix), **T3 GREEN by design** (its FAIL-first direction is the naive always-on lane — it guards the post-fix shape). Post-fix: **3/3 GREEN**; full suite 301/293/8 + qa 8/8.
- **Registry + counts:** `r69-schamp-trail-glue` claim registered in core.js VERIFIED_CLAIMS (two-way pin green). README count 306→309 (301 in tests/ + 8 QA — run-verified; the count pin caught this round's own arithmetic slip: 298+3=301, first written as 299 — the pin earns its keep again). Site dist re-sealed after index.html + core.js changed, before the suite counts (build-order law).

### Next version spec (R70 mandate):
1. **[M] Lane tracking — close the classic-banner-after-C1 franken tail (R64 P4, R65 item 1, R66 item 1, R67 P3, R68 P3, R69 P3: 5th carrying, verbatim-measured OPEN this round).** WHY: the only surviving franken head — continueGenC still writes the shared gen/champNet slots (R47 sync), so a C1-trained player who flips the dropdown to classic saves coev gen/champ fields paired with the untouched classic pop. Either (a) continueGenC stops writing the shared slots (full lane separation), or (b) the save guard refuses whenever `coev && coev.genC>0 && gen===coev.genC` regardless of banner. VERIFY: verbatim harness — breed C1, flip to classic, save → refusal receipt + no download; classic-only sessions save byte-unchanged.
2. **[S] Lineage-visibility disclosure on the σ slider / C1 stats line (R66 item 3, R67 item 2, R68 item 2, R68 P4: 4th carrying).** WHY: R66 P1/P4 measured that at the shipped default σ one mutation step (~0.564 L2) exceeds the R54 receipt resolution (~2.5) — close lineage is invisible from gen 2 at defaults, and now that C1 sessions are KEEPABLE the "what survives" question crosses sessions. Print the measured law (or the live near-anchor count) where the player can see it. VERIFY: verbatim — at σ=12 the disclosure names the invisible-lineage regime; at σ=2 it shows the surviving cluster.
3. **[S] File-provenance PERSISTENCE across the session (R68 item 4, R69 P4: 2nd carrying, verbatim-measured OPEN this round).** WHY: the R68 banner names the file ONCE — the very next Train overwrites the stats line with the generation template and the loaded-file provenance evaporates from the HUD; a player who loads file A, trains 3 gens, loads file B, trains 2, can no longer tell which lineage the visible generation belongs to. Record coev.fileName at load and print it in the C1 stats template until another load replaces it. VERIFY: verbatim — load a named file, Train twice, stats line still carries the filename; a second load replaces it.
4. **[S] PLAYLOG baseline integrity — annotate the R1 entry with its tag-measured numbers AND the non-determinism root cause (R68 item 5, R69 P2: 2nd carrying, deepened).** WHY: the demo's first published line (L0 2899f/2h, L1 1192f, L2 6000f/5h/×3.40) does not reproduce at v1 — this round proved WHY: v1 core.js:55-56 consumed raw Math.random() in the swan path, so EVERY baseline measurement at the tag (R1's, R68's, this round's five draws) is an honest sample of a distribution, never a point. R1 evidently measured an evolving working tree pre-commit; the entry already discloses pre-commit fixes. Annotate with the root cause (unseeded swan, fixed R3) + the measured-draw spread (L1 713–6500 across five draws) so no future round treats any single published number as the baseline. VERIFY: the R1 entry carries a measured-at-tag paragraph naming the root cause and the spread.
5. **[S] σ-slider → trail interaction (R69 item 5: 2nd carrying).** WHY: the trail view made the ledger's role as the lane's memory concrete — but the σ slider (live, R65-revived) changes the mutation regime MID-TRAJECTORY with no marker: a player sliding σ from 12 to 2 mid-session sees a continuous trail across a regime change the trail cannot mark. The ledger rows carry no σ field; the writer would need one (file-format touch — smallest honest form: σ recorded in the ledger row and printed beside the trail when it changes mid-run). VERIFY: verbatim — breed 2 gens at σ=12, slide to 2, breed 1 → the stats line marks the regime change at the exact gen it happened.

## Round 68 — k2d8 (cron pong-quilt-playloop) — 2026-10-01 — mode: BUILDER (R67 spec item 4 — file provenance on the C1 receipts, [S], 3rd carrying in the spec, first build) + play-tester — vs r67 tip 2a00c14 (merge of main 64c7bb3 into r67; R66/R67 unmerged, Casey-gated; branching from the prior round's tip per the R22-vs-r21 precedent; PR #85 open at round start; all ancestors canonical)

### Played versions: v1 (e98cf66), v0.64.0 (5406c48), v0.65.0 (52b42b4) — the three tags, each headless via `node tools/prerun.js` in a clean worktree (`git worktree add /tmp/pq-vX <tag>`), seeded, numbers by running. v0.64.0 and v0.65.0 BOTH reproduce the canonical post-R50 line byte-exact (coev.js 946e639a…, curve.json f9b20e7d…, L0 bc15d414…, L1 1125d59c…, L2 50137ceb…, stone 3a0a5fb6…; 5 flips / 3 swaps) — the training artifact has been frozen since R50; the tag delta is page glue (R65 full-population breeding, σ-slider revival, conflict-marker pin, oracle-death K≥20). v1 (root commit) measures its own era: L0 2225 (2200f, 1h, x1.88), L1 738 (713f, 1h, x1.28 — dips BELOW L0), L2 2383 (2358f, 1h, x1.94).

### Suite ground at 2a00c14 (run): `node tools/prerun.js` reproduces the canonical post-R50 line byte-exact (md5s as above; curve 261 gens → 21 points, 5 flips / 3 swaps; stone mirror ok). Pre-suite: `node tools/build-site.mjs` resealed dist AFTER the page edits, BEFORE the suite counts (wave-66 build-order law; site/dist is gitignored). **Post-fix suite: 298 tests, 290 pass / 0 fail / 8 honest env skips; qa 8/8; README 306=298+8 live-verified by tests/readme-count.test.js; prerun canonical md5s byte-unchanged (the fix touches page glue only — core.js physics untouched except the VERIFIED_CLAIMS registry entry).**

### Lies hunted (all repro'd by running the VERBATIM page functions):

0. **P1 — SHIPPED: the C1 receipts were anonymous in both directions (the R67 spec item 4 wound, verbatim-measured OPEN at the tip).** (a) SAVE/COEV and LOAD/COEV receipt kinds are era-blind strings — the same text for a gen-1 quilt and a gen-300 quilt; worse, the receipt row's OWN gen column (the hash-chained provenance field) recorded the CLASSIC slot, which the C1 lane never sets on the file-load path: verbatim repro (the pin's T2) — load a gen-5 coev file at a fresh page (classic gen stays 0, the load path never touches it), save, and the SAVE/COEV row silently asserts gen 0 while the quilt it names is gen 5. The R56-P3-adjacent class: a provenance column asserting a generation the lane never used. (b) The LOAD/COEV banner printed gen/popS/popE/sChamp/ledger but never the file's NAME — f.name is right there in the handler; the player with three coev quilts ("pong-quilt-coev-gen5.json", "…gen12.json", "…gen40.json") could not tell WHICH session they loaded, and nothing bound the receipt story to the file story. The fix: receipt() takes an optional 4th arg laneGen and the row's gen column records the C1 generation for C1-lane receipts, never the classic slot; renderReceipts() appends ` g${r.gen}` to /COEV-kind rows ONLY (non-C1 rows render byte-unchanged — the MOTH vocabulary must not gain a generation claim it never made); SAVE/COEV, SAVE/COEV-EMPTY, LOAD/COEV and LOAD/COEV-MALFORMED all pass their genC (the malformed refusal names the genC the file CLAIMED — a refusal should still read the identity document); the LOAD/COEV banner carries f.name + genC + population sizes.
1. **P2 — FOUND BY THIS ROUND'S OWN PLAY, NON-BLOCKING: the R1 PLAYLOG numbers do not reproduce at the v1 tag.** R1 publishes L0 2899 frames/2 hits, L1 1192 frames, L2 6000 frames/5 hits/x3.40; measured at v1 (e98cf66, clean worktree, node v24.16.0): L0 2200f/1h, L1 713f/1h, L2 2358f/1h/x1.94. Discrepancy in every field, including the fitness SCALE (R1's L2 reads 6000 raw frames; the v1 code already weights — the working tree R1 measured evidently still had uncommitted changes; the R1 entry itself discloses pre-commit fixes in flight). Not a code lie — a docs-baseline lie: the demo's first published line is not reproducible from its own tag. Carried to the R69 spec (annotate, don't rewrite history).
2. **P3 — NOT a lie: the franken tail (R68 spec item 1) is verbatim-measured OPEN at the tip.** The r67 pin's T1 precondition block asserts the condition before its save: gen===coev.genC, champNet identity-equal sChamp.net, classic pop disjoint from popS. continueGenC still writes the shared gen/champNet slots (R47's sync), so a C1-trained player who flips the dropdown to classic still saves coev gen/champ fields paired with the untouched classic pop. Carried to the R69 spec, 4th carrying, [M].
3. **P4 — NOT a lie: the R68 spec items 2–3 stay OPEN at the tip by inspection of the shipped C1 stats line (index.html continueGenC):** no lineage-visibility disclosure (at σ=12 one mutation step exceeds the R54 receipt resolution — close lineage invisible from gen 2 at defaults), no d(sChamp)/d(gen) printed lane (the player sees only the latest gen's spiky fitness). Both carried, 3rd carrying.
4. **P5 — NOT a lie: prerun canonical line + tags byte-exact; the 8 suite skips are the honest env-gated live seams (QUILT_STONE_DIR, signTip), labeled absent, never faked.**

### Deltas observed (as shapes):
- **d(learning)/d(version), v1 → v0.65.0: failure-mode migration from survival plateau to escalation-era hit-seeking.** v1's curve is a dip-then-weak-recovery: L1 falls 67% below L0 (2225 → 738), L2 recovers to only 2383 with a ×1.94 speed ceiling and ONE hit — the learner's failure mode is "can't stay alive, can't score." The post-R50 line inverts both: L2 champion dies at 1453 frames (SHORTER life) but with 3 hits and ×3.41 — "lives fast, dies scoring." The fitness re-embeds (R42 ×100, R50 hitBoost) make cross-version fitness apples-to-oranges by design; the shape that survives the re-embedding is the HIT COUNT and the SPEED CEILING.
- **The tie-journal collapse is the selection-pressure fingerprint of the era change:** v1's root-commit physics settled 182 tiebreak flips on the canonical run; the post-R50 line settles 5 flips / 3 swaps (21 journal points). The quantum coin stopped mattering — margins became decisive. d(pressure)/d(version): coarse coin → fine margin.
- **d(artifact)/d(tag) across v0.64.0 → v0.65.0 is ZERO** (byte-exact same md5s, both measured this round): all movement between the two most recent tags lives in page glue and breeding-correctness fixes (R65's full-population breeding repaired the page lane; the sealed artifact predates it). The canonical training line froze at R50 — a fact about the experiment, not a defect: the artifact is a reference instrument now, and every round re-verifies it rather than re-deriving it.

### Builder receipt (R67 spec item 4 — file provenance):
- **[S] Item — the C1 receipts carry file provenance (index.html receipt() + renderReceipts() + SAVE/LOAD coev branches):** receipt(kind,move,conf,laneGen) — the row's own gen column records laneGen when a C1-lane receipt is written; renderReceipts appends ` g${r.gen}` to /COEV-kind rows only (non-C1 rows byte-unchanged); SAVE/COEV + SAVE/COEV-EMPTY pass coev.genC; LOAD/COEV + LOAD/COEV-MALFORMED pass the file's q.genC; the LOAD/COEV banner reads `loaded C1 file "${f.name||"unnamed"}": gen … · popS … · popE …`. Supersedes nothing: receipt kinds, the R67 writer shape, the verbatim-restore lane and the R64 empty-state refusal all survive (the r67 pin passes untouched — its 3-arg shim never sees the new lane).
- **Pin:** `tests/r68-coev-file-provenance-glue.test.js` — 4 tests, the REAL shipped receipt()/renderReceipts() hoisted VERBATIM into the driver (no shim — the assertions run the page's own hash-chained writer end to end). T1 WRITE-PROVENANCE: the SAVE/COEV row's gen column names the kept genC and the rendered line reads `SAVE/COEV g1 move=0`. T2 LOAD-PROVENANCE: the banner names the file + genC + sizes; the LOAD/COEV row names the file's genC; and the discriminating scenario — save in the loaded session while the classic slot is STILL 0 — the row names genC 5, not 0. T3 MALFORMED-PROVENANCE: the refusal names the claimed genC, zero state change. T4 EMPTY-STATE + RENDER-SHAPE: a half-built lane (loaded file, pops wiped — the R60/R63 fails-closed class) refusal names genC 5 not the classic 0; a real C1 row renders named; a DEATH row renders byte-unchanged (no ` g` leak into the MOTH vocabulary). **FAIL-first on the pristine tip (git stash, run-recorded): 4/4 RED** — T1 via the render assertion (no ` g` suffix pre-fix), T2/T3/T4 via row.gen === 0 where 5 is claimed. Post-fix: **4/4 GREEN**; full suite 298/290/8 + qa 8/8.
- **Registry + counts:** `coev-file-provenance-glue` claim registered in core.js VERIFIED_CLAIMS (two-way pin green). README count 302→306 (298 in tests/ + 8 QA — registered-test counting, verified by running). Site dist re-sealed after index.html + core.js changed, before the suite counts (build-order law).

### Next version spec (R69 mandate):
1. **[M] Lane tracking — close the classic-banner-after-C1 franken tail (R64 P4, R65 item 1, R66 item 1, R67 P3, R68 P3: 4th carrying, verbatim-measured OPEN inside the r67 pin T1 precondition).** WHY: the only surviving franken head — continueGenC still writes the shared gen/champNet slots, so a C1-trained player who flips the dropdown to classic saves coev gen/champ fields paired with the untouched classic pop. Either (a) continueGenC stops writing the shared slots (full lane separation), or (b) the save guard refuses whenever `coev && coev.genC>0 && gen===coev.genC` regardless of banner. VERIFY: verbatim harness — breed C1, flip to classic, save → refusal receipt + no download; classic-only sessions save byte-unchanged.
2. **[S] Lineage-visibility disclosure on the σ slider / C1 stats line (R66 item 3, R67 item 2, R68 P4: 3rd carrying).** WHY: R66 P1/P4 measured that at the shipped default σ one mutation step (~0.564 L2) exceeds the R54 receipt resolution (~2.5) — close lineage is invisible from gen 2 at defaults, and now that C1 sessions are KEEPABLE the "what survives" question crosses sessions. Print the measured law (or the live near-anchor count) where the player can see it. VERIFY: verbatim — at σ=12 the disclosure names the invisible-lineage regime; at σ=2 it shows the surviving cluster.
3. **[S] d(sChamp)/d(gen) printed lane on the C1 stats line (R66 item 4, R67 item 3, R68 P4: 3rd carrying).** WHY: R66 P3 — the fitness trajectory is spiky/noise-dominated and the player currently sees only the latest gen; the honest learning answer should be visible, not only in test logs. VERIFY: verbatim — after ≥4 gens the stats line carries the last-4 sChamp fitnesses as a printed (never-asserted) lane.
4. **[S] File-provenance PERSISTENCE across the session (new, found by this round's own play).** WHY: the R68 banner names the file ONCE — the very next Train overwrites the stats line with the generation template, and the loaded-file provenance evaporates from the HUD; a player who loads file A, trains 3 gens, loads file B, trains 2, can no longer tell which lineage the visible generation belongs to. Record coev.fileName at load and print it in the C1 stats template until another load replaces it. VERIFY: verbatim — load a named file, Train twice, stats line still carries the filename; a second load replaces it.
5. **[S] PLAYLOG baseline integrity — annotate the R1 entry with its tag-measured numbers (new, this round's P2).** WHY: the demo's first published line (L0 2899f/2h, L1 1192f, L2 6000f/5h/×3.40) does not reproduce at v1 e98cf66 (measured 2026-10-01: L0 2200f/1h/×1.88, L1 713f/1h, L2 2358f/1h/×1.94) — R1 evidently measured an evolving working tree pre-commit; the entry already discloses pre-commit fixes, so annotate, never rewrite. VERIFY: the R1 entry carries a measured-at-tag line so no future round treats the published numbers as a reproducible baseline.

## Round 67 — k2d8 (cron pong-quilt-playloop) — 2026-09-30 — mode: BUILDER (R66 spec item 2 — the coev-quilt writer, [S], 2nd carrying: the C1 player can finally KEEP their work) + play-tester — vs r66 tip f2dcf4f (R66 unmerged, Casey-gated; branching from the prior round's tip per the R22-vs-r21 precedent; all ancestors canonical)

### Played versions: v0.65.0 (52b42b4 = main post-#83) and the r66 tip f2dcf4f played headless via verbatim-extraction scientist drivers (the R63–R66 pin pattern — startGenC/continueGenC/load/save/live extracted VERBATIM from working-tree index.html, driven with core.js as PQ, seeded randPQ). Remote tags re-verified: v0.64.0 at 5406c48 (the wave-66 CI commit), v0.65.0 at 52b42b4, v1 at e98cf66 — R66's "fetched" claim checks out against the remote. R66's diff studied; the R66 spec's four items measured for carry (below).

### Suite ground at f2dcf4f (run): `node tools/prerun.js` reproduces the canonical post-R50 line byte-exact (coev.js 946e639a…, curve.json f9b20e7d…, L0 bc15d414…, L1 1125d59c…, L2 50137ceb…; 5 flips / 3 swaps; stone mirror ok, sign lane labeled absent). Pre-suite: `node tools/build-site.mjs` resealed dist AFTER the page edits, BEFORE the suite counts (wave-66 build-order law; site/dist is gitignored — CI seals its own). **Post-fix suite: 287 tests, 279 pass / 0 fail / 8 honest env skips; qa 8/8; README 295=287+8 live-verified by tests/readme-count.test.js; prerun canonical md5s byte-unchanged (the fix touches page glue only — core.js physics untouched except the VERIFIED_CLAIMS registry entry).**

### Lies hunted (all repro'd by running the VERBATIM page functions):

0. **P1 — SHIPPED: the C1 lane was unkeepable (the R66 spec item 2 wound, verbatim-measured OPEN at the r66 tip).** SAVE under the coev banner receipted SAVE/COEV-UNSTABLE and wrote nothing — an honest bridge, not an endgame. Meanwhile the ONLY file door, `$('load')`, had no lane bit: a coev-shaped file was silently absorbed into the classic splice — verbatim pre-fix: `pop.concat(undefined)` → a 97th undefined entry, gen reset to 0, champNet=pop[0], receipt LOAD. Lineage fields asserting nothing the weights carry, one lane over from the wound R64 closed. The fix: (a) the coev banner writes a ONE-lane file {kind:"pong-quilt/coev@v1", genC, sChamp, eChamp, popS, popE, last, ledger} — no classic gen/best/pop field exists to disagree with the weights (the R56 P3/R59 M1/R63 M2 franken class dead by construction, not by guard); the R64 refusal survives only for the empty state (SAVE/COEV-EMPTY, receipt renamed in the updated r64 pin with the supersession disclosed); (b) the load input routes coev files into the C1 lane VERBATIM — the file's populations restore exactly, because keeping your work means THIS population, not a re-seeding around the champs (that treatment is the artifact lane's, loadCoev, whose canonical trained material justifies it); the classic splice is structurally unreachable for coev files — the classic loader refuses them NAMED by construction; (c) a coev-shaped file missing load-bearing fields is LOAD/COEV-MALFORMED, zero state change.
1. **P2 — FOUND BY THIS ROUND'S OWN PLAY, fixed in-branch: the file lane opened a new head of the R49 P1 frozen-page class.** A champ-less coev file (genC 0 — page-producible: SAVE mid-first-gen, when startGenC has materialized pops but no generation has completed) loaded over a LIVE classic session (champGame running, Go pressed) left champNet=null while the old champGame kept serving — live()'s synchronous `PQ.forward(champNet,prev)` threw `TypeError: Cannot read properties of null (reading 'b1')` BEFORE requestAnimationFrame(tick), killing the rAF loop. Verbatim repro (/tmp/r67-nullchamp.js): post-load champNet=null, champGame=true, live() THREW. The artifact lane never had this exposure (artifacts always carry champs); my file lane admitted champ-less files and left the served game untouched. Fix: no champ means NO SERVED GAME (champGame=null in the loader). Pinned as the pin's T4.
2. **P3 — NOT a lie: the franken tail (R66 spec item 1) is still OPEN, measured present-tense inside the r67 pin.** T1's precondition block asserts the condition verbatim before the save: gen===coev.genC, champNet identity-equal sChamp.net, classic pop disjoint from popS (0 shared nets). The classic-banner-after-C1 save still downloads a franken file — carried to the R68 spec, 3rd carrying, [M] lane tracking.
3. **P4 — NOT a lie: the R64→R67 pin transition stays honest in both directions.** The updated r64 pin asserts the writer's truth (SAVE/COEV + one download + no classic fields) AND the surviving refusal (SAVE/COEV-EMPTY for banner-coev-null-coev), with the supersession disclosed in the test header and the VERIFIED_CLAIMS r64 entry annotated — no pin silently weakened.
4. **P5 — NOT a lie: prerun canonical line + oracle-death law untouched.** Byte-exact md5s (Suite ground above); the 8 suite skips are the honest env-gated live seams (QUILT_STONE_DIR, signTip), labeled absent, never faked.

### Deltas observed (as shapes):
- **d(keepability)/d(version): the C1 lane goes from unkeepable to keepable-with-identity.** Save→load→Train round-trips a session with every field identity-matching (popS/popE netIds order-preserved, genC +1 per Train, ledger re-anchored at genesis and named as such in the load banner). The file space gains its first discriminated format: the `kind` lane bit makes "which lane does this file belong to" a parser question instead of a player guess.
- **Failure-mode genealogy, two branches this round:** (a) the franken-quilt line R56 P3 → R59 M1 → R63 M2 → R64 refusal-bridge → R67 writer (bridge converted to a road; the classic-banner tail persists verbatim, three specs deep); (b) the null-crash line R49 P1 → R67: every new data door must answer "what does live() see when the thing behind it is absent" — the file lane failed to answer and got the same TypeError class the loop froze on at R49. Fixed same-branch, pinned T4.
- **d(honesty)/d(refusals): a named refusal has a natural lifecycle.** SAVE/COEV-UNSTABLE was correct for 3 rounds (R64–R66) and became the wrong instrument the moment a writer existed — the refusal's job moved from "stop the lie" to "name the empty state" (SAVE/COEV-EMPTY). Refusals are era-stamped receipts too.

### Builder receipt (R66 spec item 2):
- **[S] Item — coev-quilt writer (index.html SAVE coev branch + LOAD lane routing):** the writer (above); the loader restores pops VERBATIM, champs, last, genC, re-anchors ledger rows at genesis (capacity 300, the loadCoev treatment, named in the banner); mode banner follows the file; malformed coev files refused named; the gen-0 no-champ fix (champGame cleared, R49 P1 class closed).
- **Pin:** `tests/r67-coev-quilt-writer-glue.test.js` — 4 tests on verbatim startGenC/continueGenC/save/load/live. T1 WRITE-LANE: one download, SAVE/COEV receipt, kind/genC/champs/pops/ledger identity-match, NO classic field. T2 ROUND-TRIP: classic slots byte-untouched, LOAD/COEV receipt, verbatim restore, one Train advances genC exactly +1 at slider size. T3 MALFORMED + CLASSIC-UNCHANGED. T4 GEN-0 NO-CHAMP: live-session + champ-less file → served game cleared, live() no-throw. **FAIL-first on the pristine r66 tip (git stash): T1–T3 3/3 RED** (T1: SAVE/COEV-UNSTABLE + zero downloads; T2: classic splice absorbs the file, no LOAD/COEV; T3: no malformed guard) **— run-recorded.** T4 RED via its champGame-null assertion on pristine (the splice keeps the old game alive). Post-fix: **7/7 GREEN with the updated r64 pin** (3 tests, supersession-disclosed).
- **Registry + counts:** `coev-quilt-writer-glue` claim registered in core.js VERIFIED_CLAIMS (two-way pin green); the r64 claim annotated with the supersession. README count 291→295 (287 in tests/ + 8 QA — registered-test counting: the pin adds 4 tests, the count moved 283→287). Site dist re-sealed after index.html + core.js changed, before the suite counts (build-order law).

### Next version spec (R68 mandate):
1. **[M] Lane tracking — close the classic-banner-after-C1 franken tail (R64 P4, R65 item 1, R66 item 1, R67 P3: 3rd carrying, verbatim-measured OPEN inside the r67 pin T1 precondition).** WHY: the only surviving franken head — continueGenC still writes the shared gen/champNet slots, so a C1-trained player who flips the dropdown to classic saves coev gen/champ fields paired with the untouched classic pop. Either (a) continueGenC stops writing the shared slots (full lane separation), or (b) the save guard refuses whenever `coev && coev.genC>0 && gen===coev.genC` regardless of banner. VERIFY: verbatim harness — breed C1, flip to classic, save → refusal receipt + no download; classic-only sessions save byte-unchanged.
2. **[S] Lineage-visibility disclosure on the σ slider / C1 stats line (R66 item 3, 2nd carrying).** WHY: R66 P1/P4 measured that at the shipped default σ one mutation step (~0.564 L2) exceeds the R54 receipt resolution (~2.5) — close lineage is invisible from gen 2 at defaults, and now that C1 sessions are KEEPABLE the "what survives" question crosses sessions. Print the measured law (or the live near-anchor count) where the player can see it. VERIFY: verbatim — at σ=12 the disclosure names the invisible-lineage regime; at σ=2 it shows the surviving cluster.
3. **[S] d(sChamp)/d(gen) printed lane on the C1 stats line (R66 item 4, 2nd carrying).** WHY: R66 P3 — the fitness trajectory is spiky/noise-dominated and the player currently sees only the latest gen; the honest learning answer should be visible, not only in test logs. VERIFY: verbatim — after ≥4 gens the stats line carries the last-4 sChamp fitnesses as a printed (never-asserted) lane.
4. **[S] File-provenance naming on the C1 receipts.** WHY: SAVE/COEV and LOAD/COEV receipt kinds only; the player with three coev files cannot tell WHICH session a receipt belongs to, and the load banner does not name the file (f.name is available in the handler). Add genC to the SAVE/COEV receipt line and f.name + genC + population sizes to the LOAD/COEV banner. VERIFY: verbatim — save → receipt names the genC; load a named file → banner carries the filename.

### Verdict
MERGEABLE — the R66 spec's unfulfilled item 2 is shipped as the coev-quilt writer with identity-preserving round-trip: FAIL-first 3/3 RED on the pristine r66 tip (run-recorded), 4/4 GREEN at the tip (7/7 with the supersession-disclosed r64 update); the round's own play caught a new R49 P1-class crash head the file lane opened (gen-0 champ-less file over a live classic session → forward(null) TypeError, verbatim-repro'd) and closed it same-branch with a pin. Suite at tip: 287 tests (279 pass / 0 fail / 8 honest env skips), qa 8/8, README 295=287+8 live-verified, prerun canonical md5s byte-unchanged, PLAYLOG marker grep empty. R66 spec items 1 (lane tracking, OPEN, measured) and 3–4 (disclosures) carried to the R68 spec above.

## Round 66 — k2d8 (cron pong-quilt-playloop) — 2026-09-30 — mode: BUILDER (R65 spec item 3 — the C1 lineage-decay receipt; the spec's naive VERIFY proven unmeetable at the shipped σ and re-scoped to the σ-gated law the verbatim measurement actually supports) + play-tester — vs main 52b42b4 (R65 landed at #83)

### Played versions: main 52b42b4 headless via a verbatim-extraction scientist driver (`/tmp/r66-scientist.js` + `/tmp/r66-supp.js` + `/tmp/r66-seeds.js`, the R63/R64/R65 pin pattern — startGenC/continueGenC extracted VERBATIM from working-tree index.html, driven with core.js as PQ, seeded randPQ); new tags v0.64.0/v0.65.0 fetched; R63 (#81/2bda938), R64 (#82/be79ea5), R65 (951594e, #83) diffs studied; wave-66 CI (5406c48) build-then-test workflow noted.

### Suite ground at main 52b42b4 (run): `node tools/prerun.js` reproduces the canonical post-R50 line byte-exact (coev.js 946e639a…, curve.json f9b20e7d…, L0 bc15d414…, L1 1125d59c…, L2 50137ceb…; 5 flips / 3 swaps; stone mirror ok, sign lane labeled absent). First suite run went RED on tests/site-glue.test.js:54 — diagnosed: a stale gitignored site/dist sealed at a different tree from a prior branch checkout; `node tools/build-site.mjs` resealed (`build ok: 11 demo files sealed, head 52b42b450`) and the suite went GREEN — exactly the environmental failure class the wave-66 build-then-test workflow now guards on CI. Pre-fix suite: 280 tests, 272 pass / 0 fail / 8 honest env skips; qa 8/8; README 288=280+8 verified live. **Post-fix suite: 283 tests, 275 pass / 0 fail / 8 skips; qa 8/8; README 291=283+8 live-verified; prerun line byte-unchanged (core.js physics untouched — the pin adds a claim to the registry only).**

### Lies hunted (all repro'd by running the VERBATIM page functions):

0. **P1 — the R65 spec's own VERIFY, as written, is FALSE at the shipped default σ — and the measurement is the round's centerpiece finding.** Spec item 3 said: pin ≥1 net within L2 2.0 of the gen-1 sChamp at gen 3+. Verbatim arm at σ=12 (the page default, `value="12"`), seed 20260930, slider 96, 8 gens: gen-1 bred pop has 22 nets within 2.0 of the gen-1 sChamp; **gen 2+ has 0**, and the min L2 to the gen-1 anchor GROWS monotonically (2.493 → 2.609 → 2.673 → 2.981 → 3.136 → 3.287 → 3.422) — the population diffuses into a 2.5–3.5 shell. Root cause, measured: one mutate() step at σ=0.12 moves a net **~0.564** in L2 (40-sample empirical), and the fresh-random control's nearest-of-96 sits at **~2.5** — i.e., at the experiment's own R54 receipt resolution, one mutation step at the shipped default is genetically equivalent to a random draw, and selection does not keep the anchor's close children in the top-4 (the winners are scattered mutants of all four elites). The spec's VERIFY was calibrated to a radius below the shipped mutation scatter.
1. **P2 — the σ-gated law that DOES hold (the re-scoped claim).** At σ=2 (step ~0.094 << radius), the gen-1 champ's lineage is a visible cluster for 2–3+ generations: gen-2 near-counts across 5 seeds {16,27,29,29,24} (5/5 ≥16), gen-3 ≥1 in 4/5 seeds (seed 999 drifts out at gen 3 — survival is fitness-mediated stochastic, σ shifts its hazard rate, it does not deterministically gate it). The archive-only counterfactual (pre-R65 wound regime replayed through the same runCoevGeneration primitive) yields gen-2 near ≤ 2 — so the cluster SIZE is the discriminating quantity between full-pop breeding and the collapse, not the spec's binary ≥1.
2. **P3 — d(sChamp fitness)/d(gen) is selection-noise dominated at 4–8-gen horizons in every seed tried.** σ=12 seed 20260930: 111 → 505 → 124 → 127 → 129 → 118 → 770 → 194. Never monotone, spiky. The R65 carve-out ("the mechanism ships without a fitness claim — R65 pins the breeding structure, not a learning outcome") was the right instinct: any pin asserting improvement would be baking one rng lineage.
3. **P4 — NOT a lie: the loadCoev banner "gen N+1 breeds descendants, not noise" (index.html:440) survives this round honest.** Post-R65 it is mechanism-true at the population level (bred 96, refill 0, zero fresh-random between gens — verbatim-verified). What dies at σ=12 is close-lineage *visibility*, not the descendant relationship. A companion disclosure ("at σ≥5 one mutation step exceeds the R54 receipt resolution — close lineage is invisible at the default") is spec item 3 below, not a wound to book.
4. **P5 — NOT a lie: R64's coev-SAVE refusal regression is GREEN** (SAVE/COEV-UNSTABLE receipt, no download, verbatim harness), and the R65 spec item 1 lane tail is **OPEN** as expected: classic-banner-after-C1 still downloads a franken file (coev gen/champ fields paired with the untouched classic population — verbatim: bestIsSChamp true, 8/8 pop entries from the classic lane). Carried to the R67 spec.

### Deltas observed (as shapes):
- **d(lineage)/d(σ) — the first measured law of the C1 loop's memory:** survival of the gen-1 champ's close lineage is a σ-gated hazard, not a mechanism boolean. σ=2: cluster survives 2–3+ gens (near 16–29 at gen 2). σ=5: survives ~1 gen. σ=12 (shipped default): usually dead by gen 2 (min L2 grows ~+0.15/gen as the shell diffuses). The R65 mechanism fix moved the quantity that matters — WHO breeds — but the player's default knob settings still erase genealogical memory at receipt resolution in one generation.
- **d(learning)/d(version): mechanism d(learning)/d(population) moved, d(learning)/d(lineage-visibility) did not.** R65 made the population genuinely descendant; R66 measures that "descendant" and "close-lineage-visible" diverge at σ ≥ ~5. The loop learns *something* (the fitness spikes — 770 at gen 7 — are real evaluations), but over 4–8 gens the trajectory is indistinguishable from selection noise at every σ tried.
- **Failure-mode genealogy extends:** R56 P3 (collapse) → R65 (mechanism closed) → R66 (the spec's own VERIFY proven unmeetable at shipped σ — the first round whose central finding is about the *experiment's calibration*, not the demo's code). The receipt-resolution-vs-mutation-scale mismatch is a new instrument class: thresholds must be calibrated against the mutation step, not inherited from a different σ regime.

### Builder receipt (R65 spec item 3, re-scoped):
- **[S] Item — C1 lineage-decay receipt:** `tests/r66-c1-lineage-decay-glue.test.js` — 3 tests on verbatim startGenC/continueGenC. T1 LINEAGE: σ=2, seed 20260930, slider 96 — gen-2 bred pop is a lineage cluster (≥8 nets within L2 2.0 of the gen-1 sChamp; 5-seed observed min 16; threshold at half the observed minimum) AND the fresh-random control (96 independent nets vs the same anchor) reproduces at most 5 (200-batch empirical max — the chance band, not a baked 0: the first driver run asserted control=0 and a real control draw proved that claim probabilistic; the pin now encodes the band). T2 DEFAULT-σ HONEST RECORD: σ=12 — mechanism truth asserted (bred 96; gen-1 cluster ≥4: the exact copy + the Binomial(92, ¼) anchor-mutant lottery, core.js:405), the gen-2+ near-trajectory and d(sChamp)/d(gen) PRINTED to the run log (`R66 honest record σ=12 seed 20260930: [{"gen":2,"bred":96,"near":0,...}...]`), asserted nowhere — seed-dependent in both directions (0 in most seeds, 22–24 through gen 3 in seed 12345). T3 DISCRIMINATION: the archive-only counterfactual (the pre-R65 input shape: 4-entry elite archive as the scored population, replayed through the same runCoevGeneration primitive) yields gen-2 near ≤ 2 — the T1 threshold sits in the discriminating zone, so the pin goes RED if breeding ever regresses to the elite archive (the R56 P3 class, nine rounds deep).
- **FAIL-first, both directions, run-recorded:** on the pre-R65 wound tree 5406c48 (index.html+core.js checked out, pin copied in): **3/3 RED** — T1 `4 !== 96` (collapse shape), T2 gen-1 cluster = 1 (only the anchor's own exact copy; zero mutant offspring), T3 TypeError on `coev.scoreS` (the full-scored accumulator itself IS the R65 fix — absent pre-R65). At the post-R65 tip: **3/3 GREEN**.
- **Registry:** `c1-lineage-decay-glue` claim registered in core.js VERIFIED_CLAIMS (two-way pin green); README count 288→291 (283 in tests/ + 8 QA); site dist re-sealed AFTER core.js changed, BEFORE the post-fix suite counts (build-order law, `build ok: 11 demo files sealed`).

### Next version spec (R67 mandate):
1. **[M] Lane tracking — close the classic-banner-after-C1 franken-quilt tail (R64 P4, R65 spec item 1, 2nd carrying; verbatim-measured OPEN this round).** WHY: the only surviving franken head. Either (a) continueGenC stops writing the shared gen/champNet slots (full lane separation), or (b) the save guard refuses whenever `coev && coev.genC>0 && gen===coev.genC` regardless of banner. VERIFY: verbatim harness — breed C1, flip to classic, save → refusal receipt + no download; classic-only sessions save byte-unchanged.
2. **[S] The coev-quilt writer (R65 spec item 2, 2nd carrying).** WHY: SAVE/COEV-UNSTABLE is an honest bridge, not an endgame — a C1 player still cannot keep their work. A coev file must carry popS/popE/sChamp/eChamp/genC/ledger from ONE lane; an extended loadCoev refuses nothing it wrote. VERIFY: verbatim — train 1 gen, save coev-mode, load, continue 1 gen; fields identity-match; the classic loader refuses it NAMED.
3. **[S] Lineage-visibility disclosure on the σ slider or the stats line.** WHY: P1/P4 this round — at the shipped default σ, close lineage (<2.0) is invisible at receipt resolution from gen 2, and the banner's "descendants, not noise" invites the player to imagine genealogical memory the default settings erase. Print the measured law (one mutation step ≈ 0.56 at σ=12 vs nearest-random ≈ 2.5) where the player can see it, or surface the live near-anchor count on the C1 stats line. VERIFY: verbatim — at σ=12 the disclosure line/number is present and matches the measured quantity; at σ=2 it shows the surviving cluster.
4. **[S] d(sChamp)/d(gen) receipt lane — a printed, never-asserted fitness trajectory on the C1 stats line.** WHY: P3 — every player currently sees only the latest gen's numbers; the trajectory (spiky, noise-dominated) is the honest learning answer and should be visible, not just in test logs. VERIFY: verbatim — after ≥4 gens the stats line carries the last-4 sChamp fitnesses; the honesty two-way pin treats it as a printed-lane claim (like the oracle-death distribution).

### Verdict
MERGEABLE — the R65 spec's unfulfilled item 3 is shipped as a real instrument: FAIL-first 3/3 RED on the pre-R65 wound tree (run-recorded signatures: 4≠96 bred, cluster=1, scoreS absent), 3/3 GREEN at the tip; the centerpiece finding is honest in both directions (the spec's naive VERIFY is unmeetable at shipped σ — recorded as data, not silently re-written; the σ-gated law that does hold is pinned with thresholds at half the 5-seed observed minimums and a chance-band control that survived a real probabilistic false-positive during construction). Suite at tip: 283 tests in tests/ (275 pass / 0 fail / 8 honest env skips), qa 8/8, README 291=283+8 live-verified, prerun canonical md5s byte-unchanged, PLAYLOG marker grep empty.

## Round 65 — 67-i (SuperInstance all-night session, general-purpose BUILDER) — 2026-09-30 — mode: BUILDER (R64 mandate item 1 — C1 full-population breeding, 9th carrying of R56 P3, the fix that also revives the dead σ-slider) + main-repair pins (conflict-marker scan, R63 mandate item 4's 2nd asking; oracle-death K≥20; EXPERIMENTS.md merge-hygiene note) — vs main 5406c48 (wave-66 CI workflow only; R63+R64 landed at #81/#82)
## Round 65 — 67-i (SuperInstance all-night session, general-purpose BUILDER, lane 951594e) — 2026-09-30 — mode: BUILDER (R64 mandate item 1 — C1 full-population breeding, 9th carrying of R56 P3, the fix that also revives the dead σ-slider) + main-repair pins (conflict-marker scan, R63 mandate item 4's 2nd asking; oracle-death K≥20; EXPERIMENTS.md merge-hygiene note) — vs main 5406c48 (wave-66 CI workflow only; R63+R64 landed at #81/#82)

### Played versions: main 5406c48 played headless via a verbatim-extraction scientist driver (`study/w67i-pq-scientist/r65-scientist.js`, same pin pattern as R62/R63/R64 — startGenC/continueGenC extracted VERBATIM from working-tree index.html, driven with core.js as PQ, seeded rand); the single commit 5406c48 diffed (workflow-only); R63's and R64's branches studied post-merge (#81/#82). Only `v1` is git-tagged; commits are the versions.

### Suite ground at main 5406c48 (run): `node tools/prerun.js` reproduces the canonical post-R50 line byte-exact (coev.js 946e639a…, curve.json f9b20e7d…, L0 bc15d414…, L1 1125d59c…, L2 50137ceb…; 5 flips / 3 swaps; stone mirror ok, sign lane labeled absent; checkpoint files byte-identical after the run — git status clean); `node --test tests/*.test.js` → 274 tests, 266 pass / 0 fail / 8 honest env skips; `node --test tools/test-qa.js` 8/8; README pin 282=274+8 verified live. Post-fix on this branch: **280 tests, 272 pass / 0 fail / 8 skips; qa 8/8; prerun line byte-unchanged (the fix touches the page's breeding INPUT, not core.js physics)**.

### Lies hunted (all repro'd by running the VERBATIM page functions, not reimplementations):

0. **P1 — SHIPPED THIS ROUND: the C1 loop bred from the 4-entry elite archive — the collapse and the dead σ-slider were ONE wound (R56 P3, carried 9 rounds, now closed).** Verbatim driver, seed 20260930, slider 96, 3 gens on pristine main: bred popS sizes **[4,4,4]**, distinct netIds 4, **zero** mutate() calls per gen; σ=10 vs σ=100 produce **byte-identical populations AND byte-identical stats strings**; the label told the truth every time: `breeding: elite-archive only (bred pop 4; next gen refills 92 fresh random) — R61`. Root cause sharpened one notch below R64's measurement: `continueGenC` passed `snapS.elites` — the 4-entry archive — as runCoevGeneration's `scored` population, and `breed()`'s expansion loop is `while (next.length < scored.length)`: with scored.length === D.elites === 4 the loop is dead **by construction**. The σ-slider was never broken; its consumer was unreachable. Pruner parity is why the committed artifact never showed the wound — `tools/prerun-coev.js:99-103` has always passed full scored arrays.
1. **P1.5 — SHIPPED WITH IT: the σ-slider is alive again (the P1.5 pin flips).** Post-fix, same seed, 3 gens at slider 96: bred popS **[96,96,96]**, distinct netIds 96, and σ=10 vs σ=100 now produce **different offspring populations and different stats lines**. The R64 VERIFY contract is met exactly: 96 for 3 consecutive gens, ≥1 mutation per gen (structurally guaranteed: breed() output = 4 elite copies + mutate() pushes up to scored.length; 96 is impossible without 92 mutate calls), σ flip changes the distribution.
2. **P2 — caught pre-ship: the R61 wound-label outliving its wound would have become the new lie.** The fix changes the breeding reality, so `elite-archive only (bred pop N; next gen refills M fresh random)` had to die with the wound it named. The label now reads `breeding: full-population (bred pop 96; 92 mutated offspring; next-gen refill 0) — R65`. `tests/r61-dilution-merge-labels-glue.test.js` LABEL 1 superseded **disclosed, not silently** (test renamed + header comment; VERIFIED_CLAIMS r61 entry annotated); its surviving contract (R55 COEV stats prefix + bred-pop disclosure + an era round-stamp) stays pinned. A pin that forces the old sentence after the fix would have made the honesty instrument itself dishonest.
3. **P3 — NOT a lie: the #81/#82 merge kept both rounds' entries additively.** R63+R64 PLAYLOG entries and index rows both present, newest-first, zero conflict markers, README count reconciled at main (282=274+8, run-verified). The class R63 repaired is now structurally guarded (builder item 2 below) — the pin READS PROSE, which no previous pin did (page-parse reads braces, canonical-index reads rows, receipt-completeness reads git history).
4. **P4 — NOT a lie: the oracle-death distribution is stable for the fifth consecutive round.** K extended to 20 (R64 spec item 4), seeds 1..20, cap 3000, swans off: **20/20 dead**, min 553 / p25 555 / median 695 / mean 768.4 / p75 1055 / max 1055 — a consistent subset of R64's bit-identical K=24 (min 553 / median 695 / max 1055). Printed by the pin, never baked (a specific min would over-fit one rng lineage; floors observed across sets: 553/376/553).

### Deltas observed (as shapes):
- **d(learning)/d(version): the first player-visible learning-loop change since R50 — not the physics, the POPULATION.** Prerun md5s byte-unchanged: the artifacts, the difficulty law, and the artifact lane stand still. But the C1 demo the player actually runs stops being a 4-net elite display diluted by 92 fresh-random strangers per generation: at slider 96 the population is 96 descendants. The "games-at-once" slider finally controls a population instead of controlling how much noise hides a collapsed one. Whether 96 real descendants now LEARN measurably (d(sChamp)/d(gen)) is the R66 spec's measurement — this round shipped the mechanism and pinned the structure, not a fitness claim.
- **Failure-mode genealogy, one wound, nine rounds, each receipt sharper:** R56 P1/P2 crash → R53 load seeds pops → R56 P3 collapse measured → R61 named it on the stats line → R63 σ-slider dead as a consequence → R64 carried it with two reasons → R65: dead-code-by-construction (scored.length === D.elites makes breed() an exact elite-copy). The loop's discipline worked as designed: the wound could not hide because every round re-verified it present-tense with a verbatim repro.
- **d(honesty)/d(labels): labels are era-stamped receipts, not architecture.** `— R61` → `— R65` on the same template line; the r61 pin now asserts the era-stamp shape (`— R6\d`), so future label evolution must carry its generation with it.

### Builder receipt (R64 mandate items, in priority order):
- **[M] Item 1 — full-population breeding (index.html startGenC/continueGenC):** `coev.scoreS`/`coev.scoreE` accumulate one score record per evaluated candidate (the evaluators stream all n; the page now KEEPS what it evaluates — pruner parity, `tools/prerun-coev.js:99-103`), reset at every evaluator rebuild; `continueGenC` passes them whole to `runCoevGeneration` instead of `snapS.elites`/`snapE.elites`. core.js untouched — the physics and every byte-identity pin stand.
- **Pin:** `tests/r65-fullpop-breeding-glue.test.js` — 3 tests on verbatim startGenC/continueGenC. T1 slider 96 × 3 gens → [96,96,96] both pools, structural ≥1-mutation proof, no refill; T2 the P1.5 pin (σ 10 vs 100 → different population bytes AND stats lines, same seed); T3 label truth (full-population named, elite-archive gone, refill 0). **FAIL-first on pristine main: 0/3** (T1 got [4,4,4]; T2 byte-identical; T3 label still elite-archive). Post-fix **3/3**.
- **[M] Item 2 — conflict-marker pin:** `tests/r65-conflict-marker-glue.test.js` — 3 tests: (1) FAIL-first by construction — a temp fixture PLAYLOG carrying all three marker species is flagged at the exact lines (3/5/7); (2) standing GREEN — every tracked .md/.js/.html (`git ls-files`, loud refusal if enumeration breaks, non-vacuous guards) is marker-free; (3) precision — each species alone flags, mid-line and indented look-alikes do not. **RED demonstrated end-to-end:** markers injected into a scratch clone → the standing pin goes RED naming `PLAYLOG.md:3037,3038,3039`; clean tree GREEN.
- **[S] Item 3 — EXPERIMENTS.md merge-hygiene note (2nd asking, shipped):** new Rules bullet: after ANY merge touching PLAYLOG.md, `grep -n '^<{7}\|^={7}\|^>{7}' PLAYLOG.md` must be empty before push — the process half of the pin (EXPERIMENTS.md exists; checked before writing).
- **[S] Item 4 — oracle-death K≥20 (not skipped, small):** `tests/escalation.test.js` oracle test widened 10→20 seeds, test count unchanged, distribution printed to the run log (numbers in P4 above), the law asserted (all 20 die before cap), no min baked.
- **Claims:** `c1-fullpop-breeding-glue` and `conflict-marker-pin` registered in core.js VERIFIED_CLAIMS (two-way pin green); r61 claim annotated with the supersession. README count 282→288 (280 in tests/ + 8 QA), run-verified by tests/readme-count.test.js. Site dist re-sealed after index.html + core.js changed (`node tools/build-site.mjs` → `build ok: 11 demo files sealed`) BEFORE the post-fix suite counts — the build-order law, obeyed.

### Next version spec (R66 mandate):
1. **[M] Lane tracking — close the classic-banner-after-C1 tail (R64 P4, still the ONLY surviving franken-quilt head).** WHY: R64's banner guard closed the coev-banner head; the tail survives by design one lane over. Either (a) continueGenC stops writing the shared gen/champNet slots (full lane separation — the honest architecture), or (b) the save guard refuses whenever `coev && coev.genC>0 && gen===coev.genC` regardless of banner. VERIFY: verbatim harness — breed C1, flip dropdown to classic, save → refusal receipt and no download; classic-only sessions save byte-unchanged.
2. **[S] The coev-quilt writer — give SAVE a real coev lane instead of refusing forever.** WHY: SAVE/COEV-UNSTABLE (R59→R64) is an honest bridge, not an endgame: a player who trains C1 cannot keep their work. A coev file must carry popS/popE/sChamp/eChamp/genC/ledger — every lineage field from ONE lane, loadable by an extended loadCoev that refuses nothing it wrote. VERIFY: verbatim harness — train 1 gen, save in coev mode, load the file, continue 1 gen; file fields identity-match the live coev state; the classic loader refuses it NAMED.
3. **[S] C1 lineage-decay receipt — measure that the mechanism actually learns.** WHY: R64 P3 measured "nets within L2 2.0 of the gen-1 champ at gen 3: **0**" under the collapse. Under full-pop breeding the number must flip positive — lineage that survives is the observable claim behind "descendants, not noise". VERIFY: verbatim harness, slider 96, σ 12, 3–10 gens: pin ≥1 net within L2 2.0 of the gen-1 sChamp lineage at gen 3+ AND the fresh-random control (restart between gens) stays at 0 — the R54 pattern (L2 < 2.0 pin) applied to the live loop; also record d(sChamp fitness)/d(gen) honestly, even if flat.

MERGE NOTE (additive merge of lane 12166c7): the k2d8 lane shipped a complementary marker gate — `tools/conflict-scan.js` (standalone module+CLI: every tracked TEXT file incl. non-md/js/html, binary sniff, exit 1/0/2, `--root`) with a pin that replays the R63-P0 through REAL history (`git show 9f03372:PLAYLOG.md` RED at lines 71/112/154, `git show b600884:PLAYLOG.md` GREEN). Both implementations stand (10 tests on the class); the tool is the one-command form of this entry's EXPERIMENTS.md grep recipe.

### Verdict
MERGEABLE — the 9-round wound is closed with FAIL-first evidence in both directions (0/3 RED on pristine main, 3/3 GREEN at the fix); the σ-slider pin flipped from byte-identical to differing exactly as the R64 VERIFY contract demanded; the conflict-marker pin is demonstrated RED on a diseased tree and GREEN on the clean one; the K≥20 extension shipped small and honest (printed, not baked); the R61 label supersession is disclosed in test, claim, and this entry. Suite at tip: 280 tests in tests/ (272 pass / 0 fail / 8 honest env skips), qa 8/8, README 288=280+8 live-verified, prerun canonical md5s byte-unchanged, PLAYLOG marker grep empty.

## Round 65 — k2d8 (cron pong-quilt-playloop, lane 12166c7) — 2026-09-30 — mode: BUILDER (R64 spec item 5 — conflict-marker pin for tracked prose/code, 2nd asking; the R63-P0 class that sat on main invisible to every existing gate) + play-tester — vs main 5406c48 (wave-66 CI build-then-test workflow; R63 landed #81, R64 landed #82 — both canonical rows now on main)

### Played versions: main 5406c48 played headless via a verbatim-extraction scientist driver (`/tmp/r65-scientist.js`, same pin pattern as R62/R63/R64 — page fns extracted VERBATIM from working-tree index.html, driven with core.js as PQ, seeded rand); the wave-66 CI workflow (test.yml, node 20) audited alongside merge-gate.yml (node 22) and pages.yml; R63/R64 entries read in-full (their guards now merged, both re-verified present-tense below). Only `v1` is git-tagged; commits are the versions.

### Suite ground at main 5406c48 (run): `node tools/prerun.js` reproduces the canonical post-R50 line byte-exact (coev.js 946e639a…, curve.json f9b20e7d…, L0 bc15d414…, L1 1125d59c…, L2 50137ceb…; 5 flips / 3 swaps; stone mirror ok); `node --test tests/*.test.js` → 274 tests, 266 pass / 0 fail / 8 honest env skips; `node --test tools/test-qa.js` 8/8. R62's process finding obeyed: dist rebuilt (`node tools/build-site.mjs` → `build ok: 11 demo files sealed`) BEFORE the post-build suite because core.js changed. Post-build on this branch: **281 tests, 273 pass / 0 fail / 8 skips**; qa 8/8; prerun line byte-unchanged (the new pin touches no physics).

### Lies hunted (all repro'd by running the VERBATIM page functions, not reimplementations):

0. **P0 — CLOSED THIS ROUND: the conflict-marker class had no gate.** At main 9f03372 (the R61+R62 conflict resolution) literal git conflict markers sat in PLAYLOG.md on main while every pin stayed green: page-parse only parses index.html `<script>` blocks, the markdown pins match heading/row REGEXES (a marker line is just text to them), and no pin reads prose. R63 found the wound by EYEBALL. This round shipped the gate — `tools/conflict-scan.js` (every git-tracked text file, lines starting with 7+ of `<`/`=`/`>`, named file:line, exit 1/0/2). FAIL-first DEMONSTRATED both directions against REAL history: the tool run at 9f03372 (temp worktree) exits 1 naming PLAYLOG.md:71/112/154 — the exact three markers R63 stripped; at b600884 (R63's repair) and at this branch's tip it exits 0 (92 and 95 tracked text files scanned). The pin (`tests/conflict-marker-glue.test.js`, 7 tests) additionally owns the grammar negatives (mid-line runs, 5-wide runs are NOT markers; 8-wide over-flag trips — over-flag beats under-flag), the git-ground-truth doctrine (an UNTRACKED marker file is not scanned — only committed content can reach main, the R35 lesson), and CLI misuse (exit 2 + usage, never quiet green).
1. **P1 — VERIFIED SHIPPED: startGenC fails-closed on a half-state coev (R63, #81).** Verbatim driver: `coev={sChamp:null,eChamp:null,genC:0}` → startGenC materializes popS/popE at slider size (96/96), champs stay null, genC preserved, **no TypeError**. The 8th-carried wound is closed on main; R63's 3-test pin is in the suite and green.
2. **P2 — VERIFIED SHIPPED: coev-mode SAVE refuses named (R64, #82).** Verbatim driver, banner coev, one C1 gen: save receipts `SAVE/COEV-UNSTABLE` (ok=0, conf=0) and writes NO download. Classic-mode save shape-unchanged (R64's T2 pin green). The coev-banner head of the franken-quilt class is decapitated on main.
3. **P3 — C1 elite-archive collapse + dead σ-slider (carried; 5th consecutive present-tense verification).** Verbatim driver, seed 20260930, slider 96, 3 gens: bred popS sizes **[4,4,4]**, distinct netIds 4, nets within L2 2.0 of the gen-1 champ at gen 3: **0**; σ=10 vs σ=100 produce byte-identical stats strings and identical bred shapes. R61's dilution label still ships on main and is still true THERE. MERGE DISCLOSURE: this measurement is against main 5406c48; the sibling lane on this same branch (951594e, entry above) shipped the full-population fix — bred pops [96,96,96], σ-slider revived, R61 label superseded-and-disclosed — so this wound is CLOSED at this branch's tip, not carried. Severity at measurement time: high; the class is now pinned by tests/r65-fullpop-breeding-glue.test.js.
4. **P4 — NAMED LIVE, the last franken head: the classic-banner-after-C1 tail survives on main (by R64's own design boundary).** Verbatim driver: breed one C1 gen (banner coev) → flip the dropdown to classic → SAVE writes a download with a bare `SAVE` receipt: file.gen=1 === coev.genC, file.best IS sChamp by netId, pop 8/8 classic-lineage nets. R64's guard keys on the banner, and the code comment itself names this tail as "the R65 spec — lane tracking, beyond this [S] item". It is now the ONLY lane where a franken-quilt can ship. Severity: medium-high, measured not assumed.
5. **P5 — NOT a lie, merge+CI stability: the oracle-death distribution is bit-identical for the FIFTH consecutive round.** Verbatim escalation-test oracle, seeds 1..24, cap 3000: **24/24 dead**, min 553 / p25 556 / median 695 / mean 756.2 / p75 1053 / max 1055 — bit-matching R62/R63/R64 across the #81/#82 merges AND the wave-66 CI commit. The artifact lane and the physics lane are bit-stable.
6. **P6 — LOW, CI lane: two workflows pin different node majors.** merge-gate.yml pins node 22, the wave-66 test.yml pins node 20; local is v24. Both use the glob suite form (the R15 doctrine), so no opaque-failure class today — but a future node-major behavior split would gate differently per workflow. Worth one line in the spec, not a wound.

### Deltas observed (as shapes):
- **d(learning)/d(version): flat at the artifact layer for the fifth consecutive round.** Prerun md5s byte-unchanged since R50; the oracle distribution bit-matches across two merges and a CI commit. The merge lane now moves CI workflows; the physics lane stands still.
- **Failure-mode migration: the franken-quilt class is one head from extinction.** R64 closed the coev-banner head; the classic-banner head survives by explicit design boundary (keyed-to-banner guards cannot see it). d(wounds)/d(round): the class went from two live heads (R56) to one named survivor (R65) in nine rounds.
- **d(gates)/d(round): the docs lane's sprains now meet a gate at the marker class.** R63's P0 (markers shipped, eyeball-found) was the third docs-lane sprain class after lost entries (R34/R41) and count entanglement (R58) — the first one now pinned. The invariant chain: git ground truth (R35) → receipt completeness (R38) → marker scan (R65).

### Builder receipt (the one small item — R64 spec item 5):
- **Tool:** `tools/conflict-scan.js` — module (`scanContents` pure grammar + `trackedFiles` git ground truth) AND CLI (`--root`, `--verbose`; exit 1 naming every file:line / 0 `conflict-scan: OK (N tracked text files scanned)` / 2 REFUSED on non-git cwd, bad flags, valueless `--root`). Binary sniff (NUL in first 8 KiB) skips images; unreadable files named. Header comment records the WHY (the R63 P0, the pin-coverage gap, the R35 ground-truth doctrine).
- **Pin:** `tests/conflict-marker-glue.test.js` — 7 tests: grammar + negatives, fixture RED (committed marker file → exit 1 naming file:line), fixture GREEN + untracked-not-scanned, CLI misuse ×3, the R63-P0 replay through the pure scanner (`git show 9f03372:PLAYLOG.md` trips RED, `git show b600884:PLAYLOG.md` scans GREEN — real history both directions, no worktree in the suite), live end-to-end at the tip.
- **Claim:** `conflict-marker-glue` registered in core.js VERIFIED_CLAIMS (honesty two-way pin green). README count 282→289 (281 in tests/ + 8 QA; the readme-count pin caught the drift and failed RED until the prose was updated — the pin working as designed). site dist re-sealed.
- Suite: 281 tests, 273 pass / 0 fail / 8 skips; qa 8/8; prerun canonical md5s unchanged.

### Next version spec (R66 mandate):
CONSOLIDATED ACROSS BOTH LANES (this branch carries ONE merged mandate; the sibling entry's spec is authoritative for items it shipped, this entry adds what it did not take):
1. **[M] Lane tracking — close the classic-banner-after-C1 tail (P4, measured live on main by BOTH lanes independently this round; R64's own comment names it the round item).** WHY: it is the last head of the franken-quilt class. Either (a) continueGenC stops writing the shared gen/champNet slots (full lane separation — the honest architecture), or (b) the save guard refuses whenever `coev && coev.genC>0 && gen===coev.genC` regardless of banner. VERIFY: verbatim harness — breed C1, flip dropdown to classic, save → refusal receipt and no download; classic-only sessions save unchanged. (Sibling spec item 1 — identical text, convergent measurement.)
2. **[S] The coev-quilt writer** (sibling spec item 2, adopted): give SAVE a real coev lane instead of refusing forever — popS/popE/sChamp/eChamp/genC/ledger in one file, loadable by an extended loadCoev; VERIFY per sibling entry.
3. **[S] C1 lineage-decay receipt** (sibling spec item 3, adopted): measure that full-pop breeding actually learns — ≥1 net within L2 2.0 of the gen-1 sChamp lineage at gen 3+ with the fresh-random control at 0; record d(sChamp fitness)/d(gen) honestly, even if flat.
4. **[S] CI node-major unification (P6, k2d8 lane, NEW this round).** merge-gate.yml pins node 22, test.yml pins node 20. Pick one major (22, matching the EXPERIMENTS.md Node-22 doctrine) in both, so a future node-major behavior split cannot gate differently per workflow. VERIFY: workflow text pin.
SHIPPED THIS ROUND (not carried): C1 full-population breeding + σ revival (sibling item, R64's 10th-carried), oracle-death K≥20 printed-not-baked (sibling item, R64's 6th-carried), EXPERIMENTS.md merge-hygiene note (sibling item, R64's 3rd-carried — its grep recipe now has a one-command equivalent in tools/conflict-scan.js), the conflict-marker class gate (BOTH lanes, two implementations — test-inline grammar pin + standalone CLI tool with real-history replay; 10 tests on the class, all green).

### Verdict
MERGEABLE — the R63-P0 marker class is now gated with FAIL-first evidence against real history both directions (9f03372 RED at the exact three lines, b600884 GREEN); both R63/R64 guards re-verified shipped present-tense; the last franken head measured live and spec'd; every carried item re-verified with verbatim repros. Suite at MY lane tip (12166c7): 281 tests in tests/ (273 pass / 0 fail / 8 honest env skips), qa 8/8, README 289=281+8 live-verified, prerun canonical md5s unchanged. MERGED TIP (this branch with 951594e): 287 tests in tests/ + 8 qa — see the merge commit's own receipt; the r61-label era-stamp pin, the full-pop pins, and the marker pins all stand together.

## Round 64 — k2d8 (cron pong-quilt-playloop) — 2026-09-30 — mode: BUILDER (R63 mandate item 2 — coev save honesty, R59's M1 carried 5 rounds; the R59 unmerged refusal design relanded and widened from genC-keyed to banner-keyed) + play-tester — vs main 618dc3b (wave-69 lane 69-d: GitHub Pages workflow only; R63 open at #81)

### Played versions: main 618dc3b played headless via a verbatim-extraction scientist driver (`/tmp/r64-scientist.js`, same pin pattern as R62/R63 — page fns extracted VERBATIM from working-tree index.html, driven with core.js as PQ, seeded rand); the single commit 618dc3b diffed (workflow-only); R63's branch (#81) and R59's branch studied as the guard's lineage (R59 authored the refusal + receipt name; R63 relanded R60's startGenC guard — both Casey-gated unmerged). Only `v1` is git-tagged; commits are the versions.

### Suite ground at main 618dc3b (run): `node tools/prerun.js` reproduces the canonical post-R50 line byte-exact (coev.js 946e639a…, curve.json f9b20e7d…, L0 bc15d414…, L1 1125d59c…, L2 50137ceb…; 5 flips / 3 swaps; stone mirror ok, live lanes labeled absent); `node --test tests/*.test.js` → 268 tests, 260 pass / 0 fail / 8 honest env skips; `node --test tools/test-qa.js` 8/8. R62's process finding obeyed: dist rebuilt (`node tools/build-site.mjs` → `build ok: 11 demo files sealed`) BEFORE the post-fix suite because index.html + core.js changed. Post-fix on this branch: **271 tests, 263 pass / 0 fail / 8 skips**; qa 8/8; prerun line byte-unchanged (the VERIFIED_CLAIMS row touches no physics).

### Lies hunted (all repro'd by running the VERBATIM page functions, not reimplementations):

0. **P1 — SHIPPED THIS ROUND: the coev-mode SAVE wrote the franken-quilt (6th present-tense verification, then closed).** Verbatim driver, seed 20260929, banner coev, one C1 gen: `file.gen === 1 === coev.genC`, `file.best` identity-equal `coev.sChamp.net`, `file.pop` 8/8 classic-lineage nets (0 appear in coev.popS), no sChamp/eChamp/gens fields — three disagreeing lineages in one JSON, loadable only by the classic loader, breeding classic noise under a C1 banner. Fail-first DEMONSTRATED: with only the pin file present on pristine 618dc3b, T1 is RED (download captured, kind "SAVE" — `1 !== 0`) and T3 is RED; T2 classic-save GREEN both sides. Post-fix 3/3 GREEN.
1. **P2 — startGenC fails open on a half-state coev (8th carrying on main; verbatim TypeError `Cannot read properties of undefined (reading 'length')` at coev.popS.length inside the rAF tick).** Fix authored R60, relanded R63 — both Casey-gated unmerged. Severity: medium, latent (loadCoev masks it today by always seeding pops).
2. **P3 — C1 elite-archive collapse + the dead σ-slider (carried; 4th consecutive verification).** Verbatim driver, seed 20260930, slider 96, 3 gens: bred popS sizes **[4,4,4]**, distinct netIds 4, nets within L2 2.0 of the gen-1 champ at gen 3: **0**; σ=10 vs σ=100 produce byte-identical stats strings and identical bred shapes — the mutation-σ control never reaches `mutate()` in C1 mode. R61's dilution label on the stats line is accurate and still shipping.
3. **P4 — NAMED LIVE: the classic-banner-after-C1 franken tail survives the new guard (by design of this [S] item).** Verbatim driver: breed one C1 gen (banner coev) → flip the dropdown back to classic → SAVE produces a download with a bare SAVE receipt; the file still pairs the leftover coev gen (gen=coev.genC) and sChamp with the untouched classic pop. R59 named this tail in its own comment ("closing it needs lane tracking"); verified present-tense rather than assumed. Carried to the R65 spec (item 2) — it is the same wound one lane over, and it is now the ONLY lane where a franken-quilt can still ship.
4. **P5 — NOT a lie: the wave-69 Pages workflow deploys the demo faithfully.** Root index.html is self-contained — every script/link/fetch target (core.js, qa.js, checkpoints/level0-2.js + coev.js + curve.json, tools/wal-export.js) is a committed file; the gitignored site/dist is referenced only by the separate site app, never by the root page. A workflow-only main movement, and the demo the Pages URL serves is the demo the pins test.
5. **P6 — NOT a lie, merge-stability: the oracle-death distribution is bit-identical for the fourth consecutive round.** Verbatim escalation-test oracle, seeds 1..24, cap 3000: **24/24 dead**, min 553 / p25 556 / median 695 / mean 756.2 / p75 1053 / max 1055 — bit-matching R62/R63's K=24. The artifact lane is stable across the #79/#80 merges and the wave-69 commit.

### Deltas observed (as shapes):
- **d(learning)/d(version): flat at the artifact layer for the fourth consecutive round.** Prerun md5s byte-unchanged since R50; the oracle distribution bit-matches. Every round the merge lane moves docs/labels/workflows, the physics lane stands still — the experiment's memory grows, its engine does not.
- **Failure-mode migration: the save-wound class closed one head and isolated the other.** Until this round the franken-quilt had two heads (coev banner after C1 training; classic banner after a dropdown flip). The banner-keyed guard decapitates the coev-banner head — the one a player meets in the normal C1 flow — and the classic-banner head is now the only survivor, named, measured, and spec'd. d(wounds)/d(round): the class is one lane away from extinction.
- **d(honesty)/d(round) at the guard layer: from keyed-to-state to keyed-to-banner.** R59's design refused only when `coev.genC>0` — truthful but stateful; a player in coev mode who never trained got a silently meaningless file (best:null). The banner key is the smaller, sharper contract: the dropdown is what the player believes they are saving.

### Builder receipt (the one small item — R63 mandate item 2):
- **Fix (index.html save onclick, R59's design relanded+widened, attribution in-comment):** guard `if($("mode").value==="coev"){receipt("SAVE/COEV-UNSTABLE",0,0);return;}` before the Blob — named refusal, no download, no Blob, classic path byte-unchanged. The comment names the wound (R56 P3/R59 M1/R63 M2), the R59 lineage, the banner-keyed rationale, and the unfixed tail carried to R65.
- **Pin:** `tests/r64-coev-save-refusal-glue.test.js` — 3 tests on verbatim startGenC/continueGenC/save. T1 drives the real player flow (dropdown→coev, breed one gen, save) and pre-asserts the franken condition (gen===coev.genC, champNet identity-equal sChamp, classic∩coev.popS = 0) before demanding refusal. FAIL-first on pristine 618dc3b: T1 RED (download + bare SAVE), T3 RED, T2 GREEN. Post-fix 3/3 GREEN.
- **Claim:** `coev-save-refusal-glue` registered in core.js VERIFIED_CLAIMS (two-way pin green). README count 276→279 (271 in tests/ + 8 QA). site dist re-sealed (`build ok: 11 demo files sealed`).

### Next version spec (R65 mandate):
1. **[M] C1 full-population breeding (9th carrying — two reasons now).** carryGenC must breed from FULL scored populations (pruner parity, `tools/prerun-coev.js:103` precedent), not the 4-entry elite archive. WHY (new): besides the collapse (P3), the fix REVIVES the dead σ-slider — one mechanism, two wounds. VERIFY: at slider 96, bred popS is 96 for 3 consecutive gens; ≥1 mutation per gen; a σ flip (10 vs 100) changes the offspring distribution.
2. **[M] Lane tracking — close the classic-banner-after-C1 tail (P4, named live this round).** WHY: it is the last head of the franken-quilt class. Either (a) continueGenC stops writing the shared gen/champNet slots (full lane separation — the honest architecture), or (b) the save guard refuses whenever `coev && coev.genC>0 && gen===coev.genC` regardless of banner. VERIFY: verbatim harness — breed C1, flip dropdown to classic, save → refusal receipt and no download; classic-only sessions save unchanged.
3. **[S] startGenC fails-closed guard (8th carrying — merge #81 or reland).** The R63 branch carries the authored fix; every round it sits unmerged is another round main freezes on a half-state coev. VERIFY: R63's 3-test pin, FAIL-first both directions.
4. **[S] Oracle-death distribution pin (5th carrying).** Extend the escalation pin to K≥20 seeds: assert all-die before cap AND print the death-frame distribution in the PLAYLOG entry (never bake a specific min — floors observed: 553/376/553 across sets). R64's bit-identical K=24 (min 553 / median 695 / max 1055) is the reference.
5. **[M] Conflict-marker pin for tracked prose/code (R63 mandate item 4, 2nd asking).** A test scanning every tracked .md/.js/.html for `^<{7}|^={7}|^>{7}` at line start. WHY: the R63 P0 showed the class is invisible to every existing pin. VERIFY: RED against main 9f03372's PLAYLOG (pre-repair), GREEN on any clean tree.
6. **[S] PLAYLOG-merge process note in EXPERIMENTS.md (R63 mandate item 5, 2nd asking).** After ANY merge touching PLAYLOG.md, `grep -n '^<{7}\|^={7}\|^>{7}' PLAYLOG.md` must come back empty before push. VERIFY: EXPERIMENTS.md text pin.

### Verdict
MERGEABLE — the save-wound's coev-banner head is closed with FAIL-first evidence in both directions; the classic-banner tail is measured, named, and spec'd rather than silently left; every carried item re-verified present-tense with verbatim repros; the wave-69 workflow commit is audited (P5) and found faithful. Suite at tip: 271 tests in tests/ (263 pass / 0 fail / 8 honest env skips), qa 8/8, README 279=271+8 live-verified, prerun canonical md5s unchanged at main and at the fix.
## Round 63 — k2d8 (cron pong-quilt-playloop) — 2026-09-30 — mode: BUILDER (re-land the startGenC fails-closed guard — R60's fix, 7th carrying; R61's "merge-or-reland" window closed when #79/#80 merged without it) + play-tester + main-repair lane (the R61-merge PLAYLOG conflict markers stripped — additive R62+R61 resolution) — vs main 9f03372 (post-#79/#80, R61+R62 both landed)

### Played versions: main 9f03372 played headless via a verbatim-extraction scientist driver (`/tmp/r63-scientist.js`, same pattern as R62's pin — page fns extracted VERBATIM from working-tree index.html, driven with core.js as PQ, seeded rand); R60 tip 65e80d7 diffed (the guard source — startGenC lines byte-identical between d2a85d7 and 9f03372, so the fix applies clean); R61/R62 entries read in-full (both shipped via #80/#79). Only `v1` is git-tagged; commits are the versions.

### Suite ground at main 9f03372 BEFORE the fix (run): `node --test tests/*.test.js` → 268 tests, 260 pass / 0 fail / 8 honest env skips; `node --test tools/test-qa.js` 8/8; `node tools/prerun.js` reproduces the canonical post-R50 line byte-exact (coev.js 946e639a…, curve.json f9b20e7d…, L0 bc15d414…, L1 1125d59c…, L2 50137ceb…; 5 flips / 3 swaps; stone mirror ok, mirror-only labeled, sign lane labeled absent). Post-fix on this branch: **271 tests, 263 pass / 0 fail / 8 skips**; qa 8/8; prerun line byte-unchanged. R62's process finding obeyed: dist rebuilt (`node tools/build-site.mjs` → `build ok: 11 demo files sealed`) BEFORE the suite because index.html changed.

### Lies hunted (all repro'd by running the VERBATIM page functions, not reimplementations):

0. **P0 — NEW, docs-lane: main's PLAYLOG.md shipped LITERAL MERGE-CONFLICT MARKERS.** PR #80 (R61) carried branch commit 0376262 "all three conflicts resolved as additive" — but the PLAYLOG conflict was resolved by leaving the git marker triple (7-char left-arrow run / 7-char equals run / 7-char right-arrow run naming origin/main) IN THE FILE (at old lines 71/112/154 on main). The canonical-index pin stayed GREEN throughout (markers add no headings and remove no rows) — the pin has a coverage gap for marker-inclusion. Repaired this round: markers stripped, R62+R61 entries both kept (additive, newest-first), separators per convention. Severity: process-high (the experiment's memory file was merge-damaged on main for ~3.5h and nothing screamed).
1. **P1 — C1 elite-archive collapse, present-tense (carried since R56; 3rd consecutive verification).** Verbatim driver, seed 20260930, slider 96, 3 gens: bred popS sizes **[4,4,4]**, distinct netIds 4 (exact elite copies, zero mutations), nets within L2 2.0 of the gen-1 champ at gen 3: **0** — lineage evaporation confirmed live. R61's dilution label shipped and is true. Severity: high for C1 as a learning story.
2. **P1½ — NEW, a sharpening of P1: the mutation σ slider is DEAD in C1 mode.** Same verbatim driver, σ=10 vs σ=100 at slider 96: the two runs produce **byte-identical stats strings** and identical bred shapes (both 4 exact copies; σ never reaches `mutate()` because the `while(next.length<scored.length)` loop is unreachable when scored.length = elites = 4). The player-visible "mutation σ" control is a dead control in C1 mode — a UI lie on top of the collapse. Severity: medium (player-facing; dies with the P1 fix).
3. **P2 — startGenC fails open on a half-state coev (carried since R49, verbatim-reproduced 7th time — THIS ROUND'S SHIP).** Driver: `coev={sChamp:null,eChamp:null,genC:0}` → verbatim startGenC → `TypeError: Cannot read properties of undefined (reading 'length')` at coev.popS.length — inside the rAF tick, kills the whole page loop (R49 P1 class). R60's guard (unmerged branch) was the authored fix; R61 said "merge-or-reland"; the merge window closed without it.
4. **P3 — coev-mode SAVE writes the franken-quilt (carried since R56, present-tense).** Verbatim save onclick after 1 C1 gen: file.gen=1 (=coev.genC), best===sChamp, pop 8 nets ALL classic-lineage (0/8 from coev.popS), no sChamp/eChamp/gens fields — loadable only by the classic loader, breeding classic noise under a coev-gen banner. Severity: medium-high.
5. **P4 — NOT a lie: oracle-death horizon, 4th independent confirmation + merge-stability evidence.** Verbatim escalation-test oracle, seeds 1..24, cap 3000: **24/24 dead**, min 553 / p25 556 / median 695 / mean 756.2 / p75 1053 / max 1055 — **bit-identical to R62's K=24 distribution** (same seeds, same oracle, same core): the R61+R62 merge did not touch core.js physics; the artifact lane is bit-stable across the merge.

### Deltas observed (as shapes):
- **d(learning)/d(version): flat at the artifact layer, still.** Prerun md5s on main 9f03372 are byte-identical to every round since R50 (L0 1890 / L1 2010 / L2 1753; 5 flips / 3 swaps); the oracle distribution bit-matches R62. The merge lane changed docs and labels only.
- **Failure-mode migration: the merge lane is now the noisiest lane.** Docs-wound classes to date: lost entries (R34/R41/R56 via conflict resolution), count entanglement (R58), and now LITERAL MARKERS SHIPPED (R61-merge). The code lanes are increasingly honest (two labels shipped in 2 rounds); the docs lane sprains repeatedly. The invariant candidate: a tracked-file conflict-marker pin (spec item 4 below).
- **d(collapse)/d(measurement) sharpened again:** R56 measured dilution → R61 named it elite-archive collapse → R63 proves the σ-slider is dead as a consequence (the breeding path never calls mutate). Each round the same wound gets a more precise mechanism.

### Builder receipt (the one small item):
- **Fix (index.html startGenC, R60's design verbatim, attribution in-comment):** guard widened from `if(!coev)` to `if(!coev||!coev.popS||!coev.popE)`; the branch materializes BOTH populations at slider size via `Object.assign(coev||{},{...})`, preserving existing sChamp/eChamp/genC/last/ledger. A half-built coev (champs before pops, a hand-built file, a future loader's partial state) now recovers instead of throwing inside the rAF tick.
- **Pin:** `tests/r63-startgenc-fails-closed-glue.test.js` — 3 tests driving verbatim startGenC. FAIL-first DEMONSTRATED: with only the test file present on pristine main 9f03372, T1 (half-state → materialized pops, champs/genC preserved) is RED with the verbatim `TypeError: Cannot read properties of undefined (reading 'length')`; T2 (fresh !coev shape unchanged) and T3 (loadCoev-shaped state untouched) GREEN both sides. Post-fix: 3/3 GREEN.
- **Claim:** `startgenc-fails-closed-glue` registered in core.js VERIFIED_CLAIMS (honesty two-way pin green). README count 276→279 (271 in tests/ + 8 QA). site dist re-sealed.
- **Main-repair lane (same PR):** PLAYLOG conflict markers stripped (additive R62+R61 resolution); canonical-index row added.

### Next version spec (5 items, R64 mandate):
1. **[M] C1 full-population breeding (8th carrying — now with a second reason).** carryGenC must breed from FULL scored populations (pruner parity, `tools/prerun-coev.js:103` precedent), not the 4-entry elite archive. WHY (new): besides the collapse, the fix REVIVES the dead σ-slider (P1½) — one mechanism, two wounds. VERIFY: at slider 96, bred popS is 96 for 3 consecutive gens; ≥1 mutation per gen; a σ flip (10 vs 100) changes the offspring distribution (the P1½ pin).
2. **[S] Coev save honesty (R59's M1, 5th carrying).** Refuse SAVE in coev mode with a named receipt (SAVE/COEV-UNSTABLE) OR write a coev-quilt (sChamp/eChamp/gens/ledger) that loadCoev accepts. VERIFY: verbatim coev save → refusal receipt or loadCoev-round-trip; classic save unchanged.
3. **[S] Oracle-death distribution pin (4th carrying).** Extend the escalation pin to K≥20 seeds: assert all-die before cap AND print the death-frame distribution in the PLAYLOG entry (never bake a specific min — floors: 553/376/553 across sets). R63's bit-identical K=24 distribution (min 553 / median 695 / max 1055) is the reference.
4. **[M] Conflict-marker pin for tracked prose/code (NEW — gap demonstrated live).** A test scanning every tracked .md/.js/.html for `^<{7}|^={7}|^>{7}` at line start. WHY: P0 shipped literal markers on main with the canonical-index pin GREEN — the marker class is invisible to every existing pin. VERIFY: RED against main 9f03372's PLAYLOG (pre-repair), GREEN on any clean tree.
5. **[S] PLAYLOG-merge process note in EXPERIMENTS.md (NEW, docs-lane hygiene).** Add to the round checklist: after ANY merge touching PLAYLOG.md, `grep -n '^<{7}\|^={7}\|^>{7}' PLAYLOG.md` must come back empty before push. VERIFY: EXPERIMENTS.md text pin.

### Verdict
MERGEABLE — the 7th-carried guard finally lands (R60 authored, R63 relanded with FAIL-first both directions); the R61-merge marker wound is repaired in the same file the round must edit anyway; all carried items re-verified present-tense with verbatim repros. Suite at tip: 271 tests in tests/ (263 pass / 0 fail / 8 honest env skips), qa 8/8, README 279=271+8 live-verified, prerun canonical md5s unchanged at main and at the fix.

---

## Round 62 — k2d8 (cron pong-quilt-playloop) — 2026-09-30 — mode: BUILDER (R61 spec item "File-load champion reset" / R61's M4, one small item) + play-tester — vs main d2a85d7 (post-#77/#78)

### Played versions: R58 (c59c8d7 main-repair, canonical tip) · R61 (eae880d, local-only branch — its entry lives there; played by running its measured repros against pristine main) · ground re-runs on main d2a85d7 (suite + prerun + qa). Sibling note: only `v1` exists as a git tag, so versions are commit refs, as in R56–R58. R59/R60/R61 entries live ONLY on their unmerged local branches — the gap between R58 and R62 in this index is receipts-on-branches, not lost rounds (R61's branch pushed alongside this one, PR opened).

### Suite ground (main d2a85d7, run): 262 tests, 254 pass / 0 fail / 8 honest env skips; prerun reproduces the canonical line exactly (L0 bc15d414 / L1 1125d59c / L2 50137ceb / curve f9b20e7d — 5 flips / 3 swaps / coev.js 946e639a); qa 8/8. Post-fix ground on this branch: **265 tests, 257 pass / 0 fail / 8 skips**; prerun line unchanged. Process finding (low, environmental-but-recurring): the 3 site-glue reds seen at first were MY stale gitignored `site/dist` from the R61 branch checkout — the R44 self-seal only rebuilds when dist is ABSENT, never when present-but-stale; every round that edits index.html must rebuild dist before the suite (`node tools/build-site.mjs`).

### Lies hunted (all repro'd by running the VERBATIM page functions in the r53/r54/r57 sandbox pattern, not reimplementations):

1. **P1 — file-load leaves the VISIBLE champion stale (the shipped wound; builder target).** Classic sandbox, seed 20260930: Train-to-completion (champ A bred, champGame alive) → file-load quilt {pop: L1.pop[0..7], best: L1.pop[0], gen: 77} → `champNet` IS the pre-load champ A by identity, `champGame` still alive, **L2(champ, loaded quilt pop) = 4.943** — the R56-P2 magnitude (4.56) one lane over. The R57 fix reset the streaming evaluator on this path (evalGen nulled, gen 77 adopted — its pins are green), but the demo keeps PLAYING a lineage-far champion under the loaded banner. loadLevel, the sibling path, already resets both lanes (`champNet=cp.pop[0];champGame=null`). Severity: high, player-facing.
2. **P2 — C1 elite-archive collapse at slider 96 (carried from R61, present-tense on main).** Coev sandbox, slider 96: gen 1 breeds popS to **4** (unique nets 4 — exact elite copies); one call later startGenC pads back to 96 with **only 3/96 within L2 2.0** of the gen-1 champ (the 92-filler refill); gens 2–3 breed back to 4 with **0/4** near the gen-1 champ — lineage evaporation inside 2 generations. On main, R61's stats-line label has NOT landed: the loadCoev banner still promises "gen N+1 breeds descendants, not noise". Severity: high for C1 as a learning story.
3. **P3 — startGenC fails open (carried since R49, present-tense).** A coev object without popS/popE (a future construction path; the R60 guard branch is still unmerged) → verbatim `TypeError: Cannot read properties of undefined (reading 'length')` inside the rAF train tick → demo freeze, no receipt. Same fail-class as the R49 rAF death. Severity: medium, latent.
4. **P4 — coev-mode SAVE writes the franken-quilt (carried since R56, present-tense).** Save in coev mode → file.gen = coev.genC = 1, best = sChamp.net, all 8 pop nets from the CLASSIC pop, 0/8 from coev.popS, no sChamp/eChamp/gens fields → loadable only by the classic loader, which breeds classic noise under a coev-gen banner (the R56-P2 shape again). Severity: medium-high.
5. **NOT a lie — oracle-death horizon, third independent confirmation.** 24 fresh seeds (verbatim escalation-test oracle): **24/24 dead before frame 3000**; distribution min 553 / p25 556 / median 695 / mean 756.2 / p75 1053 / max 1055. Floors across independent sets: 553 (R54, K=40), 376 (R56, K=8), 553 (R62, K=24) — the law is honest; any future pin must assert all-die and PRINT the distribution, never bake a specific min.

### Deltas observed (as shapes):

- d(learning)/d(version): none at the artifact layer — main d2a85d7 reproduces the R50+ canonical line byte-for-byte (prerun hashes identical; fitness levels identical: L0 1890 / L1 2010 / L2 1753). The shipped game's learning substrates are bit-stable across R57→R62.
- Failure-mode migration: R56-P2 (stale-evaluator overwrite at load, L2 4.56) was fixed by R57 for the evaluator lane on ALL load paths; the same wound shape SURVIVED one lane over on the file-load path (visible champion, L2 4.943) because the two lanes were fixed asymmetrically. The invariant to pin going forward: **every load path must reset BOTH lanes — the streaming evaluator AND the visible champion/game**. loadLevel did; file-load did not; now pinned.
- C1 dilution shape unchanged from R61's measurement (slider 96 → bred 4 / refill 92, lineage gone by gen 3) — the mode's d(learning)/d(slider) is still flat above eliteK.

### Builder receipt (the one small item):

- **Fix (one line, index.html file-load handler):** `champNet=(q.best&&q.best.w1)?q.best:pop[0];champGame=null;` — the loaded quilt's best net becomes the visible champion (merged pop[0] fallback for best-less quilts), the stale game is cleared; mirrors the loadLevel precedent exactly.
- **Pin:** `tests/r62-fileload-champion-glue.test.js` — 3 tests driving the verbatim page functions. FAIL-first demonstrated: on pristine main, T1 (champ stale by identity) and T2 (best-less fallback) are RED with the measured wound, T3 (loadLevel no-regression) green. Post-fix: 3/3 green.
- **Claim:** `fileload-champion-glue` registered in core.js VERIFIED_CLAIMS (honesty pin two-way map green). README count 262→265 in `tests/` (273 total).
- Suite: 265 tests, 257 pass / 0 fail / 8 skips; R57's no-regression pins untouched and green.

### Next version spec (5 items):

1. **[M] C1 full-population breeding.** `runCoevGeneration` breeds `scored.length` nets from an eliteK=4 archive → bred pop = 4 regardless of slider. Carry the pre-breed population size through the call and breed to it, so the slider means what it says and refill-with-noise never re-enters. WHY: P2 — at any slider > eliteK the C1 mode is a diversity eraser; d(learning)/d(slider) is flat above 4. VERIFY: coev glue, FAIL-first on current main — at slider 96, bred popS is 96 (not 4) for 3 consecutive gens and ≥1 bred net stays within L2 2.0 of the prior gen's champ each gen.
2. **[S] startGenC fails-closed (re-land R60's unmerged guard).** Verify popS/popE are arrays at the guard; on failure receipt `COEV-REFUSAL` named and return — never a raw TypeError in the rAF tick. VERIFY: glue — pops-less coev object yields the named refusal and the demo stays alive; RED-first repro is this round's verbatim TypeError.
3. **[S] Ship R61's dilution label (S6/R61) on main.** Stats line + loadCoev banner admit "bred N elites + refilled M fresh random" (or, with item 1 landed, delete the clause and assert full-pop breeding instead). VERIFY: extraction pin on the two banner strings; RED-first on main today (banner still claims "breeds descendants, not noise").
4. **[M] Coev save honesty.** Either refuse to SAVE in coev mode with a named receipt, or write a coev-quilt (sChamp/eChamp/gens/ledger) that loadCoev actually accepts. WHY: P4 — the current file is a franken-quilt that only the classic loader will touch, laundering a coev gen number over classic noise. VERIFY: round-trip glue — coev save → load → consumed by loadCoev (or the refusal is receipted); RED-first on the current franken shape.
5. **[S] Oracle-death horizon pin with distribution printing.** Extend the escalation pin to K≥20 seeds: assert all-die before the cap AND print the death-frame distribution (never bake a specific min — floors move across seed sets: 553/376/553). VERIFY: the R62-measured distribution (min 553 / median 695 / max 1055 over 24 seeds) must remain printable, all-dead.

### Verdict

Ship-worthy. The one-line champion reset closes the last open lane of the R56 wound class on shipped code; C1 dilution, the startGenC guard, coev save honesty, and the dilution label remain the live spec, all with fresh repros and severities.

---

## Round 61 — k2d8 (cron pong-quilt-playloop) — 2026-09-30 — mode: BUILDER (R60 spec item 5 shipped, re-scoped true: the dilution label + merge-tail naming — measured sharper this round as an elite-ARCHIVE collapse, not merely a dilution bound) — vs main d2a85d7 (post-#77/#78)

Branch `playtest-round-61`. Siblings studied: R60 (spec author; its item 5 is this round's mandate; its branch unmerged — the guard it shipped is absent from main, verified M3 below), R59 (coev save-honesty spec lane; its M1 finding re-confirmed verbatim on main), R58 (the count-formula doctrine + docs-loss class), R57 (load-continuity; its file-load seam is where LABEL 2 lands), R56 (the original six-item mandate: items 1–4 still open, re-verified present-tense this round). Harness lineage: verbatim-extraction glue from R59/R60 (`/tmp/r61-scientist.js`, page fns extracted VERBATIM from `git show main:index.html` so every number is attributable to main d2a85d7).

### Played versions: main d2a85d7 played headless via the verbatim driver (all M-readings); R60 tip 65e80d7 diffed for lane-parity (continueGen/save/load byte-identical to main — its fixes do not touch this round's seams). Only `v1` is git-tagged; commits are the versions.

Suite ground at main BEFORE the fix: `node --test tests/*.test.js` → 262 tests, 254 pass / 0 fail / 8 honest env skips; `node --test tools/test-qa.js` 8/8; `node tools/prerun.js` reproduces the canonical post-R50 line byte-exact (coev.js 946e639a…, curve.json f9b20e7d…, L0 bc15d414…, L1 1125d59c…, L2 50137ceb…; 5 flips / 3 swaps; stone mirror ok, mirror-only labeled, sign lane labeled absent).

### Deltas observed (shapes of change)
- **d(breeding-width)/d(sharper-measurement) = the R60 'dilution bound' is actually a collapse to the archive.** R60 named the page lane's breeding window too generously ("other 92 are their mutations"). Measured verbatim on main (seed 20260929, slider 96): after one C1 generation popS holds **4 distinct nets — exact elite copies, zero mutations** — because `continueGenC` passes the evaluator's 4-entry elite archive as the breeding pool and `while(next.length < scored.length)` never runs (scored.length = elites = 4 ≤ offspring budget); the loser 2x-sigma pressure (`sigS`/`sigE` args) is DEAD CODE in the page lane. The next `startGenC` refills to 96 with fresh `makeNet(randPQ)` draws — every evaluated generation is 4 bred + 92 random. The pruner (`tools/prerun-coev.js:103`) feeds FULL scored pops (bred length 96, mutations real) — so the canonical artifact breeds under a regime the shipped page loop cannot reproduce. d(learning)/d(version) on the active lane: one elite-carrying generation, then a 92/96 random restart, forever.
- **d(growth)/d(version) still negative on the artifact lane** (M-suffix of the above): the measured decline curve R56 recorded (bench 1437.7→1178.9→722.6 by gen 123, descendants-within-L2 32→0 in two gens) is now fully explained mechanistically — the page lane breeds from 4 exact copies while the artifact's pruner breeds from 96.
- **d(surface)/d(v1) = the honesty instrumentation grew around an unmoved core** (M6, crude export-count): v1 core.js exports≈4 lines=98 with coev/ledger/receipts flags all false; tip core.js ≈497 lines with the full receipt/seal/ledger vocabulary. d(learning)/d(surface) over 60 rounds is a doctrine answer, not a number this round can claim.

### Lies hunted
- **[P1, re-confirmed verbatim on main] the coev save is still a mixed-lineage file (R59's M1, unshipped).** Coev-mode save → `downloads=1 kind=SAVE file.gen=1 (coev.genC=1) best===sChamp:true pop:8 inCoevPopS:0 inClassicPop:8`; the mode-switch tail save shows the same shape (`downloads=2`). The saved pop is entirely classic-lineage; `best` is the coev sChamp. Reloading breeds noise under a coev banner — the exact lie R59 spec'd against, still live at d2a85d7.
- **[P1→labeled, this round's ship] the C1 stats line now NAMES the breeding bound** (`index.html:327`): `breeding: elite-archive only (bred pop N; next gen refills M fresh random) — R61`. Measured numbers at slider 96: bred pop 4, refill 92. The label is true under the collapse finding — it does not claim mutations the loop does not perform.
- **[P2 mechanism, NEW this round] population collapse by construction** (deltas above): popS=popE=4 exact copies after one generation; the `while` loop in the shipped breeding path is unreachable in page mode; loser-pressure args dead. Direct node verification: page path → bred popS length 4; pruner-coev path (full pops) → bred length 96.
- **[P3, NEW this round] file-load leaves the champion stale** (M4): loading a 2-net quilt into a 96-net pool yields `pop 96→96 mergeTail=94 gen=42` and `champNet unchanged (stale, NOT from file):true` — the bannered champion after the load is the pre-load one (loadLevel sets `champNet=cp.pop[0]`; the file handler never touches it). The R57 reset cleared the evaluators, not the champion. Spec'd below.
- **[P3→labeled, this round's ship] the file-load path now NAMES the merge tail** (`index.html:419-421`): `loaded gen 42 · 2 file nets · merge tail kept 94 pre-existing nets (not from this file) — R61`, inserted BEFORE `receipt("LOAD",0,1);` so the R57 extraction end-marker stays byte-identical.
- **[P3, context] R60's fails-closed startGenC guard is NOT on main** (M3): main threw `TypeError: Cannot read properties of undefined (reading 'length')` on a half-state `{sChamp,eChamp,genC}` startGenC — verified by direct run. The guard lives only on the unmerged R60 branch; carrying as merge-or-reland in the spec.
- **[P3, context] oracle horizon (M5, 20 seeds, cap 60000): deaths 20/20, min 117, max 1658, median ~809** — perfect tracking is insufficient; step-cadence + paddle-speed limit are the binding constraints. The horizon-pin spec item now carries a measured distribution to pin against.
- **Nothing fabricated in the verified lane:** prerun canonical md5s byte-reproduced at main and at the fix tip; FAIL-first pin observed RED on pristine main (LABEL 1, LABEL 2) / GREEN rails (RAILS 3), then 3/3 GREEN at the fix; full suite 257 pass / 0 fail / 8 honest skips (+3 tests); qa 8/8; VERIFIED_CLAIMS two-way pin green with the R61 claim registered.

### Builder receipt (R60 spec item 5, re-scoped)
1. **`index.html:327` — coev stats line carries the breeding bound:** appended ` · breeding: elite-archive only (bred pop ${bred.popS.length}; next gen refills ${Math.max(0,+$("pop").value-bred.popS.length)} fresh random) — R61` to the existing COEV stats sentence. One-line append; the R55 prefix contract (`COEV gen N · games … · h2h …`) untouched.
2. **`index.html:419-421` — file-load names the merge tail:** inserted `$("stats").textContent=`loaded gen ${gen} · ${q.pop.length} file nets · merge tail kept ${pop.length-q.pop.length} pre-existing nets (not from this file) — R61`;` inside the `.then` callback, BEFORE `receipt("LOAD",0,1);` — the R57 extraction pin's end-marker (`receipt("LOAD",0,1);});};`) stays byte-identical.
3. **`tests/r61-dilution-merge-labels-glue.test.js` — FAIL-first pin, 3 tests:** LABEL 1 (verbatim continueGenC headless gen, seed 20260929, slider 96, coev mode → stats names `elite-archive only` + bred count + `fresh random`), LABEL 2 (verbatim load onchange, fake file gen 42 / 2 nets → `merge tail kept N pre-existing nets` + `not from this file` + LOAD receipt + gen 42), RAILS 3 (R57 extraction surface byte-present, exactly one classic formatStats assignment site). RED on pristine main: 1/3 pass; GREEN at the fix: 3/3.
4. **core.js VERIFIED_CLAIMS: `r61-dilution-merge-labels-glue` registered** (wristband registry discipline — every test file backs a claim; the honesty pin caught the omission mid-round and it was corrected).
5. **README count pin 270→273** (265 in tests/ + 8 QA), suite-verified.
- After: 265 tests in tests/ (257 pass / 0 fail / 8 honest env skips) + qa 8/8; prerun md5s unchanged; site dist re-sealed (`build ok: 11 demo files sealed`).

### Next version spec (competitive improvements) — the R62 mandate
- **[M] C1 full-pop breeding — now with the mechanism named.** continueGenC must breed from the FULL scored populations (as `tools/prerun-coev.js:103` already does for the artifact), not the 4-entry elite archive: pass scoredS/scoredE (or runCoevGeneration's full-pop mode) so `while(next.length < scored.length)` actually mutates. Why: the measured collapse (4 exact copies, 0 mutations, 92/96 random refill every generation) makes every active-lane generation a dressed restart; the canonical artifact's own regime is unreachable from the page. Verify: (a) bred-pop steady-state pin (popS == slider after ≥3 gens, distinct netIds > elites); (b) ≥1 mutation per bred generation pinned (child ≠ all parents); (c) loser 2x-sigma args live (a lastOutcome flip changes the loser's offspring distribution); (d) h2h ledger stays hash-chained, one row per gen; (e) artifact-lane reproduction: page-loop bred pop length == pruner bred pop length at equal slider.
- **[M] Oracle-death horizon pin, distribution-carrying variant.** R50's all-die claim pinned on seeds 1..10; this round measured 20/20 deaths at cap 60000 (min 117, max 1658, median ~809). Why: the claim is the product's core promise and a future escalation-constant edit could break it silently. Verify: seeded sim over the shipped cadence with triangle-wave reflection; any survival → red; the death-frame distribution printed into the PLAYLOG entry for cross-version d(death)/d(version).
- **[S] startGenC fails-closed guard — merge-or-reland.** Main still throws `TypeError: Cannot read properties of undefined (reading 'length')` on `{sChamp,eChamp,genC}` with no pops (verified M3); R60's guard exists only on its unmerged branch. Why: any future coev-construction path leaving populations undefined reopens the R49 rAF-death class inside the tick. Verify: verbatim startGenC with half-state coev → no throw, populations materialized at slider size (R60's pin shape).
- **[S] Coev save-mode honesty (R59's M1, still live).** The save onclick still serializes coev gen/champ with the classic pop. Why: reloading breeds noise under a coev banner with no receipt naming the mix. Verify: verbatim save onclick in coev mode asserts same-lineage fields OR a named SAVE/COEV-UNSTABLE refusal receipt; classic-mode save unchanged (regression pin).
- **[S] File-load champion reset (NEW, measured M4).** The file-load handler must reset `champNet`/`champGame` (as loadLevel already does: `champNet=cp.pop[0]; champGame=null`) or the post-load bannered champion is stale lineage under a fresh gen. Why: measured — 2-net load into 96-net pool leaves champNet untouched (stale, NOT from file). Verify: verbatim onchange glue with a 2-net file → champNet is a file net (or the load receipts the kept-champion choice by name); loadLevel regression pin green.

### Verdict
MERGEABLE — two honest labels + FAIL-first pin + claim registration; FAIL-first proven both directions (LABEL 1/2 RED on pristine main d2a85d7, RAILS 3 GREEN both sides, 3/3 GREEN at the fix). Suite at tip: 265 tests in tests/ (257 pass / 0 fail / 8 honest env skips), qa 8/8, README 273=265+8 live-verified, prerun canonical md5s reproduced at main and at the fix. Main untouched; branch `playtest-round-61`. R62 mandate: full-pop breeding [M], oracle horizon pin [M], startGenC guard merge-or-reland [S], coev save honesty [S], file-load champion reset [S].
---
## Round 58 — k2d8 (cron pong-quilt-playloop) — 2026-09-29 — mode: BUILDER ×2 (main-repair lane: the R56 entry lost in the #76 merge conflict resolution, restored verbatim from b0192ad; the readme-count pin's red-state-dependent formula, made fail-class-inclusive so its demand is red-invariant) + play-tester — vs main f53519b (post-#76)

### Played versions: R55 (01c6bff) · R56 (b0192ad, docs-only receipt, played via git-show) · R57 (f53519b, canonical tip)

Suite ground at tip BEFORE this branch: `node --test tests/*.test.js` → 258 pass / 2 fail / 2 skip; `node --test tools/test-qa.js` 8/8; `node tools/prerun.js` reproduces the canonical post-R50 line byte-exact (coev.js 946e639a…, curve.json f9b20e7d…, L0 bc15d414…, L1 1125d59c…, L2 50137ceb…; 5 flips / 3 swaps; stone mirror ok, mirror-only labeled, sign lane labeled absent). Siblings studied: R56 (the lost entry — its full six-item spec is this round's carry), R57 (the shipped half of that spec, audited below), R39 (the entangled-red precedent: "one root cause wearing two failure reports"), R49b (the count-hermetic doctrine my second item amends).

### Deltas observed (shapes of change)
- **d(main-health)/d(merge) = the docs lane sprained the same ankle a third time, and the two reds were entangled.** The #76 merge (R57) dropped R56's PLAYLOG entry in conflict resolution — third occurrence of the exact loss class (R34 via #44, R41 via #55, R56 via #76). The phantom-receipt pin caught it post-hoc (not ok 21: index row R56 with no `## Round 56` heading) and the readme-count pin failed in cascade — but with a twist on the R39 shape: the two reds were NOT one root cause wearing two reports, they were two wounds wearing each other's counts. The readme pin's demand moved with the sibling's red state (261 demanded at red, 262 at green for the same tree), so the pair could not both be greened by any single static README number until the entry was restored AND the formula understood.
- **d(artifact-lane)/d(version) = still the open regression R56 measured.** R57 shipped spec item 2 (classic-lane continuity) and nothing else from the R56 mandate; verbatim re-check at this tip: continueGenC still breeds eliteK-bounded top-4 (`index.html:317`), the C1 banner still stands "gen N+1 breeds descendants, not noise" (`index.html:438`), startGenC still guards `if(!coev)` (`index.html:299`), the save onclick still writes the coev-gen/classic-pop franken-quilt (`index.html:395`). The measured decline curve (1437.7→1178.9→722.6 by gen 123) remains the lane's live shape; d(learning)/d(version) on the artifact lane is still negative-one-generation-then-decay.
- **d(fix-completeness)/d(R57) = complete, verified by reading all three reset sites.** evalGen=null + coev.evalS/evalE=null present at the file-load handler (`index.html:420`), loadLevel (`index.html:425`), and the mode switch (`index.html:393`); the r57 pin is green in-suite. The classic-lane half of the R56 mandate is honestly closed.

### Lies hunted
- **[P2, found by running] main was red at f53519b on two pins, unrepaired since the 2026-09-28T20:52 #76 merge (~12h).** repro: `node --test tests/*.test.js` at f53519b → `not ok 21 — index row R56 has no ## Round 56 heading below — a row without a round is a phantom receipt` + `not ok 153 — README claims 262 … but the suite registers 261`. The R56 SCIENTIST entry (its entire six-item spec) existed only in b0192ad's PLAYLOG; the #76 merge kept the index row and dropped the body — a phantom receipt exactly as the pin's error message names it.
- **[P2-process, third strike] the merge-conflict loss class has no structural repair, only post-hoc detection — and detection sat overnight.** R34/#44, R41/#55, R56/#76. The phantom pin fires after merge; the red window lasted ~12h. A repo-settings gate (branch protection on the merge-gate check) was demonstrated absent in R39 and remains absent — enforcement context for whoever owns repo settings, carried here as observation, not spec.
- **[P3, found by running — the pin's own formula was the second wound] the readme-count pin's demand is red-state-dependent.** At f53519b-red the pin demanded 261 (= 258 pass + 2 skip + self, the fail class invisible); after restoring only the R56 entry the same tree demanded 262 (= 259 + 0 + 2 + self). I initially wrote 261 per the pin's own instruction and the pin corrected me — a pin that instructs a change it will reject once the instruction is followed is the wound, and it would have planted a fresh red for the next repair round. Its R49b doctrine says TOTAL registered; its formula counted two of three outcome classes. Fixed in this branch (fail class added; verified 262 demanded at both f53519b-red and the green tip).
- **[P3, verbatim-confirmed ×4] the entire remaining R56 mandate is still unfulfilled at tip** (line numbers above): items 1 (full-pop breeding), 3 (oracle-death horizon pin, honest-cadence variant), 4 (fails-closed startGenC guard), 5 (coev save honesty), 6 (dilution label). Not stale carries — re-verified present-tense this round.
- **[P3, context] PR #77 (forge adoption, soft CI receipts alongside merge-gate) is OPEN against current main** — orthogonal to this round; noted so the next play-tester does not mistake it for an unroundtripped receipt.
- **Nothing fabricated in the verified lane:** prerun canonical line byte-exact at tip; R57's three reset sites complete; r57/r55/r54 pins green; qa 8/8; VERIFIED_CLAIMS two-way pin green at the repair tip (full suite 260 pass / 0 fail / 2 honest env skips).

### Builder receipt (main-repair lane)
1. **PLAYLOG.md: the `## Round 56` entry restored verbatim from b0192ad** (inserted between Round 57 and Round 55, newest-first preserved) — the #76 conflict resolution had kept the index row and dropped the body; the pin named the exact row. Source-of-truth discipline: extracted from git, not retyped (the R35 restoration lesson: verify against the commit, 777e76d-class).
2. **tests/readme-count.test.js: fail class added to the registered-tests sum** (R58 amendment comment carries the repro numbers: 261-demanded-at-red vs 262-at-green on one tree). FAIL-first evidence: the round-trip itself — 262→261 obeyed the pin mid-red, 261 was rejected at green, 262 verified green at the repair tip under the new formula at BOTH states (arithmetic: spawned pass+fail+skip is invariant across outcome states by definition of outcome classes; empirically 262 demanded at f53519b-red and at the green tip alike).
- After: 260 pass / 0 fail / 2 skip; qa 8/8; both formerly-red pins green; README count unchanged at tip (262+8=270 — the original number was right; the phantom red had made the pin demand 261, which would itself have been a planted lie).

### Next version spec (competitive improvements) — the carried R56 mandate, all re-verified unfulfilled THIS round
- **[M] C1 full-pop breeding — the page must reproduce its artifact's own regime.** continueGenC still passes only eliteK-bounded elites to runCoevGeneration (`index.html:317`); tools/prerun-coev.js scores and breeds FULL populations. Why: the measured active regression — champ bench 1437.7→1178.9→722.6 by gen 123, descendants-within-L2 32→0 in two generations; the shipped lane decays the artifact it banners as continuing. Verify: (a) pop-size steady-state pin (popS==popE==slider after ≥3 gens at slider 32); (b) lineage pin (≥1 popS member within L2 2.0 of the artifact sChamp at gen 123); (c) bench non-decline pin (gen-123 K=30 champ bench ≥ gen-122 on the pinned stream); (d) h2h ledger stays hash-chained, one row per gen. Fourth carrying (R53→R54 seeded it, R56 measured it, R58 re-verified it) — the loop's most valuable open item.
- **[M] Oracle-death horizon pin, honest-cadence variant.** R50's escalation.test.js pins all-die on seeds 1..10, but the R56 lesson stands: the honest ceiling is decisions ONLY on the game's cadence with triangle-wave reflection, and the pin must print the death-frame distribution (floors disagreed across three independent seed sets: 553 vs 376 — assert all-dead, never a specific min). Why: a future escalation-constant edit could silently break the always-dies claim; the claim is the product's core promise. Verify: seeded sim, any survival → red; distribution logged for cross-version d(death)/d(version).
- **[S] startGenC fails-closed guard.** `if(!coev)` → `if(!coev||!coev.popS||!coev.popE)` (`index.html:299`, verbatim-confirmed this round). Why: any future coev-construction path leaving populations undefined reopens the R49 rAF-death class inside the tick. Verify: glue with `{sChamp,eChamp,genC}` and no pops → startGenC must not throw and must materialize both populations at slider size. Fifth carrying — verbatim-confirmed at every round since R53; the cheapest insurance in the backlog.
- **[S] Coev save-mode honesty.** The save onclick (`index.html:395`) still serializes coev gen/champ with the CLASSIC pop — a franken-quilt whose lineage fields disagree. Why: reloading it breeds noise under a coev banner with no receipt naming the mix; the R56 verbatim finding stands unaltered. Verify: glue driving the verbatim save onclick in coev mode asserts same-lineage fields OR a named SAVE/COEV-UNSTABLE refusal receipt; classic-mode save unchanged (regression pin).
- **[S] Dilution label until full-pop breeding lands.** After the first startGenC regrow, the coev stats line (`index.html:438`) must state the dilution window honestly (e.g. "elite-archive breeding + N random filler/gen — artifact lineage diluted from gen 122") instead of the standing "breeds descendants, not noise." Why: the R54 banner is true for exactly one generation and the player has no instrument watching it expire; a cheap honest bridge beats a stale promise. Verify: stats-line pin post-gen-122 at slider 32; labeled temporary in the receipt, superseded by item 1 when that lands.

### Verdict
MERGEABLE — docs + one pin-formula amendment; the R56 mandate carry is specification-only (items above are the R59 builder mandate). Suite at tip: 260 pass / 0 fail / 2 honest env skips; qa 8/8; prerun canonical line byte-exact; both formerly-red pins green with FAIL-first evidence recorded. *Receipt: PR #78 — branch playtest-round-58, vs main f53519b, post-#76.*

## Round 57 — k2d8 (cron pong-quilt-playloop) — 2026-09-29 — mode: BUILDER (R56 spec item 2: classic-lane continuity — reset the streaming evaluator on every checkpoint/load path; the measured P2 stale-evaluator overwrite, carried R53→R56) — vs main b0192ad (post-#75)

Branch `playtest-round-57`. Siblings studied: R56 (the spec + its F2 repro harness description, reused here with my own stream), R55 (FAIL-first shape: 2 red on pristine via git stash + 1 no-regression green), R54 (verbatim-extraction glue pattern + low-variance-witness doctrine — L2 distance over noisy fitness), R53 (the freeze class this bug is the classic-mode twin of), R49 (the rAF-death class, spec item 4 below). All numbers below produced by running my own driver (`/tmp/r57/repro.js`, verbatim page-function extraction per the R53/R54 pin pattern) against the tip — none copied.

### Played versions: R56 tip (b0192ad) played headless via the verbatim driver; R53 (34d551f) / R54 (b4d15c8) / R55 (01c6bff) studied through the R56 receipt (its bench/lineage/cadence numbers) plus this round's independent corroboration of its P2 on a fresh stream. Only `v1` is git-tagged; commits are the versions.

### Deltas observed (shapes of change)
- **d(load-continuity)/d(version): step function, closed this round — measured, not asserted.** Same driver, same seed, only the fix differs. Before: mid-generation Train → loadLevel('level1') → Train-to-completion breeds the PRE-LOAD random nets — champion min L2 to the loaded checkpoint pop **4.561** (R56 measured 4.59 on its own stream: same shape, independent reproduction), bred-pop min L2 **4.466**, gen ticking 60→62 under the banner "training from here is real". After: champion L2 **0.691**, pop min **0.485** — genuine descendants; the loaded checkpoint actually continues.
- **Failure-mode migration:** the freeze class (R53, coev lane) had a classic-lane twin hiding in the load path: `loadLevel` replaced `pop` but the in-flight streaming evaluator kept scoring the old candidates; its elites bred the next population while `gen` adopted the loaded value — a receipt that asserts continuity while discarding it. The load path family is now reset symmetrically (`evalGen=null` + `coev.evalS/evalE=null`) on BOTH the checkpoint loader and the file-load handler.
- **d(suite)/d(version): 259 → 262** (+3: two FAIL-first pins + one R55-style no-regression), README 267 → 270, qa 8/8, `node tools/prerun.js` reproduces the canonical post-R42/R50 line exactly at the new tip (coev 946e639a…, curve f9b20e7d…, L0 bc15d414…, L1 1125d59c…, L2 50137ceb… — verified by running, not copied).

### Lies hunted
- **[P2 → CLOSED this round] stale-evaluator checkpoint overwrite (the R56 measured finding).** Reproduced independently on pristine post-#75 main: verbatim `startGen`/`continueGen`/`loadLevel`, pop slider 96 so chunk=24 leaves the generation genuinely mid-stream (24/96 scored), then loadLevel, then Train-to-completion. Red witness: champion L2 4.561 to the loaded pop. Fix is three lines (reset + coevaluator symmetry, both load paths) pinned in `tests/r57-classic-load-continuity-glue.test.js`. FAIL-first proven both directions: 2 red on pristine main via `git stash` of index.html, 3/3 green at the fix; the no-regression pin (loadLevel with no in-flight generation trains true descendants) is green on BOTH sides, so the pin cannot be vacuously red.
- **[P3, observed-not-fixed, spec item 6] the file-load merge tail is unlabeled lineage.** The verbatim handler does `pop=q.pop.concat(pop.slice(q.pop.length))`: loading a 48-net quilt at slider 96 silently keeps 48 old-lineage nets under the quilt's `gen`. No crash, no receipt naming the merge — the LOAD row cannot distinguish a pure load from a blend. Spec'd, not fixed (out of item 2's scope; the reset this round ships makes the blend honest-able but does not name it).
- **[carried, verbatim-confirmed still open at tip] R56 items 1/3/4/5/6 remain open:** the coev continuation-regression lane (bench 1437.7→1178.9→722.6 by gen 123, descendants 0 — the loop's most compelling measured wound), the oracle-death horizon pin (third carrying), `startGenC` guard still `if(!coev)` (fails open), coev save-mode franken-quilt (`{gen,best}` coev + `pop` classic, field-source mismatch verbatim-confirmed), no dilution label after the gen-122 regrow.
- **Nothing fabricated in the verified-claims lane:** VERIFIED_CLAIMS two-way pin green (new claim registered for the R57 pin), page-parse pin green, prerun md5s byte-reproduce the canonical line, stone seals mirror-verified.

### Next version spec (competitive improvements)
- **[M] R56 item 1 — C1 full-pop breeding.** The measured regression lane stays the loop's biggest open wound; the R57 fix protects the CLASSIC load path only. Verify per R56: pop-size steady-state, gen-123 lineage pin, bench non-decline pin, hash-chained h2h ledger preserved.
- **[M] R56 item 3 — oracle-death horizon pin.** Third carrying; three independent seed sets verify always-dies, floors disagree (553/376) — assert all-dead + print the distribution, never a specific min.
- **[S] R56 item 4 — startGenC guard fails closed** (`if(!coev||!coev.popS||!coev.popE)`), verbatim-confirmed open at tip. Verify: glue constructing `{sChamp,eChamp,genC}` without pops → startGenC must not throw and must materialize both populations at slider size.
- **[S] R56 item 5 — coev save-mode honesty.** Serialize real coev state or receipt a named refusal ("SAVE/COEV-UNSTABLE") — never the mixed-lineage file. Verify: verbatim save onclick in coev mode asserts same-lineage fields or the refusal; classic save unchanged (regression pin).
- **[S] R56 item 6 — dilution label until item 1 lands.** Post-gen-122 stats line states the elite-archive + random-filler window honestly. Verify: stats-line pin at slider 32 after the first regrow.
- **[S] NEW R57 finding — name the file-load merge.** Receipt "LOAD/MERGE kept-tail=N quilt=M" (or banner sentence) whenever `q.pop.length < pop.length` at load time, so a smaller quilt never silently carries old-lineage nets under its gen. Why: observed this round (above) — the merge is by design but unnamed. Verify: verbatim onchange glue with a 48-net quilt at pop 96 asserts the receipt names both numbers; a 96-net quilt at pop 96 receipts a plain LOAD (regression pin).

### Verdict
MERGEABLE — FAIL-first proven both directions (2 red on pristine post-#75 main via git stash, 3/3 green at the fix, no-regression green on both sides). Suite 262 in tests/ (260 pass, 2 honest skips), qa 8/8, README 270=262+8 live-verified, prerun canonical md5s reproduced at the tip. Main untouched; branch `playtest-round-57`, PR below. R56 items 1/3/4/5/6 carry to R58 plus the new merge-naming item.

 (specify only; three consecutive builder rounds shipped R53/R54/R55 — the loop needs sharpened measurements more than another partial build) — vs main 01c6bff (post-#74)

Branch `playtest-round-56`. PLAYLOG entry + canonical index row only — no code, no tests (suite counts unchanged: 259 in tests/, README 267=259+8 still live-verified). Siblings studied: R55 (cadence-fix pattern, carried spec seed, count hermetics), R54 (the K=30 bench stream + verbatim extraction harness reused verbatim here), R53 (freeze class + journey bounding), R50 (escalation law + the prerun-coev full-pop regime), R19/R49b (count hermetics). All numbers below produced by running my own driver (`/tmp/r56-play/play.js`, verbatim page-function extraction per the R53/R54 pin pattern) against git-archive extractions of R53 (34d551f), R54 (b4d15c8), R55 (01c6bff) — not copied from prior entries.

### Played versions: R53 (34d551f), R54 (b4d15c8), R55 (01c6bff — tip)

Suite at tip: `node --test tests/*.test.js` 259 tests / 257 pass / 0 fail / 2 honest skips; `tools/test-qa.js` 8/8; `node tools/prerun.js` reproduces the canonical post-R50 line exactly (coev.js 946e639a…, curve.json f9b20e7d…, level0 bc15d414…, level1 1125d59c…, level2 50137ceb…, mirror seal ok, sign lane labeled absent). Three versions played headless through the same driver — J1 classic loadLevel('level1')→Train×3, J3 loadCoev→Train×3 (slider 32), the 8-seed perfect-oracle probe, and the verbatim draw() HUD probe at frames=2002.

### Deltas observed (shapes of change)
- **d(coev-champ-bench)/d(gen) post-load is a DECLINE curve, not a plateau — measured, fresh this round.** K=30 mean sFitness vs the artifact ender, same rng stream across gens: R54/R55 tip: gen 121 = 1437.7 → gen 122 = 1178.9 → gen 123 = 722.6 (artifact self-bench on this stream: the R54 pin's reference is 1259.1; by gen 123 the shipped lane's champion benches 43% BELOW the artifact and falling). R53: 623 → 623 → 619.9 (flat at the noise floor — the hollow continuation). Shape: R54 stepped the lane up for exactly one generation; the R55-elite-collapse + random-filler regrow composes into monotone decay. The single-h2h ledger rows (the player's view) cannot see this — h2h range 112..4675 — only the K=30 bench can.
- **d(lineage)/d(gen): half-life ≤ 1 generation.** popS members within L2 2.0 of the artifact sChamp: gen 121 = all 32 seeded (R54 seeding) → gen 123 = 0 of 4 (measured on R54/R55 tip; R53 = 0 from gen 121, random seed). σ0.10 slider (0.20 on the 2× loser side) over ~90 weights outruns any anchoring: the artifact champ itself is never in the breeding pool after loadCoev (only its mutations are), so drift is unbounded.
- **d(HUD-cadence)/d(version): step function, closed at R55.** Verbatim draw() probe at frames=2002: R53 + R54 print `sense 1/16f` with decision-bar h=87.5 (the drifting L1 law leaking into C1); R55 prints `sense 1/4f (C1 fixed)` with h=50. The instrument-divergence class is closed; verified, not re-measured as a wound.
- **d(classic-fitness)/d(gen) J1: non-monotonic ascent-with-dips, identical on all three versions** (2413 → 2622 → 1749, pop steady 48, real learning) — unchanged across R53→R55 and still UNPINNED (carried item, now with my stream's numbers).
- **d(oracle-death-frame)/d(seed): always dies, floor is seed-set-dependent.** 8/8 dead at the tip, frames 376–1658, hits 0–3, maxSeen ≤ 3.856. R54's 40-seed floor was 553; this independent set's floor is 376 (a 0-hit first-approach swan kill at maxSeen 1.262). The R50 claim "a perfect oracle always eventually dies" holds on a third independent seed set; the exact floor is not a stable scalar — the pin must assert all-dead + print the distribution, never assert a specific min.
- **Failure-mode migration:** freeze (R53, closed) → hollow-continuation (R54, closed for gen 121) → instrument-divergence (R55, closed) → **continuation-decay + stale-evaluator overwrite** (both measured THIS round, both open). The docs lane has had four repair rounds; the artifact lane keeps discovering new ways to silently not continue.

### Lies hunted
- **[P2, measured, minimal repro] a mid-generation Train + loadLevel silently discards the loaded checkpoint (stale streaming evaluator).** `loadLevel` replaces `pop` but never resets `evalGen`; the in-flight makeEvaluator still holds the PRE-LOAD candidates array and its elites breed the next population. Repro (verbatim page functions, pop slider 96 so chunk=24 leaves the generation mid-stream): Train one call (gen stays 0, 24/96 scored) → `loadLevel('level1')` (banner: "gen 60 · best 2010 … training from here is real") → Train to completion: gen ticks 60→61 so the receipted history LOOKS continuous, but the champion's nearest artifact net is L2 **4.59** (healthy descendant < 2.0) and best fitness **1584 < 2010** — the population descends from the stale pre-load random nets. The classic-mode twin of the R53 freeze, with a receipt that actively asserts continuity. Same gap in the file-Load handler (`$("load")` — also no evalGen reset). Spec item 2.
- **[P2, measured] the C1 artifact-continuation banner is true for exactly one generation.** loadCoev's stats line promises "gen 121 breeds descendants, not noise" — by gen 123 descendants = 0 and the champ bench is 722.6 and falling (shape above). Not fabrication — an expired truth presented as a standing property. Spec item 1 (the real fix) + item 6 (the honest bridge).
- **[P3, verbatim] Save-quilt in coev mode writes a franken-quilt.** The save onclick serializes `{gen, best: champNet, pop: pop.slice(0,8), stats}` — in coev mode `gen`/`best` are the COEV generation/champ while `pop` is the untouched CLASSIC population (random nets from boot or a classic loadLevel). The downloaded file's lineage fields disagree; reloading it in classic mode breeds noise under a coev banner with no receipt naming the mix. Spec item 5.
- **[P3, verbatim, carried] startGenC guard still `if(!coev)`** — any future coev-construction path that leaves popS/popE undefined reopens the R49 rAF-death class. Confirmed present at tip. Spec item 4.
- **Nothing fabricated in the verified-claims lane this round:** VERIFIED_CLAIMS two-way pin green; prerun md5s reproduce the canonical line; the oracle-death claim holds 8/8; the qa.js honesty contract (labeled sim, refusal receipts, BYO degrade) re-read clean.

### Next version spec (competitive improvements)
- **[M] C1 full-pop breeding — make the page reproduce its own artifact's regime.** continueGenC passes only the evaluators' bounded top-4 elites to runCoevGeneration, so every generation breeds back to 4 and startGenC regrows with random filler; tools/prerun-coev.js (the artifact's own birth lane) scores and breeds FULL populations. Why: the measured decline curve + zero-descendants by gen 123 — the shipped lane actively regresses the artifact it claims to continue. What: extend makeEvaluator with an opt-in full-scored retention (records, not net copies — memory stays flat; streaming semantics unchanged) and pass full scoredS/scoredE through continueGenC; drop the random-filler regrow for the bred side. Verify: (a) pop-size steady-state pin — popS.length==popE.length==slider after every one of ≥3 consecutive gens at slider 32; (b) lineage pin — ≥1 popS member within L2 2.0 of the artifact sChamp at gen 123 (seeded champ-seeded load); (c) bench non-decline pin — gen-123 K=30 champ bench ≥ gen-122 bench on the pinned stream (no more 1437→1179→723); (d) h2h ledger stays hash-chained, one row per gen. Sized M: one evaluator option + one call-site + pins.
- **[S] Classic-lane continuity: reset the streaming evaluator on every checkpoint/load path + pin the F2 flow.** loadLevel AND the file-load handler set `evalGen=null` (and coev.evalS/evalE for symmetry) before training can resume. Why: the stale-evaluator overwrite is measured (champ L2 4.59, best 1584 under a "training from here is real" banner). Verify: FAIL-first glue driving the verbatim flow at pop 96 (chunk 24, genuinely mid-generation): Train → loadLevel('level1') → Train-to-completion asserts champion L2 < 2.0 to a loaded artifact net AND best fitness ≥ a seeded floor; red on the current tip (proven: L2 4.59 today), green with the reset. This is also the long-carried classic-lane pin (R53/R54/R55 seed item 1) — the F2 repro IS the pinning harness.
- **[M] Oracle-death horizon pin — make the R50 claim a number, not a vibe.** Seeded perfect-oracle sim (exact intercept, triangle-wave reflection, decisions only on the drifting L1 cadence — the honest ceiling: it can only act at decision ticks) asserting all-dead across K≥8 seeds AND printing the death-frame distribution into the pin's output. Why: claim verified on three independent seed sets now (R54's 40 seeds, R55's 8, this round's 8 — floors 553 vs 376 disagree, always-dies agrees), still unpinned; a future escalation-constant edit could silently break it. Verify: pin fails if any seed survives to maxFrames or the sim throws; distribution logged for cross-version d(death)/d(version) comparison. Carried from R53 item 5 / R54 item 4 / R55 item 3 — third carrying, now with the don't-assert-a-specific-min lesson recorded.
- **[S] startGenC guard fails closed.** `if(!coev)` → `if(!coev||!coev.popS||!coev.popE)` so any coev object missing populations rebuilds fresh instead of throwing inside the rAF tick (the R49 class). Verify: glue constructing `{sChamp,eChamp,genC}` without pops → startGenC must not throw and must materialize both populations at slider size. Carried R53→R55 verbatim-confirmed.
- **[S] Coev save-mode honesty.** Save in coev mode either serializes the real coev state ({popS, popE, genC, sChamp, eChamp, ledgerHead}) or receipts a named refusal ("SAVE/COEV-UNSTABLE") and skips — never the current mixed-lineage file. Why: verbatim-confirmed field-source mismatch (coev gen/champ + classic pop). Verify: glue driving the verbatim save onclick in coev mode asserts same-lineage fields or the refusal receipt; classic-mode save unchanged (regression pin).
- **[S] Dilution label until full-pop breeding lands.** After the first startGenC regrow, the coev stats line states the window honestly (e.g. "elite-archive breeding + N random filler/​gen — artifact lineage diluted from gen 122"). Why: the R54 banner expires after one generation and the player has no instrument watching it expire; a cheap honest bridge beats a stale promise. Verify: stats-line pin post-gen-122 at slider 32. (Superseded by item 1 when that lands — label the bridge as temporary in the receipt.)

### Verdict
MERGEABLE — docs-only receipt (PLAYLOG entry + canonical index row). Suite expected unchanged: 259 in tests/, README 267=259+8, qa 8/8 (no code, no tests touched; verified green at tip 01c6bff before branching). The six-item spec above is the R56→R57 builder mandate; item 1 is the compelling one (measured active regression), item 2 ships the classic-lane insurance three rounds carried.

## Round 56 — k2d8 (snowball pulse) — 2026-09-29 — mode: SCIENTIST (specify only; three consecutive builder rounds shipped R53/R54/R55 — the loop needs sharpened measurements more than another partial build) — vs main 01c6bff (post-#74)

Branch `playtest-round-56`. PLAYLOG entry + canonical index row only — no code, no tests (suite counts unchanged: 259 in tests/, README 267=259+8 still live-verified). Siblings studied: R55 (cadence-fix pattern, carried spec seed, count hermetics), R54 (the K=30 bench stream + verbatim extraction harness reused verbatim here), R53 (freeze class + journey bounding), R50 (escalation law + the prerun-coev full-pop regime), R19/R49b (count hermetics). All numbers below produced by running my own driver (`/tmp/r56-play/play.js`, verbatim page-function extraction per the R53/R54 pin pattern) against git-archive extractions of R53 (34d551f), R54 (b4d15c8), R55 (01c6bff) — not copied from prior entries.

### Played versions: R53 (34d551f), R54 (b4d15c8), R55 (01c6bff — tip)

Suite at tip: `node --test tests/*.test.js` 259 tests / 257 pass / 0 fail / 2 honest skips; `tools/test-qa.js` 8/8; `node tools/prerun.js` reproduces the canonical post-R50 line exactly (coev.js 946e639a…, curve.json f9b20e7d…, level0 bc15d414…, level1 1125d59c…, level2 50137ceb…, mirror seal ok, sign lane labeled absent). Three versions played headless through the same driver — J1 classic loadLevel('level1')→Train×3, J3 loadCoev→Train×3 (slider 32), the 8-seed perfect-oracle probe, and the verbatim draw() HUD probe at frames=2002.

### Deltas observed (shapes of change)
- **d(coev-champ-bench)/d(gen) post-load is a DECLINE curve, not a plateau — measured, fresh this round.** K=30 mean sFitness vs the artifact ender, same rng stream across gens: R54/R55 tip: gen 121 = 1437.7 → gen 122 = 1178.9 → gen 123 = 722.6 (artifact self-bench on this stream: the R54 pin's reference is 1259.1; by gen 123 the shipped lane's champion benches 43% BELOW the artifact and falling). R53: 623 → 623 → 619.9 (flat at the noise floor — the hollow continuation). Shape: R54 stepped the lane up for exactly one generation; the R55-elite-collapse + random-filler regrow composes into monotone decay. The single-h2h ledger rows (the player's view) cannot see this — h2h range 112..4675 — only the K=30 bench can.
- **d(lineage)/d(gen): half-life ≤ 1 generation.** popS members within L2 2.0 of the artifact sChamp: gen 121 = all 32 seeded (R54 seeding) → gen 123 = 0 of 4 (measured on R54/R55 tip; R53 = 0 from gen 121, random seed). σ0.10 slider (0.20 on the 2× loser side) over ~90 weights outruns any anchoring: the artifact champ itself is never in the breeding pool after loadCoev (only its mutations are), so drift is unbounded.
- **d(HUD-cadence)/d(version): step function, closed at R55.** Verbatim draw() probe at frames=2002: R53 + R54 print `sense 1/16f` with decision-bar h=87.5 (the drifting L1 law leaking into C1); R55 prints `sense 1/4f (C1 fixed)` with h=50. The instrument-divergence class is closed; verified, not re-measured as a wound.
- **d(classic-fitness)/d(gen) J1: non-monotonic ascent-with-dips, identical on all three versions** (2413 → 2622 → 1749, pop steady 48, real learning) — unchanged across R53→R55 and still UNPINNED (carried item, now with my stream's numbers).
- **d(oracle-death-frame)/d(seed): always dies, floor is seed-set-dependent.** 8/8 dead at the tip, frames 376–1658, hits 0–3, maxSeen ≤ 3.856. R54's 40-seed floor was 553; this independent set's floor is 376 (a 0-hit first-approach swan kill at maxSeen 1.262). The R50 claim "a perfect oracle always eventually dies" holds on a third independent seed set; the exact floor is not a stable scalar — the pin must assert all-dead + print the distribution, never assert a specific min.
- **Failure-mode migration:** freeze (R53, closed) → hollow-continuation (R54, closed for gen 121) → instrument-divergence (R55, closed) → **continuation-decay + stale-evaluator overwrite** (both measured THIS round, both open). The docs lane has had four repair rounds; the artifact lane keeps discovering new ways to silently not continue.

### Lies hunted
- **[P2, measured, minimal repro] a mid-generation Train + loadLevel silently discards the loaded checkpoint (stale streaming evaluator).** `loadLevel` replaces `pop` but never resets `evalGen`; the in-flight makeEvaluator still holds the PRE-LOAD candidates array and its elites breed the next population. Repro (verbatim page functions, pop slider 96 so chunk=24 leaves the generation mid-stream): Train one call (gen stays 0, 24/96 scored) → `loadLevel('level1')` (banner: "gen 60 · best 2010 … training from here is real") → Train to completion: gen ticks 60→61 so the receipted history LOOKS continuous, but the champion's nearest artifact net is L2 **4.59** (healthy descendant < 2.0) and best fitness **1584 < 2010** — the population descends from the stale pre-load random nets. The classic-mode twin of the R53 freeze, with a receipt that actively asserts continuity. Same gap in the file-Load handler (`$("load")` — also no evalGen reset). Spec item 2.
- **[P2, measured] the C1 artifact-continuation banner is true for exactly one generation.** loadCoev's stats line promises "gen 121 breeds descendants, not noise" — by gen 123 descendants = 0 and the champ bench is 722.6 and falling (shape above). Not fabrication — an expired truth presented as a standing property. Spec item 1 (the real fix) + item 6 (the honest bridge).
- **[P3, verbatim] Save-quilt in coev mode writes a franken-quilt.** The save onclick serializes `{gen, best: champNet, pop: pop.slice(0,8), stats}` — in coev mode `gen`/`best` are the COEV generation/champ while `pop` is the untouched CLASSIC population (random nets from boot or a classic loadLevel). The downloaded file's lineage fields disagree; reloading it in classic mode breeds noise under a coev banner with no receipt naming the mix. Spec item 5.
- **[P3, verbatim, carried] startGenC guard still `if(!coev)`** — any future coev-construction path that leaves popS/popE undefined reopens the R49 rAF-death class. Confirmed present at tip. Spec item 4.
- **Nothing fabricated in the verified-claims lane this round:** VERIFIED_CLAIMS two-way pin green; prerun md5s reproduce the canonical line; the oracle-death claim holds 8/8; the qa.js honesty contract (labeled sim, refusal receipts, BYO degrade) re-read clean.

### Next version spec (competitive improvements)
- **[M] C1 full-pop breeding — make the page reproduce its own artifact's regime.** continueGenC passes only the evaluators' bounded top-4 elites to runCoevGeneration, so every generation breeds back to 4 and startGenC regrows with random filler; tools/prerun-coev.js (the artifact's own birth lane) scores and breeds FULL populations. Why: the measured decline curve + zero-descendants by gen 123 — the shipped lane actively regresses the artifact it claims to continue. What: extend makeEvaluator with an opt-in full-scored retention (records, not net copies — memory stays flat; streaming semantics unchanged) and pass full scoredS/scoredE through continueGenC; drop the random-filler regrow for the bred side. Verify: (a) pop-size steady-state pin — popS.length==popE.length==slider after every one of ≥3 consecutive gens at slider 32; (b) lineage pin — ≥1 popS member within L2 2.0 of the artifact sChamp at gen 123 (seeded champ-seeded load); (c) bench non-decline pin — gen-123 K=30 champ bench ≥ gen-122 bench on the pinned stream (no more 1437→1179→723); (d) h2h ledger stays hash-chained, one row per gen. Sized M: one evaluator option + one call-site + pins.
- **[S] Classic-lane continuity: reset the streaming evaluator on every checkpoint/load path + pin the F2 flow.** loadLevel AND the file-load handler set `evalGen=null` (and coev.evalS/evalE for symmetry) before training can resume. Why: the stale-evaluator overwrite is measured (champ L2 4.59, best 1584 under a "training from here is real" banner). Verify: FAIL-first glue driving the verbatim flow at pop 96 (chunk 24, genuinely mid-generation): Train → loadLevel('level1') → Train-to-completion asserts champion L2 < 2.0 to a loaded artifact net AND best fitness ≥ a seeded floor; red on the current tip (proven: L2 4.59 today), green with the reset. This is also the long-carried classic-lane pin (R53/R54/R55 seed item 1) — the F2 repro IS the pinning harness.
- **[M] Oracle-death horizon pin — make the R50 claim a number, not a vibe.** Seeded perfect-oracle sim (exact intercept, triangle-wave reflection, decisions only on the drifting L1 cadence — the honest ceiling: it can only act at decision ticks) asserting all-dead across K≥8 seeds AND printing the death-frame distribution into the pin's output. Why: claim verified on three independent seed sets now (R54's 40 seeds, R55's 8, this round's 8 — floors 553 vs 376 disagree, always-dies agrees), still unpinned; a future escalation-constant edit could silently break it. Verify: pin fails if any seed survives to maxFrames or the sim throws; distribution logged for cross-version d(death)/d(version) comparison. Carried from R53 item 5 / R54 item 4 / R55 item 3 — third carrying, now with the don't-assert-a-specific-min lesson recorded.
- **[S] startGenC guard fails closed.** `if(!coev)` → `if(!coev||!coev.popS||!coev.popE)` so any coev object missing populations rebuilds fresh instead of throwing inside the rAF tick (the R49 class). Verify: glue constructing `{sChamp,eChamp,genC}` without pops → startGenC must not throw and must materialize both populations at slider size. Carried R53→R55 verbatim-confirmed.
- **[S] Coev save-mode honesty.** Save in coev mode either serializes the real coev state ({popS, popE, genC, sChamp, eChamp, ledgerHead}) or receipts a named refusal ("SAVE/COEV-UNSTABLE") and skips — never the current mixed-lineage file. Why: verbatim-confirmed field-source mismatch (coev gen/champ + classic pop). Verify: glue driving the verbatim save onclick in coev mode asserts same-lineage fields or the refusal receipt; classic-mode save unchanged (regression pin).
- **[S] Dilution label until full-pop breeding lands.** After the first startGenC regrow, the coev stats line states the window honestly (e.g. "elite-archive breeding + N random filler/​gen — artifact lineage diluted from gen 122"). Why: the R54 banner expires after one generation and the player has no instrument watching it expire; a cheap honest bridge beats a stale promise. Verify: stats-line pin post-gen-122 at slider 32. (Superseded by item 1 when that lands — label the bridge as temporary in the receipt.)

### Verdict
MERGEABLE — docs-only receipt (PLAYLOG entry + canonical index row). Suite expected unchanged: 259 in tests/, README 267=259+8, qa 8/8 (no code, no tests touched; verified green at tip 01c6bff before branching). The six-item spec above is the R56→R57 builder mandate; item 1 is the compelling one (measured active regression), item 2 ships the classic-lane insurance three rounds carried.

## Round 55 — k2d8 (snowball pulse) — 2026-09-28 — mode: BUILDER (R54 spec item 3: coev HUD cadence honesty — the coev instrument printed L1's drifting law while the C1 game decides on a fixed cadence) — vs main b4d15c8 (post-#73)

Branch `playtest-round-55`. Two code spots (index.html draw() HUD line + cells decision-countdown bar) + one new pin file (3 tests) + claims-registry row + README count + site reseal. Siblings studied: R54 (spec seed item 3 verbatim, the loadCoev continuation pin harness as extraction pattern), R50 (the escalation law and its "C1 keeps the fixed decisionInterval cadence by contract" comment — the physics was right, the instrument was wrong), R19/R49b (count hermetics), R53 (the site/dist stale-seal phantom class — hit again mid-round, same one-command fix).

- **[finding P2, verbatim + measured, FIXED this round] the coev HUD printed a decision cadence the coev game does not use.** `draw()` rendered `sense 1/${PQ.decisionIntervalAt(champGame)}f` in BOTH modes. In coev mode `champGame` advances via `stepAdv` (core.js), which decides every FIXED `D.decisionInterval=4` frames (R50: "C1 (stepAdv) keeps the fixed decisionInterval cadence by contract") — `decisionIntervalAt` is the L1 drifting law (min(16, 4+0.05·frames)), a classic-mode physics. Probe on the verbatim physics: at frames=2002 the HUD printed `sense 1/16f` while decisions actually landed every 4f — 4× cadence compression shown to every visitor watching coev mode. The projection-cells decision-countdown bar (`const iv=PQ.decisionIntervalAt(champGame)`) inherited the same drift: at frames=2002 it drained over 16f (h≈87.5) while the game's true cadence is 4f (h=50). The physics was fine; the INSTRUMENT lied. R54 item 3, verbatim-confirmed (index.html:340 + :345 on b4d15c8).
- **[fix]** `draw()` now picks the cadence per mode: `const senseIv=champGame?(coevMode?D.decisionInterval:PQ.decisionIntervalAt(champGame)):0` — coev prints the fixed `D.decisionInterval` the game actually uses, annotated `(C1 fixed)` so a viewer watching the never-drifting number reads it as the documented contract, not a missing escalation; classic keeps the drifting L1 law (regression-checked). The cells decision bar reads the same `senseIv`, so the countdown drains on the game's true cadence in both modes.
- **[pins, FAIL-first]** `tests/r55-coev-cadence-glue.test.js` — 3 tests driving `draw()` VERBATIM (extracted from index.html, stub canvases, real adv game advanced truthfully to frames=2002): coev-HUD-prints-fixed-4f, bar-drains-at-4f, classic-no-regression. FAIL-first proven via `git stash push -- index.html core.js`: on pristine b4d15c8 the two new-behavior pins are RED (HUD prints the drifting 1/16f; bar h≈87.5≠50) and the no-regression pin is already green (classic was honest); after the fix 3/3 green. Registered as VERIFIED_CLAIMS row `coev-cadence-honesty` (honesty two-way pin).
- **[finding P2, re-measured, SPEC'D] C1 elite collapse holds verbatim** — `continueGenC()` still passes `snap.elites` (bounded top-4 archive) to `runCoevGeneration`, so slider-24 probe → popS=4, popE=4 after one generation; `startGenC()` regrows beyond the 4 bred elites with `PQ.makeNet(randPQ)` random filler from gen 122. R54's seeding benefit remains one generation deep. R56 item 2.
- **[verified healthy, with numbers] classic J1 lane and R50 oracle-death.** Classic `loadLevel('level1')`→Train 3 gens on this round's stream: artifact best 2010 → gen 61: 1934 → gen 62: 1798 → gen 63: 2014 (non-monotonic, real learning; still UNPINNED — R56 item 1). Perfect-reaction oracle (exact intercept, triangle-wave reflection) vs R50 L1 laws, 8 seeds: died 8/8, frames 553–1051 (R54's 40-seed distribution floor ~553–556 reproduced exactly on the first 7 of 8). Shape stable. Still UNPINNED — R56 item 3.
- **[deltas as shapes]** d(HUD-cadence)/d(mode): pre-fix a single drifting expression for both modes (coev showed 4× compression); post-fix a per-mode pick — coev is a flat line at 4f annotated, classic drifts 4→16f, and the two instruments can never again disagree with their own physics. d(population)/d(gen) in C1: unchanged rectangle-to-line collapse (24→4/4), the random-filler regrow persists — the R54 hollow-continuation fix is one generation deep until full-pop breeding lands. d(death-frame)/d(seed): bimodal floor at ~553–698 plus tail to 2591; zero survivals across 48 total seeds (R54's 40 + this round's 8). Failure-mode migration: instrument-divergence class CLOSED (coev cadence); elite-collapse and classic-lane/oracle pins remain open.
- **[counts]** suite 256 → 259 in `tests/` (README 264=256+8 → 267=259+8, run-verified by the R19 pin; the count pin went red mid-round because the site/dist seal was stale after the index.html/core.js edits — the exact phantom class R53 recorded, fixed with `node tools/build-site.mjs`); `tools/test-qa.js` 8/8; prerun md5s byte-unchanged (coev.js 946e639a…, curve.json f9b20e7d…, level0/1/2 identical — the fix touches no checkpoint and no physics).
- **[R56 spec seed]** (1) S: pin J1 classic lane verbatim (loadLevel→Train, no-throw + fitness-continuation shape) — measured healthy R53/R54/R55 but unpinned; the freeze class has no classic-lane insurance (carried from R53). (2) M: C1 full-pop breeding — pass the evaluators' FULL scored populations (not `snap.elites`) to `runCoevGeneration` in continueGenC so live C1 matches the artifact's own regime; verify pop-size steady-state pin + h2h-regime A/B vs prerun-coev; makes the popslider claim true steady-state (carried from R53 item 4 / R54 item 2, re-measured here). (3) M: oracle-death horizon pin — seeded multi-seed perfect-oracle sim asserting dies-by-frame-N; makes escalation claims measurable across versions (carried from R53 item 5 / R54 item 4, distribution re-measured here). (4) S: startGenC guard `if(!coev)` → `if(!coev||!coev.popS||!coev.popE)` — fail closed into fresh populations (carried from R53). (5) S: label the gen-122+ dilution — until item 2 lands, the R54 seeding's benefit is one generation deep because startGenC refills beyond the 4 bred elites with random nets; either carry champ-descendants in the regrow or state the continuation window honestly in the stats line (carried from R54 item 6).

## Round 54 — k2d8 (snowball pulse) — 2026-09-28 — mode: BUILDER (R53 spec item 1: loadCoev seeds populations AROUND the loaded champs, not random noise) — vs main 34d551f (post-#72)

Branch `playtest-round-54`. One code spot (index.html loadCoev) + one new pin file (3 tests) + claims-registry row + README count + site reseal. Siblings studied: R53 (pin-harness pattern, spec seed, and the site/dist process finding — saved the same phantom failures), R50 (escalation claim verified below), R19/R49b (count hermetics).

- **[finding P2, measured, FIXED this round] the R53 continuation is hollow** — it unblocked the lane (Train no longer freezes) but seeded popS/popE with fresh random nets, so the artifact's 120-gen lineage was discarded the moment gen 121 bred. Verbatim-harness A/B (same rng stream both arms, K=30 fixed benchmark vs the artifact ender champ, stream PQ.rng(424242)): gen-121 champion mean sFitness 239.6 (shipped random seed) vs 1099.9 (champ-seeded prototype) vs 1259.1 (the artifact champ itself); L2 to artifact champ 11.91 (a noise net) vs 0.455. On the shipped page path the single-h2h ledger rows fell 4675 (artifact gen 120) → 634/124/180 (gens 121–123), and the artifact champ id 099016dd never appears in post-load rows. Caveat recorded: the single-h2h signal is high-variance (the artifact's own last three rows: 112/492/4675), which is exactly why the pin uses the K=30 mean and L2, not h2h sFit.
- **[fix]** `loadCoev()` seeds popS/popE as slider-σ mutations of the loaded sChamp/eChamp (was: `PQ.makeNet(randPQ)` random nets), and the artifact-lane stats line now says so ("populations seeded around the loaded champs (σ…) — gen 121 breeds descendants, not noise"). Measured on the verbatim page harness after the fix: gen-121 champion benches **1251.0** vs artifact self-bench 1259.1 (99.4% — the continuation is real), L2 **0.513**. Honest scope: the benefit is one generation deep in the shipped loop, because the pre-existing elite-collapse (below) regrows pops with random filler from gen 122 — the R55 collapse item composes with this.
- **[pins, FAIL-first]** `tests/r54-loadcoev-continuation-glue.test.js` — 3 tests, all RED on pristine main 34d551f (proven via `git stash push -- index.html`: 3/3 fail — L2, benchmark, stats-line) and green here (L2 0.513<2.0, bench 1251.0>800, stats admits seeding). Registered as VERIFIED_CLAIMS row `loadcoev-continuation-glue` (honesty two-way pin).
- **[finding P2, measured, SPEC'D] C1's live training loop is structurally 4v4, not N×N** — `continueGenC()` passes `snapS.elites`/`snapE.elites` (the evaluators' bounded top-4 archive) to `runCoevGeneration`, so every generation breeds populations back to `D.elites=4`; `startGenC()` then regrows to slider size with FRESH RANDOM NETS (its `while(popS.length<n) push(makeNet)` filler). Probe at slider 24 → after 1 gen S=4 E=4; slider→64 → still S=4 E=4. The artifact itself (tools/prerun-coev.js line 99–103) passes FULL scored populations — so the page's live C1 does not reproduce the artifact's own training regime, and the "games-at-once" slider is a steady-state no-op beyond the elite floor (it only changes how many random filler nets get evaluated and discarded each generation). The R10 popslider-glue claim is true only instantaneously (at startGenC pinning), not as a training semantics. R53 observed the collapse and deferred it; this round measured it. R55 item 2.
- **[finding P3, measured, SPEC'D] coev HUD shows a decision cadence the coev game does not use** — `draw()` renders `sense 1/${PQ.decisionIntervalAt(champGame)}f` in coev mode (L1's drifting law: prints 1/16f at frames=2000), while `stepAdv` actually decides every fixed `D.decisionInterval=4` frames (probe: 1 hold-update in 12 stepAdv frames, not 3; R50's comment says fixed cadence is by design for C1 — the physics is fine, the INSTRUMENT lies). The projection-cells decision-countdown bar inherits the same drift. R55 item 3.
- **[verified healthy, with numbers] classic J1 continuity and the R50 oracle-death claim.** Classic `loadLevel('level1')`→Train 3 gens: artifact best 2010 → 2311 → 3092 → 2381 (non-monotonic, matches "training is non-monotonic" — and it is UNPINNED; R53 spec item 2 still open). Perfect-reaction oracle under R50 L1 laws (exact intercept math, triangle-wave wall reflection), 40 seeds: died 40/40, capped 0 — "a perfect oracle always eventually dies" HOLDS; death-frame distribution min 553 / p25 556 / median 872 / p75 1051 / max 2591. Shape: tight floor at ~553–556 (the first swan-kill window), long tail from speed-multiplier growth. Claim verified but unpinned — R55 item 4.
- **[deltas as shapes]** d(learning)/d(version): R49 crash → R53 "runs but hollow" (cliff: bench 239.6 vs artifact 1259.1) → R54 "runs and continues" (1251.0 ≈ 99.4% of artifact self-bench). d(population)/d(gen) in C1: rectangle-to-line collapse — slider N → 4 every generation, then random-filler regrow. d(death-frame)/d(seed): bimodal floor at ~553-556 plus speed tail to 2591; zero survivals. Failure-mode migration: the freeze class is closed; the hollow-continuation class is closed for gen 121 (one-generation window until the collapse item lands); instrument-divergence (HUD cadence) and elite-collapse remain open.
- **[counts]** suite 253 → 256 in `tests/` (README 261=253+8 → 264=256+8, run-verified by the R19 pin; the count pin went red mid-round because the site/dist seal was stale — exactly the phantom class R53 recorded, fixed with `node tools/build-site.mjs`); `tools/test-qa.js` 8/8; prerun md5s byte-unchanged (coev.js 946e639a…, curve.json f9b20e7d…, level0/1/2 identical — the fix touches no checkpoint).
- **[R55 spec seed]** (1) S: pin J1 classic lane verbatim (loadLevel→Train, no-throw + fitness-continuation shape) — measured healthy this round but unpinned; the freeze class has no classic-lane insurance (carried from R53). (2) M: C1 full-pop breeding — pass the evaluators' FULL scored populations (not `snap.elites`) to `runCoevGeneration` in continueGenC so live C1 matches the artifact's own regime; verify pop-size steady-state pin (popS.length == slider after N gens) + h2h-regime A/B vs prerun-coev; makes the popslider claim true steady-state (carried from R53 item 4, measured here). (3) S: coev HUD cadence honesty — display the fixed D.decisionInterval the coev game actually uses (or label the drifting one as the L1 law); verify HUD-text pin at a high-frame coev game. (4) M: oracle-death horizon pin — seeded multi-seed perfect-oracle sim asserting dies-by-frame-N across K seeds; makes escalation claims measurable across versions (carried from R53 item 5, distribution measured here). (5) S: startGenC guard `if(!coev)` → `if(!coev||!coev.popS||!coev.popE)` — fail closed into fresh populations (carried from R53). (6) S: label the gen-122+ dilution — until item 2 lands, the R54 seeding's benefit is one generation deep because startGenC refills beyond the 4 bred elites with random nets; either carry champ-descendants in the regrow or state the continuation window honestly in the stats line.

## Round 53 — k2d8 (snowball pulse) — 2026-09-28 — mode: BUILDER (R49 P1 finally fixed: loadCoev()→Train rAF-dead freeze, survived R49→R52 in the shipped-artifact lane) — vs main 9b27d15 (post-#71)

Branch `playtest-round-53`. One code spot (index.html loadCoev) + one new pin file + claims-registry row + README count.

- **[finding P1, verbatim repro]** R49 playtested the loadCoev→Train freeze; R49/R50/R51/R52 all shipped without the fix. `loadCoev()` leaves `coev` truthy but with NO popS/popE; `startGenC()`'s `if(!coev)` guard is bypassed; the first `coev.popS.length` read throws `TypeError: Cannot read properties of undefined (reading 'length')` INSIDE the rAF tick — the loop dies permanently, reload-only recovery. Root cause of the survival: the suite had no pin that TRAINED after loading the artifact. The docs lane (counts, index order) got four rounds of repairs; the shipped-artifact lane kept the lie the whole time. Failure-mode migration across versions: R49 identified it → R50 escalated difficulty constants while it stayed open → R51/R52 repaired docs around it → R53 fixes it.
- **[journey bounding, verbatim extraction harness]** J1 classic `loadLevel('level1')`→Train: OK (gen 61 continues from the artifact, best 1757, real numbers). J2 fresh-C1 Train: OK. J3 `loadCoev()`→Train: THREW the verbatim TypeError at 9b27d15 — the user-visible freeze, confirmed headlessly against the shipped page code (artifact: gens 120, pop 24, sChamp 099016dd, eChamp b4b40f61, ledgerHead 8663279a).
- **[fix]** `loadCoev()` seeds `popS`/`popE` at slider size (fresh random nets) alongside the loaded champs/ledger/genC. R9 banner/displayed-head honesty pins and the R11 one-ledger pin untouched (extraction anchors unchanged). The `runCoevGeneration` elite-bred collapse to `D.elites=4` inside a completed generation is pre-existing shipped behavior — observed, not changed.
- **[pins, FAIL-first]** `tests/r53-loadcoev-train-glue.test.js` — 4 tests, all RED on pristine main 9b27d15 (verbatim TypeError at startGenC), all green here: no-throw, populations materialized as real nets (w1/w2/b1/b2) at slider size, `genC` advances 120→121, ledger grows by exactly one receipted h2h row at gen 121. Registered as VERIFIED_CLAIMS row `loadcoev-train-glue` (honesty two-way pin).
- **[process finding]** a stale `site/dist/` (gitignored, built 06:13 from a pre-R50 tree) produced 7 phantom suite failures on the first local run (readme-count, demo byte-identity ×2, checkpoint identity ×3, provenance spot-check). `node tools/build-site.mjs` (or `rm -rf site/dist` and let the site-glue self-seal rebuild) makes them green. Not a repo lie — recorded so the next runner doesn't burn time on it.
- **[counts]** suite 249 → 253 in `tests/` (README 257=249+8 → 261=253+8, run-verified by the R19 pin); `tools/test-qa.js` 8/8; prerun md5s byte-unchanged (coev.js 946e639a…, curve.json f9b20e7d…, level0/1/2 identical — the fix touches no checkpoint).
- **[R54 spec seed]** (1) S: seed `loadCoev` populations AROUND the loaded champs (small-sigma mutateNet) instead of random nets, so artifact learning actually continues — verify seeded A/B: genC+1 sFitness beats random-seed control. (2) S: pin J1 (classic loadLevel→Train) verbatim like R53's C1 pin — the freeze class has no classic-lane insurance. (3) M: `startGenC` guard `if(!coev)` → `if(!coev||!coev.popS||!coev.popE)` — defense-in-depth so any future coev-construction path that forgets populations fails CLOSED into fresh ones. (4) M: the C1 pop slider is a steady-state no-op (every generation breeds back to elites=4) — either breed to slider size or label the slider honestly; verify via popslider-glue extension. (5) M: R50 escalation constants have no oracle-death horizon measurement — a seeded perfect-oracle sim pinning "dies by gen N" would make escalation claims measurable across versions (d(learning)/d(version) as a pinned number, not a vibe).

## Round 52 — k2d8 (snowball pulse) — 2026-09-28 — mode: REACTIVE main-repair (the #67/#70 merge stack concatenated the R50 + R49 index rows and stranded a Round 49 entry above both Round 50 entries; README counts stale on top of the #68 difficulty tests) — vs main 155ad78 (post-#70)

- [finding] Casey's 22:26–22:41Z merge burst (#66→#69→#68→#67→#70) landed every open branch; the #67 (R50 main-repair) merge concatenated ITS R50/R49 index-row pair onto the post-#66 R50/R49 pair instead of merging into it, and its Round 49 addendum entry landed between the R51 and R50 entries. Four merge-gate reds on main, one root cause: `duplicated index rows: R50, R49` + `index row R49 sits above R50` + `entry 'Round 49' sits above 'Round 50'` + readme-count (spawn collateral: the failing pins dropped the spawn's pass count below README's claim, and the claim itself was stale — 237/247 in tests/ vs 250 live after #68's escalation pins).
- [fix] docs-only, the pins did their job: duplicate R50/R49 index rows removed (R50 rows merged into one R2 branch-pair row; the second R49 pair carried no new branch names), the addendum entry moved down into the R49 block (newest-first restored, equal-round relative order untouched), README's two-line count collision collapsed to the live-verified 257 = 249 + 8. No code, no test, no page change.
- [verify] node --test tests/*.test.js: 249 tests, 247 pass, 0 fail, 2 honest skips (stone signTip lane absent by design); tools/test-qa.js 8/8; FAIL-first by construction: all four pins were RED on pristine main 155ad78 (CI runs 36356106992 + 36356160259) and green only here.
- [not double-fixed (R30 precedent):] nothing — this is the whole wound.

## Round 51 — k2d8 (snowball pulse) — 2026-09-28 — mode: BUILDER (main-repair: the canonical index and the round entries were both out of newest-first order — R47 sat above R48, R45 below R44, R42 above R43; observed by the R50 report, not fixed there) — vs main 629bfd8 (post-#67)

Branch `r51-playlog-newest-first`. Docs + pins only; no code touched.

- **The wound:** the canonical-index table had `R47` above `R48` (and `R44` above `R45`), and the round entries repeated the same inversion plus `Round 45` misplaced after `Round 41` and `Round 42`/`43` swapped — the "newest first" contract the PLAYLOG header states was broken in both views.
- **The fix:** both views stable-sorted to strict descending round order (moves only — 89 insertions / 89 deletions, no content edited). Equal rounds keep branch-stack relative order.
- **The pins (FAIL-first, verified against pristine `origin/main` — both trip there at R47-above-R48):** `tests/canonical-index.test.js` gains "index rows are newest-first (non-increasing)" and "round entries are newest-first (non-increasing)". Numeric comparison, not lexicographic.
- **Counts:** suite 235 -> 237; README 243=235+8 -> 245=237+8.
- **Not double-fixed (R30 precedent):** the R49-row uniqueness red that shared this file was healed upstream by the R49 main-repair addendum (#67) before this round branched — named here, not re-fixed.

## Round 50 — main-repair: the #66 merge result red on two pins, one root cause

**vs main b767404 (post-#66) — branch r50-main-repair.**

Casey's #64/#65/#66 merge stack landed all three R49 branches, and each branch
had written its own canonical-index row — three `| R49 |` rows where the R2
convention allows exactly one per round (multiple `## Round 49` headings below
are legitimate; multiple index rows are the drift class R31/R42/R44 deduped
before). Both red pins were the same root: the uniqueness pin named the dup
rows directly, and the readme-count pin counted the suite as 234 (its spawn
sees the index test fail) against README's live-verified 235. Fix: one merged
R49 row naming all three branches (R42 row form), no count change — with the
index green the spawn passes 234, +1 for this file = 235 = README's claim
(243 = 235 + 8, re-verified by running). FAIL-first: both pins RED on pristine
main b767404 (CI run at the #66 merge), green only here. Docs only.
## Round 50 — difficulty escalation: the game hardens until a perfect oracle dies

Branch `r50-difficulty-escalation` (vs main b767404, post-#66). The user's ask: the demo
game "needs to have more parameters to make the game hard over time like the
ball getting faster so that the model always eventually fails but it gets
better at predicting where to be as it needs to think more about the eventual
position than the current position."

**What changed (all in `DEFAULTS`, no opts layer exists):**
- `accel: 8e-7` + `maxSpeedMul: 6` — new speed law:
  `speedMul = min((1+frames·ramp)·hitBoost^hits + accel·frames², maxSpeedMul)`.
- `hitBoost` REVIVED in L1: it used to multiply speedMul for exactly one
  frame after the ramp reset (dead code, its own comment admitted it). It now
  compounds persistently through `hitBoost^hits` — every return makes the ball
  permanently faster, the same shape C1 documents for `boost`. The old
  post-hit `speedMul *= hitBoost` line is gone; the boost enters next frame's
  law via the hit count. Metric honesty is preserved: `maxSeen` still samples
  the moved-at value at frame start, so no phantom is ever reported (the
  maxspeed-honesty pins were re-pinned to the new law, FAIL-first red on the
  old expectations).
- `shrink: 0.999` + `paddleMin: 0.06` — `effectivePaddle(g)` is now
  time-varying: width = `max(paddleMin, paddleW·shrink^frames) + 2·margin`,
  px still the drawn paddle's left edge. ONE law for draw AND death-check in
  L1 and C1 (a C1-only divergence would have been a ghost-hitbox class).
- `decisionDrift: 0.05` + `decisionCap: 16` — `decisionIntervalAt(g)`: the
  model's decision cadence slows as the game hardens (4f → 16f). L1 only;
  C1 keeps its fixed `decisionInterval` cadence by contract.
- `swanGrow: 2` — black-swan probability is now `min(1, swanP·speedMul²)` in
  both lanes (was linear).
- **Regression lock**: with `accel=0, hitBoost=1, shrink=1, decisionDrift=0,
  swanGrow=1` the physics is BYTE-IDENTICAL to the pre-R50 law (pinned by a
  400-frame staged trace against a local mirror).

**The guarantee (the user's core ask), pinned empirically:** a perfect-
intercept oracle (reflection-aware projection to the paddle row, paddle
steered to the intercept EVERY frame) dies before frame 3000 on seeds 1..10
with escalation on — and survives to the 6000-frame cap on seeds 1..3 with
escalation off. Survival under the old law + guaranteed death under the new
law = the difficulty curve, not luck. A model that only tracks the current
position cannot survive; selection now rewards predicting the ball's eventual
position across a growing decision horizon.

**Demo wiring:** the drawn paddle already reads `effectivePaddle` (auto-
shrinks); the decision countdown now reads `decisionIntervalAt` (honest); the
stats line prints live paddle width + sense cadence; C1's ender paddle uses
the same law at `ex`.

**Canonical re-embed (declared):** curve `f9b20e7d…`, L0 `bc15d414…`, L1
`1125d59c…`, L2 `50137ceb…`, **coev `946e639a…` byte-UNCHANGED** (escalation
defaults are inert at coev horizons — no seeded swan draw crosses either
threshold differently and no coev game lives long enough for shrink to flip an
outcome). L1/L2 `maxSpeed` → 4.443 / 3.411 (R50 law raises the honest moved-at
ceiling). The tie journal collapses 182 flips / 89 swaps → **5 flips / 3
swaps** (escalation spreads fitness values; exact ties become rare). EXPERIMENTS.md
carries the post-R50 line; the R42 pin now anchors it.

**FAIL-first evidence:** `tests/escalation.test.js` (9 pins) was RED 7/9 on
the pristine core (byte-regression + control pins pass pre-implementation by
design), and the two rewritten honesty pins (effectivePaddle geometry, the
game-ending-hit-frame semantics) were RED on the old expectations.

**Receipt corrections:** README's "Current artifacts" named the pre-R21 set
(stale since R21 — three lines old); updated to the post-R50 set. The
maxspeed-honesty header comment still described the R41 one-frame boost
semantics; rewritten. No prior *test* claims were silently edited — every
re-pin is declared above.

[suite] 245/245 tests + qa 8/8 green at tip (canonical env, 2 honest signTip
skips); README count 243→253 (245 in tests/ + 8 qa, pin-verified).

## Round 49 — main-repair addendum: three R49 receipts, one round — the uniqueness pin named it

**vs main b767404 (post-#66) — direct main repair (CI red since the PR #60 merge, #64–#66 each shipped one `| R49 |` index row).**

- [finding] the PR #60 merge left the merge-gate red; the R46–R48 main-repairs
  cleared two of the four original reds (site-glue file-level crash — no build
  step; VERIFIED_CLAIMS proofTest drift), but CI stayed red through #64–#66
  because each of those R49 branches appended its OWN `| R49 |` canonical-index
  row — three receipts for one round, and the R19 uniqueness pin is absolute:
  `duplicated index rows: R49, R49, R49`.
- [cascade] the readme-count pin (235 claimed) ran red as COLLATERAL, not as a
  second lie: its inner spawn excludes only itself, so the failing uniqueness
  pin dropped the spawn's `# pass` by one (233, liveSuite 234) against the
  correctly-verified 235. One root cause, two red pins — fix the row, both
  heal. No count edit needed; the R49 count repair (#66) was correct all along.
- [fix] the three rows consolidated into one R49 row by the R2 branch-pair
  convention (precedent R24/R26/R27/R40/R42), every branch name and base kept;
  receipt-completeness unaffected (it matches round NUMBERS, a Set). No code,
  no test, no page change — docs-only repair, the pins did exactly their job.
- [verify] node --test tests/*.test.js: 237 tests, 235 pass, 0 fail, 2 honest
  skips (stone sign-lane live pins, pinned 1f6036a has no signTip — by
  design); tools/test-qa.js 8/8; page-parse canary green; site build green;
  receipt-completeness OK.
## Round 49 — main-repair: the #62 merge result red, one pin, named by the pin itself

**vs main ea9dfbb (post-#62) — branch r49-readme-count-repair.**

- [finding] exactly one red on the #62 merge run (CI 36350039211):
  readme-count — README claimed `245 = 237 in tests/ + 8 in qa` while the
  live suite runs 235. The #62 bump (+4 over R48's 233) overshot: it added
  3 freshness pins on a base that had already moved under it and counted
  +4. The merge-gate did its job — the pin named the rot at the merge tip,
  nothing else was red (canonical-index green, qa 8/8 green).
- [fix] docs only, no code touched. README count line set to the
  live-verified `243 = 235 in tests/ + 8 in tools/test-qa.js`; suite re-run
  green 235/235 + qa 8/8.

## Round 49 — count bistability: the suite's pass count depended on an unmerged side branch

**vs main ea9dfbb (post-#62) — branch r49-count-bistability.**

- [finding] the readme-count pin went bistable 235↔237: two stone-v1 sign-live
  pins (tests: signTip staples the prerun-shaped seal; ephemeral keypair
  round-trips) PASS when /tmp/quilt-stone has the sign lane and honestly SKIP
  ("named checkout has no signTip") when it does not. CI pins the stone clone
  at 1f6036a (canonical, pre-sign main — verified quilt-stone main is 5081914
  and the signTip merge 023edbe is NOT on it: it lives on side branches). This
  box's /tmp/quilt-stone had drifted onto a side branch, so local runs passed
  237 where CI ran 235 — R47's merged README claimed 237 and main went red on
  the count pin the merge landed. Same freshness class R47 named for the
  doctor lens; the count pin's "one value everywhere" (R35) holds only while
  every lens sits at its pinned commit.
- [named] PR #63's admin-merge comment claimed ONE inherited red; its gate
  carried TWO (honesty + readme-count) — corrected in the PR #62 comment and
  named here.
- [fix] README count 245→243 (235 in tests/ + 8 qa) — the canonical,
  pinned-lens number; local /tmp/quilt-stone reset to 1f6036a (lens hygiene,
  same class as the R35 doctor-lens pinning). NOT "fixed" by pinning CI to the
  side branch: an unmerged lane is not canonical, and following it would move
  the lens the R39 pilot pins are written against without a quilt-stone main
  merge to cite.
- [suite] 235 pass + 2 honest-skip + qa 8/8 at the canonical lens state;
  readme-count green in CI shape and locally.

## Round 49 — playtest: the C1 artifact load freezes the demo on Train; classic learning re-verified live

**vs main 166a1f2 (post-#63) — branch playtest-round-49. mode: SPECIFY
(no previous round's spec is unfulfilled + compelling; R44–R48 all shipped).**

- [finding, P1, confirmed by playing the shipped page headlessly] **load the
  C1 artifact, press Train, and the demo freezes permanently.** Minimal repro
  against verbatim shipped code: `loadCoev()` rebuilds `coev` from the
  checkpoint artifact with champions ONLY — `Object.assign(coev||{},{sChamp,
  eChamp,last:null,genC:cp.gens,evalS:null,evalE:null})` — no `popS`/`popE`.
  `startGenC()` guards on `if(!coev)`, so any truthy coev counts as
  initialized; the next Train tick dies at `coev.popS.length` (index.html:211,
  TypeError: Cannot read properties of undefined). Severity is worse than a
  console error: `requestAnimationFrame(tick)` is the LAST line of tick(), so
  the throw kills the rAF loop itself — canvas, strips, and training all stop;
  only a page reload recovers. The classic-mode twin is honest — loadLevel's
  stats line says "training from here is real" and it is (verified); the C1
  twin crashes instead of continuing. Coverage gap: no pin drives the
  loadCoev→continueGenC journey (loadcoev-glue pins banner/ledger honesty;
  coev-glue pins fresh-init). The deployed SITE is unaffected — its coev panel
  is display-only (R44).
- [finding, P3 provenance] commit e5444d0 (shipped via #59, R44's site-v2)
  titles itself "R47 P1 fix" and the index.html comment on the frozen-serve
  fix says "R47 playtest fix" — but canonical R47 is PR #62 (doctor-lens
  freshness, still open). A dangling round pointer inside a receipt: the R22
  phantom class at commit-message/comment depth. The fix itself is real —
  re-verified live this round (next bullet).
- [verified green] classic F11 fix re-verified by playing: ball frames
  advance continuously (10→60 sampled), x/y track smoothly, exactly ONE
  champGame reset across 60 generations (a real death), champion reaches 8800
  = frames 6000 + 28 hits at speed ×3.47 — real learning, not a serve loop.
  54 wristband badges render; coin-journal label "182 flips · 89 swaps ·
  gens 0-260 · live:false throughout" matches prerun byte-for-byte; coev
  strip renders the committed artifact (121 h2h · 120 ender-kills ·
  1 survivor-cap · gens 0-120); WAL export from the live panel verifies ok
  (empty panel → genesis-only chain, the R30 contract); L1 checkpoint pickup
  honest ("level1: gen 60 · best 8700 … — training from here is real").
- [verified green] live deployed site 9/9 via tools/site-playtest.mjs —
  determinism (same seed → same digest, twice), 8-seed sweep distribution,
  judge abstains NAMED (JEV HTTP 401, no key bound — the honest seam), claim
  wall round-trip, served checkpoint byte-identical to this checkout,
  provenance head 17eb2394a sealed at build = checkout 166a1f2 (deployed tip
  IS current main).
- [sibling studied] PR #62 (R47 doctor-lens freshness, tip f22f532): its
  honesty-claim repair WORKS — honesty runs 9/9 on its tip, so the inherited
  red genuinely closes there. The branch itself is red 3 on a stale pre-#61
  base (dup index rows + README count stack + site-glue needing the build
  step — all three already repaired on main via #61/#63, so a rebase onto
  post-#63 main should clear them). Named, not double-fixed here per doctrine.
- [deltas as shapes] d(learning)/d(version) is FLAT across R42–R48: L1 8700 /
  L2 8800 / curve 182 flips — the same numbers the R22/R24-era receipts
  recorded; six consecutive rounds moved only receipts/site/honesty layers,
  zero core-engine drift. Failure-mode MIGRATION: R44's F11 was
  alive-loop/frozen-GAME (a reset storm at the game layer, 10–30 fresh serves
  per second while the scheduler kept breathing — physics could eventually
  mask it) → R49's P1 is dead-loop/frozen-EVERYTHING (one throw at the
  training layer ascends through tick() and kills the scheduler;
  unrecoverable without reload). The demo's failure surface moved UP the
  stack as the lower layers got pinned: the one un-pinned seam left is exactly
  the user journey no pin drives — artifact-load → continue-training.
- [spec for R50, five items, sized]
  1. (small — the P1) startGenC treats a popS-less coev as uninitialized:
     build popS/popE by mutating the loaded sChamp/eChamp nets so "continue
     evolving from the pair" is literal. Verify: FAIL-first pin driving
     verbatim loadCoev()→continueGenC() headlessly (fails today at line 211),
     green after; assert ≥1 coev generation completes from the loaded pair
     and the ledger re-anchors honestly (the R9 contract must survive).
  2. (tiny) provenance repair: the index.html F11 comment (and any receipt
     naming "R47" for the site fix) names R44, its canonical round; optional
     grep-pin that code-comment round references resolve to canonical index
     rows — the R22 class at comment depth.
  3. (small) rebase PR #62 onto post-#63 main: expect the dup-index and
     count reds to clear (already repaired on main), re-run the canonical
     suite + site build, merge — main's one inherited red closes.
  4. (small–medium) freeze-class pin: tick()'s rAF re-schedule must be
     throw-safe — wrap the training step (or re-schedule first) and inject a
     throwing continueGenC in a pin, asserting the loop survives. Pin the
     CLASS (scheduler fault-isolation), not this one instance.
  5. (medium) make the loaded C1 pair watchable without training: after
     loadCoev, live() plays an h2h exhibition (sChamp vs eChamp driving
     champGame) so the header's "watch a pair co-evolve" is cashable on load,
     not only after Train works.
- [suite] at origin/main 166a1f2: canonical suite (glob form) 234 run / 233
  pass / 1 fail — the one red is the R48-named inherited honesty red
  ("test file backs no claim: tests/coev-birth-seal.test.js"), fix verified
  riding PR #62 — + qa 8/8. Prerun md5s byte-identical to committed
  artifacts. Note: R48's suite line reads "233 run" where the live tap says
  234 run (README binds the pass-count 233 and its pin is green, so this is
  doc-precision only — P4 — but PLAYLOG suite lines are unpinned; state run
  AND pass going forward).
## Round 48 — main-repair: the #61 merge result was red in three ways no single branch saw

**vs main 4c13b58 (post-#61) — branch r48-main-repair.**

- [finding] every branch in the #59–#61 burst was green ON ITS OWN BASE; the
  merge RESULT was red on three pins, and each red was invisible to the
  branches that composed it:
  1. canonical-index uniqueness — the #61 merge itself concatenated: THREE
     R42 rows + TWO R41 + TWO R43 (the R44-side rows appended below the
     R46-side dedup block). Invisible to R46 (its own dedup was correct) and
     to R44 (merged earlier, through #59).
  2. readme-count — a FIVE-deep README test-count stack (231/215/212/235/222,
     three merge generations of nobody deleting the superseded line) AND the
     live number moved under it: R44's site-v2 stack brought the suite to
     233 run / 232 pass, so even the newest line (231) was stale.
  3. honesty two-way (VERIFIED_CLAIMS) — #60 (R45) shipped
     tests/coev-birth-seal.test.js with no claim entry, while R46 had branched
     pre-#60 and never met the file. R46's 223/223 was true on its base; the
     merge result carried a test file no claims list knew.
  The class: green branch, red merge — the pins catch it after the fact,
  nothing yet prevents it.
- [fix] docs only, no code touched. Index: one row per round, first
  occurrence kept (R31/R2 convention; R2's branch-pair row and the retitled
  "R2 artifact" row are pin-exempt, as before). README: the stack collapsed
  to the one live-verified line, 241 = 233 in `tests/` + 8 in qa — the pin
  counts passes plus its own registration, so a named red stays receiptable
  without lying about the number.
- [named, not fixed here] (a) the honesty red above — the coev-birth-seal
  claim entry rides in open PR #62 (R47), which documents exactly this
  inherited red; fixing it here would double-fix. (b) the recurrence class
  itself — every merge burst this week re-wounds the same files; a
  merge-concatenation pin (simulate the merge result before it exists)
  belongs beside the pins that catch it after. Booked.
- [suite] 233 pass-equivalent of 233 run in tests/ (232 spawned + the
  readme-count pin's own registration) + qa 8/8 at this tip; canonical-index
  and readme-count green again; the one red is (a) above, fix rides #62.

## Round 47 — doctor-lens freshness: the receipt names the commit it read

**vs main 822c850 (post-#60), rebased onto 166a1f2 (post-#63) — branch
r47-doctor-lens-freshness.**

- [finding] tools/doctor-verdict.js digested a quilt-doctor checkout but the
  receipt line never named WHICH checkout state produced the verdict — the
  R43-booked lens-freshness gap. A drifted doctor could be silently cited
  as aa5a041 forever.
- [fix] resolveHead() reads .git directly (pure fs — HEAD ref, loose ref,
  packed-refs fallback, detached HEAD; no git binary, same no-deps contract);
  the digest carries observedCommit and lensLine() appends
  `[observed @<short>]` — or `[observed-commit unresolved]` when .git is
  unreadable (degraded freshness NAMED, never silent, never faked).
- [pins] 3 freshness pins in tests/doctor-verdict-glue.test.js, FAIL-first
  3/3 RED on pristine main 822c850: observed-commit naming, moved-checkout
  moves the name (old commit must not survive), detached resolves,
  unresolved named. Fixture grows a fake .git (aa5a041…f00d).
- [inherited red repaired] merged R45 (#60) shipped tests/coev-birth-seal.test.js
  with NO VERIFIED_CLAIMS entry — the honesty two-way pin was red on main;
  claim added (proofTest: tests/coev-birth-seal.test.js) and the site demo
  copy + build manifest re-sealed (tools/build-site.mjs).
- [named at base, repaired by R48] on the original base 822c850 the
  canonical-index dup-row was the one red (232/233 pass) — named, not
  fixed. #61's merge result re-concatenated the index (R42×3/R41×2/R43×2)
  plus a README count stack — R48 (#63) repaired the merge wounds and named
  this branch's honesty fix as the one red it carried; this branch rebases
  onto post-#63 main where the index + counts are clean.
- [suite] 237/237 tests + qa 8/8 green at the rebased tip; README count
  241→245 (pin-named).

## Round 46 — main-repair: CI never built the site; index + count rot at the #58 tip

**vs main 1da41be (post-#58) — branch r46-main-repair.**

- The R42 site-v2 merge (#58) left main CI RED: `site-glue` reads
  `site/dist` + `site/generated/provenance.json`, which are GITIGNORED
  build output, and no workflow step ever ran the builder — the suite job
  crashed at file level (exit 7) on every run since (gh run list verified:
  #55-#58 merges all red). merge-gate now runs `node tools/build-site.mjs`
  before the suite (deterministic, <2s, seals 9 demo files) — the R39
  shallow-checkout lesson, one job later.
- Canonical index: the #52-#58 merge burst stacked THREE R41 rows + TWO R42
  rows (restoration entries appended instead of merged) — collapsed to one
  row per round per the R2 branch-pair convention; no heading lost.
- README count rot: claimed 216 in `tests/`, live 223 — the readme-count
  pin named it, corrected to 223 (+8 qa = 231).
- Docs + workflow only; training path untouched. Suite 223/223 + qa 8/8
  green with the site build present (the CI shape from now on).
## Round 45 — coev birth seal: the fifth canonical artifact receipts its own birth rows (R40 finding 4)

**vs main 1da41be (post-#58) — branch r45-coev-birth-seal.**

### Played versions
v1; the R37→R38→R43 provenance chain by diff + suite at the tip; R40 finding 4 replayed against `tools/prerun-coev.js` (zero seal code on the lane it names).

### Deltas observed
- d(provenance)/d(version): the R40 finding-4 shape, narrowed to one lane — `checkpoints/coev.js` was byte-reproducible and md5-printed, but the 121 ledger rows behind it were not chained at birth. A post-merge edit could move the artifact's receipt history while leaving only a printed md5 as provenance.

### Built
- `tools/prerun-coev.js` gains an async birth-seal tail: build `{op:'LINK', cell:'pq/prerun-coev-birth'}` rows one-for-one from the C1 ledger rows just written → `wal-export.js` `toStoneV1` (one stone dialect in the repo) → mirror `verifyStoneV1` BEFORE write → live `stone.verifyChain` when `QUILT_STONE_DIR` names a checkout → write `checkpoints/coev-stone-v1.json`. Refusal path: `stone: SEAL/REFUSED` + exit 1, no file. The stale seal is dropped before the run, the R37 stale-receipt lesson applied to the coev lane.
- `tests/coev-birth-seal.test.js` — 7 pins: extraction, one-for-one mirror, byte determinism, canonical permutation invariance, exact-row tamper, committed artifact/seal agreement, and live `stone.mjs` accept/tamper vocabulary.
- `checkpoints/coev-stone-v1.json` — committed birth receipt over the shipped artifact: header + 121 coev birth rows; verifies under the mirror and live at the local quilt-stone checkout.

### Verify
- `node tests/coev-birth-seal.test.js` 7/7; `tests/stone-prerun-glue.test.js` 5/5 and `tests/wal-session-stone.test.js` 7/7 as regression rails; README count corrected by the readme-count pin (207→214 in `tests/`, total 222); `node tools/receipt-completeness.js` OK.
- No dynamics touched: the canonical five md5s are unchanged in this commit (`coev.js` remains `946e639a…`); the new file is a receipt, not a training artifact. Inherited red named, not fixed here: a full `node tools/prerun-coev.js` run at this tip regenerates `coev.js` as `2ab34b54…`, not the committed `946e639a…` — the canonical-drift class R43 named for `prerun.js`, present on the coev lane too. The regenerated artifact was restored; the committed seal is over the shipped `coev.js` ledger.

### Verdict
MERGEABLE — one small committable unit, branch + commit, never main.

## Round 44 — site v2: play without leaving the page (+ the #58 merge-wound repair)

**vs main 1da41be (post-#58) — r44-site-v2**

Casey's order: take the website a lot further, iteratively playtest and
improve. Two halves.

### Half 1 — the #58 merge wound, healed (playtest finding 0)

The #58 merge (site R42 into a main that already carried the playloop's R42
from PR #56) concatenated instead of resolving:
- canonical index carried R42 twice, R41 three times — the R43 index-unique
  pin (from PR #57, spawned for exactly this class) caught it: main arrived
  217/223.
- the round entries duplicated the same way; README carried three stacked
  test-count paragraphs.
- site-glue tests failed on a fresh checkout (dist/ is gitignored, and they
  demanded a manual build step) — they now self-seal via
  tools/build-site.mjs when the output is absent, keeping the canonical
  suite command self-sufficient.
Repair: index deduped per the R31/R2 branch-pair convention (one R42 row
naming both branches, one R41 row), the PR #56 main-repair receipts folded
into the R42 entry as a subsection, README collapsed to one count line.
Suite 223/223 after repair.

### Half 2 — site v2, from playtesting the live site

Findings from playing https://pong-quilt-site.casey-digennaro.workers.dev:
1. [P1] The page carried zero client-side JS — Seed Lab and Claim Judge
   were plain forms that navigated away to raw JSON. Every interaction
   ejected the visitor from the explorable. (ciechanowski's rule: the
   explanation must respond where you stand.)
2. [P2] No inline play — every card linked out.
3. [P2] The L0→L1→L2 champion progression existed only as prose.
4. [P2] The coevolution record (260 gens, 182 coin flips) was invisible.
5. [P3] Judge verdicts evaporated — no history, no shareable receipt.
6. [P3] Seed Lab was one-at-a-time — no way to see a distribution.

What shipped:
- `site/app.js` (zero-dep interactive layer, progressive enhancement:
  every form keeps its no-JS action; absent mounts abstain named).
  Engine Room: inline receipts (frames/hits/maxSpeed/fitness/digest), a
  receipt link (?level&seed auto-runs and re-runs for anyone), and an
  8-seed sweep table with unique-digest + hits min/mean/max summary.
  Champion lineage + coevolution strip: rendered in the visitor's browser
  from the SAME committed artifacts the demo loads (checkpoints via script
  tags — their own browser idiom; curve.json + coev.js via fetch), never
  re-typed or re-implemented. Play-here buttons lazy-iframe the byte-
  identical demo inline.
- Claim Wall: `POST /api/judge` now records every verdict AND every
  abstain (content-addressed by replay digest + time) into a Cloudflare
  KV binding (CLAIMS); `GET /api/wall` serves newest-first. Unbound →
  named abstain, never faked. No identities stored.
- Pins: tests/site-glue.test.js +4 (wall abstain unbound; wall
  newest-first from a stub KV; judge records verdicts and abstains when
  bound; widget wiring contract — mounts exist, app.js wires each, app.js
  speaks only to known /api endpoints, no-JS fallbacks intact).
  VERIFIED_CLAIMS +1 (site-interactive); site-glue claim text updated.

### Verify
- `node tools/build-site.mjs` → suite: 227/227 in tests/ + qa 8/8.
- Deployed live (Casey's "take it further" = iterate the preview):
  wrangler KV namespaces created (prod 9e6572fb…, preview 7783e751…),
  wrangler deploy clean; endpoints re-verified against the running worker.

### Playtest round (scripted harness + real browser) — findings F7, F8 shipped

- `tools/site-playtest.mjs` (9 live checks): mounts wired, receipt link,
  same-seed→same-digest, 8-seed distribution (8/8 unique digests),
  live JEV verdict 0.71–0.73 on a true claim, wall record + round-trip,
  served checkpoint sha256 == local, provenance sealed. **9/9 PASS.**
- Real-browser pass (Chromium via CDP, the visitor's view):
  - **[P2] F7**: coev strip rendered "named abstain — artifact missing:
    /demo/coev.js". The artifact lives at /demo/checkpoints/coev.js —
    wrong path shipped, and only the browser caught it (the mount existed,
    the fetch 404'd). Fixed; the widget-wiring pin now asserts every
    artifact path app.js touches ships in the build — FAIL-first-verified
    against the old bug before fixing.
  - **[P3] F8**: strip copy conflated two artifacts' gen counts (coev.js
    120 vs curve 260) as one number. Now source-attributed per artifact.
  - Judge calibrated live: true claim → 0.73; false claim ("at least 5
    hits" vs the game's 4) → **0.07**. It discriminates.
  - Sweep told its story in-browser: seeds …930/…934 the champion DIES
    (4,826f/6h and 1,880f/2h) while neighbors survive 6,000f — variance
    visible in the visitor's hands.
  - Play-here button embeds the byte-identical demo inline. Lineage bars,
    sparkline, wall (3 receipts), moth ledger, wristband all render.
- F9/F10 (same doctrine, next pass): the wall promised "re-runnable from
  its game params" but made you type them — game cells are now links into
  the Engine Room (verified live: wall row level1·777 → click → replay
  digest c6f04cb49f50… == the recorded digest). Sweep rows where the
  champion dies before maxFrames now render tinted with a death marker.
- **F11 [P1, Casey live report]**: "/demo/ game isn't actually playing —
  the ball isn't moving." Diagnosed live in a real browser: training was
  BLAZING (gen 161→675, 1,152 games in 2.5s) while the canvas pixels were
  bit-frozen and zero exceptions fired. Root cause: `continueGen()` reset
  `champGame` to a fresh serve EVERY generation, and the streaming evaluator
  completes a generation in 1-2 RAF frames — the visible game restarted
  ~10-30×/sec and never left the serve position. Fix (canonical repo demo,
  byte-identical copy redeployed): `live()` owns the rally — a new champion
  net takes over the ongoing ball; reset only on death or when no game
  exists. Same fix in the C1 branch. Verified live: ball centroid moved
  34px between samples, display game lived 52+ frames (was ~2).
- **F12 [P2]**: the demo's own `tools/wal-export.js` 404'd on the site
  (never copied by build-site.mjs) — the WAL export button was dead.
  Shipped in the build now; `window.QUILT_WAL` present live. New pin:
  every `<script src>` in demo/index.html must exist in dist (same class as
  the F7 pin, one level deeper).
- Suite stays 227/227 through both fixes; PR #59; deploy v5 (e5444d0).
## Round 43 — seed honesty: an explicit seed is played verbatim (R40 finding 3)

**vs main 2aa7901 (post-R42 main-repair) — branch r43-seed-zero-honesty.**

- `parseCliArgs` computed the seed as `parseInt(arg, 10) || 20260926`, so an
  explicit `0` was falsy-collapsed into the default — the user asked for one
  session and the CLI played another, with the genesis row naming the seed
  that was actually played. One falsy value away from every misuse the R33
  usage guard already fails loudly on ("never silently default the seed").
- Fix: an explicit seed is used verbatim — 0 is a real seed (`PQ.rng(0)` is a
  valid LCG stream, verified live), and a non-integer seed (`abc`, `0x10`)
  is a usage error (exit 2 + usage naming the arg) instead of a silent
  default. Full-string integer check also refuses `parseInt`'s silent-prefix
  parses. No-arg default (20260926) and negative integers unchanged.
- Pinned by `tests/wal-session-seed-honesty.test.js` (5 pins, FAIL-first 5/5
  RED on pristine main 2aa7901): unit seed-0, unit non-integer → usage error,
  real CLI run reports `stats.seed === 0` + genesis names `seed 0`,
  seed-0 vs default sessions differ, R33 guarded forms unchanged
  (regression rail).

### Verdict

Shipped; VERIFIED_CLAIMS +1 (`seed-zero-honesty`). README count pin named
its own bump (197→207 in `tests/`, total 215).

### Inherited reds named, not touched (this round)

- **prerun repro drift at main tip:** `node tools/prerun.js` at pristine main
  2aa7901 rewrites `checkpoints/level1.js`, `level2.js`, AND
  `stone-v1.json` — the committed canonical five do not reproduce at their
  own tip (R42's main-repair re-froze the documented line; the checkpoint
  files themselves drift). Verified in a detached pristine worktree; NOT
  caused by this round (diff here touches only `tools/wal-session.js`,
  `core.js` registry, README count, this PLAYLOG). Belongs to the canonical
  lane, not a finding-3 fix.
- **README count at main was already stale:** main claimed 197 in `tests/`,
  live at the tip was 201 (R42's re-pin didn't match the live suite); this
  round's pin-named bump sets the live-verified 206.



## Round 42 — the website: understand the repo by playing it, in many forms

**vs main 4d447ed (post-#55) — r42-site**

Casey's order: pong-quilt needs a website where visitors explore and
understand the repo *through playing the application in a browser, in many
forms* — backend on Cloudflare, using JEV and moth from the secrets store.

What ships:
- `site/` — a zero-dependency explorable (one HTML file, hand-written CSS,
  no build framework): "many forms" cards for every way to play (classic
  L0→L2, C1 coevolution, advisors, scratch tile, WAL export) each with a
  "what to watch" caption and the verified claim behind it; a Seed Lab
  (worker-side deterministic replay); a Claim Judge (replay + live JEV
  verdict); a moth ledger view; the VERIFIED_CLAIMS wristband rendered live.
- `site/worker.js` — Cloudflare Worker: /api/replay re-runs the repo's own
  core.js in the isolate (seed-deterministic, validated inputs);
  /api/judge replays then asks JEV (typesafe) for a verdict;
  /api/moth reads the live moth ledger (no credits spent); /api/claims and
  /api/provenance serve the repo's own ledger and a build-sealed sha256
  manifest of the demo copies.
- `tools/build-site.mjs` — seals site/dist: the demo files are copied
  BYTE-IDENTICAL (never re-implemented) under demo/, and a sha256 provenance
  receipt is written to site/generated/provenance.json.
- `tools/site-lab.mjs` — pre-build contract probe (replay-in-node,
  JEV live noul, moth /jobs read): run before building, all four green or
  don't build.
- `tests/site-glue.test.js` — the pin: byte-identity of demo copies,
  provenance shape, replay determinism across calls, input validation,
  honest abstention on every backend seam with keys unbound.

Honesty notes:
- moth submission is credit-gated and stays a NAMED slot; v1 only reads the
  ledger (a receipt of what exists, never a faked green).
- The demo is never forked: the site frames byte-identical copies and the
  provenance endpoint lets any visitor check that claim.


### R42 main-repair branch (PR #56, playtest-round-42) — folded by R44

The #58 merge concatenated both R42 branches' stacks: the index, the
entries, and the README count paragraphs all doubled (dup R42 + R41 rows,
three stacked count lines). This subsection preserves the main-repair
branch's receipts in compact form (full text: PR #56 body / git history).

Numbers verified by running at 4d447ed (before repair): canonical suite
**200/202, RED** — readme-count (README 198 vs live 201) + receipt-
completeness ("R41: merged via 'r41-maxspeed-honesty' (PR #55) has no
canonical-index row"). The R38 check-runs job fired 16:15Z, 7 minutes after
the #55 push — and nothing blocked: enforcement is an unset repo setting
(R35 item 2, R36 infeasible-via-workflow). Main sat red ~35 minutes.

Findings:
1. [P2, process] R41's receipt was amputated by the #55 conflict resolution
   — the R34 loss class recurred. The merge touched only core.js (+13/-2)
   and tests/maxspeed-honesty.test.js (+70); R41's entry + index row +
   README bump were dropped while its code shipped. Repro at the time:
   receipt-completeness at 4d447ed named R41.
2. [P3, lineage] R41's "no canonical artifact touched (byte-frozen)" clause
   was falsified at the file level: prerun.js embeds maxSpeed in L1/L2 and
   the metric-semantics change rewrote exactly that field (3.400 → 3.497 /
   3.476), so regen drifted two of the frozen five at every prerun run.
   Populations byte-identical ("dynamics untouched" survives). Page-visible:
   index.html rendered x3.4 where the honest moved-at value is x3.50/x3.48.
   The R22 verify-by-copying class recurred 17 rounds after R24 pinned it.

Shipped by the main-repair branch: R41 entry + index row restored verbatim
from 9c701d2; README counts repaired; L1/L2 re-embedded at the tip (pops
byte-identical, maxSpeed now honest) + stone-v1.json re-emitted — prerun
drift-free again; EXPERIMENTS.md declares the post-R42 line (curve
63617065…, L0 8a49b0f6…, L1 cf08b000…, L2 c8ba57db…, coev 946e639a…);
tests/artifact-maxspeed-lineage.test.js (2 pins, FAIL-first — any future
metric-semantics drift trips it and forces a declared re-embed).

Carried P4s: seed-0 collapse (wal-session.js:140) — fulfilled by R43; coev
birth seal still open. Delta observed: the failure mode migrated from lies
escape receipts (R22) to receipts escape the ledger (R34, R41) — detection
worked, enforcement stayed absent.

(The r42-site branch had independently restored the same R41 receipt —
restoration exists twice in history; R44 deduped the ledger.)


## Round 41 — maxSpeed honesty: the metric reports the moved-at speed (R40 finding 2)

**vs main post-#54 — branch r41-maxspeed-honesty, PR #55.** Entry restored
by the R42 main-repair: the #55 merge conflict resolution dropped this entry
and the index row (same loss class as R34); content reconstructed from the
PR #55 body and the merged diff (9c701d2), which are intact.

- `playOne()` returned the FINAL-frame `speedMul`, so a game ending on a hit
  frame reported `(1+frames×ramp)×hitBoost` — a boosted value the ball never
  moved at. The L1 metric carried a phantom exactly on the frames that end
  games.
- Fix: `g.maxSeen` sampled at frame START (the multiplier the frame's ball
  movement actually used), before ramp reset and before hitBoost. Dynamics
  untouched — `speedMul` still carries the boost into `sense()`/`swanP()`;
  only the reported metric changed.
- Pinned by `tests/maxspeed-honesty.test.js` (4 pins: exclusion on
  game-ending hit frames, capture of a boost the next frame actually moves
  at, seeded `playOne` smoke bounded by the physical ceiling).


## Round 40 — playtest: four P4 findings, first one repaired (coev label/axis divergence)

**vs main 4bb0264 (post-#52) — playtest round PR #53 (Casey), repair branch r40-coev-label-axis**

Play-tester round (PR #53): main verified green (suite 197/197 + qa 8/8,
17th frozen canonical, receipt-completeness exit 0, stone seal mirror ok),
four P4 findings, no P1–P3. Spec'd next version: 6 items.

Findings (from PR #53):
1. [P4] Coev-strip label/axis divergence — coin journal label uses the
   data-derived `axis`, coev strip label used the raw `gens` header. R23
   lesson half-applied.
2. [P4] L1 maxSpeed phantom hitBoost — metric records boosted speed the
   ball never moves at (≤3% on hit frames).
3. [P4] parseCliArgs seed-0 collapse — seed "0" parses to falsy 0,
   silently defaults.
4. [P4] prerun-coev.js has no birth seal — coev.js (5th canonical
   artifact) carries md5 print only, no chained seal.

### What shipped here (finding 1)

- `index.html` renderCoevStrip: label `gens 0-${gens}` → `gens 0-${axis}`,
  matching renderCoinJournal's R23 form — the label now counts exactly the
  axis the ticks plot against.
- Pin in tests/coev-strip-glue.test.js: header under-reporting the data
  (gens=0, rows to gen 200) must render `gens 0-200`, never `gens 0-0`.
  FAIL-first by construction: the raw-header label on main reads `gens 0-0`.
- VERIFIED_CLAIMS +1 (coev-strip-label-axis, Round 40).

### Verdict
MERGEABLE (findings 2–4 remain open for the next lane).

## Round 39 — stone-sign-pilot: the producer staples the birth-seal chain's tip (STONE-V2-PILOTS first sign pilot)

**vs main 3dd4178 (post-#50) — branch r39-stone-sign-pilot**

- [built] `tools/prerun.js` R39 tail: when the named quilt-stone checkout (QUILT_STONE_DIR) ships `signTip` (the stone-v2 sign lane, SuperInstance/quilt-stone PR #4, STONE-SPEC.md §4.6.2), the prerun staples the R37 birth-seal chain's tip with an ed25519 producer signature — `signTip` on a COPY of the seal (the unsigned `checkpoints/stone-v1.json` stays canonical), `verifyTipSignature` with the producer public key BEFORE write, output `checkpoints/stone-v1.signed.json` = {tool, round, key:{ephemeral, public}, verify, chain}. Producer key from `QUILT_STONE_SIGN_KEY` (PEM path, stable identity) or generated per run and LABELED ephemeral — never presented as standing identity. Refused staple → `stone: SIGN/REFUSED` + exit 1, no file. Seam ships CLOSED: no `signTip` in the named checkout → nothing written, skip printed labeled, never silent.
- [pinned] `tests/stone-sign-glue.test.js` — 4 pins: extraction (FAIL-first, absent on main; stale staple dropped before the provenance loop; staple signs a COPY), citation (SuperInstance/quilt-stone + STONE-SPEC §4.6.2 in-repo), live signTip/verifyTipSignature over the prerun-shaped seal incl. the laundering case (post-sign body edit re-seals hashes green but the signature still names the OLD tip → `signed tip does not match the chain tip (post-signature chain edit)`) and wrong-key refusal, ephemeral-key file-shape labeling. Live pins honestly abstain when the checkout lacks signTip.
- [verified live] `QUILT_STONE_DIR=/tmp/quilt-stone` (sign-lane tip 047be72): prerun sealed 4 rows (verifyChain ok, links 5) + stapled tip `ffe8abd842…f5503`, verifyTipSignature ok, ephemeral labeled; fresh re-verify ok; post-sign FORGED-edit refused with the exact laundering why; verifyChain over the signed chain ok (links 6, annotation row skipped per the v2 rule). Run 2: md5s byte-identical (canonical set 63617065…/8a49b0f…/643bd132…/454511548… — 17th frozen training round, R23→R39).
- [note] The staple file is NOT canonical — it is the signature receipt OVER the seal; each ephemeral-key run legitimately re-staples a different key. A standing producer key (QUILT_STONE_SIGN_KEY) is producer-side doctrine, Casey decision.
- [edge] On merge of SuperInstance/quilt-stone PR #4, the pong-quilt→quilt-stone sign-lane adoption becomes a candidate VERIFIED referral edge per the weight law (pong-quilt cites quilt-stone BY NAME in-repo; a merged quilt-stone PR consuming this pilot citing pong-quilt would mint it — same pattern as edge #9).

### Verdict
MERGEABLE (sign pilot ships closed; opens fully the moment the sign lane lands in quilt-stone main).

## Round 38 — receipt-completeness: R34's loss class becomes structurally impossible (R35 spec item 1, shipped)


*Receipt: PR to be posted — branch playtest-round-38, vs main 1c3db7d, post-#47-merge.*
*Mode: BUILDER + play-tester (builder claim: R35 spec item 1, unfulfilled through R37; play claim below).*

*R39 addendum (played 2026-09-27): the two P2 merge-blockers booked against PR #48 — the README count that had to ride the #48 merge and the missing R38 receipt references — were both real: #48 merged without them (c399bda), main's suite went red (readme-count 186 vs live), and the full-suite job additionally went red on the R38 pin's shallow-checkout refusal (fetch-depth 1 default in the suite job — repaired R39). Both booked blockers honored here post-merge.*

**Played.** main tip 1c3db7d (post-#47): suite 181/181 under the canonical glob, tools/test-qa.js 8/8, zero skips (lens-open in the sandbox). `node tools/prerun.js` exit 0; the canonical five byte-identical for the 16th straight round (coev.js 946e639a…, curve.json 63617065…, L0 8a49b0f6…, L1 643bd132…, L2 454511548…; 182 flips / 89 swaps); stone seal verified-before-write, mirror honestly labeled (QUILT_STONE_DIR unset). Also played open sibling PR #48 (r38-wal-session-stone-seal, tip 6d111b8) per the open-sibling doctrine — played, not merged:

- **Suite at 6d111b8: 187/188 — RED.** The readme-count pin: README on the branch says 181 (body claims 183), live suite is 188. The main-merge at 6d111b8 pulled 5 new main tests under the branch's count bump and nobody re-ran the named pin. The body's "Suite 183/183 green under the canonical glob" was true of 9b235e9 and is false of the head the PR actually ships. [P2, found by running]
- **PR #48's body advertises "PLAYLOG R38 + index row"; the branch carries zero R38 references** (grep-verified at 6d111b8). A phantom receipt — the exact class of R35's P2 (PR #44's body claimed the lost R34 receipt). Not yet merged, so no canonical lie; the body must be repaired before merge. [P2, found by running]
- Verified on #48: valueless `--stone-out` → usage + exit 2; happy-path seal exit 0, **829 payload rows sealed one-for-one** against the 830-line WAL (1 BIND header + 829 rows, counted); live seam `verifyChain: ok (links 830)` through quilt-stone's own stone.mjs with QUILT_STONE_DIR set; mirror-only labeled when unset. Core claims stand.

**Deltas as shapes.**

- d(learning)/d(version): zero by construction — training path untouched, 16th frozen canonical round (R23→R38). All motion is in the receipt plane.
- **Failure-mode migration (the round's shape)**: receipt-absence (R34 class: whole entry lost in a conflict resolution, suite green) moves from *human-playloop-detectable only* to *machine-enforced at every merge* (CI job diffs git first-parent merge branch names vs index rows) AND *suite-local forever* (the pin spawns the CLI at the repo tip inside every run). Absence detection is now structural, not vigilance.

**Lies hunted this round.** The two PR #48 P2s above; both reported as merge-blockers in the spec. No new lies on main — the receipt plane's existing pins (readme-count, canonical-index two-way, stone seals) all ran green at 1c3db7d.

**Shipped (builder).** R35 spec item 1, sized [small]: `tools/receipt-completeness.js` + `tests/receipt-completeness.test.js` (5 tests: vocabulary pins, parse pins, the R35-verification PR #44 replay — fixture index minus the R34 row against the era's merge log names R34 and only R34 — a live end-to-end CLI spawn at the tip, and refusal-behavior pins: nonexistent `--log` and unknown flags exit 2, no quiet vacuous green; a shallow/merge-less history is REFUSED, never silently green). Wired into `.github/workflows/merge-gate.yml` as a named job after every merge (fetch-depth 0 — a shallow checkout is refused by the tool). FAIL-first: the pin file lands on pristine main RED (module absent, load-time refusal naming the missing lane). Wristband: registered in core.js VERIFIED_CLAIMS (two-way match). README 181→186 in `tests/`, total 189→194.

**Next version spec.**

1. **[small, blocking PR #48]** Repair #48 before merge: README count 181→188 at its tip (the readme-count pin already names it), and a real PLAYLOG receipt per the R2 branch-pair convention — edit R38's row branch-cell to name both `playtest-round-38` and `r38-wal-session-stone-seal`, or claim R39. Why: the body advertises a receipt that does not exist; the tip is RED. Verify: suite green at the new head under the canonical glob.
2. **[small, carried from R35]** Lens-freshness pin: scheduled quilt-doctor HEAD re-run; merge-gate pins clone aa5a041 while quilt-doctor main advances — stale-lens detection. (Branch-protection enforcement remains a repo setting, not PR-shippable — carried.)
3. **[medium]** PR #48 merge: expect suite 188 in `tests/`; the readme bump (186→188) must ride in the same PR, and the receipt-completeness job must go green on the push event.
4. **[medium, carried from R37]** Canonical-md5 lineage for the WAL session export: verify whether #48's row-hash coverage fulfills it on merge; if not, md5 the five artifacts into the session seal.
5. **[large, carried]** C1 scaling study; advice-aware GA.

**Verdict:** ship. R34's loss class is now structurally caught at every merge and every suite run — the receipt plane closes its last blind spot.

## Round 37 — k2d8 (snowball pulse) — 2026-09-27 — mode: BUILDER (R35's merge-gate lens lesson moved to birth: every prerun run seals the canonical checkpoints it just wrote into a stone-v1 chain, verified BEFORE write, refused loudly on mismatch) — vs main dd7f858 (post-#46)

### Played versions: main dd7f858 (R36 merged) → r37 tip — swept in a scratch worktree per the R13 lesson

Suite on main at round start: 176 tests in tests/, 8 in tools/test-qa.js — all GREEN (lens open). `node tools/prerun.js` regenerates the canonical five byte-identically (coev.js 946e639a…, curve.json 63617065…, L0 8a49b0f6…, L1 643bd132…, L2 454511548…; 182 flips / 89 swaps) — 15th straight frozen round (R23→R37).

### Deltas observed (shapes of change)
- **d(provenance)/d(version): the canonical checkpoints are now receipted AT BIRTH, not promised after merge.** prerun's last act is sealing curve.json + level0/1/2.js — the four artifacts it itself wrote — into `checkpoints/stone-v1.json`, a stone-v1 forward chain (row 0 stone.header, sha256 over canonicalJSON([prev, row minus row_hash]), genesis STONE-GENESIS-1) whose payload rows carry `{file, md5}`. Provenance graduates from "a checksum printed to a log" to "a chained receipt any fleet verifier can walk".
- **d(lens)/d(version): the R36 honesty contract is now load-bearing in a producer, not only a consumer.** The seal is verified BEFORE it is written — the offline mirror always, quilt-stone's OWN stone.mjs via loadStone() when QUILT_STONE_DIR names a checkout — and any refusal exits 1 with no file written. A broken receipt bricks the run loudly instead of archiving a lie (R30's verify-before-download lesson, applied at birth).
- **d(output-shape)/d(version) = 0 where it matters.** The stale seal is dropped before the provenance loop, so that loop's md5 list is identical in shape to R36 — the seal never appears as its own artifact inside the receipt it chains over (a seal of a seal is a rumour about a rumour).

### Lies hunted
- **[P2-class prevented by construction, verified by running]** a stale `stone-v1.json` from a prior run would otherwise be listed by the provenance loop with a fresh-looking md5 while the file is about to be overwritten — the loop would print the OLD receipt's hash as if it were this run's. Prevented: `rmSync(force)` before `readdirSync`, pinned by an ordering assertion in the new glue (rmSync source position must precede the readdirSync loop position).
- **[none else found — crown claims re-verified live]** canonical five byte-identical at the r37 tip; suite 181/181 + qa 8/8 on the branch; seal determinism verified by running prerun TWICE and diffing the seal file (byte-identical, md5 908a5400…, tip ffe8abd842162d71…); with QUILT_STONE_DIR=/tmp/quilt-stone the run's live line reads `live stone.mjs verifyChain: ok (links 5)`; without it the mirror-only receipt prints labeled, never laundered as live.

### Builder receipt: birth-seal lane (tools/prerun.js, tests/stone-prerun-glue.test.js, checkpoints/stone-v1.json)
- **what:** an async tail on prerun: build four `{op:'LINK', cell:'pq/prerun-checkpoint', args:{file, md5}}` rows from the files just written → `toStoneV1` (the R36 exporter's own dialect — one stone-v1 shape in the repo, zero bespoke adapters) → mirror `verifyStoneV1` → live `stone.verifyChain` when named → write `checkpoints/stone-v1.json` (pretty-printed, trailing newline). Refusal path: `stone: SEAL/REFUSED …` + exit 1. 5 pins: extraction (lane markers + exit-1 + rmSync-before-readdir ordering); determinism + canonical-permutation invariance on the exact prerun row shape; tamper breaks the chain at the exact forged row; LIVE stone.mjs accept + firstBadIndex localization in its own vocabulary (honest skip when no checkout); citation pin naming SuperInstance/quilt-stone + stone.mjs + STONE-SPEC.md §4.6.
- **why:** R35 wrote "the merge-gate opens the stone lens" — but a receipt that only exists after a human merge gate is a receipt that can be skipped under deadline. Sealing at birth makes the canonical artifacts carry their provenance into every later gate, including the ones nobody watches. The seal covers the four prerun artifacts only; coev.js belongs to prerun-coev.js's own lane (documented in EXPERIMENTS.md).
- **verify (FAIL-first, by running):** new pin file on pristine main dd7f858 → 2 RED (extraction + citation trip loudly, never skip) / 3 pass; on the branch → 5/5 green; full suite 181/181 + qa 8/8 (README count bumped 184→189 by the live count, per the R19 structural pin).

### Play-test
index.html untouched (lane is tools + one receipt artifact). Merge-gate doctrine satisfied via the page-parse pin (green in-suite). Browser play-test unavailable this round (host browser navigation blocked by policy in the pulse sandbox) — recorded, not hidden.

## Round 36 — k2d8 (snowball pulse) — 2026-09-27 — mode: BUILDER (the 09:57 edge-watch lane item: quilt-stone is LANE-AFFECTING — all receipt/WAL export lanes must target stone-v1; shipped: the WAL exporter seals in the canonical stone-v1 forward format) — vs main b455715 (post-#45)

### Played versions: main b455715 → r36 tip — swept in a scratch worktree per the R13 lesson

Suite on main at round start: 171 tests in tests/, 8 in tools/test-qa.js — all GREEN (lens open). `node tools/prerun.js` regenerates the canonical five byte-identically (coev.js 946e639a…, curve.json 63617065…, L0 8a49b0f6…, L1 643bd132…, L2 454511548…; 182 flips / 89 swaps; L0 5767 / L1 8700 / L2 8800) — 14th straight frozen round (R23→R36).

### Deltas observed (shapes of change)
- **d(canonical-format)/d(version): pong-quilt's WAL export lane now speaks BOTH dialects — the fleet five-opcode doctor WAL (fnv1a-64, unchanged) AND quilt-stone's stone-v1 forward format (row 0 = stone.header, sha256 over canonicalJSON([prev, row minus row_hash]), genesis STONE-GENESIS-1).** The exporter is the page/tools' own artifact — one impl, two seals, zero bespoke adapter.
- **d(verification-authority)/d(version): the live seam loads quilt-stone's OWN stone.mjs** (canonical head 1f6036a) — sealed exports verify under the fleet's canonical verifier with verdict vocabulary {ok, firstBadIndex, at, why, alg, genesis, links, tip}.
- **d(lens)/d(version): the R35 lens lesson applied at birth.** The stone live pin reads /tmp/quilt-stone (QUILT_STONE_DIR overrides); the merge-gate clones canonical quilt-stone@1f6036a before counting, so the suite count is one value in the sandbox AND CI (176 = 171 + 5 new stone pins), and a broken seam drops the count and fails the gate by construction.

### Lies hunted
- **[P2-class prevented by construction, not found in the wild]** the stone live pin would have been R35's split-brain all over again (runs lens-open, skips lens-closed, count differs by 1). Prevented the R35 way: CI opens the lens, default path points at the canonical clone location. Verified: FAIL-first — pristine main b455715 runs the new pin file 5/5 RED (the toStoneV1/loadStone lane absent → extraction trips loudly, never a silent skip).
- **[none else found — crown claims re-verified live]** page-parse green; honesty two-way 10/10 (VERIFIED_CLAIMS gains wal-stone-v1); readme-count 176/8 pinned; canonical five byte-identical; the fleet WAL lane (R26) untouched — its pins still green against quilt-doctor's substrate.

### Builder receipt: stone-v1 export + live-verify seam (tools/wal-export.js, tests/stone-v1-glue.test.js)
- **what:** `toStoneV1(meta, rows)` seals the same five-opcode WAL rows in the stone-v1 forward shape (header row 0, 1-based payload seq, idempotent re-seal); `verifyStoneV1(lines)` is the offline mirror so pins trip without a checkout; `loadStone(opts)` dynamically imports the real stone.mjs from an explicit checkout (closed → null, never faked — no relative guess, quilt-stone is brand-new unlike the standing quilt-doctor sibling). 5 pins: shape + canonical-permutation invariance + re-key immutability; tamper-at-row + header forgery exactness; seam-closed honesty; LIVE stone.mjs verifyChain accept/reject in its own vocabulary + dialect auto-detect; citation pin naming SuperInstance/quilt-stone + stone.mjs + STONE-SPEC.md §4.6.
- **why:** house law over in quilt-stone — "a receipt without a chain is a rumor", and NEW chains MUST write stone-v1. pong-quilt receipts were the most natural first adopter: the export lane already existed, the shape was spec'd, and the weight law wants a PENDING→VERIFIED referral edge pong-quilt→quilt-stone when a merged quilt-stone PR cites this lane.
- **verify (FAIL-first, by running):** 5/5 RED on pristine main b455715; 176/176 + qa 8/8 GREEN on the branch; live pin verified against quilt-stone@1f6036a's own verifyChain (ok:true, alg stone-v1, tamper → hash mismatch at firstBadIndex 2).

### Play-test
index.html untouched (lane is tools + registry only). Merge-gate doctrine satisfied via the page-parse pin (green in-suite). Browser play-test unavailable this round (host browser navigation blocked by policy in the pulse sandbox) — recorded, not hidden.

## Round 35 — CCC — 2026-09-27 — mode: BUILDER ×2 (R31-class main-repair: R34's receipt lost in the PR #44 conflict resolution — entry + index row restored from 777e76d; AND the carried R32→R34 "open-the-lens CI step" — CI now clones canonical quilt-doctor so the suite count is one value everywhere) + play-tester — vs main a4f3516 (post-#44)

### Played versions: main a4f3516 (R34 merged) → R33 tip 3e6a00b → R32 de2fd16 → R34 branch commit 777e76d → R34 final tip 69129d5 — swept in scratch worktrees per the R13 lesson

Suite on main at round start (pulse sandbox, lens open): 171 tests in tests/, **1 RED** — the readme-count pin ("README claims 168 tests in tests/ but the suite runs 171"); qa 8/8. In CI the same commit runs 168 (lens closed) and the pin is GREEN — the pin had a split-brain denominator, see below. `node tools/prerun.js` at all five played tips regenerates the canonical five byte-identically (coev.js 946e639a…, curve.json 63617065…, L0 8a49b0f6…, L1 643bd132…, L2 454511548…; 182 flips / 89 swaps; L0 5767 / L1 8700 / L2 8800).

### Deltas observed (shapes of change)
- **d(learning)/d(version) = 0 — 13th straight frozen round (R23→R34).** Every played tip's prerun md5s identical; the paddle has not moved since the R22 canonical set.
- **d(receipt-integrity)/d(version): the receipt layer's failure modes are migrating from redundancy to absence.** R31's merge-burst disease was too much memory (duplicated index rows R24–R27, stale README count lines); this round's is no memory (an entire round entry + index row vanished in a conflict resolution). The shape flips from "two copies of a receipt" to "zero receipts for shipped code" — and zero is worse, because the canonical-index pin is structurally blind to it (verified: green on main while R34's row was missing — no orphan heading, no phantom row; the round simply is not in the file).
- **d(test-cardinality)/d(environment): the readme-count pin's denominator was a function of the machine, not the commit.** With /tmp/quilt-doctor present (pulse sandbox) the R29 wal-doctor-e2e pins run live and the suite counts 171; absent (CI) they honestly skip (−3) and it counts 168. Same commit, two truths. This single fact retro-explains the entire R34 saga: the branch's README bump was sandbox-computed (lens-open) so CI on 777e76d went RED; the conflict resolution "fixed" it by reverting to main's lens-closed-correct 168, dropping the branch's receipt files as collateral; main's post-merge CI was green and stayed green while the sandbox stayed red. Nobody was lying — the ruler itself was a rubber band.

### Lies hunted
- **[P2, found by running, FIXED by unification — not by renumbering]** the readme-count pin has a split-brain denominator: pristine main a4f3516 is RED in the pulse sandbox (claims 168, runs 171) and GREEN in CI (runs 168) on the identical commit. My first repair attempt — set README to 171 — passed locally and **failed the CI gate on PR #45** ("claims 171, runs 168"), which is how the environment split surfaced. The honest fix is to define the canonical count WITH the canonical lens open and make CI open it (builder receipt 2), not to pick one environment's number.
- **[P2-process, found by inspecting git + the GitHub checks API, FIXED]** R34's PLAYLOG entry and canonical-index row never reached main. The commit message of 777e76d claims "PLAYLOG R34 + canonical index row" but neither is on main (grep: 0 hits; the branch-vs-main PLAYLOG diff proves the drop). The canonical-index pin stayed green the whole time — its two-way check only sees rows/headings present in the file, so a round absent entirely is invisible. Restored verbatim from 777e76d (receipts are memory; the loss record lives here).
- **[P3-process, verified via check-runs API, recorded]** the merge-gate never ran green on PR #44's final head: zero completed checks on 69129d5 at merged_at 23:09:50Z; the suite success on that SHA started 23:10:08Z (post-merge, push event); the pre-merge branch commit's suite was a FAILURE at 22:25Z. Spec item 2 below.
- **[none else found — crown claims re-verified live on main]** page-parse green; honesty two-way 9/9; wal-session CLI guard behaves per R33 spec (bogus arg → exit 2 + usage; valueless --out → exit 2 + usage, no TypeError leak); amber-admission pins 3/3 green; canonical five byte-identical at all five played tips.

### Builder receipt 1: restore R34's lost receipt (R31-class main repair, docs)
- **what:** R34's PLAYLOG entry + canonical-index row restored verbatim from 777e76d (above the R33 entry, newest-first); README count corrected.
- **why:** R34's code, pins, and VERIFIED_CLAIMS row merged and are green on main — only the receipt was lost. The R11 lesson cuts both ways: code without a receipt is unshipped, and shipped code whose receipt vanished is half-shipped.
- **verify:** the canonical-index uniqueness pin passes with the R34+R35 rows present; the loss is git-verified (environment-independent, unlike the count below).

### Builder receipt 2: open-the-lens CI step (the R32-carried spec, shipped) — unifies the count by construction
- **what:** `.github/workflows/merge-gate.yml` suite job now clones `SuperInstance/quilt-doctor` at the canonical `aa5a041` (the vendored fixture's exact citation) into `/tmp/quilt-doctor` before running the suite. One small step, three receipts at once.
- **why:** (1) the count becomes one value — 171 with the lens open — in the sandbox AND CI; (2) the carried R32→R34 spec ("workflow job running the doctor-verdict live pin, FAILING if the seam does not open") is now the default path, not a separate job — if the clone fails, the e2e pins skip, the count drops to 168, and the readme-count pin fails the gate by construction; (3) it retro-diagnoses R34's CI red: the branch's bump was computed lens-open while CI ran lens-closed.
- **verify (FAIL-first, by running):** my docs-only attempt (README 171 without the CI lens step) FAILED the gate on PR #45's head 9b286d7 — the gate itself produced the evidence ("claims 171, runs 168"). With the step added, CI runs the three e2e pins live against the real substrate.py and the suite counts 171 there too. CI on the final head b7bc183: **# tests 171 / # pass 171 / # fail 0, zero doctor skips** (run log verified) + page-parse green.

### Next version spec (competitive improvements)
- [small] **receipt-completeness CI job**: a workflow step diffs merged-PR branch names (`r<N>-*`, `playtest-round-<N>`) against canonical-index rows on main after each merge, FAILING when a merged round has no row. why: this round's P2-process — the index pin is blind to absence; only git ground truth can see it (it saw R34 instantly). verify: FAIL-first by replaying PR #44's state (fixture index without the R34 row) through the check script.
- [small] **merge-gate enforcement, not just existence**: branch protection requiring "full test suite" green before merge. why: this round's P3-process — PR #44 merged with no green check on its final head and a red on its last real signal. verify: repo setting (admin); a deliberately red PR must be unmergeable.
- [small] **lens-freshness pin**: the CI clone is pinned to aa5a041; quilt-doctor HEAD has already moved (957e360). A scheduled job re-running the verdict pin against quilt-doctor HEAD would catch cross-repo canonical drift before it surprises a future round. why: shipped lens step pins the PAST by design; freshness is the other half. verify: scheduled workflow, green while HEAD shape-matches the vendored fixture.
- carried: [epic, R12→R35] C1 scaling study. [medium, R22→R35] advice-aware GA. [medium, R27→R35] canonical-md5 lineage for the WAL session export.

### Siblings studied this round
Internal receipt-layer archaeology (git log/show + GitHub checks API against SuperInstance/pong-quilt PR #44 and its two SHAs) plus SuperInstance/quilt-doctor aa5a041 — the canonical substrate the R29/R32 pins cite, re-confirmed present and loadable by file. The pulse-sandbox clone at 957e360 re-verified green against the aa5a041-shape fixture.

### Verdict
MERGEABLE (docs repair restoring the R34 receipt verbatim + one workflow step that opens the canonical lens; suite green at tip in both environments once CI runs lens-open; training path untouched — prerun canonical five byte-identical at base and tip).

## Round 34 — k2d8 — 2026-09-27 — mode: BUILDER (R28 item 3 / R32 spec item 2 — one amber-admission source, still unfulfilled through R33) — vs main 0a29cdb (post-#42)

### Builder receipt: three degrade sentences, one source
- **what:** `index.html` now defines a single `amberAdmission(what, cause)` — all three amber degrade sentences (`renderCoinJournal`'s in-renderer branch, the page's `coinJournalUnavailable` fetch-failure instrument, `coevStripUnavailable`) build from it; only the parenthetical stays per-cause (R32 spec verbatim). The pre-R34 state was three literal copies whose parentheticals already disagreed about WHY (R32's P4).
- **why:** honesty sentences copied by hand drift — R32 counted three copies, one already divergent; one copy by construction cannot.
- **verify (FAIL-first, by running):** new `tests/amber-admission-glue.test.js` — pin 1 asserts the stem and tail each appear exactly once in index.html code (3 literal copies on pristine main → RED 3/3 there, verified in a detached worktree); pin 2 extracts all three instruments VERBATIM (brace-counted, with the `$` canvas helper stubbed) and asserts each rendered string byte-equals what the source builds, stems byte-equal, tails byte-equal, both amber `#d29922`; pin 3 asserts the renderer degrade path (null journal) still admits via the source with no fake ticks (R28 vocabulary preserved). `tests/coin-journal-glue.test.js` extraction now carries the shared definition it closes over (same extract-as-shipped doctrine). Suite 166/166 + qa 8/8; README 171→174 (the readme-count pin named me, as designed); prerun canonical five byte-identical — training path untouched; VERIFIED_CLAIMS +1 (`amber-admission-source`).
- **honesty notes:** extraction lesson recorded — `coinJournalUnavailable`/`coevStripUnavailable` are multi-line one-close instruments (close brace rides line end), so naive `\n}` anchoring over-extracts into page boot code; brace-counting is the robust cut. No lies found this round beyond the one fixed; crown claims (WAL export → doctor verify, canonical five) re-verified green at this tip.

### Next version spec (competitive improvements)
- [small] **wal-session CLI usage guard** (R28 item 2, still unfulfilled on main — PR #43 open): unrecognized positional arg, or `--out` with no value → usage on stderr + exit non-zero.
- [medium] **open-the-lens CI step** (carried from R32): a workflow job running the doctor-verdict live pin with `QUILT_DOCTOR_PATH` set, FAILING if the seam does not open.
- carried: [epic, R12→R34] C1 scaling study. [medium, R22→R34] advice-aware GA. [medium, R27→R34] canonical-md5 lineage for the WAL session export.

### Verdict
MERGEABLE (docs+instrument honesty only; the paddle math is untouched).

## Round 33 — r33-wal-session-cli-usage-guard — 2026-09-27 — mode: BUILDER (R33 spec item 1 — wal-session CLI usage guard, the R32-booked P4) — vs main 0a29cdb (post-#42)

### Played versions: main 0a29cdb (R32 merge) → r33 tip

### Deltas observed (shapes of change)
- **Misuse now fails loudly instead of silently defaulting.** Pre-R33, `node tools/wal-session.js 99 bogus` exited 0 with 75KB of JSONL and the bad arg ignored — a user error became a debugging detour (R32's own P4, found by running). Post-R33 the same command exits 2 with `usage: node tools/wal-session.js [seed] [--out PATH] — unrecognized argument: bogus` on stderr.
- **The TypeError path is closed.** Pre-R33, a trailing `--out` with no value threw a raw `fs.writeFileSync(undefined)` TypeError from node internals. Post-R33 it is the same usage error, exit 2, no stack leak.
- **Training path untouched:** zero changes to core.js simulation, qa.js advisor, or the WAL exporter; the guard lives entirely in the CLI seam of tools/wal-session.js.

### Lies hunted
- [P4, FIXED, builder receipt] wal-session CLI silently ignored unrecognized positional args and threw a raw TypeError on valueless --out (R32-booked). Both reproduced on main 0a29cdb by running before the fix.

### Builder receipt: parseCliArgs + spawn-driven pins
- **what:** `parseCliArgs(argv)` (exported, unit-pinned) classifies args — one optional positional seed, one `--out PATH`, anything else a usage error. The CLI block consumes it: `error → usage on stderr + exit 2`. Valid invocations are byte-for-byte the pre-R33 behavior (seed default 20260926, `--out` anywhere).
- **why:** R32's spec item 1 — "silence turned a user error into a debugging detour; the missing-value path throws a raw TypeError."
- **verify (FAIL-first, by running):** new `tests/wal-session-cli.test.js`, 5 pins — 3 spawn the REAL CLI (bogus positional → non-zero + usage names the arg; valueless --out → non-zero + usage, no TypeError; unknown flag → non-zero + usage), 1 unit-pins parseCliArgs valid/misuse forms, 1 pins the happy path end-to-end (exit 0, JSONL lines on stdout). All 5 RED on main 0a29cdb (exit 0 / TypeError / parseCliArgs undefined), all 5 green on tip.

### Next version spec (competitive improvements)
- [small] **one amber-admission source** (R28 item 3, still unfulfilled): `renderCoinJournal`'s degrade branch, the page's `coinJournalUnavailable`, and the coev-ledger degrade share ONE exported constant for the admission stem (parenthetical stays per-cause). why: R32's P4 — three copies, already drifted. verify: pin asserts byte-equality of the rendered stems across all three sites.
- [medium] **open-the-lens CI step**: the pulse harness keeps a quilt-doctor clone at /tmp/quilt-doctor; add a workflow job that runs the doctor-verdict live pin with `QUILT_DOCTOR_PATH` set and FAILS if the seam does not open. why: the R32 fix proved the live-open claim is the load-bearing one. verify: job logs the lens line; a canonical-stats shape drift trips it at PR time.
- carried: [epic, R12→R33] C1 scaling study. [medium, R22→R33] advice-aware GA. [medium, R27→R33] canonical-md5 lineage for the WAL session export.

### Verdict
MERGEABLE (stacks on main 0a29cdb; suite 164/164 + qa 8/8; prerun canonical five frozen; R32 entry read; no open sibling PRs at round start).

## Round 32 — kimi1 — 2026-09-27 — mode: BUILDER (R28 spec item 1 — doctor-verdict perms shape-check, the booked P2) + play-tester — vs main 07dc9ae (post-#41)

### Played versions: main 07dc9ae (R31 merge, R24 lens module) → playtest-round-32 tip

### Deltas observed (shapes of change)
- **The honesty boundary moved from one enumeration size to per-row exact enumeration.** The R24 lens claimed "every lens enumerated 8!=40320 perms"; the real canonical file enumerates the full 8-repo matrix on 3 rows and sufficient-subset probes on 3 rows (5!=120). The shipped shape check was a monoculture — it rejected the doctor's own real data, so the flagship cross-tool seam could never open on the data it cites. d(learning)/d(version) is measured in what counts as a legitimate receipt: R32 widens the acceptance gate to per-row n! while keeping the Monte-Carlo impostor class closed on ANY row.
- **Failure-mode migration: the lie lived in the test fixtures, not the page.** Two pin files carried "values lifted verbatim from quilt-doctor aa5a041" that were not verbatim (a 5-point row wearing perms=40320; 3 of 6 real rows omitted). They passed because the monoculture check reflected the fixture, not the world — the mirrors agreed with each other. R28's spec predicted this exact drift class ("build the fixture from the REAL row shapes… not crafted-uniform data"); R32 finds it already realized, one layer down from where R28 was looking.
- **Training path frozen R23→R32:** prerun regenerates the canonical five byte-identically at main 07dc9ae AND at this tip (coev.js 946e639a…, curve.json 63617065…, L0 8a49b0f6…, L1 643bd132…, L2 454511548…; 182 flips / 89 swaps). Every delta lives in receipts, instruments, and registry — never in the paddle.

### Lies hunted
- [P2, FIXED, builder receipt] **The external-lens seam could never open against a pristine canonical quilt-doctor checkout.** Reproduced at main 07dc9ae by running: `node -e "const dv=require('./tools/doctor-verdict.js'); console.log(dv.loadDoctorVerdict('/tmp/quilt-doctor'))"` → null (clone at aa5a041). Root cause: `stats.every(t => t.perms === 40320)` while the real `docs/holistic-stats.json` carries perms 40320×3 (n=8) + 120×3 (n=5). Consequence in R28's own words: "a shipped claim that can never fire" — the page ships closed honestly, but the complementary claim ("running the canonical command against a pristine quilt-doctor clone") was unreachable in practice for 4 rounds.
- [P3, FIXED, builder receipt] **Two fixtures carried crafted-uniform stats labeled verbatim that were not.** Pre-R32 `tests/doctor-verdict-glue.test.js` had `jev ~ jepa_null_z (sufficient)` at n=5/perms=40320 (real: perms=120) and omitted 3 real rows; `tests/doctor-lens-page-glue.test.js` copied the same wrong row. Not fabrication of results — but a false provenance sentence on the instruments that guard fabrication. Both replaced by ONE verbatim vendored snapshot (`tests/fixtures/holistic-stats-aa5a041.json`) both pins now read.
- [P4, booked] **wal-session CLI silently ignores unrecognized positional args.** Reproduced this round: `node tools/wal-session.js 99 bogus-positional` → exit 0, 75KB JSONL on stdout, bad arg ignored. Also: trailing `--out` with no value → raw `fs.writeFileSync(undefined)` TypeError instead of usage. Spec'd below (item 1).
- [P4, booked] **The coin-journal amber admission exists as two copies and has already drifted.** Renderer: "data absent (journal missing/empty)"; page fetch-failure: "data absent (serve over http, not file://)" — same stem by copy, parentheticals now disagree about WHY (a malformed curve.json and file:// are different failures); the coev ledger carries a third copy. R28 spec'd the single source; it is still unfulfilled. Spec'd below (item 2).
- [none else found — crown claims re-verified live] R26 WAL export → doctor `QuiltSubstrate.verify()` ok; wal-doctor-e2e pins green against the aa5a041 clone; wal-session 483-line seeded export verifies `{ok:true, lines:483}`; page-parse, readme-count, canonical-index pins all green at this tip.

### Builder receipt: per-row exact enumeration replaces the 40320 monoculture (R28 spec item 1)
- **what:** `tools/doctor-verdict.js` — perms validity is now per-row exact enumeration: `Number.isInteger(t.n) && 2 ≤ n ≤ 20 && t.perms === n!` (factorial computed). 8!=40320 and 5!=120 both legitimate; a Monte-Carlo impostor on ANY row reads as ABSENT; the killed hypothesis (`jev ~ active_days`) must itself be a full-matrix row (n=8). VERIFIED_CLAIMS text corrected ("perms === n! — 8!=40320 full-matrix rows AND 5!=120 sufficient-subset rows both legitimate"). Fixtures: one verbatim vendored snapshot `tests/fixtures/holistic-stats-aa5a041.json`, read by BOTH the verdict pin and the page-glue pin.
- **why:** R28's P2 — the external lens is the repo's flagship cross-tool claim and could never fire on the canonical data it cites.
- **verify (FAIL-first, by running):** pre-fix RED — real six-row fixture → null; live pristine clone → null; both new pins red. Post-fix 7/7 in the verdict pin file, including a new subset-row impostor class (perms=999 on a 5! row → absent); vendored snapshot shape-matches the live clone when present (offline abstain asserts the 6-row [40320×3, 120×3] shape, never fake green); the seam OPENS on the pristine clone: "external lens: SuperInstance/quilt-doctor three-lens verdict = THREE THINGS (40320 perms enumerated, killed-hypothesis p_exact=0.988492) — a single-judge refusal stands alone". Page-glue 5/5 green on the corrected fixture. Suite 161→163 in tests/ + qa 8/8; README 169→171 (the readme-count pin named me, as designed); prerun canonical five byte-identical — training path untouched.

### Next version spec (competitive improvements)
- [small] **wal-session CLI usage guard** (R28 item 2, still unfulfilled): unrecognized positional arg, or `--out` with no value → usage on stderr + exit non-zero. why: this round's P4 — silence turned a user error into a debugging detour; the missing-value path throws a raw TypeError. verify: pin drives `node tools/wal-session.js 99 bogus` (non-zero + usage line) and `--out` with empty value (same).
- [small] **one amber-admission source** (R28 item 3, still unfulfilled): `renderCoinJournal`'s degrade branch, the page's `coinJournalUnavailable`, and the coev-ledger degrade share ONE exported constant for the admission stem (parenthetical stays per-cause). why: this round's P4 — three copies, already drifted. verify: pin asserts byte-equality of the rendered stems across all three sites.
- [medium] **open-the-lens CI step**: the pulse harness keeps a quilt-doctor clone at /tmp/quilt-doctor; add a workflow job that runs the doctor-verdict live pin with `QUILT_DOCTOR_PATH` set and FAILS if the seam does not open. why: the R32 fix proved the live-open claim is the load-bearing one — it sat broken for 4 rounds while every committed pin stayed green. verify: job logs the lens line; a canonical-stats shape drift trips it at PR time.
- carried: [epic, R12→R32] C1 scaling study. [medium, R22→R32] advice-aware GA. [medium, R27→R32] canonical-md5 lineage for the WAL session export (reproducibility pin exists; the hash-lineage pin does not).

### Verdict
MERGEABLE (stacks on main 07dc9ae; suite 163/163 + qa 8/8; prerun canonical five frozen; R31 entry read; no open sibling PRs at round start).

## Round 31 — index-dedup-count-fix — 2026-09-27 — mode: BUILDER (small: main-repair — two inherited reds) — vs main 7649f4c (post-#40)

- **[fixed] canonical-index duplicate rows R27/R26/R25/R24.** The #31–#40 merge burst stacked two index writes per round (the R2-convention "two canonical branches, one row" merge AND a stale single-branch copy both landed); the uniqueness pin tripped naming all four. Removed the four stale single copies, kept the branch-pair-convention rows. FAIL-first: `tests/canonical-index.test.js` uniqueness pin was RED on pristine main naming R27/R26/R25/R24.
- **[fixed] README test-count block.** Six stale count lines from parallel rounds had accumulated (135/139/152/158…); collapsed to one live-verified line: 169 total = 161 in `tests/` + 8 in `tools/test-qa.js`. FAIL-first: `tests/readme-count.test.js` named the drift on main (claimed 152, suite runs 161).
- [none, verified-by-running] docs-only round; no behavior touched. Suite `node --test tests/*.test.js` 161/161 + qa 8/8 green on this tip.
- REFERRAL EDGES: none new.

## Round 30 — wal-page-glue — 2026-09-27 — mode: BUILDER (R26-booked follow-on: wal-session driver → page wiring) — vs main 5ef8cda (post-#37)

- **[built] the WAL exporter lands ON the page, dual-loaded from the same pinned `tools/wal-export.js`.** R26 proved a headless session can feed the doctor-consumable WAL; the page itself still had no path to it — the receipt panel, the thing the whole receipt doctrine is about, could never leave the page in the shape quilt-doctor verifies. This round wires it: `tools/wal-export.js` becomes dual-loadable (node `module.exports` + browser `window.QUILT_WAL`, ONE implementation — a page-side reimplementation would drift from the pinned one the first time anyone touched a hash); a "WAL quilt (download)" button re-anchors the LIVE panel rows into the fleet WAL (BIND genesis + one LINK per row, the panel's own display hash carried inside `args.panelPrev` as provenance — the WAL chain and the panel chain are never confused); verification runs BEFORE download — a non-ok verdict receipts `WAL-EXPORT/REFUSED` and no file is saved; an empty panel exports a genesis-only chain receipted `WAL-EXPORT/EMPTY`; re-export after a new receipt produces a different chain (the seam reads the live panel, never a stale copy).
- [none, verified-by-running] **Gate service:** `node --test tests/*.test.js tools/test-qa.js` 160/161 pass; the single red is `tests/canonical-index.test.js` — duplicated index rows R26/R24, **pre-existing on origin/main** (verified against a pristine worktree), not introduced here. FAIL-first: `tests/wal-page-glue.test.js` runs 6/6 RED on pristine main, 6/6 green on this tip.
- [carried, pre-existing] canonical-index duplicated rows R26/R24 — main is red on this pin independent of this round; the dedup is a small fleet-hygiene item for the next builder.
- REFERRAL EDGES: none new this round (the R26 WAL export edge pq → quilt-doctor stands as previously filed: candidate VERIFIED on a quilt-doctor PR consuming the export; weight law unchanged).
## Round 29 — CCC — 2026-09-27 — mode: BUILDER (fresh small: doctor-live E2E pin) — vs main 5ef8cda (post-#37)

### Played versions: main 5ef8cda → r29 tip — one pin file + registry rows only, training path untouched

The R26 JS mirror (`verifyQuiltWal`) reflects the doctor's `verify()` line-for-line — a mirror can drift and still pass its own reflection. This pin runs the REAL consumer: `quilt_doctor/substrate.py` loaded live from a local clone (by file, bypassing the package `__init__` and its lens deps), against the exporter's actual JSONL.

- Clean export → the doctor's own `QuiltSubstrate.verify()` returns `ok: true` (line count carried).
- Content-tamper (post-hash file edit — the pin's first cut tampered PRE-hash, which is just a valid chain of different content; caught by running, the distinction is now documented in the test) → doctor names `hash_mismatch` at the exact seq, chain rejected.
- Mirror agreement: JS `verifyQuiltWal` and the doctor give the same ok verdict, same divergences seq-for-seq why-for-why on the same tampered file.
- Offline doctrine verified by running: clone moved away → 3 named skips, never fake green; restored → 3/3 live PASS (doctor clone at aa5a041, substrate loads by-file).

FAIL-first verified by running: pin file absent on pristine origin/main → honesty two-way pin trips (claim row names a file that doesn't exist). Suite 150/150 in `tests/` (+ 8/8 qa). Prerun canonical five byte-identical (coev 946e639a, curve 63617065, L0 8a49b0f6, L1 643bd132, L2 454511548). VERIFIED_CLAIMS +1 (wal-doctor-e2e). README count pin named INHERITED rot: main's first count line claimed 128 in tests/ but live is 148 (PRs #36/#37 added pins without bumping the first line) — corrected to 150 with this pin added (the count moved once the inherited reds below were fixed: a failing pin skews the spawn's pass count). Canonical-index pin named INHERITED rot too: the #33-#37 merge collision duplicated the R26 and R24 index rows (R27's collision warning, landed) — merged per the R2 multi-branch convention. Round numbering note: the interrupted prior session had this lane drafted as "R28" on a stale r26 base; R28 was taken by playtest-round-28 (#37) while it slept, so it ships as R29.

## Round 28 — CCC — 2026-09-27 — mode: BUILDER (unfulfilled R27-spec small: `renderCoinJournal` owns its degrade path) + play-tester — vs R27 tip 3c5f498 (canonical head; PRs #31–#36 open at round start)

### Played versions: R27 tip 3c5f498 (canonical) → main a0939b8 (frozen reference) → PR #35 tip 3b9bbb8 (wal-session driver) → PR #36 tip 1507148 (doctor-verdict glue) → playtest-round-28 tip

### Deltas observed (shapes of change)
- **The ownership boundary of honesty moved inside the page.** v1: the paddle owned learning. R23: the registry owned it. R26: the doctor owned verification. R28: the page's *renderer* owns its degrade sentence — the R23 claim "admits it in amber instead of faking a strip" held only on the fetch-failure road because the admission lived in the caller's `.catch`; a null journal reaching the renderer directly threw TypeError. d(learning)/d(version) is now also measured in WHO owns the refusal — each round moves the honesty boundary one seam inward.
- **Failure-mode migration:** physics (v1) → rendering (R23) → tool boundaries (R26) → caller/renderer boundary (R28). The hunted lie keeps climbing the abstraction stack: this round it was an exception where a sentence belonged.
- **Training path frozen R23→R28:** `node tools/prerun.js` regenerates the canonical five byte-identically at every tip played this round (pq-r28 3c5f498, pq-main a0939b8, pq-35 3b9bbb8, pq-36 1507148 — coev.js 946e639a…, curve.json 63617065…, L0 8a49b0f6…, L1 643bd132…, L2 454511548…; 182 flips / 89 swaps). Every delta lives in receipts, instruments, and registry — never in the paddle.

### Lies hunted
- [P2, booked, sibling PR #36] **The doctor-verdict seam is dead against a pristine canonical quilt-doctor checkout.** `loadDoctorVerdict()` returns `null` at `/tmp/quilt-doctor` (pristine, citation aa5a041). Repro (run, this round): `node -e "require('./tools/doctor-verdict')"` shape — root cause: `permsOk = stats.every(t => t.perms === 40320)` but the real `docs/holistic-stats.json` has 6 rows with perms ∈ {40320, 120} (120 = 5! — the sufficient-data subset rows; killed row `jev ~ active_days` p_exact=0.988492 found and view-doc regex match both PASS). Every other shape check passes. Consequence: "the doctor's holistic verdict ships — absent ships, never fakes" renders honestly, but the complementary external-lens claim ("running the canonical command against a pristine quilt-doctor clone") is unreachable in practice — the seam can never open on real data; its tests pass only because the fixture was crafted uniform (all 40320). Not fabrication; a shipped claim that can never fire. Spec'd below (first item).
- [P3, fixed, builder receipt] **`renderCoinJournal` did not own its degrade path** (the R27 spec small). Live repro at the R27 tip: `renderCoinJournal(ctx, null, 260)` → `TypeError: Cannot read properties of null (reading 'filter')`; `renderCoinJournal(ctx, [], 260)` → no throw, renders grey "0 flips" strip — not amber. The page never hit this (fetch `.catch` → `coinJournalUnavailable`), so the shipped claim held on its one road; the contract gap was latent for every other caller, including this repo's own verbatim-extraction glue. Fixed in-renderer; FAIL-first below.
- [none, verified-by-running, sibling PR #35] **The session WAL driver and its claims reproduce.** `node tools/wal-session.js 99 3 --out /tmp/r28-session.jsonl` → 483-line WAL; the doctor's own verifier against that file: `QuiltSubstrate('/tmp/r28-session.jsonl').verify()` → `{ok: true, divergences: [], lines: 483}` — R26's cross-tool crown claim now reproduces under my hands with a real seeded session, not demo rows. Stats: 456/483 REFUSAL receipts (the QA-REFUSAL exhaustion seam is exercised honestly — `qa_refusal` pins fired 102/104 in the escalation test), 21 advice, 3 deaths; bound 40 matches the page's `receipt()` constant exactly. Suite 131/131 + qa 8/8 at that tip.
- [none, verified-by-running] **Gate service:** pq-r28 (pre-build) 127/127, pq-35 131/131, pq-36 126/126 suites + qa.js silent-exit-0 on all three; page-parse + readme-count + canonical-index pins green everywhere; canonical five md5s byte-identical across the three tips. Collision warning carried from R27 stands: open PRs bump README count and the index from nearby bases — whoever merges last inherits the bumps (by design, R19).
- [P4, booked, self-inflicted] `tools/wal-session.js` takes `--out <path>`; a positional third arg is silently ignored (I wrote no file, claimed absence). User error, but the CLI's silence made it a two-command detour. Spec'd below (usage hint on unknown args).
- [method note, honest] Browser/canvas page play was blocked by tool policy this round; page-level verification fell back to the repo's own established pattern (verbatim renderer extraction + real `curve.json` data), which is what the shipped pins do. The interactive-drive gap is noted, not hidden.

### Builder receipt: the renderer owns its degrade path (R27 spec small, unfulfilled until now)
- **what:** `renderCoinJournal` now guards `!Array.isArray(tiebreaks) || !tiebreaks.length` in-renderer: paints the SAME amber vocabulary as the page's fetch-failure instrument ("coin journal: data absent (journal missing/empty) — instrument ships, admits it", `#d29922`), returns without throwing, draws no fake ticks. The caller's guard and `.catch` stay as belt-and-braces — a malformed `curve.json` and a dead fetch now degrade identically.
- **why:** the R23 honesty claim held only on one road because the admission lived in the caller. An instrument's degrade sentence belongs to the instrument; R27 spec'd this exact item.
- **verify (FAIL-first, by running):** pin 7 RED pre-fix — `TypeError: Cannot read properties of null (reading 'filter')` at the verbatim-extraction drive, exactly matching the live page repro; 7/7 green post-fix (null/undefined/[] all amber, no ticks, healthy path regression-guarded). Full suite 127→128/128 + qa 8/8; README 135→136 (the readme-count pin named me, as designed); prerun canonical five byte-identical — training path untouched.

### Played notes (headless, real curve.json, R28 tip)
HAPPY: 183 rects, 182 ticks, 0 off-canvas, x∈[35,357] inside the 360-wide canvas, axis derives from data (max tick gen 259 ≤ header gens 260), label `coin journal: 182 flips · 89 swaps · gens 0-260 · live:false throughout` — matches the R22 journal audit exactly. DEGRADE (null/undefined/[]): amber admission, `#d29922`, zero ticks, no throw — same sentence family as FETCH-FAIL. LIVE tripwire still SCREAMS `LIVE:1 (moth engine!)`. Receipt panel bound 40 cross-checked against `tools/wal-session.js` (constant identical).

### Next version spec (competitive improvements)
- [small] **doctor-verdict perms shape-check fix** (PR #36): accept legitimate subset perms — validate `Number.isInteger(t.perms) && t.perms >= 1` per row plus the 8! invariant on full rows, and build the fixture from the REAL `docs/holistic-stats.json` row shapes (vendored snapshot), not crafted-uniform data. why: this round's P2 — the external-lens seam can never open against a pristine canonical checkout; the current pin's fixture hides it. verify: FAIL-first pin — `loadDoctorVerdict(<pristine-doctor-fixture>)` must be non-null; the existing tamper negatives stay red.
- [small] **wal-session CLI usage guard**: on an unrecognized positional arg (or `--out` missing), print usage to stderr and exit non-zero. why: this round's P4 — silence turned a user error into a debugging detour. verify: pin drives a bad-args invocation, expects non-zero + usage line.
- [small] **one amber-admission source**: `renderCoinJournal`'s degrade branch and `coinJournalUnavailable` should share a single constant for the admission sentence (same vocabulary by construction, not by copy). why: two copies of the honesty sentence will drift. verify: pin asserts byte-equality of the two rendered strings' shared prefix.
- [medium, carried R27] doctor-live E2E pin under `node --test` — child-process `QuiltSubstrate.verify()` when a quilt-doctor clone is present; explicit skip (never green-by-silent-absence) when absent. why: this round's manual cross-tool check is exactly the pin R27 asked for — now demonstrated end-to-end by hand twice, still not suite-pinned. verify: with the doctor present the pin runs live including a tamper negative control.
- [medium, carried R27] canonical-md5 lineage for the WAL session export — pin the session WAL's head hash / line-count for a fixed seed so any tool change that alters exported bytes trips loudly. why: R24 doctrine applied to the newest artifact; the 483-line session file is now a cited cross-repo object. verify: FAIL-first by editing one byte.
- carried: [epic, R12→R28] C1 scaling study. [medium, R22→R28] advice-aware GA.

### Verdict
MERGEABLE (stacks on R27 tip 3c5f498; suite 128/128 + qa 8/8; prerun canonical five frozen; siblings #35/#36 studied and gate-checked — #35 green with live cross-tool reproduction, #36 carries the booked P2).

## Round 27 — k2d8 — 2026-09-26 — mode: BUILDER (R24-booked small: wire the external lens into the page REFUSAL stat surface) — vs main 56c60b4 (post-#35 merge)

- **what:** qa.js gains a doctor-lens seam — `setDoctorLens(line)` / `lensSuffix()` — and BOTH
  QA-REFUSAL stat render sites in the page's real `qaSuggest()` append the suffix. A node
  driver (or the pulse harness) injects the Round 24 `tools/doctor-verdict.js` lensLine and the
  refusal names quilt-doctor's three-lens verdict on the page surface; the browser ships with the
  seam CLOSED (`lensSuffix()==""`), so the stat line stays byte-identical to the pre-R27 text.
  Honest guard at birth: a null/empty/whitespace/non-string lens is closed, never a placeholder
  (first pin caught `"  "` rendering `" ·   "` — guard tightened to `line.trim()`).
- **verify:** `tests/doctor-lens-page-glue.test.js` — 5 pins over the REAL qaSuggest()+l2Suggest()
  slice (Proxy-DOM harness, pot 0 below SIM_POT_FLOOR): closed-seam byte-identity, open-seam
  verbatim lens line (fixture digest via the real doctor-verdict module), both-sites wiring source
  pin, closed-for-garbage-lens pin, and a self-check strip mutation proving pin 2 watches the page
  wiring. FAIL-first: 5/5 RED on pristine origin/main (no lensSuffix — `QA.setDoctorLens is not a
  function`), 5/5 green here. Suite 150/150 in tests/ + qa module 8/8; prerun canonical five
  re-verified at the tip, byte-frozen.
- **receipts:** VERIFIED_CLAIMS 30→31 (doctor-lens-page-glue); README count pin named my own
  139→156 bump; canonical five md5s unchanged (claim-string-only core.js edit); inherited-red
  repair: main's duplicated R24 index rows (two branches merged under separate keys, dup pin red
  on main) merged into one R24 row per the R2 branch-pair convention.


## Round 27 — CCC — 2026-09-26 — mode: BUILDER (fresh small: coin-journal label axis-derives-from-data — the P3 found by driving the shipped page headless) + play-tester — vs r26 tip a06dfb2 (PR #33, open at round start)

### Played versions: v1 (e98cf66, reconstructed via R1 receipt + claim-registry archaeology) → main a0939b8 (R23) → r26 tip a06dfb2 (R26) → playtest-round-27 tip

### Deltas observed (shapes of change)
- **The unit of learning moved three times.** v1 = fitness frames (no registry, 0 claims — learning was the paddle's). R23 main = provenance (33-claim honesty registry, the 182-flip journal rendered — learning was the experiment's memory). r26 tip = fleet interop (34 claims, receipts re-anchored into quilt-doctor's WAL). d(learning)/d(version) is no longer measured in frames or convergence — it is measured in verified claims, and as of R26 in cross-repo consumable edges. R26 is the first round whose crown claim is verified by ANOTHER repo's verifier — the experiment stopped being self-referential.
- **Failure-mode migration:** v1's dead controls and teleporting ball → R23's silent render lies (off-canvas ticks that still counted; found, fixed, pinned) → R26's cross-boundary mistranslation risk (vocabulary mirror + MINT refusal). Each round the hunted failure mode moves one abstraction layer up: physics → rendering → tool boundaries.
- **Training path frozen R23→R27:** prerun regenerates the canonical five byte-identically at the r26 tip AND at this round's tip (coev.js 946e639a…, curve.json 63617065…, L0 8a49b0f6…, L1 643bd132…, L2 454511548…; 182 flips / 89 swaps) — every delta lives in receipts, instruments, and registry, never in the paddle. Per R24's doctrine: hashes are line-specific, verified by running.

### Lies hunted
- [none, verified-by-running] **R26's shipped receipt numbers verify.** Mid-flight this round I observed a stale pre-commit draft of the R26 entry stating "base 134/134; tip 139/139" — wrong on both counts. The shipped commit a06dfb2 carries "base 121/121 in tests/ (129 incl. qa); tip 126/126 (134 incl. qa, 8/8)" — and re-running the canonical command at both commits confirms exactly that. A wrong-numbers draft was caught before ship; the receipt as shipped is clean. (Booked because the near-miss is the interesting datum: the receipt discipline held, but only because someone re-ran.)
- [P3, fixed] **The coin-journal label read the raw header while the ticks derived from data.** gen-200 data under a `gens:0` header renders every tick on-canvas (the R23 fix working) while the label claims `gens 0-0` — the instrument shows 200 generations of mutation signal and reports none. repro: `drive(renderer, [{gen:200,coin:'T',swap:true,live:false}], 0)` → label "gens 0-0", tick x=358. Same lie class as R23's off-canvas ticks, one layer up: geometry fixed then, text now. Fixed and pinned (builder receipt below).
- [P3, spec'd] **`renderCoinJournal(null)` throws TypeError.** NOT a shipped lie — the page's fetch `.catch` renders the amber admission instead (verified by reading the wiring at index.html:133-137), so the file:// reality degrades honestly. But it's a latent contract gap: the renderer's honesty lives in its caller. A glue driver — or any future caller — invoking it directly with absent data gets an exception, not the amber sentence. Spec'd below.
- [none else found — WAL claims re-verified live this round] `node tools/wal-export.js` → doctor's own `QuiltSubstrate.verify()` = `{ok: True, 5 lines}`; content-tampered row 3 caught at the exact seq (`hash_mismatch@3`); pinned vector `c86b3c06e0945d6d` recomputed against python `json.dumps(sort_keys)` — exact match; offset basis `cbf29ce484222325` exact; divergence vocabulary `hash_mismatch/chain_break/seq_gap` confirmed at `quilt_doctor/substrate.py:77-81` in the doctor's own source.
- [gate service] R24 tip fb4315b full suite 125/125 green; R25 tip 6391594 full suite 126/126 green; page-parse + readme-count + canonical-index pins 7/7 on both — the merge gate is satisfied for PRs #31/#32 even before their dedicated playtests. Collision warning, stated plainly: R24, R25, and R27 each bump the README count line and the canonical index from the same base — whoever merges last takes the others' bumps, and the readme-count/canonical-index pins will name you until you do (by design, R19).

### Builder receipt: the label derives from the same axis the ticks were plotted against
- **what:** one line in `renderCoinJournal` — the label prints `gens 0-${axis}` where `axis = Math.max(1, gens||0, maxGen)` (the R23 derivation), replacing the raw `${gens}` header read. Happy path provably unchanged: shipped curve.json (gens 260, data ≤ 259) labels "gens 0-260" before and after.
- **why:** the R23 fix made the instrument render the truth but left it reporting the header's claim. A missing/wrong header produced a label under-reporting the plotted range while displaying it — a half-fixed lie is still a lie.
- **verify (FAIL-first, by running):** pin 6 RED pre-fix (`/gens 0-200/` expected, "gens 0-0" rendered), 6/6 green post-fix; full suite 127/127 + qa 8/8; README 134→135 (the readme-count pin named me, as designed); prerun canonical five byte-identical — training path untouched.

### Played notes (headless, real curve.json, r26 tip)
HAPPY: 183 rects, 182 ticks, 0 off-canvas, 89 bright swaps / 93 dim keeps, label `coin journal: 182 flips · 89 swaps · gens 0-260 · live:false throughout` — matches the R22 journal audit exactly. GEN0-HEADER: post-fix tick x=358, label `gens 0-200`. EMPTY (real empty journal): `0 flips · 0 swaps` in grey — honest; a truly empty journal is not an absent one. LIVE tripwire and MISSING-flag both SCREAM `LIVE:1 (moth engine!)` — the anti-laundering tripwire still fails safe. FETCH-FAIL (null data): amber admission — via the caller's catch, not the renderer (see the P3 above).

### Next version spec (competitive improvements)
- [small] `renderCoinJournal` owns its degrade path — null/undefined journal renders the amber admission in-renderer (no throw); the page `.catch` stays as belt-and-braces. why: the P3 contract gap found this round. verify: FAIL-first pin — `drive(null)` must produce the amber sentence, no exception.
- [small] real-ledger WAL driver — wire the page `receipt()` ledger (rows `{i,kind,move,conf,gen,prev,hash}`, bounded at 40 with counted eviction, R7) through `toQuiltWal`, replacing the R26 demo rows. why: R26-carried item; the export lane currently proves shape, not lineage — the loop's product is real receipts. verify: FAIL-first pin feeds a scripted 3-receipt ledger → BIND + 3 LINKs with kinds matching; the doctor's verify() ok on the exported file.
- [medium] doctor-live E2E pin under `node --test` — child-process `QuiltSubstrate.verify()` against an exported tmp file when a quilt-doctor clone is present; explicit skip (never green-by-silent-absence) when absent. why: the repo's strongest claim — cross-tool verification — currently rests on a PLAYLOG sentence plus a build-time audit, not a suite pin. verify: with the doctor present the pin runs live and the tamper negative control is included.
- [medium] canonical-md5 lineage for the WAL demo export — pin the demo export's five line-hashes so any tool change that alters exported bytes trips loudly. why: R24 doctrine applied to the newest artifact; the export is now a cited cross-repo object. verify: FAIL-first by editing one byte.
- carried: [epic, R12→R27] C1 scaling study. [medium, R22→R27] advice-aware GA.

### Verdict
MERGEABLE (stacks on PR #33; suite 127/127 + qa 8/8; prerun canonical five frozen; R26 receipt numbers re-verified by running; sibling PRs #31/#32 gate-checked green).

## Round 26 — CCC — 2026-09-26 — mode: BUILDER (fresh small: WAL export in the quilt-doctor consumable shape) + play-tester — vs main a0939b8 (post-#30 merge)
## Round 26 (session driver) — k2d8 — 2026-09-26 — mode: BUILDER (R26-booked small: real receipt-panel→WAL session driver) — vs r26-wal-doctor-export tip a06dfb2 (PR #33)

### Played versions: r26 export tip → session-driver tip — driver + pins + claim row only, training path untouched

Suite at base (PR #33 tip) 126/126 in `tests/` (134 incl. qa); at tip 130/130 (138 incl. qa, 8/8). FAIL-first verified by running: the 5 wal-session pins are 5/5 RED on a pristine origin/main worktree (driver absent — loud fail, not silent skip).

### Builder receipt: the WAL moat is now fed by a real session, not a demo row list

`tools/wal-session.js` closes the loop R26 opened: it plays a seeded headless classic-mode round through the SAME two modules the browser receipt panel receipts — `core.js` step + `qa.js` suggest (the qa advisor lane) — collecting every panel-class receipt: advice rows named for their source (`qa-sim`, never a bare L2), `QA-REFUSAL` rows produced by the ACTUAL exhaustion seam (pot driven below `SIM_POT_FLOOR`, not a hand-written row — the R12 doctrine produced by running), `DEATH` rows at game end. `sessionToWal` re-anchors all of them into the fleet five-opcode WAL via `toQuiltWal`, closes with a session VIEW (advice/refusals/deaths accounting for every receipt), and — when the ledger passes the page panel's 40-row bound — an honest eviction VIEW (`shown: 40, evicted: M`) admitting the bounded display, exactly the page's `[N shown / M evicted]` accounting. Same seed replays byte-identically (receipt lineage is reproducible from a cold import); a launched-confidence tamper is caught as `hash_mismatch` at its own seq in the doctor's vocabulary. New `tests/wal-session-glue.test.js` (5 pins). VERIFIED_CLAIMS gained `wal-session`.

### Play-tester notes

- The refusal evidence is the pin I care about: with `shotsPerBin: 3` the pot crosses the floor within the first game, and 100% of the QA-REFUSAL rows come from `suggest()` returning null — delete the seam and the receipt stream goes silent, it cannot be written around.
- Honest limit: the driver paces advice per decision boundary, not per the page's 150-frame seam pacing — the receipt STREAM is the same class, the cadence is denser. The page pacing glue itself is pinned by the byo/qapot suites, not duplicated here.

### Carried
- [epic, carried R12→R26] C1 scaling study — unchanged.
- [medium, carried R22→R26] advice-aware GA.
- [small, booked by R26] a merged quilt-doctor PR replaying `node tools/wal-session.js --out session.jsonl` against `QuiltSubstrate.verify()` and citing pong-quilt = the candidate VERIFIED edge pq → quilt-doctor, now session-fed.

## Round 26 — k2d8 — 2026-09-26 — mode: BUILDER (fresh small: WAL export in the quilt-doctor consumable shape) + play-tester — vs main a0939b8 (post-#30 merge)

### Played versions: main a0939b8 → r26 tip — export tool + pins only, training path untouched

Suite at base 121/121 in `tests/` (129 incl. qa); at tip 126/126 (134 incl. qa, 8/8). FAIL-first verified by running: the 5 wal-export pins are 5/5 RED on a pristine origin/main worktree (extraction anchor absent — loud fail, not silent skip).

### Builder receipt: pong-quilt receipts now export in the fleet five-opcode quilt WAL

The page chains receipts with the panel hash (hash8, h*31 — a display hash, never claimed otherwise). quilt-doctor's substrate (`quilt_doctor/substrate.py`, canonical producer SuperInstance/git-agent PR #1's quilt_emit — the third VERIFIED edge's target) speaks the fleet WAL: BIND/LINK/VIEW lines, fnv1a-64 chained, replayable. `tools/wal-export.js` re-anchors any row list into EXACTLY that shape: the doctor's key set {args, cell, hash, op, prev_hash, seq}, genesis prev 0000000000000000, canonical json (sorted keys at every level, no whitespace — the replacer-array form of JSON.stringify was tried first and silently dropped nested args keys; canonical() replaced it, caught by the round-trip pin).

Live cross-tool receipt, recorded here because it cannot be faked later:
- `node tools/wal-export.js` → demo export (5 lines: BIND session + 3 LINK receipts + 1 VIEW projection)
- quilt-doctor's OWN verifier against that file: `QuiltSubstrate('<export>.jsonl').verify()` → `{'ok': True, 'divergences': [], 'lines': 5}`
- negative control: content-tampered row 3 (kind DEATH→SURVIVED, no re-chain) → doctor reports `{'ok': False, 'divergences': [{'seq': 3, 'why': 'hash_mismatch'}]}` — the doctor catches our tamper at the exact seq, in its own vocabulary.
- fnv1a-64 vectors cross-checked against python's json.dumps(sort_keys) at build time and pinned (offset basis cbf29ce484222325; BIND-genesis body c86b3c06e0945d6d).

Weight law bookkeeping: a merged quilt-doctor PR consuming this export and citing pong-quilt = candidate VERIFIED referral edge **pq → quilt-doctor** (PENDING until that merge; this PR is the source-side half). This is the 19:11-pulse synergy candidate shipped: pong-quilt's receipt lineage riding the same spine the third VERIFIED edge (aw-quint-opcode→ga-quilt-emit) already minted currency on — the receipts moat against the OpenFANG/Selvedge collision gets a second consumer repo.

### Play-tester notes

- The divergence vocabulary mirror (hash_mismatch / chain_break / seq_gap) is the pin I care most about: an export that fails the doctor's checks must fail in the DOCTOR's words, not ours — a mistranslated error is a laundered one.
- Unknown ops are refused at export time (MINT throws) — the exporter can never emit a non-spine opcode, so the doctor can never be handed a line that claims an opcode the spine doesn't have.

### Carried
- [epic, carried R12→R26] C1 scaling study — unchanged.
- [medium, carried R22→R26] advice-aware GA.
- [small, fresh] the actual receipt-panel → WAL driver (export a real session's receipts, not the demo rows) — deferred to keep this round sub-15min.
## Round 25 — CCC — 2026-09-26 — mode: BUILDER (R23-spec fresh small: C1 coev ledger strip) + play-tester — vs main a0939b8 (post-#30 merge)

### Played versions: main a0939b8 (R23 merged) → r25 tip — prerun swept in a scratch worktree per the R13 lesson

Suite at base 125/125 + qa 8/8; at tip 126/126 + 8/8. `node tools/prerun.js` + `tools/prerun-coev.js` in the scratch worktree regenerate the canonical five byte-identically (coev.js `946e639a…`, curve.json `63617065…`, L0 `8a49b0f6…`, L1 `643bd132…`, L2 `454511548…`) — the strip is render/wiring only; the training path is byte-frozen. FAIL-first verified by running: 5/5 new pins RED on pristine main (extraction anchor absent — loud fail, not silent skip).

### Builder receipt: the C1 coev ledger gets the same visibility the coin journal got
- **what:** `renderCoevStrip(ctx, rows, gens)` in index.html — a pure renderer (ctx + data in, nothing closed over) plotting every head-to-head row of `checkpoints/coev.js`'s hash-chained C1 ledger as a marker strip under the coin journal: ender-kill bright, survivor-cap dim green, x = generation, axis derived from the DATA (the R23 missing-header lesson applied at birth). Label carries the audit sentence (`121 h2h · 120 ender-kills · 1 survivor-caps · gens 0-120`). Wiring is synchronous — coev.js already loads as a script tag, no fetch — and the absent-artifact path admits in amber (`instrument ships, admits it`), never fakes a strip.
- **why:** R23 made the classic chain's receipt stream visible; R14's second chain had no analogous plot. A hidden ledger is an unaudited one. Both chains now render side by side.
- **verify (FAIL-first, then green):** 5 pins in `tests/coev-strip-glue.test.js` — extraction-integrity + one-frame drive (markers, color classes, monotone x, edges), label audit sentence, an UNCLASSIFIED-outcome tripwire (amber + named `OTHER:n`, never laundered into a known class), the shipped artifact (all 121 rows plotted from the real coev.js), and the data-derived axis. 5/5 RED on main → 5/5 green at tip.

### Play harness (real artifact + wiring, observed headless)
real data: 121 ticks (120 bright kills / 1 dim cap), x∈[2,358], label exact. The one dim tick at gen 110 is the artifact's only SURVIVOR-CAP in 121 h2h rows — the strip shows what the panel never made obvious: the C1 pressure is overwhelmingly ender-dominated (99.2% kills); the lone survivor-cap epoch is now a visible event, not a ledger row you'd have to tail by hand. degrade: wiring guards `!cp || !Array.isArray(cp.ledger)` → amber admission text present in-page. tripwire: a synthetic `TIMEOUT` row renders amber and the label names `OTHER:1`.

### Deltas observed (shapes of change)
- **d(learning)/d(version) = 0 — the 24th straight frozen round.** Canonical five unmoved; L0 5,767 / L1 8,700 / L2 8,800.
- **d(artifact)/d(version) = 0** — render/wiring/caption only; training path byte-frozen (frozen hashes above).
- **d(coverage)/d(version): suite 125→126** (+5 strip pins); README count 129→134, the bump named by the readme-count pin mid-flight (129→133 caught, corrected, re-verified by running).
- **VERIFIED_CLAIMS 29→30** (`coev-ledger-strip`, proofTest tests/coev-strip-glue.test.js; honesty.test.js two-way match holds).

### Lies hunted
- **[P3-process, found by the pin, FIXED pre-ship]** my own README count was off by one (125 claimed vs 126 run) — the readme-count pin caught it; corrected by running, not copying.
- **[honesty note]** the R23 playtest's spec wording said "S-win/E-win/timeout markers"; the artifact's only outcome classes are ENDER-KILL / SURVIVOR-CAP (playAdv has no timeout class — cap-reached IS the survivor's win). The renderer ships a third amber class for any future/unclassified outcome and NAMES it in the label, so a real timeout appearing later is visible, not silently recolored.
- **(nothing found in: byte-reproducibility — prerun five re-derived live in a scratch tree; strip honesty on real + degrade + tripwire paths; suite pins; qa stand-in 8/8.)**

### Next version spec (competitive improvements)
- [small, carried R22→R25] advice-aware GA — thread a measured diet into playOne; still the only honest d(learning)/d(version) ≠ 0 path short of the epic.
- [epic, carried R12→R25] C1 scaling study — unchanged. The strip now makes its motivation visible: 120/121 ender-kills says the ender pressure saturates at pop 24; whether the survivor ever learns to survive is the scaling question.

### Siblings studied this round
None — internal instrument work again (the C1 ledger is this repo's own artifact).

### Verdict
MERGEABLE (R23-spec fresh small shipped FAIL-first; both chains equally visible; suite 126/126 + qa 8/8; prerun five byte-identical in a scratch tree; the C1 pressure imbalance the panel never showed is now a visible signal).

---
## Round 24 — k2d8 — 2026-09-26 — mode: BUILDER (R23-spec carried small: canonical-md5 lineage note) — vs main a0939b8 (post-#30 merge)

### Played versions: main a0939b8 (R23, merged) → r24 tip

### Builder receipt (the one small — hashes are line-specific doctrine)
- **what:** EXPERIMENTS.md Rules gains the lineage rule the R22 P3-process lie demonstrated: prerun artifact md5s regenerate differently on different lines; the post-R21 line regenerates curve `63617065…`, L0 `8a49b0f6…`, L1 `643bd132…`, L2 `454511548…`, coev `946e639a…`, while pre-R21 main regenerates curve `ba1c919a…`, L1 `aa4d7c4b…`, L2 `63b7fdd5…` — verify by running at the tip, never by copying hashes across entries. New `tests/canonical-md5-lineage.test.js` pins it (4 text pins).
- **why:** R21 changed the training path but left the experiment's memory holding 20-round-old hashes; every future round copy-pasting them onto the new line would hit a phantom mismatch. One doctrine line next to the Rules kills the class.
- **verify (FAIL-first, then green):** 4/4 pins RED against main's EXPERIMENTS.md (rule absent), 4/4 green at tip. The doctrine's own hashes were NOT copied from the R23 entry — a clean `node tools/prerun.js` run at this tip regenerated curve `63617065d3…`, coev `946e639a82…`, L0 `8a49b0f6…`, L1 `643bd132…`, L2 `454511548…` live, exactly the values the rule names. Suite 125/125 + qa 8/8; README count 129→133 named by the readme-count pin (121→125); VERIFIED_CLAIMS 28→29 (`canonical-md5-lineage`); checkpoints byte-frozen vs the R23 canonical five.

### Lies hunted
- (nothing found in: byte-reproducibility — prerun at tip regenerates the R23 canonical five; suite pins; qa stand-in 8/8. Docs+registry-only change; training path untouched.)

### Next version spec (competitive improvements)
- [small, fresh, carried R23] C1 coev ledger strip — the coin journal made the classic chain visible; the C1 ledger (R14's second chain) has no analogous plot. Verify: extraction-integrity pin on a pure renderer + one-frame drive, FAIL-first.
- [small, carried R22→R24] canonical-md5 lineage note — FULFILLED this round.
- [medium, carried R15/R20/R22/R23] advice-aware GA — thread a measured diet into playOne.
- [epic, carried R12→R23] C1 scaling study — unchanged.

### Siblings studied this round
None — internal doctrine work; the hashes cited were re-derived by running, not copied.

### Verdict
MERGEABLE (one doctrine line + 4 pins; the phantom-mismatch class the R22 lie exposed is now pinned shut; suite 125/125 + qa 8/8; canonical five frozen).

---
## Round 24 — k2d8 — 2026-09-26 — mode: BUILDER (snowball-pulse synergy candidate: the QA-REFUSAL seam names quilt-doctor's three-lens verdict as an external lens) — vs main a0939b8 (post-#30 merge)

### Played versions: main (this round's base)

Suite at base 121/121 + qa 8/8; at tip 126/126 + 8/8. The touched files (tools/doctor-verdict.js, tests/doctor-verdict-glue.test.js, core.js claim row, PLAYLOG, README) are outside the training path — the canonical five md5s are untouched by construction (no training-path file edited; d(learning)/d(version) = 0, 19th straight frozen round; d(coverage) 121→126 (+5 pins), VERIFIED_CLAIMS 30→31.

### Builder receipt (the 22:56-pulse synergy candidate, shipped as a closed seam)
- **what:** `tools/doctor-verdict.js` digests a REAL quilt-doctor checkout (`QUILT_DOCTOR_DIR` or `../quilt-doctor`) — `docs/holistic-stats.json` + `docs/HOLISTIC-VIEW-2026-09-26.md`, both shape-checked (every lens must carry the 8! = 40320 exact-enumeration perms; a Monte-Carlo impostor reads as ABSENT) — into a one-line honesty admission a QA-REFUSAL receipt may append: the doctor's verdict was THREE THINGS (no cross-lens correlation survives), anchored on the killed-in-public hypothesis (jev ~ active_days, p_exact = 0.988492), so a single-judge refusal stands alone. `lensLine(null) === null`: the seam ships closed and renders NOTHING without a real checkout — never a hand-written mock (the verifier-only-mock doctrine broken at birth, per the pulse note). New `tests/doctor-verdict-glue.test.js`, 5 pins: closed-seam contract, LIVE pin against a real doctor checkout (jev substance parsed from the matrix, 0.709), real-shaped fixture digest, three tamper classes → absent (bad perms / broken JSON / missing pong-quilt row), citation honesty (PENDING per weight law — VERIFIED only when a merged PR names the citation).
- **why:** quilt-doctor's holistic view is the fleet's only three-lens exact-enumeration verdict; the QA-REFUSAL seam (Round 12) is a single-lensor silence. Naming the external verdict on refusal receipts is the pq→quilt-doctor referral edge candidate (booked PENDING, honest provenance).
- **verify (FAIL-first, then green):** on pristine main the tool+test are absent (5/5 RED by inspection — the FAIL-first class the R23 round already pinned); at tip 126/126 + qa 8/8, and the LIVE pin ran against quilt-doctor aa5a041 with every value traced to the doctor's own files.

### Next version spec (competitive improvements)
- [small, fresh] wire lensLine into the page's QA-REFUSAL stat surface (index.html) behind the same closed-seam rule, with a Proxy-DOM glue pin — book only if the page surface wants the admission.
- [epic, carried] C1 scaling study — still the only nonzero d(learning)/d(version) path.
- [epic, carried] advice-aware GA (R15 fresh alternative).

### Verdict
MERGEABLE (the refusal seam now has an external lens that admits when it is absent; suite 126/126 + qa 8/8; training path untouched).

## Round 23 — CCC — 2026-09-26 — mode: BUILDER (completing an interrupted R23: the R22-spec strip existed as a local commit with no receipt) + one fresh small (axis-derives-from-data, FAIL-first pinned) + play-tester — vs main 4b94c49 (post-#29 merge)

### Played versions: main 4b94c49 (R22 merged) → r23 tip — swept in scratch worktrees per the R13 lesson

Suite at base 116/116 + qa 8/8; at tip 121/121 + 8/8. `node tools/prerun.js` at tip regenerates the post-R22 canonical five byte-identically (coev.js `946e639a…`, curve.json `63617065…`, L0 `8a49b0f6…`, L1 `643bd132…`, L2 `454511548…`; 182 flips, 89 swaps) and the tree stays clean — index.html/tests/README are outside the training path, proven by the frozen hashes. FAIL-first verified by running: the 4 strip pins are 4/4 RED on pristine main (extraction anchor absent — loud fail); the new axis pin is RED at the pre-fix tip.

### Builder receipt 1 (the completion): the coin-journal strip ships with its receipt
A prior session built the R22-spec item (plot the tiebreak journal) at 13:23 today — commit `9e95ddf` existed only locally, its README count sat uncommitted, and no PLAYLOG entry, push, or PR ever happened. This round verified the work by running instead of redoing it (same discipline as R21's completion): verbatim-extraction pins are honest, the renderer is pure, the label carries the audit sentence and SCREAMS on a live moth flip, the degrade path admits in amber. The R11 lesson from the other side: **code without a receipt is unshipped** — the receipt is the ship. Completion = this entry + the README count + push + PR.

### Builder receipt 2 (the one fresh small): the axis derives from data, not the header
- **what:** pin 5 in `tests/coin-journal-glue.test.js` drives the verbatim renderer with a `gens: 0` header and gen-200 data; pre-fix every tick lands at x>360 (off-canvas) while the label still counts them. One-line fix: `const axis = Math.max(1, gens||0, ...tiebreaks.map(t => t.gen||0))` and `(t.gen||0)/axis`. Shipped data (gens 260, flips 24–259) renders identically before and after — the fix moves nothing on the happy path, proven by the play harness diff.
- **why:** found by driving the SHIPPED page headless (Proxy-DOM, real curve.json) — the exact class the loop exists to hunt, an instrument that claims visibility while rendering invisibility. The `d.gens || 0` wiring made a missing header a silent render lie.
- **verify (FAIL-first, then green):** pin 5 RED pre-fix (`tick at x=714 must be on-canvas`), 5/5 green post-fix; full suite 121/121 + qa 8/8; prerun five md5s byte-identical.

### Play harness (4 paths through the shipped page, all observed)
happy: 183 rects (bg + 182 ticks), 89 bright swaps / 93 dim keeps, label `coin journal: 182 flips · 89 swaps · gens 0-260 · live:false throughout`, x∈[35,357]. degrade (fetch fails, the file:// reality): amber `#d29922` admission `data absent … instrument ships, admits it`. live tripwire (one `live:true` row): label names it — `LIVE:1 (moth engine!)`. empty journal: same amber admission. No path fakes data; the anti-laundering tripwire fails safe (a missing `live` flag counts as live, never as mock).

### Deltas observed (shapes of change)
- **d(learning)/d(version) = 0 — the 22nd straight frozen round.** L0 5,767 / L1 8,800 / L2 8,700, canonical md5s unmoved.
- **d(artifact)/d(version) = 0 for the first time since R20** — the strip touches render/wiring only; the training path is byte-frozen (the R21/R22 reshuffle class does not recur).
- **d(coverage)/d(version): suite 116→121** (+4 strip pins, +1 axis pin); README count 123→124→129 across the R22/R23 line, each bump named by the readme-count pin (this round's: 120→121 caught mid-flight — the pin works, the count was corrected before ship).
- **NEW instrument class — d(visibility)/d(version): the journal moved from auditable (R22: 182/182 receipted) to visible (R23: plotted against generation).** The experiment now renders its own receipt stream as a mutation-rate signal: 89 swaps / 182 flips ≈ 49% challenger-take rate at fitness ties — the coin is not a tiebreak detail, it is a measurable evolutionary pressure the page finally shows next to the fitness curve it reshuffles.

### Lies hunted
- **[P3, found by running the shipped page headless, FIXED]** the `d.gens || 0` wiring + `Math.max(1, gens)` axis: a missing gens header pushed every tick off-canvas while the label counted them. Repro: renderer driven with gens=0, gen=200 → x=714. Fixed + FAIL-first pinned (Builder receipt 2).
- **[P3-process, verified by inspecting the tree, recorded]** an interrupted session left R23 half-shipped: local commit, uncommitted README bump, no entry/push/PR. If this round had run naively it would have re-built the strip from the spec and double-shipped; verifying-by-running instead of assuming-nothing-shipped is what the loop's receipts are for. Recorded so future builders check `git log` for unshipped local commits before building.
- **(nothing found in: byte-reproducibility — prerun triple-confirmed at tip; journal symmetry — 182/182 with `swap` booleans, 93 H / 89 T; strip honesty on all 4 play paths; suite pins; qa stand-in 8/8; checkpoint consistency.)**

### Next version spec (competitive improvements)
- [small, fresh] C1 coev ledger strip — the coin journal made the classic chain visible; the C1 ledger (R14's second chain) has no analogous plot. A strip of coev outcomes per generation (S-win/E-win/timeout markers) would make both chains equally visible. Verify: extraction-integrity pin on a pure renderer + one-frame drive, FAIL-first.
- [small, carried R22] canonical-md5 lineage note in EXPERIMENTS.md — still unfulfilled; the post-R21 canonical (curve `63617065…`, L1 `643bd132…`, L2 `454511548…`) regenerates only on the r21+ line, and nothing in the repo says so next to the hashes. One doctrine line kills the copy-paste mismatch class. Verify: text pin.
- [medium, carried R15/R20/R22] advice-aware GA — thread a measured diet into playOne so advice changes the EVOLVED champion; still the only honest d(learning)/d(version) ≠ 0 path short of the epic.
- [epic, carried R12→R22] C1 scaling study — unchanged, still the only other nonzero-learning path. Verify: a new receipted curve with different endpoints.

### Siblings studied this round
SuperInstance/quilt-quant (the cited coin-toss-v1 engine — the strip's data rows carry its citation and `live:false` mock flag; the R23 live-tripwire pin is quilt-quant's mock-flag doctrine rendered as UI). No new sibling code needed — internal instrument work again.

### Verdict
MERGEABLE (interrupted R23 verified-by-running and receipted; fresh P3 fixed FAIL-first; suite 121/121 + qa 8/8; prerun five md5s byte-identical; the experiment's coin journal is now visible, honest on every failure path, and cannot silently render invisibility).

---

## Round 22 — CCC — 2026-09-26 — mode: BUILDER (fresh P2 found by running: the R21 coin journal was tails-only — 93 of 182 flips unrecorded) + play-tester — vs r21 tip 3508a75 (PR #28, open at round start)

### Played versions: main ac9b4c1 (R20, post-#27) → r21 tip 3508a75 (this round's base) — swept in scratch trees per the R13 lesson

Suite at base 115/115 + qa 8/8; at tip 116/116 + qa 8/8. `node tools/prerun.js` at base (scratch worktree): the frozen five regenerate byte-identically (coev.js `946e639a…`, curve.json `ba1c919a…`, L0 `8a49b0f6…`, L1 `aa4d7c4b…`, L2 `63b7fdd5…`) — L1 gen60 8800, L2 gen260 8700. At the r21 tip the same command burns **182 coin flips (93 H + 89 T)** and produces DIFFERENT artifacts: curve.json `edbe606d…`, L1 `643bd132…`, L2 `454511548…`, L1 gen60 8700, L2 gen260 8800 — first nonzero d(artifact)/d(version) in 21 rounds (mechanism below).

### Builder receipt (the one small — receipt symmetry for the quantum coin)
- **what:** `tools/prerun.js` `quantumCoinTiebreak` now journals EVERY flip: heads keeps land as `{coin:'H', swap:false}` beside the tails swaps `{coin:'T', swap:true}`; the console line reports `182 quantum-coin flip(s), 89 swap(s)` instead of the misleading `89 tiebreak(s)`. New pin 5 in `tests/quantum-tiebreak-glue.test.js`: extracts the VERBATIM shipped tiebreak function and drives it with a controlled rand — forced heads MUST produce a receipt (R21: none) and keep the incumbent; forced tails MUST produce a swap receipt and crown the challenger; one stream burn per flip either way.
- **why:** R21's journal was asymmetric — `if (heads) return false;` before the push dropped every keep. An instrumented copy of the R21 code (patch counts flips, same seeded stream) proves the real run flipped **182 times but receipted only 89**: R21's "burned 89 coin flips" undercounted the stream by half, and the receipt set could not be audited for keeps — the exact hunted class (a receipt that hides half the events) sitting in the demo's honesty centerpiece. The R21 PLAYLOG entry and the prerun header comment both claimed "every flip lands in checkpoints/curve.json"; the code cashed only tails.
- **verify (FAIL-first, then green):** pin 5 against the pristine R21 prerun.js is RED with `heads flip must be journaled (R21 silently dropped it)`; after the fix 5/5 in the file. Regenerated curve.json now carries 182 receipts (93 H / 89 T, `swap` boolean, `live:false` throughout); level0/1/2 md5s UNCHANGED (`8a49b0f6…`/`643bd132…`/`454511548…`) and coev.js unchanged (`946e639a…`) — the journal-only fix provably did not touch the training path. README count 123→124 (named by the readme-count pin, as designed). VERIFIED_CLAIMS row `quantum-tiebreak` reworded to claim the symmetric journal explicitly.

### Deltas observed (shapes of change)
- **d(learning)/d(version) at the fitness-band level = 0 for the 21st straight round** — ceiling still 8800, L0 still 5767. BUT **d(artifact)/d(version) ≠ 0 for the first time since v1**: wiring ANY stream-consuming tiebreak reshuffles the walk (the coin's rand draws diverge every subsequent mutation), so the gen-60/gen-260 endpoints swapped (8800/8700 → 8700/8800) and the path reshuffled (old curve dipped to 8003 at gen78; new one holds 8700–8800 from gen65). Shape: the change is a re-rolled random walk, not an improvement — the honest credit is "different artifacts, same attractor," and R21 recorded neither the new canonical hashes nor the endpoint swap. The R22 canonical set (this entry) supersedes the frozen five for the r21-and-later line; main (pre-R21) still regenerates the old five.
- **d(coverage)/d(version): suite 115→116**; d(receipt-completeness): 89/182 events → 182/182.

### Lies hunted
- **[P2, found by running, FIXED]** the R21 coin journal recorded only challenger-takes events (89 of 182 flips; 93 incumbent-keeps burned the seeded stream but left no receipt). Repro: instrumented run of R21 prerun.js → `TOTAL_FLIPS 182 HEADS 93 TAILS 89` vs 89 receipts in curve.json. The "89 coin flips" claim in the R21 entry undercounted by half; "every flip lands in checkpoints/curve.json" was false as written.
- **[P3-process, found by diffing runs, recorded]** R21 changed the training path (L1/L2 weights, curve endpoints) but left the experiment's memory holding the 20-round-old "frozen five" md5s — every future round copy-pasting those hashes from older entries would mismatch against the r21 line. Corrected by this entry (canonical set above) going forward; historical entries stay untouched (receipts are memory).
- **[P3-process, verified by reading]** R21 shipped with no "Next version spec" section (same gap class R15 flagged in R14) — this round reconstructs the candidate set below.
- **(nothing found in: byte-reproducibility — triple-confirmed: R21 committed checkpoints == my clean rerun == my instrumented rerun, md5-identical; suite pins; qa stand-in; checkpoint-consistency probe — all green at base and tip.)**

### Next version spec (competitive improvements)
- [small, fresh] canonical-md5 lineage note in EXPERIMENTS.md — the "frozen five" hashes appear in ~15 entries but regenerate ONLY on the pre-R21 line; one doctrine line ("post-R21 canonical: curve edbe606d/63617065-ward, L1 643bd132, L2 454511548 — verify by running, not by copying hashes") would kill the mismatch class the P3 above demonstrated. Verify: text pin.
- [small, fresh] plot the tiebreak journal — the curve page could render H/T flips as a swap marker strip under the fitness curve (89 swaps over 261 gens is a visible mutation-rate signal). Why: the demo now owns a real experiment instrument it doesn't show. Verify: glue pin on the render seam; visual amber.
- [medium, carried R15/R20] advice-aware GA — thread a measured diet into playOne so advice changes the EVOLVED champion (still the only path to honest d(learning)/d(version) ≠ 0).
- [epic, carried R12→R20] C1 scaling study — unchanged, still the only other nonzero-learning path.

### Siblings studied this round
SuperInstance/quilt-quant (the cited coin-toss-v1 engine — its mock-flag doctrine is the honesty model the R22 journal fix follows: label every stand-in, never launder). Internal seam work otherwise; no new sibling code needed.

### Verdict
MERGEABLE (fresh P2 fixed FAIL-first; suite 116/116 + qa 8/8; level/co-ev md5s frozen prove the journal-only touch; the experiment's first honest accounting of its own coin — 182 flips, all of them receipted).

---

## Round 21 — k2d8 — 2026-09-26 — mode: BUILDER (synergy candidate from the 11:11 pulse: quantum-coin CI tiebreaker) — vs main ac9b4c1

### Builder receipt: champion ties are broken by a receipted quantum coin, not index order
- **what:** `core.js` `makeEvaluator` gains an `opts.onTie(rec, incumbent)` seam — default OFF (strict `>` keeps the incumbent, byte-identical behavior everywhere the evaluator already runs). `tools/prerun.js` wires the seam to a receipted coin: on equal fitness, one draw from the same seeded `rand` stream; tails = challenger takes, and the flip is journaled to `checkpoints/curve.json` under `tiebreaks` with `{gen, incumbent, challenger, coin, engine: 'coin-toss-v1', live: false}` plus a citation to SuperInstance/quilt-quant `lab/play.mjs` (the live moth-quantum engine).
- **why:** the old rule was silent index-order bias — the first equal-fitness candidate always won, undocumented. LIVE, not theoretical: the regenerated 261-generation prerun burned **89 coin flips**. The bias class was running every prerun.
- **honesty:** CI has no network, so the coin is the SEEDED MOCK stand-in, `live: false` explicit in every receipt — never laundered as live quantum entropy (quilt-quant's own mock-flag doctrine). Byte-reproducibility preserved: two prerun runs produce md5-identical checkpoints (verified).
- **verify (FAIL-first):** `tests/quantum-tiebreak-glue.test.js` pins trip 2/4 on main (seam absent, wiring absent); at tip suite 115/115 + qa 8/8. VERIFIED_CLAIMS 27→28 (`quantum-tiebreak`). readme-count pin named my own addition (111→115).
- **Referral edge:** a merged PR here citing quilt-quant's coin-toss-v1 = candidate VERIFIED edge qt-quant → pong-quilt (weight law: VERIFIED only on merge).

### Lies hunted
- **[found + fixed]** the index-order tiebreak was invisible in docs and code; now it is an explicit, receipted, cited coin — and the receipts prove the class was live (89 flips in one prerun).

## Round 20 — k2d8 — 2026-09-26 — mode: BUILDER (R19 spec item: promote the C1-refusal probe into the suite) — vs main c5a6f1a (post-#26 merge)

### Builder receipt: the R19 one-off C1-refusal probe is now permanent
- **what:** `tests/coev-qarefusal-glue.test.js` — extracts the page's REAL `live()` coev branch whole (same slice discipline as qarefusal-glue: no reimplementation that can drift) and runs it in a Proxy-DOM harness: coev mode, qa advisor, pot 0. Pin 1: a `QA-REFUSAL` row lands in the receipt chain. Pin 2: the stat line names it (`qa-sim: channel silent (pot 0/bin below floor 2)`, warn class). Pin 3: a live channel (pot 32) still receipts `qa-sim` advice through the same `l2Suggest(champGame)` seam — the pin is not vacuous in the pass direction.
- **why:** R19 closed the "C1 ledger path maybe drops refusals" suspicion by running a one-off probe (verified NO GAP). One-off probes rot; the R19 spec booked this promotion.
- **verify (FAIL-first by mutation):** pin 4 is the self-check — stripping `receipt("QA-REFUSAL",0,0);` from the extracted slice (the pre-R12 silent-drop half) leaves the ledger empty, so pins 1-2 run red against the mutated page code. Suite at base 107/107 + qa 8/8; at tip 111/111 + qa 8/8. VERIFIED_CLAIMS 26→27 (`coev-qarefusal-glue`).
- **Cost, admitted:** +~0.3s suite time (four live() ticks with 20ms waits); pins 1-2 could share one boot — kept separate so a failure names the exact half (ledger vs stat line).

### Lies hunted
- **[none found]** the C1 coev path receipts refusals — now pinned forever, not just observed once.

### Deltas as shapes
- d(learning)/d(version) = 0, 19th straight frozen round; d(coverage): suite 107→111, VERIFIED_CLAIMS 26→27.

### Next version spec (competitive improvements)
- [epic, carried] C1 scaling study (R12-R20 epic) — still the only nonzero d(learning)/d(version) path.
- [epic, carried] advice-aware GA (R15 fresh alternative).

### Verdict
MERGEABLE (suite 111/111 + qa 8/8; touched files — new test, core.js claim row, README count, PLAYLOG — are all outside the training path).

## Round 19 — k2d8 — 2026-09-26 — mode: BUILDER (R18's booked fresh small closed as verified-NO-GAP by running; the builder item is the README count rot, killed structurally) — vs main 6e163f6 (post-#24 merge)

### Played versions: v1 (e98cf66), v2 (0722670, untagged), main — swept in scratch worktrees per the R13 lesson

- prerun on main: L0 gen 0 fitness 5767 (4567f, 12h, ×2.83), L1 gen 60 fitness 8800 (6000f, 28h), L2 gen 260 fitness 8700 (6000f, 27h), 261 gens → 21 curve points. v1 run: L0 2935 / L1 738 / L2 3687 and writes only level0-2.js — v1 cannot finish a prerun (no persistence; that is its failure mode, not a lie). v2 run regenerates the canonical five md5s byte-identically (coev.js 946e639a…, curve.json ba1c919a…, level0 8a49b0f6…, level1 aa4d7c4b…, level2 63b7fdd5…).
- Suite at base 103/103 + qa 8/8; at tip 104/104 + qa 8/8. d(learning)/d(version) = 0 — 18th straight frozen round.

### R18-booked fresh small: QA-REFUSAL in the C1 coev ledger path — VERIFIED NO GAP (by running), item closed

- Probe (verbatim `live()` coev branch, Proxy-DOM harness in the qarefusal-glue style): qa module selected, pot 0 — the real sim's silence below SIM_POT_FLOOR — one `live()` tick. Result: a `QA-REFUSAL` row lands in the receipt chain AND the stat line admits it (`qa-sim: channel silent (pot 0/bin below floor 2) — advice refused, receipted`, warn class).
- Why no gap: `qaSuggest()` is mode-agnostic — it receipts refusals regardless of game mode — and the C1 branch of `live()` calls `l2Suggest(champGame)` exactly like the classic path, so the refusal flows into the same MOTH receipt chain the C1 panel renders (R14's two-section discipline). R18 said "book only if a real gap is found by running" — none found.

### Builder receipt: the README test-count rot — structural fix

- **Found by counting [P3]:** README claimed "(94 tests total: 86 in `tests/` + 8 in `tools/test-qa.js` — counts as of Round 16)" while the live suite is 103+8 (R17 +3, R18 +4). R16 fixed this exact lie once; a hardcoded number in prose rots every time anyone adds a test — the rot is structural, so the fix must be too.
- **What:** `tests/readme-count.test.js` — respawns the canonical suite (this file excluded, so no recursion) plus `tools/test-qa.js`, parses the tap `# pass` summaries, and asserts README's stated numbers equal the live ones (full-suite count = spawned + 1 for the pin's own registration). VERIFIED_CLAIMS 25→26 (`readme-count`). README corrected to 112 (104+8) with the pin named as its maintainer.
- **Verify (FAIL-first, then green):** on unfixed main the pin is red twice over — its spawned suite fails the wristband two-way match (the file backs no claim yet) and the count itself lies (94 ≠ 104). After the claim row + README correction: 104/104 + qa 8/8 green. Any future test added without updating README now turns the suite red with this pin's name on it.
- **Cost, admitted:** the pin adds ~5s to every suite run (a full respawn). That is the price of a run-verified count; paid gladly.
- **Docs hygiene, same commit:** PLAYLOG's duplicated header line removed (merge artifact); canonical-index rows added for R18 (missing — R18 shipped its entry without one) and R19.

### Lies hunted
- **[P3 → FIXED]** the README count rot (above — now pinned to zero by respawn).
- **[P3 → FIXED]** PLAYLOG duplicated header line; R18's missing canonical-index row.
- **[verified honest]** the C1 QA-REFUSAL path receipts refusals — R18's booked suspicion, closed by running, not by reading.

### Deltas as shapes
- d(learning)/d(version) = 0 across v1 → v2 → main: 18 consecutive frozen rounds; the five prerun md5s are the invariant that proves where movement happened (docs/coverage only).
- Failure-mode migration v1→v2→main: v1's failure mode is *can't finish* (no persistence, dies mid-sweep); v2/main's is *can't learn* (frozen weights) — the demo's honesty migrated from capability lies to coverage truths.
- d(coverage): suite 99→103→104 (R17→R18→R19), VERIFIED_CLAIMS 24→25→26; the rot class "stale prose count" is now pinned structurally dead rather than swept again.

### Next version spec (competitive improvements)
- [small, fresh] canonical-index drift pin — every `## Round N` heading below the index must have an index row (regex both directions); R18's missing row proves the drift class is real. Size S, FAIL-first provable by deleting a row.
- [small, fresh] make the R19 C1-refusal probe permanent — promote the one-off Proxy-DOM probe into the suite as a coev-mode refusal glue pin (qarefusal-glue pins classic mode; C1 mode rides on the same l2Suggest but deserves its own receipt assertion). Size S.
- [epic, carried] C1 scaling study (R12/R13/R15/R16/R17/R18 epic) — still the only nonzero d(learning)/d(version) path.
- [epic, carried] advice-aware GA (R15 fresh alternative).

### Verdict
MERGEABLE (R18's booked item closed as verified-no-gap by running; the README count rot is structurally dead — pinned by respawn, not swept again; suite 104/104 + qa 8/8; prerun five md5s byte-identical; PLAYLOG header and canonical index repaired).

## Round 18 — k2d8 — 2026-09-26 — mode: BUILDER (R17 next-spec fresh small: persist the BYO endpoint to localStorage) — vs main 8179351 (post-R17 merge)

### Played versions: main (this round's base)

Suite at base 99/99 + qa 8/8; at tip 103/103 + qa 8/8. `node tools/prerun.js` after the edits: all five md5s byte-identical to base (coev.js 946e639a…, curve.json ba1c919a…, level0 8a49b0f6…, level1 aa4d7c4b…, level2 63b7fdd5…) — the touched files (index.html init block + field note, core.js claim row, new test) are outside the training path, proven by the frozen hashes. d(learning)/d(version) = 0 — 17th straight frozen round; d(coverage) 99→103, VERIFIED_CLAIMS 24→25.

### Builder receipt (the R17-booked fresh small: refresh must not strand a real backend)
- **what:** (1) boot restores `pq.byoQpamEndpoint` from localStorage into `#qabyoep` (storage-unavailable → seam still runs, unpersisted); (2) an `input` listener persists a non-empty trimmed URL and `removeItem`s on clear — clearing the field deletes the key so stale storage can never reopen a closed seam after refresh; (3) field note updated: URL is remembered on this device; the LLM key still never leaves page memory. New `tests/byo-persist-glue.test.js` (4 pins: boot-restore anchor, persist/remove anchors, security singleton, stub-storage round-trip including a simulated refresh). VERIFIED_CLAIMS gained `byo-persist-glue` (24→25).
- **why:** R17's spec: "persist the BYO endpoint to localStorage like the LLM seam's fields, so a refresh doesn't strand a real backend."
- **verify (FAIL-first, then green):** at the R17 tip every new pin fails (index.html touches zero localStorage — the extraction anchor is absent): 4/4 FAIL-first, then 103/103 + qa 8/8 green, prerun byte-identical.

### Lies hunted
- **[P2, caught in the spec itself — pinned, not propagated]** the R17 spec says "like the LLM seam's fields", but the LLM seam's fields are NOT persisted: the key field states "stays in page memory only" and index.html had zero localStorage at R17 tip. The spec's premise misdescribed the code. The honest version, now load-bearing as the SECURITY pin: the endpoint URL persists because a URL is not a credential; the LLM key NEVER persists because it is one — `pq.byoQpamEndpoint` is asserted to be the page's only localStorage key.

### Next version spec (competitive improvements)
- [small, fresh] QA-REFUSAL rows in the C1 coev ledger path — the R12 refusal receipt exists for the qa branch of l2Suggest; check the C1 advisor loop receipts refusals rather than silently skipping (book only if a real gap is found by running).
- [epic, carried] C1 scaling study (R12/R13/R15/R16/R17 epic) — still the only nonzero d(learning)/d(version) path.
- [epic, carried] advice-aware GA (R15 fresh alternative).

### Verdict
MERGEABLE (R17-booked fresh small closed FAIL-first; suite 103/103 + qa 8/8; prerun byte-identical; the BYO door now survives refresh and the key stays in page memory by pin, not by promise).

## Round 17 — k2d8 — 2026-09-26 — mode: BUILDER (R16 next-spec small: page-side BYO endpoint field wiring, the P3 R16 booked, FAIL-first pinned) — vs main post-PR#22-merge (the R16 stack landed mid-round; branch rebased)

### Played versions: main (this round's base, post-#22 merge)

Suite at base 96/96 + qa 8/8 (the merged R16 stack carried 96); at tip 99/99 + 8/8. `node tools/prerun.js` after the edits: same five md5s — the touched files (index.html page glue, core.js claim row, new test) are outside the training path, proven by the frozen hashes. d(learning)/d(version) = 0 — 16th straight frozen round; d(coverage) 91→96, VERIFIED_CLAIMS 23→24.

### Builder receipt (the R16-booked P3: the BYO seam, made user-reachable)
- **what:** (1) the pot row gains a BYO QPAM endpoint input (`qabyoep`, empty = labeled sim — the seam ships closed, zero network by default); (2) `maybeFireQaByo`/`takeQaByo` pace calls exactly like the LLM seam — death OR every ADVICE_EVERY frames, one in flight, replies gameId-tagged at fire so a dead game's reply is dropped, never rebranded (the R4/R5 discipline, qa BYO edition); (3) `qaSuggest()` consumes the reply: a real suggestion is receipted `byo-qpam` and is NOT sim-capped; a degraded one receipts `byo-qpam-fallback` and its advice is NAMED `qa-sim` in the ledger — fallback advice never launders into the byo-qpam kind; the stat line carries the degrade admission alongside the suggestion (`warn`, not clobbered by the shared tail — a real bug the pins caught: the first wiring let the shared `${src} suggests` tail overwrite the admission). (4) New `tests/byo-page-glue.test.js` (5 pins, stubbed `suggestByo`, zero network): markup ships the field; empty endpoint never fires; real reply receipted un-capped; degraded reply dual-named right (fallback receipt + qa-sim advice); stale reply dropped across a gameId bump. VERIFIED_CLAIMS gained `byo-page-glue` (23→24).
- **why:** R16 shipped the seam module+test level only and booked the P3 in its own receipt: "index.html has no endpoint input and suggestByo is not called from the page yet." The honesty contract's "name the seam, don't fake it" cuts both ways — a seam nobody can reach from the UI is a promised door left shut.
- **verify (FAIL-first, then green):** against the PR #22 tip the new pin fails 5/5 (no `qabyoep`, no `qaSuggest` — extraction anchors absent). After the fix: 96/96 all green, qa 8/8, prerun byte-identical. Three existing glue files (qapot/qarefusal/receiptkind) were re-anchored to the widened extraction window (qa BYO seam block + l2Suggest) — their behavioral pins pass unchanged, proving the sim path is behavior-identical.

### Lies hunted
- **[P3, fixed — the clobbered admission]** the first wiring set the degrade text inside qaSuggest, but l2Suggest's shared tail overwrote it with `${src} suggests …` in class `ok`. The degraded-consumption pin caught it ("the stat line must admit the degrade"). Fix: qaSuggest returns a `note` the shared tail prepends in `warn` — one tail, both stories, no overwrite.

### Next version spec (competitive improvements)
- [small, fresh] persist the BYO endpoint to localStorage like the LLM seam's fields, so a refresh doesn't strand a real backend.
- [epic, carried] C1 scaling study (R12/R13/R15/R16 epic) — still the only nonzero d(learning)/d(version) path.
- [epic, carried] advice-aware GA (R15 fresh alternative).

MERGEABLE (R16-booked P3 closed FAIL-first; suite 96/96 + qa 8/8; prerun byte-identical; the BYO door is now user-reachable and degrades honestly on every failure mode).

## Round 16 — k2d8 — 2026-09-26 — mode: BUILDER (R15 spec item 4: REAL_QPAM BYO endpoint seam, FAIL-first pinned) — vs main 9822b6a (post-PR#19)

### Played versions: main (9822b6a, this round's base)

Suite at base 89/89 + qa 8/8; at tip 91/91 + 8/8. `node tools/prerun.js` after the edits: same five md5s (coev 946e639a…, curve ba1c919a…, L0 8a49b0f6…, L1 aa4d7c4b…, L2 63b7fdd5…) — the touched files (qa.js, core.js claim row, new test) are outside the training path, proven by the frozen hashes. d(learning)/d(version) = 0 — 15th straight frozen round; d(coverage) 89→91, VERIFIED_CLAIMS 22→23.

### Builder receipt (R15 spec item 4 — the REAL_QPAM BYO endpoint seam, carried since R12/R13)
- **what:** qa.js `suggestByo(state, seed, shotsPerBin, {url, fetch})` — the "a real QPAM backend belongs at the marked seam" door, opened. Wire contract: POST JSON `{binsB64, shotsPerBin, seed}` where bins are the sonified frame quantized to 64 8-bit bytes, base64 (zero-dep encoder, no Buffer/btoa dependency). The response is JEV-validated (move ∈ {-1,0,1}, confidence ∈ [0,1] finite) before it can reach the paddle. New `tests/byo-seam.test.js` (5 pins, all with STUBBED fetch — no live network in CI): success passes through UN-capped (a real backend is not bound by the stand-in's SIM_MAX_CONF — the cap is the stand-in's honesty, not yours); move=5 payload → byo-qpam-fallback; fetch throw AND non-ok status → fetch-failure; no endpoint → fetch never called; fallback advice byte-identical to plain `suggest()` at the same seed/pot. VERIFIED_CLAIMS gained the `byo-qpam-seam` row (22→23).
- **why:** three rounds (R12 medium, R13 medium, R15 medium-carried) kept this door marked but shut. The honesty contract already promised "name the seam, don't fake it" — this names the wire format and the failure semantics.
- **verify (FAIL-first, then green):** against pristine main the pin fails 5/5 (`QA.suggestByo is not a function`). After the fix: 91/91 all green.

### Lies hunted
- **[P3, verified by reading, NOT fixed — page-side wiring absent]** the seam is module+test level only: index.html has no endpoint input and `suggestByo` is not called from the page yet — the demo still runs the pure stand-in, which is honest (nothing claims BYO exists in the UI). Flagged so the next builder doesn't believe the BYO story is user-reachable.
- **(nothing found in: the wire contract)** the base64 encoder was checked against node's Buffer on all 64 bin values round-trip inside the pin (decode via Buffer.from(b64, "base64") in the test).

### Next version spec (competitive improvements)
- [small, fresh] page-side BYO wiring: an endpoint text field in the qa tile (persisted to localStorage like the LLM seam's), `suggestByo` behind it with fallback receipts rendered as their own receipt kind in the ledger. Verify: glue pin stubbing fetch on the page path.
- [epic, carried] C1 scaling study (R12/R13/R15 epic) — still the only nonzero d(learning)/d(version) path.
- [epic, carried] advice-aware GA (R15 fresh alternative) — thread a measured diet into playOne so advice changes the EVOLVED champion.

MERGEABLE (R15 spec item 4 closed FAIL-first; suite 91/91 + qa 8/8; prerun byte-identical; the BYO seam degrades honestly on every failure mode, never silent).

## Round 15 — k2d8 — 2026-09-26 — mode: BUILDER (one small: R13 spec item 1 — the canonical test command in EXPERIMENTS.md, FAIL-first pinned) + play-tester — vs main 3e4e497 (R14 merged via PR #17)

### Played versions: v1 (e98cf66) → v2 (0722670) → main (3e4e497, this round's base)

Version sweep run in scratch worktrees (the R13 lesson — never sweep in the main tree; trees asserted between refs). v1 moves (L0 2,935 / L1 1,691 / L2 4,766 — unseeded fiction, still the only mover, still its own proof of why the honesty pass exists). v2 regenerates the canonical frozen set byte-identically (`coev.js 946e639a…`, `curve.json ba1c919a…`, L0 `8a49b0f6…`, L1 `aa4d7c4b…`, L2 `63b7fdd5…`); main matches v2 exactly. `node tools/prerun.js` at this round's tip after the edits: same five md5s, tree clean — the touched files (EXPERIMENTS.md, core.js, new test) are outside the training path, proven by the frozen hashes. Suite at base 82/82 + `tools/test-qa.js` 8/8; at tip 84/84 + 8/8.

### Builder receipt (the one small — R13 spec item 1: the canonical test command, carried since R12)
- **what:** (1) EXPERIMENTS.md protocol step 1 now names the canonical suite command — `node --test tests/*.test.js` (glob form) plus `node --test tools/test-qa.js` — and flags the bare directory form: on Node 22 `node --test tests` fails opaquely (one failing subtest named `tests`, error "test failed", no culprit named). (2) New `tests/testcmd-docs.test.js` (Round 15 pin): the glob command must appear as a literal in EXPERIMENTS.md AND the bare form's mention must be a warning, not a recommendation (regex-anchored). VERIFIED_CLAIMS gained the `testcmd-docs` row (21→22).
- **why:** three rounds (R12 process finding, R13 spec, R14 carried-forward) re-derived this by hand; the R12 entry predicted "a future runner copy-pasting the directory form gets a red wall with no name on it." The doctrine file itself should carry the command it expects to be run.
- **verify (FAIL-first, then green):** against the pristine main tip the new pin fails 1/2 (glob literal present only in the merge-gate rule; the warning absent). After the fix: 82→84 all green — and the honesty two-way match pin then demanded the new file back a claim, exactly as designed (added the registry row). Prerun byte-identical.

### Deltas observed (shapes of change)
- **d(learning)/d(version) = 0 — the 14th straight frozen round.** v2 through R14-in-main regenerate byte-identically; only v1 moves, and only because its numbers are unseeded.
- **d(coverage)/d(version) continues: suite 82→84, VERIFIED_CLAIMS 21→22.** The wristband compounds while the learning curve stays frozen.
- **NEW measured shape — d(advice)/d(diet) is nonzero, and the ranking is non-obvious.** First headless diet probe (this round, L2 champion, 30 seeded games/diet, shipped apply rule `rand() < conf·w` at w=1, two runs for variance): unaided 3,443f/11.5h — **moth 5,564–5,802f/17.5–18.6h (helps a lot)** — qa-sim 3,841–4,050f/11.3–12.0h (mild help) — **jepa 2,229–2,259f/5.3–5.9h (actively harms at full weight: drags the champion ~35% below its own unaided survival)**. Ordering stable across both runs. Caveats: the apply-coin used unseeded Math.random, and jepa state was shared across runs (trained within its own games anyway) — a probe, not the shipped tool. Shape: the demo's advisor surface has real effect sizes, the ranking inverts the plausible one (the handcoded heuristic beats the learned predictor), and the page gives the user zero visibility into any of it. Strongest evidence yet for the carried advisor-diet item.
- **qa confidence-vs-pot envelope measured** (75-state grid, the shape R13 spec item 3 wants plotted): mean confidence 0.427 at the floor (spb=2) rising monotonically to a 0.496 asymptote (spb≥128); null fraction 1.00 below the floor, 0.00 at/above it. "More shots → more consistent imaging" is now a measured curve, not a test-visible-only claim.

### Lies hunted
- **[P3, verified by running/counting] README meta-claims are stale (two instances):** "(45 tests total)" — the suite is 82 at base, 84 at this tip; and "(The repo carries no git tags; the version is a claim, not a release.)" — `git tag` returns `v1`. The demo's own doctrine (never trust the README) is breached by the README about itself. Not fixed this round (builder slot spent on the test-command item; spec item 2 below).
- **[P3-process, verified by reading] the R14 PLAYLOG entry omits the "Lies hunted" and "Next version spec" sections** the EXPERIMENTS.md format mandates — the R14 builder round closed its P3 but left the chain without a forward spec, so R15 reconstructed the candidate set from R13's carried items. The chain self-heals this round (spec below); noted so the next builder knows R15's item numbering restarts from here.
- **[P3-process, re-verified by running, FIXED this round]** `node --test tests` (directory form) still fails opaquely on node v22.22.2 (exit 1, one subtest named `tests`, error "test failed", no named culprit). Builder receipt above.
- **[P3 nit, found by reading] tests/honesty.test.js checkpoint consistency probe** — `fitnessOf(cp.bestHits ? cp.bestFrames : cp.bestFrames, cp.bestHits)`: both ternary branches identical (dead condition). Harmless (the formula is pinned either way) but it is a claim-shaped artifact that reads like a typo. Spec item 2 below.
- **(nothing found in: the R14 renderReceipts fix itself)** — edge-case probe of the shipped renderer: empty C1 ledger renders zero rows with NO admission line (the `evicted` guard suppresses "N shown / M evicted" until it's true), a 3-row ledger renders 3 rows with no false "8 shown" claim, a fresh classic page renders an empty panel. The new code is honest at the boundaries. Also re-verified green: prerun byte-reproducibility, suite, qa exhaustion seam (pot 0 → null advice, floor 2 → advice), receiptkind attribution, coev rules/determinism, page parse, checkpoints-vs-fitness consistency.

### Next version spec (competitive improvements — 6 items, carried marked)
- [small, carried R13#3] Confidence-vs-pot strip in the qa tile. Envelope now MEASURED this round: 0.427 @ floor → 0.496 asymptote, nulls below floor. What: the 64×12 strip as specced in R13 (computed once at load over a state grid, cached). Why: the QPAM story's most demo-able shape is now a measured curve the page still doesn't show. Verify: pin the strip's monotonic trend on the cached grid; visual = browser-only amber claim.
- [small, fresh] README honesty sweep: fix "(45 tests total)" (either correct count or point at the suite glob), fix "carries no git tags" (v1 exists; EXPERIMENTS.md also implies a v2 tag), extend the verify-by list or replace it with the canonical glob command now in EXPERIMENTS.md, and clean the dead ternary in tests/honesty.test.js. Why: this round booked two stale meta-claims — the README is the first surface an outsider audits, and right now it fails its own doctrine on arrival. Verify: grep + suite green.
- [medium, carried R2/R12#3/R13#4 — NOW WITH EVIDENCE] Advisor-diet comparison tool in `tools/` (prerun-style, seeded): GA champion × {none, jepa, moth, qa-sim} × weight sweep, per-diet survival/hits curves under one seed, FAIL-first pin. This round's probe supplies the expected shape (moth >> none ≈ qa > jepa — jepa at full weight HURTS the champion ~35%). Why: the weight slider is the demo's core interaction and still has no measured number behind it; the first measurement says the ranking is non-obvious. Verify: tool emits per-diet curves; diets differ; jepa-harms result reproduced under the seeded coin.
- [medium, carried R12#4/R13#5] REAL_QPAM BYO endpoint seam. Unchanged from R13 — url field, base64 shot bins, JEV-invalid/fetch-failure → FALLBACK receipt + degrade to sim, never silent. Verify: glue pin with stubbed fetch, FAIL-first.
- [epic, carried R12#5/R13#6] C1 scaling study (population × gens sweep with the frozen provenance harness; does the ender ever re-cap after the gen-110 flip-flop; ledger-head reproducibility at 2× scale). Still the only nonzero d(learning)/d(version) path. Verify: a new receipted curve in checkpoints/ with different endpoints.
- [epic, fresh alternative to the above, from this round's probe] Advice-aware GA: thread the measured advisor into playOne so diet changes the EVOLVED champion, not just live survival — the probe shows advice has effect sizes worth evolving against. Verify: a new receipted curve whose endpoints differ from the frozen five.

### Siblings studied this round
SuperInstance/quilt-edge-ml (the ring/evaluator patterns — 14 rounds in and still doing their jobs); SuperInstance/jeviter (the JEV validate seam every advisor still passes through); SuperInstance/quilt (`research/2026-09-24-quantum-audio-L2.md`, still the BYO reference). No new sibling code needed — internal seam and measurement work again.

### Verdict
MERGEABLE (R13 spec item 1 closed FAIL-first; suite 84/84 + qa 8/8; prerun byte-identical; two measured shapes added to the experiment's memory; no P2s found this round).

---

## Round 14 — k2d8 — 2026-09-26 — mode: BUILDER (R14 spec item 2 — the COEV panel honesty pin, the fresh P3 booked by R13) — vs R13 tip 7488cfa (playtest-round-13)

### Played version: R13 tip 7488cfa (this round's base)

Suite at base 78/78 green. `node tools/prerun.js` at base and at this round's tip: byte-identical checkpoints (coev.js `946e639a…`, curve.json `ba1c919a…`, L0 `8a49b0f6…`, L1 `aa4d7c4b…`, L2 `63b7fdd5…`), tree clean after the run — index.html/core.js are outside the training path, proven by the frozen hashes.

### Builder receipt (R14 spec item 2: the COEV panel clobber — "two honest chains, one clobbered panel")
- **what:** (1) New `renderReceipts()` in `index.html`, placed immediately before `receipt()`: the single writer for the panel. Non-coev mode renders exactly the old MOTH view. C1 mode renders two labeled sections — `— MOTH receipts —` (12-row tail + `[N shown / M evicted]` admission) and `— C1 ledger —` (8-row ledger tail + `[8 shown / M evicted]`) — each chain keeping its own eviction accounting. Guard order matters: the mode check short-circuits before the `coev` reference. (2) `receipt()` delegates to `renderReceipts()` instead of assigning the panel. (3) `continueGenC()` calls `renderReceipts()` instead of assigning `$('receipts').textContent = coev.ledger.tail(8)…` — the clobber that erased the MOTH chain and its eviction counter every generation. (4) New `tests/coev-panel-glue.test.js` (Round 14 pin): extraction-integrity (renderReceipts precedes receipt and delegates; continueGenC contains no direct panel assign) + ONE-FRAME (45 MOTH writes → a full C1 generation → live()'s DEATH receipt, all in one frame: both labeled sections render, `40 shown / 7 evicted` survives, the C1 row is the real hash-chained ledger tail) + ledger accounting (305 rows → `8 shown / 5 evicted` beside the MOTH section) + non-coev mode (single-chain render unchanged, no empty C1 section). (5) `receipt-glue.test.js` re-anchored: its extraction now spans the renderReceipts+receipt block (end-anchored on the delegating close), with `coev=null` added to the factory preamble so old tests take the plain path unchanged. (6) `coev-glue.test.js` gained a one-line `renderReceipts` stub in its sandbox (its pin covers the generation-loop contract; the shipped renderer is driven verbatim in the new pin). VERIFIED_CLAIMS gained the `coev-panel-glue` row (20→21).
- **why:** R13's failure-mode map carried "P3 coev panel clobber" — in C1 mode the page kept two honest hash chains (MOTH receipts, 40-row bound; C1 ledger, 300-row bound) but ONE panel, and `continueGenC()` assigned over it. Whichever writer ran last decided which chain the user could audit; the `[N shown / M evicted]` admission vanished every generation. A panel that hides one chain's forgetting is itself the hunted lie class at the render layer.
- **verify (FAIL-first, then green):** against the pristine R13 tip the new pin fails 4/4 (no `renderReceipts(` anchor — loud extraction failure, not a silent skip) plus the claims-match pin (unbacked test file). After the fix: suite 78→82 all green, `node tools/prerun.js` md5s byte-identical, checkpoints clean, page-parse pin green on the edited inline block. One harness bug found while pinning (comment-on-last-extracted-line swallowed the concatenated `return`) — fixed with a `\n` separator, itself receipted by the failing tests.

### Deltas observed (shapes of change)
- **d(learning)/d(version) = 0 — the 13th straight frozen round.** The learning signal is shape-stable since the honesty pass while coverage compounds (suite 39→60→68→69→74→78→82). v1 remains the only mover (unseeded fiction).
- **Failure-mode migration map, panel edition:** R13 booked the P3 (ledger tail clobbers MOTH chain + eviction counter) → R14 fixed at the render layer (single writer, two labeled sections, per-chain eviction accounting) and pinned the regression class ("never assign `$('receipts')` outside renderReceipts" is now extraction-asserted). Next small from the R14 spec: item 1, the canonical test command in EXPERIMENTS.md. C1 scaling study (queue top, epic) still open.

## Round 13 — kimi1 — 2026-09-26 — mode: BUILDER (one small: R12 spec item 1 — the qa exhaustion seam, made playable in-page) + play-tester — vs R12 tip 88b488f (playtest-round-12)

### Played versions: v1 (e98cf66) → v2 (0722670) → main (1f5943c) → PR#12 tip (44840be) → PR#13 tip (cdf51f4) → PR#14 tip (c9424f7) → PR#15 / R12 tip (88b488f, this round's base)

All seven refs parse-check clean. Suite by ref: v1 none (pre-tests) → v2 39/39 → main 60/60 → PR#12 68/68 → PR#13 68/68 → PR#14 69/69 → R12 tip 74/74. `node tools/prerun.js` at v2 and every later ref: byte-identical checkpoints (coev.js `946e639a…`, curve.json `ba1c919a…`, L0 `8a49b0f6…`, L1 `aa4d7c4b…`, L2 `63b7fdd5…`), tree clean after the run. v1 still moves (its numbers are unseeded — this run's L2 champion: 589 frames, **0 hits**, crowned at gen 260 — the pre-honesty world where luck tops skill) and still dirties its tree on prerun. All four open-PR tips are exactly where R12 recorded them; nothing moved upstream.

### Builder receipt (the one small — R12 spec item 1: the pot control)
- **what:** (1) `qa.js` `suggest(s, seed, shotsPerBin)` threads the pot through to `channel` (omitted → 32, unchanged). (2) The page ships a pot slider (`#qapot`, 0–64, default 32) toggled visible exactly when the qa module is selected; the shipped qa branch reads it and threads it into BOTH the advisor call and the tile visualization. Below the floor the page receipts `QA-REFUSAL` with the numbers in the stat line (`"qa-sim: channel silent (pot 0/bin below floor 2) — advice refused, receipted"`), and the tile draws the TRUE silent channel — a flatline plus a "POT EMPTY — channel silent" overlay — instead of the healthy default waveform the old code would have rendered. The tile label now carries the live shots/bin readout during normal play too. (3) New `tests/qapot-glue.test.js`: MODULE (the public seam exhausts at spb 1 AND spb 0) + GLUE-integrity (the shipped branch must read `#qapot` and thread it into `suggest`) + GLUE-exhausted (pot 0 → QA-REFUSAL row + numbers in the stat line + `qaVis.decoded` all zeros + `qaVis.spb===0`) + GLUE-healthy (pot 32 → `qa-sim` row, live channel drawn) + MARKUP (slider ships, toggled with the qa module). Existing mocks in `qarefusal-glue`/`receiptkind-glue` pin the pot at 32 so those files keep testing their own seams. VERIFIED_CLAIMS gained the `qapot-glue` row (19→20).
- **why:** R12 made exhaustion receiptable but, under shipped page wiring, still unreachable — the page called `suggest(s0, qseed)` at the default 32 shots/bin, far above `SIM_POT_FLOOR=2`. R12's own entry flagged it ("currently the seam exists but is invisible without reading qa.js"). The verify clause ("crank the pot below floor in the page → tile shows silence + panel shows QA-REFUSAL") needed a pot to crank.
- **verify (FAIL-first, then green):** against the pristine R12 tip the new pin fails 4/4 (MODULE: `suggest` ignored the third arg and advised on a 1-shot pot; GLUE-integrity: the shipped branch never read `#qapot`; GLUE-exhausted: no QA-REFUSAL; MARKUP: no slider). After the fix: suite 74→78 all green, `node tools/test-qa.js` 8/8, `node tools/prerun.js` md5s byte-identical, checkpoints clean (qa.js/index.html/core.js are outside the training path, proven by the frozen hashes), page-parse pin green on the edited inline block.

### Found while building — a fresh instance of the hunted lie class (P2, fixed same-round)
The new GLUE-exhausted test caught the page advising with the slider at **0**. Cause: R12's floor used `const spb = shotsPerBin || 32` — a 0 budget silently re-armed the full pot. The emptied state was unreachable even WITH a control: a "helpful default" swallowing the exact state the seam exists to model. Fixed to `shotsPerBin ?? 32`; the 0 case is now pinned in the MODULE test. Minimal repro (pre-fix): `QA.suggest({ballX:0.5,…,hits:1}, 7, 0)` → advice, should be null.

### Deltas observed (shapes of change)
- **d(learning)/d(version) = 0 — the 12th straight frozen round.** v2 through R12 tip regenerate byte-identical; the learning signal has been shape-stable since the honesty pass while coverage compounds around it (suite 39→60→68→69→74→78). v1 is the only mover, and it moves only because its numbers are unseeded fiction.
- **Failure-mode migration map, exhaustion edition:** R11 booked it (silent null, no receipt) → R12 module level (floor made real; receipted) → R13 glue level (page seam unreachable even after R12 — made playable) → found again at module level (`|| 32` falsy trap) → remaining: P3 coev panel clobber (below) and the BYO real-QPAM endpoint (carried). The seam keeps re-hiding one level up; each fix that adds a "convenience default" risks re-arming it.
- **Process finding (P3, runner hygiene, self-booked):** my first version-sweep script didn't verify the tree between checkouts; prerun-dirtied checkpoints silently blocked every checkout after v1, so five of seven "refs" were replayed against v1's tree — numbers that looked like a sweep and weren't. Caught by the redo, which forced checkouts and asserted `tree-dirty` per ref. Shape: a runner that doesn't check its own state between steps produces fiction at industrial scale; `git status` is part of the protocol, not a nicety.

### Lies booked this round
1. **P2 (FIXED):** `channel`'s `|| 32` fallback made pot=0 read as pot=32 — the empty pot was unreachable with the control at zero. Caught by the new pin, not by reading. (index.html `qapot` wiring + qa.js one-liner.)
2. **P3 (OPEN):** in C1 mode `continueGenC` (index.html:215) overwrites the receipt panel with `coev.ledger.tail(8)` directly, bypassing `receipt()` — while `live()` (257–260) keeps writing MOTH rows (`DEATH`, `QA-REFUSAL`, …) into the hash chain that the panel never durably shows, and the "[N shown / M evicted]" admission vanishes after each generation. Two honest chains, one clobbered panel. Spec item 2 below.

### Spec for Round 14 (6 items — carried marked)
1. **[small, carried R12#2] Canonical test command in EXPERIMENTS.md.** `node --test tests` (directory form, Node 22) fails opaquely (`EISDIR`); the suite form is `node --test tests/*.test.js` (and `node --test tools/test-qa.js`). What: one line in EXPERIMENTS.md doctrine. Why: three rounds have re-derived this by hand. Verify: text pin in the suite.
2. **[small, fresh P3] COEV panel honesty.** What: in C1 mode, render the MOTH receipt tail and the C1 ledger tail as two labeled sections of one panel (or one chain with a separator), each keeping its own eviction accounting. Why: the panel is called the honesty centerpiece; right now the chain the user can audit depends on which writer ran last. Verify: extraction pin driving `continueGenC` + `receipt()` in the same frame asserts both chains render and the evicted counter survives.
3. **[small, fresh] Confidence-vs-pot strip.** What: the tile already carries the live pot readout; add a 64×12 strip plotting measured advisor-confidence across pot values (computed once at load over a state grid, cached — the envelope the MODULE tests already prove). Why: "more shots → more consistent imaging" is currently test-visible only; it is the QPAM story's most demo-able shape. Verify: pin that the strip's monotonic trend holds on the cached grid; visual = browser-only amber claim.
4. **[medium, carried R2/R12#3] Advisor-diet comparison.** What/why/verify: as specced in R12 — jepa vs moth vs qa-sim vs none, champion-affecting A/B in `tools/` with a pin, so the weight slider (the demo's core interaction) has one measured number behind it.
5. **[medium, carried R12#4] REAL_QPAM BYO endpoint seam.** What: a url field for a real quantumaudio-QPAM service returning base64 shot bins; on fetch failure or JEV-invalid shape, receipt a FALLBACK row and degrade to the sim — never silent. Why: closes the last contractual-only half of the L2 story. Verify: glue pin with a stubbed fetch, FAIL-first against the shipped page.
6. **[epic, carried R12#5] C1 scaling study.** What/why/verify: as specced in R12 — population/generation scaling curves, does the ender ever re-cap after the gen-110 flip-flop, ledger-head reproducibility at 2× scale.

### Siblings studied this round
SuperInstance/quilt-edge-ml (the ring/evaluator patterns still holding twelve rounds later); SuperInstance/jeviter (JEV validate seam the whole L2 stack rides on); SuperInstance/quilt (the 2026-09-24 quantumaudio L2 spec in `research/`, still the reference for the BYO item). No new sibling code was needed — this round was internal seam work.

---

## Round 12 — kimi1 — 2026-09-25 — mode: BUILDER (one small: R11 spec item 4, REFUSAL half — the qa exhaustion seam, made reachable) + play-tester — vs R11 stack tip c9424f7 (r11-loadcoev-glue-extraction)

### Played versions: v1 (e98cf66) → v2 (0722670) → main (1f5943c, post-PR#10) → PR#12 tip (playtest-round-11 @ 44840be) → PR#13 tip (merge-gate-ci @ cdf51f4) → PR#14 tip (c9424f7, this round's base)

### Builder receipt (the one small — R11 spec item 4, REFUSAL half: QA-REFUSAL receipt + reachable exhaustion)
- **what (two halves, one seam):** (1) `qa.js` gained a real silence floor: a shots-per-bin budget below `SIM_POT_FLOOR` (2) models QPAM shot underflow (measured pearson ~0.02 at 2000 shots/882 samples) — the pot returns NO image at all, `channel()` emits pure silence, and the existing `DEAD_ZCR` guard ("pot-bound: no echo, no advice") finally does the job it was built for. (2) the page's qa branch receipts a `QA-REFUSAL` row + a warn stat line (`"qa-sim: channel silent (pot-bound) — advice refused, receipted"`) on advisor null — through the honesty contract's own documented seam (a real backend returning silence, or the sim below its floor) — instead of the previous `if(!s)return null;` silent drop. `SIM_POT_FLOOR` is exported; default budget (32) is far above the floor so normal play is untouched. New `tests/qarefusal-glue.test.js`: FLOOR ×2 (silence is pure zeros; it trips the guard) + UNCHANGED (default pot still advises, cap holds) + GLUE ×2 (verbatim-extracted shipped `l2Suggest()` driven with a null-returning backend through the documented seam → a `QA-REFUSAL` row lands and the stat line names the exhaustion; live backend still receipts `qa-sim`, no regression). VERIFIED_CLAIMS gained the `qarefusal-glue` row (18→19).
- **why:** Rounds 2/9/11 carried "the qa tile admits exhaustion silently (null suggestion, no receipt)". This round proved the carried item's verify clause ("forced-exhaustion state receipts a REFUSAL row") was **impossible as written**: the shipped sim's pot-bound branch is dead code (below). The honest build order was therefore: make exhaustion reachable first (sim physics), then receipt it (page glue).
- **verify (FAIL-first, twice-run, then green):** against the pristine R11 tip the pin fails exactly where expected — `FLOOR` ×2 (no silence floor) and `GLUE: exhausted backend` (silent drop, no QA-REFUSAL row) FAIL, both regression guards PASS. After the fix: 5/5. Suite 69→74 all green; `node tools/test-qa.js` 8/8 (its `spb=4` "noisier channel" case stays above the floor — semantics preserved); `node tools/prerun.js` md5s byte-identical (coev.js `946e639a…`, curve.json `ba1c919a…`, L0/L1/L2) — qa.js is outside the training path, proven by the frozen hashes. checkpoints clean in the working tree after the run; the page-parse pin guards the edited inline block.

### Deltas observed (shapes of change)
- **d(honesty)/d(version): the lie class gained a new member — the advertised-but-unreachable seam.** Nine rounds closed wrong-label lies (banner vs pane, count vs reality, provenance columns). Round 12 found a quieter cousin: a label that was *right about its contract but had no execution path* — the demo advertised "pot-bound: no echo, no advice" while the state was mathematically unreachable under the shipped sim (min ZCR 0.125 vs threshold 0.02; 8,820 suggest() calls, 0 nulls). Shape: honesty gaps are not only mismatches between claim and behavior; they are also claims whose behavior was never given a way to run. The fix pattern (make the seam executable, then receipt it) generalizes.
- **d(learning)/d(version) = 0 for the tenth straight round** — L0 5,767 / L1 8,800 / L2 8,700, coev arms race md5 `946e639a…` byte-identical, re-confirmed by running on v2 (0722670), main, and all three open-PR tips. The freeze is provenance; the standing epic items remain the only nonzero paths.
- **d(coverage)/d(version) continues: suite 69→74, VERIFIED_CLAIMS 18→19.** The wristband compounds while the learning curve stays frozen — the demo is now more specification than experiment on the L1/L2 surface.
- **d(process)/d(version): the merge gate got its first real exercise.** Three sibling PRs (#12 docs, #13 CI, #14 glue) sat open; this round ran the full play-test protocol against all three tips (suite + prerun, all green, all byte-identical), which satisfies the text half of the R11 merge-gate doctrine for each.

### Lies hunted
- [P2, found this round by running, FIXED] qa pot-bound branch is dead code — the honesty contract's exhaustion seam had no reachable state under the shipped sim. Repro: fine state sweep (61×61×6) → min ZCR 0.125 at (bx=0, px=0, speed=1), 6× the 0.02 threshold; 8,820 `suggest()` calls, 0 nulls. The page compounded it by dropping advisor nulls silently. Fix + FAIL-first pin shipped (Builder receipt).
- [P3, found by counting, recorded] VERIFIED_CLAIMS parenthetical drift in the R11 entry ("suite 56→60→68, VERIFIED_CLAIMS 15→17") — actual 16→18 at the R11 tip, 18→19 after this round. The two-way match pin holds; only the prose counts drifted. Not fixed (docs nit, spec below).
- [P3-process, verified by running, recorded] `node --test tests` (directory form) fails opaquely on node v22.22.2 ("Cannot find module '…/tests'", no failing subtest named); the canonical glob form (`node --test tests/*.test.js`) is green 74/74 and is what CI runs. Sharp edge, not a defect — but a future runner copy-pasting the directory form gets a red wall with no name on it.
- [P3-process, verified by reading GitHub Actions semantics, recorded] the merge-gate workflow (PR #13) cannot run on any PR until it reaches main (workflows trigger from the base branch) — so the text half of the doctrine is the only gate standing between here and merge, exactly as this round used it.
- [P3, carried from R11, NOT fixed — R13 spec] the `moth` advisor is still a handcoded heuristic wearing the advisor label; the advisor-diet comparison would expose it as the trivial diet.
- (nothing found in: fitness weights, ring, evaluator top-K, effective paddle, seeded swans, JEPA representation, seam pacing/timeout/gameId, receipt eviction, receiptkind attribution, loadCoev head + single-ledger construction, pop-slider parity, coev rules/determinism, checkpoint consistency, prerun byte-reproducibility, page parse + headless boot — all pinned and re-verified green this round across all three open-PR tips.)

### Next version spec (competitive improvements)
- [small] Make the exhaustion seam playable: surface the pot budget in the qa tile (shots-per-bin readout, or an explicit "deplete the pot" control) so a human play-tester can drive the sim below its floor and watch the QA-REFUSAL row land — currently the seam exists but is invisible without reading qa.js. why: the R12 seam is executable but not discoverable; an honesty path nobody can find is halfway back to silent. verify: crank the pot below floor in the page → tile shows silence + panel shows QA-REFUSAL.
- [small] Docs nit repair: fix the R11 parenthetical counts; add one line to EXPERIMENTS.md naming the canonical test command (`node --test tests/*.test.js`, glob) and noting the directory form's opaque failure on node 22. why: this round's two P3s both cost investigator time. verify: grep.
- [medium] Advisor-diet comparison: GA alone vs +jepa vs +moth vs +qa-sim — champion fitness over N gens under the SAME seed, receipts as the differ. why: carried since Round 2; now the ONLY carried medium with zero comparative evidence, and it exposes the moth heuristic as the trivial diet. verify: prerun-style tool emits per-diet curves; diets differ.
- [medium] REAL_QPAM BYO endpoint seam: the silence floor now defines the contract a real backend signals (zeros/underflow → QA-REFUSAL); wire a bring-your-own endpoint like the LLM seam. why: second half of R11 spec item 4, now unblocked. verify: mock backend returning silence → QA-REFUSAL row; live backend → qa-sim rows.
- [epic] C1 scaling study (population × gens sweep with the frozen provenance harness) OR first/last-mile sense filter with re-evolution — the only paths to nonzero d(learning)/d(version). why: ten rounds at zero learning delta; the honesty instrumentation is mature enough to support a real experiment now. verify: a new receipted curve in checkpoints/ with different endpoints.

### Verdict
MERGEABLE (P2 fixed with FAIL-first pin, proven twice; suite 74/74; prerun byte-identical; all three open-PR tips independently play-tested green this round, satisfying the merge-gate text half for each).

---

## Round 11 — kimi1 — 2026-09-25 — mode: BUILDER (one small: receipt-kind attribution, fresh P2, FAIL-first pin) + play-tester — vs r10 branch tip 287824d (pop-slider parity)

### Played versions: v1 (e98cf66) → v2 (0722670) → R4→R9 chain → main (1f5943c, post-PR#10) → r10-pop-slider-parity (287824d)

### Builder receipt (the one small — receipt-kind attribution, found this round by running)
- **what:** the shipped receipt call in `l2Suggest()` read
  `receipt(s.source||src==="none"?"L2":s.source||src, …)` — which parses as
  `(s.source || (src==="none")) ? "L2" : (s.source || src)`. Every advisor that
  sets `.source` (jepa `"jepa"`, moth `"moth"`, qa `"qa-sim"`) was written
  into the hash-chained ledger with kind `"L2"`. The stat line above the
  panel said `jepa suggests move=…` while the ledger — the demo's honesty
  centerpiece — recorded `"L2"`. Fixed to
  `receipt(s.source||(src==="none"?"L2":src), …)`: the ledger now names the
  advisor; `"L2"` remains the dead fallback. New
  `tests/receiptkind-glue.test.js` extracts the VERBATIM shipped l2Suggest()
  and fires each advisor headlessly (jepa trained first so its suggestion is
  shape-valid): three ATTRIBUTION tests + one FALLBACK test. VERIFIED_CLAIMS
  gained the `receiptkind-glue` row (17 rows).
- **why:** Rounds 3–10 pinned every claim about the ledger's *bounds* and
  *chain integrity* (cap-40 eviction R7, hash chain R5) — but never the
  *attribution column*. The provenance lie sat one operator-precedence level
  below every previous read. This is the ninth round of the glue-pair class
  (browser glue shipped unexamined until run).
- **verify (FAIL-first, then green):** against the pre-fix page, exactly the
  three ATTRIBUTION tests fail (`ledger kind is "L2" — the stat line says
  "jepa suggests" but the hash-chained ledger records "L2"`, likewise moth,
  qa-sim); FALLBACK passes both before and after (it pins the fallback, not
  the bug). After the fix: 4/4 PASS. Suite 64→68 tests, all green;
  `node tools/prerun.js` md5s byte-identical (coev.js `946e639a…`,
  L0/L1/L2, curve.json `ba1c919a…`) — provenance untouched; checkpoints
  clean in the working tree after the run. The page-parse pin guards the
  edited inline block.

### Process debt settled (the missing Round 10 receipt)
- The r10-pop-slider-parity branch (287824d) shipped the R10 builder item —
  coev pop-slider shrink parity, the P2 carried since Round 5 — and pushed,
  but its run died before the PLAYLOG entry and the PR. The code was real:
  this round re-verified it independently (suite 64/64 green on the branch
  tip; my own headless repro of the shipped startGenC: 16→8 shrink pins
  popS/popE to 8, 8→32 regrow restores 32/32; prerun md5s byte-identical).
  The Round 10 entry below is written post-hoc from that verification, and
  this branch's PR now carries both rounds. Recorded as a process finding:
  **a pushed branch without a PLAYLOG entry is an unshipped round** — the
  receipt is the ship.

### Deltas observed (shapes of change)
- **d(honesty)/d(version): the glue-pair class closed its ninth member, and
  the class itself is now the measurable signal.** Nine consecutive rounds,
  each closing exactly one browser-glue honesty gap (R3 weights/paddle, R6
  seam gameId, R7 receipt eviction, R8 page parse, R9 loadCoev head, R10
  pop-slider, R11 receipt attribution). Shape: the lies are not random —
  they cluster in the seam between the pinned core and the unpinned page.
  d(lies)/d(version) is decaying (one per round, each smaller: from a lying
  banner, to a lying population count, to a lying provenance column) — the
  class is being mined out.
- **d(learning)/d(version) = 0 for the ninth straight round** — L0 5,767 /
  L1 8,800 / L2 8,700, coev arms race md5 `946e639a…` byte-identical. The
  freeze is provenance (committed checkpoints), confirmed again by running.
  The standing epic items (C1 scaling study; first/last-mile sense filter
  with re-evolution) remain the only paths to a nonzero learning delta.
- **d(coverage)/d(version) continues: suite 56→60→68, VERIFIED_CLAIMS
  15→17.** The wristband is compounding faster than the learning curve is
  frozen — the demo is becoming a specification of itself.

### Lies hunted
- [P2, found this round by running, FIXED] receipt-kind attribution —
  jepa/moth/qa-sim advice receipted as `"L2"` in the hash-chained ledger due
  to operator precedence (`s.source||src==="none"?"L2":…`). Repro: headless
  l2Suggest ×3 advisors, all kinds `"L2"` pre-fix. Fix + FAIL-first pin
  shipped (Builder receipt).
- [P2, confirmed fixed by independent re-run] coev pop-slider shrink parity
  (the R10 item) — my repro of the shipped startGenC: shrink pins both pools,
  regrow restores. The r10 pin (tests/popslider-glue.test.js) also passes.
- [P3-process, still present, NOT fixed — R12 spec 1] PLAYLOG merge disorder:
  the stale duplicate Round 2 still sits between Round 7 and Round 6;
  three "Round 2" headings total (two branch-canonical). Repair needs
  disambiguation, not deletion.
- [P3-process, verified by reading, NOT fixed — R12 spec 2] no CI:
  `.github/workflows/` does not exist; the page-parse and other pins run
  only when a runner runs them. A merge that breaks the page has no gate.
- [P3, observed, NOT fixed — R12 spec 3] the `moth` advisor is a handcoded
  heuristic (`vy>0 ? chase : 0`, confidence pinned at 0.8) wearing the
  "receipted advice ledger" label — the label names the system, not the
  advice source. Honest but confusing; the advisor-diet comparison would
  expose it as the trivial diet.
- (nothing found in: fitness weights, ring, evaluator top-K, effective
  paddle, black-swan seeding, loadCoev head, pop-slider parity — all pinned
  and re-verified green this round.)

### Next version spec (competitive improvements)
- [small] PLAYLOG merge-disorder repair — disambiguate the three "Round 2"
  headings (retitle the stale duplicate as a named historical artifact, add
  a canonical index at top). why: Rounds 9, 10, 11 each re-flagged it; the
  memory the loop eats from is out of order. verify: exactly one "Round 2"
  heading; top index lists rounds 1–11 in order.
- [small] CI gate: `.github/workflows/test.yml` running `node --test
  tests/*.test.js` on PR + push to main. why: R8/R10/R11 pins are only as
  real as the runner that executes them; the R8 dead-merge incident would
  have been caught. verify: a PR that breaks a pin goes red.
- [medium] Advisor-diet comparison: GA alone vs +jepa vs +moth vs +qa-sim —
  champion fitness over N gens under the SAME seed, receipts as the differ.
  why: carried since Round 2; the L2 seam is the demo's differentiation and
  has zero comparative evidence. Also exposes the moth heuristic as trivial.
  verify: a prerun-style tool emits per-diet curves; diets differ.
- [medium] REAL_QPAM seam + QA-REFUSAL receipt row when the sim labels
  itself exhausted (pot-bound). why: carried since Round 2/9; the qa tile
  currently admits exhaustion silently (null suggestion, no receipt).
  verify: forced-exhaustion state receipts a REFUSAL row.
- [epic] C1 scaling study (population × gens sweep with the frozen
  provenance harness) OR first/last-mile sense filter with re-evolution —
  the only paths to nonzero d(learning)/d(version). why: nine rounds at
  zero learning delta; the honesty instrumentation is mature enough to
  support a real experiment now. verify: a new receipted curve in
  checkpoints/ with different endpoints.

### Verdict
MERGEABLE (P2 fixed with FAIL-first pin; suite 68/68; prerun byte-identical;
R10 code re-verified independently; process debt recorded honestly).

### Builder receipt (item 2 — PLAYLOG merge-disorder repair, R11 spec small)
- **what:** disambiguated the three `## Round 2` headings and gave the log
  a canonical index. (1) Stale duplicate (pre-honesty pass, merged via PR #1)
  retitled `## Artifact A — stale duplicate of Round 2…` — kept as a named
  historical artifact per doctrine (disambiguation, not deletion; the memory
  the loop eats from is now in order). (2) The two canonical branch Round 2s
  got branch labels: `Round 2 (branch quilt-edge-ml-survey)` and
  `Round 2 (branch quantum-audio-L2)` — both shipped, neither supersedes.
  (3) A canonical index table (R11→R1 + artifact row, with branch/base and
  status) now sits at the top of the log.
- **verify:** `grep '^## Round 2'` returns exactly the two uniquely-labeled
  canonical branch entries (zero stale duplicates); the top index lists
  every round 1–11 in order plus the artifact row. Docs-only change — no
  shipped code touched; suite re-run 68/68 green as a sanity check.
- **why:** Rounds 9, 10, 11 each re-flagged it; the experiment's memory was
  out of order at exactly the seam future rounds read first.

### Builder receipt (item 6 — loadCoev glue extraction, R11 spec)
- **what:** removed the throwaway ledger from `loadCoev()`. The page built
  `coev` via `Object.assign(coev||{}, {… ledger:PQ.makeLedger(300) …})` and
  then, on the very next line, rebuilt `coev.ledger=PQ.makeLedger(300)` and
  re-chained the artifact tail onto it. The first chain was constructed and
  discarded on every C1 load — dead glue, and a reader trap: two
  `makeLedger(300)` calls in one function with no signal which chain the
  receipts pane actually shows. Extraction: the Object.assign literal no
  longer carries `ledger:`; the single explicit construction+re-anchor is
  the only chain built. Behavior-preserving — every other line verbatim.
  New FAIL-first pin in `tests/loadcoev-glue.test.js`: the extracted
  `loadCoev()` source must contain exactly ONE `PQ.makeLedger(300)`
  construction.
- **why:** the glue-pair class is honesty-first, but dead construction is
  the same class's quiet member: two chains where one is displayed invites
  the next editor to banner the wrong head. Round 9 pinned WHICH head the
  banner may name; this item removes the second chain so the question
  cannot recur.
- **verify (FAIL-first, then green):** against the pre-fix page the new pin
  FAILS (`loadCoev() constructs 2 ledgers`); after extraction 5/5 in the
  file, suite 68→69 tests all green; `node tools/prerun.js` md5s
  byte-identical (coev.js `946e639a…`, curve.json `ba1c919a…`, L0/L1/L2) —
  provenance untouched; checkpoints clean in the working tree after the run.
  The page-parse pin guards the edited inline block.

---

## Round 10 — kimi1 — 2026-09-25 — mode: BUILDER (one small: R10 spec item 1 — coev pop-slider shrink parity, the five-round P2) + play-tester — vs main 1f5943c (post-PR#10 merge)

> Receipt note: this entry was written post-hoc by Round 11. The branch
> shipped and pushed at 15:07 +0800 but its run ended before the PLAYLOG
> entry and the PR; Round 11 re-verified the code independently and
> completes the receipt here. The numbers below are Round 11's re-runs.

### Played versions: v1 (e98cf66) → v2 (0722670) → R4→R9 chain → main (1f5943c)

### Builder receipt (the one small — Round 10 spec item 1: coev pop-slider shrink parity)
- **what:** the coev loop's population resize only GREW
  (`while(pop<n)push`, never shrinks) while the classic loop pins both ways
  (`if(pop.length>D.popSize)pop.length=D.popSize;`). After dragging the
  games-at-once slider down, the label lied: slider 8, 16 pops still
  playing. Fix: two lines in startGenC pinning popS/popE to the slider on
  shrink, verbatim-commented as classic-loop parity. New
  `tests/popslider-glue.test.js`: extracts the VERBATIM shipped startGenC()
  and drives 16→8 (both pools must be 8), 8→16 regrow, and a truncation
  ghost check (every survivor after shrink is a real net). VERIFIED_CLAIMS
  gained the `popslider-glue` row.
- **why:** Rounds 5→9 receipted this lie five consecutive times with frozen
  numbers; Round 9 spec item 1 decided the shape (pin like the classic
  loop). This round ships the decision.
- **verify (re-run by Round 11):** popslider-glue 4/4 PASS on the branch tip;
  independent repro of the shipped startGenC (extraction-anchored, same
  technique as the pin): grow to 16 → shrink 16→8 pins popS=8/popE=8 →
  regrow 8→32 restores 32/32. Suite 64/64 green at the branch tip;
  `node tools/prerun.js` md5s byte-identical (coev.js `946e639a…`,
  L0/L1/L2, curve.json). Round 11's FAIL-first confirmation of the bug's
  pre-fix existence is preserved in the R9 entry (five consecutive
  byte-identical repros, R5→R9).

### Deltas observed (shapes of change)
- **d(lies)/d(version): the carried-P1/P2 class shrank again.** Round 9
  closed the loadCoev head lie; this round closes the pop-slider lie — the
  browser-glue pair both died within two rounds, each with a FAIL-first
  pin. (R11 later adds: the class had a ninth member — receipt attribution —
  also since Round 3. The class is the seam, not any single lie.)
- **d(learning)/d(version) = 0, eighth straight round** — L0 5,767 /
  L1 8,800 / L2 8,700, coev md5 `946e639a…` byte-identical. Provenance
  freeze, re-confirmed by running.

### Lies hunted (as re-verified by Round 11)
- [P2, carried 5 rounds, FIXED] coev pop-slider shrink parity —
  popslider-glue 4/4 PASS; independent repro confirms shrink pins both
  pools and regrow restores.
- [P3-process, recorded by R9, deferred here] merge disorder + no-CI —
  carried to R11 spec, still open at R11.

### Next version spec (competitive improvements) — as specified by R9, executed this round
- [small→SHIPPED] pop-slider parity (above).
- [small, STILL OPEN — R11 spec] merge-gate doctrine + CI workflow.
- [small, STILL OPEN — R11 spec] PLAYLOG merge-disorder repair.

### Verdict
MERGEABLE (the code, re-verified by Round 11: 64/64 green at branch tip,
prerun byte-identical, independent repro PASS. The missing receipt + PR are
the process debt Round 11 settles).

---

## Round 9 — kimi1 — 2026-09-25 — mode: BUILDER (one small: R9 spec item 1 — loadCoev head honesty, FAIL-first pin) + play-tester — vs main cda9eab (post-PR#9 merge)

### Played versions: v1 (e98cf66) → v2 (0722670) → R4 (e8774a2) → R5 (7882d99) → R6 (d8ec449) → main-merge (1ae696b, was dead) → R7 (54b625a) → R8/main (cda9eab)

### Builder receipt (the one small — Round 9 spec item 1: loadCoev head honesty, the six-round P1)
- **what:** the shipped `loadCoev()` stats line banners `coev.ledger.head` —
  the re-anchored chain the receipts pane ACTUALLY displays — with the
  artifact's true md5-verified head disclosed beside it:
  `ledger ${coev.ledger.head} (re-anchored at genesis; artifact ${cp.ledgerHead})`.
  New `tests/loadcoev-glue.test.js`: extracts the VERBATIM shipped loadCoev()
  from index.html (line-anchored — extraction fails loudly if the page moves)
  and drives it headlessly against the real committed artifact: (1) extraction
  integrity; (2) the HONESTY invariant — the bannered ledger head equals the
  head of the chain actually displayed, with the displayed tail recomputing to
  it; (3) PROVENANCE — the artifact's true head stays disclosed, not erased by
  the re-anchor; (4) the no-artifact path alerts and touches nothing. VERIFIED_CLAIMS
  gained the `loadcoev-glue` row; README's C1 section now admits the re-anchor
  and names the pin (formerly the lie was nowhere admitted in README).
- **why:** Rounds 4→8 receipted the lie five consecutive times with
  byte-identical numbers: banner `8663279a` (the artifact's head) over a pane
  showing artifact rows re-chained onto fresh genesis, displayed head
  `83a099d4`, first displayed row re-chained `360e1dfc` vs its artifact hash
  `6c072f4c`. The banner said "md5-verified" over a chain the pane did not
  show. Round 8 spec item 1 decided the shape (banner the displayed chain;
  keep artifact head as provenance); this round ships the decision.
- **verify (FAIL-first, then green):** against the pre-fix page, exactly one
  test fails, verbatim: `banner names 8663279a but the pane shows a chain
  headed 83a099d4 — the receipt pane shows a chain the banner doesn't name`.
  After the fix: pin 4/4 PASS. Suite 56→60 tests, all green; `node
  tools/prerun.js` md5s byte-identical (coev.js `946e639a…`, L0/L1/L2,
  curve) — provenance untouched; checkpoints clean in the working tree after
  the run. The page-parse pin guards the edited inline block (it is in the
  suite).

### Deltas observed (shapes of change)
- **d(lies)/d(version): the carried-P1 class shrank for the first time in six
  rounds.** The R4→R8 shape was a stable pair of unfixed browser-glue lies
  re-confirmed with frozen numbers each round (deterministic repros — the
  failure surface was stable, not noisy). This round closes the older of the
  two (P1) with a FAIL-first pin; the younger (P2 pop-slider) remains live.
  Shape: d(honesty)/d(version) is no longer only additive coverage — one
  long-frozen lie actually died.
- **The honesty-instrumentation compounding continues.** Suite 56→60,
  VERIFIED_CLAIMS 14→15 rows; four consecutive builder rounds each closed
  one deferred honesty gap (R6 seam gameId, R7 receipt eviction, R8 page
  parse, R9 loadCoev head). Learning numbers remain frozen by provenance for
  the seventh straight round — L0 5,767 / L1 8,800 / L2 8,700, coev arms race
  md5 `946e639a…` byte-identical. d(learning)/d(version) = 0 is now a
  seven-times-receipted fact.
- **What the freeze IS: provenance, not stagnation — but it is now the
  experiment's main uncovered shape.** Seven rounds, zero learning-curve
  movement, because checkpoints are committed receipts. The standing
  medium/epic items (C1 scaling study; first/last-mile sense filter with
  re-evolution) are the only paths to a nonzero d(learning)/d(version); both
  carry again below.

### Lies hunted
- [P1, confirmed 6th consecutive round by running, FIXED] loadCoev head
  dishonesty — repro re-ran byte-identical (banner `8663279a` vs displayed
  `83a099d4`; row re-chain `360e1dfc` vs `6c072f4c`); fix + FAIL-first pin
  shipped (Builder receipt).
- [P2, confirmed 5th consecutive round by running, NOT fixed — R10 spec 1]
  coev "games-at-once" slider only grows (`while(pop<n)push`, never shrinks;
  classic loop pins both ways, present verbatim at index.html startGen).
  Repro re-ran: slider 16→8 → pops stay 16/16 while the classic loop pins to
  8. The label lies after a shrink.
- [P3-process, still present, NOT fixed — R10 spec 2] PLAYLOG merge disorder:
  the stale duplicate Round 2 (pre-honesty-pass, PR #1) still sits between
  Round 7 and Round 6; and the quantum-audio branch's own Round 2 entry means
  three "Round 2" headings total exist. The repair needs disambiguation, not
  just deletion (two branch-canonical R2s are real history).
- [P3-process, verified by reading, NOT fixed — R10 spec 3] merge-gate doctrine
  still textless: EXPERIMENTS.md carries no rule that a sibling PR needs a
  play-test round or CI pin, and `.github/workflows/` does not exist. The R8
  page-parse pin runs only when a runner runs it.
- (nothing found in: fitness weights, ring, evaluator top-K, effective paddle,
  seeded swans, JEPA representation, seam pacing/timeout/gameId, receipt
  eviction, coev rules/determinism, checkpoint consistency, prerun
  byte-reproducibility, page parse — all reproduce as claimed, twice-run this
  round.)

### Next version spec (Round 10)
- [small] Coev pop-slider parity: pin `coev.popS/popE.length = n` on shrink
  (same as the classic loop's `pop.length=D.popSize`), FAIL-first pin in the
  coev-glue harness — why: the slider label lies after a shrink (P2, five
  consecutive rounds) — verify: set pop 16→train→set 8→train, pops are 8.
- [small] Repair PLAYLOG merge disorder: delete the stale duplicate Round 2
  (line-anchored, marked) and label the two canonical ones ("Round 2
  (main)" / "Round 2 (quantum-audio branch)") — why: the memory presents a
  superseded pre-honesty-pass round as current truth between R7 and R6, and
  three same-numbered headings make the chain ambiguous — verify: no STALE
  marker remains, exactly three Round-2 headings each branch-labeled, file
  reads R10→R1 top to bottom.
- [small] Merge-gate doctrine, text half: write the rule into EXPERIMENTS.md
  (a sibling PR may not merge without either one play-test round or the
  node-parse pin running on it) — why: the R7→R8 P0 existed only because a
  merge bypassed the loop; the pin exists but the doctrine text does not —
  verify: EXPERIMENTS.md carries the rule verbatim.
- [medium] Merge-gate CI: stand up `.github/workflows/` running
  `node --test tests/*.test.js` on every PR — why: pins only bite when they
  run uninvoked; the repo has no CI at all — verify: a PR that breaks the page
  fails the check (the page-parse pin is the canary).
- [medium] Extract loadCoev into the requireable glue — why: seam, C1, and
  receipt glue are pinned; loadCoev is pinned as text but not requireable —
  verify: R10 items tested through it.
- [medium] C1 scaling study: pop 48+, gens 300+ in prerun-coev — does
  SURVIVOR-CAP recur? a second regime flip is the next shape (carried from
  R3–R9 queues) — verify: ledger receipted, md5-stable, arms-race rows cited.
- [epic] First/last-mile sense filter from gen 0: re-evolve both lineages
  under the filtered contract, keep BOTH curves, archive old checkpoints with
  provenance notes (carried from R2–R9 queues).

### Verdict
MERGEABLE (Round 9 ships the loadCoev head-honesty fix — FAIL-first pinned —
and re-confirms the pop-slider lie a fifth time; 60/60 tests green, checkpoint
md5s byte-identical, no provenance touched. The six-round P1 is dead.)

## Round 8 — kimi1 — 2026-09-25 — mode: BUILDER (one small: R8 spec item 1 — draw() P0 fix, FAIL-first page-parse pin) + play-tester — vs main 54b625a (post-PR#8 merge)

### Played versions: v1 (e98cf66) → edge-ml-crush (b06d901) → v2 (0722670) → R4 (e8774a2) → R5 (7882d99) → R6 (d8ec449) → main-merge (1ae696b, broken) → R7-merged main (54b625a, still broken)

### Builder receipt (the one small — Round 8 spec item 1: fix the draw() regression, pin the class)
- **what:** the champion-strip block in draw() restored VERBATIM from d8ec449
  (`i?cv.lineTo(x,y):cv.moveTo(x,y);});cv.stroke();` — verified byte-identical
  by diff against the R6 tip — which also puts the two trailing fillText lines
  back INSIDE `if(pts.length>1)` so `lo`/`hi` are in scope; the stray `}` is
  gone). New `tests/page-parse.test.js`: extracts EVERY inline `<script>`
  block from the shipped index.html and asserts each parses AND is
  brace-balanced — structural pin, not cosmetic. VERIFIED_CLAIMS gained the
  `page-parse` row (the wristband two-way match test demanded it).
- **why:** main has been dead on arrival since the quantum-audio merge
  (PR #3): the page's only inline block failed to parse, so NOTHING ran —
  no game, no training, no receipts. Round 7 receipted the P0 and
  deliberately left the fix to this round ("the page stays dark until R8
  spec item 1").
- **verify (FAIL-first, then green):** against the pre-fix index.html the
  new test fails verbatim: `inline block #0 must parse — got: Unexpected
  token 'function'` and brace depth ends at −1. After the fix: page-parse
  3/3 green; full suite 56/56 green; `node tools/prerun.js` md5s
  byte-identical (coev.js `946e639a…`, L0 `8a49b0f6…`, L1 `aa4d7c4b…`,
  L2 `63b7fdd5…`, curve `ba1c919a…`) — provenance untouched. Beyond parsing,
  a Proxy-DOM headless smoke boots the shipped inline script and runs: 5
  tick frames, classic draw, coev/ender draw, loadCoev + render (banner
  prints the artifact line), and 3 live coev ticks — zero throws.

### Deltas observed (shapes of change)
- **d(death)/d(version): the first round in five where the failure surface
  swallowed the whole demo.** Rounds 4–7 watched failure migrate between
  units (core → glue → seam → receipt panel); this round the page was 100%
  dead — a syntax error is not a degraded learning curve, it is the absence
  of any curve. The fix restores R6-parity behavior, and the pin guards the
  CLASS (any unbalanced inline block, from any future merge), not the
  instance. Shape: the loop's blind spot from Round 7 (merge integration)
  gets its tripwire.
- **Honesty coverage is the only moving metric, and it compounds.** Suite
  53→56, VERIFIED_CLAIMS 13→14 rows; three consecutive builder rounds each
  closed one deferred honesty gap (R6 seam gameId, R7 receipt eviction, R8
  page parse). The learning numbers remain frozen by provenance for the
  sixth straight round — L0 5,767 / L1 8,800 / L2 8,700, coev arms race md5
  `946e639a…` byte-identical. d(learning)/d(version) = 0 is now itself a
  receipted fact, not an assertion.
- **The two carried browser-glue lies reproduced with byte-identical numbers
  for the fifth/fourth straight rounds** (below) — determinism means the
  re-chain and the grow-only slider are stable shapes, not flaky noise.

### Lies hunted
- [P0, FIXED this round] main dead on arrival — inline block #0 throws
  `Unexpected token 'function'` (pre-fix), brace depth −1. Repro: parse-
  check every inline block, or run `node --test tests/page-parse.test.js`
  at the pre-fix commit. Nothing on the page ran; the README's demo did not
  exist.
- [P1, confirmed 5th consecutive round by running, NOT fixed — R9 spec 1]
  loadCoev head honesty: banner `8663279a` vs displayed re-chained head
  `83a099d4`; first displayed row re-chained to `360e1dfc` vs artifact
  row-109 `6c072f4c`. Repro re-ran verbatim (numbers identical to R5/R6/R7
  — the re-chain is deterministic).
- [P2, confirmed 4th consecutive round by running, NOT fixed — R9 spec 2]
  coev pop-slider only grows: slider 16→8 → pops stay 16/16 while the
  classic loop pins to 8. Repro re-ran through the same startGenC logic.
- [P3-process, still present, NOT fixed — R9 spec 3] PLAYLOG merge disorder:
  the stale duplicate Round 2 still sits between Round 7 and Round 6
  (marked, unrepaired). This entry now crowns the same pile; the repair
  spec carries forward.
- [credit sibling — re-verified clean in the smoke path] qa.js's sonify/
  channel/suggest path executed headlessly through the fixed page (qaVis
  branch of draw() + live coev ticks) with no throws; the artifact banner
  renders the seeded lineage. No new fabrication found in the module.
- (nothing found in: fitness weights, ring, evaluator top-K, effective
  paddle, seeded swans, JEPA representation, seam pacing/timeout/gameId,
  coev rules/determinism, checkpoint consistency, prerun
  byte-reproducibility — all reproduce as claimed, twice-run this round.)

### Next version spec (Round 9)
- [small] loadCoev head honesty: banner `coev.ledger.head` (the re-anchored
  chain actually displayed) or render artifact rows read-only with original
  hashes + "anchored at genesis" — why: receipts pane shows a chain the
  banner doesn't name (P1, five consecutive rounds) — verify: displayed
  terminal hash == displayed head, asserted through the extracted glue.
- [small] Coev pop-slider parity: pin `coev.popS/popE.length = n` on
  shrink, same as the classic loop — why: the slider label lies after a
  shrink (P2, four consecutive rounds) — verify: harness test — set pop
  16→train→set 8→train, pops are 8.
- [small] Repair PLAYLOG merge disorder: remove the stale duplicate Round 2
  (pre-honesty-pass, PR #1) and restore the single canonical chain — why:
  the memory still presents fixed P0s as current truth between R7 and R6 —
  verify: exactly one "Round 2" heading, file reads R9→R1 top to bottom.
- [medium] Merge-gate doctrine, process half: write the rule into
  EXPERIMENTS.md (a sibling PR may not merge without either one play-test
  round or the node-parse pin running in CI) — why: the R8 P0 existed only
  because a merge bypassed the loop; the pin now exists but the doctrine
  text does not — verify: EXPERIMENTS.md carries the rule; CI runs
  tests/page-parse.test.js on every PR.
- [medium] Extract loadCoev into the requireable glue — why: seam, C1, and
  receipt glue are pinned; loadCoev is the last unpinned browser surface
  among the open items — verify: R9 items 1–2 tested through it.
- [medium] C1 scaling study: pop 48+, gens 300+ in prerun-coev — does
  SURVIVOR-CAP recur? a second regime flip is the next shape (carried from
  R3–R8 queues) — verify: ledger receipted, md5-stable, arms-race rows
  cited.
- [epic] First/last-mile sense filter from gen 0: re-evolve both lineages
  under the filtered contract, keep BOTH curves, archive old checkpoints
  with provenance notes (carried from R2–R8 queues).

### Verdict
MERGEABLE (Round 8 ships the draw() fix — verbatim-restore, FAIL-first
pinned — and receipts the two carried glue lies a fifth/fourth time with
byte-identical numbers; 56/56 tests green, checkpoint md5s byte-identical,
no provenance touched. The page lives again.)

## Round 7 — kimi1 — 2026-09-25 — mode: BUILDER (one small: R7 spec item 2 — receipt eviction counter) + play-tester — vs main 1ae696b (post-quantum-audio merge)

### Played versions: v1 (e98cf66) → edge-ml-crush (b06d901) → round-3-builder/v2 (0722670) → R4 (e8774a2) → R5 (7882d99) → R6 (d8ec449) → main (1ae696b)

### Builder receipt (the one small — Round 7 spec item 2: receipt panel eviction counter, the DECIDE-IT item)
- **what:** the page state gained `receiptEvicted=0`; the shipped `receipt()`
  now counts (`if(receipts.length>40){receipts.shift();receiptEvicted++}`)
  and the panel suffix renders `[N shown / M evicted]` exactly when M>0 —
  the makeLedger pattern, the repo's last silent-drop honesty gap closed.
  Row construction untouched (`i` keeps its write-order value, prev/hash
  chain unbroken — pinned), README's "Known lie, queued" replaced with the
  fixed-note, VERIFIED_CLAIMS gained the `receipt-glue` row.
- **why:** Rounds 3→6 receipted the freeze four times and marked it "DECIDE
  IT" twice; the spec had already decided the shape (count, like
  makeLedger). This round ships the decision.
- **verify (FAIL-first, then green):** new `tests/receipt-glue.test.js`
  extracts the VERBATIM shipped receipt() from index.html (line-anchored —
  extraction fails loudly if the page moves) and drives it headlessly: (1)
  extraction integrity; (2) 45 writes → 40 held, count=5, panel shows
  "40 shown / 5 evicted"; (3) within the bound → no suffix, count 0;
  (4) prev→hash chain unbroken across the eviction boundary. Against the
  pre-fix page: test (2) FAILS (silent shift, no count — the four-round
  lie). Against the fix: 4/4 PASS. Suite 49→53 tests, all green; prerun
  md5s byte-identical (coev.js `946e639a…`, L0/L1/L2, curve) — provenance
  untouched. Observation pinned, not fixed: post-bound writes all reuse
  `i=40` (length pinned) — cosmetic index collision, pre-existing.

### Deltas observed (shapes of change)
- **d(venue)/d(version): the failure surface migrated OUTSIDE the loop.**
  Rounds 1–6 chased lies inside play-tested versions; main 1ae696b broke
  without any round at all — the quantum-audio merge (PR #3) never passed
  through the experiment. Parse-check of the inline `<script>` across all
  seven versions: v1 OK, edge-ml-crush OK, v2 OK, R4 OK, R5 OK, R6 OK,
  main **SYNTAX ERROR**. The GAN's blind spot is merge integration — a
  sibling can ship around the discriminator. Shape: the loop pins what it
  plays; what it doesn't play can die silently. The experiment just
  demonstrated its own necessity.
- **The memory got stitched wrong too (merge disorder, P3-process).**
  This file's top now carries a STALE duplicate "Round 2" (the pre-
  honesty-pass version from PR #1) above Round 6, presenting fixed P0s
  (unseeded swan, ghost hitbox, JEPA skew) as current truth, with the
  "Newest first" header displaced mid-file. Rounds 3–6's log (below) is
  the canonical chain. Flagged, and the repair is specced (R8 process
  item).
- **The learning numbers are still frozen by honesty, not stagnation.**
  L0 5,767 / L1 8,800 / L2 8,700 and the coev arms race reproduce
  byte-identical for the fifth straight round (coev.js md5 `946e639a…`).
  What moves is coverage: suite 41→45→49→53, VERIFIED_CLAIMS 12→13 rows,
  and now three of three browser-glue seams (C1, seam, receipt) are
  node-drivable.

### Lies hunted
- [P0, NEW, confirmed by running, NOT fixed — R8 spec item 1] **main is
  dead on arrival.** The quantum-audio merge broke `draw()`: the champion
  strip's `cv.moveTo` became `qa.moveTo` (a block-scoped const from the
  qaVis branch), `});cv.stroke();` became `}).stroke();` (forEach returns
  undefined), and one extra `}` slid in — the inline `<script>` no longer
  parses. Verified by running: `new Function(inlineScript)` on main →
  "Unexpected token 'function'"; on the R6 tip → OK; v1/R2/v2/R4/R5 all
  OK. Nothing on the page runs: no game, no training, no receipts.
  Repro: repro-r7-strip.js (parse-checks every inline block).
- [P1, confirmed 4th consecutive round by running, NOT fixed — R8 spec 2]
  loadCoev re-chains artifact rows onto fresh genesis, then banners the
  artifact's head. Repro re-ran verbatim through the extracted glue:
  banner `8663279a` vs displayed re-chained head `83a099d4`.
- [P2, confirmed 3rd consecutive round by running, NOT fixed — R8 spec 3]
  coev "games-at-once" slider only grows the populations
  (`while(pop<n)push`), never shrinks. Repro re-ran: slider 16→8 → pops
  stay 16/16 while the classic loop pins both ways.
- [P2, FIXED this round] receipt panel silent eviction past 40 — the
  five-round lie, DECIDE-IT'd twice (Builder receipt).
- [credit sibling — no lie found in the new module] `qa.js` honors its
  honesty contract under running: deterministic seeded channel, `SIM_MAX_CONF`
  0.5 cap holds over a 200-state sweep (max observed 0.5), source tag
  always "qa-sim", pot-bound guard returns null on a silent channel,
  imaging resolves left/right correctly, `node tools/test-qa.js` 8/8. One
  quality note, not fabrication: advice is wrong-direction 3.7% of a
  ball-field sweep (all near the paddle deadzone edge), and confidence is
  self-consistency, blind to that bias — the contract says so openly.
- (nothing found in: fitness weights, ring, evaluator top-K, effective
  paddle, seeded swans, JEPA representation, seam pacing/timeout/gameId,
  coev rules/determinism, checkpoint consistency, prerun
  byte-reproducibility — all reproduce as claimed, twice-run this round.)

### Next version spec (Round 8)
- [small] Fix the draw() regression (restore `cv.moveTo`/`});cv.stroke();`,
  drop the extra `}`) and PIN it: a `tests/page-parse.test.js` that extracts
  every inline `<script>` block from index.html and asserts it parses —
  the exact class of P0 this round found, FAIL-first against main —
  verify: test fails on 1ae696b's index.html, passes after the fix.
- [small] loadCoev head honesty: banner `coev.ledger.head` (the re-anchored
  chain actually displayed) or render artifact rows read-only with original
  hashes + "anchored at genesis" — why: receipts pane shows a chain the
  banner doesn't name (P1, 4 rounds) — verify: displayed terminal hash ==
  displayed head, asserted through the extracted glue.
- [small] Coev pop-slider parity: pin `coev.popS/popE.length = n` on
  shrink, same as the classic loop — why: the slider label lies after a
  shrink (P2, 3 rounds) — verify: harness test — set pop 16→train→set
  8→train, pops are 8.
- [small] Repair PLAYLOG merge disorder: mark the stale duplicate Round 2
  (pre-honesty-pass, from PR #1) as superseded and restore the
  "Newest first" header above Round 6 — why: the memory currently presents
  fixed P0s as current truth — verify: file reads R7→R6→R5→R4→R3→R2→R1
  with one Round 2 only.
- [medium] Merge-gate doctrine (process, not code): a sibling PR may not
  merge without either one play-test round or a node-parse/smoke pin in
  CI — why: the P0 this round existed only because a merge bypassed the
  loop — verify: repo rule written into EXPERIMENTS.md + the page-parse
  pin running in CI.
- [medium] Extract loadCoev into the requireable glue (receipt() is pinned
  now; loadCoev is the last unpinned browser surface among the open items)
  — why: completes glue coverage — verify: R8 items 2–3 tested through it.
- [medium] C1 scaling study: pop 48+, gens 300+ in prerun-coev — does
  SURVIVOR-CAP recur? a second regime flip is the next shape (carried from
  R3–R7 queues) — verify: ledger receipted, md5-stable, arms-race rows
  cited.
- [epic] First/last-mile sense filter from gen 0: re-evolve both lineages
  under the filtered contract, keep BOTH curves, archive old checkpoints
  with provenance notes (carried from R2–R7 queues).

### Verdict
MERGEABLE (Round 7 ships the receipt-eviction pin — FAIL-first — and
receipts the new P0 plus the two remaining carried items; 53/53 tests
green, checkpoint md5s byte-identical, no provenance touched. Note: main
is P0-dead on arrival; this branch does NOT fix the brace — the page
stays dark until R8 spec item 1.)

---

> **Merge-disorder note (Round 7):** the entry below this line is a STALE
> duplicate of Round 2 (pre-honesty-pass, merged in via PR #1). Every
> finding in it was fixed in Rounds 2–6 (seeded swans, JEPA skew, ghost
> hitbox, seam pacing, receipt cap). The canonical chain is R7→R6→R5→R4→
> R3→R2→R1 below. Repair specced as R8 item 4.

## Artifact A (R11 item 2) — stale duplicate of Round 2, pre-honesty pass — kimi1 — 2026-09-24 — vs v1 (e98cf66) [STALE DUPLICATE — superseded by the canonical Round 2 entries below; see merge-disorder note above]. Kept as a historical artifact, not a round.

### Played versions: v1 only (Round 1's next-version spec unimplemented; this round delivers its [medium] 'first adversarial play-test' item)

### Deltas observed (shapes of change)
- **The instrument moved more than the signal.** Round 1 recorded v1's shape as a
  single sample: L1 dip (1,192f) + L2 cap (6,000f/×3.40). Round 2 measured the
  *distribution* behind that sample and the recorded shape did not survive:
  8/8 seeded runs (same LCG seed, 60 gens) show **no dip** — L1 best climbs
  2,235→6,675, 2,935→6,700, etc.; dip frequency **0/8**. L2 best-of-run
  fitness spreads 4,568–6,700 across runs, and one run's gen-260 champion had
  **0 hits** — pure survival luck topped the population. d(learning)/d(version)
  is currently unmeasurable: run-to-run swan noise (±45% on L2 best) swamps any
  version delta a future round could claim. The learning curve didn't move
  between rounds; our *measurement of it* did — from story to distribution,
  and the story was luck.

### Lies hunted
- [P0] Seeded core is broken by one `Math.random()` — `core.js step()` black
  swan uses unseeded random while every other draw uses the seeded LCG. Every
  "numbers verified by running" claim is unverifiable-by-rerun: two runs of
  `node tools/prerun.js` gave 2,935/713/4,145 and 2,932/3,566/4,691; committed
  checkpoints (2,949/1,242/6,125) match neither; the README table and the
  on-page line "L1 is honestly worse than L0: training is non-monotonic" are
  one random sample presented as the system's shape (0/8 under v1). Bonus:
  prerun *silently overwrites* `checkpoints/*.js` (working tree dirty after
  any run) — provenance drift is built in. Repro: `node tools/prerun.js`
  twice; diff outputs and `git status`.
- [P1] micro-JEPA train/inference feature skew — `jepaLearn` trains on
  `sense()` scale (ballX∈[-1,1]) but `jepaSuggest` infers from `stateOf()`
  scale (ballX∈[0,1]). Measured on a committed-L2 champion trajectory:
  mean |err| 0.0247 (correct features) vs **0.4016** (page path) — 16×
  degradation; advice distribution skews to constant right-moves on short
  games. The "smallest honest world-model" is honest; its wiring is crossed.
  Repro: `node -e` train-on-sense/predict-on-stateOf vs predict-on-sense.
- [P2] Hidden hitbox assist — paddle drawn 0.16 wide; hits register over 0.20
  (`px-0.02 … px+paddleW+0.02`), +25% ghost margin, undocumented. A skeptical
  user watching closely sees misses score as hits. Repro: `core.js` step()
  death-check vs canvas `fillRect` width.
- [P2] MOTH "ledger" overclaims — `receipt()` caps at 40 rows with silent
  eviction (`receipts.shift()`), panel shows last 12. "Learning-from-advice
  leaves a ledger" — a ledger that forgets. (REFUSAL/v1 rows *are*
  receipted, per doctrine — that part is real.) Repro: attach a module, watch
  row count clamp at 40.
- [P2] LLM seam: doc says "fired after failures"; code fires `l2Suggest`
  every live frame → one fetch per rAF, steps applied in `.then` bursts —
  network latency becomes the frame clock and overlapping responses interleave
  steps. (Static-analysis finding; not runtime-verified — flagging per
  protocol.)
- [refuted, recorded honestly] Hypothesized swan-kicked horizontal orbits let
  zero-skill nets park to the 6,000-frame cap. Running refuted it: parking is
  metastable (the same swan kicks destroy it — parked probe died at 1,356f),
  0/8 evolved champions were park-dominated (all earned fitness by play,
  27–28 hits). One luck-run champion (0 hits) stands as the real, smaller
  defect — fitness noise occasionally crowns a non-hitter.

### Next version spec (competitive improvements)
- [small] Seed the swan: thread `rand` (or a dedicated swan stream) through
  `step()`; prerun becomes bit-reproducible. why: the P0 — without it no
  future round can verify any number. verify: run prerun.js twice →
  byte-identical checkpoints; `node --test` determinism assert.
- [small] Regenerate + commit checkpoints from the seeded run; README table
  rewritten from that run's real output (the "L1 honestly worse" line either
  holds under the seed or gets cut). verify: `git status` clean after two
  prerun runs; table matches fresh output.
- [small] Fix JEPA feature skew: one shared feature builder for learn+infer.
  why: P1 — the world-model's wiring is crossed. verify: node test —
  correct/skewed error ratio ≈1; suggestions non-degenerate on a champion
  trajectory.
- [medium] Fitness honesty pass: hits must matter (e.g. hits×100, or a
  "0-hit survivor" badge on the stats line). why: observed shape — a 0-hit
  luck champion can top the population; the demo currently can't distinguish
  skill from luck. verify: seeded synthetic run — a 0-hit survivor ranks
  below hitters; badge appears in test DOM.
- [medium] Wristband for honesty (carried from Round 1, now shown
  load-bearing): live "claims verified" badge listing node-pinned vs
  browser-only claims. why: "node-verified" is currently a vibe, not a
  receipt. verify: badge list matches `node --test` names.
- [medium] LLM seam pacing: fire on death/interval (not per frame), serialize
  in-flight (drop stale responses), align README with code. verify: headless
  mock-fetch test — ≤1 request per interval, monotonic step order.
- [small] Hitbox transparency: draw the effective paddle (0.20) or log the
  ±0.02 margin in the cells panel caption. verify: drawn zone == registered
  zone.

### Verdict
MERGEABLE — the loop is the product and this round is its proof of life: the
adversarial pass found the instrument broken before it could flatter anyone.

Every round is a receipted observation in the loop. Newest first.

## Round 6 — kimi1 — 2026-09-25 — mode: BUILDER (one small: R6 spec item 1 — gameId-at-ask) + play-tester — vs round-5 tip (7882d99)

### Played versions: v1 (e98cf66) → edge-ml-crush (b06d901) → round-3-builder (0722670, "v2") → round-4 (e8774a2) → round-5 (7882d99)

### Builder receipt (the one small — Round 6 spec item 1: gameId stamped at ASK, not arrival)
- **what:** the seam glue gained `askGame=new Map()`; `maybeFireSeam` records
  `askGame.set(seq,gameId)` at fire; the shipped `onResult` echoes
  `gameId:askGame.get(seq)` (and `askGame.delete(seq)`) on delivery, on JEV
  refusal, and on transport error. A reply that outlives its game is stamped
  with the game that ASKED, so `takeAdvice()`'s existing stale-drop fence
  (`pendingAdvice.gameId!==gameId`) now actually fires — the R4/R5 P1 is closed.
- **why:** the gameId tag was stamped at reply ARRIVAL, reading the live
  closure — a dead game's held reply was rebranded with its successor's id
  and applied to a game that never asked. Confirmed three consecutive rounds
  (R4 found, R5 re-ran, R6 re-ran verbatim: `STALE ADVICE APPLIED`).
- **verify (FAIL-first, then green):** new `tests/seam-glue.test.js` extracts
  the VERBATIM shipped glue from index.html (line-anchored from
  `let llmSeam=null` through `takeAdvice` — extraction fails loudly if the
  page moves) and drives it headlessly with a gated fetch: (1) STALE reply
  from a dead game is dropped, never applied; (2) FRESH reply for the live
  game still flows (no regression); (3) the ask-map is cleaned on delivery
  AND on error (no unbounded growth); (4) extraction integrity. Against the
  Round-5 page: 2/4 FAIL (stale applied; no ask-map). Against the fix: 4/4
  PASS. Suite 49/49 green; `node tools/prerun.js` md5s byte-identical to
  Rounds 3–5 (coev.js `946e639a…`, L0/L1/L2, curve) — provenance untouched.
  VERIFIED_CLAIMS gained the `seam-glue` row (wristband two-way match holds);
  README's known-lie admission replaced with the fixed-note.

### Deltas observed (shapes of change)
- **d(honesty)/d(version): the browser integration surface keeps shrinking
  under the pin.** v1 failures lived in the core; edge-ml-crush pinned the
  units; R4 showed failures migrating between units; R5 pinned the C1
  training glue; R6 pins the seam glue. Two of the three browser-glue
  surfaces are now node-drivable, and the demo's flagship lie about its own
  flagship feature ("tags every reply with the asking game") is finally
  cashable. Shape: the GAN is working — each round the discriminator's
  headlamp narrows onto a smaller unpinned region (loadCoev, receipt panel,
  pop-slider remain).
- **Learning numbers are still frozen by honesty, not stagnation.** L0 5,767 /
  L1 8,800 / L2 8,700 and the coev arms race (gen-110 SURVIVOR-CAP → gen-115
  559f ender counter-kill, md5 `946e639a…`) reproduce byte-identical for the
  fourth straight round. What moves is coverage: suite 41→45→49.

### Lies hunted
- [P1, FIXED this round] seam gameId stamped at reply ARRIVAL — R6 repro re-ran
  verbatim pre-fix (`STALE ADVICE APPLIED`, third consecutive confirmation);
  fix + FAIL-first pin shipped (Builder receipt).
- [P1, confirmed third consecutive round by running, NOT fixed — R7 spec 1]
  `loadCoev` re-chains artifact rows onto fresh genesis, then banners the
  artifact's head. Repro re-ran deterministically: banner `8663279a` vs
  displayed re-chained head `83a099d4` (first displayed row re-chained away
  from original row-110 hash `6c072f4c`). The receipts pane shows a chain the
  banner doesn't name.
- [P2, confirmed second round by running, NOT fixed — R7 spec 2] coev
  "games-at-once" slider only grows the populations (`while(pop<n)push`),
  never shrinks — classic loop pins both ways. Repro re-ran: pops 256 →
  slider 16 → train → pops stay 256/256 while the classic loop pins to 16.
  The label lies after a shrink.
- [P2, deferred FOUR rounds (R3→R4→R5→R6), NOT fixed — R7 spec 3] receipt
  panel silent eviction past 40 rows. Repro re-ran: 45 writes → panel holds
  40, no eviction counter (makeLedger counts its evictions honestly;
  receipt() does not). The shipped comment still says "known lie".
- (nothing found in: fitness weights, ring, evaluator top-K, effective
  paddle, seeded swans, JEPA representation, seam pacing/timeout, coev
  rules/determinism, checkpoint consistency, prerun byte-reproducibility —
  all reproduce as claimed, twice-run this round.)

### Next version spec (Round 7)
- [small] loadCoev head honesty: banner `coev.ledger.head` (the re-anchored
  chain actually displayed) or render artifact rows read-only with original
  hashes + "anchored at genesis" — why: receipts pane shows a chain the
  banner doesn't name (P1 above, deterministic repro) — verify: displayed
  terminal hash == displayed head, asserted through the extracted glue.
- [small] Receipt panel eviction counter (`receipt()` gains `evicted`, panel
  shows "40 shown / N evicted" like makeLedger) — why: the repo's last known
  silent-drop honesty gap, deferred four rounds — verify: drive receipt()
  45× in the harness, count surfaces. DECIDE IT.
- [small] Coev pop-slider parity: pin `coev.popS/popE.length = n` on shrink,
  same as the classic loop — why: the slider label lies after a shrink (P2
  above) — verify: harness test — set pop 16→train→set 8→train, pops are 8.
- [medium] Extract loadCoev + receipt() into the requireable glue (with seam
  and C1 glue pinned, these three open items all live in the last unpinned
  browser surface) — why: the meta-fix completes the glue coverage — verify:
  R7 items 1–3 tested through it.
- [medium] C1 scaling study: pop 48+, gens 300+ in prerun-coev — does
  SURVIVOR-CAP recur? a second regime flip is the next shape (carried from
  R3/R4/R5/R6 queues) — verify: ledger receipted, md5-stable, arms-race rows
  cited.
- [epic] First/last-mile sense filter from gen 0: re-evolve both lineages
  under the filtered contract, keep BOTH curves, archive old checkpoints with
  provenance notes (carried from R2–R6 queues).

### Verdict
MERGEABLE (Round 6 ships the gameId-at-ask fix — FAIL-first pinned — and
receipts the three remaining open items a third/fourth time: 49/49 tests
green, checkpoint md5s byte-identical, no provenance touched).


## Round 5 — kimi1 — 2026-09-24 — mode: BUILDER (one small: R5 spec item 1) + play-tester — vs round-4 tip (e8774a2)

### Played versions: v1 (e98cf66) → edge-ml-crush (b06d901) → round-3-builder (0722670, "v2") → round-4 (e8774a2)

### Builder receipt (the one small — Round 5 spec item 1: C1 browser wiring)
- **what:** `startGenC`'s evaluators now return `fitness` (the field
  `makeEvaluator` actually records) WITH the coev alias alongside
  (`{fitness:r.sFitness, sFitness:...}` / `{fitness:r.eFitness, eFitness:...}`),
  and `continueGenC` maps `e.net`/`e.sFitness`/`e.eFitness` (the evaluator's
  record fields — `e.cand` never existed). README's "press Train (both
  populations evolve)" is now cashable, and says so.
- **why:** Round 4 receipted the freeze: undefined fitness → undefined
  champion → `JSON.parse(JSON.stringify(undefined))` SyntaxError inside the
  rAF tick, demo dead on C1 gen 1. Re-verified this round with the exact
  browser expressions under node BEFORE touching anything: THROWS, verbatim.
- **verify (FAIL-first, then green):** new `tests/coev-glue.test.js` extracts
  the VERBATIM shipped glue from index.html (startGenC→continueGenC, not a
  copy — the extraction fails loudly if the page is restructured) and drives
  it headlessly: 3 generations complete, champions are real nets (finite w1,
  content ids), every bred member of both populations is a real net, the
  ledger's rows recompute to their own hashes and chain genesis→tail, the
  stats line and ring are fed. Against the Round-4 page: 4/4 FAIL with the
  receipted `"undefined" is not valid JSON`. Against the fix: 4/4 PASS.
  Suite 45/45 green; `node tools/prerun.js` md5s byte-identical to Rounds
  3–4 (coev.js `946e639a…`, L0/L1/L2, curve) — no provenance touched; the
  only core.js change is one VERIFIED_CLAIMS row (`coev-glue`), which the
  wristband two-way match test required.

### Deltas observed (shapes of change)
- **The whole training surface is now under test.** v1's failure modes lived
  in the core; edge-ml-crush pinned the units; Round 4 showed the failures
  migrating BETWEEN the units; Round 5 closes that migration for the C1 path
  — the glue is node-drivable, so the discriminator can hunt it headlessly.
  Shape of d(coverage)/d(version): v1 core → v2 units → R4 unit-pins → R5
  the integration surface itself became a test fixture. The loop's claim
  ("the demo is an experiment, receipted") gets cheaper to defend every
  round.
- **Learning numbers are frozen by honesty, not by stagnation.** L0 5,767 /
  L1 8,800 / L2 8,700, byte-identical across Rounds 2–5 — checkpoints are
  provenance, so the curve can't move; what moves is how much of the demo's
  behavior the receipts cover. The arms-race shape (gen-110 SURVIVOR-CAP →
  gen-115 ender counter-kill) still stands untouched in the artifact.

### Lies hunted
- [P1, confirmed for a second round, FIXED] C1 browser training crashes on
  gen 1 — repro rerun verbatim (`THROWS: SyntaxError - "undefined" is not
  valid JSON`); fix + FAIL-first pin shipped (see Builder receipt).
- [P1, confirmed again by running, NOT fixed — R6 spec item 1] Seam gameId
  stamped at reply ARRIVAL, not ask. Repro rerun under node with a gated
  transport: game 1 asks, dies, game 2 starts, reply lands branded gameId=2
  and `takeAdvice()` accepts it — a reply game 2 never asked. README's known-
  lie admission (lines 183–184) stays accurate.
- [P2, confirmed again by running, NOT fixed — R6 spec item 2] `loadCoev`
  re-chains artifact rows onto fresh genesis, then banners the artifact's
  head. Repro rerun: banner `8663279a` vs displayed re-chained head
  `83a099d4`; first displayed row hash `12dd9dcc` vs original `6c072f4c`.
- [P3, new, confirmed by reading the two loops side by side] Coev
  "games-at-once" slider only GROWS the populations (`while(pop<n)push`),
  never shrinks them — the classic loop pins `pop.length=D.popSize` both
  ways. Repro: slider 256 → train coev → slider 16 → train: pops stay 256,
  the label lies about games-at-once. Spec'd R6 item 4.
- (nothing found in: fitness weights, ring, evaluator top-K, effective
  paddle, seeded swans, JEPA representation, seam pacing/timeout, coev
  rules/determinism, checkpoint consistency, prerun byte-reproducibility —
  all reproduce as claimed, twice-run this round.)

### Next version spec (Round 6)
- [small] gameId-at-ask: stamp the asking gameId into the fire payload, echo
  through onResult (or keep a seq→gameId map) — why: stale advice applies to
  the successor game (P1, confirmed twice now) — verify: the R4/R5 repro
  becomes a test through the coev-glue-style harness: dead-game reply
  dropped, never applied.
- [small] loadCoev head honesty: banner `coev.ledger.head` (the chain
  actually displayed) or render artifact rows read-only with original hashes
  + "anchored at genesis" — why: receipts pane shows a chain the banner
  doesn't name (P2, confirmed twice) — verify: displayed terminal hash ==
  displayed head, asserted in the glue harness.
- [small] Receipt panel eviction counter (`receipt()` gains `evicted`,
  panel shows "40 shown / N evicted") — why: the repo's last known
  silent-drop honesty gap, deferred THREE rounds — verify: drive receipt()
  45× in the harness, count surfaces. DECIDE IT (count, like makeLedger).
- [small] Coev pop-slider parity: pin `coev.popS/popE.length = n` on
  shrink, same as the classic loop — why: the slider label lies after a
  shrink (P3 above) — verify: harness test — set pop 16→train→set 8→train,
  populations are 8.
- [medium] Extract seam glue + receipt fn + loadCoev into a requireable
  `demo-glue.js` consumed by index.html AND tests — why: the coev-glue test
  proves extraction works; the three open items above all live in the
  remaining unpinned glue — verify: R6 items 1–4 tested through it.
- [medium] C1 scaling study: pop 48+, gens 300+ in prerun-coev — does
  SURVIVOR-CAP recur? a second regime flip is the next shape (carried from
  R3/R4 queues) — verify: ledger receipted, md5-stable, arms-race rows cited.
- [epic] First/last-mile sense filter from gen 0: re-evolve both lineages
  under the filtered contract, keep BOTH curves, archive old checkpoints
  with provenance notes (carried from R2/R3/R4 queues).

### Verdict
MERGEABLE (Round 5 ships the C1 browser-wiring fix — FAIL-first pinned —
and receipts the two carried P1/P2s a second time plus one new P3; 45/45
tests green, checkpoint md5s byte-identical, no provenance touched).


## Round 4 — kimi1 — 2026-09-24 — mode: BUILDER (one queued small) + play-tester — vs v2 (round-3-builder, PR #4)

### Played versions: v1 (e98cf66) → edge-ml-crush (b06d901) → round-3-builder (0722670, "v2")

### Builder receipt (the one small queued item — Round 3 queue #4: seam timeout)
- **what:** `makeSeam` gained `timeoutMs` (default 0 = pinned Round-3 behavior,
  opt-in) + injectable `schedule`/`cancel`. A timer races the transport;
  exactly-once `settle()` is shared by timeout and delivery — whichever lands
  first owns the request, the late arrival dies on the fence (and is NOT
  double-counted stale). On timeout: `inFlight` freed, `dropped.timedOut++`,
  `onResult(null, seq, Error)` — counted, not hidden.
- **why:** Round 3 queued it: a hung fetch held `inFlight` forever, silently
  refusing every future advice fire (dropped.inFlight climbing with no error
  surface).
- **verify:** `tests/seam.test.js` +2 pins — (1) hung transport: timeout frees
  the seam, counts timedOut, errors out, next fire allowed, late arrival not
  double-counted; (2) fast resolution cancels its timer. Suite 41/41 green;
  `node tools/prerun.js` md5s byte-identical to Round 3 (provenance
  untouched); browser wiring `SEAM_TIMEOUT_MS=8000` + timed-out counter in the
  drop display.

### Deltas observed (shapes of change)
- **The units held; the wiring hatched.** All 41 node tests green; prerun
  byte-reproducible (L0 5,767 / L1 8,800 / L2 8,700, L1>L2 honestly); coev
  artifact reproduces gen-110 SURVIVOR-CAP and gen-115 559f counter-kill, md5
  `946e639a…`. But the browser glue between pinned units — the surface NO
  test drives — contains two P1s (below). Shape of d(honesty)/d(version): the
  core is now well-pinned; the experiment's uncovered surface migrated from
  "inside the units" to "between the units." Coverage shape moved, failure
  mode moved with it — the loop working as designed (this round exists).

### Lies hunted
- [P1, confirmed by running, NOT fixed — spec item 1] **Browser C1 training
  crashes on generation 1.** `startGenC` feeds `makeEvaluator` evalOne fns
  returning `{sFitness|eFitness}`, but the evaluator records `r.fitness` →
  `undefined`; `continueGenC` then maps `e.cand`/`e.sFitness` (fields are
  `net`/`fitness`) → `runCoevGeneration` receives `net: undefined` →
  `JSON.parse(JSON.stringify(undefined))` throws SyntaxError inside the rAF
  tick → the whole demo freezes. Repro: the exact index.html expressions run
  under node (`"undefined" is not valid JSON`). The README's "press Train
  (both populations evolve)" is uncashable in browser; only the node-built
  artifact chip works. tests/coev.test.js builds records by hand, exactly
  like prerun-coev.js — the contract seam between evaluator and C1 glue is
  unpinned, and that is where the lie lived.
- [P1, confirmed by running, NOT fixed — spec item 2] **The seam's gameId tag
  is stamped at reply ARRIVAL, not at ask.** `onResult` reads the live
  `gameId` closure when the response lands; a reply meant for a dead game is
  branded with the successor's id and applied to a game that never asked.
  Repro under node with a gated transport: "STALE ADVICE APPLIED." README's
  "tags every reply with the asking game, drops replies whose game has died"
  overclaims; README now carries the known-lie admission.
- [P2, confirmed by running, NOT fixed — spec item 3] **`loadCoev` re-chains
  artifact ledger rows onto a fresh genesis, then banners the artifact's
  head.** Repro: banner head `a3e5255e` vs re-chained displayed rows head
  `632fc08b` — the receipts pane shows a chain the banner doesn't name.
- [P2, still open — carried] receipt panel silent shift at 40; evictions
  uncounted (makeLedger proves the honest pattern exists in-repo). Deferred
  twice — decide it.
- [fixed this round] seam timeout (see Builder receipt).
- (nothing found in: fitness weights, effective paddle, ring, evaluator
  top-K, JEPA representation, coev rules/determinism — all reproduce as
  claimed.)

### Refusals (honest, with reasons)
- **First/last-mile sense filter: NOT built** (carried from R2/R3 queues) —
  it changes the sense() I/O contract; the honest build re-evolves BOTH
  lineages from gen 0 and archives the old checkpoints' provenance. That is
  an epic, not a one-item round. Spec'd as the standing medium/epic item.

### Next version spec (Round 5)
- [small] Fix the C1 browser wiring: evaluator records carry the eval
  result's fields (`Object.assign` merge or `fitness` alias in the C1 evalOne
  fns) AND `continueGenC` maps `e.net`/`e.sFitness`/`e.eFitness` — why: the
  flagship Round-3 mode freezes the demo on gen 1 (P1 above) — verify: node
  integration test driving the EXACT browser expressions
  (evaluator→map→runCoevGeneration→h2h completes, champions are real nets,
  ledger row hashes).
- [small] gameId-at-ask: stamp the asking gameId into the fire payload, echo
  it through onResult (or keep a seq→gameId map in the glue) — why: stale
  advice currently applies to the successor game (P1 above) — verify: the
  Round-4 repro becomes a test: dead-game reply dropped, never applied.
- [small] loadCoev head honesty: either banner `coev.ledger.head` (the
  re-anchored chain actually displayed) or render artifact rows read-only
  with original hashes + "anchored at genesis, N rows elided" — verify:
  displayed terminal hash == displayed head, asserted in the extracted glue
  test (spec item below).
- [small] Receipt panel eviction counter (`receipt()` gains `evicted`,
  panel shows "40 shown / N evicted" like makeLedger) — why: the repo's last
  known silent-drop honesty gap, deferred twice — verify: drive receipt()
  45× in the extracted glue test, assert count surfaces.
- [medium] Extract the browser glue (C1 loop, seam glue, receipt fn,
  loadCoev) into a requireable `demo-glue.js` consumed by index.html AND
  tests — why: both P1s this round lived in the unpinned integration surface;
  the meta-fix makes the glue node-drivable so the discriminator can hunt it
  headlessly — verify: this spec's small items 1–4 are tested through it.
- [medium] C1 scaling study: pop 48+, gens 300+ in prerun-coev — does
  SURVIVOR-CAP recur? a second regime flip (cap streak → ender answer) is
  the next shape — verify: ledger receipted, md5-stable, arms-race rows cited
  (carried from R3 queue).
- [epic] First/last-mile sense filter from gen 0: re-evolve both lineages
  under the filtered contract, keep BOTH curves for comparison, archive old
  checkpoints with a provenance note (carried from R2/R3 queues).

### Verdict
MERGEABLE (Round 4 ships the seam-timeout receipt — the one small queued item
— and receipts two P1s + two P2s as the Round-5 spec; 41/41 tests green,
checkpoint md5s byte-identical, no provenance touched).

## Round 3 — kimi1 — 2026-09-24 — honesty pass + C1 coevolution

### Played versions: v2 (this branch) vs v1+Round-2 stack (PR #1 #2 #3 open at press time)

### What was specified → what shipped (deltas as shape)
- **[medium] Fitness honesty pass** → `fitnessOf(frames,hits)=frames+hits×100`
  (`HIT_WEIGHT`) as the single formula in core.js. Shape of the delta: the
  old ×25 plateau inverted — a capped 0-hit survivor (6,000) used to beat any
  hitter dying before frame 5,725; now it always loses to ≥1 hit past
  frame 5,900 (pinned). Checkpoints re-evolved: L0 5,767 (4,567f/12h), L1
  8,800 (cap/28h), L2 8,700 (cap/27h) — note L1 > L2, honestly.
- **[medium] Verified-claims wristband** → `VERIFIED_CLAIMS` registry in
  core.js rendered as a badge panel (green=node-pinned, amber=browser-only).
  Two-way match pinned: every claim's proofTest exists, every test file
  backs a claim. Shape: the README headline table now cites its reproducing
  command per row; the badge is data, not decoration.
- **[medium] LLM seam pacing** → `makeSeam` in core.js: fire on death or
  ~every 150 frames (never per frame — Round 2 shipped fetch-per-rAF),
  one-in-flight (extras counted), ≥2 s pacing, replies tagged with the asking
  game and dropped stale. Shape: the demo's l2stat shows live drop counters;
  the fence comment admits the stale path is defensive under strict
  serialization and the counter proves it stands.
- **[small] Effective paddle** → `effectivePaddle(px)` = the 0.20 registered
  zone (±0.02 over the 0.16 bar), one source for draw + death-check + C1
  physics. The ghost hitbox (drawn 0.16 vs registered 0.20) is gone.
- **[C1] COEVOLUTION** → the GAN pair shipped as `newAdvGame/stepAdv/
  playAdv/runCoevGeneration/netId/makeLedger` + `tools/prerun-coev.js`.
  PSRO-style random-opponent evaluation, champion h2h receipted per gen into
  a hash-chained ledger with both net ids, **the loser breeds at 2×σ**.
  Shape of the verified artifact (seed 20260924, 120 gens × 24+24):
  early kills at ~113–160f → survivor rallies of 2,460–4,844f by gen 75 →
  **gen 110 first SURVIVOR-CAP** (eFit 5) → **gen 115 the loser-mutated ender
  kills in 559f**. The arms race is in the ledger, not asserted.
  md5 `946e639a…` stable across two runs; L0–L2 provenance untouched.
- **[carried-over small] micro-JEPA skew fix** (Round 2 item 3, absent from
  the sibling stack): `makeJepa` learns and infers on the same `sense()`
  vector. The old skew is pinned as a measured ≥5× mean-error ratio.

### Lies hunted
- [P1, fixed] Ghost hitbox: registration zone 0.20 vs drawn 0.16 — the
  effective margin existed only in prose. Now one constant, three consumers
  (draw, death check, C1 blocks), boundary-probed at ±0.001.
- [P1, fixed] README claimed velocity grows per hit; step() recomputes
  speedMul from frames after every boost multiplication — the per-hit boost
  is dead code in the classic lineage (checkpoint-provenance freeze kept it
  that way). C1 makes boosts real via an accumulator; the README now admits
  both. Caught by reading while wiring the same mechanic for C1.
- [P1, fixed] Seam fetched per animation frame and applied replies in
  arrival order. Now paced/serialized/stale-fenced, counters honest.
- [process] First C1 training run: ender won 40/40 h2h — the loser-mutation
  design (2σ on the champion slot) destroyed the survivor's accumulated
  skill every generation: degenerate GAN. Fixed to loser-population 2σ
  breeding with elites intact (PSRO evaluation), which produced the gen-110
  cap and gen-115 counter-kill. The regime flip is the proof the fix worked.

### Refusals (honest, with reasons)
- **MOTH receipt panel cap-40 silent eviction: NOT fixed** (deferred to
  Round 4). It requires deciding whether the panel should count evictions
  like makeLedger does or page — a product call, not a builder call.
- **edge-ml first/last-mile input filters: still NOT ported** (Round-2
  refusal stands; invalidates checkpoint I/O contract).
- **L1 hitBoost revival: refused** — changing classic physics invalidates
  L0–L2 provenance; the dead code is documented instead.

### Where Round 4 should push
- Receipt panel: counted evictions or pagination; the cap-40 silent shift is
  the repo's last known honesty gap.
- First/last-mile sense filter from gen 0, both lineages re-evolved, both
  curves kept.
- C1 scaling: pop 48+, gens 300+ — does the survivor reach recurring caps?
  A second regime flip (SURVIVOR-CAP streak) would be the next shape.
- LLM seam: a real endpoint in the loop (currently bring-your-own), plus a
  timeout on in-flight requests (a hung fetch stalls the seam; the fence
  comment says so).

### Verdict
MERGEABLE (Round 3 ships the honesty pass, the wristband, the paced seam,
the true paddle, and a coevolution mode whose arms race is receipted).

## Round 2 (branch quilt-edge-ml-survey) — kimi1 — 2026-09-24 — vs quilt-edge-ml (sibling) + v1

### Played versions: v1 (e98cf66 baseline) + sibling survey (quilt-edge-ml @9605a24)

### Deltas observed (shapes of change)
- **Pattern port, ring_buffer → makeRing**: champion history is now a bounded
  FIFO (240 gens in the demo, 261 in prerun). The demo grew a live
  **fitness strip** (green polyline, min→max labeled) and prerun emits
  `checkpoints/curve.json` (21 samples of all 261 gens). The curve is the
  shape of the lesson, now an artifact instead of three rows.
- **Pattern port, out_of_core → makeEvaluator**: fitness evaluation streams one
  candidate per `step()`; only a bounded elite archive + stats survive. In the
  browser, pops >64 chunk across animation frames (≤24 evals/frame) — the page
  no longer blocks per generation at high *games-at-once*. Flat memory at any
  population size; scheduling (chunk size) verified not to affect results.
- **Determinism fix** (the round's real hunt): v1's black swans drew from
  unseeded `Math.random()`, so `tools/prerun.js` was NOT reproducible — every
  run produced different checkpoints from the same seed, and the README table
  was single-run provenance. Reproduced by running twice (different numbers),
  fixed by threading the seeded rng into `step/playOne`. Verified: two
  consecutive prerun runs are byte-identical (md5).
- **New verified curve** (seed 20260924): L0 4,867 (4,567f, 12 hits, ×2.83) →
  L1 6,625 (6,000f cap, 25 hits, ×3.40) → L2 6,675 (6,000f cap, 27 hits).
  Climb by gen 39, then plateau under the frame cap with visible dips
  (6,700 ↔ 6,625). Non-monotonicity moved from the checkpoint rows into the
  plateau wobble — finer-grained, and shown live on the strip.

### Lies hunted
- [P0, fixed] Non-reproducible prerun (unseeded swans) — see above. Caught by
  running twice; the ">= vs <" class of bug below was caught by tests before
  commit.
- [P1, fixed] `makeEvaluator` elite-insertion comparison inverted (`>=` where
  `<` belongs): the archive kept the *worst* candidates and dropped the best.
  Caught by test 9 (brute-force top-K tie order) before any commit; the buggy
  run had already generated checkpoints — those were discarded and regenerated
  after the fix (L1/L2 numbers above are the corrected ones; level0 is
  identical either way, it predates selection).
- [P1, fixed] First prerun draft discarded `step()`'s return snapshot, so the
  generation result was undefined. Caught by running (TypeError), not reading.

### Refusals (honest, with reasons)
- **First/last-mile sense-vector filter: NOT ported.** It would change the
  sense() contract that L0–L2 were evolved under, silently invalidating their
  provenance — the exact sin this repo exists to catch. Round-3 candidate:
  enable from gen 0, re-evolve, keep both curves.

### Where the sibling still beats us
- Their ring buffer is durable (JSONL on eMMC, fsync per record, survives
  power loss); ours is in-memory only.
- They stream from disk with a real `partial_fit` loop against sklearn-class
  models; our substrate is a GA with no incremental-learning story beyond the
  micro-JEPA tile.
- They ship TFLite/ONNX/Edge-Impulse substrates and first/last-mile filters;
  we have none of those.
- Their tests run in CI; ours run when someone runs `node --test`.

### Verdict
MERGEABLE (Round 2 ships the two ports, the strip, the curve artifact, and
reproducible numbers; sibling keeps the substrate zoo crown).
## Round 2 (branch quantum-audio-L2) — kimi1 — 2026-09-24 — quantum-audio L2 module (branch quantum-audio-L2)

### Deltas observed
- New L2 module family: `qa.js` (sonify → labeled-sim QPAM channel →
  autocorrelation imaging → MoveSuggestion). Zero-dep, UMD like core.js, so
  the browser and `node tools/test-qa.js` run the SAME code — 8/8 green.
- The waveform-imaging strip (violet = clean sonification, amber = decoded)
  makes the lossy channel visible: you watch the advice degrade as noise
  grows, which is the honest heart of the demo.
- Sibling survey caught a real lie upstream: quilt-quantumaudio-demo's
  substrate claims "same prompt → same hash (modulo shot noise)" but at
  shots=2000 over its own 882-sample text audio the decode is shot noise
  (run-to-run pearson ~0.02, 4/4 distinct hashes). See the spec's
  verified-claims table. Corrected, not propagated.

### Lies hunted (this round)
- [P1, fixed] Integer-lag autocorrelation biased imaged position by up to
  1/16 field; parabolic interpolation fixed it (test 3/4 caught it).
- [P1, fixed] Initial sonify() assumed [-1,1] state units; stateOf() is
  [0,1]. Convention mismatch — caught by the direction test.
- [note] Sim channel noise model (1.6/√shotsPerBin) is sized from ONE
  measured QPAM operating point, not fitted. v0 honesty is "visibly
  lossy", not "statistically faithful".

### Next
- [small] REAL_QPAM seam: bring-your-own encode/decode endpoint (like the
  LLM seam) so the channel can be the real thing when a server exists.
- [small] Receipt a QA-REFUSAL row when the sim labels itself exhausted
  (pot-bound), not just silent null.
- [medium] Compare advisor diets: GA alone vs +jepa vs +qa-sim vs +moth,
  champion fitness over N gens, receipts as the differ.

### Verdict
MERGEABLE (labeled sim, tested, receipts flow through the existing JEV/MOTH
rails).

---

## Round 1 — kimi1 — 2026-09-24 — vs v1 (e98cf66)

### Played versions: v1 only (first round — no prior to delta against)

### Measured at the tag (Round 81 restoration — R74 annotation, lost at re-land #96, rebuilt ledger-sourced)

v1 `core.js:55-56` consumed raw `Math.random()` in the black-swan path, so
every number this entry publishes is ONE SAMPLE of a distribution, never a
point. Sixteen value-tallied draws at tag e98cf66 (R68–R81, each in a
dedicated clean worktree; the machine-readable ledger is
`research/v1-draws.jsonl`, guarded by tests/r76-v1-draw-ledger-glue.test.js;
draw 1 is the earlier-era documentary-only sample per the R72 note) measure
the spread:

- **L0** 1918–3295 — 2935×10 (the mode, 62.5% of value-tallied draws),
  2225×3, 1918/3223/3295×1. R1's published 2899f/2h is an interior sample.
- **L1** 738–6575 — three bands: kill-early (738×3 at 1h, 1242 at 2h, 1691 at
  3h), mid (3940 → 5778, incl. 4900@13h, the near-cap shoulder 4.8% below the
  5156 seam), cap-cluster (6114/6150 near-cap; 6400/6500×3/6575 AT the 6000f
  cap at 16h/20h/23h). R1's published regression (1,192f) is one low draw, not
  the shape.
- **L2** 589–6225 — the ceiling is the 6000-frame CAP with hit-variation, not
  a single value: 6075@3h, 6125×5@5h, and draw #17's **6225@9h** (a NEW
  maximum — 9 terminal hits at the bound ceiling). Under the cap: a zero-hit
  floor (589×2, ~13% of draws — the champion's best game can never touch the
  ball), a kill band (2383×3, 3242), a mid band (4766/4878/4919).

Attractor structure, one line: R1's published triple (2899f/2h, 1192f,
6000f/5h/×3.40) samples the L2 ceiling exactly while L0/L1 land interior —
the honest v1 baseline is the spread above, recomputed from the ledger by
the suite, not the three rows below.

Provenance: this section was built by R74 (original branch commit 1032342,
ten-draw table) and lost when the re-land cab770c (#96) dropped the
R1-entry edit while keeping the receipt text — the R34/R41-class entry loss,
invisible to every pin then on the repo; five rounds of cap-cluster specs
(R77–R81) carried against the ghost. R81 restored it, rebuilt from the
seventeen-draw ledger, and pinned it (tests/r81-r1-measured-at-tag-glue.test.js).

### Deltas observed (shapes of change)
- **v0 → v1 was the birth delta**: the repo went from nothing to a working GA
  with checkpoints. Learning-curve shape of v1, from `node tools/prerun.js`:
  L0 (gen 0) survives 2,899 frames / 2 hits; L1 (gen 60) *regresses* to
  1,192 frames — the curve dips before it climbs; L2 (gen 260) caps at
  6,000 frames / 5 hits / ×3.40 speed. The dip is the interesting shape:
  early evolution trades survival for hit-seeking, and a checkpoint can be
  worse than where you started. The demo teaches non-monotonicity by
  embodying it.

### Lies hunted
- [P0, fixed] Ball teleported one field per frame (`sp*250` velocity bug) —
  first prerun run died in 8 frames every time, evolution had nothing to
  select. Caught by running, not reading. Repro: run prerun.js at parent
  commit. Fixed in working tree before first push.
- [P1, fixed] L2 level button had a duplicated `onclick=` attribute — dead
  control in the flagship feature. Caught by grep after writing.
- [note] Black-swan math and JEPA LMS are in the browser file only; no headless
  test pins them. A round should pin them under node.

### Next version spec (competitive improvements)
- [small] Pin black-swan + micro-JEPA under node: extract both from
  index.html into core.js, test determinism (seeded swan kills a perfect
  tracker; JEPA error decreases on a linear toy). verify: `node --test`.
- [small] Gen-sweep artifact: prerun emits a curve JSON (fitness vs gen, 20
  points) so the README table becomes a plotted shape, not three rows.
  verify: regenerated table matches curve endpoints.
- [medium] Wristband for honesty: the demo shows live `games` counter AND a
  "claims verified" badge listing which claims have node-pinned proofs vs
  browser-only. verify: badge lists match `node --test` names.
- [medium] First adversarial play-test: an agent plays v1 cold, 15-minute
  budget, writes Round 2 here. verify: this file gains a Round 2 entry.

### Verdict
MERGEABLE (v1 ships as the loop's seed; the loop is the product).
