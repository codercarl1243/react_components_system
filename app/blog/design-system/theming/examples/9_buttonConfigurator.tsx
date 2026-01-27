'use client';
import Button from "@/components/button";
import Heading from "@/components/heading"
import PostInfo from "@/components/post/post.info"
import { Block, Stack } from "@/components/primitives"
import Select from "@/components/select"
import type { Paint, PaintChannel, PaintPreset } from "@/types/paint";
import type { VariantAppearance, Variant } from "@/types/variant";
import { type ChangeEvent, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// The demo allows an empty string of ‘', but the real typing does not.
type ExampleAppearance = VariantAppearance | '';
type ExampleVariant = Variant | '';
type ExamplePaint = PaintPreset | PaintChannel | '';

type PaintState = {
    variant?: ExampleVariant;
    appearance?: ExampleAppearance;
    paint: ExamplePaint;
}

type PaintMessage = {
    id: string;
    when: (state: PaintState) => boolean;
    tone: "info" | "warning";
    title: string;
    body: string[] | ((state: PaintState) => string[]);
};


const variants: { value: ExampleVariant; label: string }[] = [
    { value: '', label: 'None (default)' },
    { value: 'primary', label: 'Primary' },
    { value: 'secondary', label: 'Secondary' },
    { value: 'accent', label: 'Accent' },
    { value: 'danger', label: 'Danger' },
    { value: 'success', label: 'Success' }
];

const appearances: { value: ExampleAppearance; label: string }[] = [
    { value: '', label: 'None (default)' },
    { value: 'filled', label: 'Filled' },
    { value: 'outlined', label: 'Outlined' },
    { value: 'tonal', label: 'Tonal' },
    { value: 'ghost', label: 'Ghost' }
];

const paints: { value: ExamplePaint; label: string }[] = [
    { value: '', label: 'None (default)' },
    { value: 'foreground', label: 'Foreground' },
    { value: 'background', label: 'Background' },
    { value: 'border', label: 'Border' },
    { value: 'surface', label: 'Surface' },
    { value: 'all', label: 'All' },
]

function paintIncludes(
    paint: ExamplePaint,
    channel: string
) {
    if (!paint) return false;
    return Array.isArray(paint)
        ? paint.includes(channel)
        : paint.split(" ").includes(channel);
}

export const PAINT_MESSAGES: PaintMessage[] = [
    {
        id: "filled-foreground-only",
        // Warn when user has selected appearance or variant or paint and text would not be visible
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
        body: ({ paint }) => {
            const hasForeground = paintIncludes(paint, "foreground");
            const hasBorder = paintIncludes(paint, "border");
            let paintedParts: string;

            if (hasForeground && hasBorder) {
                paintedParts = "the text and the border";
            } else if (hasForeground) {
                paintedParts = "the text";
            } else if (hasBorder) {
                paintedParts = "the border";
            } else {
                paintedParts = "part of the button";
            }

            return [
                `This style expects light text to be shown on a painted background.`,
                `Right now you're painting ${paintedParts}, but not the background, so there's nothing for the text to contrast against.`,
                `Try adding background paint or choose a different appearance to make the text readable.`
            ]
        }
    },

    {
        id: "variant-without-paint",
        when: ({ variant, paint }) =>
            Boolean(variant) && !paint,
        tone: "info",
        title: "You picked a variant, but no paint has been applied",
        body: [
            "The variant sets what the button means, like primary or danger.",
            "But without paint, there's nothing on the canvas to show that meaning.",
            "Choose a paint to see the variant take effect."
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
        title: "appearance chosen, but no context given",
        body: [
            "You've picked how the button should look (appearance) and where to apply it (paint).",
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

function toButtonPaint(paint: ExamplePaint): Paint | undefined {
    if (!paint) return undefined;

    // Presets must be passed directly
    if (paint === 'all' || paint === 'surface') {
        return paint;
    }

    // Channels must be wrapped
    return [paint];
}

export default function ButtonConfigurator() {
    const [variant, setVariant] = useState<ExampleVariant>('')
    const [appearance, setAppearance] = useState<ExampleAppearance>('')
    const [paint, setPaint] = useState<ExamplePaint>('')

    // Show the most important messages, limited to 2
    const activeMessages = PAINT_MESSAGES.filter(msg =>
        msg.when({ variant, appearance, paint })
    ).sort((a, b) => {
        if (a.tone === 'warning' && b.tone !== 'warning') return -1;
        if (a.tone !== 'warning' && b.tone === 'warning') return 1;
        return 0;
    })
        .slice(0, 2);

    const handleSetVariant = (event: ChangeEvent<HTMLSelectElement>) => {
        setVariant(event.currentTarget.value as ExampleVariant);
    }

    const handleSetAppearance = (event: ChangeEvent<HTMLSelectElement>) => {
        setAppearance(event.currentTarget.value as ExampleAppearance);
    }
    const handleSetPaint = (event: ChangeEvent<HTMLSelectElement>) => {
        setPaint(event.currentTarget.value as ExamplePaint);
    }
    const shouldReduceMotion = useReducedMotion();


    const Controls = () => {
        return (
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
        )
    }

    const ButtonExample = () => {
        return (
            <span className="appearanceExamples__button-wrapper" style={{ width: "fit-content", marginInline: "auto" }}>
                <Button
                    variant={variant || undefined}
                    appearance={appearance || undefined}
                    paint={toButtonPaint(paint)}
                    style={{ width: "fit-content" }}
                >
                    Example Button
                </Button>
            </span>
        )
    }

    const Messages = () => {
        return (
            <Block role="status"
                aria-live="polite"
                className="flow-4">
                <PostInfo className="mx-auto center" variant="info" paint={["foreground"]}>
                    Adjust the controls above to explore how variant, appearance, and paint interact.
                </PostInfo>
                <AnimatePresence>
                    {
                        activeMessages.map((message, index) => {
                            const lines =
                                typeof message.body === "function"
                                    ? message.body({ variant, appearance, paint })
                                    : message.body;

                            return (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    transition={{ duration: shouldReduceMotion ? 0 : 0.18, delay: index * 0.05, ease: "easeOut" }}>
                                    <PostInfo as="div" paint={["background", "foreground"]} className="mx-auto flow-6" key={message.id} variant={message.tone}>
                                        <p><strong>{message.title}</strong></p>
                                        {lines.map((line, index) => <p key={`${message.id}-${index}`}>{line}</p>)}
                                    </PostInfo>
                                </motion.div>
                            )
                        })
                    }
                </AnimatePresence>
            </Block>
        )
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
                <Controls />
                <ButtonExample />
                <Messages />
            </Stack>
        </Block>
    )
}