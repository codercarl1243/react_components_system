'use client';
import Button from "@/components/button";
import type { TBubble, TBubbleProps, TSplatter } from "./type";
import { POP_ANIMATION_DURATION } from "./useBubble"
import { CSSProperties } from "react";
import { logWarning } from "@/lib/logging/log";

export default function Bubbles({bubbles, splatters, popBubble }:TBubbleProps ) {

    const generateBubble = ({ id, left, top, size, cssColorVar, floatAnimation, animationLength, isPopping }: TBubble) => {
        logWarning("generateBubble toggled")
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
        x, y, size, delay, endX, endY, cssColorVar, id
    }: TSplatter) => {
        const styleObject: CSSWithVars = {
            left: `${x}px`,
            top: `${y}px`,
            width: size,
            height: size,
            animationDelay: delay,
            background: `radial-gradient(circle, #ffffff 0%, var(${cssColorVar}) 50%, transparent 70%)`,
            ['--end-x']: `${endX - x}px`,
            ['--end-y']: `${endY - y}px`,
        }

        return (
            <div
                key={id}
                className="splatter"
                style={styleObject}
            />
        )
    }

    return (
        <>
            {/* 
            create a Card that bounces down while there are bubbles around.
        it should dissapear after 15? seconds of no more bubbles. it should also allow someone to press x to close it
        
        <p>Click on a Bubble to <span className="italic">pop</span> it.</p>
        <p>Current Number of Bubbles: <span style={{ color: 'var(--color-accent-400)' }}>{bubbles.length}</span></p>
                */}

            {bubbles.map(generateBubble)}
            {splatters.map(generateSplatter)}
        </>
    )
}