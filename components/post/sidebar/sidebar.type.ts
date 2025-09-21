import { type ComponentProps } from "react";


export type TableOfContentsItem = {
    id: string;
    href: string;
    label: string;
};

export type Author = { name: string; avatarUrl?: string; bio?: string };

export type RelatedPost = { href: string; title: string };
export type RelatedPosts = RelatedPost[];

export type PostSideBarProps = {
    contents?: TableOfContentsItem[]
    relatedPosts?: RelatedPosts;
    author?: Author;
} & ComponentProps<'aside'>;