import type { KeyPressCallbackMap, KeyPressEventType } from "@/lib/utils/keyboardHandlers.type"

/**
 * Invokes a registered callback for a keyboard event if a matching key or key combination
 * is found in the provided map.
 *
 * The function canonicalizes the event key:
 * - Single-character keys are converted to lowercase (e.g. "A" → "a")
 * - Named keys (e.g. "Enter", "Escape") are kept verbatim
 * - Modifier combinations are normalized (e.g. "Control+Enter", "Meta+k")
 *
 * It then looks up the callback in `keyMap` using the normalized key combination.
 * If a matching callback is found, the event's default action is prevented and the callback
 * is invoked with the original event.
 *
 * @param event - The keyboard event to handle.
 * @param keyMap - A mapping of key names or combinations to callback functions.
 *
 * @example
 * handleKeyPress(event, {
 *   Enter: () => console.log('Enter pressed'),
 *   'Control+Enter': () => console.log('Ctrl+Enter combo'),
 *   'Meta+k': () => openCommandPalette(),
 * });
 */
export function handleKeyPress(
  event: KeyPressEventType,
  keyMap: KeyPressCallbackMap
) {
  if (!event?.key) return;
  if (!keyMap || Object.keys(keyMap).length === 0) return;

  // Ignore events during IME composition (e.g., typing Japanese/Chinese/Korean)
  if (event.key === 'Process' || (event as any).isComposing) return;

  // Normalize the pressed key
  const normalizedKey = normalizeKey(event.key, event);
  
  // Normalize the keymap for case-insensitive matching
  const normalizedKeyMap = normalizeKeyMap(keyMap);
  
  // Look up the callback
  const callback = normalizedKeyMap[normalizedKey];
  
  if (!callback) return;
  
  event.preventDefault();
  callback(event);
}

/**
 * Returns the canonical alias for a given key string.
 * Handles common alternate spellings and short forms.
 */
export function getKeyAlias(key: string): string {
  if (!key) return '';

  const lowerKey = key.toLowerCase();

  switch (lowerKey) {
    // Standard alternate spellings
    case ' ':
    case 'spacebar':
      return 'space';
    case 'esc':
      return 'escape';
    case 'del':
      return 'delete';
    case 'return':
      return 'enter';
    case 'ctrl':
      return 'control';

    // Arrow key short forms
    case 'left':
      return 'arrowleft';
    case 'right':
      return 'arrowright';
    case 'up':
      return 'arrowup';
    case 'down':
      return 'arrowdown';

    default:
      return lowerKey;
  }
}

/**
 * Normalizes all keys in the keymap to a canonical form:
 * - Applies key aliases (e.g., 'Ctrl' → 'control', 'Esc' → 'escape')
 * - Enforces consistent modifier order (control, meta, shift, alt)
 * - Lowercases everything for case-insensitive matching
 * 
 * This ensures keyMap entries like 'Shift+Control+K' or 'Ctrl+Enter'
 * are normalized to match the format produced by normalizeKey().
 */
function normalizeKeyMap(keyMap: KeyPressCallbackMap): KeyPressCallbackMap {
  const modifierOrder: ReadonlyArray<string> = ['control', 'meta', 'shift', 'alt'];

  return Object.fromEntries(
    Object.entries(keyMap).map(([rawKey, callback]) => {
      if (!rawKey) return [rawKey, callback];

      // Split on '+' but be careful with keys that are literally '+'
      const tokens = rawKey.split('+').map((token) => token.trim());
      
      // Handle the edge case where the key is '+' itself
      // After split, we get ['', ''] for '+' or ['Control', '', ''] for 'Control+'
      // We need to detect this and handle it specially
      
      const modifierSet = new Set<string>();
      let baseKey = '';
      
      // Check if this is a single '+' key (splits into ['', ''])
      if (tokens.length === 2 && tokens[0] === '' && tokens[1] === '') {
        baseKey = '+';
      } else {
        // Normal processing
        for (let i = 0; i < tokens.length; i++) {
          const token = tokens[i];
          
          // Skip empty tokens unless it's the last one and previous was non-empty
          // This handles 'Control+' -> ['Control', ''] where '+' is the base key
          if (token === '') {
            // Check if this empty token represents a '+' key
            if (i === tokens.length - 1 && i > 0) {
              baseKey = '+';
            }
            continue;
          }
          
          const canonical = getKeyAlias(token);

          if (modifierOrder.includes(canonical)) {
            modifierSet.add(canonical);
            continue;
          }

          // Last non-modifier token becomes the base key
          baseKey = canonical;
        }
      }

      // Build key in consistent order: modifiers (sorted) + base key
      const orderedModifiers = modifierOrder.filter((name) => modifierSet.has(name));
      const parts = baseKey ? [...orderedModifiers, baseKey] : orderedModifiers;

      return [parts.join('+'), callback];
    })
  );
}

