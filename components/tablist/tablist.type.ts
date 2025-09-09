import type { ReactNode, HTMLAttributes, ComponentPropsWithRef } from "react";
import { BaseButtonProps } from "../button/button.type";

export interface TabProps extends Omit<BaseButtonProps,
  'id' | 'role' | 'tabIndex' | 'aria-selected' | 'aria-controls'
> {
  id: string;
  isSelected: boolean;
}

export interface TabPanelProps extends ComponentPropsWithRef<'div'> {
  id: string;
}

export type TabItem = {
  id: string;
  panelContent: ReactNode;
  tabLabel: ReactNode;
}

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  tabs: TabItem[];
  orientation?: 'vertical' | 'horizontal';
  defaultActiveTabId?: string;
  // TODO: figure out what I want to do re: heading for the tablist which can be used as an aria label or a Heading element
}
