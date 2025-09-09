import clsx from "clsx";
import Button from "../button";
import { TabProps } from "./tablist.type";

export default function Tab({
    isSelected,
    onClick,
    className,
    id,
    ref,
    children
}: TabProps) {

    return (
        <Button
            ref={ref}
            role="tab"
            id={`tab-${id}`}
            aria-selected={isSelected}
            aria-controls={`panel-${id}`}
            tabIndex={isSelected ? 0 : -1}
            onClick={onClick}
            className={clsx('tablist__header-tab', className)}
        >
            {children}
        </Button>
    )
}