import { describe, expect, it } from "vitest";
import {
  buildLiveAiMessages,
  buildOpenAiCompatibleRequest,
  extractAiDraftText,
  sanitizeAiSourceRecords,
  validateAiDraftText
} from "../src/live-ai-core.mjs";

const records = [
  {
    liveSourceId: "LIVE-EPMC-001",
    provider: "Europe PMC",
    title: "B7-H3 target context",
    year: "2026",
    usageLabel: "Live beta context only",
    locator: "https://example.test/source",
    abstractText: "Antigen expression context. ".repeat(80),
    sourceSummary: "Journal | author",
    caveats: ["Live retrieval is incomplete and uncurated."],
    gapLabels: ["GAP-LIVE-CURATION"]
  }
];

describe("live AI core", () => {
  it("sanitizes live source records before prompt assembly", () => {
    const sanitized = sanitizeAiSourceRecords(records, { maxTextLength: 80 });

    expect(sanitized).toHaveLength(1);
    expect(sanitized[0].id).toBe("LIVE-EPMC-001");
    expect(sanitized[0].abstractText.length).toBeLessThanOrEqual(80);
    expect(sanitized[0].gapLabels).toContain("GAP-LIVE-CURATION");
  });

  it("builds OpenAI-compatible messages from live context", () => {
    const messages = buildLiveAiMessages({
      input: { target: "B7-H3", disease: "glioblastoma", modality: "CAR-T" },
      records,
      clusters: [{ id: "target-rationale", title: "Target rationale", sourceIds: ["LIVE-EPMC-001"], recordCount: 1 }],
      topGaps: [{ id: "GAP-LIVE-CURATION", summary: "Needs expert curation." }]
    });
    const request = buildOpenAiCompatibleRequest({
      model: "deepseek-ai/DeepSeek-V4-Pro",
      messages,
      maxTokens: 700
    });

    expect(request.model).toBe("deepseek-ai/DeepSeek-V4-Pro");
    expect(request.messages[0].role).toBe("system");
    expect(JSON.stringify(request.messages)).toContain("LIVE-EPMC-001");
    expect(JSON.stringify(request.messages)).toContain("do not write protocols");
    expect(request.max_tokens).toBe(700);
  });

  it("extracts assistant text from an OpenAI-compatible response", () => {
    const text = extractAiDraftText({
      choices: [{ message: { content: "Draft text [LIVE-EPMC-001]" } }]
    });

    expect(text).toBe("Draft text [LIVE-EPMC-001]");
  });

  it("accepts source-cited safe draft text", () => {
    const verdict = validateAiDraftText(
      "The source suggests target context to review [LIVE-EPMC-001]. It remains unvalidated.",
      records
    );

    expect(verdict.ok).toBe(true);
  });

  it("rejects uncited or unsafe AI draft text", () => {
    const uncited = validateAiDraftText("The source suggests target context.", records);
    const unsafe = validateAiDraftText(
      "This is safe and effective and ready for patients [LIVE-EPMC-001].",
      records
    );

    expect(uncited.ok).toBe(false);
    expect(uncited.errors.join(" ")).toMatch(/LIVE-\*/);
    expect(unsafe.ok).toBe(false);
    expect(unsafe.errors.join(" ")).toMatch(/safe and effective/i);
  });
});
