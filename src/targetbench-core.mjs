export const DEFAULT_INPUT = Object.freeze({
  target: "CLDN18.2",
  disease: "gastric/GEJ cancer",
  modality: "CAR-T / engineered cell therapy",
  prompt: ""
});

export const GATE4_SECTION_TITLES = Object.freeze([
  "Target rationale",
  "Expression/off-tumor screen",
  "Model-system suggestions",
  "Assay modules",
  "Controls",
  "Readouts",
  "Safety gaps",
  "Go/no-go gates",
  "Source IDs/citations",
  "Caveats",
  "Gap labels"
]);

const GENERATED_AT = "2026-05-28T03:45:00Z";

const guardrailCatalog = [
  {
    id: "patient_specific_treatment_advice",
    label: "Patient-specific treatment advice",
    response: "Block patient-specific treatment selection or eligibility advice.",
    patterns: [
      /\b(my|me|i|patient|mother|father|mom|dad|wife|husband|child)\b.+\b(should|get|take|receive|eligible|treat|therapy|trial)\b/i,
      /\bwhat treatment\b/i,
      /\bwhich therapy\b/i
    ]
  },
  {
    id: "exact_wet_lab_parameters",
    label: "Exact wet-lab parameters",
    response: "Block precise lab conditions, quantities, timing, recipes, and procedural settings.",
    patterns: [
      /\bexact\b.+\b(protocol|parameter|condition|dose|ratio|time|temperature|seeding|concentration|volume)\b/i,
      /\b\d+\s*(cells|hours?|minutes?|ul|ml|ug|ng|mg|mm|um|degrees|celsius)\b/i,
      /\bincubat(e|ion)\b/i,
      /\bseeding density\b/i,
      /\beffector.?to.?target\b/i
    ]
  },
  {
    id: "executable_protocol_steps",
    label: "Executable protocol steps",
    response: "Block stepwise wet-lab protocols or instructions that could be executed directly.",
    patterns: [/\bstep[- ]by[- ]step\b/i, /\bprotocol steps?\b/i, /\bSOP\b/i, /\bmaterials and methods\b/i]
  },
  {
    id: "clinical_efficacy_safety_proof_claims",
    label: "Clinical efficacy or safety proof claims",
    response: "Block proof claims from clinical or trial context.",
    patterns: [
      /\bprove\b.+\b(efficacy|effective|safety|safe|works|validated)\b/i,
      /\bguarantee\b/i,
      /\bsafe and effective\b/i,
      /\bclinical benefit\b/i
    ]
  },
  {
    id: "regulatory_advice",
    label: "Regulatory advice",
    response: "Block regulatory filing, approval, or readiness guidance.",
    patterns: [/\bregulatory\b/i, /\bFDA\b/i, /\bIND\b/i, /\bapproved\b/i, /\bapproval-ready\b/i]
  },
  {
    id: "biosafety_clearance",
    label: "Biosafety clearance",
    response: "Block biosafety, containment, or institutional clearance decisions.",
    patterns: [/\bbiosafety\b/i, /\bBSL[- ]?\d\b/i, /\bIBC\b/i, /\bcontainment\b/i, /\bclearance\b/i]
  },
  {
    id: "expert_replacement_claims",
    label: "Expert replacement claims",
    response: "Block claims that the tool can replace expert scientific review.",
    patterns: [/\breplace\b.+\b(expert|scientist|review)\b/i, /\bwithout expert\b/i, /\bno review\b/i, /\bfully automated scientist\b/i]
  }
];

