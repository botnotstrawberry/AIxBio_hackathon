import { describe, expect, it } from "vitest";
import {
  CLINICAL_CONTEXT_ONLY_LABEL,
  fetchClinicalTrialsSources,
  fetchEuropePmcSources,
  normalizeClinicalTrialsResults,
  normalizeEuropePmcResults
} from "../src/live-source-adapters.mjs";

describe("live source adapters", () => {
  it("normalizes Europe PMC records to LIVE-EPMC sources", () => {
    const records = normalizeEuropePmcResults(
      {
        resultList: {
          result: [
            {
              id: "12345678",
              source: "MED",
              pmid: "12345678",
              pmcid: "PMC123",
              doi: "10.1000/example",
              title: "B7-H3 CAR-T expression context",
              pubYear: "2026",
              abstractText: "Expression and off-tumor context."
            }
          ]
        }
      },
      { retrievedAt: "2026-05-28T14:00:00Z", url: "https://example.test/epmc" }
    );

    expect(records).toHaveLength(1);
    expect(records[0].liveSourceId).toBe("LIVE-EPMC-001");
    expect(records[0].provider).toBe("Europe PMC");
    expect(records[0].usageLabel).toBe("Live beta context only");
    expect(records[0].identifiers.pmid).toBe("12345678");
    expect(records[0].gapLabels).toContain("GAP-LIVE-CURATION");
  });

  it("normalizes ClinicalTrials.gov records as context-only live records", () => {
    const records = normalizeClinicalTrialsResults(
      {
        studies: [
          {
            protocolSection: {
              identificationModule: {
                nctId: "NCT00000001",
                briefTitle: "B7-H3 CAR-T in glioblastoma"
              },
              statusModule: {
                overallStatus: "RECRUITING",
                startDateStruct: { date: "2025-01" }
              },
              designModule: { phases: ["PHASE2"] },
              conditionsModule: { conditions: ["Glioblastoma"] },
              descriptionModule: { briefSummary: "Registry background." }
            }
          }
        ]
      },
      { retrievedAt: "2026-05-28T14:00:00Z", url: "https://example.test/ctg" }
    );

    expect(records).toHaveLength(1);
    expect(records[0].liveSourceId).toBe("LIVE-CTG-001");
    expect(records[0].usageLabel).toBe(CLINICAL_CONTEXT_ONLY_LABEL);
    expect(records[0].clinicalContextOnly).toBe(true);
    expect(records[0].status).toBe("RECRUITING");
    expect(records[0].statusAsOf).toBe("2026-05-28T14:00:00Z");
    expect(records[0].doNotCiteFor).toMatch(/patient advice/i);
  });

  it("returns provider failure objects on timeout", async () => {
    const fetchImpl = (_url, init) =>
      new Promise((_resolve, reject) => {
        init.signal.addEventListener("abort", () => {
          const error = new Error("aborted");
          error.name = "AbortError";
          reject(error);
        });
      });

    const result = await fetchEuropePmcSources(
      { target: "B7-H3", disease: "glioblastoma", modality: "CAR-T" },
      { fetchImpl, timeoutMs: 5, retrievedAt: "2026-05-28T14:00:00Z" }
    );

    expect(result.status).toBe("failed");
    expect(result.records).toEqual([]);
    expect(result.failure.errorCode).toBe("TIMEOUT");
    expect(result.failure.gapLabels).toContain("GAP-LIVE-RETRIEVAL");
  });

  it("fetches and normalizes provider success through injected fetch", async () => {
    const fetchImpl = async () => ({
      ok: true,
      json: async () => ({
        studies: [
          {
            protocolSection: {
              identificationModule: { nctId: "NCT00000002", briefTitle: "Target trial" },
              statusModule: { overallStatus: "ACTIVE_NOT_RECRUITING" },
              designModule: { phases: ["PHASE1"] }
            }
          }
        ]
      })
    });

    const result = await fetchClinicalTrialsSources(
      { target: "B7-H3", disease: "glioblastoma", modality: "CAR-T" },
      { fetchImpl, retrievedAt: "2026-05-28T14:00:00Z" }
    );

    expect(result.status).toBe("ok");
    expect(result.records[0].liveSourceId).toBe("LIVE-CTG-001");
    expect(result.records[0].usageLabel).toBe(CLINICAL_CONTEXT_ONLY_LABEL);
  });
});
