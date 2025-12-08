import clsx from "clsx";
import { Block } from "@/components/primitives";
import { getMarkerClass, getSpacingClass } from "@/components/list/utils";
import type { ListProps, ValidListTag } from "@/components/list/types";

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

    const role = marker === "none" ? "list" : undefined;

    return <Block
        className={listClasses}
        role={role}
        {...props}
    />
}