import Code from "@/components/code";
import Heading from "@/components/heading";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import { Row } from "@/components/primitives";
import Rule from "@/components/rule";

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
            <Rule>
                Structural components do not apply visual styling.
            </Rule>
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
            <p className="mb-4">
                Rather than letting every component decide when to apply background, foreground, or border styles, we centralize that responsibility in a single layer: <span className="bold">paint</span>.
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
            <p className="my-4">
                Paint defines the boundary. Components opt in explicitly — and nowhere else.
            </p>
            <PostNote variant="neutral">
                <p>
                    <strong>Paint channel behavior</strong><br />
                    Some paint channels are <em>ambient</em>, meaning they apply directly when present (such as background or foreground).
                    Others are <em>constructive</em>: borders do not exist unless paint explicitly creates them.
                </p>
            </PostNote>

            <p>
                This keeps structural components simple and predictable, while ensuring visual application happens in one place.
            </p>
            <p>
                With structural expectations in place, we can now introduce meaning.
            </p>
            <p>
                In the next step, we'll introduce the variant layer, which translates raw tokens into semantic intent.
            </p>
        </PostSection>
    );
}