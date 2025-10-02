import { ComponentPropsWithRef, ReactNode, type MouseEvent } from 'react'

export type MouseEventType = MouseEvent<HTMLButtonElement>;

export type ButtonClickHandler<T = void> = (event: MouseEventType) => T | Promise<T>;

export type BaseButtonProps = {
    isLoading?: boolean;
    'data-style'?: 'outlined' | 'filled';
    'data-variant'?: 'primary' | 'secondary' | 'accent';
    onClick?: ButtonClickHandler;
} & Omit<ComponentPropsWithRef<'button'>, 'onClick'>;