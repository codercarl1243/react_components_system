import FunHighlight from "@/components/decorations/FunHighlight";
import Heading from "@/components/heading";
import List from "@/components/list";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import { Stack } from "@/components/primitives";


export default function Section1() {
    return (
        <PostSection id="introduction">
            <Heading as={"h2"} id="introduction-heading">
                Why Theming Should Be Its Own System
            </Heading>
            <Stack>
                <p>
                    As your component library grows, the cracks start to show: duplicated styles, slightly different colors, ad-hoc overrides, and components that behave inconsistently. It becomes clear that <span className="fun-underline">styling can't live inside individual components</span>.
                </p>

                <p>
                    The solution? Theming isn't an add-on — <FunHighlight>it's the design-system backbone</FunHighlight>, the single source of truth that keeps <span className="italic">every component</span> consistent, accessible, and future-friendly across branding, dark mode, and new variants.
                </p>
                <p>
                    In this article, we&apos;ll build the theming architecture that powers the Design System — a simple, scalable approach built entirely on <strong>CSS variables and data attributes</strong>. No JavaScript theme providers. No context. Just clean, predictable CSS.
                </p>
            </Stack>
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