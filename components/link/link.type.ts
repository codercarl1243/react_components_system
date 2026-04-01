import { IconProps } from "@/components/icon/icon.type";
import { BlockWrapperProps } from "../primitives/types";
import { ComponentProps } from "react";

export type LinkProps = {
    icon?: IconProps['icon'];
    showExternalIcon?: boolean;
} & ComponentProps<'a'>;

export type CTALinkProps = BlockWrapperProps<'a', LinkProps>;