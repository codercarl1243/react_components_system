'use client';
import Button from "@/components/button";
import { ButtonProps } from "@/components/button/button.type"
import Heading from "@/components/heading"
import PostInfo from "@/components/post/post.info"
import { Block, Stack } from "@/components/primitives"
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
    body: string[];
};

// export const PAINT_MESSAGES: PaintMessage[] = [
//     {
//         id: "filled-foreground-only",
//         when: ({ appearance, paint }) =>
//             appearance === "filled" &&
//             paintIncludes(paint, "foreground") &&
//             !paintIncludes(paint, "background"),
//         tone: "warning",
//         title: "Why did the text disappear?",
//         body: [
//             "Filled appearances use a light foreground color intended for use on a painted background.",
//             "When only the foreground channel is painted, there's no background to provide contrast."
//         ]
//     },
//     {
//         id: "variant-without-appearance",
//         when: ({ variant, appearance }) =>
//             Boolean(variant) && !appearance,
//         tone: "info",
//         title: "Variant without appearance",
//         body: [
//             "Variants define semantic values, but appearances map those values to styling tokens.",
//             "Without an appearance, there's nothing to apply visually."
//         ]
//     },
//     {
//         id: "variant-no-appearance-foreground",
//         when: ({ variant, appearance, paint }) =>
//             Boolean(variant) &&
//             !appearance &&
//             paintIncludes(paint, "foreground"),
//         tone: "info",
//         title: "Variant selected without appearance",
//         body: [
//             "Variants define semantic values, but appearances decide how those values are mapped to styling tokens.",
//             "When a variant is used without an appearance, the foreground color may not contrast with the surface."
//         ]

//     },
//     {
//         id: "paint-without-values",
//         when: ({ paint, variant, appearance }) =>
//             Boolean(paint) && !variant && !appearance,
//         tone: "info",
//         title: "Paint applies existing values",
//         body: [
//             "Paint applies styling tokens, but it doesn't define them.",
//             "Without a variant or appearance, there are no values to apply."
//         ]

//     },
//     {
//         id: "outlined-background-only",
//         when: ({ appearance, paint }) =>
//             appearance === "outlined" &&
//             paintIncludes(paint, "background") &&
//             !paintIncludes(paint, "foreground") &&
//             !paintIncludes(paint, "border"),
//         tone: "info",
//         title: "Background-only paint with outlined appearance",
//         body: [
//             "Outlined appearances typically rely on foreground or border paint.",
//             "Background-only paint may produce little or no visible change."
//         ]
//     },
//     {
//     id: "variant-appearance-without-paint",
//     when: ({ variant, appearance, paint }) =>
//         Boolean(variant) &&
//         Boolean(appearance) &&
//         !paint,
//     tone: "info",
//     title: "Variant and appearance selected, but no paint",
// body: [
//     "You've chosen a variant and an appearance, but you haven't told the system where to apply them.",
//     "Paint controls which parts of the button are styled, such as the text, background, or border.",
//     "Select a paint option to see the appearance take effect."
// ]

// },
// {
//     id: "appearance-without-variant-with-paint",
//     when: ({ variant, appearance, paint }) =>
//         !variant && Boolean(appearance) && Boolean(paint),
//     tone: "info",
//     title: "Appearance selected without variant",
//     body: [
//         "Appearances define how values are treated, but they don't define the values themselves.",
//         "Paint decides which styling channels are affected, but without a variant there is no semantic color to apply."
//     ]
// },
// {
//     id: "appearance-only-no-variant-no-paint",
//     when: ({ variant, appearance, paint }) =>
//         !variant && Boolean(appearance) && !paint,
//     tone: "info",
//     title: "Appearance selected, but nothing to style",
//     body: [
//         "Appearances control how styles are applied, but they don't choose any colors or channels by themselves.",
//         "Add a variant to provide a semantic value, and paint to choose where it should be applied."
//     ]
// },

// ];

