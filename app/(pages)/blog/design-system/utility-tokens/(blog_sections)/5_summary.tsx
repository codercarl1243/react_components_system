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
                    <li>
                        <strong>Spacing</strong> ensures the beat holds — every gap, padding, and margin comes from a shared scale.
                    </li>
                    <li>
                        <strong>Typography</strong> ensures the composition is intentional — font sizes and line heights communicate hierarchy, not guesswork.
                    </li>
                    <li>
                        <strong>Breakpoints</strong> ensure the arrangement shifts in step — layout boundaries are shared contracts, not scattered magic numbers.
                    </li>
                </List>
                <p>
                    Together with the color and theme tokens from the <BlogLink postId={"design__theming_01"}>theming post</BlogLink>, the token layer is now complete.
                    Every value the system needs — colors, spacing, typography, and layout have defined homes.
                </p>
                <p>
                    At this point, the system is no longer a collection of components — it is a score that every component plays from.
                </p>
                <p>
                    This is the last post in the design system series for now. The next series covers individual components —
                    starting with the <BlogLink postId="components__button__01">Button</BlogLink>.
                </p>
            </Stack>
        </PostSection>
    );
}
