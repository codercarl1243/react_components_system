import type { HeadingPropsType, HeadingTag } from "./heading.type";

export default function Heading({
    headingLevel = 3,
    children,
    ...props
}: HeadingPropsType) {
    const Tag = `h${headingLevel}` as HeadingTag;

    return <Tag {...props}>{children}</Tag>;
}