'use client';
import Button from "@/components/button"
import { ButtonProps } from "@/components/button/button.type"
import Code from "@/components/code"
import Heading from "@/components/heading"
import PostInfo from "@/components/post/post.info"
import { Block, Inline, Stack } from "@/components/primitives"
import Select from "@/components/select"
import { ChangeEvent, useState } from "react"

const variants = [
    { value: '', label: 'None (default)' },
    { value: 'primary', label: 'Primary' },
    { value: 'secondary', label: 'Secondary' },
    { value: 'accent', label: 'Accent' },
    { value: 'danger', label: 'Danger' },
    { value: 'success', label: 'Success' }
];

const appearances = [
    { value: '', label: 'None (default)' },
    { value: 'filled', label: 'Filled' },
    { value: 'outlined', label: 'Outlined' },
    { value: 'ghost', label: 'Ghost' }
];

export default function AppearanceConfigurator() {
    const [variant, setVariant] = useState<ButtonProps['variant']>()
    const [appearance, setAppearance] = useState<ButtonProps['variantAppearance']>()

    const handleSetVariant = (event: ChangeEvent<HTMLSelectElement>) => {
        if (event.currentTarget.value === '') setVariant(undefined);
        setVariant(event.currentTarget.value as ButtonProps['variant']);
    }

    const handleSetAppearance = (event: ChangeEvent<HTMLSelectElement>) => {
        if (event.currentTarget.value === '') setAppearance(undefined);
        setAppearance(event.currentTarget.value as ButtonProps['variantAppearance']);
    }

    return (
        <Block
            as="figure"
            variant="neutral"
            variantAppearance="primitive"
            className="flow-4"
        >
            <Heading as="h3" headingSize={4} variant="neutral" className="center">
                Variant x Appearance Configurator
            </Heading>

            <Stack gap={4}>
                <p className="text-sm">
                    <strong>Variants</strong> define <em>which colors</em> to use.
                    <strong>Appearances</strong> define <em>how</em> to apply them.
                </p>
                <PostInfo>
                    Select different combinations to see how the same component adapts. 
                    Notice how each variant maintains its color identity across all appearances.
                </PostInfo>
                {/* Controls */}
                <Inline gap={4} wrap>

                    <Select
                        id="variant-select"
                        label="Variant:"
                        options={variants}
                        value={variant}
                        onChange={handleSetVariant}
                    />

                    <Select
                        id="appearance-select"
                        label="Appearance:"
                        options={appearances}
                        value={appearance}
                        onChange={handleSetAppearance}
                    />

                </Inline>

                {/* Live Preview */}
                <Stack
                    gap={2}
                    variant="neutral"
                    variantAppearance="primitive"
                    style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}
                >
                    <p className="text-sm text-muted">Result:</p>
                    <Button
                        variant={variant}
                        variantAppearance={appearance}
                    >
                        {variant ? variant.charAt(0).toUpperCase() + variant.slice(1) : 'Plain'} Button
                    </Button>
                </Stack>

                {/* Generated Code */}
                <Stack gap={2}>
                    {/* <Code
                        lang="html"
                        title="Generated code:"
                        copyEnabled={false}
                        highlightTokens={[variant || '', appearance || '']}
                        codeString={`<button 
    class="button" 
    data-variant="${variant}" 
    data-appearance="${appearance}"
>
    ${variant ? variant.charAt(0).toUpperCase() + variant.slice(1) : 'Plain'} Button
</button>`}
                    /> */}
                </Stack>
            </Stack>

            <figcaption className="text-sm text-muted italic">
                5 variants x 3 appearances = 15 visual styles from a single component!
            </figcaption>
        </Block>
    )
}