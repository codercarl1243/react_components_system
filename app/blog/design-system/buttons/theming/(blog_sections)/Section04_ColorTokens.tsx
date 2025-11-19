import Code from "@/components/code";
import FunHighlight from "@/components/decorations/FunHighlight";
import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";

export default function Section04_ColorTokens() {
    return (
        <PostSection id="color-tokens">
            <AnchorHeading as={"h2"} id="color-tokens-heading">Building a Color Token System</AnchorHeading>
            <p>Before creating variants, let's establish our color tokens — the foundation of your design system.</p>
            <Code codeString={`:root {
    --color-primary-100: hsl(203, 31%, 95%);
    --color-primary-200: hsl(211, 38%, 88%);
    --color-primary-400: hsl(212, 75%, 40%);
    --color-primary-600: hsl(212, 76%, 28%);
    /* Secondary, Accent, Danger, Neutral omitted for brevity */
}`} lang="css" />
            <PostNote>
                <p><strong>Naming Convention:</strong></p>
                <List>
                    <li>100–200: backgrounds and subtle borders</li>
                    <li>400: primary text and interactive elements (4.5:1 contrast)</li>
                    <li>600: high contrast states (hover, pressed)</li>
                </List>
                <p><FunHighlight>Accessibility Note:</FunHighlight> All 400 and 600 colors meet WCAG AA contrast requirements.</p>
            </PostNote>
        </PostSection>
    )
}