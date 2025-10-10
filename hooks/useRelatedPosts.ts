import { useMemo } from 'react';
import { getRelatedPosts } from '@/lib/blogPosts';

interface RelatedPost {
    href: string;
    title: string;
}

/**
 * Hook to get related posts for a given post ID
 * Returns formatted related posts ready for display
 */
export function useRelatedPosts(postId: string): RelatedPost[] {
    return useMemo(() => getRelatedPosts(postId), [postId]);
}