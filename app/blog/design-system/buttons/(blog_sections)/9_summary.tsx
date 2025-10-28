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
                By combining type safety, clear accessibility semantics, and a robust test suite, this button is more than a component — it&apos;s a contract.
                Every developer who uses it can trust that it behaves predictably, communicates clearly, and fails gracefully.
            </p>
            <p>Our base button component now provides:</p>

            <AnchorHeading headingLevel={3} id="summary__core" icon={RiErrorWarningLine} >
                Core Features
            </AnchorHeading>
            <List aria-labelledby="summary__core">
                <li>Type-safe component with TypeScript</li>
                <li>Clean separation of logic and presentation</li>
                <li>Reusable custom hook for interactions</li>
                <li>CSS custom properties for easy theming</li>
                <li>Multiple style variants (filled, outline)</li>
                <li>Color variants (primary, secondary, accent)</li>
                <li>Comprehensive error handling</li>
                <li>Async operation support</li>
                <li>Full test coverage</li>
            </List>

            <AnchorHeading headingLevel={3} id="summary__accessibility" icon={RiAccessibilityLine}>
                Accessibility Checklist
            </AnchorHeading>
            <p>Our button implementation meets these accessibility standards:</p>
            <List aria-labelledby="summary__accessibility">
                <li>AAA target size (44x44px minimum)</li>
                <li>No reliance on color alone for meaning</li>
                <li>Proper focus management and keyboard navigation</li>
                <li>Properly disabled state communicated</li>
                <li>Touch-friendly margins for motor accessibility</li>
            </List>


            <AnchorHeading headingLevel={3} id="summary__DX" icon={RiFlaskLine}>Developer Experience</AnchorHeading>
            <List aria-labelledby="summary__DX">
                <li>Clean separation of logic and presentation</li>
                <li>Consistent API across all variants</li>
                <li>Comprehensive error handling</li>
                <li>Type safety with TypeScript</li>
                <li>Full test coverage</li>
            </List>

        </PostSection>
    )
}