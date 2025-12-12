import { Block } from "@/components/primitives";
import type { LabelProps } from "@/components/select/types";

export default function Label({id, children, ...props }: LabelProps) {

    return (
        <Block
            as="label"
            className="select-label"
            htmlFor={id}
            {...props}
        >
            {children}
        </Block>
    )
}