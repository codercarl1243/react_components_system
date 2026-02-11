import Code from "@/components/code";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";
import { Block, Inline, Row, Stack } from "@/components/primitives";

export default function Section8() {
    return (
        <PostSection id="paint">
            <AnchorHeading as={"h2"} prefix="Step 5 —" id="paint-heading">
                Paint — Making styling explicit
            </AnchorHeading>
            <p>
                Even with variants and appearances defined, there's still a problem:
                <strong>when do styles actually apply?</strong>
            </p>

            <p style={{ marginBottom: "0" }}>
                Most systems apply styling implicitly. Set a variant, and color appears
                everywhere — sometimes in places you didn't intend.
            </p>

            <aside
                style={{
                    margin: "2rem 0",
                    padding: "1rem 1.25rem",
                    borderLeft: "4px solid var(--text-muted)",
                    display: "grid",
                    gap: "0.5rem",
                }}
            >
                <Row
                    as="strong"
                    className="font-accent"
                    style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                    }}
                >
                    System rule
                </Row>
                <p className="m-0">
                    Paint applies styling tokens to CSS properties — styling occurs only when deliberately requested.
                </p>
            </aside>
            <p>
                Paint is the final boundary layer. Variants provide meaning, appearances prepare tokens, and paint decides when those tokens become actual CSS properties.
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