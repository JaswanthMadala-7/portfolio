import Link from "next/link";
import { experience } from "@/content/experience";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Experience",
  description: "Professional experience and technical contributions.",
  path: "/experience",
});

export default function Experience() {
  return (
    <div className="wrap pt-16">
      <h1 className="text-5xl">Experience</h1>
      {experience.length === 0 ? (
        <div className="mt-10 border border-line p-8">
          <p className="font-display text-xl">Timeline coming soon</p>
          <p className="measure mt-2 text-muted">
            Verified roles will be listed here. In the meantime, see the <Link className="text-accent underline" href="/projects">projects</Link> page
            for the kind of work I do.
          </p>
        </div>
      ) : (
        <ol className="mt-10">
          {experience.map((e) => (
            <li key={`${e.organization}-${e.start}`} className="border-t border-line py-8 md:grid md:grid-cols-[1fr_2fr] md:gap-10">
              <div>
                <h2 className="text-2xl">{e.title}</h2>
                <p className="mt-1 text-muted">{e.organization}</p>
                <p className="text-sm text-muted">
                  {e.start} to {e.end}
                </p>
              </div>
              <div className="mt-3 text-muted md:mt-0">
                {[
                  ["Responsibilities", e.responsibilities],
                  ["Technical contributions", e.contributions],
                  ["Accomplishments", e.accomplishments],
                ].map(
                  ([label, items]) =>
                    (items as string[]).length > 0 && (
                      <div key={label as string} className="mb-4">
                        <h3 className="text-base text-fg">{label as string}</h3>
                        <ul className="mt-1 list-disc pl-5">
                          {(items as string[]).map((i) => (
                            <li key={i}>{i}</li>
                          ))}
                        </ul>
                      </div>
                    ),
                )}
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
