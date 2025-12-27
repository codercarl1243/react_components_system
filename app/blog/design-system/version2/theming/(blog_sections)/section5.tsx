import Code from "@/components/code";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";

export default function Section5() {

    return (
        <PostSection id="">
            <AnchorHeading as="h2" id="-heading" prefix="part 4 -">Paint</AnchorHeading>
            <p className="bold italic">Making Styling Explicit</p>

            <p>
                Even with appearance defined, many systems still apply styling implicitly. Assigning a variant automatically paints text, backgrounds, borders, and sometimes child elements as well.
            </p>

            <p>
                This implicit behavior is a common source of bugs. Layout wrappers gain visual weight unintentionally. Nested elements inherit styles they shouldn't. Structural components become visually coupled by accident.
            </p>

            <p>
                Paint exists to solve this by making styling opt-in.
            </p>

            <p>
                Without an explicit paint step, assigning a variant often applies color everywhere by default. With paint, styling is applied deliberately:
            </p>

            <Code
                copyEnabled={false}
                codeString={`<!-- Implicit styling -->
<div data-variant="danger">Error</div>

<!-- Explicit styling -->
<div data-variant="danger" data-appearance="tonal" data-paint="surface">
  Error
</div>`} />



        </PostSection>
    )
}