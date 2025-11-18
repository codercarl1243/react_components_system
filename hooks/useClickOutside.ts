import { useEffect, useRef, type RefObject } from 'react'

/**
 * Hook that triggers a callback when a click occurs outside the referenced element.
 *
 * @param externalRef - Optional ref from parent component. If not provided, creates internal ref.
 * @param callback - Function called when click outside is detected. Memoise with useCallback to avoid unnecessary re-runs.
 * @param enabled - Optional boolean to enable/disable the listener. Defaults to true.
 * @returns RefObject to attach to the element you want to detect clicks outside of.
 *
 * @example
 * // Basic usage with internal ref and memoized callback
 * const handleClose = useCallback(() => setIsOpen(false), []);
 * const ref = useClickOutside(handleClose);
 * return <div ref={ref}>Content</div>;
 *
 * @example
 * // Usage with external ref
 * const myRef = useRef(null);
 * useClickOutside(myRef, () => setIsOpen(false));
 * return <div ref={myRef}>Content</div>;
 *
 * @example
 * // Usage with conditional enable
 * const ref = useClickOutside(() => setIsOpen(false), isOpen);
 * return <div ref={ref}>Content</div>;
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  externalRef?: RefObject<T | null> | null,
  callback?: () => void,
  enabled: boolean = true
): RefObject<T | null>{
  const internalRef = useRef<T>(null)
  const ref = externalRef || internalRef

  useEffect(() => {
    // Don't attach listener if disabled or no callback
    if (!enabled || !callback) return

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [ref, callback, enabled])

  return ref
}