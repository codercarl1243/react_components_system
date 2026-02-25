import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";

export default function Section10() {
    return (
        <PostSection id="summary">
            <AnchorHeading as={"h2"} id="summary-heading">
                Summary
            </AnchorHeading>
            <p>
                This system is defined by a set of contracts between its layers.
            </p>
            <List as="ul" spacing="loose">
                <li><strong>Structure</strong> defines layout — never styling.</li>
                <li><strong>Theme</strong> establishes the contrast baseline for all other styling decisions.</li>
                <li><strong>Variant</strong> communicates intent — never presentation.</li>
                <li><strong>Appearance</strong> defines treatment — never meaning.</li>
                <li><strong>Paint</strong> applies styling — only when explicitly requested.</li>
            </List>
            <p>
                Each layer depends only on the layer beneath it.
            </p>
            <p>
                These contracts make the system predictable.
                They prevent styling drift, reduce duplication,
                and allow meaning and presentation to evolve independently.
            </p>
            <p>
                In the next post, we'll introduce <strong>primitive components</strong> —
                structural building blocks that make these contracts practical in real interfaces.
            </p>
        </PostSection>
    );
}
