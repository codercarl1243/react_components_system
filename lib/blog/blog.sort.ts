import type { PostType } from "@/lib/blog/blog.types";

export function sortByCreatedAtDate(posts: PostType[]): PostType[] {
    return [...posts].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export function sortByModifiedDate(posts: PostType[]): PostType[] {
    return [...posts].sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime())
}

export function sortByTitle(posts: PostType[]): PostType[] {
  return [...posts].sort((a, b) => a.title.localeCompare(b.title, 'en', { sensitivity: 'base' }));
}

export function sortByFeaturedFirst(posts: PostType[]): PostType[] {
  return [...posts].sort((a, b) => {
    const aFeatured = a.featured ? 1 : 0;
    const bFeatured = b.featured ? 1 : 0;
    return bFeatured - aFeatured;
  });
}

export function sortByAuthor(posts: PostType[]): PostType[] {
  return [...posts].sort((a, b) => a.authorId.localeCompare(b.authorId));
}

export function sortBySubject(posts: PostType[]): PostType[] {
  return [...posts].sort((a, b) => (a.subject ?? '').localeCompare(b.subject ?? ''));
}

export function sortByCategory(posts: PostType[]): PostType[] {
  return [...posts].sort((a, b) => {
    const aCat = a.categories?.[0] ?? '';
    const bCat = b.categories?.[0] ?? '';
    return aCat.localeCompare(bCat);
  });
}