'use client';
import Button from "@/components/button";
import type { TBubble, TBubbleProps, TSplatter } from "./type";
import { CSSProperties } from "react";

export default function Bubbles({ bubbles, splatters, popBubble }: TBubbleProps) {

    const generateBubble = ({ id, left, top, size, cssColorVar, animationLength, isPopping }: TBubble) => {
        return (
            <div
                key={id}
                data-bubble-id={id}
                className="bubble"
                data-popping={isPopping || undefined}
                style={{
                    '--bubble-color': `var(${cssColorVar})`,
                    '--bubble-size': `${size}`,
                    '--float-duration': `${animationLength}ms`,
                    left,
                    top,
                }}
            >
                <Button
                    className="bubble-inner"
                    aria-label="Pop bubble"
                    onClick={() => popBubble(id)}
                    id={id}
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
            '--splatter-size': size,
            '--splatter-animation-delay': delay,
            '--splatter-color': `var(${cssColorVar})`,
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
            {bubbles.map(generateBubble)}
            {splatters.map(generateSplatter)}
        </>
    )
}