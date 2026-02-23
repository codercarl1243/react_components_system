import type { IconProps } from "@/components/icon/icon.type";
import type { Paint } from "@/types/paint";
import type { Variant, VariantAppearance } from "@/types/variant";
import type { ComponentProps } from "react";

export type TSwitchProps = {
    checked: boolean;
    icon?: Element | IconProps['icon'];
    variant?: Variant;
    variantAppearance?: VariantAppearance;
    paint?: Paint;
} & Omit<ComponentProps<"button">, "role" | "aria-checked">;