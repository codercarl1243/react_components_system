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
            // justify="center"
            gap={2}>
            <Heading as="h3" variant="primary" headingSize={5} className="m-0">Document Structure</Heading>
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
            // justify="center"
            gap={2}>
            <Heading as="h3" headingSize={5}>Layout Responsibility</Heading>
            <List as="ul" marker="none" spacing="tight">
                <li>Who owns layout decisions</li>
                <li>Where layout boundaries are enforced</li>
                <li>How structure is composed</li>
            </List>
        </Stack>
    )
}

export default function HTMLvsPrimitives() {
    return (
        <Stack
            as="figure"
            className="htmlVsPrimitives__example"
        >
            <Inline
                wrap
                justify="even"
                gap={2}
                className="htmlVsPrimitives__example__content"
            >
                <Html />
                <Primitives />
            </Inline>
            <figcaption className="htmlVsPrimitives__example__caption italic text-sm px-8">
                HTML defines document semantics. Primitives define layout responsibility.
            </figcaption>
        </Stack>
    )
}