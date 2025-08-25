import type { ComponentProps, ReactNode } from "react";

export type HeadingLevelsType = 1 | 2 | 3 | 4;

export type HeadingTag = `h${HeadingLevelsType}`;

export type HeadingPropsType = {
    headingLevel?: HeadingLevelsType;
    children: ReactNode;
} & ComponentProps<HeadingTag>;