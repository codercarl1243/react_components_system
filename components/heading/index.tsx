import clsx from 'clsx'
import type { HeadingPropsType } from '@/components/heading/heading.type'
import { createElement } from 'react'
import Icon from '@/components/icon'
import {extractTextFromChildren, getIconSize, getSizeClass} from '@/components/heading/utils'
import { generateSlug } from '@/lib/utils/generateSlug'
/**
 * Render a semantic heading element with configurable visual size.
 *
 * Creates an `h{n}` element (where `n` is `headingLevel`).
 * Applies the component's base font class together with a size class derived from `headingSize`.
 * `headingSize` lets you control the visual font size independently of the semantic heading level.
 *
 * @param headingLevel - Semantic heading level to render (1–6). Defaults to `3`.
 * @param headingSize - Visual size level used to pick the CSS size class (1–6). Defaults to `headingLevel`.
 * @param icon - Optional icon to render before the heading text. When provided, adds spacing between the icon and text.
 * @param id - Optional custom ID for the anchor. If not provided, auto-generated from heading text.
 * @returns A React element for the requested heading tag with composed classes and forwarded props.
 */

export default function Heading({
  headingLevel = 3,
  headingSize = headingLevel,
  children,
  className,
  icon,
  id,
  ...props
}: HeadingPropsType) {

 const headingId = id || generateSlug(extractTextFromChildren(children))

 const content = icon ? (
    <>
      <Icon icon={icon} size={getIconSize(headingSize)} />
      <span className='heading__content'>{children}</span>
    </>
  ) : <span className='heading__content'>{children}</span>;

  return createElement(
    `h${headingLevel}`,
    {
      id: headingId,
      className: clsx('font-main heading', 
        {"heading-w-icon": icon},
        className, 
        getSizeClass(headingSize)),
      ...props
    },
    content
  )
}
