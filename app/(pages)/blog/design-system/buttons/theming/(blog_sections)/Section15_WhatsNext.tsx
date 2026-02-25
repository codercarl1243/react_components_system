import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";

export default function Section15_WhatsNext() {
    return (
        <PostSection id="whats-next">
            <AnchorHeading as={"h2"} id="whats-next-heading">What's Next</AnchorHeading>
            <List>
                <li>Button Groups — unified styling</li>
                <li>Icon Buttons — icons only</li>
                <li>Loading Variants — different spinner styles</li>
                <li>Theme Builder — user-driven token customization</li>
            </List>
            <PostNote>
                <p>Continue refining your button system — each enhancement builds upon the same scalable foundation.</p>
            </PostNote>
        </PostSection>
    )
}