import { projects } from "./projects"

export function getLatestProjects(limit = 3) {
    const sorted = [...projects].sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    )

    const featuredProject = sorted.find(p => p.featured)

    const remaining = sorted
        .filter(p => p.id !== featuredProject?.id)
        .slice(0, limit)

    return {
        featuredProject,
        projects: remaining
    }
}