import { logWarning } from "@/lib/logging/log";

const PAINT_PRESETS = ['all', 'surface'] as const;
const PAINT_CHANNELS = ['background', 'foreground', 'border'] as const;

export default function validatePaint(paint: unknown) {
  if (process.env.NODE_ENV === 'production') return;

  if (!paint) return;

  const values = Array.isArray(paint) ? paint : [paint];

  const hasPreset = values.some(v => PAINT_PRESETS.includes(v as any));
  const hasChannel = values.some(v => PAINT_CHANNELS.includes(v as any));

  if (!hasPreset && !hasChannel) {
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