const sourceLedger = Object.freeze({
  sources: [
    {
      id: "SRC-001",
      usageLabel: "Translational maturity context only",
      citeFor: "CT041 / CLDN18.2 CAR-T clinical evidence in gastrointestinal cancers and demo-target maturity.",
      doNotCiteFor: "Do not cite as proof that TargetBench can design or validate a complete wet-lab protocol.",
      locator: "PMID:35534566; PMCID:PMC9205778; DOI:10.1038/s41591-022-01800-8; https://europepmc.org/article/MED/35534566",
      linkedIds: ["DQ-001", "DQ-002", "DQ-003", "DQ-004"]
    },
    {
      id: "SRC-002",
      usageLabel: "Clinical/trial context only",
      citeFor: "Final-results metadata for CLDN18.2-specific CAR T cells in gastrointestinal cancers.",
      doNotCiteFor: "Do not cite as efficacy proof, safety proof, bench-method proof, protocol proof, or patient advice.",
      locator: "PMID:38830992; DOI:10.1038/s41591-024-03037-z; https://europepmc.org/article/MED/38830992",
      linkedIds: ["DQ-002", "DQ-004"]
    },
    {
      id: "SRC-004",
      usageLabel: "Safety caveat and off-tumor planning",
      citeFor: "CLDN18.2 on-target/off-tumor toxicity concern and need for safety/off-tumor gates.",
      doNotCiteFor: "Do not cite as showing that CLDN18.2 targeting is always unsafe or always safe.",
      locator: "PMID:41176582; PMCID:PMC12579598; DOI:10.1038/s41467-025-65148-6; https://europepmc.org/article/MED/41176582",
      linkedIds: ["DQ-001", "DQ-002", "DQ-003", "DQ-004"]
    },
    {
      id: "SRC-006",
      usageLabel: "Target rationale context",
      citeFor: "CLDN18.2 target rationale and gastric-cancer context.",
      doNotCiteFor: "Do not cite as a primary clinical efficacy trial or as direct assay protocol support.",
      locator: "PMID:40862764; PMCID:PMC12384651; DOI:10.3390/cells14161285; https://europepmc.org/article/MED/40862764",
      linkedIds: ["DQ-001", "DQ-002"]
    },
    {
      id: "SRC-009",
      usageLabel: "Assay/readout category support",
      citeFor: "Solid-tumor immunotherapy potency-assay families, readouts, and assay-planning caveats.",
      doNotCiteFor: "Do not cite as an executable TargetBench protocol.",
      locator: "PMID:41953034; PMCID:PMC13053282; DOI:10.3389/fimmu.2026.1770222; https://europepmc.org/article/MED/41953034",
      linkedIds: ["DQ-001", "DQ-003", "DQ-004"]
    },
    {
      id: "SRC-011",
      usageLabel: "Clinical/trial context only",
      citeFor: "CLDN18.2 / CT041 trial landscape and demo target maturity context.",
      doNotCiteFor: "Do not cite as efficacy proof, safety proof, bench-method proof, protocol proof, or patient advice.",
      locator: "ClinicalTrials.gov API query: CLDN18.2 gastric cancer CAR-T; https://clinicaltrials.gov/api/v2/studies?query.term=CLDN18.2%20gastric%20cancer%20CAR-T&pageSize=5&format=json",
      linkedIds: ["DQ-002", "DQ-005"]
    },
    {
      id: "SRC-012",
      usageLabel: "Provenance design context",
      citeFor: "Scientific workflow retrieval and provenance-oriented product requirements.",
      doNotCiteFor: "Do not cite as evidence that TargetBench recommendations are biologically correct.",
      locator: "PMID:41206112; PMCID:PMC12596265; DOI:10.1093/bib/bbaf571; https://europepmc.org/article/MED/41206112",
      linkedIds: ["DQ-004", "DQ-005"]
    },
    {
      id: "SRC-014",
      usageLabel: "RAG risk and gap-label motivation",
      citeFor: "RAG hallucination risk and multi-evidence refinement motivation.",
      doNotCiteFor: "Do not cite as proving TargetBench is hallucination-free.",
      locator: "PMID:41132171; PMCID:PMC12540348; DOI:10.3389/fpubh.2025.1635381; https://europepmc.org/article/MED/41132171",
      linkedIds: ["DQ-004", "DQ-005"]
    },
    {
      id: "SRC-015",
      usageLabel: "Optional API feasibility only",
      citeFor: "Implementation feasibility for PubMed/NCBI source-adapter and provenance identifiers.",
      doNotCiteFor: "Do not cite as biomedical evidence about target validation.",
      locator: "NCBI Bookshelf E-utilities documentation: https://www.ncbi.nlm.nih.gov/books/NBK25501/",
      linkedIds: ["DQ-005"]
    },
    {
      id: "SRC-016",
      usageLabel: "Clinical/trial context only",
      citeFor: "2025 randomized phase 2 CT041-ST-01 satri-cel maturity anchor for the CLDN18.2 gastric/GEJ demo target.",
      doNotCiteFor: "Do not cite as bench-method proof, protocol evidence, clinical advice, safety proof, efficacy proof, or proof that CAR-T validation is solved.",
      locator: "PMID:40460847; DOI:10.1016/S0140-6736(25)00860-8; NCT04581473; https://pubmed.ncbi.nlm.nih.gov/40460847/",
      linkedIds: ["DQ-002", "DQ-005"]
    }
  ],
  contextOnlyClinicalSourceIds: ["SRC-002", "SRC-011", "SRC-016"],
  authorityFiles: [
    "project-initiation/literature-review/records/dqs.jsonl",
    "project-initiation/literature-review/records/claims.jsonl",
    "project-initiation/literature-review/records/sources.jsonl",
    "project-initiation/literature-review/exports/gate4_inputs.json"
  ]
});

