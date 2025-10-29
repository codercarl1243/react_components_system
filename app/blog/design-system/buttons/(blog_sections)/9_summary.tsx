import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";
import { RiErrorWarningLine, RiAccessibilityLine, RiFlaskLine } from "@remixicon/react";

export default function Section9() {

    return (
        <PostSection id="summary">
            <AnchorHeading headingLevel={2} id="summary-heading">Summary</AnchorHeading>
            {/* GENERATE IMAGE FOR HERE */}

            <p>
                By combining <span className="bold">type safety</span>, clear <span className="bold"> accessibility semantics</span>, and <span className="bold"> thorough testing</span>, this is more than a component — it&apos;s a <span className="bold">contract</span>.  Developers can trust it to behave predictably, communicate clearly and fail gracefully.
            </p>

            <AnchorHeading headingLevel={3} id="summary__features" icon={RiErrorWarningLine}>
                What We Built
            </AnchorHeading>
            <List aria-labelledby="summary__features">
                <li>Type-safe component with async operation support</li>
                <li>Reusable hook with centralized error logging</li>
                <li>CSS custom properties for flexible theming and variants</li>
                <li>AAA accessibility standards (44x44px targets, keyboard navigation, aria-disabled)</li>
                <li>Comprehensive test coverage for reliability</li>
            </List>

            <AnchorHeading headingLevel={3} id="summary__impact" icon={RiFlaskLine}>
                Why It Matters
            </AnchorHeading>
            <List aria-labelledby="summary__impact">
                <li><span className="bold">For users:</span> Predictable, accessible interactions across all devices</li>
                <li><span className="bold">For developers:</span> Consistent API, clear error messages, no surprises</li>
                <li><span className="bold">For the system:</span> Foundation for toggles, switches, and complex components</li>
            </List>
        </PostSection>
    )
}