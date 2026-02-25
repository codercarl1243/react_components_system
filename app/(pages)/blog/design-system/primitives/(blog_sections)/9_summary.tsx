import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";

export default function Section9() {
    return (
        <PostSection id="summary">
            <AnchorHeading as={"h2"} id="summary-heading">
                Summary
            </AnchorHeading>
            <p>
                This post introduces primitives as structural building blocks.
            </p>

            <p>
                In a future post, we'll examine how primitives can also act as styling boundaries — defining where environmental styling stops and component ownership begins.
            </p>

            <p>
                But first, it's important to understand them simply as what they are:
            </p>

            <p>
                A small vocabulary of components that make layout intentional.
            </p>
        </PostSection>
    );
}