import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import Heading from "@/components/heading";
import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";

export default function Section6() {
    return (
        <PostSection id="variants">
            <AnchorHeading as={"h2"} prefix="Step 3 —" id="variants-heading">
                Variants
            </AnchorHeading>
            <p>
                With structure in place, we can now introduce meaning.
            </p>
            <p>
                Variants are the layer where raw theme tokens are translated into semantic intent. A variant does not describe how something looks — it describes what it represents.
            </p>

            <p>
                <InlineCode codeString="primary" lang="css" /> communicates emphasis. <InlineCode codeString="danger" lang="css" /> communicates risk. <InlineCode codeString="success" lang="css" /> communicates confirmation. None of these imply a specific visual treatment.
            </p>

            <p>
                This distinction is critical. If variants encode presentation, the system collapses under its own weight.
            </p>

            <Heading as="h3" headingSize={4}>
                Variants Define Palettes, Not Properties
            </Heading>
            <p>
                A variant's responsibility is to expose a color palette, not to apply styling. Each variant defines the same small, predictable set of semantic values:
            </p>
            <List as="ul">
                <li>background</li>
                <li>foreground</li>
                <li>border</li>
                <li>surface</li>
            </List>
            <p>
                These values describe relationships, not CSS properties.
            </p>
            <Code lang="css" codeString={`[data-variant="primary"] {
  --variant-bg: var(--color-primary-400);
  --variant-fg: var(--color-neutral-100);
  --variant-border: var(--color-primary-600);
  --variant-surface: var(--color-primary-100);
  --variant-text-on-surface: var(--color-primary-600);
}`} />
            <p>
                Every variant exposes the <em>same</em> semantic interface. This consistency is what allows appearances and paint to remain generic.
            </p>
            <Heading as="h3">Why variants must stay semantic</Heading>

            <p>
                Variants must remain semantic. Once they encode presentation — <InlineCode codeString="primary-outline" />, <InlineCode codeString="danger-ghost" />, <InlineCode codeString="subtle-primary" /> — the system begins to fragment.
            </p>

            <p>
                Meaning becomes unstable, appearances lose their role, and components start accumulating variant-specific logic.
            </p>

            <p>
                Variants define <em>what something represents</em>, not <em>how it looks</em>. If a visual change is needed, it belongs in the <strong>appearance</strong>layer.
            </p>

            <Heading as="h3" headingSize={4}>Variants do not apply styling</Heading>
            <p>
                Variants only define tokens. They do not apply background, foreground, or border styles.
            </p>
            <p>
                At this stage, nothing changes visually — and that's intentional. Meaning exists before treatment.
            </p>
            <p>
                In the next step, we'll introduce the <strong>appearance</strong> layer, which maps semantic palettes to visual outcomes.
            </p>

        </PostSection>
    );
}