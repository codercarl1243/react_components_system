import { useEffect, type RefObject } from 'react'

interface UseFocusTrapOptions {
    /** Whether the focus trap is active */
    isActive: boolean
    /** Ref to the container element that should trap focus */
    containerRef: RefObject<HTMLElement | null>
    /** Custom selector for focusable elements (optional) */
    focusableSelector?: string
}

/**
 * Custom hook that traps focus within a container element.
 * Prevents Tab navigation from escaping the container when active.
 * 
 * @param options Configuration options for the focus trap
 */
export function useFocusTrap({
    containerRef,
    isActive,
    focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
}: UseFocusTrapOptions) {

    useEffect(() => {
        if (!isActive) return

        function handleFocusTrap(event: KeyboardEvent) {
            if (event.key !== 'Tab') return

            const focusableElements = containerRef.current?.querySelectorAll(focusableSelector)

            if (!focusableElements || focusableElements.length === 0) return

            const firstFocusable = focusableElements[0] as HTMLElement
            const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement
            const activeElement = document.activeElement as HTMLElement

            // Shift+Tab on first element -> focus last element
            if (event.shiftKey && activeElement === firstFocusable) {
                event.preventDefault()
                lastFocusable.focus()
                return
            }

            // Tab on last element -> focus first element
            if (!event.shiftKey && activeElement === lastFocusable) {
                event.preventDefault()
                firstFocusable.focus()
                return
            }

            // If focus somehow escapes the container, bring it back
            const containerContainsFocus = containerRef.current?.contains(activeElement)
            if (!containerContainsFocus) {
                event.preventDefault()
                firstFocusable.focus()
            }
        }

        document.addEventListener('keydown', handleFocusTrap)

        return () => {
            document.removeEventListener('keydown', handleFocusTrap)
        }
    }, [isActive, containerRef, focusableSelector])
}