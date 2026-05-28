# Very Good Demo Plan

## Executive Summary

Today the app is a deterministic CLDN18.2 gastric/GEJ packet viewer with useful
provenance and safety checks. It is not a convincing end-to-end product demo
yet. The critique is mostly right: clicking `Generate` returns a curated,
prewritten CLDN18.2 validation-planning fixture. There is no runtime evidence
retrieval, no RAG, no OpenAI call, and no live PubMed or ClinicalTrials.gov
query.

That does not mean the MVP is bad. The current implementation is honest,
auditable, and safer than a fake live biomedical chatbot. The problem is that
the user-facing demo over-explains the hackathon fixture and evaluator contract
instead of showing the intended workflow:

> target hypothesis -> organized evidence -> target rationale -> validation
> logic -> risk/gap analysis -> useful export.

The goal is to keep the MVP static/curated, but make it feel like a real
validation-planning product. The app should openly say it uses a curated
evidence snapshot, then visibly transform the target hypothesis into evidence
clusters, rationale, validation logic, decision gates, risks/gaps, and exports.

## Current Demo: What Actually Happens

When the app loads, `index.html` mounts the React app in `src/main.tsx`. The
main UI stores `target`, `disease`, `modality`, and `prompt` as React state in
`src/main.tsx`.

When the user clicks `Generate`:

1. `runPacket()` in `src/main.tsx` calls
   `generateTargetBenchPacket({ target, disease, modality, prompt })`.
2. `generateTargetBenchPacket()` in `src/targetbench-core.mjs` normalizes blank
   inputs back to the default CLDN18.2 gastric/GEJ values.
3. The same function concatenates all fields and runs deterministic guardrail
   regex checks through `detectGuardrails()`.
4. If a guardrail matches, it returns `guardrailPacket()`.
5. If the target/disease matches CLDN18.2 plus gastric/GEJ/stomach terms, it
   returns `cldn182Packet()`.
6. If the target/disease does not match that fixture, it returns
   `unsupportedTargetPacket()`.

New data is not queried. The code has no runtime biomedical fetch path in
`src/`, `scripts/`, or `tests`. There is no OpenAI SDK, PubMed adapter,
ClinicalTrials.gov adapter, RAG pipeline, or live source verification. The
`liveRetrieval` field is explicitly `mode: "disabled"` and
`status: "curated fixture cache"` in `src/targetbench-core.mjs`. The generated
Markdown under `demo/targetbench-cldn18_2-gastric_gej.md` says live retrieval is
disabled.

Sources are curated ledger strings. `sourceLedger` is hardcoded in
`src/targetbench-core.mjs`, and the UI renders `packet.sourceLedger.sources` in
`src/main.tsx`. The source URLs/PMIDs/NCT links are not fetched or verified when
the user clicks `Generate`.

Inputs only partly matter:

- `target` and `disease` determine whether the supported CLDN18.2 fixture branch
  is used.
- `modality` and ordinary `prompt` text are mostly echoed in `packet.input`; they
  do not materially change the CLDN18.2 recommendations.
- Unsafe text in any field can trigger guardrails.
- Non-default targets return an `unsupported_fixture` object from core code.

There is also a real UI bug: `unsupported_fixture` lacks `liveRetrieval`,
`boundaries`, `sections`, `sourceLedger`, and `guardrails`, but `PacketView` and
related views dereference those fields. A non-default target can therefore break
the UI instead of showing the unsupported-target message.

The tests mostly prove evaluator compliance. `tests/gate4.test.mjs` checks
section presence, Markdown provenance, context-only labels, negative guardrails,
and evaluator pass. It does not test the unsupported-target UI path or whether
the demo feels like a useful workflow. `scripts/evaluate-gate4.mjs` always uses
`DEFAULT_INPUT`, so the generated artifacts prove the deterministic fixture, not
general target handling.

## Core Problem

The intended product story is:

