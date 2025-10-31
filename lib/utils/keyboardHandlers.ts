import type { KeyPressCallbackMap, KeyPressEventType } from "@/lib/utils/keyboardHandlers.type"


/**
 * Invoke a registered callback for a keyboard event if a matching key is found in the map.
 *
 * Canonicalises the event key (single characters are lower-cased; named keys kept verbatim),
 * looks up the callback in `keyMap` using the canonical key or a known alias, then prevents the
 * event's default action and calls the callback with the original event.
 *
 * @param event - The keyboard event to handle; function returns immediately if falsy or if `event.key` is missing.
 * @param keyMap - Mapping of key names to callbacks. If empty or no matching key/alias exists, nothing happens.
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
  switch (key) {
    // Standard alternate spellings
    case ' ':
    case 'Spacebar':
      return 'Space'
    case 'Esc':
      return 'Escape'
    case 'Del':
      return 'Delete'
    case 'Enter':
    case 'Return':
      return 'Enter'
    case 'Control':
    case 'Ctrl':
      return 'Control'
    // Arrow key short forms
    case 'Left':
      return 'ArrowLeft'
    case 'Right':
      return 'ArrowRight'
    case 'Up':
      return 'ArrowUp'
    case 'Down':
      return 'ArrowDown'
    default:
      return undefined
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