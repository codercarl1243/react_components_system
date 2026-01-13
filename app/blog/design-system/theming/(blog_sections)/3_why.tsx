import AnchorHeading from "@/components/heading/anchorHeading";
import List from "@/components/list";
import PostSection from "@/components/post/post.section";

export default function Section3() {
    return (
        <PostSection id="why">
            <AnchorHeading as={"h2"} id="why-heading">
                Why this approach works
            </AnchorHeading>
            <p>
                Most theming systems scatter styling logic across components. A button implements variants one way, a card implements them slightly differently, and six months later nobody remembers which approach is canonical.
            </p>
            <p>
                This system avoids that by making decisions once, in the right layer:
            </p>
            <List as="ol" variant="primary" variantAppearance="outlined">
                <li><strong>Global tokens</strong> define your visual language</li>
                <li><strong>Variants</strong> define semantic color roles</li>
                <li><strong>Appearances</strong> define visual treatments</li>
                <li><strong>Paint</strong> defines what actually gets styled</li>

            </List>
            <p><strong>Components</strong> consume these layers without reimplementing them</p>
            <p>
                When you need to add a new variant, you add it to the variant layer. When you need a new appearance, you add it to the appearance layer. Components don't change. The boundaries hold.
            </p>
            <p>
                This isn't about adding abstraction for its own sake. It's about putting styling decisions in places where they can be changed safely.
            </p>
        </PostSection>
    );
}