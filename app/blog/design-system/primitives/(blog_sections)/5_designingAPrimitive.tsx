import InlineCode from "@/components/code/inlineCode";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";
import Rule from "@/components/rule";

export default function Section5() {
    return (
        <PostSection id="designing-a-primitive">
            <AnchorHeading as="h2" id="designing-a-primitive-heading">
                Designing a Primitive
            </AnchorHeading>

            <p>
                A primitive constrains its API to the decisions it owns.
                <InlineCode codeString="<Stack />" /> accepts{" "}
                <InlineCode codeString="gap" /> and{" "}
                <InlineCode codeString="align" /> — not arbitrary class names defined per usage.
            </p>

            <Rule>
                A primitive's API reflects its structural responsibility.
            </Rule>

        </PostSection>
    );
}