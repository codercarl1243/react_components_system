'use client';
import { Children } from 'react'
import clsx from 'clsx'
import ToC from './TableOfContents';
import RelatedPosts from './RelatedPosts';
import Author from './author';
import { PostSideBarProps } from './sidebar.type';
import Button from '@/components/button';
import { RiMenuFold3Line, RiMenuUnfold3Line } from '@remixicon/react';
import Icon from '@/components/icon';
import useSidebar from '@/components/post/sidebar/useSidebar';

/**
 * Render a post sidebar containing an optional table of contents, related posts and an author box.
 *
* The component returns `null` when there are no contents, related posts or extra children/author to show.
* The table of contents highlights the currently active section (from the scroll spy) and intercepts clicks
* to scroll the target element into view using smooth scrolling when the user does not prefer reduced motion.
*
* Note: link hrefs rendered for TOC items are `item.href + "-heading"`, while the click handler locates and scrolls
* to the element using the original `item.href`.
*
* @param contents - Table-of-contents entries (each with `id`, `href` and `label`); defaults to an empty array.
* @param relatedPosts - Related post entries with `{ href, title }`; defaults to an empty array.
* @param author - Optional author metadata with `name` and optional `avatarUrl` and `bio`.
* @param className - Optional additional class names applied to the root <aside>.
* @param children - Additional nodes rendered after the sidebar sections.
* @returns The sidebar element, or `null` when nothing should be rendered.
 */
export default function PostSideBar({
    contents = [],
    relatedPosts = [],
    author,
    className,
    children,
    ...props
}: PostSideBarProps) {

    const { handleSideBarOpenState, sidebarIsOpen, sidebarRef, openButtonRef } = useSidebar()

    const hasContents = contents.length > 0;
    const hasRelated = relatedPosts.length > 0;
    const hasExtras = author || Children.count(children) > 0;

    if (!hasContents && !hasRelated && !hasExtras) return null;

    return (
        <div className='side-bar-wrapper'>
            <Button
                ref={openButtonRef}
                onClick={() => handleSideBarOpenState()}
                className='sidebar-toggle-button--open'
                aria-controls='sideBar'
                aria-expanded={sidebarIsOpen}
                aria-label="Open table of contents"
                data-style='filled'
            >
                <Icon icon={RiMenuFold3Line} color={"var(--color-neutral-100)"} />
                <span>Contents</span>
            </Button>
            <aside
                ref={sidebarRef}
                data-isopen={sidebarIsOpen}
                id="sideBar"
                className={clsx('post-sidebar flow-8', className)}
                {...props}
            >
                <Button
                    onClick={() => handleSideBarOpenState()}
                    className='sidebar-toggle-button--close'
                    aria-controls='sideBar'
                    aria-expanded={sidebarIsOpen}
                    data-style='filled'
                >
                    <Icon icon={RiMenuUnfold3Line} color={"var(--color-neutral-100)"} />
                    <span className="sr-only">Close table of contents</span>
                    <span aria-hidden="true">Contents</span>
                </Button>
                {/* Table of contents */}
                {hasContents && <ToC items={contents} />}
                {/* Related posts */}
                {hasRelated && <RelatedPosts posts={relatedPosts} />}
                {/* Author info */}
                {author && <Author author={author} />}
                {children}
            </aside>
        </div>
    )
}
