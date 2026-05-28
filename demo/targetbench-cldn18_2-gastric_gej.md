# CLDN18.2 in gastric/GEJ cancer validation-planning packet

Fixture: `cldn18_2_gastric_gej_v1`
Generated: 2026-05-28T03:45:00Z
Live retrieval: disabled (curated fixture cache; core dependency: false)

Boundaries: `Planning artifact only`, `No patient-specific medical advice`, `No exact wet-lab parameters`, `No clinical efficacy or safety proof`, `Expert review required`

## Target rationale

Why this target/disease pair is the default hackathon fixture.

- RAT-001: Use CLDN18.2 in gastric/GEJ cancer as the default demo fixture because the curated free-source evidence supports target rationale, translational maturity context, and a visible off-tumor safety caveat.
  Evidence: `DQ-002` (support), `CLAIM-001` (support), `SRC-006` (support), `SRC-016` (context-only), `SRC-011` (context-only)
  Caveats: Demo selection is not a claim of clinical superiority. | Clinical and trial records are context-only.
- RAT-002: Keep B7-H3 glioblastoma as an alternate/future fixture rather than an inferior-biology statement.
  Evidence: `CLAIM-005` (support), `DQ-002` (support)
  Caveats: This is a build-feasibility distinction, not a biological ranking.

## Expression/off-tumor screen

Evidence checks that should precede any potency interpretation.

- EXP-001: Separate tumor-expression confirmation from normal-tissue/off-tumor risk review before interpreting any engineered-cell activity.
  Evidence: `CLAIM-002` (support), `CLAIM-004` (support), `DQ-004` (support), `SRC-004` (support)
  Gap labels: `GAP-EXPR-QUANT`
  Caveats: The fixture does not set quantitative expression thresholds.
- EXP-002: Track antigen-positive, antigen-low or borderline, and antigen-negative evidence categories so response patterns can be interpreted as target-dependent rather than nonspecific.
  Evidence: `CLAIM-003` (support), `SRC-009` (support)
  Gap labels: `GAP-MODEL-SPECIFICITY`

## Model-system suggestions

Model classes to discuss in a translational validation meeting.

- MOD-001: Prioritize gastric/GEJ tumor model classes with documented CLDN18.2 signal, an antigen-negative comparator, and an off-tumor-relevant comparator where feasible.
  Evidence: `CLAIM-002` (support), `CLAIM-003` (support), `SRC-004` (support), `SRC-009` (support)
  Gap labels: `GAP-MODEL-SPECIFICITY`
  Caveats: Exact cell lines, organoids, and acceptance criteria require local expert selection.
- MOD-002: Use model diversity as a planning requirement: two-dimensional tumor models can support initial signal checks, while spheroid or organoid-like systems should be labeled as follow-up complexity rather than required proof.
  Evidence: `CLAIM-002` (support), `SRC-009` (support)
  Gap labels: `GAP-MODEL-SPECIFICITY`

## Assay modules

Non-executable assay families for the first-pass validation plan.

- ASSAY-001: Plan modular evidence families: target-expression verification, antigen-dependent killing or potency, immune-cell activation, cytokine release, specificity/off-tumor comparison, and phenotype or persistence review.
  Evidence: `DQ-003` (support), `CLAIM-003` (support), `SRC-009` (support)
  Caveats: This is a module map, not a protocol or SOP.
- ASSAY-002: Do not treat a single positive killing readout as sufficient; require concordance across expression, specificity, activation, and safety-oriented checks before escalation.
  Evidence: `DQ-001` (support), `DQ-004` (support), `CLAIM-002` (support), `CLAIM-004` (support)
  Gap labels: `GAP-SAFETY-TRANSLATION`

## Controls

Control categories that keep the planning packet interpretable.

- CTRL-001: Include control categories for antigen-positive target context, antigen-negative context, non-targeted or mock-engineered cell context, irrelevant-antigen context, assay background, and off-tumor-relevant comparison.
  Evidence: `CLAIM-002` (support), `CLAIM-003` (support), `SRC-009` (support)
  Gap labels: `GAP-CONTROL-PANEL`
  Caveats: Control identities and lab acceptance windows are outside this MVP.
- CTRL-002: Mark clinical/trial records as target-context controls for product narrative only; they cannot serve as assay controls or validation proof.
  Evidence: `CLAIM-006` (context-only), `SRC-002` (context-only), `SRC-011` (context-only), `SRC-016` (context-only)

## Readouts

Qualitative readout categories for expert review.

