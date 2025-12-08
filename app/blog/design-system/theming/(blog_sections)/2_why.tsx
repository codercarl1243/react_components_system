import InlineCode from "@/components/code/inlineCode";
import ColorSwatch from "@/components/colorSwatch";
import FunHighlight from "@/components/decorations/FunHighlight";
import Heading from "@/components/heading";
import List from "@/components/list";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import { Stack } from "@/components/primitives";

export default function Section2() {
    return (
        <PostSection id="introduction">
            <Heading as={"h2"} id="introduction-heading">
                Why Theming Should Be Its Own System
            </Heading>
            <Stack>
                <p>
                    As your component library grows, the cracks start to show: duplicated styles, slightly different shades of the same color, ad-hoc <InlineCode codeString="!important" lang="css" /> overrides, and components that look fine in light mode but break in dark mode.
                </p>

                <p>
                    Most teams try to solve this with inline styles, CSS-in-JS variables, or prop-based variants. But these approaches share a common flaw: <strong>they scatter theming logic across dozens of component files</strong>, making updates fragile and consistency nearly impossible.
                </p>

                <PostNote showIcon={false} variant="neutral">
                    <Heading as="h3" variant="neutral" className="fun-underline">The reality of ad-hoc theming</Heading>
                    <List spacing="normal" marker="disc" variant="danger">
                        <li>Designer updates the primary blue <ColorSwatch color="var(--color-primary-200)" aria-label="old primary blue color swatch" /> → <ColorSwatch color="var(--color-primary-400)" aria-label="new primary blue color swatch" /> and you're search-and-replacing across 30 files</li>
                        <li>Dark mode breaks because 6 components hardcoded light backgrounds</li>
                        <li>New developer adds a button with <InlineCode codeString="color: #3b82f6" lang="css" /> <ColorSwatch color="#3b82f6" aria-label="#3b82f6 color swatch" /> instead of using your "primary" token</li>
                        <li>Three months later, your "primary" color has 7 different hex values in production</li>
                    </List>
                </PostNote>

                <p>
                    The solution isn't another library or framework feature. It's treating theming as what it actually is: <FunHighlight>the design-system backbone</FunHighlight> — a single source of truth that keeps <em>every component</em> consistent, accessible, and maintainable across themes, brands, and platforms.
                </p>

                <p>
                    In this article, we'll build that backbone using only <strong>CSS variables</strong> and <strong>data attributes</strong>. No JavaScript theme providers. No context. Just clean, predictable CSS that works everywhere.
                </p>
            </Stack>
        </PostSection>
    )
}