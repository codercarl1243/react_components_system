import Image from 'next/image'
import type { PostBannerPropsType } from '@/components/post/post.type'
import Heading from '@/components/heading'

/**
 * A hero banner component for blog posts that displays the main title, optional subtitle, and hero image.
 * @component
 * @example
 * ```tsx
 * <PostBanner
 *   title="The Complete Guide to TypeScript"
 *   headingId="typescript-guide-heading"
 *   subtitle="From basics to advanced type system features"
 *   image={{
 *     src: "/images/typescript-hero.jpg",
 *     alt: "TypeScript code examples on a dark background"
 *   }}
 * />
 * ```
 * 
 * @param title - The main title of the blog post. This becomes the primary (h1) heading and should be descriptive and engaging.
 * @param headingId - A unique identifier for the main heading element. Used for accessibility, SEO, and potential linking/navigation purposes.
 * @param subtitle - Optional subtitle or description that appears below the main title. Rendered as a styled paragraph with italic emphasis.
 * @param image - Optional hero image configuration object with src and alt properties.
 * @param image.src - The URL or path to the hero image. When provided, displays above the title text.
 * @param image.alt - Alternative text for the hero image. Defaults to empty string if not provided (treating image as decorative).
 * 
 * @returns A banner section containing the hero image (if provided), main heading (h1), and subtitle (if provided).
 */
export default function PostBanner ({ title, headingId, subtitle, image }: PostBannerPropsType) {
  return (
        <div className="post__banner font-accent">

            {image?.src
              ? (
                <Image src={image.src} alt={image.alt ?? ''} height={400} width={1200} />
                )
              : null}
            <Heading headingLevel={1} id={headingId}>{title}</Heading>
            {subtitle && <p className="italic text-lg">{subtitle}</p>}
        </div>
  )
}
