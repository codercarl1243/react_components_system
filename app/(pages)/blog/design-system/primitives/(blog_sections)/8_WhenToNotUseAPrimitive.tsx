import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";

export default function Section8() {
    return (
        <PostSection id="when-not-to-use-a-primitive">
            <AnchorHeading as={"h2"} id="when-not-to-use-a-primitive-heading">
                When you shoud <em className="italic">not</em> use a Primitive
            </AnchorHeading>
            <p>
                Primitives are powerful, but they are not mandatory everywhere.
            </p>
            <p>
                Avoid using them when:
            </p>
            <List as="ul" marker="circle">
                <li>You're prototyping quickly and structure is temporary</li>
                <li>The layout pattern is truly one-off</li>
                <li>Semantic HTML alone communicates both structure and meaning clearly</li>
            </List>
            <p>
                Over-abstraction can be just as harmful as under-structure.
            </p>
            <p>
                The goal is clarity — not purity.
            </p>
        </PostSection>
    );
}