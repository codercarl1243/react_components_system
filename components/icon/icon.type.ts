import type { ElementType, SVGProps } from 'react'

export const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48
} as const

export type PresetSize = keyof typeof sizeMap;

export type IconProps = {
  icon: ElementType;
  size?: PresetSize | number;
  color?: string;
} & SVGProps<SVGSVGElement>;
