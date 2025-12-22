import { Fragment } from "react/jsx-runtime";
import { Block } from "../primitives";
import type { HiddenRadioGroupProps } from "./types";
import RadioInput from "./input";

export default function HiddenRadioGroup({ items, name, ...props }: HiddenRadioGroupProps) {

    return (
        <Block {...props} role="radiogroup" className="radiogroup radiogroup--hidden">
            {items.map(({
                id,
                value,
                visualElement,
                labelChild,
                ...inputProps
            }) => (
                <Fragment key={id}>
                    <label htmlFor={id} className="sr-only">{labelChild}</label>
                    <RadioInput
                        {...inputProps}
                        id={id}
                        name={name}
                        value={value}
                        visuallyHidden={true}
                    />
                    {visualElement}
                </ Fragment>
            ))}
        </Block>
    )
}