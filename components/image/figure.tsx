import Image from '@/components/image';
import { type TImage } from '@/components/image/image.type';
import { clsx } from 'clsx';
import { type ReactNode } from 'react';

export interface FigureProps extends TImage {
    /** Caption text or custom caption content */
    caption?: ReactNode;
    /** Additional className for the figure wrapper */
    figureClassName?: string;
    /** Additional className for the figcaption element */
    captionClassName?: string;
}

/**
 * Semantic Figure component that wraps the Image component with optional caption.
 * Uses HTML5 <figure> and <figcaption> elements for proper semantic markup.
 * 
 * @param caption - Caption text or custom React node to display with the image
 * @param figureClassName - Additional classes for the figure wrapper
 * @param captionClassName - Additional classes for the figcaption element
 * @param variant - Image variant passed to the Image component
 * @param src - Image source URL
 * @param alt - Alternative text for the image (required)
 * @param props - All other Image component props
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Figure 
 *   variant="card"
 *   src="/photo.jpg"
 *   alt="A beautiful landscape"
 *   caption="Sunset over the mountains"
 * />
 * ```
 */
export default function Figure({
    caption,
    figureClassName,
    captionClassName,
    ...imageProps
}: FigureProps) {

    if (!caption) {
        return <Image {...imageProps} />
    }

    const captionElement =
        <figcaption className={clsx('figure-caption text-sm', captionClassName)}>
            {caption}
        </figcaption>;

    return (
        <figure className={clsx('figure', figureClassName)}>
            <Image {...imageProps} />
            {captionElement}
        </figure>
    );
}