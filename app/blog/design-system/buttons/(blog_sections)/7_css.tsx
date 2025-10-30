import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import FunHighlight from "@/components/decorations/FunHighlight";
import AnchorHeading from "@/components/heading/anchorHeading";
import Link from "@/components/link";
import List from "@/components/list";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";

export default function Section7() {

    return (
        <PostSection id="css-and-theming">
            <AnchorHeading headingLevel={2} id="css-and-theming-heading">CSS & Theming</AnchorHeading>
            <p>
                Our CSS isn&apos;t just decorative — it enforces <FunHighlight>layout stability</FunHighlight>, <FunHighlight>WCAG compliance</FunHighlight>, and <FunHighlight>customizability</FunHighlight>. If you&apos;d like to see the full CSS without the explanation, it is available within the <Link href="#resources-heading">resources section</Link>
            </p>
            <p>This section focuses on two core design factors: <span className="bold">accessibility</span> and <span className="bold">brand consistency</span>.</p>
            <p>
                Before diving into custom styles, it&apos;s worth mentioning the baseline that makes them work consistently across browsers.
            </p>
            <PostNote>
                <p className="bold">CSS Reset</p>
                <p>Before applying any button styles, we reset browser defaults to ensure consistent rendering across environments. This keeps our base styles predictable, no matter which browser a user chooses.</p>

                <p>If this is the first time you have come across this concept, here are a couple of general CSS Resets to get started with an app.</p>
                <List spacing="tight">
                    <li><Link href="https://piccalil.li/blog/a-more-modern-css-reset/">Andy Bell&apos;s modern reset</Link>: A great starting point for any app</li>
                    <li><Link href="https://www.joshwcomeau.com/css/custom-css-reset/">Josh Comeau&apos;s CSS reset</Link>: this article goes pretty indepth with some great examples.</li>
                    <li><Link href="https://github.com/jensimmons/cssremedy">Jen Simmons&apos; CSS Remedy</Link>: The baseline that the creators think CSS would start with if it was created today without having to worry about backwards compatibility.</li>
                </List>
            </PostNote>



            <AnchorHeading headingLevel={3} id="css-reset-base-styles">Reset and Base Styles</AnchorHeading>
            <p>The reset we use here is more <span className="italic">button-specific</span> than those above. It re-applies only the essentials — borders, outline, and box model — giving us a neutral baseline for theming.
            </p>
            <Code
                lang="css"
                title="Button CSS Reset"
                codeString={`.button {
    /* General browser defaults */
    -webkit-appearance: none;
    appearance: none;
    background: none;
    border: 1px solid currentColor;
    border-radius: 4px;
    outline: 0;
    box-shadow: none;

    /* Typography */
    font: inherit;
    font-size: 1rem;
    line-height: 1.25;
    text-align: center;
    vertical-align: middle;
}`}
            />
            <p>From here we add in our layer of bias which meet WCAG requirements and ensure consistent UX.</p>
            <p>You will notice a couple of things here:</p>
            <List spacing="tight" variant="circle">
                <li><span className="bold">Margins:</span> Extra space reduces accidental clicks — helpful for users with limited mobility or when surfing on bumpy public transport.</li>
                <li><span className="bold">Grid Layout:</span> Three columns keep icons, text, and spinners aligned without causing layout shifts when states change.</li>
            </List>
            <Code
                lang="css"
                title="Additional CSS for the Button"
                codeString={`
    /* WCAG Target Size Requirements */
    /* AA: 24px x 24px minimum, AAA: 44px x 44px minimum */
    min-width: 44px;
    min-height: 44px;

    margin: 0.5rem;
    padding: 0.5rem 0.25rem;

    /* Layout - reserve space for icon and spinner to prevent layout shift*/
    display: grid;
    grid-template-columns: 24px fit-content(100%) 24px;
    gap: 0.25em;
    align-items: center;

    /* icon | text | spinner */
    & .button__content {
        grid-column: 2;
    }

    & .spinner {
        grid-column: 3;
        justify-self: center;
    }

    &.button-w-icon .icon {
        grid-column: 1;
        justify-self: center;
    }
}`}
            />
            <p>
                Once the structure and accessibility requirements are set, we can make our buttons expressive through theming.
            </p>
            <p>CSS custom properties give us a flexible foundation for adapting to any color system or theme.</p>
            <AnchorHeading headingLevel={3} id="css-custom-properties">Custom Properties for Theming</AnchorHeading>
            <p>
                The button uses CSS custom properties for a lot of values that aren&apos;t actually defined yet. This gives us a <span className="italic">hook</span> into the code that we can use with design tokens and color variants to cascade naturally through the design system.
            </p>

            <Code lang="css"
                title="CSS Hooks"
                codeString={`.button {
    background-color: var(--button-bg-color, transparent);
    color: var(--button-color, currentColor);
    border-color: var(--button-border-color, currentColor);
    box-shadow: var(--button-shadow, none);
    outline-color: var(--button-outline-color, currentColor);
    outline-offset: var(--button-outline-offset);
}`}
            />
            <p>All of this allows us to create variants with 3 different colours that we will use in our variants (<span style={{ color: "var(--color-primary-400)" }}>Primary</span>, <span style={{ color: "var(--color-secondary-400)" }}>Secondary</span>, <span style={{ color: "var(--color-danger-400)" }}>Danger</span>, <span style={{ color: "var(--color-neutral-900)" }}>Neutral</span>)</p>
            <Code
                lang="css"
                title="Variants"
                codeString={`/* Filled style - solid background with contrasting text */
.button[data-style="filled"] {
    --button-color: var(--button-primary-color);
    --button-bg-color: var(--button-secondary-color);
    --button-border-color: var(--button-accent-color);
    --button-outline-color: var(--button-accent-color);
}

/* Outline style - transparent background with colored border/text */
.button[data-style="outlined"] {
    --button-color: var(--button-secondary-color);
    --button-bg-color: var(--button-primary-color);
    --button-border-color: var(--button-accent-color);
    --button-outline-color: var(--button-accent-color);
}

/* Color Variants */
.button[data-variant="primary"] {
    --button-primary-color: var(--color-neutral-100);
    --button-secondary-color: var(--color-primary-400);
    --button-accent-color: var(--color-primary-600);
}`}
            />
            <PostNote>
                <p className="bold fun-underline">CSS color tokens</p>
                <p>You will see above that I am using color tokens that reference neutral, or primary etc. This is quite common to see in apps that have a lot of moving parts. We define <span className="italic">'tokens'</span> that are shared where they are needed. You can see this in use in common libraries such as <Link href="https://tailwindcss.com/docs/colors">TailwindCSS</Link> and <Link href="https://mui.com/material-ui/customization/color/">Material UI</Link></p>

                <p>
                    For fun (and to save some time), I asked one of our future AI overlords to generate a color palette — <span className="fun-underline">here&apos;s what I came up with after I got fed up with contrast issues</span>:
                </p>
                <Code lang="css"
                    title="CSS Color Tokens"
                    codeString={`:root {
    /* 
        100 as background + neutral-600/700/800 as foreground(text)
        200 as background + neutral-500/600/700/800 as foreground(text)
        400 as background + neutral-100/200 as foreground(text)
        400/600 as background + neutral-100/200 as foreground(text)
    */
    /* Primary (Blue) */
    --color-primary-100: hsl(203, 31%, 95%);
    --color-primary-200: hsl(211, 38%, 88%);
    --color-primary-400: hsl(212, 75%, 40%);
    --color-primary-600: hsl(212, 76%, 28%);

    /* Secondary (Green) */
    --color-secondary-100: hsl(155, 33%, 93%);
    --color-secondary-200: hsl(153, 29%, 84%);
    --color-secondary-400: hsl(155, 65%, 26%);
    --color-secondary-600: hsl(155, 67%, 18%);

    /* Danger (Red) */
    --color-danger-200: hsl(0, 32%, 89%);
    --color-danger-400: hsl(0, 87%, 35%);
    --color-danger-600: hsl(0, 86%, 29%);

    /* Neutral colors */
    --color-neutral-100: hsl(0, 0%, 100%);
    --color-neutral-200: hsl(0, 0%, 88%);
    --color-neutral-300: hsl(0, 0%, 70%);
    --color-neutral-400: hsl(0, 0%, 46%);
    --color-neutral-500: hsl(0, 0%, 38%);
    --color-neutral-600: hsl(0, 0%, 30%);
    --color-neutral-700: hsl(0, 0%, 24%);
    --color-neutral-800: hsl(0, 0%, 15%);
    --color-neutral-900: hsl(249, 64%, 5%);
}`}
                />
            </PostNote>
            <p>
                With our tokens and variants defined, we&apos;ve built a flexible foundation that can scale across themes, brands, and accessibility requirements.
            </p>

            <AnchorHeading headingLevel={3} id="css-button-states">Button States</AnchorHeading>
            <AnchorHeading headingLevel={4} id="css-interactions">Interaction states</AnchorHeading>
            <p>
                <InlineCode lang="css" codeString=":hover" />, <InlineCode lang="css" codeString=":focus" />, and <InlineCode lang="css" codeString=":active" /> states communicate affordance. We use outline and subtle transforms <span className="fun-underline">instead of color alone</span> — ensuring <span className="bold">contrast</span> and <span className="bold">motion</span> respect user preferences.
            </p>
            <AnchorHeading headingLevel={4} id="css-disabled">Disabled & Loading States</AnchorHeading>
            <p>
                Disabled buttons use <InlineCode codeString="aria-disabled" /> and custom visual styles that
                remain discoverable. The <InlineCode lang="css" codeString="cursor: not-allowed" /> communicates the state
                without removing interactivity from assistive technology.
            </p>
            <AnchorHeading headingLevel={3} id="css-touch-devices">Touch Device Optimization</AnchorHeading>
            <p>
                Larger touch targets (44x44px) and increased padding are applied on devices with coarse pointers.
                This directly supports WCAG AAA and improves usability on mobile.
            </p>
            <AnchorHeading headingLevel={3} id="css-user-preferences">Respecting User Preferences</AnchorHeading>
            <p>
                We disable transitions and animations when <InlineCode lang="css" codeString="prefers-reduced-motion" /> is detected.
                <span className="fun-underline">Accessibility is baked in — not added later</span>.
            </p>
        </PostSection>
    )
}