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

type Tab = "packet" | "evidence" | "exports" | "guardrails";

type Packet = any;

const iconMap = {
  rationale: BookOpenCheck,
  safety: ShieldCheck,
  assay: FlaskConical,
  check: BadgeCheck,
  warning: AlertTriangle
};

function App() {
  const [target, setTarget] = React.useState<string>(DEFAULT_INPUT.target);
  const [disease, setDisease] = React.useState<string>(DEFAULT_INPUT.disease);
  const [modality, setModality] = React.useState<string>(DEFAULT_INPUT.modality);
  const [prompt, setPrompt] = React.useState<string>("");
  const [packet, setPacket] = React.useState<Packet>(() =>
    generateTargetBenchPacket(DEFAULT_INPUT)
  );
  const [tab, setTab] = React.useState<Tab>("packet");
  const [copyState, setCopyState] = React.useState("Copy");

  const markdown = React.useMemo(() => exportPacketAsMarkdown(packet), [packet]);
  const jsonExport = React.useMemo(() => JSON.stringify(packet, null, 2), [packet]);
  const guardrailPreview = React.useMemo(
    () => detectGuardrails(`${target} ${disease} ${modality} ${prompt}`),
    [target, disease, modality, prompt]
  );

  function runPacket() {
    setPacket(generateTargetBenchPacket({ target, disease, modality, prompt } as any));
    setTab(guardrailPreview.blocked ? "guardrails" : "packet");
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
          <h1>CLDN18.2 validation planner</h1>
        </div>
        <div className="status-strip" aria-label="Run status">
          <span>Fixture only</span>
          <span>Gate 4 checks</span>
          <strong>{packet.kind === "guardrail" ? "Guarded" : "Ready"}</strong>
        </div>
      </header>

      <main className="workspace-grid">
        <section className="control-panel" aria-label="Planner controls">
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
          </label>
          <label>
            <span>Planning note</span>
            <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} />
          </label>

          <div className="guardrail-preview">
            <ShieldCheck size={18} aria-hidden="true" />
            <span>{guardrailPreview.blocked ? "Boundary triggered" : "Planning boundary clear"}</span>
          </div>

          <div className="button-row">
            <button className="primary" onClick={runPacket}>
              <Play size={18} aria-hidden="true" />
              Generate
            </button>
            <button onClick={() => copyExport("markdown")}>
              <Clipboard size={18} aria-hidden="true" />
              {copyState}
            </button>
          </div>

          <div className="tab-list" role="tablist" aria-label="Packet views">
            {(["packet", "evidence", "exports", "guardrails"] as Tab[]).map((item) => (
              <button
                key={item}
                className={tab === item ? "active" : ""}
                onClick={() => setTab(item)}
                role="tab"
                aria-selected={tab === item}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="output-panel" aria-live="polite">
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
          {tab === "guardrails" && <GuardrailView packet={packet} preview={guardrailPreview} />}
        </section>
      </main>
    </div>
  );
}

function PacketView({ packet }: { packet: Packet }) {
  if (packet.kind === "guardrail") {
    return <GuardrailCard packet={packet} />;
  }

  return (
    <div className="packet-view">
      <div className="packet-heading">
        <div>
          <div className="eyebrow">Generated packet</div>
          <h2>{packet.title}</h2>
        </div>
        <div className="packet-meta">
          <span>{packet.fixtureId}</span>
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
                    <ReferenceRow refs={recommendation.evidenceRefs} gaps={recommendation.gapLabels} />
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

  return (
    <div className="evidence-view">
      <div className="packet-heading">
        <div>
          <div className="eyebrow">Evidence ledger</div>
          <h2>Source provenance and usage labels</h2>
        </div>
        <span className="count-pill">{packet.sourceLedger.sources.length} sources</span>
      </div>
      <div className="ledger-grid">
        {packet.sourceLedger.sources.map((source: any) => (
          <article className="source-card" key={source.id}>
            <div className="source-card-head">
              <strong>{source.id}</strong>
              <span>{source.usageLabel}</span>
            </div>
            <p>{source.citeFor}</p>
            <dl>
              <div>
                <dt>Locator</dt>
                <dd>{source.locator}</dd>
              </div>
              <div>
                <dt>Do not cite for</dt>
                <dd>{source.doNotCiteFor}</dd>
              </div>
            </dl>
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
          <div className="eyebrow">Safety checks</div>
          <h2>Forbidden-output guardrails</h2>
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

function pickSectionIcon(key: string) {
  if (key.includes("safety") || key.includes("off_tumor")) return iconMap.safety;
  if (key.includes("assay") || key.includes("readouts") || key.includes("model")) return iconMap.assay;
  if (key.includes("gate") || key.includes("source")) return iconMap.check;
  if (key.includes("caveat") || key.includes("gap")) return iconMap.warning;
  return iconMap.rationale;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export { GATE4_SECTION_TITLES };
