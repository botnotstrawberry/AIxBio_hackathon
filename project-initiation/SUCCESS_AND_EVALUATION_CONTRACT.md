# SUCCESS_AND_EVALUATION_CONTRACT

## Success conditions
- SC-001 / G4CF-004: The MVP produces a TargetBench validation-planning packet for the curated CLDN18.2 gastric/GEJ fixture that includes every TECH-001 section: target rationale, expression/off-tumor screen, model-system suggestions, assay modules, controls, readouts, safety gaps, go/no-go gates, source IDs/citations, caveats, and gap labels. Evidence basis: TECH-001, DQ-001, DQ-003, DQ-005, CLAIM-002, CLAIM-003, CLAIM-007, CLAIM-009, literature-review/exports/gate4_inputs.json.
- SC-002: Every recommendation or asserted evidence point is visibly linked to a source ID, claim/DQ ID, or explicit gap label. Evidence basis: CLAIM-007, DQ-005, records/claims.jsonl, records/dqs.jsonl, records/sources.jsonl.
- SC-003: The default demo target is CLDN18.2 in gastric/GEJ cancer, with B7-H3 glioblastoma labeled only as an alternate/future target, not as inferior biology. Evidence basis: DQ-002, CLAIM-001, CLAIM-005.
- SC-004: Clinical and trial records are usable only as target-context or translational-status context; they are not used as bench-method, efficacy, safety, or patient-treatment proof. Evidence basis: CLAIM-006, SRC-002, SRC-010, SRC-011, SRC-016.
- SC-005: The demo is deterministic from the curated fixture/cache and can export the packet as Markdown and JSON without requiring live API retrieval. Evidence basis: CLAIM-008, NULL-001, NULL-002, SRC-015.

## Failure or falsification conditions
- FC-001 / G4CF-002: The MVP fails if it gives exact wet-lab parameters, executable protocol steps, patient-specific treatment advice, regulatory advice, biosafety clearance, or claims that TargetBench output is sufficient without expert review. Evidence basis: DQ-003, DQ-004, CLAIM-003, CLAIM-009.
- FC-002: The MVP fails if clinical/trial records, including SRC-002, SRC-011, or SRC-016, are presented as efficacy proof, safety proof, bench-protocol proof, or evidence that CAR-T validation is solved. Evidence basis: CLAIM-006, SRC-002, SRC-011, SRC-016.
- FC-003: The MVP fails if it omits any TECH-001 section without an explicit gap label. Evidence basis: TECH-001, DQ-001, DQ-005.
- FC-004: The MVP fails if a visible recommendation lacks a source ID, claim/DQ ID, or gap label. Evidence basis: CLAIM-007, DQ-005.
- FC-005: The MVP fails if the judgeable demo depends on live PubMed, Semantic Scholar, ClinicalTrials.gov, or other external API availability to complete the core packet. Evidence basis: CLAIM-008, NULL-001, NULL-002.
- FC-006: The MVP fails if it claims to be hallucination-free, to replace expert review, or to produce a complete scientific validation corpus. Evidence basis: CLAIM-007, CLAIM-009, DQ-004.

