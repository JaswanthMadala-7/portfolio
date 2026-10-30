import { site } from "@/content/site";
import { experience } from "@/content/experience";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Resume",
  description: `Resume of ${site.name}.`,
  path: "/resume",
});

export default function Resume() {
  return (
    <div className="wrap pt-16">
      <h1 className="text-5xl">Resume</h1>
      {site.resume.available && (
        <p className="mt-6">
          <a href={site.resume.path} download className="btn btn-primary">
            Download PDF
          </a>
        </p>
      )}
      <div className="mt-10 max-w-3xl">
        <p className="font-display text-2xl">{site.name}</p>
        <p className="text-muted">{site.title}</p>

        <h2 className="mt-8 text-xl">Education</h2>
        <ul className="mt-2 text-muted">
          {site.education.map((e) => (
            <li key={e.degree}>{e.degree}</li>
          ))}
        </ul>

        <h2 className="mt-8 text-xl">Skills</h2>
        <dl className="mt-2 text-muted">
          {site.skills.map((g) => (
            <div key={g.group} className="mb-1">
              <dt className="inline text-fg">{g.group}: </dt>
              <dd className="inline">{g.items.join(", ")}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-8 text-xl">Experience</h2>
        {experience.length === 0 ? (
          <p className="mt-2 text-muted">Add verified roles in src/content/experience.ts.</p>
        ) : (
          <ul className="mt-2 text-muted">
            {experience.map((e) => (
              <li key={e.organization + e.start}>
                {e.title}, {e.organization} ({e.start} to {e.end})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
