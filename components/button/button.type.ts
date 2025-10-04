import type { ComponentPropsWithRef, MouseEvent } from 'react'

export type MouseEventType = MouseEvent<HTMLButtonElement>;

export type ButtonClickHandler<T = unknown> = (event: MouseEventType) => T | Promise<T>;

export type BaseButtonProps = {
    disabled?: boolean; 
    isLoading?: boolean;
    'data-style'?: 'outlined' | 'filled';
    'data-variant'?: 'primary' | 'secondary' | 'accent';
    onClick?: ButtonClickHandler;
} & Omit<ComponentPropsWithRef<'button'>, 'onClick' | 'disabled'>;