import FunHighlight from "@/components/decorations/FunHighlight";
import Heading from "@/components/heading";
import List from "@/components/list";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import { Block, Inline, Stack } from "@/components/primitives";


export default function Section1() {
    return (
        <PostSection id="introduction">
            <Heading as={"h2"} id="introduction-heading">
                Why Theming Should Be Its Own System
            </Heading>
            <Stack>
                <p>
                    As your component library grows, the cracks start to show: duplicated styles, slightly different colors, ad-hoc overrides, and components that behave inconsistently across themes. You&apos;ve tried inline styles, CSS-in-JS, and prop-based variants — but they all create more problems than they solve.
                </p>

                <p>
                    The solution isn&apos;t another tool or library. It&apos;s treating theming as what it actually is: <FunHighlight>the design-system backbone</FunHighlight> — a single source of truth that keeps components consistent, accessible, and maintainable across themes, brands, and platforms.
                </p>
                <PostNote variant="warning" showIcon={false}>
                    <p><strong>Common problem:</strong> You add a new <Inline as="span" variant="success" variantAppearance="primitive">success</Inline> button variant.</p>
                    <p>Now you need to update 12 different component files, worry about dark mode, and pray nothing breaks in production.</p>
                    <p>With proper theming architecture, you&apos;d change 3 lines of CSS.</p>
                </PostNote>
                <p>
                    In this article, we&apos;ll build the theming architecture that powers the Design System — a simple, scalable approach built entirely on <strong>CSS variables</strong> and <strong>data attributes</strong>. No JavaScript theme providers. No context. Just clean, predictable CSS.
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