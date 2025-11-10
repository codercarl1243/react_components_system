import { CODER_CARL_ID } from "@/lib/blog/authors/authors";
import { BLOG_CATEGORIES } from "@/lib/blog/blog.categories";
import { PostType } from "@/lib/blog/blog.types";
import { asPostId, asPostIds } from "@/lib/blog/blog.utils";

const ButtonPosts: PostType[] = [
    {
        id: asPostId('design__button__01'),
        title: 'Button',
        subtitle: 'Foundations of an Accessible Button System',
        excerpt: 'Build a robust, accessible button foundation for your design system.',
        relatedPostIds: asPostIds(['design__button__slider__01', 'design__button__toggle__01']),
        href: '/blog/design-system/buttons',
        lastModified: new Date('2025-10-10'),
        createdAt: new Date('2025-09-30'),
        published: true,
        featured: true,
        image: {
            src: '/images/blog/button-base-banner.jpg',
            alt: 'Accessible button components with variants and states'
        },
        authorId: CODER_CARL_ID,
        subject: 'Design System',
        keywords: ['buttons', 'accessibility', 'foundations'],
        categories: [BLOG_CATEGORIES.DESIGN_SYSTEM, BLOG_CATEGORIES.ACCESSIBILITY],
    },
    {
        id: asPostId('design__button__slider__01'),
        title: 'Slider Buttons',
        excerpt: 'Explore slider-based button interactions for dynamic UI controls.',
        relatedPostIds: asPostIds(['design__button__01', 'design__button__toggle__01']),
        href: '/blog/design-system/buttons/sliders',
        lastModified: new Date('2025-10-10'),
        createdAt: new Date('2025-09-30'),
        published: true,
        image: {
            src: '/images/blog/button-slider-banner.jpg',
            alt: 'Slider-style button interactions with dynamic visuals'
        },
        authorId: CODER_CARL_ID,
        subject: BLOG_CATEGORIES.DESIGN_SYSTEM,
        keywords: ['buttons', 'foundations'],
        categories: []
    },
    {
        id: asPostId('design__button__toggle__01'),
        title: 'Toggle Buttons',
        excerpt: 'Design accessible toggle buttons with proper ARIA and keyboard support.',
        relatedPostIds: asPostIds(['design__button__01', 'design__button__slider__01']),
        href: '/blog/design-system/buttons/toggle',
        lastModified: new Date('2025-10-10'),
        createdAt: new Date('2025-09-30'),
        published: true,
        image: {
            src: '/images/blog/button-toggle-banner.jpg',
            alt: 'Toggle button states and accessibility icons'
        },
        authorId: CODER_CARL_ID,
        subject: BLOG_CATEGORIES.DESIGN_SYSTEM,
        keywords: ['buttons', 'foundations'],
        categories: []
    }
];

export const BLOG_POSTS: PostType[] = [
    ...ButtonPosts
];

