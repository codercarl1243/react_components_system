import { asPostIds, type PostId } from "@/components/post/post.type";
import { asBrand, type Branded } from "@/types/utility/brand";
import { getPostsUsingAuthor } from "./blogPosts";

export type AuthorId = Branded<string, 'AuthorId'>;
export const asAuthorId = (value: string) => asBrand<string, 'AuthorId'>(value);

export type Author = {
    id: AuthorId,
    name: string;
    avatarUrl?: string;
    bio?: string;
    postIds: PostId[];
};


export const CODER_CARL_ID = asAuthorId('coderCarl1243');

export const CODER_CARL: Author = {
    id: CODER_CARL_ID,
    avatarUrl: '/images/heroImage_200x200.webp',
    name: "carl davidson",
    postIds: asPostIds([
        'design__button__01', 
        'design__button__slider__01', 
        'design__button__toggle__01'
    ])
};

export const AUTHORS = [CODER_CARL]


/**
 * Get an Author by its ID
 */
export function getAuthorById(authorId: AuthorId): Author | undefined {
    return AUTHORS.find(author => author.id === authorId);
}

/**
 * Get an Author with Posts
 */
export function getAuthorWithPosts(authorId: AuthorId) {
  const author = getAuthorById(authorId);
  if (!author) return undefined;

  const posts = getPostsUsingAuthor(authorId);
  return { ...author, posts };
}