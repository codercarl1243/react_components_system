import type { ComponentProps } from 'react'
import type { HeadingLevelsType } from '@/components/heading/heading.type';
import type { PostSummary, PostType } from '@/lib/blog/blog.types';

export type PostBannerPropsType = Pick<PostType, 'title' | 'image' | 'subtitle'> & { headingId?: string };

export type PostCardPropsType = {
    variant?: 'featured' | 'card';
    post: PostSummary;
    headingLevel: Exclude<HeadingLevelsType, 1>;
};

export type PostPropsType = ComponentProps<'article'>;
