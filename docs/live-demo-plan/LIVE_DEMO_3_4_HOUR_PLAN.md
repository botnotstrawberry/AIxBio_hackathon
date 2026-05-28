# TargetBench Live Demo 3-4 Hour Plan

Status: planning artifact for a future branch
Date: 2026-05-28
Baseline: current static MVP on `main` at `5060bc9`
Current app: curated CLDN18.2 gastric/GEJ packet remains the judgeable path

## Executive Summary

The current TargetBench MVP is now a good static demo: it turns the CLDN18.2
gastric/GEJ planning case into a readable validation packet with evidence
clusters, validation logic, risks, decision gates, guardrails, and exports.
It is intentionally curated and deterministic.

The next 3-4 hour branch should not replace that work. It should add a
separate `Live Draft Mode (beta)` that can fetch public biomedical context for
a few target hypotheses, organize the retrieved records, and optionally produce
a source-grounded draft note. The live mode should prove product direction, not
scientific authority.

The safe demo story is:

> TargetBench has a reliable curated packet path, and a beta live mode that can
> fetch public context for new target hypotheses. Live results are draft
> context, not validated science.

## Review Tier

Review tier: primary + checker.

Why: this is source-heavy planning with biomedical safety and product-positioning
risk. It needs one architecture pass and one independent safety/feasibility
check before implementation.

Planned roles:

- Primary architect: design the 3-4 hour live beta implementation plan.
- Independent auditor: check scope, safety, failure behavior, and acceptance
  criteria.

## Current Baseline To Preserve

Observed repo surfaces:

- `src/targetbench-core.mjs` owns the deterministic packet generator,
  guardrails, structured packet fields, Markdown export, and evaluator logic.
- `src/main.tsx` owns the React UI, inputs, workflow/packet/evidence/export/scope
  tabs, unsupported-target rendering, and download/copy behavior.
- `src/styles.css` owns the app layout and visual treatment.
- `tests/gate4.test.mjs` protects the curated packet, export quality, unsupported
  target behavior, guardrails, and internal-language cleanup.
- `scripts/evaluate-gate4.mjs` regenerates demo artifacts under `demo/`.
- `package.json` has no backend server today; the app is a Vite/React frontend.

Non-negotiables:

- `generateTargetBenchPacket(DEFAULT_INPUT)` stays deterministic.
- CLDN18.2 gastric/GEJ stays the default curated snapshot.
- `npm run demo` continues to write the static Gate 4 demo artifacts.
- The current app works with no live API, no LLM key, and no network dependency.
- Existing safety boundaries stay in force.
- Live mode must not mutate the curated source ledger or make external APIs
  required for the main demo.

## Goal

Add a visible future branch path that demonstrates:

1. User enters target, disease, and modality.
2. User explicitly clicks `Fetch live context`.
3. System queries a small set of free public sources.
4. System organizes returned records into evidence clusters.
5. System shows caveats, gaps, provider failures, and source provenance.
6. Optional local AI drafts a note that cites only retrieved source IDs.
7. Curated CLDN18.2 packet remains available and unchanged if anything fails.

This is a demo of retrieval-assisted planning, not a general biomedical
validator.

## Recommended Scope

Build `Live Draft Mode (beta)` as a sidecar surface, not a replacement
generator.

In scope:

- Mode control: `Curated packet` default, `Live draft beta` optional.
- Public-source adapters for Europe PMC and ClinicalTrials.gov.
- Optional OpenAlex adapter if the first two are stable.
- Query builder from target, disease, and modality.
- Hard timeouts and partial-failure handling.
- Normalized live source records.
- Evidence clusters and gap labels generated from retrieved metadata.
- Template-based draft scaffold that works without AI.
- Optional local-only AI drafting endpoint if an API key is already present in
  the server environment.
- Mocked tests for success, timeout, partial failure, unsupported target, and
  no-key AI state.

Out of scope:

- Arbitrary final packet generation for any target.
- Full RAG, vector DB, PDF/full-text ingestion, or citation graph traversal.
- New curated target fixtures.
- Production search ranking or systematic review.
- Public deployment.
- Paid sources, private datasets, PHI, private lab records, or secrets.
- Patient advice, exact wet-lab protocol parameters, regulatory advice,
  biosafety clearance, or claims of clinical/scientific validation.