> User gives target -> system pulls/organizes evidence -> system explains target
> rationale -> system proposes validation logic -> system highlights risks/gaps
> -> system exports a useful packet.

The current demo story is closer to:

> User clicks Generate -> prewritten CLDN18.2 compliance packet appears.

The gap is not just technical. It is narrative and content design.

Technically, the app is static and curated. That is acceptable for a 24-hour MVP
if it is framed honestly. The bigger issue is that the UI and packet copy leak
implementation language such as `Gate 4`, `fixture`, `deterministic demo cache`,
`source IDs`, and `judgeable path`. Those phrases defend the build process. They
do not help a judge understand the validation-planning workflow.

Scientifically, many useful sections already exist: rationale, expression,
model systems, assay modules, controls, readouts, safety gaps, go/no-go gates,
source ledger, caveats, and gap labels. But they are presented as a long packet,
not as a visible transformation from hypothesis to evidence-backed decisions.

Product-wise, unsupported targets are currently framed as future fixtures and
may break the UI. A good static MVP should instead say: "This target is not in
the curated evidence snapshot yet; here is what evidence would need to be
collected before a reliable packet can be generated."

## Language Mismatch Audit

| Current text or pattern | Where it appears | Why it is harmful | Better user-facing intent |
|---|---|---|---|
| `Fixture only`, `Gate 4 checks` | `src/main.tsx` top status strip | The first thing a judge sees is evaluator jargon. | `CLDN18.2 example`, `Evidence packet ready`, `Curated evidence snapshot`. |
| Raw `fixtureId` and `curated fixture cache` | `src/main.tsx` packet meta; generated JSON | Makes the packet feel staged rather than useful. | Show `Curated evidence snapshot` in UI; keep raw IDs in JSON provenance. |
| `default hackathon fixture` / `default demo fixture` | `src/targetbench-core.mjs`; generated Markdown | Explains why the team picked a demo, not why the target matters. | `Selected planning case because public evidence supports rationale, maturity context, and off-tumor safety review.` |
| `Live retrieval disabled for core demo` | `src/targetbench-core.mjs`; generated Markdown | Reads like an implementation excuse. | `This packet uses a pre-reviewed evidence snapshot so the plan is reproducible.` |
| `judgeable path uses the curated cache` | Gap label detail in core/demo output | Judging logistics do not belong in the scientific packet. | `Live search was not used for this packet; evidence coverage is curated and incomplete.` |
| `Treat the curated fixture as a deterministic demo cache` | Caveats section | "Demo cache" weakens confidence. | `Evidence coverage is curated, not a systematic review.` |
| `Render every recommendation with source IDs...` | Source IDs/citations section | A product requirement leaks into the recommendation text. | `Each recommendation shows supporting evidence, caveats, or missing-evidence labels.` |
| Heavy inline `SRC-`, `CLAIM-`, `DQ-`, `GAP-` IDs | UI reference rows; Markdown export | Auditability is good, but raw IDs dominate the reading experience. | Show readable citation labels first; keep raw IDs as secondary provenance. |
| Repeated `context-only` tag | Source usage labels and evidence refs | Correct but jargon-heavy when repeated everywhere. | `Background only: supports translational context, not assay design, safety, or efficacy.` |
| `Gate 4 evaluation`, `AUTO-001`, `NEG-PATIENT`, `MR-001`, `TECH-001` | `demo/gate4-evaluation.md`; evaluator script | The demo artifacts read like internal rubric output. | `Validation summary` with plain-language checks. |
| README foregrounds `Gate 5`, action tokens, `OpenClaw`, `handoff-guard` | `README.md` | Public-facing docs read like orchestration notes. | Keep product/demo README concise; move ops details into `project-initiation/`. |
| `current MVP only generates...` | Unsupported target packet | Product maturity leaks into user copy. | `This target is outside the current curated evidence snapshot.` |
| `alternate/future fixture` for B7-H3 | Unsupported target and default packet policy | Frames a user target as backlog, not an evidence task. | `B7-H3 remains plausible but needs a curated source review before a reliable packet.` |
| `Forbidden-output guardrails` | Guardrails tab | Defensive developer wording. | `Out-of-scope requests` and `What TargetBench can provide instead`. |
| `Request blocked by TargetBench safety boundary` | Guardrail packet title | Sounds like policy enforcement rather than product guidance. | `Out-of-scope request: here is a safe planning alternative.` |

