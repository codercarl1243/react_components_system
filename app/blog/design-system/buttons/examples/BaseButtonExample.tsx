'use client';
import Button from "@/components/button";
import { RiBubbleChartLine, RiWindyLine } from "@remixicon/react";
import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";

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

type TSplatter = {
    id: string;
    x: number;
    y: number;
    size: string;
    delay: string;
    endX: number;
    endY: number;
    color: string;
};

type Timeout = ReturnType<typeof setTimeout>;

const POP_ANIMATION_DURATION = 400;
const SPLATTER_ANIMATION_DURATION = 800;
const COOLDOWN_DURATION = 300;
const MIN_BUBBLE_LIFETIME = 3000;
const MAX_BUBBLE_LIFETIME = 7000;

export function BaseButtonExample({ children }: { children?: ReactNode }) {
    const [bubbles, setBubbles] = useState<TBubble[]>([]);
    const [splatters, setSplatters] = useState<TSplatter[]>([]);
    const timeoutsRef = useRef<Set<Timeout>>(new Set());
    const cooldownRef = useRef<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const bubbleIdCounter = useRef(0);
    const splatterCounter = useRef(0)

    const createTimeout = (callback: () => void, delay: number) => {
        const timeout = setTimeout(() => {
            callback();
            timeoutsRef.current.delete(timeout);
        }, delay);
        timeoutsRef.current.add(timeout);
        return timeout;
    };

    const removeBubble = (bubbleId: string) => {
        setBubbles(prev => prev.filter(b => b.id !== bubbleId));
    };

    const addBubble = () => {
        if (cooldownRef.current) return;

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
                color: bubbleColor
            });
        }

        setSplatters(prev => [...prev, ...newSplatters]);

        createTimeout(() => {
            setSplatters(prev =>
                prev.filter(splatter => !splatter.id.startsWith(`splatter-${bubbleId}`))
            );
        }, SPLATTER_ANIMATION_DURATION);
    };

    const generateBubble = ({ id, left, top, size, cssColorVar, floatAnimation, animationLength, isPopping }: TBubble) => {
        return (
            <div
                key={id}
                data-bubble-id={id}
                className="bubble"
                style={{
                    left,
                    top,
                    animation: `${floatAnimation} ${animationLength}ms linear forwards`,
                }}
            >
                <Button
                    className="bubble-inner"
                    onClick={() => popBubble(id)}
                    id={id}
                    style={{
                        width: size,
                        height: size,
                        backgroundColor: `color-mix(in srgb, var(${cssColorVar}) 40%, transparent)`,
                        outlineColor: `var(${cssColorVar})`,
                        borderColor: `var(${cssColorVar})`,
                        animation: isPopping
                            ? `rotate ${animationLength}ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards, pop ${POP_ANIMATION_DURATION}ms cubic-bezier(0.25, -1, 0, 1) forwards`
                            : `rotate ${animationLength}ms cubic-bezier(0.25, 0.1, 0.25, 1) forwards`
                    }}
                />
            </div>
        );
    };

    type CSSWithVars = CSSProperties & Record<'--end-x' | '--end-y', string>;
    const generateSplatter = ({
        x, y, size, delay, endX, endY, color, id
    }: TSplatter) => {
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
                key={id}
                className="splatter"
                style={styleObject}
                onAnimationEnd={() => setSplatters(prev => prev.filter(s => s.id !== id))}
            />
        )
    }

    useEffect(() => {
        return () => {
            timeoutsRef.current.forEach(clearTimeout);
            timeoutsRef.current.clear();
        };
    }, []);

    const loadingText = "Taking a breath";
    const text = "Blow a Bubble";

    return (
        <div className="button-example--base">
            <div id="bubble-description" className="flow-4">
                <p>Creates a decorative bubble that floats upward and disappears with a 'Pop!'.</p>
                <p>Click on a Bubble to <span className="italic">pop</span> it.</p>
                <p>Current Number of Bubbles: <span style={{ color: 'var(--color-accent-400)' }}>{bubbles.length}</span></p>
                <span className="sr-only" role="status">
                    {isLoading ? loadingText : text}
                </span>
            </div>
            <Button
                onClick={addBubble}
                isLoading={isLoading}
                data-style="outlined"
                data-variant="accent"
                aria-describedby="bubble-description"
                icon={isLoading ? RiBubbleChartLine : RiWindyLine}
            >
                {text}
            </Button>
            {bubbles.map(generateBubble)}
            {splatters.map(generateSplatter)}
            {children}
        </div>
    )
}