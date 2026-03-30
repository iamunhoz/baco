// Spanish Romance (Romanza) - Demo content for Baco music study app
// First 16 measures in VexFlow EasyScore notation

export interface MusicPiece {
  id: string;
  title: string;
  composer: string;
  measures: MeasureData[];
  syncPoints: SyncPoint[];
  audioUrl?: string;
}

export interface MeasureData {
  measureNumber: number;
  treble: string; // EasyScore notation for treble clef
  bass?: string;  // EasyScore notation for bass clef (optional)
}

export interface SyncPoint {
  measureNumber: number;
  timeSeconds: number;
}

// Spanish Romance - A minor section (first part)
// The melody is on the treble clef, with arpeggiated accompaniment
// Using simplified notation suitable for VexFlow EasyScore

export const spanishRomance: MusicPiece = {
  id: 'spanish-romance',
  title: 'Spanish Romance (Romanza)',
  composer: 'Anonymous / Traditional',
  // Using a public domain recording as a placeholder
  audioUrl: 'https://archive.org/download/SpanishRomance_201510/Spanish%20Romance.mp3',
  measures: [
    // Measures 1-4: Opening theme in A minor
    {
      measureNumber: 1,
      treble: 'E5/q, B4/8, E5/8, G#5/8, B5/8',
    },
    {
      measureNumber: 2,
      treble: 'E5/q, B4/8, E5/8, G#5/8, B5/8',
    },
    {
      measureNumber: 3,
      treble: 'E5/q, B4/8, E5/8, G#5/8, B5/8',
    },
    {
      measureNumber: 4,
      treble: 'D5/q, B4/8, D5/8, G#5/8, B5/8',
    },
    // Measures 5-8
    {
      measureNumber: 5,
      treble: 'C5/q, A4/8, C5/8, E5/8, A5/8',
    },
    {
      measureNumber: 6,
      treble: 'C5/q, A4/8, C5/8, E5/8, A5/8',
    },
    {
      measureNumber: 7,
      treble: 'B4/q, G#4/8, B4/8, E5/8, G#5/8',
    },
    {
      measureNumber: 8,
      treble: 'B4/q, G#4/8, B4/8, E5/8, G#5/8',
    },
    // Measures 9-12
    {
      measureNumber: 9,
      treble: 'A4/q, E4/8, A4/8, C5/8, E5/8',
    },
    {
      measureNumber: 10,
      treble: 'A4/q, E4/8, A4/8, C5/8, E5/8',
    },
    {
      measureNumber: 11,
      treble: 'G#4/q, E4/8, G#4/8, B4/8, E5/8',
    },
    {
      measureNumber: 12,
      treble: 'G#4/q, E4/8, G#4/8, B4/8, E5/8',
    },
    // Measures 13-16
    {
      measureNumber: 13,
      treble: 'A4/q, E4/8, A4/8, C5/8, E5/8',
    },
    {
      measureNumber: 14,
      treble: 'A4/q, E4/8, A4/8, C5/8, E5/8',
    },
    {
      measureNumber: 15,
      treble: 'B4/q, E4/8, G#4/8, B4/8, E5/8',
    },
    {
      measureNumber: 16,
      treble: 'A4/h., E4/q',
    },
  ],
  // Sync points: map measure numbers to approximate timestamps
  // Based on a typical ~80 BPM tempo for Spanish Romance
  // Each measure is roughly 2.25 seconds in 3/4 time at this tempo
  syncPoints: [
    { measureNumber: 1, timeSeconds: 0 },
    { measureNumber: 2, timeSeconds: 2.25 },
    { measureNumber: 3, timeSeconds: 4.5 },
    { measureNumber: 4, timeSeconds: 6.75 },
    { measureNumber: 5, timeSeconds: 9 },
    { measureNumber: 6, timeSeconds: 11.25 },
    { measureNumber: 7, timeSeconds: 13.5 },
    { measureNumber: 8, timeSeconds: 15.75 },
    { measureNumber: 9, timeSeconds: 18 },
    { measureNumber: 10, timeSeconds: 20.25 },
    { measureNumber: 11, timeSeconds: 22.5 },
    { measureNumber: 12, timeSeconds: 24.75 },
    { measureNumber: 13, timeSeconds: 27 },
    { measureNumber: 14, timeSeconds: 29.25 },
    { measureNumber: 15, timeSeconds: 31.5 },
    { measureNumber: 16, timeSeconds: 33.75 },
  ],
};

// Available music pieces for the dropdown
export const availablePieces: MusicPiece[] = [spanishRomance];
