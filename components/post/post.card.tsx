'use client';

import Image from 'next/image'
import type { PostCardPropsType } from './post.type'
import { useId } from 'react'
import Link from '@/components/link'
import Heading from '@/components/heading'
import usePostCard from './usePostCard'

/**
 * Render a blog post card as an interactive article linking to the post page.
 *
 * The component displays the post title (wrapped in a Heading and Link to `/blog/{post.slug}`)
 * and the post image. The article element is interactive — click, context menu, mouse down
 * and mouse up events are handled by a dedicated hook (usePostCard) for navigation and UI behaviour.
 * An internal id generated with `useId` is exposed via `aria-describedby` on the link to improve accessibility.
 *
 * @param variant - Visual variant of the card; when `'hero'` the image is given loading priority.
 * @param post - Post data (must include `slug`, `image`, and `title`) used to build the link, title and image.
 * @param headingLevel - Heading level to render the title with (defaults to 3).
 * @returns A JSX element representing the post card.
 */
export default function PostCard({ variant = 'default', post, headingLevel = 3 }: PostCardPropsType) {
    const { image, title } = post
    const id = useId()
    const postCardSlug = `/blog/${post.slug}`

    const { handleContextMenu, handleClick, handleMouseDown, handleMouseUp } = usePostCard(postCardSlug)

    return (
        <article
            data-variant={variant}
            onClick={handleClick}
            className="post-card"
            onContextMenu={handleContextMenu}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <Heading className="post-card__title button"
                data-styled="filled"
                data-variant="accent"
                headingLevel={headingLevel}
                headingSize={4}>
                <Link href={`/blog/${post.slug}`} aria-describedby={id}>{title}</Link>
            </Heading>

            <Image
                src={image.src}
                alt={image.alt ?? ''}
                height={300}
                width={400}
                sizes="(max-width: 768px) 100vw, 400px"
                priority={variant === 'hero'}
                className='post-card__image'
            />
        </article>
    )
}
