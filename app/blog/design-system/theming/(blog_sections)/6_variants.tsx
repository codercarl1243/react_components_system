import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import Heading from "@/components/heading";
import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";
import Rule from "@/components/rule";

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
                Variants are the layer where raw tokens are translated into semantic intent.
            </p>
            <p style={{
                marginBottom: "0"
            }}>
                <InlineCode codeString="primary" lang="css" /> communicates emphasis. <InlineCode codeString="danger" lang="css" /> communicates risk. <InlineCode codeString="success" lang="css" /> communicates confirmation.
            </p>
            <Rule>
                A variant does not describe how something looks — it communicates intent.
            </Rule>
            <p>
                When variants encode presentation, change becomes expensive. Visual adjustments require duplicated logic or increasing specificity, and components accumulate special cases.
            </p>

            <Heading as="h3" headingSize={4}>
                Variants Define Palettes, Not Properties
            </Heading>
            <p>
                A variant's responsibility is to expose a color palette, not to apply styling. Each variant defines the same small, predictable set of semantic values:
            </p>
            <List as="dl">
                <div>
                    <dt>background</dt>
                    <dd>Applied to the element itself.</dd>
                </div>

                <div>
                    <dt>foreground</dt>
                    <dd>Content color within the element.</dd>
                </div>

                <div>
                    <dt>border</dt>
                    <dd>Border or outline color.</dd>
                </div>

                <div>
                    <dt>surface</dt>
                    <dd>A contextual container tone used for nested or elevated regions.</dd>
                </div>

                <div>
                    <dt>foreground on surface</dt>
                    <dd>Content color used within a surface context.</dd>
                </div>
            </List>
            <p>
                These values describe relationships, not CSS properties.
            </p>
            <Code lang="css" codeString={`[data-variant="primary"] {
  --variant-bg: var(--color-primary-400);
  --variant-fg: var(--color-neutral-100);
  --variant-border: var(--color-primary-600);
  --variant-surface: var(--color-primary-100);
  --variant-fg-on-surface: var(--color-primary-600);
}`} />
            <p>
                Because the interface is consistent, appearance and paint can remain generic.
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