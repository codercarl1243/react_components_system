import clsx from "clsx";
import type { RadioInputProps } from "./types";

export default function RadioInput({
    className,
    visuallyHidden,
    ...props }: RadioInputProps
) {

    return (
        <input
            type="radio"
            className={clsx(
                { "sr-only": visuallyHidden },
                "radio-input",
                className)}
            {...props}
        />
    )
}