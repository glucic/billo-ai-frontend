"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Navbar() {
  const t = useTranslations("Navigation");
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "#features", label: t("features") },
    { href: "#pricing", label: t("pricing") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/80 backdrop-blur-md border-b-0 shadow-md">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-300 h-[2px] bg-gradient-to-r from-black via-[var(--accent)] to-black" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 flex items-center justify-between h-16">
        <Link
          href="/"
          className="text-xl font-bold text-[var(--accent)] flex items-center gap-2"
        >
          BilloAI
        </Link>

        <div className="hidden md:flex items-center gap-6 ml-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-[var(--foreground)]/90 font-medium before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-[var(--accent)] before:transition-all before:duration-300 hover:before:w-full"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          className="md:hidden relative w-8 h-6 flex flex-col justify-between"
        >
          <span
            className={`block h-1 bg-[var(--foreground)] rounded transition-transform duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-1 bg-[var(--foreground)] rounded transition-opacity duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-1 bg-[var(--foreground)] rounded transition-transform duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`md:hidden flex flex-col items-center bg-[var(--background)] border-t border-gray-200 dark:border-gray-700 py-4 space-y-3
      transition-all duration-300 ease-in-out
      ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="text-[var(--foreground)]/90 hover:text-[var(--accent)] transition-colors font-medium"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
