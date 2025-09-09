'use client';
import type { TabListProps } from "@/components/tablist/tablist.type";
import Tab from "@/components/tablist/tab";
import useTablist from "@/components/tablist/useTablist";
import Panel from "@/components/tablist/panel";

export default function TabList({ defaultActiveTabId, tabs, orientation = "horizontal", ...props }: TabListProps) {

    const { activeId,
        setActiveTab,
        tablistRef,
        handleKeyDown
    } = useTablist(defaultActiveTabId)

    if (!tabs?.length) return null;

    return (
        <div className="tablist"  >
            <div
                className="tablist__header"
                role="tablist"
                aria-orientation={orientation}
                ref={tablistRef}
                onKeyDown={handleKeyDown}
                {...props}
            >
                {tabs.map(item => (
                    <Tab
                        key={item.id}
                        id={item.id}
                        isSelected={activeId === item.id}
                        onClick={() => setActiveTab(item.id)}
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