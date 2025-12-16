import type { Paint } from "@/types/paint";
import type { Variant, VariantAppearance } from "@/types/variant";
import type { ElementType, PolymorphicProps } from "react";

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

    /**
     * Opt-in paint behavior.
     *
     * - Presets: 'all', 'surface'
     * - Channels: 'background', 'foreground', 'border'
     *
     * Channels may be combined.
     */
    paint?: Paint;
} & {
    'data-style'?: never;
    'data-appearance'?: never;
    'data-paint'?: never;
};

/* ---------------------------------- */
/*            Utilities               */
/* ---------------------------------- */

export type Gap = 0 | 2 | 4 | 6 | 8 | 16;


/* ---------------------------------- */
/*  Block — structural + Variants     */
/* ---------------------------------- */
export type BlockProps<
    T extends ElementType = "div"
> = PolymorphicProps<T, BaseStyleProps>;

/**
 * Helper type for components that wrap Block with additional props.
 */
export type BlockWrapperProps<
    T extends ElementType = "div",
    AdditionalProps = object
> = PolymorphicProps<T, BaseStyleProps & AdditionalProps>;

export type InlineProps<T extends ElementType = "div"> = BlockWrapperProps<T, {
    gap?: Gap
    align?: "start" | "center" | "end" | "stretch" | "baseline";
    wrap?: boolean; // true = wrap (default), false = nowrap
}>

export type StackProps<T extends ElementType = "div"> =
    BlockWrapperProps<T, {
        gap?: Gap;
        align?: "start" | "center" | "end" | "stretch" | "baseline";
        justify?: "start" | "center" | "end" | "stretch";
    }>;

export type RowProps<T extends ElementType = "div"> = BlockWrapperProps<T,
    {
        gap?: Gap;
        align?: "start" | "center" | "end" | "stretch";
        justify?: "start" | "center" | "end" | "between";
    }
>;