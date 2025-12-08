import type { MouseEvent } from 'react'
import { IconProps } from '@/components/icon/icon.type';
import { BlockWrapperProps } from '../primitives/types';

export type MouseEventType = MouseEvent<HTMLButtonElement>;

export type ButtonClickHandler = (event: MouseEventType) => void | Promise<void>;

export type TButtonAppearance = 'outlined' | 'filled' | 'ghost';
export type TButtonVariant =  'primary' | 'secondary' | 'accent' | 'neutral' | 'danger' | 'warning';

type BaseButtonProps = {
    disabled?: boolean; 
    isLoading?: boolean;
    icon?: IconProps['icon'];
    onClick?: ButtonClickHandler;
    variant?: TButtonVariant;
    appearance?: TButtonAppearance;
};

export type ButtonProps = Omit<BlockWrapperProps<"button", BaseButtonProps> , 'as'>

type AccessibleLabel =
  | { 'aria-label': string; 'aria-labelledby'?: never }
  | { 'aria-labelledby': string; 'aria-label'?: never };

export type IconButtonProps = AccessibleLabel & Omit<ButtonProps, 'children'>;