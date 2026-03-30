import { Renderer, Stave, StaveNote, Voice, Formatter, Beam } from 'vexflow';
import type { MeasureData } from '../data/spanish-romance';

export interface RenderOptions {
  width: number;
  height: number;
  measuresPerLine: number;
  measureWidth: number;
  staveY: number;
  highlightedMeasure?: number;
}

const DEFAULT_OPTIONS: RenderOptions = {
  width: 800,
  height: 600,
  measuresPerLine: 4,
  measureWidth: 180,
  staveY: 40,
};

/**
 * Parse VexFlow EasyScore-style notation into StaveNotes
 * Format: "E5/q, B4/8, E5/8" where:
 * - Note name + octave (e.g., E5)
 * - Duration after slash (q=quarter, h=half, w=whole, 8=eighth, 16=sixteenth)
 */
function parseNotation(notation: string, clef: string = 'treble'): StaveNote[] {
  const notes: StaveNote[] = [];
  const parts = notation.split(',').map(p => p.trim());

  for (const part of parts) {
    const match = part.match(/^([A-Ga-g][#b]?\d)\/(\w+)(\.?)$/);
    if (match) {
      const [, pitch, duration, dot] = match;
      const note = new StaveNote({
        keys: [pitch.toLowerCase().replace(/(\d)/, '/$1')],
        duration: duration + (dot ? 'd' : ''),
        clef,
      });
      notes.push(note);
    }
  }

  return notes;
}

/**
 * Create beams for eighth notes and smaller
 */
function createBeamsForNotes(notes: StaveNote[]): Beam[] {
  const beams: Beam[] = [];
  const beamableNotes: StaveNote[] = [];

  for (const note of notes) {
    const duration = note.getDuration();
    if (duration === '8' || duration === '16' || duration === '32') {
      beamableNotes.push(note);
    } else {
      if (beamableNotes.length >= 2) {
        beams.push(new Beam(beamableNotes.slice()));
      }
      beamableNotes.length = 0;
    }
  }

  // Handle remaining beamable notes
  if (beamableNotes.length >= 2) {
    beams.push(new Beam(beamableNotes.slice()));
  }

  return beams;
}

/**
 * Render sheet music measures to a container element
 */
export function renderMeasures(
  container: HTMLDivElement,
  measures: MeasureData[],
  options: Partial<RenderOptions> = {}
): void {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const { width, measuresPerLine, measureWidth, staveY, highlightedMeasure } = opts;

  // Clear existing content
  container.innerHTML = '';

  // Calculate required height
  const numLines = Math.ceil(measures.length / measuresPerLine);
  const lineHeight = 100;
  const totalHeight = numLines * lineHeight + 60;

  // Create SVG renderer
  const renderer = new Renderer(container, Renderer.Backends.SVG);
  renderer.resize(width, totalHeight);
  const context = renderer.getContext();

  // Set default styles
  context.setFont('Arial', 10);

  measures.forEach((measure, index) => {
    const lineNumber = Math.floor(index / measuresPerLine);
    const positionInLine = index % measuresPerLine;

    const x = positionInLine * measureWidth + 10;
    const y = staveY + lineNumber * lineHeight;

    // Create stave
    const stave = new Stave(x, y, measureWidth - 10);

    // Add clef and time signature only on first measure of each line
    if (positionInLine === 0) {
      stave.addClef('treble');
      if (lineNumber === 0) {
        stave.addTimeSignature('3/4');
      }
    }

    // Highlight current measure
    if (measure.measureNumber === highlightedMeasure) {
      context.save();
      context.setFillStyle('rgba(59, 130, 246, 0.2)');
      context.fillRect(x, y, measureWidth - 10, 80);
      context.restore();
    }

    stave.setContext(context).draw();

    // Parse and render notes
    const notes = parseNotation(measure.treble);

    if (notes.length > 0) {
      // Create voice with proper time signature (3/4)
      const voice = new Voice({ numBeats: 3, beatValue: 4 });
      voice.setStrict(false); // Allow imperfect beat counts for demo
      voice.addTickables(notes);

      // Format and draw
      new Formatter().joinVoices([voice]).format([voice], measureWidth - 40);
      voice.draw(context, stave);

      // Create and draw beams
      const beams = createBeamsForNotes(notes);
      beams.forEach(beam => beam.setContext(context).draw());
    }
  });
}

/**
 * Calculate which measure corresponds to a given time
 */
export function getMeasureAtTime(
  syncPoints: { measureNumber: number; timeSeconds: number }[],
  currentTime: number
): number {
  // Find the last sync point that is <= current time
  let currentMeasure = 1;

  for (const point of syncPoints) {
    if (point.timeSeconds <= currentTime) {
      currentMeasure = point.measureNumber;
    } else {
      break;
    }
  }

  return currentMeasure;
}
