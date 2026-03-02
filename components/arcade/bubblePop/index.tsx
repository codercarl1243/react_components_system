"use client";
import { useEffect, useRef, useState } from "react";

import Bubbles from "@/components/bubbles/bubbles";
import useBubbles from "@/components/bubbles/useBubble";
import { Inline } from "@/components/primitives";

import type { ArcadeShellAPI } from "@/components/arcade/type";
import bubblesController from "./controller";


type BubblesGameProps = {
    arcade: ArcadeShellAPI;
};

export default function BubblesGame({ arcade }: BubblesGameProps) {

    const {bubbles, splatters, handleClickBubble, score, combo} = bubblesController(arcade);

    return (
        <>
            <Bubbles
                bubbles={bubbles}
                splatters={splatters}
                popBubble={handleClickBubble}
            />

            <Inline className="mt-auto">
                <p aria-live="polite">Score: {score}</p>
                <p className={combo > 1 ? "combo-active" : ""}>
                    Combo x{combo}
                </p>
                {arcade.isTurbo ? <p>turbo boost active</p> : null}
            </Inline>
        </>

    )
}