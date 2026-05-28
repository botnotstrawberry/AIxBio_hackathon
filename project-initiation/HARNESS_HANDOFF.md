# HARNESS_HANDOFF

## Approved input artifacts
- Gate 1 `PROJECT_BRIEF.md`: approved 2026-05-28T01:08:31Z; sha256 `80a0463676bd07e3f94726e158cfb4ff13f0a540db7629aa11d06cc9473b6c8c`.
- Gate 2 plan `LITERATURE_REVIEW_PLAN.md`: approved 2026-05-28T01:32:07Z; sha256 `b267cea9bac53a2ed3ffc6b6a027bdde364c2397018f2591284ee0feac65e4f8`.
- Gate 2 evidence pack `literature-review/MANIFEST.json`: approved 2026-05-28T02:39:07Z; manifest sha256 `6e6def9e6eeb39d48719a51bc46ff78f27ace2f5b3927587af880a099c02cfbd`.
- Gate 2 narrative `LITERATURE_REVIEW.md`: approved as part of the Gate 2 evidence pack; sha256 `b1ead38ae482bd0a5d0e0b87e17a9f434c352a166386f1a15aee08254ddd0cc3`.
- Gate 3 `LITERATURE_REVIEW_AUDIT.md`: approved 2026-05-28T02:54:51Z; sha256 `0efb6def6f865b4c006733aca4827cc28f5b3324e2f73b9791386ec2139ae3cb`.
- Gate 4 `SUCCESS_AND_EVALUATION_CONTRACT.md`: approved 2026-05-28T03:07:43Z; sha256 `db2fcb7d546b6ac900598959fd92fae7feb603057f7c3cb7074b78c85528a0e9`.
- Authoritative Gate 2 records for implementation guidance: `literature-review/records/*.jsonl`, `literature-review/retrieval/*.jsonl`, and `literature-review/exports/gate4_inputs.json`.

## Approved next harness actions
- scaffold_project
- build_targetbench_mvp
- implement_curated_cldn18_2_fixture
- implement_source_ledger_and_exports
- implement_safety_guardrails
- run_gate4_evaluation_checks
- commit_and_push_project_artifacts

## Approved action details
- `scaffold_project`: create or update ordinary application files in `/root/projects/AIxBio_hackathon` only, preserving the published `project-initiation/` evidence mirror.
- `build_targetbench_mvp`: build the TargetBench MVP described by `BUILD-001`: a runnable prototype that accepts an oncology cell-therapy target hypothesis and produces an evidence-grounded validation-planning packet.
- `implement_curated_cldn18_2_fixture`: implement the deterministic CLDN18.2 gastric/GEJ demo fixture/cache as the core judgeable path.
- `implement_source_ledger_and_exports`: expose source IDs, claim/DQ IDs, caveats, gap labels, and Markdown/JSON export behavior required by Gate 4.
- `implement_safety_guardrails`: block or caveat patient-specific advice, protocol-like wet-lab steps, clinical efficacy/safety proof claims, regulatory advice, biosafety clearance, and expert-replacement language.
- `run_gate4_evaluation_checks`: run local positive and negative checks against the Gate 4 success/falsification criteria and record the result in repo-visible demo/evaluation artifacts.
- `commit_and_push_project_artifacts`: commit and push non-secret project artifacts to `botnotstrawberry/AIxBio_hackathon` after preflight, using exact-path staging and excluding secrets, local env files, virtualenvs, caches, and generated dependency folders.

## Forbidden actions
- Do not use paid databases, publisher paywalls, Scopus, Web of Science, Embase, or proprietary/private biomedical sources.
- Do not access, stage, commit, or print secrets, wallet keys, `.env` files, local credentials, PHI, private patient records, or private lab/project records.
- Do not make live API availability required for the core demo packet; live retrieval may only be optional enrichment with transparent failure behavior.
- Do not produce exact wet-lab parameters, executable protocols, patient-specific treatment advice, regulatory advice, biosafety clearance, or claims that TargetBench replaces expert review.
- Do not present clinical/trial records as bench-method proof, efficacy proof, safety proof, or evidence that CAR-T validation is solved.
- Do not expand the MVP into a final CLDN18.2 scientific output corpus, a generic paper-search app, a VC diligence product, a clinical decision-support tool, or a production biomedical retrieval platform.
- Do not mutate OpenClaw runtime/config/package/service files, run gateway updates/restarts, enable Active Memory, or change the temporary hackathon branch state.
- Do not deploy publicly, send external messages, spend money, access private keys, or perform destructive cleanup without a separate explicit human approval.

## Open dependencies still requiring human approval
- Gate 5 approval is still required before harness work may start.
- Any public deployment, external posting, real-money use, secret/API-key access, private dataset access, or live service dependency beyond free public APIs requires separate approval.
- Any expansion beyond the TargetBench MVP path, including a full scientific content pack, additional disease-target fixtures, robust live retrieval infrastructure, or final clinical/scientific validation claims, requires separate approval.

## Exact safe automation boundary
After Gate 5 approval and a passing `handoff-guard`, automation may build only the repo-local TargetBench MVP in `/root/projects/AIxBio_hackathon`, grounded in the approved Gate 1-4 artifacts. The safe build target is a deterministic CLDN18.2 gastric/GEJ validation-planning demo with visible evidence provenance, caveats, gap labels, safety refusals/caveats, and Markdown/JSON exports. The handoff does not authorize clinical advice, wet-lab execution, paid-source retrieval, secret access, OpenClaw runtime mutation, or broad project-scope expansion.

## Advisory review notes
- Protocol/contract stance: the handoff names the approved canonical inputs, exact allowed action tokens, forbidden actions, and the automation boundary. No Gate 5 blocker found.
- Boundary/safety stance: the handoff preserves the key distinction that Gate 2 reviewed evidence for MVP construction, not final scientific output packaging. The main residual risk is overbuilding live retrieval or scientific-content depth before the deterministic demo path works; this is explicitly forbidden or approval-gated above.
