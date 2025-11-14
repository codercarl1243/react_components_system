'use client';
import { Children } from 'react'
import clsx from 'clsx'
import ToC from './TableOfContents';
import RelatedPosts from './RelatedPosts';
import Author from './author';
import { PostSideBarProps } from './sidebar.type';
import Button from '@/components/button';
import { RiCloseLargeLine, RiMenuFold3Line } from '@remixicon/react';
import HamburgerMenu from '@/components/hamburger/hamburger.menu';
import { Hamburger } from '@/components/hamburger';

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
    const hasContents = contents.length > 0;
    const hasRelated = relatedPosts.length > 0;
    const hasExtras = author || Children.count(children) > 0;

    if (!hasContents && !hasRelated && !hasExtras) return null;

    return (
        <Hamburger.Wrapper 
            as="div"
            position="right"
            className='side-bar--wrapper'
            breakpoint="mobile"
            menuId='sideBar'
        >
            <Hamburger.Toggle
                className="sidebar-toggle-button"
                data-style='filled'
                openAriaLabel="Open table of contents"
                closeAriaLabel="Close table of contents"
                openIcon={RiMenuFold3Line}
            >
                <span aria-hidden="true">Contents</span>
            </Hamburger.Toggle>
            <Hamburger.Menu
                
                className={clsx('post-sidebar hamburger-menu flow-8', className)}
                {...props}
            >
                {hasContents && <ToC items={contents} />}
                {hasRelated && <RelatedPosts posts={relatedPosts} />}
                {author && <Author author={author} />}
                {children}
            </Hamburger.Menu>
        </Hamburger.Wrapper>
    )
}
