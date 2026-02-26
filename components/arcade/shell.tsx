"use client";
import useArcade from "@/components/arcade/useArcade";
import { ArcadeGameDefinition } from "@/components/arcade/type";
import { Inline, Stack } from "@/components/primitives";
import clsx from "clsx";
import Button from "@/components/button";

export default function ArcadeShell({ config, Game, Menu }: ArcadeGameDefinition) {

    const api = useArcade(config.initialTime);

    return (
        <Stack>
            {Menu && <Menu arcade={api} />}
            <Stack
                className={clsx(
                    "arcade--wrapper mx-auto surface-frame",
                    { "arcade--shake": api.isShaking }
                )}
            >
                <Game arcade={api} />
                {api?.gameState?.countdown && api?.gameState?.countdown > 0 ? api.gameState.countdown : "Go!"}

                <Inline>
                    <Button
                        disabled={api.gameState.status === "running"}
                        onClick={api.handleStartGame}
                        variant="accent"
                        variantAppearance="filled"
                        paint="all"
                    >
                        {api.gameState.status === "running" ? api.gameState.timeLeft : "Start Game"}
                    </Button>
                </Inline>
            </Stack>
        </Stack>
    )
}