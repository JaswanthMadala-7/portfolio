import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, publishedProjects } from "@/content/projects";
import { relatedProjects } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";
import ProjectRow from "@/components/ProjectRow";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMetadata({ title: p.title, description: p.summary, path: `/projects/${p.slug}` });
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-8 md:grid md:grid-cols-[1fr_2fr] md:gap-10">
      <h2 className="text-2xl">{title}</h2>
      <div className="mt-3 text-muted md:mt-0">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const related = relatedProjects(publishedProjects, p);

  return (
    <article className="wrap pt-12">
      <Link href="/projects" className="text-muted hover:text-fg">
        Back to projects
      </Link>
      <h1 className="mt-6 max-w-3xl text-4xl md:text-5xl">{p.title}</h1>
      <p className="measure mt-5 text-lg text-muted">{p.summary}</p>
      <p className="mt-4 text-sm text-muted">
        {p.category}, {p.kind === "professional" ? "professional work for an employer" : "personal project"}
      </p>
      <div className="mt-4 flex flex-wrap gap-4">
        {p.links.demo && (
          <a className="btn btn-ghost" href={p.links.demo} rel="noopener noreferrer" target="_blank">
            Live demo
          </a>
        )}
        {p.links.source && (
          <a className="btn btn-ghost" href={p.links.source} rel="noopener noreferrer" target="_blank">
            Source code
          </a>
        )}
      </div>

      <div className="mt-10">
        <Block title="Problem and motivation">
          <p>{p.problem}</p>
        </Block>
        <Block title="Solution and architecture">
          <p>{p.solution}</p>
        </Block>
        <Block title="My role">
          <p>{p.role}</p>
        </Block>
        <Block title="Technology stack">
          <ul className="flex flex-wrap gap-2">
            {p.stack.map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>
        </Block>
        {p.decisions.length > 0 && (
          <Block title="Key engineering decisions">
            <ul className="list-disc space-y-2 pl-5">
              {p.decisions.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </Block>
        )}
        {p.challenges.length > 0 && (
          <Block title="Challenges and solutions">
            <ul className="space-y-4">
              {p.challenges.map((c) => (
                <li key={c.challenge}>
                  <p className="text-fg">{c.challenge}</p>
                  <p>{c.approach}</p>
                </li>
              ))}
            </ul>
          </Block>
        )}
        {p.outcomes.length > 0 && (
          <Block title="Outcomes">
            <ul className="list-disc space-y-2 pl-5">
              {p.outcomes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </Block>
        )}
        {p.lessons.length > 0 && (
          <Block title="Lessons learned">
            <ul className="list-disc space-y-2 pl-5">
              {p.lessons.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </Block>
        )}
      </div>

      {related.length > 0 && (
        <section className="mt-12" aria-labelledby="related">
          <h2 id="related" className="text-2xl">
            Related projects
          </h2>
          <ul className="mt-4 border-b border-line">
            {related.map((r) => (
              <ProjectRow key={r.slug} project={r} />
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
