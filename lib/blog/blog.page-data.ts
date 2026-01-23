import { notFound } from "next/navigation";
import { getBlogPostById, getRelatedPosts } from "@/lib/blog/blog.data";
import { getAuthorById } from "@/lib/blog/authors/authors.data";
import type { PostId } from "@/lib/blog/blog.types";

export default function getBlogPostPageData(id: PostId | string) {
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