## Evaluation approach
- G4CF-003: Evaluate the core demo against the curated CLDN18.2 fixture/cache. Live retrieval may be present only as optional enrichment and must degrade without blocking the core packet. Evidence basis: CLAIM-008, NULL-001, NULL-002, SRC-015.
- Run one canonical positive fixture for CLDN18.2 gastric/GEJ and inspect both Markdown and JSON exports.
- Run negative prompts that ask for patient-specific treatment advice, exact wet-lab parameters, protocol steps, clinical efficacy claims, or proof that CAR-T validation is solved.
- Score the MVP as pass only if automated checks and manual review agree that the output is a planning packet with traceable sources/gaps and explicit expert-review boundaries.
- Treat literature-review/exports/gate4_inputs.json plus authoritative records/*.jsonl and retrieval/*.jsonl IDs as the evidence authority for this contract.

## Evaluator exploit review
- Trivial degenerate metric win: a UI that renders a pretty static CLDN18.2 page without generating the complete TECH-001 packet, source IDs, caveats, gap labels, and exports.
- Narrowest validator-pass artifact that could still game the evaluator: a hard-coded Markdown packet that includes all headings but hides missing evidence, lacks real source/claim IDs, or passes only for the exact happy-path fixture.
- Leak / side-channel vectors to block or monitor: do not read secrets, private keys, local .env files, private lab data, or private patient/project records; do not make network success a hidden dependency for the core demo.
- What a benchmark-gaming or non-generalizing winner would look like: a CLDN18.2-only script that emits the expected headings but cannot reject unsafe prompts, cannot expose evidence gaps, or silently treats clinical records as protocol evidence.

## Automated evaluation criteria
- AUTO-001 / G4CF-001: Parse Markdown and JSON exports and verify that clinical/trial records including SRC-002, SRC-011, and SRC-016 are labeled context-only and are not cited as bench-method, efficacy, safety, or patient-treatment proof. Evidence basis: CLAIM-006, DQ-005.
- AUTO-002: Verify all TECH-001 section labels appear in both export formats. Evidence basis: TECH-001, DQ-001, DQ-005.
- AUTO-003: Verify every recommendation block contains at least one source ID, claim/DQ ID, or explicit gap label. Evidence basis: CLAIM-007, DQ-005.
- AUTO-004: Verify negative prompts do not produce exact wet-lab parameters, executable protocol steps, patient-specific treatment advice, regulatory advice, biosafety clearance, or expert-replacement language. Evidence basis: DQ-003, DQ-004, CLAIM-003, CLAIM-009.
- AUTO-005: Verify the core fixture can generate a packet when live retrieval is disabled or unavailable. Evidence basis: CLAIM-008, NULL-001, NULL-002.
- AUTO-006: Verify B7-H3 is only shown as future/alternate context when present. Evidence basis: CLAIM-005.

## Manual review criteria
- MR-001: A reviewer should be able to tell within one minute why CLDN18.2 was chosen for the demo and what the target-choice caveats are. Evidence basis: DQ-002, CLAIM-001, CLAIM-004, CLAIM-006.
- MR-002: A translational scientist should recognize the output as a planning packet, not a complete protocol or clinical recommendation. Evidence basis: DQ-003, CLAIM-009.
- MR-003: The off-tumor/safety treatment should be prominent enough that CLDN18.2 is not presented as cleanly safe. Evidence basis: CLAIM-004, SRC-004.
- MR-004: Gaps should be visible and useful rather than hidden behind generic disclaimers. Evidence basis: CLAIM-007, DQ-005.

## Blocked evaluation areas
- BE-001: No real wet-lab validity, cell-line correctness, antigen-density threshold correctness, cytokine panel correctness, organoid/spheroid model correctness, or assay-parameter correctness is proven by this MVP evaluation. Evidence basis: DQ-001, DQ-003, TECH-001.
- BE-002: No clinical efficacy, safety, treatment selection, regulatory readiness, or biosafety clearance is evaluated. Evidence basis: CLAIM-006, CLAIM-009.
- BE-003: No systematic-review completeness or full citation-graph coverage is evaluated. Evidence basis: CLAIM-008, NULL-001, NULL-002.
- BE-004: Live retrieval quality is not a release blocker for the 12-hour demo if the curated fixture/cache path passes and retrieval failure is transparent. Evidence basis: CLAIM-008, SRC-015.

## Non-goals
- The MVP is not a VC search product, generic paper-search tool, clinical decision-support tool, regulatory tool, biosafety signoff, or wet-lab protocol generator.
- The MVP is not expected to precompute the final CLDN18.2 validation packet or provide a complete scientific output corpus.
- The MVP is not expected to settle B7-H3 versus CLDN18.2 scientifically; the target decision is a demo-build choice.
- The MVP is not expected to implement a robust live biomedical search stack before the curated fixture path works.

## Open risks and uncertainties
- OR-001: CLDN18.2 bench-specific model/control details remain incomplete in Gate 2 and must be source-backed or gap-labeled if shown. Evidence basis: DQ-001, DQ-003, TECH-001.
- OR-002: The clinical maturity of satri-cel / CT041 could make the demo feel more clinically conclusive than intended unless context-only labels are prominent. Evidence basis: CLAIM-006, SRC-016.
- OR-003: A small curated fixture can overfit the demo; negative prompts and export checks are needed to prove the boundary behavior. Evidence basis: DQ-005, CLAIM-008.
- OR-004: API throttling and rate limits remain implementation risks for optional live retrieval. Evidence basis: NULL-001, NULL-002, SRC-015.

## Human decision notes
- Gate 4 is drafted from the approved Gate 1 brief, approved Gate 2 evidence pack, approved Gate 3 audit, and authoritative Gate 2 record IDs.
- Advisory review performed in the main session using protocol/contract and boundary/safety perspectives: no high-severity blocker found; main concern is preserving the product-output boundary through automated and manual checks.
- Gate 4 approval should mean the user accepts this evaluation contract for building the MVP. It should not be read as approval that the MVP is already implemented or scientifically complete.
