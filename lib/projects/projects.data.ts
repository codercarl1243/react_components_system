import { projects } from "./projects"

export function getLatestProjects(limit = 3) {
    const sorted = [...projects].sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    )
    if (!sorted.length) {
        return [];
    }

    const featured: typeof projects = [];
    const others: typeof projects = [];

    for (const project of sorted) {
        if (project.featured) {
            featured.push(project);
        } else {
            others.push(project);
        }
    }

    return [...featured, ...others].slice(0, Math.max(limit, 1));
}