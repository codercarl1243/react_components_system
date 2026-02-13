'use client';
import { useState, useRef, useEffect } from "react";
import type { TBubble, Timeout, TSplatter } from "./type";
import { logWarning } from "@/lib/logging/log";

export const POP_ANIMATION_DURATION = 400;
const SPLATTER_ANIMATION_DURATION = 800;
const COOLDOWN_DURATION = 200;
const INFO_CARD_TIMEOUT_DURATION = 7000;
const MIN_BUBBLE_LIFETIME = 3000;
const MAX_BUBBLE_LIFETIME = 7000;

export default function useBubbles() {

    const [bubbles, setBubbles] = useState<TBubble[]>([]);
    const [splatters, setSplatters] = useState<TSplatter[]>([]);
    const [cardVisibility, setCardVisibility] = useState<"displayed" | "hidden" | "collapsed">("hidden");
    const timeoutsRef = useRef<Set<Timeout>>(new Set());
    const cooldownRef = useRef<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const bubbleIdCounter = useRef(0);
    const splatterCounter = useRef(0);
    const cardHideTimeoutRef = useRef<Timeout | null>(null);

    const createTimeout = (callback: () => void, delay: number) => {
        const timeout = setTimeout(() => {
            callback();
            timeoutsRef.current.delete(timeout);
        }, delay);
        timeoutsRef.current.add(timeout);
        return timeout;
    };

    const removeBubble = (bubbleId: string) => {
        setBubbles(prev => {
            const next = prev.filter(b => b.id !== bubbleId);

            if (next.length === 0) {
                if (cardHideTimeoutRef.current) {
                    clearTimeout(cardHideTimeoutRef.current);
                }

                cardHideTimeoutRef.current = createTimeout(() => {
                    setCardVisibility('hidden');
                    cardHideTimeoutRef.current = null;
                }, INFO_CARD_TIMEOUT_DURATION);
            }

            return next;
        })
    };

    const addBubble = () => {
        if (cooldownRef.current) return;
        if (cardVisibility !== "collapsed") {
            setCardVisibility("displayed");
        }

        cooldownRef.current = true;
        setIsLoading(true);

        createTimeout(() => {
            cooldownRef.current = false;
            setIsLoading(false);
        }, COOLDOWN_DURATION)

        const lifetime = MIN_BUBBLE_LIFETIME + Math.random() * (MAX_BUBBLE_LIFETIME - MIN_BUBBLE_LIFETIME);
        const bubbleId = `bubble-${bubbleIdCounter.current++}`;
        const bubbleColor = `--color-emphasis-${(Math.floor(Math.random() * 9) + 1) * 100}`
        const bubbleSize = 20 + Math.random() * 40;

        const bubble: TBubble = {
            id: bubbleId,
            left: `${10 + Math.random() * 80}vw`,
            top: `${10 + Math.random() * 80}vh`,
            size: `${bubbleSize}px`,
            cssColorVar: bubbleColor,
            floatAnimation: `float${Math.floor(Math.random() * 3) + 1}`,
            animationLength: lifetime,
            isPopping: false
        };

        setBubbles((prev) => [...prev, bubble]);
        createTimeout(() => {
            popBubble(bubbleId);
        }, lifetime - POP_ANIMATION_DURATION)
        logWarning("addBubble ended")

    };

    const popBubble = (bubbleId: string) => {
        setBubbles((prev) => {
            const bubble = prev.find(b => b.id === bubbleId);
            if (!bubble) return prev;

            const domElement = document.querySelector(`[data-bubble-id="${bubbleId}"]`) as HTMLElement;
            if (domElement) {
                createSplatter(domElement, bubble.cssColorVar, parseInt(bubble.size), bubble.id);
            }

            return prev.map((b) => (b.id === bubbleId ? { ...b, isPopping: true } : b));
        });
        createTimeout(() => {
            removeBubble(bubbleId);
        }, POP_ANIMATION_DURATION)
    }

    const createSplatter = (bubbleElement: HTMLElement, bubbleColor: string, bubbleSize: number, bubbleId: string) => {
        const rect = bubbleElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const splatterCount = 6 + Math.floor(Math.random() * 3);
        const newSplatters: TSplatter[] = [];

        for (let i = 0; i < splatterCount; i++) {
            const angle = (Math.PI * 2 * i) / splatterCount + Math.random() * 0.5;
            const distance = bubbleSize + Math.random() * 30;

            newSplatters.push({
                id: `splatter-${bubbleId}-${splatterCounter.current++}`,
                x: centerX,
                y: centerY,
                size: `${1 + Math.random() * 4}px`,
                delay: `${Math.random() * 100}ms`,
                endX: centerX + Math.cos(angle) * distance,
                endY: centerY + Math.sin(angle) * distance,
                cssColorVar: bubbleColor
            });
        }

        setSplatters(prev => [...prev, ...newSplatters]);
        const maxDelayMs = Math.max(0, ...newSplatters.map(s => parseFloat(s.delay)));

        createTimeout(() => {
            setSplatters(prev =>
                prev.filter(splatter => !splatter.id.startsWith(`splatter-${bubbleId}`))
            );
        }, SPLATTER_ANIMATION_DURATION + maxDelayMs);
    };

    const toggleCardVisibility = () => {
        console.log("toggleCardVisibility toggled", cardVisibility)
        if (cardVisibility === "displayed"){
            console.log("toggleCardVisibility toggled 1")
            setCardVisibility("collapsed");
            if (cardHideTimeoutRef.current) {
                clearTimeout(cardHideTimeoutRef.current);
                cardHideTimeoutRef.current = null;
            }
        } else {
            console.log("toggleCardVisibility toggled 2")
            setCardVisibility("displayed");
        }

    }

    useEffect(() => {
        return () => {
            timeoutsRef.current.forEach(clearTimeout);
            timeoutsRef.current.clear();
            if (cardHideTimeoutRef.current) {
                clearTimeout(cardHideTimeoutRef.current);
            }
        };
    }, []);

    return {
        bubbles,
        splatters,
        addBubble,
        popBubble,
        isLoading,
        cardVisibility,
        toggleCardVisibility,
        POP_ANIMATION_DURATION
    };
}