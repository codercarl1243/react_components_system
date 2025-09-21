import clsx from 'clsx'
import type { HeadingPropsType } from './heading.type'
import { createElement } from 'react'

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

/**
 * Render a semantic heading element with configurable visual size.
 *
 * Creates an `h{n}` element (where `n` is `headingLevel`) and applies the component's base font class together with a size class derived from `headingSize`. `headingSize` lets you control the visual font size independently of the semantic heading level.
 *
 * @param headingLevel - Semantic heading level to render (1–6). Defaults to `3`.
 * @param headingSize - Visual size level used to pick the CSS size class (1–6). Defaults to `headingLevel`.
 * @returns A React element for the requested heading tag with composed classes and forwarded props.
 */
export default function Heading({
  headingLevel = 3,
  headingSize = headingLevel,
  children,
  className,
  ...props
}: HeadingPropsType) {

  return createElement(
    `h${headingLevel}`,
    {
      className: clsx('font-main', getSizeClass(headingSize), className),
      ...props
    },
    children
  )
}