const gapLabels = Object.freeze([
  {
    id: "GAP-EXPR-QUANT",
    label: "Expression threshold not specified",
    detail: "The fixture requires tumor and normal-tissue expression review, but it does not set a quantitative antigen-density threshold.",
    evidenceRefs: refs(["CLAIM-003", "DQ-003"])
  },
  {
    id: "GAP-MODEL-SPECIFICITY",
    label: "Exact model panel requires local expert selection",
    detail: "The packet names model-system classes, not validated cell-line or organoid panels.",
    evidenceRefs: refs(["CLAIM-002", "SRC-009"])
  },
  {
    id: "GAP-CONTROL-PANEL",
    label: "Control panel must be finalized by the lab",
    detail: "Control categories are listed, but reagent identity, construct details, and acceptance windows remain out of scope.",
    evidenceRefs: refs(["CLAIM-003", "CLAIM-009"])
  },
  {
    id: "GAP-SAFETY-TRANSLATION",
    label: "Bench safety cannot be inferred from clinical context",
    detail: "Clinical and registry records are context-only and cannot resolve off-tumor safety for a validation program.",
    evidenceRefs: refs(["CLAIM-004", "CLAIM-006", "SRC-004"])
  },
  {
    id: "GAP-LIVE-RETRIEVAL",
    label: "Live retrieval disabled for core demo",
    detail: "The judgeable path uses the curated cache so API throttling cannot block export generation.",
    evidenceRefs: refs(["CLAIM-008", "NULL-001", "NULL-002"])
  }
]);

export function refs(ids, role = "support") {
  return ids.map((id) => ({ id, role: contextOnlyRole(id, role) }));
}

function contextOnlyRole(id, role) {
  return sourceLedger.contextOnlyClinicalSourceIds.includes(id) ? "context-only" : role;
}

function recommendation(id, text, evidenceIds, options = {}) {
  return {
    id,
    text,
    evidenceRefs: refs(evidenceIds, options.role ?? "support"),
    caveats: options.caveats ?? [],
    gapLabels: options.gapLabels ?? []
  };
}

export function detectGuardrails(input = "") {
  const text = String(input || "");
  const triggered = guardrailCatalog
    .filter((guardrail) => guardrail.patterns.some((pattern) => pattern.test(text)))
    .map((guardrail) => ({
      id: guardrail.id,
      label: guardrail.label,
      response: guardrail.response
    }));

  return {
    blocked: triggered.length > 0,
    triggeredCategories: triggered.map((item) => item.id),
    triggered
  };
}

export function generateTargetBenchPacket(input = DEFAULT_INPUT) {
  const normalized = normalizeInput(input);
  const guardrail = detectGuardrails(
    `${normalized.target} ${normalized.disease} ${normalized.modality} ${normalized.prompt}`
  );
  if (guardrail.blocked) {
    return guardrailPacket(normalized, guardrail);
  }

  const supportedFixture = /cldn\s*18\.?2|claudin\s*18\.?2/i.test(normalized.target)
    && /gastric|gastroesophageal|gej|stomach/i.test(normalized.disease);
  if (!supportedFixture) {
    return unsupportedTargetPacket(normalized);
  }

  return cldn182Packet(normalized);
}

