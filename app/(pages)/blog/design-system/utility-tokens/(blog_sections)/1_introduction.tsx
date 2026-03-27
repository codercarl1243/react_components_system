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
                    A design system gives the developer sheet music to play from, complete with tempo, scores, and notation. Without it, every component improvises.
                </p>
                <p>
                    Design tokens are the score that keeps everything in rhythm, playing in time, and creating harmony across spacing, type, and layout.
                </p>
            </Stack>
        </PostSection>
    );
}
