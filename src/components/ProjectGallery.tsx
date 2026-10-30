"use client";

import { useState } from "react";
import { categories, type Project, type ProjectCategory } from "@/content/projects";
import { filterProjects } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectGallery({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<ProjectCategory | "All">("All");
  const shown = filterProjects(projects, active);
  const options: (ProjectCategory | "All")[] = ["All", ...categories];

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {options.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={active === c}
            onClick={() => setActive(c)}
            className={`btn ${active === c ? "btn-primary" : "btn-ghost"}`}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted" role="status" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
      </p>
      {shown.length === 0 ? (
        <p className="mt-8 border-t border-line pt-8 text-muted">No projects match this filter yet.</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2" data-testid="project-list">
          {shown.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} level={2} />
          ))}
        </div>
      )}
    </div>
  );
}
