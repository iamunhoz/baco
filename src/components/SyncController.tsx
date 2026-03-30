import { useEffect, useCallback, useState } from 'react';
import type { SyncPoint } from '../data/spanish-romance';

interface SyncControllerProps {
  syncPoints: SyncPoint[];
  currentMeasure: number;
  onMeasureChange?: (measure: number) => void;
}

/**
 * SyncController manages the relationship between audio time and measures.
 * It displays sync information and allows manual sync point adjustments.
 */
export function SyncController({
  syncPoints,
  currentMeasure,
  onMeasureChange,
}: SyncControllerProps) {
  const [showSyncInfo, setShowSyncInfo] = useState(false);

  // Notify parent when measure changes
  useEffect(() => {
    onMeasureChange?.(currentMeasure);
  }, [currentMeasure, onMeasureChange]);

  // Find current sync point info
  const currentSyncPoint = syncPoints.find(sp => sp.measureNumber === currentMeasure);
  const nextSyncPoint = syncPoints.find(sp => sp.measureNumber === currentMeasure + 1);

  const toggleSyncInfo = useCallback(() => {
    setShowSyncInfo(prev => !prev);
  }, []);

  return (
    <div className="relative">
      {/* Toggle button */}
      <button
        onClick={toggleSyncInfo}
        className="px-3 py-1.5 text-xs bg-gray-700 hover:bg-gray-600 rounded transition-colors"
        aria-expanded={showSyncInfo}
        aria-label="Toggle sync information"
      >
        Sync Info
      </button>

      {/* Sync info panel */}
      {showSyncInfo && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 z-10">
          <h3 className="text-sm font-semibold text-white mb-3">Sync Points</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Current Measure:</span>
              <span className="text-white font-mono">{currentMeasure}</span>
            </div>

            {currentSyncPoint && (
              <div className="flex justify-between">
                <span className="text-gray-400">Start Time:</span>
                <span className="text-white font-mono">
                  {currentSyncPoint.timeSeconds.toFixed(2)}s
                </span>
              </div>
            )}

            {nextSyncPoint && (
              <div className="flex justify-between">
                <span className="text-gray-400">Next at:</span>
                <span className="text-white font-mono">
                  {nextSyncPoint.timeSeconds.toFixed(2)}s
                </span>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-700">
            <p className="text-xs text-gray-500">
              Total sync points: {syncPoints.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
