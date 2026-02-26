import Link from "next/link";
import { gamesRegistry } from "./gamesRegistry";
import List from "@/components/list";
import { Stack } from "@/components/primitives";

export default function ArcadeHubPage() {
    return (

        <>
            <Stack>
                <p>every so often I come across a game that my kids play on a website.</p>
                <p>This page is where I go to reverse engineer the game play and logic for an add free experience</p>
            </Stack>
            <List as="ul" marker="none">
                {Object.values(gamesRegistry).map(({ config }) => (
                    <li key={config.id}>
                        <Link href={`/arcade/${config.id}`}>{config.label}</Link>
                    </li>
                ))}
            </List>
        </>

    );
}