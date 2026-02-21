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
                Before implementing any <em className="fun-underline">Primitive</em>, we need a shared foundation for all primitives. In this system, every primitive composes from <InlineCode codeString="Block" /> rather than reinventing the basics.
            </p>
            <p>
                Primitives define structural responsibility — not semantics. For that reason, all primitives are polymorphic, accepting an <InlineCode codeString="as" /> prop that declares the rendered element while preserving correct prop types.
            </p>
            <Code
                codeString={`import { ElementType, ComponentProps } from "react";

export type PrimitiveProps<T extends ElementType = "div"> = {
  as?: T;
} & Omit<ComponentProps<T>, "as">;`}
            />
            <Rule>
                Structure should layer upward from a single foundation.
            </Rule>
            <p>
                With that base contract in place, we can implement the simplest possible
                primitive: <InlineCode codeString="<Block />" />.
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
                The implementation is intentionally minimal. <InlineCode codeString="Block" /> doesn't introduce layout behavior — it
                simply provides a predictable containment surface that other primitives can build on.
            </p>
            <p>
                From here, <InlineCode codeString="Inline" /> and <InlineCode codeString="Stack" /> compose <InlineCode codeString="Block" />, adding focused structural responsibilities without duplicating the base surface.
            </p>
            <PostNote>
                <p>
                    Other systems may call this a <em>Box</em>, <em>Container</em>, or{" "}
                    <em>Wrapper</em>. The name is less important than the role:{" "}
                    <InlineCode codeString="Block" /> is the containment surface everything
                    else composes from.
                </p>
            </PostNote>
        </PostSection>
    );
}