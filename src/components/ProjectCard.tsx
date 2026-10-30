import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";

export default function ProjectCard({
  project,
  index,
  level = 3,
}: {
  project: Project;
  index: number;
  level?: 2 | 3;
}) {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <article className="card flex min-h-[18rem] flex-col p-6 md:p-7">
      <div className="flex items-center justify-between">
        <span className="text-xs tabular-nums text-muted">{String(index + 1).padStart(2, "0")}</span>
        <span className="text-xs text-muted">
          {project.kind === "professional" ? "Professional work" : "Personal project"}
        </span>
      </div>
      <Heading className="mt-5 text-2xl">
        <Link href={`/projects/${project.slug}`} className="hover:text-accent">
          {project.title}
        </Link>
      </Heading>
      <p className="mt-2 text-sm text-muted">{project.summary}</p>
      <ul className="mt-auto flex flex-wrap gap-1.5 pt-5" aria-label="Technologies">
        {project.stack.slice(0, 5).map((t) => (
          <li key={t} className="tag">
            {t}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-sm">
        <span className="text-muted">{project.category}</span>
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1 font-semibold text-accent"
          aria-label={`Case study: ${project.title}`}
        >
          Case study <ArrowUpRight size={14} aria-hidden />
        </Link>
      </div>
    </article>
  );
}
