import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";

export default function section4() {
    return (
        <PostSection id="advanced-topics-theming">
            <AnchorHeading as={"h2"} id="advanced-topics-theming-heading">
                Advanced topics
            </AnchorHeading>
            {/* Dark mode / themes ([data-theme]) */}
            {/* Cascade layers in detail */}
            {/* CSS architecture best practices */}
            {/* Performance considerations */}
        </PostSection>
    );
}