import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import ColorSwatch from "@/components/colorSwatch";
import Heading from "@/components/heading";
import AnchorHeading from "@/components/heading/anchorHeading";
import Link from "@/components/link";
import PostInfo from "@/components/post/post.info";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import { Inline, Stack } from "@/components/primitives";

export default function section4() {
    return (
        <PostSection id="global-tokens">
            <AnchorHeading as={"h2"} prefix="Step 1 —" id="global-tokens-heading">
                Global tokens
            </AnchorHeading>
            <Stack>
                <p>
                    Every theming system starts with a stable set of <span className="bold">global tokens</span>. These are the raw values your entire interface relies on: colors, spacing, typography, radii, shadows, and breakpoints.
                </p>
                <p>These tokens define the <em>visual environment</em> — not component behavior.</p>

                <p>
                    In this guide, we'll focus on <span className="bold">color tokens</span> as they best demonstrate how values flow through the rest of the system..
                </p>
                <PostInfo>
                    <span className="italic">
                        The full token set for this project is available on <Link href="https://github.com/codercarl1243/react_components_system/tree/main/styles/tokens">GitHub</Link>.
                    </span>
                </PostInfo>
            </Stack>

            <Stack>
                <Heading as="h3">Color Tokens</Heading>
                <p>
                    Color tokens use a numeric scale where lower numbers represent lighter values and higher numbers represent darker ones.
                </p>
                <p>This makes it intuitive to find contrast pairs: <Inline as="span" align="center" gap={2} wrap={false}><InlineCode codeString="--color-primary-400" /> <ColorSwatch
                    color="var(--color-primary-400)"
                    aria-label="Primary 400 color swatch"
                /> </Inline> (medium blue) naturally pairs with <Inline as="span" align="center" gap={2} wrap={false}><InlineCode codeString="--color-neutral-100" />  <ColorSwatch
                    color="var(--color-neutral-100)"
                    aria-label="Neutral 100 color swatch"
                /></Inline> (white) for accessible contrast.</p>

                <Code
                    lang="css"
                    title="Global Color Tokens"
                    codeString={`:root {
    /* Primary (Blue) */
    --color-primary-100: hsl(203, 31%, 95%);
    --color-primary-200: hsl(211, 38%, 88%);
    --color-primary-400: hsl(212, 75%, 40%);
    --color-primary-600: hsl(212, 76%, 28%);

    /* Secondary (Green) */
    --color-secondary-100: hsl(155, 33%, 93%);
    --color-secondary-200: hsl(153, 29%, 84%);
    --color-secondary-400: hsl(155, 65%, 26%);
    --color-secondary-600: hsl(155, 67%, 18%);

    /* Accent (Pink) */
    --color-accent-100: hsl(327, 22%, 90%);
    --color-accent-200: hsl(316, 25%, 88%);
    --color-accent-400: hsl(314, 71%, 41%);
    --color-accent-600: hsl(314, 71%, 28%);

    /* Neutrals */
    --color-neutral-100: hsl(0, 0%, 100%);
    --color-neutral-400: hsl(0, 0%, 46%);
    --color-neutral-600: hsl(0, 0%, 30%);
    --color-neutral-800: hsl(0, 0%, 15%);
    --color-neutral-900: hsl(248, 62%, 5%);
}`}
                />

                <PostNote>
                    <p>This article uses <span className="bold">HSL</span> for clarity and compatibility, but the same token structure works with <span className="bold">OKLCH</span> if you prefer improved perceptual consistency across lightness values.</p>
                </PostNote>
                <p>
                    These tokens are intentionally generic. They describe <em>what colors exist</em>, not <em>what they're used for</em>.
                </p>
                <p>
                    That translation — from raw values to semantic meaning — happens in the <span className="bold">variant layer</span>, which we'll define next.
                </p>
            </Stack>

            <PostInfo>
                For tools that help you design accessible, contrast-safe color palettes, see the <Link href="#resources-color-accessibility-tools">resources section</Link>.
            </PostInfo>
        </PostSection>
    );
}