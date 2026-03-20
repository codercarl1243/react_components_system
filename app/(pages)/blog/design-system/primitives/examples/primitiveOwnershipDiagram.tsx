import { DoubleArrow } from "@/components/arrow";
import { Stack, Inline, Block } from "@/components/primitives";

export default function PrimitiveOwnershipDiagram() {
    return (
        <Stack
            as="figure"
            gap={16}
            align="stretch"
            className="primitive-diagram frame-inset-4 text-sm p-lg"
            variant="neutral"
            variantAppearance="filled"
            paint={["background", "foreground"]}
        >
            <div className="primitive-diagram-resizable surface-frame p-lg pb-2xl">
                <Stack>
                    <p><strong>Stack</strong> - owns the <span className="fun-underline">vertical</span> layout surface</p>
                    <div style={{ display: "flex", gap: "var(--spacing-md)" }}>
                        <Stack
                            gap={4}
                            className="surface-frame p-sm frame-inset-2 primitive-diagram-box"
                            variant="primary"
                            variantAppearance="tonal"
                            justify="stretch"
                            paint="all"
                        >
                            <Block as="span" variant="secondary" variantAppearance="tonal" paint="all" className="primitive-diagram-box__child child--a surface-frame">Child A</Block>
                            <Block as="span" variant="secondary" variantAppearance="tonal" paint="all" className="primitive-diagram-box__child child--b surface-frame">Child B</Block>
                            <Block as="span" variant="secondary" variantAppearance="tonal" paint="all" className="primitive-diagram-box__child child--c surface-frame">Child C</Block>
                        </Stack>
                        <DoubleArrow orientation="vertical" />
                    </div>
                </Stack>

                <Stack>
                    <p><strong>Inline</strong> - flows with content</p>
                    <Block
                        className="surface-frame p-sm mb-12 frame-inset-2 primitive-diagram-box inline-example"
                        variant="muted"
                        variantAppearance="tonal"
                        paint="all"
                        style={{ display: "flex", gap: "var(--spacing-md)", alignItems: "center" }}
                    >
                        <Inline
                            gap={4}
                            className="surface-frame p-sm frame-inset-2 primitive-diagram-box"
                            variant="primary"
                            variantAppearance="tonal"
                            paint="all"
                        >
                            <Block as="span" variant="secondary" variantAppearance="tonal" paint="all" className="primitive-diagram-box__child child--a surface-frame">Child A</Block>
                            <Block as="span" variant="secondary" variantAppearance="tonal" paint="all" className="primitive-diagram-box__child child--b surface-frame">Child B</Block>
                            <Block as="span" variant="secondary" variantAppearance="tonal" paint="all" className="primitive-diagram-box__child child--c surface-frame">Child C</Block>
                            <DoubleArrow />
                        </Inline>
                        <p>Remaining space - not owned</p>
                    </Block>
                </Stack>
            </div>
            <figcaption className="italic text-sm pl-lg">
                Each primitive owns a distinct structural surface: vertical rhythm (Stack) or flow-based (Inline).
            </figcaption>
        </Stack>
    )
}