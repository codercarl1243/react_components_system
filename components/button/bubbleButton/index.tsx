'use client';
import Button from "@/components/button";
import useBubbles from "./useBubble";
import { RiBubbleChartLine, RiWindyLine } from "@remixicon/react";
import Bubbles from "./bubbles";
import BubbleCard from "./bubbleCard";

export default function BubbleButton() {
    const { bubbles, splatters, popBubble, addBubble, cardVisibility, toggleCardVisibility, isLoading } = useBubbles();

    return (
        <>
            {(bubbles.length > 0 && cardVisibility === "collapsed") && (
                <Button onClick={toggleCardVisibility}>Display bubble counter</Button>
            )}
            {cardVisibility === "displayed" && (
                <BubbleCard
                    bubbleCount={bubbles.length}
                    closeFunction={toggleCardVisibility}
                />
            )}
            <Bubbles
                bubbles={bubbles}
                splatters={splatters}
                popBubble={popBubble}
            />
            <Button
                onClick={addBubble}
                isLoading={isLoading}
                variantAppearance="outlined"
                variant="accent"
                aria-describedby="bubble-description"
                icon={isLoading ? RiBubbleChartLine : RiWindyLine}
            >
                Blow a Bubble
            </Button>
        </>
    )
}