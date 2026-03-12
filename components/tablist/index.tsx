'use client';

import type { TabListProps } from '@/components/tablist/tablist.type'
import Tab from '@/components/tablist/tab'
import useTablist from '@/components/tablist/useTablist'
import Panel from '@/components/tablist/panel'
import clsx from 'clsx'
import { Block } from '@/components/primitives'

export default function TabList({
    defaultActiveTabId,
    tabListName,
    tabs,
    orientation = 'horizontal',
    className,
    variant = "accent",
    ...props }: TabListProps) {

    const {
        activeId,
        setActiveTab,
        tablistRef,
        handleKeyDown,
    } = useTablist(defaultActiveTabId)

    if (!tabs?.length) return null

    return (
        <Block
            className={clsx(`tablist surface-frame tablist--${orientation}`, className)}
            data-orientation={orientation}
            {...props}
            variant='light'
            variantAppearance='filled'
            paint="all"
        >
            <div
                className="tablist__header"
                role="tablist"
                aria-orientation={orientation}
                ref={tablistRef}
                onKeyDown={handleKeyDown}
            >
                {tabs.map(item => {
                    const tabId = `${tabListName}-tab-${item.id}`;
                    const panelId = `${tabListName}-panel-${item.id}`;

                    return (
                        <Tab
                            key={tabId}
                            itemId={item.id}
                            tabId={tabId}
                            panelId={panelId}
                            isSelected={activeId === item.id}
                            onClick={() => setActiveTab(item.id)}
                            variantAppearance={activeId === item.id ? "tonal" : "filled"}
                            variant={activeId === item.id ? variant : "light"}
                        >
                            {item.tabLabel}
                        </Tab>
                    )
                })}
            </div>
            <div className="tablist__content">
                {tabs.map(item => {
                    const tabId = `${tabListName}-tab-${item.id}`;
                    const panelId = `${tabListName}-panel-${item.id}`;
                    return (
                        <Panel
                            key={`${tabListName}-panel-${item.id}`}
                            itemId={item.id}
                            tabId={tabId}
                            panelId={panelId}
                            hidden={activeId !== item.id}
                        >
                            {item.panelContent}
                        </Panel>
                    )
                })
                }
            </div>
        </Block>
    )
}
