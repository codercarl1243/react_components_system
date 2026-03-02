import { useEffect, useRef, useState } from "react";
import type { BubbleGameState } from "./type";
import useBubbles from "@/components/bubbles/useBubble";
import type { ArcadeShellAPI } from "../type";
import { isNotNullish } from "@/lib/utils/guards";

const default_game_state: BubbleGameState = {
    score: 0,
    maxBubbles: 60,
    bubblesSpawned: 0,
    combo: 0,
    lastPopTime: null
}
const BUBBLE_SPAWN_RATE = 495;
const TURBO_SPAWN_RATE = 200;

const COMBO_WINDOW = 1200;

export default function bubblesController(arcade: ArcadeShellAPI) {

    const { bubbles, splatters, popBubble, addBubble } = useBubbles(0);
    const [bubbleGameState, setBubbleGameState] = useState<BubbleGameState>(default_game_state)
    const { gameState, triggerShake, triggerTurbo } = arcade;
    const lastEffectComboRef = useRef<number | null>(null);

    function handleClickBubble(bubbleId: string) {
        const now = Date.now();

        setBubbleGameState(prev => {
            if (gameState.status !== "running") return prev;

            const newCombo = isNotNullish(prev.lastPopTime) &&
                now - prev.lastPopTime <= COMBO_WINDOW
                ? prev.combo + 1
                : 1;

            const shouldTurboBoost = newCombo % 20 === 0;

            const adjustedMaxBubbles = (shouldTurboBoost && !arcade.isTurbo) ? prev.maxBubbles + 20 : prev.maxBubbles;

            return {
                ...prev,
                score: prev.score + newCombo,
                combo: newCombo,
                lastPopTime: now,
                maxBubbles: adjustedMaxBubbles
            };
        });

        popBubble(bubbleId);
    }

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

    // Cleanup the DOM when game ends

    useEffect(() => {
        if (gameState.status !== "finished") return;

        const timeout = setTimeout(() => {
            bubbles.forEach(bubble => {
                popBubble(bubble.id);
            });
        }, 300);

        return () => clearTimeout(timeout);
    }, [gameState.status]);

    // Trigger Effects
    useEffect(() => {
        const combo = bubbleGameState.combo;
        if (combo === 0) {
            lastEffectComboRef.current = null;
            return;
        }
        if (combo <= 0) return;
        if (lastEffectComboRef.current === combo) return;

        lastEffectComboRef.current = combo;

        if (combo % 10 === 0) triggerShake();
        if (combo % 20 === 0) triggerTurbo();
    }, [bubbleGameState.combo]);

    // Combo Reset Timer
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

    return {
        bubbles,
        splatters,
        handleClickBubble,
        score: bubbleGameState.score,
        combo: bubbleGameState.combo
    }
}