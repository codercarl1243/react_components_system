import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import Heading from "@/components/heading";
import AnchorHeading from "@/components/heading/anchorHeading";
import Link from "@/components/link";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import { Block } from "@/components/primitives";
import Rule from "@/components/rule";

export default function Section4() {
    return (
        <PostSection id="global-tokens">
            <AnchorHeading as={"h2"} prefix="Step 1 —" id="global-tokens-heading">
                Global tokens
            </AnchorHeading>
            <div className="flow-6">
                <p>
                    Every robust theming system starts with a stable set of <span className="bold">global tokens</span>. These are the raw values your entire interface relies on: colors, spacing, typography, radii, shadows, and breakpoints.
                </p>
                <Rule>
                    Global tokens define raw values, not behavior nor meaning.
                </Rule>
                <p>
                    We'll focus on <span className="bold">color tokens</span> as they best demonstrate how values flow through the rest of the system.
                </p>
            </div>

            <div className="flow-6">
                <Heading as="h3" headingSize={4}>Color tokens</Heading>
                <p>
                    Color tokens use a numeric scale where lower numbers represent lighter values and higher numbers represent darker ones.
                </p>

                <p>
                    This gives the system room to define explicit contrast guarantees at different points in the scale, without baking semantic meaning into raw values.
                </p>
                <Block as="figure" variant="neutral" variantAppearance="filled" paint={"all"} className="surface-frame p-4">
                    <Code
                        lang="css"
                        title="colors.css - Global color tokens"
                        codeString={`:root {
    /* Neutrals */
    --color-neutral-100: hsl(0, 0%, 100%);
    --color-neutral-400: hsl(0, 0%, 46%);
    --color-neutral-900: hsl(0, 0%, 0%);

    /* Primary (Blue) */
    --color-primary-400: hsl(212, 75%, 48%);

    /* Secondary (Green) */
    --color-secondary-400: hsl(155, 65%, 32%);

    /* Additional color scales omitted for clarity */
}`}
                    />
                    <figcaption className="pt-4 pb-2 italic text-sm">
                        Example color scale where the mid-range <InlineCode codeString="400" lang="css" /> values meet a 4.5:1 contrast ratio against both <InlineCode codeString="100" lang="css" /> and <InlineCode codeString="900" lang="css" />.
                    </figcaption>
                </Block>
                <p>
                    All other color scales in the system follow the <em>same</em> naming and numeric structure,
                    describing <em>what colors exist</em> — not <em>what they're used for</em>.
                </p>
                <p>
                    These raw values need context. That's where <strong className="fun-underline">theme</strong> comes in.
                </p>
            </div>

            <div className="flow-6">
                <Heading as="h3" headingSize={4}>Theme</Heading>
                <p>
                    Up to this point, everything we've defined is global and context-free. Theme is the layer that establishes visual context.
                </p>
                <p>
                    Theme defines surface and foreground relationships,
                    creates the environment all other layers operate within,
                    and acts as the visual reference frame for meaning and treatment.
                </p>
                <Rule>
                    Theme establishes the contrast baseline for all other styling decisions.
                </Rule>
                <Code
                    lang="css"
                    title="theme.css"
                    codeString={`:root:has([data-theme="light"]) {
  --surface: var(--color-neutral-100);
  --text-on-surface: var(--color-neutral-900);
}

:root:has([data-theme="dark"]) {
  --surface: var(--color-neutral-900);
  --text-on-surface: var(--color-neutral-100);
}

body {
  background-color: var(--surface);
  color: var(--text-on-surface);
}`}
                />
            </div>
            <PostNote className="my-8">
                <p> For tools that help you design accessible, contrast-safe color palettes, see the <Link href="#resources-color-accessibility-tools">resources section</Link>.</p>
                <p className="italic">
                    The full token set for this project is available on <Link href="https://github.com/codercarl1243/react_components_system/tree/main/app/styles/tokens">GitHub</Link>.
                </p>
            </PostNote>
        </PostSection>
    );
}