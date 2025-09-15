import clsx from "clsx";
import { ComponentProps } from "react";

type FunUnderlineProps = {
    children: React.ReactNode;
    color?: string;
    className?: string;
    individual?: boolean;
} & ComponentProps<'span'>;

export default function FunHighlight({ children,
    color = 'currentColor',
    className = '',
    individual = false
}: FunUnderlineProps) {

    return (
        <span
            className={clsx(className, 'fun-highlight', { "individual": individual })}
        >
            {children}
        </span>
    );
};