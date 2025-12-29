import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import Heading from "@/components/heading";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";

export default function section4() {
    return (
        <PostSection id="structural-boundaries">
            <AnchorHeading as={"h2"} prefix="Step 2 —" id="structural-boundaries-heading">
                Establish Structural Boundaries
            </AnchorHeading>
            <p>
                Before we introduce meaning, treatment, or color, we need a place for structure to live.
            </p>
            <p>
                Structural components are responsible for <em>shape</em>, <em>layout</em>, and <em>interaction affordances</em> — not visual styling. They define how something behaves and occupies space, but they do not decide how it looks.
            </p>

            <p>
                This separation is deliberate. If components apply color, background, or borders directly, styling logic quickly becomes duplicated and inconsistent. Instead, components expose a stable structural surface that higher layers can decorate.
            </p>
            <p>
                Here's a simplified example using a button:
            </p>
            <Code lang="css" codeString={`.button {
                /* Structural styling only */
                padding: var(--space-2) var(--space-4);
            border-radius: var(--radius-md);
            font-size: var(--text-base);
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
            <Heading as="h3">The Paint Boundary</Heading>
            <p>
                The question then becomes: <em>how do visual styles get applied?</em>
            </p>
            <p>
                Rather than letting every component decide when to apply background, foreground, or border styles, we centralize that responsibility in a single layer: <span className="bold">paint</span>.
            </p>
            <p>
                Paint acts as a strict boundary. Components opt into styling explicitly, and only through paint.
            </p>
            <Code lang="css" codeString={`.block[data-paint~="background"] { background-color: var(--background-color); }
.block[data-paint~="foreground"] { color: var(--foreground-color); }
.block[data-paint~="border"] { border-color: var(--border-color); }
`} />
            <p>
                Any component that extends the base primitive <InlineCode codeString=".block"/> automatically gains access to paint behavior — without implementing it itself.
            </p>

            <p>
                This keeps structural components simple and predictable, while ensuring visual application happens in one place.
            </p>

            <p>
                With structure in place, we can now define meaning.
            </p>
            <p>
                In the next step, we'll introduce the variant layer, which translates raw theme tokens into semantic intent.
            </p>
        </PostSection>
    );
}