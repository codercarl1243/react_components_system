import Code from "@/components/code";
import FunHighlight from "@/components/decorations/FunHighlight";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";

export default function Section09_DisabledStates() {
    return (
        <PostSection id="disabled-states">
            <AnchorHeading as={"h2"} id="disabled-states-heading">Handling Disabled States</AnchorHeading>
            <Code codeString={`.button:is(:disabled, [aria-disabled="true"]) {
    --button-bg-color: var(--color-neutral-200);
    --button-text-color: var(--color-neutral-800);
}`} lang="css" />
            <PostNote>
                <p><FunHighlight>Accessibility:</FunHighlight> Disabled buttons must appear clearly non-interactive across all variants.</p>
            </PostNote>
        </PostSection>
    )
}