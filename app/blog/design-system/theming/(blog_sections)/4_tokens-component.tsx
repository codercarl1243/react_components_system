import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import Heading from "@/components/heading";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";

export default function Section4() {

  return (
    <PostSection id="component-tokens">
      <AnchorHeading as="h2" prefix="Step 2 —" id="component-tokens-heading">
        Define Your Component Tokens
      </AnchorHeading>

      <p>
        Global tokens define the visual language of your system, but components shouldn&apos;t reach for them directly. Instead, each component exposes its own <span className="bold fun-underline">semantic component tokens</span> (<span className="italic">The variables that describe what the component needs, not where the value comes from</span>).
      </p>

      <p>
        These component tokens act as a translation layer: they map global values into the specific semantic roles each component needs, such as <InlineCode codeString="--background-color" lang="css" /> or <InlineCode codeString="--foreground-color" lang="css" />.
      </p>

      <Heading as="h3">Why Component Tokens Matter</Heading>
      <ul>
        <li><strong>Encapsulation:</strong> Components define <em>what</em> they need (background, foreground, border); themes define <em>which colors</em> to use.</li>
        <li><strong>Flexibility:</strong> You can change a theme, variant, or visual style by adjusting only the mapped values — without refactoring component CSS.</li>
        <li><strong>Consistency:</strong> Every component uses the same semantic vocabulary.</li>
        <li><strong>Accessibility:</strong> Foreground/background relationships are explicit and easy to audit for contrast.</li>
      </ul>

      <Heading as="h3">Example: Component Token Defaults</Heading>
      <p>
        Here&apos;s what a basic set of component tokens might look like inside a button stylesheet:
      </p>

      <Code
        copyEnabled={false}
        lang="css"
        codeString={`/* Button Component Tokens */
.button {
  /* Semantic layer - what the component needs */
  --background-color: var(--color-primary-400); /* ← maps to global token */
  --foreground-color: var(--color-neutral-100);
  --border-color: var(--color-primary-600);

  /* Usage - component styles reference semantic tokens only */
  background: var(--background-color);
  color: var(--foreground-color);
  border: 1px solid var(--border-color);
}`} />

      <p>
        These defaults provide the base appearance of your component. In the next step, you&apos;ll learn how to override these component tokens using <strong>data attributes</strong> to create themes and variants without touching the component&apos;s internal CSS.
      </p>
    </PostSection>
  );
}