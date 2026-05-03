use regex::Regex;
use std::fs;
use std::io::{BufRead, BufReader};
use std::process::{Child, Command, Stdio};
use std::sync::Mutex;
use tauri::{Emitter, Window};
/* ------------------ Downloader helpers ------------------ */

fn is_tiktok_url(url: &str) -> bool {
    let url = url.to_lowercase();
    url.contains("tiktok.com") || url.contains("vm.tiktok.com")
}

fn read_device_id() -> Option<String> {
    let content = fs::read_to_string("deviceid.txt").ok()?;
    let id = content.trim();
    if id.is_empty() {
        None
    } else {
        Some(id.to_string())
    }
}

/* ------------------ Global download state ------------------ */

struct DownloadState {
    process: Mutex<Option<Child>>,
}

impl Default for DownloadState {
    fn default() -> Self {
        Self {
            process: Mutex::new(None),
        }
    }
}

/* ------------------ Download command ------------------ */

#[tauri::command]
async fn download_videos(
    window: Window,
    urls: Vec<String>,
    download_dir: String,
    audio_only: bool,
    state: tauri::State<'_, DownloadState>,
) -> Result<(), String> {
    fs::create_dir_all(&download_dir).map_err(|e| e.to_string())?;
    let progress_re = Regex::new(r"\[download\]\s+(\d+(?:\.\d+)?)%").unwrap();

    for url in urls {
        window.emit("yt-dlp-start", &url).ok();

        let mut cmd = Command::new("./bin/yt-dlp.exe");
        cmd.arg(&url)
            .arg("--progress")
            .arg("--newline")
            .arg("-o")
            .arg(format!("{}/%(title)s-%(id)s.%(ext)s", download_dir));

        if audio_only {
            // Extract best audio and convert to mp3 via bundled ffmpeg
            cmd.arg("--extract-audio")
                .arg("--audio-format")
                .arg("mp3")
                .arg("--audio-quality")
                .arg("0")
                .arg("--ffmpeg-location")
                .arg("./bin/ffmpeg.exe");
        }

        if is_tiktok_url(&url) {
            if let Some(device_id) = read_device_id() {
                cmd.arg("--extractor-args")
                    .arg(format!("tiktok:device_id={}", device_id));
            }
        }

        cmd.stdout(Stdio::piped()).stderr(Stdio::piped());

        #[cfg(target_os = "windows")]
        {
            use std::os::windows::process::CommandExt;
            cmd.creation_flags(0x08000000);
        }

        let child = cmd.spawn().map_err(|e| e.to_string())?;
        *state.process.lock().unwrap() = Some(child);

        let mut guard = state.process.lock().unwrap();
        let child = guard.as_mut().unwrap();
        let stdout = child.stdout.take().unwrap();
        drop(guard);

        let mut last_percent = -1.0f32;

        for line in BufReader::new(stdout).lines().flatten() {
            if state.process.lock().unwrap().is_none() {
                window.emit("yt-dlp-log", "Download cancelled").ok();
                return Ok(());
            }

            if let Some(caps) = progress_re.captures(&line) {
                let percent: f32 = caps[1].parse().unwrap_or(0.0);
                if percent != last_percent {
                    last_percent = percent;
                    window
                        .emit(
                            "yt-dlp-progress",
                            serde_json::json!({
                                "url": url,
                                "percent": percent
                            }),
                        )
                        .ok();
                }
                continue;
            }

            window.emit("yt-dlp-log", &line).ok();
        }

        *state.process.lock().unwrap() = None;
    }

    window
        .emit("yt-dlp-log", "[Finished] All downloads completed.")
        .ok();
    Ok(())
}

/* ------------------ Cancel ------------------ */

#[tauri::command]
fn cancel_download(state: tauri::State<'_, DownloadState>) -> Result<(), String> {
    let mut guard = state.process.lock().unwrap();
    if let Some(child) = guard.as_mut() {
        child.kill().map_err(|e| e.to_string())?;
        *guard = None;
    }
    Ok(())
}

/* ------------------ App entry ------------------ */

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(DownloadState::default())
        .invoke_handler(tauri::generate_handler![
            download_videos,
            cancel_download,
        ])
        .plugin(tauri_plugin_dialog::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
