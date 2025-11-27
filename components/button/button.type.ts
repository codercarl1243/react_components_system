import type { MouseEvent } from 'react'
import { IconProps } from '@/components/icon/icon.type';
import { BlockProps } from '../primitives/types';

export type MouseEventType = MouseEvent<HTMLButtonElement>;

export type ButtonClickHandler = (event: MouseEventType) => void | Promise<void>;

export type TButtonAppearance = 'outlined' | 'filled' | 'ghost';
export type TButtonVariant =  'primary' | 'secondary' | 'accent' | 'neutral' | 'danger' | 'warning';

export type BaseButtonProps = {
    disabled?: boolean; 
    isLoading?: boolean;
    icon?: IconProps['icon'];
    onClick?: ButtonClickHandler;
    variant?: TButtonVariant;
    appearance?: TButtonAppearance;
} & Omit<BlockProps<"button">, 'onClick' | 'disabled' | 'as'>;

type AccessibleLabel =
  | { 'aria-label': string; 'aria-labelledby'?: never }
  | { 'aria-labelledby': string; 'aria-label'?: never };

export type IconButtonProps = AccessibleLabel & Omit<BaseButtonProps, 'children'>;