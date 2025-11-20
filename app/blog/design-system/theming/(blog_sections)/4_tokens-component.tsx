import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import Heading from "@/components/heading";
import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";

export default function Section4() {

  return (
    <PostSection id="component-tokens">
      <AnchorHeading as="h2" prefix="Step 2 —" id="component-tokens-heading">
        Define Your Component Tokens
      </AnchorHeading>

      <p>
        Global tokens define the visual language of your system, but components shouldn&apos;t reach for them directly. Instead, each component exposes its own <span className="bold fun-underline">semantic component tokens</span> (<span className="italic">the variables that describe what the component needs, not where the value comes from</span>).
      </p>

      <p>
        These component tokens act as a translation layer between global design tokens and component styles.
      </p>
      <List spacing="tight" variant="none">
        <li><strong>Semantic tokens</strong> - like <InlineCode codeString="--background-color" lang="css" /> define <span className="italic">what colors mean</span>.</li>
        <li><strong>Component-specific tokens</strong> like <InlineCode codeString="--button-background-color" lang="css" /> decide <span className="italic">how the component uses them</span>.</li>
      </List>

      <Heading as="h3">Why Component Tokens Matter</Heading>
      <List spacing="tight">
        <li><strong>Encapsulation:</strong> Components define <em>what</em> they need (background, foreground, border); themes define <em>which colors</em> to use.</li>
        <li><strong>Flexibility:</strong> You can change a theme, variant, or visual style by adjusting only the mapped values — without refactoring component CSS.</li>
        <li><strong>Consistency:</strong> Every component uses the same semantic vocabulary.</li>
        <li><strong>Accessibility:</strong> Foreground/background relationships are explicit and easy to audit for contrast.</li>
      </List>

      <Heading as="h3">Example: Component Token Defaults</Heading>
      <p>
        Here&apos;s what a basic set of component tokens might look like inside a button stylesheet:
      </p>

      <Code
        copyEnabled={false}
        lang="css"
        codeString={`/* Button Component Tokens */
.button {
  /* Default variant tokens (can be overridden by data-variant) */
  --background-color: var(--color-primary-400);
  --foreground-color: var(--color-neutral-100);
  --border-color: var(--color-primary-600);

  /* Component layer - how the button consumes variant tokens */
  --button-background-color: var(--background-color);
  --button-foreground-color: var(--foreground-color);
  --button-border-color: var(--border-color);

  /* Usage */
  background: var(--button-background-color);
  color: var(--button-foreground-color);
  border: 1px solid var(--button-border-color);
}`}
      />
      <p>These defaults provide the base appearance of your component.</p>
      <p>
        In the next step, we will use <InlineCode codeString="data-variant" /> attributes to override <InlineCode codeString="--background-color" lang="css" />, <InlineCode codeString="--foreground-color" lang="css" />, and <InlineCode codeString="--border-color" lang="css" /> — creating themes and variants without touching the button's internal CSS.
      </p>
    </PostSection>
  );
}