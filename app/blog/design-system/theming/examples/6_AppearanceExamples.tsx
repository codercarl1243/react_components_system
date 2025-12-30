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
     { value: 'tonal', label: 'Tonal' },
    { value: 'ghost', label: 'Ghost' }
];

const paints = [
    { value: '', label: 'None (default)' },
    { value: 'foreground', label: 'Foreground' },
    { value: 'background', label: 'Background' },
    { value: 'border', label: 'Border' },
    { value: 'surface', label: 'Surface' },
    { value: 'all', label: 'All' },
]

export default function ButtonConfigurator() {
    const [variant, setVariant] = useState<ButtonProps['variant']>()
    const [appearance, setAppearance] = useState<ButtonProps['variantAppearance']>()
    const [paint, setPaint] = useState<ButtonProps['paint']>()

    const handleSetVariant = (event: ChangeEvent<HTMLSelectElement>) => {
        if (event.currentTarget.value === '') setVariant(undefined);
        setVariant(event.currentTarget.value as ButtonProps['variant']);
    }

    const handleSetAppearance = (event: ChangeEvent<HTMLSelectElement>) => {
        if (event.currentTarget.value === '') setAppearance(undefined);
        setAppearance(event.currentTarget.value as ButtonProps['variantAppearance']);
    }
    const handleSetPaint = (event: ChangeEvent<HTMLSelectElement>) => {
        if (event.currentTarget.value === '') setPaint(undefined);
        setPaint(event.currentTarget.value as ButtonProps['paint']);
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
                Button Configurator
            </Heading>

            <Stack gap={4} >
                <p>
                    5 variants * 4 appearances * 6 paint options = 120 possible combinations
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
                    <Select
                        id="paint-select"
                        labelChildren="Paint:"
                        options={paints}
                        value={paint}
                        onChange={handleSetPaint}
                    />

                </Inline>
                <Button
                    variant={variant}
                    variantAppearance={appearance}
                    paint={paint}
                    style={{ width: "fit-content" }}
                >
                    Click Me
                </Button>
                <p>variant: {variant}</p>
                <p>appearance: {appearance}</p>
                <p>paint: {paint}</p>
            </Stack>

            <figcaption className="text-sm text-muted italic">
                Variants provide meaning, appearances control treatment, and paint applies styling.
                Changing any layer updates the result without changing the component.
            </figcaption>
        </Block>
    )
}