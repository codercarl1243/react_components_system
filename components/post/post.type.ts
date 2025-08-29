import type { ComponentProps } from "react";


export type PostImageObjType = {
    src: string;
    alt?: string;
};

export type PostType = {
    title: string;
    image: PostImageObjType;
    children: React.ReactNode;
};

export type PostBannerPropsType = Pick<PostType, 'title' | 'image'>;

export type PostCardPropsType = {
    variant?: "hero" | "default";
    post: Pick<PostType, 'title' | 'image'>;
    headingLevel: 2 | 3 | 4;
};

export type PostPropsType = ComponentProps<'article'>;