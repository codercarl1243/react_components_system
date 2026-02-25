import Code from "@/components/code";
import FunHighlight from "@/components/decorations/FunHighlight";
import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";

export default function Section03_CustomProperties() {
    return (
        <PostSection id="css-custom-properties">
            <AnchorHeading as={"h2"} id="css-custom-properties-heading">The CSS Custom Property Pattern</AnchorHeading>
            <p>Instead of hard-coding colors, we'll use <FunHighlight>CSS custom properties</FunHighlight> (CSS variables) to create a flexible theming system.</p>
            <AnchorHeading as={"h3"}>Step 1: Define Semantic Variables</AnchorHeading>
            <Code codeString={`.button {
    --button-bg-color: var(--color-primary-400);
    --button-text-color: var(--color-neutral-100);
    --button-border-color: var(--color-primary-600);
    --button-outline-color: var(--color-primary-600);

    background-color: var(--button-bg-color);
    color: var(--button-text-color);
    border-color: var(--button-border-color);
    outline-color: var(--button-outline-color);
}`} lang="css" />
            <PostNote>
                <p><strong>Why this works:</strong></p>
                <List>
                    <li>Separation of concerns — logic is separate from color values</li>
                    <li>Easy overrides — change the custom property, not the rule</li>
                    <li>Self-documenting — names describe what each color does</li>
                </List>
            </PostNote>
        </PostSection>
    )
}