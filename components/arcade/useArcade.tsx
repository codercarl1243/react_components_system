import { useEffect, useState } from "react";
import type { ArcadeCoreState } from "./type";

export default function UseArcade(initialTime = 30) {

    const [isShaking, setIsShaking] = useState(false);
    const [effectsEnabled, setEffectsEnabled] = useState(true);

    const [gameState, setGameState] = useState<ArcadeCoreState>({
        status: "idle",
        timeLeft: initialTime,
        countdown: null
    })

    function triggerShake() {
        if (!effectsEnabled) return;

        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 300);
    }

    useEffect(() => {
        if (gameState.status !== "running") {
            return;
        }
        function __startTimer() {
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

        const timerInterval = __startTimer();

        return () => {
            clearInterval(timerInterval);
        };
    }, [gameState.status]);

function handleStartGame() {
    let count = 3;
    setGameState({
        timeLeft: initialTime,
        status: "starting",
        countdown: count
    });

    const countdownInterval = setInterval(() => {
        count -= 1;

        if (count <= 0) {
            clearInterval(countdownInterval);
            // show "Go!" first
            setGameState(prev => ({
                ...prev,
                countdown: 0
            }));
            // then transition to running after a beat
            setTimeout(() => {
                setGameState(prev => ({
                    ...prev,
                    countdown: null,
                    status: "running"
                }));
            }, 800);
        } else {
            setGameState(prev => ({
                ...prev,
                countdown: count
            }));
        }
    }, 1000);
}

    function handleFinishGame() {
        setGameState(prev => ({
            ...prev,
            status: "finished",
        }));
    }

    return {
        handleStartGame,
        handleFinishGame,

        gameState,
        setGameState,

        isShaking,
        triggerShake,

        effectsEnabled,
        setEffectsEnabled
    }
}