import clsx from 'clsx'
import type { HeadingPropsType } from '@/components/heading/heading.type'
import { createElement } from 'react'
import Icon from '@/components/icon'

const getSizeClass = (level: number): string => {
  switch (level) {
    case 1: return 'text-6xl'
    case 2: return 'text-3xl'
    case 3: return 'text-2xl'
    case 4: return 'text-xl'
    case 5: return 'text-lg'
    case 6: return 'text-base'
    default: return 'text-2xl'
  }
}
const getIconSize = (level: number): number => {
  switch (level) {
    case 1: return 64
    case 2: return 48
    case 3: return 32
    case 4: return 24
    default: return 16
  }
}

const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const extractTextFromChildren = (children: React.ReactNode): string => {
  if (typeof children === 'string') return children
  if (typeof children === 'number') return children.toString()
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join('')
  }
  if (children && typeof children === 'object' && 'props' in children) {
    const element = children as { props: { children: React.ReactNode } }
    return extractTextFromChildren(element.props.children)
  }
  return ''
}

/**
 * Render a semantic heading element with configurable visual size, wrapped in a shareable anchor link.
 *
 * Creates an `h{n}` element (where `n` is `headingLevel`) wrapped in an anchor tag that links to itself.
 * This allows users to easily share direct links to specific heading sections. Applies the component's 
 * base font class together with a size class derived from `headingSize`. `headingSize` lets you control 
 * the visual font size independently of the semantic heading level.
 *
 * @param headingLevel - Semantic heading level to render (1–6). Defaults to `3`.
 * @param headingSize - Visual size level used to pick the CSS size class (1–6). Defaults to `headingLevel`.
 * @param icon - Optional icon to render before the heading text. When provided, adds spacing between the icon and text.
 * @param id - Optional custom ID for the anchor. If not provided, auto-generated from heading text.
 * @returns A React element for the requested heading tag wrapped in an anchor, with composed classes and forwarded props.
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
  ) : children;

  const HeadingElement = () => createElement(
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
 const fullUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${window.location.pathname}#${headingId}`
    : `#${headingId}`

  return (
    <a href={fullUrl} className='link'>
      <HeadingElement />
    </a>
  )
}
