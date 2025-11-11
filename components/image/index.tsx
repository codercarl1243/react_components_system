'use client';

import { type TImage } from "@/components/image/image.type";
import NextImage from 'next/image';
import { clsx } from 'clsx';
import { imageVariants } from "@/components/image/imageVariants";
import { type SyntheticEvent, useRef, useState } from "react";

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
    const wrapperRef = useRef<HTMLSpanElement>(null);
    const { className, sizes, width, style, height, priority, placeholder, blurDataURL, quality, onLoad, onError, ...rest } = props

    const {
        width: variantWidth,
        height: variantHeight,
        sizes: variantSizes,
        aspectRatio,
        blurDataURL: variantBlurDataURL,
        quality: variantQuality
    } = imageVariants[variant ?? "default"];


    /**
     * When the image fully loads, we delay the loading-state removal
     * until the shimmer animation finishes (CSS animation-duration).
     */
    function handleOnLoad(event: SyntheticEvent<HTMLImageElement, Event>) {
        onLoad?.(event);

        const el = wrapperRef.current;
        const duration = getAnimationDurationMs(el);
        const buffer = 100;

        // Wait until shimmer animation finishes
        window.setTimeout(() => setIsLoading(false), duration + buffer);


        function getAnimationDurationMs(element: HTMLElement | null): number {
            if (!element) return 2500;

            const styles = getComputedStyle(element, "::before");
            const durationString = styles.animationDuration || "2.5s";

            const numeric = parseFloat(durationString);
            return durationString.includes("ms") ? numeric : numeric * 1000;
        }
    }
    
    function handleOnError(event: SyntheticEvent<HTMLImageElement, Event>) {
        onError?.(event);
        setIsLoading(false)
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
                isLoading && 'image-loading',
                className
            )}
            ref={wrapperRef}
        >
            <NextImage
                src={src}
                alt={alt}
                sizes={sizes ?? variantSizes}
                width={width ?? variantWidth}
                height={height ?? variantHeight}
                style={{ aspectRatio, ...style }}
                priority={isPriority}
                placeholder={imagePlaceholder}
                blurDataURL={imageBlurDataURL}
                quality={quality ?? variantQuality}
                onLoad={handleOnLoad}
                onError={handleOnError}
                fetchPriority={isPriority ? "high" : "auto"}
                {...rest}
            />
        </span>
    );
}