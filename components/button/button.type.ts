import { ComponentPropsWithRef, ReactNode } from 'react'

export type BaseButtonProps = {
    isLoading?: boolean;
    loadingText?: ReactNode;
    'data-style'?: 'outlined' | 'filled';
    'data-variant'?: 'primary' | 'secondary' | 'accent';
} & ComponentPropsWithRef<'button'>;
