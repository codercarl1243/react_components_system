'use client';
import Heading from "@/components/heading";
import Link from '@/components/link';
import clsx from "clsx";
import { useMemo, type MouseEvent } from "react";
import { useScrollSpy } from "@/lib/hooks/useScrollSpy";
import { PostSideBarProps } from "./sidebar.type";
import { isNonEmptyArray, isNullish } from "@/lib/utils/guards";

// type ToCProps = {
//     items: { id: string; href: string; label: string }[]
// }

/**
 * Render a table of contents for a post, with links to each section.
 * The currently active section is highlighted based on scroll position.
 * Clicking a link smoothly scrolls the target section into view.
 * @param items - Array of table-of-contents entries; each item should contain `id`, `href` and `label`.
 * @returns The table of contents navigation or `null` when there are no items.
 */

export default function TableOfContents({ contents }: { contents: PostSideBarProps['contents'] }) {
    if (isNullish(contents) || !isNonEmptyArray(contents)) return null;

    const ids = useMemo(() => contents.map((item) => item.id), [contents]);
    const { activeId } = useScrollSpy({ ids });

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
                {contents.map(item => {
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