## Public Source Plan

Use no-key public APIs first.

Recommended first two:

- Europe PMC REST search for article metadata and abstracts where available.
  Official docs: <https://europepmc.org/RestfulWebService>
- ClinicalTrials.gov API v2 for trial-status context only.
  Official docs: <https://clinicaltrials.gov/data-api/about-api>

Optional if time remains:

- OpenAlex Works API for broader scholarly metadata.
  Official docs: <https://docs.openalex.org/api-entities/works>

Do not use PubMed E-utilities in the 3-4 hour branch unless Europe PMC and
ClinicalTrials.gov are already working. The project already saw NCBI throttling
during Gate 2, and this branch needs predictable demo behavior.

ClinicalTrials.gov records must always be labeled:

> Clinical/trial context only. Do not cite as bench-method proof, safety proof,
> efficacy proof, patient advice, or validation evidence.

## Architecture

Keep the existing deterministic core and add live mode as separate modules.

Recommended files:

- `src/live-source-adapters.mjs`
  - provider-specific fetch functions
  - request encoding
  - hard timeout helper
  - response normalization
- `src/live-draft-core.mjs`
  - query builder
  - `Promise.allSettled` orchestration
  - dedupe across providers
  - evidence clustering
  - template-based draft scaffold
  - safety/gap labeling for live results
- `scripts/live-ai-server.mjs`
  - optional local server bound to `127.0.0.1`
  - reads `OPENAI_API_KEY` or equivalent server-side env only
  - exposes `POST /api/live-draft`
  - never logs or returns secrets
- `src/main.tsx`
  - mode control
  - live-search form state
  - `Fetch live context` button
  - provider status row
  - live source cards
  - failure states
  - optional AI draft panel
- `src/styles.css`
  - beta-mode layout, source cards, provider status, and failure state
- `tests/live-draft-core.test.mjs`
  - mocked fetch and no-network test coverage
- `tests/gate4.test.mjs`
  - add invariants proving the default curated packet does not call live fetch
    and still exports the same static demo surface
- `tests/live-ai-server.test.mjs` or equivalent small unit test if the server
  is added
- `.env.example`
  - only if needed, placeholders only, no secrets
- `README.md`
  - add a clearly separated future/live-beta section after implementation

Do not add a `VITE_*` LLM key. Vite exposes `VITE_*` values to the browser
bundle.

## Live Record Data Shape

Normalize all providers into a small, source-ledger-like object:

```js
{
  liveSourceId: "LIVE-EPMC-001",
  provider: "Europe PMC",
  providerStatus: "ok",
  title: "...",
  year: "2025",
  identifiers: {
    pmid: "...",
    pmcid: "...",
    doi: "...",
    nctId: null,
    openAlexId: null
  },
  locator: "https://...",
  usageLabel: "Target rationale context",
  doNotCiteFor: "Do not cite as validation proof or protocol evidence.",
  caveats: ["Live retrieval is incomplete and uncurated."],
  gapLabels: ["GAP-LIVE-CURATION"]
}
```

Every live record needs a visible provenance label, but raw IDs should not
dominate the first-read UI. Show title, provider, date/status, and use label
first; put raw identifiers in expandable details.

## Query Strategy

Start with simple encoded queries:

- Article query: `<target> <disease> cell therapy validation`
- Article query: `<target> <disease> expression off-tumor`
- Article query: `<target> <disease> CAR-T`
- Trial query: `<target> <disease> CAR-T`

Small limits:

- Europe PMC: 5-8 records per query, deduped.
- ClinicalTrials.gov: 5 records.
- OpenAlex: 5 records if enabled.

Timeouts:

- Per provider: 4-6 seconds.
- Overall live fetch: 8-10 seconds.

Failure behavior:

- One provider fails: show partial results plus provider failure card.
- All providers fail: show `Live context unavailable` and keep curated packet
  usable.
- Unsupported target: show live context only as draft context; do not claim a
  validated packet exists.

## Evidence Organization

Live mode should organize records into first-read clusters:

- Target rationale context
- Expression and off-tumor signals to investigate
- Model and assay planning context
- Clinical/trial background only
- Gaps and unsupported claims

