import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import Rule from "@/components/rule";

export default function Section5() {
    return (
        <PostSection id="designing-a-primitive">
            <AnchorHeading as="h2" id="designing-a-primitive-heading">
                Designing a Primitive
            </AnchorHeading>

            <p>
                Before implementing <InlineCode codeString="<Block />" />, we need a shared
                contract for all primitives.
            </p>

            <p>
                Primitives define structural responsibility — not semantics. A structural surface might
                be a <InlineCode codeString="div" />, <InlineCode codeString="section" />, or{" "}
                <InlineCode codeString="ul" />. To support that flexibility, all primitives are polymorphic, accepting an{" "}
                <InlineCode codeString="as" /> prop that determines the rendered element while preserving correct prop types.
            </p>

            <Code
                codeString={`import { ElementType, ComponentProps } from "react";

export type PrimitiveProps<T extends ElementType = "div"> = {
  as?: T;
} & Omit<ComponentProps<T>, "as">;`}
            />

            <p>
                This type forms the structural contract for every primitive.
                It ensures that layout responsibility is constrained, while semantic flexibility remains intact.
            </p>

            <Rule>
                Structure should layer upward from a single foundation.
            </Rule>

            <p>
                With that base contract in place, we can implement the simplest
                possible structural surface: <InlineCode codeString="<Block />" />.
            </p>

            <Code
                codeString={`type BlockProps<T extends ElementType = "div"> =
  PrimitiveProps<T>;

export function Block<T extends ElementType = "div">({
  as,
  ...rest
}: BlockProps<T>) {
  const Component = as || "div";
  return <Component {...rest} />;
}`}
            />

            <p>
                The implementation is intentionally small.
                <InlineCode codeString="Block" /> does not control spacing.
                It does not define width.
                It does not apply layout modes.
                It establishes a structural surface — nothing more.
            </p>

            <PostNote>
                <p>
                    Other systems may call this a <em>Box</em>, <em>Container</em>,
                    or <em>Wrapper</em>. The name is less important than the contract.
                    Its responsibility is containment.
                </p>
            </PostNote>

        </PostSection>
    );
}