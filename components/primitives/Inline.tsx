import clsx from "clsx";
import type { ElementType } from "react";
import type { InlineProps } from "@/components/primitives/types";
import { applyDataAttributes } from "@/lib/utils/applyDataAttributes";
import { wrapTextChildren } from "@/lib/utils/react/wrapTextChildren";



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
    align = "baseline",
    wrap = true,
    variant,
    variantAppearance,
    children,
    className,
    ...props
}: InlineProps<T>) {
    const Component = as ?? "div";

    const classes = clsx(
        "primitive inline-flow",
        wrap ? "inline-wrap" : "inline-nowrap",
        `gap-${gap}`,
        `inline-align-${align}`,
        className
    )
    const SafeChildren = wrapTextChildren(children);
    
    return <Component
        {...applyDataAttributes({ variant, appearance: variantAppearance })}
        className={classes}
        {...props}
    >
        {SafeChildren}
    </Component>;
}
