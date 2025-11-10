// app/sitemap.ts

import { BLOG_POSTS } from '@/lib/blog/blogPosts';
import type { MetadataRoute } from 'next';

/**
 * Priority levels for sitemap entries
 * Used to tell search engines which pages are more important relative to each other
 * 
 * @note Priority is a suggestion to search engines, not a guarantee of ranking
 * @note Actual crawl frequency depends on Google's assessment of page importance
 * 
 * @example
 * // High traffic, regularly updated pages
 * priority: SITEMAP_PRIORITY.HOMEPAGE
 * 
 * @example
 * // Main content sections that drive traffic
 * priority: SITEMAP_PRIORITY.PRIMARY_SECTION
 * 
 * @example
 * // Individual content pieces (blog posts, articles, products)
 * priority: SITEMAP_PRIORITY.BLOG_POST
 */
const SITEMAP_PRIORITY = {
    /**
     * Homepage only
     * - Your main entry point
     * - Highest traffic
     * - Changes regularly
     * @value 1.0
     */
    HOMEPAGE: 1.0,

    /**
     * Main section pages
     * - Blog index, Products page, Docs homepage
     * - Key navigation points
     * - High traffic drivers
     * - Updated often
     * @value 0.9
     */
    PRIMARY_SECTION: 0.9,

    /**
     * Individual content pages
     * - Blog posts, Articles, Product pages
     * - Core business content
     * - Regular content updates
     * - Good for SEO
     * @value 0.8
     * @example Use for: Blog posts, tutorials, product pages, documentation articles
     */
    BLOG_POST: 0.8,

    /**
     * Secondary pages
     * - About page, Contact page, FAQ
     * - Support pages, Team page
     * - Important but not daily updated
     * - Support user journey
     * @value 0.6
     * @example Use for: About us, contact forms, help center, resource pages
     */
    SECONDARY: 0.6,

    /**
     * Archive and old content
     * - Outdated blog posts (older than 1 year)
     * - Historical pages
     * - Legacy documentation
     * - Still useful but not priorities
     * @value 0.4
     * @example Use for: Old blog posts, deprecated docs, historical content
     */
    ARCHIVE: 0.4,

    /**
     * Rarely updated pages
     * - Privacy policy, Terms of service
     * - Sitemap, robots.txt
     * - Static pages that rarely change
     * - Legal pages
     * @value 0.2
     * @example Use for: Legal pages, policies, static disclaimers
     */
    LOW: 0.2,
} as const;

/**
 * Threshold for considering a post as "recent" vs "archive"
 * Posts updated within this timeframe get higher priority and change frequency
 * @constant 6 months in milliseconds
 */
const RECENT_CONTENT_THRESHOLD_MONTHS = 6;

/**
 * Determines the appropriate priority for a blog post based on its last modified date
 * 
 * @param lastModified - The date the post was last updated
 * @returns Priority level based on content age:
 *   - BLOG_POST (0.8) if updated within the last 6 months
 *   - ARCHIVE (0.4) if updated 6+ months ago
 * 
 * @example
 * const priority = getPostPriority(new Date('2024-01-01'));
 * // Returns 0.4 (ARCHIVE) if current date is past July 2024
 */
function getPostPriority(lastModified: Date): number {
    const thresholdDate = new Date();
    thresholdDate.setMonth(thresholdDate.getMonth() - RECENT_CONTENT_THRESHOLD_MONTHS);

    return lastModified > thresholdDate
        ? SITEMAP_PRIORITY.BLOG_POST
        : SITEMAP_PRIORITY.ARCHIVE;
}

/**
 * Determines the appropriate change frequency for a blog post based on its last modified date
 * 
 * Helps search engines understand how often to re-crawl the page
 * 
 * @param lastModified - The date the post was last updated
 * @returns Change frequency hint:
 *   - 'weekly' if updated within the last 6 months (actively maintained content)
 *   - 'monthly' if updated 6+ months ago (archive content, updated occasionally)
 * 
 * @example
 * const frequency = getPostChangeFrequency(new Date('2025-09-01'));
 * // Returns 'weekly' if current date is within 6 months of September 2025
 * 
 * @example
 * const frequency = getPostChangeFrequency(new Date('2024-01-01'));
 * // Returns 'monthly' if current date is past July 2024
 */
function getPostChangeFrequency(
    lastModified: Date
): MetadataRoute.Sitemap[number]['changeFrequency'] {
    const thresholdDate = new Date();
    thresholdDate.setMonth(thresholdDate.getMonth() - RECENT_CONTENT_THRESHOLD_MONTHS);

    return lastModified > thresholdDate ? 'weekly' : 'monthly';
}

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com';
    
    const blogUrls: MetadataRoute.Sitemap = BLOG_POSTS.map(post => ({
        url: `${baseUrl}${post.url}`,
        lastModified: post.lastModified,
        changeFrequency: getPostChangeFrequency(post.lastModified),
        priority: getPostPriority(post.lastModified),
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: SITEMAP_PRIORITY.HOMEPAGE,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: SITEMAP_PRIORITY.PRIMARY_SECTION,
        },
        ...blogUrls,
    ];
}