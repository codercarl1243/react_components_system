'use client';
import Button from "@/components/button";
import { RiBubbleChartLine, RiWindyLine } from "@remixicon/react";
import { type ReactNode, useEffect, useRef, useState } from "react";

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
type BubbleId = string;
type BubbleTimeouts = {
    popTimeout: Timeout;
}
type TimeoutRef = Map<BubbleId, BubbleTimeouts>;


export function BaseButtonExample({ children }: { children?: ReactNode }) {
    const [bubbles, setBubbles] = useState<TBubble[]>([]);
    const [splatters, setSplatters] = useState<TSplatter[]>([]);
    const timeoutsRef = useRef<TimeoutRef>(new Map());
    const pendingTimeoutsRef = useRef<Set<Timeout>>(new Set())
    const cooldownRef = useRef<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const bubbleIdCounter = useRef(0);
    const splatterCounter = useRef(0)

    const removeBubble = (bubbleId: string) => {
        setBubbles(prev => prev.filter(b => b.id !== bubbleId));
        const timeouts = timeoutsRef.current.get(bubbleId);
        if (timeouts) {
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

        const popTimeout = setTimeout(() => {
            popBubble(BUBBLE_ID);
        }, LIFE_TIME - POP_DURATION);

        // Store timeouts for cleanup
        timeoutsRef.current.set(bubble.id, { popTimeout });
    };

    const popBubble = (bubbleId: string) => {
        setBubbles((prev) => {
            const bubble = prev.find(b => b.id === bubbleId);
            if (!bubble) return prev;

            const updated = prev.map((b) => (b.id === bubbleId ? { ...b, isPopping: true } : b));
            const domElement = document.querySelector(`[data-bubble-id="${bubbleId}"]`) as HTMLElement;
            if (domElement) {
                createSplatter(domElement, bubble.cssColorVar, parseInt(bubble.size), bubble.id);
                removeBubble(bubbleId)
            }

            return updated;
        }
        );
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

        // Remove splatters after animation
        const splatterCleanup = setTimeout(() => {
            setSplatters(prev =>
                prev.filter(splatter => !splatter.id.startsWith(`splatter-${bubbleId}`))
            );
            pendingTimeoutsRef.current.delete(splatterCleanup);
        }, 800);
        pendingTimeoutsRef.current.add(splatterCleanup);
    };

    const generateBubble = ({ id, left, top, size, cssColorVar, floatAnimation, animationLength, isPopping }: TBubble) => {
        return (
            <div
                key={id}
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
                    id={id}
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

    const removeSplatter = (splatterId: string) => {
        setSplatters(prev => prev.filter(s => s.id !== splatterId))
    }

    type CSSWithVars = React.CSSProperties & Record<'--end-x' | '--end-y', string>;
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
                onAnimationEnd={() => removeSplatter(id)}
            />
        )
    }

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            timeoutsRef.current.forEach((timeout) => {
                clearTimeout(timeout.popTimeout);
            });
            timeoutsRef.current.clear();
            pendingTimeoutsRef.current.forEach(clearTimeout);
            pendingTimeoutsRef.current.clear()
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