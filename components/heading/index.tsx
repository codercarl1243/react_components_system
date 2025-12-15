import clsx from 'clsx'
import type { HeadingPropsType, ValidHeadingTag } from '@/components/heading/heading.type'
import Icon from '@/components/icon'
import { generateHeadingId, generateHeadingSize, getIconSize, getSizeClass } from '@/components/heading/utils'
import { Block } from '@/components/primitives';

/**
 * Render a semantic heading element with configurable visual size.
 *
 * Creates an `h{n}` element (where `n` is `headingLevel`).
 * Applies the component's base font class together with a size class derived from `headingSize`.
 * `headingSize` lets you control the visual font size independently of the semantic heading level.
 *
 * @param as - Semantic heading tag for the title (e.g. 'h1'–'h6'). Defaults to 'h3'.
 * @param headingSize - Visual size level used to pick the CSS size class (1–6). Defaults to the headingLevel.
 * @param icon - Optional icon to render before the heading text. When provided, adds spacing between the icon and text.
 * @param id - Optional custom ID for the anchor. If not provided, auto-generated from heading text.
 * @returns A React element for the requested heading tag with composed classes and forwarded props.
 */

export default function Heading<T extends ValidHeadingTag = "h3">({
  headingSize,
  children,
  className,
  icon,
  id,
  variant = "secondary",
  ...props
}: HeadingPropsType<T>) {

  const headingId = id || generateHeadingId(children)
  const resolvedHeadingSize = headingSize ?? generateHeadingSize(props.as ?? 'h3');
  const headingClasses = clsx('font-accent heading',
    { "heading-w-icon": icon },
    className,
    getSizeClass(resolvedHeadingSize));

  const content = icon ? (
    <>
      <Icon icon={icon} size={getIconSize(resolvedHeadingSize)} />
      <span className='heading__content'>{children}</span>
    </>
  ) : children;

  return (
    <Block
      id={headingId}
      className={headingClasses}
      variant={variant}
      variantAppearance='outlined'
      {...props}
    >
      {content}
    </Block>
  )
}
