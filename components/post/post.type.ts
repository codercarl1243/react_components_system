import type { ComponentProps, ReactNode } from "react";


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

export type PostBannerPropsType = Pick<PostType, 'title' | 'image' | 'subtitle'>;

export type PostCardPropsType = {
    variant?: "hero" | "default";
    post: Pick<PostType, 'title' | 'image'>;
    headingLevel: 2 | 3 | 4;
};

export type PostPropsType = ComponentProps<'article'>;