import clsx from "clsx";
import Image from "@/components/image";
import Heading from "@/components/heading";
import Link from "@/components/link";
import { Project } from "@/lib/projects/projects.type";
import List from "@/components/list";
import Icon from "@/components/icon";
import { RiGithubFill } from "@remixicon/react";

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
        <div className="project-card-container">
            <article
                className={clsx("project-card surface-frame", className)}
                data-layout={layout}
            >
                <Image
                    className="project-card__image mx-auto"
                    src={project.image.src}
                    alt={project.image.alt}
                    width={600}
                    height={400}
                />
                <div className="project-card__content flow-md">
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
                                <Icon icon={RiGithubFill} /><span>Source Code</span>
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
        </div>
    )
}