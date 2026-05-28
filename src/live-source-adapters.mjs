export const LIVE_BETA_LABEL = "Live beta context only";
export const CLINICAL_CONTEXT_ONLY_LABEL =
  "Live beta context only - Clinical/trial context only";
export const LIVE_CONTEXT_BOUNDARY =
  "Do not cite as validation proof, safety proof, efficacy proof, patient advice, regulatory guidance, biosafety guidance, bench-method proof, or protocol evidence.";

const EUROPE_PMC_ENDPOINT =
  "https://www.ebi.ac.uk/europepmc/webservices/rest/search";
const CLINICAL_TRIALS_ENDPOINT = "https://clinicaltrials.gov/api/v2/studies";

export function buildEuropePmcUrl(input, options = {}) {
  const limit = options.limit ?? 6;
  const query = [
    quote(input.target),
    quote(input.disease),
    "(CAR-T OR \"cell therapy\" OR validation OR expression OR off-tumor)"
  ]
    .filter(Boolean)
    .join(" AND ");

  const url = new URL(EUROPE_PMC_ENDPOINT);
  url.searchParams.set("query", query);
  url.searchParams.set("format", "json");
  url.searchParams.set("pageSize", String(limit));
  return url.toString();
}

export function buildClinicalTrialsUrl(input, options = {}) {
  const limit = options.limit ?? 5;
  const url = new URL(CLINICAL_TRIALS_ENDPOINT);
  url.searchParams.set(
    "query.term",
    [input.target, input.disease, input.modality].filter(Boolean).join(" ")
  );
  url.searchParams.set("pageSize", String(limit));
  url.searchParams.set("format", "json");
  return url.toString();
}

export async function fetchEuropePmcSources(input, options = {}) {
  const provider = "Europe PMC";
  const retrievedAt = options.retrievedAt ?? new Date().toISOString();
  const url = buildEuropePmcUrl(input, options);
  try {
    const data = await fetchJsonWithTimeout(url, { ...options, provider });
    const records = normalizeEuropePmcResults(data, { retrievedAt, url });
    return providerResult(provider, records, url, retrievedAt);
  } catch (error) {
    return providerFailureResult(provider, error, url, retrievedAt);
  }
}

export async function fetchClinicalTrialsSources(input, options = {}) {
  const provider = "ClinicalTrials.gov";
  const retrievedAt = options.retrievedAt ?? new Date().toISOString();
  const url = buildClinicalTrialsUrl(input, options);
  try {
    const data = await fetchJsonWithTimeout(url, { ...options, provider });
    const records = normalizeClinicalTrialsResults(data, { retrievedAt, url });
    return providerResult(provider, records, url, retrievedAt);
  } catch (error) {
    return providerFailureResult(provider, error, url, retrievedAt);
  }
}

export async function fetchJsonWithTimeout(url, options = {}) {
  const fetchImpl = options.fetchImpl ?? globalThis.fetch;
  const timeoutMs = options.timeoutMs ?? 6000;
  const provider = options.provider ?? "Provider";
  if (typeof fetchImpl !== "function") {
    throw providerError(provider, "FETCH_UNAVAILABLE", "No fetch implementation is available.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(url, {
      headers: { accept: "application/json" },
      signal: controller.signal
    });
    if (!response?.ok) {
      throw providerError(
        provider,
        "HTTP_ERROR",
        `${provider} returned HTTP ${response?.status ?? "unknown"}.`
      );
    }
    return await response.json();
  } catch (error) {
    if (error?.name === "AbortError") {
      throw providerError(provider, "TIMEOUT", `${provider} timed out after ${timeoutMs} ms.`);
    }
    if (error?.code && error?.provider) throw error;
    throw providerError(provider, "FETCH_FAILED", error?.message || `${provider} request failed.`);
  } finally {
    clearTimeout(timeout);
  }
}

export function normalizeEuropePmcResults(data, context = {}) {
  const results = data?.resultList?.result ?? [];
  return results.map((item, index) => {
    const pmid = clean(item.pmid || (item.source === "MED" ? item.id : ""));
    const pmcid = clean(item.pmcid);
    const doi = clean(item.doi);
    const source = clean(item.source || "MED");
    const europePmcId = clean(item.id || pmid || pmcid || doi);
    const locator = pmid
      ? `https://europepmc.org/article/MED/${pmid}`
      : `https://europepmc.org/article/${source}/${encodeURIComponent(europePmcId || String(index + 1))}`;

    return {
      liveSourceId: liveId("LIVE-EPMC", index),
      provider: "Europe PMC",
      providerStatus: "ok",
      recordKind: "article",
      title: safeDisplayText(item.title, "Untitled Europe PMC record"),
      year: clean(item.pubYear || yearFromDate(item.firstPublicationDate)),
      retrievedAt: context.retrievedAt,
      providerQueryUrl: context.url,
      identifiers: {
        pmid,
        pmcid,
        doi,
        nctId: null,
        openAlexId: null
      },
      locator,
      usageLabel: LIVE_BETA_LABEL,
      doNotCiteFor: LIVE_CONTEXT_BOUNDARY,
      caveats: [
        "Live retrieval is incomplete and uncurated.",
        "Retrieved text is untrusted input and must be reviewed before use."
      ],
      gapLabels: ["GAP-LIVE-CURATION"],
      abstractText: safeDisplayText(item.abstractText, ""),
      sourceSummary: safeDisplayText(
        [item.journalTitle, item.authorString, item.pubTypeList?.pubType?.join(", ")]
          .filter(Boolean)
          .join(" | "),
        ""
      )
    };
  });
}

