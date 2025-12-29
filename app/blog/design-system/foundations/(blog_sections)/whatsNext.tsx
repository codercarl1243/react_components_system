import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";

export default function Section7() {

    return (
        <PostSection id="">
            <AnchorHeading as="h2" id="-heading">What's Next</AnchorHeading>
            <p>
                With the token architecture in place, the next step is enforcement.
            </p>
            <p>
                In the next post, we'll introduce primitives and show how they turn this token system into something composable, predictable, and safe to build on.
            </p>
        </PostSection>
    )
}