import { Block } from "@/components/primitives";


export default function Label({ label, id }: { label: string; id: string; }) {

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