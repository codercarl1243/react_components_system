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

export default function Heading({
  headingLevel = 3,
  children,
  className,
  ...props
}: HeadingPropsType) {

  return createElement(
    `h${headingLevel}`,
    {
      className: clsx('font-main', getSizeClass(headingLevel), className),
      ...props
    },
    children
  )
}
