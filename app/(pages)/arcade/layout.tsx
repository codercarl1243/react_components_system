import Heading from "@/components/heading";
import { Stack } from "@/components/primitives";
import { ReactNode } from "react";

export default async function ArcadeLayout({
    children
}: Readonly<{
    children: ReactNode;
}>) {

    return (
        <Stack justify="center">
                <Heading as="h1">Arcade</Heading>
            <div className="arcade--page layout-wrapper">
                {children}
            </div>
        </Stack>

    )
}
