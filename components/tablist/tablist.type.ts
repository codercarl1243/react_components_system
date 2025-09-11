import type { ReactNode, HTMLAttributes, ComponentPropsWithRef } from 'react'
import { BaseButtonProps } from '../button/button.type'

export type TabProps = Readonly<{
  id: string;
  isSelected: boolean;
} & Omit<BaseButtonProps,
  'id' | 'role' | 'tabIndex' | 'aria-selected' | 'aria-controls'
>>

export type TabPanelProps = Readonly<{
  id: string;
} & Omit<ComponentPropsWithRef<'div'>,
  'id' | 'role' | 'tabIndex' | 'aria-labelledby'
>>

export type TabItem = Readonly<{
  id: string;
  panelContent: ReactNode;
  tabLabel: ReactNode;
}>

export type TabListProps = Readonly<{
  tabs: TabItem[];
  orientation?: 'vertical' | 'horizontal';
  defaultActiveTabId?: string;
  // TODO: figure out what I want to do re: heading for the tablist which can be used as an aria label or a Heading element
} & Omit<HTMLAttributes<HTMLDivElement>, 'role' | 'onKeyDown' | 'aria-orientation' | 'aria-label'>>;
