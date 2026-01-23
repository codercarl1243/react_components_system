import { notFound } from "next/navigation";
import { getBlogPostById, getRelatedPosts } from "@/lib/blog/blog.data";
import { getAuthorById } from "@/lib/blog/authors/authors.data";
import type { PostId, PostSummary, PostType } from "@/lib/blog/blog.types";
import type { Author } from "@/lib/blog/authors/authors.types";

export default function getBlogPostPageData(id: PostId | string): {
  post: PostType;
  relatedPosts: PostSummary[];
  author: Author | undefined;
} {
  const post = getBlogPostById(id);

  if (!post) {
    notFound();
  }

  return {
    post,
    relatedPosts: getRelatedPosts(post.id),
    author: getAuthorById(post.authorId),
  };
}
