"use client";

import { openLink } from "../../lib/openUrl";
import type { CSSProperties } from "react";

function getBadgeStyle(color: string): CSSProperties {
  if (color === "var(--accent)") {
    return {
      fontFamily: "var(--font-mono)", fontSize: "0.57rem", fontWeight: 700,
      color: "var(--accent)" as string,
      background: "var(--accent-glow)",
      border: "1px solid rgba(37,99,235,0.25)",
      borderRadius: "4px", padding: "2px 6px",
      flexShrink: 0, whiteSpace: "nowrap",
      lineHeight: 1.7, textTransform: "uppercase",
      letterSpacing: "0.04em", alignSelf: "flex-start", marginTop: "1px",
    };
  }
  if (color === "var(--success)") {
    return {
      fontFamily: "var(--font-mono)", fontSize: "0.57rem", fontWeight: 700,
      color: "var(--success)" as string,
      background: "rgba(22,163,74,0.08)",
      border: "1px solid rgba(22,163,74,0.2)",
      borderRadius: "4px", padding: "2px 6px",
      flexShrink: 0, whiteSpace: "nowrap",
      lineHeight: 1.7, textTransform: "uppercase",
      letterSpacing: "0.04em", alignSelf: "flex-start", marginTop: "1px",
    };
  }
  return {
    fontFamily: "var(--font-mono)", fontSize: "0.57rem", fontWeight: 700,
    color: "#ffffff",
    background: color,
    border: "1px solid transparent",
    borderRadius: "4px", padding: "2px 6px",
    flexShrink: 0, whiteSpace: "nowrap",
    lineHeight: 1.7, textTransform: "uppercase",
    letterSpacing: "0.04em", alignSelf: "flex-start", marginTop: "1px",
  };
}

const STEPS = [
  {
    step: "1",
    title: "Install Link Gopher",
    summary: "A free browser extension that extracts every link visible on any webpage.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    items: [
      { label: "Chrome", detail: 'Chrome Web Store → search "Link Gopher" → Add to Chrome', color: "#4285f4" },
      { label: "Firefox", detail: 'Firefox Add-ons → search "Link Gopher" → Add to Firefox', color: "#ff7518" },
    ],
    cta: {
      label: "Get Link Gopher Chrome",
      href: "https://chromewebstore.google.com/detail/link-gopher/bpjdkodgnbfalgghnbeggfbfjpcfamkf",
    },
    tip: undefined,
  },
  {
    step: "2",
    title: "Open a Video Page",
    summary: "Navigate to any platform page containing the videos you want to download.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    ),
    items: [
      { label: "TikTok", detail: "Creator profile, hashtag page, or search results", color: "#010101" },
      { label: "Pinterest", detail: "A board, saved pins, or search results filtered to Videos", color: "#e60023" },
    ],
    tip: "Scroll down before extracting — both platforms lazy-load content. More scrolling = more links.",
    cta: undefined,
  },
  {
    step: "3",
    title: "Extract the Links",
    summary: "Link Gopher scans the page and outputs every URL it finds in a new tab.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
      </svg>
    ),
    items: [
      { label: "1", detail: "Click the Link Gopher icon in your toolbar", color: "var(--accent)" },
      { label: "2", detail: 'Select "Extract Links" from the popup', color: "var(--accent)" },
      { label: "3", detail: "A new tab opens with all detected URLs listed", color: "var(--accent)" },
    ],
    tip: undefined,
    cta: undefined,
  },
  {
    step: "4",
    title: "Paste & Download",
    summary: "Filter to video URLs only, paste into the app, and start the download.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    ),
    items: [
      { label: "Filter", detail: "Keep /video/ links (TikTok) or /pin/ links (Pinterest)", color: "var(--success)" },
      { label: "Paste", detail: "Paste one URL per line into the Video URLs box", color: "var(--success)" },
      { label: "Download", detail: 'Pick a save folder, then click "Start Download"', color: "var(--success)" },
    ],
    tip: undefined,
    cta: undefined,
  },
];

