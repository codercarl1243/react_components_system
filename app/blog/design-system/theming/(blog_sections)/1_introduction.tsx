import AnchorHeading from "@/components/heading/anchorHeading";
import PostSection from "@/components/post/post.section";
import { Stack } from "@/components/primitives";

export default function Section1() {

    return (
        <PostSection id="introduction">
            <AnchorHeading as="h2" id="introduction-heading">
                Introduction
            </AnchorHeading>
            <Stack>
                <p>
                    Building a scalable theming system for a component library requires deliberate structure and long-term thinking. Without that structure, theming is usually where things start to break — duplicated colors, leaky variants, and fragile dark mode overrides.
                </p>

                <p>
                    This post focuses on fixing that — not with another library, but by treating theming as a first-class concern and designing a <strong>theming system</strong> that scales alongside your component library.
                </p>

                <p>
                    <strong className="fun-underline">TL;DR</strong> — This is an <em>implementation-focused</em> look at building the foundation of a scalable theming system, with the decisions and trade-offs behind each layer explained —
                    theming is no longer a convention — it is a set of contracts that your UI can rely on.
                </p>
            </Stack>
        </PostSection>
    )
}