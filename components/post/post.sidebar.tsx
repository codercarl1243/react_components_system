'use client';
import { Children, type ComponentProps } from 'react'
import Heading from '@/components/heading'
import clsx from 'clsx'
import Image from 'next/image'
import { usePost } from '@/components/post/usePost';
import Link from '@/components/link';

type TableOfContentsItem = {
    id: string;
    href: string;
    label: string;
};

type PostSideBarProps = {
    contents?: TableOfContentsItem[]
    relatedPosts?: { href: string; title: string }[];
    author?: { name: string; avatarUrl?: string; bio?: string };
} & ComponentProps<'aside'>;

/**
 * Render a post sidebar with an optional table of contents, related posts and author box.
 *
 * The component returns null if there is nothing to render. The table of contents highlights
 * the currently active section (from `usePost().activeId`) and intercepts clicks to smoothly
 * scroll the target element into view instead of performing the default navigation.
 *
 * @param contents - Array of table-of-contents entries; each item should contain `id`, `href` and `label`.
 * @param relatedPosts - Array of related post entries with `{ href, title }`.
 * @param author - Optional author metadata; expected fields: `name`, and optionally `avatarUrl` and `bio`.
 * @param className - Additional class names to apply to the root <aside>.
 * @param children - Any additional nodes to render inside the sidebar (rendered after other sections).
 * @returns The sidebar element or `null` when there are no sections to show.
 */
export default function PostSideBar({
    contents = [],
    relatedPosts = [],
    author,
    className,
    children,
    ...props
}: PostSideBarProps) {
    const hasContents = contents.length > 0
    const hasRelated = relatedPosts.length > 0
    const hasExtras = author || Children.count(children) > 0
    const { activeId } = usePost();
    if (!hasContents && !hasRelated && !hasExtras) return null
    const handleContentsClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({
                behavior: 'instant',
                block: 'start'
            });
        }
    };
    return (
        <aside className={clsx('post-sidebar flow-8', className)} {...props}>
            {/* Table of contents */}
            {hasContents && (
                <nav className="post-sidebar__contents flow-4" aria-labelledby="toc-heading">
                    <Heading headingLevel={2} id="toc-heading">Table of contents</Heading>
                    <ol className='toc-list'>
                        {contents.map(item => {
                            const isActive = activeId === item.id;
                            return (
                                <li key={item.id} className={clsx('toc-item', { 'toc-item--active': isActive })}>
                                    <Link
                                        href={item.href}
                                        className={clsx('toc-link', {'toc-link--active': isActive })}
                                        onClick={(e) => handleContentsClick(e, item.href)}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            )
                        })}
                    </ol>
                </nav>
            )}
            {/* Related posts */}
            {hasRelated && (
                <section
                    className="post-sidebar__related"
                >
                    <Heading headingLevel={2} >Related Posts</Heading>
                    <ul>
                        {relatedPosts.map((post) => (
                            <li key={post.href}>
                                <a href={post.href}>{post.title}</a>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
            {/* Author info */}
            {author && (
                <section
                    className="post-sidebar__author"
                >
                    <Heading headingLevel={2} >About the Author</Heading>
                    <div className="author">
                        {author.avatarUrl && (
                            <Image
                                src={author.avatarUrl}
                                alt={author.name}
                                className="author__avatar"
                                loading="lazy"
                                width={100}
                                height={100}
                            />
                        )}

                        <dl className="author__info">
                            <div>
                                <dt className="author__term sr-only">Name</dt>
                                <dd className="author__name">{author.name}</dd>
                            </div>

                            {author.bio && (
                                <div>
                                    <dt className="author__term sr-only">Bio</dt>
                                    <dd className="author__bio">{author.bio}</dd>
                                </div>
                            )}
                        </dl>
                    </div>
                </section>
            )}
            {children}
        </aside>
    )
}
