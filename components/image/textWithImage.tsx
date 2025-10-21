import Image from '@/components/image'
import clsx from 'clsx';
import type { ComponentProps, ReactNode } from 'react';

type TextWithImageProps = {
    imagePosition?: 'left' | 'right';
    children: ReactNode;
} & Omit<ComponentProps<typeof Image>, 'variant'>;

export default function TextWithImage({
    imagePosition = 'right',
    children,
    className,
    ...imageProps
}: TextWithImageProps) {
    return (
        <div className="text-with-image-container">
            <div
                className={clsx("text-with-image", className)}
                data-image-position={imagePosition}
            >
                <div className="text-with-image__text">{children}</div>
                <Image
                    variant="textWithImage"
                    {...imageProps}
                />
            </div>
        </div>
    )
}