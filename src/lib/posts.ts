import fs from "node:fs";
import path from "node:path";
import { parseFrontMatter } from "./frontmatter";

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  readingTime: number;
  content: string;
};

const dir = path.join(process.cwd(), "content", "writing");

export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

/** Only files with `draft: false` in front matter are published. Missing `draft` means draft. */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .flatMap((file) => {
      const { data, content } = parseFrontMatter(fs.readFileSync(path.join(dir, file), "utf8"));
      if (data.draft !== false || !data.title || !data.date) return [];
      const date = String(data.date);
      return [
        {
          slug: file.replace(/\.md$/, ""),
          title: String(data.title),
          date,
          summary: String(data.summary ?? ""),
          tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
          readingTime: readingTime(content),
          content,
        } satisfies Post,
      ];
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export const getPost = (slug: string) => getAllPosts().find((p) => p.slug === slug);

export function relatedPosts(post: Post, all: Post[]): Post[] {
  return all.filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t))).slice(0, 3);
}
