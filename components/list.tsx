import clsx from "clsx";
import { ComponentProps } from "react";

type UlMarkers = 'default' | 'disc' | 'circle' | 'square' | 'none';
type OlMarkers = 'default' | 'decimal' | 'lower-alpha' | 'upper-alpha' | 'lower-roman' | 'upper-roman' | 'none';

type BaseListProps = {
  className?: string;
  spacing?: 'tight' | 'normal' | 'loose';
};

type UnorderedListProps = ComponentProps<'ul'> & BaseListProps & {
  ordered?: false;
  variant?: UlMarkers;
};
type OrderedListProps = ComponentProps<'ol'> & BaseListProps & {
  ordered: true;
  variant?: OlMarkers;
};

type ListProps = UnorderedListProps | OrderedListProps;

export default function List({
  children,
  className,
  ordered = false,
  variant = 'default',
  spacing = 'normal',
  ...props
}: ListProps) {

  const spacingClasses = {
    tight: 'list--tight',
    normal: 'list--normal',
    loose: 'list--loose'
  };

  const ulVariantClasses: Record<UlMarkers, string> = {
    default: 'list--disc',
    disc: 'list--disc',
    circle: 'list--circle',
    square: 'list--square',
    none: 'list--none'
  };

  const olVariantClasses: Record<OlMarkers, string> = {
    default: 'list--decimal',
    decimal: 'list--decimal',
    'lower-alpha': 'list--lower-alpha',
    'upper-alpha': 'list--upper-alpha',
    'lower-roman': 'list--lower-roman',
    'upper-roman': 'list--upper-roman',
    none: 'list--none'
  };

  const variantClasses = ordered ? olVariantClasses[variant as OlMarkers] : ulVariantClasses[variant as UlMarkers];

  const listClasses = clsx(
    'list',
    variantClasses,
    spacingClasses[spacing],
    className
  );

  if (ordered) {
    return (
      <ol className={listClasses} {...(props as ComponentProps<'ol'>)}>
        {children}
      </ol>
    );
  }

  return (
    <ul className={listClasses} {...(props as ComponentProps<'ul'>)}>
      {children}
    </ul>
  );
}