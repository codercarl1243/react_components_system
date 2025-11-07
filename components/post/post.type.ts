import type { ComponentProps } from 'react'
import type { HeadingLevelsType } from '@/components/heading/heading.type';
import type { TImage } from '@/components/image/image.type';
import { asBrand, type Branded } from '@/types/utility/brand';
import { type AuthorId } from '@/lib/authors';

export type PostImageObjType = {
    src: TImage['src'];
    alt: TImage['alt'];
};

export type PostId = Branded<string, 'PostId'>;
export const asPostId = (value: string) => asBrand<string, 'PostId'>(value);
export const asPostIds = (ids: string[]): PostId[] => ids.map(asPostId);

export type PostType = {
    id: PostId;
    title: string;
    subtitle?: string;
    image: PostImageObjType;
    excerpt: string;
    href: string;
    relatedPostIds: PostId[];
    lastModified: Date;
    published: Boolean;
    featured?: Boolean;
    authorId: AuthorId;
    subject?: string;           // high-level category: e.g. "Design System", "Accessibility"
    keywords?: string[];        // tags: e.g. ["buttons", "variants", "tokens"]
};

export type PostSummary = {
    id: PostId;
    href: PostType['href'];
    title: PostType['title'];
    image: PostType['image'];
    excerpt?: PostType['excerpt'];
    lastModified: PostType['lastModified'];
    authorId: AuthorId;
};

export type PostBannerPropsType = Pick<PostType, 'title' | 'image' | 'subtitle'> & { headingId?: string };

export type PostCardPropsType = {
    variant?: 'featured' | 'card';
    post: PostSummary;
    headingLevel: Exclude<HeadingLevelsType, 1>;
};

export type PostPropsType = ComponentProps<'article'>;
