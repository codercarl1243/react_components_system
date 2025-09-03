import { Children, useId, cloneElement, isValidElement, JSX } from "react";
import Icon from "../icon";
import { RiInformationLine } from "@remixicon/react";
import clsx from "clsx";

export default function PostNote({ className, children, ...props }: React.ComponentProps<'div'>) {
    const id = useId();

    const childArray = Children.toArray(children);

    if (childArray.length === 0) return null;

    const [firstChild, ...restChildren] = childArray;

    const firstChildWithId = isValidElement(firstChild)
        ? cloneElement(firstChild, {
            id,
            // Merge existing id if present
            ...((firstChild as JSX.Element).props.id && { id: `${(firstChild as JSX.Element).props.id} ${id}` })
        })
        : <span id={id}>{firstChild}</span>; // Fallback for text nodes

    return (
        <div className={clsx(className, "post-note flow-4 width-bleed")} role={"note"} aria-labelledby={id} {...props}>

            <div className="post-note__first">
                <Icon icon={RiInformationLine} size={64} className="post-note__icon" />
                {firstChildWithId}
            </div>
            {restChildren.length > 0 &&
                <div className="flow-4">
                    {restChildren}
                </div>
            }
        </div>
    );
}