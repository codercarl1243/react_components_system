import Code from "@/components/code";
import InlineCode from "@/components/code/inlineCode";
import Icon from "@/components/icon";
import { Inline, Row, Stack } from "@/components/primitives";
import { RiCodeSSlashFill, RiPaletteFill, RiPuzzleFill } from "@remixicon/react";


export default function token_flow_diagram() {

    return (
        <Inline
            as="figure"
            gap={8}
            align="stretch"
            className="theming-diagram"
            variant="info"
            variantAppearance="primitive"
            wrap
        >
            <Stack
                gap={4}
                className="theming-diagram-box"
                variant="primary"
                variantAppearance="primitive"
            >
                <Row as="strong"><Icon icon={RiPaletteFill} color="var(--color-primary-400)" />Global Design Tokens</Row>
                <InlineCode codeString={`--color-primary-400
--color-secondary-400`} lang="css" />
            </Stack>
            <Stack
                gap={4}
                className="theming-diagram-box"
                variant="secondary"
                variantAppearance="primitive"
            >
                <Row as="strong" gap={2}><Icon icon={RiCodeSSlashFill} color="var(--color-secondary-400)" />Variant Tokens</Row>
                <InlineCode codeString={`--background-color
--foreground-color`} lang="css" />
            </Stack>
            <Stack
                gap={8}
                className="theming-diagram-box theming-diagram__component-layer"
                variant="accent"
                variantAppearance="primitive"
            >
                <Row as="strong" gap={2}><Icon icon={RiPuzzleFill} color="var(--color-accent-400)" />Component Layer</Row>
                <Stack
                    gap={4}
                    className="theming-diagram-box">
                    <Row as="strong">Component Tokens</Row>
                    <InlineCode codeString={`--button-background-color
--button-foreground-color`} lang="css" />
                </Stack>
                <Stack
                    gap={4}
                    className="theming-diagram-box">
                    <Row as="strong">Component Styles</Row>
                    <InlineCode codeString={`background-color: var(--button-background-color);
color: var(--button-foreground-color);`} lang="css" />
                </Stack>
            </Stack>
            <figcaption className="italic">
                The three-layer token architecture: values flow from global, to Variants, and down to the component layer
            </figcaption>
        </Inline>
    )
}