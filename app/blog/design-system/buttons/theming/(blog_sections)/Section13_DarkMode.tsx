import Code from "@/components/code";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";

export default function Section13_DarkMode() {
    return (
        <PostSection id="dark-mode">
            <AnchorHeading as={"h2"} id="dark-mode-heading">Dark Mode Support</AnchorHeading>
            <Code codeString={`@media (prefers-color-scheme: dark) {
    :root {
        --color-primary-400: hsl(212, 85%, 55%);
    }
}`} lang="css" />
            <PostNote>
                <p>Since all colors reference tokens, dark mode is achieved by updating token values — not component logic.</p>
            </PostNote>
        </PostSection>
    )
}