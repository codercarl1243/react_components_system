import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import Heading from "@/components/heading";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import { Row } from "@/components/primitives";
import Rule from "@/components/rule";

export default function Section7() {
    return (
        <PostSection id="appearance">
            <AnchorHeading as={"h2"} prefix="Step 4 —" id="appearance-heading">
                Appearance mappings
            </AnchorHeading>
            <p style={{ marginBottom: "0" }}>
                With semantic meaning defined, we can now decide how that meaning is expressed visually.
            </p>
            <Rule>
                Appearance maps a variant's semantic palette — it does not introduce meaning or apply paint.
            </Rule>
            <p>
                An appearance maps a variant's semantic palette to styling tokens
                such as background, foreground, and border.
            </p>
            <Code lang="css" codeString={`[data-appearance="filled"] {
    --background-color: var(--variant-bg);
    --foreground-color: var(--variant-fg);
    --border-color: var(--variant-border);
}

[data-appearance="tonal"] {
    --background-color: var(--variant-surface);
    --foreground-color: var(--variant-fg-on-surface);
    --border-color: var(--variant-border);
}

[data-appearance="outlined"] {
    --background-color: transparent;
    --foreground-color: var(--variant-bg);
    --border-color: var(--variant-border);
}`} />
            <p>
                Each appearance consumes the same variant palette, but produces a different visual result.
                This allows a single variant to be reused across many visual contexts.
            </p>
            <PostNote variant="neutral">
                <p className="bold">Appearance prepares. Paint applies.</p>
                <p>
                    Even with both <InlineCode codeString="data-variant" lang="html" /> and <InlineCode codeString="data-appearance" lang="html" /> present, no CSS properties are set yet.
                    That responsibility belongs to the paint layer.
                </p>
            </PostNote>
        </PostSection>
    );
}