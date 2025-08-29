import { Children, useId } from "react";
import Icon from "../icon";
import { RiInformationLine } from "@remixicon/react";
import clsx from "clsx";

export default function PostNote({ className, children, ...props }: React.ComponentProps<'div'>) {
    const id = useId();

    const childArray = Children.toArray(children);

    if (childArray.length === 0) return null;

    const [firstChild, ...restChildren] = childArray;


    return (
        <div className={clsx(className, "post-note flow-4 width-bleed")} role={"note"} aria-labelledby={id} {...props}>

            <div className="post-note__first">
                <Icon icon={RiInformationLine} size={64} className="post-note__icon" />
                <span id={id}>{firstChild}</span>
            </div>

            {restChildren.length > 0 &&
                <div className="flow-4">
                    {restChildren}
                </div>
            }
        </div>
    );
}