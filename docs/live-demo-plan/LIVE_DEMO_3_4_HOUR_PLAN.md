# TargetBench Live Demo 3-4 Hour Plan

Status: branch implementation plan
Date: 2026-05-28
Baseline: current static MVP on `main` at `5060bc9`
Current app: curated CLDN18.2 gastric/GEJ packet remains the judgeable path

Scope amendment, 2026-05-28: the user approved adding OpenAlex and PubMed to
this same live-demo branch. PubMed must be low-volume, no-key, and
failure-tolerant: throttling, HTTP 429s, timeouts, malformed responses, or empty
responses must surface as provider failure/gap cards and must not break the
curated packet or other live providers. AI remains out of scope.

## Branch And Merge Lock

This live-demo work is branch-isolated.

- All live-demo planning and implementation work must happen only on
  `plan/live-demo-3-4-hour` unless the user explicitly names a replacement
  live-demo branch.
- This branch may never be merged into `main`, `master`, a default branch, or
  any release branch without the user's specific approval for that merge.
- A pushed branch, open PR, or passing local validation is not merge approval.
- Existing Gate 5 automation and MVP approval do not authorize landing this
  live-demo branch.
- If future work needs a different live-demo branch, stop and ask first rather
  than creating or switching branches by implementation judgment.

## Executive Summary

The current TargetBench MVP is now a good static demo: it turns the CLDN18.2
gastric/GEJ planning case into a readable validation packet with evidence
clusters, validation logic, risks, decision gates, guardrails, and exports.
It is intentionally curated and deterministic.

The next 3-4 hour branch should not replace that work. It should add a
separate `Live Draft Mode (beta)` that can fetch public biomedical context for
a few target hypotheses, organize the retrieved records, and produce a
source-referenced, unvalidated draft context panel. The live mode should prove
product direction, not scientific authority.

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
6. Deterministic scaffold summarizes the live context with visible gaps.
7. Curated CLDN18.2 packet remains available and unchanged if anything fails.

This is a demo of retrieval-assisted planning, not a general biomedical
validator.

## Recommended Scope

Build `Live Draft Mode (beta)` as a sidecar surface, not a replacement
generator.

In scope:

- Mode control: `Curated packet` default, `Live draft beta` optional.
- Public-source adapters for Europe PMC, ClinicalTrials.gov, OpenAlex, and
  PubMed.
- Query builder from target, disease, and modality.
- Hard timeouts and partial-failure handling.
- Normalized live source records.
- Evidence clusters and gap labels generated from retrieved metadata.
- Template-based draft scaffold.
- Mocked tests for success, timeout, partial failure, unsupported target, and
  static fallback preservation.

Out of scope:

- Arbitrary final packet generation for any target.
- Full RAG, vector DB, PDF/full-text ingestion, or citation graph traversal.
- New curated target fixtures.
- Production search ranking or systematic review.
- Public deployment.
- Paid sources, private datasets, PHI, private lab records, or secrets.
- Patient advice, exact wet-lab protocol parameters, regulatory advice,
  biosafety clearance, or claims of clinical/scientific validation.
- AI integration in the 3-4 hour branch. Treat AI as a later branch after the
  no-key live source path is working and tested.

## Public Source Plan

Use no-key public APIs first.

Enabled providers:

- Europe PMC REST search for article metadata and abstracts where available.
  Official docs: <https://europepmc.org/RestfulWebService>
- ClinicalTrials.gov API v2 for trial-status context only.
  Official docs: <https://clinicaltrials.gov/data-api/about-api>
- OpenAlex Works API for no-key scholarly metadata.
  Official docs: <https://docs.openalex.org/api-entities/works>
- PubMed / NCBI E-utilities for no-key PMID metadata. Keep result limits small
  and treat throttling, HTTP 429s, timeouts, malformed responses, and empty
  results as live retrieval gaps, not application failures.
  Official docs: <https://www.ncbi.nlm.nih.gov/books/NBK25501/>

Explicitly cut from the 3-4 hour branch:

- AI drafting.

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
- `src/main.tsx`
  - mode control
  - live-search form state
  - `Fetch live context` button
  - provider status row
  - live source cards
  - failure states
  - deterministic scaffold panel
- `src/styles.css`
  - beta-mode layout, source cards, provider status, and failure state
