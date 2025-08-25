import type { ReactElement, ReactNode, HTMLAttributes } from "react";

export type TabPanelProps = { 
    label: ReactNode;
    id: string;
} & HTMLAttributes<HTMLDivElement>;


export type TabListProps = {
    onChange?: (tabId: string) => void;
    activeTabId?: string;
    defaultActiveTabId?: string;
    orientation?: 'vertical' | 'horizontal';
    children?: ReactElement<TabPanelProps> | ReactElement<TabPanelProps>[];
} & HTMLAttributes<HTMLDivElement>;