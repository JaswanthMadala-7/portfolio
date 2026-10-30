"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/content/site";
import { navLinks } from "@/content/nav";

export default function Header() {
  const pathname = usePathname();
  // The menu is open only for the path it was opened on, so navigating closes it without an effect.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const setOpen = (next: boolean | ((v: boolean) => boolean)) =>
    setOpenPath((cur) => ((typeof next === "function" ? next(cur === pathname) : next) ? pathname : null));
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenPath(null);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight" aria-label={`${site.monogram}, ${site.name}, home`}>
          {site.monogram}
          <span className="text-accent">.</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`rounded px-3 py-2 text-[0.95rem] ${isActive(l.href) ? "text-accent" : "text-muted hover:text-fg"}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="btn btn-ghost md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          <span>{open ? "Close" : "Menu"}</span>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line md:hidden">
          <ul className="wrap py-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`block border-b border-line py-3 ${isActive(l.href) ? "text-accent" : ""}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
