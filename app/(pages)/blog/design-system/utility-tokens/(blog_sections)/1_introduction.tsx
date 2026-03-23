import AnchorHeading from "@/components/heading/anchorHeading";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import BlogLink from "@/components/post/post.blogLink";
import { Stack } from "@/components/primitives";

export default function Section1() {
    return (
        <PostSection id="introduction">
            <AnchorHeading as="h2" id="introduction-heading">
                Introduction
            </AnchorHeading>
            <Stack>
                <PostNote>
                    <p><strong>Series Context</strong></p>
                    <p>
                        This article is part of a broader design system series. It builds on ideas introduced in{" "}
                        <BlogLink postId="design__theming_01">Theming Foundations</BlogLink> and{" "}
                        <BlogLink postId="design__primitives_01">Primitives</BlogLink>, but stands on its own.
                    </p>
                </PostNote>
                <p>
                    The theming post established color. The primitives post established structure. What remains is the scale everything else measures itself against — spacing, type, and layout boundaries.
                </p>
                <p>
                    A shared token layer means every component reaches for the same values. Spacing feels consistent. Type scales predictably. Layout boundaries hold across the entire system.
                </p>
            </Stack>
        </PostSection>
    );
}
