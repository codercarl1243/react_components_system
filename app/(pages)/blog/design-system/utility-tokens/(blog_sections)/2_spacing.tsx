import Code from "@/components/code";
import AnchorHeading from "@/components/heading/anchorHeading";
import Heading from "@/components/heading";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import Rule from "@/components/rule";
import { Stack } from "@/components/primitives";

export default function Section2() {
    return (
        <PostSection id="spacing">
            <AnchorHeading as="h2" id="spacing-heading">
                Spacing — controlling rhythm
            </AnchorHeading>
            <Stack>
                <p>
                    Spacing is the most frequently used token category in any design system.
                    Every component — every padding, gap, and margin decision — reaches for spacing tokens.
                </p>
                <p>
                    Without a defined scale, spacing decisions scatter. A button gets <code>0.5rem</code> padding.
                    A card gets <code>16px</code>. A form field gets <code>0.75rem</code>.
                    Each decision is locally reasonable — and globally inconsistent.
                </p>
                <Rule>
                    Spacing decisions should never be made with raw values. Every gap, padding, and margin must come from the scale.
                </Rule>
                <p>
                    The scale I use is deliberately small — eight steps that cover the full range of layout needs
                    without creating ambiguity about which value to reach for.
                </p>
                <Code
                    lang="css"
                    title="spacing.css"
                    codeString={`:root {
    --spacing-sm: 0.25rem;   /*  4px */
    --spacing:    0.5rem;    /*  8px */
    --spacing-md: 0.75rem;   /* 12px */
    --spacing-lg: 1rem;      /* 16px */
    --spacing-xl: 1.5rem;    /* 24px */
    --spacing-xxl: 2rem;     /* 32px */
    --spacing-3xl: 4rem;     /* 64px */
}`}
                />
            </Stack>
            <Stack>
                <Heading as="h3" headingSize={4}>Why these values?</Heading>
                <p>
                    The scale is built on a base of <code>0.5rem</code> (8px) — a common baseline in UI design that divides evenly
                    into most layout grids. Each step in the scale is a predictable increment rather than an arbitrary jump.
                </p>
                <p>
                    The naming uses t-shirt sizing (<code>sm</code>, <code>lg</code>, <code>xl</code>) rather than numeric steps
                    (<code>4</code>, <code>8</code>, <code>16</code>). This keeps names meaningful at a glance —
                    <code>--spacing-lg</code> reads as "large spacing" rather than requiring mental conversion from a number.
                </p>
            </Stack>
            <Stack>
                <Heading as="h3" headingSize={4}>Where spacing tokens live in the system</Heading>
                <p>Spacing tokens are consumed at every layer:</p>
                <ul>
                    <li><strong>Primitives</strong> use them for gap values between children</li>
                    <li><strong>Components</strong> use them for internal padding</li>
                    <li><strong>Utilities</strong> expose them as composable classes</li>
                </ul>
                <p>
                    The utility layer (<code>gap.css</code>, <code>padding.css</code>, <code>margin.css</code>) converts spacing tokens
                    into classes like <code>.gap-md</code>, <code>.p-lg</code>, and <code>.mb-2</code>.
                    These classes are what components reach for in practice.
                </p>
                <Code
                    lang="css"
                    codeString={`/* gap.css */
.gap-sm { gap: var(--spacing); }
.gap-md { gap: var(--spacing-lg); }
.gap-xl { gap: var(--spacing-xl); }

/* padding.css */
.p-md  { padding: var(--spacing); }
.p-lg  { padding: var(--spacing-lg); }
.px-4 { padding-inline: var(--spacing); }
.py-4 { padding-block: var(--spacing); }`}
                />
                <PostNote>
                    The numeric suffix in utility classes maps to the spacing token — not to a pixel value.{" "}
                    <code>.gap-md</code> means "gap at the <code>--spacing-lg</code> step" — not "4 pixels".
                </PostNote>
            </Stack>
        </PostSection>
    );
}
