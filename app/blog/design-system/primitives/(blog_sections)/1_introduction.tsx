import InlineCode from "@/components/code/inlineCode";
import FunHighlight from "@/components/decorations/FunHighlight";
import AnchorHeading from "@/components/heading/anchorHeading";
import Icon from "@/components/icon";
import BlogLink from "@/components/post/post.blogLink";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import { Row } from "@/components/primitives";
import { RiArrowLeftRightLine, RiArrowUpDownLine, RiCheckboxBlankLine } from "@remixicon/react";

export default function Section1() {

    return (
        <PostSection id="introduction">
            <AnchorHeading as="h2" id="introduction-heading">
                Introduction
            </AnchorHeading>

            <p>
                Not every component in a design system is meant to be visible.
            </p>

            <p>
                Some components don't render buttons, cards, or forms. They define structure.
            </p>

            <p>
                These are called <FunHighlight>primitives</FunHighlight>.
            </p>

            <p>
                A primitive is a minimal component that represents a single structural
                role — like vertical arrangement <Icon variant="primary" icon={RiArrowUpDownLine} />, horizontal alignment <Icon variant="primary" icon={RiArrowLeftRightLine} />, or containment <Icon variant="primary" icon={RiCheckboxBlankLine} /> —
                without taking ownership of visual styling.
            </p>
            <PostNote variant="info" showIcon={false} className="mt-8" paint="border">
                 <Row as="strong" className="callout__heading font-accent">
                    Series Context
                </Row>
                <p>
                    This article is part of a broader design system series. While it builds
                    on ideas introduced in <BlogLink postId="design__theming_01">Theming Foundations</BlogLink>, it stands on its own.
                </p>
            </PostNote>
            <p>
                In this post, we'll define the core structural primitives (
                {" "}<InlineCode codeString="<Stack />" />,{" "}
                <InlineCode codeString="<Inline />" />, and{" "}
                <InlineCode codeString="<Block />" />), and implement minimal versions of
                them. These components expose controlled structural properties like spacing,
                alignment, and containment.
            </p>

            <p>
                In the next post, we'll connect these primitives to the theming system —
                showing how structural contracts become enforceable styling boundaries.
            </p>
        </PostSection>
    )
}