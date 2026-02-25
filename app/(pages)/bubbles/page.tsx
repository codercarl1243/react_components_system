"use client";
import Bubbles from "@/components/bubbles/bubbles";
import useBubbles from "@/components/bubbles/useBubble";
import { Stack } from "@/components/primitives";
import { Inline } from "@/components/primitives";
import { useEffect, useState } from "react";
import { GameState } from "./type";
import Button from "@/components/button";
import clsx from "clsx";

const default_game_state: GameState = {
    status: "idle",
    score: 0,
    timeLeft: 30,
    bubblesSpawned: 0,
    combo: 0,
    lastPopTime: null
}

const COMBO_WINDOW = 1200;

export default function BubblesPage() {

    const { bubbles, splatters, popBubble, addBubble } = useBubbles(0);

    const [gameState, setGameState] = useState<GameState>(default_game_state)
    const [isShaking, setIsShaking] = useState(false);
    // function handleComboCheck(){
    //     const now = Date.now();

    //     const currentCombo = 
    //     return 
    // }

    function calculateCombo(
        prevCombo: number,
        lastPopTime: number | null,
        now: number
    ) {
        if (lastPopTime && now - lastPopTime <= COMBO_WINDOW) {
            return prevCombo + 1;
        }

        return 1;
    }

    function triggerScreenShake() {
        setIsShaking(true);

        setTimeout(() => {
            setIsShaking(false);
        }, 300);
    }

    function handleClickBubble(bubbleId: string) {
        const now = Date.now();

        setGameState(prev => {
            if (prev.status !== "running") return prev;

            const newCombo = calculateCombo(
                prev.combo,
                prev.lastPopTime,
                now
            );
            if (newCombo >= 10) {
                triggerScreenShake();
            }
            const newScore = prev.score + newCombo;

            return {
                ...prev,
                score: newScore,
                combo: newCombo,
                lastPopTime: now
            };
        });

        popBubble(bubbleId);
    }

    useEffect(() => {
        if (!gameState.lastPopTime) return;

        const timeout = setTimeout(() => {
            setGameState(prev => ({
                ...prev,
                combo: 0
            }));
        }, COMBO_WINDOW);

        return () => clearTimeout(timeout);
    }, [gameState.lastPopTime]);

    function startBubbles() {
        const interval = setInterval(() => {
            setGameState(prev => {
                if (prev.bubblesSpawned >= 60 || prev.status !== "running") {
                    return prev;
                }

                addBubble();
                return {
                    ...prev,
                    bubblesSpawned: prev.bubblesSpawned + 1,
                };
            });
        }, 475);

        return interval;
    }

    function startTimer() {
        const interval = setInterval(() => {
            setGameState(prev => {
                if (prev.timeLeft <= 1) {
                    return { ...prev, timeLeft: 0, status: 'finished' };
                }
                return { ...prev, timeLeft: prev.timeLeft - 1 };
            });
        }, 1000);
        return interval;
    }

    useEffect(() => {
        if (gameState.status === "idle" || gameState.status === "finished") {
            return;
        }

        const bubbleInterval = startBubbles();
        const timerInterval = startTimer();

        return () => {
            clearInterval(bubbleInterval);
            clearInterval(timerInterval);
        };
    }, [gameState.status]);

    function handleStartGame() {
        
        setGameState({
            ...default_game_state,
            status: "running"
        });

    }
    return (
        <div className="arcade--page layout-wrapper">
            <Stack
                className={clsx(
                    "arcade--wrapper mx-auto surface-frame",
                    { "arcade--shake": isShaking }
                )}
            >
                <Bubbles
                    bubbles={bubbles}
                    splatters={splatters}
                    popBubble={handleClickBubble}
                />

            </Stack>
            <Inline>
                <p>number of bubbles = {bubbles.length}</p>
                <p aria-live="polite">Score: {gameState.score}</p>
                <p>Game state: {gameState.status}</p>
                <p>Game time: {gameState.timeLeft}</p>
                <p>spawned bubbls = {gameState.bubblesSpawned}</p>
                <p className={gameState.combo > 1 ? "combo-active" : ""}>
                    Combo x{gameState.combo}
                </p>
                <Button disabled={gameState.status === "running"} onClick={handleStartGame}>Toggle Status</Button>
            </Inline>
        </div>
    )
}