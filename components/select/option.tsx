import type { SelectOptionProps } from "@/components/select/types";
import { isEmptyString, isNullish } from "@/lib/utils/guards";
import { Block } from "@/components/primitives";

export default function SelectOption({ value, label, ...props }: SelectOptionProps) {
    if (isEmptyString(label) || isNullish(value)) {
        return null;
    }

    return (
        <Block
            as="option"
            value={value}
            {...props}
        >
            {label}
        </Block>
    )
}