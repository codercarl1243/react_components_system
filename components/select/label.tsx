import { Block } from "@/components/primitives";
import type { LabelProps } from "@/components/select/types";


export default function Label({ label, id, ...props }: LabelProps) {

    return (
        <Block
            as="label"
            className="select-label"
            htmlFor={id}
            {...props}
        >
            {label}
        </Block>
    )
}