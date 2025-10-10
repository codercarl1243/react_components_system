export interface BlogPost {
    name: string;
    id: string;
    relatedPostIds: string[];
    url: string;
    lastModified: Date;
}

export interface RelatedPost {
    href: BlogPost['url'];
    title: BlogPost['name'];
}

const ButtonPosts: BlogPost[] = [
    {
        name: 'Button',
        id: 'design__button__01',
        relatedPostIds: ['design__button__slider__01', 'design__button__toggle__01'],
        url: '/blog/design-system/buttons',
        lastModified: new Date('2025-10-10')
    },
    {
        name: 'Slider Buttons',
        id: 'design__button__slider__01',
        relatedPostIds: ['design__button__01', 'design__button__toggle__01'],
        url: '/blog/design-system/buttons/sliders',
        lastModified: new Date('2025-10-10')
    },
    {
        name: 'Toggle Buttons',
        id: 'design__button__toggle__01',
        relatedPostIds: ['design__button__01', 'design__button__slider__01'],
        url: '/blog/design-system/buttons/toggle',
        lastModified: new Date('2025-10-10')
    },
]

export const BLOG_POSTS: BlogPost[] = [
    ...ButtonPosts
];

/**
 * Get a blog post by its ID
 */
export function getBlogPostById(id: string): BlogPost | undefined {
    return BLOG_POSTS.find(post => post.id === id);
}

/**
 * Get related posts for a given post ID
 */
export function getRelatedPosts(postId: string): RelatedPost[] {
  const post = getBlogPostById(postId);
  if (!post) return [];

  return post.relatedPostIds.reduce<RelatedPost[]>((acc, id) => {
    const related = getBlogPostById(id);
    if (related) acc.push({ href: related.url, title: related.name });
    return acc;
  }, []);
}