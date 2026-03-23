import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";
import BlogLink from "@/components/post/post.blogLink";
import List from "@/components/list";
import { Stack } from "@/components/primitives";

export default function Section5() {
    return (
        <PostSection id="summary">
            <AnchorHeading as="h2" id="summary-heading">
                Summary
            </AnchorHeading>
            <Stack>
                <p>These three token categories form the remaining foundation of the system.</p>
                <List as="ul" spacing="loose">
                    <li><strong>Spacing</strong> ensures every gap, padding, and margin comes from a shared scale rather than a local guess.</li>
                    <li><strong>Typography</strong> ensures font sizes and line heights are consistent, fluid, and purposeful.</li>
                    <li><strong>Breakpoints</strong> ensure layout boundaries are shared contracts rather than scattered magic numbers.</li>
                </List>
                <p>
                    Together with the color and theme tokens from the first post, the token layer is now complete.
                    Every value the system needs — colors, spacing, type, and layout boundaries — has a defined home.
                </p>
                <p>
                    At this point, the system is no longer a collection of components — it is a set of constraints that guide every decision.
                </p>
                <p>
                    This is the last post in the design system series for now. The next series covers individual components —
                    starting with the <BlogLink postId="components__button__01">Button</BlogLink>.
                </p>
            </Stack>
        </PostSection>
    );
}
