"use client";

import Tablist from "@/components/tablist";
import { Project } from "@/lib/projects/projects.type";

export default function ProjectsTablist({projects}: {projects: Project[]}) {

    return (

        <Tablist
            defaultActiveTabId="televi"
            tabListName={"projects"}
            orientation="vertical"
            tabs={
                projects.map(project => {
                    return {
                        id: project.id,
                        tabLabel: project.title,
                        panelContent: project.content()
                    }
                })
            }
        />
    )
}