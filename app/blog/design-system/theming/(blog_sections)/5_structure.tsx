import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import Heading from "@/components/heading";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import { Block, Row } from "@/components/primitives";

export default function Section5() {
    return (
        <PostSection id="structural-boundaries">
            <AnchorHeading as={"h2"} prefix="Step 2 —" id="structural-boundaries-heading">
                Establish structural boundaries
            </AnchorHeading>
            <p style={{
                marginBottom: "0"
            }}>
                This step intentionally pauses on structure to clarify system expectations and make architectural boundaries explicit — not to introduce variants or visual styles.
            </p>
            <Block as="aside"
                style={{
                    margin: "2rem 0",
                    padding: "1rem 1.25rem",
                    borderLeft: "4px solid var(--text-muted)",
                    display: "grid",
                    gap: "0.5rem",
                }}>
                <Row as="strong"
                    className="font-accent"
                    style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                    }}
                >System rule</Row>
                <p className="m-0">
                    Structural components do not apply visual styling.
                </p>
            </Block>
            <p>Structural components are responsible for <em>shape</em>, <em>layout</em>, and <em>interaction affordances</em> — not visual styling. They define how something behaves and occupies space, but they do not decide how it looks.</p>
            <p>
                This separation is deliberate. If components apply color, background, or borders directly, styling logic quickly becomes duplicated and inconsistent. Instead, components expose a stable structural surface that higher layers can decorate.
            </p>
            <p>
                Here's a simplified example showing a purely structural button:
            </p>
            <Code
                lang="css"
                codeString={`.button {
    /* Structural styling only */
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;

    /* No background, color, or border applied here */
}`} />
            <p>
                At this stage, the button has no visual identity. It defines spacing, typography, and interaction — nothing more.
            </p>

            <p>
                That might feel incomplete, but it's intentional. Visual styling does not belong to the component itself.
            </p>
            <Heading as="h3" headingSize={4}>The paint boundary</Heading>
            <p>
                The question then becomes: <em>how do visual styles get applied?</em>
            </p>
            <p>
                Rather than letting every component decide when to apply background, foreground, or border styles, we centralize that responsibility in a single layer: <span className="bold">paint</span>.
            </p>
            <p>
                Paint defines the boundary. Components opt in explicitly — and nowhere else.
            </p>
            <p>
                Some paint channels are ambient, while others are constructive. Background color can be applied directly, but borders must be created by paint when opted into, since they do not exist by default.
            </p>
            <Code
                lang="css"
                codeString={`.block[data-paint~="background"] { 
    background-color: var(--background-color); 
}
.block[data-paint~="foreground"] { 
    color: var(--foreground-color); 
}
.block[data-paint~="border"] { 
    border: 1px solid var(--border-color); 
}`} />
            <p>
                This keeps structural components simple and predictable, while ensuring visual application happens in one place.
            </p>
            <p>
                With structural expectations in place, we can now introduce meaning.
            </p>
            <p>
                In the next step, we'll introduce the variant layer, which translates raw theme tokens into semantic intent.
            </p>
        </PostSection>
    );
}