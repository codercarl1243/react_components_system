'use client';
import Heading from "@/components/heading";
import Link from '@/components/link';
import clsx from "clsx";
import { useMemo, type MouseEvent } from "react";
import { useScrollSpy } from "@/lib/hooks/useScrollSpy";
import { PostSideBarProps } from "./sidebar.type";
import { isNonEmptyArray } from "@/lib/utils/guards";

/**
 * Renders a table of contents for a post.
 *
 * Displays a list of section links derived from the provided contents and
 * highlights the currently active section based on scroll position.
 * Clicking a link scrolls the target section into view using smooth scrolling
 * (unless the user has enabled reduced motion) and updates the URL hash
 * without triggering a native jump.
 *
 * If no contents are provided, or the contents array is empty, nothing is rendered.
 *
 * @component
 *
 * @param contents - An ordered list of table-of-contents items, each containing
 * a section id, hash href, and display label.
 *
 * @returns A navigation element containing the table of contents, or `null`
 * when there are no items to display.
 */

export default function TableOfContents({ contents }: { contents: PostSideBarProps['contents'] }) {

    const contentsArray = isNonEmptyArray(contents) ? contents : [];
    const ids = useMemo(() => contentsArray.map((item) => item.id), [contentsArray]);
    const { activeId } = useScrollSpy({ ids });

    if (contentsArray.length === 0 ) return null;


    const handleContentsClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (!element) return;
        const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
        element.scrollIntoView({
            behavior: reduced ? 'auto' : 'smooth',
            block: 'start',
            inline: 'nearest',
        });
        // Update the URL hash without jumping 
        if (history.replaceState) {
            history.replaceState(null, '', href);
        }
    };

    return (
        <nav className="post-sidebar__contents flow-4" aria-labelledby="toc-heading">
            <Heading as={"h2"} id="toc-heading">Table of contents</Heading>
            <ol className='toc-list'>
                {contentsArray.map(item => {
                    const isActive = activeId === item.id;
                    return (
                        <li key={item.id} className={clsx('toc-item', { 'toc-item--active': isActive })}>
                            <Link
                                href={`${item.href}-heading`}
                                className={clsx('toc-link', { 'toc-link--active': isActive })}
                                onClick={(e) => handleContentsClick(e, `${item.href}-heading`)}
                            >
                                {item.label}
                            </Link>
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}