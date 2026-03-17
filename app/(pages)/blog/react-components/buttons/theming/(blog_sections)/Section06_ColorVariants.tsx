import Code from "@/components/code";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";

export default function Section06_ColorVariants() {
    return (
        <PostSection id="color-variants">
            <AnchorHeading as={"h2"} id="color-variants-heading">Creating Color Variants</AnchorHeading>
            <p>Now, we'll define Primary, Secondary, Accent, and Danger variants using semantic mappings.</p>
            <Code codeString={`.button[variant="primary"] {
    --button-primary-color: var(--color-neutral-100);
    --button-secondary-color: var(--color-primary-400);
    --button-accent-color: var(--color-primary-600);
}`} lang="css" />
            <PostNote>
                <p><strong>How it works:</strong> Combine <code>data-style</code> and <code>data-variant</code> attributes for composable theming.</p>
            </PostNote>
        </PostSection>
    )
}