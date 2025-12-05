import AnchorHeading from "@/components/heading/anchorHeading";
import Icon from "@/components/icon";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";
import { RiUserLine, RiCodeSSlashLine, RiPuzzle2Line } from "@remixicon/react";

export default function Section9() {

    return (
        <PostSection id="summary">
            <AnchorHeading as={"h2"} id="summary-heading">Summary</AnchorHeading>
            <p>
                By combining type safety, clear accessibility semantics, and thorough testing, we have a <span className="bold">reliable foundation</span>.
            </p>

            <AnchorHeading as={"h3"} id="summary__features">
                What We Built
            </AnchorHeading>
            <List spacing="tight" variant="circle" aria-labelledby="summary__features">
                <li>Type-safe component with async operation support</li>
                <li>Unhandled errors are logged automatically</li>
                <li>CSS custom properties for flexible theming and variants</li>
                <li>AAA accessibility standards (44x44px targets, keyboard navigation, aria-disabled)</li>
                <li>Comprehensive test coverage for reliability</li>
            </List>

            <AnchorHeading as={"h3"} id="summary__impact">
                Why It Matters
            </AnchorHeading>
            <List spacing="tight" marker="none" aria-labelledby="summary__impact">
                <li><span className="bold"><Icon icon={RiUserLine} color="var(--color-primary-400)" /> For users:</span> Predictable, accessible interactions across all devices</li>
                <li><span className="bold"><Icon icon={RiCodeSSlashLine} color="var(--color-primary-400)" /> For developers:</span> Consistent API, and testable patterns with clear feedback</li>
                <li><span className="bold"><Icon icon={RiPuzzle2Line} color="var(--color-primary-400)" /> For the system:</span> Foundation for toggles, switches, and complex button based components</li>
            </List>
            <p>
                With these foundations in place, we're ready to move from reliable actions to expressive interactions.
            </p>
        </PostSection>
    )
}