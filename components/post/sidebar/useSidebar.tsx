'use client';
import { handleKeyPress } from '@/lib/utils/keyboardHandlers';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { usePathname } from 'next/navigation';
import { type RefObject, useEffect, useRef, useState } from 'react'
import { useClickOutside } from '@/hooks/useClickOutside';

type SidebarType = {
    sidebarIsOpen: boolean | undefined;
    handleSideBarOpenState: (state?: boolean) => void;
    buttonRef: RefObject<HTMLButtonElement | null>;
    sidebarRef: RefObject<HTMLElement | null>;
    wrapperRef: RefObject<HTMLDivElement | null>;
}

export default function useSidebar(): SidebarType {
    const sidebarRef = useRef<HTMLElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [sidebarIsOpen, setSidebarIsOpen] = useState<SidebarType['sidebarIsOpen']>(undefined);
    const wrapperRef = useClickOutside<HTMLDivElement>(null, () => handleSideBarOpenState(false), Boolean(sidebarIsOpen));
    const pathname = usePathname()

    const handleSideBarOpenState = (state?: boolean) => {
        setSidebarIsOpen(prev => state ?? !prev);
    };

    useFocusTrap({ containerRef: sidebarRef, isActive: Boolean(sidebarIsOpen) });

    useEffect(() => {
            if (sidebarIsOpen) setSidebarIsOpen(false)
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
                buttonRef.current?.focus();
            }, 100);
        }

        return () => {
            clearTimeout(focusTimeout);
        };
    }, [sidebarIsOpen]);

    return {
        handleSideBarOpenState, sidebarIsOpen, sidebarRef, buttonRef, wrapperRef
    }
}
