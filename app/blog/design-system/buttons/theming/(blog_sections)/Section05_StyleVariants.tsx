import Code from "@/components/code";
import FunHighlight from "@/components/decorations/FunHighlight";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";

export default function Section05_StyleVariants() {
    return (
        <PostSection id="style-variants">
            <AnchorHeading as={"h2"} id="style-variants-heading">Creating Style Variants</AnchorHeading>
            <p>We'll create three button styles: Filled, Outlined, and Ghost, using <FunHighlight>data-style</FunHighlight> attributes instead of classes.</p>
            <Code codeString={`.button[data-style="outlined"] {
    --button-bg-color: var(--button-primary-color);
    --button-text-color: var(--button-secondary-color);
    --button-border-color: var(--button-accent-color);
}`} lang="css" />
            <PostNote>
                <p><strong>Why data attributes?</strong> They make intent clearer and reduce specificity issues.</p>
            </PostNote>
        </PostSection>
    )
}