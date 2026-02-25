import type { BlockWrapperProps } from "@/components/primitives/types";

export type TBubble = {
    id: string;
    left: string;
    top: string;
    size: string;
    cssColorVar: string;
    floatAnimation: string;
    animationLength: number;
    isPopping: boolean;
};

export type TSplatter = {
    id: string;
    x: number;
    y: number;
    size: string;
    delay: string;
    endX: number;
    endY: number;
    cssColorVar: string;
};

export type Timeout = ReturnType<typeof setTimeout>;

export type TBubbleProps = {
    bubbles: TBubble[];
    splatters: TSplatter[];
    popBubble: (bubbleId: string) => void;
}

export type TBubbleCardProps = BlockWrapperProps<'div', {
    closeFunction: () => void;
    bubbleCount: number;
}>