## What A Very Good Demo Should Show

A very good demo should make the static nature of the MVP explicit, then show a
credible transformation:

1. The user enters or confirms a target hypothesis: CLDN18.2 + gastric/GEJ +
   CAR-T.
2. The app shows that it is using a curated evidence snapshot, not live search.
3. The app organizes that evidence into clusters:
   - target rationale
   - expression/off-tumor safety
   - translational maturity/background
   - validation assay/readout categories
   - controls and model-system gaps
4. The app synthesizes a concise target rationale.
5. The app proposes validation logic as a matrix:
   - evidence cluster
   - planning implication
   - recommended validation module
   - decision gate
   - risk/gap
6. The app highlights top risks and open gaps in plain language.
7. The app exports a packet that reads like something a translational scientist
   would bring to a target-validation meeting.

For a non-expert judge, the message should be:

> I typed a target hypothesis, and the app turned it into an evidence-backed
> validation planning packet with sources, risks, and exportable next steps.

For a scientific or technical judge, the message should be:

> The MVP is narrow and curated, but it is auditable. It labels clinical records
> as background only, avoids protocol/patient advice, shows evidence gaps, and
> does not pretend live retrieval or clinical validation happened.

## Recommended Demo Architecture

Use one recommended path and two optional stretch paths.

### Recommended path: local curated evidence corpus

Keep the MVP static, but restructure the data so it looks and behaves like a
curated evidence workflow instead of a monolithic hardcoded packet.

Add or extract a local evidence corpus:

- `src/curated-evidence/cldn18_2_gastric_gej.mjs`
- evidence records grouped by source, claim, evidence cluster, caveat, and gap
- validation-plan templates that consume those records

Then make `generateTargetBenchPacket()` visibly assemble the packet from that
local corpus:

- normalize hypothesis
- select supported curated evidence snapshot
- organize evidence clusters
- synthesize rationale
- map evidence clusters to validation logic
- attach risks/gaps
- export packet

This still is not live retrieval, but it demonstrates the product workflow
honestly.

### Optional stretch path: transparent retrieval simulation

Add a UI stepper that says:

- `Load curated evidence snapshot`
- `Group evidence by rationale, safety, assays, controls, and gaps`
- `Build validation logic`
- `Prepare export`

Do not call it live search. Call it `Curated evidence assembly`.

### Optional stretch path: live refresh later

After the static demo is good, add a separate branch for optional live
enrichment. That branch should not replace the curated path. Live retrieval
should only add freshness/context and should degrade cleanly.

## Proposed User Flow

1. **Input target hypothesis**
   - User sees target, disease, modality, and planning note.
   - The app shows a badge: `Curated evidence snapshot`.
   - If the input is the supported CLDN18.2 case, continue.
   - If unsupported, show a useful unsupported-state page.

2. **Evidence collection / organization**
   - Show evidence clusters before the packet:
     - rationale evidence
     - expression/off-tumor evidence
     - translational background
     - assay/readout support
     - gaps and unsupported specifics
   - Show source counts and a few readable citation labels.

3. **Target rationale**
   - Replace fixture-justification language with target-rationale language.
   - Explain why CLDN18.2 in gastric/GEJ is useful for a planning demo:
     public evidence supports target rationale, translational maturity context,
     and a visible off-tumor safety question.

4. **Validation logic**
   - Show a matrix:
     - validation question
     - evidence basis
     - recommended module
     - controls/readouts
     - decision impact
     - gap label

