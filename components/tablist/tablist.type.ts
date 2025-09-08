import type { ReactElement, ReactNode, HTMLAttributes, ComponentPropsWithRef } from "react";

type TabPanelWithLabel = {
        label: ReactNode;
        id: string;
}

type TabPanelSansLabel = {
        label: never;
        id: string;
}

export type TabPanelProps = (TabPanelWithLabel | TabPanelSansLabel) & ComponentPropsWithRef<'div'>

export type TabListProps = {
    onChange?: (tabId: string) => void;
    activeTabId?: string;
    defaultActiveTabId?: string;
    orientation?: 'vertical' | 'horizontal';
    children?: ReactElement<TabPanelProps> | ReactElement<TabPanelProps>[];
} & HTMLAttributes<HTMLDivElement>;