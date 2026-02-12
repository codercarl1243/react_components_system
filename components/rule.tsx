import { ReactNode } from "react";
import { Row } from "./primitives";


export default function Rule({ children }: { children: ReactNode }) {

    return (
        <aside className="rule">
            <Row as="strong" className="rule__heading font-accent">System rule</Row>
            <p className="rule__content">
                {children}
            </p>
        </aside>
    )
}