import Code from "@/components/code";
import Heading from "@/components/heading";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";
import { Block, Inline, Stack } from "@/components/primitives";

export default function Section8() {
    return (
        <PostSection id="paint">
            <AnchorHeading as={"h2"} prefix="Step 5 -" id="paint-heading">
                Paint — Making styling explicit
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
            <Code lang="css" 
            codeString={`/* Foreground channel */
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

            <Stack as="figure" className="surface-frame p-4">
                <Code lang="tsx" 
                highlightTokens={[
  'data-paint="background foreground"',
  'data-paint="all"'
]}
                codeString={`{/*  Background only, no text or border color */}
<div class="block" 
    data-variant="info" 
    data-appearance="tonal"
    data-paint="background foreground">
  Tonal container
</div>

{/*  Everything */}
<div class="block" 
    data-variant="primary" 
    data-appearance="filled"
    data-paint="all">
  Fully styled element
</div>`} />

                <Inline align="center" style={{ width: "100%" }}>
                    <Block as="span"
                        variant="info"
                        variantAppearance="tonal"
                        paint={["background", "foreground"]}
                        className="p-2 mx-auto"
                        style={{ width: "max-content" }}
                    >
                        Tonal container
                    </Block>
                    <Block as="span"
                        variant="primary"
                        variantAppearance="filled"
                        paint="all"
                        className="p-2 mx-auto"
                        style={{ width: "max-content" }}
                    >
                        Fully styled element
                    </Block>
                </Inline>
                <figcaption>
                    Paint controls which styling channels are applied. Variants and appearances provide values, but nothing is rendered until paint is requested.
                </figcaption>
            </Stack>
            <Heading as="h3">Why paint matters</Heading>
            <p>
                Paint creates a strict styling boundary. Layout wrappers can provide semantic context without gaining visual weight. Structural elements remain structural. Styling only happens when explicitly requested.
            </p>
            <p>
                Without paint, styling leaks. With paint, styling is <span className="fun-underline">intentional</span>.
            </p>
        </PostSection>
    );
}