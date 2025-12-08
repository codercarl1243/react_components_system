import type { ElementType } from "react";
import type { BlockProps } from "@/components/primitives/types";
import { applyDataAttributes } from "@/lib/utils/applyDataAttributes";
import clsx from "clsx";
import { wrapChildrenTextWithSiblings } from "@/lib/utils/react/wrapChildrenTextWithSiblings";

/**
 * Block — a lightweight polymorphic layout wrapper.
 *
 * Block provides no spacing, alignment, or layout behavior on its own.
 * It simply renders the chosen element and forwards all props, making it
 * ideal as a semantic wrapper or structural grouping element.
 *
 * @template T The HTML element or React component to render.
 *
 * @param {Object} props
 * @param {T} [props.as="div"] – The element type to render. Defaults to `<div>`.
 * @param {string} [props.className] – Additional class names to apply.
 * @param {React.ReactNode} [props.children] – The component children.
 *
 * @example
 * // Basic usage
 * <Block>
 *   <p>One</p>
 *   <p>Two</p>
 * </Block>
 *
 * @example
 * // Custom element
 * <Block as="section">
 *   <Heading>Section Title</Heading>
 *   <p>Some content…</p>
 * </Block>
 *
 * @example
 * // With additional classes
 * <Block className="bg-neutral-50 pad-4">
 *   <p>Styled container</p>
 * </Block>
 */
export default function Block<T extends ElementType = "div">({
    as,
    variant,
    variantAppearance,
    className,
    children,
    ...props
}: BlockProps<T>) {
    const Component = as || "div";

    const SafeChildren = wrapChildrenTextWithSiblings(children);

    return <Component
        className={clsx("primitive", className)}
        {...applyDataAttributes({ variant, appearance: variantAppearance })}
        {...props}
    >
        {SafeChildren}
    </Component>
}