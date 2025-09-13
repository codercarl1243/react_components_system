import type { KeyPressCallbackMap, KeyPressEventType } from "@/utils/keyboardHandlers.type"

export function handleKeyPress(
  event: KeyPressEventType,
  keyMap: KeyPressCallbackMap
) {
  // TODO: update the raw key to specifically only use event.key in future versions
  // as event.code is not consistent across keyboard layouts and does not support aliases.
  // However, this would be a breaking change.

  if (!event) return
  if (!keyMap || Object.keys(keyMap).length === 0) return
  // Canonicalise: single chars -> lower-case, keep named keys verbatim.
  const raw = event.key ?? event.code
  if (!raw) return
  const key = raw && raw.length === 1 ? raw.toLowerCase() : raw
  const alias = getKeyAlias(key);

  const callback = keyMap[raw] ?? keyMap[key] ?? (alias ? keyMap[alias] : undefined)

  if (!callback) return

  event.preventDefault()
  callback(event)
}

export function getKeyAlias(key: string): string | undefined {
  switch (key) {
    case ' ':
    case 'Spacebar':
      return 'Space'
    case 'Esc':
      return 'Escape'
    case 'Del':
      return 'Delete'
    case 'Left':
      return 'ArrowLeft'
    case 'Right':
      return 'ArrowRight'
    case 'Up':
      return 'ArrowUp'
    case 'Down':
      return 'ArrowDown'
    case 'Enter':
    case 'Return':
      return 'Enter'
    case 'Control':
    case 'Ctrl':
      return 'Control'
    default:
      return undefined
  }
}