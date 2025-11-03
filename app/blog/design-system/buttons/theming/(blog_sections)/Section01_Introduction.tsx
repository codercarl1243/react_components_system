import InlineCode from "@/components/code/inlineCode";
import FunHighlight from "@/components/decorations/FunHighlight";
import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostBanner from "@/components/post/post.banner";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";

export default function Section01_Introduction() {
    return (
        <PostSection id="introduction">
            <PostBanner
                title="Button Theming & Variants"
                headingId="button-theming-heading"
                subtitle="Building a flexible color system for scalable, accessible design"
                image={{
                   src: '/images/mountainRangeBanner_1200x400.webp',
                    alt: "Grid of buttons in different colors and styles representing design system variants"
                }}
            />
            <AnchorHeading headingLevel={2} id="introduction-heading">Introduction</AnchorHeading>
            <p>
                You've built a solid button component—it's accessible, handles loading states, and prevents duplicate submissions. But there's one problem: <FunHighlight>it only comes in one color</FunHighlight>.
            </p>
            <p>
                In this guide, we'll transform your button into a <FunHighlight>themeable component</FunHighlight> that supports multiple variants (Primary, Secondary, Accent, Danger) and styles (Filled, Outlined, Ghost) while maintaining all the accessibility and functionality we've built.
            </p>
            <List>
                <li>CSS custom properties for dynamic theming</li>
                <li>Creating color variants without duplicating code</li>
                <li>The <InlineCode codeString="data-*" /> attribute pattern for variants</li>
                <li>Building a scalable token system</li>
            </List>
            <PostNote>
                <p><strong>Estimated time:</strong> 10-12 minutes</p>
            </PostNote>
        </PostSection>
    )
}