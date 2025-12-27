import Code from "@/components/code";
import FunHighlight from "@/components/decorations/FunHighlight";
import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";


export default function Section2() {

    return (
        <PostSection id="theme">
            <AnchorHeading as="h2" id="theme-heading" prefix="step 1 -">
                App-wide Theming
            </AnchorHeading>
            <p className="bold italic">
                Defining the Environment
            </p>
            <p>
                The <em className="fun-underline">Theme</em> defines the visual environment an interface exists in. It answers foundational questions:
            </p>
            <List as="ul" spacing="loose">
                <li>what the default surface color is</li>
                <li>how standard text should appear; and</li>
                <li>what “muted” means in this context.</li>
            </List>
            <p>
                Theme does not describe intent or presentation. It doesn't know about components, variants, or use cases. It establishes a baseline environment that everything else can rely on.
            </p>
            <p>
                When theme is treated as environment rather than styling logic, switching between light and dark modes becomes trivial. Components don't change. Variants don't change. Only the environment does.
            </p>
            <p>
                Below is a simplified example showing how light and dark themes define environment without referencing components or variants:
            </p>
            <Code lang="css" codeString={`/* Light theme */
[data-theme="light"] {
    --surface: var(--color-neutral-100);
    --text-on-surface: var(--color-neutral-900);
}

/* Dark theme */
[data-theme="dark"] {
    --surface: var(--color-neutral-900);
    --text-on-surface: var(--color-neutral-100);
}

/* Global defaults */
body {
    background-color: var(--surface);
    color: var(--text-on-surface);
}`} />
        </PostSection>
    )
}