import InlineCode from "@/components/code/inlineCode";
import Icon from "@/components/icon";
import { Inline, Row, Stack } from "@/components/primitives";
import { RiCodeSSlashFill, RiPaletteFill, RiPuzzleFill } from "@remixicon/react";


export default function token_flow_diagram() {

    return (
        <Inline
            as="figure"
            gap={16}
            align="start"
            className="theming-diagram"
            wrap
        >
            <Stack
                gap={4}
                className="theming-diagram-box">
                <Row>
                    <Icon icon={RiPaletteFill} color="var(--color-primary-400)" />
                    <strong>Global Design Tokens</strong>
                </Row>
                <InlineCode codeString="--color-primary-400" lang="css" />
                <InlineCode codeString="--color-secondary-400" lang="css" />
            </Stack>
            <Stack
                gap={4}
                className="theming-diagram-box">
                <Row><strong><Icon icon={RiCodeSSlashFill} color="var(--color-secondary-400)" /> Variant Tokens</strong></Row>
                <InlineCode codeString="--background-color" lang="css" />
                <InlineCode codeString="--foreground-color" lang="css" />
            </Stack>
            <Stack
                gap={4}
                className="theming-diagram-box theming-diagram__component-layer">
                <Row><strong><Icon icon={RiPuzzleFill} color="var(--color-accent-400)" />Component Layer</strong></Row>
                <Stack
                    gap={4}
                    className="theming-diagram-box">
                    <strong>Component Tokens</strong>
                    <InlineCode codeString="--button-background-color" lang="css" />
                    <InlineCode codeString="--button-foreground-color" lang="css" />
                </Stack>
                <Stack
                    gap={4}
                    className="theming-diagram-box">
                    <strong>Component Styles</strong>
                    <InlineCode codeString="background-color: var(--button-background-color)" lang="css" />
                    <InlineCode codeString="color: var(--button-foreground-color)" lang="css" />
                </Stack>
            </Stack>
            <figcaption>
                The three-layer token architecture: values flow from global, to Variants, and down to the component layer
            </figcaption>
        </Inline>
    )
}