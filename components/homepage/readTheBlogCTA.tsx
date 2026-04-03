import LinkButton from "@/components/link/linkButton";
import type { LinkProps } from "@/components/link/link.type";
import clsx from "clsx";
import Icon from "@/components/icon";

export default function ReadTheBlogCTA({ className, ...props }: LinkProps) {
    return (
        <LinkButton
            className={clsx("readTheBlog__Link", className)}
            href="/blog"
            variant="primary"
            variantAppearance="filled"
            paint="all"
            {...props}
        >
            <div className="book-icon">
                <Icon icon={bookIcon} />
            </div>
            <span>Read the blog</span>
        </LinkButton>
    );
}

const bookIcon = () => {

    return (
        <svg
            className="bookIcon"
            viewBox="0 0 32 26"
            width="32"
            height="26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
        >
            <defs>
                <filter id="pop-shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="0" stdDeviation="0.6" floodColor="rgba(255, 255, 255)" />
                </filter>
            </defs>

            {/* Spine */}
            <rect x="13.5" y="1" width="3" height="24" fill="var(--color-warning-600)" stroke="var(--color-warning-600)" strokeWidth="0.5" />
            <line x1="14.5" y1="1" x2="14.5" y2="25" stroke="var(--color-warning-600)" strokeWidth="0.4" strokeOpacity="0.9" />

            {/* Left cover */}
            <rect x="1" y="1" width="13.5" height="24" rx="1.5" fill="var(--color-warning-600)" stroke="var(--color-warning-600)" strokeWidth="1" />

            {/* Right cover */}
            <rect x="17" y="1" width="14" height="24" rx="1.5" fill="var(--color-warning-600)" stroke="var(--color-warning-600)" strokeWidth="1" />

            {/* LHS page */}
            <path d="M 1.5 1.9 Q 8 0.4 15 1.9 L 15 24.1 Q 8 22.6 1.5 24.1 Z"
                fill="#F5F2E8" stroke="var(--color-neutral-900)" strokeWidth="0.5" />
            <line x1="4" y1="8" x2="13" y2="7.5" stroke="var(--color-neutral-600)" strokeWidth="0.55" strokeOpacity="0.75" />
            <line x1="4" y1="13" x2="13" y2="12.7" stroke="var(--color-neutral-600)" strokeWidth="0.55" strokeOpacity="0.75" />
            <line x1="4" y1="18" x2="13" y2="17.8" stroke="var(--color-neutral-600)" strokeWidth="0.55" strokeOpacity="0.75" />

            {/* RHS second page — revealed when top page turns */}
            <path d="M 15 2.3 Q 23 0.8 30.5 2.3 L 30.5 23.7 Q 23 22.2 15 23.7 Z"
                fill="#F5F2E8" stroke="var(--color-neutral-900)" strokeWidth="0.4" />
            <line x1="18" y1="8" x2="29" y2="7.5" stroke="var(--color-neutral-600)" strokeWidth="0.5" strokeOpacity="0.65" />
            <line x1="18" y1="13" x2="29" y2="12.7" stroke="var(--color-neutral-600)" strokeWidth="0.5" strokeOpacity="0.65" />
            <line x1="18" y1="18" x2="29" y2="17.8" stroke="var(--color-neutral-600)" strokeWidth="0.5" strokeOpacity="0.65" />

            {/* Bookmark — above second page, below turning page */}
            <g id="book-bookmark">
                <rect x="19" y="0.5" width="3" height="10" rx="0.5" />
                <polygon points="19,10.5 20.5,9 22,10.5" fill="#F5F2E8" />
            </g>

            {/* RHS top page — turns on hover */}
            <g id="book-rhs-top">
                <path d="M 15 1.9 Q 23 0.4 30.5 1.9 L 30.5 24.1 Q 23 22.6 15 24.1 Z"
                    fill="#F5F2E8" stroke="var(--color-neutral-900)" strokeWidth="0.5" />
                <line x1="18" y1="8" x2="29" y2="7.5" stroke="var(--color-neutral-600)" strokeWidth="0.55" strokeOpacity="0.75" />
                <line x1="18" y1="13" x2="29" y2="12.7" stroke="var(--color-neutral-600)" strokeWidth="0.55" strokeOpacity="0.75" />
                <line x1="18" y1="18" x2="29" y2="17.8" stroke="var(--color-neutral-600)" strokeWidth="0.55" strokeOpacity="0.75" />
            </g>

            {/* Pop marks — last in layer order, nothing clips them */}
            <text className="pop-mark pop-mark-1"
                x="16.5" y="2.5" fontSize="5"
                filter="url(#pop-shadow)"
                textAnchor="middle" dominantBaseline="middle">✦</text>
            <text className="pop-mark pop-mark-2"
                x="26" y="4" fontSize="4.5"
                filter="url(#pop-shadow)"
                textAnchor="middle" dominantBaseline="middle">✦</text>
            <text className="pop-mark pop-mark-3"
                x="18.5" y="0" fontSize="4"
                filter="url(#pop-shadow)"
                textAnchor="middle" dominantBaseline="middle">✦</text>
        </svg>
    )
}