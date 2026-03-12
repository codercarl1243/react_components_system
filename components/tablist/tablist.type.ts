import type { ComponentProps, ReactNode } from 'react'
import type { ButtonProps } from '@/components/button/button.type'

type commonProps = {
  itemId: string;
  tabId: string;
  panelId: string;
}

export type Tab = { id: string; panelId: string; element: HTMLElement };

export type TabProps = Readonly<{
  isSelected: boolean;
} & commonProps & Omit<ButtonProps,
  'id' | 'role' | 'tabIndex' | 'aria-selected' | 'aria-controls'
>>

export type TabPanelProps = Omit<ComponentProps<'div'>,
  'id' | 'role' | 'tabIndex' | 'aria-labelledby'
> & commonProps;

export type TabItem = Readonly<{
  id: string;
  panelContent: ReactNode;
  tabLabel: ReactNode;
}>;

export type TabListProps = Readonly<{
  tabListName: string;
  tabs: TabItem[];
  orientation?: 'vertical' | 'horizontal';
  defaultActiveTabId?: string;
  variant: ButtonProps['variant'];
  // TODO: figure out what I want to do re: heading for the tablist which can be used as an aria label or a Heading element
} & Omit<ComponentProps<'div'>, 'children' | 'role' | 'onKeyDown' | 'aria-orientation' | 'aria-label'>>;
