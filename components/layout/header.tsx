import SkipLink from "@/components/skiplink";
import type { ComponentProps } from "react";

export default function Navigation(props: ComponentProps<'header'>) {

    return (
        <header className="header" aria-label="Main" {...props}>
            <SkipLink />
            <nav>
                nav
            </nav>
        </header>
    )
}