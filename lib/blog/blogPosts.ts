import { CODER_CARL_ID } from "@/lib/blog/authors/authors";
import { BLOG_CATEGORIES } from "@/lib/blog/blog.categories";
import { PostType } from "@/lib/blog/blog.types";
import { asPostId, asPostIds } from "@/lib/blog/blog.utils";
import { BLOG_SUBJECTS } from "./blog.subjects";
import { BLOG_KEYWORDS } from "./blog.keywords";

export const BLOG_BASE_PATH = '/blog';
export const BLOG_DESIGN_SYSTEM_PATH = `${BLOG_BASE_PATH}/design-system`;
export const BLOG_ACCESSIBILITY_PATH = `${BLOG_BASE_PATH}/accessibility`;

const design_system__theming: readonly Readonly<PostType>[] = [
    {
        id: asPostId('design__theming_01'),
        title: 'design-system',
        subtitle: 'Building a design system using CSS',
        excerpt: 'build a robust, library and framework agnostic design system',
        relatedPostIds: [],
        pathFragment: 'theming',
        lastModified: new Date('2025-12-10'),
        createdAt: new Date('2025-09-30'),
        published: true,
        featured: true,
        image: {
            src: '/images/blogs/design-system/theming/main-image.webp',
            alt: 'TBA'
        },
        authorId: CODER_CARL_ID,
        subject: `${BLOG_SUBJECTS.DESIGN_SYSTEM}`,
        keywords: [BLOG_KEYWORDS.THEMING, BLOG_KEYWORDS.FOUNDATIONS, BLOG_KEYWORDS.DESIGN_SYSTEM],
        categories: [BLOG_CATEGORIES.DESIGN_SYSTEM, BLOG_CATEGORIES.TOOLING],
    },
]
const ButtonPosts: readonly Readonly<PostType>[] = [
    {
        id: asPostId('design__button__01'),
        title: 'Buttons',
        subtitle: 'Foundations of an Accessible Button System',
        excerpt: 'Build a robust, accessible button foundation for your design system.',
        relatedPostIds: asPostIds(['design__button__slider__01', 'design__button__toggle__01']),
        pathFragment: '/buttons',
        lastModified: new Date('2025-10-10'),
        createdAt: new Date('2025-09-30'),
        published: true,
        featured: false,
        image: {
            src: '/images/blogs/button-base/main-image.webp',
            alt: 'Accessible button components with variants and states'
        },
        authorId: CODER_CARL_ID,
        subject: `${BLOG_SUBJECTS.DESIGN_SYSTEM}`,
        keywords: [BLOG_KEYWORDS.BUTTONS, BLOG_KEYWORDS.FOUNDATIONS, BLOG_KEYWORDS.ACCESSIBILITY, BLOG_KEYWORDS.DESIGN_SYSTEM],
        categories: [BLOG_CATEGORIES.DESIGN_SYSTEM, BLOG_CATEGORIES.ACCESSIBILITY],
    },
    {
        id: asPostId('design__button__theming__01'),
        title: 'Buttons - Theming & Variants',
        subtitle: 'Building a flexible color system for scalable, accessible design',
        excerpt: 'Transform your button into a themeable component with multiple variants and styles.',
        relatedPostIds: asPostIds(['design__button__01']),
        pathFragment: 'buttons/theming',
        lastModified: new Date('2025-10-15'),
        createdAt: new Date('2025-10-05'),
        published: true,
        featured: false,
        image: {
            src: '/og-image.png',
            alt: 'Grid of buttons in different colors and styles representing design system variants'
        },
        authorId: CODER_CARL_ID,
        subject: `${BLOG_SUBJECTS.DESIGN_SYSTEM}`,
        keywords: [BLOG_KEYWORDS.BUTTONS, BLOG_KEYWORDS.THEMING, BLOG_KEYWORDS.DESIGN_SYSTEM],
        categories: [BLOG_CATEGORIES.DESIGN_SYSTEM],
    }
    // {
    //     id: asPostId('design__button__slider__01'),
    //     title: 'Slider Buttons',
    //     excerpt: 'Explore slider-based button interactions for dynamic UI controls.',
    //     relatedPostIds: asPostIds(['design__button__01', 'design__button__toggle__01']),
    //     href: '/blog/design-system/buttons/sliders',
    //     lastModified: new Date('2025-10-10'),
    //     createdAt: new Date('2025-09-30'),
    //     published: true,
    //     image: {
    //         src: '/images/blog/button-slider-banner.jpg',
    //         alt: 'Slider-style button interactions with dynamic visuals'
    //     },
    //     authorId: CODER_CARL_ID,
    //     subject: `${BLOG_SUBJECTS.DESIGN_SYSTEM}`,
    //     keywords: [BLOG_KEYWORDS.BUTTONS, BLOG_KEYWORDS.FOUNDATIONS, BLOG_KEYWORDS.DESIGN_SYSTEM],
    //     categories: []
    // },
    // {
    //     id: asPostId('design__button__toggle__01'),
    //     title: 'Toggle Buttons',
    //     excerpt: 'Design accessible toggle buttons with proper ARIA and keyboard support.',
    //     relatedPostIds: asPostIds(['design__button__01', 'design__button__slider__01']),
    //     href: '/blog/design-system/buttons/toggle',
    //     lastModified: new Date('2025-10-10'),
    //     createdAt: new Date('2025-09-30'),
    //     published: true,
    //     image: {
    //         src: '/images/blog/button-toggle-banner.jpg',
    //         alt: 'Toggle button states and accessibility icons'
    //     },
    //     authorId: CODER_CARL_ID,
    //     subject: `${BLOG_SUBJECTS.DESIGN_SYSTEM}`,
    //     keywords: [BLOG_KEYWORDS.BUTTONS, BLOG_KEYWORDS.FOUNDATIONS, BLOG_KEYWORDS.DESIGN_SYSTEM],
    //     categories: []
    // }
];

export const BLOG_POSTS: PostType[] = [
    ...design_system__theming,
    ...ButtonPosts
];