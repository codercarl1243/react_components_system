import { logWarning } from "@/lib/logging/log";
import { PAINT_CHANNELS, PAINT_PRESETS, type PaintChannel, type PaintPreset } from "@/types/paint";
import { isNonEmptyString, isNonEmptyArray, isNullish } from "@/lib/utils/guards";
import { isOneOfTokens } from "@/lib/utils/design-system/tokens";

function isPaintPreset(value: unknown): value is PaintPreset {
  return isOneOfTokens(PAINT_PRESETS, value)
}

function isPaintChannel(value: unknown): value is PaintChannel {
  return isOneOfTokens(PAINT_CHANNELS, value)
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

  const unknownValues = values.filter(
    v => !isPaintPreset(v) && !isPaintChannel(v)
  );

  if (unknownValues.length > 0) {
    logWarning(
      `[Block] Unknown paint value(s): "${unknownValues.join(' ')}"`
    );
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
