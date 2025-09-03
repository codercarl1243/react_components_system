import { ComponentPropsWithRef } from "react";

export type BaseButtonProps = {
    isLoading?: boolean;
    "data-styled"?: "outlined" | "filled";
    "data-variant"?: "primary" | "secondary" | "accent";
} & ComponentPropsWithRef<"button">;