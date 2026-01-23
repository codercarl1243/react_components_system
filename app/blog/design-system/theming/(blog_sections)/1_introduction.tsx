import BlogLink from "@/app/styles/components/post/post.blogLink";
import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";

export default function Section1() {

    return (
        <PostSection id="introduction">
            <AnchorHeading as={"h2"} id="introduction-heading">
                Introduction
            </AnchorHeading>
            <p>
                In the previous posts, we focused on architecture and enforcement.
            </p>
            <List as="ul" marker="none" spacing="loose">
                <li><BlogLink id="design__foundations_01" /> introduced a layered token model and explained why styling systems break without clear boundaries.</li>

                <li><BlogLink id="design__primitives_01"/> introduced primitives and showed how those boundaries can be enforced structurally.</li>
            </List>
            <p>
                <em>This post is different.</em>
            </p>
            <p>
                Here, we'll build the system <span className="fun-underline bold">step</span> by <span className="fun-underline bold">step</span>.
            </p>
            <p>
                This is a practical, implementation-focused deep dive. We'll write real code, make concrete decisions, and look at how the theory from earlier posts translates into something you can actually ship.
            </p>
            <p>
                If you're looking for the why, start with the earlier posts. If you want to know how this is built, you're in the right place.
            </p>
        </PostSection>
    )
}