Cluster assignment can be deterministic keyword logic for the 3-4 hour branch.
Examples:

- `expression`, `CLDN`, `antigen`, `tissue`, `off-tumor` -> expression/safety
- `cytotoxicity`, `potency`, `assay`, `model`, `organoid` -> model/assay
- `trial`, `phase`, `recruiting`, `NCT` -> clinical context only
- sparse or ambiguous records -> gaps/needs review

The point is to show the transformation from target input to organized
planning context, even when the retrieval is incomplete.

## Draft Output Without AI

Build the no-key draft scaffold first.

Required sections:

1. Submitted hypothesis.
2. Retrieved source summary.
3. Evidence clusters.
4. Planning implications.
5. Top gaps.
6. What the live draft cannot conclude.
7. Suggested next expert-review questions.

This deterministic scaffold should be good enough to demo if AI is cut.

## Optional AI Draft Mode

Add AI only if server-side isolation is straightforward.

Recommended implementation:

- `scripts/live-ai-server.mjs`
- local endpoint: `POST /api/live-draft`
- bound to `127.0.0.1`
- reads `OPENAI_API_KEY` from server process env
- browser calls local endpoint only
- UI disables AI controls when the local endpoint or key is unavailable

AI input:

- target
- disease
- modality
- normalized live source records
- existing safety instructions

AI output:

- short draft note
- citations only to `LIVE-*` source IDs
- explicit caveats and gaps
- no protocol steps, no exact parameters, no clinical advice, no regulatory or
  biosafety guidance

Reject or rewrite AI output if it includes:

- claims without `LIVE-*` citations
- exact wet-lab parameters
- step-by-step protocol language
- patient treatment advice
- claims that trial status proves safety or efficacy
- claims that the system replaces expert review

No-key state:

> AI draft unavailable locally. Public-source context and deterministic draft
> scaffold remain available.

## 3-4 Hour Implementation Sequence

### 0:00-0:20 - Baseline Preservation

Run:

```bash
npm run lint
npm test
npm run build
npm run demo
git diff -- demo
```

Confirm:

- current static packet is unchanged
- demo artifacts do not drift
- no live code path is required for the curated packet
- `generateTargetBenchPacket(DEFAULT_INPUT)` still has no network dependency

### 0:20-1:15 - Public Source Adapters

Implement:

- `src/live-source-adapters.mjs`
- provider fetch wrappers
- timeout helper
- response normalization
- provider failure objects

Minimum providers:

- Europe PMC
- ClinicalTrials.gov

Acceptance:

- mocked Europe PMC success normalizes to `LIVE-EPMC-*`
- mocked ClinicalTrials.gov success normalizes to `LIVE-CTG-*`
- timeout returns a provider failure object, not an exception that breaks the UI

### 1:15-1:55 - Live Draft Core

Implement:

- `src/live-draft-core.mjs`
- query builder
- provider orchestration with `Promise.allSettled`
- dedupe by PMID, DOI, NCT ID, OpenAlex ID, or URL
- deterministic cluster assignment
- deterministic no-key draft scaffold

Acceptance:

- one provider failure still returns partial context
- all provider failures return a transparent unavailable state
- clinical records are always context-only
- unsupported targets do not produce a validated packet claim

### 1:55-2:45 - UI Integration

Implement in `src/main.tsx` and `src/styles.css`:

- `Curated packet` / `Live draft beta` mode control
- `Fetch live context` button
- provider status row
- live source cards
- evidence clusters
- draft scaffold panel
- retrieval failure cards
- clear beta boundary copy

Acceptance:

- first screen still shows curated packet path clearly
- live beta has an explicit user action
- raw IDs are expandable, not dominant
- failure state is readable and non-alarming

### 2:45-3:25 - Optional Local AI Draft

Add only if the no-key live path already works.

Implement:

- `scripts/live-ai-server.mjs`
- local-only AI endpoint
- UI disabled/no-key state
- output validator for citations and forbidden language

Cut this entirely if it threatens the live-source scaffold or static MVP.

### 3:25-3:55 - Tests And Demo Evidence

Add tests:

