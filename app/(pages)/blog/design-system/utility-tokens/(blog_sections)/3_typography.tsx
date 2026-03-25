import Code from "@/components/code";
import AnchorHeading from "@/components/heading/anchorHeading";
import Heading from "@/components/heading";
import PostSection from "@/components/post/post.section";
import Rule from "@/components/rule";
import { Stack } from "@/components/primitives";
import InlineCode from "@/components/code/inlineCode";

export default function Section3() {
    return (
        <PostSection id="typography">
            <AnchorHeading as="h2" id="typography-heading">
                Typography Scale <span className="heading-subtitle">— controlling readability</span>
            </AnchorHeading>
            <Stack>
                <p>
                    Inconsistent type is immediately visible. Headings at slightly different sizes,
                    body text with mismatched line heights, labels that feel just a little too large —
                    these are the kinds of decisions that quietly erode trust in a UI.
                </p>
                <p>
                    A type scale makes those decisions intentional. Instead of reaching for a size that
                    feels right, every component reaches for the same named steps.
                </p>
                <Rule>
                   Font size and line height are not aesthetic choices — they communicate hierarchy, importance, and rhythm
                </Rule>
            </Stack>
            <Stack>
                <Heading as="h3" headingSize={4}>Font sizes</Heading>
                <p>
                    Each token uses <InlineCode codeString="clamp()" lang="css" /> to scale fluidly between a minimum and maximum value.
                    Type stays readable at small viewport widths without becoming overwhelming at large ones — no media queries needed.
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
                    <InlineCode codeString="clamp(min, fluid, max)" lang="css" /> — the fluid value grows with the viewport,
                    bounded by a minimum and maximum. The result is type that adapts without breakpoints.
                </p>
            </Stack>
            <Stack>
                <Heading as="h3" headingSize={4}>Line heights</Heading>
                <p>
                    Line heights are defined separately, giving the system independent control over vertical rhythm.
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
                    Large display text needs tighter leading — headings pair naturally with{" "}
                    <InlineCode codeString="--line-height-tight" lang="css" /> or{" "}
                    <InlineCode codeString="--line-height-snug" lang="css" />. Body text needs more room —{" "}
                    <InlineCode codeString="--font-size-base" lang="css" /> pairs with{" "}
                    <InlineCode codeString="--line-height-super-loose" lang="css" />.
                </p>
            </Stack>
            <Stack>
                <Heading as="h3" headingSize={4}>The global baseline</Heading>
                <p>
                    A single <InlineCode codeString="font-size" lang="css" /> on <InlineCode codeString="body" lang="css" /> means
                    most text inherits the right size without any intervention. The type scale tokens exist for
                    the exceptions — headings, labels, badges, helper text — where a specific size is intentional.
                </p>
                <Code
                    lang="css"
                    codeString={`body {
    font-size: 1rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}`}
                />
            </Stack>
            <Stack>
                <Heading as="h3" headingSize={4}>How the scale is consumed</Heading>
                <p>
                    Font size and line height tokens are paired into utility classes. The pairing is opinionated —
                    smaller text gets more line height, larger text gets less.
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
                    These defaults can always be overridden at the component level when a specific context demands it.
                </p>
            </Stack>
        </PostSection>
    );
}