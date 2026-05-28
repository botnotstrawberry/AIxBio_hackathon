# TargetBench: Cell Therapy Validation Planner

AI x Bio hackathon project for a life-science-native MVP.

TargetBench is a scientist-facing prototype that turns an oncology cell therapy
target hypothesis into a structured validation-planning packet. The intended
first demo is CLDN18.2 in gastric / gastroesophageal cancer.

## Current Direction

The MVP should accept a target + disease + modality prompt and return a
bench/program-level planning artifact:

- target rationale
- target-expression and off-tumor safety checks
- model-system suggestions
- assay modules
- controls and readouts
- failure modes and go/no-go gates
- citation and gap ledger
- Markdown / JSON export

This is not clinical advice, regulatory advice, biosafety clearance, or an
executable wet-lab protocol. It is a planning assistant for trained scientists
and translational biotech operators.

## Why This Project

The hackathon sponsors and ecosystem point toward applied AI that helps life
science teams move real programs forward. TargetBench is designed for that
context: a LabCentral, Bayer Co.Lab, or AI BioHub-style team could use it to
prepare a target-validation meeting or first-pass experimental planning packet.

The product value should be the validation packet itself, not a search-results
page. Search, retrieval, and citations are supporting infrastructure.

## First Idea Not Used

The first concept was not used because it leaned too far toward venture and
company discovery and risked becoming a glorified search or scouting app. That
would have been more VC-native than life-science-native.

The planning direction was corrected around a stricter test: the output must be
something a scientist, translational researcher, or biotech operator would
actually use at the bench or program level. The project was therefore reframed
around a concrete cell therapy target-validation planner rather than investor
diligence, portfolio search, or generic literature discovery.

## Evidence-Gated Plan

Project initiation artifacts live under `project-initiation/`.

- `PROJECT_BRIEF.md`: approved Gate 1 project brief.
- `LITERATURE_REVIEW_PLAN.md`: approved Gate 2 retrieval plan.
- `LITERATURE_REVIEW.md`: Gate 2 synthesis, currently ready for human approval.
- `literature-review/`: machine-readable Gate 2 evidence pack.

The Gate 2 literature review is input for building the prototype. It is not the
MVP output and should not be packaged as the final demo artifact.

## Gate 2 Summary

Gate 2 chose CLDN18.2 in gastric / gastroesophageal cancer as the demo fixture
because the allowed free biomedical sources gave it stronger hackathon-demo
support than B7-H3 glioblastoma:

- CT041 / CLDN18.2 clinical and translational anchors were available.
- ClinicalTrials.gov had useful CLDN18.2 / CT041 trial context.
- CLDN18.2 had an explicit on-target/off-tumor safety literature hook.
- B7-H3 glioblastoma remains scientifically plausible but was less mature for a
  12-hour judgeable MVP.

## Source Policy

Literature and source evidence must use free biomedical/science sources only.
Paid databases and publisher paywalls are out of scope.

Allowed source families include PubMed, PMC Open Access, Europe PMC,
ClinicalTrials.gov, Semantic Scholar, OpenAlex, Crossref, Unpaywall for OA
lookup, NIH RePORTER, bioRxiv, medRxiv, ChemRxiv, and DOAJ.

## Planned MVP Shape

The likely prototype should be a lightweight web app with:

- a narrow CLDN18.2 demo fixture
- visible validation-packet output
- source-linked recommendations
- gap labels when evidence is weak
- exportable Markdown and JSON
- conservative expert-review wording

The build should optimize for a reliable, impressive 12-hour MVP rather than a
broad autonomous research system.
