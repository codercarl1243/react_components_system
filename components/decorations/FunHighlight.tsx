'use client';
import { generateHashFromChildren } from "@/lib/utils/generateHash";
import clsx from "clsx";
import { ComponentProps, CSSProperties, ReactNode, useMemo } from "react";
import { useInView } from "react-intersection-observer";

type FunHighlightProps = {
    children: ReactNode;
    className?: string;
} & ComponentProps<'span'>;

const COLOR_COUNT = 9;
const MIN_DELAY_MS = 100;
const MAX_DELAY_RANGE_MS = 1200

export default function FunHighlight({ children,
    className = '',
    ...props
}: FunHighlightProps) {
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: true,
        rootMargin: '-50px 0px'
    });

    const style = useMemo<CSSProperties>(() => {
        const stringHash = generateHashFromChildren(children);
        const hashInt = parseInt(stringHash, 16);
        const colorIndex = (hashInt % COLOR_COUNT) + 1;
        const delay = MIN_DELAY_MS + (hashInt >> 8) % MAX_DELAY_RANGE_MS;

        return {
            '--fun-highlight': `var(--color-emphasis-${colorIndex}00)`,
            '--transitionDelay': `${delay}ms`,
        };
    }, [children]);

    return (
        <span
            ref={ref}
            style={style}
            className={clsx('fun-highlight', className, { 'in-view': inView })}
            {...props}
        >
            {children}
        </span>
    );
};