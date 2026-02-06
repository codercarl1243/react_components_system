import clsx from "clsx";
import { Block } from "@/components/primitives";
import { getMarkerClass, getSpacingClass } from "@/components/list/utils";
import type { ListProps, ValidListTag } from "@/components/list/types";

// TODO:
// Polymorphic 'as' defaulting for List causes TS incompatibilities.
// Revisit with simplified typing or non-generic ListProps.
// If fixed this will mean that we dont have to pass an 'as' prop to render a ul.

export default function List<T extends ValidListTag = "ul">({
    marker = "default",
    spacing = "tight",
    className,
    ...props
}: ListProps<T>) {

    const listType = props.as ?? "ul";
    const listClasses = clsx(
        "list",
        getMarkerClass(listType, marker),
        getSpacingClass(spacing),
        className
    );

    return <Block
        className={listClasses}
        role={"list"}
        {...props}
    />
}