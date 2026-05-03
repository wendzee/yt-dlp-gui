interface Props {
  open: boolean;
  onClose: () => void;
}

const SITES = [
  { name: "TikTok", note: "No product links" },
  { name: "YouTube", note: "Videos & Shorts" },
  { name: "Instagram", note: "Reels & Posts" },
  { name: "Facebook", note: "Videos & Reels" },
  { name: "Pinterest", note: "" },
  { name: "X / Twitter", note: "" },
  { name: "Reddit", note: "" },
  { name: "Vimeo", note: "" },
  { name: "Dailymotion", note: "" },
  { name: "Twitch", note: "Clips & VODs" },
  { name: "Bilibili", note: "" },
  { name: "SoundCloud", note: "" },
  { name: "Streamable", note: "" },
  { name: "LinkedIn", note: "" },
  { name: "VK", note: "" },
  { name: "Archive.org", note: "" },
];

export default function SupportedSitesModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box-custom"
        style={{ maxWidth: "560px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
          }}
        >
          <div>
            <p className="section-label">Reference</p>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.05rem",
                color: "var(--text-primary)",
                margin: "3px 0 0",
              }}
            >
              Supported Sites
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              borderRadius: "7px",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--text-secondary)",
              fontSize: "1rem",
              transition: "all 0.15s",
            }}
          >
            ×
          </button>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.5rem",
            marginBottom: "1.25rem",
          }}
        >
          {SITES.map(({ name, note }) => (
            <div
              key={name}
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                padding: "0.6rem 0.875rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "0.8rem",
                  color: "var(--text-primary)",
                }}
              >
                {name}
              </span>
              {note && (
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    color: "var(--text-muted)",
                    marginLeft: "0.5rem",
                    flexShrink: 0,
                  }}
                >
                  {note}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Tip */}
        <div
          style={{
            background: "rgba(59,130,246,0.06)",
            border: "1px solid rgba(59,130,246,0.15)",
            borderRadius: "8px",
            padding: "0.75rem 1rem",
            display: "flex",
            gap: "0.6rem",
            fontSize: "0.75rem",
            color: "#7aa2f7",
            fontFamily: "var(--font-display)",
          }}
        >
          <span style={{ flexShrink: 0 }}>ℹ</span>
          Many more sites are supported. If a video plays in your browser, there&apos;s a good chance this app can download it.
        </div>

        <div style={{ marginTop: "1.25rem", display: "flex", justifyContent: "flex-end" }}>
          <button className="btn-ghost-custom" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
