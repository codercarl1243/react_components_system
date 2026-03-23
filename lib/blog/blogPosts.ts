import { CODER_CARL_ID } from "@/lib/blog/authors/authors";
import { BLOG_CATEGORIES } from "@/lib/blog/blog.categories";
import { PostType } from "@/lib/blog/blog.types";
import { asPostId, asPostIds } from "@/lib/blog/blog.utils";
import { BLOG_SUBJECTS } from "./blog.subjects";
import { BLOG_KEYWORDS } from "./blog.keywords";

const design_system: readonly Readonly<PostType>[] = [
    {
        id: asPostId('design__theming_01'),
        title: 'Building a Theming System',
        subtitle: 'A Practical Implementation Guide',
        excerpt: 'build a robust, library and framework agnostic design system',
        meta: {
            title: 'Building a Theming System',
            description:
                'Build a scalable, maintainable theming system using clear layers, explicit opt-in styling, and framework-agnostic CSS.',
        },
        relatedPostIds: asPostIds([
            'design__primitives_01',
            'design__utility_tokens_01',
        ]),
        pathFragment: 'theming',
        lastModified: new Date('2025-12-10'),
        createdAt: new Date('2025-09-30'),
        published: true,
        featured: true,
        image: {
            src: '/images/blogs/design-system/theming/main-image.webp',
            alt: "A designer's desk with UI panels showing appearance options, variant styles, and style controls, alongside four button variants and design tools scattered around"
        },
        authorId: CODER_CARL_ID,
        subject: `${BLOG_SUBJECTS.DESIGN_SYSTEM}`,
        keywords: [BLOG_KEYWORDS.THEMING, BLOG_KEYWORDS.FOUNDATIONS, BLOG_KEYWORDS.DESIGN_SYSTEM],
        categories: [BLOG_CATEGORIES.DESIGN_SYSTEM, BLOG_CATEGORIES.TOOLING],
    },
    {
        id: asPostId('design__primitives_01'),
        title: 'Design System Primitives',
        subtitle: 'A Practical Implementation Guide',
        excerpt: 'An introduction to structural primitives in a design system — what they are, how they encode layout intent, and why they scale better than ad-hoc HTML composition.',
        meta: {
            title: 'Design System Primitives — What They Are and Why They Matter',
            description:
                'Learn what primitives are in a design system, how they encode structural intent, and why they create safer, more scalable layout patterns than ad-hoc HTML.',
        },
        relatedPostIds: asPostIds([
            'design__theming_01',
            'design__utility_tokens_01',
        ]),
        pathFragment: 'primitives',
        lastModified: new Date('2026-02-17'),
        createdAt: new Date('2025-10-05'),
        published: true,
        featured: false,
        image: {
            src: '/images/blogs/design-system/primitives/main-image.webp',
            alt: `Four stone blocks in ascending size, each engraved with progressively more specific HTML — from the raw </> through <input type="button"> and <a role="button"> to a fully realised <button> — illustrating the evolution from a basic primitive to a complete interactive element`
        },
        authorId: CODER_CARL_ID,
        subject: `${BLOG_SUBJECTS.DESIGN_SYSTEM}`,
        keywords: [
            BLOG_KEYWORDS.PRIMITIVES,
            BLOG_KEYWORDS.LAYOUT,
            BLOG_KEYWORDS.DESIGN_SYSTEM,
            BLOG_KEYWORDS.STRUCTURE,
            BLOG_KEYWORDS.REACT,
        ],
        categories: [
            BLOG_CATEGORIES.DESIGN_SYSTEM,
            BLOG_CATEGORIES.FOUNDATIONS,
        ],
    },
    {
        id: asPostId('design__utility_tokens_01'),
        title: 'Design System Utility Tokens',
        subtitle: 'A Practical Implementation Guide',
        excerpt: 'Spacing, typography, and breakpoint tokens — the remaining foundation layer every component depends on.',
        meta: {
            title: 'Design System Utility Tokens — Spacing, Typography & Breakpoints',
            description:
                'A practical guide to implementing spacing, typography scale, and breakpoint tokens in a design system — the raw values every component depends on.',
        },
        relatedPostIds: asPostIds([
            'design__theming_01',
            'design__primitives_01',
        ]),
        pathFragment: 'utility-tokens',
        lastModified: new Date('2026-03-23'),
        createdAt: new Date('2026-03-23'),
        published: true,
        featured: false,
        image: {
            src: '/images/blogs/design-system/utility-tokens/main-image.webp',
            alt: 'CSS token variables for spacing, typography, and breakpoints arranged on a structured grid, representing the raw values a design system depends on',
        },
        authorId: CODER_CARL_ID,
        subject: `${BLOG_SUBJECTS.DESIGN_SYSTEM}`,
        keywords: [BLOG_KEYWORDS.TOKENS, BLOG_KEYWORDS.FOUNDATIONS, BLOG_KEYWORDS.DESIGN_SYSTEM],
        categories: [
            BLOG_CATEGORIES.DESIGN_SYSTEM,
            BLOG_CATEGORIES.FOUNDATIONS,
        ],
    },
];

const react_components: readonly Readonly<PostType>[] = [
    {
        id: asPostId('components__button__01'),
        title: 'Buttons',
        subtitle: 'Foundations of an Accessible Button System',
        excerpt: 'A Practical React Component Guide',
        meta: {
            title: 'Buttons in React - Building an Accessible Button Component',
            description: 'A practical guide to building a type-safe, accessible React button component with async support, keyboard interactions, and design system integration.'
        },
        // relatedPostIds: asPostIds([
        //     'design__button__slider__01',
        //     'design__button__toggle__01'
        // ]),
        pathFragment: 'buttons',
        lastModified: new Date('2026-03-17'),
        createdAt: new Date('2026-03-17'),
        published: false,
        featured: false,
        image: {
            src: '/images/blogs/react-components/button/main-image.webp',
            alt: 'Button component code arranged as interlocking puzzle pieces on a dark blue background'
        },
        authorId: CODER_CARL_ID,
        subject: `${BLOG_SUBJECTS.REACT_COMPONENTS}`,
        keywords: [BLOG_KEYWORDS.BUTTONS, BLOG_KEYWORDS.REACT_COMPONENTS, BLOG_KEYWORDS.FOUNDATIONS, BLOG_KEYWORDS.ACCESSIBILITY],
        categories: [BLOG_CATEGORIES.REACT_COMPONENTS, BLOG_CATEGORIES.ACCESSIBILITY],
    }
];

export const BLOG_POSTS: PostType[] = [
    ...design_system,
    ...react_components
];
