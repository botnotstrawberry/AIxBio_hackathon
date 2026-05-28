# LITERATURE_REVIEW_PLAN
Gate 2 plan format version: 2

## Research questions, project hypotheses, and likely failure modes
Research objective: determine whether TargetBench can produce a credible, source-grounded, life-science-native cell therapy target-validation packet within the hackathon window, and choose one demo disease-target pair with enough public evidence to build the prototype responsibly.

Gate 2 scope boundary: this literature review is an input to prototype design and implementation decisions. It must not package, certify, or substitute for the MVP output. The review should decide what the prototype should build, what claims it may safely make, which demo target is viable, what source adapters are worth implementing, and which output sections need explicit caveats or gap labels.

Project hypothesis: a narrow oncology cell therapy planner can be useful if it turns free biomedical evidence into a bench/program artifact: target rationale, model systems, assay modules, controls, readouts, safety checks, and go/no-go gates. It should not primarily be a search interface, investor memo, or complete wet-lab protocol.

Likely failure modes:
- The review finds broad target literature but not enough practical assay/model guidance to support a validation packet.
- The selected demo target has exciting trial context but weak bench-translatable evidence for model systems, controls, or readouts.
- The tool overstates wet-lab specificity or hides uncertainty behind fluent generated text.
- Free APIs return noisy, duplicate, or sparse results under the time limit.
- The evidence supports a smaller output than the Gate 1 ambition; if so, Gate 4 must narrow the MVP rather than inflate claims.

## Decision-critical questions and disconfirming evidence
### DQ coverage map

#### DQ-001
- dq_id: DQ-001
- dq_role: substantive
- dq_type: non_comparative
- dq_text: What evidence elements and decision gates are required for a credible oncology cell therapy target-validation packet rather than a generic literature summary?
- side_a: n/a
- side_b: n/a
- required_lane_ids: [LANE-001, LANE-002]
- commitment_ids: [COMMIT-001, COMMIT-002]
- verification_step_ids: [VSTEP-001, VSTEP-002]
- weak_lane_ceiling: unresolved

#### DQ-002
- dq_id: DQ-002
- dq_role: substantive
- dq_type: comparative
- dq_text: Which demo disease-target pair should drive the MVP: B7-H3 in glioblastoma or CLDN18.2 in gastric cancer?
- side_a: B7-H3 in glioblastoma / solid tumor cell therapy
- side_b: CLDN18.2 in gastric cancer / solid tumor cell therapy
- required_lane_ids: [LANE-003]
- commitment_ids: [COMMIT-003, COMMIT-004]
- verification_step_ids: [VSTEP-003]
- weak_lane_ceiling: unresolved

#### DQ-003
- dq_id: DQ-003
- dq_role: substantive
- dq_type: non_comparative
- dq_text: Which validation packet sections can be supported safely in an MVP without pretending to generate a complete executable wet-lab protocol?
- side_a: n/a
- side_b: n/a
- required_lane_ids: [LANE-001, LANE-002, LANE-004]
- commitment_ids: [COMMIT-001, COMMIT-002, COMMIT-006]
- verification_step_ids: [VSTEP-001, VSTEP-002, VSTEP-004]
- weak_lane_ceiling: unresolved

#### DQ-004
- dq_id: DQ-004
- dq_role: substantive
- dq_type: non_comparative
- dq_text: What safety, uncertainty, and expert-review wording is needed so the product is useful to scientists while avoiding clinical, regulatory, or biosafety overclaiming?
- side_a: n/a
- side_b: n/a
- required_lane_ids: [LANE-004]
- commitment_ids: [COMMIT-006]
- verification_step_ids: [VSTEP-004]
- weak_lane_ceiling: n/a

#### DQ-005
- dq_id: DQ-005
- dq_role: evaluation_readiness
- dq_type: non_comparative
- dq_text: What evidence-backed checks prove the MVP is judgeable: output completeness, citation traceability, gap labeling, and demo target selection?
- side_a: n/a
- side_b: n/a
- required_lane_ids: [LANE-005]
- commitment_ids: [COMMIT-005]
- verification_step_ids: [VSTEP-005]
- weak_lane_ceiling: n/a

