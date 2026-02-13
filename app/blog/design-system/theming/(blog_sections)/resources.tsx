import Code from "@/components/code";
import Heading from "@/components/heading";
import AnchorHeading from "@/components/heading/anchorHeading";
import Link from "@/components/link";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";
import TabList from "@/components/tablist";
import TokenFlowDiagram from "../examples/2_whatWeAreBuilding";
import { Block, Stack } from "@/components/primitives";
import InlineCode from "@/components/code/inlineCode";
import PostNote from "@/components/post/post.note";

export default function Resources() {

  return (
    <PostSection id="resources" className="flow-8">
      <Stack>
        <AnchorHeading as={"h2"} id="resources-heading">Code & Resources</AnchorHeading>
        <p className="italic">
          This section documents constraints, tradeoffs, and reference material — it does not introduce new concepts.
        </p>
        <p>
          The system is built on CSS custom properties and their inheritance model. For a deeper understanding of how css variables work, see the <Link href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties">MDN guide on CSS Custom Properties</Link>.
        </p>
      </Stack>
      <Stack>
        <AnchorHeading as="h3" headingSize={4} id="resources-notes">Notes & Tradeoffs</AnchorHeading>
        <p>
          Key architectural constraints:
        </p>
        <List as="ol" spacing="loose" marker="lower-roman">
          <li className="flow-4">
            <p>
              <strong>Variants do not compose.</strong>{" "}
              When multiple <InlineCode codeString="data-variant" lang="html" /> attributes exist in a subtree, the closest ancestor wins.
            </p>
            <p>
              If a child needs a different semantic meaning, it must opt in <em className="fun-underline">explicitly</em>.
            </p>
          </li>
          <li className="flow-4">
            <p>
              <strong>Missing tokens fall back silently.</strong>{" "}
              If a variant or appearance is undefined, CSS variable fallbacks apply.
            </p>
            <p>
              This favors resilience over strict enforcement.
            </p>
          </li>
          <li className="flow-4">
            <p>
              <strong>Interactive states are layered separately.</strong>{" "}
              This system defines meaning (<em>variant</em>) and mapping (<em>appearance</em>), not interaction timing.
            </p>
            <p>
              Hover, focus, and active states live in the appearance or component layer.
            </p>
          </li>
          <li className="flow-4">
            <p>
              <strong>Paint presets are exclusive.</strong>{" "}
              Presets like <InlineCode codeString="surface" lang="html" /> and <InlineCode codeString="all" lang="html" /> should not be mixed with composable paint channels.
            </p>
            <p>
              This is a deliberate constraint to avoid ambiguous styling outcomes.
            </p>
            <PostNote>
              This constraint is documented rather than enforced by default.
              Teams that need stricter guarantees can enforce it through typing, linting, or review conventions.
            </PostNote>
          </li>
        </List>
      </Stack>
      <Stack>
        <AnchorHeading as="h3" headingSize={4} id="resources-color-accessibility-tools">Theme validation & color systems</AnchorHeading>
        <p>
          Tools for validating contrast and accessibility:
        </p>
        <List spacing="loose" marker="circle" as="ul">
          <li><Link href="https://www.w3.org/WAI/WCAG21/quickref/">WCAG 2.1 Quick Reference guide</Link> — a concise overview of contrast requirements and success criteria</li>
          <li><Link href="https://webaim.org/resources/contrastchecker/">WebAIM Contrast Checker</Link> — the gold standard for checking contrast ratios</li>
          <li><Link href="https://contrast-grid.eightshapes.com/">Contrast Grid</Link> — compare entire color palettes at once</li>
          <li><Link href="https://color.review/">Color.review</Link> — preview colors with vision-deficiency simulations</li>
        </List>
      </Stack>
      <Stack>
        <Heading as={"h3"} headingSize={4}>Theming Pipeline (Reference)</Heading>
        <p>
          Reference implementation of the theming pipeline discussed in the post.
        </p>
        <TabList
          tabListName="theming_code_reference"
          className="code__reference height-min"
          defaultActiveTabId="theme-tokens"
          variant="accent"
          orientation="horizontal"
          tabs={[
            {
              id: 'theme-tokens',
              tabLabel: 'theme.css',
              panelContent: (
                <Code
                  lang="css"
                  codeString={`/*
Theme API

Themes define global, environment-level color tokens.
They describe the default canvas and baseline text colors
before any component opts into styling.

Themes do NOT:
  → define variants
  → apply component styling
  → control appearance or paint behavior

Theme tokens are consumed by:
  → the variant layer (as defaults)
  → global elements (e.g. body)
*/

/* Light theme */
[data-theme="light"] {
    --surface: var(--color-neutral-100);
    --text-on-surface: var(--color-neutral-900);
}

/* Dark theme */
[data-theme="dark"] {
    --surface: var(--color-neutral-900);
    --text-on-surface: var(--color-neutral-100);
}

/* Global defaults */
body {
    background-color: var(--surface);
    color: var(--text-on-surface);
}
`} />)
            },
            {
              id: "variants-layer",
              tabLabel: "variants.css",
              panelContent: (
                <Code
                  lang="css"
                  codeString={`/*
Variant tokens are inert by default.
They do not affect styling until mapped by appearance 
and applied via paint.
*/

[data-variant] {
  --background-color: var(--variant-bg);
  --foreground-color: var(--variant-fg);
  --border-color: var(--variant-border);
  --surface-color: var(--variant-surface);
}
  
[data-variant="primary"] {
  --variant-bg: var(--color-primary-400);
  --variant-fg: var(--color-neutral-100);
  --variant-border: var(--color-primary-600);
  --variant-fg-on-surface: var(--color-primary-600);
  --variant-surface: var(--color-primary-100);
}
/* 
 Additional variants (secondary, danger, success, etc.) 
 follow the same contract and are omitted here for clarity.
*/  
`} />)
            },
            {
              id: "appearance-layer",
              tabLabel: "appearance.css",
              panelContent: (
                <Code
                  lang="css"
                  codeString={`/*
Appearance API

Appearances map semantic variant tokens to resolved color variables.
They DO NOT apply paint directly.

Painting is opt-in and controlled via the data-paint attribute.

variant → provides tokens
appearance → maps tokens
paint → applies them
*/

/* Strong, high-emphasis application (buttons, badges, pills) */
[data-appearance="filled"] {
    --background-color: var(--variant-bg);
    --foreground-color: var(--variant-fg);
    --border-color: var(--variant-border);
}

/* Tonal surface application (callouts, notices, containers) */
[data-appearance="tonal"] {
    --background-color: var(--variant-surface);
    --foreground-color: var(--variant-fg-on-surface);
    --border-color: var(--variant-border);
}

/* 
  .... insert more appearances as your project needs (outlined, ghost etc.)
*/  
`} />)
            },
            {
              id: "paint-boundaries",
              tabLabel: "paint.css",
              panelContent: (
                <Code
                  lang="css"
                  codeString={`/*
Paint API

Paint is opt-in and applies only to Block (and primitives composed from Block).
This is an explicit design boundary: paint is never applied to arbitrary elements.

Paint controls whether resolved color variables are applied.
It does not define colors (variants) or how they are mapped (appearance).

Channels (composable):
- background → applies background-color
- foreground → applies text color
- border → applies border + border-color

Presets (exclusive):
- surface → background + border (no text color)
- all → background + foreground + border

Examples:
  data-paint="background foreground"  // Composable channels
  data-paint="surface"               // Preset (do not mix with channels)
*/

/* Foreground channel */
.block[data-paint~="foreground"],
.block[data-paint="all"] {
    color: var(--foreground-color, inherit);
}

/* Background channel (and presets that include background) */
.block[data-paint~="background"],
.block[data-paint="all"],
.block[data-paint="surface"] {
    background-color: var(--background-color, transparent);
}

/* Border channel (and presets that include border) */
.block[data-paint~="border"],
.block[data-paint="all"],
.block[data-paint="surface"] {
    border: 1px solid var(--border-color, var(--text-on-surface, currentColor));
}`} />)
            },
            {
              id: "flow-diagram",
              tabLabel: "theming flow",
              panelContent: (
                <Block paint="all" variant="neutral" variantAppearance="filled">
                  <Heading as="h4" className="px-4">Token Flow Through the System</Heading>
                  <TokenFlowDiagram />
                </Block>
              )
            }
          ]}
        />
      </Stack>
    </PostSection>
  )
}