import Code from "@/components/code";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";

export default function Section4() {

    return (
        <PostSection id="appearances">
            <AnchorHeading as="h2" id="appearances-heading" prefix="step 3 -">Appearances</AnchorHeading>
            <p className="bold italic">
                Controlling Visual Treatment
            </p>
            <p>
                Appearance defines how a variant is visually expressed.
            </p>
            <p>
                Whether something is filled, outlined, ghosted, or tonal is a presentation decision, not a semantic one. Without a dedicated appearance layer, teams tend to solve visual differences by inventing new variants.
            </p>
            <p>
                Over time, variant names stop describing meaning and start encoding presentation details. Appearance exists to prevent that drift. It allows a single semantic intent to be expressed in multiple visual ways without duplication or ambiguity.
            </p>
            <p>
                Meaning stays stable while presentation remains flexible.
            </p>
            <p>
                The same semantic variant can be presented in different ways depending on appearance:
            </p>
            <Code lang="css" codeString={`[data-variant="primary"] {
  --variant-bg: blue;
  --variant-fg: white;
}

[data-appearance="filled"] {
  background: var(--variant-bg);
  color: var(--variant-fg);
}

[data-appearance="outlined"] {
  background: transparent;
  color: var(--variant-bg);
  border: 1px solid var(--variant-bg);
}`} />
        </PostSection>
    )
}