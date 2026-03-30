import { useVexFlow } from '../hooks/useVexFlow';
import type { MusicPiece } from '../data/spanish-romance';
import { availablePieces } from '../data/spanish-romance';

interface SheetMusicPaneProps {
  paneId: string;
  piece: MusicPiece | null;
  highlightedMeasure: number;
  onLoadPiece: (piece: MusicPiece) => void;
}

export function SheetMusicPane({
  paneId,
  piece,
  highlightedMeasure,
  onLoadPiece,
}: SheetMusicPaneProps) {
  const { containerRef } = useVexFlow({
    measures: piece?.measures || [],
    highlightedMeasure,
    measuresPerLine: 4,
  });

  const handlePieceSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPiece = availablePieces.find(p => p.id === e.target.value);
    if (selectedPiece) {
      onLoadPiece(selectedPiece);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
      {/* Header with controls */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white truncate flex-1">
          {piece?.title || 'No Music Loaded'}
        </h2>
        <select
          value={piece?.id || ''}
          onChange={handlePieceSelect}
          className="ml-4 px-3 py-1.5 bg-gray-700 border border-gray-600 rounded text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={`Load music for pane ${paneId}`}
        >
          <option value="">Load Music...</option>
          {availablePieces.map(p => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
      </div>

      {/* Sheet music container */}
      <div className="flex-1 overflow-auto sheet-pane p-4">
        {piece ? (
          <div className="vexflow-container bg-white rounded p-4 min-h-full">
            <div ref={containerRef} className="w-full" />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <svg
                className="w-16 h-16 mx-auto mb-4 opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
              <p>Select a piece from the dropdown above</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer with info */}
      {piece && (
        <div className="px-4 py-2 bg-gray-800 border-t border-gray-700 text-sm text-gray-400">
          <span>{piece.composer}</span>
          <span className="mx-2">|</span>
          <span>{piece.measures.length} measures</span>
        </div>
      )}
    </div>
  );
}
