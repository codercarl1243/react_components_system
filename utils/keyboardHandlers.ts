import type { KeyPressCallbackMap, KeyPressEventType } from "@/utils/keyboardHandlers.type"

export function handleKeyPress(
  event: KeyPressEventType,
  keyMap: KeyPressCallbackMap
) {

  if (!event) return
  if (!keyMap || Object.keys(keyMap).length === 0) return
  // Canonicalise: single chars -> lower-case, keep named keys verbatim.
  let key = event.key
  if (!key) return
  key = key && key.length === 1 ? key.toLowerCase() : key
  const alias = getKeyAlias(key);

  const callback = keyMap[key] ?? (alias ? keyMap[alias] : undefined)

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