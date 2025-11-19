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

            <List>
                <li>
                    <span className="bold">Design Tokens:</span> Global CSS variables that represent your <span className="fun-underline">brand colours</span>, <span className="fun-underline">spacing</span>, and <span className="fun-underline">typography</span> at the surface level.
                </li>
                <li>
                    <span className="bold">Semantic Theme Variables:</span> Component-friendly variables like <InlineCode codeString="--button-bg" lang="css" /> or <InlineCode codeString="--text-contrast" lang="css" /> that map back to design tokens.
                </li>
                <li>
                    <span className="bold">Data Attributes:</span> Lightweight hooks for CSS like <InlineCode codeString={`data-theme="dark"`} lang="css" /> or <InlineCode codeString={`data-variant="primary"`} lang="css" /> that allow styling to change with zero JavaScript.
                </li>
                <li>
                    <span className="bold">Cascading Layers:</span> Because CSS variables cascade, themes automatically apply to entire sections of your UI — even nested components — <span className="fun-underline">without custom logic</span>.
                </li>
            </List>

            <p>
                With these pieces, you get a system that&apos;s predictable, SSR-safe, and completely framework-agnostic. React becomes the consumer, not the owner, of your theming.
            </p>
        </PostSection>
    )
}