5. **Risk and gap analysis**
   - Show top five gaps in user language:
     - expression threshold not specified
     - model specificity needs expert selection
     - control panel needs local design
     - off-tumor safety cannot be inferred from clinical background
     - evidence snapshot is curated, not exhaustive

6. **Export**
   - Export a one-page summary plus full packet.
   - Keep JSON for auditability.
   - Markdown should read like a planning memo, not a compliance artifact.

## Content Rewrite Plan

Rewrite or remove internal/demo/evaluator language from user-facing output.
Keep the underlying safety boundaries and provenance in the data model.

### Rewrite target rationale

Before:

> Why this target/disease pair is the default hackathon fixture.

After:

> Why this target/disease pair is a useful validation-planning case.

Before:

> Use CLDN18.2 in gastric/GEJ cancer as the default demo fixture because the
> curated free-source evidence supports target rationale...

After:

> CLDN18.2 in gastric/GEJ cancer has enough public evidence to support a
> first-pass validation plan: target rationale, translational background, and a
> specific off-tumor safety question to resolve.

### Rewrite live retrieval caveat

Before:

> Live retrieval disabled for core demo: The judgeable path uses the curated
> cache so API throttling cannot block export generation.

After:

> Evidence snapshot: This packet uses a pre-reviewed source set. It is
> reproducible, but it is not a systematic review or live literature search.

### Rewrite source/provenance section

Before:

> Render every recommendation with source IDs, claim/DQ IDs, or explicit gap
> labels.

After:

> Each recommendation lists the evidence it uses and the evidence it is missing.
> Clinical sources are marked as background only when they cannot support assay,
> safety, or efficacy claims.

### Rewrite unsupported target response

Before:

> The current MVP only generates the deterministic CLDN18.2 gastric/GEJ packet.

After:

> This target is outside the current curated evidence snapshot. TargetBench can
> still show what evidence would be needed before generating a reliable packet:
> target-expression evidence, normal-tissue/off-tumor review, model-system
> support, assay/control references, and source provenance.

### Rewrite guardrail response

Before:

> Request blocked by TargetBench safety boundary.

After:

> Out-of-scope request.

Add:

> TargetBench can help with high-level validation planning, evidence gaps, and
> review questions for experts. It cannot provide patient-specific treatment
> advice, exact protocols, regulatory decisions, biosafety clearance, or proof
> of clinical safety/efficacy.

### Rewrite top chrome

Before:

> Fixture only | Gate 4 checks | Ready

After:

> CLDN18.2 example | Curated evidence snapshot | Packet ready

## Implementation Plan

### P0: immediate fixes to make the current demo presentable

Goal: stop the demo from reading like an internal compliance packet.

Specific changes:

1. Fix unsupported-target UI rendering.
   - Files: `src/main.tsx`, `src/targetbench-core.mjs`, `tests/gate4.test.mjs`.
   - Add an `UnsupportedTargetView`.
   - Make `EvidenceView`, `PacketView`, `ExportView`, and `GuardrailView` handle
     `unsupported_fixture` safely.
   - Add a test that `generateTargetBenchPacket({ target: "B7-H3", disease:
     "glioblastoma" })` returns a useful unsupported object and that Markdown
     export is safe.

2. Replace internal top-level UI language.
   - File: `src/main.tsx`.
   - Replace `Fixture only` with `CLDN18.2 example`.
   - Replace `Gate 4 checks` with `Curated evidence snapshot`.
   - Replace raw `fixtureId` display with a readable case label.

3. Rewrite user-facing packet copy.
   - File: `src/targetbench-core.mjs`.
   - Remove `hackathon fixture`, `demo fixture`, `judgeable path`,
     `deterministic demo cache`, and `current MVP` from packet text.
   - Keep those concepts in README/project-initiation docs, not in the packet.

