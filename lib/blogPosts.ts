import { asPostId, asPostIds, type PostId, type PostSummary, type PostType } from "@/components/post/post.type";
import { CODER_CARL_ID, getAuthorById, type AuthorId } from "./authors";
import { sanitizeString } from "@/lib/utils/string";

const ButtonPosts: PostType[] = [
    {
        id: asPostId('design__button__01'),
        title: 'Button',
        subtitle: 'Foundations of an Accessible Button System',
        excerpt: 'Build a robust, accessible button foundation for your design system.',
        relatedPostIds: asPostIds(['design__button__slider__01', 'design__button__toggle__01']),
        href: '/blog/design-system/buttons',
        lastModified: new Date('2025-10-10'),
        createdAt: new Date('2025-09-30'),
        published: true,
        featured: true,
        image: {
            src: '/images/blog/button-base-banner.jpg',
            alt: 'Accessible button components with variants and states'
        },
        authorId: CODER_CARL_ID,
        subject: 'design system',
        keywords: ['buttons', 'accessibility', 'foundations']
    },
    {
        id: asPostId('design__button__slider__01'),
        title: 'Slider Buttons',
        excerpt: 'Explore slider-based button interactions for dynamic UI controls.',
        relatedPostIds: asPostIds(['design__button__01', 'design__button__toggle__01']),
        href: '/blog/design-system/buttons/sliders',
        lastModified: new Date('2025-10-10'),
        createdAt: new Date('2025-09-30'),
        published: true,
        image: {
            src: '/images/blog/button-slider-banner.jpg',
            alt: 'Slider-style button interactions with dynamic visuals'
        },
        authorId: CODER_CARL_ID
    },
    {
        id: asPostId('design__button__toggle__01'),
        title: 'Toggle Buttons',
        excerpt: 'Design accessible toggle buttons with proper ARIA and keyboard support.',
        relatedPostIds: asPostIds(['design__button__01', 'design__button__slider__01']),
        href: '/blog/design-system/buttons/toggle',
        lastModified: new Date('2025-10-10'),
        createdAt: new Date('2025-09-30'),
        published: true,
        image: {
            src: '/images/blog/button-toggle-banner.jpg',
            alt: 'Toggle button states and accessibility icons'
        },
        authorId: CODER_CARL_ID
    }
];

export const BLOG_POSTS: PostType[] = [
    ...ButtonPosts
];

/**
 * lightweight summary for cards and lists
 */
function toPostSummary({ id, href, title, image, excerpt, lastModified, authorId }: PostType): PostSummary {
    return {
        id,
        href,
        title,
        image,
        excerpt,
        lastModified,
        authorId
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

/**
 * Get posts by subject (case-insensitive + partial match)
 */
export function getPostsBySubject(query: string): PostSummary[] {
    if (!query.trim()) return [];

    const sanitizedQuery = sanitizeString(query);
    const regex = new RegExp(sanitizedQuery, 'i');

    return BLOG_POSTS
        .filter(p => p.subject && regex.test(p.subject))
        .map(toPostSummary);
}

/**
 * Get posts by keyword (case-insensitive + partial match)
 */
export function getPostsByKeyword(query: string): PostSummary[] {
    if (!query.trim()) return [];

    const sanitizedQuery = sanitizeString(query);
    const regex = new RegExp(sanitizedQuery, 'i');

    return BLOG_POSTS
        .filter(p => p.keywords?.some(keyword => regex.test(keyword)))
        .map(toPostSummary);
}


/**
 * Get a posts by its Author
 */
export function getPostsUsingAuthor(authorId: AuthorId): PostSummary[] {
    const author = getAuthorById(authorId);
    if (!author) return [];

    return author.postIds
        .map(id => getBlogPostById(id))
        .filter((p): p is PostType => !!p)
        .map(toPostSummary);
}