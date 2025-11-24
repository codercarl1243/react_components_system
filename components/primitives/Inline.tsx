import clsx from "clsx";
import type { ElementType } from "react";
import type { InlineProps } from "@/components/primitives/types";
import { applyDataAttributes } from "@/lib/utils/applyDataAttributes";



/**
 * Inline — horizontal flow layout, optionally wrapping.
 *
 * Ideal for tags, badges, button groups, metadata lists, or any
 * horizontal layout where items may need to wrap naturally.
 *
 * Think of Inline as "Row, but optionally wrapping".
 */
export default function Inline<T extends ElementType = "div">({
    as,
    gap = 4,
    align = "center",
    wrap = true,
    variant,
    variantAppearance,
    className,
    ...props
}: InlineProps<T>) {
    const Component = as || "div";

    const classes = clsx(
        "inline-flow",
        wrap ? "inline-wrap" : "inline-nowrap",
        `inline-gap-${gap}`,
        `inline-align-${align}`,
        className
    )

    return <Component
        {...applyDataAttributes({ variant, appearance: variantAppearance })}
        className={classes}
        {...props}
    />;
}
