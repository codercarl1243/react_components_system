import clsx from "clsx";
import { ComponentProps } from "react";

type BaseListProps = {
  className?: string;
  variant?: 'default' | 'disc' | 'circle' | 'square' | 'decimal' | 'none';
  spacing?: 'tight' | 'normal' | 'loose';
};

type UnorderedListProps = ComponentProps<'ul'> & BaseListProps & { ordered?: false };
type OrderedListProps = ComponentProps<'ol'> & BaseListProps & { ordered: true; start?: number };

type ListProps = UnorderedListProps | OrderedListProps;

export default function List({
  children,
  className,
  ordered = false,
  variant = 'default',
  spacing = 'normal',
  ...props
}: ListProps) {

  //   const spacingClasses = {
  //     tight: 'space-y-1',
  //     normal: 'space-y-2',
  //     loose: 'space-y-4'
  //   };

  //   const variantClasses = {
  //     default: ordered ? 'list-decimal' : 'list-disc',
  //     disc: 'list-disc',
  //     circle: 'list-circle',
  //     square: 'list-square',
  //     decimal: 'list-decimal',
  //     none: 'list-none'
  //   };

  const listClasses = clsx(
    'list flow-4',
    // variantClasses[variant],
    // spacingClasses[spacing],
    // 'pl-6',
    className
  );

  if (ordered) {
    const { start, ...olProps } = props as OrderedListProps;
    return (
      <ol className={listClasses} start={start} {...olProps}>
        {children}
      </ol>
    );
  }

  return (
    <ul className={listClasses} {...props}>
      {children}
    </ul>
  );
}