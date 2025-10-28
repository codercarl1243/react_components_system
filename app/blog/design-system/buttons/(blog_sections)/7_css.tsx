import Code from "@/components/code";
import FunHighlight from "@/components/decorations/FunHighlight";
import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";

export default function Section7() {

    return (
        <PostSection id="css-and-theming">
            <AnchorHeading headingLevel={2} id="css-and-theming-heading">CSS & Theming</AnchorHeading>
            <p>
                Our CSS isn&apos;t just decorative — it enforces <FunHighlight>layout stability</FunHighlight>, <FunHighlight>WCAG compliance</FunHighlight>, and <FunHighlight>customizability</FunHighlight>.
                We&apos;ll look at three layers: resets, custom properties, and variants.
            </p>
            <AnchorHeading headingLevel={3} id="css-reset-base-styles">Reset and Base Styles</AnchorHeading>
            <p>
                We start by resetting browser defaults for consistent cross-browser rendering, then re-apply
                only what we need: borders, outline, and box model. This gives us a neutral baseline for theming.
            </p>
            <Code lang="css" codeString={`.button {
          -webkit-appearance: none;
          appearance: none;
          background: none;
          border: var(--border-thin);
          border-radius: var(--radius-md);
          outline: 0;
        }`} copyEnabled={false} />
            <AnchorHeading headingLevel={3} id="css-custom-properties">Custom Properties for Theming</AnchorHeading>
            <p>
                The button uses CSS custom properties instead of hardcoded values, allowing design tokens
                and color variants to cascade naturally through your design system.
            </p>

            <Code lang="css" codeString={`.button[data-variant="primary"] {
          --button-secondary-color: var(--color-primary-400);
          --button-accent-color: var(--color-primary-600);
        }`} copyEnabled={false} />
            <AnchorHeading headingLevel={3} id="css-button-states">Button States</AnchorHeading>
            <AnchorHeading headingLevel={4} id="css-interactions">Interaction states</AnchorHeading>
            <p>
                <Code inline copyEnabled={false} codeString=":hover" />, <Code inline copyEnabled={false} codeString=":focus" />, and <Code inline copyEnabled={false} codeString=":active" /> states communicate affordance. We use outline and subtle transforms <span className="fun-underline">instead of color alone</span> — ensuring <span className="bold">contrast</span> and <span className="bold">motion</span> respect user preferences.
            </p>
            <AnchorHeading headingLevel={4} id="css-disabled">Disabled & Loading States</AnchorHeading>
            <p>
                Disabled buttons use <Code inline copyEnabled={false} codeString="aria-disabled" /> and custom visual styles that
                remain discoverable. The <Code inline copyEnabled={false} codeString="cursor: not-allowed" /> communicates the state
                without removing interactivity from assistive technology.
            </p>
            <AnchorHeading headingLevel={3} id="css-touch-devices">Touch Device Optimization</AnchorHeading>
            <p>
                Larger touch targets (44x44px) and increased padding are applied on devices with coarse pointers.
                This directly supports WCAG AAA and improves usability on mobile.
            </p>
            <AnchorHeading headingLevel={3} id="css-user-preferences">Respecting User Preferences</AnchorHeading>
            <p>
                We disable transitions and animations when <Code inline codeString="prefers-reduced-motion" /> is detected.
                <span className="fun-underline">Accessibility is baked in — not added later</span>.
            </p>
        </PostSection>
    )
}