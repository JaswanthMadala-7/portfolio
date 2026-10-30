import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "@/components/Markdown";
import { getAllPosts, getPost, relatedPosts } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return pageMetadata({ title: p.title, description: p.summary, path: `/writing/${p.slug}`, type: "article" });
}

export default async function Post({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = relatedPosts(post, getAllPosts());
  return (
    <article className="wrap pt-12">
      <Link href="/writing" className="text-muted hover:text-fg">
        Back to writing
      </Link>
      <h1 className="mt-6 max-w-3xl text-4xl md:text-5xl">{post.title}</h1>
      <p className="mt-3 text-sm text-muted">
        <time dateTime={post.date}>{post.date}</time>, {post.readingTime} min read
      </p>
      {post.tags.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <li key={t} className="tag">
              {t}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-10">
        <Markdown source={post.content} />
      </div>
      {related.length > 0 && (
        <section className="mt-12" aria-labelledby="more">
          <h2 id="more" className="text-2xl">
            Related articles
          </h2>
          <ul className="mt-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link className="text-accent underline" href={`/writing/${r.slug}`}>
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
