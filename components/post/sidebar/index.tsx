'use client';
import { Children } from 'react'
import clsx from 'clsx'
import ToC from './TableOfContents';
import RelatedPosts from './RelatedPosts';
import Author from './author';
import { PostSideBarProps } from './sidebar.type';


/**
 * Render a post sidebar with an optional table of contents, related posts and author box.
 *
 * The component returns null if there is nothing to render.
 *  
 * The table of contents highlights the currently active section (from `usePost().activeId`) and intercepts clicks to smoothly
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

    if (!hasContents && !hasRelated && !hasExtras) return null


    return (
        <aside className={clsx('post-sidebar flow-8', className)} {...props}>
            {/* Table of contents */}
            {hasContents && <ToC items={contents} />}
            {/* Related posts */}
            {hasRelated && <RelatedPosts posts={relatedPosts} />}
            {/* Author info */}
            {author && <Author author={author} />}
            {children}
        </aside>
    )
}
