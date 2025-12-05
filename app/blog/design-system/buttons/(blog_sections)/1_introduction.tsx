import FunHighlight from "@/components/decorations/FunHighlight";
import Heading from "@/components/heading";
// import Link from "@/components/link";
import List from "@/components/list";
import PostBanner from "@/components/post/post.banner";
// import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";


export default function Section1() {
    return (
        <PostSection id="introduction">
            <PostBanner
                title="The Button"
                subtitle="The most complex of the basic components"
                headingId="the-button-heading"
                image={{
                    src: '/images/blogs/button-base/main-image.webp',
                    alt: ""
                }}
            />
            <Heading as={"h2"} id="introduction-heading">Introduction</Heading>
            <p>
                Buttons are the most re-used components in any interface — and the easiest to get wrong.
                In this first post of the design system series, we're building a button that balances <FunHighlight>functionality</FunHighlight>, <FunHighlight>accessibility</FunHighlight>, and <FunHighlight>developer trust</FunHighlight>.
            </p>
            <p>
                This isn't just another styled button. It's a <FunHighlight>design system foundation</FunHighlight> that scales gracefully and behaves predictably under real-world conditions.
            </p>
            {/* <PostNote>
                <p className="bold">In this series:</p>
                <List marker="none" spacing="tight">
                    <li><Link href="/blog/design-system/buttons/toggles">Toggles</Link></li>
                    <li><Link href="/blog/design-system/buttons/switches">Switches</Link></li>
                    <li><Link href="/blog/design-system/buttons/groups">Button Groups & Toolbars</Link></li>
                </List>
            </PostNote> */}

            <p>By the end of this post, you'll understand how to design a button system that is:</p>
            <List ordered>
                <li>Type-safe and accessible by default</li>
                <li>Backed by a reusable hook for interaction logic</li>
                <li>Styled with built-in accessibility and state awareness</li>
                <li>Fully tested to ensure reliability</li>
            </List>
        </PostSection>
    )
}