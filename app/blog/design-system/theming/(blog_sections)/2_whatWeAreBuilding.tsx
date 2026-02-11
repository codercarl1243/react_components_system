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
                Before diving into the details, it helps to see the shape of the system as a whole. 
                The diagram below shows how raw values move through the system and are progressively shaped before a component ever reads them.
            </p>
            <WhatWeAreBuildingDiagram />
            <p>
                In practice, a layered styling model allows a single component to adapt its appearance using a small set of attributes. 
            </p>
            <p>
                This explicit opt-in design keeps styling decisions intentional and prevents accidental coupling. Here's what that looks like:
            </p>
            <ButtonExample />
            <p>
                The important detail here isn't the button itself — it's that the component remains unaware of <em>how</em> the styling is constructed. It simply consumes the result.
            </p>
            <p>
                Everything we build here is <em>framework-agnostic</em> at the styling layer. 
                React is used as a consumer, not as the owner of the design system.
            </p>
        </PostSection>
    )
}