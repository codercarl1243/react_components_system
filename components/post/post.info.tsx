import { Inline, Row } from "@/components/primitives";
import type { RowProps } from "../primitives/types";
import clsx from "clsx";
import { Children } from "react";


export default function PostInfo({ children, className, ...props }: RowProps) {

    return (
        <Inline as="p" gap={0} className={clsx("postinfo", className)} {...props}>
            {Children.map(children, child => {
                // Wrap text nodes automatically
                if (typeof child === "string") {
                    return <span>{child}</span>;
                }
                return child;
            })}
        </Inline>
    )
}