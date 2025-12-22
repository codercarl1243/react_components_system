import Icon from '../icon'
import { RiInformationLine } from '@remixicon/react'
import clsx from 'clsx'
import { Stack } from '../primitives';
import type { PostNotePropsType } from './post.type';

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
 * @param className - Additional CSS class names to apply to the note container. These are merged with the default 'post-note' classes.
 * @param props - All other standard HTML div element attributes (id, data-*, aria-*, etc.)
 * 
 * @returns A styled note container with an information icon, or null if no children are provided.
 * 
 */
export default function PostNote({ className, children, variant = 'info', showIcon = true, ...props }: PostNotePropsType) {

  if (!children) return null;

  return (
    <Stack
      {...props}
      className={clsx(className, 
        'post-note surface-frame py-8 pr-4 pl-8',
        {'has-icon': showIcon}
      )}
      gap={2}
      role={'note'}
      variant={variant}
      variantAppearance='tonal'
      paint="all"
    >
      {showIcon ? <Icon icon={RiInformationLine} size={28} className="post-note__icon" /> : null}
      <Stack className="post-note__content">
        {children}
      </Stack>

    </Stack>
  )
}