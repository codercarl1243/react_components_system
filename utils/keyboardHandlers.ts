import type { KeyPressCallbackMap, KeyPressEventType } from "@/utils/keyboardHandlers.type"

export function handleKeyPress(
  event: KeyPressEventType,
  keyMap: KeyPressCallbackMap
) {
  // Canonicalise: single chars -> lower-case, keep named keys verbatim.
  const raw = event.key
  const key = raw && raw.length === 1 ? raw.toLowerCase() : raw
  const alias =
    key === ' ' ? 'Space'
      : key === 'Spacebar' ? 'Space'
        : key === 'Esc' ? 'Escape'
          : undefined
          
  const callback =
    keyMap[key] ?? (alias ? keyMap[alias] : undefined)

  if (!callback) return

  event.preventDefault()
  callback(event)
}