export const PAINT_MESSAGES: PaintMessage[] = [
    {
        id: "filled-foreground-only",
        when: ({ appearance, paint }) => {
            // 1) Which appearances behave like "filled-style" in your system?
            // - filled: yes
            // - default (no appearance): yes (your default uses filled colors)
            // - outlined: only include this if outlined ALSO uses filled-style foreground in your design
            const isFilledStyle =
                appearance === "filled" ||
                !appearance ||
                appearance === "outlined"; // <- keep ONLY if it truly behaves like filled colors

            // 2) What did the user ask to paint?
            const hasForeground = paintIncludes(paint, "foreground");
            const hasBorder = paintIncludes(paint, "border");

            // 3) Background (or background-providing channels)
            const hasBackground = paintIncludes(paint, "background");
            const hasSurface = paintIncludes(paint, "surface"); // if "surface" implies background contrast
            const hasAll = paintIncludes(paint, "all");         // all includes background

            // 4) Warning condition:
            // - User is painting something visible (foreground or border)
            // - But they did NOT paint a background-like channel
            // - And we are in a filled-style context
            const isPaintingVisibleParts = hasForeground || hasBorder;
            const hasAnyBackgroundLikePaint = hasBackground || hasSurface || hasAll;

            return isFilledStyle && isPaintingVisibleParts && !hasAnyBackgroundLikePaint;
        },
        tone: "warning",
        title: "Why is there no text?",
        body: [
            "This style expects light text to be shown on a painted background.",
            "Right now you're painting the text or border, but not the background, so there's nothing for the text to contrast against.",
            "Try adding background paint or choose a different appearance to make the text readable."
        ]
    },

    {
        id: "variant-without-appearance",
        when: ({ variant, appearance }) =>
            Boolean(variant) && !appearance,
        tone: "info",
        title: "You picked a variant, but no style",
        body: [
            "The variant sets what the button means, like primary or danger.",
            "But without an appearance, there's no visual style to show that meaning.",
            "Choose an appearance to see the variant take effect."
        ]
    },

    {
        id: "variant-no-appearance-foreground",
        when: ({ variant, appearance, paint }) =>
            Boolean(variant) &&
            !appearance &&
            paintIncludes(paint, "foreground"),
        tone: "info",
        title: "Color chosen, but no appearance",
        body: [
            "You've chosen a variant and applied color to the text.",
            "Without an appearance, the system doesn't know how to treat that color.",
            "Pick an appearance to control how the text should look."
        ]
    },

    {
        id: "paint-without-values",
        when: ({ paint, variant, appearance }) =>
            Boolean(paint) && !variant && !appearance,
        tone: "info",
        title: "Paint has nothing to work with",
        body: [
            "Paint decides which parts of the button get styled.",
            "But you haven't chosen any values for it to apply.",
            "Add a variant or an appearance to give paint something to work with."
        ]
    },

    {
        id: "outlined-background-only",
        when: ({ appearance, paint }) =>
            appearance === "outlined" &&
            paintIncludes(paint, "background") &&
            !paintIncludes(paint, "foreground") &&
            !paintIncludes(paint, "border"),
        tone: "info",
        title: "Outlined buttons don't use background much",
        body: [
            "Outlined styles usually rely on the text or border to be visible.",
            "With only background paint, the change can be very subtle or invisible.",
            "Try adding foreground or border paint to see the outline clearly."
        ]
    },

    {
        id: "variant-appearance-without-paint",
        when: ({ variant, appearance, paint }) =>
            Boolean(variant) &&
            Boolean(appearance) &&
            !paint,
        tone: "info",
        title: "Nothing knows where to apply the style",
        body: [
            "You've chosen what the button means and how it should look.",
            "But you haven't chosen which part of the button should be styled.",
            "Select a paint option like text, background, or border to see a result."
        ]
    },

    {
        id: "appearance-without-variant-with-paint",
        when: ({ variant, appearance, paint }) =>
            !variant && Boolean(appearance) && Boolean(paint),
        tone: "info",
        title: "Style chosen, but no meaning",
        body: [
            "You've picked how the button should look and where to apply it.",
            "But you haven't chosen what value to use for that style.",
            "Choose a variant to give the appearance something to work with."
        ]
    },

    {
        id: "appearance-only-no-variant-no-paint",
        when: ({ variant, appearance, paint }) =>
            !variant && Boolean(appearance) && !paint,
        tone: "info",
        title: "Nothing to style yet",
        body: [
            "You've chosen how the button should be treated.",
            "But there's no color and no target for that treatment yet.",
            "Add a variant to pick a value, and paint to choose where it should go."
        ]
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
        if (event.currentTarget.value === '') {
            setVariant(undefined);
            return;
        }
        setVariant(event.currentTarget.value as ButtonProps['variant']);
    }

    const handleSetAppearance = (event: ChangeEvent<HTMLSelectElement>) => {
        if (event.currentTarget.value === '') {
            setAppearance(undefined);
            return;
        }
        setAppearance(event.currentTarget.value as ButtonProps['variantAppearance']);
    }
    const handleSetPaint = (event: ChangeEvent<HTMLSelectElement>) => {
        if (event.currentTarget.value === '') {
            setPaint(undefined);
            return;
        }
        setPaint(event.currentTarget.value as ButtonProps['paint']);
    }

    return (
        <Block
            as="figure"
            variant="secondary"
            variantAppearance="outlined"
            paint="border"
            className="flow-4 py-8 px-4 appearanceExamples surface-frame frame-inset-8"
        >
            <Block
                as="figcaption"
                variant="secondary"
                variantAppearance="tonal"
                paint={["background", "foreground"]}
                className="text-sm italic px-4 py-2 surface-frame">
                Variants provide meaning, appearances control treatment, and paint applies styling.
                Changing any layer updates the result without changing the component.
            </Block>
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
                    <PostInfo className="mx-auto center" variant="info" paint={["foreground"]}>
                        Adjust the controls above to explore how variant, appearance, and paint interact.
                    </PostInfo>
                    {
                        activeMessages.map(message => (
                            <PostInfo as="div" paint={["background", "foreground"]} className="mx-auto flow-6" key={message.id} variant={message.tone}>
                                <p><strong>{message.title}</strong></p>
                                {message.body.map((line, index) => <p key={`${message.id}-${index}`}>{line}</p>)}
                            </PostInfo>
                        ))
                    }
                </Block>
            </Stack>
        </Block>
    )
}