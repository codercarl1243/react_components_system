import InlineCode from "@/components/code/inlineCode";
import AnchorHeading from "@/components/heading/anchorHeading";
import Icon from "@/components/icon";
import Link from "@/components/link";
import List from "@/components/list";
import PostInfo from "@/components/post/post.info";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import { Inline, Stack } from "@/components/primitives";
import { RiCodeSSlashLine, RiPaletteLine, RiPuzzleLine, RiStackLine } from "@remixicon/react";

export default function Section3() {

    return (
        <PostSection id="core-concepts">
            <AnchorHeading as="h2" id="core-concepts-heading">
                Core Concepts: How CSS-Only Theming Works
            </AnchorHeading>
            <p>
                Before writing any code, we need a clear mental model of how CSS-only theming actually works. A pure CSS theming system isn't magic — it's a small set of powerful ideas working together.
            </p>

            <Stack>
                <p className="bold">Here are the core building blocks:</p>

                <List spacing="normal" marker="none">
                    <li>
                        <p>
                            <span className="bold"><Icon icon={RiPaletteLine} color={"var(--color-primary-400)"} /> Design Tokens:
                            </span> Global CSS variables that represent your <span className="fun-underline">brand colors</span>, <span className="fun-underline">spacing</span>, and <span className="fun-underline">typography</span> — the raw ingredients of your theme.
                        </p>
                        <PostInfo>
                            <strong>Why:</strong> Without these, you'd hardcode <InlineCode lang="css" codeString="hsl(212, 75%, 40%)"/> in 50 places. Good luck updating your brand colors.
                        </PostInfo>
                    </li>
                    <li>
                        <p>
                            <Inline as="strong"><Icon icon={RiPuzzleLine} color={"var(--color-primary-400)"} /> Component Tokens:</Inline> Local, component-scoped CSS variables defined inside the component's own stylesheet.
                        </p>
                        <p>
                            These provide semantic hooks like <InlineCode codeString="--background-color" lang="css" />, <InlineCode codeString="--foreground-color" lang="css" />, and <InlineCode codeString="--border-color" lang="css" /> — the values the component actually uses, all mapped back to your global design tokens.
                        </p>
                    </li>
                    <li>
                        <p>
                            <span className="bold"><Icon icon={RiCodeSSlashLine} color={"var(--color-primary-400)"} /> Data Attributes:</span> Lightweight CSS hooks such as <InlineCode codeString={`data-theme="dark"`} /> or <InlineCode codeString={`data-variant="primary"`} />.
                        </p>
                        <p>
                            They don't require client-side JavaScript, but integrate cleanly with any JS that sets or toggles them.
                        </p>
                    </li>
                    <li>
                        <p>
                            <span className="bold"><Icon icon={RiStackLine} color={"var(--color-primary-400)"} /> Cascade Layers:</span> Explicit precedence rules that ensure variants and themes override component defaults, regardless of selector specificity or source order.</p>
                    </li>
                </List>
            </Stack>
            <PostNote>
                <p>Cascade layers are supported in all modern browsers (2022+).</p>
                <p>
                    For older browsers, you can achieve similar results through careful source ordering and higher specificity selectors, though this is more fragile.
                </p>
                <PostInfo>Refer to the <Link href="https://caniuse.com/css-cascade-layers">caniuse tables on CSS Cascade Layers</Link> for further information.</PostInfo>
            </PostNote>
            <Stack>
                <p>
                    Because CSS variables cascade naturally through the DOM, themes flow through entire sections of your UI — even deeply nested components — without the <span className="fun-underline">specificity battles</span> or <span className="fun-underline">override chains</span> that traditional CSS often requires.
                </p>
                <p>
                    With these pieces, you get a system that's predictable, SSR-safe, and completely framework-agnostic. React becomes the consumer, not the owner, of your theming.
                </p>
            </Stack>
            <p>In the next section, we'll apply these ideas by defining the global tokens that power the entire system.</p>
        </PostSection>
    )
}