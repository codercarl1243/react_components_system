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
                    Not every component in a design system is meant to be visible.
                </p>

                <p>
                    Some components don't render buttons, cards, or forms.
                    They define structure.
                </p>

                <p>
                    These are called primitives.
                </p>

                <p>
                    A primitive is a minimal structural component that encodes layout intent
                    without owning visual styling.
                </p>

                <p>
                    Instead of scattering spacing, alignment, and flow decisions across arbitrary HTML,
                    primitives make layout deliberate and repeatable.
                </p>

                <p>
                    <strong className="fun-underline">TL;DR</strong> — Primitives are structural building blocks.
                    They make layout intent explicit, reduce duplication, and create consistent composition patterns as your UI grows.
                </p>
            </Stack>
        </PostSection>
    )
}