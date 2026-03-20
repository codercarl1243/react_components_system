"use client";

import Image from '@/components/image'
import type { PostCardPropsType } from './post.type'
import Link from '@/components/link'
import Heading from '@/components/heading'
import { Block, Inline } from '../primitives';
import CategoryPill from '@/components/post/post.category';
import { applyDataAttributes } from '@/lib/utils/applyDataAttributes';

/** 
 * Render a clickable post card with an image and title.
 * The entire card is clickable and navigates to the post URL.
 * Does not navigate when text is selected.
 * 
 * @param post - Post data including `slug`, `title`, and `image`.
 * @returns The post card component.
 */

export default function PostCard({ post, layout = "default" }: PostCardPropsType) {

    const {
        image,
        title,
        excerpt,
        href,
        featured,
        categories
    } = post

    return (
        <Block
            as="article"
            {...applyDataAttributes({ layout, featured })}
            className="surface-frame post-card post-card--grid"
        >
            <Link
                href={href}
                className="post-card__link post-card__overlay link--surface"
                aria-labelledby={`heading-post-${post.id}`}
            />
            {image.src && <Image
                variant="card"
                alt={image.alt}
                src={image.src}
                className="post-card__image" />}
            <Heading
                as="h3"
                id={`heading-post-${post.id}`}
                className="post-card__heading text-on-image--tight mt-0 px-sm"
            >
                <span className="selectable-text">{title}</span>
            </Heading>
            {layout === "large" && (
                <p className="post-card__excerpt px-md">
                    <span className="selectable-text">
                        {excerpt}
                    </span>
                </p>
            )}
            <Inline wrap className='post-card__meta px-md pb-sm' gap={"sm"}>
                {categories.map(category => <CategoryPill key={`${post.id}-${category}`} category={category} />)}
            </Inline>
        </Block>
    )
}
