import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import Heading from "@/components/heading";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";

export default function section7() {
    return (
        <PostSection id="appearance">
            <AnchorHeading as={"h2"} prefix="step 4 -" id="appearance-heading">
                Appearance Mappings
            </AnchorHeading>
            <p>
                With semantic meaning defined, we can now decide how that meaning is expressed visually.
            </p>

            <PostNote showIcon={false} variant="neutral">
                <p>
                    Appearances define <em>visual treatment</em>. They map a variant's semantic palette to styling tokens without introducing new colors or meaning.
                </p>
            </PostNote>
            <p>
                Variants answer <em>what does this represent?</em>. Appearances answer <em>how should it be presented?</em>
            </p>
            <Heading as="h3">Appearance Is a Mapping Layer</Heading>
            <p>
                An appearance does not introduce new colors. It does not care which variant is active. Its only responsibility is to map a variant's palette to semantic styling tokens such as background, foreground, and border.
            </p>
            <Code lang="css" codeString={`[data-appearance="filled"] {
    --background-color: var(--variant-bg);
    --foreground-color: var(--variant-fg);
    --border-color: var(--variant-border);
}

[data-appearance="tonal"] {
    --background-color: var(--variant-surface);
    --foreground-color: var(--variant-text-on-surface);
    --border-color: var(--variant-border);
}

[data-appearance="ghost"] {
    --background-color: transparent;
    --foreground-color: var(--variant-bg);
    --border-color: transparent;
}`} />
            <p>
                Each appearance consumes the same variant palette, but produces a different visual result. This is what allows a single variant to be reused across many visual contexts.
            </p>
            <Heading as="h3">Why Appearance Is Separate from Variant</Heading>

            <p>If appearance logic lived inside variants, every visual change would require new variant names. By separating appearance, meaning stays stable while visual treatment can evolve independently.
            </p>
            <PostNote variant="inverse">
                <p className="bold">Appearances Still Do Not Apply Styling</p>
                <p>At this point, even with both <InlineCode codeString="data-variant" /> and <InlineCode codeString="data-appearance" /> present, nothing is painted. No background appears. No text color changes.</p>

                That final step is intentional, and it belongs to a single layer.
            </PostNote>
            <p>
                In the next step, we'll introduce <span className="bold">paint</span>, which explicitly applies these tokens to actual CSS properties.
            </p>
        </PostSection>
    );
}