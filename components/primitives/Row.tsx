import clsx from "clsx";
import { ElementType, PolymorphicProps } from "react";

type RowProps<T extends ElementType = "div"> = PolymorphicProps<
  T,
  {
    gap?: 0 | 4 | 8 | 16;
    align?: "start" | "center" | "end" | "stretch";
    justify?: "start" | "center" | "end" | "between";
  }
>;

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
  className,
  children,
  ...props
}: RowProps<T>) {
  const Component = as || "div";

  return (
    <Component
      className={clsx(
        "row",
        `row-gap-${gap}`,
        `row-align-${align}`,
        `row-justify-${justify}`,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
