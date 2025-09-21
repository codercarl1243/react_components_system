'use client'

import { useRouter } from 'next/navigation'
import { useRef } from 'react'

const LONG_PRESS_THRESHOLD = 200 // milliseconds
/**
 * Hook providing event handlers for a post/card that delegate navigation and context-menu behaviour to an inner link.
 *
 * The handlers:
 * - handleClick: navigates to `href` on a left-click unless the press duration exceeds the long-press threshold (used to allow text selection and other long-press interactions). Non-left clicks are ignored to allow default browser behaviour (e.g. middle-click, back/forward).
 * - handleMouseDown / handleMouseUp / handleMouseLeave: track press duration used by `handleClick`.
 *
 * @param href - Target URL to navigate to when an ordinary left-click is detected.
 * @returns An object containing { handleClick, handleMouseDown, handleMouseUp, handleMouseLeave } event handlers for attaching to the card element.
 */
export default function usePostCard(href: string) {
    const router = useRouter()
    const mouseDownTimeRef = useRef<number | null>(null)

    const navigate = () => router.push(href)

    const handleClick = (e: React.MouseEvent) => {
        if (e.defaultPrevented) return
        const target = e.target as HTMLElement | null
        if (target?.closest('a,button,[role="button"],input,textarea,select')) return
        // Let the browser handle new-tab / window behaviour
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
        // Don't navigate if it was a long press (for text selection etc)
        const mouseDownAt = mouseDownTimeRef.current
        const wasLongPress = mouseDownAt !== null && (Date.now() - mouseDownAt) > LONG_PRESS_THRESHOLD

        if (wasLongPress) return

        navigate()
    }

    const handleMouseDown = () => {
        mouseDownTimeRef.current = Date.now()
    }

    const handleMouseUp = () => {
        mouseDownTimeRef.current = null
    }

    const handleMouseLeave = () => {
        mouseDownTimeRef.current = null
    }

    /** BUGGY TODO: fix before using */
    // const handleContextMenu = (e: React.MouseEvent) => {
    //     console.log("handleContextMenu", e)
    //     // Don't interfere if they right-clicked the actual link
    //     // if ((e.target as HTMLElement).closest('a')) {
    //     //     return; // Let the link handle it naturally
    //     // }

    //     // For right-clicks elsewhere on card, redirect to the link
    //     const link = e.currentTarget.querySelector('a');
    //     if (link) {
    //         const rect = link.getBoundingClientRect();
    //         link.dispatchEvent(new MouseEvent('contextmenu', {
    //             bubbles: true,
    //             clientX: rect.left + rect.width / 2,
    //             clientY: rect.top + rect.height / 2,
    //         }));
    //     }
    // };
    return { handleClick, handleMouseDown, handleMouseUp, handleMouseLeave }
}
