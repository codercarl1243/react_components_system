import Link from "@/components/link";
import type { LinkProps } from "@/components/link/link.type";
import clsx from "clsx";

export default function ReadTheBlogCTA({ className, ...props }: LinkProps) {
    return (
        <Link
            className={clsx("readTheBlog__Link", className)}
            href="/blog"
            {...props}
        >
            <svg
                className="blogIcon icon"
                viewBox="3 3 22 18"
                xmlns="http://www.w3.org/2000/svg"
                width="24" height="24"
                aria-hidden="true" focusable="false"
            >
                <path id="blog-pencil-tip"
                    d="M5.23447 18.8867L5.00977 18.7866L4.75459 19.4143L5.34099 19.1167L5.23447 18.8867ZM9.36154 16.7923L9.46805 17.0224L9.77693 16.8657L9.53422 16.6116L9.36154 16.7923ZM7.06374 14.3867L7.23641 14.2059L6.83904 14.2865L7.06374 14.3867ZM5.23447 18.8867L5.34099 19.1167L9.46805 17.0224L9.36154 16.7923L9.25503 16.5623L5.12796 18.6566L5.23447 18.8867ZM9.36154 16.7923L9.53422 16.6116L7.23641 14.2059L7.06374 14.3867L6.89106 14.5674L9.18886 16.9731L9.36154 16.7923ZM7.06374 14.3867L6.83904 14.2865L5.00977 18.7866L5.23447 18.8867L5.45917 18.9868L7.28844 14.4868L7.06374 14.3867Z"
                    stroke="var(--tip-stroke)"
                    fill="var(--tip-fill)"
                    strokeWidth="0.1" />
                <path id="blog-pencil-shaft"
                    d="M14.0164 7.1079L7.13608 14.3113L7.12734 15.0607L7.78418 14.9898L7.65761 15.6158L8.43227 15.6684L8.24535 16.3575L9.02146 16.2852L8.71382 17.1008L9.4928 16.7787L16.3732 9.57527L14.0164 7.1079Z"
                    stroke="var(--shaft-stroke)"
                    fill="var(--shaft-fill)"
                    strokeWidth="0.5" />
                <path id="blog-pencil-eraser"
                    d="M15.0565 6.71722C14.8721 6.52417 14.8721 6.21118 15.0565 6.01813L15.5475 5.5041C16.1983 4.82275 17.2534 4.82275 17.9042 5.5041V5.5041C18.555 6.18544 18.555 7.29012 17.9042 7.97147L17.4132 8.4855C17.2289 8.67855 16.9299 8.67855 16.7455 8.4855L15.0565 6.71722Z"
                    stroke="var(--eraser-stroke)"
                    fill="var(--eraser-fill)"
                    strokeWidth="0.5" />
                <path id="blog-star-1" fill="var(--color-primary-400)"
                    d="M14 -1.5 L14.9 2.1 L18.5 3 L14.9 3.9 L14 7.5 L13.1 3.9 L9.5 3 L13.1 2.1 Z" />
                {/* Star 2: secondary-400, drifts up-right */}
                <path id="blog-star-2" fill="var(--color-secondary-400)"
                    d="M20.5 -2 L21.175 0.7 L23.875 1.375 L21.175 2.05 L20.5 4.75 L19.825 2.05 L17.125 1.375 L19.825 0.7 Z" />
                {/* Star 3: accent-400, floats straight up */}
                <path id="blog-star-3" fill="var(--color-accent-400)"
                    d="M8.5 -2 L9.175 0.7 L11.875 1.375 L9.175 2.05 L8.5 4.75 L7.825 2.05 L5.125 1.375 L7.825 0.7 Z" />
            </svg>
            <span>Read the blog</span>
        </Link>
    );
}