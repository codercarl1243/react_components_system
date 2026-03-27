import Heading from "@/components/heading";
import { Block } from "@/components/primitives";
import ProjectCard from "@/components/projects/project.card";
import Link from "@/components/link";
import { getLatestProjects } from "@/lib/projects/projects.data";

export default function LatestProjects() {
  const projects = getLatestProjects()

  if (!projects || projects.length === 0) {
    return null;
  }
  return (
    <Block
      as="section"
      className="homepage__latest-projects homepage__section"
    >
      <Heading
        as="h2"
        className="homepage__latest-projects__heading center mb-xl"
        headingSize={2}
      >
        Featured Project
      </Heading>
      {projects.map((project) => <ProjectCard key={project.id} project={project} layout={project.featured ? "large" : "default"} />)}


      <div className="center mt-xxl">
        <Link href="/projects">View project details →</Link>
      </div>
    </Block>
  );
}