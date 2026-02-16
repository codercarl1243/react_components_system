import InlineCode from "@/components/code/inlineCode";
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
                    As systems scale, styling becomes fragile. Components begin to accidentally depend on inherited typography, ambient color, or environmental spacing. What starts as convenience slowly turns into unpredictability.
                </p>
                <p>
                    In the previously post in this series we created a system that ensured styling flows through a layered pipeline:
                </p>
                <InlineCode
                    codeString={`tokens → theme → variant → appearance → paint → component`}
                />
                <p>
                    But there is an important architectural question:
                </p>
                <blockquote>
                    Where does environmental styling stop, and component ownership begin?
                </blockquote>
                <p>
                    That transition point is the <InlineCode codeString="<Block />" />
                    primitive.
                </p>
{/* TODO: wrte a TLDR for the primitive block component and how this post is going to explain it */}
                <p>
                    <strong className="fun-underline">TL;DR</strong> — This is an <em>implementation-focused</em> look at building the foundation of a scalable theming system, with the decisions and trade-offs behind each layer explained —
                    theming is no longer a convention — it is a set of contracts that your UI can rely on.
                </p>
            </Stack>
        </PostSection>
    )
}