## Known priors and carry-in disclosures
- Gate 1 approved TargetBench conditionally on a narrow MVP that I believe can be built in roughly 12 focused hours after gates.
- The user rejected VC-search framing; the product must produce a bench/program-level life-science artifact.
- Sponsor context is useful for product fit, but sponsor pages are not biomedical evidence for the literature review.
- No private data, paid databases, publisher paywalls, Scopus, Web of Science, Embase, or proprietary datasets are authorized.
- The review must favor peer-reviewed and official biomedical/science sources, using official APIs where available.
- Gate 2 should select one demo target only if evidence quality and retrieval coverage are adequate.
- Gate 2 evidence is for building the prototype and defining its guardrails. It is not the final validation packet, not demo content certification, and not a packaged output of the MVP.

## Direct empirical evidence sources or declared gap
- direct_empirical_lane_count: 3
- direct_empirical_lane_note: Direct empirical evidence is expected from peer-reviewed biomedical articles, open-access full text where available, and clinical trial records. No direct evidence has been verified yet; each lane starts as candidate evidence pending Gate 2 retrieval.

#### LANE-001
- lane_id: LANE-001
- status: candidate
- retrieval_authorized: yes
- provenance_kind: external
- provenance_verified: no
- commitment_ids: [COMMIT-001]
- verification_step_ids: [VSTEP-001]

#### LANE-002
- lane_id: LANE-002
- status: candidate
- retrieval_authorized: yes
- provenance_kind: external
- provenance_verified: no
- commitment_ids: [COMMIT-002]
- verification_step_ids: [VSTEP-002]

#### LANE-003
- lane_id: LANE-003
- status: candidate
- retrieval_authorized: yes
- provenance_kind: external
- provenance_verified: no
- commitment_ids: [COMMIT-003, COMMIT-004]
- verification_step_ids: [VSTEP-003]

## Required coverage categories
- Target biology and antigen-expression rationale: why the target is relevant in the disease context and what expression/off-tumor questions must be checked.
- Cell therapy / targeted immunotherapy translation context: evidence that the target has been considered for CAR-T, TCR, antibody, ADC, or related modalities.
- Bench validation design: models, co-culture or cytotoxicity assay families, expression validation, controls, readouts, and failure signals.
- Safety and uncertainty handling: on-target/off-tumor concerns, antigen heterogeneity, model limitations, and required expert review.
- Prototype evidence constraints: citation provenance, gap labels, no patient-specific medical advice, and no complete protocol claims that the implementation must preserve.
- Demo-build feasibility: one target/indication with enough public evidence to make a later MVP demo credible after implementation.

## Domain-specific subcategories
- Solid tumor cell therapy target selection.
- Glioblastoma and/or gastric cancer demo target context.
- Antigen expression validation and heterogeneity checks.
- In vitro model systems, tumor cell lines, organoids, co-culture assays, and immune-cell killing assays.
- Flow cytometry, immunohistochemistry, cytokine release, cytotoxicity, viability, and persistence/readout families.
- Positive controls, negative controls, antigen-negative controls, non-tumor/off-tumor controls, and dose/effector-ratio planning language.
- ClinicalTrials.gov translational status and trial landscape, used as context only.
- Biomedical RAG / AI-assisted scientific planning risks: hallucination, citation traceability, human-in-the-loop review.

## Source types allowed, exclusion rules, and evidence-priority order
Allowed biomedical/science sources only:
1. PubMed / NCBI E-utilities.
2. PubMed Central / PMC Open Access and NCBI OA lookup.
3. Europe PMC, with open-access filter where useful.
4. bioRxiv API.
5. medRxiv API.
6. Semantic Scholar Graph API for metadata, citation counts, and open-access PDF links.
7. OpenAlex API under free usage if available.
8. Crossref API for DOI metadata.
9. Unpaywall after DOI only if an email is configured.
10. ClinicalTrials.gov API v2.
11. NIH RePORTER API only if grant/program context becomes necessary; it is not a substitute for biomedical evidence.
12. ChemRxiv public API.
13. DOAJ API.

