"use client";

import { useState, useEffect } from "react";

interface Props {
  urls: string;
  setUrls: (v: string) => void;
  downloadDir: string;
  isDownloading: boolean;
  isCancelling: boolean;
  audioOnly: boolean;
  setAudioOnly: (v: boolean) => void;
  onSelectFolder: () => void;
  onStart: () => void;
  onCancel: () => void;
  onShowSupportedSites: () => void;
}

export default function UrlInputCard({
  urls,
  setUrls,
  downloadDir,
  isDownloading,
  isCancelling,
  audioOnly,
  setAudioOnly,
  onSelectFolder,
  onStart,
  onCancel,
  onShowSupportedSites,
}: Props) {
  const [showEmptyAlert, setShowEmptyAlert] = useState(false);

  const urlCount = urls
    .split("\n")
    .map((u) => u.trim())
    .filter(Boolean).length;

  const handleStart = () => {
    if (!urlCount) {
      setShowEmptyAlert(true);
      return;
    }
    setShowEmptyAlert(false);
    onStart();
  };

  useEffect(() => {
    if (urls.trim()) setShowEmptyAlert(false);
  }, [urls]);

  return (
    <div className="card-panel" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>

      {/* Card header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p className="section-label">Input</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)", margin: "3px 0 0" }}>
            Video URLs
          </h2>
        </div>
        <button className="tag-badge" onClick={onShowSupportedSites}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
          </svg>
          Supported Sites
        </button>
      </div>

      {/* Alert */}
      {showEmptyAlert && (
        <div style={{
          background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)",
          borderRadius: "8px", padding: "0.65rem 1rem",
          display: "flex", alignItems: "center", gap: "0.6rem",
          fontSize: "0.8rem", color: "var(--warning)" as string,
          fontFamily: "var(--font-display)" as string,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          Please enter at least one valid video URL.
        </div>
      )}

      {/* Textarea */}
      <div style={{ position: "relative" }}>
        <textarea
          className={`textarea-custom${showEmptyAlert ? " warning" : ""}`}
          style={{ height: "220px" }}
          placeholder={"https://www.tiktok.com/@user/video/...\nhttps://www.youtube.com/watch?v=...\nhttps://www.instagram.com/reel/..."}
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
        />
        {urlCount > 0 && (
          <span style={{
            position: "absolute", bottom: "0.6rem", right: "0.75rem",
            fontFamily: "var(--font-mono)" as string, fontSize: "0.65rem",
            color: "var(--text-muted)" as string, background: "var(--bg-elevated)" as string,
            padding: "0.1rem 0.4rem", borderRadius: "4px", border: "1px solid var(--border)",
          }}>
            {urlCount} URL{urlCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "var(--border)" }} />

      {/* ── Download mode toggle ── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "var(--bg-elevated)" as string,
        border: "1px solid var(--border)",
        borderRadius: "10px",
        padding: "3px",
        gap: "3px",
      }}>
        {/* Video button */}
        <button
          onClick={() => !isDownloading && setAudioOnly(false)}
          disabled={isDownloading}
          style={{
            flex: 1,
            display: "flex", alignItems: "center", justifyContent: "center", gap: "7px",
            padding: "0.55rem 0.5rem",
            borderRadius: "7px",
            border: "none",
            cursor: isDownloading ? "not-allowed" : "pointer",
            fontFamily: "var(--font-display)" as string,
            fontWeight: 600,
            fontSize: "0.8rem",
            transition: "all 0.15s ease",
            background: !audioOnly ? "var(--bg-surface)" : "transparent",
            color: !audioOnly ? "var(--text-primary)" : "var(--text-muted)",
            boxShadow: !audioOnly ? "0 1px 3px rgba(0,0,0,0.08), 0 0 0 1px var(--border)" : "none",
          } as React.CSSProperties}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
            <line x1="7" y1="2" x2="7" y2="22"/>
            <line x1="17" y1="2" x2="17" y2="22"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <line x1="2" y1="7" x2="7" y2="7"/>
            <line x1="2" y1="17" x2="7" y2="17"/>
            <line x1="17" y1="17" x2="22" y2="17"/>
            <line x1="17" y1="7" x2="22" y2="7"/>
          </svg>
          Video
          {!audioOnly && (
            <span style={{
              fontFamily: "var(--font-mono)" as string, fontSize: "0.58rem",
              background: "var(--accent-glow)" as string, color: "var(--accent)" as string,
              border: "1px solid rgba(37,99,235,0.2)", borderRadius: "4px",
              padding: "1px 5px", fontWeight: 600, letterSpacing: "0.03em",
            }}>
              MP4
            </span>
          )}
        </button>

        {/* Audio button */}
        <button
          onClick={() => !isDownloading && setAudioOnly(true)}
          disabled={isDownloading}
          style={{
            flex: 1,
            display: "flex", alignItems: "center", justifyContent: "center", gap: "7px",
            padding: "0.55rem 0.5rem",
            borderRadius: "7px",
            border: "none",
            cursor: isDownloading ? "not-allowed" : "pointer",
            fontFamily: "var(--font-display)" as string,
            fontWeight: 600,
            fontSize: "0.8rem",
            transition: "all 0.15s ease",
            background: audioOnly ? "var(--bg-surface)" : "transparent",
            color: audioOnly ? "var(--text-primary)" : "var(--text-muted)",
            boxShadow: audioOnly ? "0 1px 3px rgba(0,0,0,0.08), 0 0 0 1px var(--border)" : "none",
          } as React.CSSProperties}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13"/>
            <circle cx="6" cy="18" r="3"/>
            <circle cx="18" cy="16" r="3"/>
          </svg>
          Audio Only
          {audioOnly && (
            <span style={{
              fontFamily: "var(--font-mono)" as string, fontSize: "0.58rem",
              background: "rgba(22,163,74,0.08)", color: "var(--success)" as string,
              border: "1px solid rgba(22,163,74,0.2)", borderRadius: "4px",
              padding: "1px 5px", fontWeight: 600, letterSpacing: "0.03em",
            }}>
              MP3
            </span>
          )}
        </button>
      </div>

      {/* Folder row */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <button className="btn-ghost-custom" onClick={onSelectFolder} disabled={isDownloading} style={{ flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
          </svg>
          Select Folder
        </button>
        <div style={{
          flex: 1, overflow: "hidden", fontFamily: "var(--font-mono)" as string,
          fontSize: "0.7rem", color: "var(--text-muted)" as string,
          whiteSpace: "nowrap", textOverflow: "ellipsis", minWidth: 0,
        }} title={downloadDir}>
          {downloadDir}
        </div>
      </div>

      {/* Action row */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
        <button
          className="btn-primary-custom"
          onClick={handleStart}
          disabled={isDownloading}
          style={{ flex: 1, justifyContent: "center" }}
        >
          {isDownloading ? (
            <>
              <span className="spinner" />
              {isCancelling ? "Stopping…" : audioOnly ? "Extracting Audio…" : "Downloading…"}
            </>
          ) : (
            <>
              {audioOnly ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              )}
              {audioOnly ? "Extract Audio" : "Start Download"}
            </>
          )}
        </button>

        {isDownloading && (
          <button className="btn-danger-custom" onClick={onCancel} disabled={isCancelling} style={{ flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            </svg>
            {isCancelling ? "Stopping…" : "Cancel"}
          </button>
        )}
      </div>

      {/* Status */}
      {isDownloading && !isCancelling && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono)" as string, fontSize: "0.7rem", color: "var(--text-muted)" as string }}>
          <span className="status-dot" />
          {audioOnly ? "Extracting audio via ffmpeg, please wait…" : "Downloading files, please wait…"}
        </div>
      )}
    </div>
  );
}
