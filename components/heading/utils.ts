import type { ReactNode } from 'react'

export const getSizeClass = (level: number): string => {
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
export const getIconSize = (level: number): number => {
  switch (level) {
    case 1: return 64
    case 2: return 48
    case 3: return 32
    case 4: return 24
    default: return 16
  }
}

export const extractTextFromChildren = (children: ReactNode): string => {
  if (typeof children === 'string') return children
  if (typeof children === 'number') return children.toString()
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join('')
  }
  if (children && typeof children === 'object' && 'props' in children) {
    const element = children as { props: { children: ReactNode } }
    return extractTextFromChildren(element.props.children)
  }
  return ''
}