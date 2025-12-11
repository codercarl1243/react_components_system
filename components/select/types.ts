import type { BlockProps } from "@/components/primitives/types";

export type SelectOptionProps = BlockProps<'option'> & {
    label: string;
    value: string;
};

export type SelectProps =
    BlockProps<"select"> & {
        label?: string;
        options: SelectOptionProps[];
        error?: string;
        helperText?: string;
    };