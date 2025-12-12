import type { BlockProps } from "@/components/primitives/types";
import type { ReactNode } from "react";

export type LabelProps = { label: ReactNode; id: string } & Omit<BlockProps<"label">, "as" | "htmlFor" | "children">;

export type SelectOptionProps = BlockProps<'option'> & {
    label: ReactNode;
    value: string;
};

type SelectBaseProps = BlockProps<"select"> & {
    options: SelectOptionProps[];
    error?: ReactNode;
    helperText?: ReactNode;
};

export type SelectProps =
    | (SelectBaseProps & { label?: undefined })
    | (SelectBaseProps & { label: ReactNode; id: string });