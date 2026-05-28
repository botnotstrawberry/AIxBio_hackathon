import React from "react";
import ReactDOM from "react-dom/client";
import {
  AlertTriangle,
  BadgeCheck,
  BookOpenCheck,
  Clipboard,
  Download,
  FileJson,
  FileText,
  FlaskConical,
  Play,
  Search,
  ShieldCheck
} from "lucide-react";
import "./styles.css";
import {
  DEFAULT_INPUT,
  GATE4_SECTION_TITLES,
  detectGuardrails,
  exportPacketAsMarkdown,
  generateTargetBenchPacket
} from "./targetbench-core.mjs";
import { runLiveDraftContext } from "./live-draft-core.mjs";

type Tab = "workflow" | "packet" | "evidence" | "exports" | "safety";
type AppMode = "curated" | "live";

type Packet = any;

const iconMap = {
  rationale: BookOpenCheck,
  safety: ShieldCheck,
  assay: FlaskConical,
  check: BadgeCheck,
  warning: AlertTriangle
};

const tabs: Array<{ id: Tab; label: string }> = [
  { id: "workflow", label: "Workflow" },
  { id: "packet", label: "Packet" },
  { id: "evidence", label: "Evidence" },
  { id: "exports", label: "Exports" },
  { id: "safety", label: "Scope" }
];

