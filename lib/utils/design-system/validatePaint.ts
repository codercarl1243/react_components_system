import { logWarning } from "@/lib/logging/log";
import { PaintChannel, PaintPreset } from "@/types/paint";
import { isNonEmptyString, isNonEmptyArray, isNullish } from "@/lib/utils/guards";

const PAINT_PRESETS = ['all', 'surface'] as const;
const PAINT_CHANNELS = ['background', 'foreground', 'border'] as const;


function isPaintPreset(value: unknown): value is PaintPreset {
  return (
    typeof value === 'string' &&
    (PAINT_PRESETS as readonly string[]).includes(value)
  );
}

function isPaintChannel(value: unknown): value is PaintChannel {
  return (
    typeof value === 'string' &&
    (PAINT_CHANNELS as readonly string[]).includes(value)
  );
}

function extractPaintStrings(input: unknown): string[] {
  if (isNonEmptyString(input)) {
    return [input];
  }

  if (isNonEmptyArray(input)) {
    return input.filter(isNonEmptyString);
  }

  return [];
}

export default function validatePaint(paint: unknown) {
  if (process.env.NODE_ENV === 'production') return;

  if (isNullish(paint)) return;

  const values = extractPaintStrings(paint);
  if (values.length === 0) return;

  const hasPreset = values.some(isPaintPreset);
  const hasChannel = values.some(isPaintChannel);

  const hasUnknown = values.some(
    v => !isPaintPreset(v) && !isPaintChannel(v)
  );

  if (hasUnknown) {
    logWarning(`[Block] Unknown paint value: "${values.join(" ")}"`);
  }

  if (hasPreset && hasChannel) {
    logWarning(
      `[Block] Invalid paint usage: presets (${PAINT_PRESETS.join(
        ', '
      )}) must not be combined with channels (${PAINT_CHANNELS.join(', ')}).\n` +
      `Received: ${values.join(' ')}`
    );
  }
}
