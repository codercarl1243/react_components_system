import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";

export default function Section14_Summary() {
    return (
        <PostSection id="summary">
            <AnchorHeading as={"h2"} id="summary-heading">Summary</AnchorHeading>
            <List>
                <li>Flexible theming with CSS custom properties</li>
                <li>Three styles and four color variants</li>
                <li>Type-safe props and accessible states</li>
                <li>Scalable and easy to extend</li>
            </List>
            <PostNote>
                <p><strong>Key principles:</strong> Semantic variables, token-driven design, and composable data attributes.</p>
            </PostNote>
        </PostSection>
    )
}