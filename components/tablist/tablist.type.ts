import type { ComponentPropsWithRef, ReactNode } from 'react'
import type { ButtonProps } from '@/components/button/button.type'

export type TabProps = Readonly<{
  isSelected: boolean;
} & Omit<ButtonProps,
  'role' | 'tabIndex' | 'aria-selected' | 'aria-controls'
>>

export type TabPanelProps = Omit<ComponentPropsWithRef<'div'>,
  'role' | 'tabIndex' | 'aria-labelledby'
>

export type TabItem = Readonly<{
  id: string;
  panelContent: ReactNode;
  tabLabel: ReactNode;
}>

export type TabListProps = Readonly<{
  tabListName: string;
  tabs: TabItem[];
  orientation?: 'vertical' | 'horizontal';
  defaultActiveTabId?: string;
  variant: ButtonProps['variant'];
  // TODO: figure out what I want to do re: heading for the tablist which can be used as an aria label or a Heading element
} & Omit<ComponentPropsWithRef<'div'>, 'role' | 'onKeyDown' | 'aria-orientation' | 'aria-label'>>;
