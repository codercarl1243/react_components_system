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
            <span className="ml-4">Time: {gameState.timeLeft}</span>
            {isRunning &&
                <span className="ml-4">Time: {gameState.timeLeft}</span>
            }
            <div
                className={clsx(
                    "arcade--wrapper mx-auto surface-frame frame-inset-8",
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

/**

 
.arcade--wrapper[data-turbo] {
    background-color: transparent;
  isolation: isolate;
  z-index: 1;
  background-clip: padding-box;
}

.arcade--wrapper[data-turbo]::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: var(--spacing-md);
  border-radius: inherit;
  background: conic-gradient(from 0deg,
      hsl(0, 90%, 60%),
      hsl(40, 90%, 60%),
      hsl(80, 90%, 60%),
      hsl(160, 90%, 50%),
      hsl(220, 90%, 60%),
      hsl(280, 90%, 60%),
      hsl(320, 90%, 60%),
      hsl(0, 90%, 60%));
  background-size: 400%;
   animation: turbo-rainbow 1.5s linear infinite;
  // Mask the center out
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;

  mask-composite: exclude;

  pointer-events: none;
}

@keyframes turbo-rainbow {
  from {
    rotate: 0deg;
  }

  to {
    rotate: 360deg;
  }
}

 */