import clsx from "clsx";
import type { ElementType } from "react";
import type { BlockProps, InlineProps } from "@/components/primitives/types";
import Block from "./Block";

/**
 * Inline — horizontal flow layout, optionally wrapping.
 *
 * Ideal for tags, badges, button groups, metadata lists, or any
 * horizontal layout where items may need to wrap naturally.
 */
export default function Inline<T extends ElementType = "div">({
    gap = 4,
    align = "baseline",
    justify = "initial",
    wrap = true,
    className,
    ...blockProps
}: InlineProps<T>) {

    const classes = clsx(
        "inline-flow",
        wrap ? "inline-wrap" : "inline-nowrap",
        `gap-${gap}`,
        `inline-align-${align}`,
        `inline-justify-${justify}`,
        className
    )

    return <Block
        className={classes}
        {...(blockProps as BlockProps<T>)}
    />
}