/**
 * Normalizes a key press into a canonical string representation.
 * Combines active modifiers with the key name, excluding modifier keys themselves.
 * 
 * For shifted symbols (e.g., Shift+/ produces '?'), this function derives the
 * unshifted key from event.code to ensure consistency with keyMap entries.
 * 
 * @example
 * normalizeKey('Enter', event) // 'enter' (no modifiers)
 * normalizeKey('k', event) // 'control+k' (with Ctrl pressed)
 * normalizeKey('Control', event) // 'control' (modifier key alone)
 * normalizeKey('?', event) // 'shift+/' (Shift+/ pressed, uses code)
 */
export function normalizeKey(key: string, event: KeyPressEventType): string {
  if (!key || typeof key !== 'string') return '';

  // When Shift is pressed, event.key gives the shifted character (e.g., '?' for Shift+/)
  // but we want the unshifted key (e.g., '/') to match keyMap entries like 'Shift+/'
  // Also handle numpad keys which should be normalized regardless of Shift
  let canonicalKey: string;
  
  if (event.code && event.code.startsWith('Numpad')) {
    // Always normalize numpad keys to their main keyboard equivalents
    canonicalKey = getKeyFromCode(event.code);
  } else if (event.shiftKey && event.code && isShiftedSymbol(key, event.code)) {
    // Use the unshifted key derived from code (e.g., 'Slash' -> '/')
    canonicalKey = getKeyFromCode(event.code);
  } else {
    // Normal case: use key with alias resolution
    canonicalKey = getKeyAlias(key);
  }
  
  // Modifier keys that should be excluded from the final key combination
  const modifierKeys = ['control', 'meta', 'shift', 'alt'];
  
  // If only a modifier key is pressed (without another key), return just that modifier
  if (modifierKeys.includes(canonicalKey)) {
    return canonicalKey;
  }
  
  // Build the modifier prefix
  const modifiers: string[] = [];
  
  if (event.ctrlKey) modifiers.push('control');
  if (event.metaKey) modifiers.push('meta');
  if (event.shiftKey) modifiers.push('shift');
  if (event.altKey) modifiers.push('alt');
  
  // If there are modifiers, combine them with the key
  if (modifiers.length > 0) {
    return [...modifiers, canonicalKey].join('+');
  }
  
  // No modifiers, just return the canonical key
  return canonicalKey;
}

/**
 * Checks if a key represents a shifted symbol by comparing key length and code.
 * Shifted symbols are single characters that differ from their code representation.
 * 
 * @internal Exported for testing purposes
 */
export function isShiftedSymbol(key: string, code: string): boolean {
  // Single character that's likely a shifted symbol
  if (key.length !== 1) return false;
  
  // Check if code starts with 'Digit' or common punctuation codes
  if (code.startsWith('Digit')) return true;
  
  // Common punctuation keys that produce different characters when shifted
  const punctuationCodes = [
    'Slash', 'Backslash', 'BracketLeft', 'BracketRight',
    'Semicolon', 'Quote', 'Comma', 'Period', 'Minus', 'Equal',
    'Backquote'
  ];
  
  return punctuationCodes.includes(code);
}

/**
 * Converts a KeyboardEvent.code to its unshifted key character.
 * E.g., 'Slash' -> '/', 'Digit1' -> '1', 'KeyA' -> 'a'
 * 
 * Numpad keys are normalized to their main keyboard equivalents
 * (e.g., 'NumpadEnter' -> 'enter', 'Numpad1' -> '1').
 * 
 * @internal Exported for testing purposes
 */
export function getKeyFromCode(code: string): string {
  // Handle numpad keys - normalize to main keyboard equivalents
  if (code.startsWith('Numpad')) {
    const numpadToKey: Record<string, string> = {
      'NumpadEnter': 'enter',
      'NumpadAdd': '+',
      'NumpadSubtract': '-',
      'NumpadMultiply': '*',
      'NumpadDivide': '/',
      'NumpadDecimal': '.',
      'Numpad0': '0',
      'Numpad1': '1',
      'Numpad2': '2',
      'Numpad3': '3',
      'Numpad4': '4',
      'Numpad5': '5',
      'Numpad6': '6',
      'Numpad7': '7',
      'Numpad8': '8',
      'Numpad9': '9',
    };
    return numpadToKey[code] || code.toLowerCase();
  }
  
  // Handle digit keys (Digit0-Digit9)
  if (code.startsWith('Digit')) {
    return code.replace('Digit', '');
  }
  
  // Handle letter keys (KeyA-KeyZ)
  if (code.startsWith('Key')) {
    return code.replace('Key', '').toLowerCase();
  }
  
  // Map common punctuation codes to their unshifted characters
  const codeToKey: Record<string, string> = {
    'Slash': '/',
    'Backslash': '\\',
    'BracketLeft': '[',
    'BracketRight': ']',
    'Semicolon': ';',
    'Quote': "'",
    'Comma': ',',
    'Period': '.',
    'Minus': '-',
    'Equal': '=',
    'Backquote': '`',
  };
  
  return codeToKey[code]?.toLowerCase() || code.toLowerCase();
}