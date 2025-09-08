import { Children, useId, cloneElement, isValidElement, ReactElement } from "react";
import Icon from "../icon";
import { RiInformationLine } from "@remixicon/react";
import clsx from "clsx";

type ElementWithId = ReactElement<{ id?: string }>;

export default function PostNote({ className, children, ...props }: React.ComponentProps<'div'>) {
    const id = useId();

    const childArray = Children.toArray(children);

    if (childArray.length === 0) return null;

    const [firstChild, ...restChildren] = childArray;
    const isDomElement = isValidElement(firstChild);
    const getElementId = (element: ElementWithId): string | undefined => {
        return element.props?.id;
    };

    const labelId = isDomElement ? getElementId(firstChild as ElementWithId) : id;

    const firstChildWithId = isDomElement
        ? cloneElement(firstChild as ElementWithId, { id: labelId })
        : <span id={labelId}>{firstChild}</span>; // Fallback for text nodes


    // TODO: Consider makign the content expandable and hidden
    return (
        <div
            // data-expanded={"false"} 
            className={clsx(className, "post-note width-bleed")}
            role={"note"}
            aria-labelledby={labelId}
            {...props}>
            <div className="post-note__first">
                <Icon icon={RiInformationLine} size={64} className="post-note__icon" />
                {firstChildWithId}
            </div>
            {restChildren.length > 0 &&
                <div className="flow-4 post-note__content">
                    {restChildren}
                </div>
            }
        </div>
    );
}