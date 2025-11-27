import Code from "@/components/code";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";


export default function Section7() {

    return (
        <PostSection id="dark">
            <AnchorHeading as={"h2"} id="dark-heading">
                Step 5 — Add Dark Mode (Optional but Awesome)
            </AnchorHeading>

            <p>Now that themes are applied via <code>data-theme</code>, we can define dark-mode tokens.</p>

            <Code lang="css" codeString={`html[data-theme="dark"] {
  --color-neutral-100: hsl(0 0% 95%);
  --color-neutral-900: hsl(0 0% 4%);

  --color-primary-400: hsl(212 60% 55%);
  --color-primary-600: hsl(212 65% 45%);
}`} />
            <p>
                Every component instantly updates. No refactoring. No duplicated styles. This is the power of design-token
                theming.
            </p>
        </PostSection>
    )
}