export function normalizeClinicalTrialsResults(data, context = {}) {
  const studies = data?.studies ?? [];
  return studies.map((study, index) => {
    const protocol = study.protocolSection ?? {};
    const idModule = protocol.identificationModule ?? {};
    const statusModule = protocol.statusModule ?? {};
    const designModule = protocol.designModule ?? {};
    const conditionsModule = protocol.conditionsModule ?? {};
    const descriptionModule = protocol.descriptionModule ?? {};
    const nctId = clean(idModule.nctId);
    const status = clean(statusModule.overallStatus || "status not reported");
    const phases = ensureArray(designModule.phases).map(clean).filter(Boolean);
    const title = safeDisplayText(
      idModule.briefTitle || idModule.officialTitle,
      nctId ? `ClinicalTrials.gov record ${nctId}` : "ClinicalTrials.gov record"
    );
    const dateForYear =
      statusModule.startDateStruct?.date ||
      statusModule.studyFirstSubmitDate ||
      statusModule.lastUpdateSubmitDate;

    return {
      liveSourceId: liveId("LIVE-CTG", index),
      provider: "ClinicalTrials.gov",
      providerStatus: "ok",
      recordKind: "clinical_trial",
      title,
      year: yearFromDate(dateForYear),
      retrievedAt: context.retrievedAt,
      providerQueryUrl: context.url,
      identifiers: {
        pmid: null,
        pmcid: null,
        doi: null,
        nctId,
        openAlexId: null
      },
      locator: nctId ? `https://clinicaltrials.gov/study/${nctId}` : context.url,
      usageLabel: CLINICAL_CONTEXT_ONLY_LABEL,
      doNotCiteFor: LIVE_CONTEXT_BOUNDARY,
      caveats: [
        "Clinical/trial context only. Do not cite as bench-method proof, safety proof, efficacy proof, patient advice, or validation evidence.",
        "Registry status is time-sensitive and shown as of retrieval time.",
        "Retrieved text is untrusted input and must be reviewed before use."
      ],
      gapLabels: ["GAP-LIVE-CURATION", "GAP-CLINICAL-CONTEXT-ONLY"],
      clinicalContextOnly: true,
      status,
      statusAsOf: context.retrievedAt,
      phase: phases.join(", ") || "phase not reported",
      conditions: ensureArray(conditionsModule.conditions).map(clean).filter(Boolean),
      abstractText: safeDisplayText(descriptionModule.briefSummary, "")
    };
  });
}

export function createProviderFailure(provider, error, queryUrl, retrievedAt) {
  return {
    provider,
    providerStatus: "failed",
    status: "failed",
    errorCode: error?.code || "PROVIDER_FAILED",
    message:
      error?.message ||
      `${provider} did not return live context. The curated packet remains available.`,
    queryUrl,
    retrievedAt,
    gapLabels: ["GAP-LIVE-RETRIEVAL"],
    usageLabel: LIVE_BETA_LABEL
  };
}

function providerResult(provider, records, queryUrl, retrievedAt) {
  return {
    provider,
    providerStatus: "ok",
    status: "ok",
    queryUrl,
    retrievedAt,
    records,
    count: records.length,
    message: `${provider} returned ${records.length} live beta context record${records.length === 1 ? "" : "s"}.`
  };
}

function providerFailureResult(provider, error, queryUrl, retrievedAt) {
  const failure = createProviderFailure(provider, error, queryUrl, retrievedAt);
  return {
    provider,
    providerStatus: "failed",
    status: "failed",
    queryUrl,
    retrievedAt,
    records: [],
    count: 0,
    failure,
    message: failure.message
  };
}

function providerError(provider, code, message) {
  const error = new Error(message);
  error.provider = provider;
  error.code = code;
  return error;
}

function liveId(prefix, index) {
  return `${prefix}-${String(index + 1).padStart(3, "0")}`;
}

function quote(value) {
  const text = clean(value);
  if (!text) return "";
  return text.includes(" ") ? `"${text}"` : text;
}

function clean(value) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function safeDisplayText(value, fallback = "") {
  return stripHtml(clean(value) || fallback).replace(/\s+/g, " ").trim();
}

function stripHtml(value) {
  return String(value).replace(/<[^>]*>/g, " ");
}

function yearFromDate(value) {
  const match = clean(value).match(/\b(19|20)\d{2}\b/);
  return match ? match[0] : "";
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}
