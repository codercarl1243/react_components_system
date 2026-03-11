import Heading from "@/components/heading";
import Tablist from "@/components/tablist";
import { getLatestProjects } from "@/lib/projects/projects.data";

// WIP
export default function ProjectsPage() {

    const projects = getLatestProjects();

    if (!projects || projects.length === 0) {
        return (
            <div className="layout-wrapper flow-8 projects-page">
                <Heading as="h1" headingSize={2}>Projects</Heading>
                <p>I'm currently preparing some projects to publish here.
                    Check back soon.
                </p>
            </div>
        )
    }
    return (
        <div className="layout-wrapper flow-8 projects-page">
            <Heading as="h1" headingSize={2}>Projects</Heading>

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
                variant={"neutral"}
            />
        </div>
    )
}