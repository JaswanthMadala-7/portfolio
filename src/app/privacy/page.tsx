import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy",
  description: "How this website handles contact form data and visitor information.",
  path: "/privacy",
});

export default function Privacy() {
  return (
    <div className="wrap pt-16">
      <h1 className="text-5xl">Privacy</h1>
      <div className="prose-md mt-8 text-muted">
        <h2>Contact form</h2>
        <p>
          If you use the contact form, your name, email address, subject, and message are sent to {site.name} by email
          through an email delivery provider (Resend). They are used only to reply to you. This website does not store
          messages in a database.
        </p>
        <h2>Visitor data</h2>
        <p>
          This website does not use analytics or advertising trackers and sets no cookies. The hosting provider may keep
          standard server logs such as IP addresses for security and operations. The contact endpoint also keeps your IP
          address in memory for a short time to limit abuse.
        </p>
        <h2>Questions</h2>
        <p>To ask about or request deletion of a message you sent, use the contact page.</p>
      </div>
    </div>
  );
}
