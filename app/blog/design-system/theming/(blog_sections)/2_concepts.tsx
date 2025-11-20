import InlineCode from "@/components/code/inlineCode";
import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";

export default function section2() {

    return (
        <PostSection id="core-concepts">
            <AnchorHeading as="h2" id="core-concepts-heading">Core Concepts: How CSS-Only Theming Works</AnchorHeading>

            <p>
                Before we write any code, we need a clear mental model. A pure CSS theming system isn&apos;t magic — it&apos;s a small set of powerful ideas working together.
            </p>

            <p className="bold">Here are the core building blocks:</p>

            <List spacing="loose" variant="none">
                <li>
                    <span className="bold">Design Tokens:</span> Global CSS variables that represent your <span className="fun-underline">brand colours</span>, <span className="fun-underline">spacing</span>, and <span className="fun-underline">typography</span> — the raw ingredients of your theme.
                </li>
                <li>
                    <p>
                        <span className="bold">Component Tokens:</span> Local, component-scoped CSS variables defined inside the component&apos;s own stylesheet.
                    </p>
                    <p>
                        These provide semantic hooks like <InlineCode codeString="--background-color" lang="css" /> or <InlineCode codeString="--foreground-color" lang="css" />, and <InlineCode codeString="--border-color" lang="css" /> — the values the component actually uses, all mapped back to your global design tokens.
                    </p>
                </li>
                <li>
                    <p>
                        <span className="bold">Data Attributes:</span> Lightweight CSS hooks such as <InlineCode codeString={`data-theme="dark"`} lang="css" /> or <InlineCode codeString={`data-variant="primary"`} lang="css" />.
                    </p>
                    <p>
                        They don&apos;t require client-side JavaScript, but integrate cleanly with any JS that sets or toggles them.
                    </p>
                </li>
                <li>
                    <span className="bold">Cascading Layers:</span> Because CSS variables cascade, themes flow through entire sections of your UI — even deeply nested components — <span className="fun-underline">without specificity battles or override chains</span>  that traditional CSS often requires.
                </li>
            </List>

            <p>
                With these pieces, you get a system that&apos;s predictable, SSR-safe, and completely framework-agnostic. React becomes the consumer, not the owner, of your theming.
            </p>
        </PostSection>
    )
}