import FunHighlight from "@/components/decorations/FunHighlight";
import Heading from "@/components/heading";
import List from "@/components/list";
import PostBanner from "@/components/post/post.banner";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";


export default function Section1() {
    return (
        <PostSection id="introduction">
            <PostBanner
                title="Building a Theming System for Your React Design System"
                subtitle="How to expose flexible, accessible styling through CSS variables, data-attributes, and React hooks. The foundation you'll use for buttons, navigation, cards, and every other component in your system."
                headingId="theming-heading"
                image={{
                    src: '/images/blogs/theming/main-image.webp',
                    alt: ""
                }}
            />
            <Heading as={"h2"} id="introduction-heading">Why Theming Should Be Its Own System</Heading>
            <p>
                As your component library grows, you quickly discover that <span className="fun-underline">styling can&apos;t live inside individual components</span>.
                Slightly different colours, ad-hoc overrides, and components that behave inconsistently across your app makes your life as the developer less than pleasant.
            </p>
            <p className="bold">You need a single, rock-solid foundation — one source of truth your entire system can depend on.</p>
            <p>
                The solution becomes obvious fast: theming isn&apos;t an add-on — <FunHighlight>theming is the design-system backbone</FunHighlight>. It&apos;s not a styling tweak or a component quirk; it&apos;s the mechanism that keeps <em>every component</em> consistent, accessible, and future-proof across branding, dark mode, and new variants.
            </p>
            <p>
                In this article, we&apos;ll build the theming architecture that powers the Design System — a simple, scalable approach built entirely on <strong>CSS variables and data attributes</strong>. No JavaScript theme providers. No context. Just clean, predictable CSS.
            </p>
            <PostNote>
                <p>
                    This article is for anyone who wants to:
                </p>
                <List spacing="tight">
                    <li>Build a consistent, predictable styling kit for your app</li>
                    <li>Avoid complex providers or runtime state for theming</li>
                    <li>Reduce the total amount of CSS you write by centralising style logic</li>
                    <li>Create components that stay accessible across themes</li>
                    <li>Ensure your theming works flawlessly with SSR and static rendering</li>
                </List>
            </PostNote>
        </PostSection>
    )
}