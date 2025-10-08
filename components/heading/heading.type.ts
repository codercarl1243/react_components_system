import type { ComponentProps, ReactNode } from 'react'
import type { IconProps } from '@/components/icon/icon.type';

export type HeadingLevelsType = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingTag = `h${HeadingLevelsType}`;

export type HeadingPropsType = {
    headingLevel?: HeadingLevelsType;
    headingSize?: HeadingLevelsType;
    icon?: IconProps['icon'];
    children: ReactNode;
} & ComponentProps<HeadingTag>;
