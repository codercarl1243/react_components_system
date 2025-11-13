'use client';
import { generateHashFromChildren } from "@/lib/utils/generateHash";
import clsx from "clsx";
import { ComponentProps, ReactNode, useMemo } from "react";
import { useInView } from "react-intersection-observer";

type FunHighlightProps = {
    children: ReactNode;
    className?: string;
} & ComponentProps<'span'>;

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
        const colorIndex = (hashInt % 9) + 1;
        const delay = 100 + (hashInt >> 8) % 1200;

        return {
            '--background': `var(--color-emphasis-${colorIndex}00)`,
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