import { Variant, VariantAppearance } from "@/types/variant";
import { ElementType, PolymorphicProps } from "react";

/* ---------------------------------- */
/*        Shared Style Props          */
/* ---------------------------------- */

export type BaseStyleProps = {
    /**
     * Semantic variant mapping to global color roles.
     * Applies background, foreground, and border tokens.
     */
    variant?: Variant;

    /**
     * Component-level appearance that defines *how*
     * the variant’s color tokens are consumed.
     */
    variantAppearance?: VariantAppearance;
} & {
    'data-style'?: never;
    'data-appearance'?: never;
};

/* ---------------------------------- */
/*            Utilities               */
/* ---------------------------------- */

export type Gap = 0 | 2 | 4 | 6 | 8 | 16;


/* ---------------------------------- */
/*  Block — structural + Variants     */
/* ---------------------------------- */
export type BlockProps<T extends ElementType = "div"> = PolymorphicProps<T, BaseStyleProps>;

export type InlineProps<T extends ElementType = "div"> = PolymorphicProps<
    T,
    {
        gap?: Gap
        align?: "start" | "center" | "end" | "stretch" | "baseline";
        wrap?: boolean; // true = wrap (default), false = nowrap
    } & BaseStyleProps
>;

export type StackProps<T extends ElementType = "div"> =
    PolymorphicProps<T, {
        gap?: Gap;
        align?: "start" | "center" | "end" | "stretch" | "baseline";
        justify?: "start" | "center" | "end" | "stretch";
    } & BaseStyleProps>;

export type RowProps<T extends ElementType = "div"> = PolymorphicProps<
    T,
    {
        gap?: Gap;
        align?: "start" | "center" | "end" | "stretch";
        justify?: "start" | "center" | "end" | "between";
    } & BaseStyleProps
>;