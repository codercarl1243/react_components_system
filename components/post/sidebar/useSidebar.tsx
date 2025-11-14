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
    menuRef: RefObject<HTMLElement | null>;
    wrapperRef: RefObject<HTMLDivElement | null>;
}

export default function useSidebar(): SidebarType {
    const [sidebarIsOpen, setSidebarIsOpen] = useState<SidebarType['sidebarIsOpen']>(undefined);
    
    const menuRef = useRef<HTMLElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const wrapperRef = useClickOutside<HTMLDivElement>(null, () => handleSideBarOpenState(false), Boolean(sidebarIsOpen));
    
    const pathname = usePathname()

    const handleSideBarOpenState = (state?: boolean) => {
        setSidebarIsOpen(prev => state ?? !prev);
    };

    useFocusTrap({ containerRef: menuRef, isActive: Boolean(sidebarIsOpen) });

    useEffect(() => {
            if (sidebarIsOpen) setSidebarIsOpen(false)
    }, [pathname])
    
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (!sidebarIsOpen) return;

            handleKeyPress(event, {
                'Escape': () => {
                    handleSideBarOpenState(false)
                    setTimeout(() => buttonRef.current?.focus(), 0)
                }
            })
        }

        if (sidebarIsOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [sidebarIsOpen]);

    return {
        handleSideBarOpenState, sidebarIsOpen, menuRef, buttonRef, wrapperRef
    }
}
