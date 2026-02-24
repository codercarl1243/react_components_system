import { DoubleArrow } from "@/components/arrow";
import { Stack, Row, Inline, Block } from "@/components/primitives";


export default function PrimitiveOwnershipDiagram() {

    return (
        <Stack
            as="figure"
            gap={16}
            align="stretch"
            className="primitive-diagram surface-frame text-sm p-4"
            variant="neutral"
            variantAppearance="filled"
            paint="all"
        >
            <Stack >
                <p><strong>Stack</strong> - owns the <span className="fun-underline">vertical</span> layout surface</p>
                <Row>
                    <Stack gap={4}
                        className="surface-frame p-2 frame-inset-2 primitive-diagram-box"
                        variant="primary"
                        variantAppearance="tonal"
                        justify="stretch"
                        paint="all">
                        <Block as="span" variant="secondary" variantAppearance="tonal" paint="all" className="primitive-diagram-box__child surface-frame">Child A</Block>
                        <Block as="span" variant="secondary" variantAppearance="tonal" paint="all" className="primitive-diagram-box__child surface-frame">Child B</Block>
                        <Block as="span" variant="secondary" variantAppearance="tonal" paint="all" className="primitive-diagram-box__child surface-frame">Child C</Block>
                    </Stack>
                    <DoubleArrow orientation="vertical" />

                </Row>
            </Stack>
            <Stack >
                <p><strong>Row</strong> - owns the <span className="fun-underline">horizontal</span> layout surface</p>
                <Stack>
                    <Row gap={4}
                        className="surface-frame p-2 frame-inset-2 primitive-diagram-box"
                        variant="primary"
                        variantAppearance="tonal"
                        paint="all">
                        <Block as="span" variant="secondary" variantAppearance="tonal" paint="all" className="primitive-diagram-box__child surface-frame">Child A</Block>
                        <Block as="span" variant="secondary" variantAppearance="tonal" paint="all" className="primitive-diagram-box__child surface-frame">Child B</Block>
                        <Block as="span" variant="secondary" variantAppearance="tonal" paint="all" className="primitive-diagram-box__child surface-frame">Child C</Block>
                        <p className="ml-auto mr-4">Expands to take up available space</p>
                    </Row>
                    <DoubleArrow />
                </Stack>
            </Stack>
            <Stack >
                <p><strong>Inline</strong> - flows with content</p>
                <Row
                    className="surface-frame p-2 mb-12 frame-inset-2 primitive-diagram-box inline-example"
                    variant="muted"
                    variantAppearance="tonal"
                    paint="all">
                    <Inline gap={4}
                        className="surface-frame p-2 frame-inset-2 primitive-diagram-box"
                        variant="primary"
                        variantAppearance="tonal"
                        paint="all">
                        <Block as="span" variant="secondary" variantAppearance="tonal" paint="all" className="primitive-diagram-box__child surface-frame">Child A</Block>
                        <Block as="span" variant="secondary" variantAppearance="tonal" paint="all" className="primitive-diagram-box__child surface-frame">Child B</Block>
                        <Block as="span" variant="secondary" variantAppearance="tonal" paint="all" className="primitive-diagram-box__child surface-frame">Child C</Block>
                        <DoubleArrow />
                    </Inline>
                    <p>Remaining space - not owned</p>
                </Row>
            </Stack>
            <figcaption className="italic text-sm">
                Each primitive owns a distinct structural surface: vertical (Stack), horizontal (Row), or flow-based (Inline).
            </figcaption>
        </Stack>
    )
}