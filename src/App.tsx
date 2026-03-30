import { useState } from 'react';
import { MediaPlayer } from './components/MediaPlayer';
import { SheetMusicPane } from './components/SheetMusicPane';
import { SyncController } from './components/SyncController';
import { useAudioSync } from './hooks/useAudioSync';
import { spanishRomance, type MusicPiece } from './data/spanish-romance';

function App() {
  // State for each pane's loaded music
  const [leftPanePiece, setLeftPanePiece] = useState<MusicPiece | null>(spanishRomance);
  const [rightPanePiece, setRightPanePiece] = useState<MusicPiece | null>(null);

  // Get sync points from the left pane (primary) or use empty array
  const activeSyncPoints = leftPanePiece?.syncPoints || [];

  // Audio sync hook
  const {
    audioRef,
    currentTime,
    duration,
    isPlaying,
    currentMeasure,
    volume,
    togglePlay,
    seek,
    setVolume,
  } = useAudioSync(activeSyncPoints);

  // Get audio URL from left pane (primary audio source)
  const audioUrl = leftPanePiece?.audioUrl;

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-white">Baco</h1>
          <span className="text-sm text-gray-400">Music Study App</span>
        </div>
        <SyncController
          syncPoints={activeSyncPoints}
          currentMeasure={currentMeasure}
        />
      </header>

      {/* Media Player */}
      <MediaPlayer
        audioRef={audioRef}
        audioUrl={audioUrl}
        currentTime={currentTime}
        duration={duration}
        isPlaying={isPlaying}
        volume={volume}
        currentMeasure={currentMeasure}
        onTogglePlay={togglePlay}
        onSeek={seek}
        onVolumeChange={setVolume}
      />

      {/* Dual Pane Sheet Music Viewer */}
      <main className="flex-1 flex gap-4 p-4 overflow-hidden">
        <div className="flex-1 min-w-0">
          <SheetMusicPane
            paneId="left"
            piece={leftPanePiece}
            highlightedMeasure={currentMeasure}
            onLoadPiece={setLeftPanePiece}
          />
        </div>
        <div className="flex-1 min-w-0">
          <SheetMusicPane
            paneId="right"
            piece={rightPanePiece}
            highlightedMeasure={currentMeasure}
            onLoadPiece={setRightPanePiece}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-2 bg-gray-800 border-t border-gray-700 text-center text-xs text-gray-500">
        Baco Music Study App - Press Space to play/pause
      </footer>
    </div>
  );
}

export default App;
