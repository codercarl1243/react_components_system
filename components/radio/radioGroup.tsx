import { Fragment } from "react";
import { Block } from "@/components/primitives";
import RadioInput from "./input";
import type { RadioGroupProps } from "./types";
import { isEmptyString, isNullish } from "@/lib/utils/guards";
import { logWarning } from "@/lib/logging/log";

export default function RadioGroup({
    items,
    name,
    legendChild,
    orientation = "horizontal",
    ...props }: RadioGroupProps) {

    if (isNullish(name) || isEmptyString(name)) {
        logWarning("RadioGroup: `name` must be a non-empty string for proper grouping and accessibility.")
    }

    return (
        <Block as="fieldset" {...props} data-layout={orientation} className="radiogroup">
            <legend id={`${name}-legend`}>{legendChild}</legend>
            {items.map(({
                id,
                labelChild,
                value,
                ...inputProps
            }) => (
                <Fragment key={id}>
                    <label htmlFor={id}>{labelChild}</label>
                    <RadioInput
                        id={id}
                        name={name}
                        value={value}
                        {...inputProps}
                    />
                </Fragment>
            ))}
        </Block>
    )
}