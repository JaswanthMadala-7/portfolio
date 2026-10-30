import { describe, expect, it } from "vitest";
import { projects, categories, publishedProjects } from "@/content/projects";
import { filterProjects, relatedProjects } from "@/lib/projects";
import { validateSiteConfig } from "@/content/site";

describe("projects", () => {
  it("returns everything for All", () => expect(filterProjects(projects, "All")).toHaveLength(projects.length));
  it("filters by category", () => {
    for (const c of categories) expect(filterProjects(projects, c).every((p) => p.category === c)).toBe(true);
  });
  it("has unique slugs and valid related links", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const p of projects) expect(relatedProjects(projects, p)).toHaveLength(p.related.length);
  });
  it("never links to unpublished projects", () => expect(publishedProjects.every((p) => p.published)).toBe(true));
});

describe("site config", () => {
  it("is valid", () => expect(validateSiteConfig()).toEqual([]));
});