- default curated mode makes no live fetch
- `generateTargetBenchPacket(DEFAULT_INPUT)` remains deterministic
- `npm run demo` does not depend on network or live APIs
- provider success normalization
- provider timeout/failure fallback
- partial provider failure
- all-provider failure
- clinical/trial context-only labeling
- unsupported target with live context but no validated packet
- AI no-key disabled state
- AI output validator if AI endpoint is added
- current Gate 4 tests still pass

Run:

```bash
npm run lint
npm test
npm run build
npm run demo
git diff -- demo
```

### 3:55-4:00 - Handoff

Record:

- which providers are enabled
- which targets were tried
- which providers failed or were cut
- whether AI mode exists and how to start it
- exact demo commands

## Cut Line

Cut in this order:

1. Optional AI endpoint.
2. Optional AI UI.
3. OpenAlex.
4. Live Markdown export.
5. Fancy ranking or scoring.
6. Provider status polish.
7. Multiple query variants.

Do not cut:

- static curated packet fallback
- static Gate 4 demo generation
- provider failure handling
- clinical/trial context-only labeling
- safety guardrails
- tests for timeout/failure behavior
- no-key AI disabled state if AI UI is visible

## Tests And Acceptance Criteria

The branch is acceptable only if:

- `npm run lint`, `npm test`, `npm run build`, and `npm run demo` pass.
- Existing curated CLDN18.2 demo artifacts remain reproducible.
- `git diff -- demo` is clean after `npm run demo`, unless the implementation
  deliberately updates static artifacts and explains why.
- The current default UI still works without network access.
- The current default UI does not call live providers on initial load.
- Live beta requires an explicit click.
- Live beta shows source records from mocked providers in tests.
- API failure cannot break the curated packet.
- ClinicalTrials.gov records are never used as proof of safety, efficacy, bench
  methods, or patient guidance.
- Unsupported targets can show live context but must not claim a validated
  target packet.
- Optional AI never runs in the browser with a bundled key.
- Optional AI output must cite retrieved `LIVE-*` IDs or be rejected/caveated.
- If AI is cut, the deterministic live scaffold still demonstrates the live
  source organization workflow.

## Demo Script

1. Start with the curated CLDN18.2 packet.
   - Say: "This is the reliable curated snapshot. It works offline and is the
     judgeable artifact."
2. Switch to `Live draft beta`.
   - Enter a target hypothesis such as `B7-H3` / `glioblastoma` / `CAR-T`.
3. Click `Fetch live context`.
   - Show provider statuses and retrieved source cards.
4. Open evidence clusters.
   - Show how raw records become rationale, safety, assay/model, clinical
     context, and gap buckets.
5. Show draft scaffold or AI draft if available.
   - Say: "This is draft context grounded in retrieved records, not a validated
     packet."
6. Trigger or explain failure fallback.
   - Say: "If public APIs fail, the live beta shows that clearly and the curated
     packet still works."
7. Return to the curated packet/export.
   - Show that the product still exports a useful, stable packet.

## Safety Boundaries

Live mode must refuse, omit, or caveat:

- patient-specific treatment advice
- exact wet-lab parameters
- executable protocol steps
- clinical efficacy or safety proof claims
- regulatory filing/readiness advice
- biosafety or containment clearance
- expert-replacement claims
- claims that a live search is complete
- claims that an AI draft is validated science

Preferred user-facing safety copy:

> Live Draft Mode is for source organization and planning context. It does not
> generate protocols, clinical advice, regulatory guidance, or validation
> decisions.

## Branch Recommendation

Recommended implementation branch:

`feature/live-draft-mode-beta`

Do not resurrect the old `live-draft-mode-plan-20260528` branch unless it is
needed for historical comparison. The plan should be kept as a committed Markdown
artifact so the implementation branch can reference it directly.

## Open Questions

- Should AI be included in the first live demo, or should the branch ship public
  source retrieval plus deterministic draft scaffolding only?
- Which two or three targets should be rehearsed for judging?
- Should live beta export be UI-only for the first branch, or should Markdown
  export include a separate live-context appendix?
- Should OpenAlex be included, or should the branch stay Europe PMC plus
  ClinicalTrials.gov to reduce failure risk?
- What local command should start the optional AI server if it is added?
