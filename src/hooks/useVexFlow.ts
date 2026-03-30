import { useEffect, useRef, useCallback } from 'react';
import type { MeasureData } from '../data/spanish-romance';
import { renderMeasures } from '../lib/vexflow-helpers';

interface UseVexFlowOptions {
  measures: MeasureData[];
  highlightedMeasure?: number;
  measuresPerLine?: number;
}

interface UseVexFlowReturn {
  containerRef: React.RefObject<HTMLDivElement | null>;
  render: () => void;
}

export function useVexFlow(options: UseVexFlowOptions): UseVexFlowReturn {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { measures, highlightedMeasure, measuresPerLine = 4 } = options;

  const render = useCallback(() => {
    if (!containerRef.current || measures.length === 0) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const measureWidth = Math.floor(width / measuresPerLine) - 5;

    renderMeasures(container, measures, {
      width,
      measureWidth,
      measuresPerLine,
      highlightedMeasure,
    });
  }, [measures, highlightedMeasure, measuresPerLine]);

  // Render on mount and when dependencies change
  useEffect(() => {
    render();
  }, [render]);

  // Re-render on window resize
  useEffect(() => {
    const handleResize = () => {
      render();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [render]);

  return {
    containerRef,
    render,
  };
}
