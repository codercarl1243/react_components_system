import { ReactNode } from "react";

export default function Rule({ children }: { children: ReactNode }) {

    return (
        <aside className="rule">
            <strong className="callout__heading font-accent">System rule</strong>
            <p className="rule__content">
                {children}
            </p>
        </aside>
    )
}