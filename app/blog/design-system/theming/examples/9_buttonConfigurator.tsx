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

function paintIncludes(
    paint: string | string[] | undefined,
    channel: string
) {
    if (!paint) return false;
    return Array.isArray(paint)
        ? paint.includes(channel)
        : paint.split(" ").includes(channel);
}

type PaintMessage = {
    id: string;
    when: (state: {
        variant?: string;
        appearance?: string;
        paint?: string | string[];
    }) => boolean;
    tone: "info" | "warning";
    title: string;
    body: string;
};

export const PAINT_MESSAGES: PaintMessage[] = [
    {
        id: "filled-foreground-only",
        when: ({ appearance, paint }) =>
            appearance === "filled" &&
            paintIncludes(paint, "foreground") &&
            !paintIncludes(paint, "background"),
        tone: "warning",
        title: "Why did the text disappear?",
        body:
            "Filled appearances use a light foreground color intended for use on a painted background. " +
            "When only the foreground channel is painted, there’s no background to provide contrast."
    },

    {
        id: "variant-without-appearance",
        when: ({ variant, appearance }) =>
            Boolean(variant) && !appearance,
        tone: "info",
        title: "Variant without appearance",
        body:
            "Variants define semantic values, but appearances map those values to styling tokens. " +
            "Without an appearance, there’s nothing to apply visually."
    },
    {
        id: "variant-no-appearance-foreground",
        when: ({ variant, appearance, paint }) =>
            Boolean(variant) &&
            !appearance &&
            paintIncludes(paint, "foreground"),
        tone: "info",
        title: "Variant selected without appearance",
        body:
            "Variants define semantic values, but appearances decide how those values are mapped to styling tokens. " +
            "When a variant is used without an appearance, the foreground color may not contrast with the surface."
    },
    {
        id: "paint-without-values",
        when: ({ paint, variant, appearance }) =>
            Boolean(paint) && !variant && !appearance,
        tone: "info",
        title: "Paint applies existing values",
        body:
            "Paint applies styling tokens, but it doesn’t define them. " +
            "Without a variant or appearance, there are no values to apply."
    },

    {
        id: "outlined-background-only",
        when: ({ appearance, paint }) =>
            appearance === "outlined" &&
            paintIncludes(paint, "background") &&
            !paintIncludes(paint, "foreground") &&
            !paintIncludes(paint, "border"),
        tone: "info",
        title: "Background-only paint with outlined appearance",
        body:
            "Outlined appearances typically rely on foreground or border paint. " +
            "Background-only paint may produce little or no visible change."
    }
];


export default function ButtonConfigurator() {
    const [variant, setVariant] = useState<ButtonProps['variant']>()
    const [appearance, setAppearance] = useState<ButtonProps['variantAppearance']>()
    const [paint, setPaint] = useState<ButtonProps['paint']>()

    const activeMessages = PAINT_MESSAGES.filter(msg =>
        msg.when({ variant, appearance, paint })
    );

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
            className="flow-4 py-8 px-4 appearanceExamples surface-frame"
        >
            <Heading as="h3" headingSize={4} className="center">
                Button Configurator
            </Heading>

            <Stack gap={8} >

                {/* Controls */}
                <Block className="mx-auto appearanceExamples__select-group">
                    <Select
                        id="variant-select"
                        labelChildren="Variant"
                        className="appearanceExamples__select-group--select"
                        options={variants}
                        value={variant}
                        onChange={handleSetVariant}
                    />

                    <Select
                        id="appearance-select"
                        labelChildren="Appearance"
                        className="appearanceExamples__select-group--select"
                        options={appearances}
                        value={appearance}
                        onChange={handleSetAppearance}
                    />
                    <Select
                        id="paint-select"
                        labelChildren="Paint"
                        className="appearanceExamples__select-group--select"
                        options={paints}
                        value={paint}
                        onChange={handleSetPaint}
                    />
                </Block>

                <span style={{ width: "fit-content", marginInline: "auto" }}>
                    <Button
                        variant={variant}
                        variantAppearance={appearance}
                        paint={paint}
                        style={{ width: "fit-content" }}
                    >
                        Click Me
                    </Button>
                </span>
                <Block role="status"
                    aria-live="polite"
                    className="flow-4">
                    <p className="text-sm center "> 5 variants * 4 appearances * 6 paint options = 120 possible combinations</p>
                    {activeMessages.length === 0 ? (
                        <PostInfo className="mx-auto center" variant="muted">
                            Adjust the controls above to explore how variant, appearance, and paint interact.
                        </PostInfo>
                    ) : (
                        activeMessages.map(message => (
                            <PostInfo as="div" className="mx-auto" key={message.id} variant={message.tone}>
                                <p><strong>{message.title}</strong></p>
                                <p>{message.body}</p>
                            </PostInfo>
                        ))
                    )}
                </Block>
            </Stack>

            <figcaption className="text-sm text-muted italic">
                Variants provide meaning, appearances control treatment, and paint applies styling.
                Changing any layer updates the result without changing the component.
            </figcaption>
        </Block>
    )
}