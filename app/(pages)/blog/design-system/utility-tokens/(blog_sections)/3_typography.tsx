import Code from "@/components/code";
import AnchorHeading from "@/components/heading/anchorHeading";
import Heading from "@/components/heading";
import PostSection from "@/components/post/post.section";
import Rule from "@/components/rule";
import { Stack } from "@/components/primitives";
import InlineCode from "@/components/code/inlineCode";
import LineHeightDiagram from "../examples/line-height";
import PostNote from "@/components/post/post.note";
import Link from "@/components/link";

export default function Section3() {
    return (
        <PostSection id="typography">
            <AnchorHeading as="h2" id="typography-heading">
                Typography Scale <span className="heading-subtitle">— controlling readability</span>
            </AnchorHeading>
            <Stack>
                <p>
                    A type scale is like a musical key — everything plays in the same register. Without it, headings drift to slightly different sizes, line heights clash, and labels feel just a little too large. The composition breaks down quietly, one decision at a time.
                </p>
                <Rule>
                    Font size sets the tempo. Line height sets the rhythm.
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
                    <InlineCode codeString="clamp(min, fluid, max)" lang="css" /> — the fluid value grows with the viewport, bounded by a minimum and maximum. The result is a type scale that adapts without breakpoints.
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
                    Large display text needs tighter leading. Body text needs more room to breathe.
                </p>
            </Stack>
            <LineHeightDiagram />
            <Stack>
                <Heading as="h3" headingSize={4}>The global baseline</Heading>
                <p>
                    A single <span className="italic">font-size</span> and <span className="italic">line-height</span> on <InlineCode codeString="body" lang="css" /> sets the key. The type scale tokens then give precise control where it matters — headings, labels, badges, and helper text.
                </p>
                <Code
                    lang="css"
                    codeString={`body {
    font-size: var(--font-size-base); 
    line-height: var(--line-height-super-loose);
}`}
                />
                <PostNote variant="neutral" showIcon={false}>
                    <p>
                        Not all elements inherit font-size and line-height from body. Form elements — input, button, textarea, and select — use browser defaults unless explicitly reset. A CSS reset handles this.
                    </p>
                    <p>
                        See the <Link href="#resources">Resources section</Link> for recommended starting points.
                    </p>
                </PostNote>
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
                    The exception is <InlineCode codeString=".text-xs" lang="css" /> — at very small sizes, loose leading creates too much distance between lines. A tighter value keeps small text cohesive.
                </p>
            </Stack>
        </PostSection>
    );
}