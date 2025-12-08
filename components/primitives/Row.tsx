import clsx from "clsx";
import type { ElementType } from "react";
import type { BlockProps, RowProps } from "@/components/primitives/types";
import Block from "./Block";

/**
 * Row — horizontal layout primitive.
 *
 * Places children in a horizontal line with optional spacing,
 * alignment, and justification.
 *
 * Perfect for "icon + text", button groups, toolbars, etc.
 */
export default function Row<T extends ElementType = "div">({
  gap = 4,
  align = "center",
  justify = "start",
  className,
  ...blockProps
}: RowProps<T>) {

  const classes = clsx(
    "primitive row",
    `gap-col-${gap}`,
    `row-align-${align}`,
    `row-justify-${justify}`,
    className
  )
  return <Block
    className={classes}
    {...(blockProps as BlockProps<T>)} />
}
