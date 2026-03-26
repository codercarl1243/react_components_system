import Code from "@/components/code";
import AnchorHeading from "@/components/heading/anchorHeading";
import Heading from "@/components/heading";
import PostSection from "@/components/post/post.section";
import Rule from "@/components/rule";
import { Stack } from "@/components/primitives";
import InlineCode from "@/components/code/inlineCode";
import PostNote from "@/components/post/post.note";

export default function Section4() {
    return (
        <PostSection id="breakpoints">
            <AnchorHeading as="h2" id="breakpoints-heading">
                Breakpoints — controlling adaptation
            </AnchorHeading>
            <Stack>
                <p>
                    Breakpoints are the dynamic markings — they tell the layout when to shift register. Like a musical arrangement that changes feel at the chorus, a layout should also adapt at deliberate, shared moments.
                </p>
                <Rule>
                    A layout that adapts unpredictably is a performance without a score.
                </Rule>
                <p>
                    If one component shifts at <InlineCode codeString="768px" lang="css" /> and another at <InlineCode codeString="769px" lang="css" />, the result is a layout that feels unpolished. Shared breakpoints ensure every adaptation happens in step.
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
                <Heading as="h3" headingSize={4}>Why rem?</Heading>
                <p>
                    Breakpoints defined in <InlineCode codeString="rem" lang="css" /> stay proportional to the type scale.
                    When a user's font size increases, text takes up more space — a <InlineCode codeString="rem" lang="css" />-based breakpoint shifts the layout at the right moment <em className="fun-underline">relative</em> to that text.
                </p>
            </Stack>
            <Stack>
                <Heading as="h3" headingSize={4}>The character width breakpoint</Heading>
                <p>
                    <InlineCode codeString="--bp-characters" lang="css" /> is different from the others — it is not a viewport breakpoint but a content constraint.
                    Setting <InlineCode codeString="max-width: var(--bp-characters)" lang="css" /> on text content keeps line lengths within a readable range, regardless of the viewport width.
                </p>
                <p>
                    This is applied to <InlineCode codeString="<p>" lang="tsx" /> elements throughout the system.
                </p>
                <PostNote variant="warning">
                    <p>
                        A line that stretches the full width of a wide viewport becomes difficult to read — the eye loses its place tracking back to the start of the next line.
                    </p>
                </PostNote>
            </Stack>
            <Stack>
                <Heading as="h3" headingSize={4}>Using breakpoints in CSS</Heading>
                <p>
                    CSS custom properties cannot be used directly inside <InlineCode codeString="@media" lang="css" /> queries — media queries do not inherit
                    from <InlineCode codeString=":root" lang="css" />. Instead, breakpoint tokens define shared values that are referenced consistently:
                </p>
                <Code
                    lang="css"
                    codeString={`/* Use the raw value inside media queries */
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
                <p>
                    The tokens remain the single source of truth.
                </p>
            </Stack>
        </PostSection>
    );
}
