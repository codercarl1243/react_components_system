import Code from "@/components/code";
import FunHighlight from "@/components/decorations/FunHighlight";
import Heading from "@/components/heading";
import AnchorHeading from "@/components/heading/anchorHeading";
import Link from "@/components/link";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";
import TabList from "@/components/tablist";
import TokenFlowDiagram from "../examples/2_whatWeAreBuilding";
import { Block } from "@/components/primitives";

export default function ButtonsResources() {

  return (
    <PostSection id="resources">
      <AnchorHeading as={"h2"} id="resources-heading">Code & Resources</AnchorHeading>
      <p>
        This post focuses on <strong>system-level theming</strong> — using tokens, CSS variables, and clear styling boundaries to support light/dark modes, variants, and surfaces without component rewrites.
      </p>
      <p>
        At its core, the system is built on CSS custom properties and their inheritance model. For a deeper understanding of how variables flow, cascade, and override, see the <Link href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties">MDN guide on CSS Custom Properties</Link>.
      </p>
      <AnchorHeading as="h3" id="resources-color-accessibility-tools">Theme validation & color systems</AnchorHeading>
      <p>
        Color accessibility is one of the easiest ways to accidentally exclude users — and one of the easiest to fix with the right tools.
      </p>
      <p>
        Color decisions in this system are evaluated against established accessibility guidelines. For a concise overview of contrast requirements and success criteria, see the <Link href="https://www.w3.org/WAI/WCAG21/quickref/">WCAG 2.1 Quick Reference guide</Link>.
      </p>
      <p>
        The tools below can help test contrast, generate accessible palettes, and sanity-check theme decisions before you lock them into your design system.
      </p>
      <List spacing="loose" marker="circle" as="ul">
        <li><Link href="https://webaim.org/resources/contrastchecker/">WebAIM Contrast Checker</Link> — the gold standard for checking contrast ratios</li>
        <li><Link href="https://contrast-grid.eightshapes.com/">Contrast Grid</Link> — compare entire color palettes at once</li>
        <li><Link href="https://color.review/">Color.review</Link> — preview colors with vision-deficiency simulations</li>
      </List>
      <Heading as={"h3"}>Theming Pipeline (Reference)</Heading>
      <p>
        The snippets below represent the core building blocks discussed in this post — <FunHighlight>tokens</FunHighlight>, <FunHighlight>data attributes</FunHighlight>, and <FunHighlight>CSS layering</FunHighlight> used to implement theming without coupling styles to components.
      </p>
      <TabList
        tabListName="theming_code_reference"
        className="code__reference"
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
They do not affect styling until mapped by appearance and applied via paint.
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
  --variant-text-on-surface: var(--color-primary-600);
  --variant-surface: var(--color-primary-100);
}
/* 
 Additional variants (secondary, danger, success, etc.) follow the same contract and are omitted here for clarity.
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
    --foreground-color: var(--variant-text-on-surface);
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
            panelContent: <Block paint="background" variant="neutral" variantAppearance="filled"><TokenFlowDiagram /></Block>
          }
        ]}
      />
    </PostSection>
  )
}