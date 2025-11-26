import { type ComponentProps } from 'react'
import Icon from '../icon'
import { RiInformationLine } from '@remixicon/react'
import clsx from 'clsx'
import { Stack } from '../primitives';

/**
 * A prominently styled note component for highlighting important information within blog posts.
 * 
 * @component
 * @example
 * ```tsx
 * <PostNote>
 *   <Heading as={"h4"}>Important Note</Heading>
 *   <p>This is some important information that readers should pay attention to.</p>
 * </PostNote>
 * ```
 * 
 * @param children - The content to display in the note.
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

  if (!children) return;

  return (
    <Stack
      {...props}
      className={clsx(className, 'post-note')}
      role={'note'}
      variant='info'
      variantAppearance='primitive'
      >
      <Icon icon={RiInformationLine} size={24} className="post-note__icon" />
      <Stack className="post-note__content">
        {children}
      </Stack>

    </Stack>
  )
}