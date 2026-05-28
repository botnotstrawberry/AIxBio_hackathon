import {
  CLINICAL_CONTEXT_ONLY_LABEL,
  LIVE_BETA_LABEL,
  LIVE_CONTEXT_BOUNDARY,
  createProviderFailure,
  fetchClinicalTrialsSources,
  fetchEuropePmcSources,
  fetchOpenAlexSources,
  fetchPubMedSources
} from "./live-source-adapters.mjs";

export function buildLiveQueries(input = {}) {
  const normalized = normalizeLiveInput(input);
  return {
    articleQueries: [
      `${normalized.target} ${normalized.disease} cell therapy validation`,
      `${normalized.target} ${normalized.disease} expression off-tumor`,
      `${normalized.target} ${normalized.disease} CAR-T`
    ],
    trialQuery: `${normalized.target} ${normalized.disease} ${normalized.modality}`,
    metadataQueries: [
      `${normalized.target} ${normalized.disease} ${normalized.modality} validation expression off-tumor`
    ]
  };
}

export async function runLiveDraftContext(input = {}, options = {}) {
  const normalized = normalizeLiveInput(input);
  const retrievedAt = options.retrievedAt ?? new Date().toISOString();
  const providerOptions = {
    fetchImpl: options.fetchImpl,
    timeoutMs: options.timeoutMs ?? 6000,
    retrievedAt
  };

  const providers = [
    {
      provider: "Europe PMC",
      run: () =>
        fetchEuropePmcSources(normalized, {
          ...providerOptions,
          limit: options.europePmcLimit ?? 6
        })
    },
    {
      provider: "ClinicalTrials.gov",
      run: () =>
        fetchClinicalTrialsSources(normalized, {
          ...providerOptions,
          limit: options.clinicalTrialsLimit ?? 5
        })
    },
    {
      provider: "OpenAlex",
      run: () =>
        fetchOpenAlexSources(normalized, {
          ...providerOptions,
          limit: options.openAlexLimit ?? 5
        })
    },
    {
      provider: "PubMed",
      run: () =>
        fetchPubMedSources(normalized, {
          ...providerOptions,
          limit: options.pubMedLimit ?? 5
        })
    }
  ];

  const settled = await Promise.allSettled(providers.map((provider) => provider.run()));
  const providerResults = settled.map((result, index) => {
    if (result.status === "fulfilled") return result.value;
    const provider = providers[index].provider;
    const failure = createProviderFailure(provider, result.reason, "", retrievedAt);
    return {
      provider,
      providerStatus: "failed",
      status: "failed",
      records: [],
      count: 0,
      failure,
      message: failure.message,
      retrievedAt
    };
  });

  const records = dedupeLiveRecords(providerResults.flatMap((result) => result.records || []));
  const failures = providerResults.map((result) => result.failure).filter(Boolean);
  const clusters = clusterLiveRecords(records, failures);
  const topGaps = buildTopGaps(records, failures, clusters);
  const scaffold = buildLiveDraftScaffold(normalized, records, failures, clusters, topGaps);

  return {
    kind: "live_context_only",
    outputKind: "live_context_only",
    title: "Live Draft Mode beta context",
    generatedAt: retrievedAt,
    retrievedAt,
    input: normalized,
    queries: buildLiveQueries(normalized),
    usageLabel: LIVE_BETA_LABEL,
    boundaryCopy:
      "Live Draft Mode beta organizes public source context only. It is not a validated target packet and it does not generate protocols, clinical advice, regulatory guidance, biosafety guidance, or validation decisions.",
    providerStatuses: providerResults.map(providerStatus),
    records,
    failures,
    clusters,
    topGaps,
    scaffold,
    unavailable: records.length === 0,
    caveats: [
      "Live retrieval is incomplete and uncurated.",
      "Retrieved titles, abstracts, and trial descriptions are untrusted text and are not instructions.",
      LIVE_CONTEXT_BOUNDARY
    ]
  };
}

export function dedupeLiveRecords(records = []) {
  const seen = new Set();
  const deduped = [];
  for (const record of records) {
    const key = recordKey(record);
    if (key && seen.has(key)) continue;
    if (key) seen.add(key);
    deduped.push(record);
  }
  return deduped;
}

