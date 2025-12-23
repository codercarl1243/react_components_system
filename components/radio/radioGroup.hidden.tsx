import { Fragment } from "react/jsx-runtime";
import { Block } from "@/components/primitives";
import type { HiddenRadioGroupProps } from "./types";
import RadioInput from "./input";
import { logWarning } from "@/lib/logging/log";
import { isEmptyString, isNullish } from "@/lib/utils/guards";
import clsx from "clsx";

export default function HiddenRadioGroup({
    items,
    name,
    orientation = "horizontal",
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    ...props }: HiddenRadioGroupProps) {


    if (isNullish(name) || isEmptyString(name)) {
        logWarning("HiddenRadioGroup: `name` must be a non-empty string for proper grouping and accessibility.")
    }

    if (ariaLabel && ariaLabelledBy) {
        logWarning("HiddenRadioGroup: Provide either `aria-label` or `aria-labelledby`, not both.");
    }
    
    return (
        <Block
            {...props}
            role="radiogroup"
            data-layout={orientation}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            className="radiogroup radiogroup--hidden radiogroup--hidden__wrapper">
            {items.map(({
                id,
                value,
                visualElement,
                labelChild,
                className,
                ...inputProps
            }) => (
                <Fragment key={id}>
                    <label htmlFor={id} className="sr-only">
                        {labelChild}
                    </label>

                    <RadioInput
                        {...inputProps}
                        id={id}
                        name={name}
                        value={value}
                        visuallyHidden
                        className={clsx("radiogroup--hidden__input", className)}
                    />

                    {visualElement}
                </Fragment>
            ))}

        </Block>
    )
}