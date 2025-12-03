import Button from "@/components/button";
import Heading from "@/components/heading";
import List from "@/components/list";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import { Inline, Stack } from "@/components/primitives";

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

                {/* Show visual examples instead of before/after text */}
                <Stack gap={2}>
                    <Inline gap={2}>
                        <Button variant="primary">Primary</Button>
                        <Button variant="secondary" variantAppearance="ghost">Secondary</Button>
                        <Button variant="accent" variantAppearance="outlined">Accent</Button>
                        <Button variant="danger">Danger</Button>
                    </Inline>
                    <p className="text-sm text-muted">
                        Four variants, one component — all controlled by <code>data-variant</code> attributes
                    </p>
                </Stack>

                <p>
                    Everything we build is framework-agnostic. The CSS works identically in React, Vue, Svelte, or plain HTML — your framework just consumes the theming system, it doesn't own it.
                </p>

                <p>
                    Everything we build is framework-agnostic: it works the same in React, Vue, Svelte, or plain HTML.
                </p>
                <PostNote variant="muted" showIcon={false} >
                    <p>
                        <strong>This article is for you if you want to:</strong>
                    </p>
                    <List spacing="tight">
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