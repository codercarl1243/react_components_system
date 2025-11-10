import { getPostsUsingAuthor } from "@/lib/blog/blog.data";
import { AUTHORS } from "@/lib/blog/authors/authors";
import { AuthorId, Author } from "@/lib/blog/authors/authors.types";

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