import Code from "@/components/code";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";

export default function Section11_VisualReference() {
    return (
        <PostSection id="visual-reference">
            <AnchorHeading headingLevel={2} id="visual-reference-heading">Building a Visual Reference</AnchorHeading>
            <Code codeString={`export function ButtonShowcase() {
    const variants = ['primary', 'secondary', 'accent', 'danger'];
    const styles = ['filled', 'outlined', 'ghost'];
    return (
    <div>...</div>
    );
}`} lang="tsx" />
        </PostSection>
    )
}