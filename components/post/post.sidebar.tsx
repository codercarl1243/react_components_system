'use client';
import { Children, useMemo, type ComponentProps } from 'react'
import Heading from '@/components/heading'
import clsx from 'clsx'
import Image from 'next/image'
import { useScrollSpy } from '@/utils/useScrollSpy';
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
    const ids = useMemo(() => contents.map((item) => item.id), [contents]);
    const { activeId } = useScrollSpy({ ids: ids });

    if (!hasContents && !hasRelated && !hasExtras) return null

    const handleContentsClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (!element) return;
        const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
        element.scrollIntoView({
            behavior: reduced ? 'auto' : 'smooth',
            block: 'start',
            inline: 'nearest',

        });

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
                                        className={clsx('toc-link', { 'toc-link--active': isActive })}
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
                                <Link href={post.href}>{post.title}</Link>
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
