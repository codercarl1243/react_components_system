import type { MouseEvent, ReactElement, ReactNode } from 'react'
import type { IconProps } from '@/components/icon/icon.type';
import type { BlockWrapperProps } from '../primitives/types';
import type { AccessibleLabel } from '@/types/accessibility';

export type MouseEventType = MouseEvent<HTMLButtonElement>;

export type ButtonClickHandler = (event: MouseEventType) => void | Promise<void>;

export type TButtonAppearance = 'outlined' | 'filled' | 'ghost';
export type TButtonVariant = 'primary' | 'secondary' | 'accent' | 'neutral' | 'danger' | 'warning';

type BaseButtonProps = {
  disabled?: boolean;
  isLoading?: boolean;
  icon?: IconProps['icon'];
  onClick?: ButtonClickHandler;
  variant?: TButtonVariant;
  appearance?: TButtonAppearance;
};

export type ButtonProps = Omit<BlockWrapperProps<"button", BaseButtonProps>, 'as'>

export type IconButtonProps = AccessibleLabel & Omit<ButtonProps, 'children'>;

export type ToggleButtonProps = ButtonProps & {
  pressed: boolean | "false" | "mixed" | "true" | undefined;
  toggleLabel: ReactNode;
}

export type ToggleGroupItem = Omit<
  ToggleButtonProps,
  "pressed" | "onClick"
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