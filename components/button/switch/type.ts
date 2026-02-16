import { IconProps } from "@/components/icon/icon.type";
import { ComponentProps } from "react";

export type TSwitchProps = {
    checked: boolean;
    icon?: IconProps['icon'];
} & Omit<ComponentProps<"button">, "role" | "aria-checked">;