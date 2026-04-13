import clsx from "clsx";
import type { TSwitchProps } from "@/components/button/button.type";
import Button from "@/components/button";

export default function Switch({
    checked,
    variant = "inverse",
    variantAppearance = "filled",
    children,
    className,
    ...props }: TSwitchProps) {

    return (
        <Button
            className={clsx(className, 'switch')}
            aria-checked={checked}
            role="switch"
            variant={variant}
            variantAppearance={variantAppearance}
            {...props}
        >
            {children}
        </Button>
    )
}