export default function GuideCard() {
  return (
    <div className="card-panel" style={{ overflow: "hidden" }}>

      {/* ── Header ── */}
      <div style={{
        padding: "1.125rem 1.5rem",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        background: "var(--bg-elevated)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{
            width: "30px", height: "30px", borderRadius: "7px",
            background: "var(--accent-glow)", border: "1px solid rgba(37,99,235,0.18)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--accent)" as string, flexShrink: 0,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
            </svg>
          </div>
          <div>
            <p className="section-label" style={{ marginBottom: "1px" }}>Quick Start Guide</p>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: "0.9rem", color: "var(--text-primary)" as string,
              margin: 0, lineHeight: 1.2,
            }}>
              How to Gather Video Links
            </h2>
          </div>
        </div>

        <button
          onClick={() => openLink("https://addons.mozilla.org/en-US/firefox/addon/link-gopher/")}
          style={{
            display: "inline-flex", alignItems: "center", gap: "5px",
            background: "var(--accent)" as string, color: "white",
            borderRadius: "6px", padding: "0.4rem 0.85rem",
            fontSize: "0.7rem", fontFamily: "var(--font-display)" as string,
            fontWeight: 600, border: "none", cursor: "pointer",
            whiteSpace: "nowrap", flexShrink: 0,
          }}
          onMouseEnter={e => (e.currentTarget.style.filter = "brightness(1.12)")}
          onMouseLeave={e => (e.currentTarget.style.filter = "none")}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          Get Link Gopher Firefox
        </button>
      </div>

      {/* ── Steps grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {STEPS.map(({ step, title, summary, icon, items, tip, cta }, idx) => (
          <div
            key={step}
            style={{
              padding: "1.375rem 1.5rem",
              borderRight: idx < STEPS.length - 1 ? "1px solid var(--border)" : "none",
              display: "flex", flexDirection: "column",
              background: "transparent",
              transition: "background 0.15s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-elevated)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            {/* Step number + icon row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                <div style={{
                  width: "24px", height: "24px", borderRadius: "50%",
                  background: "var(--accent)" as string,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontFamily: "var(--font-mono)" as string, fontWeight: 700,
                    fontSize: "0.6rem", color: "white",
                  }}>
                    {step}
                  </span>
                </div>
                {idx < STEPS.length - 1 && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--border-strong)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                )}
              </div>
              <div style={{
                width: "30px", height: "30px", borderRadius: "7px",
                background: "var(--bg-surface)" as string, border: "1px solid var(--border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--text-muted)" as string, flexShrink: 0,
              }}>
                {icon}
              </div>
            </div>

            {/* Title */}
            <p style={{
              fontFamily: "var(--font-display)" as string, fontWeight: 700,
              fontSize: "0.875rem", color: "var(--text-primary)" as string,
              margin: "0 0 4px", lineHeight: 1.25,
            }}>
              {title}
            </p>

            {/* Summary */}
            <p style={{
              fontFamily: "var(--font-display)" as string, fontSize: "0.7rem",
              color: "var(--text-muted)" as string, margin: "0 0 1rem", lineHeight: 1.6,
            }}>
              {summary}
            </p>

            {/* Divider */}
            <div style={{ height: "1px", background: "var(--border)", marginBottom: "0.875rem" }} />

            {/* Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1 }}>
              {items.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                  <span style={getBadgeStyle(item.color)}>
                    {item.label}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-display)" as string, fontSize: "0.72rem",
                    color: "var(--text-secondary)" as string, lineHeight: 1.55,
                  }}>
                    {item.detail}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            {cta && (
              <button
                onClick={() => openLink(cta.href)}
                style={{
                  marginTop: "1rem",
                  display: "inline-flex", alignItems: "center", gap: "5px",
                  fontFamily: "var(--font-mono)" as string, fontSize: "0.67rem",
                  color: "var(--accent)" as string,
                  padding: "0.4rem 0.65rem",
                  background: "var(--accent-glow)" as string,
                  border: "1px solid rgba(37,99,235,0.18)",
                  borderRadius: "6px", fontWeight: 500,
                  cursor: "pointer", width: "fit-content",
                }}
                onMouseEnter={e => (e.currentTarget.style.filter = "brightness(1.1)")}
                onMouseLeave={e => (e.currentTarget.style.filter = "none")}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                {cta.label} ↗
              </button>
            )}

            {/* Tip */}
            {tip && (
              <div style={{
                marginTop: "1rem",
                background: "rgba(217,119,6,0.06)",
                border: "1px solid rgba(217,119,6,0.16)",
                borderRadius: "7px", padding: "0.6rem 0.75rem",
                display: "flex", gap: "0.5rem", alignItems: "flex-start",
              }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}>
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span style={{
                  fontFamily: "var(--font-display)" as string, fontSize: "0.68rem",
                  color: "var(--warning)" as string, lineHeight: 1.55,
                }}>
                  {tip}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── URL pattern reference ── */}
      <div style={{
        borderTop: "1px solid var(--border)",
        padding: "1rem 1.5rem",
        display: "grid",
        gridTemplateColumns: "auto 1fr 1fr",
        alignItems: "center",
        gap: "0.75rem 1.5rem",
        background: "var(--bg-elevated)" as string,
      }}>
        <span className="section-label" style={{ gridRow: "1 / 3", alignSelf: "center" }}>
          URL<br/>Patterns
        </span>

        {/* TikTok keep */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span style={{ fontFamily: "var(--font-mono)" as string, fontSize: "0.6rem", fontWeight: 700, color: "white", background: "#010101", borderRadius: "4px", padding: "1px 7px", flexShrink: 0, letterSpacing: "0.03em" }}>TIKTOK</span>
          <span style={{ fontFamily: "var(--font-display)" as string, fontSize: "0.7rem", color: "var(--text-muted)" as string }}>Keep:</span>
          <code style={{ fontFamily: "var(--font-mono)" as string, fontSize: "0.68rem", color: "var(--success)" as string, background: "rgba(22,163,74,0.07)", border: "1px solid rgba(22,163,74,0.15)", borderRadius: "4px", padding: "1px 7px" }}>tiktok.com/@user/video/…</code>
        </div>

        {/* TikTok avoid */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontFamily: "var(--font-display)" as string, fontSize: "0.7rem", color: "var(--text-muted)" as string }}>Avoid:</span>
          <code style={{ fontFamily: "var(--font-mono)" as string, fontSize: "0.68rem", color: "var(--error)" as string, background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.14)", borderRadius: "4px", padding: "1px 7px" }}>tiktok.com/t/… or /tag/…</code>
        </div>

        {/* Pinterest keep */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span style={{ fontFamily: "var(--font-mono)" as string, fontSize: "0.6rem", fontWeight: 700, color: "white", background: "#e60023", borderRadius: "4px", padding: "1px 7px", flexShrink: 0, letterSpacing: "0.03em" }}>PINTEREST</span>
          <span style={{ fontFamily: "var(--font-display)" as string, fontSize: "0.7rem", color: "var(--text-muted)" as string }}>Keep:</span>
          <code style={{ fontFamily: "var(--font-mono)" as string, fontSize: "0.68rem", color: "var(--success)" as string, background: "rgba(22,163,74,0.07)", border: "1px solid rgba(22,163,74,0.15)", borderRadius: "4px", padding: "1px 7px" }}>pinterest.com/pin/…</code>
        </div>

        {/* Pinterest avoid */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontFamily: "var(--font-display)" as string, fontSize: "0.7rem", color: "var(--text-muted)" as string }}>Avoid:</span>
          <code style={{ fontFamily: "var(--font-mono)" as string, fontSize: "0.68rem", color: "var(--error)" as string, background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.14)", borderRadius: "4px", padding: "1px 7px" }}>pinterest.com/username/ or /board/…</code>
        </div>
      </div>

      {/* ── Pro tip footer ── */}
      <div style={{
        borderTop: "1px solid var(--border)",
        padding: "0.75rem 1.5rem",
        display: "flex", alignItems: "center", gap: "0.6rem",
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span style={{ fontFamily: "var(--font-display)" as string, fontSize: "0.71rem", color: "var(--text-secondary)" as string, lineHeight: 1.5 }}>
          <strong style={{ color: "var(--text-primary)" as string, fontWeight: 600 }}>Pro tip:</strong>{" "}
          You can mix TikTok and Pinterest URLs in the same batch — the app handles both automatically.
        </span>
      </div>

    </div>
  );
}