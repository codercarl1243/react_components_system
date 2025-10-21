import type { ImageProps as NextImageProps } from 'next/image';

export type TNextImageProps = NextImageProps;

export type ImageVariant = 
  | 'logo'
  | 'rectangleLogo'
  | 'card'
  | 'featured'
  | 'default'
  | 'hero'
  | 'banner'
  | 'general'
  | 'textWithImage';

export interface ImageVariantConfig {
    width: number;
    height: number;
    sizes: string;
    aspectRatio: number | 'auto';
    blurDataURL: string;
    quality: number;
}

export type TImageVariants = Record<ImageVariant, ImageVariantConfig>;

export type TImage = {variant?: ImageVariant; alt: string } & Omit<TNextImageProps, 'alt'>;