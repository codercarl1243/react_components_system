export const PAINT_PRESETS = ['all', 'surface'] as const;
export const PAINT_CHANNELS = ['background', 'foreground', 'border'] as const;

export type PaintPreset = typeof PAINT_PRESETS[number];
export type PaintChannel = typeof PAINT_CHANNELS[number];

export type Paint =
  | PaintPreset
  | PaintChannel
  | PaintChannel[];
