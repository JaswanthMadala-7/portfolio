import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { publishedProjects } from "@/content/projects";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/about", "/projects", "/experience", "/writing", "/contact", "/resume", "/privacy"];
  return [
    ...staticPaths.map((p) => ({ url: `${site.url}${p}` })),
    ...publishedProjects.map((p) => ({ url: `${site.url}/projects/${p.slug}` })),
    ...getAllPosts().map((p) => ({ url: `${site.url}/writing/${p.slug}`, lastModified: p.date })),
  ];
}
