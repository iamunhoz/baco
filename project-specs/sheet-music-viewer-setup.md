# Baco - Music Study App: Sheet Music Viewer

## Executive Summary
A web-based sheet music visualizer for personal music study, featuring dual-pane VexFlow rendering with synchronized audio playback. Built with React + Vite.

## Problem Statement
Need a tool to study sheet music visually while listening to audio, with synchronized playhead tracking. Initial use case: studying "Spanish Romance" (Romanza) for classical guitar.

## Success Criteria
- Can view two sheet music scores side-by-side on widescreen monitor
- Audio playback with visual sync (highlights current measure/beat)
- Supports both MusicXML import AND manual EasyScore notation
- Responsive but optimized for widescreen

## User Persona
Single user (developer/musician) studying guitar. Technical, comfortable with notation formats.

## Core Features (P0)

### 1. Dual-Pane Sheet Music Viewer
- Two VexFlow renderers side-by-side (50/50 split)
- Each pane independently scrollable
- Each pane can load different music or the same piece in different views

### 2. Media Player
- Audio player controls (play/pause, seek, volume)
- Position indicator synced to sheet music
- Supports common audio formats (MP3, WAV, OGG)

### 3. Synchronized Playback
- Current measure/beat highlighted on both panes during playback
- Playhead follows audio position
- Manual sync point definition (map measure numbers to time positions)

### 4. Music Input Methods
- **MusicXML Import**: Load .xml/.musicxml files, parse and render via VexFlow
- **Manual EasyScore**: Text input using VexFlow's EasyScore notation
- Each pane can use either input method

## Technical Architecture

### Stack
- **Frontend**: React 18+ with Vite
- **Rendering**: VexFlow 5.x for sheet music
- **Audio**: Native HTML5 Audio API
- **Styling**: Tailwind CSS
- **Language**: TypeScript

### Key Components
```
src/
├── components/
│   ├── SheetMusicPane/       # VexFlow renderer wrapper
│   ├── MediaPlayer/          # Audio controls + progress
│   ├── SyncController/       # Maps audio time to measures
│   └── MusicInput/           # MusicXML loader + EasyScore editor
├── hooks/
│   ├── useVexFlow.ts         # VexFlow setup/rendering
│   ├── useAudioSync.ts       # Audio-to-measure mapping
│   └── useMusicXML.ts        # MusicXML parsing
├── lib/
│   ├── vexflow-helpers.ts    # VexFlow utilities
│   └── musicxml-parser.ts    # MusicXML → VexFlow conversion
└── App.tsx                   # Main layout
```

### Layout
```
┌─────────────────────────────────────────────────────────┐
│  [Media Player: ▶ ═══════○══════════ 2:34 / 5:12  🔊]  │
├────────────────────────────┬────────────────────────────┤
│                            │                            │
│     Sheet Music Pane 1     │     Sheet Music Pane 2     │
│     (VexFlow Renderer)     │     (VexFlow Renderer)     │
│                            │                            │
│    ════════════════════    │    ════════════════════    │
│    │ ♩ ♩ ♩ │ ♩ ♩ ♩ │      │    │ ♩ ♩ ♩ │ ♩ ♩ ♩ │      │
│    ════════════════════    │    ════════════════════    │
│         [Load Music]       │         [Load Music]       │
│                            │                            │
└────────────────────────────┴────────────────────────────┘
```

## Initial Demo Content
Include "Spanish Romance" as sample:
- Hardcoded EasyScore notation for first few measures
- Sample MP3 from Internet Archive or similar public domain source
- Pre-defined sync points mapping measures to timestamps

## Non-Functional Requirements
- **Performance**: Smooth 60fps scrolling and highlighting
- **Responsiveness**: Works on 1920px+ width (optimized for widescreen)
- **Browser**: Modern browsers (Chrome, Firefox, Edge)

## Out of Scope (for MVP)
- Multiple songs/playlist management
- User accounts or cloud storage
- Mobile-responsive layout
- MIDI playback
- Note-by-note editing

## Resources Found
- Sheet Music PDFs: [Werner Guitar Editions](https://wernerguitareditions.com/products/spanish-romance-for-guitar-pdf), [This is Classical Guitar](https://www.thisisclassicalguitar.com/spanish-romance-tab-free-pdf/)
- Audio: [Internet Archive](https://archive.org/details/Sonata_20170318), [8notes](https://www.8notes.com/scores/15685.asp?ftype=mp3)
