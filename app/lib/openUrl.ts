import { openUrl } from "@tauri-apps/plugin-opener";

/**
 * Opens a URL in the user's default browser via Tauri's opener plugin.
 * Falls back to window.open for non-Tauri environments (dev browser preview).
 */
export async function openLink(url: string): Promise<void> {
  try {
    await openUrl(url);
  } catch {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
