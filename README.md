# TargetBench: Cell Therapy Validation Planner

AI x Bio hackathon project for a life-science-native MVP.

TargetBench is a scientist-facing prototype concept that turns an oncology
cell-therapy target hypothesis into a structured validation-planning packet.
The approved first demo fixture is CLDN18.2 in gastric / gastroesophageal
junction cancer.

## Current Status

This repository currently contains the approved project-initiation package and
the Gate 5 handoff draft. The MVP build has not started yet.

- Gate 1 project brief: approved.
- Gate 2 literature-review plan: approved.
- Gate 2 literature/evidence pack: approved.
- Gate 3 literature audit: approved.
- Gate 4 success and evaluation contract: approved.
- Gate 5 harness handoff: drafted and ready for human approval.

After Gate 5 is approved, the allowed build path is a narrow local MVP in this
repo, not a broad research system or final scientific output corpus.

## Product Direction

The MVP should accept a target + disease + modality prompt and return a
bench/program-level planning artifact:

- target rationale
- expression and off-tumor safety checks
- model-system suggestions
- assay modules
- controls and readouts
- safety gaps
- go/no-go gates
- source IDs, citations, caveats, and gap labels
- Markdown and JSON exports

The output must be useful as a planning aid for trained scientists and
translational biotech operators. It must not present itself as clinical advice,
regulatory advice, biosafety clearance, an executable wet-lab protocol, or a
replacement for expert review.

## What Changed From The First Idea

The first idea was not used because it leaned too far toward venture scouting,
company discovery, and generic search. That direction risked becoming a
VC-native diligence tool rather than a life-science-native product.

The project was reframed around a stricter test: the demo output should be
something a scientist, translational researcher, or biotech operator could use
at the bench or program-planning level. That is why TargetBench is now a cell
therapy target-validation planner, not an investor memo generator, portfolio
scanner, or generic literature search app.

## Literature Review Boundary

The literature review is for building the MVP. It is not the MVP's final
scientific output corpus.

Specifically, Gate 2 does not attempt to precompute the final CLDN18.2
validation packet. It defines the product scope, demo target, evidence
constraints, safety boundaries, and acceptance criteria for building an MVP
that can generate such a packet.

This distinction matters for implementation:

- Use the literature review to decide what the product must build.
- Use the curated fixture and source ledger to support the demo.
- Do not turn the literature review itself into the final demo output.
- Do not claim that the current evidence pack proves clinical efficacy, safety,
  wet-lab validity, or a complete CLDN18.2 validation plan.

## Demo Target

Gate 2 selected CLDN18.2 in gastric / gastroesophageal junction cancer as the
default demo fixture because it had stronger 12-hour MVP support than B7-H3
glioblastoma under the allowed free-source constraints.

Reasons:

- CLDN18.2 had stronger public translational and clinical context.
- CT041 / satri-cel records gave useful maturity anchors for target context.
- ClinicalTrials.gov provided relevant trial context.
- CLDN18.2 has an explicit target-context and off-tumor safety discussion.
- B7-H3 glioblastoma remains plausible, but is better treated as an alternate
  or future fixture for this hackathon timeline.

Clinical and trial records are context-only. They must not be cited as
bench-method proof, patient-specific treatment evidence, safety proof, or proof
that CAR-T validation is solved.

## Source Policy

Literature and evidence retrieval must use free biomedical/science sources
only. Paid databases and publisher paywalls are out of scope.

Allowed source families include:

- PubMed / NCBI E-utilities
- PubMed Central / PMC Open Access
- Europe PMC
- ClinicalTrials.gov
- Semantic Scholar
- OpenAlex
- Crossref
- Unpaywall for open-access lookup
- NIH RePORTER
- bioRxiv
- medRxiv
- ChemRxiv
- DOAJ

The core demo must not depend on live API availability. Live retrieval may be
optional enrichment only; the judgeable path should work from a deterministic
curated fixture/cache.

## Approved Build Boundary

The Gate 5 handoff currently authorizes these action tokens after Gate 5 human
approval:

- `scaffold_project`
- `build_targetbench_mvp`
- `implement_curated_cldn18_2_fixture`
- `implement_source_ledger_and_exports`
- `implement_safety_guardrails`
- `run_gate4_evaluation_checks`
- `commit_and_push_project_artifacts`

The intended MVP path is:

1. Build a lightweight local web app or similarly judgeable prototype.
2. Make CLDN18.2 gastric/GEJ the deterministic default fixture.
3. Generate a structured validation-planning packet.
4. Show source IDs, caveats, and gap labels next to recommendations.
5. Include Markdown and JSON export.
6. Add negative checks for unsafe or overclaimed output.
7. Push non-secret finished artifacts to this repo.

## Evaluation Contract

Gate 4 requires the MVP to pass both positive and negative checks.

Positive path:

- Generate all required validation-packet sections for the curated CLDN18.2
  fixture.
- Link recommendations to source IDs, claim/DQ IDs, or gap labels.
- Export Markdown and JSON.
- Keep trial and clinical evidence clearly labeled as context-only.

Failure cases:

- exact wet-lab parameters or executable protocol steps
- patient-specific treatment advice
- regulatory advice or biosafety clearance
- claims that TargetBench replaces expert review
- trial records used as bench-method, efficacy, or safety proof
- missing TECH-001 sections without explicit gap labels
- live API failure blocking the core demo packet

## Project-Initiation Artifacts

All gate artifacts live under `project-initiation/`.

- `PROJECT_BRIEF.md`: Gate 1 brief.
- `LITERATURE_REVIEW_PLAN.md`: Gate 2 retrieval plan.
- `LITERATURE_REVIEW.md`: Gate 2 narrative synthesis.
- `literature-review/`: Gate 2 machine-readable evidence pack.
- `LITERATURE_REVIEW_AUDIT.md`: Gate 3 audit and Gate 4 carry-forward register.
- `SUCCESS_AND_EVALUATION_CONTRACT.md`: Gate 4 success and evaluation contract.
- `HARNESS_HANDOFF.md`: Gate 5 handoff draft.
- `approvals/`: human approval records for completed gates.

## Non-Goals

TargetBench is not:

- a clinical decision-support product
- a patient-treatment recommendation tool
- a wet-lab protocol generator
- a regulatory or biosafety signoff tool
- a VC diligence or company-search app
- a generic literature search interface
- a complete scientific validation corpus
- a production biomedical retrieval platform

The right hackathon win is a narrow, reliable, evidence-visible planning
prototype that feels useful to a translational scientist.
