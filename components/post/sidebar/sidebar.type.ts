import type { ComponentProps } from "react";
import type { PostSummary } from "@/components/post/post.type";
import type { Author } from "@/lib/authors";

export type TableOfContentsItem = {
    id: string;
    href: string;
    label: string;
};

export type PostSideBarProps = {
    contents?: TableOfContentsItem[]
    relatedPosts?: PostSummary[];
    author?: Author;
} & ComponentProps<'aside'>;