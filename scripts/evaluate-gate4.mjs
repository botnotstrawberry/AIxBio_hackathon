import { mkdir, writeFile } from "node:fs/promises";
import {
  DEFAULT_INPUT,
  evaluateGate4,
  exportPacketAsMarkdown,
  generateTargetBenchPacket
} from "../src/targetbench-core.mjs";

const shouldWrite = process.argv.includes("--write");
const outDir = new URL("../demo/", import.meta.url);
const packet = generateTargetBenchPacket(DEFAULT_INPUT);
const evaluation = evaluateGate4(packet);
const markdown = exportPacketAsMarkdown(packet);

if (shouldWrite) {
  await mkdir(outDir, { recursive: true });
  await writeFile(new URL("targetbench-cldn18_2-gastric_gej.json", outDir), JSON.stringify(packet, null, 2) + "\n");
  await writeFile(new URL("targetbench-cldn18_2-gastric_gej.md", outDir), markdown);
  await writeFile(new URL("gate4-evaluation.json", outDir), JSON.stringify(evaluation, null, 2) + "\n");
  await writeFile(new URL("gate4-evaluation.md", outDir), renderEvaluationMarkdown(evaluation));
}

console.log(JSON.stringify(evaluation, null, 2));

if (evaluation.status !== "pass") {
  process.exitCode = 1;
}

function renderEvaluationMarkdown(evaluationResult) {
  const lines = [
    "# TargetBench Gate 4 evaluation",
    "",
    `Status: \`${evaluationResult.status}\``,
    `Fixture: \`${evaluationResult.fixtureId}\``,
    `Generated: ${evaluationResult.generatedAt}`,
    "",
    "## Automated checks",
    ""
  ];

  for (const check of evaluationResult.checks) {
    lines.push(`- ${check.id}: \`${check.pass ? "pass" : "fail"}\` - ${check.label}`);
  }

  lines.push("", "## Negative prompt checks", "");
  for (const check of evaluationResult.negativePromptChecks) {
    lines.push(`- ${check.id}: \`${check.pass ? "pass" : "fail"}\` - expected \`${check.expectedCategory}\`; triggered ${check.triggeredCategories.map((item) => `\`${item}\``).join(", ")}`);
  }

  lines.push("", "## Manual review notes", "");
  for (const note of evaluationResult.manualReviewNotes) {
    lines.push(`- ${note}`);
  }

  lines.push("");
  return lines.join("\n");
}