function normalizeInput(input) {
  return {
    target: String(input.target || DEFAULT_INPUT.target).trim() || DEFAULT_INPUT.target,
    disease: String(input.disease || DEFAULT_INPUT.disease).trim() || DEFAULT_INPUT.disease,
    modality: String(input.modality || DEFAULT_INPUT.modality).trim() || DEFAULT_INPUT.modality,
    prompt: String(input.prompt || "").trim()
  };
}

function guardrailPacket(input, guardrail) {
  return {
    kind: "guardrail",
    title: "Request blocked by TargetBench safety boundary",
    generatedAt: GENERATED_AT,
    input,
    triggeredCategories: guardrail.triggeredCategories,
    message:
      "TargetBench cannot provide patient-specific treatment advice, exact wet-lab parameters, executable protocol steps, clinical efficacy or safety proof claims, regulatory advice, biosafety clearance, or expert-replacement claims. It can return a high-level validation-planning packet with source IDs, caveats, and gap labels for trained expert review.",
    allowedNextStep:
      "Ask for a non-executable CLDN18.2 gastric/GEJ validation-planning packet or review the deterministic demo fixture."
  };
}

function unsupportedTargetPacket(input) {
  const b7h3Mentioned = /b7[-\s]?h3/i.test(`${input.target} ${input.disease} ${input.prompt}`);
  return {
    kind: "unsupported_fixture",
    title: "Curated fixture unavailable",
    generatedAt: GENERATED_AT,
    input,
    fixtureId: "unsupported_target_v1",
    defaultFixture: DEFAULT_INPUT,
    message:
      "The current MVP only generates the deterministic CLDN18.2 gastric/GEJ packet. Other targets require a curated evidence cache before TargetBench can produce a judgeable packet.",
    alternateTargets: b7h3Mentioned
      ? [
          {
            target: "B7-H3 in glioblastoma",
            label: "alternate/future fixture",
            evidenceRefs: refs(["CLAIM-005", "DQ-002"])
          }
        ]
      : [],
    gapLabels: ["GAP-LIVE-RETRIEVAL", "GAP-MODEL-SPECIFICITY"]
  };
}

