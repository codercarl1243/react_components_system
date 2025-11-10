import type { TImage } from "@/components/image/image.type";
import { BLOG_CATEGORIES } from "@/lib/blog/blog.categories";
import type { Branded } from "@/types/utility/brand";
import type { AuthorId } from "@/lib/blog/authors/authors.types";

// ---------- POST BRAND ----------
export type PostId = Branded<string, 'PostId'>;


// ---------- META INFO ----------
export type PostMeta = {
    title?: string;
    description?: string;
    ogImage?: string;
};


// ---------- BASE IMAGE ----------
export type PostImageObjType = {
    src: TImage['src'];
    alt: TImage['alt'];
};

// ---------- DOMAIN MODEL ----------

export type BlogCategory = (typeof BLOG_CATEGORIES)[keyof typeof BLOG_CATEGORIES];

export type PostType = {
    id: PostId;
    title: string;
    subtitle?: string;
    image: PostImageObjType;
    excerpt: string;
    href: string;
    relatedPostIds: PostId[];
    lastModified: Date;
    createdAt: Date;
    published: boolean;
    featured?: boolean;
    authorId: AuthorId;
    subject?: string;
    keywords?: string[];
    categories: BlogCategory[];
    meta?: PostMeta;
};

// ---------- SUMMARY ----------
export type PostSummary = {
    id: PostId;
    href: PostType['href'];
    title: PostType['title'];
    image: PostType['image'];
    excerpt?: PostType['excerpt'];
    lastModified: PostType['lastModified'];
    authorId: AuthorId;
    categories: BlogCategory[];
};