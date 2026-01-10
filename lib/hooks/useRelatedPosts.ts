import { getRelatedPosts } from '@/lib/blog/blog.data';
import { PostId, PostSummary } from '@/lib/blog/blog.types';
import { useMemo } from 'react';

/**
 * Hook to get related posts for a given post ID
 * Returns formatted related posts ready for display
 */
export function useRelatedPosts(postId: PostId): PostSummary[] {
    return useMemo(() => getRelatedPosts(postId), [postId]);
}