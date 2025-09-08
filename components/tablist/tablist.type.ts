import type { ReactElement, ReactNode, HTMLAttributes } from "react";

type TabPanelWithLabel = {
        label: ReactNode;
        id: string;
}

type TabPanelSansLabel = {
        label: never;
        id: string;
}

export type TabPanelProps = TabPanelWithLabel | TabPanelSansLabel & HTMLAttributes<HTMLDivElement>;


export type TabListProps = {
    onChange?: (tabId: string) => void;
    activeTabId?: string;
    defaultActiveTabId?: string;
    orientation?: 'vertical' | 'horizontal';
    children?: ReactElement<TabPanelProps> | ReactElement<TabPanelProps>[];
} & HTMLAttributes<HTMLDivElement>;