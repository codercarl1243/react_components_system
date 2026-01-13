import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";
import ButtonExample from "../examples/1_buttonExample/example.server";
import WhatWeAreBuildingDiagram from '../examples/2_whatWeAreBuilding';

export default function Section2() {
    return (
        <PostSection id="what-we-are-building">
            <AnchorHeading as={"h2"} id="what-we-are-building-heading">
                What we're building
            </AnchorHeading>
            <p>
                The architecture from the first 2 posts in this series wasn't theoretical. It was
                describing a real system — one built entirely with CSS custom properties and data attributes.
            </p>

            <p>
                Before we start writing code, let's establish the flow. The diagram below shows how theme
                tokens are transformed step by step — through variant, appearance, and paint — before
                components consume the result.
            </p>

            <WhatWeAreBuildingDiagram />

            <p>
                Here's what that system looks like in practice:
            </p>
            <ButtonExample />
            <p>
                Three attributes. Same component. A predictable system that scales without multiplying component logic.
            </p>

            <p>
                Everything we build here is <em>framework-agnostic</em> at the styling layer. React is used as a consumer, not as the owner of the design system.
            </p>
        </PostSection>
    )
}