import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";

export default function Section3() {

    return (
        <PostSection id="variants">
            <AnchorHeading as="h2" id="variants-heading" prefix="step 2 -">
                Variants
            </AnchorHeading>
            <p className="bold italic">Expressing Semantic Intent</p>


            <p>
                Variants describe meaning, not appearance.
            </p>

            <p>
                A <InlineCode codeString="danger"/> variant communicates risk or error. A <InlineCode codeString="primary"/> variant communicates emphasis or importance. These labels are semantic, not visual.
            </p>

            <p>
                A variant does not decide whether something is filled or outlined, subtle or loud. Instead, it exposes a small, consistent contract that describes emphasis, contrast, and surface usage.
            </p>

            <p>
                This distinction matters because variants are long-lived. Visual trends change, but semantic meaning tends to remain stable. When variants encode appearance, they multiply and drift. When they remain semantic, they scale.
            </p>
        </PostSection>
    )
}