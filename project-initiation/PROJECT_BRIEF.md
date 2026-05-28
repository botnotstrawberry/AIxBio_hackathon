# PROJECT_BRIEF
Gate 1 brief format version: 2

## Project title
OncoScout Evidence Radar

## Domain
Life sciences / healthcare AI, focused on translational precision oncology and early biotech venture research.

## Rough scope
Build a 17-hour hackathon MVP that helps a scientist, founder, or venture studio rapidly evaluate a precision-oncology idea from public evidence. The first version should accept a disease / biomarker / therapeutic modality prompt and return a grounded evidence radar: key papers, open-access full-text availability, active or recent clinical trials, evidence strength signals, contradictions or gaps, and a short venture-relevance summary.

The selected project direction is intentionally narrow: an evidence-first research tool for oncology opportunity triage, not a general medical chatbot, not patient-specific clinical decision support, and not a drug discovery model.

## Expected output
A working prototype / MVP that can be judged in a demo. The preferred implementation is a lightweight web app with source adapters for free biomedical APIs, a transparent citation/evidence ledger, and an exportable Markdown/JSON report for one or more demo queries.

## Build target

#### BUILD-001
- build_target_id: BUILD-001
- output_object: A runnable "OncoScout Evidence Radar" MVP that takes a precision-oncology query and produces a cited evidence report using only approved free biomedical/science sources.
- verification_method: Run the app locally, enter at least one demo query, confirm it returns source-grounded paper/trial cards, open-access indicators where available, a ranked evidence/gap summary, and an exportable report with resolvable source URLs/API identifiers.
- completion_artifact: Public GitHub repo `botnotstrawberry/AIxBio_hackathon` containing source code, README/run instructions, a demo script, and at least one generated example report artifact.
- non_goals_boundaries: No PHI, no patient-specific medical advice, no clinical treatment recommendation, no proprietary/paywalled literature sources, no model training requirement, no wet-lab execution, no paid databases such as Scopus, Web of Science, Embase, or publisher paywalls.

## Available code and data
No existing private code, private datasets, or private APIs are available.

Allowed sources for research and MVP retrieval are free biomedical/science sources only, with official APIs preferred when available:
- PubMed / NCBI E-utilities
- PubMed Central / PMC Open Access and NCBI OA full-text lookup
- Europe PMC and Europe PMC open-access search
- bioRxiv API
- medRxiv API
- Semantic Scholar Graph API
- OpenAlex API, if available under free usage
- Crossref API
- Unpaywall for DOI open-access lookup, if an email is configured
- ClinicalTrials.gov API v2
- NIH RePORTER API
- ChemRxiv public API
- DOAJ API

Sponsor / ecosystem pages used for project fit, not as biomedical evidence:
- Evolved Technology: healthcare and life-science AI hackathon / venture pathway
- Bayer Co.Lab: early life-science startup incubator and therapeutics innovation context
- LabCentral: biotech startup infrastructure, AI BioHub, and founder support context
- C10 Labs: AI-first venture studio, applied AI portfolio, healthtech / biotech / medtech relevance

## Stakes and constraints
Hard constraints:
- About 17 hours of build time remain.
- MVP must be simple enough to build in roughly 12 focused hours after gates.
- It must be a working prototype that can be judged, not only a deck or static report.
- It should feel relevant to Evolved Technology, Bayer Co.Lab, LabCentral, and C10 Labs.
- It should plausibly impress judges with precision-oncology, AI-first venture, partnership, and startup-infrastructure backgrounds.
- It must use free biomedical/science sources only for literature and evidence retrieval.
- It must avoid paid literature databases and publisher paywalls.
- It must make source provenance visible so judges can inspect why the tool believes something.

Design constraints:
- Favor a thin, reliable product loop over an ambitious model-training project.
- Use deterministic API retrieval and transparent summarization before any opaque AI claims.
- Frame as research / venture diligence support, not clinical decision support.
- Prefer demo queries with enough public literature and trial coverage to make the product feel real.

## Open questions

#### OQ-001
- open_question_id: OQ-001
- question: Which demo oncology query best balances judge resonance, source availability, and a compelling evidence-gap story within the remaining hackathon time?

#### OQ-002
- open_question_id: OQ-002
- question: Should the MVP default experience optimize for founder/venture diligence, scientist translational research, or precision-oncology program triage?

#### OQ-003
- open_question_id: OQ-003
- question: Which source adapters are mandatory for the first demo versus optional if time remains?

## Required searches

#### SEARCH-001
- search_id: SEARCH-001
- name: Precision-oncology evidence triage workflow
- search_target: Peer-reviewed and open biomedical evidence on biomarker-driven precision oncology, translational evidence grading, and research-to-clinic triage workflows.

#### SEARCH-002
- search_id: SEARCH-002
- name: Biomedical literature retrieval and summarization reliability
- search_target: Peer-reviewed or open biomedical evidence on AI-assisted literature review, biomedical RAG, citation-grounded summarization, and failure modes such as hallucination, missing evidence, or biased retrieval.

#### SEARCH-003
- search_id: SEARCH-003
- name: Clinical-trial landscape and biomarker matching
- search_target: Free-source evidence on how molecular biomarkers, oncology indications, trial phase, endpoints, and recruitment status are used to assess translational opportunity.

#### SEARCH-004
- search_id: SEARCH-004
- name: Public source coverage and open-access feasibility
- search_target: Official API documentation and free-source metadata coverage for PubMed, PMC OA, Europe PMC, Semantic Scholar, OpenAlex, Crossref, Unpaywall, ClinicalTrials.gov, NIH RePORTER, bioRxiv, medRxiv, ChemRxiv, and DOAJ.
