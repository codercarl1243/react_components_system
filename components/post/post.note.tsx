import { Children, useId, cloneElement, isValidElement, JSX } from "react";
import Icon from "../icon";
import { RiInformationLine } from "@remixicon/react";
import clsx from "clsx";

export default function PostNote({ className, children, ...props }: React.ComponentProps<'div'>) {
    const id = useId();

    const childArray = Children.toArray(children);

    if (childArray.length === 0) return null;

    const [firstChild, ...restChildren] = childArray;
    const isDomElement = isValidElement(firstChild);
    const labelId = isDomElement && (firstChild as any).props?.id
        ? (firstChild as any).props.id
        : id;

    const firstChildWithId = isDomElement
        ? cloneElement(firstChild as any, { id: labelId })
        : <span id={labelId}>{firstChild}</span>; // Fallback for text nodes

    return (
        <div className={clsx(className, "post-note flow-4 width-bleed")} role={"note"} aria-labelledby={labelId} {...props}>

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