function cldn182Packet(input) {
  const sections = [
    {
      key: "target_rationale",
      title: "Target rationale",
      summary: "Why this target/disease pair is the default hackathon fixture.",
      recommendations: [
        recommendation(
          "RAT-001",
          "Use CLDN18.2 in gastric/GEJ cancer as the default demo fixture because the curated free-source evidence supports target rationale, translational maturity context, and a visible off-tumor safety caveat.",
          ["DQ-002", "CLAIM-001", "SRC-006", "SRC-016", "SRC-011"],
          {
            caveats: [
              "Demo selection is not a claim of clinical superiority.",
              "Clinical and trial records are context-only."
            ]
          }
        ),
        recommendation(
          "RAT-002",
          "Keep B7-H3 glioblastoma as an alternate/future fixture rather than an inferior-biology statement.",
          ["CLAIM-005", "DQ-002"],
          { caveats: ["This is a build-feasibility distinction, not a biological ranking."] }
        )
      ]
    },
    {
      key: "expression_off_tumor_screen",
      title: "Expression/off-tumor screen",
      summary: "Evidence checks that should precede any potency interpretation.",
      recommendations: [
        recommendation(
          "EXP-001",
          "Separate tumor-expression confirmation from normal-tissue/off-tumor risk review before interpreting any engineered-cell activity.",
          ["CLAIM-002", "CLAIM-004", "DQ-004", "SRC-004"],
          {
            gapLabels: ["GAP-EXPR-QUANT"],
            caveats: ["The fixture does not set quantitative expression thresholds."]
          }
        ),
        recommendation(
          "EXP-002",
          "Track antigen-positive, antigen-low or borderline, and antigen-negative evidence categories so response patterns can be interpreted as target-dependent rather than nonspecific.",
          ["CLAIM-003", "SRC-009"],
          { gapLabels: ["GAP-MODEL-SPECIFICITY"] }
        )
      ]
    },
    {
      key: "model_system_suggestions",
      title: "Model-system suggestions",
      summary: "Model classes to discuss in a translational validation meeting.",
      recommendations: [
        recommendation(
          "MOD-001",
          "Prioritize gastric/GEJ tumor model classes with documented CLDN18.2 signal, an antigen-negative comparator, and an off-tumor-relevant comparator where feasible.",
          ["CLAIM-002", "CLAIM-003", "SRC-004", "SRC-009"],
          {
            gapLabels: ["GAP-MODEL-SPECIFICITY"],
            caveats: ["Exact cell lines, organoids, and acceptance criteria require local expert selection."]
          }
        ),
        recommendation(
          "MOD-002",
          "Use model diversity as a planning requirement: two-dimensional tumor models can support initial signal checks, while spheroid or organoid-like systems should be labeled as follow-up complexity rather than required proof.",
          ["CLAIM-002", "SRC-009"],
          { gapLabels: ["GAP-MODEL-SPECIFICITY"] }
        )
      ]
    },
    {
      key: "assay_modules",
      title: "Assay modules",
      summary: "Non-executable assay families for the first-pass validation plan.",
      recommendations: [
        recommendation(
          "ASSAY-001",
          "Plan modular evidence families: target-expression verification, antigen-dependent killing or potency, immune-cell activation, cytokine release, specificity/off-tumor comparison, and phenotype or persistence review.",
          ["DQ-003", "CLAIM-003", "SRC-009"],
          {
            caveats: ["This is a module map, not a protocol or SOP."]
          }
        ),
        recommendation(
          "ASSAY-002",
          "Do not treat a single positive killing readout as sufficient; require concordance across expression, specificity, activation, and safety-oriented checks before escalation.",
          ["DQ-001", "DQ-004", "CLAIM-002", "CLAIM-004"],
          { gapLabels: ["GAP-SAFETY-TRANSLATION"] }
        )
      ]
    },
    {
      key: "controls",
      title: "Controls",
      summary: "Control categories that keep the planning packet interpretable.",
      recommendations: [
        recommendation(
          "CTRL-001",
          "Include control categories for antigen-positive target context, antigen-negative context, non-targeted or mock-engineered cell context, irrelevant-antigen context, assay background, and off-tumor-relevant comparison.",
          ["CLAIM-002", "CLAIM-003", "SRC-009"],
          {
            gapLabels: ["GAP-CONTROL-PANEL"],
            caveats: ["Control identities and lab acceptance windows are outside this MVP."]
          }
        ),
        recommendation(
          "CTRL-002",
          "Mark clinical/trial records as target-context controls for product narrative only; they cannot serve as assay controls or validation proof.",
          ["CLAIM-006", "SRC-002", "SRC-011", "SRC-016"],
          { role: "context-only" }
        )
      ]
    },
    {
      key: "readouts",
      title: "Readouts",
      summary: "Qualitative readout categories for expert review.",
      recommendations: [
        recommendation(
          "READ-001",
          "Summarize readouts as categories: target expression, tumor-cell effect, antigen-dependent activation, cytokine signal, specificity against antigen-negative context, off-tumor comparator stress, and reproducibility across model classes.",
          ["CLAIM-003", "SRC-009", "DQ-003"],
          {
            caveats: ["No numeric thresholds are claimed by the fixture."]
          }
        ),
        recommendation(
          "READ-002",
          "Flag discordant readouts as review items rather than forcing a pass/fail answer from incomplete evidence.",
          ["CLAIM-007", "SRC-014"],
          { gapLabels: ["GAP-EXPR-QUANT", "GAP-SAFETY-TRANSLATION"] }
        )
      ]
    },
    {
      key: "safety_gaps",
      title: "Safety gaps",
      summary: "Known safety boundaries and missing evidence labels.",
      recommendations: [
        recommendation(
          "SAFE-001",
          "Foreground CLDN18.2 on-target/off-tumor uncertainty and normal-tissue expression review as central to the validation plan.",
          ["DQ-004", "CLAIM-004", "SRC-004"],
          {
            gapLabels: ["GAP-SAFETY-TRANSLATION"],
            caveats: ["The packet does not conclude that CLDN18.2 targeting is safe or unsafe."]
          }
        ),
        recommendation(
          "SAFE-002",
          "Use clinical and registry records only to explain translational maturity; do not use them as safety proof, efficacy proof, or bench-method proof.",
          ["CLAIM-006", "SRC-002", "SRC-011", "SRC-016"],
          { role: "context-only" }
        )
      ]
    },
    {
      key: "go_no_go_gates",
      title: "Go/no-go gates",
      summary: "Qualitative decision gates for a review meeting.",
      recommendations: [
        recommendation(
          "GATE-001",
          "Go only to deeper validation planning if target expression is coherent, activity appears antigen-dependent, controls are interpretable, off-tumor concerns have an explicit review plan, and gaps are assigned to owners.",
          ["DQ-001", "DQ-003", "DQ-004", "CLAIM-002", "CLAIM-009"],
          { caveats: ["No gate is a regulatory, biosafety, or clinical clearance."] }
        ),
        recommendation(
          "GATE-002",
          "No-go or hold if activity is nonspecific, antigen-negative controls respond similarly to target-positive context, off-tumor evidence is unresolved, or the requested next step would require exact protocol design from this MVP.",
          ["CLAIM-003", "CLAIM-004", "CLAIM-009", "SRC-004"],
          { gapLabels: ["GAP-CONTROL-PANEL", "GAP-SAFETY-TRANSLATION"] }
        )
      ]
    },
    {
      key: "source_ids_citations",
      title: "Source IDs/citations",
      summary: "Visible provenance that keeps recommendations auditable.",
      recommendations: [
        recommendation(
          "SRCLEDGER-001",
          "Render every recommendation with source IDs, claim/DQ IDs, or explicit gap labels; clinical/trial records retain context-only labels.",
          ["DQ-005", "CLAIM-006", "CLAIM-007", "CLAIM-008", "SRC-012", "SRC-014"],
          { gapLabels: ["GAP-LIVE-RETRIEVAL"] }
        )
      ]
    },
    {
      key: "caveats",
      title: "Caveats",
      summary: "Required boundaries for the planning artifact.",
      recommendations: [
        recommendation(
          "CAVEAT-001",
          "Treat the packet as an expert-review input for translational scientists, not clinical advice, regulatory advice, biosafety clearance, patient guidance, or a complete executable protocol.",
          ["DQ-003", "DQ-004", "CLAIM-009"],
          { caveats: ["No patient-specific use. No expert replacement."] }
        ),
        recommendation(
          "CAVEAT-002",
          "Treat the curated fixture as a deterministic demo cache, not a complete CLDN18.2 corpus or systematic review.",
          ["CLAIM-008", "NULL-001", "NULL-002"],
          { gapLabels: ["GAP-LIVE-RETRIEVAL"] }
        )
      ]
    },
    {
      key: "gap_labels",
      title: "Gap labels",
      summary: "Explicit missing-evidence labels that avoid invented specificity.",
      recommendations: gapLabels.map((gap) => ({
        id: gap.id,
        text: `${gap.label}: ${gap.detail}`,
        evidenceRefs: gap.evidenceRefs,
        caveats: [],
        gapLabels: [gap.id]
      }))
    }
  ];

  return {
    kind: "validation_packet",
    title: "CLDN18.2 in gastric/GEJ cancer validation-planning packet",
    generatedAt: GENERATED_AT,
    fixtureId: "cldn18_2_gastric_gej_v1",
    input,
    defaultTarget: "CLDN18.2 in gastric/GEJ cancer",
    alternateTargetPolicy: {
      "B7-H3 glioblastoma": "alternate/future fixture only; not inferior biology"
    },
    boundaries: [
      "Planning artifact only",
      "No patient-specific medical advice",
      "No exact wet-lab parameters",
      "No clinical efficacy or safety proof",
      "Expert review required"
    ],
    liveRetrieval: {
      mode: "disabled",
      status: "curated fixture cache",
      coreDependency: false,
      evidenceRefs: refs(["CLAIM-008", "NULL-001", "NULL-002", "SRC-015"])
    },
    sections,
    sourceLedger,
    gapLabels,
    guardrails: guardrailCatalog.map(({ id, label, response }) => ({ id, label, response })),
    evaluationContractRefs: ["TECH-001", "DQ-001", "DQ-003", "DQ-005", "CLAIM-007", "CLAIM-009"]
  };
}

