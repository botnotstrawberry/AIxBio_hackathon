import { describe, expect, it } from "vitest";
import {
  DEFAULT_INPUT,
  GATE4_SECTION_TITLES,
  evaluateGate4,
  exportPacketAsMarkdown,
  generateTargetBenchPacket,
  runNegativePromptChecks
} from "../src/targetbench-core.mjs";

describe("TargetBench Gate 4 fixture", () => {
  it("generates every required TECH-001 section for CLDN18.2 gastric/GEJ", () => {
    const packet = generateTargetBenchPacket(DEFAULT_INPUT);
    expect(packet.kind).toBe("validation_packet");
    const sectionTitles = packet.sections.map((section) => section.title);
    for (const title of GATE4_SECTION_TITLES) {
      expect(sectionTitles).toContain(title);
    }
  });

  it("exports Markdown with section labels and visible provenance", () => {
    const packet = generateTargetBenchPacket(DEFAULT_INPUT);
    const markdown = exportPacketAsMarkdown(packet);
    for (const title of GATE4_SECTION_TITLES) {
      expect(markdown).toContain(`## ${title}`);
    }
    expect(markdown).toContain("SRC-004");
    expect(markdown).toContain("GAP-SAFETY-TRANSLATION");
    expect(markdown).toContain("Clinical/trial context only");
  });

  it("exports the product workflow, evidence clusters, validation matrix, and top risks", () => {
    const packet = generateTargetBenchPacket(DEFAULT_INPUT);
    const markdown = exportPacketAsMarkdown(packet);
    expect(packet.workflowSteps.length).toBeGreaterThanOrEqual(6);
    expect(packet.evidenceClusters.length).toBeGreaterThanOrEqual(5);
    expect(packet.validationLogicMatrix.length).toBeGreaterThanOrEqual(5);
    expect(packet.topRisks.length).toBeGreaterThanOrEqual(4);
    expect(markdown).toContain("## Workflow summary");
    expect(markdown).toContain("## Evidence clusters");
    expect(markdown).toContain("## Validation logic matrix");
    expect(markdown).toContain("## Top risks and gaps");
  });

  it("keeps exported packet copy free of internal demo/evaluator phrases", () => {
    const packet = generateTargetBenchPacket(DEFAULT_INPUT);
    const markdown = exportPacketAsMarkdown(packet);
    const bannedPatterns = [
      /\bfixture\b/i,
      /\bdemo\b/i,
      /\bhackathon\b/i,
      /\bMVP\b/,
      /\bGate 4\b/i,
      /\bjudgeable\b/i,
      /\bdemo cache\b/i,
      /\bcurated fixture\b/i,
      /\blive retrieval disabled\b/i,
      /\bRender every recommendation\b/i,
      /\balternate\/future\b/i
    ];
    for (const pattern of bannedPatterns) {
      expect(markdown).not.toMatch(pattern);
    }
  });

  it("returns a useful unsupported-target packet instead of pretending to generate", () => {
    const packet = generateTargetBenchPacket({
      target: "B7-H3",
      disease: "glioblastoma",
      modality: "CAR-T",
      prompt: ""
    });
    const markdown = exportPacketAsMarkdown(packet);
    expect(packet.kind).toBe("unsupported_fixture");
    expect(packet.title).toBe("Evidence pack not available yet");
    expect(packet.neededEvidence.length).toBeGreaterThan(0);
    expect(markdown).toContain("Evidence needed before generation");
    expect(markdown).toContain("B7-H3");
    expect(markdown).not.toMatch(/\bcurrent MVP\b/i);
  });

  it("keeps clinical and trial records context-only", () => {
    const packet = generateTargetBenchPacket(DEFAULT_INPUT);
    const evalResult = evaluateGate4(packet);
    const contextOnlyCheck = evalResult.checks.find((check) => check.id === "AUTO-001");
    expect(contextOnlyCheck?.pass).toBe(true);
  });

  it("blocks unsafe negative prompts", () => {
    const results = runNegativePromptChecks();
    expect(results.every((result) => result.pass)).toBe(true);
  });

  it("passes the local Gate 4 evaluator", () => {
    const packet = generateTargetBenchPacket(DEFAULT_INPUT);
    expect(evaluateGate4(packet).status).toBe("pass");
  });
});
