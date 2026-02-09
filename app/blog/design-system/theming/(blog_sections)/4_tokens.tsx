import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import ColorSwatch from "@/components/colorSwatch";
import Heading from "@/components/heading";
import AnchorHeading from "@/components/heading/anchorHeading";
import Link from "@/components/link";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import { Inline, Stack } from "@/components/primitives";

export default function Section4() {
    return (
        <PostSection id="global-tokens">
            <AnchorHeading as={"h2"} prefix="Step 1 —" id="global-tokens-heading">
                Global tokens
            </AnchorHeading>
            <Stack>
                <p>
                    Every theming system starts with a stable set of <span className="bold">global tokens</span>. These are the raw values your entire interface relies on: colors, spacing, typography, radii, shadows, and breakpoints.
                </p>
                <p>
                    These tokens define the <em>visual environment</em> — not component behavior.
                </p>
                <p>
                    We'll focus on <span className="bold">color tokens</span> as they best demonstrate how values flow through the rest of the system.
                </p>
            </Stack>

            <Stack>
                <Heading as="h3" headingSize={4}>Color tokens</Heading>
                <p>
                    Defining a base theme in terms of surface and text colors establishes a contrast-safe foundation before any semantic color roles are introduced.
                </p>

                <p>
                    Global color tokens use a numeric scale where lower numbers represent lighter values and higher numbers represent darker ones.
                </p>

                <p>
                    Together, this gives the system room to define explicit contrast guarantees at different points in the scale, without baking semantic meaning into raw values.
                </p>
                {/* This section may belong in 6_variants */}
                {/* <p>
                    This makes it intuitive to find contrast pairs: <Inline as="span" align="center" gap={2} wrap={false}><InlineCode codeString="--color-primary-400" /><ColorSwatch color="var(--color-primary-400)" aria-label="Primary 400 color swatch" /> </Inline> (medium blue) naturally pairs with <Inline as="span" align="center" gap={2} wrap={false}><InlineCode codeString="--color-neutral-100" /><ColorSwatch color="var(--color-neutral-100)" aria-label="Neutral 100 color swatch" /></Inline> (white) for accessible contrast.
                </p> */}

                <Code
                    lang="css"
                    title="Global Color Tokens"
                    codeString={`:root {
    /* Primary */
    --color-primary-100: hsl(203, 31%, 95%);
    --color-primary-200: hsl(211, 38%, 88%);
    --color-primary-400: hsl(212, 75%, 40%);
    --color-primary-600: hsl(212, 76%, 28%);

    /* Neutrals */
    --color-neutral-100: hsl(0, 0%, 100%);
    --color-neutral-900: hsl(248, 62%, 5%);
}`}
                />
                <p>
                    All other color scales in the system follow the <em>same</em> naming and numeric structure.
                </p>
                <p>
                    These tokens are intentionally generic. They describe <em>what colors exist</em>, not <em>what they're used for</em>.
                </p>
                <p>
                    That translation — from raw values to semantic meaning — happens in the <span className="bold">variant layer</span>, which we'll introduce later.
                </p>
            </Stack>

            <PostNote>
                <p> For tools that help you design accessible, contrast-safe color palettes, see the <Link href="#resources-color-accessibility-tools">resources section</Link>.</p>
                <p className="italic">
                    The full token set for this project is available on <Link href="https://github.com/codercarl1243/react_components_system/tree/main/styles/tokens">GitHub</Link>.
                </p>
            </PostNote>
        </PostSection>
    );
}