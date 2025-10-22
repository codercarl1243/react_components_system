import log from '@/lib/logging/log';
import clsx from 'clsx';

type Source = {
  srcSet: string;
  media?: string;
  type?: string;
};

type PictureProps = {
  /** Array of responsive source definitions */
  sources: Source[];
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  className?: string;
} & React.ComponentPropsWithoutRef<'picture'>;

export default function Picture({
  sources,
  src,
  alt,
  width,
  height,
  loading = 'lazy',
  className,
  ...rest
}: PictureProps) {

  if (!sources || sources.length === 0) {
    log("Picture component requires at least one source.");
  }

  return (
    <picture className={clsx('picture', className)} {...rest}>
      {sources.map(({ media, srcSet, type }, index) => (
        <source key={index} media={media} srcSet={srcSet} type={type} />
      ))}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        className="image"
        decoding="async"
      />
    </picture>
  );
}
