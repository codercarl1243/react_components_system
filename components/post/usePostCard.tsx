'use client'

import { useRouter } from 'next/navigation'
import { useRef } from 'react'

const LONG_PRESS_THRESHOLD = 200 // milliseconds

export default function usePostCard(href: string) {
    const router = useRouter()
    const mouseDownTimeRef = useRef<number>(0)

    const navigate = () => router.push(href)

    const handleClick = (e: React.MouseEvent) => {
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
    return { handleClick, handleMouseDown, handleMouseUp }
}
