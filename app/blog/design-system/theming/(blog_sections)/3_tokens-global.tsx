import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import Link from "@/components/link";
import Heading from "@/components/heading";

export default function Section3() {
    return (
        <PostSection id="tokens">
            <AnchorHeading as={"h2"} prefix="Step 1 —" id="global-tokens-heading">
                Define Your Global Design Tokens
            </AnchorHeading>
            <p>
                Every theming system starts with a stable set of <span className="bold">global design tokens</span>. These are the reusable values your entire interface will rely on:
            </p>
            <List spacing="tight">
                <li>colors</li>
                <li>spacing</li>
                <li>typography</li>
                <li>radii</li>
                <li>shadows</li>
                <li>breakpoints</li>
            </List>
            <p>
                Each of these categories follows the same structure — stable values defined on <InlineCode codeString=":root" lang="css" /> and reused across your entire system.
                They don't style anything on their own; they simply act as the <span className="fun-underline italic">source of truth</span>.
            </p>
            <p className="text-sm color-muted">
                If you'd like to explore the full token set used in this project, you can view it on <Link href="https://github.com/codercarl1243/react_components_system/tree/main/styles/tokens">GitHub</Link>.
            </p>

            <p>
                Below is a simplified example using color tokens. Your own project's tokens might be simpler or more extensive, but the structure remains the same.
            </p>

            <Heading as="h3">Color Tokens</Heading>
            <PostNote>
                <p>
                    Modern design systems often use <span className="bold">OKLCH</span> for improved perceptual consistency and easier contrast management.
                </p>
                <p>
                    This article uses <span className="bold">HSL</span> for <span className="fun-underline">clarity</span> and <span className="fun-underline">compatibility</span>, but the same token structure works with OKLCH if you prefer it.
                </p>
            </PostNote>
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
}
                `}
            />

            <p>
                These tokens become the building blocks for everything else. For example, a button <em>could</em> use <InlineCode codeString="background: var(--color-primary-400)" lang="css" /> — but ideally it shouldn&apos;t reference global tokens directly. Instead, it will use <span className="bold">component tokens</span> like <InlineCode codeString="--background-color" lang="css" /> or <InlineCode codeString="--foreground-color" lang="css" /> that map back to these values. We'll explore this pattern in the next section.
            </p>
            <p>
                Before we move on to component tokens, it's worth looking at a few tools that can help you evaluate and build accessible color palettes.
            </p>

            <p className="text-sm neutral-600">
                For a list of tools that help you design accessible, contrast-safe color palettes, see the <Link href="#resources-color-accessibility-tools">resources section</Link>.
            </p>
        </PostSection>
    );
}
