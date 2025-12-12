import type { BlockProps } from "@/components/primitives/types";
import type { ReactNode } from "react";

export type LabelProps =  {selectId: string;} & Omit<BlockProps<"label">, "as" | "htmlFor" >;

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
    | (SelectBaseProps & { labelChildren?: undefined })
    | (SelectBaseProps & { labelChildren: ReactNode; id: string });