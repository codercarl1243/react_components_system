'use client';
import Button from "@/components/button";
import { ButtonProps } from "@/components/button/button.type"
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
            variant="accent"
            variantAppearance="tonal"
            paint="border"
            className="flow-4 appearanceExamples surface-frame"
        >
            <Heading as="h3" headingSize={4} className="center">
                Variant x Appearance Configurator
            </Heading>

            <Stack gap={4} >
                <p className="text-sm">
                    <strong>Variants</strong> define <em>which colors</em> to use.
                    <strong>Appearances</strong> define <em>how</em> to apply them.
                </p>
                <PostInfo variant="muted">
                    Select different combinations to see how the same component adapts.
                    Notice how each variant maintains its color identity across all appearances.
                </PostInfo>
                {/* Controls */}
                <Inline gap={4} wrap>

                    <Select
                        id="variant-select"
                        labelChildren="Variant:"
                        options={variants}
                        value={variant}
                        onChange={handleSetVariant}
                    />

                    <Select
                        id="appearance-select"
                        labelChildren="Appearance:"
                        options={appearances}
                        value={appearance}
                        onChange={handleSetAppearance}
                    />

                </Inline>

                {/* Live Preview */}
                <Button
                    variant={variant}
                    variantAppearance={appearance}
                    style={{width: "fit-content"}}
                >

                        {variant ? variant.charAt(0).toUpperCase() + variant.slice(1) : 'Plain'}{' '}+{' '} 
                        {appearance ? appearance.charAt(0).toUpperCase() + appearance.slice(1) : 'Plain'}
                </Button>
            </Stack>

            <figcaption className="text-sm text-muted italic">
                5 variants x 3 appearances = 15 visual styles from a single component!
            </figcaption>
        </Block>
    )
}