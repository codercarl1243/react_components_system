import Code from "@/components/code";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";

export default function Section3() {

    return (
        <PostSection id="tokens">
            <AnchorHeading as={"h2"} id="tokens-heading">
                Step 1 — Define Global Tokens with CSS Custom Properties
            </AnchorHeading>

            <p>Here&apos;s the base layer — your design tokens.</p>

            <Code lang="css" codeString={`/* Color Tokens */
:root {
  --color-primary-100: hsl(203 31% 95%);
  --color-primary-200: hsl(211 38% 88%);
  --color-primary-400: hsl(212 75% 40%);
  --color-primary-600: hsl(212 76% 28%);

  --color-secondary-400: hsl(329 70% 45%);
  --color-secondary-600: hsl(329 70% 35%);
}

/* Neutral Tokens */
:root {
  --color-neutral-100: hsl(0 0% 100%);
  --color-neutral-900: hsl(0 0% 10%);
}`} />
            <p>
                These don&apos;t style anything yet — they&apos;re the raw ingredients. Next we&apos;ll “map” these tokens to semantic roles
                inside our theme and variants.
            </p>
        </PostSection>
    )
}