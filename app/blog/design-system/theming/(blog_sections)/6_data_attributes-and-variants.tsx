import Button from "@/components/button";
import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import Heading from "@/components/heading";
import AnchorHeading from "@/components/heading/anchorHeading";
import Link from "@/components/link";
import List from "@/components/list";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import { Inline, Stack } from "@/components/primitives";
import TabList from "@/components/tablist";
import TokenFlowDiagram from '@/app/blog/design-system/theming/examples/5_TokenFlowDiagram'
import PostInfo from "@/components/post/post.info";

export default function Section6() {
  return (
    <PostSection id="data-attributes-variants">
      <AnchorHeading as="h2" prefix="Step 3 —" id="data-attributes-variants-theming-heading">
        Apply Variants with Data Attributes
      </AnchorHeading>

      <Stack>
        <p>
          With global tokens and component tokens in place, the final piece is deciding <em>which values</em> a component should use in different contexts. This is where <span className="bold">variants</span> come in.
        </p>

        <p>
          Instead of scattering variant logic across JavaScript or component props, you define variants through CSS attribute selectors like <InlineCode codeString='[variant="primary"]' lang="css" />. The browser handles the cascade automatically — no runtime overhead, no theme providers, no context.
        </p>
        <TokenFlowDiagram />
<p>
  Notice the middle layer? Those <strong>variant palette tokens</strong> (<InlineCode codeString="--variant-bg" lang="css" />, etc.) sit between global tokens and semantic tokens. This indirection isn't just for organization—it's what enables a single variant to support multiple appearances. A <InlineCode codeString='variant="primary"' /> button can be filled, outlined, or ghost by remapping how these palette tokens flow into semantic tokens. We'll explore appearances in Section 6.
</p>
      </Stack>

      <Stack>
        <Heading as="h3">Why Data Attributes?</Heading>
        <List spacing="tight">
          <li><strong>Framework-agnostic:</strong> They work in React, Vue, Svelte, plain HTML — anywhere CSS is supported.</li>
          <li><strong>Zero runtime cost:</strong> The browser handles the cascade natively; there's no JavaScript re-rendering or context propagation.</li>
          <li><strong>Explicit and debuggable:</strong> You can see a component's variant directly in the DOM, making debugging straightforward.</li>
          <li><strong>SSR-friendly:</strong> Attributes render with the initial HTML — no flash of unstyled content or hydration mismatches.</li>
        </List>
      </Stack>

      <Stack>
        <Heading as="h3">How Variants Override Component Tokens</Heading>
        <p>
          Variants work by <span className="italic">overriding the semantic tokens</span> defined in each component. Because custom properties inherit, updating a semantic token at a higher level automatically updates every component token that references it — no component CSS needs to change.
        </p>
        {/* Show override example */}
      </Stack>
      <Stack>
        <Heading as="h3">Cascade Layers: Ensuring Variants Always Win</Heading>
        <p>
          Without explicit ordering, <InlineCode codeString='[variant="secondary"]' lang="css" /> and <InlineCode codeString=".button" lang="css" /> have equal specificity — whichever appears last in your stylesheet wins. This makes the system fragile and order-dependent.
        </p>
        <p><span className="bold">Cascade layers</span> solve this by explicitly defining precedence:</p>

        <Code
          lang="css"
          copyEnabled={false}
          codeString={`/* Define layer order - later layers override earlier ones */
@layer components, design-system;

@layer components {
  .button { --background-color: var(--color-primary-400); }
}

@layer design-system {
  [variant="secondary"] { --background-color: var(--color-secondary-400); }
}`}
        />

        <PostInfo>More information on cascade layers can be found on the <Link href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@layer">MDN documentation</Link>.</PostInfo>
      </Stack>

      <Stack>
        <Heading as="h3">Example: Button Variants</Heading>
        <p>
          Here's how you might define <InlineCode codeString="primary" /> and <InlineCode codeString="secondary" /> variants:
        </p>
        {/* Update to show --variant-* tokens */}
        <TabList
          tabListName="data-attributes-variants_codeReference"
          className="code__reference"
          defaultActiveTabId="[tbc]"
          variant="accent"
          orientation="horizontal"
          tabs={[
            {
              id: 'data-attributes-variants_styles',
              tabLabel: 'styles.css',
              panelContent: (
                <Code
                  lang="css"
                  codeString={`/* components like switch buttons, icons, cards, modals, etc. */
@layer components;
 /* design-token over rides */
@layer design-system;

@import url('./components/index.css') layer(components);
@import url('./design-system/index.css') layer(design-system);`} />
              )
            },
            {
              id: 'data-attributes-variants_button-styles',
              tabLabel: 'button.css',
              panelContent: (
                <Code
                  lang="css"
                  codeString={`/* ./components/button.css - Button component (unchanged from previous section) */
.button {
  --background-color: var(--color-primary-400);
  --foreground-color: var(--color-neutral-100);
  --border-color: var(--color-primary-600);

  --button-background-color: var(--background-color);
  --button-foreground-color: var(--foreground-color);
  --button-border-color: var(--border-color);

  background: var(--button-background-color);
  color: var(--button-foreground-color);
  border: 1px solid var(--button-border-color);`} />
              )
            },
            {
              id: 'data-attributes-variants_variant-styles',
              tabLabel: 'variants.css',
              panelContent: (
                <Code
                  lang="css"
                  copyEnabled={false}
                  codeString={`/* Universal mapping for all variants */
[data-variant] {
  --background-color: var(--variant-bg);
  --foreground-color: var(--variant-fg);
  --border-color: var(--variant-border);
  --surface-color: var(--variant-surface);
}

/* Variants define their color palette */
[variant="primary"] {
  --variant-bg: var(--color-primary-400);
  --variant-fg: var(--text-on-primary);
  --variant-border: var(--color-primary-600);
  --variant-surface: var(--color-primary-100);
}

[variant="secondary"] {
  --variant-bg: var(--color-secondary-400);
  --variant-fg: var(--text-on-secondary);
  --variant-border: var(--color-secondary-600);
  --variant-surface: var(--color-secondary-100);
}`}
                />
              )
            }
          ]}
        />
        <p>
          Now any element with <InlineCode codeString='variant="secondary"' /> will use the secondary colour palette. The component's internal CSS doesn't change — only the semantic token values do.
        </p>
        <PostNote>
          <p>
            The <InlineCode codeString="[data-variant]" lang="css" /> selector establishes a universal mapping from variant palette tokens (<InlineCode codeString="--variant-bg" lang="css" />, etc.) to semantic tokens (<InlineCode codeString="--background-color" lang="css" />, etc.).
          </p>
          <p>
            Each specific variant only needs to define its color palette — the mapping is handled automatically. This keeps variant definitions DRY and consistent.
          </p>
          <p>
            This indirection becomes essential in the next section when we introduce <strong>appearances</strong> — modifiers like <InlineCode codeString="filled" />, <InlineCode codeString="outlined" />, or <InlineCode codeString="ghost" /> that transform how variant colors are applied to components.
          </p>
        </PostNote>
      </Stack>

      <Stack>
        <Heading as="h3">Usage</Heading>
        <Code
          lang="tsx"
          copyEnabled={false}
          codeString={`// Default variant (uses component defaults)
<button className="button">
  Click me
</button>

// Primary variant
<button className="button" variant="primary">
  Get started
</button>`}
        />

        <Inline
          gap={2}
        >
          <Button>Click me</Button>
          <Button variant="primary">Get started</Button>
        </Inline>

        <p>
          These variants define <span className="italic">semantic colour roles</span> that any component can consume. A button uses all three tokens (<InlineCode codeString="--background-color" lang="css" />, <InlineCode codeString="--foreground-color" lang="css" />, <InlineCode codeString="--border-color" lang="css" />), while a link might only use <InlineCode codeString="--foreground-color" lang="css" />. Components take what they need and ignore the rest.
        </p>

        <p>
          With this foundation in place, we can now separate <span className="italic">colour semantics</span> from <span className="italic">visual presentation</span>.
        </p>
      </Stack>
      <p>
        In the next step, we'll explore how to add <strong>component-specific styles</strong> like <InlineCode codeString="outlined" /> or <InlineCode codeString="filled" /> that work alongside these variants, giving you complete control over both colour semantics and presentation patterns.
      </p>
    </PostSection>
  );
}