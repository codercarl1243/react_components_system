import Image from '@/components/image';
import Picture from '@/components/image/picture';
import { type TImage } from '@/components/image/image.type';
import { clsx } from 'clsx';
import { ComponentProps, type ReactNode } from 'react';

type Source = {
  media: string;
  srcSet: string;
  type?: string;
};


type FigureProps = Omit<TImage, 'src' > & {
  caption?: ReactNode;
  figureProps?: ComponentProps<'figure'>;
  captionProps?: ComponentProps<'figcaption'>;
  src: string;
  sources?: Source[];
};
/**
 * Semantic <Figure> component that wraps either an <Image> or a responsive <Picture>,
 * with optional caption and full support for figure/caption element props.
 *
 * @example
 * <Figure
 *   caption="Flowchart of the useButton hook"
 *   figureProps={{ className: 'figure--wide' }}
 *   captionProps={{ className: 'text-muted' }}
 *   src="/images/flowchart-horizontal.png"
 *   sources={[
 *     { media: '(max-width: 800px)', srcSet: '/images/flowchart-vertical.png' },
 *   ]}
 * />
 */
export default function Figure({
  caption,
  figureProps,
  captionProps,
  sources,
  ...imageProps
}: FigureProps) {
  const hasCaption = caption && !(typeof caption === 'string' && caption.trim() === '');

  const ImageElement = sources?.length ? (
    <Picture
      sources={sources}
      src={imageProps.src}
      alt={imageProps.alt}
      className={clsx('image', imageProps.className)}
    />
  ) : (
    <Image {...imageProps} />
  );

  if (!hasCaption) return ImageElement;

  return (
    <figure {...figureProps} className={clsx('figure', figureProps?.className)}>
      {ImageElement}
      <figcaption {...captionProps} className={clsx('figure-caption text-sm', captionProps?.className)}>
        {caption}
      </figcaption>
    </figure>
  );
}
