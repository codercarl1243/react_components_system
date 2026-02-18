import InlineCode from "@/components/code/inlineCode";
import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";
import Rule from "@/components/rule";

export default function Section3() {
    return (
        <PostSection id="why-not-just-use-html">
            <AnchorHeading as={"h2"} id="why-not-just-use-html-heading">
                Why Not Just Use HTML?
            </AnchorHeading>
            <p>
                HTML gives us structural elements — <InlineCode codeString="div" />,{" "}
                <InlineCode codeString="section" />,{" "}
                <InlineCode codeString="article" />.
            </p>
            <p>
                HTML describes document semantics — not structural roles within a
                layout system.
            </p>

            <p>
                Through utility classes, we can apply spacing and structure — but we
                cannot enforce ownership or guarantee that layout rhythm remains
                consistent across a system.
            </p>
            <Rule>
                Structural discipline cannot rely on convention alone.
            </Rule>
            <p>
                Primitives solve this by defining explicit structural contracts.
                <InlineCode codeString="Stack" /> owns vertical rhythm.
                <InlineCode codeString="Inline" /> owns horizontal alignment.
                <InlineCode codeString="Block" /> owns containment.
            </p>
            <p>
                If primitives define structural contracts, what are those contracts in practice?
            </p>
            <p>
                Most systems converge around a small, repeatable set of structural roles.
                These roles form the vocabulary of composition.
            </p>
        </PostSection>
    );
}