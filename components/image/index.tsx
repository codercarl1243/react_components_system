'use client';

import { type TImage } from "@/components/image/image.type";
import NextImage from 'next/image';
import { clsx } from 'clsx';
import { imageVariants } from "@/components/image/imageVariants";
import { type SyntheticEvent, useState } from "react";

/**
 * Enhanced Image component that wraps Next.js Image with predefined variants
 * and automatic optimizations for different image types.
 * 
 * @param variant - Image variant that determines dimensions, aspect ratio, quality, and blur placeholder.
 *                  Defaults to 'default' if not specified.
 * @param src - Image source URL or imported image object
 * @param alt - Alternative text for accessibility (required)
 * @param props - All other Next.js Image props (className, style, priority, placeholder, blurDataURL, quality, etc.)
 * 
 * @returns Next.js Image component with variant-based configuration
 * 
 * @example
 * ```tsx
 * // Basic usage with variant
 * <Image variant="hero" src="/hero.jpg" alt="Hero image" />
 * 
 * // With custom overrides
 * <Image 
 *   variant="card" 
 *   src="/card.jpg" 
 *   alt="Card image"
 *   quality={95}
 *   className="rounded-lg"
 * />
 * 
 * // Fallback to default variant
 * <Image src="/image.jpg" alt="Image" />
 * ```
 */
export default function Image({ variant, src, alt, ...props }: TImage) {

    const [isLoading, setIsLoading] = useState(true);
    const { className, sizes, width, style, height, priority, placeholder, blurDataURL, quality, ...rest } = props
    const {
        width: variantWidth,
        height: variantHeight,
        sizes: variantSizes,
        aspectRatio,
        blurDataURL: variantBlurDataURL,
        quality: variantQuality
    } = imageVariants[variant ?? "default"];

    function handleOnLoad(event: SyntheticEvent<HTMLImageElement, Event>) {
        props?.onLoad?.(event);
        setIsLoading(false)
    }
    function handleOnError(event: SyntheticEvent<HTMLImageElement, Event>) {
        props.onError?.(event);
        setIsLoading(false)
    }

    return (
        <span
            className={clsx(
                'image-wrapper image',
                isLoading && 'image-loading',
                className
            )}
        >
            <NextImage
                className={clsx(
                    
                    // 'image',
                    variant && `image--${variant}`,
                )}
                data-loading={isLoading}
                src={src}
                alt={alt}
                sizes={sizes ?? variantSizes}
                width={width ?? variantWidth}
                height={height ?? variantHeight}
                style={{ aspectRatio, ...style }}
                priority={priority ?? (variant === 'hero' || variant === "banner" || variant === "featured")}
                placeholder={placeholder || 'blur'}
                blurDataURL={blurDataURL || variantBlurDataURL}
                quality={quality ?? variantQuality}
                onLoad={handleOnLoad}
                onError={handleOnError}
                {...rest}
            />
        </span>
    );
}