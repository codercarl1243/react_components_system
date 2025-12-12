import type { BlockProps } from "@/components/primitives/types";
import type { ReactNode } from "react";

export type SelectOptionProps = BlockProps<'option'> & {
    label: ReactNode;
    value: string;
};

export type LabelProps = { label: ReactNode; id: string } & Omit<BlockProps<"label">, "as" | "htmlFor" | "children">;

export type SelectProps =
    BlockProps<"select"> & {
        label?: ReactNode;
        options: SelectOptionProps[];
        error?: ReactNode;
        helperText?: ReactNode;
    };