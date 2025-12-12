import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";

export default function section4() {
    return (
        <PostSection id="component-tokens-theming">
            <AnchorHeading as={"h2"} prefix="Step 3 —" id="component-tokens-theming-heading">
                Component design tokens
            </AnchorHeading>
            {/* What component tokens are */}
            {/* The two-layer system (semantic → component-prefixed) */}
            {/* Why encapsulation matters */}
            {/* Simple button example consuming variant tokens */}
        </PostSection>
    );
}