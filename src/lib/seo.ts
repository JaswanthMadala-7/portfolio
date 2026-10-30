import type { Metadata } from "next";
import { isPlaceholderUrl, site } from "@/content/site";

/** Indexing is blocked on previews, when NOINDEX=true, and while the URL is still a placeholder. */
export function shouldIndex(): boolean {
  if (process.env.NOINDEX === "true") return false;
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") return false;
  return !isPlaceholderUrl;
}

export function pageMetadata(opts: { title: string; description: string; path: string; type?: "website" | "article" }): Metadata {
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: opts.path,
      siteName: site.name,
      type: opts.type ?? "website",
    },
    twitter: { card: "summary_large_image", title: opts.title, description: opts.description },
  };
}

export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
