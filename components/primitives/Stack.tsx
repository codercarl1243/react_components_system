import clsx from "clsx";
import type { ElementType } from "react";
import { StackProps } from "@/components/primitives/types"; 
import { applyDataAttributes } from "@/lib/utils/applyDataAttributes";
import { wrapChildrenTextWithSiblings } from "@/lib/utils/react/wrapChildrenTextWithSiblings";

/**
 * Stack — a lightweight polymorphic layout wrapper.
 *
 * This component provides consistent vertical spacing between its children
 * using `flow-*` utility classes, while allowing polymorphic choice of a HTML element via the `as` prop.
 *
 * @template T The HTML element or React component to render.
 *
 * @param {Object} props
 * @param {T} [props.as="div"] – The element type to render. Defaults to `<div>`.
 * @param {0 | 4 | 8 | 16} [props.gap=4] – Vertical spacing between children,
 * @param {"start" | "center" | "end" | "stretch" | "baseline"} [props.align] – Vertical alignment of items.
 * @param {"start" | "center" | "end" | "stretch"} [props.justify] – Horizontal justification of items.
 * @param {string} [props.className] – Additional class names to apply.
 * @param {React.ReactNode} [props.children] – The component children.
 *
 * @example
 * // Basic usage
 * <Stack>
 *   <p>One</p>
 *   <p>Two</p>
 * </Stack>
 *
 * @example
 * // Custom element
 * <Stack as="section" gap={8}>
 *   <Heading>Section Title</Heading>
 *   <p>Some content…</p>
 * </Stack>
 *
 * @example
 * // With additional classes
 * <Stack className="bg-neutral-50 pad-4">
 *   <p>Styled container</p>
 * </Stack>
 */
export default function Stack<T extends ElementType = "div">({
    gap = 4,
    as,
    variant,
    align,
    justify,
    variantAppearance,
    className,
    children,
    ...props
}: StackProps<T>) {

    const Component = as ?? "div"
    const SafeChildren = wrapChildrenTextWithSiblings(children);
    return (
        <Component
            {...applyDataAttributes({ variant, appearance: variantAppearance })}
            className={clsx(
                `primitive stack`,
                `gap-row-${gap}`, 
                align ? `stack-align-${align}` : '',
                justify ? `stack-justify-${justify}` : '',
                className)}
            {...props}
        >
            {SafeChildren}
        </Component>
    )
}