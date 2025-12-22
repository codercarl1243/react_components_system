import Code from "@/components/code";
import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";

export default function Section8() {

    return (
        <PostSection id="components">
            <AnchorHeading as={"h2"} id="components-heading">
                Step 6 — Consuming Theme + Variant Styling in Components
            </AnchorHeading>

            <Code lang="tsx" codeString={`export function Button({ variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      variant={variant}
      {...props}
    />
  )
}`} />

            <p>That's it. All styling is driven by:</p>

            <List as="ul">
                <li>Global tokens</li>
                <li>Theme provider</li>
                <li>Variant mapping</li>
                <li>Component-level semantic CSS variables</li>
            </List>

            <p>
                Your Button is now themeable, brandable, dark-mode-ready and able to adapt to any design-system requirement.
            </p>
        </PostSection>
    )
}