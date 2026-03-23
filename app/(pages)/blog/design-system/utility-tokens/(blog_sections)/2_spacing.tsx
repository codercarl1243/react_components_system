import Code from "@/components/code";
import AnchorHeading from "@/components/heading/anchorHeading";
import Heading from "@/components/heading";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import Rule from "@/components/rule";
import { Stack } from "@/components/primitives";
import SpacingDiagram from "../examples/spacing";
import InlineCode from "@/components/code/inlineCode";
import List from "@/components/list";

export default function Section2() {
    return (
        <PostSection id="spacing">
            <AnchorHeading as="h2" id="spacing-heading">
                Spacing — controlling rhythm
            </AnchorHeading>
            <Stack>
                <p>
                    Spacing is the most frequently used token category in any design system.
                    Every component — every <span className="italic">padding</span>, <span className="italic">gap</span>, and <span className="italic">margin</span> decision — reaches for spacing tokens.
                </p>
                <p>
                    Without a defined scale, spacing decisions scatter. A button gets <InlineCode codeString="0.5rem" lang="css" /> padding while a a card gets a magic number of <InlineCode codeString="14px" lang="css" /> in padding. Each decision is locally reasonable — and globally inconsistent.
                </p>
                <Rule>
                    Every gap, padding, and margin must be consistent with it's neighbours.
                </Rule>
                <p>
                    This system introduces a shared scale that covers the full range of layout needs.
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
            <SpacingDiagram />
            <Stack>
                <Heading as="h3" headingSize={4}>Why these values?</Heading>

                <p>
                    The scale is built on increments of <InlineCode codeString="0.25rem" lang="css" /> (4px) — small enough to be precise, large enough to be meaningful.
                </p>
            </Stack>
            <Stack>
                <Heading as="h3" headingSize={4}>Where spacing tokens live in the system</Heading>
                <p>Spacing tokens are consumed at every layer:</p>
                <List as="ul">
                    <li><strong>Primitives</strong> use them for gap values between children</li>
                    <li><strong>Components</strong> use them for internal padding</li>
                </List>
                <p>
                    From there, utility classes expose the same scale as composable helpers for one-off spacing needs.
                </p>
                <p>
                    The utility layer ( <InlineCode codeString="gap.css" />, <InlineCode codeString="padding.css" />, <InlineCode codeString="margin.css" /> ) converts spacing tokens
                    into classes like <InlineCode codeString=".gap-md" lang="css" />, <InlineCode codeString=".p-lg" lang="css" />, and <InlineCode codeString=".m-md" lang="css" />.
                </p>
                <p>
                    These classes are what components reach for in practice.
                </p>
                <Code
                    lang="css"
                    codeString={`/* gap.css */
.gap-sm { gap: var(--spacing-sm); }
.gap-md { gap: var(--spacing); }
.gap-xl { gap: var(--spacing-xl); }

/* padding.css */
.p-md  { padding: var(--spacing); }
.p-lg  { padding: var(--spacing-lg); }
.px-md { padding-inline: var(--spacing); }
.py-md { padding-block: var(--spacing); }`}
                />
            </Stack>
        </PostSection>
    );
}
