import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";

export default function Section1() {

    return (
        <PostSection id="introduction-theming">
            <AnchorHeading as={"h2"} id="introduction-theming-heading">
                Introduction
            </AnchorHeading>
            {/* What we're building (with interactive button example) */}
            {/* Why theming should be its own system (pain points) */}
            {/* Who this is for (PostNote) */}
        </PostSection>
    )
}