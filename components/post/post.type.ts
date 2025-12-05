import type { ValidHeadingTag } from '@/components/heading/heading.type';
import type { PostSummary, PostType } from '@/lib/blog/blog.types';
import type { BlockProps, StackProps } from '@/components/primitives/types';
import { ComponentProps } from 'react';
import { Variant } from '@/types/variant';

export type PostBannerContent = Pick<PostType, 'title' | 'subtitle' | 'image'>;

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

export type SectionProps = StackProps<'section'> & {
  width?: "content" | "bleed" | "full"
};


export type PostPropsType = BlockProps<'article'>;

export type PostNotePropsType = ComponentProps<'div'> & {
  variant?: Variant;
  showIcon?: boolean;
};