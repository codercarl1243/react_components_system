'use client'

import { useRouter } from 'next/navigation'
import { useRef } from 'react'

const LONG_PRESS_THRESHOLD = 200 // milliseconds

/**
 * Hook providing event handlers for a post/card that delegate navigation and context-menu behaviour to an inner link.
 *
 * The handlers:
 * - handleClick: navigates to `href` on a left-click unless the press duration exceeds the long-press threshold (used to allow text selection and other long-press interactions). Non-left clicks are ignored to allow default browser behaviour (e.g. middle-click, back/forward).
 * - handleMouseDown / handleMouseUp: track press duration used by `handleClick`.
 * - handleContextMenu: if the user right-clicks the card (but not the link itself), dispatches a synthetic `contextmenu` event at the centre of the inner anchor so the link's context menu actions (open in new tab, copy link, etc.) are available.
 *
 * @param href - Target URL to navigate to when an ordinary left-click is detected.
 * @returns An object containing { handleClick, handleMouseDown, handleMouseUp, handleContextMenu } event handlers for attaching to the card element.
 */
export default function usePostCard(href: string) {
    const router = useRouter()
    const mouseDownTimeRef = useRef<number>(0)

    const navigate = () => router.push(href)

    const handleClick = (e: React.MouseEvent) => {
        console.log("e.button", e.button)
        if (e.button !== 0) {
        // Don't prevent default - let browser handle back/forward/middle-click etc.
        return
    }
        // Don't navigate if it was a long press (for text selection etc)
        const holdDuration = Date.now() - mouseDownTimeRef.current
        const wasLongPress = holdDuration > LONG_PRESS_THRESHOLD

        if (wasLongPress) return

        navigate()
    }

    const handleMouseDown = () => {
        mouseDownTimeRef.current = Date.now()
    }

    const handleMouseUp = () => {
        mouseDownTimeRef.current = 0
    }

    const handleContextMenu = (e: React.MouseEvent) => {
        console.log("handleContextMenu", e)
        // Don't interfere if they right-clicked the actual link
        // if ((e.target as HTMLElement).closest('a')) {
        //     return; // Let the link handle it naturally
        // }

        // For right-clicks elsewhere on card, redirect to the link
        const link = e.currentTarget.querySelector('a');
        if (link) {
            const rect = link.getBoundingClientRect();
            link.dispatchEvent(new MouseEvent('contextmenu', {
                bubbles: true,
                clientX: rect.left + rect.width / 2,
                clientY: rect.top + rect.height / 2,
            }));
        }
    };
    return { handleClick, handleMouseDown, handleMouseUp, handleContextMenu }
}
