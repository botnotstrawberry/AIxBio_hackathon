# CLDN18.2 in gastric/GEJ cancer validation-planning packet

Generated: 2026-05-28T03:45:00Z
Submitted target: CLDN18.2 in gastric/GEJ cancer (CAR-T / engineered cell therapy)
Evidence snapshot: pre-reviewed source set. The source set is curated for reproducibility and is not a systematic review.
Input handling: modality and planning note are safety-scanned and displayed, but this curated CLDN18.2 source set does not change based on them.

## One-page summary

- Target hypothesis: CLDN18.2 in gastric/GEJ cancer using CAR-T / engineered cell therapy.
- Evidence state: curated source snapshot with visible provenance, citation boundaries, and missing-evidence labels.
- Rationale: CLDN18.2 has enough public gastric/GEJ and translational context to support validation planning without claiming clinical proof.
- Validation logic: expression, specificity, controls, off-tumor review, model selection, and readout concordance must line up before escalation.
- Main hold condition: unresolved off-tumor risk, missing target-expression support, weak controls, or unsupported clinical/protocol claims should stop the packet from being treated as validation proof.

## Workflow summary

- Target rationale: CLDN18.2 in gastric/GEJ cancer has enough public target and translational context to support a focused planning case.
- Evidence summary: The curated source snapshot is grouped into rationale, expression/off-tumor, assay/model, and clinical-context evidence.
- Validation plan: The packet translates evidence into model, assay, control, readout, and safety-review planning modules.
- Top risks: The first read foregrounds off-tumor uncertainty, expression thresholds, model specificity, and misuse of clinical context.
- Decision gates: Go, hold, and no-go logic is stated in plain language for an expert review meeting.
- Export: Markdown and JSON exports preserve the readable plan, with raw provenance available in the appendix.

## Evidence clusters

- Target rationale: Public CLDN18.2 and gastric/GEJ context supports a planning case with enough translational maturity to discuss validation logic.
- Expression and off-tumor review: The source set supports making tumor expression and normal-tissue/off-tumor review central to the plan, but it does not supply a numeric antigen-density gate.
- Model and assay logic: Assay categories can be organized into expression, potency, specificity, activation, cytokine, and phenotype/persistence checks without giving executable protocol parameters.
- Clinical maturity context: Clinical and registry records help explain why CLDN18.2 is a mature planning example, but they remain background only for bench validation and cannot prove safety or efficacy.

## Validation logic matrix

| Decision point | Evidence basis | Planning logic | Hold/no-go signal |
|---|---|---|---|
| Can activity be interpreted as target-dependent? | Expression and comparator evidence must line up before potency signals are interpreted. | Require target-expression confirmation plus antigen-negative or low-expression comparison before treating potency signals as target-linked. | Hold if antigen-negative controls respond similarly or expression evidence is missing. |
| Is off-tumor risk visible before escalation? | Tumor-expression rationale must be paired with normal-tissue and off-tumor review. | Pair tumor-expression rationale with normal-tissue/off-tumor review and explicit safety caveats. | Hold if off-tumor review is unresolved or treated as proven safe from clinical context. |
| Are model systems credible enough for first-pass planning? | Model classes should include target-positive, target-negative, and off-tumor-relevant comparison categories. | Use gastric/GEJ model classes with target-positive, target-negative, and off-tumor-relevant comparator categories. | Hold if the model panel is a single positive context with no specificity comparator. |
| Do controls make the result interpretable? | Controls must separate antigen-dependent signal from background or nonspecific activity. | Track target-positive, target-negative, non-targeted or mock-engineered, irrelevant-antigen, assay-background, and off-tumor comparison controls. | Hold if control identity or acceptance logic is missing from expert review. |

## Top risks and gaps

- Off-tumor uncertainty: CLDN18.2 planning is not credible unless normal-tissue and off-tumor concerns stay visible next to potency logic.
  Next action: Assign expert review of normal-tissue expression and off-tumor comparator strategy.
- No numeric expression threshold: The evidence snapshot supports expression review, but not a universal antigen-density cutoff for go/no-go decisions.
  Next action: Keep threshold setting outside the packet and require local assay owners to define it.
- Model and control panel still need expert selection: The packet names useful model/control categories, not validated cell lines, organoids, reagents, or acceptance windows.
  Next action: Use the matrix as a planning checklist, then have domain experts choose concrete models and controls.
