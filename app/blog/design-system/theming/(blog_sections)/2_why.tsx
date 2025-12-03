import FunHighlight from "@/components/decorations/FunHighlight";
import Heading from "@/components/heading";
import List from "@/components/list";
import PostInfo from "@/components/post/post.info";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import { Inline, Row, Stack } from "@/components/primitives";

/**
 * 
 
re section2 :
can you generate a small diagram that I could include alongside the core concepts list?
```global tokens → component tokens → data attributes → cascade layers```

re section3: 
I mention a lot of global styles but I only show colours. should I say something like:
we'll focus on colors as they demonstrate the pattern.

this sentence probably doesn't belong any more

         <p>
                    Before we move on to component tokens, it's worth looking at a few tools that can help you evaluate and build accessible color palettes.
                </p>

re section4: 
if I add a diagram in section2, would this be covered?
```Global Tokens → Semantic Tokens → Component Tokens → Styles```

do I need the Why Component Tokens Matter section here?
does the order make sense? I have a paragraph preceding this saying that we will be adding a third layer and then I deviate to explain
 * 
 * 
 */
export default function Section2() {
    return (
        <PostSection id="introduction">
            <Heading as={"h2"} id="introduction-heading">
                Why Theming Should Be Its Own System
            </Heading>
            <Stack>
                <p>
                    As your component library grows, the cracks start to show: duplicated styles, slightly different shades of the same color, ad-hoc <code>!important</code> overrides, and components that look fine in light mode but break in dark mode.
                </p>

                <p>
                    Most teams try to solve this with inline styles, CSS-in-JS variables, or prop-based variants. But these approaches share a common flaw: <strong>they scatter theming logic across dozens of component files</strong>, making updates fragile and consistency nearly impossible.
                </p>

                <PostNote showIcon={false}>
                    <p>
                        <strong>The reality of ad-hoc theming:</strong>
                    </p>
                    <List spacing="tight" marker="circle" variant="danger">
                        <li>Designer updates the primary blue → you search-and-replace across 30 files</li>
                        <li>Dark mode breaks because 6 components hardcoded light backgrounds</li>
                        <li>New developer adds a button with <code>color: #3b82f6</code> instead of using your "primary" blue</li>
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