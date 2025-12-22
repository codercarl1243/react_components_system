import type { ComponentProps, ComponentPropsWithRef, ReactElement, ReactNode } from "react";
import type { BlockWrapperProps } from "../primitives/types";
import { AccessibleLabel } from "@/types/accessibility";

type ControlledRadioProps =
    | { checked: boolean; onChange: ComponentProps<"input">["onChange"] }
    | { defaultChecked?: boolean; onChange?: ComponentProps<"input">["onChange"] };

export type RadioInputProps = Omit<
    ComponentPropsWithRef<"input">,
    "type" | "onChange" | "checked" | "defaultChecked"
> & {
    type?: "radio";
    visuallyHidden?: boolean;
} & ControlledRadioProps;

type RadioGroupItem = Omit<RadioInputProps, 'id' | 'name'> & {
    id: string;
    labelChild: ReactNode;
};

type HiddenRadioGroupItem = RadioGroupItem & {
    visualElement: ReactElement;
};

export type RadioGroupProps =  BlockWrapperProps<'fieldset', {
    name: string;
    items: RadioGroupItem[];
    legendChild: ReactNode;
}>

export type HiddenRadioGroupProps = BlockWrapperProps<'div', {
    name: string;
    items: HiddenRadioGroupItem[];
}> & AccessibleLabel;