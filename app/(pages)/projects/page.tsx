"use client";

import Heading from "@/components/heading";
import { getLatestProjects } from "@/lib/projects/projects.data";
import ProjectsTablist from "./content/projectsTablist";

// WIP
export default function ProjectsPage() {

    const projects = getLatestProjects();

    if (!projects || projects.length === 0) {
        return (
            <div className="layout-wrapper flow-xl projects-page">
                <Heading as="h1" headingSize={2}>Projects</Heading>
                <p>I'm currently preparing some projects to publish here.
                    Check back soon.
                </p>
            </div>
        )
    }
    return (
        <div className="layout-wrapper flow-xl projects-page">
            <Heading as="h1" headingSize={2}>Projects</Heading>
            <ProjectsTablist projects={projects} />
        </div>
    )
}