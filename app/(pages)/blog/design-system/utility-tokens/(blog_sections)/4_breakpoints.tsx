import Code from "@/components/code";
import AnchorHeading from "@/components/heading/anchorHeading";
import Heading from "@/components/heading";
import PostSection from "@/components/post/post.section";
import Rule from "@/components/rule";
import { Stack } from "@/components/primitives";

export default function Section4() {
    return (
        <PostSection id="breakpoints">
            <AnchorHeading as="h2" id="breakpoints-heading">
                Breakpoints — controlling adaptation
            </AnchorHeading>
            <Stack>
                <Rule>
                    Breakpoints are shared contracts. Every layout decision that depends on viewport width must reference the same scale.
                </Rule>
                <p>
                    Breakpoints define where the layout adapts. Like spacing, they need to be consistent — if one component breaks
                    at <code>768px</code> and another at <code>769px</code>, the result is a layout that feels unpolished at certain widths.
                </p>
                <Code
                    lang="css"
                    title="breakpoints.css"
                    codeString={`:root {
    --bp-xs:         18.75rem;  /*  300px */
    --bp-sm:         35rem;     /*  560px */
    --bp-md:         48rem;     /*  768px */
    --bp-lg:         75rem;     /* 1200px */
    --bp-xl:         90rem;     /* 1440px */
    --bp-characters: 80ch;      /* Maximum content line length */
}`}
                />
            </Stack>
            <Stack>
                <Heading as="h3" headingSize={4}>Why <code>rem</code> values?</Heading>
                <p>
                    Breakpoints defined in <code>rem</code> rather than <code>px</code> respect the user's browser font size
                    preference. If a user has set their browser font size to 20px, a <code>35rem</code> breakpoint becomes{" "}
                    <code>700px</code> — meaning the layout shifts at the right visual moment for that user rather than at a fixed
                    pixel value that ignores their preference.
                </p>
            </Stack>
            <Stack>
                <Heading as="h3" headingSize={4}>The character width breakpoint</Heading>
                <p>
                    <code>--bp-characters</code> is different from the others — it is not a viewport breakpoint but a content constraint.
                    Setting <code>max-width: var(--bp-characters)</code> on text content keeps line lengths within a readable range
                    (roughly 65–85 characters per line), regardless of the viewport width.
                </p>
                <p>
                    This is applied to body text and post content throughout the system. It is the reason paragraphs don't stretch
                    to fill a wide viewport.
                </p>
            </Stack>
            <Stack>
                <Heading as="h3" headingSize={4}>Using breakpoints in CSS</Heading>
                <p>
                    CSS custom properties cannot be used directly inside <code>@media</code> queries — media queries do not inherit
                    from <code>:root</code>. Instead, breakpoint tokens define shared values that are referenced consistently:
                </p>
                <Code
                    lang="css"
                    codeString={`/* Correct — use the raw value at the same breakpoint */
@media screen and (min-width: 35rem) {
    .nav__wrapper {
        flex-direction: row;
    }
}

/* Use the token for max-width constraints in layout */
.layout-wrapper {
    max-width: var(--bp-lg);
}`}
                />
                <p>The tokens remain the single source of truth.</p>
            </Stack>
        </PostSection>
    );
}
