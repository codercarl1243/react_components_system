'use client';

import clsx from 'clsx'
import Button from '../button'
import { TabProps } from './tablist.type'

export default function Tab({
  isSelected,
  onClick,
  className,
  itemId,
  tabId,
  panelId,
  children,
  ...props
}: TabProps) {
  return (
    <Button
      {...props}
      role="tab"
      id={tabId}
      data-tab-id={itemId}
      aria-selected={isSelected}
      aria-controls={panelId}
      tabIndex={isSelected ? 0 : -1}
      onClick={onClick}
      className={clsx('tablist__header-tab', className)}
    >
      {children}
    </Button>
  )
}