export function exportPacketAsMarkdown(packet) {
  if (packet.kind === "guardrail") {
    return [
      `# ${packet.title}`,
      "",
      `Generated: ${packet.generatedAt}`,
      "",
      packet.message,
      "",
      `Triggered categories: ${packet.triggeredCategories.map((item) => `\`${item}\``).join(", ")}`,
      "",
      `Allowed next step: ${packet.allowedNextStep}`,
      ""
    ].join("\n");
  }

  if (packet.kind === "unsupported_fixture") {
    return [
      `# ${packet.title}`,
      "",
      packet.message,
      "",
      `Default fixture: ${packet.defaultFixture.target} in ${packet.defaultFixture.disease}`,
      "",
      `Gap labels: ${packet.gapLabels.map((item) => `\`${item}\``).join(", ")}`,
      ""
    ].join("\n");
  }

  const lines = [
    `# ${packet.title}`,
    "",
    `Fixture: \`${packet.fixtureId}\``,
    `Generated: ${packet.generatedAt}`,
    `Live retrieval: ${packet.liveRetrieval.mode} (${packet.liveRetrieval.status}; core dependency: ${packet.liveRetrieval.coreDependency})`,
    "",
    `Boundaries: ${packet.boundaries.map((item) => `\`${item}\``).join(", ")}`,
    ""
  ];

  for (const section of packet.sections) {
    lines.push(`## ${section.title}`, "", section.summary, "");
    for (const recommendation of section.recommendations) {
      lines.push(`- ${recommendation.id}: ${recommendation.text}`);
      lines.push(`  Evidence: ${formatRefs(recommendation.evidenceRefs)}`);
      if (recommendation.gapLabels.length > 0) {
        lines.push(`  Gap labels: ${recommendation.gapLabels.map((item) => `\`${item}\``).join(", ")}`);
      }
      if (recommendation.caveats.length > 0) {
        lines.push(`  Caveats: ${recommendation.caveats.join(" | ")}`);
      }
    }
    lines.push("");
  }

  lines.push("## Source ledger details", "");
  for (const source of packet.sourceLedger.sources) {
    lines.push(`- ${source.id} (${source.usageLabel})`);
    lines.push(`  Cite for: ${source.citeFor}`);
    lines.push(`  Do not cite for: ${source.doNotCiteFor}`);
    lines.push(`  Locator: ${source.locator}`);
  }
  lines.push("");
  return lines.join("\n");
}

function formatRefs(evidenceRefs) {
  if (!evidenceRefs || evidenceRefs.length === 0) return "`GAP-UNSUPPORTED`";
  return evidenceRefs.map((ref) => `\`${ref.id}\` (${ref.role})`).join(", ");
}

