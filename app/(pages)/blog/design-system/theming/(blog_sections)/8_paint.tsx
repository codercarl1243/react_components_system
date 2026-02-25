import Code from "@/components/code";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";
import { Block, Inline, Stack } from "@/components/primitives";
import Rule from "@/components/rule";

export default function Section8() {
    return (
        <PostSection id="paint">
            <AnchorHeading as={"h2"} prefix="Step 5 —" id="paint-heading">
                Paint — Making styling explicit
            </AnchorHeading>
            <p>
                Variants define meaning. Appearances prepare tokens. The final question is simple:
                <strong> when do tokens become actual styles?</strong>
            </p>

            <p>
                In this system, styling is never implicit. Tokens exist — inert — until explicitly applied.
            </p>
            <Rule>
                Paint defines the styling boundary. Tokens become CSS properties only here.
            </Rule>
            <p>
                Paint is the only layer permitted to touch actual CSS properties.
                Everything above it prepares data. Only paint performs application.
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
  border: 1px solid var(--border-color, transparent);
}`} />

            <p>
                Paint channels are composable. You can request only what you need.
            </p>

            <Stack as="figure" className="surface-frame p-4" variant="light" variantAppearance="filled" paint="all">
                <Code
                    lang="tsx"
                    highlightTokens={[
                        'data-paint="foreground"',
                        'data-paint="all"'
                    ]}
                    codeString={`{/*  No background or border color */}
<div class="block" 
    data-variant="info" 
    data-appearance="tonal"
    data-paint="foreground">
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
                        paint={["foreground"]}
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
                <figcaption className="text-sm italic">
                    Paint controls which styling channels are applied. Variants and appearances provide values, but nothing is styled until paint is requested.
                </figcaption>
            </Stack>
        </PostSection>
    );
}