- `tests/live-draft-core.test.mjs`
  - mocked fetch and no-network test coverage
- `tests/gate4.test.mjs`
  - add invariants proving the default curated packet does not call live fetch
    and still exports the same static demo surface
- `README.md`
  - add a clearly separated future/live-beta section after implementation

Vite/frontend constraint:

- Do not add a local AI server in this 3-4 hour branch.
- Do not add a `VITE_*` LLM key. Vite exposes `VITE_*` values to the browser
  bundle.
- If a later branch adds a local server, it must include explicit start scripts,
  localhost-only binding, CORS/proxy handling, and no-key disabled tests.
- Live modules must accept injectable `fetch` functions and have no network side
  effects on import so `npm test`, `npm run build`, and `npm run demo` remain
  network-free.

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
  usageLabel: "Live beta context only",
  doNotCiteFor: "Do not cite as validation proof or protocol evidence.",
  caveats: ["Live retrieval is incomplete and uncurated."],
  gapLabels: ["GAP-LIVE-CURATION"]
}
```

Every live record needs a visible provenance label, but raw IDs should not
dominate the first-read UI. Show title, provider, date/status, and use label
first; put raw identifiers in expandable details.

Every live source card, cluster, scaffold panel, and optional live export must
carry a live-beta/context-only label. ClinicalTrials.gov cards must also show
status as of retrieval time because registry records are time-sensitive.

## Query Strategy

Start with simple encoded queries:

- Article query: `<target> <disease> cell therapy validation`
- Article query: `<target> <disease> expression off-tumor`
- Article query: `<target> <disease> CAR-T`
- Trial query: `<target> <disease> CAR-T`

Small limits:

- Europe PMC: 5-8 records per query, deduped.
- ClinicalTrials.gov: 5 records.
- OpenAlex: 5 works.
- PubMed: 5 PMIDs via ESearch plus ESummary metadata only.

Timeouts:

- Per provider: 4-6 seconds.
- Overall live fetch: 8-10 seconds.

Failure behavior:

- One provider fails: show partial results plus provider failure card.
- All providers fail: show `Live context unavailable` and keep curated packet
  usable.
- PubMed throttles or returns HTTP 429: show `GAP-LIVE-RETRIEVAL`; do not retry
  aggressively, block the UI, or fail the live draft.
- Unsupported target: show live context only as draft context; do not claim a
  validated packet exists. Use a distinct output state such as
  `live_context_only`, not `validation_packet`.

## Evidence Organization

Live mode should organize records into first-read clusters:

- Target rationale context
- Expression and off-tumor signals to investigate
- Model and assay signals to review
- Clinical/trial background only
- Gaps and unsupported claims

Cluster assignment can be deterministic keyword logic for the 3-4 hour branch.
Examples:

- `expression`, `CLDN`, `antigen`, `tissue`, `off-tumor` -> expression/safety
- `cytotoxicity`, `potency`, `assay`, `model`, `organoid` -> model/assay
- `trial`, `phase`, `recruiting`, `NCT` -> clinical context only
- sparse or ambiguous records -> gaps/needs review

The point is to show the transformation from target input to organized
planning context, even when the retrieval is incomplete. Cluster labels should
be framed as signals to review, not recommendations.

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
It must not emit exact protocol steps, exact wet-lab parameters, patient advice,
regulatory or biosafety guidance, safety proof, or efficacy proof.

## AI Is A Later Branch

AI is out of scope for the 3-4 hour branch. The no-key public-source path and
deterministic scaffold must work first.

A later AI branch may add a local-only draft endpoint if it also adds:

- `scripts/live-ai-server.mjs`
- local endpoint: `POST /api/live-draft`
- bound to `127.0.0.1`
- reads `OPENAI_API_KEY` from server process env
- browser calls local endpoint only
- UI disables AI controls when the local endpoint or key is unavailable
- explicit package scripts or run instructions
- CORS/proxy handling
- no-key disabled tests

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

Hard reject or deterministically rewrite AI output if it includes:

- claims without `LIVE-*` citations
- claims beyond retrieved fields
- exact wet-lab parameters
- step-by-step protocol language
- patient treatment advice
- claims that trial status proves safety or efficacy
- claims that the system replaces expert review
- prompt-injection text copied from retrieved titles, abstracts, or trial
  descriptions

AI citation to a `LIVE-*` ID proves only that a record was retrieved, not that
the model's claim is true. The validator must block claims beyond retrieved
fields.

No-key state for a later branch:

> AI draft unavailable locally. Public-source context and deterministic scaffold
> remain available.

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
- OpenAlex
- PubMed

Acceptance:

- mocked Europe PMC success normalizes to `LIVE-EPMC-*`
- mocked ClinicalTrials.gov success normalizes to `LIVE-CTG-*`
- mocked OpenAlex success normalizes to `LIVE-OA-*`
- mocked PubMed success normalizes to `LIVE-PUBMED-*`
- timeout returns a provider failure object, not an exception that breaks the UI
- PubMed throttling or HTTP 429 returns a provider failure object and
  `GAP-LIVE-RETRIEVAL`

### 1:15-1:55 - Live Draft Core

Implement:

- `src/live-draft-core.mjs`
- query builder
- provider orchestration with `Promise.allSettled`
- dedupe by PMID, DOI, NCT ID, or URL
- deterministic cluster assignment
- deterministic no-key draft scaffold

Acceptance:

- one provider failure still returns partial context
- all provider failures return a transparent unavailable state
- clinical records are always context-only
- unsupported targets do not produce a validated packet claim
- live modules use injectable `fetch` and perform no network work on import

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
- every live source card and scaffold section says live beta/context only

### 2:45-3:25 - Safety And Unsupported-Target Hardening

Use this time for safety and fallback hardening, not AI.

Implement:

- `live_context_only` output state for unsupported targets
- trial status shown as of retrieval time
- public-source incompleteness gap label
- deterministic scaffold forbidden-language checks
- prompt-injection guard comments/tests for retrieved titles/abstracts/trial
  descriptions as untrusted text

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
- trial phase/status/outcome language cannot become efficacy/safety/readiness
  claims
- unsupported target with live context but no validated packet
- live scaffold cannot emit protocol steps, exact parameters, patient advice,
  regulatory/biosafety guidance, safety proof, or efficacy proof
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
- explicit note that AI/live export were cut from the 3-4 hour branch
- exact demo commands

## Cut Line

Cut in this order:

1. AI endpoint and AI UI. These are already out of scope for this branch.
2. Live Markdown export.
3. Fancy ranking or scoring.
4. Provider status polish.
5. Multiple query variants.
6. Extra UI polish.

Do not cut:

- static curated packet fallback
- static Gate 4 demo generation
- provider failure handling
- clinical/trial context-only labeling
- safety guardrails
- tests for timeout/failure behavior
- live scaffold forbidden-language tests

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
- Live context for unsupported targets uses a distinct `live_context_only` state.
- Every live source card, cluster, and scaffold/export section is labeled as
  live beta/context only.
- Trial records show status as of retrieval time and cannot support phase,
  outcome, efficacy, safety, or readiness claims.
- Deterministic live scaffold cannot emit protocol steps, exact parameters,
  patient advice, regulatory/biosafety guidance, safety proof, or efficacy proof.
- PubMed throttling, HTTP 429s, timeouts, malformed responses, and empty results
  are represented as provider failures or zero-record results rather than thrown
  UI failures.
- No AI code, local AI server, live export, or bundled key is required for the
  3-4 hour implementation.
- The deterministic live scaffold demonstrates the live source organization
  workflow without AI.

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
5. Show the deterministic draft scaffold.
   - Say: "This is source-referenced, unvalidated draft context from retrieved
     records, not a validated packet."
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
- claims that a draft is validated science
- prompt-injection instructions or claims from retrieved titles, abstracts, or
  trial descriptions

Preferred user-facing safety copy:

> Live Draft Mode is for source organization and planning context. It does not
> generate protocols, clinical advice, regulatory guidance, or validation
> decisions.

## Branch Recommendation

Authorized live-demo branch:

`plan/live-demo-3-4-hour`

Do not resurrect the old `live-draft-mode-plan-20260528` branch unless it is
needed for historical comparison. Do not create a separate implementation branch
unless the user explicitly approves that branch name first. This branch remains
non-mergeable until the user gives specific merge approval.

## Open Questions

- Which two or three targets should be rehearsed for judging?
- Should live beta export be UI-only for the first branch, or should Markdown
  export be revisited in a later branch?
- After the no-key live beta works, should the next branch prioritize AI draft
  support, live export support, or another provider family?