- Clinical context can be overread: Clinical and registry records explain maturity, but they cannot prove bench validation, safety, or efficacy.
  Next action: Keep clinical sources as background and require assay-specific evidence for validation decisions.

## Planning boundaries

- Planning artifact only
- No patient-specific medical advice
- No exact wet-lab parameters
- No clinical efficacy or safety proof
- Expert review required

## Decision gates

- Go: Proceed to deeper validation planning only when expression evidence, specificity logic, controls, model context, and off-tumor review are coherent together.
- Hold: Pause when the evidence is promising but missing expression thresholds, control definitions, model specificity, or normal-tissue review.
- No-go: Stop if activity appears nonspecific, clinical context is being treated as proof, or the next request requires patient advice, protocol parameters, or safety clearance.

## Detailed validation plan

## Target rationale

Why CLDN18.2 in gastric/GEJ cancer is a useful target-validation planning case.

- Use CLDN18.2 in gastric/GEJ cancer as the worked planning case because public evidence supports target rationale, translational maturity context, and a visible off-tumor safety caveat.
  Caveats: Planning-case selection is not a claim of clinical superiority. | Clinical and trial records are context-only.
- Keep clinical maturity, target-expression rationale, and off-tumor review separate so the packet does not imply that one kind of evidence proves the others.
  Caveats: Clinical and registry records are background only for validation planning.

## Expression/off-tumor screen

Evidence checks that should precede any potency interpretation.

- Separate tumor-expression confirmation from normal-tissue/off-tumor risk review before interpreting any engineered-cell activity.
  Caveats: This planning packet does not set quantitative expression thresholds.
- Track antigen-positive, antigen-low or borderline, and antigen-negative evidence categories so response patterns can be interpreted as target-dependent rather than nonspecific.

## Model-system suggestions

Model classes to discuss in a translational validation meeting.

- Prioritize gastric/GEJ tumor model classes with documented CLDN18.2 signal, an antigen-negative comparator, and an off-tumor-relevant comparator where feasible.
  Caveats: Exact cell lines, organoids, and acceptance criteria require local expert selection.
- Use model diversity as a planning requirement: two-dimensional tumor models can support initial signal checks, while spheroid or organoid-like systems should be labeled as follow-up complexity rather than required proof.

## Assay modules

Non-executable assay families for the first-pass validation plan.

- Plan modular evidence families: target-expression verification, antigen-dependent killing or potency, immune-cell activation, cytokine release, specificity/off-tumor comparison, and phenotype or persistence review.
  Caveats: This is a module map, not a protocol or SOP.
- Do not treat a single positive killing readout as sufficient; require concordance across expression, specificity, activation, and safety-oriented checks before escalation.

## Controls

Control categories that keep the planning packet interpretable.

- Include control categories for antigen-positive target context, antigen-negative context, non-targeted or mock-engineered cell context, irrelevant-antigen context, assay background, and off-tumor-relevant comparison.
  Caveats: Control identities and lab acceptance windows require local expert selection.
- Mark clinical and registry records as target-context background only; they cannot serve as assay controls or validation proof.

## Readouts

Qualitative readout categories for expert review.

- Summarize readouts as categories: target expression, tumor-cell effect, antigen-dependent activation, cytokine signal, specificity against antigen-negative context, off-tumor comparator stress, and reproducibility across model classes.
  Caveats: No numeric thresholds are claimed by this planning packet.
- Flag discordant readouts as review items rather than forcing a pass/fail answer from incomplete evidence.

## Safety gaps

Known safety boundaries and missing evidence labels.

- Foreground CLDN18.2 on-target/off-tumor uncertainty and normal-tissue expression review as central to the validation plan.
  Caveats: The packet does not conclude that CLDN18.2 targeting is safe or unsafe.
- Use clinical and registry records only to explain translational maturity; do not use them as safety proof, efficacy proof, or bench-method proof.

## Go/no-go gates

Qualitative decision gates for a review meeting.

- Go only to deeper validation planning if target expression is coherent, activity appears antigen-dependent, controls are interpretable, off-tumor concerns have an explicit review plan, and gaps are assigned to owners.
  Caveats: No gate is a regulatory, biosafety, or clinical clearance.
- No-go or hold if activity is nonspecific, antigen-negative controls respond similarly to target-positive context, off-tumor evidence is unresolved, or the requested next step would require exact protocol design.

## Appendix: provenance and boundaries

## Source IDs/citations

