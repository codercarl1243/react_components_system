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
                In the next post, we'll cover the remaining token layer — spacing, typography scale, radius, and other raw values that the system relies on but haven't been defined yet.
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