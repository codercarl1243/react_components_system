import { Stack, Block, Inline } from "@/components/primitives";
import { Fragment } from "react/jsx-runtime";

type LineHeightExample = {
    label: string;
    fontSize: string;
    lineHeight: string;
    text: string;
};

const examples: LineHeightExample[] = [
    {
        label: "--line-height-tight",
        fontSize: "var(--cc-font-size-3xl)",
        lineHeight: "var(--cc-line-height-tight)",
        text: "Every UI has a score.\nEvery token has a role.",
    },
    {
        label: "--line-height-snug",
        fontSize: "var(--cc-font-size-3xl)",
        lineHeight: "var(--cc-line-height-snug)",
        text: "Spacing keeps the beat in time.\nType gives every line its rhyme.",
    },
    {
        label: "--line-height-super-loose",
        fontSize: "var(--cc-font-size-3xl)",
        lineHeight: "var(--cc-line-height-super-loose)",
        text: "When the scale is lost, the beat goes astray.\nThe spacing guesses, the type goes its own way.",
    },
];

export default function LineHeightDiagram() {
    return (
        <Stack
            as="figure"
            gap="xl"
            align="stretch"
            className="line-height-diagram surface-frame p-lg"
            variant="neutral"
            variantAppearance="filled"
            paint="all"
        >
            {examples.map(({ label, fontSize, lineHeight, text }) => (
                <Stack key={label} gap="md" className="line-height-diagram__example">
                    <Block
                        className="line-height-diagram__text-block"
                        style={{ fontSize, lineHeight }}
                    >
                        <p style={{ display: "block", outline: "1px dashed var(--cc-color-neutral-400)" }}>
                            {text}
                        </p>
                    </Block>
                    <Inline className="line-height-diagram__label">
                        <code className="text-sm">{label}</code>
                    </Inline>
                </Stack>
            ))
            }
            <figcaption className="italic text-sm">
                A progressively larger line height token is used — showing how leading should change with scale.
            </figcaption>
        </Stack >
    );
}