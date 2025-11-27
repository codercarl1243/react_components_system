import type { ValidHeadingTag } from '@/components/heading/heading.type';
import type { PostSummary, PostType } from '@/lib/blog/blog.types';
import { BlockProps } from '@/components/primitives/types';

export type PostBannerContent  = Pick<PostType, 'title' | 'subtitle' | 'image'>;

export type PostBannerProps = {
  post?: PostBannerContent;
  title?: string;
  subtitle?: string;
  headingId: string;
  image?: PostType['image'];
}

export type PostCardPropsType = {
    variant?: 'featured' | 'card';
    post: PostSummary;
    as: Exclude<ValidHeadingTag, 'h1'>;
};

export type PostPropsType = BlockProps<'article'>;
