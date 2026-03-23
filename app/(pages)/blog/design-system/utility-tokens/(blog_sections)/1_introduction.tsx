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
                    <p>
                        The theming post covered color tokens — how raw values flow through the system to produce consistent, themeable UI.
                        This post covers the remaining token layer: spacing, typography scale, and breakpoints.
                        These are the values that everything else measures itself against.
                    </p>
                </PostNote>
                <p>
                    After defining structure with primitives, the system still has a gap: the raw values that everything depends on.
                    The color layer gives the system its meaning. But without a consistent scale for spacing, type, and layout boundaries,
                    that meaning has no reliable structure to live in.
                </p>
                <p>
                    Utility tokens solve this by standardising the raw values every component depends on. They are not semantic —
                    they do not describe intent the way variants do. They are raw values that the rest of the system consumes
                    to produce consistent, predictable results.
                </p>
            </Stack>
        </PostSection>
    );
}
