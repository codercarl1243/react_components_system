import { Inline, Stack } from "@/components/primitives";
import type { ArcadeShellAPI } from "../type";
import { Toggle } from "@/components/button/toggle";

type BubblesMenuProps = {
    arcade: ArcadeShellAPI;
};

export default function BubblesMenu({ arcade }: BubblesMenuProps) {

    const { effectsEnabled, setEffectsEnabled } = arcade;

    return (
        <Inline>

            <Stack justify="center" gap={0}>
                Effects <Toggle
                    pressed={effectsEnabled}
                    onClick={() => setEffectsEnabled(prev => !prev)}
                    variant={"accent"}
                    variantAppearance={effectsEnabled ? "filled": "ghost"}
                    paint="all"
                >
                    {effectsEnabled ? "On" : "Off"}
                </Toggle>
            </Stack>
        </Inline>
    );
}