Appendix record that links recommendations to the curated source snapshot.

- Keep source records and missing-evidence labels available for expert review without letting raw IDs dominate the first-read packet.
  Evidence: `DQ-005` (support), `CLAIM-006` (support), `CLAIM-007` (support), `CLAIM-008` (support), `SRC-012` (support), `SRC-014` (support)
  Gap labels: `GAP-LIVE-RETRIEVAL`

## Caveats

Required boundaries for the planning artifact.

- Treat the packet as an expert-review input for translational scientists, not clinical advice, regulatory advice, biosafety clearance, patient guidance, or a complete executable protocol.
  Evidence: `DQ-003` (support), `DQ-004` (support), `CLAIM-009` (support)
  Caveats: No patient-specific use. No expert replacement.
- Treat the evidence snapshot as curated and reproducible, not as a complete CLDN18.2 corpus or systematic review.
  Evidence: `CLAIM-008` (support), `NULL-001` (support), `NULL-002` (support)
  Gap labels: `GAP-LIVE-RETRIEVAL`

## Gap labels

Explicit missing-evidence labels that avoid invented specificity.

- Expression threshold not specified: The packet requires tumor and normal-tissue expression review, but it does not set a quantitative antigen-density threshold.
  Evidence: `CLAIM-003` (support), `DQ-003` (support)
  Gap labels: `GAP-EXPR-QUANT`
- Exact model panel requires local expert selection: The packet names model-system classes, not validated cell-line or organoid panels.
  Evidence: `CLAIM-002` (support), `SRC-009` (support)
  Gap labels: `GAP-MODEL-SPECIFICITY`
- Control panel must be finalized by the lab: Control categories are listed, but reagent identity, construct details, and acceptance windows remain out of scope.
  Evidence: `CLAIM-003` (support), `CLAIM-009` (support)
  Gap labels: `GAP-CONTROL-PANEL`
- Bench safety cannot be inferred from clinical context: Clinical and registry records are context-only and cannot resolve off-tumor safety for a validation program.
  Evidence: `CLAIM-004` (support), `CLAIM-006` (support), `SRC-004` (support)
  Gap labels: `GAP-SAFETY-TRANSLATION`
- Evidence snapshot is curated: This packet uses a pre-reviewed source set so the exported plan stays reproducible when public APIs are unavailable.
  Evidence: `CLAIM-008` (support), `NULL-001` (support), `NULL-002` (support)
  Gap labels: `GAP-LIVE-RETRIEVAL`

## Source ledger details

- SRC-001 (Translational maturity context only)
  Cite for: CT041 / CLDN18.2 CAR-T clinical evidence in gastrointestinal cancers and translational maturity.
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
  Cite for: CLDN18.2 / CT041 trial landscape and target-maturity context.
  Do not cite for: Do not cite as efficacy proof, safety proof, bench-method proof, protocol proof, or patient advice.
  Locator: ClinicalTrials.gov API query: CLDN18.2 gastric cancer CAR-T; https://clinicaltrials.gov/api/v2/studies?query.term=CLDN18.2%20gastric%20cancer%20CAR-T&pageSize=5&format=json
- SRC-012 (Evidence-tracking context)
  Cite for: Why the packet separates source records from conclusions and keeps citation boundaries visible.
  Do not cite for: Do not cite as evidence that TargetBench recommendations are biologically correct.
  Locator: PMID:41206112; PMCID:PMC12596265; DOI:10.1093/bib/bbaf571; https://europepmc.org/article/MED/41206112
- SRC-014 (Evidence-synthesis limitation context)
  Cite for: Why uncertain or incomplete evidence should be labeled instead of converted into overconfident conclusions.
  Do not cite for: Do not cite as proving TargetBench is hallucination-free.
  Locator: PMID:41132171; PMCID:PMC12540348; DOI:10.3389/fpubh.2025.1635381; https://europepmc.org/article/MED/41132171
- SRC-016 (Clinical/trial context only)
  Cite for: 2025 randomized phase 2 CT041-ST-01 satri-cel maturity anchor for CLDN18.2 gastric/GEJ target context.
  Do not cite for: Do not cite as bench-method proof, protocol evidence, clinical advice, safety proof, efficacy proof, or proof that CAR-T validation is solved.
  Locator: PMID:40460847; DOI:10.1016/S0140-6736(25)00860-8; NCT04581473; https://pubmed.ncbi.nlm.nih.gov/40460847/
