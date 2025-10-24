import FunHighlight from "@/components/decorations/FunHighlight";
import Heading from "@/components/heading";
import List from "@/components/list";
import PostBanner from "@/components/post/post.banner";
import PostSection from "@/components/post/post.section";


export default function Section1() {
    return (
        <PostSection id="button-foundations">
            <PostBanner
                title="The Button"
                subtitle="Building a React Design System Foundation"
                headingId="the-button-heading"
                image={{
                    src: '/images/mountainRangeBanner_1200x400.webp'
                }}
            />
            <Heading headingLevel={2} id="foundation-heading">Laying the Foundation</Heading>
            <p>
                Buttons are the most re-used components in any interface — and the easiest to get wrong.
                In this first post of the design system series, we&apos;re building a button that balances <FunHighlight>functionality</FunHighlight>, <FunHighlight>accessibility</FunHighlight>, and <FunHighlight>developer trust</FunHighlight>.
            </p>
            <p>
                This isn&apos;t just another styled button. It&apos;s a <FunHighlight>system</FunHighlight> — one that scales gracefully, communicates state clearly, and behaves predictably under real-world conditions. Built in React, this component forms the foundation for more advanced elements like toggles, switches, and interactive panels.
            </p>

            <p>By the end of this post, you&apos;ll understand how to design a button system that is:</p>
            <List>
                <li>Type-safe and accessible by default</li>
                <li>Backed by a reusable hook for interaction logic</li>
                <li>Styled with built-in accessibility and state awareness</li>
                <li>Fully tested to ensure reliability</li>
            </List>
        </PostSection>
    )
}