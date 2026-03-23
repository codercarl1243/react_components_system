"use client";
import useArcade from "@/components/arcade/useArcade";
import { ArcadeGameDefinition } from "@/components/arcade/type";
import { Stack } from "@/components/primitives";
import clsx from "clsx";
import Button from "@/components/button";

export default function ArcadeShell({ config, Game, Menu }: ArcadeGameDefinition) {

    const api = useArcade(config.initialTime);
    const { gameState, isShaking, isTurbo, handleStartGame } = api;

    const countdown = api.gameState.countdown;
    const showCountdown = countdown !== null && countdown > 0;
    const showGo = countdown === 0;
    const showButton = gameState.status === "idle" || gameState.status === "finished";
    const isRunning = api.gameState.status === "running";
    const showGameOver = gameState.status === "finished";

    return (
        <Stack>
            {Menu && <Menu arcade={api} />}
            <span className="ml-md">Time: {gameState.timeLeft}</span>
            {isRunning &&
                <span className="ml-md">Time: {gameState.timeLeft}</span>
            }
            <div
                className={clsx(
                    "arcade--wrapper mx-auto surface-frame frame-inset-lg",
                    { "arcade--shake": isShaking },

                )}
                data-turbo={isTurbo || undefined}
            >
                <div className="arcade--game surface-frame">
                    {/*  Game */}
                    <Game arcade={api} />
                    {/* Animated countdown and interaction prompts */}
                    {(showCountdown || showGo || showGameOver) && (
                        <span key={countdown} className="arcade--countdown">
                            {showCountdown && countdown}
                            {showGo && "Go!"}
                            {showGameOver && "Game Over!"}
                        </span>
                    )}
                </div>

                <div className="arcade--controls">
                    {showButton && (
                        <Button
                            className="arcade--start-button mx-auto"
                            onClick={handleStartGame}
                            variant="accent"
                            variantAppearance="filled"
                            paint="all"
                        >
                            Start
                        </Button>
                    )}
                </div>
            </div>
        </Stack>
    )
}