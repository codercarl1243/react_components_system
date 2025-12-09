'use client'
import type { TabListProps } from '@/components/tablist/tablist.type'
import Tab from '@/components/tablist/tab'
import useTablist from '@/components/tablist/useTablist'
import Panel from '@/components/tablist/panel'
import clsx from 'clsx'

export default function TabList ({
    defaultActiveTabId, 
    tabListName,
    tabs, 
    orientation = 'horizontal', 
    className, 
    variant,
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
                {tabs.map(item => {
                    const tabId = `${tabListName}-tab-${item.id}`;

                    return (
                    <Tab
                        key={tabId}
                        id={item.id}
                        isSelected={activeId === item.id}
                        onClick={() => setActiveTab(item.id)}
                        variantAppearance={"filled"}
                        variant={activeId === item.id ? "neutral" : variant }
                    >
                        {item.tabLabel}
                    </Tab>
                )
                })}
            </div>
            <div className="tablist__content">
                {tabs.map(item => (
                    <Panel
                        key={`${tabListName}-panel-${item.id}`}
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
