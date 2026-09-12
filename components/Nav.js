"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#about", label: "About", conf: 97 },
  { href: "#skills", label: "Skills", conf: 95 },
  { href: "#projects", label: "Projects", conf: 98 },
  { href: "#experience", label: "Experience", conf: 93 },
  { href: "#contact", label: "Contact", conf: 96 },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Track which section is in view and highlight the matching nav link.
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-line/40 bg-base/70 backdrop-blur-xl">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a
          href="#top"
          data-detect
          data-detect-label="identity · 99%"
          className="font-display font-bold text-lg tracking-tight group"
        >
          Sreeshanth
          <span className="text-signal inline-block group-hover:animate-pulse">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 font-mono text-sm text-muted">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-detect
                data-detect-label={`section · ${link.conf}%`}
                className={`nav-link hover:text-text transition-colors ${
                  active === link.href ? "active text-text" : ""
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            className="text-text"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="md:hidden flex flex-col gap-4 px-6 pb-6 font-mono text-sm text-muted bg-base/90 backdrop-blur-xl border-t border-line/30">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block hover:text-text transition-colors ${
                  active === link.href ? "text-signal" : ""
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
