'use client';
import Button from "@/components/button";
import { RiBubbleChartLine, RiWindyLine } from "@remixicon/react";
import { useEffect, useRef, useState } from "react";

type TBubble = {
    id: string;
    left: string;
    top: string;
    size: string;
    cssColorVar: string;
    floatAnimation: string;
    animationLength: number;
    isPopping: boolean;
};

type TSparkle = {
    id: string;
    x: number;
    y: number;
    size: string;
    delay: string;
    endX: number;
    endY: number;
    color: string;
};

type BubbleId = string;
type BubbleTimeouts = {
    removeFromDOMTimeout: NodeJS.Timeout;
    popTimeout: NodeJS.Timeout;
}
type TimeoutRef = Map<BubbleId, BubbleTimeouts>;


export function BaseButtonExample() {
    const [bubbles, setBubbles] = useState<TBubble[]>([]);
    const [sparkles, setSparkles] = useState<TSparkle[]>([]);

    const timeoutsRef = useRef<TimeoutRef>(new Map());
    const pendingTimeoutsRef = useRef<Set<NodeJS.Timeout>>(new Set())
    const cooldownRef = useRef<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const bubbleIdCounter = useRef(0);

    const removeBubble = (bubbleId: string) => {
        setBubbles(prev => prev.filter(b => b.id !== bubbleId));
        const timeouts = timeoutsRef.current.get(bubbleId);
        if (timeouts) {
            clearTimeout(timeouts.removeFromDOMTimeout);
            clearTimeout(timeouts.popTimeout);
            timeoutsRef.current.delete(bubbleId);
        }
    };

    const addBubble = () => {
        if (cooldownRef.current) return;

        cooldownRef.current = true;
        setIsLoading(true);

        const cooldownT = setTimeout(() => {
            cooldownRef.current = false;
            setIsLoading(false);
            pendingTimeoutsRef.current.delete(cooldownT);
        }, 300);

        pendingTimeoutsRef.current.add(cooldownT);

        const LIFE_TIME = 3000 + Math.random() * 4000; // 3-7s
        const POP_DURATION = 400;
        const BUBBLE_ID = `bubble-${bubbleIdCounter.current++}`;
        const BUBBLE_COLOR = `--color-emphasis-${(Math.floor(Math.random() * 9) + 1) * 100}`
        const BUBBLE_SIZE = 20 + Math.random() * 40;

        const bubble: TBubble = {
            id: BUBBLE_ID,
            left: `${10 + Math.random() * 80}vw`,
            top: `${10 + Math.random() * 80}vh`,
            size: `${BUBBLE_SIZE}px`,
            cssColorVar: BUBBLE_COLOR,
            floatAnimation: `float${Math.floor(Math.random() * 3) + 1}`,
            animationLength: LIFE_TIME,
            isPopping: false
        };

        setBubbles((prev) => [...prev, bubble]);

        // Set bubble to popping state and create sparkles
        const popTimeout = setTimeout(() => {
            setBubbles(prev => prev.map(b =>
                b.id === BUBBLE_ID ? { ...b, isPopping: true } : b
            ));

            // Create sparkles
            const bubbleElement = document.querySelector(`[data-bubble-id="${BUBBLE_ID}"]`) as HTMLElement;
            if (bubbleElement) {
                createSplatter(bubbleElement, BUBBLE_COLOR, BUBBLE_SIZE);
            }
        }, LIFE_TIME - POP_DURATION);

        const removeFromDOMTimeout = setTimeout(() => removeBubble(BUBBLE_ID), LIFE_TIME);

        // Store timeouts for cleanup
        timeoutsRef.current.set(bubble.id, { removeFromDOMTimeout, popTimeout });
    };
    const popBubble = (bubbleId: string) => {
        const bubbleElement = document.querySelector(`[data-bubble-id="${bubbleId}"]`) as HTMLElement;
        // Find bubble in state
        const bubble = bubbles.find(b => b.id === bubbleId);
        if (!bubble || !bubbleElement) return;

        removeBubble(bubbleId)
        createSplatter(bubbleElement, bubble.cssColorVar, parseInt(bubble.size));
    }
    const createSplatter = (bubbleElement: HTMLElement, bubbleColor: string, bubbleSize: number) => {
        const rect = bubbleElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const sparkleCount = 6 + Math.floor(Math.random() * 3);
        const newSparkles: TSparkle[] = [];

        for (let i = 0; i < sparkleCount; i++) {
            const angle = (Math.PI * 2 * i) / sparkleCount + Math.random() * 0.5;
            const distance = bubbleSize + Math.random() * 30;

            newSparkles.push({
                id: `sparkle-${Date.now()}-${i}`,
                x: centerX,
                y: centerY,
                size: `${1 + Math.random() * 4}px`,
                delay: `${Math.random() * 100}ms`,
                endX: centerX + Math.cos(angle) * distance,
                endY: centerY + Math.sin(angle) * distance,
                color: bubbleColor
            });
        }

        setSparkles(prev => [...prev, ...newSparkles]);

        // Remove sparkles after animation
        const sparkleCleanupT = setTimeout(() => {
            setSparkles(prev => prev.filter(sparkle =>
                !newSparkles.some(newSparkle => newSparkle.id === sparkle.id)
            ));
            pendingTimeoutsRef.current.delete(sparkleCleanupT);
        }, 800);
        pendingTimeoutsRef.current.add(sparkleCleanupT);
    };

    const generateBubble = ({ id, left, top, size, cssColorVar, floatAnimation, animationLength, isPopping }: TBubble) => {
        return (
            <div
                data-bubble-id={id}
                className={`bubble`}
                style={{
                    left,
                    top,
                    animation: `${floatAnimation} ${animationLength}ms linear forwards`,
                }}
            >
                <Button
                    className="bubble-inner"
                    onClick={() => popBubble(id)}
                    style={{
                        width: size,
                        height: size,
                        backgroundColor: `color-mix(in srgb, var(${cssColorVar}) 40%, transparent)`,
                        outlineColor: `var(${cssColorVar})`,
                        borderColor: `var(${cssColorVar})`,
                        animation: isPopping
                            ? `rotate ${animationLength}ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards, pop 400ms cubic-bezier(0.25, -1, 0, 1) forwards`
                            : `rotate ${animationLength}ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards`
                    }}
                />
            </div>
        );
    };

    type CSSWithVars = React.CSSProperties & Record<'--end-x' | '--end-y', string>;
    const generateSplatter = ({
        x, y, size, delay, endX, endY, color
    }: TSparkle) => {
        const styleObject: CSSWithVars = {
            left: `${x}px`,
            top: `${y}px`,
            width: size,
            height: size,
            animationDelay: delay,
            background: `radial-gradient(circle, #ffffff 0%, var(${color}) 50%, transparent 70%)`,
            ['--end-x']: `${endX - x}px`,
            ['--end-y']: `${endY - y}px`,
        }
        return (
            <div
                className="splatter"
                style={styleObject}
            />
        )
    }



    // Cleanup on unmount
    useEffect(() => {
        return () => {
            timeoutsRef.current.forEach((timeout) => {
                clearTimeout(timeout.removeFromDOMTimeout);
                clearTimeout(timeout.popTimeout);
            });
            timeoutsRef.current.clear();
            pendingTimeoutsRef.current.forEach(clearTimeout);
            pendingTimeoutsRef.current.clear()
        };
    }, []);

    const loadingText = "Taking a breath";
    const text = " Blow a Bubble ";
    return (
        <div className="button-example--base">
            <p id="bubble-description">
                Creates a decorative bubble that floats upward and disappears with sparkles
                <span className="sr-only" role="status">
                    {isLoading ? loadingText : text}
                </span>
            </p>
            <Button
                onClick={addBubble}
                isLoading={isLoading}
                data-style="outlined"
                data-variant="accent"
                aria-describedby="bubble-description"
                icon={isLoading ? RiBubbleChartLine : RiWindyLine}
            >
                {isLoading ? loadingText : text}
            </Button>

            {bubbles.map((bubble) => <div key={bubble.id}>{generateBubble(bubble)}</div>)}
            {sparkles.map((sparkle) => <div key={sparkle.id}>{generateSplatter(sparkle)}</div>)}
        </div>
    )
}