Subagent source directory:
- PubMed website: https://pubmed.ncbi.nlm.nih.gov/
- PubMed search pattern: site:pubmed.ncbi.nlm.nih.gov <query>
- PubMed API search: https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=<query>&retmode=json&retmax=20
- PubMed Central / PMC website: https://pmc.ncbi.nlm.nih.gov/
- PMC search pattern: site:pmc.ncbi.nlm.nih.gov <query> "open access"
- PMC API search: https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pmc&term=<query>+open+access%5Bfilter%5D&retmode=json&retmax=20
- PMC OA full-text lookup by PMCID: https://www.ncbi.nlm.nih.gov/pmc/utils/oa/oa.fcgi?id=<PMCID>
- Europe PMC website: https://europepmc.org/
- Europe PMC search pattern: site:europepmc.org <query>
- Europe PMC API search: https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=<query>&format=json&pageSize=25
- Europe PMC open-access API search: https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=<query>%20OPEN_ACCESS:y&format=json&pageSize=25
- bioRxiv website: https://www.biorxiv.org/
- bioRxiv search pattern: site:biorxiv.org/content <query>
- bioRxiv API docs: https://api.biorxiv.org/
- medRxiv website: https://www.medrxiv.org/
- medRxiv search pattern: site:medrxiv.org/content <query>
- medRxiv API docs: https://api.medrxiv.org/
- Semantic Scholar website: https://www.semanticscholar.org/
- Semantic Scholar search pattern: site:semanticscholar.org/paper <query>
- Semantic Scholar API search: https://api.semanticscholar.org/graph/v1/paper/search?query=<query>&limit=20&fields=title,abstract,year,authors,url,externalIds,isOpenAccess,openAccessPdf,citationCount
- OpenAlex website: https://openalex.org/
- OpenAlex search pattern: site:openalex.org/works <query>
- OpenAlex API search: https://api.openalex.org/works?search=<query>&per-page=25
- Crossref website: https://www.crossref.org/
- Crossref API search: https://api.crossref.org/works?query=<query>&rows=20
- Unpaywall website: https://unpaywall.org/
- Unpaywall DOI lookup after DOI only: https://api.unpaywall.org/v2/<doi>?email=<configured_email>
- ClinicalTrials.gov website: https://clinicaltrials.gov/
- ClinicalTrials.gov search pattern: site:clinicaltrials.gov/study <query>
- ClinicalTrials.gov API: https://clinicaltrials.gov/api/v2/studies?query.term=<query>&pageSize=20
- NIH RePORTER website: https://reporter.nih.gov/
- NIH RePORTER search pattern: site:reporter.nih.gov <query>
- NIH RePORTER API docs/root: https://api.reporter.nih.gov/
- ChemRxiv website: https://chemrxiv.org/
- ChemRxiv search pattern: site:chemrxiv.org/engage/chemrxiv/article-details <query>
- ChemRxiv API docs: https://chemrxiv.org/engage/chemrxiv/public-api/documentation
- DOAJ website: https://doaj.org/
- DOAJ search pattern: site:doaj.org <query>
- DOAJ API docs: https://doaj.org/api/v4/docs

Exclusions:
- No Scopus, Web of Science, Embase, publisher paywalls, private databases, or paid discovery systems.
- No non-open full-text scraping.
- No general web search as biomedical evidence unless it points back to one of the approved official/free sources.
- No clinical treatment recommendations, PHI, patient-specific guidance, or complete executable wet-lab protocol claims.

