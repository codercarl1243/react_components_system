'use client';

import Image from '@/components/image'
import type { PostCardPropsType } from './post.type'
import Link from '@/components/link'
import Heading from '@/components/heading'
import usePostCard from './usePostCard'
import { Block } from '../primitives';
import clsx from 'clsx';
import CategoryPill from '@/components/post/post.category';

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

export default function PostCard({ post }: PostCardPropsType) {
    const { image, title, excerpt, href, featured, categories } = post


    const { handleClick, handleMouseDown, handleMouseUp, handleMouseLeave } = usePostCard(post.href)

    return (
        <Link
            href={post.href}
            className="lpost-card__link link--surface"
        >
            <Block
                as="article"
                className={clsx(
                    "post-card p-2 pt-0",
                    featured && "post-card--featured")}
                onClick={handleClick}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
            >
                {featured && <Image
                    variant="card"
                    alt={image.alt}
                    src={image.src} />}
                <Heading as="h3" >{title}</Heading>
                {featured && <p className="latest-posts__excerpt">{excerpt}</p>}
                {categories.map(category => <CategoryPill key={post.id + category} category={category} />)}
            </Block>
        </Link>
    )
}
