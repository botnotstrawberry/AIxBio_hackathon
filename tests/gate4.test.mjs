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
