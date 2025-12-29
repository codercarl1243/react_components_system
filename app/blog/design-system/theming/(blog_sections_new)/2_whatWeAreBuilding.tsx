import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";
import ButtonExample from "../examples/1_buttonExample/example.server";

export default function Section2() {
    return (
        <PostSection id="what-we-are-building">
            <AnchorHeading as={"h2"} id="what-we-are-building-heading">
                What We're Building
            </AnchorHeading>
            <p>
                The architecture from the first 2 posts in this series wasn't theoretical. It was describing a real system — one built entirely with CSS custom properties, data attributes, and cascade layers.
            </p>
            <p>
                Here's what that system looks like in practice:
            </p>
            <ButtonExample />
            <p>
                Three attributes. Same component. Combinations only limited by the number of variants within your system.
            </p>
            <p>
              Everything we build here is <em>framework-agnostic</em> at the styling layer. React is used as a consumer, not as the owner of the design system.
            </p>
        </PostSection>
    )
}