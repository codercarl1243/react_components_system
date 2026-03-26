import { Stack, Block, Inline } from "@/components/primitives";

type LineHeightExample = {
    label: string;
    token: string;
    fontSize: string;
    lineHeight: string;
    text: string;
    isMultiLine?: boolean;
};

const examples: LineHeightExample[] = [
    {
        label: "--line-height-tight",
        token: "var(--line-height-tight)",
        fontSize: "var(--font-size-4xl)",
        lineHeight: "var(--line-height-tight)",
        text: "Every UI has a score\nEvery token has a role",
        isMultiLine: true,
    },
    {
        label: "--line-height-snug",
        token: "var(--line-height-snug)",
        fontSize: "var(--font-size-xl)",
        lineHeight: "var(--line-height-snug)",
        text: "Spacing keeps the beat in time\nType gives every line its rhyme",
        isMultiLine: true,
    },
    {
        label: "--line-height-super-loose",
        token: "var(--line-height-super-loose)",
        fontSize: "var(--font-size-base)",
        lineHeight: "var(--line-height-super-loose)",
        text: "When the scale is lost, the beat goes astray\nThe spacing guesses, the type goes its own way",
        isMultiLine: true,
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
            {examples.map(({ label, fontSize, lineHeight, text, isMultiLine }) => (
                <Stack key={label} gap="md" className="line-height-diagram__example">
                    <Block
                        className="line-height-diagram__text-block"
                        style={{ fontSize, lineHeight }}
                    >
                        {isMultiLine
                            ? text.split("\n").map((line, i) => (
                                <span key={i} style={{ display: "block" }}>{line}</span>
                            ))
                            : text
                        }
                    </Block>
                    <Inline gap="sm" align="center" className="line-height-diagram__label">
                        <code className="text-sm">{label}</code>
                    </Inline>
                </Stack>
            ))}
            <figcaption className="italic text-sm">
                Each block uses the same font size family but a different line height token — showing how leading affects the feel of text at different scales.
            </figcaption>
        </Stack>
    );
}