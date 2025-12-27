import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";


export default function Section1() {

    return (
        <PostSection id="styling-is-not-a-single-concern">
            <AnchorHeading as="h2" id="styling-is-not-a-single-concern-heading">Styling Is Not a Single Concern</AnchorHeading>
            <p>
                Styling is often treated as a single layer: colors, borders, backgrounds, and states all bundled together and pushed directly into components. That approach works early on, but it breaks down as soon as systems start to scale.
            </p>
            <p>
                In practice, styling has multiple responsibilities that behave very differently over time. Some describe the environment an interface lives in. Some describe meaning. Others describe presentation or application. When those responsibilities are mixed together, the system becomes brittle.
            </p>
            <p>
                A scalable design system separates these concerns instead of blending them. In this system, styling is divided into four layers: theme, variant, appearance, and paint. Each layer has a narrow responsibility and no awareness of layers above it.
            </p>
            <p>
                That separation is what keeps the system flexible as requirements evolve.
            </p>
        </PostSection>
    )
}