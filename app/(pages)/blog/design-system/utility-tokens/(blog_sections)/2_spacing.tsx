import Code from "@/components/code";
import AnchorHeading from "@/components/heading/anchorHeading";
import Heading from "@/components/heading";
import PostSection from "@/components/post/post.section";
import Rule from "@/components/rule";
import { Stack } from "@/components/primitives";
import SpacingDiagram from "../examples/spacing";
import InlineCode from "@/components/code/inlineCode";
import List from "@/components/list";
import FunHighlight from "@/components/decorations/FunHighlight";
import Image from "@/components/image";
import PostNote from "@/components/post/post.note";

export default function Section2() {
    return (
        <PostSection id="spacing">
            <AnchorHeading as="h2" id="spacing-heading">
                Spacing <span className="heading-subtitle">— controlling rhythm</span>
            </AnchorHeading>
            <Stack>
                {/* ![TODO: add spacing image](/images/blogs/design-system/utility-tokens/spacing.webp) */}
                <p>
                    Spacing is the beat that holds a UI together. Every component — every <span className="italic">padding</span>, <span className="italic">gap</span>, and <span className="italic">margin</span> decision — reaches for spacing tokens.
                </p>
                <p>
                    Without a defined scale, the beat breaks down. A button gets <InlineCode codeString="0.5rem" lang="css" /> padding while a card gets an off-beat <InlineCode codeString="14px" lang="css" />. Each decision seems locally reasonable, but is globally inconsistent.
                </p>
                <Rule>
                    Rhythm requires consistency. Consistency requires a scale.
                </Rule>
                <p>
                    This system introduces a shared scale that covers the full range of layout needs.
                </p>
                <Code
                    lang="css"
                    title="spacing.css"
                    codeString={`:root {
    --spacing-xs:   0.25rem;    /*  4px */
    --spacing-sm:   0.5rem;     /*  8px */
    --spacing-md:   0.75rem;    /* 12px */
    --spacing-lg:   1rem;       /* 16px */
    --spacing-xl:   1.5rem;     /* 24px */
    --spacing-xxl:  2rem;       /* 32px */
    --spacing-3xl:  4rem;       /* 64px */
}`}
                />
            </Stack>
            <SpacingDiagram />
            <Stack>
                <Heading as="h3" headingSize={4}>Why these values?</Heading>
                <p>
                    The scale is built on increments of <InlineCode codeString="0.25rem" lang="css" /> (4px) — small enough to be precise, large enough to be meaningful.
                </p>
                <Image
                    alt="Three t-shirt illustrations in ascending size labelled sm, md, and lg, each showing their corresponding rem value"
                    src="/images/blogs/design-system/utility-tokens/tshirt_sizing.webp"
                    variant="diagram"
                    className="radius-md mx-auto"
                />
                <p>
                    Each step is named using <strong><FunHighlight>t-shirt sizing</FunHighlight> </strong>( <InlineCode codeString="sm" />, <InlineCode codeString="md" />, <InlineCode codeString="lg" /> etc. ) rather than numeric values, so names communicate scale at a glance rather than requiring mental conversion.
                </p>
                <PostNote>
                  <p>A musical scale of intensity — <span className="italic">pianissimo</span> to <span className="italic">fortissimo</span> — would be a natural fit here. But t-shirt sizing (sm, md, lg, xl) is so widely adopted across design systems that familiarity wins.</p>
                </PostNote>
            </Stack>
            <Stack>
                <Heading as="h3" headingSize={4}>Where spacing tokens live in the system</Heading>
                <p>
                    Spacing tokens are consumed at every layer:
                </p>
                <List as="ul">
                    <li>
                        <strong>Primitives</strong> use them for gap values between children
                    </li>
                    <li>
                        <strong>Components</strong> use them for internal spacing ( margins, padding, gaps, and offsets )
                    </li>
                </List>
                <p>
                    From there, utility classes expose the same scale as composable helpers for one-off spacing needs.
                </p>
                <p>
                    The utility layer uses the same t-shirt sizing as the tokens - <InlineCode codeString=".gap-lg" lang="css" /> and <InlineCode codeString="--spacing-lg" lang="css" /> are clearly the same step in that scale.
                </p>
                <Code
                    lang="css"
                    codeString={`/* gap.css */
.gap-sm { gap: var(--spacing-sm); }

/* padding.css */
.p-sm { padding: var(--spacing-sm); }

/* margin.css */
.m-sm { margin: var(--spacing-sm); }

/* ...full reference in resources */`}
                />
            </Stack>
        </PostSection>
    );
}
