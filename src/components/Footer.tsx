import Link from "next/link";
import { site } from "@/content/site";
import { navLinks } from "@/content/nav";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="wrap flex flex-col gap-8 py-10 md:flex-row md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold">{site.name}</p>
          <p className="mt-1 max-w-xs text-muted">Backend systems, AI agents, and telecom automation.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-muted hover:text-fg">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className="text-muted hover:text-fg">
                Privacy
              </Link>
            </li>
          </ul>
        </nav>
        <SocialLinks className="flex flex-wrap items-start gap-6" />
      </div>
      <p className="wrap pb-8 text-sm text-muted">© {new Date().getFullYear()} {site.name}</p>
    </footer>
  );
}