Evidence priority:
1. Peer-reviewed biomedical articles with PubMed IDs and accessible abstracts.
2. PMC / Europe PMC open-access full text when available.
3. ClinicalTrials.gov records for translational status, not efficacy claims.
4. Preprints only when clearly labeled and useful for recent methods gaps.
5. API documentation and metadata sources for implementation feasibility.
6. Sponsor websites only for product-positioning context, not literature claims.

## Search sources
### Practical discovery surface decisions

#### broad_academic
- surface_family: broad_academic
- status: required
- rationale: Core peer-reviewed biomedical evidence must come from free academic/biomedical APIs, especially PubMed, Europe PMC, Semantic Scholar, OpenAlex, and Crossref.
- query_or_locator_plan: Search cell therapy target validation, B7-H3 glioblastoma, CLDN18.2 gastric cancer, in vitro CAR-T assay controls, oncology co-culture cytotoxicity assays, and biomedical RAG reliability.
- result_count_policy: Open top 10-20 records per focused query; include only sources that directly affect DQs or demo selection.

#### preprint_working_paper
- surface_family: preprint_working_paper
- status: optional_targeted
- rationale: Preprints may help with recent assay or AI planning methods, but they cannot override peer-reviewed evidence.
- query_or_locator_plan: Use bioRxiv, medRxiv, or ChemRxiv only if peer-reviewed/open-access sources leave a specific gap.
- result_count_policy: At most 3 preprints, each labeled as non-peer-reviewed.

#### author_lab_project
- surface_family: author_lab_project
- status: skipped
- rationale: Lab/project pages are outside the user-approved biomedical evidence list unless they merely help locate an already identified open source.
- query_or_locator_plan: none
- result_count_policy: Record as skipped unless needed for exact provenance of an approved open source.

#### code_reproducibility
- surface_family: code_reproducibility
- status: not_applicable
- rationale: The MVP does not depend on reproducing a published computational model or benchmark.
- query_or_locator_plan: none
- result_count_policy: Not applicable for Gate 2.

#### datasets_benchmarks
- surface_family: datasets_benchmarks
- status: optional_targeted
- rationale: Public datasets may be useful only if a paper points to them as evidence for target expression or assay validation; the MVP will not ingest large datasets.
- query_or_locator_plan: Check dataset/benchmark mentions only from included peer-reviewed or open-access sources.
- result_count_policy: At most 2 dataset references; include only if directly useful to TargetBench output sections.

#### venue_proceedings
- surface_family: venue_proceedings
- status: skipped
- rationale: Conference proceedings are lower priority than PubMed-indexed or open-access biomedical articles under the time limit.
- query_or_locator_plan: none
- result_count_policy: Skipped unless an included source identifies a critical open proceeding record.

#### backward_citation
- surface_family: backward_citation
- status: optional_targeted
- rationale: Backward citation checks can catch foundational assay or target-validation papers once seed papers are selected.
- query_or_locator_plan: Use Semantic Scholar, OpenAlex, Crossref references, or article bibliographies from open full text.
- result_count_policy: Follow at most 2 backward links per load-bearing seed source.

#### forward_citation
- surface_family: forward_citation
- status: optional_targeted
- rationale: Forward citation checks can catch newer target or assay evidence without becoming an open-ended survey.
- query_or_locator_plan: Use Semantic Scholar citation counts/metadata and OpenAlex cited-by metadata where available.
- result_count_policy: Follow at most 2 forward links per load-bearing seed source.

#### exact_title_lookup
- surface_family: exact_title_lookup
- status: required
- rationale: Any named seed paper, trial, or preprint must be resolved exactly enough to avoid ambiguous citation support.
- query_or_locator_plan: Resolve exact titles through PubMed, Europe PMC, Semantic Scholar, OpenAlex, Crossref, or ClinicalTrials.gov identifiers.
- result_count_policy: Record exact match, ambiguity, or null result for every named source in the review.

#### general_web_pdf
- surface_family: general_web_pdf
- status: skipped
- rationale: The user explicitly restricted literature work to free biomedical/science sources and official APIs; general web PDFs risk paywall or provenance drift.
- query_or_locator_plan: none
- result_count_policy: Skipped unless the user explicitly expands source authorization.

