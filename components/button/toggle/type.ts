import type { BlockWrapperProps } from "@/components/primitives/types";
import type { AccessibleLabel } from "@/types/accessibility";
import type { ButtonProps } from "../button.type";
import { AriaAttributes } from "react";

export type TogglePressed = AriaAttributes["aria-pressed"];

export type ToggleProps = ButtonProps & {
    pressed: TogglePressed;
}

export type ToggleGroupItem = Omit<
    ButtonProps,
   "onClick"
> & {
    value: string;
};

export type ToggleGroupProps = BlockWrapperProps<'div',
    {
        value: string;
        onValueChange: (value: string) => void;
        items: ToggleGroupItem[];
        orientation?: 'horizontal' | 'vertical';
    } & AccessibleLabel
>;