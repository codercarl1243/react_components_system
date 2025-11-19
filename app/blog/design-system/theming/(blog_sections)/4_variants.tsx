import Code from "@/components/code";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";

export default function Section4() {

    return (
        <PostSection id="variants">
            <AnchorHeading as={"h2"} id="variants-heading">
                Step 2 — Add Component Variants with Data Attributes
            </AnchorHeading>

            <p>
                Each variant gets its own set of custom properties. These values act like a “semantic color palette” that the
                component can safely consume.
            </p>

            <Code lang="css" codeString={`/* Button Variants */
[data-variant="primary"] {
  --primary-color: var(--color-neutral-100);
  --secondary-color: var(--color-primary-400);
  --accent-color: var(--color-primary-600);
}

[data-variant="secondary"] {
  --primary-color: var(--color-neutral-100);
  --secondary-color: var(--color-secondary-400);
  --accent-color: var(--color-secondary-600);
}`} />

            <p>Now your button CSS becomes beautifully clean:</p>

            <Code lang="css" codeString={`button[data-variant] {
  color: var(--primary-color);
  background: var(--secondary-color);
}

button[data-variant]:hover {
  background: var(--accent-color);
}`} />

            <p>
                And **any component** can opt in to the same system. Not just buttons — cards, links, nav items, badges,
                whatever you want.
            </p>
        </PostSection>
    )
}