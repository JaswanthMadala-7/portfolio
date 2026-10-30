import Link from "next/link";
import type { Project } from "@/content/projects";

export default function ProjectRow({ project, level = 3 }: { project: Project; level?: 2 | 3 }) {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <li className="border-t border-line py-7">
      <article className="grid gap-3 md:grid-cols-[1fr_2fr] md:gap-10">
        <div>
          <Heading className="text-xl">
            <Link href={`/projects/${project.slug}`} className="hover:text-accent">
              {project.title}
            </Link>
          </Heading>
          <p className="mt-2 text-sm text-muted">
            {project.category}
            {project.kind === "professional" ? ", professional work" : ", personal project"}
          </p>
        </div>
        <div>
          <p className="measure text-muted">{project.summary}</p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
            {project.stack.map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </li>
  );
}
