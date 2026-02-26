import Heading from "@/components/heading";
import { Stack } from "@/components/primitives";
import { ReactNode } from "react";

export default async function ArcadeLayout({
    children
}: Readonly<{
    children: ReactNode;
}>) {

    return (
        <Stack>
            <Stack>
                <Heading as="h1">Arcade</Heading>
                <p>More stuff here</p>
            </Stack>
            <div className="arcade--page layout-wrapper">
                {children}
            </div>
        </Stack>

    )
}
