import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import Heading from "@/components/heading";
import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import { Stack } from "@/components/primitives";

export default function Section4() {

  return (
    <PostSection id="component-tokens">
      <AnchorHeading as="h2" prefix="Step 2 —" id="component-tokens-heading">
        Define Your Component Tokens
      </AnchorHeading>
      <Stack>
        <p>
          Now that we have our <span className="bold fun-underline">Global tokens</span> from Step 1, define the visual language of your system.
        </p>
        <p>
          But to keep the system expandable, components shouldn&apos;t reach for them directly. Instead, each component exposes its own <span className="bold"><span className="fun-underline">semantic</span> component tokens</span> (<span className="italic">the variables that describe what the component needs, not where the value comes from</span>).
        </p>
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
          In the next step, we&apos;ll add a third layer — <span className="bold"><span className="fun-underline">variant</span> tokens </span>— these sit between global tokens and component tokens, letting you swap entire color roles without touching component code.
        </p>
      </Stack>

      <Stack>
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
          <li>
            <strong>Semantic tokens</strong> (<InlineCode codeString="--background-color" lang="css" />) — describe the <em>role</em> a color plays
          </li>
          <li>
            <strong>Component tokens</strong> (<InlineCode codeString="--button-background-color" lang="css" />) — namespace those roles to prevent conflicts between components
          </li>
        </List>
        <PostNote>
          <strong>Why the double indirection?</strong>
          <p>Semantic tokens let variants change colors across <em>multiple components</em> at once. </p>
          <p>Component tokens ensure a button's <InlineCode codeString="--background-color" lang="css" /> never clashes with a card's <InlineCode codeString="--background-color" lang="css" />.</p>
        </PostNote>
        <p>
          In the next step, we will use <InlineCode codeString="data-variant" /> attributes to override <span className="italic">background</span>, <span className="italic">foreground</span>, and <span className="italic">border</span> colors — creating <strong>themes</strong> and <strong>variants</strong> without touching the button&apos;s internal CSS.
        </p>
      </Stack>
    </PostSection>
  );
}