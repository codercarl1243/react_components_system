import type { KeyPressCallbackMap, KeyPressEventType } from "@/utils/keyboardHandlers.type"

export function handleKeyPress(
  event: KeyPressEventType,
  keyMap: KeyPressCallbackMap
) {
  // Canonicalise: single chars -> lower-case, keep named keys verbatim.
  const raw = event.key
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