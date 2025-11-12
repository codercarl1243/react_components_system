'use client';
import clsx from "clsx";
import { ComponentProps } from "react";
import { useInView } from "react-intersection-observer";

type FunUnderlineProps = {
    children: React.ReactNode;
    className?: string;
    individual?: boolean;
} & ComponentProps<'span'>;

export default function FunHighlight({ children,
    className = '',
    individual = false,
    ...props
}: FunUnderlineProps) {
    const { ref, inView } = useInView({
        threshold: 0.2,
    });
    const colorIndex = Math.floor(Math.random() * 9) + 1;
    const delay = Math.random() * 400;

    const style: React.CSSProperties = {
        '--background': `var(--color-emphasis-${colorIndex}00)`,
        transitionDelay: `${delay}ms`,
    } as React.CSSProperties;

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