import type { RefObject } from 'react';

interface MediaPlayerProps {
  audioRef: RefObject<HTMLAudioElement | null>;
  audioUrl?: string;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  volume: number;
  currentMeasure: number;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function MediaPlayer({
  audioRef,
  audioUrl,
  currentTime,
  duration,
  isPlaying,
  volume,
  currentMeasure,
  onTogglePlay,
  onSeek,
  onVolumeChange,
}: MediaPlayerProps) {
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSeek(parseFloat(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onVolumeChange(parseFloat(e.target.value));
  };

  return (
    <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      {/* Hidden audio element */}
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      <div className="flex items-center gap-6 max-w-6xl mx-auto">
        {/* Play/Pause Button */}
        <button
          onClick={onTogglePlay}
          className="w-12 h-12 flex items-center justify-center bg-blue-600 hover:bg-blue-500 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Progress Section */}
        <div className="flex-1 flex items-center gap-4">
          {/* Current Time */}
          <span className="text-sm text-gray-400 w-12 text-right font-mono">
            {formatTime(currentTime)}
          </span>

          {/* Seek Bar */}
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeekChange}
            className="flex-1 h-2"
            aria-label="Seek"
          />

          {/* Duration */}
          <span className="text-sm text-gray-400 w-12 font-mono">
            {formatTime(duration)}
          </span>
        </div>

        {/* Current Measure Indicator */}
        <div className="px-3 py-1 bg-gray-700 rounded text-sm">
          <span className="text-gray-400">Measure:</span>{' '}
          <span className="text-white font-semibold">{currentMeasure}</span>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onVolumeChange(volume > 0 ? 0 : 0.7)}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label={volume > 0 ? 'Mute' : 'Unmute'}
          >
            {volume > 0.5 ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            ) : volume > 0 ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-2"
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  );
}
