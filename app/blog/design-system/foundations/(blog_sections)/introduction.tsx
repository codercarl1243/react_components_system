import List from "@/components/list";
import PostSection from "@/components/post/post.section";


export default function Introduction() {

    return (
        <PostSection id="introduction-theming">
            <p>Design systems don't usually break all at once. They decay.</p>

            <p>A color change ripples through unrelated components. Variants quietly multiply to cover edge cases. Dark mode works — until contrast breaks and newly introduced colors don't fit the system.</p>

            <p>Over time, styling stops feeling intentional and starts feeling fragile.</p>

            <p>If this sounds familiar, the problem is rarely tooling. It's architecture.</p>

            <p>In this post, we'll look at:</p>
            <List as="ul" spacing="loose">
                <li>why styling decisions become tightly coupled as systems grow</li>
                <li>why tokens alone don't prevent inconsistency</li>
                <li>how separating intent, presentation, and application changes everything</li>
            </List>
            <p>This isn't about adding more abstractions. It's about <span className="fun-underline">introducing the right ones</span>.</p>
        </PostSection>
    )
}