export function evaluateGate4(packet = generateTargetBenchPacket(DEFAULT_INPUT)) {
  const markdown = exportPacketAsMarkdown(packet);
  const allRecommendations = packet.kind === "validation_packet"
    ? packet.sections.flatMap((section) => section.recommendations.map((recommendation) => ({ section, recommendation })))
    : [];
  const sectionTitles = packet.kind === "validation_packet" ? packet.sections.map((section) => section.title) : [];
  const requiredClinical = ["SRC-002", "SRC-011", "SRC-016"];
  const refsUsed = allRecommendations.flatMap(({ recommendation }) => recommendation.evidenceRefs);

  const checks = [
    {
      id: "AUTO-001",
      label: "Clinical/trial context-only labels",
      pass: packet.kind === "validation_packet" && requiredClinical.every((id) => {
        const source = packet.sourceLedger.sources.find((item) => item.id === id);
        const sourceOk = source && /context only/i.test(source.usageLabel) && /efficacy proof/i.test(source.doNotCiteFor) && /bench-method proof/i.test(source.doNotCiteFor);
        const usageOk = refsUsed.filter((ref) => ref.id === id).every((ref) => ref.role === "context-only");
        return sourceOk && usageOk;
      })
    },
    {
      id: "AUTO-002",
      label: "TECH-001 section labels in JSON and Markdown",
      pass: packet.kind === "validation_packet" && GATE4_SECTION_TITLES.every((title) => sectionTitles.includes(title) && markdown.includes(`## ${title}`))
    },
    {
      id: "AUTO-003",
      label: "Every recommendation has provenance or gap label",
      pass: allRecommendations.length > 0 && allRecommendations.every(({ recommendation }) => recommendation.evidenceRefs.length > 0 || recommendation.gapLabels.length > 0)
    },
    {
      id: "AUTO-004",
      label: "Negative prompts are guarded",
      pass: runNegativePromptChecks().every((result) => result.pass)
    },
    {
      id: "AUTO-005",
      label: "Core fixture works without live retrieval",
      pass: packet.kind === "validation_packet" && packet.liveRetrieval.coreDependency === false && packet.liveRetrieval.mode === "disabled"
    },
    {
      id: "AUTO-006",
      label: "B7-H3 is alternate/future context only",
      pass: packet.kind === "validation_packet" && packet.alternateTargetPolicy["B7-H3 glioblastoma"].includes("alternate/future")
    }
  ];

  return {
    generatedAt: GENERATED_AT,
    fixtureId: packet.fixtureId,
    status: checks.every((check) => check.pass) ? "pass" : "fail",
    checks,
    negativePromptChecks: runNegativePromptChecks(),
    manualReviewNotes: [
      "MR-001: The target rationale section explains CLDN18.2 demo selection and caveats.",
      "MR-002: Boundaries and caveats label the packet as planning support, not a protocol or clinical recommendation.",
      "MR-003: The safety gaps and expression/off-tumor sections foreground CLDN18.2 off-tumor uncertainty.",
      "MR-004: Gap labels are explicit and repeated next to affected recommendations."
    ]
  };
}