4. Rename the safety tab language.
   - File: `src/main.tsx`.
   - `Forbidden-output guardrails` -> `Out-of-scope requests`.
   - `Request blocked by TargetBench safety boundary` -> `Out-of-scope request`.

5. Regenerate demo artifacts.
   - Command: `npm run demo`.
   - Files: `demo/targetbench-cldn18_2-gastric_gej.md`,
     `demo/targetbench-cldn18_2-gastric_gej.json`,
     `demo/gate4-evaluation.md`,
     `demo/gate4-evaluation.json`.
   - The generated packet should now read like a planning memo.

### P1: changes that make the demo genuinely good

Goal: show the intended transformation while staying static/curated.

Specific changes:

1. Add evidence clusters to the packet model.
   - File: `src/targetbench-core.mjs`.
   - Add fields such as `evidenceClusters`:
     - `target_rationale`
     - `expression_off_tumor`
     - `translational_background`
     - `validation_modules`
     - `risks_and_gaps`
   - Each cluster should include readable label, source count, key sources,
     caveat, and planning implication.

2. Add a visible workflow stepper.
   - Files: `src/main.tsx`, `src/styles.css`.
   - Steps:
     - `Hypothesis`
     - `Evidence snapshot`
     - `Rationale`
     - `Validation logic`
     - `Risks and gaps`
     - `Export`
   - This can be static and deterministic; it just needs to make the
     transformation visible.

3. Add a validation logic matrix.
   - Files: `src/targetbench-core.mjs`, `src/main.tsx`, `src/styles.css`.
   - Rows should include:
     - target expression / off-tumor review
     - model systems
     - assay modules
     - controls
     - readouts
     - go/hold/no-go gates
   - Columns should include:
     - planning question
     - evidence basis
     - recommended module
     - decision impact
     - gap/risk

4. Prioritize risks and gaps.
   - File: `src/targetbench-core.mjs`.
   - Add `topRisks` or `riskRegister`.
   - Each risk should say:
     - what is uncertain
     - why it matters
     - what expert decision is needed
     - which source/gap label supports it

5. Improve export quality.
   - File: `src/targetbench-core.mjs`.
   - Markdown should start with a one-page executive planning summary:
     - hypothesis
     - evidence snapshot status
     - target rationale
     - validation modules
     - top risks/gaps
     - decision gates
   - Raw provenance IDs can follow in a detailed appendix.

6. Add user-usefulness tests.
   - File: `tests/gate4.test.mjs` or new `tests/demo-quality.test.mjs`.
   - Check that Markdown does not include banned internal phrases:
     `hackathon fixture`, `judgeable path`, `Gate 4`, `deterministic demo cache`.
   - Check that Markdown includes `Evidence snapshot`, `Validation logic`,
     `Top risks`, and `Decision gates`.
   - Check unsupported target Markdown says what evidence is needed.

### P2: stretch improvements

Only after P0/P1 are done:

1. Add a local curated corpus module.
   - Move hardcoded source and claim data out of the main generator into
     `src/curated-evidence/cldn18_2_gastric_gej.mjs`.
   - This makes the app honestly "organize evidence" from a local corpus.

2. Add a static evidence-assembly timeline.
   - UI shows `Load snapshot -> Cluster evidence -> Build plan -> Export`.
   - Do not call this live retrieval.

3. Add optional live retrieval on a later branch.
   - Not part of this fix plan.
   - Should be a beta side panel, not the main generator.

## Testing and Acceptance Criteria

The demo should not be accepted as fixed until these are true:

1. The default CLDN18.2 path still passes:
   - `npm run lint`
   - `npm test`
   - `npm run build`
   - `npm run demo`

2. The generated packet reads like a product artifact, not a compliance packet:
   - No user-facing `hackathon fixture`.
   - No user-facing `judgeable path`.
   - No user-facing `deterministic demo cache`.
   - No user-facing `Gate 4` or `AUTO-*` in the main packet.
   - `MVP` appears in README/project docs, not in packet recommendations.

