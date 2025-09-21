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
/**
 * A prominently styled note component for highlighting important information within blog posts.
 * 
 * This component creates an accessible, visually distinct callout box with an information icon.
 * It automatically handles accessibility by labelling via `aria-labelledby` using the first child, and provides
 * semantic structure with ARIA roles. The component intelligently manages IDs for proper
 * accessibility relationships.
 * 
 * @component
 * @example
 * ```tsx
 * <PostNote>
 *   <Heading headingLevel={4}>Important Note</Heading>
 *   <p>This is some important information that readers should pay attention to.</p>
 * </PostNote>
 * ```
 * 
 * @param children - The content to display in the note. The first child serves as the labelling element referenced by `aria-labelledby`. Can include headings, paragraphs, code blocks, links, and other content.
 * @param className - Additional CSS class names to apply to the note container. These are merged with the default 'post-note width-bleed' classes.
 * @param props - All other standard HTML div element attributes (id, data-*, aria-*, etc.)
 * 
 * @returns A styled note container with an information icon, or null if no children are provided.
 * 
 * **Future Considerations:**
 * - Contains TODO for potential expandable/collapsible functionality
 * - Structure supports future enhancement without breaking changes
 * 
 */
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