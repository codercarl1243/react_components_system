import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import Link from "@/components/link";
import Heading from "@/components/heading";
import PostInfo from "@/components/post/post.info";
import { Stack } from "@/components/primitives";
import ColorSwatch from "@/components/colorSwatch";

export default function section4() {
    return (
        <PostSection id="global-tokens-theming">
            <AnchorHeading as={"h2"} prefix="Step 1 —" id="global-tokens-theming-heading">
                Define Your Global Design Tokens
            </AnchorHeading>
            <Stack>
                <p>
                    Every theming system starts with a stable set of <span className="bold">global design tokens</span>. These are the reusable values your entire interface will rely on: colors, spacing, typography, radii, shadows, and breakpoints.
                </p>
                <p>
                    Each category follows the same structure—stable values defined on <InlineCode codeString=":root" lang="css" /> and reused across your entire system. They don't style anything on their own; they simply act as the <span className="fun-underline italic">source of truth</span>.
                </p>
                <PostInfo>
                    The full token set for this project is available on <Link href="https://github.com/codercarl1243/react_components_system/tree/main/styles/tokens">GitHub</Link>. Below, we'll focus on color tokens as they best demonstrate the pattern.
                </PostInfo>
            </Stack>

            <Stack>
                <Heading as="h3">Color Tokens</Heading>

                <p>
                    Color tokens use a numeric scale where lower numbers represent lighter values and higher numbers represent darker ones. This makes it intuitive to find contrast pairs: <InlineCode codeString="--color-primary-400" /> <ColorSwatch
                        color="var(--color-primary-400)"
                        aria-label="Primary 400 color swatch"
                    /> (medium blue) naturally pairs with <InlineCode codeString="--color-neutral-100" />  <ColorSwatch
                        color="var(--color-neutral-100)"
                        aria-label="Neutral 100 color swatch"
                    /> (white) for accessible contrast.
                </p>

                <p>
                    The pattern across all color scales is straightforward: mid-tier colors (400, 600) work on neutral backgrounds, while light tiers (100, 200) need darker neutral text (600, 700, 800) for readability. This separation between brand colors and neutral colors gives you both visual identity and accessibility—brand colors define <em>who you are</em>, neutral colors ensure <em>everyone can read it</em>.
                </p>

                <Code
                    lang="css"
                    codeString={`/* Global Color Tokens */
:root {
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
                    These tokens become the building blocks for everything else. A button <em>could</em> reference <InlineCode codeString="var(--color-primary-400)" lang="css" /> directly, but it shouldn't. Instead, components use <span className="bold">semantic tokens</span> like <InlineCode codeString="--background-color" lang="css" /> that map back to these global values. This indirection is what makes the system flexible—we'll explore why in the next section.
                </p>
            </Stack>

            <PostInfo>
                For tools that help you design accessible, contrast-safe color palettes, see the <Link href="#resources-color-accessibility-tools">resources section</Link>.
            </PostInfo>
        </PostSection>
    );
}