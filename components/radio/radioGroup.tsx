import { Fragment } from "react/jsx-runtime";
import { Block } from "@/components/primitives";
import RadioInput from "./input";
import type { RadioGroupProps } from "./types";
import { isEmptyString } from "@/lib/utils/guards";
import { logWarning } from "@/lib/logging/log";

export default function RadioGroup({
    items,
    name,
    legendChild,
    layout = "horizontal",
    ...props }: RadioGroupProps) {

    if (isEmptyString(name)) {
        logWarning("RadioGroup: `name` must be a non-empty string for proper grouping and accessibility.")
    }

    return (
        <Block as="fieldset" {...props} data-layout={layout} className="radiogroup">
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
                </ Fragment>
            ))}
        </Block>
    )
}