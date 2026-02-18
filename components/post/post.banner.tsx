import Image from '@/components/image'
import Heading from '@/components/heading'
import { Block } from '@/components/primitives';
import type { PostType } from '@/lib/blog/blog.types';


/**
 * Hero banner component for a blog post.
 *
 * Renders the post’s primary heading, optional subtitle, and optional
 * banner image using data sourced directly from a {@link PostType}.
 * This component is intentionally data-driven and relies on the post
 * object as the single source of truth.
 *
 * The banner heading is rendered as an <h1> and is automatically assigned
 * a stable id derived from the post id, enabling in-page linking and
 * improved accessibility.
 *
 * @component
 *
 * @example
 * ```tsx
 * <PostBanner post={post} />
 * ```
 *
 * @param post - The blog post data used to populate the banner, including
 * the title, optional subtitle, and optional banner image.
 *
 * @returns A banner section containing:
 * - an optional hero image,
 * - the primary <h1> heading for the post,
 * - and an optional subtitle rendered beneath the heading.
 */

export default function PostBanner({ post }: {post: PostType}) {
  if (!post) return null;

  const {title, id, subtitle, image } = post;

  return (
    <div className="post__banner font-accent width-bleed">
      {image?.src && (
        <Image
          src={image.src}
          alt={image.alt ?? ''}
          variant="banner"
          className="post__banner__image"
        />
      )}
      <div className="post__banner__text">
        <Heading as={"h1"} id={`heading-${id}`} className="post__banner__text-heading">
          {title}
        </Heading>
        {subtitle && (
          <Block 
          as="p" 
          className="italic text-lg post__banner__text-subtitle px-2 mt-auto"
          >
            {subtitle}
          </Block>
        )}
      </div>
    </div>
  )
}
