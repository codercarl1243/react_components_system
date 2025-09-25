import clsx from "clsx";
import { ComponentProps } from "react";

export default function List({ children, className, ...props }: ComponentProps<'ul'>) {

    return <ul className={clsx("list", className)} {...props}>
        {children}
    </ul>
}