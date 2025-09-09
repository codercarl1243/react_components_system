'use client';
import { handleKeyPress, type KeyCallbackMap } from "@/utils/keyboardHandlers";
import { useRef, useState, useEffect, useCallback } from "react";

export default function useTablist(defaultTabId?: string) {
    const tablistRef = useRef<HTMLDivElement>(null);
    const [activeId, setActiveId] = useState<string | undefined>(defaultTabId);

    const getTabs = useCallback(() => {
        if (!tablistRef.current) return [];
        return Array.from(
            tablistRef.current.querySelectorAll('[role="tab"]')
        )
            .filter(tab =>
                tab.getAttribute('aria-disabled') !== 'true' &&
                tab.getAttribute('disabled') !== 'true'
            )
            .map(tab => ({
                id: tab.id.replace('tab-', ''),
                element: tab as HTMLElement
            }));
    }, []);

    // Initialize active tab
    useEffect(() => {
        const tabs = getTabs();
        if (tabs.length === 0) return; // No tabs to work with

        if (activeId) {
            const activeTabExists = tabs.some(tab => tab.id === activeId);
            if (activeTabExists) {
                return;
            }
            console.warn(`Tab with id "${activeId}" not found, falling back to first tab`);
        }

        setActiveId(tabs[0].id);
    }, [activeId, getTabs]);

    const focusTab = useCallback((id: string) => {
        const tabButton = document.getElementById(`tab-${id}`);
        if (!tabButton ||
            tabButton.getAttribute('aria-disabled') === 'true' ||
            tabButton.getAttribute('disabled') === 'true'
        ) return;
        tabButton.focus();
        setActiveId(id);
    }, []);

    const focusPanel = useCallback((id: string | undefined) => {
        if (!id) return;
        const panel = document.getElementById(`panel-${id}`);
        panel?.focus();
    }, []);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
        const activeElement = document.activeElement as HTMLElement;
        const role = activeElement?.getAttribute('role');
        if (role !== 'tab') return;

        if (!tablistRef.current?.contains(activeElement)) return;

        const tabs = getTabs();
        const currentIndex = tabs.findIndex(tab => tab.id === activeId);
        if (currentIndex === -1) return;

        const orientation = tablistRef.current?.getAttribute('aria-orientation') || 'horizontal';
        const lastIndex = tabs.length - 1;

        const keyMap: KeyCallbackMap = {
            ArrowRight: () => {
                if (orientation === 'horizontal') {
                    const next = (currentIndex + 1) % tabs.length;
                    focusTab(tabs[next].id);
                }
            },
            ArrowLeft: () => {
                if (orientation === 'horizontal') {
                    const prev = (currentIndex - 1 + tabs.length) % tabs.length;
                    focusTab(tabs[prev].id);
                }
            },
            ArrowDown: () => {
                if (orientation === 'vertical') {
                    const next = (currentIndex + 1) % tabs.length;
                    focusTab(tabs[next].id);
                }
            },
            ArrowUp: () => {
                if (orientation === 'vertical') {
                    const prev = (currentIndex - 1 + tabs.length) % tabs.length;
                    focusTab(tabs[prev].id);
                }
            },
            Home: () => focusTab(tabs[0].id),
            End: () => focusTab(tabs[lastIndex].id),
            Enter: () => focusPanel(tabs[currentIndex].id),
            Space: () => focusPanel(tabs[currentIndex].id)
        };

        handleKeyPress(e, keyMap);
    }, [activeId, getTabs, focusTab, focusPanel]);


    return {
        activeId,
        setActiveTab: setActiveId,
        tablistRef,
        handleKeyDown
    };
}