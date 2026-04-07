import clsx from 'clsx';
import type { SectionProps } from './post.type';

/**
 * A semantic section wrapper component for organizing content within blog posts.
 * 
 * This component provides consistent styling and layout for post sections, applying
 * vertical spacing between child elements.
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
 * @param className - Additional CSS class names to apply to the section element. These will be merged with the default classes.
 * @param props - All other standard HTML section element attributes (id, aria-*, data-*, etc.)
 * 
 * @returns A styled `<section>` element with flow spacing applied.
 */
export default function PostSection({ className, width = "bleed", flow = "lg", ...props }: SectionProps) {

  return (
    <section
      className={clsx(`post-section flow-${flow} width-${width}`, className)}
      {...props}
    />
  )
}
