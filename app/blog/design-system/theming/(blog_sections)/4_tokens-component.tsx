import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import Heading from "@/components/heading";
import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";

export default function Section4() {

  return (
    <PostSection id="component-tokens">
      <AnchorHeading as="h2" prefix="Step 2 —" id="component-tokens-heading">
        Define Your Component Tokens
      </AnchorHeading>
      <p>
        <span className="bold fun-underline">Global tokens</span> define the visual language of your system.
      </p>

      <p>
        But components shouldn't reach for them directly. Instead, each component exposes its own <span className="bold fun-underline">semantic component tokens</span> (<span className="italic">the variables that describe what the component needs, not where the value comes from</span>).
      </p>
      <p>
        In the next step, we'll add a third layer — <span className="bold fun-underline">variant tokens</span> — these sit between global tokens and component tokens, letting you swap entire color roles without touching component code.
      </p>
      
      <Heading as="h3">Why Component Tokens Matter</Heading>
      <List spacing="tight">
        <li><strong>Encapsulation:</strong> Components define <em>what</em> they need (background, foreground, border); themes define <em>which colors</em> to use.</li>
        <li><strong>Flexibility:</strong> You can change a theme, variant, or visual style by adjusting only the mapped values — without refactoring component CSS.</li>
        <li><strong>Consistency:</strong> Every component uses the same semantic vocabulary.</li>
        <li><strong>Accessibility:</strong> Foreground/background relationships are explicit and easy to audit for contrast.</li>
      </List>

      <p>
        Component tokens achieve this through a two-layer system:
      </p>
      <List spacing="tight" variant="decimal" ordered>
        <li><strong>Semantic tokens</strong> define <em>what</em> colors mean <InlineCode codeString="--background-color" lang="css" /></li>
        <li><strong>Component tokens</strong> decide <em>how</em> a component uses them <InlineCode codeString="--button-background-color" lang="css" /></li>
      </List>

      <Heading as="h3">Example: Component Token Defaults</Heading>
      <p>
        Let&apos;s look at how a component applies this pattern in practice.
      </p>
      <PostNote>
        <p>Component tokens are prefixed to prevent naming clashes between components.</p>
        <p><span className="italic">Example:</span> <InlineCode codeString="--button-background-color" lang="css" /></p>
      </PostNote>
      <Code
        copyEnabled={false}
        lang="css"
        codeString={`/* Button Component Tokens */
.button {
  /* Semantic tokens - defaults */
  --background-color: var(--color-primary-400);
  --foreground-color: var(--color-neutral-100);
  --border-color: var(--color-primary-600);

  /* Component tokens - consume semantic tokens */
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