import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { shouldIndex } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (!shouldIndex()) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.url}/sitemap.xml` };
}
