import { Block } from "@/components/primitives";
import Button from "@/components/button";
import Icon from "@/components/icon";
import { RiCloseLargeLine } from "@remixicon/react";
import { TBubbleCardProps } from "./type";


export default function BubbleCard({closeFunction, bubbleCount, ...props}: TBubbleCardProps) {

    return (

        <Block variant="primary" variantAppearance="outlined" paint="all" className="bubbles__card" {...props}>
            <Button
                className="bubble-card__close"
                onClick={closeFunction}
                aria-label="Close bubble info"
            >
               <Icon icon={RiCloseLargeLine} />
            </Button>

            <p>
                Click on a Bubble to <span className="italic">pop</span> it.
            </p>

            <p>
                Current Number of Bubbles:{" "}
                <span className="bubble-count">
                    {bubbleCount}
                </span>
            </p>
        </Block>
    )
}