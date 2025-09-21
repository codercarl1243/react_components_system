import type { ComponentProps, ReactNode } from 'react'
import type { HeadingLevelsType } from '../heading/heading.type';

export type PostImageObjType = {
    src: string;
    alt?: string;
};

export type PostType = {
    title: string;
    subtitle?: string;
    image: PostImageObjType;
    children: ReactNode;
};

export type PostBannerPropsType = Pick<PostType, 'title' | 'image' | 'subtitle'> & {headingId?: string};

export type PostCardPropsType = {
    variant?: 'hero' | 'default';
    post: Pick<PostType, 'title' | 'image'> & {slug: string};
    headingLevel: Exclude<HeadingLevelsType, 1>;
};

export type PostPropsType = ComponentProps<'article'>;
