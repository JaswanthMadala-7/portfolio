import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { activeSocials, site } from "@/content/site";
import { jsonLd, shouldIndex } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.title}`, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | ${site.title}`,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: shouldIndex() ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#141613", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structured = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: site.name,
      jobTitle: "Software Engineer",
      url: site.url,
      sameAs: activeSocials.map((s) => s.href),
    },
    { "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.url },
  ];
  return (
    <html lang="en">
      <body>
        <a
          href="#main"
          className="absolute left-2 top-2 z-50 -translate-y-20 rounded bg-accent px-3 py-2 font-semibold text-black focus:translate-y-0"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structured) }} />
      </body>
    </html>
  );
}
