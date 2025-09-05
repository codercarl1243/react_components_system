import SkipLink from "@/components/skiplink";
import clsx from "clsx";
import type { ComponentProps } from "react";

export default function Header({className,...props}: ComponentProps<'header'>) {

    return (
        <header className={clsx('header', className)} aria-label="Main" {...props}>
            <SkipLink />
            <nav>
                nav
            </nav>
        </header>
    )
}