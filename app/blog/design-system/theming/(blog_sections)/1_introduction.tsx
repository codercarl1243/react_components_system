import Heading from "@/components/heading";
import List from "@/components/list";
import PostNote from "@/components/post/post.note";
import PostSection from "@/components/post/post.section";
import { Stack } from "@/components/primitives";
import ButtonExample from "../examples/1_buttonExample/example.server";

export default function Section1() {

    return (
        <PostSection id="introduction-theming">
            <Stack gap={4}>
                <Heading as="h2" id="introduction-theming-heading">
                    What We're Building
                </Heading>
                <p>
                    By the end of this article, you'll have a complete, scalable theming system powered entirely by <strong>CSS variables</strong> and <strong>data attributes</strong> — no runtime theme providers, no context, and no JavaScript re-renders.
                </p>

                <p>
                    Here's what it looks like in action:
                </p>
                <ButtonExample />
                <p>
                    Everything we build is framework-agnostic. The CSS works identically in React, Vue, Svelte, or plain HTML — your framework just consumes the theming system, it doesn't own it.
                </p>
                <PostNote variant="warning" showIcon={false} >
                    <p>
                        <strong>This article is for you if you want to:</strong>
                    </p>
                    <List as="ul" spacing="loose" variant="primary">
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