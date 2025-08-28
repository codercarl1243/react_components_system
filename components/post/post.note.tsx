import { Children } from "react";
import Icon from "../icon";
import { RiInformationLine } from "@remixicon/react";

export default function PostNote({ children }: React.ComponentProps<'aside'>) {

    const childArray = Children.toArray(children);

    if (childArray.length === 0) return null;

    const [firstChild, ...restChildren] = childArray;

    return (
        <div className="post-note flow-4 width-bleed" role="note">

            <div className="post-note__first">
                <Icon icon={RiInformationLine} size={64} className="post-note__icon" />
                {firstChild}
            </div>

            {restChildren.length > 0 &&
                <div className="flow-4">
                    {restChildren}
                </div>
            }
        </div>
    );
}