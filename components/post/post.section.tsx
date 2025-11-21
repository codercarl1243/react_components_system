import type { ComponentProps } from 'react'
import {Stack} from '@/components/primitives'

/**
 * A semantic section wrapper component for organizing content within blog posts.
 * 
 * This component provides consistent styling and layout for post sections, applying
 * layout wrapper constraints and vertical spacing between child elements.
 * 
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <PostSection>
 *   <h2>Section Title</h2>
 *   <p>Section content goes here...</p>
 * </PostSection>
 * ```
 * 
 * @param children - The content to render inside the section. Typically includes headings, paragraphs, lists, or other post content.
 * @param className - Additional CSS class names to apply to the section element. These will be merged with the default classes.
 * @param props - All other standard HTML section element attributes (id, aria-*, data-*, etc.)
 * 
 * @returns A styled `<section>` element with layout wrapper and flow spacing applied.
 */
export default function PostSection({ children, className, ...props }: ComponentProps<'section'>) {

  return (
    <Stack as="section" className='post-section layout-wrapper' {...props}>
      {children}
    </Stack>
  )
}
