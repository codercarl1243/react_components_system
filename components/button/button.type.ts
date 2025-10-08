import type { ComponentPropsWithRef, MouseEvent } from 'react'
import { IconProps } from '@/components/icon/icon.type';

export type MouseEventType = MouseEvent<HTMLButtonElement>;

export type ButtonClickHandler<T = unknown> = (event: MouseEventType) => T | Promise<T>;

export type BaseButtonProps = {
    disabled?: boolean; 
    isLoading?: boolean;
    icon?: IconProps['icon'];
    'data-style'?: 'outlined' | 'filled';
    'data-variant'?: 'primary' | 'secondary' | 'accent';
    onClick?: ButtonClickHandler;
} & Omit<ComponentPropsWithRef<'button'>, 'onClick' | 'disabled'>;