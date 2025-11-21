import { ElementType, PolymorphicProps } from "react";

type Gap = 0 | 2 | 4 | 6 | 8 | 16;

export type BlockProps<T extends ElementType = "div"> = PolymorphicProps<T>;

export type InlineProps<T extends ElementType = "div"> = PolymorphicProps<
    T,
    {
        gap?: Gap
        align?: "start" | "center" | "end" | "stretch";
        wrap?: boolean; // true = wrap (default), false = nowrap
    }
>;

export type StackProps<T extends ElementType = "div"> =
    PolymorphicProps<T, { gap?: Gap; }>;

export type RowProps<T extends ElementType = "div"> = PolymorphicProps<
    T,
    {
        gap?: Gap;
        align?: "start" | "center" | "end" | "stretch";
        justify?: "start" | "center" | "end" | "between";
    }
>;