import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";

export default function Section10() {

    return (
        <PostSection id="conclusion">
            <AnchorHeading as={"h2"} id="conclusion-heading">
                Wrapping Up & What&apos;s Next
            </AnchorHeading>

            <p>
                You now have a full theming system for your design system — not just for buttons, but for every component you
                will ever build.
            </p>

            <List>
                <li>CSS variables define tokens</li>
                <li>Variants expose semantic colors</li>
                <li>ThemeProvider controls global theming</li>
                <li>useTheme() gives React components access</li>
            </List>

            <p>
                Next up, I&apos;ll be extending this foundation into a <strong>global brand-token system</strong> and exploring how to
                theme components like Cards, NavBars, Inputs, and Layout blocks.
            </p>

            <p>Stay tuned — and happy styling! 🎨</p>
        </PostSection>
    )
}