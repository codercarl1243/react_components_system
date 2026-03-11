import { TabPanelProps } from '@/components/tablist/tablist.type'
import clsx from 'clsx'

export default function Panel({
  className,
  itemId,
  tabId,
  panelId,
  hidden,
  ...props
}: TabPanelProps) {
  return (
    <div
      {...props}
      id={panelId}
      data-panel-id={itemId}
      className={clsx('tablist__content-panel', className)}
      role="tabpanel"
      aria-labelledby={tabId}
      tabIndex={-1}
      hidden={hidden}
    />
  )
}
