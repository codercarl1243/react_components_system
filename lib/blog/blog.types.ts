import type { TImage } from "@/components/image/image.type";
import { BLOG_CATEGORIES } from "@/lib/blog/blog.categories";
import type { Branded } from "@/types/utility/brand";
import type { AuthorId } from "@/lib/blog/authors/authors.types";
import { BLOG_SUBJECTS } from "@/lib/blog/blog.subjects";
import { BLOG_KEYWORDS } from "@/lib/blog/blog.keywords";

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
export type BlogSubject = (typeof BLOG_SUBJECTS)[keyof typeof BLOG_SUBJECTS];
export type BlogGlobalKeyword = (typeof BLOG_KEYWORDS)[keyof typeof BLOG_KEYWORDS];

export type PostType = {
    id: PostId;
    title: string;
    subtitle?: string;
    image: PostImageObjType;
    excerpt: string;
    /** The path fragment - Used with {@link buildBlogHref} to generate `href`. */
    pathFragment: string;
    /** The canonical URL - This is generated automatically and should not be hardcoded. */
    href?: string;
    relatedPostIds: PostId[];
    lastModified: Date;
    createdAt: Date;
    published: boolean;
    featured?: boolean;
    authorId: AuthorId;
    subject: BlogSubject;
    /** A mix of global, reusable taxonomy terms and post-specific ones. */
    keywords?: (string | BlogGlobalKeyword)[];
    /** Categories are top-level grouping labels for filtering and navigation. */
    categories: BlogCategory[];
    /** Optional SEO metadata overrides. */
    meta?: PostMeta;
};

// ---------- SUMMARY ----------
export type PostSummary = {
    id: PostId;
    href: NonNullable<PostType['href']>;
    title: PostType['title'];
    image: PostType['image'];
    excerpt?: PostType['excerpt'];
    lastModified: PostType['lastModified'];
    authorId: AuthorId;
    categories: BlogCategory[];
};