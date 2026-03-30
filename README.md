# Baco

Music study app with dual-pane sheet music visualization and synchronized audio playback.

## Features

- **Dual Sheet Music Viewer**: View two scores side-by-side using VexFlow
- **Synchronized Playback**: Audio player with visual sync highlighting current position
- **Multiple Input Methods**: Import MusicXML or write EasyScore notation directly
- **Widescreen Optimized**: Designed for wide monitors

## Tech Stack

- React 18 + Vite
- VexFlow 5.x for music notation rendering
- Tailwind CSS v4 for styling
- TypeScript

## Development

```bash
bun install
bun dev
```

## Project Structure

```
src/
├── components/
│   ├── SheetMusicPane.tsx    # VexFlow wrapper with dropdown
│   ├── MediaPlayer.tsx       # Audio player controls
│   └── SyncController.tsx    # Sync info panel
├── hooks/
│   ├── useVexFlow.ts         # VexFlow rendering hook
│   └── useAudioSync.ts       # Audio-to-measure sync
├── lib/
│   └── vexflow-helpers.ts    # VexFlow utilities + notation parser
├── data/
│   └── spanish-romance.ts    # Demo content (16 measures)
├── App.tsx
└── main.tsx
```

## Demo Content

Includes "Spanish Romance" (Romanza) - 16 measures with synchronized playback points.

## License

MIT
