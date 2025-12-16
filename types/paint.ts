export type PaintChannel = 'background' | 'foreground' | 'border';
export type PaintPreset = 'all' | 'surface';

export type Paint =
  | PaintPreset
  | PaintChannel
  | PaintChannel[];