- READ-001: Summarize readouts as categories: target expression, tumor-cell effect, antigen-dependent activation, cytokine signal, specificity against antigen-negative context, off-tumor comparator stress, and reproducibility across model classes.
  Evidence: `CLAIM-003` (support), `SRC-009` (support), `DQ-003` (support)
  Caveats: No numeric thresholds are claimed by the fixture.
- READ-002: Flag discordant readouts as review items rather than forcing a pass/fail answer from incomplete evidence.
  Evidence: `CLAIM-007` (support), `SRC-014` (support)
  Gap labels: `GAP-EXPR-QUANT`, `GAP-SAFETY-TRANSLATION`

## Safety gaps

Known safety boundaries and missing evidence labels.

- SAFE-001: Foreground CLDN18.2 on-target/off-tumor uncertainty and normal-tissue expression review as central to the validation plan.
  Evidence: `DQ-004` (support), `CLAIM-004` (support), `SRC-004` (support)
  Gap labels: `GAP-SAFETY-TRANSLATION`
  Caveats: The packet does not conclude that CLDN18.2 targeting is safe or unsafe.
- SAFE-002: Use clinical and registry records only to explain translational maturity; do not use them as safety proof, efficacy proof, or bench-method proof.
  Evidence: `CLAIM-006` (context-only), `SRC-002` (context-only), `SRC-011` (context-only), `SRC-016` (context-only)

## Go/no-go gates

Qualitative decision gates for a review meeting.

- GATE-001: Go only to deeper validation planning if target expression is coherent, activity appears antigen-dependent, controls are interpretable, off-tumor concerns have an explicit review plan, and gaps are assigned to owners.
  Evidence: `DQ-001` (support), `DQ-003` (support), `DQ-004` (support), `CLAIM-002` (support), `CLAIM-009` (support)
  Caveats: No gate is a regulatory, biosafety, or clinical clearance.
- GATE-002: No-go or hold if activity is nonspecific, antigen-negative controls respond similarly to target-positive context, off-tumor evidence is unresolved, or the requested next step would require exact protocol design from this MVP.
  Evidence: `CLAIM-003` (support), `CLAIM-004` (support), `CLAIM-009` (support), `SRC-004` (support)
  Gap labels: `GAP-CONTROL-PANEL`, `GAP-SAFETY-TRANSLATION`

## Source IDs/citations

Visible provenance that keeps recommendations auditable.

- SRCLEDGER-001: Render every recommendation with source IDs, claim/DQ IDs, or explicit gap labels; clinical/trial records retain context-only labels.
  Evidence: `DQ-005` (support), `CLAIM-006` (support), `CLAIM-007` (support), `CLAIM-008` (support), `SRC-012` (support), `SRC-014` (support)
  Gap labels: `GAP-LIVE-RETRIEVAL`

## Caveats

Required boundaries for the planning artifact.

- CAVEAT-001: Treat the packet as an expert-review input for translational scientists, not clinical advice, regulatory advice, biosafety clearance, patient guidance, or a complete executable protocol.
  Evidence: `DQ-003` (support), `DQ-004` (support), `CLAIM-009` (support)
  Caveats: No patient-specific use. No expert replacement.
- CAVEAT-002: Treat the curated fixture as a deterministic demo cache, not a complete CLDN18.2 corpus or systematic review.
  Evidence: `CLAIM-008` (support), `NULL-001` (support), `NULL-002` (support)
  Gap labels: `GAP-LIVE-RETRIEVAL`

## Gap labels

Explicit missing-evidence labels that avoid invented specificity.

- GAP-EXPR-QUANT: Expression threshold not specified: The fixture requires tumor and normal-tissue expression review, but it does not set a quantitative antigen-density threshold.
  Evidence: `CLAIM-003` (support), `DQ-003` (support)
  Gap labels: `GAP-EXPR-QUANT`
- GAP-MODEL-SPECIFICITY: Exact model panel requires local expert selection: The packet names model-system classes, not validated cell-line or organoid panels.
  Evidence: `CLAIM-002` (support), `SRC-009` (support)
  Gap labels: `GAP-MODEL-SPECIFICITY`
- GAP-CONTROL-PANEL: Control panel must be finalized by the lab: Control categories are listed, but reagent identity, construct details, and acceptance windows remain out of scope.
  Evidence: `CLAIM-003` (support), `CLAIM-009` (support)
  Gap labels: `GAP-CONTROL-PANEL`
- GAP-SAFETY-TRANSLATION: Bench safety cannot be inferred from clinical context: Clinical and registry records are context-only and cannot resolve off-tumor safety for a validation program.
  Evidence: `CLAIM-004` (support), `CLAIM-006` (support), `SRC-004` (support)
  Gap labels: `GAP-SAFETY-TRANSLATION`
