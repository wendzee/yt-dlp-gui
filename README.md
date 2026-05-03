# Bulk Video Downloader

A desktop application for batch downloading videos from TikTok, Facebook, Instagram, YouTube, Pinterest, and other platforms using yt-dlp.

## Features

- Bulk download videos from multiple platforms
- Support for audio-only extraction (MP3)
- Custom download directory selection
- Progress tracking and download logs
- Cancel ongoing downloads

## Prerequisites

- Node.js 18+ 
- Rust (latest stable)
- Windows 10/11

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Download yt-dlp and ffmpeg:
   - Place `yt-dlp.exe` in `./src-tauri/bin/`
   - Place `ffmpeg.exe` in `./src-tauri/bin/`

   Get them from:
   - https://github.com/yt-dlp/yt-dlp/releases
   - https://www.gyan.dev/ffmpeg/builds/

## Development

Run the Next.js frontend:

```bash
npm run dev
```

Run the Tauri backend (in separate terminal):

```bash
cd src-tauri
cargo run
```

## Build

Build the complete application:

```bash
npm run tauri build
```

The executable will be generated at:
```
src-tauri/target/release/app.exe
```

## Project Structure

```
.
├── app/                    # Next.js frontend
│   ├── page.tsx           # Main app page
│   └── components/        # UI components
├── src-tauri/             # Tauri backend
│   ├── src/lib.rs        # Rust source code
│   ├── bin/             # yt-dlp.exe, ffmpeg.exe
│   └── capabilities/    # Tauri permissions
└── package.json
```

## Usage

1. Launch the application
2. Paste video URLs (one per line) in the input field
3. Select a download folder (optional)
4. Enable "Audio Only" for MP3 extraction
5. Click "Start Download"
6. Monitor progress in the output log