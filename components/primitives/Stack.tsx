import clsx from "clsx";
import type { ElementType } from "react";
import { StackProps } from "@/components/primitives/types"; 
import { applyDataAttributes } from "@/lib/utils/applyDataAttributes";
import { wrapChildrenTextWithSiblings } from "@/lib/utils/react/wrapChildrenTextWithSiblings";

/**
 * Stack — a lightweight polymorphic layout wrapper.
 *
 * This component provides consistent vertical spacing between its children
 * using your `flow-*` utility classes, while allowing you to choose the
 * rendered HTML element via the `as` prop.
 *
 * It is useful for grouping content in your design system or blog
 * without introducing layout-specific div wrappers everywhere.
 *
 * @template T The HTML element or React component to render.
 *
 * @param {Object} props
 * @param {T} [props.as="div"] – The element type to render. Defaults to `<div>`.
 * @param {0 | 4 | 8 | 16} [props.gap=4] – Vertical spacing between children,
 * mapped to your `flow-{gap}` utility classes.
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
            className={clsx(`primitive stack gap-row-${gap}`, className)}
            {...props}
        >
            {SafeChildren}
        </Component>
    )
}