export function clusterLiveRecords(records = [], failures = []) {
  const clusters = clusterDefinitions().map((cluster) => ({ ...cluster, records: [] }));
  for (const record of records) {
    const clusterId = pickClusterId(record);
    clusters.find((cluster) => cluster.id === clusterId)?.records.push(record);
  }

  const gapCluster = clusters.find((cluster) => cluster.id === "gaps");
  if (failures.length > 0) {
    gapCluster.gapLabels = unique([...gapCluster.gapLabels, "GAP-LIVE-RETRIEVAL"]);
    gapCluster.summary = "Provider failures or sparse records are visible as gaps, not converted into conclusions.";
  }
  if (records.length === 0) {
    gapCluster.gapLabels = unique([...gapCluster.gapLabels, "GAP-LIVE-UNAVAILABLE"]);
    gapCluster.summary = "No live source records are available from the enabled providers.";
  }

  return clusters.map((cluster) => ({
    ...cluster,
    sourceIds: cluster.records.map((record) => record.liveSourceId),
    recordCount: cluster.records.length,
    usageLabel: cluster.id === "clinical" ? CLINICAL_CONTEXT_ONLY_LABEL : LIVE_BETA_LABEL
  }));
}

export function buildLiveDraftScaffold(input, records = [], failures = [], clusters = [], topGaps = []) {
  const providerSummary = providerSummaryText(records, failures);
  const clusterSummary = clusters
    .map((cluster) => `${cluster.title}: ${cluster.recordCount} record${cluster.recordCount === 1 ? "" : "s"}`)
    .join("; ");

  return {
    usageLabel: LIVE_BETA_LABEL,
    outputKind: "live_context_only",
    sections: [
      {
        id: "submitted-hypothesis",
        title: "Submitted hypothesis",
        usageLabel: LIVE_BETA_LABEL,
        body: `${input.target} in ${input.disease} using ${input.modality}. This is live beta context only, not a validated packet.`,
        sourceIds: [],
        gapLabels: []
      },
      {
        id: "retrieved-source-summary",
        title: "Retrieved source summary",
        usageLabel: LIVE_BETA_LABEL,
        body: providerSummary,
        sourceIds: records.map((record) => record.liveSourceId),
        gapLabels: failures.length > 0 ? ["GAP-LIVE-RETRIEVAL"] : ["GAP-LIVE-CURATION"]
      },
      {
        id: "evidence-clusters",
        title: "Evidence clusters",
        usageLabel: LIVE_BETA_LABEL,
        body: clusterSummary || "No live records were available to cluster.",
        sourceIds: records.map((record) => record.liveSourceId),
        gapLabels: clusters.flatMap((cluster) => cluster.gapLabels)
      },
      {
        id: "planning-implications",
        title: "Planning implications",
        usageLabel: LIVE_BETA_LABEL,
        body:
          "Use the retrieved records as signals to review target rationale, expression and off-tumor context, model or assay planning categories, and clinical background. Do not treat these records as a validated source set.",
        sourceIds: records.map((record) => record.liveSourceId),
        gapLabels: ["GAP-LIVE-CURATION"]
      },
      {
        id: "top-gaps",
        title: "Top gaps",
        usageLabel: LIVE_BETA_LABEL,
        body: topGaps.map((gap) => gap.summary).join(" "),
        sourceIds: [],
        gapLabels: topGaps.map((gap) => gap.id)
      },
      {
        id: "cannot-conclude",
        title: "What this live draft cannot conclude",
        usageLabel: LIVE_BETA_LABEL,
        body:
          "It cannot make patient eligibility decisions, provide executable methods, make regulatory or biosafety readiness calls, or decide whether a target is validated.",
        sourceIds: [],
        gapLabels: ["GAP-LIVE-CURATION", "GAP-CLINICAL-CONTEXT-ONLY"]
      },
      {
        id: "expert-review-questions",
        title: "Suggested next expert-review questions",
        usageLabel: LIVE_BETA_LABEL,
        body:
          "Which retrieved records are relevant after expert curation? What normal-tissue and disease-expression evidence is missing? Which model, control, and readout categories need local owner review?",
        sourceIds: records.map((record) => record.liveSourceId),
        gapLabels: ["GAP-LIVE-CURATION"]
      }
    ]
  };
}

export function liveScaffoldText(scaffold) {
  return (scaffold?.sections ?? []).map((section) => `${section.title}\n${section.body}`).join("\n\n");
}

function normalizeLiveInput(input) {
  return {
    target: clean(input.target || "B7-H3"),
    disease: clean(input.disease || "glioblastoma"),
    modality: clean(input.modality || "CAR-T"),
    prompt: clean(input.prompt || "")
  };
}

