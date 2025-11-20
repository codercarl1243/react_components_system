import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import FunHighlight from "@/components/decorations/FunHighlight";
import Heading from "@/components/heading";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";


export default function Section5() {
  return (
    <PostSection id="themes-and-variants">
      <AnchorHeading as="h2" prefix="Step 3 —" id="themes-and-variants-heading">
        Apply Themes & Variants with Data Attributes
      </AnchorHeading>

      <p>
        With your <span className="bold">global tokens</span> and <span className="bold">component tokens</span> in place, the final piece is deciding <span className="italic">which</span> values a component should use in different contexts. This is where <span className="fun-underline">data attributes</span> shine.
      </p>

      <p>
        Instead of scattering theme logic across components or relying on JavaScript providers, you define variants through attributes like <InlineCode codeString={`data-variant="primary"`} /> or themes via <InlineCode codeString={`data-theme="dark"`} />.
      </p>
      <p className="fun-underline">CSS does the rest.</p>

      <Heading as="h3">Why Data Attributes?</Heading>
      <ul>
        <li><strong>Framework-agnostic:</strong> They work in React, Vue, Svelte, plain HTML — anywhere.</li>
        <li><strong>No runtime cost:</strong> The browser handles the cascade; there&apos;s no JS re-rendering or context propagation.</li>
        <li><strong>Explicit and debuggable:</strong> You can see a component&apos;s variant or theme right in the DOM.</li>
        <li><strong>Perfect for SSR:</strong> Attributes render with the HTML — no flash of unstyled theme.</li>
      </ul>

      <Heading as="h3">Variants vs. Component Styles</Heading>
      <p>
        A <span className="bold">data-variant</span> expresses <span className="fun-underline">meaning</span> (<span className="italic">“primary”, “secondary”, “accent”</span>) and is shared across multiple components. It sets global semantic tokens that any component can consume.</p>
      <p>
        A <span className="bold">data-style</span> (or similar attribute) expresses <span className="fun-underline">presentation</span> (<span className="italic">“filled”, “outlined”, “ghost”</span>) and is component-specific. It controls how the component actually uses its tokens.
      </p>









      <Heading as="h3">Example: Button Variants Using Data Attributes</Heading>
      <p>
        Here&apos;s how you might define a <span className="bold">primary variant</span> and a <span className="bold">secondary variant</span> using CSS attribute selectors:
      </p>

      <Code
        lang="css"
        codeString={`/* 
[data-variant="primary"] {
  --background-color: var(--color-neutral-100);
  --foreground-color: var(--color-primary-400);
  --border-color: var(--color-primary-600);
}


[data-variant="secondary"] {
  --background-color: var(--color-neutral-100);
  --foreground-color: var(--color-secondary-400);
  --border-color: var(--color-secondary-600);
}`} />

      <p>
        Notice how the variants don&apos;t change the component&apos;s internal CSS — they only change the <strong>component token values</strong>. The component continues using <InlineCode codeString="var(--background-color)" lang="css" />, <InlineCode codeString="var(--foreground-color)" lang="css" />, and <InlineCode codeString="var(--border-color)" lang="css" /> exactly the same way.
      </p>

      <Heading as="h3">Example: Light & Dark Themes</Heading>
      <p>Applying themes works the same way — but at a higher level in the DOM.</p>

      <Code
        lang="css"
        codeString={`/* Light Theme */
[data-theme="light"] {
  --color-surface: var(--color-neutral-100);
  --color-text: var(--color-neutral-900);
}

/* Dark Theme */
[data-theme="dark"] {
  --color-surface: var(--color-neutral-900);
  --color-text: var(--color-neutral-100);
}`}
      />

      <p>
        You can place <InlineCode codeString={`data-theme="dark"`} /> on <InlineCode codeString="<html>" lang="html" />, <InlineCode codeString="<body>" lang="html" />, or a layout wrapper. Everything inherits the theme automatically — a <FunHighlight>powerful</FunHighlight> pattern made possible by the CSS cascade.
      </p>

      <p>
        In the next section, we&apos;ll look at how to combine <strong>themes</strong> and <strong>variants</strong> into a unified, scalable theming API for your design system.
      </p>
    </PostSection>
  );
}