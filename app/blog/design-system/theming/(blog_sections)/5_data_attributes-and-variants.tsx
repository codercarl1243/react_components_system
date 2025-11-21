import Button from "@/components/button";
import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import Heading from "@/components/heading";
import AnchorHeading from "@/components/heading/anchorHeading";
import Link from "@/components/link";
import List from "@/components/list";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import TabList from "@/components/tablist";

export default function Section5() {
  return (
    <PostSection id="data-attributes-variants">
      <AnchorHeading as="h2" prefix="Step 3 —" id="data-attributes-variants-heading">
        Apply Variants with Data Attributes
      </AnchorHeading>

      <p>
        With global tokens and component tokens in place, the final piece is deciding <em>which values</em> a component should use in different contexts. This is where <span className="bold">data attributes</span> come in.
      </p>

      <p>
        Instead of scattering variant logic across JavaScript or component props, you define variants through CSS attribute selectors like <InlineCode codeString='[data-variant="primary"]' lang="css" />. The browser handles the cascade automatically — no runtime overhead, no theme providers, no context.
      </p>
      <p><span className="fun-underline">CSS does all of the heavy lifting</span> — the browser resolves the cascade for you.</p>
      <PostNote>
        <p>
          a <span className="bold">variant</span> is defined by a semantic color role such as <span className="italic">“primary”</span> or <span className="italic">“secondary”</span>.
        </p>
        <p className="text-sm neutral-600">Variants can be applied directly to a component, or higher in the DOM to theme entire UI regions at once.</p>
        <p>a <span className="bold">style</span> is specific to the component and defines <em>how</em> the variant tokens will be consumed</p>
      </PostNote>

      <Heading as="h3">Why Data Attributes?</Heading>
      <List spacing="tight">
        <li><strong>Framework-agnostic:</strong> They work in React, Vue, Svelte, plain HTML — anywhere CSS is supported</li>
        <li><strong>Zero runtime cost:</strong> The browser handles the cascade natively; there's no JavaScript re-rendering or context propagation</li>
        <li><strong>Explicit and debuggable:</strong> You can see a component's variant directly in the DOM, making debugging straightforward</li>
        <li><strong>SSR-friendly:</strong> Attributes render with the initial HTML — no flash of unstyled content or hydration mismatches</li>
      </List>



      <Heading as="h3">How Variants Override Component Tokens</Heading>
      <p>
        Remember the semantic tokens we defined in the previous section?
      </p>
      <p>Variants work by <em>overriding</em> those semantic tokens using CSS specificity. The component's <InlineCode codeString="--button-background-color" lang="css" /> continues to reference the semantic tokens <InlineCode codeString="--background-color" lang="css" />, so changes cascade automatically.</p>
      <Heading as="h4">Cascade Layers: Ensuring Variants Always Win</Heading>
      <p>
        Without explicit ordering, <InlineCode codeString='[data-variant="secondary"]' lang="css" /> and <InlineCode codeString=".button" lang="css" /> have equal specificity — whichever appears last in your stylesheet wins. This makes the system fragile and order-dependent.
      </p>
      <p>
        <span className="bold">Cascade layers</span> solve this by explicitly defining precedence. We declare that variants should always override component defaults, regardless of source order.
      </p>
      <p className="text-sm neutral-600">More information on Cascade layers can be found on the <Link href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@layer">MDN website</Link></p>

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
        Now any element with <InlineCode codeString='data-variant="secondary"' /> will use the secondary color palette. The component's internal CSS doesn't change — only the semantic token values do.
      </p>

      <Heading as="h3">Usage in React</Heading>
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
      <div style={{ display: "flex", gap: "var(--spacing-md)", justifyContent: "center" }}><Button>
        Click me
      </Button>
        <Button data-variant="primary">
          Get started
        </Button></div>
      <p>
        These variants define <span className="italic">semantic color roles</span> that any component can consume. A button uses all three tokens (<InlineCode codeString="--background-color" lang="css" />, <InlineCode codeString="--foreground-color" lang="css" />, <InlineCode codeString="--border-color" lang="css" />), while a link might only use <InlineCode codeString="--foreground-color" lang="css" />. Components take what they need and ignore the rest.
      </p>

      <p> With this foundation in place, we have now separated <span className="italic">color semantics</span> from <span className="italic">visual presentation</span>.</p>
      <p>
        In the next step, we'll explore how to add <strong>component-specific styles</strong> like <InlineCode codeString="outlined" /> or <InlineCode codeString="filled" /> that work alongside these variants, giving you complete control over both color semantics and presentation patterns.
      </p>
    </PostSection>
  );
}