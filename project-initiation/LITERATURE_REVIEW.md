# LITERATURE_REVIEW
Gate 2 agent evidence pack version: 1
Evidence pack manifest: literature-review/MANIFEST.json
First-load brief: literature-review/FIRST_LOAD.md

## Brief corrections
This review corrects the earlier risk of conflating Gate 2 with the product output. Gate 2 is not packaging the MVP's final validation packet. It is the evidence base for deciding what TargetBench should build, which demo target is feasible, what guardrails the prototype needs, and what Gate 4 must test.

This literature review does not attempt to precompute the CLDN18.2 validation packet; it defines the product scope, demo target, evidence constraints, and acceptance criteria for building an MVP that can generate such a packet.

The product remains life-science-native: TargetBench should generate a bench/program-level cell therapy target-validation planning packet for translational scientists. It should not be a VC search product, generic paper search, clinical recommendation tool, or wet-lab protocol generator.

Gate 2 recommendation: proceed to Gate 3 audit. No literature-review blocker remains for MVP construction.

## Search and source accounting
The evidence pack includes 16 source records, 9 claim records, 5 DQ records, 16 locator records, 9 retrieval-log records, 2 null records, and 1 technical object. The load-bearing biomedical sources are PubMed-indexed records resolved through Europe PMC, official PubMed abstract/metadata pages, and official ClinicalTrials.gov records. Sponsor websites were not used as literature evidence.

No paid databases, Scopus, Web of Science, Embase, non-open full-text content, private data, or sponsor websites were used as source evidence. SRC-002 is metadata-only because Europe PMC did not mark it open-access; the pack uses it only as final-results metadata and caveats it in CLAIM-001 and CLAIM-004. SRC-016 is PubMed abstract/metadata-only because the publisher full text was not used; it is a current maturity anchor for target choice, not a bench-methods source.

## Findings by decision-critical question and theme
DQ-001 is supported with caveats. The later MVP should output the section schema captured in TECH-001: target rationale, expression/off-tumor screen, model-system suggestions, assay modules, controls, readouts, safety gaps, go/no-go gates, citations, and gap labels. CLAIM-002 and CLAIM-003 support this as a planning packet, while CLAIM-009 limits protocol-like or clinical claims.

DQ-002 is supported with caveats. The demo target should be CLDN18.2 in gastric/GEJ cancer, not B7-H3 glioblastoma, for this 12-hour build. CLAIM-001 records the decision. CLDN18.2 has CT041/satri-cel clinical evidence and official trial-context anchors in SRC-001, SRC-002, SRC-011, and the 2025 randomized phase 2 maturity anchor in SRC-016, plus an explicit off-tumor safety hook in SRC-004. B7-H3 remains a credible future target, but CLAIM-005 records why it is less mature for this immediate demo.

DQ-003 is supported with caveats. TargetBench can safely support a structured validation-planning packet with qualitative assay/readout/control modules and decision gates. It must not output exact wet-lab parameters or present itself as a complete protocol.

DQ-004 is supported with caveats. CLDN18.2 off-tumor safety and AI provenance risk are central to the build. CLAIM-004 requires safety caveats; CLAIM-007 requires citations, record IDs, and gap labels.

DQ-005 is supported with caveats. The judgeable MVP checks should come from TECH-001 completeness, citation traceability, explicit gap labels, a visible CLDN18.2 target-selection rationale, deterministic demo-fixture behavior, and forbidden-output tests.

## Retrieval provenance and plan deviations
Retrieval used only the free biomedical/science and official sources allowed in the approved plan: Europe PMC, ClinicalTrials.gov, Semantic Scholar as a targeted metadata source, and NCBI documentation. PubMed E-utilities was attempted first for COMMIT-001 but returned HTTP 429; NULL-001 records this, and Europe PMC was used as an official fallback for PubMed-indexed records. Semantic Scholar returned partial useful AI/RAG hits and then throttled follow-up; NULL-002 records this, and Europe PMC exact PMID lookups resolved the load-bearing AI/RAG papers.

The practical deviation from the plan is narrow: official PubMed and Semantic Scholar API attempts had rate-limit events recorded as NULL-001 and NULL-002, while the included sources still came from allowed official/free biomedical surfaces. The later SRC-016 addition used a direct official PubMed page rather than E-utilities because it was an exact PMID check during a clarification pass.

## Disconfirming retrieval and null results
NULL-001 records the PubMed E-utilities 429 event. It did not change the supported DQ statuses because Europe PMC supplied the load-bearing PubMed-indexed records.

NULL-002 records the Semantic Scholar follow-up throttle. It did not change the supported DQ statuses because Europe PMC resolved the relevant PubMed-indexed AI/RAG sources.

No MISS records were opened. No high-value source target was knowingly left out under the approved budget.

