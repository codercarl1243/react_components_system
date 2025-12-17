import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";

export default function Section9() {

    return (
        <PostSection id="testing">
            <AnchorHeading as={"h2"} id="testing-heading">
                How to Test Your Theme System
            </AnchorHeading>

            <List as="ul">
                <li>Snapshot test light vs dark themes</li>
                <li>Test variant CSS variables render correctly</li>
                <li>Ensure contrast ratios remain accessible across themes</li>
                <li>Simulate user theme switching</li>
            </List>

            <PostNote>
                <p>
                    I recommend adding accessibility tests using axe-core or jest-axe — especially for checking contrast when
                    swapping themes.
                </p>
            </PostNote>
        </PostSection>
    )
}