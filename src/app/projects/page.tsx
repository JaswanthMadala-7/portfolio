import ProjectGallery from "@/components/ProjectGallery";
import { publishedProjects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description: "Backend, AI agent, and telecom automation projects, described at a high level.",
  path: "/projects",
});

export default function Projects() {
  return (
    <div className="wrap pt-16">
      <h1 className="text-5xl">Projects</h1>
      <p className="measure mt-5 text-muted">
        Professional work is described at a high level and belongs to the employer. Source and demo links appear only
        where they are public.
      </p>
      <div className="mt-10">
        <ProjectGallery projects={publishedProjects} />
      </div>
    </div>
  );
}
