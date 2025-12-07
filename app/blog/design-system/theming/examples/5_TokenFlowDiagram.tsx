import Code from "@/components/code";
import Icon from "@/components/icon";
import Link from "@/components/link";
import PostInfo from "@/components/post/post.info";
import { Row, Stack } from "@/components/primitives";
import { RiArrowDownLongFill, RiCodeSSlashFill, RiPaletteFill, RiPuzzleFill } from "@remixicon/react";


export default function TokenFlowDiagram() {

    return (
        <>
            <Stack
                as="figure"
                gap={4}
                align="stretch"
                className="theming-diagram"
                variant="info"
                variantAppearance="primitive"
            >
                <Stack
                    gap={4}
                    className="theming-diagram-box"
                    variant="primary"
                    variantAppearance="primitive"
                    align="stretch"
                >
                    <Row as="strong" gap={2} className="theming-diagram-box--heading">
                        <Icon icon={RiPaletteFill} color="var(--color-primary-400)" />
                        Global Design Tokens
                        <Link
                            href="https://github.com/codercarl1243/react_components_system/blob/main/app/styles/tokens/colors.css"
                            aria-label="View colors.css on GitHub"
                        >
                            (colors.css)
                        </Link>
                    </Row>
                    <Code
                        copyEnabled={false}
                        codeString={`--color-primary-400: blue;
--color-primary-600: darkblue;
--color-neutral-100: white;`}
                        lang="css" />
                </Stack>
                <Stack
                    justify="center">
                    <Icon
                        icon={RiArrowDownLongFill}
                        size={42}
                        color="var(--color-primary-400)"
                    />
                </Stack>
                <Stack
                    gap={4}
                    className="theming-diagram-box"
                    variant="secondary"
                    variantAppearance="primitive"
                    align="stretch"
                >
                    <Row as="strong" gap={2} className="theming-diagram-box--heading">
                        <Icon icon={RiCodeSSlashFill} color="var(--color-secondary-400)" />
                        Variant Tokens
                        <Link
                            href="https://github.com/codercarl1243/react_components_system/blob/main/app/styles/design-system/variants.css"
                            className="text-sm"
                            aria-label="View variants.css on GitHub"
                        >
                            (variants.css)
                        </Link>
                    </Row>
                    <Code
                        highlightTokens={['var(--color-primary-400)', 'var(--color-neutral-100)', 'var(--color-primary-600)', 'var(--color-primary-100)']}
                        options={{ variant: 'primary' }}
                        copyEnabled={false}
                        codeString={`/* Variant palette (consumes global tokens) */
--variant-bg: var(--color-primary-400);
--variant-fg: var(--color-neutral-100);
--variant-border: var(--color-primary-600);
--variant-surface: var(--color-primary-100);

/* Semantic tokens (consumes variant palette) */
--background-color: var(--variant-bg);
--foreground-color: var(--variant-fg);
--border-color: var(--variant-border);
--surface-color: var(--variant-surface);`}
                        lang="css" />
                </Stack>
                <Stack
                    justify="center">
                    <Icon
                        icon={RiArrowDownLongFill}
                        size={42}
                        color="var(--color-secondary-400)"
                    />
                </Stack>
                <Stack
                    gap={8}
                    className="theming-diagram-box theming-diagram__component-layer"
                    variant="accent"
                    variantAppearance="primitive"
                    align="stretch"
                >
                    <Row as="strong" gap={2} className="theming-diagram-box--heading">
                        <Icon icon={RiPuzzleFill} color="var(--color-accent-400)" />
                        Component Layer
                        <Link
                            href="https://github.com/codercarl1243/react_components_system/blob/main/app/styles/components/buttons/button.css"
                            className="text-sm"
                            aria-label="View button.css on GitHub"
                        >
                            (button.css)
                        </Link>
                    </Row>
                    <Stack
                        gap={4}
                        className="theming-diagram-box"
                        variant="accent"
                        variantAppearance="filled"
                        align="stretch"
                    >
                        <Row as="strong" className="theming-diagram-box--heading">
                            Component Tokens
                        </Row>
                        <Code
                            copyEnabled={false}
                            highlightTokens={['var(--background-color)', 'var(--foreground-color)', 'var(--border-color)']}
                            options={{ variant: 'secondary' }}
                            codeString={`--button-background-color: var(--background-color);
--button-foreground-color: var(--foreground-color);
--button-border-color: var(--border-color);`}
                            lang="css" />
                    </Stack>
                    <Stack
                        gap={4}
                        className="theming-diagram-box"
                        align="stretch">
                        <Row as="strong" className="theming-diagram-box--heading">
                            Component Styles
                        </Row>
                        <Code
                            copyEnabled={false}
                            highlightTokens={['var(--button-background-color)', 'var(--button-foreground-color)', 'var(--button-border-color)']}
                            options={{ variant: 'accent' }}
                            codeString={`background: var(--button-background-color);
color: var(--button-foreground-color);
border: 1px solid var(--button-border-color);`}
                            lang="css" />
                    </Stack>
                </Stack>
                <figcaption className="italic">
                    The three-layer token architecture: values flow from global, to Variants, and down to the component layer
                </figcaption>
            </Stack>
            <PostInfo>
                Want to see this architecture applied to a complete component? The <Link href="/blog/design-system/buttons">Building a Button Component</Link> article walks through creating a production-ready button using this exact theming system, including variants, states, and accessibility considerations.
            </PostInfo>
        </>
    )
}