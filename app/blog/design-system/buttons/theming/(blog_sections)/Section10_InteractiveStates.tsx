import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";

export default function Section10_InteractiveStates() {
    return (
        <PostSection id="interactive-states">
            <AnchorHeading as={"h2"} id="interactive-states-heading">Interactive States</AnchorHeading>
            <Code codeString={`.button:hover { outline: 1px solid var(--button-outline-color); }`} lang="css" />
            <PostNote>
                <p>Using <InlineCode codeString="var(--button-outline-color)" lang="css" /> ensures all hover/focus states automatically match the variant.</p>
            </PostNote>
        </PostSection>
    )
}