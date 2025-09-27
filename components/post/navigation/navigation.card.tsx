import Link from "@/components/link";
import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

type NavigationCardProps = {
    href: string;
    label?: ReactNode;
    heading: ReactNode;
    children?: ReactNode;
    className?: string;
} & Omit<ComponentProps<'a'>, 'href' | 'children' | 'className'>;

export default function NavigationCard({ href, label, heading, children, className, ...props }: NavigationCardProps) {

    return (
        <Link href={href} className={clsx('navigation__card', className)} {...props}>
            {label && <span className="navigation__card-label">{label}</span>}
            <span className="navigation__card-heading">{heading}</span>
            {children}
        </Link>
    )
}