import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";

export default function Section10() {

    return (
        <PostSection id="whats-next">
            <AnchorHeading headingLevel={2} id="whats-next-heading">What&apos;s Next</AnchorHeading>
            <p>
                In the next post, we&apos;ll extend this foundation to create <span className="bold">toggle buttons</span> — exploring how stateful interactions can remain fully accessible and predictable.
            </p>
            <p>
                These same principles will carry into more advanced components like <span className="bold">switches</span>, <span className="bold">button groups</span>, and <span className="bold">tab lists</span>.
            </p>
        </PostSection>
    )
}