'use client';

import { logWarning } from '@/lib/logging/log'
import { isNotNullish } from '@/lib/utils/guards';
import { handleKeyPress } from '@/lib/utils/keyboardHandlers'
import type { KeyPressCallbackMap } from '@/lib/utils/keyboardHandlers.type'
import { useRef, useState, useEffect, useCallback, type KeyboardEvent } from 'react'
import type { Tab, TabItem } from '@/components/tablist/tablist.type';

export default function useTablist(defaultTabId?: string, tabs?: TabItem[]) {
  const tablistRef = useRef<HTMLDivElement>(null)
  const [activeId, setActiveId] = useState<string | undefined>(defaultTabId ?? tabs?.[0]?.id)

  const getTabs = useCallback(() => {
    if (!tablistRef.current) return []
    return Array.from(
      tablistRef.current.querySelectorAll('[role="tab"]')
    )
      .filter(tab =>
        tab.getAttribute('aria-disabled') !== 'true' &&
        tab.getAttribute('disabled') !== 'true'
      )
      .map(tab => {
        const id = tab.getAttribute('data-tab-id') ?? tab.id.replace('tab-', '');
        const panelId = tab.getAttribute('aria-controls')
        if (!id || !panelId) return null

        return {
          id,
          panelId,
          element: tab
        }
      })
      .filter(
        (tab): tab is Tab =>
          isNotNullish(tab)
      )
  }, [])

  // Initialize active tab
  useEffect(() => {
    const tabs = getTabs();
    if (tabs.length === 0) return; // No tabs to work with

    if (activeId) {
      const activeTabExists = tabs.some(tab => tab.id === activeId)
      if (activeTabExists) {
        return;
      }

      logWarning(`Tab with id "${activeId}" not found, falling back to first tab`);
    }

    setActiveId(tabs[0].id);
  }, [activeId, getTabs])

  const focusTab = useCallback((id: string) => {
    if (!id) return;
    const tabs = getTabs();
    const tab = tabs.find(t => t.id === id);
    if (!tab ||
      tab.element.getAttribute('aria-disabled') === 'true' ||
      tab.element.getAttribute('disabled') === 'true'
    ) return;

    tab.element.focus();
    setActiveId(id);
  }, [getTabs])

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    const activeElement = document.activeElement as HTMLElement;

    if (activeElement?.role !== 'tab') return;

    if (!tablistRef.current?.contains(activeElement)) return;

    const tabs = getTabs();
    const currentIndex = tabs.findIndex(tab => tab.id === activeId);
    if (currentIndex === -1) return;

    const orientation = tablistRef.current?.getAttribute('aria-orientation') || 'horizontal';
    const lastIndex = tabs.length - 1;

    const keyMap: KeyPressCallbackMap = {
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
    }

    handleKeyPress(e, keyMap);
  }, [activeId, getTabs, focusTab])

  return {
    activeId,
    setActiveTab: setActiveId,
    tablistRef,
    handleKeyDown
  }
}
