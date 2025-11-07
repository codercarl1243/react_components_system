import { asPostId, asPostIds, type PostId, type PostSummary, type PostType } from "@/components/post/post.type";

const ButtonPosts: PostType[] = [
    {
        id: asPostId('design__button__01'),
        title: 'Button',
        subtitle: 'Foundations of an Accessible Button System',
        excerpt: 'Build a robust, accessible button foundation for your design system.',
        relatedPostIds: asPostIds(['design__button__slider__01', 'design__button__toggle__01']),
        href: '/blog/design-system/buttons',
        lastModified: new Date('2025-10-10'),
        published: true,
        featured: true,
        image: {
            src: '/images/blog/button-base-banner.jpg',
            alt: 'Accessible button components with variants and states'
        }
    },
    {
        id: asPostId('design__button__slider__01'),
        title: 'Slider Buttons',
        excerpt: 'Explore slider-based button interactions for dynamic UI controls.',
        relatedPostIds: asPostIds(['design__button__01', 'design__button__toggle__01']),
        href: '/blog/design-system/buttons/sliders',
        lastModified: new Date('2025-10-10'),
        published: true,
        image: {
            src: '/images/blog/button-slider-banner.jpg',
            alt: 'Slider-style button interactions with dynamic visuals'
        }
    },
    {
        id: asPostId('design__button__toggle__01'),
        title: 'Toggle Buttons',
        excerpt: 'Design accessible toggle buttons with proper ARIA and keyboard support.',
        relatedPostIds: asPostIds(['design__button__01', 'design__button__slider__01']),
        href: '/blog/design-system/buttons/toggle',
        lastModified: new Date('2025-10-10'),
        published: true,
        image: {
            src: '/images/blog/button-toggle-banner.jpg',
            alt: 'Toggle button states and accessibility icons'
        }
    }
];

export const BLOG_POSTS: PostType[] = [
    ...ButtonPosts
];

/**
 * lightweight summary for cards and lists
 */
function toPostSummary({ id, href, title, image, excerpt, lastModified }: PostType): PostSummary {
    return {
        id,
        href,
        title,
        image,
        excerpt,
        lastModified
    };
}


/**
 * Get a blog post by its ID
 */
export function getBlogPostById(id: PostId): PostType | undefined {
    return BLOG_POSTS.find(post => post.id === id);
}

/**
 * Get related posts for a given post ID
 */
export function getRelatedPosts(postId: PostId): PostSummary[] {
    const post = getBlogPostById(postId);
    if (!post) return [];

    return post.relatedPostIds
        .map(id => getBlogPostById(id))
        .filter((p): p is PostType => !!p)
        .map(toPostSummary);
}

/**
 * sorted by date
 */
export function getMostRecentPosts(limit = 3): PostSummary[] {
    return [...BLOG_POSTS]
        .sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime())
        .slice(0, limit)
        .map(toPostSummary);
}

/**
 * Featured Flag = true
 */
export function getFeaturedPosts(limit = 3): PostSummary[] {
    return BLOG_POSTS.filter(post => post.featured)
        .sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime())
        .slice(0, limit)
        .map(toPostSummary);
}