- GAP-LIVE-RETRIEVAL: Live retrieval disabled for core demo: The judgeable path uses the curated cache so API throttling cannot block export generation.
  Evidence: `CLAIM-008` (support), `NULL-001` (support), `NULL-002` (support)
  Gap labels: `GAP-LIVE-RETRIEVAL`

## Source ledger details

- SRC-001 (Translational maturity context only)
  Cite for: CT041 / CLDN18.2 CAR-T clinical evidence in gastrointestinal cancers and demo-target maturity.
  Do not cite for: Do not cite as proof that TargetBench can design or validate a complete wet-lab protocol.
  Locator: PMID:35534566; PMCID:PMC9205778; DOI:10.1038/s41591-022-01800-8; https://europepmc.org/article/MED/35534566
- SRC-002 (Clinical/trial context only)
  Cite for: Final-results metadata for CLDN18.2-specific CAR T cells in gastrointestinal cancers.
  Do not cite for: Do not cite as efficacy proof, safety proof, bench-method proof, protocol proof, or patient advice.
  Locator: PMID:38830992; DOI:10.1038/s41591-024-03037-z; https://europepmc.org/article/MED/38830992
- SRC-004 (Safety caveat and off-tumor planning)
  Cite for: CLDN18.2 on-target/off-tumor toxicity concern and need for safety/off-tumor gates.
  Do not cite for: Do not cite as showing that CLDN18.2 targeting is always unsafe or always safe.
  Locator: PMID:41176582; PMCID:PMC12579598; DOI:10.1038/s41467-025-65148-6; https://europepmc.org/article/MED/41176582
- SRC-006 (Target rationale context)
  Cite for: CLDN18.2 target rationale and gastric-cancer context.
  Do not cite for: Do not cite as a primary clinical efficacy trial or as direct assay protocol support.
  Locator: PMID:40862764; PMCID:PMC12384651; DOI:10.3390/cells14161285; https://europepmc.org/article/MED/40862764
- SRC-009 (Assay/readout category support)
  Cite for: Solid-tumor immunotherapy potency-assay families, readouts, and assay-planning caveats.
  Do not cite for: Do not cite as an executable TargetBench protocol.
  Locator: PMID:41953034; PMCID:PMC13053282; DOI:10.3389/fimmu.2026.1770222; https://europepmc.org/article/MED/41953034
- SRC-011 (Clinical/trial context only)
  Cite for: CLDN18.2 / CT041 trial landscape and demo target maturity context.
  Do not cite for: Do not cite as efficacy proof, safety proof, bench-method proof, protocol proof, or patient advice.
  Locator: ClinicalTrials.gov API query: CLDN18.2 gastric cancer CAR-T; https://clinicaltrials.gov/api/v2/studies?query.term=CLDN18.2%20gastric%20cancer%20CAR-T&pageSize=5&format=json
- SRC-012 (Provenance design context)
  Cite for: Scientific workflow retrieval and provenance-oriented product requirements.
  Do not cite for: Do not cite as evidence that TargetBench recommendations are biologically correct.
  Locator: PMID:41206112; PMCID:PMC12596265; DOI:10.1093/bib/bbaf571; https://europepmc.org/article/MED/41206112
- SRC-014 (RAG risk and gap-label motivation)
  Cite for: RAG hallucination risk and multi-evidence refinement motivation.
  Do not cite for: Do not cite as proving TargetBench is hallucination-free.
  Locator: PMID:41132171; PMCID:PMC12540348; DOI:10.3389/fpubh.2025.1635381; https://europepmc.org/article/MED/41132171
- SRC-015 (Optional API feasibility only)
  Cite for: Implementation feasibility for PubMed/NCBI source-adapter and provenance identifiers.
  Do not cite for: Do not cite as biomedical evidence about target validation.
  Locator: NCBI Bookshelf E-utilities documentation: https://www.ncbi.nlm.nih.gov/books/NBK25501/
- SRC-016 (Clinical/trial context only)
  Cite for: 2025 randomized phase 2 CT041-ST-01 satri-cel maturity anchor for the CLDN18.2 gastric/GEJ demo target.
  Do not cite for: Do not cite as bench-method proof, protocol evidence, clinical advice, safety proof, efficacy proof, or proof that CAR-T validation is solved.
  Locator: PMID:40460847; DOI:10.1016/S0140-6736(25)00860-8; NCT04581473; https://pubmed.ncbi.nlm.nih.gov/40460847/
