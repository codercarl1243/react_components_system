import { TabPanelProps } from './tablist.type'
import clsx from 'clsx'

export default function Panel ({
  className,
  id,
  ref,
  hidden,
  children,
  ...props
}: TabPanelProps) {
  return (
        <div
            {...props}
            ref={ref}
            id={`panel-${id}`}
            className={clsx('tablist__content-panel', className)}
            role="tabpanel"
            aria-labelledby={`tab-${id}`}
            tabIndex={-1}
            hidden={hidden}
        >
            {children}
        </div>
  )
}
