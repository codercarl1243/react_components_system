import { ElementType } from "react";
import { BlockProps } from "@/components/primitives/types";

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
export default function Block<T extends ElementType = "div">({ as, ...props }: BlockProps<T>) {
    const Component = as || "div";

    return <Component {...props} />
}