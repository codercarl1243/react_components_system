import clsx from "clsx";
import { Row } from "./primitives";


export default function Arrow({ direction = "right", className }: { direction?: "right" | "left" | "top" | "bottom", className?: string }) {

    return (
        <div className={clsx("arrow", className)} data-direction={direction}>
            <div className="arrow__line" />
            <div className="arrow__head" />
        </div>
    )

}

export function DoubleArrow({ orientation = "horizontal", className }: { orientation?: "horizontal" | "vertical", className?: string }) {

    return (
        <Row data-orientation={orientation} gap={0} className={clsx("arrow__double", className)} >
            <Arrow direction="left"/>
            <Arrow direction="right"/>
        </Row>
    )
}