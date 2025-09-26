import Link from "@/components/link";
import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

type NavigationCardProps = {
    label: ReactNode
    heading: ReactNode
    children?: ReactNode
    className?: string
} & ComponentProps<'a'>;

export default function NavigationCard({ href, label, heading, children, className, ...props }: NavigationCardProps) {

    return (
        <Link href={href} className={clsx('navigation__card', className)} {...props}>
            <span className="navigation__card-label">{label}</span>
            <span className="navigation__card-heading">{heading}</span>
            {children}
        </Link>
    )
}