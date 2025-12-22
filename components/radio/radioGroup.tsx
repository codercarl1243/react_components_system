import { Fragment } from "react/jsx-runtime";
import { Block } from "../primitives";
import RadioInput from "./input";
import type { RadioGroupProps } from "./types";

export default function RadioGroup({ items, name, legendChild, ...props }: RadioGroupProps) {

    return (
        <Block as="fieldset" {...props} className="radiogroup">
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