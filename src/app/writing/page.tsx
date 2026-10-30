import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Writing",
  description: "Articles on Java, backend architecture, AI engineering, MCP, and telecom automation.",
  path: "/writing",
});

export default function Writing() {
  const posts = getAllPosts();
  return (
    <div className="wrap pt-16">
      <h1 className="text-5xl">Writing</h1>
      {posts.length === 0 ? (
        <div className="mt-10 border border-line p-8">
          <p className="font-display text-xl">No articles yet</p>
          <p className="measure mt-2 text-muted">
            I plan to write about Java and Spring Boot, backend architecture, AI engineering, and telecom automation.
          </p>
        </div>
      ) : (
        <ul className="mt-10">
          {posts.map((p) => (
            <li key={p.slug} className="border-t border-line py-7">
              <article>
                <h2 className="text-2xl">
                  <Link href={`/writing/${p.slug}`} className="hover:text-accent">
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-1 text-sm text-muted">
                  <time dateTime={p.date}>{p.date}</time>, {p.readingTime} min read
                </p>
                <p className="measure mt-3 text-muted">{p.summary}</p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
