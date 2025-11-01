import type { ComponentPropsWithRef, MouseEvent } from 'react'
import { IconProps } from '@/components/icon/icon.type';

export type MouseEventType = MouseEvent<HTMLButtonElement>;

export type ButtonClickHandler = (event: MouseEventType) => void | Promise<void>;

export type TVariant = 'primary' | 'secondary' | 'accent' | 'danger';

export type TButtonStyle = 'outlined' | 'filled' | 'ghost';

export type BaseButtonProps = {
    disabled?: boolean; 
    isLoading?: boolean;
    icon?: IconProps['icon'];
    'data-style'?: TButtonStyle;
    'data-variant'?: TVariant;
    onClick?: ButtonClickHandler;
} & Omit<ComponentPropsWithRef<'button'>, 'onClick' | 'disabled'>;

type AccessibleLabel =
  | { 'aria-label': string; 'aria-labelledby'?: never }
  | { 'aria-labelledby': string; 'aria-label'?: never };

export type IconButtonProps = AccessibleLabel & Omit<BaseButtonProps, 'children'>;