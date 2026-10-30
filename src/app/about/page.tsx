import { site } from "@/content/site";
import { experience } from "@/content/experience";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description: `About ${site.name}: education, engineering interests, and career direction.`,
  path: "/about",
});

export default function About() {
  const a = site.about;
  return (
    <div className="wrap pt-16">
      <p className="eyebrow">About me</p>
      <h1 className="mt-3 text-5xl">Backend foundations. AI-minded curiosity.</h1>
      <div className="measure mt-8 text-lg text-muted">
        {a.intro.map((p) => (
          <p key={p} className="mb-4">
            {p}
          </p>
        ))}
      </div>

      <section aria-labelledby="philosophy" className="mt-14">
        <h2 id="philosophy" className="text-2xl">
          Engineering philosophy
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {a.philosophy.map((item) => (
            <div key={item.title} className="card p-6">
              <h3 className="text-lg text-accent">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-14 grid gap-12 md:grid-cols-2">
        <section aria-labelledby="edu">
          <h2 id="edu" className="text-2xl">
            Education
          </h2>
          <ul className="mt-4 text-muted">
            {site.education.map((e) => (
              <li key={e.degree} className="border-t border-line py-3">
                {e.degree}
                {e.institution ? `, ${e.institution}` : ""}
                {e.years ? ` (${e.years})` : ""}
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="interests">
          <h2 id="interests" className="text-2xl">
            Engineering interests
          </h2>
          <ul className="mt-4 text-muted">
            {a.interests.map((i) => (
              <li key={i} className="border-t border-line py-3">
                {i}
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="learning">
          <h2 id="learning" className="text-2xl">
            Currently learning
          </h2>
          <p className="mt-4 text-muted">{a.learning}</p>
        </section>
        <section aria-labelledby="goals">
          <h2 id="goals" className="text-2xl">
            Career goals
          </h2>
          <p className="mt-4 text-muted">{a.goals}</p>
        </section>
      </div>

      {experience.length > 0 && (
        <p className="mt-12 text-muted">
          See the <a className="text-accent underline" href="/experience">experience timeline</a>.
        </p>
      )}
    </div>
  );
}
