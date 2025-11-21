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

export default function Section5() {
  return (
    <PostSection id="data-attributes-variants" gap={6}>
      <AnchorHeading as="h2" prefix="Step 3 —" id="data-attributes-variants-heading">
        Apply Variants with Data Attributes
      </AnchorHeading>

      <Stack>
        <p>
          With global tokens and component tokens in place, the final piece is deciding <em>which values</em> a component should use in different contexts. This is where <span className="bold">data attributes</span> come in.
        </p>

        <p>
          Instead of scattering variant logic across JavaScript or component props, you define variants through CSS attribute selectors like <InlineCode codeString='[data-variant="primary"]' lang="css" />. The browser handles the cascade automatically — no runtime overhead, no theme providers, no context.
        </p>

        <p><span className="fun-underline">CSS does all of the heavy lifting</span> — the browser resolves the cascade for you.</p>

        <PostNote>
          <p>A <span className="bold">variant</span> represents a semantic colour role such as <span className="italic">“primary”</span> or <span className="italic">“secondary”</span>.</p>
          <p className="text-sm neutral-600">Variants can be applied directly on a component, or a wrapper higher in the DOM to theme entire UI regions at once.</p>
          <p>A <span className="bold">style</span> defines <em>how</em> a component consumes those tokens — for example, “filled” or “outlined”.</p>
        </PostNote>
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
      </Stack>
      <Stack>
        <Heading as="h3">Cascade Layers: Ensuring Variants Always Win</Heading>
        <p>
          Without explicit ordering, <InlineCode codeString='[data-variant="secondary"]' lang="css" /> and <InlineCode codeString=".button" lang="css" /> have equal specificity — whichever appears last in your stylesheet wins. This makes the system fragile and order-dependent.
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
  [data-variant="secondary"] { --background-color: var(--color-secondary-400); }
}`}
        />

        <p className="text-sm neutral-600">More information on cascade layers can be found on the <Link href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@layer">MDN documentation</Link>.</p>
      </Stack>

      <Stack>
        <Heading as="h3">Example: Button Variants</Heading>
        <p>
          Here's how you might define <InlineCode codeString="primary" /> and <InlineCode codeString="secondary" /> variants:
        </p>
        <TabList
          tabListName="data-attributes-variants_codeReference"
          className="code__reference"
          defaultActiveTabId="[tbc]"
          data-variant="accent"
          orientation="horizontal"
          tabs={[
            {
              id: 'data-attributes-variants_styles',
              tabLabel: 'styles.css',
              panelContent: (
                <Code
                  lang="css"
                  copyEnabled={false}
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
                  copyEnabled={false}
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
              tabLabel: 'variant.css',
              panelContent: (
                <Code
                  lang="css"
                  copyEnabled={false}
                  codeString={`/* ./design-system/variants.css - Global variant definitions */
@layer design-system {
  [data-variant="primary"] {
    --background-color: var(--color-neutral-100);
    --foreground-color: var(--color-primary-400);
    --border-color: var(--color-primary-600);
  }

  [data-variant="secondary"] {
    --background-color: var(--color-neutral-100);
    --foreground-color: var(--color-secondary-400);
    --border-color: var(--color-secondary-600);
  }
}`} />
              )
            }
          ]}
        />
        <p>
          Now any element with <InlineCode codeString='data-variant="secondary"' /> will use the secondary colour palette. The component's internal CSS doesn't change — only the semantic token values do.
        </p>

      </Stack>

      <Stack>
        <Heading as="h3">Usage</Heading>
        <Code
          lang="tsx"
          copyEnabled={false}
          codeString={`// Default variant (uses component defaults)
<button class="button">
  Click me
</button>

// Primary variant
<button class="button" data-variant="primary">
  Get started
</button>`}
        />

        <Inline 
        gap={2}
        // style={{ display: "flex", gap: "var(--spacing-md)", justifyContent: "center" }}
        >
          <Button>Click me</Button>
          <Button data-variant="primary">Get started</Button>
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