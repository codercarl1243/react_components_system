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
                The diagram below shows how raw theme values move through the system and are progressively shaped before a component ever reads them.
            </p>
            <WhatWeAreBuildingDiagram />
            <p>
                <strong className="fun-underline">Design principle:</strong> In this system, <em>theme</em> is treated as environmental context. 
                It establishes contrast and foreground/background relationships, while expressive meaning is handled by variants and appearance.
            </p>
            <p>
                In practice, this layered styling model allows a single component to adapt its appearance using a small set of attributes. 
                The explicit opt-in design keeps styling decisions intentional and prevents accidental coupling.
            </p>
            <ButtonExample />
            <p>
                The important detail here isn't the button itself — it's that the component remains unaware of <em>how</em> the theme is constructed. It simply consumes the result.
            </p>

            <p>
                Everything we build here is <em>framework-agnostic</em> at the styling layer. 
                React is used as a consumer, not as the owner of the design system.
            </p>
        </PostSection>
    )
}