## External academic discovery policy
- new_academic_pdf_discovery: required
- rationale: Gate 2 must discover biomedical literature, but only through the free approved sources above. If a DOI resolves to paywalled-only full text, record metadata/abstract only and do not use paywalled content.

## Seed evidence packet with provenance and inclusion rationale (non-exhaustive)
- Seed target candidate A: B7-H3 in glioblastoma / solid tumor cell therapy; included because it may align precision oncology, solid tumor cell therapy, and enough public trial/literature context for a concrete validation plan.
- Seed target candidate B: CLDN18.2 in gastric cancer / solid tumor cell therapy; included because it may offer strong targeted-therapy and translational context for a compact MVP demo.
- Seed target fallback: EGFRvIII in glioblastoma; included only as a fallback if both primary candidates are too sparse or too broad under the time limit.
- Seed prototype requirement: the later MVP should generate a TargetBench validation packet with hypothesis, model systems, assays, controls, readouts, risk gaps, and go/no-go gates; included here only to guide what the literature review must inform.
- Seed source policy: official/free biomedical APIs listed by the user; included because source compliance is a hard constraint.

## Concrete first-pass source commitments

#### COMMIT-001
- commitment_id: COMMIT-001
- locator_type: url
- locator_value: https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=oncology%20cell%20therapy%20target%20validation&retmode=json&retmax=20
- locator_context: none
- lane_ids: [LANE-001]

#### COMMIT-002
- commitment_id: COMMIT-002
- locator_type: url
- locator_value: https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=CAR-T%20in%20vitro%20cytotoxicity%20assay%20controls%20OPEN_ACCESS:y&format=json&pageSize=25
- locator_context: none
- lane_ids: [LANE-002]

#### COMMIT-003
- commitment_id: COMMIT-003
- locator_type: url
- locator_value: https://clinicaltrials.gov/api/v2/studies?query.term=B7-H3%20glioblastoma%20CAR-T&pageSize=20
- locator_context: none
- lane_ids: [LANE-003]

#### COMMIT-004
- commitment_id: COMMIT-004
- locator_type: url
- locator_value: https://clinicaltrials.gov/api/v2/studies?query.term=CLDN18.2%20gastric%20cancer%20CAR-T&pageSize=20
- locator_context: none
- lane_ids: [LANE-003]

#### COMMIT-005
- commitment_id: COMMIT-005
- locator_type: url
- locator_value: https://www.ncbi.nlm.nih.gov/books/NBK25501/
- locator_context: none
- lane_ids: [LANE-005]

#### COMMIT-006
- commitment_id: COMMIT-006
- locator_type: url
- locator_value: https://api.semanticscholar.org/graph/v1/paper/search?query=biomedical%20retrieval%20augmented%20generation%20hallucination%20citation%20traceability&limit=20&fields=title,abstract,year,authors,url,externalIds,isOpenAccess,openAccessPdf,citationCount
- locator_context: none
- lane_ids: [LANE-004]

## Planned retrieval order
### Search surface registry

#### SURF-001
- search_surface_id: SURF-001
- surface_kind: search_surface
- locator_type: url
- locator_value: https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=oncology%20cell%20therapy%20target%20validation&retmode=json&retmax=20

#### SURF-002
- search_surface_id: SURF-002
- surface_kind: search_surface
- locator_type: url
- locator_value: https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pmc&term=cell%20therapy%20target%20validation%20open%20access%5Bfilter%5D&retmode=json&retmax=20

#### SURF-003
- search_surface_id: SURF-003
- surface_kind: search_surface
- locator_type: url
- locator_value: https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=cell%20therapy%20target%20validation%20OPEN_ACCESS:y&format=json&pageSize=25

#### SURF-004
- search_surface_id: SURF-004
- surface_kind: search_surface
- locator_type: url
- locator_value: https://clinicaltrials.gov/api/v2/studies?query.term=B7-H3%20glioblastoma%20CLDN18.2%20gastric%20cancer&pageSize=20

