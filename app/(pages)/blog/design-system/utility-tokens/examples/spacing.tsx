import { Stack, Inline, Block } from "@/components/primitives";

const steps = [
    { name: "sm", token: "--spacing-sm" },
    { name: "md", token: "--spacing" },
    { name: "lg", token: "--spacing-lg" },
    { name: "xl", token: "--spacing-xl" },
    { name: "xxl", token: "--spacing-xxl" },
    { name: "3xl", token: "--spacing-3xl" },

] as const;

export default function SpacingDiagram() {
    return (
        <Stack
            as="figure"
            gap="lg"
            align="stretch"
            className="spacing-diagram surface-frame p-lg"
            variant="primary"
            variantAppearance="tonal"
            paint="all"
        >
            {steps.map(({ name, token }) => (
                <Inline key={name} gap="md" align="center">
                    <Block
                        className="spacing-diagram__block radius-sm"
                        style={{ width: `var(${token})`, height: `var(${token})` }}
                        variant="light"
                        variantAppearance="filled"
                        paint="all"
                    />
                    <p className="text-sm">
                        <code>{token}</code>
                    </p>
                </Inline>
            ))}
            <figcaption className="italic text-sm">
                Each block's width and height represents the corresponding spacing token value.
            </figcaption>
        </Stack>
    )
}