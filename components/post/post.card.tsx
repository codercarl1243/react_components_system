'use client';

import Image from '@/components/image'
import type { PostCardPropsType } from './post.type'
import Link from '@/components/link'
import Heading from '@/components/heading'
import usePostCard from './usePostCard'


/** * Render a clickable post card with an image and title.
 * The entire card is clickable and navigates to the post URL.
 * Handles long-presses to allow text selection without navigation.
 * 
 * @param variant - Visual variant of the card, e.g. 'card' or 'featured'.
 * @param post - Post data including `slug`, `title`, and `image`.
 * @param headingLevel - Semantic heading level for the title (1-6). Defaults to 3.
 * @returns The post card component.
 */

export default function PostCard({ variant = 'card', post, headingLevel = 3 }: PostCardPropsType) {
    const { image, title } = post

    const postCardSlug = `/blog/${post.slug}`

    const { handleClick, handleMouseDown, handleMouseUp, handleMouseLeave } = usePostCard(postCardSlug)

    return (
        <article
            data-variant={variant}
            onClick={handleClick}
            className="post-card"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
        >
            <Heading className="post-card__title"
                data-styled="filled"
                data-variant="accent"
                headingLevel={headingLevel}
                headingSize={4}>
                <Link href={`/blog/${post.slug}`}>{title}</Link>
            </Heading>

            <Image
                src={image.src}
                alt={image.alt ?? ''}
                className='post-card__image'
                variant={variant}
            />
        </article>
    )
}
