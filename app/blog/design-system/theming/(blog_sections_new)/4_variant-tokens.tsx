import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";

export default function section4() {
    return (
        <PostSection id="variant-tokens-theming">
            <AnchorHeading as={"h2"} prefix="Step 2 —" id="variant-tokens-theming-heading">
                Variant design tokens
            </AnchorHeading>
            {/* What variants are (primary, secondary, accent, danger, etc.) */}
            {/* Introduce variant palette tokens (--variant-bg, --variant-fg, etc.) */}
            {/* Show how they map to global tokens */}
            {/* Explain [data-variant] attribute */}
            {/* Code example with a few variants */}
        </PostSection>
    );
}