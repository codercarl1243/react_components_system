import clsx from "clsx";
import type { ComponentProps } from "react";

export default function PostSection({ children, className, ...props }: ComponentProps<'section'>) {

    return (
        <section className={clsx("post-section layout-wrapper flow-4", className)} {...props}>
            {children}
        </section>
    )

}