import Code from "@/components/code";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";

export default function Section08_UsageExamples() {
    return (
        <PostSection id="usage-examples">
            <AnchorHeading headingLevel={2} id="usage-examples-heading">Usage Examples</AnchorHeading>
            <Code codeString={`<Button data-variant="primary">Save</Button>
<Button data-style="outlined" data-variant="secondary">Add</Button>`}/>
            <PostNote>
                <p>Variants and styles can be freely combined — each adapts automatically through the cascade.</p>
            </PostNote>
        </PostSection>
    )
}