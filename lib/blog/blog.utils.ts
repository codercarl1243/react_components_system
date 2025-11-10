import { asBrand } from "@/types/utility/brand";
import type { PostType, PostSummary, PostId } from "@/lib/blog/blog.types";

/**
 * lightweight summary for cards and lists
 */
export function toPostSummary({ id, href, title, image, excerpt, lastModified, categories, authorId }: PostType): PostSummary {
    return {
        id,
        href,
        title,
        image,
        excerpt,
        lastModified,
        authorId,
        categories
    };
}

export const asPostId = (value: string): PostId => asBrand<string, 'PostId'>(value);
export const asPostIds = (ids: string[]): PostId[] => ids.map(asPostId);


/**
 * Weight multipliers for different post fields when computing relevance scores.
 * Higher weights indicate more important fields for search relevance.
*/
const SCORE_WEIGHTS = {
    title: 3,
    keywords: 2,
    categories: 1.5,
    excerpt: 1,
} as const;

/**
 * Computes a weighted relevance score for a post based on regex pattern matches
 * across different fields. Each field is weighted differently to reflect its
 * importance in determining search relevance.
 * 
 * title > keywords > categories > excerpt
 * 
 * Multiple matches in the same field count separately
 * 
 * @param post - The blog post to score
 * @param regex - The regex pattern to match. Should include the 'g' (global) flag
 *                to count multiple occurrences within each field
 * @returns The weighted relevance score. Higher scores indicate better matches.
 *          Returns 0 if no matches are found in any field
 * 
 * @example
 * ```ts
 * const regex = new RegExp(sanitizeString('react hooks'), 'gi');
 * const score = computePostScore(post, regex);
 * // If "react" appears once in title and once in excerpt:
 * // score = (1 * 3) + (1 * 1) = 4
 * 
 * // If "react" appears twice in keywords:
 * // score = (2 * 2) = 4
 * ```
 * 
 * @see {@link SCORE_WEIGHTS} for the weight multipliers used
 */
export function computePostScore(post: PostType, regex: RegExp): number {
    const flags = Array.from(new Set((regex.flags + 'gi').split(''))).join('');
    const normalizedRegex = new RegExp(regex.source, flags);

    let score = 0;

    const titleMatches = post.title.match(normalizedRegex)?.length ?? 0;
    score += titleMatches * SCORE_WEIGHTS.title;

    if (post.keywords?.length) {
        const keywordsCombined = post.keywords.join(' ');
        const keywordMatches = keywordsCombined.match(normalizedRegex)?.length ?? 0;
        score += keywordMatches * SCORE_WEIGHTS.keywords;
    }
    if (post.categories?.length) {
        const categoriesCombined = post.categories.join(' ');
        const categoryMatches = categoriesCombined.match(normalizedRegex)?.length ?? 0;
        score += categoryMatches * SCORE_WEIGHTS.categories;
    }

    const excerptMatches = post.excerpt?.match(normalizedRegex)?.length ?? 0;
    score += excerptMatches * SCORE_WEIGHTS.excerpt;
    return score;
}