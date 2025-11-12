'use client'
import { type TImage } from "@/components/image/image.type";
import NextImage from 'next/image';
import { clsx } from 'clsx';
import { imageVariants } from "@/components/image/imageVariants";
import { on } from "events";
import { ReactEventHandler, SyntheticEvent, useState } from "react";

/**
 * Simplified, performant Image component with graceful fallback.
 * Uses a neutral background color until the image loads, and fades in smoothly.
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
    const [loaded, setLoaded] = useState(false);

    const { className, sizes, width, style, height, priority, placeholder, blurDataURL, quality, onLoad, ...rest } = props

    const {
        width: variantWidth,
        height: variantHeight,
        sizes: variantSizes,
        aspectRatio,
        blurDataURL: variantBlurDataURL,
        quality: variantQuality
    } = imageVariants[variant ?? "default"];

    const handleLoad = (event: SyntheticEvent<HTMLImageElement, Event>) => {
        onLoad?.(event);
        setLoaded(true);
    }

    const isPriority = priority ?? (variant === 'hero' || variant === "banner" || variant === "featured");

    // For priority images, use eager loading without blur to maximize FCP
    const imagePlaceholder = isPriority ? 'empty' : (placeholder ?? 'blur');
    const imageBlurDataURL = imagePlaceholder === 'blur' ? (blurDataURL ?? variantBlurDataURL) : undefined

    return (
        <span
            className={clsx(
                'image-wrapper image',
                variant && `image--${variant}`,
                loaded && 'image--loaded',
                className
            )}
        >
            <NextImage
                src={src}
                alt={alt}
                sizes={sizes ?? variantSizes}
                width={width ?? variantWidth}
                height={height ?? variantHeight}
                style={{
                    aspectRatio,
                    width: width ?? variantWidth,
                    height: height ?? variantHeight,
                    ...style
                }}
                onLoad={handleLoad}
                onError={() => setLoaded(true)}
                priority={isPriority}
                placeholder={imagePlaceholder}
                blurDataURL={imageBlurDataURL}
                quality={quality ?? variantQuality}
                fetchPriority={isPriority ? "high" : "auto"}
                {...rest}
            />
        </span>
    );
}