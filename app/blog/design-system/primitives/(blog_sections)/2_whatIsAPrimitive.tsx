import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import Rule from "@/components/rule";

export default function Section2() {
    return (
        <PostSection id="what-is-a-primitive">
            <AnchorHeading as={"h2"} id="what-is-a-primitive-heading">
                What is a Primitive?
            </AnchorHeading>
            <p>
                At its core, a primitive exists to own a specific structural responsibility
                within a layout.
            </p>
            <Rule>
                Primitives encode structural intent.
            </Rule>
            <p>
                Instead of scattering spacing, alignment, and containment across arbitrary
                elements, primitives encode those structural decisions into reusable layout
                components that define explicit structural contracts.
            </p>
            <p>
                Primitives operate at a different layer of responsibility:
            </p>
            <List>
                <li>They don't describe what something is (Button, Card, Modal etc.)</li>
                <li>They describe how something is arranged in space (Stack, Inline, Block).</li>
            </List>
            <PostNote variant="neutral" className="mt-8">
                <p>
                    Primitives are not <span className="italic">“better divs”</span>. If you build them as thin wrappers around HTML with no intent, you've just renamed markup.
                </p>
            </PostNote>
            <p>Compare how structural intent is expressed in the following examples:</p>
            <Code
                title="Before"
                codeString={`<div className="flex flex-col gap-4">
  <div className="flex items-center justify-between">
    <h2>Account</h2>
    <button>Edit</button>
  </div>

  <div className="flex flex-col gap-2">
    <p>Manage your subscription.</p>
    <button>View billing history</button>
  </div>
</div>`}
                copyEnabled={false}
            />
            <p>
                In the first example, structure is expressed through utility classes.
                Flex direction, alignment, and spacing are attached to generic elements
                as <span className="fun-underline">styling instructions</span> rather than structural roles.
            </p>
            <Code
                title="After"
                codeString={`<Stack gap="large">
  <Inline align="center" justify="between">
    <h2>Account</h2>
    <button>Edit</button>
  </Inline>

  <Stack gap="small">
    <p>Manage your subscription.</p>
    <button>View billing history</button>
  </Stack>
</Stack>`}
                copyEnabled={false}
            />
            <p>
                In the second example, those same structural decisions are expressed
                through dedicated primitives. <InlineCode codeString="Stack" /> defines vertical rhythm. <InlineCode codeString="Inline" /> defines horizontal alignment.
            </p>
            <p>
                If both approaches render the same result, the natural question is: <span className="italic">why not just use HTML and utility classes?</span>
            </p>
        </PostSection>
    )
}