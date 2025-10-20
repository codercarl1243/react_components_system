import Image from '@/components/image'
import clsx from 'clsx';
import type { ComponentProps, ReactNode  } from 'react';

type TextWithImageProps = {
    imagePosition?: 'left' | 'right';
    imageSrc: string;
    imageAlt: string;
    children: ReactNode;
} & ComponentProps<'div'>;

export default function TextWithImage({
    imagePosition = 'right',
    imageSrc,
    imageAlt,
    children,
    className,
     ...props
}: TextWithImageProps) {
    return (
        <div className="text-with-image-container">
            <div
            {...props}
            className={clsx("text-with-image", className)}
            data-image-position={imagePosition}
        >
            <div className="text-with-image__text">{children}</div>
            <Image
                variant="textWithImage"
                src={imageSrc}
                alt={imageAlt}
            />
        </div>
        </div>
    )
}