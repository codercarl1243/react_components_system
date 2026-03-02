import clsx from "clsx";
import { ElementType, ComponentProps } from "react";

export type PrimitiveProps<T extends ElementType = "div"> = {
  as?: T;
} & Omit<ComponentProps<T>, "as">;

type BlockProps<T extends ElementType = "div"> =
  PrimitiveProps<T>;

export function Block<T extends ElementType = "div">({
  as,
  ...rest
}: BlockProps<T>) {

  const Component = as || "div";

  return <Component {...rest} />;
}

export type StackProps<T extends ElementType = "div"> =
BlockProps<T> & {
    gap?: number;
    align?: "start" | "center" | "end" | "stretch" | "baseline";
};

export default function Stack<T extends ElementType = "div">({
    gap = 4,
    align = "baseline",
    className,
    ...blockProps
}: StackProps<T>) {

    const classes = clsx(
                'stack',
                `gap-row-${gap}`, 
                `stack-align-${align}`,
                className);

    return (
        <Block
            className={classes}
            {...blockProps as BlockProps<T>}
        />
    )
}