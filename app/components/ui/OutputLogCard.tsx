"use client";

import { useEffect, useRef } from "react";

interface Props {
  logs: string[];
}

function classifyLine(line: string): "error" | "success" | "info" | "dim" | "default" {
  const l = line.toLowerCase();
  if (l.includes("error") || l.includes("failed")) return "error";
  if (l.includes("[download]") || l.includes("finished") || l.includes("completed")) return "success";
  if (l.includes("[info]") || l.includes("extracting url")) return "info";
  if (l.startsWith("─") || l.startsWith("-")) return "dim";
  return "default";
}

export default function OutputLogCard({ logs }: Props) {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = terminalRef.current;
    if (!el) return;
    // Scroll the terminal box itself — never touches the page scroll position
    el.scrollTop = el.scrollHeight;
  }, [logs]);

  return (
    <div className="card-panel" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p className="section-label">Output</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)", margin: "3px 0 0" }}>
            Download Log
          </h2>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {logs.length > 0 && (
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "4px", padding: "0.2rem 0.5rem" }}>
              {logs.length} lines
            </span>
          )}
          <div style={{ display: "flex", gap: "4px" }}>
            {["#ef4444", "#f59e0b", "#22c55e"].map((c, i) => (
              <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: c, opacity: 0.5 }} />
            ))}
          </div>
        </div>
      </div>

      {/* Terminal */}
      <div ref={terminalRef} className="log-terminal" style={{ height: "400px" }}>
        {logs.length === 0 ? (
          <div style={{ color: "var(--text-muted)", fontStyle: "italic" }}>— waiting for downloads…</div>
        ) : (
          logs.map((line, i) => {
            const kind = classifyLine(line);
            return (
              <div key={i} className={`log-line ${kind}`}>
                <span className="arrow">›</span>
                <span className="text">{line}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