## Contradictions and conflicts
- no_unresolved_tensions: yes
- no_blocking_unresolved_tensions: yes

The first line above is the validator-required declaration that the empty CONTRA/CONFLICT ledgers have no unresolved contradiction records. Product tradeoffs remain non-blocking and are captured as MVP guardrails: CLDN18.2 clinical maturity versus off-tumor safety concerns, B7-H3 glioblastoma relevance versus immediate demo complexity, and live retrieval value versus hackathon API fragility.

The CLDN18.2 versus B7-H3 comparison is not recorded as a CONTRA or CONFLICT record. It is a demo-build evidence-strength decision: both are plausible, but CLDN18.2 is better supported for this MVP.

## Technical objects, metrics, formulas, and evaluation conditions
TECH-001 is the only technical object. It defines the TargetBench packet schema: target rationale; expression and off-tumor screen; model-system suggestions; assay modules; controls; readouts; safety gaps; go/no-go gates; citations and gap labels.

No FORMULA, SYM, or DERIV records were needed. Gate 4 should turn TECH-001 into measurable output-completeness and forbidden-output criteria.

## Evaluation implications
The MVP should use a curated CLDN18.2 gastric/GEJ demo fixture and produce exportable Markdown/JSON. The visible product value should be the structured validation-planning packet, not a search-results page. Live retrieval can be optional enrichment, but the judgeable demo should not depend on fragile real-time APIs.

The UI should let a reviewer inspect source IDs, PMID/PMCID/DOI/NCT identifiers, and gap labels without making source search the main workflow.

Compact literature finding to MVP implication map:

| Gate 2 finding | MVP implication |
| --- | --- |
| CLDN18.2 is better supported for a compact 12-hour demo than B7-H3. | Use CLDN18.2 gastric/GEJ cancer as the default curated fixture. |
| Bench-planning output must avoid protocol generation. | Use qualitative modules and avoid exact wet-lab parameters unless explicitly source-backed and safe. |
| Clinical trial evidence is useful context but not bench-method evidence. | Label trial records and SRC-016 as rationale/context only. |
| Retrieval APIs can be fragile or rate-limited. | Make the judgeable demo deterministic from a curated fixture/cache. |
| Outputs need auditability. | Show source IDs, citations, caveats, and gap labels in the packet and exports. |

## Remaining evaluation blockers
No remaining Gate 2 evidence issue prevents moving to Gate 3 audit. Gate 4 still needs to define exact checks for section completeness, citation traceability, output latency, fixture determinism, context-only trial labels, gap-label display, and forbidden-output behavior.

## Gaps
This is not a systematic review, meta-analysis, full citation-graph sweep, or complete wet-lab evidence packet. The review did not read every open-access full text in depth. It did not validate cell lines, antigen assays, or exact experimental parameters. Those gaps should narrow the prototype to planning-level outputs.

The most important scientific gap is bench-specific CLDN18.2 model/control detail. Gate 4 should require the MVP to label such details as suggestions or gaps unless explicitly source-backed in the curated fixture.

## Contradictions
No CONTRA records are present. This pack uses CLAIM-001 and CLAIM-005 for the target-comparison decision.

## Confidence notes, evidence quality, and transfer risk
Confidence is medium for the main product decision. CLDN18.2 has stronger retrieved evidence for a 12-hour demo, strengthened by the 2025 satri-cel randomized phase 2 maturity anchor, but TargetBench must avoid turning clinical/trial context into bench protocol certainty.

Direct empirical evidence is strongest for CLDN18.2 clinical/translational maturity and safety relevance, not for a complete bench protocol. DQ-003 and DQ-005 rely more on methodological and official-spec evidence, so Gate 4 should convert them into software acceptance checks rather than biological proof claims.

## Gate 3 audit targets
Gate 3 should be skeptical of three areas. First, audit DQ-002 and CLAIM-001 to ensure CLDN18.2 was selected for life-science/demo reasons, not because it was easier to summarize. Second, audit DQ-003, CLAIM-003, CLAIM-009, and TECH-001 for any protocol-like, clinical, regulatory, or biosafety overclaim. Third, audit DQ-005 to ensure Gate 4 criteria are measurable in a 12-hour MVP rather than vague quality aspirations.

## Gate 4 handoff implications
Gate 4 should use DQ-001 through DQ-005, CLAIM-001 through CLAIM-009, TECH-001, NULL-001, and NULL-002 as the authoritative inputs. The primary success criteria should test: section completeness, CLDN18.2 fixture behavior, citation traceability, context-only trial labeling, gap-label visibility, source/claim distinction, exportability, and forbidden-output refusal or caveating.

The build should preserve this boundary: the literature review is for constructing the prototype and its evaluation criteria, not for packaging the final MVP output.
