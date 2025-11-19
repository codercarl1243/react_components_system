'use client';

import Image from '@/components/image'
import type { PostCardPropsType } from './post.type'
import Link from '@/components/link'
import Heading from '@/components/heading'
import usePostCard from './usePostCard'

/** 
 * Render a clickable post card with an image and title.
 * The entire card is clickable and navigates to the post URL.
 * Handles long-presses to allow text selection without navigation.
 * 
 * @param variant - Visual variant of the card, e.g. 'card' or 'featured'.
 * @param post - Post data including `slug`, `title`, and `image`.
 * @param as - Semantic heading level for the title (1-6). Defaults to 3.
 * @returns The post card component.
 */

export default function PostCard({ variant = 'card', post, as = 3 }: PostCardPropsType) {
    const { image, title } = post


    const { handleClick, handleMouseDown, handleMouseUp, handleMouseLeave } = usePostCard(post.href)

    return (
        <article
            data-variant={variant}
            onClick={handleClick}
            className="post-card"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
        >
            <Heading
                className="post-card__title"
                data-styled="filled"
                data-variant="accent"
                as={as}
                headingSize={4}>
                <Link href={post.href}>{title}</Link>
            </Heading>
            {post.excerpt && (
                <p className="post-card__excerpt">{post.excerpt}</p>
            )}
            <Image
                src={image.src}
                alt={image.alt}
                className='post-card__image'
                variant={variant}
            />
        </article>
    )
}
