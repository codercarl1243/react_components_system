import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";

export default function Section7() {

    return (
        <PostSection id="the-payoff">
            <AnchorHeading as="h2" id="the-payoff-heading">The Payoff of a Layered System</AnchorHeading>
            <p>
                With these layers in place, the design system becomes easier to reason about and cheaper to change. Themes can switch without touching components. Variants remain semantic over time. Visual treatments stay reusable instead of proliferating.
            </p>
            <p>
                Most importantly, styling decisions stop leaking across concerns. Each layer does one job, and the system holds together because those responsibilities are respected.
            </p>
            <p>
                So far, we've defined what the system is and why these layers exist. The next challenge is enforcing them in real interfaces — deciding where styling is allowed to live and how structure and layout can safely consume this system.
            </p>
            <p>
                That is the role of primitives.
            </p>
        </PostSection>
    )
}