import { Block } from "@/components/primitives";
import { ReactNode } from "react";


export default function Label({ label, id }: { label: ReactNode; id: string; }) {

    return (
        <Block
            as="label"
            className="select-label"
            htmlFor={id}
        >
            {label}
        </Block>
    )
}