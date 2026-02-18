import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import Heading from "@/components/heading";
import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";

export default function Section2() {
    return (
        <PostSection id="what-is-a-primitive">
            <AnchorHeading as={"h2"} id="what-is-a-primitive-heading">
                What is a Primitive?
            </AnchorHeading>
            <p>
                A primitive is a minimal component that represents a single repeatable, enforceable structural role — like vertical arrangement, horizontal alignment, spacing rhythm, or containment — without taking ownership of visual styling.
            </p>
            <p>
                Think of primitives as the grammar of your UI:
            </p>
            <List>
                <li>They don't describe what something is (Button, Card, Modal)</li>
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
                as <span className="fun-underline">styling instructions</span>.
            </p>
            <Code
                title="After"
                codeString={`<Stack gap="lg">
  <Inline align="center" justify="between">
    <h2>Account</h2>
    <button>Edit</button>
  </Inline>

  <Stack gap="sm">
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
                If both approaches render the same result, why not just use HTML and utility classes?
            </p>
        </PostSection>
    )
}