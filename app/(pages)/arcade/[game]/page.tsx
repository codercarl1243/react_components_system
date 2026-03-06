"use client";
import { notFound } from "next/navigation";
import ArcadeShell from "@/components/arcade/shell";
import { gamesRegistry } from "@/app/(pages)/arcade/gamesRegistry";
import { use } from "react";

export default function ArcadeGamePage({
    params,
}: {
    params: Promise<{ game: string }>;
}) {
    const { game } = use(params);

    const def = gamesRegistry[game];

    if (!def) return notFound();

    return (
        <ArcadeShell
            config={def.config}
            Game={def.Game}
            Menu={def.Menu}
        />
    );
}