#### SURF-005
- search_surface_id: SURF-005
- surface_kind: search_surface
- locator_type: url
- locator_value: https://api.semanticscholar.org/graph/v1/paper/search?query=cell%20therapy%20target%20validation%20oncology&limit=20&fields=title,abstract,year,authors,url,externalIds,isOpenAccess,openAccessPdf,citationCount

#### SURF-006
- search_surface_id: SURF-006
- surface_kind: search_surface
- locator_type: url
- locator_value: https://api.openalex.org/works?search=cell%20therapy%20target%20validation%20oncology&per-page=25

#### SURF-007
- search_surface_id: SURF-007
- surface_kind: search_surface
- locator_type: url
- locator_value: https://api.crossref.org/works?query=cell%20therapy%20target%20validation%20oncology&rows=20

#### SURF-008
- search_surface_id: SURF-008
- surface_kind: search_surface
- locator_type: url
- locator_value: https://api.biorxiv.org/

#### SURF-009
- search_surface_id: SURF-009
- surface_kind: search_surface
- locator_type: url
- locator_value: https://api.medrxiv.org/

#### SURF-010
- search_surface_id: SURF-010
- surface_kind: collection
- locator_type: repo_path
- locator_value: repo://AIxBio_hackathon/project-initiation/PROJECT_BRIEF.md

### Verification steps

#### VSTEP-001
- verification_step_id: VSTEP-001
- target_lane_id: LANE-001
- step_kind: verify_directness
- starting_commitment_ids: [COMMIT-001]
- starting_search_surfaces: [SURF-001, SURF-002, SURF-003, SURF-005, SURF-006]
- stop_condition: budget_cap_hit

#### VSTEP-002
- verification_step_id: VSTEP-002
- target_lane_id: LANE-002
- step_kind: verify_directness
- starting_commitment_ids: [COMMIT-002]
- starting_search_surfaces: [SURF-001, SURF-003, SURF-005, SURF-006]
- stop_condition: budget_cap_hit

#### VSTEP-003
- verification_step_id: VSTEP-003
- target_lane_id: LANE-003
- step_kind: verify_provenance
- starting_commitment_ids: [COMMIT-003, COMMIT-004]
- starting_search_surfaces: [SURF-004, SURF-005, SURF-006, SURF-007]
- stop_condition: budget_cap_hit

#### VSTEP-004
- verification_step_id: VSTEP-004
- target_lane_id: LANE-004
- step_kind: verify_provenance
- starting_commitment_ids: [COMMIT-006]
- starting_search_surfaces: [SURF-001, SURF-005, SURF-006, SURF-007]
- stop_condition: budget_cap_hit

#### VSTEP-005
- verification_step_id: VSTEP-005
- target_lane_id: LANE-005
- step_kind: verify_provenance
- starting_commitment_ids: [COMMIT-005]
- starting_search_surfaces: [SURF-010]
- stop_condition: exact_seed_named

## Exploration lanes and branching triggers
### Lane registry

#### LANE-001
- lane_id: LANE-001
- lane_kind: direct_empirical
- lane_label: Oncology cell therapy target-validation evidence and decision gates.

#### LANE-002
- lane_id: LANE-002
- lane_kind: direct_empirical
- lane_label: In vitro model, assay, control, and readout evidence for target-validation planning.

#### LANE-003
- lane_id: LANE-003
- lane_kind: direct_empirical
- lane_label: Demo target clinical/translational context for B7-H3 glioblastoma versus CLDN18.2 gastric cancer.

#### LANE-004
- lane_id: LANE-004
- lane_kind: other
- lane_label: AI-assisted scientific planning limits, citation traceability, and expert-review wording.

#### LANE-005
- lane_id: LANE-005
- lane_kind: other
- lane_label: MVP evaluation readiness, source-policy feasibility, and artifact completeness checks.

