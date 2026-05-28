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
- install_project_dependencies
- build_targetbench_mvp
- implement_curated_cldn18_2_fixture
- implement_source_ledger_and_exports
- implement_safety_guardrails
- run_local_dev_server_and_checks
- run_gate4_evaluation_checks
- run_autonomous_rework_until_gate4_pass
- operate_overnight_continuity_watchdog
- commit_and_push_project_artifacts

## Approved action details
- `scaffold_project`: create or update ordinary application files in `/root/projects/AIxBio_hackathon` only, preserving the published `project-initiation/` evidence mirror.
- `install_project_dependencies`: add and install ordinary open-source project dependencies, package manifests, and lockfiles needed for a local MVP, excluding paid services, private registries, generated dependency folders, credentials, and secret-bearing config.
- `build_targetbench_mvp`: build the TargetBench MVP described by `BUILD-001`: a runnable prototype that accepts an oncology cell-therapy target hypothesis and produces an evidence-grounded validation-planning packet.
- `implement_curated_cldn18_2_fixture`: implement the deterministic CLDN18.2 gastric/GEJ demo fixture/cache as the core judgeable path.
- `implement_source_ledger_and_exports`: expose source IDs, claim/DQ IDs, caveats, gap labels, and Markdown/JSON export behavior required by Gate 4.
- `implement_safety_guardrails`: block or caveat patient-specific advice, protocol-like wet-lab steps, clinical efficacy/safety proof claims, regulatory advice, biosafety clearance, and expert-replacement language.
- `run_local_dev_server_and_checks`: run local development servers, build commands, type/lint/test commands, and screenshot or smoke checks needed to verify the judgeable local demo.
- `run_gate4_evaluation_checks`: run local positive and negative checks against the Gate 4 success/falsification criteria and record the result in repo-visible demo/evaluation artifacts.
- `run_autonomous_rework_until_gate4_pass`: continue local implementation and focused rework without human approval until Gate 4 checks pass, a true hard stop is reached, or all approved work is exhausted.
- `operate_overnight_continuity_watchdog`: after Gate 5 approval and a passing `handoff-guard`, create or use a cron, TaskFlow, heartbeat, or equivalent watchdog that periodically checks build state and resumes the next approved action if work has stalled.
- `commit_and_push_project_artifacts`: commit and push non-secret project artifacts to `botnotstrawberry/AIxBio_hackathon` after preflight, using exact-path staging and excluding secrets, local env files, virtualenvs, caches, and generated dependency folders.

## Forbidden actions
- Do not use paid databases, publisher paywalls, Scopus, Web of Science, Embase, or proprietary/private biomedical sources.
- Do not access, stage, commit, or print secrets, wallet keys, `.env` files, local credentials, PHI, private patient records, or private lab/project records.
- Do not make live API availability required for the core demo packet; live retrieval may only be optional enrichment with transparent failure behavior.
- Do not produce exact wet-lab parameters, executable protocols, patient-specific treatment advice, regulatory advice, biosafety clearance, or claims that TargetBench replaces expert review.
- Do not present clinical/trial records as bench-method proof, efficacy proof, safety proof, or evidence that CAR-T validation is solved.
- Do not expand the MVP into a final CLDN18.2 scientific output corpus, a generic paper-search app, a VC diligence product, a clinical decision-support tool, or a production biomedical retrieval platform.
- Do not perform live-demo planning or implementation outside `plan/live-demo-3-4-hour` unless the user explicitly names a replacement live-demo branch.
- Do not merge `plan/live-demo-3-4-hour` into `main`, `master`, a default branch, or a release branch without the user's specific approval for that merge; a pushed branch, open PR, or passing validation is not merge approval.
- Do not mutate OpenClaw runtime/config/package/service files, run gateway updates/restarts, enable Active Memory, or change the temporary hackathon branch state.
- Do not deploy publicly, send external messages, spend money, access private keys, or perform destructive cleanup without a separate explicit human approval.

