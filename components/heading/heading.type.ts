import type { ComponentProps, ReactNode } from 'react'

export type HeadingLevelsType = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingTag = `h${HeadingLevelsType}`;

export type HeadingPropsType = {
    headingLevel?: HeadingLevelsType;
    headingSize?: HeadingLevelsType;
    children: ReactNode;
} & ComponentProps<HeadingTag>;
