import Code from "@/components/code";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";

export default function Section07_TypeSupport() {
    return (
        <PostSection id="type-support">
            <AnchorHeading headingLevel={2} id="type-support-heading">TypeScript Support</AnchorHeading>
            <Code codeString={`export type TVariant = 'primary' | 'secondary' | 'accent' | 'danger';
export type TButtonStyle = 'outlined' | 'filled' | 'ghost';`}
            />
            <PostNote>
                <p>TypeScript ensures valid variants and autocompletion in your IDE.</p>
            </PostNote>
        </PostSection>
    )
}