import type { PostSummary } from '@/lib/blog/blog.types';
import type { BlockProps, StackProps } from '@/components/primitives/types';
import { ComponentProps } from 'react';
import { Variant } from '@/types/variant';


export type PostCardPropsType = {
  post: PostSummary;
};

export type SectionProps = StackProps<'section'> & {
  width?: "content" | "bleed" | "full"
};

export type PostPropsType = BlockProps<'article'>;

export type PostNotePropsType = ComponentProps<'div'> & {
  variant?: Variant;
  showIcon?: boolean;
};