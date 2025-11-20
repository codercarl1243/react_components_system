import type { PolymorphicProps } from 'react'
import type { IconProps } from '@/components/icon/icon.type';


export type ValidHeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type BaseHeadingProps = {
    headingSize?: 1 | 2 | 3 | 4 | 5 | 6;
    icon?: IconProps['icon'];
};

export type HeadingPropsType<T extends ValidHeadingTag = "h3"> = PolymorphicProps<T, BaseHeadingProps>;
export type AnchorHeadingPropsType<T extends ValidHeadingTag = "h3"> = PolymorphicProps<T, BaseHeadingProps & { prefix?: string; }>;