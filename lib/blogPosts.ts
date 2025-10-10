export interface BlogPost {
    name: string;
    id: string;
    relatedPostIds: string[];
    url: string;
}

const ButtonPosts: BlogPost[] = [
    {
        name: 'Button',
        id: 'design__button__01',
        relatedPostIds: ['design__button__slider__01', 'design__button__toggle__01'],
        url: '/blog/design-system/buttons'
    },
    {
        name: 'Slider Buttons',
        id: 'design__button__slider__01',
        relatedPostIds: ['design__button__01', 'design__button__toggle__01'],
        url: '/blog/design-system/buttons/sliders'
    },
    {
        name: 'Toggle Buttons',
        id: 'design__button__toggle__01',
        relatedPostIds: ['design__button__01', 'design__button__slider__01'],
        url: '/blog/design-system/buttons/toggle'
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
export function getRelatedPosts(postId: string): BlogPost[] {
    const post = getBlogPostById(postId);
    if (!post) return [];

    return post.relatedPostIds
        .map(id => getBlogPostById(id))
        .filter((post): post is BlogPost => post !== undefined);
}