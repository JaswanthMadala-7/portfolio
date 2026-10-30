import type { Project, ProjectCategory } from "@/content/projects";

export function filterProjects(
  list: Project[],
  category: ProjectCategory | "All",
  query = "",
): Project[] {
  const q = query.toLowerCase().trim();
  return list.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      (q === "" || `${p.title} ${p.summary} ${p.stack.join(" ")}`.toLowerCase().includes(q)),
  );
}

export function relatedProjects(list: Project[], project: Project): Project[] {
  return project.related
    .map((slug) => list.find((p) => p.slug === slug))
    .filter((p): p is Project => Boolean(p));
}
