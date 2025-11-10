import { sanitizeString, stringUtils } from "@/lib/utils/string";
import { getAuthorById } from "@/lib/blog/authors/authors.data";
import { AuthorId } from "@/lib/blog/authors/authors.types";
import type { PostId, PostType, PostSummary, BlogCategory } from "@/lib/blog/blog.types";
import { computePostScore, toPostSummary } from "@/lib/blog/blog.utils";
import { BLOG_POSTS } from "@/lib/blog/blogPosts";

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
        .map(getBlogPostById)
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
    const sanitized = sanitizeString(query);
    if (!sanitized) return [];

    const normalizedQuery = stringUtils.normalizeWhiteSpace(sanitized);
    const regex = new RegExp(normalizedQuery, 'gi');

    return BLOG_POSTS
        .filter(
            (post) =>
                post.subject &&
                regex.test(post.subject)
        )
        .map(toPostSummary);
}

/**
 * Get posts by keyword (case-insensitive + partial match)
 */
export function getPostsByKeyword(query: string): PostSummary[] {
    const sanitized = sanitizeString(query);
    if (!sanitized) return [];

    const regex = new RegExp(sanitized, 'gi');

    return BLOG_POSTS
        .map((post) => ({
            post,
            score: computePostScore(post, regex)
        }))
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .map(({ post }) => toPostSummary(post));
}


/**
 * Get a posts by its Author
 */
export function getPostsUsingAuthor(authorId: AuthorId): PostSummary[] {
    const author = getAuthorById(authorId);
    if (!author) return [];

    return author.postIds
        .map(getBlogPostById)
        .filter((p): p is PostType => !!p)
        .map(toPostSummary);
}


export function getPostsByCategory(category: BlogCategory) {
    return BLOG_POSTS
        .filter(post => post.categories.includes(category))
        .map(toPostSummary);
}