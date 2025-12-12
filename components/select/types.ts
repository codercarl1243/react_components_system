import type { BlockProps } from "@/components/primitives/types";
import type { ReactNode } from "react";

export type SelectOptionProps = BlockProps<'option'> & {
    label: ReactNode;
    value: string;
};

export type SelectProps =
    BlockProps<"select"> & {
        label?: ReactNode;
        options: SelectOptionProps[];
        error?: ReactNode;
        helperText?: ReactNode;
    };