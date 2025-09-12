import { Children, useId, cloneElement, isValidElement, ReactElement, type ComponentProps } from 'react'
import Icon from '../icon'
import { RiInformationLine } from '@remixicon/react'
import clsx from 'clsx'

type ElementWithId = ReactElement<{ id?: string }>;

function isDomElement(element: unknown): element is ElementWithId {
  return (
    isValidElement(element) &&
    typeof element === 'object' &&
    element !== null &&
    'props' in element &&
    typeof element.props === 'object' &&
    element.props !== null
  )
}

export default function PostNote({ className, children, ...props }: ComponentProps<'div'>) {
  const id = useId()
  const childArray = Children.toArray(children)
  if (childArray.length === 0) return null

  const [firstChild, ...restChildren] = childArray
  const isFirstChildDomElement = isDomElement(firstChild)
  const getElementId = (element: ElementWithId): string | undefined => element.props?.id
  const existingId = isFirstChildDomElement ? getElementId(firstChild) : undefined
  const labelId = existingId || id

  // Only assign id to DOM elements, otherwise wrap in span
  const firstChildWithId =
    isFirstChildDomElement && typeof firstChild.type === 'string'
      ? cloneElement(firstChild, { id: labelId })
      : <span id={labelId}>{firstChild}</span>

  // TODO: Consider making the content expandable and hidden
  return (
    <div
      // data-expanded={"false"}
      className={clsx(className, 'post-note width-bleed')}
      role={'note'}
      aria-labelledby={labelId}
      {...props}>
      <div className="post-note__first">
        <Icon icon={RiInformationLine} size={64} className="post-note__icon" />
        {firstChildWithId}
      </div>
      {restChildren.length > 0 &&
        <div className="flow-4 post-note__content">
          {restChildren}
        </div>
      }
    </div>
  )
}