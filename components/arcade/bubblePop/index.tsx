"use client";
import { useEffect, useState } from "react";

import Bubbles from "@/components/bubbles/bubbles";
import useBubbles from "@/components/bubbles/useBubble";
import Button from "@/components/button";
import { Inline } from "@/components/primitives";

import type { ArcadeShellAPI } from "@/components/arcade/type";
import type { BubbleGameState } from "./type";

const default_game_state: BubbleGameState = {
    score: 0,
    bubblesSpawned: 0,
    combo: 0,
    lastPopTime: null
}

const COMBO_WINDOW = 1200;

type BubblesGameProps = {
    arcade: ArcadeShellAPI;
};

export default function BubblesGame({ arcade }: BubblesGameProps) {

    const { bubbles, splatters, popBubble, addBubble } = useBubbles(0);
    const [bubbleGameState, setBubbleGameState] = useState<BubbleGameState>(default_game_state)
    const { triggerShake, gameState } = arcade;

    function handleClickBubble(bubbleId: string) {
        const now = Date.now();

        function __calculateCombo(
            prevCombo: number,
            lastPopTime: number | null,
            now: number
        ) {
            if (lastPopTime && now - lastPopTime <= COMBO_WINDOW) {
                return prevCombo + 1;
            }

            return 1;
        }

        setBubbleGameState(prev => {
            if (gameState.status !== "running") return prev;

            const newCombo = __calculateCombo(
                prev.combo,
                prev.lastPopTime,
                now
            );
            if (newCombo >= 10) {
                triggerShake();
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
        if (!bubbleGameState.lastPopTime) return;

        const timeout = setTimeout(() => {
            setBubbleGameState(prev => ({
                ...prev,
                combo: 0
            }));
        }, COMBO_WINDOW);

        return () => clearTimeout(timeout);
    }, [bubbleGameState.lastPopTime]);



    useEffect(() => {
        if (gameState.status !== "running") {
            return;
        }

        function __startBubbles() {
            const interval = setInterval(() => {
                setBubbleGameState(prev => {
                    if (prev.bubblesSpawned >= 60 || gameState.status !== "running") {
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
        const bubbleInterval = __startBubbles();

        return () => {
            clearInterval(bubbleInterval);
        };

    }, [gameState.status]);


    return (

        <>
            <Bubbles
                bubbles={bubbles}
                splatters={splatters}
                popBubble={handleClickBubble}
            />

            <Inline>
                <p aria-live="polite">Score: {bubbleGameState.score}</p>
                <p className={bubbleGameState.combo > 1 ? "combo-active" : ""}>
                    Combo x{bubbleGameState.combo}
                </p>

            </Inline>
        </>

    )
}