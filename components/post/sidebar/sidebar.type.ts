import type { ComponentProps } from "react";
import type { Author } from "@/lib/blog/authors/authors.types";
import { PostSummary } from "@/lib/blog/blog.types";

export type SidebarAuthorProps = {
    author: Author
}

export type TableOfContentsItem = {
    id: string;
    href: string;
    label: string;
};

export type PostSideBarProps = {
    contents?: readonly TableOfContentsItem[]
    relatedPosts?: PostSummary[];
    author?: Author;
} & ComponentProps<'aside'>;