3. The transformation is visible:
   - UI shows hypothesis.
   - UI shows curated evidence organization.
   - UI shows rationale.
   - UI shows validation logic.
   - UI shows risks/gaps.
   - UI shows export.

4. Unsupported targets behave professionally:
   - B7-H3/glioblastoma does not crash.
   - The page says the target is outside the curated evidence snapshot.
   - It lists what evidence would be needed to generate a reliable packet.
   - It does not pretend to produce a complete packet.

5. Export quality improves:
   - Markdown starts with a readable one-page summary.
   - Detailed source ledger remains available.
   - Clinical/trial records are still clearly background-only.
   - Gap labels remain visible but are not the main reading experience.

6. Safety remains intact:
   - Patient advice prompts are blocked or redirected.
   - Exact wet-lab parameter/protocol prompts are blocked or redirected.
   - Clinical proof, regulatory, biosafety, and expert-replacement prompts are
     blocked or redirected.
   - Safety boundaries are written as user guidance, not disclaimer spam.

## Demo Script For Judges

Use this concise script after the improvements:

> TargetBench turns an oncology cell-therapy target hypothesis into a
> validation-planning packet. This MVP is intentionally narrow: it uses a
> curated CLDN18.2 gastric/GEJ evidence snapshot so the demo is reproducible and
> does not depend on live APIs.

> I enter the hypothesis: CLDN18.2, gastric/GEJ cancer, CAR-T. The app shows the
> evidence snapshot it is using and organizes the evidence into target
> rationale, expression/off-tumor safety, translational background, assay logic,
> controls, readouts, and gaps.

> The value is not just finding papers. The value is turning evidence into a
> planning artifact: what we would validate, what controls and readouts matter,
> what would make us hold or stop, and what evidence is still missing.

> The packet is source-grounded and exportable. Clinical sources are marked as
> background only. The app will not give patient advice, exact protocols,
> regulatory guidance, biosafety clearance, or proof of safety/efficacy.

> If I enter a target outside the curated snapshot, the app does not fake a
> packet. It tells me what evidence needs to be collected first. That is the
> honest boundary of this 24-hour MVP.

## Risks and Safety Boundaries

The biggest risk is overclaiming. Do not pretend the app performs live
biomedical retrieval, RAG, or AI synthesis until that exists in code. Do not
hide the static/curated nature of the MVP. Make it a strength: reproducible
evidence snapshot, explicit gaps, expert-review boundary.

The second risk is letting safety language dominate the product narrative. Keep
the safety boundaries, but move them into:

- an `Out-of-scope requests` section
- short caveats attached to affected recommendations
- a clear footer in the export
- negative-prompt tests

Do not flood the main target rationale and validation logic with defensive
phrasing.

The third risk is breaking the existing Gate 4 contract while improving the
demo. The revised demo still needs:

- every required validation-planning section
- source/provenance or gap labels for recommendations
- context-only handling for clinical/trial records
- live-retrieval independence
- negative guardrails

The fourth risk is unsupported-target behavior. A broken unsupported state is
worse than a narrow curated demo. Fix it early.

## Open Questions

1. Should the improved static demo stay CLDN18.2-only for the hackathon, or
   should it include one explicitly unsupported target example in the UI?
2. Should raw `CLAIM-*` and `DQ-*` IDs remain visible in the main UI, or move to
   an expandable provenance drawer?
3. Should the Markdown export include both a one-page summary and full appendix,
   or should there be two export buttons?
4. How much of the README should be product-facing versus project-initiation
   documentation?
5. Should the local curated evidence corpus be split into its own module before
   the demo rewrite, or only after P0 copy/UI fixes pass?
6. What exact phrases should be banned from user-facing packet output in tests?
7. Do judges need to see the Gate 4 evaluation artifact, or should it be renamed
   to a plain-language validation summary for the demo branch?
