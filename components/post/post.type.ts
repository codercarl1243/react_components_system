import type { BlogCategory, PostSummary } from '@/lib/blog/blog.types';
import type { BlockProps, StackProps } from '@/components/primitives/types';
import type { ComponentProps } from 'react';
import type { Variant } from '@/types/variant';
import { Paint } from '@/types/paint';


export type PostCardPropsType = {
  post: PostSummary;
  layout?: "default" | "large";
};

export type SectionProps = StackProps<'section'> & {
  width?: "content" | "bleed" | "full"
};

export type PostPropsType = BlockProps<'article'>;

export type PostNotePropsType = ComponentProps<'div'> & {
  variant?: Variant;
  paint?: Paint;
  showIcon?: boolean;
};

export type PostCategoryPillProps = {
    category: BlogCategory;
} & ComponentProps<'span'>;