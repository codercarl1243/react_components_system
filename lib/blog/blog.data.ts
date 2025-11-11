import { sanitizeString } from "@/lib/utils/string";
import { getAuthorById } from "@/lib/blog/authors/authors.data";
import { AuthorId } from "@/lib/blog/authors/authors.types";
import type { PostId, PostType, PostSummary, BlogCategory, BlogSubject, BlogGlobalKeyword } from "@/lib/blog/blog.types";
import { computePostScore, toPostSummary } from "@/lib/blog/blog.utils";
import { BLOG_POSTS } from "@/lib/blog/blogPosts";
import { BLOG_CATEGORIES } from "@/lib/blog/blog.categories";
import { BLOG_KEYWORDS } from "./blog.keywords";
import { BLOG_SUBJECTS } from "./blog.subjects";
import { sortByModifiedDate } from '@/lib/blog/blog.sort';

export const BLOG_BASE_PATH = '/blog';
/**
 * Builds a canonical blog post URL.
 *
 * @example
 * buildBlogHref('design-system', 'buttons/theming')
 * // → "/blog/design-system/buttons/theming"
 */
export function buildBlogHref(subject: BlogSubject, pathFragment: string): string {
    return `${BLOG_BASE_PATH}/${subject}/${pathFragment}`.replace(/\/+/g, '/');
}

/**
 * Returns a copy of all blog posts.
 * 
 * @param includeUnpublished - Whether to include unpublished posts (default: false)
 * @returns {PostType[]} Filtered list of blog posts
 *
 * @example
 * ```ts
 * const published = getBlogPosts();
 * const all = getBlogPosts(true);
 * ```
 */
export function getBlogPosts(includeUnpublished = false): PostType[] {
    const posts = BLOG_POSTS.map(post => ({
        ...post,
        href: buildBlogHref(post.subject, post.pathFragment),
    }));

    return includeUnpublished ? posts : posts.filter(post => post.published);
}

export function getBlogPostsSummaries(includeUnpublished = false): PostSummary[] {
    return getBlogPosts(includeUnpublished).map(toPostSummary);
}

/**
 * Get a blog post by its ID
 */
export function getBlogPostById(id: PostId): PostType | undefined {
    return getBlogPosts().find(post => post.id === id);
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
    const posts = getBlogPosts();

    return sortByModifiedDate(posts)
        .slice(0, limit)
        .map(toPostSummary);
}

/**
 * Featured Flag = true
 */
export function getFeaturedPosts(limit = 3): PostSummary[] {
    const posts = getBlogPosts();

    return posts
        .filter(post => post.featured)
        .slice(0, limit)
        .map(toPostSummary);
}

/**
 * Get posts by subject (case-insensitive + partial match)
 */
export function getPostsBySubject(query: string): PostSummary[] {
    const sanitized = sanitizeString(query);
    if (!sanitized) return [];

    const regex = new RegExp(sanitized, 'gi');
    const posts = getBlogPosts();

    return posts
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

    const posts = getBlogPosts();

    return posts
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
export function getPostSummariesByAuthorId(authorId: AuthorId): PostSummary[] {
    const author = getAuthorById(authorId);
    if (!author) return [];

    return author.postIds
        .map(getBlogPostById)
        .filter((p): p is PostType => !!p)
        .map(toPostSummary);
}

/**
 * Returns a deduplicated, alphabetically sorted list of all blog categories
 * currently used across published posts.
 * 
 * @note This is a dynamic lookup — it inspects all entries in {@link BLOG_POSTS}
 */
export function getBlogCategoriesInUse(): BlogCategory[] {
    const allCategories = getBlogPosts().flatMap(p => p.categories ?? []);
    const unique = Array.from(new Set(allCategories));
    return unique.sort();
}

/**
 * Retrieves all posts that belong to the specified blog category.
 * 
 * @note must exist in {@link BLOG_CATEGORIES}.
 */
export function getPostsByCategory(category: BlogCategory): PostSummary[] {

    return getBlogPosts()
        .filter(post => post.categories.includes(category))
        .map(toPostSummary);
}

export function getBlogCategories(): BlogCategory[] {
    return Object.values(BLOG_CATEGORIES);
}

export function getBlogSubjects(): BlogSubject[] {
    return Object.values(BLOG_SUBJECTS);
}

export function getBlogKeywords(): BlogGlobalKeyword[] {
    return Object.values(BLOG_KEYWORDS);
}