import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";

export default function Section10() {

    return (
        <PostSection id="whats-next">
            <AnchorHeading headingLevel={2} id="whats-next-heading">What&apos;s Next</AnchorHeading>
            <p>
                In the next post, we&apos;ll extend this foundation to create toggle buttons and explore
                setting up Storybook to document our growing design system.
            </p>
            <p>
                The patterns we&apos;ve established here will serve as the foundation for more complex
                components like button groups, tab lists, and interactive panels.
            </p>
        </PostSection>
    )
}