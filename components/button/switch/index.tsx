import clsx from "clsx";
import { TSwitchProps } from "./type";

export default function Switch({ checked, variant = "inverse", variantAppearance = "filled", paint = "all", children, className, ...props }: TSwitchProps) {

    return (
        <button
            {...props}
            type="button"
            aria-checked={checked}
            role="switch"
            data-variant={variant}
            data-appearance={variantAppearance}
            data-paint={paint}
            className={clsx(className, 'switch')}>
            {children}
        </button>
    )
}