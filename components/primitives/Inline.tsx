import clsx from "clsx";
import { ElementType, PolymorphicProps } from "react";

type InlineProps<T extends ElementType = "div"> = PolymorphicProps<
  T,
  {
    gap?: 0 | 4 | 8 | 16;
    align?: "start" | "center" | "end" | "stretch";
    wrap?: boolean; // true = wrap (default), false = nowrap
  }
>;

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
  className,
  children,
  ...props
}: InlineProps<T>) {
  const Component = as || "div";

  return (
    <Component
      className={clsx(
        "inline-flow",
        wrap ? "inline-wrap" : "inline-nowrap",
        `inline-gap-${gap}`,
        `inline-align-${align}`,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
