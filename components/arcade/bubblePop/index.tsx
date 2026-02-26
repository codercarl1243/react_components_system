"use client";
import { useEffect, useState } from "react";

import Bubbles from "@/components/bubbles/bubbles";
import useBubbles from "@/components/bubbles/useBubble";
import { Inline } from "@/components/primitives";

import type { ArcadeShellAPI } from "@/components/arcade/type";
import type { BubbleGameState } from "./type";

const default_game_state: BubbleGameState = {
    score: 0,
    maxBubbles: 60,
    bubblesSpawned: 0,
    combo: 0,
    lastPopTime: null
}
const BUBBLE_SPAWN_RATE = 475;
const TURBO_SPAWN_RATE = 200;

const COMBO_WINDOW = 1200;

type BubblesGameProps = {
    arcade: ArcadeShellAPI;
};

export default function BubblesGame({ arcade }: BubblesGameProps) {

    const { bubbles, splatters, popBubble, addBubble } = useBubbles(0);
    const [ bubbleGameState, setBubbleGameState ] = useState<BubbleGameState>(default_game_state)
    const { gameState, triggerShake, triggerTurbo } = arcade;

    function handleClickBubble(bubbleId: string) {
        const now = Date.now();
        let shouldShake = false;
        let shouldTurboBoost = false;

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

            const newCombo = __calculateCombo(prev.combo, prev.lastPopTime, now);

            if (newCombo % 10 === 0) { shouldShake = true; }
            if (newCombo % 20 === 0) { shouldTurboBoost = true; }
            const newScore = prev.score + newCombo;
            const adjustedMaxBubbles = (shouldTurboBoost && !arcade.isTurbo) ? prev.maxBubbles + 20 : prev.maxBubbles;

            return {
                ...prev,
                score: newScore,
                combo: newCombo,
                lastPopTime: now,
                maxBubbles: adjustedMaxBubbles
            };
        });

        if (shouldShake) { triggerShake(); }
        if (shouldTurboBoost) { triggerTurbo(); }

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


    function queueBubbles() {

        const spawnRate = arcade.isTurbo ? TURBO_SPAWN_RATE : BUBBLE_SPAWN_RATE;
        const bubblesPerTick = arcade.isTurbo ? 2 : 1;

        const interval = setInterval(() => {
            setBubbleGameState(prev => {
                if (prev.bubblesSpawned >= prev.maxBubbles) {
                    return prev;
                }

                const toAdd = Math.min(
                    bubblesPerTick,
                    prev.maxBubbles - prev.bubblesSpawned
                );

                for (let i = 0; i < toAdd; i++) {
                    addBubble();
                }

                return {
                    ...prev,
                    bubblesSpawned: prev.bubblesSpawned + toAdd,
                };
            });
        }, spawnRate);

        return interval;
    }

    useEffect(() => {
        if (gameState.status !== "running") {
            return;
        }
        const bubbleInterval = queueBubbles();

        return () => {
            clearInterval(bubbleInterval);
        };

    }, [gameState.status, arcade.isTurbo]);

    return (

        <>
            <Bubbles
                bubbles={bubbles}
                splatters={splatters}
                popBubble={handleClickBubble}
            />

            <Inline className="mt-auto">
                <p aria-live="polite">Score: {bubbleGameState.score}</p>
                <p className={bubbleGameState.combo > 1 ? "combo-active" : ""}>
                    Combo x{bubbleGameState.combo}
                </p>
            </Inline>
        </>

    )
}