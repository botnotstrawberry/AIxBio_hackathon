# PROJECT_BRIEF
Gate 1 brief format version: 2

## Project title
TargetBench: Cell Therapy Validation Planner

## Domain
Life sciences / AI-enabled biotechnology, focused on translational oncology, cell therapy target validation, and wet-lab experiment planning.

## Rough scope
Build a 12-17 hour hackathon MVP that helps a translational scientist or early biotech operator turn a proposed oncology cell-therapy target into a bench-level validation plan. The user enters a disease context and candidate target, such as "B7-H3 in glioblastoma" or "CLDN18.2 in gastric cancer." The product returns a structured validation packet: biological rationale, target-expression and safety evidence to check, recommended model systems, assay plan, controls, readouts, decision gates, and cited evidence/trial context.

This is not a literature search app and not a VC diligence product. The life-science-native output is an experiment design packet that a scientist could use to plan the next validation meeting or first-pass in vitro experiment design. Sponsor/venture relevance should remain secondary: the product should impress because it produces a scientifically useful wet-lab planning artifact, not because it writes an investor memo.

The MVP should be narrow enough to finish quickly: prioritize oncology cell-therapy target validation and in vitro assay planning over broad drug discovery, general protocol generation, or patient-specific clinical guidance.

## Expected output
A working prototype / MVP that can be judged in a demo. The preferred implementation is a lightweight web app that:
- accepts a disease + target + modality prompt,
- retrieves or imports evidence from approved free biomedical/science sources,
- generates a structured target-validation experiment packet,
- shows the evidence ledger behind each recommendation, and
- exports the packet as Markdown and JSON.

The demo should make the scientific artifact visible first: model systems, assays, controls, readouts, and decision gates. Citations and source search are supporting evidence, not the product itself.

## Build target

#### BUILD-001
- build_target_id: BUILD-001
- output_object: A runnable "TargetBench" MVP that takes an oncology cell-therapy target hypothesis and produces an evidence-grounded target-validation experiment plan using only approved free biomedical/science sources.
- verification_method: Run the app locally, enter at least one demo query, and confirm it returns a structured validation packet with hypothesis, evidence summary, recommended models, assay modules, positive/negative controls, readouts, failure modes, go/no-go decision gates, and resolvable source URLs/API identifiers.
- completion_artifact: Public GitHub repo `botnotstrawberry/AIxBio_hackathon` containing source code, README/run instructions, a demo script, and at least one generated example validation packet artifact.
- non_goals_boundaries: No PHI, no patient-specific medical advice, no clinical treatment recommendation, no executable wet-lab protocol claiming regulatory or biosafety completeness, no proprietary/paywalled literature sources, no model training requirement, no wet-lab execution, no paid databases such as Scopus, Web of Science, Embase, or publisher paywalls.

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

Sponsor / ecosystem context used for project fit, not as biomedical evidence:
- Evolved Technology frames the hackathon around AI breakthroughs in healthcare and life sciences and real-world biotech / clinical development challenge areas.
- Bayer Co.Lab Cambridge is a life-science incubator context with support for cutting-edge technologies across oncology and other therapeutic areas, with emphasis on cell and gene therapy entrepreneurs.
- LabCentral emphasizes fully equipped lab infrastructure, shared equipment, core facilities, and helping biotech startups focus on science.
- LabCentral and C10 Labs' AI BioHub supports AI-first biotech teams with wet lab space, high-speed cell sorting, automated liquid handling, AI Fellows, and scientific/company-building programming.
- C10 Labs' portfolio and AI BioHub context include healthtech, biotech, medical-device, molecular diagnostics, targeted therapeutics, organoid/drug-mechanism validation, cell therapy, and AI-native discovery companies.

## Stakes and constraints
Hard constraints:
- About 17 hours of build time remain.
- MVP must be simple enough to build in roughly 12 focused hours after gates.
- It must be a working prototype that can be judged, not only a deck or static report.
- It should feel relevant to Evolved Technology, Bayer Co.Lab, LabCentral, C10 Labs, and the AI BioHub ecosystem.
- It must produce a life-science-native output: a bench/program-level validation plan, not a search-results page or venture memo.
- It must use free biomedical/science sources only for literature and evidence retrieval.
- It must avoid paid literature databases and publisher paywalls.
- It must make source provenance visible so judges can inspect why the tool recommends a model, assay, control, or readout.

Design constraints:
- Favor a thin, reliable product loop over an ambitious model-training project.
- Use deterministic API retrieval and transparent evidence mapping before any opaque AI claims.
- Frame as research planning support for trained scientists, not clinical decision support or complete biosafety/regulatory protocol generation.
- Prefer demo queries with enough public literature and trial coverage to make the experiment plan feel real.
- Keep the output practical: if the system cannot justify a model system, assay, or control from evidence, it should label the gap instead of inventing specificity.

## Open questions

#### OQ-001
- open_question_id: OQ-001
- question: Which demo cell-therapy target and cancer indication best balances judge resonance, public evidence availability, and a clear validation-plan story within the remaining hackathon time?

#### OQ-002
- open_question_id: OQ-002
- question: Which validation packet sections are mandatory for MVP credibility: model systems, assay modules, controls, readouts, decision gates, safety/off-tumor checks, trial context, or all of these?

#### OQ-003
- open_question_id: OQ-003
- question: Which source adapters are mandatory for the first demo versus optional if time remains?

#### OQ-004
- open_question_id: OQ-004
- question: How should the MVP phrase its wet-lab planning outputs so they are useful to scientists while remaining clearly non-executable and requiring expert review?

## Required searches

#### SEARCH-001
- search_id: SEARCH-001
- name: Cell-therapy target validation workflows
- search_target: Peer-reviewed and open biomedical evidence on oncology cell-therapy target selection, target validation, antigen expression checks, off-tumor safety considerations, and translational evidence requirements.

#### SEARCH-002
- search_id: SEARCH-002
- name: In vitro assay and model-system planning
- search_target: Peer-reviewed and open biomedical evidence on in vitro oncology models, co-culture assays, organoids, cytotoxicity assays, cytokine release readouts, flow cytometry / expression validation, controls, and go/no-go decision criteria.

#### SEARCH-003
- search_id: SEARCH-003
- name: AI-assisted experimental design reliability
- search_target: Peer-reviewed or open biomedical evidence on AI-assisted experimental design, biomedical RAG, citation-grounded scientific planning, hallucination risks, evidence traceability, and human-in-the-loop scientific review.

#### SEARCH-004
- search_id: SEARCH-004
- name: Clinical and translational context for demo target
- search_target: Free-source evidence on active or recent clinical trials, translational status, and biomarker/antigen context for the selected demo disease-target pair.

#### SEARCH-005
- search_id: SEARCH-005
- name: Public source coverage and open-access feasibility
- search_target: Official API documentation and free-source metadata coverage for PubMed, PMC OA, Europe PMC, Semantic Scholar, OpenAlex, Crossref, Unpaywall, ClinicalTrials.gov, NIH RePORTER, bioRxiv, medRxiv, ChemRxiv, and DOAJ.
