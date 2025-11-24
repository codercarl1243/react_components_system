import type { PolymorphicProps } from 'react'
import type { IconProps } from '@/components/icon/icon.type';
import type { InlineProps } from '@/components/primitives/types';


export type ValidHeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type HeadingVariant = 'primary' | 'secondary' | 'accent' | 'neutral';

export type BaseHeadingProps = {
    as?: ValidHeadingTag;
    headingSize?: 1 | 2 | 3 | 4 | 5 | 6;
    icon?: IconProps['icon'];
    variant?: HeadingVariant;
};

export type HeadingPropsType<T extends ValidHeadingTag = "h3"> = Omit<InlineProps<T>, 'variant' | 'as'> & BaseHeadingProps;
export type AnchorHeadingPropsType<T extends ValidHeadingTag = "h3"> =  Omit<InlineProps<T>, 'variant' | 'as'> & BaseHeadingProps & { prefix?: string; };