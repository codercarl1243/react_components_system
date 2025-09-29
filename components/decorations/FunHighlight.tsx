import clsx from "clsx";
import { ComponentProps } from "react";

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

    return (
        <span
            className={clsx(className, 'fun-highlight', { individual })}
            {...props}
        >
            {children}
        </span>
    );
};