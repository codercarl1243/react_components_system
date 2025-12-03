import clsx from "clsx";
import { ComponentProps } from "react";
import { Block } from "./primitives";
import { BlockProps } from "./primitives/types";

type UlMarkers = 'default' | 'disc' | 'circle' | 'square' | 'none';
type OlMarkers = 'default' | 'decimal' | 'lower-alpha' | 'upper-alpha' | 'lower-roman' | 'upper-roman' | 'none';

type BaseListProps = {
  className?: string;
  spacing?: 'tight' | 'normal' | 'loose';
};

type UnorderedListProps = BlockProps<'ul'> & BaseListProps & {
  ordered?: false;
  marker?: UlMarkers;
};
type OrderedListProps = BlockProps<'ol'> & BaseListProps & {
  ordered: true;
  marker?: OlMarkers;
};

type ListProps = UnorderedListProps | OrderedListProps;

export default function List({
  children,
  className,
  ordered = false,
  marker = 'circle',
  spacing = 'tight',
  ...props
}: ListProps) {

  const spacingClasses = {
    tight: 'list--tight',
    normal: 'list--normal',
    loose: 'list--loose'
  };

  const ulMarkerClasses: Record<UlMarkers, string> = {
    default: 'list--disc',
    disc: 'list--disc',
    circle: 'list--circle',
    square: 'list--square',
    none: 'list--none'
  };

  const olMarkerClasses: Record<OlMarkers, string> = {
    default: 'list--decimal',
    decimal: 'list--decimal',
    'lower-alpha': 'list--lower-alpha',
    'upper-alpha': 'list--upper-alpha',
    'lower-roman': 'list--lower-roman',
    'upper-roman': 'list--upper-roman',
    none: 'list--none'
  };

  const markerClasses = ordered ? olMarkerClasses[marker as OlMarkers] : ulMarkerClasses[marker as UlMarkers];

  const listClasses = clsx(
    'list',
    markerClasses,
    spacingClasses[spacing],
    className
  );

  const role = marker === 'none' ? 'list' : undefined;

  if (ordered) {
    return (
      <Block as="ol" className={listClasses} role={role} {...props}>
        {children}
      </Block>
    );
  }

  return (
    <Block as="ul" className={listClasses} role={role} {...props}>
      {children}
    </Block>
  );
}