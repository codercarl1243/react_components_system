import { getBlogPostById } from "@/lib/blog/blog.data";
import type { PostId, PostType } from "@/lib/blog/blog.types";
import { Metadata } from "next";
import { siteDefaults } from "@/lib/utils/generateMeta/default";

export function generateMetadataForPost(postId: PostId): Metadata {
  const post = getBlogPostById(postId);
  if (!post)
    return {
      title: `Post Not Found · ${siteDefaults.siteName}`,
      description: "Post not found"
    };

  const meta: NonNullable<PostType["meta"]> = post.meta ?? {};
  const title = meta.title ?? post.title;
  const description = meta.description ?? post.excerpt;
  const rawImage = meta.ogImage ?? post.image.src;
  const ogImage =
    typeof rawImage === "string"
      ? rawImage
      : rawImage && typeof rawImage === "object" && "src" in rawImage
        ? rawImage.src
        : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteDefaults.url}${post.href}`,
      siteName: siteDefaults.siteName,
      images: ogImage ? [{ url: ogImage, alt: post.image.alt }] : undefined,
      type: "article",
      locale: siteDefaults.locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [{ url: ogImage, alt: post.image.alt }] : undefined,
    },
    alternates: {
      canonical: `${siteDefaults.url}${post.href}`,
    },
  };
}
