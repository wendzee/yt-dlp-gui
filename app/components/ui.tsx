"use client";

import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { open } from "@tauri-apps/plugin-dialog";
import { useEffect, useRef, useState } from "react";
 

export default function App() {  
  const [urls, setUrls] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  //const [progress, setProgress] = useState<Record<string, number>>({});
  const [downloadDir, setDownloadDir] = useState<string>("./downloads");
  //const [noAudio, setRemoveAudio] = useState(false);
  const [showSupportedSites, setShowSupportedSites] = useState(false);
  const logBottomRef = useRef<HTMLDivElement | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  /* Cancel Stop Button */
  const cancelDownload = async () => {
  if (!isDownloading) return;
  setIsCancelling(true);
    try {
      await invoke("cancel_download");
      setLogs((prev) => [...prev, "⛔ Download cancelled by user"]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsCancelling(false);
      setIsDownloading(false);
    }
  };

  /* ------------------ yt-dlp logs ------------------ */
  useEffect(() => {
    const unlisten = listen<string>("yt-dlp-log", (event) => {
      setLogs((prev) => [...prev, event.payload]);
    });

    return () => {
      unlisten.then((fn) => fn());
    };
  }, []);

 

  /* ------------------ select folder ------------------ */
  const selectFolder = async () => {
    const selected = await open({
      directory: true,
      multiple: false,
      title: "Select Download Folder",
    });

    if (typeof selected === "string") {
      setDownloadDir(selected);
    }
  };

 

  /* ------------------ start download ------------------ */
  const startDownload = async () => {
    if (isDownloading) return;

    setIsDownloading(true);
    setLogs([]);
 

    const list = urls
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean);

    if (!list.length) {
      setIsDownloading(false);
      return;
    }
  

  try {
    await invoke("download_videos", {
      urls: list,
      downloadDir,
    });
    } catch (err) {
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="w-full mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">🎬 Bulk Video Downloader</h1>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* URL Input */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body space-y-4">
              <h2 className="card-title flex items-center gap-2">
                Video URLs
                <button
                  className="link link-primary text-sm"
                  onClick={() => setShowSupportedSites(true)}
                >
                  [Supported Sites]
                </button>
              </h2>

              <textarea
                className="textarea textarea-bordered w-full h-72 font-mono"
                placeholder="Paste one video URL per line"
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
              />

              {/* Folder Picker */}
              <div className="card-actions flex justify-between items-center flex-wrap gap-2">
                <button
                  className="btn btn-outline"
                  onClick={selectFolder}
                  disabled={isDownloading}
                >
                  📁 Select Folder
                </button>
                  <div className="text-xs opacity-70 truncate max-w-70">
                  📂 {downloadDir}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="btn btn-primary whitespace-nowrap"
                    onClick={startDownload}
                    disabled={isDownloading}
                  >
                    ▶ Start Download
                  </button>

                  {isDownloading && (
                    <button
                      className="btn btn-error whitespace-nowrap"
                      onClick={cancelDownload}
                      disabled={isCancelling}
                    >
                      ⛔ {isCancelling ? "Stopping…" : "Cancel"}
                    </button>
                  )}

                </div>
              </div>

              {isDownloading && (
                <div className="text-xs opacity-60 mt-2">
                  <span className="loading loading-spinner loading-xs"></span>
                  {isCancelling ? " Stopping download…" : " Downloading files please wait…"}
                </div>
              )}
   
 
            </div>
          </div>

          {/* Output */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title flex justify-between w-full">
                Download Output
              </h2>

              <div className="mt-3 h-105 overflow-y-auto rounded-xl bg-neutral text-neutral-content p-4 font-mono text-sm">
                {logs.length === 0 && (
                  <div className="opacity-50 italic">
                    Waiting for downloads to start…
                  </div>
                )}

                {logs.map((line, i) => (
                  <div
                    key={i}
                    className={`mb-1 ${
                      line.toLowerCase().includes("error")
                        ? "text-error"
                        : line.includes("[download]")
                          ? "text-success"
                          : ""
                    }`}
                  >
                    ▸ {line}
                  </div>
                ))}

                <div ref={logBottomRef} />
              </div>
            </div>
          </div>
        </div>

 
        {/* Guide */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">📘 How to Gather Video Links</h2>

            <div className="collapse collapse-arrow bg-base-200">
              <input type="checkbox" />
              <div className="collapse-title font-medium">
                Using Link Gopher (Chrome & Firefox)
              </div>

              <div className="collapse-content space-y-4 text-sm leading-relaxed">
                <p>
                  You can quickly collect multiple video links from TikTok,
                  Pinterest, or Facebook using the <strong>Link Gopher</strong>{" "}
                  browser extension.
                </p>

                <div>
                  <h3 className="font-semibold">1️⃣ Install Link Gopher</h3>
                  <ul className="list-disc ml-6 mt-1 space-y-1">
                    <li>
                      Chrome:
                      <span className="font-mono ml-1">
                        Chrome Web Store ➡️ "Link Gopher"
                      </span>
                    </li>
                    <li>
                      Firefox:
                      <span className="font-mono ml-1">
                        Add-ons ➡️ "Link Gopher"
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold">2️⃣ Open a Video Page</h3>
                  <ul className="list-disc ml-6 mt-1 space-y-1">
                    <li>TikTok profile or hashtag page</li>
                    <li>Pinterest board or search results</li>
                    <li>Facebook Reels or video feed</li>
                  </ul>
                  <p className="opacity-70 mt-1">
                    Scroll down to load more videos before collecting links.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold">3️⃣ Extract Links</h3>
                  <ol className="list-decimal ml-6 mt-1 space-y-1">
                    <li>
                      Click the <strong>Link Gopher</strong> icon
                    </li>
                    <li>
                      Select <strong>Extract Links</strong>
                    </li>
                    <li>A new tab will open with all detected URLs</li>
                  </ol>
                </div>

                <div>
                  <h3 className="font-semibold">4️⃣ Filter Video URLs</h3>
                  <p className="mt-1">In the Link Gopher results tab:</p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>
                      Keep links containing:
                      <span className="font-mono ml-1">
                        tiktok.com / pinterest.com / facebook.com
                      </span>
                    </li>
                    <li>Remove ads, images, or unrelated links</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold">5️⃣ Paste Into This App</h3>
                  <ul className="list-disc ml-6 mt-1 space-y-1">
                    <li>Copy all filtered video links</li>
                    <li>Paste them into the textarea above</li>
                    <li>One link per line</li>
                    <li>
                      Click <strong>Start Download</strong>
                    </li>
                  </ul>
                </div>

                <div className="alert alert-info text-xs">
                  <span>
                    💡 Tip: For best results, keep scrolling the page before
                    extracting links so more videos are loaded.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dialog Popup*/}
        {showSupportedSites && (
          <dialog className="modal modal-open">
            <div className="modal-box max-w-2xl">
              <h3 className="font-bold text-lg mb-3">🌐Supported Sites</h3>

              <p className="text-sm opacity-70 mb-4">
                Below are some commonly used platforms that work well with this
                app:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <ul className="list-disc ml-5 space-y-1">
                  <li>TikTok (Must have no product links)</li>
                  <li>Facebook (Videos & Reels)</li>
                  <li>Instagram</li>
                  <li>YouTube</li>
                  <li>Pinterest</li>
                  <li>X (Twitter)</li>
                  <li>Reddit</li>
                  <li>Vimeo</li>
                </ul>

                <ul className="list-disc ml-5 space-y-1">
                  <li>Dailymotion</li>
                  <li>Twitch</li>
                  <li>Bilibili</li>
                  <li>SoundCloud</li>
                  <li>Streamable</li>
                  <li>LinkedIn</li>
                  <li>VK</li>
                  <li>Archive.org</li>
                </ul>
              </div>

              <div className="alert alert-info text-xs mt-4">
                <span>
                  💡 Tip: Many more sites are not listed here. If a site plays
                  in your browser, there's a good chance this app can download
                  it.
                </span>
              </div>

              <div className="modal-action">
                <button
                  className="btn btn-primary"
                  onClick={() => setShowSupportedSites(false)}
                >
                  Close
                </button>
              </div>
            </div>

            <form
              method="dialog"
              className="modal-backdrop"
              onClick={() => setShowSupportedSites(false)}
            >
              <button>close</button>
            </form>
          </dialog>
        )}

 

      </div>
    </div>
  );
}
