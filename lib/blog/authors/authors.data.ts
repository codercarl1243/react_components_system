import { AUTHORS } from "@/lib/blog/authors/authors";
import type { AuthorId, Author } from "@/lib/blog/authors/authors.types";
import type { PostSummary } from "@/lib/blog/blog.types";
import { getPostSummariesByAuthorId } from "@/lib/blog/blog.data";

/**
 * Get an Author by its ID
 */
export function getAuthorById(authorId: AuthorId): Author | undefined {
    return AUTHORS.find(author => author.id === authorId);
}

/**
 * Get an Author with Posts
 */
export function getAuthorWithPosts(authorId: AuthorId): (Author & { posts: PostSummary[] }) | undefined {
  const author = getAuthorById(authorId);
  if (!author) return undefined;

  const posts = getPostSummariesByAuthorId(authorId);
  return { ...author, posts };
}