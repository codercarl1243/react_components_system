import Button from "@/components/button";
import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import Heading from "@/components/heading";
import List from "@/components/list";
import PostInfo from "@/components/post/post.info";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import { Inline, Stack } from "@/components/primitives";
import Tablist from "@/components/tablist";

export default function Section1() {

    return (
        <PostSection id="preview">
            <Stack gap={4}>
                <Heading as="h2" id="preview-heading">
                    What We're Building
                </Heading>
                <p>
                    By the end of this article, you'll have a complete, scalable theming system powered entirely by <strong>CSS variables</strong> and <strong>data attributes</strong> — no runtime theme providers, no context, and no JavaScript re-renders.
                </p>

                <p>
                    Here's what it looks like in action:
                </p>
                <Stack gap={2} style={{ paddingInlineStart: "1rem" }} variant="neutral" variantAppearance="primitive">
                    <Heading as="h3" headingSize={4} variant="neutral">Button Examples</Heading>
                    <PostInfo>Basic unstyled button</PostInfo>
                    <div>
                        <button>Click Me</button>
                    </div>
                    <Stack>
                        <PostInfo>Different variants and appearances, one component — all controlled by <InlineCode codeString="data-variant" /> and <InlineCode codeString="data-appearance" /> attributes</PostInfo>
                        <Inline gap={2} >
                            <Button variant="primary">Primary</Button>
                            <Button variant="secondary" variantAppearance="ghost">Secondary</Button>
                            <Button variant="accent" variantAppearance="outlined">Accent</Button>
                        </Inline>
                        <Tablist
                            tabListName={"button_example_code"}
                            className="height-min code__reference"
                            defaultActiveTabId="button_example_code--primary"
                            data-variant="accent"
                            orientation="horizontal"
                            tabs={[
                                {
                                    id: 'button_example_code--primary',
                                    tabLabel: 'Primary',
                                    panelContent: (
                                        <Code
                                            lang="html"
                                            copyEnabled={false}
                                            highlightTokens={[`data-variant="primary"`, `data-appearance="filled"`]}
                                            codeString={`<button class="button" data-variant="primary" data-appearance="filled">
    Primary
</button>`} />
                                    )
                                },
                                {
                                    id: 'button_example_code--secondary',
                                    tabLabel: 'secondary',
                                    panelContent: (
                                        <Code
                                            lang="html"
                                            copyEnabled={false}
                                            codeString={`<button class="button" data-variant="secondary" data-appearance="ghost">
    Secondary
</button>`} />
                                    )
                                },
                                {
                                    id: 'button_example_code--accent',
                                    tabLabel: 'accent',
                                    panelContent: (
                                        <Code
                                            lang="html"
                                            copyEnabled={false}
                                            codeString={`<button class="button" data-variant="accent" data-appearance="outlined">
    Accent
</button>`} />
                                    )
                                }
                            ]}
                        />

                    </Stack>
                </Stack>
                <p>
                    Everything we build is framework-agnostic. The CSS works identically in React, Vue, Svelte, or plain HTML — your framework just consumes the theming system, it doesn't own it.
                </p>
                <PostNote variant="muted" showIcon={false} >
                    <p>
                        <strong>This article is for you if you want to:</strong>
                    </p>
                    <List spacing="tight" variant="success">
                        <li>Build a predictable, centralized styling system without JavaScript overhead</li>
                        <li>Support multiple themes and variants without prop drilling or context</li>
                        <li>Write less CSS by letting tokens cascade through your component tree</li>
                        <li>Maintain accessibility across all theme combinations</li>
                        <li>Ensure your theming works flawlessly with SSR and static site generation</li>
                    </List>
                </PostNote>
            </Stack>
        </PostSection>
    )
}