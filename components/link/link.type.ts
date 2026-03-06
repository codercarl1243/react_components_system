import { type ComponentProps } from "react";
import { IconProps } from "@/components/icon/icon.type";

export type LinkProps = {
    icon?: IconProps['icon'];
    showExternalIcon?: boolean;
} & ComponentProps<'a'>