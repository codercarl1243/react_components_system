import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";

export default function Section10() {
    return (
        <PostSection id="summary">
            <AnchorHeading as={"h2"} id="summary-heading">
                Summary
            </AnchorHeading>
            <p>
                By this point, you should have a complete picture:
            </p>
            <List as="ul" spacing="loose">
                <li>why the system is structured the way it is</li>
                <li>how the layers fit together</li>
                <li>how components consume the system safely</li>
            </List>
            <p>
                What we've built so far defines the rules of the system — but rules alone
                don't enforce themselves.
            </p>
            <p>
                In the next post, we'll introduce <strong>primitive components</strong> and
                show how they enforce these boundaries in real interfaces, turning this
                theming model into something composable and safe to build on.
            </p>
        </PostSection>
    );
}
