'use client';
import { handleKeyPress } from '@/lib/utils/keyboardHandlers';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { usePathname } from 'next/navigation';
import { type RefObject, useEffect, useRef, useState } from 'react'

type SidebarType = {
    sidebarIsOpen: boolean;
    handleSideBarOpenState: (state?: boolean) => void;
    openButtonRef: RefObject<HTMLButtonElement | null>;
    sidebarRef: RefObject<HTMLElement | null>;
    hasInteracted: boolean;
}

export default function useSidebar(): SidebarType {
    const sidebarRef = useRef<HTMLElement | null>(null);
    const openButtonRef = useRef<HTMLButtonElement>(null);
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false)
    const pathname = usePathname()

    const handleSideBarOpenState = (state?: boolean) => {
        if (!hasInteracted) setHasInteracted(true) // Only set once
        setSidebarIsOpen(prev => state !== undefined ? state : !prev);
    };

    useFocusTrap({ containerRef: sidebarRef, isActive: sidebarIsOpen });

    useEffect(() => {
            setSidebarIsOpen(false)
    }, [pathname])
    
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (!sidebarIsOpen) return;

            handleKeyPress(event, {
                'Escape': () => handleSideBarOpenState(false)
            })
        }

        if (sidebarIsOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [sidebarIsOpen]);

    useEffect(() => {
        let focusTimeout: NodeJS.Timeout;

        if (sidebarIsOpen) {
            focusTimeout = setTimeout(() => {
                const firstFocusable = sidebarRef.current?.querySelector(
                    'button:not(.sidebar-toggle-button--close), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                ) as HTMLElement;

                firstFocusable?.focus();
            }, 100);
        } else {
            focusTimeout = setTimeout(() => {
                openButtonRef.current?.focus();
            }, 100);
        }

        return () => {
            clearTimeout(focusTimeout);
        };
    }, [sidebarIsOpen]);

    return {
        handleSideBarOpenState, hasInteracted, sidebarIsOpen, sidebarRef, openButtonRef
    }
}
