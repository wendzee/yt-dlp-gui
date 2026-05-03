"use client";

import { useTheme } from "../../context/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: "1.25rem",
        borderBottom: "1px solid var(--border)",
        marginBottom: "0.25rem",
      }}
    >
      {/* Left: logo + name */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            background: "var(--accent)",
            borderRadius: "9px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 4px 16px rgba(59,130,246,0.3)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        </div>
        <div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "1.1rem",
              color: "var(--text-primary)",
              letterSpacing: "-0.01em",
              lineHeight: 1,
              margin: 0,
            }}
          >
            Bulk Video Downloader
          </h1>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              color: "var(--text-muted)",
              margin: "3px 0 0",
              letterSpacing: "0.04em",
            }}
          >
            powered by yt-dlp
          </p>
        </div>
      </div>

      {/* Right: version + theme toggle */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--text-muted)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          v1.0
        </span>

        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          <div className="toggle-track">
            <div className="toggle-thumb" />
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              color: "var(--text-secondary)",
            }}
          >
            {isDark ? "Light mode" : "Dark mode"}
          </span>
        </button>
      </div>
    </div>
  );
}
