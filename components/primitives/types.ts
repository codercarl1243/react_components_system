import { ElementType, PolymorphicProps } from "react";

/* ---------------------------------- */
/*        Variant Types               */
/* ---------------------------------- */

export type Variant =
    | "primary"
    | "secondary"
    | "accent"
    | "danger"
    | "warning"
    | "success"
    | "info"
    | "neutral"
    | "muted"
    | "ghost";

/* ---------------------------------- */
/*      Variant Appearance Types      */
/* ---------------------------------- */

export type VariantAppearance =
    | "filled"
    | "outlined"
    | "ghost";

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
        align?: "start" | "center" | "end" | "stretch";
        wrap?: boolean; // true = wrap (default), false = nowrap
    } & BaseStyleProps
>;

export type StackProps<T extends ElementType = "div"> =
    PolymorphicProps<T, { gap?: Gap; } & BaseStyleProps>;

export type RowProps<T extends ElementType = "div"> = PolymorphicProps<
    T,
    {
        gap?: Gap;
        align?: "start" | "center" | "end" | "stretch";
        justify?: "start" | "center" | "end" | "between";
    } & BaseStyleProps
>;