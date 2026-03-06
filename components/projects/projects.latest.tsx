import Heading from "@/components/heading";
import { Block } from "@/components/primitives";
import ProjectCard from "@/components/projects/project.card";
import Link from "@/components/link";
import { getLatestProjects } from "@/lib/projects/projects.data";

export default function LatestProjects() {
    const { featuredProject, projects } = getLatestProjects()
    
    if(!featuredProject) {
      return null;
    }
  return (
    <Block
      as="section"
      className="homepage__latest-projects homepage__section width-full"
    >
      <Heading
        as="h2"
        className="homepage__latest-projects__heading center mb-16"
        headingSize={2}
      >
        Featured Project
      </Heading>

      <ProjectCard project={featuredProject} layout="large" />

      <div className="center mt-16">
        <Link href="/projects">View project details →</Link>
      </div>
    </Block>
  );
}