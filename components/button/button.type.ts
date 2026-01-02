import type { MouseEvent } from 'react'
import type { IconProps } from '@/components/icon/icon.type';
import type { BlockWrapperProps } from '../primitives/types';
import type { AccessibleLabel } from '@/types/accessibility';

export type MouseEventType = MouseEvent<HTMLButtonElement>;

export type ButtonClickHandler = (event: MouseEventType) => void | Promise<void>;

export type TButtonAppearance = 'outlined' | 'filled' | 'ghost';
export type TButtonVariant = 'primary' | 'secondary' | 'accent' | 'neutral' | 'danger' | 'warning' | 'inverse';

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