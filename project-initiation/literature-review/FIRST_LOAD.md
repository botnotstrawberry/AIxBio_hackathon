# Literature review first-load brief

## Non-authorization warning
This Gate 2 pack informs prototype design only. It is not a final validation packet, clinical advice, regulatory advice, biosafety clearance, or an executable wet-lab protocol.

## Project and pack identity
- AIxBio_hackathon / TargetBench: Cell Therapy Validation Planner. Use LITERATURE_REVIEW.md for narrative context and literature-review/MANIFEST.json for authoritative files.

## Load order
- Start with MANIFEST.json, then records/dqs.jsonl, records/claims.jsonl, records/sources.jsonl, and retrieval/retrieval_log.jsonl.
- Gate 4 should cite exports/gate4_inputs.json plus record IDs, not this brief alone.

## Known / suspected / unknown / blocked
- Known: DQ-002 selects CLDN18.2 gastric/GEJ cancer for the demo target; CLAIM-001 is the load-bearing decision.
- Known: DQ-001 and DQ-003 define a planning packet around TECH-001, not a protocol.
- Known: DQ-004 requires source traceability, expert-review wording, and off-tumor safety caveats.
- Blocked retrievals are NULL-001 and NULL-002; they did not change the supported DQ statuses.

## DQ status snapshot
- DQ-001 supported with caveats: packet elements and decision gates.
- DQ-002 supported with caveats: choose CLDN18.2 over B7-H3 for this MVP demo.
- DQ-003 supported with caveats: planner sections are allowed; protocol generation is not.
- DQ-004 supported with caveats: safety, uncertainty, and expert-review language are mandatory.
- DQ-005 supported with caveats: judgeability checks should cover completeness, citations, gaps, and forbidden outputs.

## Direct empirical evidence status
- DQ-001 uses direct empirical sources SRC-001 and SRC-004 plus methodological SRC-009.
- DQ-002 uses direct empirical sources SRC-001, SRC-002, SRC-004, and SRC-007.
- DQ-004 uses direct empirical SRC-004 for the CLDN18.2 safety caveat.

## Central contradictions and conflicts
- no_unresolved_tensions: yes

## Null searches and high-value misses
- NULL-001 records PubMed E-utilities HTTP 429; Europe PMC fallback supplied the load-bearing PubMed-indexed sources.
- NULL-002 records Semantic Scholar throttling after partial hits; Europe PMC exact PMID lookups supplied the load-bearing AI/RAG sources.

## Private/confidential source warnings
All included sources are public and may be cited under the pack quote policy. No private-source records are present.

## Technical objects and formulas to preserve
- TECH-001 is the TargetBench packet schema: target rationale, expression/off-tumor screen, model systems, assay modules, controls, readouts, safety gaps, go/no-go gates, citations, and gap labels.

## Gate 3 audit priorities
- Audit DQ-002 / CLAIM-001 for whether CLDN18.2 selection is justified by source evidence rather than convenience.
- Audit DQ-003 / CLAIM-003 / CLAIM-009 for protocol-like or clinical/regulatory overclaim.
- Audit TECH-001 for missing bench/program sections or unsupported detail.

## Gate 4 allowed / caveated / blocked inputs
- Allowed with caveat: all DQs, all claims, and TECH-001.
- Gate 4 must turn DQ-005 into measurable completeness, citation, gap-label, target-selection, and forbidden-output checks.

## Read-next record IDs
- Read next: DQ-001, DQ-002, DQ-003, DQ-004, DQ-005, CLAIM-001, CLAIM-003, CLAIM-007, TECH-001, NULL-001, NULL-002.
