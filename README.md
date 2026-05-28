# TargetBench: Cell Therapy Validation Planner

AI x Bio hackathon project for a life-science-native MVP.

TargetBench is a scientist-facing prototype concept that turns an oncology
cell-therapy target hypothesis into a structured validation-planning packet.
The approved first demo fixture is CLDN18.2 in gastric / gastroesophageal
junction cancer.

## Current Status

This repository currently contains the approved project-initiation package and
the approved Gate 5 overnight autonomy handoff. The MVP build lane is approved
to start within the handoff boundary.

- Gate 1 project brief: approved.
- Gate 2 literature-review plan: approved.
- Gate 2 literature/evidence pack: approved.
- Gate 3 literature audit: approved.
- Gate 4 success and evaluation contract: approved.
- Gate 5 harness handoff: approved.

The allowed build path is a narrow local MVP in this repo, not a broad research
system or final scientific output corpus.

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
- `install_project_dependencies`
- `build_targetbench_mvp`
- `implement_curated_cldn18_2_fixture`
- `implement_source_ledger_and_exports`
- `implement_safety_guardrails`
- `run_local_dev_server_and_checks`
- `run_gate4_evaluation_checks`
- `run_autonomous_rework_until_gate4_pass`
- `operate_overnight_continuity_watchdog`
- `commit_and_push_project_artifacts`

The intended MVP path is:

1. Build a lightweight local web app or similarly judgeable prototype.
2. Make CLDN18.2 gastric/GEJ the deterministic default fixture.
3. Generate a structured validation-planning packet.
4. Show source IDs, caveats, and gap labels next to recommendations.
5. Include Markdown and JSON export.
6. Add negative checks for unsafe or overclaimed output.
7. Push non-secret finished artifacts to this repo.

## Overnight Autonomy Plan

After Gate 5 is approved and `handoff-guard` passes, OpenClaw should continue
the approved build lane without per-step human approval. Routine implementation
choices, ordinary open-source dependency setup, local test fixes, README/demo
updates, exact-path commits, and pushes are part of the approved repo-local
build path.

The continuity mechanism should be a cron job, TaskFlow job, heartbeat wake, or
equivalent watchdog. It should periodically check whether the build is idle or
incomplete, verify Gate 5 approval and `handoff-guard`, avoid duplicate active
build sessions, and resume the next approved action token until the MVP passes
Gate 4 or a true hard stop remains.

OpenClaw should not stop for ordinary implementation friction. It should first
try an approved workaround or another build slice:

- If a live API fails or needs a key, use the curated fixture/cache, another
  approved free source, or a transparent gap label.
- If optional enrichment needs a paid source, private data, or a secret, omit
  that enrichment and keep building the deterministic demo.
- If a dependency blocks progress, choose a simpler ordinary open-source
  dependency or implement the minimum local feature directly.
- If UI/dev-server work blocks, continue fixture, data model, exports,
  guardrails, tests, README, or demo artifact work.
- If evidence is too thin for scientific specificity, show caveats and gap
  labels rather than inventing details.

Hard stops remain: missing Gate 5 approval, failing `handoff-guard`,
unavailable shell/exec, inaccessible repo with no local workaround, required
secrets/private keys/private data, public deployment, external posting, paid or
proprietary source requirements, destructive cleanup, OpenClaw runtime
mutation, or expansion beyond the TargetBench MVP.

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
