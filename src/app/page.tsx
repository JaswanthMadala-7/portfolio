import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { publishedProjects } from "@/content/projects";
import ProjectCard from "@/components/ProjectCard";

export default function Home() {
  const selected = publishedProjects.slice(0, 4);
  return (
    <>
      <section className="hero-rings">
        <div className="wrap grid items-end gap-12 pb-20 pt-8 md:grid-cols-[minmax(0,1fr)_16rem] md:pt-12">
          <div>
            <p className="hero-in text-xl font-semibold uppercase tracking-[0.18em] text-fg sm:text-2xl">
              {site.name}
            </p>
            <p className="hero-in eyebrow mt-3">{site.hero.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl text-[2.6rem] sm:text-6xl md:text-7xl">
              {site.hero.headline}
            </h1>
            <p className="hero-in measure mt-7 text-lg text-muted" style={{ animationDelay: "60ms" }}>
              {site.hero.description}
            </p>
            <div className="hero-in mt-9 flex flex-wrap gap-3" style={{ animationDelay: "120ms" }}>
              <Link href="/projects" className="btn btn-primary">
                View Projects <ArrowRight size={18} aria-hidden />
              </Link>
              {site.resume.available ? (
                <a href={site.resume.path} download className="btn btn-ghost">
                  Download Resume
                </a>
              ) : (
                <Link href="/contact" className="btn btn-ghost">
                  Contact Me
                </Link>
              )}
            </div>
          </div>
          <div className="hero-in mx-auto w-full max-w-sm md:mx-0 md:max-w-none" style={{ animationDelay: "180ms" }}>
            <Image
              src="/jaswanth.png"
              alt={`Portrait of ${site.name}`}
              width={512}
              height={512}
              priority
              sizes="(max-width: 768px) 100vw, 16rem"
              className="w-full rounded-2xl border border-line object-cover"
            />
            <aside className="mt-6 border-l border-line pl-6 text-sm text-muted" aria-label="Current focus">
              <p className="availability mb-4">
                <span className="availability-dot" aria-hidden /> {site.hero.aside.availability}
              </p>
              <p className="font-semibold text-fg">Currently exploring</p>
              <p className="mt-1">{site.hero.aside.exploring}</p>
              <p className="mt-4 font-semibold text-fg">Core stack</p>
              <p className="mt-1">{site.hero.aside.coreStack}</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="wrap py-14" aria-labelledby="selected">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 id="selected" className="mt-3 text-3xl">
              Projects with a purpose
            </h2>
          </div>
          <Link href="/projects" className="text-accent underline underline-offset-4">
            All projects
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {selected.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>

      <section className="wrap py-14" aria-labelledby="skills">
        <p className="eyebrow">Toolbox</p>
        <h2 id="skills" className="mt-3 text-3xl">
          Skills and technologies
        </h2>
        <p className="measure mt-3 text-muted">
          Areas I work in and keep learning. This is a list of working areas, not a claim of expertise in every item.
        </p>
        <dl className="mt-8 grid gap-6 sm:grid-cols-2">
          {site.skills.map((g) => (
            <div key={g.group} className="border-t border-line pt-4">
              <dt className="font-semibold">{g.group}</dt>
              <dd className="mt-1 text-muted">{g.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap py-14" aria-labelledby="background">
        <p className="eyebrow">A little about me</p>
        <h2 id="background" className="mt-3 text-3xl">
          Backend foundations. AI-minded curiosity.
        </h2>
        <div className="measure mt-4 text-muted">
          {site.about.intro.map((p) => (
            <p key={p} className="mb-4">
              {p}
            </p>
          ))}
          <Link href="/about" className="text-accent underline underline-offset-4">
            More about me
          </Link>
        </div>
      </section>

      <section className="wrap py-14" aria-labelledby="cta">
        <div className="cta-panel flex flex-col justify-between gap-6 p-8 md:flex-row md:items-center md:p-12">
          <div>
            <p className="eyebrow">Have a good problem?</p>
            <h2 id="cta" className="mt-3 max-w-xl text-3xl md:text-4xl">
              Let&apos;s make something useful.
            </h2>
            <p className="mt-3 max-w-xl text-sm opacity-80">
              Open to thoughtful conversations about backend systems, AI agents, and collaboration.
            </p>
          </div>
          <Link
            href="/contact"
            className="btn shrink-0 self-start border-[#141711] font-semibold text-[#141711] md:self-auto"
          >
            Get in touch <ArrowUpRight size={18} aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