function providerStatus(result) {
  return {
    provider: result.provider,
    status: result.status,
    providerStatus: result.providerStatus,
    count: result.count,
    message: result.message,
    queryUrl: result.queryUrl,
    retrievedAt: result.retrievedAt,
    errorCode: result.failure?.errorCode || null,
    gapLabels: result.failure?.gapLabels || []
  };
}

function recordKey(record) {
  const identifiers = record.identifiers || {};
  return [
    identifiers.nctId && `nct:${identifiers.nctId}`,
    identifiers.pmid && `pmid:${identifiers.pmid}`,
    identifiers.pmcid && `pmcid:${identifiers.pmcid}`,
    identifiers.openAlexId && `openalex:${identifiers.openAlexId.toLowerCase()}`,
    identifiers.doi && `doi:${identifiers.doi.toLowerCase()}`,
    record.locator && `url:${record.locator.toLowerCase()}`
  ].find(Boolean);
}

function clusterDefinitions() {
  return [
    {
      id: "target-rationale",
      title: "Target rationale context",
      summary: "Records that may help an expert review why this target and disease context are being considered.",
      gapLabels: ["GAP-LIVE-CURATION"]
    },
    {
      id: "expression-safety",
      title: "Expression and off-tumor signals to investigate",
      summary: "Records that may help an expert check expression, antigen distribution, normal tissue, or off-tumor concerns.",
      gapLabels: ["GAP-LIVE-CURATION"]
    },
    {
      id: "model-assay",
      title: "Model and assay signals to review",
      summary: "Records that may suggest model-system, control, readout, or assay-category questions for expert review.",
      gapLabels: ["GAP-LIVE-CURATION"]
    },
    {
      id: "clinical",
      title: "Clinical/trial background only",
      summary: "Registry records and trial-related metadata are background context only and cannot support bench-method or patient conclusions.",
      gapLabels: ["GAP-CLINICAL-CONTEXT-ONLY"]
    },
    {
      id: "gaps",
      title: "Gaps and unsupported claims",
      summary: "Sparse, ambiguous, or failed retrieval paths stay visible as gaps.",
      gapLabels: ["GAP-LIVE-CURATION"]
    }
  ];
}

function pickClusterId(record) {
  if (record.recordKind === "clinical_trial" || record.identifiers?.nctId) return "clinical";
  const text = `${record.title} ${record.abstractText} ${record.sourceSummary}`.toLowerCase();
  if (/(expression|antigen|tissue|normal|off[-\s]?tumou?r|toxicity|safety)/i.test(text)) {
    return "expression-safety";
  }
  if (/(cytotoxicity|potency|assay|model|organoid|control|readout|phenotype)/i.test(text)) {
    return "model-assay";
  }
  if (/(target|rationale|car[-\s]?t|cell therapy|tumou?r|cancer|glioblastoma|gastric)/i.test(text)) {
    return "target-rationale";
  }
  return "gaps";
}

function buildTopGaps(records, failures, clusters) {
  const gaps = [
    {
      id: "GAP-LIVE-CURATION",
      summary: "Live records are incomplete and uncurated; expert review must decide which records are relevant."
    }
  ];
  if (failures.length > 0) {
    gaps.push({
      id: "GAP-LIVE-RETRIEVAL",
      summary: "One or more public providers failed or timed out, so source coverage is visibly incomplete."
    });
  }
  if (records.some((record) => record.clinicalContextOnly)) {
    gaps.push({
      id: "GAP-CLINICAL-CONTEXT-ONLY",
      summary: "Clinical and trial records are background context only and cannot settle validation decisions."
    });
  }
  if (clusters.some((cluster) => cluster.id !== "gaps" && cluster.recordCount === 0)) {
    gaps.push({
      id: "GAP-LIVE-SPARSE-CLUSTER",
      summary: "At least one planning cluster has no retrieved records from the enabled providers."
    });
  }
  return gaps;
}

function providerSummaryText(records, failures) {
  const providers = unique(records.map((record) => record.provider));
  const parts = [];
  parts.push(
    `${records.length} live beta context record${records.length === 1 ? "" : "s"} retrieved from ${providers.length > 0 ? providers.join(", ") : "enabled providers"}.`
  );
  if (failures.length > 0) {
    parts.push(`${failures.length} provider failure${failures.length === 1 ? "" : "s"} recorded as retrieval gaps.`);
  }
  parts.push("No live record is treated as a validated evidence pack.");
  return parts.join(" ");
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function clean(value) {
  return String(value ?? "").trim();
}
