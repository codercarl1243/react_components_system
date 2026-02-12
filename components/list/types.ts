import type { BlockWrapperProps } from "../primitives/types";

export type UlMarker = 'default' | 'disc' | 'circle' | 'square' | 'none';
export type OlMarker = 'default' | 'decimal' | 'lower-alpha' | 'upper-alpha' | 'lower-roman' | 'upper-roman' | 'none';

export type ValidListTag = 'ul' | 'ol' | 'dl';
export type ValidSpacing = 'tight' | 'normal' | 'loose';

export type ListProps<T extends ValidListTag = "ul"> = BlockWrapperProps<
    T,
    {
        spacing?: ValidSpacing;
        marker?: T extends 'ul' ? UlMarker : T extends 'ol' ? OlMarker : never;
    }
>;
