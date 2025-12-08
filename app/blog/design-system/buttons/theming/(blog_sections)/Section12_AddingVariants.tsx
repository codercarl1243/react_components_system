import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";

export default function Section12_AddingVariants() {
    return (
        <PostSection id="adding-variants">
            <AnchorHeading as={"h2"} id="adding-variants-heading">Adding New Variants</AnchorHeading>
            <Code codeString={`:root {
    --color-warning-400: hsl(45, 93%, 47%);
}
.button[variant="warning"] {
    --button-secondary-color: var(--color-warning-400);
}`} lang="css" />
            <PostNote>
                <p>Adding a new variant only requires defining its color tokens and extending the <InlineCode codeString="TVariant" /> type.</p>
            </PostNote>
        </PostSection>
    )
}