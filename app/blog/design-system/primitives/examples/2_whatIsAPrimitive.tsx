import Heading from "@/components/heading"
import Icon from "@/components/icon"
import List from "@/components/list"
import { Inline, Stack } from "@/components/primitives"


function Html() {
    return (
        <Stack
            variant="primary"
            variantAppearance="tonal"
            paint="surface"
            className="surface-frame p-4 htmlVsPrimitives__example__box"
            justify="center">
            <Heading as="h3">Document Structure</Heading>
            <p><strong>HTML</strong></p>
            <List as="ul" marker="none" spacing="tight">
                <li>Document hierarchy</li>
                <li>Content meaning & relationships</li>
                <li>Landmarks</li>
            </List>
        </Stack>
    )
}

function Primitives() {

    return (
        <Stack
            variant="secondary"
            variantAppearance="tonal"
            paint="surface"
            className="surface-frame p-4 htmlVsPrimitives__example__box"
            justify="center">
            <Heading as="h3">Layout Responsibility</Heading>
            <p><strong>Primitives</strong></p>
            <List as="ul" marker="none" spacing="tight">
                <li>Who <strong>owns</strong> layout decisions</li>
                <li>Where <strong>boundaries</strong> are enforced</li>
                <li>How <strong>structure</strong> is composed</li>
            </List>
        </Stack>
    )
}

export default function HTMLvsPrimitives() {
    return (
        <Inline
            as="figure"
            wrap
            justify="center"
            className="htmlVsPrimitives__example surface-frame p-8 "
            variant="neutral"
            variantAppearance="tonal"
            paint="all"
        >
            <Html />
            <Primitives />
            <figcaption>
                HTML defines document semantics. Primitives define layout responsibility.
            </figcaption>
        </Inline>
    )
}