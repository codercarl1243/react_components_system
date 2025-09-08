import type { ReactElement, ReactNode, HTMLAttributes, ComponentPropsWithRef } from "react";

type BasePanel = ComponentPropsWithRef<'div'> & { id: string };
type TabPanelWithLabel = BasePanel & {label: ReactNode;}
type TabPanelSansLabel = BasePanel & { label: never;}

export type TabPanelProps = TabPanelWithLabel | TabPanelSansLabel;

export type TabListProps = {
    onChange?: (tabId: string) => void;
    activeTabId?: string;
    defaultActiveTabId?: string;
    orientation?: 'vertical' | 'horizontal';
    children?: ReactElement<TabPanelProps> | ReactElement<TabPanelProps>[];
} & HTMLAttributes<HTMLDivElement>;