### Branching triggers
- If both B7-H3 and CLDN18.2 lack enough bench-level evidence for model/assay/control recommendations, switch the demo target to EGFRvIII in glioblastoma and record why.
- If clinical trial records are rich but bench assay evidence is weak, keep trial context in a secondary panel and narrow MVP to evidence-grounded validation planning.
- If AI/RAG reliability sources are weak under time, hard-code conservative citation/gap behavior in Gate 4 and avoid claims of autonomous scientific reasoning.
- If official API retrieval is blocked, use allowed site-restricted search or official website pages for metadata only, and record the blocker.

## Evaluation bootstrapping questions
- Can a judge enter one demo prompt and receive a validation packet with all mandatory sections in under 30 seconds after retrieval/cache warmup?
- Does every recommendation in the packet link back to a source URL, PMID/PMCID, DOI, trial NCT ID, or explicit gap label?
- Can the output distinguish observations from inferences and decisions?
- Does the packet provide model systems, assay modules, controls, readouts, safety/off-tumor considerations, and go/no-go gates in a form a translational scientist would recognize?
- Does the UI make source provenance secondary but inspectable, so the product is not a glorified search page?
These are Gate 4/build evaluation questions seeded by the literature review. Gate 2 should produce evidence-backed requirements and constraints for these checks, not the MVP packet itself.

## Candidate evaluation evidence and benchmark analogs
- Later build artifact target: an example validation packet for one selected target/indication, exported as Markdown and JSON after implementation.
- Gate 2 evidence requirement: identify at least 8 candidate biomedical sources across PubMed/PMC/Europe PMC/Semantic Scholar/OpenAlex/Crossref/ClinicalTrials.gov as available, so the later build can map recommendations to provenance.
- Gate 2 evidence requirement: identify at least one positive evidence pattern, one uncertainty/gap pattern, and one disconfirming or cautionary pattern that the later MVP must surface.
- Later build check: a demo script should check output completeness across hypothesis, evidence summary, model systems, assay modules, controls, readouts, safety checks, failure modes, decision gates, and citations.
- Later build fixture target: a small deterministic fixture/cache for the demo target so the MVP can run reliably during judging without pretending cached evidence is complete.

## Hard budget cap
- Gate 2 plan artifact: one bounded draft, no paper retrieval until human approval.
- Gate 2 retrieval after approval: maximum 2 hours or 25 included sources, whichever comes first.
- Per-source reading cap: read abstract plus relevant full-text sections only when open access; no full-paper dumping.
- Direct source cap: no more than 10 sources for target-validation workflow, 8 for assay/model/control planning, 5 for demo target clinical/translational context, and 4 for AI/RAG reliability.
- Trial cap: no more than 6 ClinicalTrials.gov records, used for translational context only.
- Preprint cap: no more than 3 preprints total, only if they fill a specific gap and are labeled.

## Stop conditions
- Stop Gate 2 retrieval when DQ-001 through DQ-005 have enough evidence to support Gate 3 audit and Gate 4 prototype criteria.
- Stop if allowed sources cannot support requirements for a life-science-native validation packet; report the gap rather than broadening into VC search or generic literature search.
- Stop if source retrieval would require paid databases, paywalled full text, private data, or forbidden sources.
- Stop if API failures prevent provenance-safe retrieval after one official-site fallback attempt per source family.
- Stop if the evidence indicates the MVP scope must shrink below TargetBench's promised output; carry that into Gate 4 instead of overclaiming.

## Retrieval logging requirements
Record each retrieval attempt with: query; surface; date; access method; result count or qualitative coverage; status opened/skipped/null/missed/blocked; inclusion/exclusion rationale; blocker if any; branch trigger if any.

Additional logging fields for this project: DQ ID; lane ID; source ID once included; PMID/PMCID/DOI/NCT/OpenAlex/Semantic Scholar identifiers when available; source type; peer-reviewed/preprint/trial/API-doc label; open-access status; evidence directness; prototype section informed; quote/paraphrase policy; and paywall/source-policy decision.
