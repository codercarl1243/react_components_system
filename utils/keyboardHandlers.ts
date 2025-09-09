export type KeyCallbackMap = {
  [key: string]: (e?: React.KeyboardEvent | KeyboardEvent) => void;
};

export function handleKeyPress(
  event: React.KeyboardEvent | KeyboardEvent,
  keyMap: KeyCallbackMap
) {
  // Canonicalise: single chars -> lower-case, keep named keys verbatim.
  const raw = event.key;
  const key = raw && raw.length === 1 ? raw.toLowerCase() : raw;
  const callback =
    keyMap[key] ??
    // Common aliases for space
    (key === " " ? keyMap["Space"] : undefined);

  if (!callback) return;

  event.preventDefault();
  callback(event);

}