## Open dependencies still requiring human approval
- Gate 5 approval is still required before harness work may start.
- Any public deployment, external posting, real-money use, secret/API-key access, private dataset access, or live service dependency beyond free public APIs requires separate approval.
- Any expansion beyond the TargetBench MVP path, including a full scientific content pack, additional disease-target fixtures, robust live retrieval infrastructure, or final clinical/scientific validation claims, requires separate approval.

## Exact safe automation boundary
After Gate 5 approval and a passing `handoff-guard`, automation may build only the repo-local TargetBench MVP in `/root/projects/AIxBio_hackathon`, grounded in the approved Gate 1-4 artifacts. The safe build target is a deterministic CLDN18.2 gastric/GEJ validation-planning demo with visible evidence provenance, caveats, gap labels, safety refusals/caveats, and Markdown/JSON exports. The handoff does not authorize clinical advice, wet-lab execution, paid-source retrieval, secret access, OpenClaw runtime mutation, or broad project-scope expansion.

This handoff does not authorize merging or landing the live-demo branch. Any
live-demo work remains isolated to `plan/live-demo-3-4-hour` unless the user
explicitly names a replacement live-demo branch, and merge requires separate
specific user approval.

## Overnight autonomy lane
After Gate 5 approval and a passing `handoff-guard`, OpenClaw may execute every approved action token end-to-end without further human approval until final completion, true hard stop, or exhaustion of all approved work. Routine implementation choices, ordinary open-source dependency selection, local test fixes, README/demo updates, exact-path commits, and pushes to `botnotstrawberry/AIxBio_hackathon` do not require human check-ins when they stay inside this handoff.

Gate 4 manual review may be performed by an OpenClaw auditor/checker and recorded as repo-visible evidence. It is an internal acceptance gate for the overnight build, not a required human approval stop.

The continuity watchdog should run as a cron job, TaskFlow job, heartbeat wake, or equivalent resilient mechanism. Each run must:
- verify Gate 5 approval and `handoff-guard` before doing build work;
- check whether another authorized build session is already active before starting duplicate work;
- resume the next approved action token if work is idle or incomplete;
- record concise progress evidence in repo-visible artifacts or the active conversation;
- continue through authorized local rework until Gate 4 passes or a hard stop remains after workaround attempts.

## Blocker and workaround policy
Do not stop for non-essential blockers. When a blocker appears, first ask whether the blocked step is truly necessary for the approved MVP path. If it is not necessary, skip it, document the tradeoff, and continue another approved action.

Required workaround behavior:
- If a live API fails, is rate-limited, or would require a key, use the curated fixture/cache, another approved free source, or a transparent gap label.
- If an API key, paid source, private dataset, or secret would improve optional enrichment, omit that enrichment and keep building the deterministic demo.
- If a dependency fails, choose a simpler ordinary open-source dependency or implement the minimal local feature directly.
- If a local dev server or UI path blocks, continue data model, fixture, export, guardrail, test, README, or demo artifact work while isolating the UI issue.
- If exact scientific specificity is unsupported by the approved evidence pack, use caveats and gap labels rather than inventing details.

Hard stops that may still require the human: missing Gate 5 approval, failing `handoff-guard`, unavailable shell/exec, inaccessible project repo with no local workaround, required secret/private key/private data, public deployment or external posting, paid/proprietary source requirement, destructive cleanup, OpenClaw runtime mutation, or a requested scope expansion beyond the TargetBench MVP.

## Advisory review notes
- Protocol/contract stance: the handoff names the approved canonical inputs, exact allowed action tokens, forbidden actions, and the automation boundary. No Gate 5 blocker found.
- Boundary/safety stance: the handoff preserves the key distinction that Gate 2 reviewed evidence for MVP construction, not final scientific output packaging. The main residual risk is overbuilding live retrieval or scientific-content depth before the deterministic demo path works; this is explicitly forbidden or approval-gated above.