function App() {
  const [mode, setMode] = React.useState<AppMode>("curated");
  const [target, setTarget] = React.useState<string>(DEFAULT_INPUT.target);
  const [disease, setDisease] = React.useState<string>(DEFAULT_INPUT.disease);
  const [modality, setModality] = React.useState<string>(DEFAULT_INPUT.modality);
  const [prompt, setPrompt] = React.useState<string>("");
  const [packet, setPacket] = React.useState<Packet>(() =>
    generateTargetBenchPacket(DEFAULT_INPUT)
  );
  const [liveResult, setLiveResult] = React.useState<any>(null);
  const [liveLoading, setLiveLoading] = React.useState(false);
  const [liveError, setLiveError] = React.useState("");
  const [tab, setTab] = React.useState<Tab>("workflow");
  const [copyState, setCopyState] = React.useState("Copy");

  const markdown = React.useMemo(() => exportPacketAsMarkdown(packet), [packet]);
  const jsonExport = React.useMemo(() => JSON.stringify(packet, null, 2), [packet]);
  const guardrailPreview = React.useMemo(
    () => detectGuardrails(`${target} ${disease} ${modality} ${prompt}`),
    [target, disease, modality, prompt]
  );

  function runPacket() {
    const nextPacket = generateTargetBenchPacket({ target, disease, modality, prompt } as any);
    setPacket(nextPacket);
    setTab(nextPacket.kind === "guardrail" ? "safety" : "workflow");
  }

  async function fetchLiveContext() {
    if (guardrailPreview.blocked) {
      setLiveResult(null);
      setLiveError(
        "Live Draft Mode beta will not fetch context for out-of-scope requests. Remove patient, protocol, regulatory, biosafety, or expert-replacement language first."
      );
      return;
    }

    setLiveLoading(true);
    setLiveError("");
    try {
      const result = await runLiveDraftContext(
        { target, disease, modality, prompt },
        { fetchImpl: window.fetch.bind(window) }
      );
      setLiveResult(result);
    } catch (error: any) {
      setLiveResult(null);
      setLiveError(error?.message || "Live context retrieval failed. The curated packet remains available.");
    } finally {
      setLiveLoading(false);
    }
  }

  async function copyExport(kind: "json" | "markdown") {
    await navigator.clipboard.writeText(kind === "json" ? jsonExport : markdown);
    setCopyState(kind === "json" ? "JSON copied" : "Markdown copied");
    window.setTimeout(() => setCopyState("Copy"), 1400);
  }

  function downloadExport(kind: "json" | "markdown") {
    const isJson = kind === "json";
    const blob = new Blob([isJson ? jsonExport : markdown], {
      type: isJson ? "application/json" : "text/markdown"
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = isJson
      ? "targetbench-cldn18_2-gastric_gej.json"
      : "targetbench-cldn18_2-gastric_gej.md";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <div className="eyebrow">TargetBench</div>
          <h1>{mode === "live" ? "Live source context draft" : "Target validation planning packet"}</h1>
        </div>
        <div className="status-strip" aria-label="Run status">
          <span>{mode === "live" ? "Live Draft Mode beta" : "CLDN18.2 planning case"}</span>
          <span>{mode === "live" ? "Public context retrieval" : "Curated source snapshot"}</span>
          <strong>{mode === "live" ? "Context only" : packetStatusLabel(packet)}</strong>
        </div>
      </header>

      <main className="workspace-grid">
        <section className="control-panel" aria-label="Planner controls">
          <div className="mode-toggle" role="group" aria-label="TargetBench mode">
            <button
              className={mode === "curated" ? "active" : ""}
              onClick={() => setMode("curated")}
              type="button"
            >
              Curated packet
            </button>
            <button
              className={mode === "live" ? "active" : ""}
              onClick={() => setMode("live")}
              type="button"
            >
              Live draft beta
            </button>
          </div>

          <label>
            <span>Target</span>
            <input value={target} onChange={(event) => setTarget(event.target.value)} />
          </label>
          <label>
            <span>Disease context</span>
            <input value={disease} onChange={(event) => setDisease(event.target.value)} />
          </label>
          <label>
            <span>Modality</span>
            <input value={modality} onChange={(event) => setModality(event.target.value)} />
            <small>
              {mode === "live"
                ? "Used in the live query and submitted hypothesis; results remain context only."
                : "Displayed in the submitted hypothesis; the curated CLDN18.2 source set stays fixed."}
            </small>
          </label>
          <label>
            <span>Planning note</span>
            <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} />
            <small>
              {mode === "live"
                ? "Safety-scanned for scope before retrieval; it is not sent to live providers."
                : "Safety-scanned for scope. It does not re-rank or rewrite the fixed source snapshot."}
            </small>
          </label>

          <div className="guardrail-preview">
            <ShieldCheck size={18} aria-hidden="true" />
            <span>{guardrailPreview.blocked ? "Out-of-scope language detected" : "Planning scope clear"}</span>
          </div>

          <div className="button-row">
            {mode === "curated" ? (
              <>
                <button className="primary" onClick={runPacket}>
                  <Play size={18} aria-hidden="true" />
                  Generate
                </button>
                <button onClick={() => copyExport("markdown")}>
                  <Clipboard size={18} aria-hidden="true" />
                  {copyState}
                </button>
              </>
            ) : (
              <button className="primary" onClick={fetchLiveContext} disabled={liveLoading}>
                <Search size={18} aria-hidden="true" />
                {liveLoading ? "Fetching" : "Fetch live context"}
              </button>
            )}
          </div>

          {mode === "curated" && (
            <div className="tab-list" role="tablist" aria-label="Packet views">
              {tabs.map((item) => (
                <button
                  key={item.id}
                  className={tab === item.id ? "active" : ""}
                  onClick={() => setTab(item.id)}
                  role="tab"
                  aria-selected={tab === item.id}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="output-panel" aria-live="polite">
          {mode === "live" ? (
            <LiveDraftView
              result={liveResult}
              loading={liveLoading}
              error={liveError}
              onFetch={fetchLiveContext}
            />
          ) : (
            <>
              {tab === "workflow" && <WorkflowView packet={packet} />}
              {tab === "packet" && <PacketView packet={packet} />}
              {tab === "evidence" && <EvidenceView packet={packet} />}
              {tab === "exports" && (
                <ExportView
                  markdown={markdown}
                  jsonExport={jsonExport}
                  onCopy={copyExport}
                  onDownload={downloadExport}
                />
              )}
              {tab === "safety" && <GuardrailView packet={packet} preview={guardrailPreview} />}
            </>
          )}
        </section>
      </main>
    </div>
  );
}

function packetStatusLabel(packet: Packet) {
  if (packet.kind === "guardrail") return "Out of scope";
  if (packet.kind === "unsupported_fixture") return "Needs curation";
  return "Packet ready";
}

function WorkflowView({ packet }: { packet: Packet }) {
  if (packet.kind === "guardrail") {
    return <GuardrailCard packet={packet} />;
  }
  if (packet.kind === "unsupported_fixture") {
    return <UnsupportedTargetView packet={packet} />;
  }

  return (
    <div className="workflow-view">
      <div className="packet-heading">
        <div>
          <div className="eyebrow">First-read plan</div>
          <h2>Target rationale, evidence, validation logic, risks, gates, export</h2>
        </div>
        <span className="count-pill">{packet.workflowSteps.length} steps</span>
      </div>

      <div className="workflow-stepper" aria-label="Validation planning workflow">
        {packet.workflowSteps.map((step: any, index: number) => (
          <article className="workflow-step" key={step.id}>
            <span>{index + 1}</span>
            <div>
              <strong>{step.label}</strong>
              <p>{step.summary}</p>
            </div>
          </article>
        ))}
      </div>

      <EvidenceClusters packet={packet} />
      <ValidationLogicMatrix packet={packet} />
      <TopRisks packet={packet} />
      <DecisionGates packet={packet} />
      <ExportSummary />
    </div>
  );
}

function EvidenceClusters({ packet }: { packet: Packet }) {
  return (
    <section className="cluster-section" aria-label="Evidence clusters">
      <div className="section-title compact-title">
        <BookOpenCheck size={20} aria-hidden="true" />
        <div>
          <h3>Evidence organized into planning clusters</h3>
          <p>Curated sources are grouped by the question they support, with gaps shown next to the relevant cluster.</p>
        </div>
      </div>
      <div className="cluster-grid">
        {packet.evidenceClusters.map((cluster: any) => (
          <article className="cluster-card" key={cluster.id}>
            <h4>{cluster.title}</h4>
            <p>{cluster.summary}</p>
            <ProvenanceDetails
              refs={cluster.sourceIds.map((id: string) => ({ id, role: "source" }))}
              gaps={cluster.gapLabels}
            />
          </article>
        ))}
      </div>
    </section>
  );
}

function ValidationLogicMatrix({ packet }: { packet: Packet }) {
  return (
    <section className="matrix-section" aria-label="Validation logic matrix">
      <div className="section-title compact-title">
        <BadgeCheck size={20} aria-hidden="true" />
        <div>
          <h3>Validation logic matrix</h3>
          <p>Each row turns evidence into a planning decision and a hold/no-go condition.</p>
        </div>
      </div>
      <div className="validation-matrix">
        <div className="matrix-row matrix-head">
          <span>Decision</span>
          <span>Planning logic</span>
          <span>Hold signal</span>
        </div>
        {packet.validationLogicMatrix.map((row: any) => (
          <div className="matrix-row" key={row.id}>
            <div>
              <strong>{row.decisionPoint}</strong>
              <p>{row.evidenceSummary}</p>
            </div>
            <p>{row.planningLogic}</p>
            <div>
              <p>{row.gate}</p>
              <ProvenanceDetails
                refs={row.evidenceIds.map((id: string) => ({ id, role: "evidence" }))}
                gaps={row.gapLabels}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TopRisks({ packet }: { packet: Packet }) {
  return (
    <section className="risk-section" aria-label="Top risks and gaps">
      <div className="section-title compact-title">
        <AlertTriangle size={20} aria-hidden="true" />
        <div>
          <h3>Top risks and gaps</h3>
          <p>The packet keeps uncertainty in the main narrative instead of burying it in disclaimers.</p>
        </div>
      </div>
      <div className="risk-grid">
        {packet.topRisks.map((risk: any) => (
          <article className="risk-card" key={risk.id}>
            <h4>{risk.title}</h4>
            <p>{risk.whyItMatters}</p>
            <strong>Next action</strong>
            <p>{risk.nextAction}</p>
            <ProvenanceDetails refs={risk.evidenceRefs} gaps={risk.gapLabels} />
          </article>
        ))}
      </div>
    </section>
  );
}

function DecisionGates({ packet }: { packet: Packet }) {
  return (
    <section className="gate-section" aria-label="Decision gates">
      <div className="section-title compact-title">
        <ShieldCheck size={20} aria-hidden="true" />
        <div>
          <h3>Decision gates</h3>
          <p>Plain-language go, hold, and no-go outcomes for an expert review meeting.</p>
        </div>
      </div>
      <div className="gate-grid">
        {packet.decisionGates.map((gate: any) => (
          <article className="gate-card" key={gate.id}>
            <strong>{gate.label}</strong>
            <p>{gate.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ExportSummary() {
  return (
    <section className="export-summary" aria-label="Export summary">
      <FileText size={20} aria-hidden="true" />
      <div>
        <h3>Export</h3>
        <p>Markdown and JSON exports keep the readable plan first, then place source records and gap labels in an appendix.</p>
      </div>
    </section>
  );
}

function UnsupportedTargetView({ packet }: { packet: Packet }) {
  return (
    <div className="unsupported-card">
      <AlertTriangle size={28} aria-hidden="true" />
      <div>
        <div className="eyebrow">Needs curated evidence</div>
        <h2>{packet.title}</h2>
        <p>{packet.message}</p>
        <p>{packet.allowedNextStep}</p>
        <div className="needed-evidence">
          <strong>Evidence needed before generation</strong>
          <ul>
            {packet.neededEvidence.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        {packet.alternateTargets.length > 0 && (
          <div className="reference-row">
            {packet.alternateTargets.map((target: any) => (
              <span key={target.target}>{target.target}: {target.label}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function LiveDraftView({
  result,
  loading,
  error,
  onFetch
}: {
  result: any;
  loading: boolean;
  error: string;
  onFetch: () => void;
}) {
  if (loading) {
    return (
      <div className="live-view">
        <LiveIntro />
        <div className="live-status-card">
          <Search size={24} aria-hidden="true" />
          <div>
            <h2>Fetching public context</h2>
            <p>
              Europe PMC, ClinicalTrials.gov, OpenAlex, and PubMed are queried only after this
              explicit action.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="live-view">
        <LiveIntro />
        {error && (
          <div className="live-status-card warning">
            <AlertTriangle size={24} aria-hidden="true" />
            <div>
              <h2>Live context not fetched</h2>
              <p>{error}</p>
            </div>
          </div>
        )}
        <div className="live-empty">
          <Search size={28} aria-hidden="true" />
          <div>
            <h2>Fetch source context for a new hypothesis</h2>
            <p>
              Enter a target, disease, and modality, then fetch live context. This sidecar never
              creates a validated packet and never changes the curated CLDN18.2 snapshot.
            </p>
            <button className="primary" onClick={onFetch}>
              <Search size={18} aria-hidden="true" />
              Fetch live context
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="live-view">
      <LiveIntro result={result} />
      <ProviderStatusRow statuses={result.providerStatuses} />
      {result.unavailable && (
        <div className="live-status-card warning">
          <AlertTriangle size={24} aria-hidden="true" />
          <div>
            <h2>Live context unavailable</h2>
            <p>Enabled providers did not return records. The curated packet remains available offline.</p>
          </div>
        </div>
      )}
      {result.failures.length > 0 && <LiveFailureCards failures={result.failures} />}
      <LiveSourceCards records={result.records} />
      <LiveClusters clusters={result.clusters} />
      <LiveScaffold scaffold={result.scaffold} />
    </div>
  );
}

function LiveIntro({ result }: { result?: any }) {
  return (
    <div className="packet-heading">
      <div>
        <div className="eyebrow">Live Draft Mode beta</div>
        <h2>Source-referenced, unvalidated draft context</h2>
        <p className="subtle-copy">
          Live Draft Mode organizes public context only. It does not generate protocols, clinical
          advice, regulatory guidance, biosafety guidance, or validation decisions.
        </p>
      </div>
      <span className="count-pill">{result ? result.outputKind : "explicit fetch required"}</span>
    </div>
  );
}

function ProviderStatusRow({ statuses }: { statuses: any[] }) {
  return (
    <section className="provider-status-grid" aria-label="Live provider status">
      {statuses.map((status) => (
        <article className={status.status === "ok" ? "provider-status ok" : "provider-status failed"} key={status.provider}>
          <strong>{status.provider}</strong>
          <span>{status.status === "ok" ? `${status.count} records` : "retrieval gap"}</span>
          <p>{status.message}</p>
        </article>
      ))}
    </section>
  );
}

function LiveFailureCards({ failures }: { failures: any[] }) {
  return (
    <section className="live-failure-grid" aria-label="Provider failures">
      {failures.map((failure) => (
        <article className="live-failure-card" key={`${failure.provider}-${failure.errorCode}`}>
          <AlertTriangle size={20} aria-hidden="true" />
          <div>
            <strong>{failure.provider}</strong>
            <p>{failure.message}</p>
            <ProvenanceDetails refs={[]} gaps={failure.gapLabels || []} />
          </div>
        </article>
      ))}
    </section>
  );
}

function LiveSourceCards({ records }: { records: any[] }) {
  return (
    <section className="live-source-section" aria-label="Live source cards">
      <div className="section-title compact-title">
        <BookOpenCheck size={20} aria-hidden="true" />
        <div>
          <h3>Live source cards</h3>
          <p>Raw identifiers are expandable. Every record is live beta context only.</p>
        </div>
      </div>
      <div className="live-source-grid">
        {records.length === 0 ? (
          <article className="source-card">
            <strong>No live source records</strong>
            <p>Provider failure details and retrieval gaps are shown above.</p>
          </article>
        ) : (
          records.map((record) => (
            <article className="source-card live-source-card" key={record.liveSourceId}>
              <div className="source-card-head">
                <strong>{record.provider}</strong>
                <span>{record.usageLabel}</span>
              </div>
              <h4>{record.title}</h4>
              <p>
                {[record.year, record.status && `Status: ${record.status}`].filter(Boolean).join(" | ")}
              </p>
              {record.statusAsOf && <p>Status as of retrieval time: {formatDate(record.statusAsOf)}</p>}
              <details className="source-details">
                <summary>Show raw provenance</summary>
                <dl>
                  <div>
                    <dt>Live source ID</dt>
                    <dd>{record.liveSourceId}</dd>
                  </div>
                  <div>
                    <dt>Locator</dt>
                    <dd>{record.locator}</dd>
                  </div>
                  <div>
                    <dt>Identifiers</dt>
                    <dd>{identifierText(record.identifiers)}</dd>
                  </div>
                  <div>
                    <dt>Boundary</dt>
                    <dd>{record.doNotCiteFor}</dd>
                  </div>
                </dl>
              </details>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

function LiveClusters({ clusters }: { clusters: any[] }) {
  return (
    <section className="cluster-section" aria-label="Live evidence clusters">
      <div className="section-title compact-title">
        <BadgeCheck size={20} aria-hidden="true" />
        <div>
          <h3>Evidence clusters</h3>
          <p>Deterministic keyword grouping frames records as signals to review, not recommendations.</p>
        </div>
      </div>
      <div className="cluster-grid">
        {clusters.map((cluster) => (
          <article className="cluster-card" key={cluster.id}>
            <div className="source-card-head">
              <h4>{cluster.title}</h4>
              <span>{cluster.usageLabel}</span>
            </div>
            <p>{cluster.summary}</p>
            <p>{cluster.recordCount} record{cluster.recordCount === 1 ? "" : "s"}</p>
            <ProvenanceDetails
              refs={cluster.sourceIds.map((id: string) => ({ id, role: "live-context" }))}
              gaps={cluster.gapLabels}
            />
          </article>
        ))}
      </div>
    </section>
  );
}

function LiveScaffold({ scaffold }: { scaffold: any }) {
  return (
    <section className="live-scaffold" aria-label="Deterministic live draft scaffold">
      <div className="section-title compact-title">
        <FileText size={20} aria-hidden="true" />
        <div>
          <h3>Deterministic draft scaffold</h3>
          <p>Live beta context only. This is source organization, not a validated packet.</p>
        </div>
      </div>
      <div className="section-stack live-scaffold-stack">
        {scaffold.sections.map((section: any) => (
          <article className="packet-section" key={section.id}>
            <div className="section-title">
              <BookOpenCheck size={20} aria-hidden="true" />
              <div>
                <h3>{section.title}</h3>
                <p>{section.usageLabel}</p>
              </div>
            </div>
            <div className="recommendation">
              <p>{section.body}</p>
              <ProvenanceDetails
                refs={section.sourceIds.map((id: string) => ({ id, role: "live-context" }))}
                gaps={section.gapLabels}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PacketView({ packet }: { packet: Packet }) {
  if (packet.kind === "guardrail") {
    return <GuardrailCard packet={packet} />;
  }
  if (packet.kind === "unsupported_fixture") {
    return <UnsupportedTargetView packet={packet} />;
  }

  return (
    <div className="packet-view">
      <div className="packet-heading">
        <div>
          <div className="eyebrow">Generated packet</div>
          <h2>{packet.title}</h2>
        </div>
        <div className="packet-meta">
          <span>{packet.defaultTarget}</span>
          <span>{packet.liveRetrieval.status}</span>
        </div>
      </div>

      <div className="boundary-band">
        {packet.boundaries.map((item: string) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <div className="section-stack">
        {packet.sections.map((section: any) => {
          const Icon = pickSectionIcon(section.key);
          return (
            <article className="packet-section" key={section.key}>
              <div className="section-title">
                <Icon size={20} aria-hidden="true" />
                <div>
                  <h3>{section.title}</h3>
                  <p>{section.summary}</p>
                </div>
              </div>
              <div className="recommendation-list">
                {section.recommendations.map((recommendation: any) => (
                  <div className="recommendation" key={recommendation.id}>
                    <p>{recommendation.text}</p>
                    <ProvenanceDetails refs={recommendation.evidenceRefs} gaps={recommendation.gapLabels} />
                    {recommendation.caveats.length > 0 && (
                      <div className="caveat-row">
                        {recommendation.caveats.map((caveat: string) => (
                          <span key={caveat}>{caveat}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function EvidenceView({ packet }: { packet: Packet }) {
  if (packet.kind === "guardrail") {
    return <GuardrailCard packet={packet} />;
  }
  if (packet.kind === "unsupported_fixture") {
    return <UnsupportedTargetView packet={packet} />;
  }

  return (
    <div className="evidence-view">
      <div className="packet-heading">
        <div>
          <div className="eyebrow">Evidence ledger</div>
          <h2>Evidence summary with expandable source records</h2>
        </div>
        <span className="count-pill">{packet.sourceLedger.sources.length} sources</span>
      </div>
      <EvidenceClusters packet={packet} />
      <div className="ledger-grid">
        {packet.sourceLedger.sources.map((source: any) => (
          <article className="source-card" key={source.id}>
            <div className="source-card-head">
              <strong>Source record</strong>
              <span>{source.usageLabel}</span>
            </div>
            <p>{source.citeFor}</p>
            <details className="source-details">
              <summary>Show raw provenance</summary>
              <dl>
                <div>
                  <dt>Source ID</dt>
                  <dd>{source.id}</dd>
                </div>
                <div>
                  <dt>Locator</dt>
                  <dd>{source.locator}</dd>
                </div>
                <div>
                  <dt>Do not cite for</dt>
                  <dd>{source.doNotCiteFor}</dd>
                </div>
              </dl>
            </details>
          </article>
        ))}
      </div>
    </div>
  );
}

function ExportView({
  markdown,
  jsonExport,
  onCopy,
  onDownload
}: {
  markdown: string;
  jsonExport: string;
  onCopy: (kind: "json" | "markdown") => void;
  onDownload: (kind: "json" | "markdown") => void;
}) {
  return (
    <div className="export-view">
      <div className="packet-heading">
        <div>
          <div className="eyebrow">Exports</div>
          <h2>Markdown and JSON packet</h2>
        </div>
        <div className="button-row compact">
          <button onClick={() => onCopy("json")}>
            <FileJson size={17} aria-hidden="true" />
            JSON
          </button>
          <button onClick={() => onCopy("markdown")}>
            <FileText size={17} aria-hidden="true" />
            Markdown
          </button>
          <button onClick={() => onDownload("json")}>
            <Download size={17} aria-hidden="true" />
            JSON
          </button>
          <button onClick={() => onDownload("markdown")}>
            <Download size={17} aria-hidden="true" />
            Markdown
          </button>
        </div>
      </div>
      <div className="export-columns">
        <pre>{markdown}</pre>
        <pre>{jsonExport}</pre>
      </div>
    </div>
  );
}

function GuardrailView({
  packet,
  preview
}: {
  packet: Packet;
  preview: any;
}) {
  return (
    <div className="guardrail-view">
      <div className="packet-heading">
        <div>
          <div className="eyebrow">Scope boundaries</div>
          <h2>What TargetBench will not generate</h2>
        </div>
        <span className={preview.blocked ? "risk-pill active" : "risk-pill"}>{preview.blocked ? "Triggered" : "Clear"}</span>
      </div>
      {packet.kind === "guardrail" ? (
        <GuardrailCard packet={packet} />
      ) : (
        <div className="guardrail-matrix">
          {packet.guardrails.map((guardrail: any) => (
            <div className="guardrail-item" key={guardrail.id}>
              <strong>{guardrail.label}</strong>
              <span>{guardrail.response}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function GuardrailCard({ packet }: { packet: Packet }) {
  return (
    <div className="guardrail-card">
      <AlertTriangle size={28} aria-hidden="true" />
      <div>
        <h2>{packet.title}</h2>
        <p>{packet.message}</p>
        <div className="reference-row">
          {packet.triggeredCategories.map((category: string) => (
            <span key={category}>{category}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReferenceRow({
  refs,
  gaps
}: {
  refs: Array<{ id: string; role: string }>;
  gaps: string[];
}) {
  return (
    <div className="reference-row">
      {refs.map((ref) => (
        <span key={`${ref.id}-${ref.role}`}>
          {ref.id}: {ref.role}
        </span>
      ))}
      {gaps.map((gap) => (
        <span className="gap" key={gap}>
          {gap}
        </span>
      ))}
    </div>
  );
}

function ProvenanceDetails({
  refs,
  gaps
}: {
  refs: Array<{ id: string; role: string }>;
  gaps: string[];
}) {
  if ((!refs || refs.length === 0) && (!gaps || gaps.length === 0)) return null;
  return (
    <details className="provenance-details">
      <summary>Show source IDs and gap labels</summary>
      <ReferenceRow refs={refs || []} gaps={gaps || []} />
    </details>
  );
}

function pickSectionIcon(key: string) {
  if (key.includes("safety") || key.includes("off_tumor")) return iconMap.safety;
  if (key.includes("assay") || key.includes("readouts") || key.includes("model")) return iconMap.assay;
  if (key.includes("gate") || key.includes("source")) return iconMap.check;
  if (key.includes("caveat") || key.includes("gap")) return iconMap.warning;
  return iconMap.rationale;
}

function identifierText(identifiers: any) {
  const entries = Object.entries(identifiers || {}).filter(([, value]) => Boolean(value));
  if (entries.length === 0) return "No raw identifier reported";
  return entries.map(([key, value]) => `${key}: ${value}`).join("; ");
}

function formatDate(value: string) {
  if (!value) return "not reported";
  return value.replace("T", " ").replace(/\.\d+Z$/, "Z");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export { GATE4_SECTION_TITLES };
