import Code from "@/components/code";
import AnchorHeading from "@/components/heading/anchorHeading";
import Heading from "@/components/heading";
import PostSection from "@/components/post/post.section";
import Rule from "@/components/rule";
import { Stack } from "@/components/primitives";

export default function Section3() {
    return (
        <PostSection id="typography">
            <AnchorHeading as="h2" id="typography-heading">
                Typography Scale — controlling readability
            </AnchorHeading>
            <Stack>
                <p>
                    Typography is where inconsistency is most visible. Headings at slightly different sizes,
                    body text with mismatched line heights, labels that feel just a little too large —
                    these are the gaps a type scale closes.
                </p>
                <Rule>
                    No font size or line height should be set without a token. The scale is the authority.
                </Rule>
            </Stack>
            <Stack>
                <Heading as="h3" headingSize={4}>Font sizes</Heading>
                <p>
                    Font size tokens use <code>clamp()</code> to scale fluidly between a minimum and maximum value
                    based on the viewport width. This means type stays readable on small screens without becoming
                    overwhelming on large ones — without a single media query.
                </p>
                <Code
                    lang="css"
                    title="typography.css"
                    codeString={`:root {
    --font-size-xs:   clamp(0.75rem,  0.7rem  + 0.25vw, 0.875rem);
    --font-size-sm:   clamp(0.875rem, 0.8rem  + 0.375vw, 1rem);
    --font-size-base: clamp(1rem,     0.9rem  + 0.5vw,   1.125rem);
    --font-size-lg:   clamp(1.125rem, 1rem    + 0.625vw, 1.25rem);
    --font-size-xl:   clamp(1.25rem,  1rem    + 0.75vw,  1.5rem);
    --font-size-2xl:  clamp(1.4rem,   1rem    + 1vw,     1.875rem);
    --font-size-3xl:  clamp(1.75rem,  1.25rem + 1.375vw, 2.25rem);
    --font-size-4xl:  clamp(1.85rem,  1.25rem + 1.75vw,  3rem);
    --font-size-5xl:  clamp(1.9rem,   1.5rem  + 2.5vw,   3.75rem);
    --font-size-6xl:  clamp(2rem,     1.5rem  + 3.75vw,  4.5rem);
}`}
                />
                <p>
                    Each <code>clamp()</code> takes three arguments: the minimum size, a fluid calculation using <code>vw</code> units,
                    and the maximum size. The fluid value is what makes the scale responsive — it grows proportionally with the
                    viewport rather than jumping at breakpoints.
                </p>
            </Stack>
            <Stack>
                <Heading as="h3" headingSize={4}>Line heights</Heading>
                <p>
                    Line heights are defined separately from font sizes, giving the system independent control over vertical rhythm.
                </p>
                <Code
                    lang="css"
                    codeString={`:root {
    --line-height-tight:       1;
    --line-height-snug:        1.1;
    --line-height-normal:      1.2;
    --line-height-relaxed:     1.3;
    --line-height-loose:       1.4;
    --line-height-extra-loose: 1.5;
    --line-height-super-loose: 1.6;
}`}
                />
                <p>
                    Tighter line heights suit large display text — headings at <code>--font-size-4xl</code> and above pair
                    naturally with <code>--line-height-tight</code> or <code>--line-height-snug</code>. Body text at{" "}
                    <code>--font-size-base</code> typically needs more breathing room —{" "}
                    <code>--line-height-extra-loose</code> or <code>--line-height-super-loose</code>.
                </p>
            </Stack>
            <Stack>
                <Heading as="h3" headingSize={4}>The global baseline</Heading>
                <p>
                    Rather than requiring every element to opt into a size class, the system establishes a baseline on <code>body</code>:
                </p>
                <Code
                    lang="css"
                    codeString={`body {
    font-size: 1rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}`}
                />
                <p>
                    This means most text inherits the right size without any intervention. The type scale tokens exist for
                    the exceptions — headings, labels, badges, helper text — where a specific size is intentional.
                </p>
            </Stack>
            <Stack>
                <Heading as="h3" headingSize={4}>How the scale is consumed</Heading>
                <p>
                    Font size and line height tokens are consumed through a utility layer that pairs them into named classes:
                </p>
                <Code
                    lang="css"
                    codeString={`/* sizes.css */
.text-xs   { font-size: var(--font-size-xs);   line-height: var(--line-height-loose); }
.text-sm   { font-size: var(--font-size-sm);   line-height: var(--line-height-extra-loose); }
.text-base { font-size: var(--font-size-base); line-height: var(--line-height-super-loose); }
.text-lg   { font-size: var(--font-size-lg);   line-height: var(--line-height-extra-loose); }
.text-xl   { font-size: var(--font-size-xl);   line-height: var(--line-height-loose); }`}
                />
                <p>
                    The pairing is opinionated — smaller text gets more line height to aid readability, larger text gets tighter
                    line height to avoid excessive vertical space. These defaults can always be overridden at the component level
                    when a specific context demands it.
                </p>
            </Stack>
        </PostSection>
    );
}
