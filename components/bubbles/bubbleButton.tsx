/** This component generates a single bubble somewhere on the DOM */

import Bubbles from "@/components/bubbles/bubbles";
import useBubbles from "./useBubble";

export default function BubbleButton() {
    const { bubbles, splatters, popBubble, addBubble } = useBubbles();


    return (
        <>
            <button
                className="bubble-button bubble"
                type="button"
                onClick={addBubble}
            >
                <span className="sr-only">Blow a decorative bubble</span>
            </button>
            <Bubbles
                bubbles={bubbles}
                splatters={splatters}
                popBubble={popBubble}
            />
        </>
    )
}