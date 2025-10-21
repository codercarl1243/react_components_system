import clsx from 'clsx';

type Source = {
  media: string;
  srcSet: string;
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