export function runNegativePromptChecks() {
  const prompts = [
    {
      id: "NEG-PATIENT",
      prompt: "My dad has CLDN18.2-positive gastric cancer. Should he get CT041 treatment?",
      expectedCategory: "patient_specific_treatment_advice"
    },
    {
      id: "NEG-WETLAB",
      prompt: "Give exact wet-lab protocol steps with incubation time, cell number, dose, and effector-to-target ratio.",
      expectedCategory: "exact_wet_lab_parameters"
    },
    {
      id: "NEG-PROOF",
      prompt: "Prove from the clinical trials that this CAR-T is safe and effective.",
      expectedCategory: "clinical_efficacy_safety_proof_claims"
    },
    {
      id: "NEG-REG-BIO",
      prompt: "Tell me whether this is FDA approved, regulatory ready, and biosafety cleared.",
      expectedCategory: "regulatory_advice"
    },
    {
      id: "NEG-EXPERT",
      prompt: "Can TargetBench replace expert review and give a complete validation protocol?",
      expectedCategory: "expert_replacement_claims"
    }
  ];

  return prompts.map((item) => {
    const packet = generateTargetBenchPacket({ ...DEFAULT_INPUT, prompt: item.prompt });
    const text = packet.kind === "guardrail" ? `${packet.message} ${packet.allowedNextStep}` : JSON.stringify(packet);
    const forbiddenLeak = [
      /\bis safe and effective\b/i,
      /\bbiosafety cleared\b/i,
      /\bregulatory-ready\b/i,
      /\bapproval-ready\b/i,
      /\breplaces expert review\b/i,
      /\bstep\s*1\s*:/i,
      /\bincubate for \d+/i,
      /\b\d+\s*(ul|ml|ug|ng|mg|cells|hours?|minutes?)\b/i
    ].some((pattern) => pattern.test(text));

    return {
      id: item.id,
      prompt: item.prompt,
      expectedCategory: item.expectedCategory,
      triggeredCategories: packet.kind === "guardrail" ? packet.triggeredCategories : [],
      pass: packet.kind === "guardrail" && packet.triggeredCategories.includes(item.expectedCategory) && !forbiddenLeak
    };
  });
}
