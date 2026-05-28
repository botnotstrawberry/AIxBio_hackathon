# Gate 2 Agent Evidence Pack v1

This directory is the agent-readable sidecar memory for Gate 2. `MANIFEST.json` is the approval target. `records/*.jsonl` and `retrieval/*.jsonl` are authoritative evidence/retrieval memory; `exports/gate4_inputs.json` is the deterministic Gate 4 input view derived from those records. `FIRST_LOAD.md`, `LITERATURE_REVIEW.md`, README/config docs, deterministic indexes, and any `wiki/` pages provide orientation for future agents but are not sole authority.

Future-agent load order:
1. If present, read `literature-review/wiki/index.md` / targeted wiki pages for orientation/navigation only.
2. Read `literature-review/FIRST_LOAD.md` for warnings and read-next IDs.
3. Use targeted `evidence-pack dq|claim|source|gate3|gate4|blocked|conflicts|private|technical` queries.
4. For Gate 4 support, cite `literature-review/exports/gate4_inputs.json` and authoritative `records/*.jsonl` / `retrieval/*.jsonl` IDs.
5. Read `LITERATURE_REVIEW.md` narrative synthesis only for context.

Validators are structural, not truth-proving. Any listed-file change makes Gate 2 approval stale.
