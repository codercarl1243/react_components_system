import Code from "@/components/code";
import Heading from "@/components/heading";
import AnchorHeading from "@/components/heading/anchorHeading";
import Link from "@/components/link";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import { Block, Row } from "@/components/primitives";

export default function Section4() {
    return (
        <PostSection id="global-tokens">
            <AnchorHeading as={"h2"} prefix="Step 1 —" id="global-tokens-heading">
                Global tokens
            </AnchorHeading>
            <div className="flow-6">
                <p style={{
                    marginBottom: "0"
                }}>
                    Every robust theming system starts with a stable set of <span className="bold">global tokens</span>. These are the raw values your entire interface relies on: colors, spacing, typography, radii, shadows, and breakpoints.
                </p>
                <Block as="aside"
                    style={{
                        margin: "2rem 0",
                        padding: "1rem 1.25rem",
                        borderLeft: "4px solid var(--text-muted)",
                        display: "grid",
                        gap: "0.5rem",
                    }}>
                    <Row as="strong"
                        className="font-accent"
                        style={{
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "var(--text-muted)",
                        }}
                    >System rule</Row>
                    <p className="m-0">
                        Global tokens describe the environment, not behavior or meaning.
                    </p>
                </Block>
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
                    Together, this gives the system room to define explicit contrast guarantees at different points in the scale, without baking semantic meaning into raw values.
                </p>
                <Code
                    lang="css"
                    title="colors.css - Global color tokens"
                    codeString={`:root {
    /* Neutrals */
    --color-neutral-100: hsl(248, 0%, 100%);
    --color-neutral-400: hsl(248, 0%, 60%);
    --color-neutral-600: hsl(248, 0%, 40%);
    --color-neutral-900: hsl(248, 60%, 5%);
}`}
                />
                <p>
                    All other color scales in the system follow the <em>same</em> naming and numeric structure.
                </p>
                <p>
                    These tokens are intentionally generic. They describe <em>what colors exist</em>, not <em>what they're used for</em>.
                </p>
                <p>
                    Defining a base theme in terms of surface and text colors establishes a contrast-safe foundation before any semantic color roles are introduced.
                </p>
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

                <p>
                    Later on we will introduce <em>semantic meaning</em> within the <span className="bold">variant layer</span>.
                </p>
            </div>
            <PostNote>
                <p> For tools that help you design accessible, contrast-safe color palettes, see the <Link href="#resources-color-accessibility-tools">resources section</Link>.</p>
                <p className="italic">
                    The full token set for this project is available on <Link href="https://github.com/codercarl1243/react_components_system/tree/main/styles/tokens">GitHub</Link>.
                </p>
            </PostNote>
        </PostSection>
    );
}