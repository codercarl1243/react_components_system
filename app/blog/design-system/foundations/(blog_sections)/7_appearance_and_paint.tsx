import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";

export default function Section6() {

    return (
        <PostSection id="appearance-and-paint">
            <AnchorHeading as="h2" id="appearance-and-paint-heading">Why Appearance and Paint Belong Together</AnchorHeading>
            <p>
                Appearance without paint is still implicit. Paint without appearance lacks meaning.
            </p>
            <p>
                Together, they separate intent from presentation, and presentation from application. Appearance decides what a thing should look like. Paint decides whether that look is applied at all.
            </p>
            <p>
                This separation may seem subtle at first, but it dramatically improves composability. Structural elements can exist without visual weight. Visual treatments can be reused safely. Styling boundaries become clear and enforceable.
            </p>
        </PostSection>
    )
}