import { type ComponentProps } from "react";


export type TableOfContentsItem = {
    id: string;
    href: string;
    label: string;
};

export type Author = { name: string; avatarUrl?: string; bio?: string };
export type relatedPosts = { href: string; title: string }[];
export type PostSideBarProps = {
    contents?: TableOfContentsItem[]
    relatedPosts?: relatedPosts;
    author?: Author;
} & ComponentProps<'aside'>;