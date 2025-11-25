import clsx from "clsx";
import { ElementType } from "react";
import { RowProps } from "@/components/primitives/types";
import { applyDataAttributes } from "@/lib/utils/applyDataAttributes";

/**
 * Row — horizontal layout primitive.
 *
 * Places children in a horizontal line with optional spacing,
 * alignment, and justification.
 *
 * Perfect for "icon + text", button groups, toolbars, etc.
 */
export default function Row<T extends ElementType = "div">({
  as,
  gap = 4,
  align = "center",
  justify = "start",
  variant,
  variantAppearance,
  className,
  ...props
}: RowProps<T>) {
  const Component = as || "div";

  const classes = clsx(
    "primitive row",
    `gap-row-${gap}`,
    `row-align-${align}`,
    `row-justify-${justify}`,
    className
  )

  return <Component
    {...applyDataAttributes({ variant, appearance: variantAppearance })}
    className={classes}
    {...props} />;
}
