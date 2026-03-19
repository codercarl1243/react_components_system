import InlineCode from "@/components/code/inlineCode";
import Heading from "@/components/heading";
import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";
import Rule from "@/components/rule";

export default function Section7() {
    return (
        <PostSection id="where-i-draw-the-line">
            <AnchorHeading as={"h2"} id="where-i-draw-the-line-heading">
                Where I Draw the Line
            </AnchorHeading>
            <p>
                Not every structural role deserves to become a primitive.
            </p>
            <Rule>
                If a primitive cannot own its responsibility without being worked around, it should not exist.
            </Rule>

            <Heading as="h3" headingSize={4}>Row</Heading>
            <p>
                <InlineCode codeString="Row" /> seems like it should exist — a horizontal counterpart to <InlineCode codeString="Stack" />.
            </p>
            <p>
                In practice, it breaks down <span className="fun-underline">immediately</span>.
            </p>
            <p>
                The problem is that horizontal layouts are almost never static.
            </p>
            <List as="ul">
                <li>A toolbar becomes a column on mobile</li>
                <li>A header reflows at smaller widths</li>
            </List>
            <p>
                The moment responsive behaviour enters the picture, <InlineCode codeString="Row" /> stops owning its structural responsibility — it just becomes a starting point that every consumer works around.
            </p>

            <Heading as="h3" headingSize={4}>Text</Heading>
            <p>
                <InlineCode codeString="Text" /> is another common candidate that didn't make the cut, for a different reason.
            </p>
            <p>
                It could own typography decisions — <span className="italic">font size</span>, <span className="italic">weight</span>, <span className="italic">line height</span> — but the global styling already does most of that work.
            </p>
            <p>
                In practice, it would mostly be wrapping <InlineCode codeString="<p>" /> tags that already behave correctly, putting a component between the developer and a semantic HTML element that communicates meaning clearly.
            </p>
            <p>
                The type scale tokens are still part of the system. They just don't need a primitive to distribute them.
            </p>

            <Heading as="h3" headingSize={4}>Grid & Flex</Heading>
            <p>
                These are the most obvious candidates — they map directly to CSS layout modes that developers already know. The problem is that they describe <em>implementation</em>, not <em>intent</em>.
            </p>
            <p>
                A primitive named <InlineCode codeString="Grid" /> tells you how something is rendered. A primitive named <InlineCode codeString="Stack" /> tells you what it does.

                In a system built on structural contracts, the name should describe the role — not the implementation.
            </p>

            <Heading as="h3" headingSize={4}>Spacer</Heading>
            <p>

                <InlineCode codeString="Spacer" /> appears in many design systems as a way to add explicit <span className="italic">whitespace</span> between elements.
            </p>
            <p>
                The problem is that it puts layout decisions inside content — a <InlineCode codeString={`<Spacer size="md" />`} /> between two elements is the child deciding its own spacing, which is the layout primitive's job.
            </p>
        </PostSection>
    );
}