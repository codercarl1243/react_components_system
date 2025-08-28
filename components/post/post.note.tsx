import { Children, isValidElement, JSX } from "react";
import Icon from "../icon";
import { RiInformationLine } from "@remixicon/react";

export default function PostNote({ children }: React.ComponentProps<'aside'>) {

    const childArray = Children.toArray(children);

    if (childArray.length === 0) return null;

    const [firstChild, ...restChildren] = childArray;
const isHeading =
    isValidElement(firstChild) &&
    (
        (typeof firstChild.type === "string" &&
            ["h1", "h2", "h3", "h4", "h5", "h6"].includes(firstChild.type)) ||
        ("headingLevel" in (firstChild.props as JSX.Element))
    );

    return (
        <div className="post-note flow-4" role="note">
            {isHeading ? (
                <div
                    className="post-note__first"
                    style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}
                >
                    <Icon icon={RiInformationLine} size="lg" className="post-note__icon" />
                    <div>{firstChild}</div>
                </div>
            ) : (
                firstChild
            )}
            {restChildren.length > 0 &&
                <div className="flow-4">
                    {restChildren}
                </div>
            }
        </div>
    );
}