'use client';

import Image from 'next/image'
import type { PostCardPropsType } from './post.type'
import { useId } from 'react'
import Link from '@/components/link'
import Heading from '@/components/heading'
import usePostCard from './usePostCard'

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
