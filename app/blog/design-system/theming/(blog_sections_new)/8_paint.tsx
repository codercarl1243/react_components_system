import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import Heading from "@/components/heading";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";
import { Block, Stack } from "@/components/primitives";

export default function section4() {
    return (
        <PostSection id="paint">
            <AnchorHeading as={"h2"} prefix="step 5 -" id="paint-heading">
                Paint — Making Styling Explicit
            </AnchorHeading>
            <p>
                Even with variants and appearances defined, there's still a problem:
                <strong>when do styles actually apply?</strong>
            </p>

            <p>
                Most systems apply styling implicitly. Set a variant, and color appears
                everywhere — sometimes in places you didn't intend.
            </p>

            <p>
                Paint solves this by making styling explicit. Nothing is applied unless it's
                deliberately requested.
            </p>
            <Code lang="css" codeString={`/* Foreground channel */
.block[data-paint~="foreground"],
.block[data-paint="all"] {
  color: var(--foreground-color, inherit);
}

/* Background channel */
.block[data-paint~="background"],
.block[data-paint="all"],
.block[data-paint="surface"] {
  background-color: var(--background-color, transparent);
}

/* Border channel */
.block[data-paint~="border"],
.block[data-paint="all"],
.block[data-paint="surface"] {
  border: var(--border-thin);
  border-color: var(--border-color, transparent);
}`} />

            <p>
                Paint channels are composable. You can request only what you need.
            </p>

            <Stack className="surface-frame p-4">
                <Code lang="tsx" codeString={`<span class="block"
        data-variant="primary"
        data-appearance="outlined"
        data-paint="all">
  Fully styled element
</span>`} />
                <Block as="span"
                    variant="primary"
                    variantAppearance="filled"
                    paint="all"
                    className="p-2"
                    style={{ width: "max-content" }}
                >Fully styled element</Block>
            </Stack>
            <Heading as="h3">Why Paint Matters</Heading>
            <p>
                Paint creates a strict styling boundary. Layout wrappers can provide semantic
                context without gaining visual weight. Structural elements remain structural.
                Styling only happens when explicitly requested.
            </p>

            <p>
                This is especially important for primitives like
                <InlineCode codeString="Block" />, <InlineCode codeString="Stack" />, and <InlineCode codeString="Row" />.
            </p>
            <Code lang="tsx" codeString={`<!-- Stack provides structure and tokens, but no paint -->
<div class="stack" data-variant="primary">
  <h2>Heading</h2>
  <p>Content has access to primary tokens but isn't painted</p>
</div>

<!-- Same stack, now explicitly painted -->
<div class="stack" 
     data-variant="primary" 
     data-appearance="tonal"
     data-paint="surface">
  <h2>Heading</h2>
  <p>Now the container has a tonal primary background</p>
</div>`} />
            <p>
                Without paint, styling leaks. With paint, styling is intentional.
            </p>
        </PostSection>
    );
}