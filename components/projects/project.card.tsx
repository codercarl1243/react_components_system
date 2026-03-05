import clsx from "clsx";
import Image from "@/components/image";
import Heading from "@/components/heading";
import Link from "@/components/link";
import { Project } from "@/lib/projects/projects.type";
import List from "@/components/list";
// import { Project } from "@/lib/projects/projects.data";

type ProjectCardProps = {
    project: Project;
    layout?: "default" | "large";
    className?: string;
}

export default function ProjectCard({
    project,
    layout = "default",
    className
}: ProjectCardProps) {

    return (
        <article
            className={clsx("project-card surface-frame", className)}
            data-layout={layout}
        >
            {/* <div className="project-card__image"> */}
            <Image
                className="project-card__image mx-auto"
                src={project.image.src}
                alt={project.image.alt}
                width={1000}
                height={500}
            />
            {/* </div> */}
            <div className="project-card__content flow-4">
                <Heading as="h3" className="project-card__title" headingSize={4}>
                    {project.title}
                </Heading>
                <p className="project-card__description">
                    {project.description}
                </p>
                <List as="ul" className="project-card__tech">
                    {project.tech.map(tech => (
                        <li key={tech}>{tech}</li>
                    ))}
                </List>
                <div className="project-card__links">
                    {project.github && (
                        <Link href={project.github}>
                            GitHub
                        </Link>
                    )}
                    {project.demo && (
                        <Link href={project.demo}>
                            Demo
                        </Link>
                    )}
                </div>
            </div>
        </article>
    )
}