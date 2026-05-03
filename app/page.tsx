"use client";

import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { open } from "@tauri-apps/plugin-dialog";
import { useEffect, useState } from "react";

import Header from "./components/ui/Header";
import UrlInputCard from "./components/ui/UrlInputCard";
import OutputLogCard from "./components/ui/OutputLogCard";
import SupportedSitesModal from "./components/ui/SupportedSitesModal";

export default function Page() {
  const [urls, setUrls] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [downloadDir, setDownloadDir] = useState("./downloads");
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [audioOnly, setAudioOnly] = useState(false);
  const [showSupportedSites, setShowSupportedSites] = useState(false);

  useEffect(() => {
    const unlisten = listen<string>("yt-dlp-log", (event) => {
      setLogs((prev) => [...prev, event.payload]);
    });
    return () => { unlisten.then((fn) => fn()); };
  }, []);

  const selectFolder = async () => {
    const selected = await open({ directory: true, multiple: false, title: "Select Download Folder" });
    if (typeof selected === "string") setDownloadDir(selected);
  };

  const startDownload = async () => {
    if (isDownloading) return;
    const list = urls.split("\n").map((u) => u.trim()).filter(Boolean);
    if (!list.length) return;
    setLogs([]);
    setIsDownloading(true);
    try {
      await invoke("download_videos", { urls: list, downloadDir, audioOnly });
    } finally {
      setIsDownloading(false);
    }
  };

  const cancelDownload = async () => {
    if (!isDownloading) return;
    setIsCancelling(true);
    try {
      await invoke("cancel_download");
      setLogs((p) => [...p, "Download cancelled by user"]);
    } finally {
      setIsCancelling(false);
      setIsDownloading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", padding: "1.5rem", maxWidth: "1280px", margin: "0 auto" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <Header />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))", gap: "1.25rem" }}>
          <UrlInputCard
            urls={urls}
            setUrls={setUrls}
            downloadDir={downloadDir}
            isDownloading={isDownloading}
            isCancelling={isCancelling}
            audioOnly={audioOnly}
            setAudioOnly={setAudioOnly}
            onSelectFolder={selectFolder}
            onStart={startDownload}
            onCancel={cancelDownload}
            onShowSupportedSites={() => setShowSupportedSites(true)}
          />
          <OutputLogCard logs={logs} />
        </div>
      
      </div>

      <SupportedSitesModal open={showSupportedSites} onClose={() => setShowSupportedSites(false)} />
    </div>
  );
}
