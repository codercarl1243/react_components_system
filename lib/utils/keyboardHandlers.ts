import type { KeyPressCallbackMap, KeyPressEventType } from "@/lib/utils/keyboardHandlers.type"


/**
 * Invokes a registered callback for a keyboard event if a matching key or key combination
 * is found in the provided map.
 *
 * The function canonicalises the event key:
 * - Single-character keys are converted to lowercase (e.g. "A" → "a")
 * - Named keys (e.g. "Enter", "Escape") are kept verbatim
 * - Modifier combinations are normalised (e.g. "Control+Enter", "Meta+K")
 *
 * It then looks up the callback in `keyMap` using either:
 * 1. The full combination (e.g. "Control+Enter"), or
 * 2. A known alias of the key (e.g. "Esc" → "Escape")
 *
 * If a matching callback is found, the event’s default action is prevented and the callback
 * is invoked with the original event.
 *
 * @param event - The keyboard event to handle.
 *   The function returns immediately if falsy or if `event.key` is missing.
 * @param keyMap - A mapping of key names or combinations to callback functions.
 *   Keys may use canonical names ("Enter", "Escape") or combinations joined by `+`
 *   ("Control+Enter", "Meta+K"). If empty or no matching key/alias exists, nothing happens.
 *
 * @example
 * // Basic single-key handler
 * handleKeyPress(event, {
 *   Enter: () => console.log('Enter pressed'),
 *   Escape: () => console.log('Escape pressed'),
 * });
 *
 * @example
 * // Lowercase single-character keys are matched automatically
 * handleKeyPress(event, {
 *   a: () => console.log('Pressed the A key'),
 * });
 *
 * @example
 * // Combination (modifier + key)
 * handleKeyPress(event, {
 *   'Control+Enter': () => console.log('Ctrl+Enter combo triggered'),
 *   'Meta+K': () => openCommandPalette(),
 * });
 *
 * @example
 * // Using inside a component keyboard handler
 * function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
 *   handleKeyPress(event, {
 *     Enter: () => (event.currentTarget.dataset.pressed = 'true'),
 *     'Control+Enter': () => console.log('Ctrl+Enter shortcut!'),
 *   });
 * }
 */
export function handleKeyPress(
  event: KeyPressEventType,
  keyMap: KeyPressCallbackMap
) {

  if (!event) return;
  if (!keyMap || Object.keys(keyMap).length === 0) return;

  // Normalize and canonicalize key
  let key = event.key;
  if (key.length === 1) key = key.toLowerCase();

  const combo = normalizeShortcut(key, event);
  const alias = getKeyAlias(key);
  const callback = keyMap[combo] ?? (alias ? keyMap[alias] : keyMap[key]);

  if (!callback) return

  event.preventDefault()
  callback(event)
}

export function getKeyAlias(key: string): string | undefined {
  if (!key) return undefined;

  // Normalize to lowercase for consistent matching
  switch (key.toLowerCase()) {
    // Standard alternate spellings
    case ' ':
    case 'spacebar':
      return 'Space';
    case 'esc':
      return 'Escape';
    case 'del':
    case 'delete':
      return 'Delete';
    case 'enter':
    case 'return':
      return 'Enter';
    case 'control':
    case 'ctrl':
      return 'Control';

    // Arrow key short forms
    case 'left':
      return 'ArrowLeft';
    case 'right':
      return 'ArrowRight';
    case 'up':
      return 'ArrowUp';
    case 'down':
      return 'ArrowDown';

    default:
      return undefined;
  }
}


export function normalizeShortcut(key: string, event: KeyPressEventType): string {
  const parts = [
    event.ctrlKey && 'Control',
    event.metaKey && 'Meta',
    event.shiftKey && 'Shift',
    event.altKey && 'Alt',
    getKeyAlias(key)
  ].filter(Boolean);
  return parts.join('+');
}