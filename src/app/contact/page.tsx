import ContactForm from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Contact ${site.name} about backend engineering, AI agents, or collaboration.`,
  path: "/contact",
});

export default function Contact() {
  const configured = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL);
  const dev = process.env.NODE_ENV !== "production";
  return (
    <div className="wrap pt-16">
      <h1 className="text-5xl">Contact</h1>
      <p className="measure mt-5 text-lg text-muted">{site.contact.intro}</p>

      <div className="mt-10 grid gap-12 md:grid-cols-[2fr_1fr]">
        <div>
          {dev && !configured && (
            <p role="note" className="mb-6 border border-line p-4 text-sm text-muted">
              Development notice: email delivery is not configured. Set RESEND_API_KEY, CONTACT_TO_EMAIL, and
              CONTACT_FROM_EMAIL in .env.local. Submissions will return an error until then.
            </p>
          )}
          <ContactForm fallbackEmail={site.email || undefined} />
        </div>
        <aside aria-label="Other ways to reach me">
          <h2 className="text-xl">Elsewhere</h2>
          <SocialLinks className="mt-4 flex flex-col gap-3" />
          {site.email && <p className="mt-4 text-sm text-muted">{site.email}</p>}
        </aside>
      </div>
    </div>
  );
}
