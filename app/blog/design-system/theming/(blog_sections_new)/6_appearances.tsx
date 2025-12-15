import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";

export default function section4() {
    return (
        <PostSection id="appearances-theming">
            <AnchorHeading as={"h2"} prefix="Step 4 —" id="appearances-theming-heading">
                Appearances
            </AnchorHeading>
            {/* Why appearances are needed: Same variant, different visual styles */}
            {/* Explain [data-appearance] (filled, outlined, ghost) */}
            {/* How appearances remap variant tokens differently */}
            {/* Show the "matrix": variants × appearances = all combinations */}
            {/* Code example */}
        </PostSection>
    );
}