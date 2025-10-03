'use client'
import type { TabListProps } from '@/components/tablist/tablist.type'
import Tab from '@/components/tablist/tab'
import useTablist from '@/components/tablist/useTablist'
import Panel from '@/components/tablist/panel'
import clsx from 'clsx'

export default function TabList ({
    defaultActiveTabId, 
    tabs, 
    orientation = 'horizontal', 
    className, 
    'data-variant': buttonVariant,
    ...props }: TabListProps) {
  const {
    activeId,
    setActiveTab,
    tablistRef,
    handleKeyDown,
  } = useTablist(defaultActiveTabId)

  if (!tabs?.length) return null

  return (
        <div className={clsx('tablist', className)} {...props}>
            <div
                className="tablist__header"
                role="tablist"
                aria-orientation={orientation}
                ref={tablistRef}
                onKeyDown={handleKeyDown}
            >
                {tabs.map(item => (
                    <Tab
                        key={item.id}
                        id={item.id}
                        isSelected={activeId === item.id}
                        onClick={() => setActiveTab(item.id)}
                        data-style={activeId === item.id ? "outlined" : "filled"}
                        data-variant={buttonVariant}
                    >
                        {item.tabLabel}
                    </Tab>
                ))}
            </div>
            <div className="tablist__content">
                {tabs.map(item => (
                    <Panel
                        key={`panel-${item.id}`}
                        id={item.id}
                        hidden={activeId !== item.id}
                    >
                        {item.panelContent}
                    </Panel>
                ))}
            </div>
        </div>
  )
}
