import { Block } from "@/components/primitives";
import type { ToggleGroupProps } from "../button.type";
import clsx from "clsx";
import Toggle from "./toggle";
import { logWarning } from "@/lib/logging/log";

export default function ToggleGroup({
    orientation = "horizontal",
    items,
    onValueChange,
    value,
    className,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    ...props
}: ToggleGroupProps) {

    if (ariaLabel && ariaLabelledBy) {
        logWarning("ToggleGroup: Provide either `aria-label` or `aria-labelledby`, not both.");
    }

    return (
        <Block
            className={clsx("togglegroup", className)}
            data-layout={orientation}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            {...props}>
            {items.map(({ value: itemValue, ...item }) => (
                <Toggle
                    key={itemValue}
                    {...item}
                    pressed={itemValue === value}
                    onClick={() => onValueChange(itemValue)}
                />
            ))}
        </Block>
    )
}